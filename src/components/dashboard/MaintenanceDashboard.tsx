import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Wrench, Zap, Clock, BookOpen, PackageSearch } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTenant } from '@/contexts/TenantContext';
import { DashboardShell, MetricCard, ListCard, ComingSoonNote } from './DashboardShell';
import { Button } from '@/components/ui/button';

export default function MaintenanceDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useTenant();
  const [issues, setIssues] = useState<any[]>([]);
  const [pendingFixes, setPendingFixes] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser?.tenantId) return;
    let cancelled = false;
    (async () => {
      const [iss, fx] = await Promise.all([
        supabase
          .from('issues')
          .select('id,title,priority,status,category,created_at')
          .eq('category', 'maintenance')
          .neq('status', 'closed')
          .order('priority', { ascending: false })
          .limit(10),
        supabase
          .from('knowledge_fixes')
          .select('id,title,status,consecutive_passes,required_passes,updated_at')
          .in('status', ['draft', 'committed'])
          .order('updated_at', { ascending: false })
          .limit(5),
      ]);
      if (cancelled) return;
      setIssues(iss.data ?? []);
      setPendingFixes(fx.data ?? []);
    })();
    return () => { cancelled = true; };
  }, [currentUser?.tenantId]);

  const byPriority = {
    critical: issues.filter((i) => i.priority === 'critical').length,
    high: issues.filter((i) => i.priority === 'high').length,
    medium: issues.filter((i) => i.priority === 'medium').length,
    low: issues.filter((i) => i.priority === 'low').length,
  };

  return (
    <DashboardShell subtitle="Maintenance department view">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Wrench className="h-5 w-5" />}
          label="Open Maintenance Issues"
          value={issues.length}
          subtext="Non-closed"
          color="text-orange-500"
          onClick={() => navigate('/issues')}
        />
        <MetricCard
          icon={<AlertTriangle className="h-5 w-5" />}
          label="Critical / High"
          value={byPriority.critical + byPriority.high}
          subtext={`${byPriority.critical} critical • ${byPriority.high} high`}
          color="text-red-500"
        />
        <MetricCard
          icon={<Clock className="h-5 w-5" />}
          label="PMs Due Today"
          value="—"
          subtext="PM scheduler not tracked yet"
          color="text-blue-500"
        />
        <MetricCard
          icon={<BookOpen className="h-5 w-5" />}
          label="Fixes Awaiting Verify"
          value={pendingFixes.length}
          subtext="Committed / draft"
          color="text-purple-500"
          onClick={() => navigate('/knowledge/fixes')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ListCard title="Breakdowns by Priority" icon={<AlertTriangle className="h-4 w-4 text-red-500" />}>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span>Critical</span><span className="font-semibold">{byPriority.critical}</span></div>
            <div className="flex justify-between"><span>High</span><span className="font-semibold">{byPriority.high}</span></div>
            <div className="flex justify-between"><span>Medium</span><span className="font-semibold">{byPriority.medium}</span></div>
            <div className="flex justify-between"><span>Low</span><span className="font-semibold">{byPriority.low}</span></div>
          </div>
        </ListCard>

        <ListCard title="Machines with Repeat Faults" icon={<Zap className="h-4 w-4 text-yellow-500" />}>
          <ComingSoonNote note="press-fault aggregation requires a press assets table" />
        </ListCard>

        <ListCard title="Electrical / Hydraulic / Pneumatic Queue" icon={<Zap className="h-4 w-4 text-cyan-500" />}>
          <ComingSoonNote note="issue subcategory tagging not implemented yet" />
        </ListCard>

        <ListCard title="Parts / Follow-up Notes" icon={<PackageSearch className="h-4 w-4 text-blue-500" />}>
          <ComingSoonNote note="parts ordering / follow-up log not in schema" />
        </ListCard>

        <ListCard title="Recent Fixes Awaiting Verification" icon={<BookOpen className="h-4 w-4 text-purple-500" />}
          action={<Button variant="ghost" size="sm" onClick={() => navigate('/knowledge/fixes')}>All</Button>}>
          {pendingFixes.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing pending.</p>
          ) : (
            <ul className="space-y-2">
              {pendingFixes.map((f) => (
                <li key={f.id} className="text-sm border-b border-border/50 pb-2 last:border-0">
                  <button className="text-left hover:underline block" onClick={() => navigate(`/knowledge/fixes/${f.id}`)}>
                    {f.title}
                  </button>
                  <div className="text-xs text-muted-foreground">
                    Trials: {f.consecutive_passes}/{f.required_passes} • {f.status}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ListCard>
      </div>
    </DashboardShell>
  );
}
