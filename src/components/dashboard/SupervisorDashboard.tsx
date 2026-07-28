import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, CheckSquare, AlertTriangle, Clock, TrendingDown, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTenant } from '@/contexts/TenantContext';
import { DashboardShell, MetricCard, ListCard, ComingSoonNote } from './DashboardShell';
import { Button } from '@/components/ui/button';

export default function SupervisorDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useTenant();
  const [tasks, setTasks] = useState<any[]>([]);
  const [unassigned, setUnassigned] = useState<any[]>([]);
  const [overdueFixes, setOverdueFixes] = useState<any[]>([]);
  const [openIssues, setOpenIssues] = useState(0);

  useEffect(() => {
    if (!currentUser?.tenantId) return;
    let cancelled = false;
    (async () => {
      const [t, u, ofx, oi] = await Promise.all([
        supabase.from('shift_task_lists').select('id,title,shift,date,department,status').eq('status', 'active').order('date', { ascending: false }).limit(8),
        supabase.from('issues').select('id,title,priority,category,created_at').is('owner_id', null).neq('status', 'closed').order('created_at', { ascending: false }).limit(5),
        supabase.from('knowledge_fixes').select('id,title,status,consecutive_passes,required_passes,updated_at').eq('status', 'committed').order('updated_at', { ascending: true }).limit(5),
        supabase.from('issues').select('id', { count: 'exact', head: true }).neq('status', 'closed'),
      ]);
      if (cancelled) return;
      setTasks(t.data ?? []);
      setUnassigned(u.data ?? []);
      setOverdueFixes(ofx.data ?? []);
      setOpenIssues(oi.count ?? 0);
    })();
    return () => { cancelled = true; };
  }, [currentUser?.tenantId]);

  return (
    <DashboardShell subtitle="Shift supervisor view">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Activity className="h-5 w-5" />}
          label="Shift Health"
          value={unassigned.length === 0 && openIssues < 5 ? 'Good' : 'Attention'}
          subtext={`${openIssues} open issues • ${unassigned.length} unassigned`}
          color="text-emerald-500"
        />
        <MetricCard
          icon={<CheckSquare className="h-5 w-5" />}
          label="Open Priority Tasks"
          value={tasks.length}
          subtext="Active shift lists"
          color="text-blue-500"
          onClick={() => navigate('/shift-tasks')}
        />
        <MetricCard
          icon={<AlertTriangle className="h-5 w-5" />}
          label="Unassigned Issues"
          value={unassigned.length}
          subtext="Need an owner"
          color="text-orange-500"
          onClick={() => navigate('/issues')}
        />
        <MetricCard
          icon={<Clock className="h-5 w-5" />}
          label="Overdue Verifications"
          value={overdueFixes.length}
          subtext="Committed fixes waiting"
          color="text-red-500"
          onClick={() => navigate('/knowledge/fixes')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ListCard title="Unassigned Issues" icon={<AlertTriangle className="h-4 w-4 text-orange-500" />}>
          {unassigned.length === 0 ? (
            <p className="text-sm text-muted-foreground">All issues have owners.</p>
          ) : (
            <ul className="space-y-2">
              {unassigned.map((i) => (
                <li key={i.id} className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0">
                  <button className="text-left hover:underline" onClick={() => navigate(`/issues/${i.id}`)}>{i.title}</button>
                  <span className="text-xs uppercase text-muted-foreground">{i.category}</span>
                </li>
              ))}
            </ul>
          )}
        </ListCard>

        <ListCard title="Downtime Minutes by Press" icon={<TrendingDown className="h-4 w-4 text-red-500" />}>
          <ComingSoonNote note="downtime capture (start/end timestamps per press) not implemented yet" />
        </ListCard>

        <ListCard title="Scrap Events This Shift" icon={<TrendingDown className="h-4 w-4 text-yellow-500" />}>
          <ComingSoonNote note="scrap log table not implemented yet" />
        </ListCard>

        <ListCard title="Handoff Readiness" icon={<Users className="h-4 w-4 text-cyan-500" />}>
          <div className="text-sm space-y-1">
            <div className="flex justify-between"><span>Active task lists</span><span className="font-semibold">{tasks.length}</span></div>
            <div className="flex justify-between"><span>Unassigned issues</span><span className="font-semibold">{unassigned.length}</span></div>
            <div className="flex justify-between"><span>Open issues (tenant)</span><span className="font-semibold">{openIssues}</span></div>
            <Button variant="link" size="sm" className="px-0 h-auto mt-2" onClick={() => navigate('/conversations')}>Post shift changeover →</Button>
          </div>
        </ListCard>

        <ListCard title="Overdue Verifications" icon={<Clock className="h-4 w-4 text-red-500" />}
          action={<Button variant="ghost" size="sm" onClick={() => navigate('/knowledge/fixes')}>All</Button>}>
          {overdueFixes.length === 0 ? (
            <p className="text-sm text-muted-foreground">None waiting.</p>
          ) : (
            <ul className="space-y-2">
              {overdueFixes.map((f) => (
                <li key={f.id} className="text-sm border-b border-border/50 pb-2 last:border-0">
                  <button className="text-left hover:underline block" onClick={() => navigate(`/knowledge/fixes/${f.id}`)}>{f.title}</button>
                  <div className="text-xs text-muted-foreground">Trials: {f.consecutive_passes}/{f.required_passes}</div>
                </li>
              ))}
            </ul>
          )}
        </ListCard>
      </div>
    </DashboardShell>
  );
}
