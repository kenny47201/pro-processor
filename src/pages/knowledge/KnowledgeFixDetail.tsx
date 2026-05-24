import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Wrench, CheckCircle2, ShieldCheck, FileEdit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useTenant } from '@/contexts/TenantContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';

type FixStatus = 'draft' | 'committed' | 'verified';

interface ParamChange { param: string; before: string; after: string; units: string }

interface FixRecord {
  id: string;
  tenant_id: string;
  created_by: string;
  status: FixStatus;
  title: string;
  fix_summary: string | null;
  defect: string | null;
  tool: string | null;
  press: string | null;
  material: string | null;
  color: string | null;
  additive: string | null;
  problem: string;
  root_cause: string;
  solution: string;
  parameter_changes: ParamChange[];
  committed_by: string | null;
  committed_at: string | null;
  verified_by: string | null;
  verified_at: string | null;
  verification_notes: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_META: Record<FixStatus, { label: string; icon: typeof FileEdit; variant: 'secondary' | 'default' | 'outline' }> = {
  draft: { label: 'Draft', icon: FileEdit, variant: 'secondary' },
  committed: { label: 'Committed', icon: CheckCircle2, variant: 'default' },
  verified: { label: 'Verified', icon: ShieldCheck, variant: 'outline' },
};

export default function KnowledgeFixDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { currentUser, canCommitFixes, canVerifyFixes } = useTenant();
  const [rec, setRec] = useState<FixRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifyNotes, setVerifyNotes] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!id) return;
    let active = true;
    const load = async () => {
      const { data } = await supabase.from('knowledge_fixes').select('*').eq('id', id).maybeSingle();
      if (active) {
        setRec(data as unknown as FixRecord);
        setLoading(false);
      }
    };
    load();
    const channel = supabase
      .channel(`fix-${id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'knowledge_fixes', filter: `id=eq.${id}` }, load)
      .subscribe();
    return () => { active = false; supabase.removeChannel(channel); };
  }, [id]);

  const commit = async () => {
    if (!rec || !currentUser) return;
    setBusy(true);
    const { error } = await supabase
      .from('knowledge_fixes')
      .update({ status: 'committed', committed_by: currentUser.id, committed_at: new Date().toISOString() })
      .eq('id', rec.id);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Fix committed');
  };

  const verify = async () => {
    if (!rec || !currentUser) return;
    setBusy(true);
    const { error } = await supabase
      .from('knowledge_fixes')
      .update({
        status: 'verified',
        verified_by: currentUser.id,
        verified_at: new Date().toISOString(),
        verification_notes: verifyNotes.trim() || null,
      })
      .eq('id', rec.id);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Fix verified');
  };

  const remove = async () => {
    if (!rec) return;
    const { error } = await supabase.from('knowledge_fixes').delete().eq('id', rec.id);
    if (error) { toast.error(error.message); return; }
    toast.success('Fix deleted');
    navigate('/knowledge/fixes');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate('/knowledge/fixes')} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Fix Records
        </Button>
        <Card><CardContent className="py-12 text-center text-muted-foreground">Loading…</CardContent></Card>
      </div>
    );
  }

  if (!rec) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate('/knowledge/fixes')} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Fix Records
        </Button>
        <Card><CardContent className="py-12 text-center text-muted-foreground">
          Fix record not found.
        </CardContent></Card>
      </div>
    );
  }

  const meta = STATUS_META[rec.status];
  const StatusIcon = meta.icon;
  const chips = [
    rec.defect && { k: 'Defect', v: rec.defect },
    rec.tool && { k: 'Tool', v: rec.tool },
    rec.press && { k: 'Press', v: rec.press },
    rec.material && { k: 'Material', v: rec.material },
    rec.color && { k: 'Color', v: rec.color },
    rec.additive && { k: 'Additive', v: rec.additive },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/knowledge/fixes')} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Fix Records
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="rounded-md bg-primary/10 p-2 text-primary">
                <Wrench className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-xl">{rec.title}</CardTitle>
                {rec.fix_summary && <p className="mt-1 text-sm text-muted-foreground">{rec.fix_summary}</p>}
              </div>
            </div>
            <Badge variant={meta.variant} className="gap-1 shrink-0">
              <StatusIcon className="h-3 w-3" /> {meta.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {chips.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {chips.map((c) => (
                <Badge key={c.k} variant="outline" className="font-normal">
                  <span className="text-muted-foreground mr-1">{c.k}:</span>{c.v}
                </Badge>
              ))}
            </div>
          )}

          {rec.problem && (
            <Section title="Problem"><p className="whitespace-pre-wrap text-sm">{rec.problem}</p></Section>
          )}
          {rec.root_cause && (
            <Section title="Root cause"><p className="whitespace-pre-wrap text-sm">{rec.root_cause}</p></Section>
          )}
          {rec.solution && (
            <Section title="Solution"><p className="whitespace-pre-wrap text-sm">{rec.solution}</p></Section>
          )}

          {rec.parameter_changes && rec.parameter_changes.length > 0 && (
            <Section title="Process parameter changes">
              <div className="overflow-hidden rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 text-left">Parameter</th>
                      <th className="px-3 py-2 text-left">Before</th>
                      <th className="px-3 py-2 text-left">After</th>
                      <th className="px-3 py-2 text-left">Units</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rec.parameter_changes.map((p, i) => (
                      <tr key={i} className="border-t">
                        <td className="px-3 py-2 font-medium">{p.param || '—'}</td>
                        <td className="px-3 py-2 text-muted-foreground">{p.before || '—'}</td>
                        <td className="px-3 py-2">{p.after || '—'}</td>
                        <td className="px-3 py-2 text-muted-foreground">{p.units || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-3 border-t pt-4">
            <div>Created {format(new Date(rec.created_at), 'PP p')}</div>
            {rec.committed_at && <div>Committed {format(new Date(rec.committed_at), 'PP p')}</div>}
            {rec.verified_at && <div>Verified {format(new Date(rec.verified_at), 'PP p')}</div>}
          </div>

          {rec.verification_notes && (
            <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-sm">
              <div className="font-semibold mb-1">Verification notes</div>
              <p className="whitespace-pre-wrap">{rec.verification_notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Actions</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {rec.status === 'draft' && canCommitFixes && (
              <Button onClick={commit} disabled={busy} className="gap-2">
                <CheckCircle2 className="h-4 w-4" /> Commit fix
              </Button>
            )}
            {rec.status === 'committed' && canVerifyFixes && (
              <div className="w-full space-y-2">
                <Label htmlFor="vnotes">Verification notes (optional)</Label>
                <Textarea
                  id="vnotes"
                  rows={2}
                  value={verifyNotes}
                  onChange={(e) => setVerifyNotes(e.target.value)}
                  placeholder="How was this verified?"
                />
                <Button onClick={verify} disabled={busy} className="gap-2">
                  <ShieldCheck className="h-4 w-4" /> Verify fix
                </Button>
              </div>
            )}
            {rec.status === 'verified' && (
              <p className="text-sm text-muted-foreground">This fix has been verified and is part of your knowledge base.</p>
            )}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-auto gap-2 text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this fix record?</AlertDialogTitle>
                  <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={remove}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">{title}</div>
      {children}
    </div>
  );
}
