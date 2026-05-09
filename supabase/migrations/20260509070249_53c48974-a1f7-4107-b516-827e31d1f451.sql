
-- 1) Replace the overly broad "Admins can manage roles" policy with tenant-scoped, escalation-safe policies
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- Super admins: full control
CREATE POLICY "Super admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'super_admin'::public.app_role));

-- Admins: INSERT only within own tenant, never grant super_admin
CREATE POLICY "Admins can insert roles in their tenant"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::public.app_role)
  AND role <> 'super_admin'::public.app_role
  AND role <> 'admin'::public.app_role
  AND public.get_user_tenant_id(user_id) = public.get_user_tenant_id(auth.uid())
  AND public.get_user_tenant_id(auth.uid()) IS NOT NULL
);

-- Admins: UPDATE only within own tenant, never escalate to super_admin/admin
CREATE POLICY "Admins can update roles in their tenant"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::public.app_role)
  AND role <> 'super_admin'::public.app_role
  AND public.get_user_tenant_id(user_id) = public.get_user_tenant_id(auth.uid())
  AND public.get_user_tenant_id(auth.uid()) IS NOT NULL
)
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::public.app_role)
  AND role <> 'super_admin'::public.app_role
  AND role <> 'admin'::public.app_role
  AND public.get_user_tenant_id(user_id) = public.get_user_tenant_id(auth.uid())
);

-- Admins: DELETE only within own tenant, cannot remove super_admin rows
CREATE POLICY "Admins can delete roles in their tenant"
ON public.user_roles
FOR DELETE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::public.app_role)
  AND role <> 'super_admin'::public.app_role
  AND public.get_user_tenant_id(user_id) = public.get_user_tenant_id(auth.uid())
  AND public.get_user_tenant_id(auth.uid()) IS NOT NULL
);

-- 2) Explicit RESTRICTIVE deny for UPDATE/DELETE on activity log to preserve audit integrity
CREATE POLICY "No updates to activity log"
ON public.shift_task_activity_log
AS RESTRICTIVE
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "No deletes from activity log"
ON public.shift_task_activity_log
AS RESTRICTIVE
FOR DELETE
TO authenticated
USING (false);
