import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Wrench, FileEdit, ShieldCheck, FlaskConical } from 'lucide-react';
import { useTenant } from '@/contexts/TenantContext';
import { EmptyState } from '@/components/EmptyState';
import { supabase } from '@/integrations/supabase/client';
import { useMachines, useMolds } from '@/hooks/useMachinesMolds';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDistanceToNow } from 'date-fns';


type FixStatus = 'draft' | 'committed' | 'verified';

interface FixRow {
  id: string;
  title: string;
  status: FixStatus;
  defect: string | null;
  tool: string | null;
  press: string | null;
  machine_id: string | null;
  mold_id: string | null;
  material: string | null;
  color: string | null;
  additive: string | null;
  fix_summary: string | null;
  created_at: string;
  updated_at: string;
  consecutive_passes: number;
  required_passes: number;
}


const STATUS_META: Record<FixStatus, { label: string; icon: typeof FileEdit; variant: 'secondary' | 'default' | 'outline' }> = {
  draft: { label: 'Draft', icon: FileEdit, variant: 'secondary' },
  committed: { label: 'In Trial', icon: FlaskConical, variant: 'default' },
  verified: { label: 'Verified', icon: ShieldCheck, variant: 'outline' },
};

export default function KnowledgeFixes() {
  const navigate = useNavigate();
  const { canCreateFixes, currentTenant, currentUser } = useTenant();
  const [rows, setRows] = useState<FixRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'all' | FixStatus>('all');
  const [q, setQ] = useState('');
  const [machineFilter, setMachineFilter] = useState<'all' | string>('all');
  const [moldFilter, setMoldFilter] = useState<'all' | string>('all');

  const { data: machines = [] } = useMachines(currentUser?.tenantId ?? null);
  const { data: molds = [] } = useMolds(currentUser?.tenantId ?? null);

  useEffect(() => {
    if (!currentTenant) return;
    let active = true;
    const load = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('knowledge_fixes')
        .select('id,title,status,defect,tool,press,machine_id,mold_id,material,color,additive,fix_summary,created_at,updated_at,consecutive_passes,required_passes')
        .order('updated_at', { ascending: false });
      if (active) {
        setRows((data ?? []) as FixRow[]);
        setLoading(false);
      }
    };
    load();
    const channel = supabase
      .channel('knowledge_fixes-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'knowledge_fixes' }, load)
      .subscribe();
    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [currentTenant]);

  const machineName = (id: string | null) => machines.find((m) => m.id === id)?.name;
  const moldName = (id: string | null) => molds.find((m) => m.id === id)?.name;

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (tab !== 'all' && r.status !== tab) return false;
      if (machineFilter !== 'all' && r.machine_id !== machineFilter) return false;
      if (moldFilter !== 'all' && r.mold_id !== moldFilter) return false;
      if (!s) return true;
      return [r.title, r.defect, r.tool, r.press, machineName(r.machine_id), moldName(r.mold_id), r.material, r.color, r.additive, r.fix_summary]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(s));
    });
  }, [rows, tab, q, machineFilter, moldFilter, machines, molds]);


  const counts = useMemo(
    () => ({
      all: rows.length,
      draft: rows.filter((r) => r.status === 'draft').length,
      committed: rows.filter((r) => r.status === 'committed').length,
      verified: rows.filter((r) => r.status === 'verified').length,
    }),
    [rows]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Fix Records</h1>
          <p className="text-muted-foreground">Documented solutions and verified fixes</p>
        </div>
        {canCreateFixes && (
          <Button onClick={() => navigate('/knowledge/fixes/new')} className="gap-2">
            <Plus className="h-4 w-4" />
            New Fix Record
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
          <TabsList>
            <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="draft">Draft ({counts.draft})</TabsTrigger>
            <TabsTrigger value="committed">In Trial ({counts.committed})</TabsTrigger>
            <TabsTrigger value="verified">Verified ({counts.verified})</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search defect, tool, press, material…"
            className="pl-8"
          />
        </div>
        <Select value={machineFilter} onValueChange={setMachineFilter}>
          <SelectTrigger className="w-full sm:w-[170px]"><SelectValue placeholder="All presses" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All presses</SelectItem>
            {machines.map((m) => (
              <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={moldFilter} onValueChange={setMoldFilter}>
          <SelectTrigger className="w-full sm:w-[170px]"><SelectValue placeholder="All molds" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All molds</SelectItem>
            {molds.map((m) => (
              <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>


      {loading ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">Loading…</CardContent></Card>
      ) : filtered.length === 0 ? (
        <EmptyState
          type="fixes"
          title={rows.length === 0 ? 'No fix records yet' : 'No matches'}
          description={
            rows.length === 0
              ? 'Create your first fix record to start building your team\'s knowledge base.'
              : 'Try a different search or status filter.'
          }
        />
      ) : (
        <div className="grid gap-3">
          {filtered.map((r) => {
            const meta = STATUS_META[r.status];
            const Icon = meta.icon;
            const chips = [
              r.defect && { k: 'Defect', v: r.defect },
              r.tool && { k: 'Tool', v: r.tool },
              r.press && { k: 'Press', v: r.press },
              r.material && { k: 'Material', v: r.material },
              r.color && { k: 'Color', v: r.color },
              r.additive && { k: 'Additive', v: r.additive },
            ].filter(Boolean) as { k: string; v: string }[];
            return (
              <Card
                key={r.id}
                className="cursor-pointer transition-colors hover:bg-accent/30"
                onClick={() => navigate(`/knowledge/fixes/${r.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="rounded-md bg-primary/10 p-2 text-primary">
                        <Wrench className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold truncate">{r.title}</div>
                        {r.fix_summary && (
                          <div className="mt-0.5 text-sm text-muted-foreground line-clamp-2">{r.fix_summary}</div>
                        )}
                        {chips.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {chips.map((c) => (
                              <Badge key={c.k} variant="outline" className="text-xs font-normal">
                                <span className="text-muted-foreground mr-1">{c.k}:</span>{c.v}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <Badge variant={meta.variant} className="gap-1">
                        <Icon className="h-3 w-3" />
                        {meta.label}
                      </Badge>
                      {r.status === 'committed' && (
                        <span className="text-xs font-mono text-muted-foreground">
                          {r.consecutive_passes}/{r.required_passes} trials
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(r.updated_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
