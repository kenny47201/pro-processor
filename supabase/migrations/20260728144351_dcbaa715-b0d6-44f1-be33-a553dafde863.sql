
-- Enums
CREATE TYPE public.machine_status AS ENUM ('active','idle','down','retired');
CREATE TYPE public.mold_status AS ENUM ('active','in_repair','retired');

-- MACHINES
CREATE TABLE public.machines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  facility_id uuid REFERENCES public.facilities(id) ON DELETE SET NULL,
  name text NOT NULL,
  asset_tag text,
  manufacturer text,
  model text,
  tonnage numeric,
  shot_size_oz numeric,
  status public.machine_status NOT NULL DEFAULT 'active',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.machines TO authenticated;
GRANT ALL ON public.machines TO service_role;

ALTER TABLE public.machines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "machines_select_tenant" ON public.machines
  FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'super_admin')
    OR tenant_id = public.get_user_tenant_id(auth.uid())
  );

CREATE POLICY "machines_write_managers" ON public.machines
  FOR INSERT TO authenticated
  WITH CHECK (
    tenant_id = public.get_user_tenant_id(auth.uid())
    AND (
      public.has_role(auth.uid(), 'manager')
      OR public.has_role(auth.uid(), 'admin')
      OR public.has_role(auth.uid(), 'super_admin')
    )
  );

CREATE POLICY "machines_update_managers" ON public.machines
  FOR UPDATE TO authenticated
  USING (
    tenant_id = public.get_user_tenant_id(auth.uid())
    AND (
      public.has_role(auth.uid(), 'manager')
      OR public.has_role(auth.uid(), 'admin')
      OR public.has_role(auth.uid(), 'super_admin')
    )
  );

CREATE POLICY "machines_delete_managers" ON public.machines
  FOR DELETE TO authenticated
  USING (
    tenant_id = public.get_user_tenant_id(auth.uid())
    AND (
      public.has_role(auth.uid(), 'manager')
      OR public.has_role(auth.uid(), 'admin')
      OR public.has_role(auth.uid(), 'super_admin')
    )
  );

CREATE TRIGGER update_machines_updated_at
  BEFORE UPDATE ON public.machines
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_machines_tenant ON public.machines(tenant_id);

-- MOLDS
CREATE TABLE public.molds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  facility_id uuid REFERENCES public.facilities(id) ON DELETE SET NULL,
  name text NOT NULL,
  tool_number text,
  cavities integer,
  part_name text,
  status public.mold_status NOT NULL DEFAULT 'active',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.molds TO authenticated;
GRANT ALL ON public.molds TO service_role;

ALTER TABLE public.molds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "molds_select_tenant" ON public.molds
  FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'super_admin')
    OR tenant_id = public.get_user_tenant_id(auth.uid())
  );

CREATE POLICY "molds_write_managers" ON public.molds
  FOR INSERT TO authenticated
  WITH CHECK (
    tenant_id = public.get_user_tenant_id(auth.uid())
    AND (
      public.has_role(auth.uid(), 'manager')
      OR public.has_role(auth.uid(), 'admin')
      OR public.has_role(auth.uid(), 'super_admin')
    )
  );

CREATE POLICY "molds_update_managers" ON public.molds
  FOR UPDATE TO authenticated
  USING (
    tenant_id = public.get_user_tenant_id(auth.uid())
    AND (
      public.has_role(auth.uid(), 'manager')
      OR public.has_role(auth.uid(), 'admin')
      OR public.has_role(auth.uid(), 'super_admin')
    )
  );

CREATE POLICY "molds_delete_managers" ON public.molds
  FOR DELETE TO authenticated
  USING (
    tenant_id = public.get_user_tenant_id(auth.uid())
    AND (
      public.has_role(auth.uid(), 'manager')
      OR public.has_role(auth.uid(), 'admin')
      OR public.has_role(auth.uid(), 'super_admin')
    )
  );

CREATE TRIGGER update_molds_updated_at
  BEFORE UPDATE ON public.molds
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_molds_tenant ON public.molds(tenant_id);

-- FKs on existing tables
ALTER TABLE public.issues
  ADD CONSTRAINT issues_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.machines(id) ON DELETE SET NULL,
  ADD CONSTRAINT issues_mold_id_fkey FOREIGN KEY (mold_id) REFERENCES public.molds(id) ON DELETE SET NULL;

ALTER TABLE public.knowledge_fixes
  ADD COLUMN machine_id uuid REFERENCES public.machines(id) ON DELETE SET NULL,
  ADD COLUMN mold_id uuid REFERENCES public.molds(id) ON DELETE SET NULL;

ALTER TABLE public.fix_trials
  ADD COLUMN machine_id uuid REFERENCES public.machines(id) ON DELETE SET NULL,
  ADD COLUMN mold_id uuid REFERENCES public.molds(id) ON DELETE SET NULL;
