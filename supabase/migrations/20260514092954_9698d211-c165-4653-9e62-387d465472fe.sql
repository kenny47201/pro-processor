
DO $$ BEGIN
  CREATE TYPE public.profile_status AS ENUM ('pending', 'active', 'inactive');
EXCEPTION WHEN duplicate_object THEN null; END $$;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS status public.profile_status NOT NULL DEFAULT 'pending';

-- Existing accounts that already have a tenant should be considered active
UPDATE public.profiles SET status = 'active' WHERE tenant_id IS NOT NULL AND status = 'pending';

-- Allow admins to update profiles in their tenant; super_admins anywhere
DROP POLICY IF EXISTS "Admins can update profiles in their tenant" ON public.profiles;
CREATE POLICY "Admins can update profiles in their tenant"
ON public.profiles
FOR UPDATE
TO authenticated
USING (
  (public.has_role(auth.uid(), 'admin') AND tenant_id IS NOT DISTINCT FROM public.get_user_tenant_id(auth.uid()))
  OR public.has_role(auth.uid(), 'super_admin')
)
WITH CHECK (
  (public.has_role(auth.uid(), 'admin') AND tenant_id IS NOT DISTINCT FROM public.get_user_tenant_id(auth.uid()))
  OR public.has_role(auth.uid(), 'super_admin')
);
