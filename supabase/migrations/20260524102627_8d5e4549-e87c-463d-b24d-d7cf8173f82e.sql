-- Counters on knowledge_fixes
ALTER TABLE public.knowledge_fixes
  ADD COLUMN IF NOT EXISTS consecutive_passes integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_passes integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_fails integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS required_passes integer NOT NULL DEFAULT 5;

-- Trial outcome enum
DO $$ BEGIN
  CREATE TYPE public.fix_trial_outcome AS ENUM ('pass', 'fail');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Trials table
CREATE TABLE IF NOT EXISTS public.fix_trials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fix_id uuid NOT NULL REFERENCES public.knowledge_fixes(id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL,
  logged_by uuid NOT NULL,
  outcome public.fix_trial_outcome NOT NULL,
  notes text,
  press text,
  tool text,
  shot_count integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_fix_trials_fix_id ON public.fix_trials(fix_id, created_at DESC);

ALTER TABLE public.fix_trials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View trials in tenant"
  ON public.fix_trials FOR SELECT TO authenticated
  USING (tenant_id = get_user_tenant_id(auth.uid()) OR has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Log trials in own tenant"
  ON public.fix_trials FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = logged_by
    AND (has_role(auth.uid(), 'super_admin') OR tenant_id = get_user_tenant_id(auth.uid()))
  );

CREATE POLICY "Delete own trials or admin"
  ON public.fix_trials FOR DELETE TO authenticated
  USING (
    logged_by = auth.uid()
    OR has_role(auth.uid(), 'admin')
    OR has_role(auth.uid(), 'super_admin')
  );

-- Trigger function to update counters
CREATE OR REPLACE FUNCTION public.apply_fix_trial()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.outcome = 'pass' THEN
    UPDATE public.knowledge_fixes
      SET consecutive_passes = consecutive_passes + 1,
          total_passes = total_passes + 1,
          updated_at = now()
      WHERE id = NEW.fix_id;
  ELSE
    UPDATE public.knowledge_fixes
      SET consecutive_passes = 0,
          total_fails = total_fails + 1,
          updated_at = now()
      WHERE id = NEW.fix_id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_apply_fix_trial ON public.fix_trials;
CREATE TRIGGER trg_apply_fix_trial
  AFTER INSERT ON public.fix_trials
  FOR EACH ROW EXECUTE FUNCTION public.apply_fix_trial();

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.fix_trials;