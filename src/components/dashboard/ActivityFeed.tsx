import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckSquare, BookOpen, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTenant } from '@/contexts/TenantContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

type IssueRow = { id: string; title: string; priority: string; status: string; created_at: string };
type FixRow = { id: string; title: string; updated_at: string; consecutive_passes: number; required_passes: number };
type TaskRow = {
  id: string;
  text: string;
  priority: string;
  status: string;
  updated_at: string;
  task_list_id: string;
  shift_task_lists: { title: string; date: string; status: string } | null;
};

export function ActivityFeed() {
  const navigate = useNavigate();
  const { currentUser } = useTenant();
  const [issues, setIssues] = useState<IssueRow[]>([]);
  const [fixes, setFixes] = useState<FixRow[]>([]);
  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const canVerifyFixes =
    currentUser?.role === 'supervisor' ||
    currentUser?.role === 'manager' ||
    currentUser?.role === 'admin' ||
    currentUser?.role === 'super_admin';

  useEffect(() => {
    if (!currentUser?.tenantId) return;
    let cancelled = false;
    const load = async () => {
      const [issuesRes, fixesRes, tasksRes] = await Promise.all([
        supabase
          .from('issues')
          .select('id,title,priority,status,created_at')
          .neq('status', 'closed')
          .order('created_at', { ascending: false })
          .limit(5),
        canVerifyFixes
          ? supabase
              .from('knowledge_fixes')
              .select('id,title,updated_at,consecutive_passes,required_passes')
              .eq('status', 'committed')
              .order('updated_at', { ascending: false })
              .limit(5)
          : Promise.resolve({ data: [] as FixRow[], error: null } as any),
        supabase
          .from('shift_task_items')
          .select('id,text,priority,status,updated_at,task_list_id,shift_task_lists!inner(title,date,status)')
          .in('status', ['pending', 'in_progress'])
          .eq('shift_task_lists.status', 'active')
          .or(`assigned_to_id.eq.${currentUser.id},assigned_to_id.is.null`)
          .order('updated_at', { ascending: false })
          .limit(5),
      ]);
      if (cancelled) return;
      setIssues((issuesRes.data ?? []) as IssueRow[]);
      setFixes((fixesRes.data ?? []) as FixRow[]);
      setTasks((tasksRes.data ?? []) as TaskRow[]);
    };
    load();

    const ch = supabase
      .channel('activity-feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'issues' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'knowledge_fixes' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shift_task_items' }, load)
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(ch);
    };
  }, [currentUser?.tenantId, currentUser?.id, canVerifyFixes]);

  const timeAgo = (iso: string) => {
    try {
      return formatDistanceToNow(new Date(iso), { addSuffix: true });
    } catch {
      return '';
    }
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Activity className="h-4 w-4 text-primary" />
          Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase mb-2">
            <AlertTriangle className="h-3.5 w-3.5 text-orange-500" />
            Newest Issues
          </div>
          {issues.length === 0 ? (
            <p className="text-sm text-muted-foreground">No open issues.</p>
          ) : (
            <ul className="space-y-2">
              {issues.map((i) => (
                <li key={i.id} className="text-sm border-b border-border/50 pb-2 last:border-0">
                  <button className="text-left hover:underline block w-full" onClick={() => navigate(`/issues/${i.id}`)}>
                    <span className="line-clamp-1">{i.title}</span>
                  </button>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Badge variant="outline" className="text-[10px] uppercase h-4">{i.priority}</Badge>
                    <span>{timeAgo(i.created_at)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase mb-2">
            <BookOpen className="h-3.5 w-3.5 text-purple-500" />
            {canVerifyFixes ? 'Fixes Awaiting My Verification' : 'Fixes In Trial'}
          </div>
          {!canVerifyFixes ? (
            <p className="text-sm text-muted-foreground">Verification is for supervisors and above.</p>
          ) : fixes.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing awaiting verification.</p>
          ) : (
            <ul className="space-y-2">
              {fixes.map((f) => (
                <li key={f.id} className="text-sm border-b border-border/50 pb-2 last:border-0">
                  <button className="text-left hover:underline block w-full" onClick={() => navigate(`/knowledge/fixes/${f.id}`)}>
                    <span className="line-clamp-1">{f.title}</span>
                  </button>
                  <div className="text-xs text-muted-foreground mt-1">
                    Trials {f.consecutive_passes}/{f.required_passes} • {timeAgo(f.updated_at)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase mb-2">
            <CheckSquare className="h-3.5 w-3.5 text-emerald-500" />
            My Open Tasks
          </div>
          {tasks.length === 0 ? (
            <p className="text-sm text-muted-foreground">No open tasks.</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((t) => (
                <li key={t.id} className="text-sm border-b border-border/50 pb-2 last:border-0">
                  <button className="text-left hover:underline block w-full" onClick={() => navigate(`/shift-tasks/${t.task_list_id}`)}>
                    <span className="line-clamp-1">{t.text}</span>
                  </button>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Badge variant="outline" className="text-[10px] uppercase h-4">{t.priority}</Badge>
                    <span className="line-clamp-1">{t.shift_task_lists?.title ?? ''}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
