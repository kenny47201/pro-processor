import { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle, Link2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTenant } from '@/contexts/TenantContext';
import { users } from '@/data/seed/users';
import { assets, materials } from '@/data/seed/assets';
import { IssueCategory, IssuePriority } from '@/types/models';
import { toast } from '@/hooks/use-toast';

const CATEGORIES: IssueCategory[] = ['Process', 'Maintenance', 'Tooling', 'Quality'];
const PRIORITIES: IssuePriority[] = ['Low', 'Medium', 'High', 'Critical'];

export default function IssueNew() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, currentTenant } = useTenant();

  // Get any context passed from conversation escalation
  const fromState = location.state as {
    fromConversation?: string;
    title?: string;
    assetId?: string;
    materialId?: string;
  } | null;

  const [title, setTitle] = useState(fromState?.title || '');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory>('Process');
  const [priority, setPriority] = useState<IssuePriority>('Medium');
  const [selectedAsset, setSelectedAsset] = useState(fromState?.assetId || '');
  const [selectedMaterial, setSelectedMaterial] = useState(fromState?.materialId || '');
  const [ownerId, setOwnerId] = useState(currentUser?.id || '');

  // Get available users from same tenant
  const tenantUsers = users.filter(u => u.tenantId === currentTenant?.id);
  const tenantAssets = assets.filter(a => a.tenantId === currentTenant?.id);
  const tenantMaterials = materials.filter(m => m.tenantId === currentTenant?.id);

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: 'Title required',
        description: 'Please enter an issue title.',
        variant: 'destructive',
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: 'Description required',
        description: 'Please describe the issue.',
        variant: 'destructive',
      });
      return;
    }

    // In a real app, this would create the issue in the database
    toast({
      title: 'Issue logged',
      description: `Issue "${title}" has been created with ${priority} priority.`,
    });
    navigate('/issues');
  };

  const getPriorityColor = (p: IssuePriority) => {
    switch (p) {
      case 'Critical': return 'text-red-500';
      case 'High': return 'text-orange-500';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/issues">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Log New Issue</h1>
          <p className="text-muted-foreground">
            Report a production issue for tracking and resolution
          </p>
        </div>
      </div>

      {/* Escalation context banner */}
      {fromState?.fromConversation && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link2 className="h-4 w-4 text-primary" />
              <span>Escalated from conversation</span>
              <Badge variant="outline">#{fromState.fromConversation}</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Issue Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Brief description of the issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide details about what happened, when, and any observations..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as IssueCategory)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as IssuePriority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map(p => (
                    <SelectItem key={p} value={p}>
                      <span className={getPriorityColor(p)}>{p}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Context: Asset & Material */}
          <div className="space-y-2">
            <Label>Context (Optional)</Label>
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

          {/* Owner */}
          <div className="space-y-2">
            <Label>Assign Owner</Label>
            <Select value={ownerId} onValueChange={setOwnerId}>
              <SelectTrigger>
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                {tenantUsers.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} ({user.department})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" asChild className="flex-1">
              <Link to="/issues">Cancel</Link>
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Log Issue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
