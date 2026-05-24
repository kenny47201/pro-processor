-- Status enum for fix workflow
CREATE TYPE public.fix_record_status AS ENUM ('draft', 'committed', 'verified');

-- Main table
CREATE TABLE public.knowledge_fixes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  facility_id UUID,
  created_by UUID NOT NULL,
  status public.fix_record_status NOT NULL DEFAULT 'draft',

  -- Categorization inputs
  title TEXT NOT NULL,
  defect TEXT,
  tool TEXT,
  press TEXT,
  material TEXT,
  color TEXT,
  additive TEXT,
  fix_summary TEXT,

  -- Core write-up
  problem TEXT NOT NULL DEFAULT '',
  root_cause TEXT NOT NULL DEFAULT '',
  solution TEXT NOT NULL DEFAULT '',

  -- Process parameter changes: array of { param, before, after, units }
  parameter_changes JSONB NOT NULL DEFAULT '[]'::jsonb,
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::text[],

  -- Workflow
  committed_by UUID,
  committed_at TIMESTAMPTZ,
  verified_by UUID,
  verified_at TIMESTAMPTZ,
  verification_notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_knowledge_fixes_tenant ON public.knowledge_fixes(tenant_id);
CREATE INDEX idx_knowledge_fixes_status ON public.knowledge_fixes(tenant_id, status);
CREATE INDEX idx_knowledge_fixes_defect ON public.knowledge_fixes(tenant_id, defect);

ALTER TABLE public.knowledge_fixes ENABLE ROW LEVEL SECURITY;

-- SELECT: tenant members or super admin
CREATE POLICY "View fixes in tenant"
ON public.knowledge_fixes FOR SELECT TO authenticated
USING (tenant_id = public.get_user_tenant_id(auth.uid()) OR public.has_role(auth.uid(), 'super_admin'));

-- INSERT: tenant members with create-fix roles
CREATE POLICY "Create fixes in own tenant"
ON public.knowledge_fixes FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = created_by
  AND (
    public.has_role(auth.uid(), 'super_admin')
    OR (
      tenant_id = public.get_user_tenant_id(auth.uid())
      AND (
        public.has_role(auth.uid(), 'maintenance_tech')
        OR public.has_role(auth.uid(), 'tooling_specialist')
        OR public.has_role(auth.uid(), 'supervisor')
        OR public.has_role(auth.uid(), 'manager')
        OR public.has_role(auth.uid(), 'admin')
      )
    )
  )
);

-- UPDATE: creator (own drafts) or manager+/super_admin in tenant
CREATE POLICY "Update fixes - creator or manager+"
ON public.knowledge_fixes FOR UPDATE TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin')
  OR (
    tenant_id = public.get_user_tenant_id(auth.uid())
    AND (
      created_by = auth.uid()
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
      OR public.has_role(auth.uid(), 'manager')
      OR public.has_role(auth.uid(), 'admin')
    )
  )
);

-- DELETE: admin or super_admin
CREATE POLICY "Delete fixes - admin only"
ON public.knowledge_fixes FOR DELETE TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin')
  OR (public.has_role(auth.uid(), 'admin') AND tenant_id = public.get_user_tenant_id(auth.uid()))
);

-- updated_at trigger
CREATE TRIGGER trg_knowledge_fixes_updated_at
BEFORE UPDATE ON public.knowledge_fixes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER PUBLICATION supabase_realtime ADD TABLE public.knowledge_fixes;