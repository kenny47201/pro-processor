
-- fix_trials: scope admin delete to same tenant
DROP POLICY IF EXISTS "Delete own trials or admin" ON public.fix_trials;
CREATE POLICY "Delete own trials or admin"
ON public.fix_trials FOR DELETE
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR logged_by = auth.uid()
  OR (has_role(auth.uid(), 'admin'::app_role) AND tenant_id = get_user_tenant_id(auth.uid()))
);

-- issue_events: scope delete via can_access_issue
DROP POLICY IF EXISTS "Delete own comment events" ON public.issue_events;
CREATE POLICY "Delete own comment events"
ON public.issue_events FOR DELETE
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR (
    can_access_issue(issue_id, auth.uid())
    AND (actor_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role))
  )
);

-- issue_watchers: scope delete via can_access_issue
DROP POLICY IF EXISTS "Remove watcher self or supervisors+" ON public.issue_watchers;
CREATE POLICY "Remove watcher self or supervisors+"
ON public.issue_watchers FOR DELETE
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR (
    can_access_issue(issue_id, auth.uid())
    AND (
      user_id = auth.uid()
      OR has_role(auth.uid(), 'supervisor'::app_role)
      OR has_role(auth.uid(), 'manager'::app_role)
      OR has_role(auth.uid(), 'admin'::app_role)
    )
  )
);

-- tenants: scope admin ALL to own tenant
DROP POLICY IF EXISTS "Admins can manage tenants" ON public.tenants;
CREATE POLICY "Super admins can manage all tenants"
ON public.tenants FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admins can manage their own tenant"
ON public.tenants FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) AND id = get_user_tenant_id(auth.uid()))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) AND id = get_user_tenant_id(auth.uid()));

-- user_roles: prevent admin from updating existing admin rows
DROP POLICY IF EXISTS "Admins can update roles in their tenant" ON public.user_roles;
CREATE POLICY "Admins can update roles in their tenant"
ON public.user_roles FOR UPDATE
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role)
  AND role <> 'super_admin'::app_role
  AND role <> 'admin'::app_role
  AND get_user_tenant_id(user_id) = get_user_tenant_id(auth.uid())
  AND get_user_tenant_id(auth.uid()) IS NOT NULL
)
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role)
  AND role <> 'super_admin'::app_role
  AND role <> 'admin'::app_role
  AND get_user_tenant_id(user_id) = get_user_tenant_id(auth.uid())
);
