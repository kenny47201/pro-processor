import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, BookOpen, Users, GraduationCap, DollarSign, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTenant } from '@/contexts/TenantContext';
import { DashboardShell, MetricCard, ListCard, ComingSoonNote } from './DashboardShell';
import { Button } from '@/components/ui/button';

interface Contributor { user_id: string; name: string; count: number; }

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useTenant();
  const [recurring, setRecurring] = useState<Array<{ title: string; count: number }>>([]);
  const [verifyQueue, setVerifyQueue] = useState<any[]>([]);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFixes, setTotalFixes] = useState(0);
  const [verifiedFixes, setVerifiedFixes] = useState(0);

  useEffect(() => {
    if (!currentUser?.tenantId) return;
    let cancelled = false;
    (async () => {
      const [issuesRes, verifyRes, fixesRes, profilesRes] = await Promise.all([
        supabase.from('issues').select('title').limit(500),
        supabase.from('knowledge_fixes').select('id,title,status,consecutive_passes,required_passes').eq('status', 'committed').order('updated_at', { ascending: true }).limit(10),
        supabase.from('knowledge_fixes').select('id,status,created_by'),
        supabase.from('profiles').select('user_id,display_name,status'),
      ]);
      if (cancelled) return;

      const titleCounts = new Map<string, number>();
      (issuesRes.data ?? []).forEach((r: any) => {
        const key = (r.title || '').toLowerCase().trim().slice(0, 60);
        if (!key) return;
        titleCounts.set(key, (titleCounts.get(key) ?? 0) + 1);
      });
      const top = [...titleCounts.entries()]
        .filter(([, c]) => c >= 2)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([title, count]) => ({ title, count }));
      setRecurring(top);

      setVerifyQueue(verifyRes.data ?? []);

      const fixList = fixesRes.data ?? [];
      setTotalFixes(fixList.length);
      setVerifiedFixes(fixList.filter((f: any) => f.status === 'verified').length);

      const profileMap = new Map<string, string>();
      (profilesRes.data ?? []).forEach((p: any) => profileMap.set(p.user_id, p.display_name ?? 'Unknown'));
      const contribCounts = new Map<string, number>();
      fixList.forEach((f: any) => {
        contribCounts.set(f.created_by, (contribCounts.get(f.created_by) ?? 0) + 1);
      });
      setContributors(
        [...contribCounts.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([user_id, count]) => ({ user_id, name: profileMap.get(user_id) ?? 'Unknown', count })),
      );
      const profiles = profilesRes.data ?? [];
      setTotalUsers(profiles.length);
      setActiveUsers(profiles.filter((p: any) => p.status === 'active').length);
    })();
    return () => { cancelled = true; };
  }, [currentUser?.tenantId]);

  const adoption = totalUsers ? Math.round((activeUsers / totalUsers) * 100) : 0;
  const roiEstimate = verifiedFixes * 1500; // $1.5k avoided per verified fix — placeholder heuristic

  return (
    <DashboardShell subtitle="Plant manager view">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<BookOpen className="h-5 w-5" />}
          label="Fix Verification Queue"
          value={verifyQueue.length}
          subtext="Committed, awaiting verify"
          color="text-purple-500"
          onClick={() => navigate('/knowledge/fixes')}
        />
        <MetricCard
          icon={<Users className="h-5 w-5" />}
          label="Adoption"
          value={`${adoption}%`}
          subtext={`${activeUsers}/${totalUsers} active`}
          color="text-emerald-500"
          onClick={() => navigate('/users')}
        />
        <MetricCard
          icon={<Award className="h-5 w-5" />}
          label="Verified Fixes"
          value={verifiedFixes}
          subtext={`${totalFixes} total records`}
          color="text-blue-500"
        />
        <MetricCard
          icon={<DollarSign className="h-5 w-5" />}
          label="ROI Estimate"
          value={`$${roiEstimate.toLocaleString()}`}
          subtext="Rough: $1.5k / verified fix"
          color="text-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ListCard title="Top Recurring Issues" icon={<TrendingUp className="h-4 w-4 text-orange-500" />}>
          {recurring.length === 0 ? (
            <p className="text-sm text-muted-foreground">No repeating issue titles yet.</p>
          ) : (
            <ul className="space-y-2">
              {recurring.map((r) => (
                <li key={r.title} className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0">
                  <span className="truncate">{r.title}</span>
                  <span className="font-semibold">×{r.count}</span>
                </li>
              ))}
            </ul>
          )}
        </ListCard>

        <ListCard title="Downtime Pareto" icon={<TrendingDown className="h-4 w-4 text-red-500" />}>
          <ComingSoonNote note="downtime capture per press not implemented yet" />
        </ListCard>

        <ListCard title="Scrap Pareto" icon={<TrendingDown className="h-4 w-4 text-yellow-500" />}>
          <ComingSoonNote note="scrap event log not implemented yet" />
        </ListCard>

        <ListCard title="Training Gaps" icon={<GraduationCap className="h-4 w-4 text-cyan-500" />}>
          <ComingSoonNote note="training / certification tracking not implemented yet" />
        </ListCard>

        <ListCard title="Fix Verification Queue" icon={<BookOpen className="h-4 w-4 text-purple-500" />}
          action={<Button variant="ghost" size="sm" onClick={() => navigate('/knowledge/fixes')}>All</Button>}>
          {verifyQueue.length === 0 ? (
            <p className="text-sm text-muted-foreground">Empty.</p>
          ) : (
            <ul className="space-y-2">
              {verifyQueue.slice(0, 5).map((f) => (
                <li key={f.id} className="text-sm border-b border-border/50 pb-2 last:border-0">
                  <button className="text-left hover:underline block" onClick={() => navigate(`/knowledge/fixes/${f.id}`)}>{f.title}</button>
                  <div className="text-xs text-muted-foreground">Trials: {f.consecutive_passes}/{f.required_passes}</div>
                </li>
              ))}
            </ul>
          )}
        </ListCard>

        <ListCard title="Top Knowledge Contributors" icon={<Award className="h-4 w-4 text-emerald-500" />}>
          {contributors.length === 0 ? (
            <p className="text-sm text-muted-foreground">No contributions yet.</p>
          ) : (
            <ul className="space-y-2">
              {contributors.map((c) => (
                <li key={c.user_id} className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0">
                  <span>{c.name}</span>
                  <span className="font-semibold">{c.count} fix{c.count === 1 ? '' : 'es'}</span>
                </li>
              ))}
            </ul>
          )}
        </ListCard>
      </div>
    </DashboardShell>
  );
}
