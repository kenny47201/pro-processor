
ALTER TABLE public.shift_task_items
  ADD COLUMN verified_by uuid,
  ADD COLUMN verified_at timestamp with time zone;
