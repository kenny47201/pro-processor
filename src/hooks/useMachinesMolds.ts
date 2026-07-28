import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type MachineStatus = 'active' | 'idle' | 'down' | 'retired';
export type MoldStatus = 'active' | 'in_repair' | 'retired';

export interface Machine {
  id: string;
  tenant_id: string;
  facility_id: string | null;
  name: string;
  asset_tag: string | null;
  manufacturer: string | null;
  model: string | null;
  tonnage: number | null;
  shot_size_oz: number | null;
  status: MachineStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Mold {
  id: string;
  tenant_id: string;
  facility_id: string | null;
  name: string;
  tool_number: string | null;
  cavities: number | null;
  part_name: string | null;
  status: MoldStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export function useMachines(tenantId?: string | null) {
  return useQuery({
    queryKey: ['machines', tenantId],
    enabled: !!tenantId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('machines')
        .select('*')
        .eq('tenant_id', tenantId!)
        .order('name', { ascending: true });
      if (error) throw error;
      return (data ?? []) as Machine[];
    },
  });
}

export function useMolds(tenantId?: string | null) {
  return useQuery({
    queryKey: ['molds', tenantId],
    enabled: !!tenantId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('molds')
        .select('*')
        .eq('tenant_id', tenantId!)
        .order('name', { ascending: true });
      if (error) throw error;
      return (data ?? []) as Mold[];
    },
  });
}

export function useUpsertMachine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: Partial<Machine> & { tenant_id: string; name: string; id?: string }) => {
      if (input.id) {
        const { id, ...patch } = input;
        const { error } = await supabase.from('machines').update(patch).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('machines').insert(input);
        if (error) throw error;
      }
    },
    onSuccess: (_d, v) => qc.invalidateQueries({ queryKey: ['machines', v.tenant_id] }),
  });
}

export function useDeleteMachine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string; tenant_id: string }) => {
      const { error } = await supabase.from('machines').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_d, v) => qc.invalidateQueries({ queryKey: ['machines', v.tenant_id] }),
  });
}

export function useUpsertMold() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: Partial<Mold> & { tenant_id: string; name: string; id?: string }) => {
      if (input.id) {
        const { id, ...patch } = input;
        const { error } = await supabase.from('molds').update(patch).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('molds').insert(input);
        if (error) throw error;
      }
    },
    onSuccess: (_d, v) => qc.invalidateQueries({ queryKey: ['molds', v.tenant_id] }),
  });
}

export function useDeleteMold() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string; tenant_id: string }) => {
      const { error } = await supabase.from('molds').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_d, v) => qc.invalidateQueries({ queryKey: ['molds', v.tenant_id] }),
  });
}
