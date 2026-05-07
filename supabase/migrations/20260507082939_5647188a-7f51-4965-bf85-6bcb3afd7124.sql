
CREATE TABLE public.shift_task_activity_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_list_id UUID NOT NULL REFERENCES public.shift_task_lists(id) ON DELETE CASCADE,
  task_item_id UUID REFERENCES public.shift_task_items(id) ON DELETE SET NULL,
  user_id UUID NOT NULL,
  action TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.shift_task_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view activity logs"
ON public.shift_task_activity_log
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert activity logs"
ON public.shift_task_activity_log
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_activity_log_task_list ON public.shift_task_activity_log(task_list_id);
CREATE INDEX idx_activity_log_created ON public.shift_task_activity_log(created_at DESC);

ALTER PUBLICATION supabase_realtime ADD TABLE public.shift_task_activity_log;
