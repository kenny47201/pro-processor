import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, MessageSquare, Lock, Users, Loader2 } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';
import { supabase } from '@/integrations/supabase/client';
import { useTenant } from '@/contexts/TenantContext';
import { formatDistanceToNow } from 'date-fns';

const CATEGORIES = [
  { id: 'open', label: 'Open Threads' },
  { id: 'private', label: 'Private Messages' },
  { id: 'changeover', label: 'Shift Changeover' },
  { id: 'help', label: 'Help Requests' },
  { id: 'schedule', label: 'Schedule / Coverage' },
  { id: 'plant', label: 'Plant Questions' },
  { id: 'linked', label: 'Linked Issue Threads' },
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];

function categorize(c: ConversationRow): CategoryId {
  const t = (c.title || '').toLowerCase();
  if (c.visibility === 'private') return 'private';
  if (/changeover|hand[\s-]?off|shift change/.test(t)) return 'changeover';
  if (/help|assist|support/.test(t)) return 'help';
  if (/schedule|coverage|shift swap|pto|time off/.test(t)) return 'schedule';
  if (/plant|facility|hr|policy/.test(t)) return 'plant';
  if (/issue|ticket|defect|problem/.test(t)) return 'linked';
  return 'open';
}


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
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');

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

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: conversations.length };
    for (const cat of CATEGORIES) map[cat.id] = 0;
    for (const c of conversations) map[categorize(c)] = (map[categorize(c)] || 0) + 1;
    return map;
  }, [conversations]);

  const filtered = useMemo(
    () => (activeCategory === 'all' ? conversations : conversations.filter((c) => categorize(c) === activeCategory)),
    [conversations, activeCategory]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-2 max-w-3xl">
          <h1 className="text-2xl font-bold">Technical Communications</h1>
          <p className="text-muted-foreground text-sm">
            Centralized technical communication for shift changeover, troubleshooting help, schedule clarification,
            private messages, and cross-shift continuity.
          </p>
        </div>
        <Button onClick={() => navigate('/conversations/new')} className="gap-2">
          <Plus className="h-4 w-4" />
          New
        </Button>
      </div>

      <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as CategoryId | 'all')}>
        <TabsList className="flex flex-wrap h-auto">
          <TabsTrigger value="all" className="gap-2">
            All <Badge variant="secondary">{counts.all}</Badge>
          </TabsTrigger>
          {CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id} className="gap-2">
              {cat.label} <Badge variant="secondary">{counts[cat.id] ?? 0}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          type="conversations"
          title={activeCategory === 'all' ? 'No threads yet' : 'Nothing in this category'}
          description="Start a thread to keep technical communication flowing across shifts."
        />
      ) : (
        <div className="space-y-2">
          {filtered.map((c) => (
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
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold truncate">{c.title}</h3>
                    <Badge variant={c.visibility === 'private' ? 'default' : 'secondary'} className="gap-1">
                      {c.visibility === 'private' ? <Lock className="h-3 w-3" /> : <Users className="h-3 w-3" />}
                      {c.visibility}
                    </Badge>
                    {c.department && <Badge variant="outline">{c.department}</Badge>}
                    <Badge variant="outline">
                      {CATEGORIES.find((cat) => cat.id === categorize(c))?.label}
                    </Badge>
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
