import { useEffect, useState } from 'react';
import { Building2, Plus, Save, X, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useTenant } from '@/contexts/TenantContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const PRESETS: { label: string; shifts: string[] }[] = [
  { label: 'Day / Swing / Night', shifts: ['Day', 'Swing', 'Night'] },
  { label: '1st / 2nd / 3rd', shifts: ['1st', '2nd', '3rd'] },
  { label: 'A / B / C / D (24/7)', shifts: ['A', 'B', 'C', 'D'] },
  { label: 'Day / Night', shifts: ['Day', 'Night'] },
];

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
  const [editing, setEditing] = useState<Record<string, string>>({});
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newShifts, setNewShifts] = useState('');

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('tenants').select('id,name,slug,shifts');
    if (error) toast({ title: 'Error loading', description: error.message, variant: 'destructive' });
    setTenants(((data || []) as TenantRow[]).map(t => ({ ...t, shifts: t.shifts?.length ? t.shifts : ['Day','Swing','Night'] })));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const saveShifts = async (tenantId: string) => {
    const raw = editing[tenantId];
    if (raw === undefined) return;
    const shifts = raw.split(',').map(s => s.trim()).filter(Boolean);
    if (shifts.length === 0) {
      toast({ title: 'At least one shift required', variant: 'destructive' });
      return;
    }
    const { error } = await supabase.from('tenants').update({ shifts }).eq('id', tenantId);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Shift designations updated' });
    setEditing(({ [tenantId]: _, ...rest }) => rest);
    load();
  };

  const createTenant = async () => {
    if (!newName.trim() || !newSlug.trim()) return;
    const { error } = await supabase.from('tenants').insert({
      name: newName.trim(),
      slug: newSlug.trim().toLowerCase().replace(/\s+/g, '-'),
    });
    if (error) {
      toast({ title: 'Create failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Organization created' });
    setNewName(''); setNewSlug(''); setCreating(false);
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
          <p className="text-muted-foreground">Manage organizations and shift designations</p>
        </div>
        {isSuperAdmin && !creating && (
          <Button onClick={() => setCreating(true)} className="gap-2">
            <Plus className="h-4 w-4" /> New Organization
          </Button>
        )}
      </div>

      {creating && isSuperAdmin && (
        <Card>
          <CardHeader><CardTitle className="text-base">New Organization</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
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
            No tenants configured yet. Add your first organization to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {tenants.map(tenant => {
            const isEditing = editing[tenant.id] !== undefined;
            const editVal = editing[tenant.id] ?? tenant.shifts.join(', ');
            return (
              <Card key={tenant.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    {tenant.name}
                    <Badge variant="secondary" className="ml-2">{tenant.slug}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">Shift Designations</Label>
                    {!isEditing ? (
                      <div className="flex items-center gap-2 flex-wrap">
                        {tenant.shifts.map(s => (
                          <Badge key={s} variant="outline" className="bg-primary/10 text-primary border-primary/30">{s}</Badge>
                        ))}
                        {isAdmin && (
                          <Button variant="ghost" size="sm" onClick={() => setEditing({ ...editing, [tenant.id]: tenant.shifts.join(', ') })}>
                            Edit
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Input
                          value={editVal}
                          onChange={e => setEditing({ ...editing, [tenant.id]: e.target.value })}
                          placeholder="Day, Swing, Night"
                        />
                        <p className="text-xs text-muted-foreground">Comma-separated list of shift names.</p>
                        <div className="flex flex-wrap gap-2">
                          {PRESETS.map(p => (
                            <Button
                              key={p.label}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setEditing({ ...editing, [tenant.id]: p.shifts.join(', ') })}
                            >
                              {p.label}
                            </Button>
                          ))}
                        </div>
                        <div className="flex justify-end gap-2 pt-1">
                          <Button variant="ghost" size="sm" onClick={() => setEditing(({ [tenant.id]: _, ...rest }) => rest)} className="gap-1">
                            <X className="h-3.5 w-3.5" /> Cancel
                          </Button>
                          <Button size="sm" onClick={() => saveShifts(tenant.id)} className="gap-1">
                            <Save className="h-3.5 w-3.5" /> Save
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
