
-- Conversations schema
CREATE TYPE public.conversation_visibility AS ENUM ('open', 'private');
CREATE TYPE public.conversation_status AS ENUM ('active', 'archived');

CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  facility_id UUID,
  title TEXT NOT NULL,
  visibility public.conversation_visibility NOT NULL DEFAULT 'open',
  status public.conversation_status NOT NULL DEFAULT 'active',
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.conversation_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(conversation_id, user_id)
);

CREATE TABLE public.conversation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_conv_messages_conv ON public.conversation_messages(conversation_id, created_at);
CREATE INDEX idx_conv_participants_user ON public.conversation_participants(user_id);
CREATE INDEX idx_conv_participants_conv ON public.conversation_participants(conversation_id);
CREATE INDEX idx_conversations_tenant ON public.conversations(tenant_id, last_message_at DESC);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_messages ENABLE ROW LEVEL SECURITY;

-- Security definer to avoid recursion on participants
CREATE OR REPLACE FUNCTION public.is_conversation_participant(_conv UUID, _user UUID)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.conversation_participants
    WHERE conversation_id = _conv AND user_id = _user
  )
$$;

CREATE OR REPLACE FUNCTION public.can_access_conversation(_conv UUID, _user UUID)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.conversations c
    WHERE c.id = _conv
      AND (
        public.has_role(_user, 'super_admin'::app_role)
        OR (c.visibility = 'open' AND c.tenant_id = public.get_user_tenant_id(_user))
        OR public.is_conversation_participant(_conv, _user)
      )
  )
$$;

-- conversations policies
CREATE POLICY "View conversations in tenant or as participant"
ON public.conversations FOR SELECT TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR (visibility = 'open' AND tenant_id = get_user_tenant_id(auth.uid()))
  OR is_conversation_participant(id, auth.uid())
);

CREATE POLICY "Create conversations in own tenant"
ON public.conversations FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = created_by
  AND (has_role(auth.uid(), 'super_admin'::app_role) OR tenant_id = get_user_tenant_id(auth.uid()))
);

CREATE POLICY "Update conversations creator or admin"
ON public.conversations FOR UPDATE TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR created_by = auth.uid()
  OR (has_role(auth.uid(), 'admin'::app_role) AND tenant_id = get_user_tenant_id(auth.uid()))
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR created_by = auth.uid()
  OR (has_role(auth.uid(), 'admin'::app_role) AND tenant_id = get_user_tenant_id(auth.uid()))
);

CREATE POLICY "Delete conversations creator or admin"
ON public.conversations FOR DELETE TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR created_by = auth.uid()
  OR (has_role(auth.uid(), 'admin'::app_role) AND tenant_id = get_user_tenant_id(auth.uid()))
);

-- participants policies
CREATE POLICY "View participants of accessible conversations"
ON public.conversation_participants FOR SELECT TO authenticated
USING (can_access_conversation(conversation_id, auth.uid()));

CREATE POLICY "Add participants if creator/admin or self-join open"
ON public.conversation_participants FOR INSERT TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR EXISTS (
    SELECT 1 FROM public.conversations c
    WHERE c.id = conversation_id
      AND (
        c.created_by = auth.uid()
        OR (has_role(auth.uid(), 'admin'::app_role) AND c.tenant_id = get_user_tenant_id(auth.uid()))
        OR (c.visibility = 'open' AND c.tenant_id = get_user_tenant_id(auth.uid()) AND user_id = auth.uid())
      )
  )
);

CREATE POLICY "Remove participants creator/admin or self"
ON public.conversation_participants FOR DELETE TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR user_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM public.conversations c
    WHERE c.id = conversation_id
      AND (c.created_by = auth.uid()
        OR (has_role(auth.uid(), 'admin'::app_role) AND c.tenant_id = get_user_tenant_id(auth.uid())))
  )
);

-- messages policies
CREATE POLICY "View messages in accessible conversations"
ON public.conversation_messages FOR SELECT TO authenticated
USING (can_access_conversation(conversation_id, auth.uid()));

CREATE POLICY "Send messages in accessible conversations"
ON public.conversation_messages FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND can_access_conversation(conversation_id, auth.uid())
);

CREATE POLICY "Edit own messages"
ON public.conversation_messages FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Delete own messages or admin"
ON public.conversation_messages FOR DELETE TO authenticated
USING (
  auth.uid() = user_id
  OR has_role(auth.uid(), 'super_admin'::app_role)
  OR EXISTS (
    SELECT 1 FROM public.conversations c
    WHERE c.id = conversation_id
      AND has_role(auth.uid(), 'admin'::app_role)
      AND c.tenant_id = get_user_tenant_id(auth.uid())
  )
);

-- Trigger: bump last_message_at + add creator as participant
CREATE OR REPLACE FUNCTION public.bump_conversation_on_message()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  UPDATE public.conversations
  SET last_message_at = NEW.created_at, updated_at = now()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_bump_conversation
AFTER INSERT ON public.conversation_messages
FOR EACH ROW EXECUTE FUNCTION public.bump_conversation_on_message();

CREATE OR REPLACE FUNCTION public.add_creator_as_participant()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  INSERT INTO public.conversation_participants (conversation_id, user_id)
  VALUES (NEW.id, NEW.created_by)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_add_creator_participant
AFTER INSERT ON public.conversations
FOR EACH ROW EXECUTE FUNCTION public.add_creator_as_participant();

CREATE TRIGGER trg_update_conversations_updated
BEFORE UPDATE ON public.conversations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Realtime
ALTER TABLE public.conversations REPLICA IDENTITY FULL;
ALTER TABLE public.conversation_messages REPLICA IDENTITY FULL;
ALTER TABLE public.conversation_participants REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversation_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversation_participants;
