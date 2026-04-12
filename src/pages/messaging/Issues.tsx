import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';

export default function Issues() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Issues</h1>
          <p className="text-muted-foreground">Track and resolve operational issues</p>
        </div>
        <Button onClick={() => navigate('/issues/new')} className="gap-2">
          <Plus className="h-4 w-4" />
          Report Issue
        </Button>
      </div>

      <EmptyState
        type="issues"
        title="No issues reported"
        description="When issues arise, report them here to track resolution and maintain operational excellence."
      />
    </div>
  );
}
