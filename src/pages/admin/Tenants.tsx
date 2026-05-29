import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Plus, Loader2, ArrowRight, Trash2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useToast } from '@/hooks/use-toast';

interface TenantRow {
  id: string;
  name: string;
  slug: string;
  shifts: string[];
}

export default function Tenants() {
  const { currentUser } = useTenant();
  const { toast } = useToast();
  const isSuperAdmin = currentUser?.role === 'super_admin';
  const isAdmin = currentUser?.role === 'admin' || isSuperAdmin;

  const [tenants, setTenants] = useState<TenantRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<TenantRow | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('tenants').select('id,name,slug,shifts');
    if (error) toast({ title: 'Error loading', description: error.message, variant: 'destructive' });
    setTenants(((data || []) as TenantRow[]).map(t => ({ ...t, shifts: t.shifts ?? [] })));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createTenant = async () => {
    if (!newName.trim() || !newSlug.trim()) return;
    const { error } = await supabase.from('tenants').insert({
      name: newName.trim(),
      slug: newSlug.trim().toLowerCase().replace(/\s+/g, '-'),
      shifts: [],
    });
    if (error) {
      toast({ title: 'Create failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({
      title: 'Organization created',
      description: 'Assign an admin to complete details, shifts, facilities, and users.',
    });
    setNewName(''); setNewSlug(''); setCreating(false);
    load();
  };

  const deleteTenant = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const { error } = await supabase.from('tenants').delete().eq('id', deleteTarget.id);
    setDeleting(false);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Organization deleted' });
    setDeleteTarget(null);
    setDeleteConfirmText('');
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            Tenant Management
          </h1>
          <p className="text-muted-foreground">
            {isSuperAdmin
              ? 'Provision new organizations and hand them off to the tenant admin.'
              : 'Manage your organization details, shifts, facilities, and users.'}
          </p>
        </div>
        {isSuperAdmin && !creating && (
          <Button onClick={() => setCreating(true)} className="gap-2">
            <Plus className="h-4 w-4" /> New Organization
          </Button>
        )}
      </div>

      {creating && isSuperAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">New Organization</CardTitle>
            <p className="text-sm text-muted-foreground">
              Create the tenant shell. The assigned admin will complete company details, shift structure, facilities, and user roster.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Acme Plastics" />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={newSlug} onChange={e => setNewSlug(e.target.value)} placeholder="acme-plastics" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => { setCreating(false); setNewName(''); setNewSlug(''); }}>Cancel</Button>
              <Button onClick={createTenant} disabled={!newName.trim() || !newSlug.trim()}>Create</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : tenants.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No tenants configured yet. {isSuperAdmin ? 'Add your first organization to get started.' : 'Contact Pro-Processor support to have your organization provisioned.'}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {tenants.map(tenant => {
            const needsSetup = !tenant.shifts || tenant.shifts.length === 0;
            return (
              <Card key={tenant.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 flex-wrap">
                      <Building2 className="h-4 w-4 text-primary" />
                      {tenant.name}
                      <Badge variant="secondary" className="ml-1">{tenant.slug}</Badge>
                      {needsSetup && (
                        <Badge variant="outline" className="gap-1 border-warning/40 text-warning">
                          <AlertCircle className="h-3 w-3" /> Setup pending
                        </Badge>
                      )}
                    </span>
                    <div className="flex items-center gap-2">
                      {isAdmin && (
                        <Button asChild variant="outline" size="sm" className="gap-1">
                          <Link to={`/tenants/${tenant.id}`}>Manage <ArrowRight className="h-3.5 w-3.5" /></Link>
                        </Button>
                      )}
                      {isSuperAdmin && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1"
                          onClick={() => setDeleteTarget(tenant)}
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </Button>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground mr-1">Shifts:</Label>
                    {tenant.shifts.length === 0 ? (
                      <span className="text-sm text-muted-foreground italic">Not yet configured by tenant admin</span>
                    ) : (
                      tenant.shifts.map(s => (
                        <Badge key={s} variant="outline" className="bg-primary/10 text-primary border-primary/30">{s}</Badge>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) { setDeleteTarget(null); setDeleteConfirmText(''); } }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the organization and may cascade to its facilities, users, and data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <Label htmlFor="confirm-delete" className="text-sm">
              To confirm, type the organization name <span className="font-semibold text-foreground">{deleteTarget?.name}</span> below:
            </Label>
            <Input
              id="confirm-delete"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder={deleteTarget?.name ?? ''}
              autoComplete="off"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => { e.preventDefault(); deleteTenant(); }}
              disabled={deleting || deleteConfirmText.trim() !== (deleteTarget?.name ?? '')}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete Organization'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
