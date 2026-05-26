import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Check, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useTenant, DEPARTMENTS, type Department } from '@/contexts/TenantContext';
import { toast } from '@/hooks/use-toast';

interface TenantMember {
  user_id: string;
  display_name: string | null;
  screen_name: string | null;
  shift: string | null;
}

export default function ConversationNew() {
  const navigate = useNavigate();
  const { currentTenant, currentFacility, currentUser } = useTenant();
  const [title, setTitle] = useState('');
  const [firstMessage, setFirstMessage] = useState('');
  const [visibility, setVisibility] = useState<'open' | 'private'>('open');
  const initialDept: Department | 'all' = currentUser?.canSeeAllDepartments
    ? 'all'
    : ((currentUser?.department ?? 'Processing') as Department);
  const [department, setDepartment] = useState<Department | 'all'>(initialDept);
  const [submitting, setSubmitting] = useState(false);

  const [members, setMembers] = useState<TenantMember[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!currentTenant || !currentUser) return;
    setLoadingMembers(true);
    supabase
      .from('profiles')
      .select('user_id, display_name, screen_name, shift')
      .eq('tenant_id', currentTenant.id)
      .eq('status', 'active')
      .neq('user_id', currentUser.id)
      .order('display_name', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          toast({ title: 'Could not load people', description: error.message, variant: 'destructive' });
        } else {
          setMembers(data ?? []);
        }
        setLoadingMembers(false);
      });
  }, [currentTenant, currentUser]);

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return members;
    return members.filter(m =>
      (m.display_name ?? '').toLowerCase().includes(q) ||
      (m.screen_name ?? '').toLowerCase().includes(q)
    );
  }, [members, search]);

  const selectedMembers = useMemo(
    () => members.filter(m => selectedIds.has(m.user_id)),
    [members, selectedIds]
  );

  const toggle = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTenant || !currentUser || !title.trim()) return;
    if (visibility === 'private' && selectedIds.size === 0) {
      toast({ title: 'Pick at least one recipient', description: 'Private conversations need participants.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);

    const { data: conv, error } = await supabase
      .from('conversations')
      .insert({
        tenant_id: currentTenant.id,
        facility_id: currentFacility?.id ?? null,
        title: title.trim(),
        visibility,
        department: visibility === 'open' && department !== 'all' ? department : null,
        created_by: currentUser.id,
      })
      .select()
      .single();

    if (error || !conv) {
      toast({ title: 'Failed to create conversation', description: error?.message, variant: 'destructive' });
      setSubmitting(false);
      return;
    }

    if (visibility === 'private' && selectedIds.size > 0) {
      const rows = Array.from(selectedIds).map(uid => ({
        conversation_id: conv.id,
        user_id: uid,
      }));
      const { error: pErr } = await supabase.from('conversation_participants').insert(rows);
      if (pErr) {
        toast({ title: 'Could not add participants', description: pErr.message, variant: 'destructive' });
      }
    }

    if (firstMessage.trim()) {
      await supabase.from('conversation_messages').insert({
        conversation_id: conv.id,
        user_id: currentUser.id,
        body: firstMessage.trim(),
      });
    }

    navigate(`/conversations/${conv.id}`);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Button variant="ghost" onClick={() => navigate('/conversations')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>New Conversation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mold #3 startup issues"
                required
                maxLength={120}
              />
            </div>

            <div className="space-y-2">
              <Label>Visibility</Label>
              <RadioGroup value={visibility} onValueChange={(v) => setVisibility(v as 'open' | 'private')}>
                <div className="flex items-start gap-2 p-3 rounded-md border">
                  <RadioGroupItem value="open" id="open" className="mt-1" />
                  <label htmlFor="open" className="flex-1 cursor-pointer">
                    <div className="font-medium">Open</div>
                    <div className="text-xs text-muted-foreground">Anyone in your organization can see and join.</div>
                  </label>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-md border">
                  <RadioGroupItem value="private" id="private" className="mt-1" />
                  <label htmlFor="private" className="flex-1 cursor-pointer">
                    <div className="font-medium">Private</div>
                    <div className="text-xs text-muted-foreground">Only invited participants can see messages.</div>
                  </label>
                </div>
              </RadioGroup>
            </div>

            {visibility === 'open' && (
              <div className="space-y-2">
                <Label>Department</Label>
                {currentUser?.canSeeAllDepartments ? (
                  <Select value={department} onValueChange={(v) => setDepartment(v as Department | 'all')}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All departments</SelectItem>
                      {DEPARTMENTS.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-sm px-3 py-2 rounded-md border bg-muted/30 text-muted-foreground">
                    {department} <span className="text-xs">(your department)</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">Controls which department can see this open conversation. Supervisors and managers always see everything.</p>
              </div>
            )}

            {visibility === 'private' && (
              <div className="space-y-2">
                <Label>Recipients</Label>

                {selectedMembers.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 p-2 rounded-md border bg-muted/30">
                    {selectedMembers.map(m => (
                      <Badge key={m.user_id} variant="secondary" className="gap-1 pr-1">
                        {m.display_name || m.screen_name || 'User'}
                        <button
                          type="button"
                          onClick={() => toggle(m.user_id)}
                          className="rounded-sm hover:bg-background/50 p-0.5"
                          aria-label="Remove"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search people…"
                    className="pl-8"
                  />
                </div>

                <div className="max-h-56 overflow-auto rounded-md border divide-y">
                  {loadingMembers ? (
                    <div className="p-4 text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading…
                    </div>
                  ) : filteredMembers.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground text-sm">No people found.</div>
                  ) : (
                    filteredMembers.map(m => {
                      const isSel = selectedIds.has(m.user_id);
                      return (
                        <button
                          type="button"
                          key={m.user_id}
                          onClick={() => toggle(m.user_id)}
                          className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-left hover:bg-muted/50 transition-colors ${isSel ? 'bg-primary/5' : ''}`}
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate">
                              {m.display_name || m.screen_name || 'User'}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {m.screen_name && <>@{m.screen_name}</>}
                              {m.screen_name && m.shift && ' · '}
                              {m.shift && <>{m.shift} shift</>}
                            </div>
                          </div>
                          {isSel && <Check className="h-4 w-4 text-primary shrink-0" />}
                        </button>
                      );
                    })
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedIds.size} selected
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="msg">First message (optional)</Label>
              <Textarea
                id="msg"
                value={firstMessage}
                onChange={(e) => setFirstMessage(e.target.value)}
                placeholder="Kick things off…"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => navigate('/conversations')}>Cancel</Button>
              <Button type="submit" disabled={submitting || !title.trim() || (visibility === 'private' && selectedIds.size === 0)}>
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Create
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
