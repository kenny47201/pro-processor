import { ArrowLeft, Wrench, Link2, CheckCircle, AlertTriangle, Clock, BookOpen, User, Calendar, FileCheck, XCircle, RotateCcw, GitCommit } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTenant } from '@/contexts/TenantContext';
import { fixRecords, fixVerifications } from '@/data/seed/fixRecords';
import { users } from '@/data/seed/users';
import { assets, materials } from '@/data/seed/assets';
import { issues } from '@/data/seed/issues';
import { FixRecordStatus, VerificationDecision, ROLE_LABELS } from '@/types/models';
import { format } from 'date-fns';

const STATUS_CONFIG: Record<FixRecordStatus, { label: string; className: string; icon: React.ReactNode }> = {
  Draft: {
    label: 'Draft',
    className: 'bg-muted text-muted-foreground',
    icon: <Clock className="h-4 w-4" />,
  },
  PendingVerification: {
    label: 'Pending Verification',
    className: 'bg-warning/15 text-warning border-warning/30',
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  Verified: {
    label: 'Verified',
    className: 'bg-primary/15 text-primary border-primary/30',
    icon: <CheckCircle className="h-4 w-4" />,
  },
  Committed: {
    label: 'Committed',
    className: 'bg-success/15 text-success border-success/30',
    icon: <BookOpen className="h-4 w-4" />,
  },
  Rejected: {
    label: 'Rejected',
    className: 'bg-destructive/15 text-destructive border-destructive/30',
    icon: <XCircle className="h-4 w-4" />,
  },
};

const DECISION_CONFIG: Record<VerificationDecision, { label: string; icon: React.ReactNode; className: string }> = {
  Approve: {
    label: 'Approved',
    icon: <CheckCircle className="h-4 w-4" />,
    className: 'text-success',
  },
  Reject: {
    label: 'Rejected',
    icon: <XCircle className="h-4 w-4" />,
    className: 'text-destructive',
  },
  RequestChanges: {
    label: 'Changes Requested',
    icon: <RotateCcw className="h-4 w-4" />,
    className: 'text-warning',
  },
};

export default function KnowledgeFixDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, canVerifyFixes, canCommitFixes } = useTenant();

  const fix = fixRecords.find(f => f.id === id);
  
  if (!fix) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Fix record not found.</p>
      </div>
    );
  }

  const creator = users.find(u => u.id === fix.createdBy);
  const sourceIssue = fix.sourceIssueId ? issues.find(i => i.id === fix.sourceIssueId) : undefined;
  const linkedAssets = fix.relatedAssetIds.map(id => assets.find(a => a.id === id)).filter(Boolean);
  const linkedMaterials = fix.relatedMaterialIds.map(id => materials.find(m => m.id === id)).filter(Boolean);
  const verifications = fixVerifications.filter(v => v.fixRecordId === fix.id);
  const statusConfig = STATUS_CONFIG[fix.status];

  // Check if current user can verify (must be different from creator)
  const canCurrentUserVerify = canVerifyFixes && currentUser?.id !== fix.createdBy && 
    (fix.status === 'PendingVerification' || fix.status === 'Draft');

  // Check if fix can be committed (must be Verified status)
  const canCurrentUserCommit = canCommitFixes && fix.status === 'Verified';

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/knowledge/fixes">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className={`${statusConfig.className} px-2 py-0.5`}>
                {statusConfig.icon}
                <span className="ml-1">{statusConfig.label}</span>
              </Badge>
              <span className="text-sm text-muted-foreground">#{fix.id}</span>
            </div>
            <h1 className="text-2xl font-bold">{fix.title}</h1>
          </div>
        </div>
        <div className="flex gap-2">
          {canCurrentUserVerify && (
            <Button asChild>
              <Link to={`/knowledge/fixes/${fix.id}/verify`}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Verify Fix
              </Link>
            </Button>
          )}
          {canCurrentUserCommit && (
            <Button asChild variant="default">
              <Link to={`/knowledge/fixes/${fix.id}/commit`}>
                <GitCommit className="h-4 w-4 mr-2" />
                Commit to Knowledge Base
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Source Issue Link */}
      {sourceIssue && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link2 className="h-4 w-4 text-primary" />
              <span>Created from issue:</span>
              <Link to={`/issues/${sourceIssue.id}`} className="hover:underline">
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  {sourceIssue.title}
                </Badge>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problem & Root Cause */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wrench className="h-5 w-5 text-primary" />
                Problem Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Problem Summary</h4>
                <p className="text-sm text-muted-foreground">{fix.problemSummary}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-1">Root Cause</h4>
                <p className="text-sm text-muted-foreground">{fix.rootCause}</p>
              </div>
            </CardContent>
          </Card>

          {/* Fix Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileCheck className="h-5 w-5 text-primary" />
                Fix Steps
              </CardTitle>
              <CardDescription>{fix.fixSteps.length} steps to resolve</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {fix.fixSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium">{step.step}</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verification Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Verification Checklist</CardTitle>
              <CardDescription>Checks to confirm the fix works</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {fix.verificationChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-2 border-b last:border-0">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                      item.passed === true ? 'bg-success/15 border-success text-success' :
                      item.passed === false ? 'bg-destructive/15 border-destructive text-destructive' :
                      'border-input'
                    }`}>
                      {item.passed === true && <CheckCircle className="h-3 w-3" />}
                      {item.passed === false && <XCircle className="h-3 w-3" />}
                    </div>
                    <span className="text-sm flex-1">{item.check}</span>
                    {item.passed !== undefined && (
                      <Badge variant="outline" className={item.passed ? 'text-success' : 'text-destructive'}>
                        {item.passed ? 'Passed' : 'Failed'}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Audit Trail */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Verification History</CardTitle>
              <CardDescription>Audit trail of reviews and decisions</CardDescription>
            </CardHeader>
            <CardContent>
              {verifications.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No verifications yet. {fix.status === 'PendingVerification' && 'Awaiting supervisor review.'}
                </p>
              ) : (
                <div className="space-y-4">
                  {verifications.map(verification => {
                    const verifier = users.find(u => u.id === verification.verifierUserId);
                    const decisionConfig = DECISION_CONFIG[verification.decision];
                    
                    return (
                      <div key={verification.id} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                        <div className={`mt-0.5 ${decisionConfig.className}`}>
                          {decisionConfig.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-medium ${decisionConfig.className}`}>
                              {decisionConfig.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              by {verifier?.name || 'Unknown'} ({verifier ? ROLE_LABELS[verifier.role] : ''})
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{verification.notes}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {format(new Date(verification.timestamp), 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Created by</p>
                  <p className="text-sm font-medium">{creator?.name || 'Unknown'}</p>
                  <p className="text-xs text-muted-foreground">{creator ? ROLE_LABELS[creator.role] : ''}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm">{format(new Date(fix.createdAt), 'MMM d, yyyy h:mm a')}</p>
                </div>
              </div>
              {fix.committedToKnowledgeDocId && (
                <>
                  <Separator />
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-success" />
                    <div>
                      <p className="text-xs text-muted-foreground">Committed to</p>
                      <p className="text-sm font-medium text-success">Knowledge Base</p>
                      <p className="text-xs text-muted-foreground">Doc: {fix.committedToKnowledgeDocId}</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Related Equipment */}
          {(linkedAssets.length > 0 || linkedMaterials.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Related Equipment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {linkedAssets.map(asset => asset && (
                  <Badge key={asset.id} variant="outline" className="w-full justify-start">
                    {asset.type === 'Press' ? '⚙️' : asset.type === 'Mold' ? '🔧' : '📦'} {asset.name}
                  </Badge>
                ))}
                {linkedMaterials.map(mat => mat && (
                  <Badge key={mat.id} variant="secondary" className="w-full justify-start">
                    🧪 {mat.name}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          {fix.status !== 'Committed' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {fix.status === 'Draft' && currentUser?.id === fix.createdBy && (
                  <Button className="w-full" variant="outline">
                    Submit for Verification
                  </Button>
                )}
                {canCurrentUserVerify && (
                  <Button className="w-full" asChild>
                    <Link to={`/knowledge/fixes/${fix.id}/verify`}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verify This Fix
                    </Link>
                  </Button>
                )}
                {canCurrentUserCommit && (
                  <Button className="w-full" variant="default" asChild>
                    <Link to={`/knowledge/fixes/${fix.id}/commit`}>
                      <GitCommit className="h-4 w-4 mr-2" />
                      Commit to Knowledge Base
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
