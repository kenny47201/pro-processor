import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function KnowledgeFixCommit() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/knowledge/fixes')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Fix Records
      </Button>
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Fix commit will be available once verified fix records exist.
        </CardContent>
      </Card>
    </div>
  );
}
