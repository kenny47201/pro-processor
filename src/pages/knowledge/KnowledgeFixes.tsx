import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTenant } from '@/contexts/TenantContext';
import { EmptyState } from '@/components/EmptyState';

export default function KnowledgeFixes() {
  const navigate = useNavigate();
  const { canCreateFixes } = useTenant();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Fix Records</h1>
          <p className="text-muted-foreground">Documented solutions and verified fixes</p>
        </div>
        {canCreateFixes && (
          <Button onClick={() => navigate('/knowledge/fixes/new')} className="gap-2">
            <Plus className="h-4 w-4" />
            New Fix Record
          </Button>
        )}
      </div>

      <EmptyState
        type="fixes"
        title="No fix records yet"
        description="Fix records will appear here once issues are resolved and documented."
      />
    </div>
  );
}
