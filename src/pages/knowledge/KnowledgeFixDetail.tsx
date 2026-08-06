import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Wrench, CheckCircle2, ShieldCheck, FileEdit, Trash2, FlaskConical, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useTenant } from '@/contexts/TenantContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format, formatDistanceToNow } from 'date-fns';
import AttachmentsCard from '@/components/AttachmentsCard';
import { MachinePicker, MoldPicker } from '@/components/forms/MachineMoldPickers';
import { useMachines, useMolds } from '@/hooks/useMachinesMolds';
import { canDeleteFixRecord, canDeleteFixTrial } from '@/lib/permissions';

type FixStatus = 'draft' | 'committed' | 'verified';
type TrialOutcome = 'pass' | 'fail';

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
  consecutive_passes: number;
  total_passes: number;
  total_fails: number;
  required_passes: number;
}

interface TrialRow {
  id: string;
  fix_id: string;
  logged_by: string;
  outcome: TrialOutcome;
  notes: string | null;
  press: string | null;
  tool: string | null;
  machine_id: string | null;
  mold_id: string | null;
  shot_count: number | null;
  created_at: string;
}

const STATUS_META: Record<FixStatus, { label: string; icon: typeof FileEdit; variant: 'secondary' | 'default' | 'outline' }> = {
  draft: { label: 'Draft', icon: FileEdit, variant: 'secondary' },
  committed: { label: 'In Trial', icon: FlaskConical, variant: 'default' },
  verified: { label: 'Verified', icon: ShieldCheck, variant: 'outline' },
};

export default function KnowledgeFixDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { currentUser, canCommitFixes, canVerifyFixes } = useTenant();
  const { data: machines = [] } = useMachines(currentUser?.tenantId ?? null);
  const { data: molds = [] } = useMolds(currentUser?.tenantId ?? null);
  const machineName = (id: string | null) => id ? (machines.find(m => m.id === id)?.name ?? null) : null;
  const moldName = (id: string | null) => id ? (molds.find(m => m.id === id)?.name ?? null) : null;
  const [rec, setRec] = useState<FixRecord | null>(null);
  const [trials, setTrials] = useState<TrialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifyNotes, setVerifyNotes] = useState('');
  const [busy, setBusy] = useState(false);

  // Trial form state
  const [tOutcome, setTOutcome] = useState<TrialOutcome>('pass');
  const [tNotes, setTNotes] = useState('');
  const [tMachineId, setTMachineId] = useState<string | null>(null);
  const [tMoldId, setTMoldId] = useState<string | null>(null);
  const [tShots, setTShots] = useState('');

  useEffect(() => {
    if (!id) return;
    let active = true;
    const load = async () => {
      const [{ data: fix }, { data: tr }] = await Promise.all([
        supabase.from('knowledge_fixes').select('*').eq('id', id).maybeSingle(),
        supabase.from('fix_trials').select('*').eq('fix_id', id).order('created_at', { ascending: false }),
      ]);
      if (active) {
        setRec(fix as unknown as FixRecord);
        setTrials((tr ?? []) as TrialRow[]);
        setLoading(false);
      }
    };
    load();
    const channel = supabase
      .channel(`fix-${id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'knowledge_fixes', filter: `id=eq.${id}` }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fix_trials', filter: `fix_id=eq.${id}` }, load)
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
    toast.success('Fix released for trial');
  };

  const verify = async () => {
    if (!rec || !currentUser) return;
    if (rec.consecutive_passes < rec.required_passes) {
      toast.error(`Needs ${rec.required_passes} consecutive passing trials before verification.`);
      return;
    }
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
    toast.success('Fix verified & committed to knowledge base');
  };

  const logTrial = async () => {
    if (!rec || !currentUser) return;
    setBusy(true);
    const { error } = await supabase.from('fix_trials').insert({
      fix_id: rec.id,
      tenant_id: rec.tenant_id,
      logged_by: currentUser.id,
      outcome: tOutcome,
      notes: tNotes.trim() || null,
      machine_id: tMachineId,
      mold_id: tMoldId,
      shot_count: tShots ? Number(tShots) : null,
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    setTNotes(''); setTMachineId(null); setTMoldId(null); setTShots(''); setTOutcome('pass');
    toast.success(tOutcome === 'pass' ? 'Pass logged' : 'Fail logged — counter reset');
  };

  const deleteTrial = async (trialId: string) => {
    // Note: deleting a trial does NOT revert the counter (trigger only fires on insert).
    // This is intentional — trial history is auditable; remove only erroneous entries.
    const { error } = await supabase.from('fix_trials').delete().eq('id', trialId);
    if (error) { toast.error(error.message); return; }
    toast.success('Trial entry removed (counters unchanged)');
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

  const progressPct = Math.min(100, (rec.consecutive_passes / Math.max(rec.required_passes, 1)) * 100);
  const readyToVerify = rec.consecutive_passes >= rec.required_passes;
  const inTrial = rec.status === 'committed';

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
            {rec.committed_at && <div>Released to trial {format(new Date(rec.committed_at), 'PP p')}</div>}
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

      <AttachmentsCard fixId={rec.id} tenantId={rec.tenant_id} />


      {/* Trial Progress + Logging */}
      {(inTrial || rec.status === 'verified') && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-primary" /> Trial Progress
              </CardTitle>
              <div className="text-sm font-mono">
                <span className={readyToVerify ? 'text-success' : 'text-foreground'}>
                  {rec.consecutive_passes}
                </span>
                <span className="text-muted-foreground"> / {rec.required_passes} consecutive passes</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progressPct} className="h-2" />
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span>Total passes: <span className="text-foreground font-medium">{rec.total_passes}</span></span>
              <span>Total fails: <span className="text-foreground font-medium">{rec.total_fails}</span></span>
              {!readyToVerify && inTrial && (
                <span className="text-warning">
                  {rec.required_passes - rec.consecutive_passes} more pass{rec.required_passes - rec.consecutive_passes === 1 ? '' : 'es'} needed for verification
                </span>
              )}
              {readyToVerify && inTrial && (
                <span className="text-success font-medium">Threshold met — ready for verification</span>
              )}
            </div>

            {inTrial && (
              <div className="rounded-md border bg-muted/20 p-3 space-y-3">
                <div className="text-sm font-semibold">Log a trial run</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2 flex gap-2">
                    <Button
                      type="button"
                      variant={tOutcome === 'pass' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTOutcome('pass')}
                      className="gap-1"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Pass
                    </Button>
                    <Button
                      type="button"
                      variant={tOutcome === 'fail' ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={() => setTOutcome('fail')}
                      className="gap-1"
                    >
                      <X className="h-3.5 w-3.5" /> Fail
                    </Button>
                    {tOutcome === 'fail' && (
                      <span className="text-xs text-warning self-center ml-2">
                        ⚠ Logging a fail will reset consecutive passes to 0
                      </span>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs">Press</Label>
                    <MachinePicker value={tMachineId} onChange={setTMachineId} />
                  </div>
                  <div>
                    <Label className="text-xs">Tool</Label>
                    <MoldPicker value={tMoldId} onChange={setTMoldId} />
                  </div>
                  <div>
                    <Label htmlFor="t-shots" className="text-xs">Shot count</Label>
                    <Input id="t-shots" type="number" min={0} value={tShots} onChange={(e) => setTShots(e.target.value)} placeholder="e.g. 250" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="t-notes" className="text-xs">Observations</Label>
                    <Textarea id="t-notes" rows={2} value={tNotes} onChange={(e) => setTNotes(e.target.value)} placeholder="What did you see?" />
                  </div>
                </div>
                <Button onClick={logTrial} disabled={busy} size="sm" className="gap-2">
                  <FlaskConical className="h-4 w-4" /> Log trial
                </Button>
              </div>
            )}

            {trials.length > 0 && (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Trial history ({trials.length})
                </div>
                <div className="space-y-1.5 max-h-72 overflow-y-auto">
                  {trials.map((t) => (
                    <div key={t.id} className="flex items-start gap-2 rounded-md border p-2 text-sm">
                      <Badge
                        variant={t.outcome === 'pass' ? 'default' : 'destructive'}
                        className="gap-1 shrink-0"
                      >
                        {t.outcome === 'pass' ? <CheckCircle2 className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        {t.outcome.toUpperCase()}
                      </Badge>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                          <span>{formatDistanceToNow(new Date(t.created_at), { addSuffix: true })}</span>
                          {(machineName(t.machine_id) || t.press) && <span>· Press: <span className="text-foreground">{machineName(t.machine_id) || t.press}</span></span>}
                          {(moldName(t.mold_id) || t.tool) && <span>· Tool: <span className="text-foreground">{moldName(t.mold_id) || t.tool}</span></span>}
                          {t.shot_count != null && <span>· Shots: <span className="text-foreground">{t.shot_count}</span></span>}
                        </div>
                        {t.notes && <div className="mt-1 whitespace-pre-wrap">{t.notes}</div>}
                      </div>
                      {canDeleteFixTrial(currentUser, { logged_by: t.logged_by, tenant_id: rec.tenant_id }) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => deleteTrial(t.id)}
                          title="Remove entry (does not change counters)"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle className="text-base">Actions</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {rec.status === 'draft' && canCommitFixes && (
              <Button onClick={commit} disabled={busy} className="gap-2">
                <FlaskConical className="h-4 w-4" /> Release to trial
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
                <Button
                  onClick={verify}
                  disabled={busy || !readyToVerify}
                  className="gap-2"
                  title={readyToVerify ? '' : `Needs ${rec.required_passes} consecutive passing trials first`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  {readyToVerify
                    ? 'Verify & commit to knowledge base'
                    : `Verify (${rec.consecutive_passes}/${rec.required_passes} trials)`}
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
                  <AlertDialogDescription>This cannot be undone. All trial history will also be deleted.</AlertDialogDescription>
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
