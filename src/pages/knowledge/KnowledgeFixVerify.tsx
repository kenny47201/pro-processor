import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, FileCheck, AlertTriangle } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useTenant } from '@/contexts/TenantContext';
import { fixRecords, fixVerifications } from '@/data/seed/fixRecords';
import { users } from '@/data/seed/users';
import { assets, materials } from '@/data/seed/assets';
import { toast } from '@/hooks/use-toast';
import { VerificationDecision, ROLE_LABELS } from '@/types/models';
import { format } from 'date-fns';

export default function KnowledgeFixVerify() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, canVerifyFixes } = useTenant();

  const [decision, setDecision] = useState<VerificationDecision | null>(null);
  const [notes, setNotes] = useState('');
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const fix = fixRecords.find(f => f.id === id);

  if (!fix) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Fix record not found.</p>
      </div>
    );
  }

  // Check permissions
  if (!canVerifyFixes) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">You don't have permission to verify fixes.</p>
      </div>
    );
  }

  if (currentUser?.id === fix.createdBy) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <AlertTriangle className="h-12 w-12 text-warning" />
        <p className="text-muted-foreground">You cannot verify your own fix record.</p>
        <Button variant="outline" asChild>
          <Link to={`/knowledge/fixes/${id}`}>Back to Fix Details</Link>
        </Button>
      </div>
    );
  }

  const creator = users.find(u => u.id === fix.createdBy);
  const linkedAssets = fix.relatedAssetIds.map(id => assets.find(a => a.id === id)).filter(Boolean);
  const linkedMaterials = fix.relatedMaterialIds.map(id => materials.find(m => m.id === id)).filter(Boolean);
  const existingVerifications = fixVerifications.filter(v => v.fixRecordId === fix.id);

  const allChecked = fix.verificationChecklist.every((_, idx) => checkedItems[idx]);

  const handleSubmit = () => {
    if (!decision) {
      toast({ title: 'Select a decision', variant: 'destructive' });
      return;
    }
    if (!notes.trim()) {
      toast({ title: 'Please provide verification notes', variant: 'destructive' });
      return;
    }
    if (decision === 'Approve' && !allChecked) {
      toast({ title: 'All checklist items must be verified before approving', variant: 'destructive' });
      return;
    }

    toast({
      title: decision === 'Approve' ? 'Fix Approved!' : decision === 'Reject' ? 'Fix Rejected' : 'Changes Requested',
      description: decision === 'Approve' 
        ? 'Fix is now verified and ready for manager sign-off to commit.'
        : 'The fix creator has been notified.',
    });
    navigate(`/knowledge/fixes/${id}`);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/knowledge/fixes/${id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Verify Fix Record</h1>
          <p className="text-muted-foreground">
            Review and approve or reject this fix
          </p>
        </div>
      </div>

      {/* Fix Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{fix.title}</CardTitle>
            <Badge variant="outline">#{fix.id}</Badge>
          </div>
          <CardDescription>
            Created by {creator?.name} ({creator ? ROLE_LABELS[creator.role] : ''}) on{' '}
            {format(new Date(fix.createdAt), 'MMM d, yyyy')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-1">Problem Summary</h4>
            <p className="text-sm text-muted-foreground">{fix.problemSummary}</p>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium text-sm mb-1">Root Cause</h4>
            <p className="text-sm text-muted-foreground">{fix.rootCause}</p>
          </div>
          {(linkedAssets.length > 0 || linkedMaterials.length > 0) && (
            <>
              <Separator />
              <div className="flex flex-wrap gap-2">
                {linkedAssets.map(asset => asset && (
                  <Badge key={asset.id} variant="outline">{asset.name}</Badge>
                ))}
                {linkedMaterials.map(mat => mat && (
                  <Badge key={mat.id} variant="secondary">{mat.name}</Badge>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Fix Steps Review */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileCheck className="h-5 w-5 text-primary" />
            Fix Steps ({fix.fixSteps.length})
          </CardTitle>
          <CardDescription>Review each step for completeness and accuracy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fix.fixSteps.map((step, idx) => (
              <div key={idx} className="flex gap-3 p-2 rounded-lg bg-muted/50">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium">{step.step}</span>
                </div>
                <p className="text-sm flex-1">{step.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Verification Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Verification Checklist</CardTitle>
          <CardDescription>
            Verify each item has been checked and confirmed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fix.verificationChecklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2">
                <Checkbox
                  id={`check-${idx}`}
                  checked={checkedItems[idx] || false}
                  onCheckedChange={(checked) => 
                    setCheckedItems(prev => ({ ...prev, [idx]: !!checked }))
                  }
                />
                <Label htmlFor={`check-${idx}`} className="text-sm cursor-pointer flex-1">
                  {item.check}
                </Label>
              </div>
            ))}
          </div>
          {!allChecked && (
            <p className="text-xs text-muted-foreground mt-3">
              All items must be checked before approving the fix.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Previous Verifications */}
      {existingVerifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Previous Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {existingVerifications.map(v => {
                const verifier = users.find(u => u.id === v.verifierUserId);
                return (
                  <div key={v.id} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={
                        v.decision === 'Approve' ? 'default' : 
                        v.decision === 'Reject' ? 'destructive' : 'secondary'
                      }>
                        {v.decision === 'Approve' ? 'Approved' : v.decision === 'Reject' ? 'Rejected' : 'Changes Requested'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        by {verifier?.name} on {format(new Date(v.timestamp), 'MMM d')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{v.notes}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Decision */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle className="h-5 w-5 text-primary" />
            Your Decision
          </CardTitle>
          <CardDescription>
            Select your verification decision and provide notes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={decision === 'Approve' ? 'default' : 'outline'}
              className={decision === 'Approve' ? 'bg-success hover:bg-success/90' : ''}
              onClick={() => setDecision('Approve')}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button
              variant={decision === 'RequestChanges' ? 'default' : 'outline'}
              className={decision === 'RequestChanges' ? 'bg-warning hover:bg-warning/90 text-warning-foreground' : ''}
              onClick={() => setDecision('RequestChanges')}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Request Changes
            </Button>
            <Button
              variant={decision === 'Reject' ? 'destructive' : 'outline'}
              onClick={() => setDecision('Reject')}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Verification Notes *</Label>
            <Textarea
              id="notes"
              placeholder={
                decision === 'Approve' 
                  ? 'Describe what you verified and any recommendations...'
                  : decision === 'RequestChanges'
                  ? 'What changes are needed before this can be approved?'
                  : decision === 'Reject'
                  ? 'Why is this fix being rejected?'
                  : 'Select a decision above, then provide your notes...'
              }
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Separator />

          <div className="flex gap-2">
            <Button variant="outline" asChild className="flex-1">
              <Link to={`/knowledge/fixes/${id}`}>Cancel</Link>
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!decision || !notes.trim()}
              className="flex-1"
              variant={decision === 'Reject' ? 'destructive' : 'default'}
            >
              {decision === 'Approve' && <CheckCircle className="h-4 w-4 mr-2" />}
              {decision === 'RequestChanges' && <RotateCcw className="h-4 w-4 mr-2" />}
              {decision === 'Reject' && <XCircle className="h-4 w-4 mr-2" />}
              Submit Decision
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
