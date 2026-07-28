import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, Calendar, BookOpen, Layers, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTenant } from '@/contexts/TenantContext';
import { DashboardShell, MetricCard, ListCard, ComingSoonNote } from './DashboardShell';
import { Button } from '@/components/ui/button';

export default function ToolingDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useTenant();
  const [issues, setIssues] = useState<any[]>([]);
  const [fixes, setFixes] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser?.tenantId) return;
    let cancelled = false;
    (async () => {
      const [iss, fx] = await Promise.all([
        supabase
          .from('issues')
          .select('id,title,priority,status,category,created_at')
          .eq('category', 'tooling')
          .neq('status', 'closed')
          .order('created_at', { ascending: false })
          .limit(10),
        supabase
          .from('knowledge_fixes')
          .select('id,title,tool,status,updated_at')
          .eq('status', 'verified')
          .not('tool', 'is', null)
          .order('updated_at', { ascending: false })
          .limit(5),
      ]);
      if (cancelled) return;
      setIssues(iss.data ?? []);
      setFixes(fx.data ?? []);
    })();
    return () => { cancelled = true; };
  }, [currentUser?.tenantId]);

  return (
    <DashboardShell subtitle="Tool room view">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Wrench className="h-5 w-5" />}
          label="Molds with Open Issues"
          value={issues.length}
          subtext="Tooling issues"
          color="text-orange-500"
          onClick={() => navigate('/issues')}
        />
        <MetricCard
          icon={<Layers className="h-5 w-5" />}
          label="Affected Cavities"
          value="—"
          subtext="Cavity mapping not tracked yet"
          color="text-blue-500"
        />
        <MetricCard
          icon={<Calendar className="h-5 w-5" />}
          label="Tooling PMs Due"
          value="—"
          subtext="Mold PM scheduler not tracked yet"
          color="text-yellow-500"
        />
        <MetricCard
          icon={<BookOpen className="h-5 w-5" />}
          label="Verified Tooling Fixes"
          value={fixes.length}
          subtext="Recent"
          color="text-purple-500"
          onClick={() => navigate('/knowledge/fixes')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ListCard title="Molds with Open Issues" icon={<AlertTriangle className="h-4 w-4 text-orange-500" />}>
          {issues.length === 0 ? (
            <p className="text-sm text-muted-foreground">No open tooling issues.</p>
          ) : (
            <ul className="space-y-2">
              {issues.map((i) => (
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

        <ListCard title="Gate / Vent / Ejector / Core-Pull Issues" icon={<Wrench className="h-4 w-4 text-cyan-500" />}>
          <ComingSoonNote note="tooling subcategory field not implemented yet" />
        </ListCard>

        <ListCard title="Mold Change Schedule" icon={<Calendar className="h-4 w-4 text-blue-500" />}>
          <ComingSoonNote note="mold change scheduling not implemented yet" />
        </ListCard>

        <ListCard title="Verified Tooling Fixes" icon={<BookOpen className="h-4 w-4 text-purple-500" />}
          action={<Button variant="ghost" size="sm" onClick={() => navigate('/knowledge/fixes')}>All</Button>}>
          {fixes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No verified fixes yet.</p>
          ) : (
            <ul className="space-y-2">
              {fixes.map((f) => (
                <li key={f.id} className="text-sm border-b border-border/50 pb-2 last:border-0">
                  <button className="text-left hover:underline block" onClick={() => navigate(`/knowledge/fixes/${f.id}`)}>
                    {f.title}
                  </button>
                  <div className="text-xs text-muted-foreground">{f.tool}</div>
                </li>
              ))}
            </ul>
          )}
        </ListCard>
      </div>
    </DashboardShell>
  );
}
