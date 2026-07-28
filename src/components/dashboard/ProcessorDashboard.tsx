import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckSquare, Wrench, BookOpen, Calculator, Factory, ClipboardList } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTenant } from '@/contexts/TenantContext';
import { DashboardShell, MetricCard, ListCard, ComingSoonNote } from './DashboardShell';
import { Button } from '@/components/ui/button';

export default function ProcessorDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useTenant();
  const [openIssues, setOpenIssues] = useState<any[]>([]);
  const [openTasks, setOpenTasks] = useState<any[]>([]);
  const [recentFixes, setRecentFixes] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser?.tenantId) return;
    let cancelled = false;
    (async () => {
      const [issues, tasks, fixes] = await Promise.all([
        supabase
          .from('issues')
          .select('id,title,priority,status')
          .neq('status', 'closed')
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('shift_task_lists')
          .select('id,title,shift,date,status')
          .eq('status', 'active')
          .order('date', { ascending: false })
          .limit(5),
        supabase
          .from('knowledge_fixes')
          .select('id,title,status,updated_at,press,tool,material')
          .eq('status', 'verified')
          .order('updated_at', { ascending: false })
          .limit(5),
      ]);
      if (cancelled) return;
      setOpenIssues(issues.data ?? []);
      setOpenTasks(tasks.data ?? []);
      setRecentFixes(fixes.data ?? []);
    })();
    return () => { cancelled = true; };
  }, [currentUser?.tenantId]);

  return (
    <DashboardShell subtitle="Processing floor view">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Factory className="h-5 w-5" />}
          label="My Assigned Presses"
          value="—"
          subtext="Press assignments not tracked yet"
          color="text-blue-500"
        />
        <MetricCard
          icon={<AlertTriangle className="h-5 w-5" />}
          label="Issues on My Presses"
          value={openIssues.length}
          subtext={openIssues.length === 0 ? 'All clear' : 'Active problems'}
          color="text-orange-500"
          onClick={() => navigate('/issues')}
        />
        <MetricCard
          icon={<CheckSquare className="h-5 w-5" />}
          label="Open Shift Tasks"
          value={openTasks.length}
          subtext="Priorities for your shift"
          color="text-emerald-500"
          onClick={() => navigate('/shift-tasks')}
        />
        <MetricCard
          icon={<ClipboardList className="h-5 w-5" />}
          label="Defects Reported This Shift"
          value="—"
          subtext="Scrap logging not tracked yet"
          color="text-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ListCard title="Current Issues on My Presses" icon={<Wrench className="h-4 w-4 text-orange-500" />}>
          {openIssues.length === 0 ? (
            <p className="text-sm text-muted-foreground">No open issues.</p>
          ) : (
            <ul className="space-y-2">
              {openIssues.map((i) => (
                <li key={i.id} className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0">
                  <button className="text-left hover:underline" onClick={() => navigate(`/issues/${i.id}`)}>
                    {i.title}
                  </button>
                  <span className="text-xs uppercase text-muted-foreground">{i.priority}</span>
                </li>
              ))}
            </ul>
          )}
        </ListCard>

        <ListCard title="Required Process Checks" icon={<ClipboardList className="h-4 w-4 text-blue-500" />}>
          <ComingSoonNote note="hourly/setup process check log is not yet in the schema" />
        </ListCard>

        <ListCard title="Recent Verified Fixes" icon={<BookOpen className="h-4 w-4 text-purple-500" />}
          action={<Button variant="ghost" size="sm" onClick={() => navigate('/knowledge/fixes')}>All</Button>}>
          {recentFixes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No verified fixes yet.</p>
          ) : (
            <ul className="space-y-2">
              {recentFixes.map((f) => (
                <li key={f.id} className="text-sm border-b border-border/50 pb-2 last:border-0">
                  <button className="text-left hover:underline block" onClick={() => navigate(`/knowledge/fixes/${f.id}`)}>
                    {f.title}
                  </button>
                  <div className="text-xs text-muted-foreground">
                    {[f.press, f.tool, f.material].filter(Boolean).join(' • ') || 'General'}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ListCard>

        <ListCard title="Quick Calculators" icon={<Calculator className="h-4 w-4 text-cyan-500" />}
          action={<Button variant="ghost" size="sm" onClick={() => navigate('/process-tools')}>Open</Button>}>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/process-tools?tool=tonnage')}>Tonnage</Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/process-tools?tool=shot-volume')}>Shot Volume</Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/process-tools?tool=cooling-time')}>Cooling Time</Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/process-tools?tool=cycle-time')}>Cycle Time</Button>
          </div>
        </ListCard>
      </div>
    </DashboardShell>
  );
}
