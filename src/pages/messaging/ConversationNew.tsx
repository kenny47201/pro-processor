import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';
import { useTenant } from '@/contexts/TenantContext';
import { toast } from '@/hooks/use-toast';

export default function ConversationNew() {
  const navigate = useNavigate();
  const { currentTenant, currentFacility, currentUser } = useTenant();
  const [title, setTitle] = useState('');
  const [firstMessage, setFirstMessage] = useState('');
  const [visibility, setVisibility] = useState<'open' | 'private'>('open');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTenant || !currentUser || !title.trim()) return;
    setSubmitting(true);

    const { data: conv, error } = await supabase
      .from('conversations')
      .insert({
        tenant_id: currentTenant.id,
        facility_id: currentFacility?.id ?? null,
        title: title.trim(),
        visibility,
        created_by: currentUser.id,
      })
      .select()
      .single();

    if (error || !conv) {
      toast({ title: 'Failed to create conversation', description: error?.message, variant: 'destructive' });
      setSubmitting(false);
      return;
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
              <Button type="submit" disabled={submitting || !title.trim()}>
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
