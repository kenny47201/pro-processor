import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, ClipboardList, ChevronRight, CalendarDays, Loader2 } from 'lucide-react';
import { useTenant } from '@/contexts/TenantContext';
import { useShiftTaskLists } from '@/hooks/useShiftTasks';
import { EmptyState } from '@/components/EmptyState';
import { format } from 'date-fns';

const statusStyles: Record<string, string> = {
  active: 'bg-success/10 text-success border-success/30',
  completed: 'bg-muted text-muted-foreground border-border',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/30',
};

const shiftBadge: Record<string, string> = {
  Day: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
  Swing: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  Night: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/30',
};

export default function ShiftTasks() {
  const navigate = useNavigate();
  const { canCreateShiftTasks } = useTenant();
  const { data: lists, isLoading } = useShiftTaskLists();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary" />
            Shift Tasks
          </h1>
          <p className="text-muted-foreground">Manage shift task lists and assignments</p>
        </div>
        {canCreateShiftTasks && (
          <Button onClick={() => navigate('/shift-tasks/new')} className="gap-2">
            <Plus className="h-4 w-4" />
            New Task List
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : !lists || lists.length === 0 ? (
        <EmptyState
          type="shift-tasks"
          title="No shift tasks yet"
          description="Create your first shift task list to get started with daily operations tracking."
          action={canCreateShiftTasks ? { label: 'New Task List', onClick: () => navigate('/shift-tasks/new') } : undefined}
        />
      ) : (
        <div className="grid gap-3">
          {lists.map((list) => (
            <Card
              key={list.id}
              className="hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => navigate(`/shift-tasks/${list.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={statusStyles[list.status]}>
                        {list.status.charAt(0).toUpperCase() + list.status.slice(1)}
                      </Badge>
                      <Badge variant="outline" className={shiftBadge[list.shift] || ''}>
                        {list.shift} Shift
                      </Badge>
                    </div>
                    <CardTitle className="text-base">{list.title}</CardTitle>
                    {list.notes && (
                      <p className="text-sm text-muted-foreground line-clamp-1">{list.notes}</p>
                    )}
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {format(new Date(list.date), 'MMM d, yyyy')}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
