
-- Helper: get current user's tenant
CREATE OR REPLACE FUNCTION public.get_user_tenant_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT tenant_id FROM public.profiles WHERE user_id = _user_id LIMIT 1
$$;

-- TENANTS
DROP POLICY IF EXISTS "Authenticated users can view tenants" ON public.tenants;
CREATE POLICY "Users can view their own tenant"
ON public.tenants FOR SELECT TO authenticated
USING (
  id = public.get_user_tenant_id(auth.uid())
  OR public.has_role(auth.uid(), 'super_admin'::app_role)
);

-- FACILITIES
DROP POLICY IF EXISTS "Authenticated users can view facilities" ON public.facilities;
CREATE POLICY "Users can view facilities in their tenant"
ON public.facilities FOR SELECT TO authenticated
USING (
  tenant_id = public.get_user_tenant_id(auth.uid())
  OR public.has_role(auth.uid(), 'super_admin'::app_role)
);

-- PROFILES
DROP POLICY IF EXISTS "Authenticated users can view profiles" ON public.profiles;
CREATE POLICY "Users can view profiles in their tenant"
ON public.profiles FOR SELECT TO authenticated
USING (
  user_id = auth.uid()
  OR tenant_id = public.get_user_tenant_id(auth.uid())
  OR public.has_role(auth.uid(), 'super_admin'::app_role)
);

-- SHIFT TASK LISTS
DROP POLICY IF EXISTS "Authenticated users can view shift task lists" ON public.shift_task_lists;
CREATE POLICY "Users can view shift task lists in their tenant"
ON public.shift_task_lists FOR SELECT TO authenticated
USING (
  tenant_id = public.get_user_tenant_id(auth.uid())
  OR public.has_role(auth.uid(), 'super_admin'::app_role)
);

-- SHIFT TASK ITEMS (scoped via parent list's tenant)
DROP POLICY IF EXISTS "Authenticated users can view shift task items" ON public.shift_task_items;
CREATE POLICY "Users can view shift task items in their tenant"
ON public.shift_task_items FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.shift_task_lists stl
    WHERE stl.id = shift_task_items.task_list_id
      AND (
        stl.tenant_id = public.get_user_tenant_id(auth.uid())
        OR public.has_role(auth.uid(), 'super_admin'::app_role)
      )
  )
);

-- SHIFT TASK ACTIVITY LOG (scoped via parent list's tenant)
DROP POLICY IF EXISTS "Authenticated users can view activity logs" ON public.shift_task_activity_log;
CREATE POLICY "Users can view activity logs in their tenant"
ON public.shift_task_activity_log FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.shift_task_lists stl
    WHERE stl.id = shift_task_activity_log.task_list_id
      AND (
        stl.tenant_id = public.get_user_tenant_id(auth.uid())
        OR public.has_role(auth.uid(), 'super_admin'::app_role)
      )
  )
);
