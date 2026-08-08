import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert, ShieldCheck, Search, RefreshCw, Download, Loader2, Filter, ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useTenant } from '@/contexts/TenantContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';

type FixStatus = 'draft' | 'committed' | 'verified';

interface AuditRow {
  id: string;
  title: string;
  status: FixStatus;
  facility_id: string | null;
  created_at: string;
  created_by: string;
  creator_name: string | null;
  verified_by: string | null;
  verifier_name: string | null;
  verified_at: string | null;
  consecutive_passes: number;
  required_passes: number;
  total_passes: number;
  total_fails: number;
  has_independent_pass: boolean;
  self_verified: boolean;
  require_independent_verification: boolean;
  override_active: boolean;
  override_by: string | null;
  override_by_name: string | null;
  override_reason: string | null;
  override_at: string | null;
  blocking_reasons: string[] | null;
}

type ViewFilter = 'all' | 'blocked' | 'overridden' | 'self_verified' | 'no_independent_pass' | 'clean';

const VIEW_LABELS: Record<ViewFilter, string> = {
  all: 'All fix records',
  blocked: 'Has eligibility failures',
  overridden: 'Override recorded',
  self_verified: 'Verified by creator',
  no_independent_pass: 'No independent passing trial',
  clean: 'No findings',
};

const isoDay = (d: Date) => format(d, 'yyyy-MM-dd');

export default function VerificationAudit() {
  const { availableFacilities, currentUser } = useTenant();
  const [rows, setRows] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState(() => isoDay(new Date(Date.now() - 90 * 86400000)));
  const [to, setTo] = useState(() => isoDay(new Date()));
  const [facility, setFacility] = useState<string>('all');
  const [view, setView] = useState<ViewFilter>('blocked');
  const [q, setQ] = useState('');

  const load = async () => {
    setLoading(true);
    const toExclusive = to ? new Date(`${to}T00:00:00`) : null;
    if (toExclusive) toExclusive.setDate(toExclusive.getDate() + 1);
    const { data, error } = await supabase.rpc('fix_verification_audit', {
      _from: from ? new Date(`${from}T00:00:00`).toISOString() : undefined,
      _to: toExclusive ? toExclusive.toISOString() : undefined,
      _facility: facility === 'all' ? undefined : facility,
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setRows((data ?? []) as unknown as AuditRow[]);
  };

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [from, to, facility]);

  const facilityName = (id: string | null) =>
    id ? (availableFacilities.find(f => f.id === id)?.name ?? '—') : '—';

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows.filter((r) => {
      const reasons = r.blocking_reasons ?? [];
      const matchesView =
        view === 'all' ? true
        : view === 'blocked' ? reasons.length > 0
        : view === 'overridden' ? r.override_active
        : view === 'self_verified' ? r.self_verified
        : view === 'no_independent_pass' ? !r.has_independent_pass
        : reasons.length === 0;
      if (!matchesView) return false;
      if (!term) return true;
      return [
        r.title, r.creator_name, r.verifier_name, r.override_by_name, r.override_reason,
        facilityName(r.facility_id), ...reasons,
      ].some((v) => (v ?? '').toString().toLowerCase().includes(term));
    });
  }, [rows, view, q, availableFacilities]);

  const stats = useMemo(() => ({
    total: rows.length,
    blocked: rows.filter(r => (r.blocking_reasons ?? []).length > 0).length,
    overridden: rows.filter(r => r.override_active).length,
    selfVerified: rows.filter(r => r.self_verified).length,
  }), [rows]);

  const exportCsv = () => {
    const header = [
      'Title', 'Status', 'Facility', 'Created', 'Creator', 'Verifier', 'Verified at',
      'Consecutive passes', 'Required passes', 'Fails', 'Independent pass', 'Self-verified',
      'Override by', 'Override at', 'Override reason', 'Eligibility failures',
    ];
    const esc = (v: unknown) => `"${(v ?? '').toString().replace(/"/g, '""')}"`;
    const lines = filtered.map(r => [
      r.title, r.status, facilityName(r.facility_id), format(new Date(r.created_at), 'yyyy-MM-dd HH:mm'),
      r.creator_name ?? '', r.verifier_name ?? '', r.verified_at ? format(new Date(r.verified_at), 'yyyy-MM-dd HH:mm') : '',
      r.consecutive_passes, r.required_passes, r.total_fails,
      r.has_independent_pass ? 'yes' : 'no', r.self_verified ? 'yes' : 'no',
      r.override_by_name ?? '', r.override_at ? format(new Date(r.override_at), 'yyyy-MM-dd HH:mm') : '',
      r.override_reason ?? '', (r.blocking_reasons ?? []).join('; '),
    ].map(esc).join(','));
    const blob = new Blob([[header.map(esc).join(','), ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `verification-audit-${from}_to_${to}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <ShieldAlert className="h-6 w-6 text-warning" /> Verification Audit
          </h1>
          <p className="text-sm text-muted-foreground">
            Fix records with verification eligibility failures and segregation-of-duties override history.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={load} disabled={loading} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
          <Button variant="outline" onClick={exportCsv} disabled={!filtered.length} className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: 'Records in range', value: stats.total },
          { label: 'With findings', value: stats.blocked },
          { label: 'Overrides recorded', value: stats.overridden },
          { label: 'Verified by creator', value: stats.selfVerified },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Filter className="h-4 w-4" /> Filters
          </CardTitle>
          <CardDescription>Created between the selected dates{currentUser?.role === 'super_admin' ? ' (all tenants)' : ''}.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-1">
            <Label htmlFor="from">From</Label>
            <Input id="from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="to">To</Label>
            <Input id="to" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Facility</Label>
            <Select value={facility} onValueChange={setFacility}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All facilities</SelectItem>
                {availableFacilities.map(f => (
                  <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Finding</Label>
            <Select value={view} onValueChange={(v) => setView(v as ViewFilter)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {(Object.keys(VIEW_LABELS) as ViewFilter[]).map(k => (
                  <SelectItem key={k} value={k}>{VIEW_LABELS[k]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="q">Search</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="q" className="pl-8" placeholder="Title, person, reason…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading audit data…
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-14 text-center">
            <ShieldCheck className="h-8 w-8 text-success" />
            <p className="font-medium">No records match these filters</p>
            <p className="text-sm text-muted-foreground">Try widening the date range or switching the finding filter.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => {
            const reasons = r.blocking_reasons ?? [];
            return (
              <Card key={r.id}>
                <CardContent className="space-y-3 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{r.title}</span>
                        <Badge variant="outline" className="capitalize">{r.status}</Badge>
                        {r.override_active && <Badge variant="secondary" className="gap-1"><ShieldAlert className="h-3 w-3" /> Override</Badge>}
                        {r.self_verified && <Badge variant="destructive">Self-verified</Badge>}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {facilityName(r.facility_id)} · Created {format(new Date(r.created_at), 'PP')} by {r.creator_name ?? 'Unknown'}
                        {r.verified_at && ` · Verified ${format(new Date(r.verified_at), 'PP')} by ${r.verifier_name ?? 'Unknown'}`}
                      </div>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="gap-1">
                      <Link to={`/knowledge/fixes/${r.id}`}>Open <ExternalLink className="h-3.5 w-3.5" /></Link>
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                    <span>Passes in a row: <span className="text-foreground">{r.consecutive_passes}/{r.required_passes}</span></span>
                    <span>Total passes: <span className="text-foreground">{r.total_passes}</span></span>
                    <span>Fails: <span className="text-foreground">{r.total_fails}</span></span>
                    <span>Independent pass: <span className={r.has_independent_pass ? 'text-success' : 'text-warning'}>{r.has_independent_pass ? 'yes' : 'no'}</span></span>
                    <span>SoD rule: <span className="text-foreground">{r.require_independent_verification ? 'enforced' : 'off'}</span></span>
                  </div>

                  {reasons.length > 0 && (
                    <div className="rounded-md border border-warning/40 bg-warning/10 p-3 text-sm">
                      <div className="font-medium">Eligibility failures</div>
                      <ul className="mt-1 list-disc pl-4 space-y-0.5 text-muted-foreground">
                        {reasons.map((reason) => <li key={reason}>{reason}</li>)}
                      </ul>
                    </div>
                  )}

                  {r.override_active && (
                    <div className="rounded-md border border-primary/40 bg-primary/10 p-3 text-sm">
                      <div className="font-medium">
                        Override by {r.override_by_name ?? 'admin'}
                        {r.override_at ? ` · ${format(new Date(r.override_at), 'PP p')}` : ''}
                      </div>
                      <p className="mt-1 whitespace-pre-wrap text-muted-foreground">{r.override_reason}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
