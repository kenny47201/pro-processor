import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useTenant, DEPARTMENTS, type Department } from '@/contexts/TenantContext';
import { useCreateShiftTaskList, useAddShiftTaskItem, useTenantProfiles } from '@/hooks/useShiftTasks';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface DraftItem {
  text: string;
  priority: 'normal' | 'high' | 'urgent';
  assigned_to_id?: string;
}

const priorityColor: Record<string, string> = {
  normal: 'bg-muted text-muted-foreground',
  high: 'bg-warning/10 text-warning border-warning/30',
  urgent: 'bg-destructive/10 text-destructive border-destructive/30',
};

export default function ShiftTaskNew() {
  const navigate = useNavigate();
  const { currentUser, currentTenant, currentFacility } = useTenant();
  const { toast } = useToast();
  const createList = useCreateShiftTaskList();
  const addItem = useAddShiftTaskItem();
  const { data: profiles } = useTenantProfiles();

  const defaultShiftOptions = ['Day', 'Swing', 'Night', '1st', '2nd', '3rd', 'A', 'B', 'C', 'D'];
  const tenantShifts = currentTenant?.shifts && currentTenant.shifts.length ? currentTenant.shifts : [];
  const shiftOptions = Array.from(new Set([...tenantShifts, ...defaultShiftOptions]));

  const initialDept: Department = (currentUser?.department ?? 'Processing') as Department;
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [shift, setShift] = useState<string>(shiftOptions[0]);
  const [department, setDepartment] = useState<Department>(initialDept);
  const [items, setItems] = useState<DraftItem[]>([]);
  const [newItemText, setNewItemText] = useState('');
  const [newItemPriority, setNewItemPriority] = useState<'normal' | 'high' | 'urgent'>('normal');
  const [newItemAssignee, setNewItemAssignee] = useState<string>('unassigned');
  const [submitting, setSubmitting] = useState(false);

  const getProfileName = (userId?: string) => {
    if (!userId || !profiles) return null;
    const p = profiles.find(pr => pr.user_id === userId);
    return p?.screen_name || p?.display_name || null;
  };

  const addDraftItem = () => {
    if (!newItemText.trim()) return;
    setItems([...items, {
      text: newItemText.trim(),
      priority: newItemPriority,
      assigned_to_id: newItemAssignee !== 'unassigned' ? newItemAssignee : undefined,
    }]);
    setNewItemText('');
    setNewItemPriority('normal');
    setNewItemAssignee('unassigned');
  };

  const removeDraftItem = (i: number) => {
    setItems(items.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;
    if (!currentUser || !currentTenant) {
      toast({
        title: 'Cannot create task list',
        description: !currentTenant
          ? 'No organization is set up yet. Ask an admin to create one in Tenant Management.'
          : 'You must be signed in to create a task list.',
        variant: 'destructive',
      });
      return;
    }
    setSubmitting(true);
    try {
      const list = await createList.mutateAsync({
        title: title.trim(),
        notes: notes.trim() || undefined,
        date,
        shift,
        department,
        tenant_id: currentTenant.id,
        facility_id: currentFacility?.id,
        created_by: currentUser.id,
      });

      for (let i = 0; i < items.length; i++) {
        await addItem.mutateAsync({
          task_list_id: list.id,
          text: items[i].text,
          priority: items[i].priority,
          assigned_to_id: items[i].assigned_to_id,
          sort_order: i,
        });
      }

      navigate(`/shift-tasks/${list.id}`);
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Button variant="ghost" onClick={() => navigate('/shift-tasks')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Shift Tasks
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Create Shift Task List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="e.g. Day Shift – Press Area Checks" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Shift</Label>
              <Select value={shift} onValueChange={setShift}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {shiftOptions.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea id="notes" placeholder="Any additional context for the shift..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Task Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.length > 0 && (
            <div className="divide-y divide-border rounded-md border">
              {items.map((item, i) => {
                const assigneeName = getProfileName(item.assigned_to_id);
                return (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <span className="text-sm font-mono text-muted-foreground w-6 text-right">{i + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm">{item.text}</span>
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
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeDraftItem(i)}>
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex gap-2 flex-wrap">
            <Input
              placeholder="Add a task item..."
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addDraftItem(); } }}
              className="flex-1 min-w-[200px]"
            />
            <Select value={newItemPriority} onValueChange={(v) => setNewItemPriority(v as 'normal' | 'high' | 'urgent')}>
              <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={newItemAssignee} onValueChange={setNewItemAssignee}>
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
            <Button variant="outline" size="icon" onClick={addDraftItem} disabled={!newItemText.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleSubmit} disabled={!title.trim() || submitting}>
              {submitting ? 'Creating...' : 'Create Task List'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
