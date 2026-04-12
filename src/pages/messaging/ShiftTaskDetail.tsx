import { useState, useMemo } from 'react';
import { ArrowLeft, CheckSquare, Square, Clock, User, Calendar, AlertTriangle, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useTenant } from '@/contexts/TenantContext';
import { shiftTaskLists, shiftTaskItems } from '@/data/seed/shiftTasks';
import { users } from '@/data';
import { format, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { TaskPriority, TaskItemStatus, ShiftTaskListStatus, Shift, Department } from '@/types/models';
import { cn } from '@/lib/utils';

const PRIORITY_STYLES: Record<TaskPriority, { bg: string; icon?: boolean }> = {
  Normal: { bg: '' },
  High: { bg: 'border-l-4 border-l-orange-500' },
  Urgent: { bg: 'border-l-4 border-l-red-500', icon: true },
};

const STATUS_STYLES: Record<TaskItemStatus, string> = {
  Pending: 'text-muted-foreground',
  InProgress: 'text-blue-600 dark:text-blue-400',
  Done: 'text-green-600 dark:text-green-400 line-through',
  Skipped: 'text-muted-foreground line-through',
};

const LIST_STATUS_BADGE: Record<ShiftTaskListStatus, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  Active: 'default',
  Completed: 'secondary',
  Cancelled: 'destructive',
};

const SHIFT_COLORS: Record<Shift, string> = {
  Day: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  Swing: 'bg-orange-500/20 text-orange-700 dark:text-orange-400',
  Night: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-400',
};

export default function ShiftTaskDetail() {
  const { id } = useParams();
  const { currentUser } = useTenant();
  
  // Find the task list
  const taskList = shiftTaskLists.find(l => l.id === id);
  
  // Get items for this list with local state for demo interactivity
  const initialItems = useMemo(() => 
    shiftTaskItems.filter(item => item.taskListId === id),
    [id]
  );
  
  const [items, setItems] = useState(initialItems);
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({});

  if (!taskList) {
    return <Navigate to="/shift-tasks" replace />;
  }

  const creator = users.find(u => u.id === taskList.createdBy);
  
  // Calculate stats
  const completed = items.filter(item => item.status === 'Done').length;
  const total = items.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getUser = (userId: string) => users.find(u => u.id === userId);

  const getAssigneeLabel = (assignedTo: { type: 'user' | 'department'; id: string }) => {
    if (assignedTo.type === 'department') {
      return assignedTo.id;
    }
    const user = getUser(assignedTo.id);
    return user?.name || 'Unknown';
  };

  const canComplete = (item: typeof items[0]) => {
    if (!currentUser) return false;
    // Can complete if assigned to their department or specifically to them
    if (item.assignedTo.type === 'department' && item.assignedTo.id === currentUser.department) {
      return true;
    }
    if (item.assignedTo.type === 'user' && item.assignedTo.id === currentUser.id) {
      return true;
    }
    // Supervisors and above can complete any item
    return ['supervisor', 'manager', 'admin', 'super_admin'].includes(currentUser.role);
  };

  const toggleItem = (itemId: string) => {
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item;
      
      const newStatus: TaskItemStatus = item.status === 'Done' ? 'Pending' : 'Done';
      const now = new Date().toISOString();
      
      if (newStatus === 'Done') {
        toast({
          title: 'Task completed!',
          description: `Marked as done by ${currentUser?.name}`,
        });
      }
      
      return {
        ...item,
        status: newStatus,
        completedBy: newStatus === 'Done' ? currentUser?.id : undefined,
        completedAt: newStatus === 'Done' ? now : undefined,
      };
    }));
  };

  const toggleNotes = (itemId: string) => {
    setExpandedNotes(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const saveNote = (itemId: string) => {
    const note = noteInputs[itemId];
    if (!note?.trim()) return;
    
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, notes: note.trim() } : item
    ));
    
    setNoteInputs(prev => ({ ...prev, [itemId]: '' }));
    setExpandedNotes(prev => ({ ...prev, [itemId]: false }));
    
    toast({
      title: 'Note saved',
      description: 'Your note has been added to this task',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" asChild className="mt-1">
          <Link to="/shift-tasks">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h1 className="text-2xl font-bold">{taskList.title}</h1>
            <Badge variant={LIST_STATUS_BADGE[taskList.status]}>
              {taskList.status}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {format(parseISO(taskList.date), 'EEEE, MMMM d, yyyy')}
            </span>
            <span className={cn("flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium", SHIFT_COLORS[taskList.shift])}>
              <Clock className="h-3.5 w-3.5" />
              {taskList.shift} Shift
            </span>
            {creator && (
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                Created by {creator.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Notes */}
      {taskList.notes && (
        <Card>
          <CardContent className="py-3">
            <p className="text-sm text-muted-foreground">{taskList.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Progress Card */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {percent === 100 ? (
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              ) : (
                <CheckSquare className="h-6 w-6 text-primary" />
              )}
              <span className="text-lg font-semibold">
                {completed} of {total} tasks completed
              </span>
            </div>
            <span className="text-2xl font-bold text-primary">{percent}%</span>
          </div>
          <Progress value={percent} className="h-3" />
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Checklist</CardTitle>
          <CardDescription>
            Check off items as you complete them
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 p-0">
          {items.map((item, index) => {
            const completedByUser = item.completedBy ? getUser(item.completedBy) : null;
            const isCompleted = item.status === 'Done';
            const priorityStyle = PRIORITY_STYLES[item.priority];
            const showNotes = expandedNotes[item.id];
            const userCanComplete = canComplete(item);

            return (
              <div
                key={item.id}
                className={cn(
                  "px-6 py-4 hover:bg-muted/50 transition-colors",
                  priorityStyle.bg,
                  index !== items.length - 1 && "border-b"
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <Checkbox
                    checked={isCompleted}
                    onCheckedChange={() => userCanComplete && toggleItem(item.id)}
                    disabled={!userCanComplete}
                    className="mt-1"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className={cn("text-sm", STATUS_STYLES[item.status])}>
                        {priorityStyle.icon && (
                          <AlertTriangle className="h-4 w-4 inline mr-1.5 text-red-500" />
                        )}
                        {item.text}
                      </span>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        {item.priority !== 'Normal' && (
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-xs",
                              item.priority === 'High' && "border-orange-500 text-orange-600",
                              item.priority === 'Urgent' && "border-red-500 text-red-600"
                            )}
                          >
                            {item.priority}
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-xs">
                          {getAssigneeLabel(item.assignedTo)}
                        </Badge>
                      </div>
                    </div>

                    {/* Completion info */}
                    {isCompleted && completedByUser && item.completedAt && (
                      <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>
                          Completed by {completedByUser.name} at{' '}
                          {format(parseISO(item.completedAt), 'h:mm a')}
                        </span>
                      </div>
                    )}

                    {/* Existing notes */}
                    {item.notes && (
                      <p className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                        💬 {item.notes}
                      </p>
                    )}

                    {/* Add note toggle */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => toggleNotes(item.id)}
                    >
                      <MessageSquare className="h-3.5 w-3.5 mr-1" />
                      {showNotes ? 'Cancel' : 'Add note'}
                    </Button>

                    {/* Note input */}
                    {showNotes && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Add a note about this task..."
                          value={noteInputs[item.id] || ''}
                          onChange={e => setNoteInputs(prev => ({ 
                            ...prev, 
                            [item.id]: e.target.value 
                          }))}
                          rows={2}
                          className="text-sm"
                        />
                        <Button 
                          size="sm" 
                          onClick={() => saveNote(item.id)}
                          disabled={!noteInputs[item.id]?.trim()}
                        >
                          Save Note
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Audit Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Completion Audit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            {items.filter(i => i.status === 'Done' && i.completedBy).map(item => {
              const user = getUser(item.completedBy!);
              return (
                <div key={item.id} className="flex items-center justify-between py-1 border-b last:border-0">
                  <span className="text-muted-foreground truncate flex-1 mr-4">
                    {item.text}
                  </span>
                  <div className="flex items-center gap-2 text-xs shrink-0">
                    <span className="font-medium">{user?.name}</span>
                    {item.completedAt && (
                      <span className="text-muted-foreground">
                        {format(parseISO(item.completedAt), 'MMM d, h:mm a')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            {items.filter(i => i.status === 'Done').length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No tasks completed yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
