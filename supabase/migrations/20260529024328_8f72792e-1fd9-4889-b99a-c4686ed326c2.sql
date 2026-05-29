
-- 1. Attachments table
CREATE TABLE public.attachments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  issue_id UUID NULL,
  fix_id UUID NULL,
  uploaded_by UUID NOT NULL,
  storage_path TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size INTEGER NOT NULL DEFAULT 0,
  caption TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT attachments_target_check CHECK (
    (issue_id IS NOT NULL AND fix_id IS NULL) OR
    (issue_id IS NULL AND fix_id IS NOT NULL)
  )
);

CREATE INDEX idx_attachments_issue ON public.attachments(issue_id) WHERE issue_id IS NOT NULL;
CREATE INDEX idx_attachments_fix ON public.attachments(fix_id) WHERE fix_id IS NOT NULL;
CREATE INDEX idx_attachments_tenant ON public.attachments(tenant_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.attachments TO authenticated;
GRANT ALL ON public.attachments TO service_role;

ALTER TABLE public.attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View attachments in accessible issues/fixes"
ON public.attachments FOR SELECT TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR (issue_id IS NOT NULL AND can_access_issue(issue_id, auth.uid()))
  OR (fix_id IS NOT NULL AND tenant_id = get_user_tenant_id(auth.uid()))
);

CREATE POLICY "Upload attachments in own tenant"
ON public.attachments FOR INSERT TO authenticated
WITH CHECK (
  uploaded_by = auth.uid()
  AND (
    has_role(auth.uid(), 'super_admin'::app_role)
    OR (
      tenant_id = get_user_tenant_id(auth.uid())
      AND (
        (issue_id IS NOT NULL AND can_access_issue(issue_id, auth.uid()))
        OR (fix_id IS NOT NULL)
      )
    )
  )
);

CREATE POLICY "Delete own attachments or admin"
ON public.attachments FOR DELETE TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role)
  OR uploaded_by = auth.uid()
  OR (has_role(auth.uid(), 'admin'::app_role) AND tenant_id = get_user_tenant_id(auth.uid()))
);

-- 2. Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('attachments', 'attachments', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Attachments public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'attachments');

CREATE POLICY "Authenticated can upload attachments"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'attachments');

CREATE POLICY "Owners can delete own attachments"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'attachments' AND owner = auth.uid());
