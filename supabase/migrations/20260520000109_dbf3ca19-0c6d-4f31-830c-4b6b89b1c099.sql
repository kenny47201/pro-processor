CREATE OR REPLACE FUNCTION public.can_access_conversation(_conv uuid, _user uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.conversations c
    WHERE c.id = _conv
      AND (
        public.has_role(_user, 'super_admin'::app_role)
        OR c.created_by = _user
        OR (c.visibility = 'open'::conversation_visibility AND c.tenant_id = public.get_user_tenant_id(_user))
        OR public.is_conversation_participant(_conv, _user)
      )
  )
$$;

DROP POLICY IF EXISTS "View conversations in tenant or as participant" ON public.conversations;

CREATE POLICY "View conversations in tenant or as participant"
ON public.conversations
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin'::app_role)
  OR created_by = auth.uid()
  OR (visibility = 'open'::conversation_visibility AND tenant_id = public.get_user_tenant_id(auth.uid()))
  OR public.is_conversation_participant(id, auth.uid())
);

DROP POLICY IF EXISTS "Send messages in accessible conversations" ON public.conversation_messages;

CREATE POLICY "Send messages in accessible conversations"
ON public.conversation_messages
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND public.can_access_conversation(conversation_id, auth.uid())
);