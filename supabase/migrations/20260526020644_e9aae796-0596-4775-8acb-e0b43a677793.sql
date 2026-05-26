
-- Department enum
CREATE TYPE public.department AS ENUM ('Processing', 'Tooling', 'Maintenance');

-- Add department to shift_task_lists and conversations
ALTER TABLE public.shift_task_lists ADD COLUMN department public.department;
ALTER TABLE public.conversations ADD COLUMN department public.department;

-- Helper: get user's department from their role
CREATE OR REPLACE FUNCTION public.get_user_department(_user_id uuid)
RETURNS public.department
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT CASE
    WHEN public.has_role(_user_id, 'processor'::app_role) THEN 'Processing'::public.department
    WHEN public.has_role(_user_id, 'tooling_specialist'::app_role) THEN 'Tooling'::public.department
    WHEN public.has_role(_user_id, 'maintenance_tech'::app_role) THEN 'Maintenance'::public.department
    ELSE NULL
  END
$$;

-- Helper: does this user see all departments?
CREATE OR REPLACE FUNCTION public.can_see_all_departments(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    public.has_role(_user_id, 'supervisor'::app_role)
    OR public.has_role(_user_id, 'manager'::app_role)
    OR public.has_role(_user_id, 'admin'::app_role)
    OR public.has_role(_user_id, 'super_admin'::app_role)
$$;

-- ===== SHIFT TASK LISTS =====
DROP POLICY IF EXISTS "Users can view shift task lists in their tenant" ON public.shift_task_lists;
CREATE POLICY "Users can view shift task lists in their tenant/department"
ON public.shift_task_lists FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR (
    tenant_id = get_user_tenant_id(auth.uid())
    AND (
      public.can_see_all_departments(auth.uid())
      OR department IS NULL
      OR department = public.get_user_department(auth.uid())
    )
  )
);

-- ===== CONVERSATIONS =====
DROP POLICY IF EXISTS "View conversations in tenant or as participant" ON public.conversations;
CREATE POLICY "View conversations in tenant or as participant"
ON public.conversations FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR created_by = auth.uid()
  OR is_conversation_participant(id, auth.uid())
  OR (
    visibility = 'open'::conversation_visibility
    AND tenant_id = get_user_tenant_id(auth.uid())
    AND (
      public.can_see_all_departments(auth.uid())
      OR department IS NULL
      OR department = public.get_user_department(auth.uid())
    )
  )
);

-- Update can_access_conversation to honor department filtering for open convos
CREATE OR REPLACE FUNCTION public.can_access_conversation(_conv uuid, _user uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.conversations c
    WHERE c.id = _conv
      AND (
        public.has_role(_user, 'super_admin'::app_role)
        OR c.created_by = _user
        OR public.is_conversation_participant(_conv, _user)
        OR (
          c.visibility = 'open'::conversation_visibility
          AND c.tenant_id = public.get_user_tenant_id(_user)
          AND (
            public.can_see_all_departments(_user)
            OR c.department IS NULL
            OR c.department = public.get_user_department(_user)
          )
        )
      )
  )
$$;
