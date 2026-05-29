import { useState } from 'react';
import { Settings as SettingsIcon, FlaskConical, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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

export default function Settings() {
  const { currentUser } = useTenant();
  const canImport = currentUser?.role === 'admin' || currentUser?.role === 'super_admin';

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [summary, setSummary] = useState<ImportSummary | null>(null);

  async function runImport() {
    setImporting(true);
    setSummary(null);
    try {
      const { data, error } = await supabase.functions.invoke('import-test-tenant', {
        body: { fixture: acupathFixture },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setSummary(data.summary);
      toast({ title: 'Import complete', description: 'AcuPath technical test tenant loaded.' });
    } catch (e: any) {
      toast({
        title: 'Import failed',
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

            <Button
              variant="outline"
              onClick={() => setConfirmOpen(true)}
              disabled={importing}
              className="border-warning/60"
            >
              {importing ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Importing…</>
              ) : (
                <><FlaskConical className="h-4 w-4 mr-2" /> Import AcuPath Technical Tenant</>
              )}
            </Button>

            {summary && (
              <Alert className="border-success/40 bg-success/10">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Import summary</AlertTitle>
                <AlertDescription>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>Tenant {summary.tenant}</li>
                    <li>Facility {summary.facility}</li>
                    <li>Technical users: {summary.usersCreated} created, {summary.usersUpdated} updated</li>
                    <li>Fix records created: {summary.fixRecordsCreated}</li>
                    <li>Technical issues created: {summary.issuesCreated}</li>
                    <li>Department priority lists created: {summary.departmentPrioritiesCreated}</li>
                    <li>Operators excluded ✓</li>
                    <li>Q.C. users excluded ✓</li>
                  </ul>
                  {summary.usersCreated > 0 && (
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
            <AlertDialogAction onClick={(e) => { e.preventDefault(); runImport(); }} disabled={importing}>
              {importing ? 'Importing…' : 'Yes, import'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
