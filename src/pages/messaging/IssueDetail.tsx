import { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, AlertCircle, Clock, User, Users, Tag, Link2, 
  MessageSquare, Wrench, CheckCircle2, XCircle, FileText,
  ChevronRight, AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTenant } from '@/contexts/TenantContext';
import { issues, issueEvents, issueSignOffs } from '@/data/seed/issues';
import { users } from '@/data/seed/users';
import { assets, materials } from '@/data/seed/assets';
import { conversations } from '@/data/seed/conversations';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { IssueStatus, IssueEvent, CAN_SIGNOFF_ISSUES } from '@/types/models';

const STATUS_CONFIG: Record<IssueStatus, { label: string; className: string; next?: IssueStatus }> = {
  Open: { label: 'Open', className: 'border-destructive/30 bg-destructive/10 text-destructive', next: 'InProgress' },
  InProgress: { label: 'In Progress', className: 'border-amber-500/30 bg-amber-500/10 text-amber-500', next: 'NeedsVerification' },
  NeedsVerification: { label: 'Needs Verification', className: 'border-primary/30 bg-primary/10 text-primary', next: 'Closed' },
  Closed: { label: 'Closed', className: 'bg-muted text-muted-foreground' },
};

const ACTION_ICONS: Record<string, React.ReactNode> = {
  Created: <AlertCircle className="h-4 w-4 text-primary" />,
  Assigned: <User className="h-4 w-4 text-blue-500" />,
  StatusChange: <ChevronRight className="h-4 w-4 text-amber-500" />,
  Comment: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  FixAdded: <Wrench className="h-4 w-4 text-primary" />,
  Escalated: <AlertTriangle className="h-4 w-4 text-destructive" />,
};

export default function IssueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useTenant();
  
  const [showSignOffDialog, setShowSignOffDialog] = useState(false);
  const [signOffDecision, setSignOffDecision] = useState<'Approved' | 'Rejected' | 'NeedsWork'>('Approved');
  const [signOffNotes, setSignOffNotes] = useState('');
  const [comment, setComment] = useState('');
  const [localEvents, setLocalEvents] = useState<IssueEvent[]>([]);
  const [localStatus, setLocalStatus] = useState<IssueStatus | null>(null);

  const issue = issues.find(i => i.id === id);
  const events = useMemo(() => {
    const seedEvents = issueEvents.filter(e => e.issueId === id);
    return [...seedEvents, ...localEvents].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }, [id, localEvents]);

  const signOff = issueSignOffs.find(s => s.issueId === id);
  const currentStatus = localStatus ?? issue?.status ?? 'Open';

  const canSignOff = currentUser && CAN_SIGNOFF_ISSUES.includes(currentUser.role);
  const isOwner = currentUser?.id === issue?.ownerId;
  const isWatcher = issue?.watcherIds.includes(currentUser?.id ?? '');

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name ?? 'Unknown';
  };

  const getUserRole = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.department ?? '';
  };

  const getAssetName = (assetId: string | undefined) => {
    if (!assetId) return null;
    const asset = assets.find(a => a.id === assetId);
    return asset?.name;
  };

  const getMaterialName = (materialId: string | undefined) => {
    if (!materialId) return null;
    const material = materials.find(m => m.id === materialId);
    return material?.name;
  };

  const handleStatusChange = (newStatus: IssueStatus) => {
    if (newStatus === 'Closed' && !canSignOff) {
      toast({
        title: 'Manager approval required',
        description: 'Only managers can close issues after verification.',
        variant: 'destructive',
      });
      return;
    }

    if (newStatus === 'Closed') {
      setShowSignOffDialog(true);
      return;
    }

    const event: IssueEvent = {
      id: `LOCAL_EVT_${Date.now()}`,
      issueId: id!,
      timestamp: new Date().toISOString(),
      action: 'StatusChange',
      actorId: currentUser?.id ?? '',
      notes: `Status changed from ${currentStatus} to ${newStatus}`,
      metadata: { from: currentStatus, to: newStatus },
    };

    setLocalEvents(prev => [...prev, event]);
    setLocalStatus(newStatus);
    toast({ title: `Status updated to ${STATUS_CONFIG[newStatus].label}` });
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;

    const event: IssueEvent = {
      id: `LOCAL_EVT_${Date.now()}`,
      issueId: id!,
      timestamp: new Date().toISOString(),
      action: 'Comment',
      actorId: currentUser?.id ?? '',
      notes: comment,
    };

    setLocalEvents(prev => [...prev, event]);
    setComment('');
    toast({ title: 'Comment added' });
  };

  const handleSignOff = () => {
    if (signOffDecision === 'Approved') {
      const event: IssueEvent = {
        id: `LOCAL_EVT_${Date.now()}`,
        issueId: id!,
        timestamp: new Date().toISOString(),
        action: 'StatusChange',
        actorId: currentUser?.id ?? '',
        notes: `Manager sign-off: ${signOffNotes || 'Approved for closure'}`,
        metadata: { from: currentStatus, to: 'Closed' },
      };
      setLocalEvents(prev => [...prev, event]);
      setLocalStatus('Closed');
      toast({ title: 'Issue closed with manager approval' });
    } else {
      const event: IssueEvent = {
        id: `LOCAL_EVT_${Date.now()}`,
        issueId: id!,
        timestamp: new Date().toISOString(),
        action: 'Comment',
        actorId: currentUser?.id ?? '',
        notes: `Sign-off ${signOffDecision}: ${signOffNotes}`,
      };
      setLocalEvents(prev => [...prev, event]);
      if (signOffDecision === 'NeedsWork') {
        setLocalStatus('InProgress');
      }
      toast({ title: `Sign-off: ${signOffDecision}` });
    }
    setShowSignOffDialog(false);
    setSignOffNotes('');
  };

  const handleCreateFixRecord = () => {
    navigate('/knowledge/fixes/new', {
      state: {
        fromIssue: issue?.id,
        title: issue?.title,
        problemSummary: issue?.description,
        assetId: issue?.context?.assetId,
        materialId: issue?.context?.materialId,
      }
    });
  };

  if (!issue) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/issues">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Issue Not Found</h1>
        </div>
      </div>
    );
  }

  const linkedConversation = issue.linkedConversationId 
    ? conversations.find(c => c.id === issue.linkedConversationId) 
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/issues">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className={STATUS_CONFIG[currentStatus].className}>
                {STATUS_CONFIG[currentStatus].label}
              </Badge>
              <Badge variant="outline">{issue.category}</Badge>
              <span className={`text-sm font-medium ${
                issue.priority === 'Critical' ? 'text-destructive' :
                issue.priority === 'High' ? 'text-amber-500' : ''
              }`}>
                {issue.priority === 'Critical' && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                {issue.priority} Priority
              </span>
            </div>
            <h1 className="text-xl font-bold">{issue.title}</h1>
            <p className="text-sm text-muted-foreground">
              #{issue.id} • Created {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertCircle className="h-4 w-4 text-primary" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{issue.description}</p>
              
              {/* Context chips */}
              <div className="flex flex-wrap gap-2 mt-4">
                {issue.context?.assetId && (
                  <Badge variant="outline">
                    🔧 {getAssetName(issue.context.assetId)}
                  </Badge>
                )}
                {issue.context?.materialId && (
                  <Badge variant="outline">
                    📦 {getMaterialName(issue.context.materialId)}
                  </Badge>
                )}
                {linkedConversation && (
                  <Link to={`/conversations/${linkedConversation.id}`}>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                      <Link2 className="h-3 w-3 mr-1" />
                      From: {linkedConversation.title}
                    </Badge>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4 text-primary" />
                Timeline ({events.length} events)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {events.map((event, idx) => (
                    <div key={event.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {ACTION_ICONS[event.action] || <MessageSquare className="h-4 w-4" />}
                        </div>
                        {idx < events.length - 1 && (
                          <div className="w-px flex-1 bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{getUserName(event.actorId)}</span>
                          <span className="text-xs text-muted-foreground">
                            {getUserRole(event.actorId)}
                          </span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {format(new Date(event.timestamp), 'MMM d, h:mm a')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.notes}</p>
                        {event.action === 'StatusChange' && event.metadata && (
                          <div className="flex items-center gap-1 mt-1 text-xs">
                            <Badge variant="outline" className="text-xs">
                              {String(event.metadata.from)}
                            </Badge>
                            <ChevronRight className="h-3 w-3" />
                            <Badge variant="outline" className="text-xs">
                              {String(event.metadata.to)}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Sign-off record if closed */}
                  {signOff && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{getUserName(signOff.managerId)}</span>
                          <Badge variant="default" className="text-xs">Manager Sign-Off</Badge>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {format(new Date(signOff.timestamp), 'MMM d, h:mm a')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{signOff.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Add comment */}
              {currentStatus !== 'Closed' && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add a comment or update..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[60px]"
                    />
                    <Button onClick={handleAddComment} disabled={!comment.trim()}>
                      Add
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentStatus !== 'Closed' && (
                <>
                  {STATUS_CONFIG[currentStatus].next && (
                    <Button 
                      className="w-full" 
                      onClick={() => handleStatusChange(STATUS_CONFIG[currentStatus].next!)}
                    >
                      {currentStatus === 'NeedsVerification' ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          {canSignOff ? 'Sign Off & Close' : 'Request Sign-Off'}
                        </>
                      ) : (
                        <>
                          Move to {STATUS_CONFIG[STATUS_CONFIG[currentStatus].next!].label}
                        </>
                      )}
                    </Button>
                  )}
                  
                  <Button variant="outline" className="w-full" onClick={handleCreateFixRecord}>
                    <Wrench className="h-4 w-4 mr-2" />
                    Create Fix Record
                  </Button>

                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Link Knowledge
                  </Button>
                </>
              )}

              {currentStatus === 'Closed' && (
                <div className="text-center py-4">
                  <CheckCircle2 className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">
                    This issue has been closed
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Owner & Watchers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4 text-primary" />
                Assignee
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {getUserName(issue.ownerId).split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{getUserName(issue.ownerId)}</p>
                  <p className="text-xs text-muted-foreground">Owner</p>
                </div>
              </div>

              {issue.watcherIds.length > 0 && (
                <>
                  <div className="border-t pt-3">
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Watchers ({issue.watcherIds.length})
                    </p>
                    <div className="space-y-2">
                      {issue.watcherIds.map(wid => (
                        <div key={wid} className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-xs">
                              {getUserName(wid).split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-sm">{getUserName(wid)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Due Date */}
          {issue.dueBy && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Clock className="h-4 w-4 text-primary" />
                  Due Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">
                  {format(new Date(issue.dueBy), 'EEEE, MMMM d, yyyy')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(issue.dueBy), 'h:mm a')}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Sign-Off Dialog */}
      <Dialog open={showSignOffDialog} onOpenChange={setShowSignOffDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manager Sign-Off</DialogTitle>
            <DialogDescription>
              Review the issue resolution and provide your decision.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Decision</Label>
              <Select value={signOffDecision} onValueChange={(v) => setSignOffDecision(v as typeof signOffDecision)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Approved">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Approve & Close
                    </span>
                  </SelectItem>
                  <SelectItem value="NeedsWork">
                    <span className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-amber-500" />
                      Needs More Work
                    </span>
                  </SelectItem>
                  <SelectItem value="Rejected">
                    <span className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-destructive" />
                      Reject
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                placeholder="Add notes about your decision..."
                value={signOffNotes}
                onChange={(e) => setSignOffNotes(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSignOffDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSignOff}>
              Submit Sign-Off
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
