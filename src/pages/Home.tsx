import { useMemo } from 'react';
import { 
  CheckSquare, 
  MessageSquare, 
  Wrench, 
  BookOpen,
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTenant } from '@/contexts/TenantContext';
import { QuickTour } from '@/components/QuickTour';
import { 
  shiftTaskLists, 
  shiftTaskItems, 
  conversations, 
  issues, 
  fixRecords,
  users 
} from '@/data';
import { ROLE_LABELS } from '@/types/models';

export default function Home() {
  const navigate = useNavigate();
  const { currentUser, currentTenant } = useTenant();

  // Compute dashboard stats
  const stats = useMemo(() => {
    if (!currentTenant) return null;

    const tenantShiftTasks = shiftTaskLists.filter(s => s.tenantId === currentTenant.id);
    const tenantConversations = conversations.filter(c => c.tenantId === currentTenant.id);
    const tenantIssues = issues.filter(i => i.tenantId === currentTenant.id);
    const tenantFixes = fixRecords.filter(f => f.tenantId === currentTenant.id);

    // Get task items for active lists
    const activeLists = tenantShiftTasks.filter(l => l.status === 'Active');
    const activeTaskItems = shiftTaskItems.filter(item => 
      activeLists.some(list => list.id === item.taskListId)
    );

    return {
      activeShiftTasks: activeLists.length,
      pendingTaskItems: activeTaskItems.filter(t => t.status === 'Pending').length,
      completedTaskItems: activeTaskItems.filter(t => t.status === 'Done').length,
      activeConversations: tenantConversations.filter(c => c.status === 'Active').length,
      openIssues: tenantIssues.filter(i => i.status === 'Open' || i.status === 'InProgress').length,
      criticalIssues: tenantIssues.filter(i => i.priority === 'Critical' && i.status !== 'Closed').length,
      pendingFixes: tenantFixes.filter(f => f.status === 'PendingVerification').length,
      verifiedFixes: tenantFixes.filter(f => f.status === 'Verified').length,
    };
  }, [currentTenant]);

  if (!currentUser || !stats) return null;

  const quickStats = [
    {
      icon: <CheckSquare className="h-5 w-5" />,
      label: "Shift Tasks Active",
      value: stats.activeShiftTasks,
      subtext: `${stats.pendingTaskItems} pending, ${stats.completedTaskItems} done`,
      route: "/shift-tasks",
      color: "text-blue-500",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Active Conversations",
      value: stats.activeConversations,
      subtext: "Ongoing discussions",
      route: "/conversations",
      color: "text-emerald-500",
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      label: "Open Issues",
      value: stats.openIssues,
      subtext: stats.criticalIssues > 0 ? `${stats.criticalIssues} critical` : "None critical",
      route: "/issues",
      color: stats.criticalIssues > 0 ? "text-destructive" : "text-orange-500",
      alert: stats.criticalIssues > 0,
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Fixes Pending",
      value: stats.pendingFixes,
      subtext: `${stats.verifiedFixes} ready to commit`,
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
            <span>•</span>
            <span>{currentUser.department}</span>
            <span>•</span>
            <span>{currentUser.shift} Shift</span>
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
          <div className="text-xs mt-1">{currentTenant?.name}</div>
        </div>
      </div>

      {/* Quick Tour */}
      <QuickTour />

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
                {stat.alert && (
                  <AlertCircle className="h-5 w-5 text-destructive animate-pulse" />
                )}
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

      {/* Activity Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Today's Activity
            </CardTitle>
            <CardDescription>Summary of operations for this shift</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <CheckSquare className="h-4 w-4 text-primary" />
                  <span className="text-sm">Task Completion Rate</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary">
                    {stats.completedTaskItems + stats.pendingTaskItems > 0 
                      ? Math.round((stats.completedTaskItems / (stats.completedTaskItems + stats.pendingTaskItems)) * 100)
                      : 0}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Wrench className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Issues Resolved Today</span>
                </div>
                <div className="text-right">
                  <span className="font-bold">3</span>
                  <span className="text-xs text-muted-foreground ml-1">of {stats.openIssues + 3}</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Knowledge Updates</span>
                </div>
                <div className="text-right">
                  <span className="font-bold">2</span>
                  <span className="text-xs text-muted-foreground ml-1">docs updated</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              Attention Needed
            </CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.criticalIssues > 0 && (
                <button 
                  onClick={() => navigate('/issues')}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/30 hover:bg-destructive/20 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <Wrench className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium">Critical Issues Open</span>
                  </div>
                  <Badge variant="destructive">{stats.criticalIssues}</Badge>
                </button>
              )}
              {stats.pendingFixes > 0 && (
                <button 
                  onClick={() => navigate('/knowledge/fixes')}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/30 hover:bg-warning/20 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium">Fixes Awaiting Verification</span>
                  </div>
                  <Badge className="bg-warning text-warning-foreground">{stats.pendingFixes}</Badge>
                </button>
              )}
              {stats.verifiedFixes > 0 && (
                <button 
                  onClick={() => navigate('/knowledge/fixes')}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Fixes Ready to Commit</span>
                  </div>
                  <Badge>{stats.verifiedFixes}</Badge>
                </button>
              )}
              {stats.criticalIssues === 0 && stats.pendingFixes === 0 && stats.verifiedFixes === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckSquare className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
                  <p className="text-sm">All caught up! No urgent items.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
