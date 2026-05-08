import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTenant } from '@/contexts/TenantContext';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export type ShiftTaskList = {
  id: string;
  tenant_id: string;
  facility_id: string | null;
  created_by: string;
  title: string;
  notes: string | null;
  date: string;
  shift: string;
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  creator_name?: string;
  item_count?: number;
  done_count?: number;
};

export type ShiftTaskItem = {
  id: string;
  task_list_id: string;
  text: string;
  priority: 'normal' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'done' | 'skipped';
  assigned_to_type: string | null;
  assigned_to_id: string | null;
  completed_by: string | null;
  completed_at: string | null;
  verified_by: string | null;
  verified_at: string | null;
  notes: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export function useShiftTaskLists() {
  const { currentTenant } = useTenant();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['shift-task-lists', currentTenant?.id],
    queryFn: async () => {
      if (!currentTenant) return [];
      const { data, error } = await supabase
        .from('shift_task_lists')
        .select('*')
        .eq('tenant_id', currentTenant.id)
        .order('date', { ascending: false });
      if (error) throw error;
      return (data || []) as ShiftTaskList[];
    },
    enabled: !!currentTenant,
  });

  // Realtime subscription
  useEffect(() => {
    if (!currentTenant) return;
    const channel = supabase
      .channel('shift-task-lists-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'shift_task_lists',
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['shift-task-lists'] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [currentTenant, queryClient]);

  return query;
}

export function useShiftTaskList(id: string | undefined) {
  return useQuery({
    queryKey: ['shift-task-list', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('shift_task_lists')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as ShiftTaskList;
    },
    enabled: !!id,
  });
}

export function useShiftTaskItems(listId: string | undefined) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['shift-task-items', listId],
    queryFn: async () => {
      if (!listId) return [];
      const { data, error } = await supabase
        .from('shift_task_items')
        .select('*')
        .eq('task_list_id', listId)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return (data || []) as ShiftTaskItem[];
    },
    enabled: !!listId,
  });

  // Realtime subscription
  useEffect(() => {
    if (!listId) return;
    const channel = supabase
      .channel(`shift-task-items-${listId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'shift_task_items',
        filter: `task_list_id=eq.${listId}`,
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['shift-task-items', listId] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [listId, queryClient]);

  return query;
}

export function useCreateShiftTaskList() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: { title: string; notes?: string; date: string; shift: string; tenant_id: string; facility_id?: string; created_by: string }) => {
      const { data, error } = await supabase
        .from('shift_task_lists')
        .insert(input)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shift-task-lists'] });
      toast({ title: 'Task list created' });
    },
    onError: (err: Error) => {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    },
  });
}

export function useUpdateShiftTaskList() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; title?: string; notes?: string; status?: 'active' | 'completed' | 'cancelled' }) => {
      const { error } = await supabase
        .from('shift_task_lists')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shift-task-lists'] });
      queryClient.invalidateQueries({ queryKey: ['shift-task-list'] });
    },
    onError: (err: Error) => {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    },
  });
}

export function useAddShiftTaskItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: { task_list_id: string; text: string; priority?: 'normal' | 'high' | 'urgent'; assigned_to_type?: string; assigned_to_id?: string; sort_order?: number }) => {
      const { data, error } = await supabase
        .from('shift_task_items')
        .insert(input)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['shift-task-items', data.task_list_id] });
    },
    onError: (err: Error) => {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    },
  });
}

export function useUpdateShiftTaskItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, task_list_id, ...updates }: { id: string; task_list_id: string; status?: 'pending' | 'in_progress' | 'done' | 'skipped'; notes?: string; completed_by?: string; completed_at?: string; assigned_to_id?: string | null; verified_by?: string | null; verified_at?: string | null }) => {
      const { error } = await supabase
        .from('shift_task_items')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
      return { task_list_id };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['shift-task-items', data.task_list_id] });
    },
  });
}

export function useDeleteShiftTaskItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, task_list_id }: { id: string; task_list_id: string }) => {
      const { error } = await supabase
        .from('shift_task_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return { task_list_id };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['shift-task-items', data.task_list_id] });
    },
  });
}

export function useTenantProfiles() {
  const { currentTenant } = useTenant();

  return useQuery({
    queryKey: ['tenant-profiles', currentTenant?.id],
    queryFn: async () => {
      if (!currentTenant) return [];
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id, display_name, screen_name')
        .eq('tenant_id', currentTenant.id);
      if (error) throw error;
      return (data || []) as { user_id: string; display_name: string | null; screen_name: string | null }[];
    },
    enabled: !!currentTenant,
  });
}

export type ShiftTaskActivityLog = {
  id: string;
  task_list_id: string;
  task_item_id: string | null;
  user_id: string;
  action: string;
  old_value: string | null;
  new_value: string | null;
  created_at: string;
};

export function useShiftTaskActivityLog(listId: string | undefined) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['shift-task-activity-log', listId],
    queryFn: async () => {
      if (!listId) return [];
      const { data, error } = await supabase
        .from('shift_task_activity_log')
        .select('*')
        .eq('task_list_id', listId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as ShiftTaskActivityLog[];
    },
    enabled: !!listId,
  });

  useEffect(() => {
    if (!listId) return;
    const channel = supabase
      .channel(`shift-task-activity-${listId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'shift_task_activity_log',
        filter: `task_list_id=eq.${listId}`,
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['shift-task-activity-log', listId] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [listId, queryClient]);

  return query;
}

export function useLogShiftTaskActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { task_list_id: string; task_item_id?: string; user_id: string; action: string; old_value?: string; new_value?: string }) => {
      const { error } = await supabase
        .from('shift_task_activity_log')
        .insert({
          task_list_id: input.task_list_id,
          task_item_id: input.task_item_id || null,
          user_id: input.user_id,
          action: input.action,
          old_value: input.old_value || null,
          new_value: input.new_value || null,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shift-task-activity-log'] });
    },
  });
}
