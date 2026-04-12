import { useState, useMemo } from 'react';
import { ClipboardList, Plus, Calendar, Clock, CheckCircle2, Circle, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTenant, useFilteredData } from '@/contexts/TenantContext';
import { shiftTaskLists, shiftTaskItems } from '@/data/seed/shiftTasks';
import { users } from '@/data';
import { format, parseISO, isToday, isTomorrow, isYesterday } from 'date-fns';
import { Shift, ShiftTaskListStatus } from '@/types/models';

const STATUS_STYLES: Record<ShiftTaskListStatus, { variant: 'default' | 'secondary' | 'outline' | 'destructive', label: string }> = {
  Active: { variant: 'default', label: 'Active' },
  Completed: { variant: 'secondary', label: 'Completed' },
  Cancelled: { variant: 'destructive', label: 'Cancelled' },
};

const SHIFT_COLORS: Record<Shift, string> = {
  Day: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  Swing: 'bg-orange-500/20 text-orange-700 dark:text-orange-400',
  Night: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-400',
};

function formatRelativeDate(dateStr: string): string {
  const date = parseISO(dateStr);
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'MMM d, yyyy');
}

export default function ShiftTasks() {
  const { canCreateShiftTasks, currentUser, currentTenant } = useTenant();
  const { filterByTenant } = useFilteredData();
  const [shiftFilter, setShiftFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Get task lists for current tenant
  const tenantTaskLists = useMemo(() => {
    return filterByTenant(shiftTaskLists).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [filterByTenant]);

  // Apply filters
  const filteredLists = useMemo(() => {
    return tenantTaskLists.filter(list => {
      if (shiftFilter !== 'all' && list.shift !== shiftFilter) return false;
      if (statusFilter !== 'all' && list.status !== statusFilter) return false;
      return true;
    });
  }, [tenantTaskLists, shiftFilter, statusFilter]);

  // Calculate completion stats for each list
  const getListStats = (listId: string) => {
    const items = shiftTaskItems.filter(item => item.taskListId === listId);
    const completed = items.filter(item => item.status === 'Done').length;
    const total = items.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percent };
  };

  const getCreator = (userId: string) => {
    return users.find(u => u.id === userId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClipboardList className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Shift Tasks</h1>
            <p className="text-muted-foreground">
              Daily task lists assigned to your shift
            </p>
          </div>
        </div>
        {canCreateShiftTasks && (
          <Button asChild>
            <Link to="/shift-tasks/new">
              <Plus className="h-4 w-4 mr-2" />
              New Task List
            </Link>
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Badge variant="secondary" className="text-sm">
          {currentUser?.shift} Shift
        </Badge>
        
        <Select value={shiftFilter} onValueChange={setShiftFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="All Shifts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Shifts</SelectItem>
            <SelectItem value="Day">Day</SelectItem>
            <SelectItem value="Swing">Swing</SelectItem>
            <SelectItem value="Night">Night</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Task Lists */}
      <div className="grid gap-4">
        {filteredLists.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No task lists match your filters
            </CardContent>
          </Card>
        ) : (
          filteredLists.map(list => {
            const stats = getListStats(list.id);
            const creator = getCreator(list.createdBy);
            const statusStyle = STATUS_STYLES[list.status];
            
            return (
              <Link key={list.id} to={`/shift-tasks/${list.id}`}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Title and metadata */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg truncate">
                            {list.title}
                          </h3>
                          <Badge variant={statusStyle.variant}>
                            {statusStyle.label}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {formatRelativeDate(list.date)}
                          </span>
                          <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${SHIFT_COLORS[list.shift]}`}>
                            <Clock className="h-3.5 w-3.5" />
                            {list.shift} Shift
                          </span>
                          {creator && (
                            <span className="flex items-center gap-1.5">
                              <User className="h-4 w-4" />
                              {creator.name}
                            </span>
                          )}
                        </div>

                        {list.notes && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {list.notes}
                          </p>
                        )}
                      </div>

                      {/* Right: Completion stats */}
                      <div className="flex flex-col items-end gap-2 min-w-[120px]">
                        <div className="flex items-center gap-2 text-sm">
                          {stats.percent === 100 ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span className="font-medium">
                            {stats.completed}/{stats.total} tasks
                          </span>
                        </div>
                        <div className="w-full">
                          <Progress 
                            value={stats.percent} 
                            className="h-2"
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {stats.percent}% complete
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
