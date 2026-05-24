import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useTenant } from '@/contexts/TenantContext';
import { useCreateIssue, type IssueCategory, type IssuePriority } from '@/hooks/useIssues';
import { supabase } from '@/integrations/supabase/client';

interface ProfileOption { user_id: string; display_name: string | null; screen_name: string | null; }

export default function IssueNew() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useTenant();
  const createIssue = useCreateIssue();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory>('process');
  const [priority, setPriority] = useState<IssuePriority>('medium');
  const [ownerId, setOwnerId] = useState<string>('unassigned');
  const [dueBy, setDueBy] = useState('');
  const [people, setPeople] = useState<ProfileOption[]>([]);

  useEffect(() => {
    if (!currentUser?.tenantId) return;
    supabase.from('profiles')
      .select('user_id, display_name, screen_name')
      .eq('tenant_id', currentUser.tenantId)
      .then(({ data }) => setPeople((data ?? []) as ProfileOption[]));
  }, [currentUser?.tenantId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.tenantId || !currentUser.id) {
      toast({ title: 'Not signed in', variant: 'destructive' });
      return;
    }
    if (title.trim().length < 3) {
      toast({ title: 'Title required', description: 'Use at least 3 characters.', variant: 'destructive' });
      return;
    }
    try {
      const issue = await createIssue.mutateAsync({
        tenant_id: currentUser.tenantId,
        facility_id: currentUser.facilityId ?? null,
        created_by: currentUser.id,
        title: title.trim().slice(0, 200),
        description: description.trim().slice(0, 5000),
        category,
        priority,
        owner_id: ownerId === 'unassigned' ? null : ownerId,
        due_by: dueBy ? new Date(dueBy).toISOString() : null,
      });
      toast({ title: 'Issue reported' });
      navigate(`/issues/${issue.id}`);
    } catch (err) {
      toast({ title: 'Failed to create issue', description: (err as Error).message, variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Button variant="ghost" onClick={() => navigate('/issues')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Issues
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Report New Issue</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} maxLength={200} required placeholder="Brief summary of the issue" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} maxLength={5000} rows={5} placeholder="What's happening? Symptoms, context, what's been tried..." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={v => setCategory(v as IssueCategory)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="process">Process</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="tooling">Tooling</SelectItem>
                    <SelectItem value="quality">Quality</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={priority} onValueChange={v => setPriority(v as IssuePriority)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Assign owner</Label>
                <Select value={ownerId} onValueChange={setOwnerId}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {people.map(p => (
                      <SelectItem key={p.user_id} value={p.user_id}>
                        {p.display_name || p.screen_name || 'User'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="due">Due by</Label>
                <Input id="due" type="date" value={dueBy} onChange={e => setDueBy(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={createIssue.isPending}>
                {createIssue.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Report Issue
              </Button>
              <Button type="button" variant="ghost" onClick={() => navigate('/issues')}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
