-- Create shift task list status enum
CREATE TYPE public.shift_task_list_status AS ENUM ('active', 'completed', 'cancelled');

-- Create task priority enum
CREATE TYPE public.task_priority AS ENUM ('normal', 'high', 'urgent');

-- Create task item status enum
CREATE TYPE public.task_item_status AS ENUM ('pending', 'in_progress', 'done', 'skipped');

-- Create shift_task_lists table
CREATE TABLE public.shift_task_lists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  facility_id UUID,
  created_by UUID NOT NULL,
  title TEXT NOT NULL,
  notes TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  shift TEXT NOT NULL DEFAULT 'Day',
  status shift_task_list_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create shift_task_items table
CREATE TABLE public.shift_task_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_list_id UUID NOT NULL REFERENCES public.shift_task_lists(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  priority task_priority NOT NULL DEFAULT 'normal',
  status task_item_status NOT NULL DEFAULT 'pending',
  assigned_to_type TEXT DEFAULT 'user',
  assigned_to_id TEXT,
  completed_by UUID,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.shift_task_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shift_task_items ENABLE ROW LEVEL SECURITY;

-- RLS for shift_task_lists
CREATE POLICY "Authenticated users can view shift task lists"
ON public.shift_task_lists FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Supervisors+ can create shift task lists"
ON public.shift_task_lists FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = created_by
  AND (
    has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'super_admin'::app_role)
  )
);

CREATE POLICY "Supervisors+ can update shift task lists"
ON public.shift_task_lists FOR UPDATE TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role)
  OR has_role(auth.uid(), 'super_admin'::app_role)
);

CREATE POLICY "Supervisors+ can delete shift task lists"
ON public.shift_task_lists FOR DELETE TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role)
  OR has_role(auth.uid(), 'super_admin'::app_role)
);

-- RLS for shift_task_items
CREATE POLICY "Authenticated users can view shift task items"
ON public.shift_task_items FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Supervisors+ can create shift task items"
ON public.shift_task_items FOR INSERT TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role)
  OR has_role(auth.uid(), 'super_admin'::app_role)
);

CREATE POLICY "Authenticated users can update shift task items"
ON public.shift_task_items FOR UPDATE TO authenticated
USING (true);

CREATE POLICY "Supervisors+ can delete shift task items"
ON public.shift_task_items FOR DELETE TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role)
  OR has_role(auth.uid(), 'super_admin'::app_role)
);

-- Indexes
CREATE INDEX idx_shift_task_lists_tenant ON public.shift_task_lists(tenant_id);
CREATE INDEX idx_shift_task_lists_date ON public.shift_task_lists(date DESC);
CREATE INDEX idx_shift_task_items_list ON public.shift_task_items(task_list_id);

-- Timestamps triggers
CREATE TRIGGER update_shift_task_lists_updated_at
BEFORE UPDATE ON public.shift_task_lists
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shift_task_items_updated_at
BEFORE UPDATE ON public.shift_task_items
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.shift_task_lists;
ALTER PUBLICATION supabase_realtime ADD TABLE public.shift_task_items;