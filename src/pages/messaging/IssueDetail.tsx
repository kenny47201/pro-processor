import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Loader2, MessageSquare, AlertCircle, Calendar, User as UserIcon, CheckCircle2, XCircle, Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useTenant } from '@/contexts/TenantContext';
import {
  useIssue, useIssueEvents, useUpdateIssue, usePostComment, useSignOff,
  type IssueStatus, type IssuePriority,
} from '@/hooks/useIssues';
import { supabase } from '@/integrations/supabase/client';
import { format, formatDistanceToNow } from 'date-fns';

const STATUS_LABELS: Record<IssueStatus, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  needs_verification: 'Needs Verification',
  closed: 'Closed',
};
const STATUS_STYLES: Record<IssueStatus, string> = {
  open: 'bg-warning/10 text-warning border-warning/30',
  in_progress: 'bg-primary/10 text-primary border-primary/30',
  needs_verification: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  closed: 'bg-muted text-muted-foreground border-border',
};
const PRIORITY_STYLES: Record<IssuePriority, string> = {
  low: 'bg-muted text-muted-foreground border-border',
  medium: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  high: 'bg-warning/10 text-warning border-warning/30',
  critical: 'bg-destructive/10 text-destructive border-destructive/30',
};

interface ProfileLite { user_id: string; display_name: string | null; screen_name: string | null; }

export default function IssueDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { currentUser, canSignOffIssues } = useTenant();
  const { data: issue, isLoading } = useIssue(id);
  const { data: events } = useIssueEvents(id);
  const updateIssue = useUpdateIssue();
  const postComment = usePostComment();
  const signOff = useSignOff();

  const [comment, setComment] = useState('');
  const [profiles, setProfiles] = useState<Record<string, ProfileLite>>({});

  useEffect(() => {
    if (!currentUser?.tenantId) return;
    supabase.from('profiles')
      .select('user_id, display_name, screen_name')
      .eq('tenant_id', currentUser.tenantId)
      .then(({ data }) => {
        const map: Record<string, ProfileLite> = {};
        (data ?? []).forEach((p: ProfileLite) => { map[p.user_id] = p; });
        setProfiles(map);
      });
  }, [currentUser?.tenantId]);

  const nameOf = (uid: string | null | undefined) => {
    if (!uid) return 'Unassigned';
    const p = profiles[uid];
    return p?.display_name || p?.screen_name || uid.slice(0, 6);
  };

  const canEdit = useMemo(() => {
    if (!issue || !currentUser) return false;
    const supervisorish = ['supervisor', 'manager', 'admin', 'super_admin'].includes(currentUser.role);
    return supervisorish || issue.created_by === currentUser.id;
  }, [issue, currentUser]);

  const handleStatusChange = async (next: IssueStatus) => {
    if (!issue || !currentUser) return;
    if (next === 'closed' && !canSignOffIssues) {
      toast({ title: 'Only managers can close issues', variant: 'destructive' });
      return;
    }
    try {
      await updateIssue.mutateAsync({
        id: issue.id,
        patch: {
          status: next,
          ...(next === 'closed' ? { closed_at: new Date().toISOString(), closed_by: currentUser.id } : {}),
        },
        event: {
          actor_id: currentUser.id,
          action: 'status_change',
          notes: `${STATUS_LABELS[issue.status]} → ${STATUS_LABELS[next]}`,
        },
      });
    } catch (err) {
      toast({ title: 'Update failed', description: (err as Error).message, variant: 'destructive' });
    }
  };

  const handlePriorityChange = async (next: IssuePriority) => {
    if (!issue || !currentUser) return;
    try {
      await updateIssue.mutateAsync({
        id: issue.id,
        patch: { priority: next },
        event: { actor_id: currentUser.id, action: 'priority_change', notes: `${issue.priority} → ${next}` },
      });
    } catch (err) {
      toast({ title: 'Update failed', description: (err as Error).message, variant: 'destructive' });
    }
  };

  const handleAssign = async (next: string) => {
    if (!issue || !currentUser) return;
    const owner_id = next === 'unassigned' ? null : next;
    try {
      await updateIssue.mutateAsync({
        id: issue.id,
        patch: { owner_id },
        event: { actor_id: currentUser.id, action: 'assigned', notes: `Assigned to ${nameOf(owner_id)}` },
      });
    } catch (err) {
      toast({ title: 'Update failed', description: (err as Error).message, variant: 'destructive' });
    }
  };

  const handlePostComment = async () => {
    if (!issue || !currentUser || comment.trim().length === 0) return;
    try {
      await postComment.mutateAsync({
        issue_id: issue.id,
        actor_id: currentUser.id,
        notes: comment.trim().slice(0, 2000),
      });
      setComment('');
    } catch (err) {
      toast({ title: 'Failed to post comment', description: (err as Error).message, variant: 'destructive' });
    }
  };

  const handleSignOff = async (decision: 'approved' | 'rejected' | 'needs_work') => {
    if (!issue || !currentUser) return;
    try {
      await signOff.mutateAsync({
        issue_id: issue.id, manager_id: currentUser.id, decision,
      });
      toast({ title: `Sign-off recorded: ${decision}` });
    } catch (err) {
      toast({ title: 'Sign-off failed', description: (err as Error).message, variant: 'destructive' });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  if (!issue) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate('/issues')} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Issues
        </Button>
        <Card><CardContent className="py-12 text-center text-muted-foreground">Issue not found.</CardContent></Card>
      </div>
    );
  }

  const peopleList = Object.values(profiles);

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/issues')} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Issues
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="space-y-2 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={STATUS_STYLES[issue.status]}>{STATUS_LABELS[issue.status]}</Badge>
                <Badge variant="outline" className={PRIORITY_STYLES[issue.priority]}>{issue.priority.toUpperCase()}</Badge>
                <Badge variant="outline" className="bg-card text-muted-foreground capitalize">{issue.category}</Badge>
              </div>
              <CardTitle className="text-xl">{issue.title}</CardTitle>
              <p className="text-xs text-muted-foreground">
                Reported by {nameOf(issue.created_by)} · {formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {issue.description && (
            <p className="whitespace-pre-wrap text-sm">{issue.description}</p>
          )}
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" /> Status
              </label>
              <Select value={issue.status} onValueChange={v => handleStatusChange(v as IssueStatus)} disabled={!canEdit}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(STATUS_LABELS) as IssueStatus[]).map(s => (
                    <SelectItem key={s} value={s} disabled={s === 'closed' && !canSignOffIssues}>
                      {STATUS_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Priority</label>
              <Select value={issue.priority} onValueChange={v => handlePriorityChange(v as IssuePriority)} disabled={!canEdit}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Due by
              </label>
              {canSignOffIssues ? (
                <Input
                  type="date"
                  value={issue.due_by ? new Date(issue.due_by).toISOString().slice(0, 10) : ''}
                  onChange={async (e) => {
                    if (!currentUser) return;
                    const v = e.target.value;
                    const next = v ? new Date(v).toISOString() : null;
                    try {
                      await updateIssue.mutateAsync({
                        id: issue.id,
                        patch: { due_by: next },
                        event: {
                          actor_id: currentUser.id,
                          action: 'status_change',
                          notes: `Due by set to ${v || 'none'}`,
                        },
                      });
                    } catch (err) {
                      toast({ title: 'Update failed', description: (err as Error).message, variant: 'destructive' });
                    }
                  }}
                />
              ) : (
                <p className="text-sm">{issue.due_by ? format(new Date(issue.due_by), 'MMM d, yyyy') : '—'}</p>
              )}
            </div>
          </div>

          {canSignOffIssues && issue.status === 'needs_verification' && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium">Manager sign-off</p>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="success" onClick={() => handleSignOff('approved')} className="gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Approve & Close
                  </Button>
                  <Button size="sm" variant="warning" onClick={() => handleSignOff('needs_work')} className="gap-1">
                    Needs Work
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleSignOff('rejected')} className="gap-1">
                    <XCircle className="h-4 w-4" /> Reject
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Activity & Comments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {(events ?? []).map(ev => (
              <div key={ev.id} className="flex gap-3 text-sm">
                <div className="w-1 self-stretch rounded-full bg-border shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{nameOf(ev.actor_id)}</span>
                    <span>·</span>
                    <span className="capitalize">{ev.action.replace(/_/g, ' ')}</span>
                    <span>·</span>
                    <span>{formatDistanceToNow(new Date(ev.created_at), { addSuffix: true })}</span>
                  </div>
                  {ev.notes && (
                    <p className={`mt-1 whitespace-pre-wrap ${ev.action === 'comment' ? '' : 'text-muted-foreground italic'}`}>
                      {ev.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {(events ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">No activity yet.</p>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <Textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              maxLength={2000}
              rows={3}
              placeholder="Add a comment, update, or finding..."
            />
            <div className="flex justify-end">
              <Button onClick={handlePostComment} disabled={comment.trim().length === 0 || postComment.isPending} className="gap-2">
                <Send className="h-4 w-4" /> Post Comment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
