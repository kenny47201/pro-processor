import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';

export default function Conversations() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Conversations</h1>
          <p className="text-muted-foreground">Team discussions and collaboration</p>
        </div>
        <Button onClick={() => navigate('/conversations/new')} className="gap-2">
          <Plus className="h-4 w-4" />
          New Conversation
        </Button>
      </div>

      <EmptyState
        type="conversations"
        title="No conversations yet"
        description="Start a conversation with your team to discuss processes, issues, or share knowledge."
      />
    </div>
  );
}
