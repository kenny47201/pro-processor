import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, Lock, Users, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useTenant } from '@/contexts/TenantContext';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { canDeleteMessage } from '@/lib/permissions';

interface MessageRow {
  id: string;
  conversation_id: string;
  user_id: string;
  body: string;
  created_at: string;
}

interface ConvRow {
  id: string;
  title: string;
  visibility: 'open' | 'private';
  created_by: string;
  tenant_id: string;
}

interface ProfileMini {
  user_id: string;
  display_name: string | null;
  screen_name: string | null;
}

export default function ConversationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useTenant();
  const [conversation, setConversation] = useState<ConvRow | null>(null);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [profiles, setProfiles] = useState<Record<string, ProfileMini>>({});
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const load = async () => {
      const [convRes, msgRes] = await Promise.all([
        supabase.from('conversations').select('*').eq('id', id).maybeSingle(),
        supabase.from('conversation_messages').select('*').eq('conversation_id', id).order('created_at', { ascending: true }),
      ]);
      if (cancelled) return;
      if (convRes.error || !convRes.data) {
        setLoading(false);
        return;
      }
      setConversation(convRes.data as ConvRow);
      const msgs = (msgRes.data || []) as MessageRow[];
      setMessages(msgs);

      const userIds = Array.from(new Set([convRes.data.created_by, ...msgs.map((m) => m.user_id)]));
      if (userIds.length) {
        const { data: profs } = await supabase
          .from('profiles')
          .select('user_id, display_name, screen_name')
          .in('user_id', userIds);
        if (profs) {
          const map: Record<string, ProfileMini> = {};
          profs.forEach((p) => { map[p.user_id] = p; });
          setProfiles(map);
        }
      }
      setLoading(false);
    };

    load();

    const channel = supabase
      .channel(`conv-${id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'conversation_messages', filter: `conversation_id=eq.${id}` },
        async (payload) => {
          const m = payload.new as MessageRow;
          setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m]));
          if (!profiles[m.user_id]) {
            const { data: p } = await supabase
              .from('profiles')
              .select('user_id, display_name, screen_name')
              .eq('user_id', m.user_id)
              .maybeSingle();
            if (p) setProfiles((prev) => ({ ...prev, [p.user_id]: p }));
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'conversation_messages', filter: `conversation_id=eq.${id}` },
        (payload) => {
          const old = payload.old as MessageRow;
          setMessages((prev) => prev.filter((m) => m.id !== old.id));
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || !id || !currentUser) return;
    setSending(true);
    const body = draft.trim();
    setDraft('');
    const { error } = await supabase.from('conversation_messages').insert({
      conversation_id: id,
      user_id: currentUser.id,
      body,
    });
    if (error) {
      toast({ title: 'Could not send message', description: error.message, variant: 'destructive' });
      setDraft(body);
    }
    setSending(false);
  };

  const handleDeleteMessage = async (msgId: string) => {
    const { error } = await supabase.from('conversation_messages').delete().eq('id', msgId);
    if (error) toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
  };

  const nameFor = (uid: string) => profiles[uid]?.display_name || profiles[uid]?.screen_name || 'Unknown';
  const initialsFor = (uid: string) => nameFor(uid).split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase();

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate('/conversations')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Conversation not found or you don't have access.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/conversations')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold truncate">{conversation.title}</h1>
            <Badge variant={conversation.visibility === 'private' ? 'default' : 'secondary'} className="gap-1">
              {conversation.visibility === 'private' ? <Lock className="h-3 w-3" /> : <Users className="h-3 w-3" />}
              {conversation.visibility}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">Started by {nameFor(conversation.created_by)}</p>
        </div>
      </div>

      <Card className="flex-1 overflow-hidden flex flex-col">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">No messages yet. Say hello 👋</p>
          ) : (
            messages.map((m) => {
              const mine = m.user_id === currentUser?.id;
              return (
                <div key={m.id} className={`flex gap-3 ${mine ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="text-xs">{initialsFor(m.user_id)}</AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[75%] ${mine ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <span className="font-medium">{mine ? 'You' : nameFor(m.user_id)}</span>
                      <span>{format(new Date(m.created_at), 'p')}</span>
                    </div>
                    <div
                      className={`group relative rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words ${
                        mine ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}
                    >
                      {m.body}
                      {mine && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Delete this message?')) handleDeleteMessage(m.id);
                          }}
                          className="absolute -left-8 top-1/2 -translate-y-1/2 p-1 rounded-md bg-background/80 border border-border text-muted-foreground hover:text-destructive hover:bg-background"
                          aria-label="Delete message"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <form onSubmit={handleSend} className="border-t p-3 flex gap-2 items-end">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            placeholder="Type a message… (Enter to send, Shift+Enter for newline)"
            rows={1}
            className="min-h-[44px] resize-none flex-1"
            disabled={sending}
          />
          <Button type="submit" disabled={!draft.trim() || sending} size="icon" className="h-11 w-11 shrink-0">
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </Card>
    </div>
  );
}
