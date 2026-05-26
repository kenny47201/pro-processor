import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, MessageSquare, Lock, Users, Loader2 } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';
import { supabase } from '@/integrations/supabase/client';
import { useTenant } from '@/contexts/TenantContext';
import { formatDistanceToNow } from 'date-fns';

interface ConversationRow {
  id: string;
  title: string;
  visibility: 'open' | 'private';
  status: 'active' | 'archived';
  created_by: string;
  last_message_at: string;
  tenant_id: string;
  department: 'Processing' | 'Tooling' | 'Maintenance' | null;
}

export default function Conversations() {
  const navigate = useNavigate();
  const { currentTenant, currentUser } = useTenant();
  const [conversations, setConversations] = useState<ConversationRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentTenant) return;

    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('status', 'active')
        .order('last_message_at', { ascending: false });
      if (!error && data) setConversations(data as ConversationRow[]);
      setLoading(false);
    };

    fetchConversations();

    const channel = supabase
      .channel('conversations-list')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'conversations' },
        () => fetchConversations()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentTenant]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Conversations</h1>
          <p className="text-muted-foreground text-sm">Team discussions and collaboration</p>
        </div>
        <Button onClick={() => navigate('/conversations/new')} className="gap-2">
          <Plus className="h-4 w-4" />
          New
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : conversations.length === 0 ? (
        <EmptyState
          type="conversations"
          title="No conversations yet"
          description="Start a conversation with your team to discuss processes, issues, or share knowledge."
        />
      ) : (
        <div className="space-y-2">
          {conversations.map((c) => (
            <Card
              key={c.id}
              className="cursor-pointer transition-all hover:shadow-md hover:border-primary/40"
              onClick={() => navigate(`/conversations/${c.id}`)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-md bg-muted">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">{c.title}</h3>
                    <Badge variant={c.visibility === 'private' ? 'default' : 'secondary'} className="gap-1">
                      {c.visibility === 'private' ? <Lock className="h-3 w-3" /> : <Users className="h-3 w-3" />}
                      {c.visibility}
                    </Badge>
                    {c.department && (
                      <Badge variant="outline">{c.department}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Active {formatDistanceToNow(new Date(c.last_message_at), { addSuffix: true })}
                    {c.created_by === currentUser?.id && ' · You started this'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
