ALTER TABLE public.knowledge_fixes
  ADD COLUMN IF NOT EXISTS sod_override_by uuid,
  ADD COLUMN IF NOT EXISTS sod_override_reason text,
  ADD COLUMN IF NOT EXISTS sod_override_at timestamp with time zone;

CREATE OR REPLACE FUNCTION public.enforce_independent_verification()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _require boolean;
  _independent_pass boolean;
  _override boolean;
BEGIN
  -- Validate override metadata whenever it is being set
  IF NEW.sod_override_by IS DISTINCT FROM OLD.sod_override_by
     OR NEW.sod_override_reason IS DISTINCT FROM OLD.sod_override_reason THEN
    IF NEW.sod_override_by IS NOT NULL THEN
      IF COALESCE(btrim(NEW.sod_override_reason), '') = '' THEN
        RAISE EXCEPTION 'A written reason is required to override independent verification.';
      END IF;
      IF NOT (public.has_role(NEW.sod_override_by, 'admin'::app_role)
              OR public.has_role(NEW.sod_override_by, 'super_admin'::app_role)) THEN
        RAISE EXCEPTION 'Only an admin can override independent verification.';
      END IF;
      IF NEW.sod_override_at IS NULL THEN
        NEW.sod_override_at := now();
      END IF;
    ELSE
      NEW.sod_override_reason := NULL;
      NEW.sod_override_at := NULL;
    END IF;
  END IF;

  IF NEW.status = 'verified'::fix_record_status
     AND (OLD.status IS DISTINCT FROM NEW.status OR OLD.verified_by IS DISTINCT FROM NEW.verified_by) THEN

    SELECT COALESCE(t.require_independent_verification, true) INTO _require
    FROM public.tenants t WHERE t.id = NEW.tenant_id;

    _override := NEW.sod_override_by IS NOT NULL
                 AND COALESCE(btrim(NEW.sod_override_reason), '') <> ''
                 AND (public.has_role(NEW.sod_override_by, 'admin'::app_role)
                      OR public.has_role(NEW.sod_override_by, 'super_admin'::app_role));

    IF COALESCE(_require, true) AND NOT _override THEN
      IF NEW.verified_by IS NULL THEN
        RAISE EXCEPTION 'A verifier must be recorded before a fix can be verified.';
      END IF;

      IF NEW.verified_by = NEW.created_by THEN
        RAISE EXCEPTION 'Independent verification required: the person who created this fix cannot verify it.';
      END IF;

      SELECT EXISTS (
        SELECT 1 FROM public.fix_trials ft
        WHERE ft.fix_id = NEW.id
          AND ft.outcome = 'pass'::fix_trial_outcome
          AND ft.logged_by <> NEW.created_by
      ) INTO _independent_pass;

      IF NOT _independent_pass THEN
        RAISE EXCEPTION 'Independent verification required: at least one passing trial must be logged by someone other than the fix creator.';
      END IF;
    ELSIF NEW.verified_by IS NULL THEN
      RAISE EXCEPTION 'A verifier must be recorded before a fix can be verified.';
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.fix_verification_eligibility(_fix_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _f public.knowledge_fixes;
  _user uuid := auth.uid();
  _require boolean;
  _independent_pass boolean;
  _can_verify boolean;
  _can_override boolean;
  _override_active boolean;
  _is_creator boolean;
  _reasons text[] := ARRAY[]::text[];
  _trials_needed integer;
BEGIN
  IF _user IS NULL THEN
    RETURN jsonb_build_object('eligible', false, 'reasons', jsonb_build_array('Not signed in.'));
  END IF;

  SELECT * INTO _f FROM public.knowledge_fixes WHERE id = _fix_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('eligible', false, 'reasons', jsonb_build_array('Fix record not found.'));
  END IF;

  IF NOT (public.has_role(_user, 'super_admin'::app_role)
          OR _f.tenant_id = public.get_user_tenant_id(_user)) THEN
    RETURN jsonb_build_object('eligible', false, 'reasons', jsonb_build_array('Fix record not found.'));
  END IF;

  SELECT COALESCE(t.require_independent_verification, true) INTO _require
  FROM public.tenants t WHERE t.id = _f.tenant_id;
  _require := COALESCE(_require, true);

  _can_verify := public.has_role(_user, 'supervisor'::app_role)
              OR public.has_role(_user, 'manager'::app_role)
              OR public.has_role(_user, 'admin'::app_role)
              OR public.has_role(_user, 'super_admin'::app_role);

  _can_override := public.has_role(_user, 'admin'::app_role)
                OR public.has_role(_user, 'super_admin'::app_role);

  _override_active := _f.sod_override_by IS NOT NULL
    AND COALESCE(btrim(_f.sod_override_reason), '') <> ''
    AND (public.has_role(_f.sod_override_by, 'admin'::app_role)
         OR public.has_role(_f.sod_override_by, 'super_admin'::app_role));

  _is_creator := (_user = _f.created_by);

  SELECT EXISTS (
    SELECT 1 FROM public.fix_trials ft
    WHERE ft.fix_id = _f.id
      AND ft.outcome = 'pass'::fix_trial_outcome
      AND ft.logged_by <> _f.created_by
  ) INTO _independent_pass;

  _trials_needed := GREATEST(_f.required_passes - _f.consecutive_passes, 0);

  IF _f.status = 'verified'::fix_record_status THEN
    _reasons := _reasons || 'This fix is already verified.';
  ELSIF _f.status <> 'committed'::fix_record_status THEN
    _reasons := _reasons || 'Fix must be released to trial before it can be verified.';
  END IF;

  IF NOT _can_verify THEN
    _reasons := _reasons || 'Your role cannot verify fixes.';
  END IF;

  IF _trials_needed > 0 THEN
    _reasons := _reasons || format('Needs %s more passing trial(s) in a row (%s of %s).',
                                   _trials_needed, _f.consecutive_passes, _f.required_passes);
  END IF;

  IF _require AND NOT _override_active AND _is_creator THEN
    _reasons := _reasons || 'You created this fix — verification must be performed by someone else (segregation of duties).';
  END IF;

  IF _require AND NOT _override_active AND NOT _independent_pass THEN
    _reasons := _reasons || 'At least one passing trial must be logged by someone other than the fix creator.';
  END IF;

  RETURN jsonb_build_object(
    'eligible', cardinality(_reasons) = 0,
    'reasons', to_jsonb(_reasons),
    'status', _f.status,
    'require_independent_verification', _require,
    'is_creator', _is_creator,
    'can_verify_role', _can_verify,
    'can_override', _can_override,
    'override_active', _override_active,
    'override_by', _f.sod_override_by,
    'override_reason', _f.sod_override_reason,
    'override_at', _f.sod_override_at,
    'has_independent_pass', _independent_pass,
    'consecutive_passes', _f.consecutive_passes,
    'required_passes', _f.required_passes,
    'trials_needed', _trials_needed
  );
END;
$function$;