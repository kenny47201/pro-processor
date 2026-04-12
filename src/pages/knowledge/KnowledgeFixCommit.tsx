import { useState } from 'react';
import { ArrowLeft, GitCommit, BookOpen, FileText, Plus, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTenant } from '@/contexts/TenantContext';
import { fixRecords, fixVerifications } from '@/data/seed/fixRecords';
import { users } from '@/data/seed/users';
import { assets, materials } from '@/data/seed/assets';
import { toast } from '@/hooks/use-toast';
import { ROLE_LABELS } from '@/types/models';
import { format } from 'date-fns';

// Mock defect guides for attaching
const mockDefectGuides = [
  { id: 'DG1', title: 'Flash Defect Troubleshooting Guide' },
  { id: 'DG2', title: 'Short Shot Resolution Guide' },
  { id: 'DG3', title: 'Sink Mark Prevention Guide' },
  { id: 'DG4', title: 'Warpage and Distortion Guide' },
];

export default function KnowledgeFixCommit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, canCommitFixes } = useTenant();

  const [commitType, setCommitType] = useState<'new' | 'attach'>('new');
  const [selectedDefectGuide, setSelectedDefectGuide] = useState<string>('');
  const [managerNotes, setManagerNotes] = useState('');

  const fix = fixRecords.find(f => f.id === id);

  if (!fix) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Fix record not found.</p>
      </div>
    );
  }

  // Check permissions
  if (!canCommitFixes) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">You don't have permission to commit fixes to the knowledge base.</p>
      </div>
    );
  }

  if (fix.status !== 'Verified') {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <AlertTriangle className="h-12 w-12 text-warning" />
        <p className="text-muted-foreground">
          Only verified fixes can be committed. Current status: {fix.status}
        </p>
        <Button variant="outline" asChild>
          <Link to={`/knowledge/fixes/${id}`}>Back to Fix Details</Link>
        </Button>
      </div>
    );
  }

  const creator = users.find(u => u.id === fix.createdBy);
  const verifications = fixVerifications.filter(v => v.fixRecordId === fix.id && v.decision === 'Approve');
  const linkedAssets = fix.relatedAssetIds.map(id => assets.find(a => a.id === id)).filter(Boolean);
  const linkedMaterials = fix.relatedMaterialIds.map(id => materials.find(m => m.id === id)).filter(Boolean);

  const handleCommit = () => {
    if (!managerNotes.trim()) {
      toast({ title: 'Please provide sign-off notes', variant: 'destructive' });
      return;
    }
    if (commitType === 'attach' && !selectedDefectGuide) {
      toast({ title: 'Please select a defect guide to attach to', variant: 'destructive' });
      return;
    }

    toast({
      title: 'Fix Committed to Knowledge Base!',
      description: commitType === 'new' 
        ? `New document "Fix: ${fix.title}" has been created.`
        : 'Fix steps have been added to the selected defect guide.',
    });
    navigate('/knowledge/fixes');
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
          <h1 className="text-2xl font-bold">Commit to Knowledge Base</h1>
          <p className="text-muted-foreground">
            Permanently add this fix to institutional knowledge
          </p>
        </div>
      </div>

      {/* Fix Summary */}
      <Card className="border-success/50 bg-success/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <CardTitle className="text-lg">Verified Fix Record</CardTitle>
          </div>
          <CardDescription>
            This fix has been verified and is ready for commitment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">{fix.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{fix.problemSummary}</p>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Created by:</span>
              <p className="font-medium">{creator?.name} ({creator ? ROLE_LABELS[creator.role] : ''})</p>
            </div>
            <div>
              <span className="text-muted-foreground">Verified by:</span>
              <p className="font-medium">
                {verifications.map(v => {
                  const verifier = users.find(u => u.id === v.verifierUserId);
                  return verifier?.name;
                }).join(', ') || 'N/A'}
              </p>
            </div>
          </div>
          {(linkedAssets.length > 0 || linkedMaterials.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {linkedAssets.map(asset => asset && (
                <Badge key={asset.id} variant="outline">{asset.name}</Badge>
              ))}
              {linkedMaterials.map(mat => mat && (
                <Badge key={mat.id} variant="secondary">{mat.name}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* What Will Be Committed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Content Preview</CardTitle>
          <CardDescription>This is what will be added to the knowledge base</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/50 space-y-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Root Cause</h4>
              <p className="text-sm mt-1">{fix.rootCause}</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Fix Steps</h4>
              <div className="mt-2 space-y-2">
                {fix.fixSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-2 text-sm">
                    <span className="font-medium text-primary">{step.step}.</span>
                    <span>{step.detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Verification Checklist</h4>
              <ul className="mt-2 space-y-1">
                {fix.verificationChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-success" />
                    {item.check}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Commit Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <GitCommit className="h-5 w-5 text-primary" />
            Commit Method
          </CardTitle>
          <CardDescription>
            Choose how to add this fix to the knowledge base
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={commitType} onValueChange={(v) => setCommitType(v as 'new' | 'attach')}>
            <div className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50"
                 onClick={() => setCommitType('new')}>
              <RadioGroupItem value="new" id="new" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="new" className="font-medium cursor-pointer flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Knowledge Document
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Creates a new document titled "Fix: {fix.title}" in the knowledge base
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50"
                 onClick={() => setCommitType('attach')}>
              <RadioGroupItem value="attach" id="attach" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="attach" className="font-medium cursor-pointer flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Attach to Existing Defect Guide
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Add these fix steps to an existing defect troubleshooting guide
                </p>
              </div>
            </div>
          </RadioGroup>

          {commitType === 'attach' && (
            <div className="pl-8 space-y-2">
              <Label htmlFor="defectGuide">Select Defect Guide</Label>
              <Select value={selectedDefectGuide} onValueChange={setSelectedDefectGuide}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a defect guide..." />
                </SelectTrigger>
                <SelectContent>
                  {mockDefectGuides.map(guide => (
                    <SelectItem key={guide.id} value={guide.id}>
                      {guide.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manager Sign-off */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-5 w-5 text-primary" />
            Manager Sign-off
          </CardTitle>
          <CardDescription>
            As a manager, you are confirming this fix is accurate and valuable for the knowledge base
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
            <p className="text-sm text-warning flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              This action is permanent. Once committed, this fix becomes part of institutional knowledge.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="managerNotes">Sign-off Notes *</Label>
            <Textarea
              id="managerNotes"
              placeholder="Confirm you have reviewed this fix and approve its addition to the knowledge base..."
              value={managerNotes}
              onChange={(e) => setManagerNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Separator />

          <div className="flex gap-2">
            <Button variant="outline" asChild className="flex-1">
              <Link to={`/knowledge/fixes/${id}`}>Cancel</Link>
            </Button>
            <Button 
              onClick={handleCommit}
              disabled={!managerNotes.trim() || (commitType === 'attach' && !selectedDefectGuide)}
              className="flex-1 bg-success hover:bg-success/90"
            >
              <GitCommit className="h-4 w-4 mr-2" />
              Commit to Knowledge Base
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
