-- Revoke anon execute on security definer functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;

-- Tighten update policy on shift_task_items: users can only update items in lists they can see
DROP POLICY "Authenticated users can update shift task items" ON public.shift_task_items;
CREATE POLICY "Authenticated users can update shift task items"
ON public.shift_task_items FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.shift_task_lists stl
    WHERE stl.id = task_list_id
  )
);