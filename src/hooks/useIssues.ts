import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export type IssueCategory = 'process' | 'maintenance' | 'tooling' | 'quality';
export type IssuePriority = 'low' | 'medium' | 'high' | 'critical';
export type IssueStatus = 'open' | 'in_progress' | 'needs_verification' | 'closed';
export type IssueEventAction =
  | 'created' | 'assigned' | 'status_change' | 'priority_change'
  | 'comment' | 'fix_added' | 'escalated' | 'watcher_added' | 'watcher_removed';
export type SignOffDecision = 'approved' | 'rejected' | 'needs_work';

export interface Issue {
  id: string;
  tenant_id: string;
  facility_id: string | null;
  linked_conversation_id: string | null;
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
  status: IssueStatus;
  asset_id: string | null;
  material_id: string | null;
  mold_id: string | null;
  owner_id: string | null;
  created_by: string;
  due_by: string | null;
  closed_at: string | null;
  closed_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface IssueEvent {
  id: string;
  issue_id: string;
  actor_id: string;
  action: IssueEventAction;
  notes: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export function useIssues(filters?: { status?: IssueStatus; category?: IssueCategory }) {
  const qc = useQueryClient();

  useEffect(() => {
    const ch = supabase
      .channel('issues-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'issues' }, () => {
        qc.invalidateQueries({ queryKey: ['issues'] });
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [qc]);

  return useQuery({
    queryKey: ['issues', filters],
    queryFn: async () => {
      let q = supabase.from('issues').select('*').order('created_at', { ascending: false });
      if (filters?.status) q = q.eq('status', filters.status);
      if (filters?.category) q = q.eq('category', filters.category);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Issue[];
    },
  });
}

export function useIssue(id: string | undefined) {
  const qc = useQueryClient();

  useEffect(() => {
    if (!id) return;
    const ch = supabase
      .channel(`issue-${id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'issues', filter: `id=eq.${id}` },
        () => qc.invalidateQueries({ queryKey: ['issue', id] }))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'issue_events', filter: `issue_id=eq.${id}` },
        () => qc.invalidateQueries({ queryKey: ['issue-events', id] }))
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [id, qc]);

  return useQuery({
    queryKey: ['issue', id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase.from('issues').select('*').eq('id', id!).maybeSingle();
      if (error) throw error;
      return data as Issue | null;
    },
  });
}

export function useIssueEvents(issueId: string | undefined) {
  return useQuery({
    queryKey: ['issue-events', issueId],
    enabled: !!issueId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('issue_events')
        .select('*')
        .eq('issue_id', issueId!)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data ?? []) as IssueEvent[];
    },
  });
}

export function useCreateIssue() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      tenant_id: string;
      facility_id?: string | null;
      created_by: string;
      title: string;
      description: string;
      category: IssueCategory;
      priority: IssuePriority;
      owner_id?: string | null;
      due_by?: string | null;
    }) => {
      const { data, error } = await supabase.from('issues').insert(input).select().single();
      if (error) throw error;
      // log creation event
      await supabase.from('issue_events').insert({
        issue_id: data.id,
        actor_id: input.created_by,
        action: 'created',
        notes: null,
      });
      return data as Issue;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['issues'] }),
  });
}

export function useUpdateIssue() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patch, event }: {
      id: string;
      patch: Partial<Issue>;
      event?: { actor_id: string; action: IssueEventAction; notes?: string };
    }) => {
      const { error } = await supabase.from('issues').update(patch).eq('id', id);
      if (error) throw error;
      if (event) {
        await supabase.from('issue_events').insert({
          issue_id: id,
          actor_id: event.actor_id,
          action: event.action,
          notes: event.notes ?? null,
        });
      }
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ['issue', vars.id] });
      qc.invalidateQueries({ queryKey: ['issues'] });
      qc.invalidateQueries({ queryKey: ['issue-events', vars.id] });
    },
  });
}

export function usePostComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ issue_id, actor_id, notes }: { issue_id: string; actor_id: string; notes: string }) => {
      const { error } = await supabase.from('issue_events').insert({
        issue_id, actor_id, action: 'comment', notes,
      });
      if (error) throw error;
    },
    onSuccess: (_d, vars) => qc.invalidateQueries({ queryKey: ['issue-events', vars.issue_id] }),
  });
}

export function useSignOff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ issue_id, manager_id, decision, notes }: {
      issue_id: string; manager_id: string; decision: SignOffDecision; notes?: string;
    }) => {
      const { error } = await supabase.from('issue_signoffs').insert({
        issue_id, manager_id, decision, notes: notes ?? null,
      });
      if (error) throw error;
      if (decision === 'approved') {
        await supabase.from('issues').update({
          status: 'closed',
          closed_at: new Date().toISOString(),
          closed_by: manager_id,
        }).eq('id', issue_id);
      }
      await supabase.from('issue_events').insert({
        issue_id, actor_id: manager_id, action: 'status_change',
        notes: `Sign-off: ${decision}${notes ? ` — ${notes}` : ''}`,
      });
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ['issue', vars.issue_id] });
      qc.invalidateQueries({ queryKey: ['issue-events', vars.issue_id] });
      qc.invalidateQueries({ queryKey: ['issues'] });
    },
  });
}
