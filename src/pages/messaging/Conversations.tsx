import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Plus, Lock, Globe, Users, Tag, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTenant } from '@/contexts/TenantContext';
import { conversations as allConversations, conversationMessages } from '@/data/seed/conversations';
import { users } from '@/data/seed/users';
import { assets } from '@/data/seed/assets';
import { materials } from '@/data/seed/assets';
import { format, formatDistanceToNow } from 'date-fns';

export default function Conversations() {
  const { currentUser, currentTenant } = useTenant();
  const [visibilityFilter, setVisibilityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter conversations by tenant and access rules
  const accessibleConversations = useMemo(() => {
    if (!currentUser || !currentTenant) return [];

    return allConversations
      .filter(conv => conv.tenantId === currentTenant.id)
      .filter(conv => {
        // Open conversations are visible to everyone
        if (conv.visibility === 'Open') return true;
        // Private conversations only visible to participants (strict rule - even managers can't see unless added)
        return conv.participantIds.includes(currentUser.id);
      })
      .filter(conv => {
        if (visibilityFilter === 'all') return true;
        return conv.visibility === visibilityFilter;
      })
      .filter(conv => {
        if (!searchQuery) return true;
        const lowerQuery = searchQuery.toLowerCase();
        return (
          conv.title.toLowerCase().includes(lowerQuery) ||
          conv.context?.tags?.some(t => t.toLowerCase().includes(lowerQuery))
        );
      })
      .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
  }, [currentUser, currentTenant, visibilityFilter, searchQuery]);

  const getAssetName = (assetId: string) => {
    const asset = assets.find(a => a.id === assetId);
    return asset?.name ?? 'Unknown Asset';
  };

  const getMaterialName = (materialId: string) => {
    const material = materials.find(m => m.id === materialId);
    return material?.name ?? 'Unknown Material';
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name ?? 'Unknown';
  };

  const getMessageCount = (convId: string) => {
    return conversationMessages.filter(m => m.conversationId === convId).length;
  };

  const getLastMessage = (convId: string) => {
    const msgs = conversationMessages.filter(m => m.conversationId === convId);
    if (msgs.length === 0) return null;
    return msgs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Conversations</h1>
            <p className="text-muted-foreground">
              Team discussions and cross-shift communication
            </p>
          </div>
        </div>
        <Button asChild>
          <Link to="/conversations/new">
            <Plus className="h-4 w-4 mr-2" />
            New Conversation
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select value={visibilityFilter} onValueChange={setVisibilityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Visibility</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary badges */}
      <div className="flex gap-2">
        <Badge variant="secondary">
          <Globe className="h-3 w-3 mr-1" />
          {accessibleConversations.filter(c => c.visibility === 'Open').length} Open
        </Badge>
        <Badge variant="outline">
          <Lock className="h-3 w-3 mr-1" />
          {accessibleConversations.filter(c => c.visibility === 'Private').length} Private
        </Badge>
        <Badge variant="outline">
          {accessibleConversations.filter(c => c.status === 'Active').length} Active
        </Badge>
      </div>

      {/* Conversations List */}
      <div className="space-y-3">
        {accessibleConversations.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No conversations found</p>
              <Button asChild className="mt-4">
                <Link to="/conversations/new">Start a Conversation</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          accessibleConversations.map(conv => {
            const lastMsg = getLastMessage(conv.id);
            const msgCount = getMessageCount(conv.id);
            
            return (
              <Link key={conv.id} to={`/conversations/${conv.id}`}>
                <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {conv.visibility === 'Private' ? (
                            <Lock className="h-4 w-4 text-amber-500 flex-shrink-0" />
                          ) : (
                            <Globe className="h-4 w-4 text-primary flex-shrink-0" />
                          )}
                          <h3 className="font-semibold truncate">{conv.title}</h3>
                          {conv.status === 'Archived' && (
                            <Badge variant="secondary" className="text-xs">Archived</Badge>
                          )}
                        </div>
                        
                        {/* Context chips */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {conv.context?.assetId && (
                            <Badge variant="outline" className="text-xs">
                              🔧 {getAssetName(conv.context.assetId)}
                            </Badge>
                          )}
                          {conv.context?.materialId && (
                            <Badge variant="outline" className="text-xs">
                              📦 {getMaterialName(conv.context.materialId)}
                            </Badge>
                          )}
                          {conv.context?.tags?.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              <Tag className="h-2.5 w-2.5 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Last message preview */}
                        {lastMsg && (
                          <p className="text-sm text-muted-foreground truncate">
                            <span className="font-medium">{getUserName(lastMsg.userId)}:</span> {lastMsg.body}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                        <span>{formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: true })}</span>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{conv.participantIds.length}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {msgCount} messages
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
