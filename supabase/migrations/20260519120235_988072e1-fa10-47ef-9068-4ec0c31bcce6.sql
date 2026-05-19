-- Allow supervisors and managers to manage shift tasks (matches app-level permissions)
DROP POLICY IF EXISTS "Supervisors+ can create shift task lists" ON public.shift_task_lists;
DROP POLICY IF EXISTS "Supervisors+ can update shift task lists" ON public.shift_task_lists;
DROP POLICY IF EXISTS "Supervisors+ can delete shift task lists" ON public.shift_task_lists;

CREATE POLICY "Supervisors+ can create shift task lists"
ON public.shift_task_lists FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = created_by AND (
    has_role(auth.uid(), 'super_admin') OR
    ((has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager') OR has_role(auth.uid(), 'supervisor'))
      AND tenant_id = get_user_tenant_id(auth.uid()))
  )
);

CREATE POLICY "Supervisors+ can update shift task lists"
ON public.shift_task_lists FOR UPDATE TO authenticated
USING (
  has_role(auth.uid(), 'super_admin') OR
  ((has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager') OR has_role(auth.uid(), 'supervisor'))
    AND tenant_id = get_user_tenant_id(auth.uid()))
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin') OR
  ((has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager') OR has_role(auth.uid(), 'supervisor'))
    AND tenant_id = get_user_tenant_id(auth.uid()))
);

CREATE POLICY "Supervisors+ can delete shift task lists"
ON public.shift_task_lists FOR DELETE TO authenticated
USING (
  has_role(auth.uid(), 'super_admin') OR
  ((has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager') OR has_role(auth.uid(), 'supervisor'))
    AND tenant_id = get_user_tenant_id(auth.uid()))
);

DROP POLICY IF EXISTS "Supervisors+ can create shift task items" ON public.shift_task_items;
DROP POLICY IF EXISTS "Supervisors+ can delete shift task items" ON public.shift_task_items;

CREATE POLICY "Supervisors+ can create shift task items"
ON public.shift_task_items FOR INSERT TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM shift_task_lists stl
  WHERE stl.id = shift_task_items.task_list_id
    AND (
      has_role(auth.uid(), 'super_admin') OR
      ((has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager') OR has_role(auth.uid(), 'supervisor'))
        AND stl.tenant_id = get_user_tenant_id(auth.uid()))
    )
));

CREATE POLICY "Supervisors+ can delete shift task items"
ON public.shift_task_items FOR DELETE TO authenticated
USING (EXISTS (
  SELECT 1 FROM shift_task_lists stl
  WHERE stl.id = shift_task_items.task_list_id
    AND (
      has_role(auth.uid(), 'super_admin') OR
      ((has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager') OR has_role(auth.uid(), 'supervisor'))
        AND stl.tenant_id = get_user_tenant_id(auth.uid()))
    )
));