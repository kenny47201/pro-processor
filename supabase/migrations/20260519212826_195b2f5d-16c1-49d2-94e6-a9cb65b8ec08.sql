
DROP POLICY IF EXISTS "Create conversations in own tenant" ON public.conversations;
DROP POLICY IF EXISTS "Update conversations creator or admin" ON public.conversations;
DROP POLICY IF EXISTS "Delete conversations creator or admin" ON public.conversations;

CREATE POLICY "Create conversations in own tenant"
ON public.conversations FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = created_by
  AND (
    has_role(auth.uid(), 'super_admin'::app_role)
    OR tenant_id IN (SELECT tenant_id FROM public.profiles WHERE user_id = auth.uid())
  )
);

CREATE POLICY "Update conversations creator or admin"
ON public.conversations FOR UPDATE TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR created_by = auth.uid()
  OR (has_role(auth.uid(), 'admin'::app_role) AND tenant_id IN (SELECT tenant_id FROM public.profiles WHERE user_id = auth.uid()))
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR created_by = auth.uid()
  OR (has_role(auth.uid(), 'admin'::app_role) AND tenant_id IN (SELECT tenant_id FROM public.profiles WHERE user_id = auth.uid()))
);

CREATE POLICY "Delete conversations creator or admin"
ON public.conversations FOR DELETE TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR created_by = auth.uid()
  OR (has_role(auth.uid(), 'admin'::app_role) AND tenant_id IN (SELECT tenant_id FROM public.profiles WHERE user_id = auth.uid()))
);
