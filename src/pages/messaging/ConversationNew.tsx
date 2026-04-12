import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Lock, Globe, Plus, X, Users, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { useTenant } from '@/contexts/TenantContext';
import { users } from '@/data/seed/users';
import { assets, materials } from '@/data/seed/assets';
import { ConversationVisibility } from '@/types/models';
import { toast } from '@/hooks/use-toast';

export default function ConversationNew() {
  const navigate = useNavigate();
  const { currentUser, currentTenant } = useTenant();
  
  const [title, setTitle] = useState('');
  const [visibility, setVisibility] = useState<ConversationVisibility>('Open');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [firstMessage, setFirstMessage] = useState('');

  // Get users from the same tenant (excluding current user)
  const availableUsers = users.filter(u => 
    u.tenantId === currentTenant?.id && u.id !== currentUser?.id
  );

  // Get assets and materials for this tenant
  const tenantAssets = assets.filter(a => a.tenantId === currentTenant?.id);
  const tenantMaterials = materials.filter(m => m.tenantId === currentTenant?.id);

  const toggleParticipant = (userId: string) => {
    setSelectedParticipants(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: 'Title required',
        description: 'Please enter a conversation title.',
        variant: 'destructive',
      });
      return;
    }

    if (visibility === 'Private' && selectedParticipants.length === 0) {
      toast({
        title: 'Participants required',
        description: 'Private conversations need at least one other participant.',
        variant: 'destructive',
      });
      return;
    }

    if (!firstMessage.trim()) {
      toast({
        title: 'Message required',
        description: 'Please enter an opening message.',
        variant: 'destructive',
      });
      return;
    }

    // In a real app, this would create the conversation in the database
    toast({
      title: 'Conversation created',
      description: `"${title}" has been created.`,
    });
    navigate('/conversations');
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name ?? 'Unknown';
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/conversations">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">New Conversation</h1>
          <p className="text-muted-foreground">Start a discussion with your team</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Conversation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What's this conversation about?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Visibility */}
          <div className="space-y-2">
            <Label>Visibility</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={visibility === 'Open' ? 'default' : 'outline'}
                onClick={() => setVisibility('Open')}
                className="flex-1"
              >
                <Globe className="h-4 w-4 mr-2" />
                Open
              </Button>
              <Button
                type="button"
                variant={visibility === 'Private' ? 'default' : 'outline'}
                onClick={() => setVisibility('Private')}
                className="flex-1"
              >
                <Lock className="h-4 w-4 mr-2" />
                Private
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {visibility === 'Open' 
                ? 'Anyone at this facility can view and join this conversation.'
                : 'Only invited participants can view this conversation. Even managers cannot see it unless added.'}
            </p>
          </div>

          {/* Participants (for Private) */}
          {visibility === 'Private' && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Participants
              </Label>
              
              {/* Selected participants */}
              {selectedParticipants.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedParticipants.map(id => (
                    <Badge key={id} variant="secondary" className="gap-1">
                      {getUserName(id)}
                      <button onClick={() => toggleParticipant(id)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Participant selector */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Participants
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="start">
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {availableUsers.map(user => (
                      <div key={user.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedParticipants.includes(user.id)}
                          onCheckedChange={() => toggleParticipant(user.id)}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.department} • {user.shift} Shift
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Context: Asset */}
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

          {/* Tags */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags
            </Label>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                Add
              </Button>
            </div>
          </div>

          {/* First Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Opening Message</Label>
            <Textarea
              id="message"
              placeholder="Start the conversation..."
              value={firstMessage}
              onChange={(e) => setFirstMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" asChild className="flex-1">
              <Link to="/conversations">Cancel</Link>
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Create Conversation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
