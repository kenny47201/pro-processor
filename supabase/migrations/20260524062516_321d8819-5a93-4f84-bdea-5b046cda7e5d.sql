
-- Enums
CREATE TYPE public.issue_category AS ENUM ('process', 'maintenance', 'tooling', 'quality');
CREATE TYPE public.issue_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.issue_status AS ENUM ('open', 'in_progress', 'needs_verification', 'closed');
CREATE TYPE public.issue_event_action AS ENUM ('created', 'assigned', 'status_change', 'priority_change', 'comment', 'fix_added', 'escalated', 'watcher_added', 'watcher_removed');
CREATE TYPE public.signoff_decision AS ENUM ('approved', 'rejected', 'needs_work');

-- Issues table
CREATE TABLE public.issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  facility_id UUID,
  linked_conversation_id UUID,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category public.issue_category NOT NULL DEFAULT 'process',
  priority public.issue_priority NOT NULL DEFAULT 'medium',
  status public.issue_status NOT NULL DEFAULT 'open',
  asset_id UUID,
  material_id UUID,
  mold_id UUID,
  owner_id UUID,
  created_by UUID NOT NULL,
  due_by TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,
  closed_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_issues_tenant ON public.issues(tenant_id);
CREATE INDEX idx_issues_status ON public.issues(status);
CREATE INDEX idx_issues_owner ON public.issues(owner_id);

ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View issues in tenant" ON public.issues FOR SELECT TO authenticated
USING (tenant_id = public.get_user_tenant_id(auth.uid()) OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Create issues in own tenant" ON public.issues FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = created_by
  AND (
    public.has_role(auth.uid(), 'super_admin')
    OR tenant_id = public.get_user_tenant_id(auth.uid())
  )
);

CREATE POLICY "Update issues - reporter or supervisors+" ON public.issues FOR UPDATE TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin')
  OR (
    tenant_id = public.get_user_tenant_id(auth.uid())
    AND (
      created_by = auth.uid()
      OR public.has_role(auth.uid(), 'supervisor')
      OR public.has_role(auth.uid(), 'manager')
      OR public.has_role(auth.uid(), 'admin')
    )
  )
)
WITH CHECK (
  public.has_role(auth.uid(), 'super_admin')
  OR (
    tenant_id = public.get_user_tenant_id(auth.uid())
    AND (
      created_by = auth.uid()
      OR public.has_role(auth.uid(), 'supervisor')
      OR public.has_role(auth.uid(), 'manager')
      OR public.has_role(auth.uid(), 'admin')
    )
  )
);

CREATE POLICY "Delete issues - super admin only" ON public.issues FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

CREATE TRIGGER trg_issues_updated_at
BEFORE UPDATE ON public.issues
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Helper: can user act on issue (tenant member or super admin)
CREATE OR REPLACE FUNCTION public.can_access_issue(_issue UUID, _user UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.issues i
    WHERE i.id = _issue
      AND (
        public.has_role(_user, 'super_admin')
        OR i.tenant_id = public.get_user_tenant_id(_user)
      )
  )
$$;

-- Watchers
CREATE TABLE public.issue_watchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (issue_id, user_id)
);
ALTER TABLE public.issue_watchers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View watchers in tenant" ON public.issue_watchers FOR SELECT TO authenticated
USING (public.can_access_issue(issue_id, auth.uid()));

CREATE POLICY "Add watcher self or supervisors+" ON public.issue_watchers FOR INSERT TO authenticated
WITH CHECK (
  public.can_access_issue(issue_id, auth.uid())
  AND (
    user_id = auth.uid()
    OR public.has_role(auth.uid(), 'supervisor')
    OR public.has_role(auth.uid(), 'manager')
    OR public.has_role(auth.uid(), 'admin')
    OR public.has_role(auth.uid(), 'super_admin')
  )
);

CREATE POLICY "Remove watcher self or supervisors+" ON public.issue_watchers FOR DELETE TO authenticated
USING (
  user_id = auth.uid()
  OR public.has_role(auth.uid(), 'supervisor')
  OR public.has_role(auth.uid(), 'manager')
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'super_admin')
);

-- Events
CREATE TABLE public.issue_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
  actor_id UUID NOT NULL,
  action public.issue_event_action NOT NULL,
  notes TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_issue_events_issue ON public.issue_events(issue_id);
ALTER TABLE public.issue_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View events in accessible issues" ON public.issue_events FOR SELECT TO authenticated
USING (public.can_access_issue(issue_id, auth.uid()));

CREATE POLICY "Post events on accessible issues" ON public.issue_events FOR INSERT TO authenticated
WITH CHECK (actor_id = auth.uid() AND public.can_access_issue(issue_id, auth.uid()));

CREATE POLICY "Delete own comment events" ON public.issue_events FOR DELETE TO authenticated
USING (
  actor_id = auth.uid()
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'super_admin')
);

-- Sign-offs
CREATE TABLE public.issue_signoffs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
  manager_id UUID NOT NULL,
  decision public.signoff_decision NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_issue_signoffs_issue ON public.issue_signoffs(issue_id);
ALTER TABLE public.issue_signoffs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View signoffs in accessible issues" ON public.issue_signoffs FOR SELECT TO authenticated
USING (public.can_access_issue(issue_id, auth.uid()));

CREATE POLICY "Managers+ can sign off" ON public.issue_signoffs FOR INSERT TO authenticated
WITH CHECK (
  manager_id = auth.uid()
  AND public.can_access_issue(issue_id, auth.uid())
  AND (
    public.has_role(auth.uid(), 'manager')
    OR public.has_role(auth.uid(), 'admin')
    OR public.has_role(auth.uid(), 'super_admin')
  )
);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.issues;
ALTER PUBLICATION supabase_realtime ADD TABLE public.issue_events;
