import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, CheckCircle2, Circle, Clock, SkipForward, Loader2, User, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useTenant } from '@/contexts/TenantContext';
import {
  useShiftTaskList,
  useShiftTaskItems,
  useUpdateShiftTaskList,
  useAddShiftTaskItem,
  useUpdateShiftTaskItem,
  useDeleteShiftTaskItem,
  useTenantProfiles,
  useShiftTaskActivityLog,
  useLogShiftTaskActivity,
} from '@/hooks/useShiftTasks';
import { format, formatDistanceToNow } from 'date-fns';

const statusIcon: Record<string, React.ReactNode> = {
  pending: <Circle className="h-4 w-4 text-muted-foreground" />,
  in_progress: <Clock className="h-4 w-4 text-warning" />,
  done: <CheckCircle2 className="h-4 w-4 text-success" />,
  skipped: <SkipForward className="h-4 w-4 text-muted-foreground" />,
};

const priorityColor: Record<string, string> = {
  normal: 'bg-muted text-muted-foreground',
  high: 'bg-warning/10 text-warning border-warning/30',
  urgent: 'bg-destructive/10 text-destructive border-destructive/30',
};

const listStatusColor: Record<string, string> = {
  active: 'bg-success/10 text-success border-success/30',
  completed: 'bg-muted text-muted-foreground border-border',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/30',
};

const shiftBadge: Record<string, string> = {
  Day: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
  Swing: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  Night: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/30',
};

export default function ShiftTaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, canCreateShiftTasks } = useTenant();

  const { data: list, isLoading: listLoading } = useShiftTaskList(id);
  const { data: items, isLoading: itemsLoading } = useShiftTaskItems(id);
  const { data: profiles } = useTenantProfiles();
  const { data: activityLog } = useShiftTaskActivityLog(id);
  const updateList = useUpdateShiftTaskList();
  const addItem = useAddShiftTaskItem();
  const updateItem = useUpdateShiftTaskItem();
  const deleteItem = useDeleteShiftTaskItem();
  const logActivity = useLogShiftTaskActivity();

  const [newText, setNewText] = useState('');
  const [newPriority, setNewPriority] = useState<'normal' | 'high' | 'urgent'>('normal');
  const [newAssignee, setNewAssignee] = useState<string>('unassigned');

  const isLoading = listLoading || itemsLoading;

  const getProfileName = (userId: string | null) => {
    if (!userId || !profiles) return null;
    const p = profiles.find(pr => pr.user_id === userId);
    return p?.screen_name || p?.display_name || null;
  };

  const getItemText = (itemId: string | null) => {
    if (!itemId || !items) return null;
    return items.find(i => i.id === itemId)?.text || null;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!list) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate('/shift-tasks')} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Shift Tasks
        </Button>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Task list not found.
          </CardContent>
        </Card>
      </div>
    );
  }

  const doneCount = items?.filter(i => i.status === 'done').length || 0;
  const totalCount = items?.length || 0;
  const progress = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const logAndUpdate = async (action: string, oldVal: string, newVal: string, itemId?: string) => {
    if (!currentUser || !id) return;
    logActivity.mutate({
      task_list_id: id,
      task_item_id: itemId,
      user_id: currentUser.id,
      action,
      old_value: oldVal,
      new_value: newVal,
    });
  };

  const cycleItemStatus = async (item: typeof items extends (infer T)[] | undefined ? T : never) => {
    if (!currentUser) return;
    const nextStatus: Record<string, 'in_progress' | 'done' | 'pending'> = {
      pending: 'in_progress',
      in_progress: 'done',
      done: 'pending',
    };
    const newStatus = nextStatus[item.status] || 'pending';
    await updateItem.mutateAsync({
      id: item.id,
      task_list_id: item.task_list_id,
      status: newStatus,
      completed_by: newStatus === 'done' ? currentUser.id : undefined,
      completed_at: newStatus === 'done' ? new Date().toISOString() : undefined,
    });
    logAndUpdate('status_change', item.status, newStatus, item.id);
  };

  const skipItem = async (item: typeof items extends (infer T)[] | undefined ? T : never) => {
    await updateItem.mutateAsync({
      id: item.id,
      task_list_id: item.task_list_id,
      status: 'skipped',
    });
    logAndUpdate('status_change', item.status, 'skipped', item.id);
  };

  const handleAssign = async (item: typeof items extends (infer T)[] | undefined ? T : never, userId: string) => {
    const oldName = getProfileName(item.assigned_to_id) || 'Unassigned';
    const newName = userId === 'unassigned' ? 'Unassigned' : (getProfileName(userId) || userId);
    await updateItem.mutateAsync({
      id: item.id,
      task_list_id: item.task_list_id,
      assigned_to_id: userId === 'unassigned' ? null : userId,
    });
    logAndUpdate('assignment_change', oldName, newName, item.id);
  };

  const handleAddItem = async () => {
    if (!newText.trim() || !id) return;
    await addItem.mutateAsync({
      task_list_id: id,
      text: newText.trim(),
      priority: newPriority,
      assigned_to_id: newAssignee !== 'unassigned' ? newAssignee : undefined,
      sort_order: totalCount,
    });
    logAndUpdate('item_added', '', newText.trim());
    setNewText('');
    setNewPriority('normal');
    setNewAssignee('unassigned');
  };

  const handleCompleteList = () => {
    updateList.mutate({ id: list.id, status: 'completed' });
    logAndUpdate('list_status_change', list.status, 'completed');
  };

  const handleCancelList = () => {
    updateList.mutate({ id: list.id, status: 'cancelled' });
    logAndUpdate('list_status_change', list.status, 'cancelled');
  };

  const handleReactivateList = () => {
    updateList.mutate({ id: list.id, status: 'active' });
    logAndUpdate('list_status_change', list.status, 'active');
  };

  const formatAction = (entry: typeof activityLog extends (infer T)[] | undefined ? T : never) => {
    const who = getProfileName(entry.user_id) || 'Someone';
    switch (entry.action) {
      case 'status_change': {
        const taskName = getItemText(entry.task_item_id) || 'a task';
        return <><strong>{who}</strong> changed <em>"{taskName}"</em> from <Badge variant="outline" className="text-xs mx-1">{entry.old_value}</Badge> to <Badge variant="outline" className="text-xs mx-1">{entry.new_value}</Badge></>;
      }
      case 'assignment_change': {
        const taskName = getItemText(entry.task_item_id) || 'a task';
        return <><strong>{who}</strong> reassigned <em>"{taskName}"</em> from {entry.old_value} → {entry.new_value}</>;
      }
      case 'list_status_change':
        return <><strong>{who}</strong> changed list status from <Badge variant="outline" className="text-xs mx-1">{entry.old_value}</Badge> to <Badge variant="outline" className="text-xs mx-1">{entry.new_value}</Badge></>;
      case 'item_added':
        return <><strong>{who}</strong> added task <em>"{entry.new_value}"</em></>;
      default:
        return <><strong>{who}</strong> performed {entry.action}</>;
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <Button variant="ghost" onClick={() => navigate('/shift-tasks')} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Shift Tasks
      </Button>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className={listStatusColor[list.status]}>
            {list.status.charAt(0).toUpperCase() + list.status.slice(1)}
          </Badge>
          <Badge variant="outline" className={shiftBadge[list.shift] || ''}>
            {list.shift} Shift
          </Badge>
          <span className="text-sm text-muted-foreground">
            {format(new Date(list.date), 'EEEE, MMM d, yyyy')}
          </span>
        </div>
        <h1 className="text-2xl font-bold">{list.title}</h1>
        {list.notes && <p className="text-muted-foreground">{list.notes}</p>}
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{doneCount} / {totalCount} tasks done</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-success rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Task Items */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {items && items.length > 0 ? (
            <div className="divide-y divide-border">
              {items.map((item) => {
                const assigneeName = getProfileName(item.assigned_to_id);
                return (
                  <div key={item.id} className="flex items-center gap-3 py-3">
                    <button
                      onClick={() => cycleItemStatus(item)}
                      className="shrink-0 hover:scale-110 transition-transform"
                      title={`Status: ${item.status} — click to cycle`}
                    >
                      {statusIcon[item.status]}
                    </button>
                    <div className="flex-1 min-w-0">
                      <span className={`text-sm ${item.status === 'done' ? 'line-through text-muted-foreground' : item.status === 'skipped' ? 'line-through text-muted-foreground/50' : ''}`}>
                        {item.text}
                      </span>
                      {assigneeName && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{assigneeName}</span>
                        </div>
                      )}
                    </div>
                    <Badge variant="outline" className={`text-xs ${priorityColor[item.priority]}`}>
                      {item.priority}
                    </Badge>
                    {list.status === 'active' && canCreateShiftTasks && (
                      <Select
                        value={item.assigned_to_id || 'unassigned'}
                        onValueChange={(v) => handleAssign(item, v)}
                      >
                        <SelectTrigger className="w-32 h-7 text-xs">
                          <SelectValue placeholder="Assign" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">Unassigned</SelectItem>
                          {profiles?.map((p) => (
                            <SelectItem key={p.user_id} value={p.user_id}>
                              {p.screen_name || p.display_name || 'Unknown'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {item.status !== 'skipped' && item.status !== 'done' && (
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => skipItem(item)} title="Skip">
                        <SkipForward className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    )}
                    {canCreateShiftTasks && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => deleteItem.mutate({ id: item.id, task_list_id: item.task_list_id })}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-6">No tasks added yet.</p>
          )}

          {list.status === 'active' && canCreateShiftTasks && (
            <>
              <Separator className="my-4" />
              <div className="flex gap-2 flex-wrap">
                <Input
                  placeholder="Add a task..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem(); } }}
                  className="flex-1 min-w-[200px]"
                />
                <Select value={newPriority} onValueChange={(v) => setNewPriority(v as 'normal' | 'high' | 'urgent')}>
                  <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={newAssignee} onValueChange={setNewAssignee}>
                  <SelectTrigger className="w-32"><SelectValue placeholder="Assign to" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {profiles?.map((p) => (
                      <SelectItem key={p.user_id} value={p.user_id}>
                        {p.screen_name || p.display_name || 'Unknown'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={handleAddItem} disabled={!newText.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      {canCreateShiftTasks && (
        <div className="flex gap-3 justify-end">
          {list.status === 'active' && (
            <>
              <Button variant="outline" onClick={handleCancelList}>Cancel List</Button>
              <Button onClick={handleCompleteList}>Mark Completed</Button>
            </>
          )}
          {(list.status === 'completed' || list.status === 'cancelled') && (
            <Button variant="outline" onClick={handleReactivateList}>Reactivate</Button>
          )}
        </div>
      )}

      {/* Activity Log */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <History className="h-4 w-4" /> Activity Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activityLog && activityLog.length > 0 ? (
            <div className="space-y-3">
              {activityLog.map((entry) => (
                <div key={entry.id} className="flex items-start gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div>{formatAction(entry)}</div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-6">No activity recorded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
