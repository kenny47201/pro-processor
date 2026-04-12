import { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Send, Lock, Globe, AlertTriangle, Tag, Users, AtSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTenant } from '@/contexts/TenantContext';
import { conversations, conversationMessages } from '@/data/seed/conversations';
import { users } from '@/data/seed/users';
import { assets, materials } from '@/data/seed/assets';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { ConversationMessage } from '@/types/models';

export default function ConversationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, currentTenant } = useTenant();
  const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState<ConversationMessage[]>([]);
  const [showMentionPopover, setShowMentionPopover] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find(c => c.id === id);
  
  // Check access
  const hasAccess = useMemo(() => {
    if (!conversation || !currentUser) return false;
    if (conversation.visibility === 'Open') return true;
    // Private: only participants can access (strict rule)
    return conversation.participantIds.includes(currentUser.id);
  }, [conversation, currentUser]);

  // Get messages for this conversation
  const messages = useMemo(() => {
    const seedMessages = conversationMessages.filter(m => m.conversationId === id);
    return [...seedMessages, ...localMessages].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }, [id, localMessages]);

  // Get participants info
  const participants = useMemo(() => {
    if (!conversation) return [];
    return conversation.participantIds.map(pid => users.find(u => u.id === pid)).filter(Boolean);
  }, [conversation]);

  // Available users for mentions (same tenant)
  const mentionableUsers = useMemo(() => {
    if (!currentTenant) return [];
    return users
      .filter(u => u.tenantId === currentTenant.id)
      .filter(u => u.name.toLowerCase().includes(mentionQuery.toLowerCase()));
  }, [currentTenant, mentionQuery]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name ?? 'Unknown';
  };

  const getUserDepartment = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.department ?? '';
  };

  const getAssetName = (assetId: string) => {
    const asset = assets.find(a => a.id === assetId);
    return asset?.name ?? 'Unknown Asset';
  };

  const getMaterialName = (materialId: string) => {
    const material = materials.find(m => m.id === materialId);
    return material?.name ?? 'Unknown Material';
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentUser) return;

    // Extract mentions from message (format: @Name)
    const mentionPattern = /@(\w+\s\w+)/g;
    const foundMentions: string[] = [];
    let match;
    while ((match = mentionPattern.exec(newMessage)) !== null) {
      const user = users.find(u => u.name === match[1]);
      if (user) foundMentions.push(user.id);
    }

    const message: ConversationMessage = {
      id: `LOCAL_${Date.now()}`,
      conversationId: id!,
      userId: currentUser.id,
      timestamp: new Date().toISOString(),
      body: newMessage,
      mentions: foundMentions,
    };

    setLocalMessages(prev => [...prev, message]);
    setNewMessage('');
    toast({ title: 'Message sent' });
  };

  const handleMentionSelect = (userName: string) => {
    setNewMessage(prev => prev.replace(/@\w*$/, `@${userName} `));
    setShowMentionPopover(false);
    setMentionQuery('');
  };

  const handleInputChange = (value: string) => {
    setNewMessage(value);
    
    // Check for @ trigger
    const atMatch = value.match(/@(\w*)$/);
    if (atMatch) {
      setShowMentionPopover(true);
      setMentionQuery(atMatch[1]);
    } else {
      setShowMentionPopover(false);
    }
  };

  const handleEscalateToIssue = () => {
    // Navigate to issue creation with context
    navigate('/issues/new', {
      state: {
        fromConversation: conversation?.id,
        title: conversation?.title,
        assetId: conversation?.context?.assetId,
        materialId: conversation?.context?.materialId,
      }
    });
  };

  // Format message body with highlighted mentions
  const formatMessageBody = (body: string) => {
    const parts = body.split(/(@\w+\s\w+)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('@')) {
        return (
          <span key={idx} className="text-primary font-medium bg-primary/10 px-1 rounded">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  if (!conversation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/conversations">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Conversation Not Found</h1>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/conversations">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Access Denied</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <Lock className="h-16 w-16 mx-auto text-destructive mb-4" />
            <h2 className="text-xl font-semibold mb-2">Private Conversation</h2>
            <p className="text-muted-foreground">
              You don't have access to this conversation. Only invited participants can view it.
            </p>
            <Button asChild className="mt-6">
              <Link to="/conversations">Back to Conversations</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/conversations">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              {conversation.visibility === 'Private' ? (
                <Lock className="h-5 w-5 text-amber-500" />
              ) : (
                <Globe className="h-5 w-5 text-primary" />
              )}
              <h1 className="text-xl font-bold">{conversation.title}</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Started by {getUserName(conversation.createdBy)} • {format(new Date(conversation.createdAt), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
        
        <Button variant="destructive" size="sm" onClick={handleEscalateToIssue}>
          <AlertTriangle className="h-4 w-4 mr-2" />
          Escalate to Issue
        </Button>
      </div>

      {/* Context chips and participants */}
      <div className="flex flex-wrap gap-2">
        {conversation.context?.assetId && (
          <Badge variant="outline">
            🔧 {getAssetName(conversation.context.assetId)}
          </Badge>
        )}
        {conversation.context?.materialId && (
          <Badge variant="outline">
            📦 {getMaterialName(conversation.context.materialId)}
          </Badge>
        )}
        {conversation.context?.tags?.map(tag => (
          <Badge key={tag} variant="secondary">
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </Badge>
        ))}
        <Badge variant="outline">
          <Users className="h-3 w-3 mr-1" />
          {participants.length} participants
        </Badge>
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="py-3 border-b">
          <CardTitle className="text-sm flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            Messages ({messages.length})
          </CardTitle>
        </CardHeader>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg, idx) => {
              const isCurrentUser = msg.userId === currentUser?.id;
              const showDateSeparator = idx === 0 || 
                format(new Date(messages[idx - 1].timestamp), 'yyyy-MM-dd') !== 
                format(new Date(msg.timestamp), 'yyyy-MM-dd');

              return (
                <div key={msg.id}>
                  {showDateSeparator && (
                    <div className="flex items-center gap-2 my-4">
                      <div className="flex-1 border-t border-border" />
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(msg.timestamp), 'EEEE, MMMM d')}
                      </span>
                      <div className="flex-1 border-t border-border" />
                    </div>
                  )}
                  
                  <div className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium">
                        {getUserName(msg.userId).split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className={`flex-1 max-w-[70%] ${isCurrentUser ? 'text-right' : ''}`}>
                      <div className={`inline-block rounded-lg px-3 py-2 ${
                        isCurrentUser 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        {!isCurrentUser && (
                          <p className="text-xs font-medium mb-1">
                            {getUserName(msg.userId)}
                            <span className="font-normal text-muted-foreground ml-1">
                              {getUserDepartment(msg.userId)}
                            </span>
                          </p>
                        )}
                        <p className="text-sm">{formatMessageBody(msg.body)}</p>
                      </div>
                      <p className={`text-xs text-muted-foreground mt-1 ${isCurrentUser ? 'text-right' : ''}`}>
                        {format(new Date(msg.timestamp), 'h:mm a')}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Message Input */}
        <CardContent className="border-t py-3">
          <div className="flex gap-2 relative">
            <Popover open={showMentionPopover && mentionableUsers.length > 0} onOpenChange={setShowMentionPopover}>
              <PopoverTrigger asChild>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message... (use @ to mention)"
                    value={newMessage}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                    className="pr-10"
                  />
                  <AtSign className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0" align="start" side="top">
                <div className="max-h-48 overflow-y-auto">
                  {mentionableUsers.slice(0, 8).map(user => (
                    <button
                      key={user.id}
                      className="w-full px-3 py-2 text-left hover:bg-accent flex items-center gap-2"
                      onClick={() => handleMentionSelect(user.name)}
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs">{user.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.department}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
