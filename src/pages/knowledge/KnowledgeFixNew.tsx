import { useState } from 'react';
import { ArrowLeft, Wrench, Plus, X, Link2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTenant } from '@/contexts/TenantContext';
import { assets, materials } from '@/data/seed/assets';
import { toast } from '@/hooks/use-toast';

interface FixStep {
  step: number;
  detail: string;
}

interface VerificationCheck {
  check: string;
}

export default function KnowledgeFixNew() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, currentTenant } = useTenant();

  // Get context from issue if escalated
  const fromState = location.state as {
    fromIssue?: string;
    title?: string;
    problemSummary?: string;
    assetId?: string;
    materialId?: string;
  } | null;

  const [title, setTitle] = useState(fromState?.title || '');
  const [problemSummary, setProblemSummary] = useState(fromState?.problemSummary || '');
  const [rootCause, setRootCause] = useState('');
  const [fixSteps, setFixSteps] = useState<FixStep[]>([{ step: 1, detail: '' }]);
  const [verificationChecks, setVerificationChecks] = useState<VerificationCheck[]>([{ check: '' }]);
  const [selectedAsset, setSelectedAsset] = useState(fromState?.assetId || '');
  const [selectedMaterial, setSelectedMaterial] = useState(fromState?.materialId || '');

  const tenantAssets = assets.filter(a => a.tenantId === currentTenant?.id);
  const tenantMaterials = materials.filter(m => m.tenantId === currentTenant?.id);

  const addFixStep = () => {
    setFixSteps(prev => [...prev, { step: prev.length + 1, detail: '' }]);
  };

  const updateFixStep = (index: number, detail: string) => {
    setFixSteps(prev => prev.map((s, i) => i === index ? { ...s, detail } : s));
  };

  const removeFixStep = (index: number) => {
    if (fixSteps.length > 1) {
      setFixSteps(prev => prev.filter((_, i) => i !== index).map((s, i) => ({ ...s, step: i + 1 })));
    }
  };

  const addVerificationCheck = () => {
    setVerificationChecks(prev => [...prev, { check: '' }]);
  };

  const updateVerificationCheck = (index: number, check: string) => {
    setVerificationChecks(prev => prev.map((c, i) => i === index ? { check } : c));
  };

  const removeVerificationCheck = (index: number) => {
    if (verificationChecks.length > 1) {
      setVerificationChecks(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({ title: 'Title required', variant: 'destructive' });
      return;
    }
    if (!problemSummary.trim()) {
      toast({ title: 'Problem summary required', variant: 'destructive' });
      return;
    }
    if (!rootCause.trim()) {
      toast({ title: 'Root cause required', variant: 'destructive' });
      return;
    }
    if (fixSteps.every(s => !s.detail.trim())) {
      toast({ title: 'At least one fix step required', variant: 'destructive' });
      return;
    }

    toast({
      title: 'Fix record created',
      description: 'Submitted for verification. A supervisor will review.',
    });
    navigate('/knowledge/fixes');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/knowledge/fixes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">New Fix Record</h1>
          <p className="text-muted-foreground">
            Document a solution to capture tribal knowledge
          </p>
        </div>
      </div>

      {/* From Issue Banner */}
      {fromState?.fromIssue && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link2 className="h-4 w-4 text-primary" />
              <span>Created from issue</span>
              <Link to={`/issues/${fromState.fromIssue}`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  #{fromState.fromIssue}
                </Badge>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            Fix Record Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Brief title describing the fix"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Problem Summary */}
          <div className="space-y-2">
            <Label htmlFor="problem">Problem Summary</Label>
            <Textarea
              id="problem"
              placeholder="Describe the problem that was encountered..."
              value={problemSummary}
              onChange={(e) => setProblemSummary(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* Root Cause */}
          <div className="space-y-2">
            <Label htmlFor="rootCause">Root Cause</Label>
            <Textarea
              id="rootCause"
              placeholder="What was the underlying cause of the problem?"
              value={rootCause}
              onChange={(e) => setRootCause(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* Context */}
          <div className="space-y-2">
            <Label>Related Equipment & Materials</Label>
            <div className="grid grid-cols-2 gap-2">
              <Select value={selectedAsset || "none"} onValueChange={(v) => setSelectedAsset(v === "none" ? "" : v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Link to Asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Asset</SelectItem>
                  {tenantAssets.map(asset => (
                    <SelectItem key={asset.id} value={asset.id}>
                      {asset.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedMaterial || "none"} onValueChange={(v) => setSelectedMaterial(v === "none" ? "" : v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Link to Material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Material</SelectItem>
                  {tenantMaterials.map(mat => (
                    <SelectItem key={mat.id} value={mat.id}>
                      {mat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Fix Steps */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Fix Steps</Label>
              <Button type="button" variant="ghost" size="sm" onClick={addFixStep}>
                <Plus className="h-4 w-4 mr-1" />
                Add Step
              </Button>
            </div>
            <div className="space-y-2">
              {fixSteps.map((step, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-medium">{step.step}</span>
                  </div>
                  <Input
                    placeholder={`Step ${step.step}: Describe the action...`}
                    value={step.detail}
                    onChange={(e) => updateFixStep(idx, e.target.value)}
                    className="flex-1"
                  />
                  {fixSteps.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFixStep(idx)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Verification Checklist */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Verification Checklist</Label>
              <Button type="button" variant="ghost" size="sm" onClick={addVerificationCheck}>
                <Plus className="h-4 w-4 mr-1" />
                Add Check
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              What should be verified to confirm the fix works?
            </p>
            <div className="space-y-2">
              {verificationChecks.map((check, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded border border-input flex-shrink-0" />
                  <Input
                    placeholder="Verification check..."
                    value={check.check}
                    onChange={(e) => updateVerificationCheck(idx, e.target.value)}
                    className="flex-1"
                  />
                  {verificationChecks.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeVerificationCheck(idx)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" asChild className="flex-1">
              <Link to="/knowledge/fixes">Cancel</Link>
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              <Wrench className="h-4 w-4 mr-2" />
              Submit for Verification
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
