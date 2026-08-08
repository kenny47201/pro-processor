CREATE OR REPLACE FUNCTION public.fix_verification_audit(
  _from timestamptz DEFAULT NULL,
  _to timestamptz DEFAULT NULL,
  _facility uuid DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  title text,
  status fix_record_status,
  facility_id uuid,
  created_at timestamptz,
  created_by uuid,
  creator_name text,
  verified_by uuid,
  verifier_name text,
  verified_at timestamptz,
  consecutive_passes integer,
  required_passes integer,
  total_passes integer,
  total_fails integer,
  has_independent_pass boolean,
  self_verified boolean,
  require_independent_verification boolean,
  override_active boolean,
  override_by uuid,
  override_by_name text,
  override_reason text,
  override_at timestamptz,
  blocking_reasons text[]
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _user uuid := auth.uid();
  _is_super boolean;
  _tenant uuid;
BEGIN
  IF _user IS NULL THEN
    RETURN;
  END IF;

  _is_super := public.has_role(_user, 'super_admin'::app_role);

  IF NOT (_is_super OR public.has_role(_user, 'admin'::app_role)) THEN
    RETURN;
  END IF;

  _tenant := public.get_user_tenant_id(_user);

  RETURN QUERY
  WITH base AS (
    SELECT
      f.*,
      COALESCE(t.require_independent_verification, true) AS req_indep,
      EXISTS (
        SELECT 1 FROM public.fix_trials ft
        WHERE ft.fix_id = f.id
          AND ft.outcome = 'pass'::fix_trial_outcome
          AND ft.logged_by <> f.created_by
      ) AS indep_pass,
      (
        f.sod_override_by IS NOT NULL
        AND COALESCE(btrim(f.sod_override_reason), '') <> ''
      ) AS ovr_active
    FROM public.knowledge_fixes f
    LEFT JOIN public.tenants t ON t.id = f.tenant_id
    WHERE (_is_super OR f.tenant_id = _tenant)
      AND (_facility IS NULL OR f.facility_id = _facility)
      AND (_from IS NULL OR f.created_at >= _from)
      AND (_to IS NULL OR f.created_at < _to)
  )
  SELECT
    b.id,
    b.title,
    b.status,
    b.facility_id,
    b.created_at,
    b.created_by,
    cp.display_name,
    b.verified_by,
    vp.display_name,
    b.verified_at,
    b.consecutive_passes,
    b.required_passes,
    b.total_passes,
    b.total_fails,
    b.indep_pass,
    (b.verified_by IS NOT NULL AND b.verified_by = b.created_by),
    b.req_indep,
    b.ovr_active,
    b.sod_override_by,
    op.display_name,
    b.sod_override_reason,
    b.sod_override_at,
    (
      ARRAY_REMOVE(ARRAY[
        CASE WHEN b.status = 'draft'::fix_record_status
          THEN 'Not released to trial' END,
        CASE WHEN b.status <> 'verified'::fix_record_status
             AND b.consecutive_passes < b.required_passes
          THEN format('Needs %s more passing trial(s) in a row (%s of %s)',
                      b.required_passes - b.consecutive_passes, b.consecutive_passes, b.required_passes) END,
        CASE WHEN b.req_indep AND NOT b.ovr_active AND NOT b.indep_pass
          THEN 'No passing trial logged by anyone other than the creator' END,
        CASE WHEN b.req_indep AND NOT b.ovr_active AND b.verified_by IS NOT NULL AND b.verified_by = b.created_by
          THEN 'Creator verified their own fix' END,
        CASE WHEN b.total_fails > 0 AND b.status <> 'verified'::fix_record_status
          THEN format('%s failed trial(s) recorded', b.total_fails) END
      ], NULL)
    )
  FROM base b
  LEFT JOIN public.profiles cp ON cp.user_id = b.created_by
  LEFT JOIN public.profiles vp ON vp.user_id = b.verified_by
  LEFT JOIN public.profiles op ON op.user_id = b.sod_override_by
  ORDER BY b.created_at DESC;
END;
$function$;

REVOKE ALL ON FUNCTION public.fix_verification_audit(timestamptz, timestamptz, uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.fix_verification_audit(timestamptz, timestamptz, uuid) TO authenticated;