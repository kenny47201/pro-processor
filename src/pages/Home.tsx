import { 
  CheckSquare, 
  MessageSquare, 
  Wrench, 
  BookOpen,
  Clock,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTenant } from '@/contexts/TenantContext';
import { ROLE_LABELS } from '@/types/models';
import { supabase } from '@/integrations/supabase/client';

export default function Home() {
  const navigate = useNavigate();
  const { currentUser, currentTenant } = useTenant();
  const [counts, setCounts] = useState({ shiftTasks: 0, conversations: 0, openIssues: 0, fixes: 0 });

  useEffect(() => {
    if (!currentUser) return;
    let cancelled = false;
    const load = async () => {
      const [tasks, convs, issues, fixes] = await Promise.all([
        supabase.from('shift_task_lists').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('conversations').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('issues').select('id', { count: 'exact', head: true }).neq('status', 'closed'),
        supabase.from('knowledge_fixes').select('id', { count: 'exact', head: true }),
      ]);
      if (cancelled) return;
      setCounts({
        shiftTasks: tasks.count ?? 0,
        conversations: convs.count ?? 0,
        openIssues: issues.count ?? 0,
        fixes: fixes.count ?? 0,
      });
    };
    load();

    const channel = supabase
      .channel('home-counts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shift_task_lists' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'issues' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'knowledge_fixes' }, load)
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [currentUser]);

  if (!currentUser) return null;

  const quickStats = [
    {
      icon: <CheckSquare className="h-5 w-5" />,
      label: "Shift Tasks",
      value: counts.shiftTasks,
      subtext: counts.shiftTasks === 0 ? "No tasks yet" : "Active lists",
      route: "/shift-tasks",
      color: "text-blue-500",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Conversations",
      value: counts.conversations,
      subtext: counts.conversations === 0 ? "No conversations yet" : "Active threads",
      route: "/conversations",
      color: "text-emerald-500",
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      label: "Open Issues",
      value: counts.openIssues,
      subtext: counts.openIssues === 0 ? "No issues" : "Active issues",
      route: "/issues",
      color: "text-orange-500",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Fix Records",
      value: counts.fixes,
      subtext: counts.fixes === 0 ? "No fixes yet" : "Total records",
      route: "/knowledge/fixes",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Badge variant="secondary">{ROLE_LABELS[currentUser.role]}</Badge>
            {currentUser.shift && (
              <>
                <span>•</span>
                <span>{currentUser.shift} Shift</span>
              </>
            )}
          </p>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
          {currentTenant && (
            <div className="text-xs mt-1">{currentTenant.name}</div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:border-primary/50 transition-colors group"
            onClick={() => navigate(stat.route)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg bg-muted/50 ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="mt-3">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm font-medium text-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.subtext}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state message */}
      <Card>
        <CardContent className="py-12 text-center">
          <CheckSquare className="h-12 w-12 mx-auto mb-4 text-emerald-500/50" />
          <h3 className="text-lg font-medium mb-2">Ready to get started</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Your workspace is set up and ready to go. Start by creating shift tasks, 
            logging issues, or adding knowledge documentation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
