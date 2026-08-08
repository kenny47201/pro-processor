ALTER TABLE public.tenants
  ADD COLUMN IF NOT EXISTS require_independent_verification boolean NOT NULL DEFAULT true;

CREATE OR REPLACE FUNCTION public.enforce_independent_verification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _require boolean;
  _independent_pass boolean;
BEGIN
  IF NEW.status = 'verified'::fix_record_status
     AND (OLD.status IS DISTINCT FROM NEW.status OR OLD.verified_by IS DISTINCT FROM NEW.verified_by) THEN

    SELECT COALESCE(t.require_independent_verification, true) INTO _require
    FROM public.tenants t WHERE t.id = NEW.tenant_id;

    IF COALESCE(_require, true) THEN
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
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_independent_verification ON public.knowledge_fixes;
CREATE TRIGGER trg_enforce_independent_verification
BEFORE UPDATE ON public.knowledge_fixes
FOR EACH ROW EXECUTE FUNCTION public.enforce_independent_verification();