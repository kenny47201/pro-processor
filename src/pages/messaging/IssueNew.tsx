import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function IssueNew() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/issues')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Issues
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Report New Issue</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-muted-foreground">
          Issue reporting will be available once the system is fully configured.
        </CardContent>
      </Card>
    </div>
  );
}
