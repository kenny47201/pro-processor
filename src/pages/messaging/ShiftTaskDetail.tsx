import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ShiftTaskDetail() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/shift-tasks')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Shift Tasks
      </Button>
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Task not found or no data available yet.
        </CardContent>
      </Card>
    </div>
  );
}
