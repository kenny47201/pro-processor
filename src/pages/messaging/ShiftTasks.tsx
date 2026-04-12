import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTenant } from '@/contexts/TenantContext';
import { EmptyState } from '@/components/EmptyState';

export default function ShiftTasks() {
  const navigate = useNavigate();
  const { canCreateShiftTasks } = useTenant();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Shift Tasks</h1>
          <p className="text-muted-foreground">Manage shift task lists and assignments</p>
        </div>
        {canCreateShiftTasks && (
          <Button onClick={() => navigate('/shift-tasks/new')} className="gap-2">
            <Plus className="h-4 w-4" />
            New Task List
          </Button>
        )}
      </div>

      <EmptyState
        type="shift-tasks"
        title="No shift tasks yet"
        description="Create your first shift task list to get started with daily operations tracking."
      />
    </div>
  );
}
