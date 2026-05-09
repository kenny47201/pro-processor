
-- facilities: scope admin policy to own tenant
DROP POLICY IF EXISTS "Admins can manage facilities" ON public.facilities;
CREATE POLICY "Admins can manage facilities in their tenant"
ON public.facilities
FOR ALL
TO authenticated
USING (
  (has_role(auth.uid(), 'admin'::app_role) AND tenant_id = get_user_tenant_id(auth.uid()))
  OR has_role(auth.uid(), 'super_admin'::app_role)
)
WITH CHECK (
  (has_role(auth.uid(), 'admin'::app_role) AND tenant_id = get_user_tenant_id(auth.uid()))
  OR has_role(auth.uid(), 'super_admin'::app_role)
);

-- shift_task_lists: tenant-scope update and delete
DROP POLICY IF EXISTS "Supervisors+ can update shift task lists" ON public.shift_task_lists;
CREATE POLICY "Supervisors+ can update shift task lists"
ON public.shift_task_lists
FOR UPDATE
TO authenticated
USING (
  (has_role(auth.uid(), 'admin'::app_role) AND tenant_id = get_user_tenant_id(auth.uid()))
  OR has_role(auth.uid(), 'super_admin'::app_role)
)
WITH CHECK (
  (has_role(auth.uid(), 'admin'::app_role) AND tenant_id = get_user_tenant_id(auth.uid()))
  OR has_role(auth.uid(), 'super_admin'::app_role)
);

DROP POLICY IF EXISTS "Supervisors+ can delete shift task lists" ON public.shift_task_lists;
CREATE POLICY "Supervisors+ can delete shift task lists"
ON public.shift_task_lists
FOR DELETE
TO authenticated
USING (
  (has_role(auth.uid(), 'admin'::app_role) AND tenant_id = get_user_tenant_id(auth.uid()))
  OR has_role(auth.uid(), 'super_admin'::app_role)
);

-- shift_task_items: tenant-scope insert, update, delete
DROP POLICY IF EXISTS "Supervisors+ can create shift task items" ON public.shift_task_items;
CREATE POLICY "Supervisors+ can create shift task items"
ON public.shift_task_items
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.shift_task_lists stl
    WHERE stl.id = shift_task_items.task_list_id
      AND (
        (has_role(auth.uid(), 'admin'::app_role) AND stl.tenant_id = get_user_tenant_id(auth.uid()))
        OR has_role(auth.uid(), 'super_admin'::app_role)
      )
  )
);

DROP POLICY IF EXISTS "Authenticated users can update shift task items" ON public.shift_task_items;
CREATE POLICY "Users can update shift task items in their tenant"
ON public.shift_task_items
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.shift_task_lists stl
    WHERE stl.id = shift_task_items.task_list_id
      AND (stl.tenant_id = get_user_tenant_id(auth.uid()) OR has_role(auth.uid(), 'super_admin'::app_role))
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.shift_task_lists stl
    WHERE stl.id = shift_task_items.task_list_id
      AND (stl.tenant_id = get_user_tenant_id(auth.uid()) OR has_role(auth.uid(), 'super_admin'::app_role))
  )
);

DROP POLICY IF EXISTS "Supervisors+ can delete shift task items" ON public.shift_task_items;
CREATE POLICY "Supervisors+ can delete shift task items"
ON public.shift_task_items
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.shift_task_lists stl
    WHERE stl.id = shift_task_items.task_list_id
      AND (
        (has_role(auth.uid(), 'admin'::app_role) AND stl.tenant_id = get_user_tenant_id(auth.uid()))
        OR has_role(auth.uid(), 'super_admin'::app_role)
      )
  )
);

-- shift_task_activity_log: tenant-scope insert
DROP POLICY IF EXISTS "Authenticated users can insert activity logs" ON public.shift_task_activity_log;
CREATE POLICY "Users can insert activity logs in their tenant"
ON public.shift_task_activity_log
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM public.shift_task_lists stl
    WHERE stl.id = shift_task_activity_log.task_list_id
      AND (stl.tenant_id = get_user_tenant_id(auth.uid()) OR has_role(auth.uid(), 'super_admin'::app_role))
  )
);
