import { useState } from 'react';
import { ArrowLeft, ClipboardList, Plus, Trash2, GripVertical } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTenant, useFilteredData } from '@/contexts/TenantContext';
import { users } from '@/data';
import { Department, Shift, TaskPriority } from '@/types/models';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemDraft {
  id: string;
  text: string;
  priority: TaskPriority;
  assignmentType: 'department' | 'user';
  assignedTo: string;
}

const DEPARTMENTS: Department[] = ['Processing', 'Maintenance', 'Tooling', 'Quality'];
const SHIFTS: Shift[] = ['Day', 'Swing', 'Night'];
const PRIORITIES: TaskPriority[] = ['Normal', 'High', 'Urgent'];

const PRIORITY_STYLES: Record<TaskPriority, string> = {
  Normal: 'bg-secondary text-secondary-foreground',
  High: 'bg-orange-500/20 text-orange-700 dark:text-orange-400',
  Urgent: 'bg-red-500/20 text-red-700 dark:text-red-400',
};

export default function ShiftTaskNew() {
  const navigate = useNavigate();
  const { currentUser, currentFacility } = useTenant();
  const { filterByTenant } = useFilteredData();
  
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [shift, setShift] = useState<Shift>('Day');
  const [taskItems, setTaskItems] = useState<TaskItemDraft[]>([]);

  // Get users for current tenant for assignment dropdown
  const tenantUsers = filterByTenant(users).filter(u => 
    u.role === 'processor' || 
    u.role === 'maintenance_tech' || 
    u.role === 'tooling_specialist'
  );

  const addTaskItem = () => {
    setTaskItems(prev => [...prev, {
      id: `temp-${Date.now()}`,
      text: '',
      priority: 'Normal',
      assignmentType: 'department',
      assignedTo: 'Processing',
    }]);
  };

  const updateTaskItem = (id: string, updates: Partial<TaskItemDraft>) => {
    setTaskItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeTaskItem = (id: string) => {
    setTaskItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: 'Title required',
        description: 'Please enter a title for the task list',
        variant: 'destructive',
      });
      return;
    }

    if (taskItems.length === 0) {
      toast({
        title: 'Tasks required',
        description: 'Please add at least one task item',
        variant: 'destructive',
      });
      return;
    }

    const emptyTasks = taskItems.filter(t => !t.text.trim());
    if (emptyTasks.length > 0) {
      toast({
        title: 'Empty tasks',
        description: 'Please fill in all task descriptions',
        variant: 'destructive',
      });
      return;
    }

    // In a real app, this would save to database
    toast({
      title: 'Task list created!',
      description: `"${title}" with ${taskItems.length} tasks for ${shift} shift`,
    });

    navigate('/shift-tasks');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/shift-tasks">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create Shift Task List</h1>
          <p className="text-muted-foreground">
            Assign tasks to your shift team
          </p>
        </div>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Task List Details
          </CardTitle>
          <CardDescription>
            Set the title, date, and target shift
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Day Shift Startup Checklist"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => d && setDate(d)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Shift *</Label>
              <Select value={shift} onValueChange={(v) => setShift(v as Shift)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SHIFTS.map(s => (
                    <SelectItem key={s} value={s}>{s} Shift</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Additional context or instructions for the shift..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Task Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Task Items</CardTitle>
              <CardDescription>
                Add checkable items for your shift team
              </CardDescription>
            </div>
            <Badge variant="outline">{taskItems.length} tasks</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {taskItems.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
              <p className="mb-4">No tasks added yet</p>
              <Button onClick={addTaskItem} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add First Task
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {taskItems.map((item, index) => (
                <div key={item.id} className="border rounded-lg p-4 space-y-3 bg-muted/30">
                  <div className="flex items-start gap-3">
                    <div className="text-muted-foreground mt-2">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="shrink-0">
                          #{index + 1}
                        </Badge>
                        <Input
                          placeholder="Task description..."
                          value={item.text}
                          onChange={e => updateTaskItem(item.id, { text: e.target.value })}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTaskItem(item.id)}
                          className="shrink-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Priority */}
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">Priority</Label>
                          <Select 
                            value={item.priority} 
                            onValueChange={(v) => updateTaskItem(item.id, { priority: v as TaskPriority })}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {PRIORITIES.map(p => (
                                <SelectItem key={p} value={p}>
                                  <span className={cn("px-1.5 py-0.5 rounded text-xs", PRIORITY_STYLES[p])}>
                                    {p}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Assignment Type */}
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">Assign to</Label>
                          <RadioGroup
                            value={item.assignmentType}
                            onValueChange={(v) => updateTaskItem(item.id, { 
                              assignmentType: v as 'department' | 'user',
                              assignedTo: v === 'department' ? 'Processing' : tenantUsers[0]?.id || ''
                            })}
                            className="flex gap-3"
                          >
                            <div className="flex items-center space-x-1.5">
                              <RadioGroupItem value="department" id={`${item.id}-dept`} />
                              <Label htmlFor={`${item.id}-dept`} className="text-sm font-normal cursor-pointer">Dept</Label>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <RadioGroupItem value="user" id={`${item.id}-user`} />
                              <Label htmlFor={`${item.id}-user`} className="text-sm font-normal cursor-pointer">User</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {/* Assignment Target */}
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">
                            {item.assignmentType === 'department' ? 'Department' : 'User'}
                          </Label>
                          <Select 
                            value={item.assignedTo} 
                            onValueChange={(v) => updateTaskItem(item.id, { assignedTo: v })}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {item.assignmentType === 'department' ? (
                                DEPARTMENTS.map(d => (
                                  <SelectItem key={d} value={d}>{d}</SelectItem>
                                ))
                              ) : (
                                tenantUsers.map(u => (
                                  <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Button onClick={addTaskItem} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline" asChild>
          <Link to="/shift-tasks">Cancel</Link>
        </Button>
        <Button onClick={handleSubmit}>
          Create Task List
        </Button>
      </div>
    </div>
  );
}
