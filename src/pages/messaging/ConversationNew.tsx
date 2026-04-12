import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ConversationNew() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/conversations')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Conversations
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>New Conversation</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-muted-foreground">
          Conversation creation will be available once the system is fully configured.
        </CardContent>
      </Card>
    </div>
  );
}
