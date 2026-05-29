import { useState } from 'react';
import { Settings as SettingsIcon, FlaskConical, Loader2, AlertTriangle, CheckCircle2, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useTenant } from '@/contexts/TenantContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import acupathFixture from '@/data/acupathTestTenant.json';

interface ImportSummary {
  tenant: string;
  tenantId: string;
  facility: string;
  facilityId: string;
  usersCreated: number;
  usersUpdated: number;
  fixRecordsCreated: number;
  issuesCreated: number;
  departmentPrioritiesCreated: number;
  operatorsExcluded: number;
  qcExcluded: number;
  defaultPassword: string;
  userCredentials: Array<{ screenName: string; email: string; role: string; created: boolean }>;
}

interface ImportPlan {
  dryRun: true;
  tenant: { name: string; slug: string; action: 'create' | 'update'; existingId: string | null };
  facility: { name: string; action: 'create' | 'update'; existingId: string | null };
  users: Array<{ screenName: string; email: string; role: string; shift: string; action: 'create' | 'update' }>;
  fixRecords: { willCreate: number; items: Array<{ title: string; createdBy: string }> };
  issues: { willCreate: number; items: Array<{ title: string; createdBy: string }> };
  departmentPriorities: { willCreate: number; items: Array<{ title: string; department: string | null; itemCount: number }> };
}

interface ImportSummary {
  tenant: string;
  tenantId: string;
  facility: string;
  facilityId: string;
  usersCreated: number;
  usersUpdated: number;
  fixRecordsCreated: number;
  issuesCreated: number;
  departmentPrioritiesCreated: number;
  operatorsExcluded: number;
  qcExcluded: number;
  defaultPassword: string;
  userCredentials: Array<{ screenName: string; email: string; role: string; created: boolean }>;
}

export default function Settings() {
  const { currentUser } = useTenant();
  const canImport = currentUser?.role === 'admin' || currentUser?.role === 'super_admin';

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [dryRun, setDryRun] = useState(true);
  const [summary, setSummary] = useState<ImportSummary | null>(null);
  const [plan, setPlan] = useState<ImportPlan | null>(null);
  const [lastWasDryRun, setLastWasDryRun] = useState(false);

  async function runImport(asDryRun: boolean) {
    setImporting(true);
    setSummary(null);
    setPlan(null);
    try {
      const { data, error } = await supabase.functions.invoke('import-test-tenant', {
        body: { fixture: acupathFixture, dryRun: asDryRun },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setSummary(data.summary);
      setPlan(data.plan ?? null);
      setLastWasDryRun(asDryRun);
      toast({
        title: asDryRun ? 'Dry run complete' : 'Import complete',
        description: asDryRun
          ? 'Preview only — no records were written.'
          : 'AcuPath technical test tenant loaded.',
      });
    } catch (e: any) {
      toast({
        title: asDryRun ? 'Dry run failed' : 'Import failed',
        description: e?.message ?? 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setImporting(false);
      setConfirmOpen(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground">System configuration and taxonomy management</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">System Settings</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-muted-foreground">
          Settings and taxonomy management will be available once the system is fully configured.
        </CardContent>
      </Card>

      {canImport && (
        <Card className="border-warning/40">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-warning" />
              Test Tenant Import
            </CardTitle>
            <CardDescription>
              Development utility — admin and super admin only.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive" className="border-warning/40 bg-warning/10">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>For development &amp; demo validation only</AlertTitle>
              <AlertDescription>
                This imports fictional test data for development and demo validation only.
                It seeds the <strong>AcuPath Precision Molding</strong> tenant with a Warsaw
                facility, technical users, sample fix records, recurring technical issues, and
                department priorities. Operators and Q.C. accounts are intentionally excluded.
              </AlertDescription>
            </Alert>

            <div className="text-sm text-muted-foreground space-y-1">
              <p>Will create or update:</p>
              <ul className="list-disc list-inside ml-2 space-y-0.5">
                <li>Tenant: AcuPath Precision Molding, LLC</li>
                <li>Facility: AcuPath Warsaw Medical Molding Plant</li>
                <li>{(acupathFixture as any).technicalUsers.length} technical users (managers, supervisors, mold/maintenance/tooling techs)</li>
                <li>{(acupathFixture as any).sampleFixRecords.length} sample fix records</li>
                <li>{(acupathFixture as any).sampleRecurringTechnicalIssues.length} recurring technical issues</li>
                <li>{(acupathFixture as any).sampleDepartmentPriorities.length} department priority list(s)</li>
              </ul>
            </div>

            <div className="flex items-center justify-between rounded border border-border bg-background/40 px-3 py-2">
              <div>
                <Label htmlFor="dry-run-toggle" className="text-sm font-medium">Dry run (preview only)</Label>
                <p className="text-xs text-muted-foreground">Show every record that would be created or updated. No writes.</p>
              </div>
              <Switch id="dry-run-toggle" checked={dryRun} onCheckedChange={setDryRun} disabled={importing} />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => runImport(true)}
                disabled={importing}
              >
                {importing && lastWasDryRun ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Previewing…</>
                ) : (
                  <><Eye className="h-4 w-4 mr-2" /> Preview (dry run)</>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => (dryRun ? runImport(true) : setConfirmOpen(true))}
                disabled={importing}
                className="border-warning/60"
              >
                {importing && !lastWasDryRun ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Importing…</>
                ) : (
                  <><FlaskConical className="h-4 w-4 mr-2" /> {dryRun ? 'Run dry run' : 'Import AcuPath Technical Tenant'}</>
                )}
              </Button>
            </div>

            {summary && (
              <Alert className={lastWasDryRun ? 'border-primary/40 bg-primary/5' : 'border-success/40 bg-success/10'}>
                {lastWasDryRun ? <Eye className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                <AlertTitle>{lastWasDryRun ? 'Dry run plan — nothing was written' : 'Import summary'}</AlertTitle>
                <AlertDescription>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>Tenant {summary.tenant}</li>
                    <li>Facility {summary.facility}</li>
                    <li>Technical users: {summary.usersCreated} {lastWasDryRun ? 'to create' : 'created'}, {summary.usersUpdated} {lastWasDryRun ? 'to update' : 'updated'}</li>
                    <li>Fix records {lastWasDryRun ? 'to create' : 'created'}: {summary.fixRecordsCreated}</li>
                    <li>Technical issues {lastWasDryRun ? 'to create' : 'created'}: {summary.issuesCreated}</li>
                    <li>Department priority lists {lastWasDryRun ? 'to create' : 'created'}: {summary.departmentPrioritiesCreated}</li>
                    <li>Operators excluded ✓</li>
                    <li>Q.C. users excluded ✓</li>
                  </ul>

                  {lastWasDryRun && plan && (
                    <div className="mt-4 space-y-3 text-xs">
                      <div className="rounded border border-border bg-background/60 p-2">
                        <p className="font-medium mb-1">Tenant &amp; facility</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={plan.tenant.action === 'create' ? 'default' : 'secondary'}>{plan.tenant.action}</Badge>
                          <span>{plan.tenant.name} ({plan.tenant.slug})</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={plan.facility.action === 'create' ? 'default' : 'secondary'}>{plan.facility.action}</Badge>
                          <span>{plan.facility.name}</span>
                        </div>
                      </div>

                      <div className="rounded border border-border bg-background/60 p-2">
                        <p className="font-medium mb-1">Users ({plan.users.length})</p>
                        <ul className="space-y-0.5 max-h-48 overflow-auto">
                          {plan.users.map((u) => (
                            <li key={u.screenName} className="flex items-center gap-2">
                              <Badge variant={u.action === 'create' ? 'default' : 'secondary'} className="text-[10px]">{u.action}</Badge>
                              <span className="font-mono">{u.screenName}</span>
                              <span className="text-muted-foreground">· {u.role} · {u.shift}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="rounded border border-border bg-background/60 p-2">
                          <p className="font-medium mb-1">Fix records ({plan.fixRecords.willCreate})</p>
                          <ul className="space-y-0.5 max-h-32 overflow-auto">
                            {plan.fixRecords.items.map((f, i) => (<li key={i}>· {f.title}</li>))}
                          </ul>
                        </div>
                        <div className="rounded border border-border bg-background/60 p-2">
                          <p className="font-medium mb-1">Issues ({plan.issues.willCreate})</p>
                          <ul className="space-y-0.5 max-h-32 overflow-auto">
                            {plan.issues.items.map((f, i) => (<li key={i}>· {f.title}</li>))}
                          </ul>
                        </div>
                        <div className="rounded border border-border bg-background/60 p-2">
                          <p className="font-medium mb-1">Priority lists ({plan.departmentPriorities.willCreate})</p>
                          <ul className="space-y-0.5 max-h-32 overflow-auto">
                            {plan.departmentPriorities.items.map((f, i) => (
                              <li key={i}>· {f.title} {f.department ? `[${f.department}]` : ''} ({f.itemCount} items)</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {!lastWasDryRun && summary.usersCreated > 0 && (
                    <div className="mt-3 p-2 rounded border border-border bg-background/60 text-xs">
                      <p className="font-medium mb-1">Default password for newly created test users:</p>
                      <code className="bg-muted px-1.5 py-0.5 rounded">{summary.defaultPassword}</code>
                      <p className="mt-1 text-muted-foreground">Sign in with screen name. Change passwords before any non-dev use.</p>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Import test tenant?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This imports fictional test data for development and demo validation only.
              Technical users will be created with a default password. Operators and Q.C.
              accounts will <strong>not</strong> be created. Continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={importing}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => { e.preventDefault(); runImport(false); }} disabled={importing}>
              {importing ? 'Importing…' : 'Yes, import'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Import test tenant?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This imports fictional test data for development and demo validation only.
              Technical users will be created with a default password. Operators and Q.C.
              accounts will <strong>not</strong> be created. Continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={importing}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => { e.preventDefault(); runImport(); }} disabled={importing}>
              {importing ? 'Importing…' : 'Yes, import'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
