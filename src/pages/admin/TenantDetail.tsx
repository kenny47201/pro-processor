import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, Save, X, Loader2, Users as UsersIcon, Factory, Clock, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useTenant } from '@/contexts/TenantContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ROLE_LABELS, UserRole } from '@/types/models';

const PRESETS: { label: string; shifts: string[] }[] = [
  { label: 'Day / Swing / Night', shifts: ['Day', 'Swing', 'Night'] },
  { label: '1st / 2nd / 3rd', shifts: ['1st', '2nd', '3rd'] },
  { label: 'A / B / C / D (24/7)', shifts: ['A', 'B', 'C', 'D'] },
  { label: 'Day / Night', shifts: ['Day', 'Night'] },
];

interface TenantRow {
  id: string; name: string; slug: string; shifts: string[]; created_at: string;
  address_line1: string | null; address_line2: string | null;
  city: string | null; state: string | null; postal_code: string | null; country: string | null;
}
interface FacilityRow { id: string; tenant_id: string; name: string; }
interface AdminUser {
  user_id: string;
  display_name: string | null;
  screen_name: string | null;
  email: string | null;
  tenant_id: string | null;
  shift: string | null;
  status: 'pending' | 'active' | 'inactive';
  roles: UserRole[];
}

export default function TenantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useTenant();
  const { toast } = useToast();
  const isSuperAdmin = currentUser?.role === 'super_admin';
  const isAdmin = currentUser?.role === 'admin' || isSuperAdmin;

  const [tenant, setTenant] = useState<TenantRow | null>(null);
  const [facilities, setFacilities] = useState<FacilityRow[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Editing state
  const [editName, setEditName] = useState('');
  const [editShifts, setEditShifts] = useState('');
  const [editAddr, setEditAddr] = useState({ line1: '', line2: '', city: '', state: '', postal: '', country: '' });
  const [savingDetails, setSavingDetails] = useState(false);

  // New facility
  const [newFacility, setNewFacility] = useState('');
  const [creatingFacility, setCreatingFacility] = useState(false);

  const load = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const [{ data: t, error: tErr }, { data: f }] = await Promise.all([
        supabase.from('tenants').select('id,name,slug,shifts,created_at,address_line1,address_line2,city,state,postal_code,country').eq('id', id).single(),
        supabase.from('facilities').select('id,tenant_id,name').eq('tenant_id', id),
      ]);
      if (tErr) throw tErr;
      const tRow: TenantRow = { ...t, shifts: t.shifts?.length ? t.shifts : ['Day','Swing','Night'] };
      setTenant(tRow);
      setEditName(tRow.name);
      setEditShifts(tRow.shifts.join(', '));
      setEditAddr({
        line1: tRow.address_line1 ?? '', line2: tRow.address_line2 ?? '',
        city: tRow.city ?? '', state: tRow.state ?? '',
        postal: tRow.postal_code ?? '', country: tRow.country ?? '',
      });
      setFacilities(f || []);

      // Load users via edge function and filter to this tenant
      const { data: usersResp, error: usersErr } = await supabase.functions.invoke('admin-users', { body: { action: 'list' } });
      if (usersErr) throw new Error(usersErr.message);
      const all = (usersResp as { users?: AdminUser[] })?.users ?? [];
      setUsers(all.filter(u => u.tenant_id === id));
    } catch (e) {
      toast({ title: 'Failed to load', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [id]);

  const grouped = useMemo(() => {
    const byStatus = { active: [] as AdminUser[], pending: [] as AdminUser[], inactive: [] as AdminUser[] };
    users.forEach(u => byStatus[u.status]?.push(u));
    return byStatus;
  }, [users]);

  const saveDetails = async () => {
    if (!tenant) return;
    const shifts = editShifts.split(',').map(s => s.trim()).filter(Boolean);
    if (!editName.trim()) { toast({ title: 'Name required', variant: 'destructive' }); return; }
    if (shifts.length === 0) { toast({ title: 'At least one shift required', variant: 'destructive' }); return; }
    setSavingDetails(true);
    const { error } = await supabase.from('tenants').update({
      name: editName.trim(),
      shifts,
      address_line1: editAddr.line1.trim() || null,
      address_line2: editAddr.line2.trim() || null,
      city: editAddr.city.trim() || null,
      state: editAddr.state.trim() || null,
      postal_code: editAddr.postal.trim() || null,
      country: editAddr.country.trim() || null,
    }).eq('id', tenant.id);
    setSavingDetails(false);
    if (error) { toast({ title: 'Update failed', description: error.message, variant: 'destructive' }); return; }
    toast({ title: 'Organization updated' });
    load();
  };

  const addFacility = async () => {
    if (!tenant || !newFacility.trim()) return;
    setCreatingFacility(true);
    const { error } = await supabase.from('facilities').insert({ tenant_id: tenant.id, name: newFacility.trim() });
    setCreatingFacility(false);
    if (error) { toast({ title: 'Create failed', description: error.message, variant: 'destructive' }); return; }
    setNewFacility('');
    toast({ title: 'Facility added' });
    load();
  };

  const removeFacility = async (fid: string) => {
    if (!confirm('Remove this facility?')) return;
    const { error } = await supabase.from('facilities').delete().eq('id', fid);
    if (error) { toast({ title: 'Delete failed', description: error.message, variant: 'destructive' }); return; }
    load();
  };

  if (loading) {
    return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  if (!tenant) {
    return (
      <Card><CardContent className="py-12 text-center text-muted-foreground">
        Organization not found. <Link to="/tenants" className="text-primary underline">Back to list</Link>
      </CardContent></Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/tenants')} className="gap-1">
          <ArrowLeft className="h-4 w-4" /> All Organizations
        </Button>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            {tenant.name}
          </h1>
          <p className="text-muted-foreground">
            <Badge variant="secondary" className="mr-2">{tenant.slug}</Badge>
            Created {new Date(tenant.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details" className="gap-1"><Building2 className="h-3.5 w-3.5" /> Details</TabsTrigger>
          <TabsTrigger value="shifts" className="gap-1"><Clock className="h-3.5 w-3.5" /> Shifts</TabsTrigger>
          <TabsTrigger value="facilities" className="gap-1"><Factory className="h-3.5 w-3.5" /> Facilities <Badge variant="secondary" className="ml-1">{facilities.length}</Badge></TabsTrigger>
          <TabsTrigger value="users" className="gap-1"><UsersIcon className="h-3.5 w-3.5" /> Users <Badge variant="secondary" className="ml-1">{users.length}</Badge></TabsTrigger>
        </TabsList>

        {/* Details */}
        <TabsContent value="details" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Company Details</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Organization Name</Label>
                  <Input value={editName} onChange={e => setEditName(e.target.value)} disabled={!isAdmin} />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input value={tenant.slug} disabled />
                </div>
              </div>

              <div className="pt-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Company Address</Label>
              </div>
              <div className="space-y-2">
                <Input value={editAddr.line1} onChange={e => setEditAddr({ ...editAddr, line1: e.target.value })} placeholder="Street address" disabled={!isAdmin} />
                <Input value={editAddr.line2} onChange={e => setEditAddr({ ...editAddr, line2: e.target.value })} placeholder="Suite, unit, building (optional)" disabled={!isAdmin} />
                <div className="grid grid-cols-2 gap-2">
                  <Input value={editAddr.city} onChange={e => setEditAddr({ ...editAddr, city: e.target.value })} placeholder="City" disabled={!isAdmin} />
                  <Input value={editAddr.state} onChange={e => setEditAddr({ ...editAddr, state: e.target.value })} placeholder="State / Region" disabled={!isAdmin} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input value={editAddr.postal} onChange={e => setEditAddr({ ...editAddr, postal: e.target.value })} placeholder="Postal code" disabled={!isAdmin} />
                  <Input value={editAddr.country} onChange={e => setEditAddr({ ...editAddr, country: e.target.value })} placeholder="Country" disabled={!isAdmin} />
                </div>
              </div>
              {isAdmin && (
                <div className="flex justify-end">
                  <Button onClick={saveDetails} disabled={savingDetails} className="gap-1">
                    <Save className="h-3.5 w-3.5" /> Save
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shifts */}
        <TabsContent value="shifts" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Shift Designations</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                {(editShifts.split(',').map(s => s.trim()).filter(Boolean)).map(s => (
                  <Badge key={s} variant="outline" className="bg-primary/10 text-primary border-primary/30">{s}</Badge>
                ))}
              </div>
              {isAdmin && (
                <>
                  <div className="space-y-2">
                    <Label>Comma-separated list</Label>
                    <Input value={editShifts} onChange={e => setEditShifts(e.target.value)} placeholder="Day, Swing, Night" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {PRESETS.map(p => (
                      <Button key={p.label} type="button" variant="outline" size="sm" onClick={() => setEditShifts(p.shifts.join(', '))}>
                        {p.label}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={saveDetails} disabled={savingDetails} className="gap-1">
                      <Save className="h-3.5 w-3.5" /> Save Shifts
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Facilities */}
        <TabsContent value="facilities" className="mt-4 space-y-3">
          {isAdmin && (
            <Card>
              <CardContent className="pt-4 flex gap-2">
                <Input value={newFacility} onChange={e => setNewFacility(e.target.value)} placeholder="New facility name" />
                <Button onClick={addFacility} disabled={!newFacility.trim() || creatingFacility} className="gap-1">
                  <Plus className="h-3.5 w-3.5" /> Add
                </Button>
              </CardContent>
            </Card>
          )}
          {facilities.length === 0 ? (
            <Card><CardContent className="py-10 text-center text-muted-foreground">No facilities yet.</CardContent></Card>
          ) : facilities.map(f => (
            <Card key={f.id}>
              <CardContent className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Factory className="h-4 w-4 text-primary" />
                  <span className="font-medium">{f.name}</span>
                </div>
                {isAdmin && (
                  <Button variant="ghost" size="sm" onClick={() => removeFacility(f.id)} className="text-destructive">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Users */}
        <TabsContent value="users" className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary">Active {grouped.active.length}</Badge>
              <Badge variant="secondary">Pending {grouped.pending.length}</Badge>
              <Badge variant="secondary">Inactive {grouped.inactive.length}</Badge>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link to="/users" className="gap-1"><UsersIcon className="h-3.5 w-3.5" /> Manage Users</Link>
            </Button>
          </div>
          {users.length === 0 ? (
            <Card><CardContent className="py-10 text-center text-muted-foreground">No users in this organization yet.</CardContent></Card>
          ) : users.map(u => (
            <Card key={u.user_id}>
              <CardContent className="pt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">{u.display_name || u.screen_name || u.email}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {u.screen_name && <span>@{u.screen_name} · </span>}{u.email}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {u.roles.map(r => (
                    <Badge key={r} variant="outline" className="bg-primary/10 text-primary border-primary/30">{ROLE_LABELS[r]}</Badge>
                  ))}
                  {u.shift && <Badge variant="secondary">{u.shift}</Badge>}
                  <Badge variant={u.status === 'active' ? 'default' : u.status === 'pending' ? 'secondary' : 'outline'}>
                    {u.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
