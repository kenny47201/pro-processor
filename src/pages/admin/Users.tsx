import { useEffect, useMemo, useState } from 'react';
import { Users as UsersIcon, Plus, Loader2, UserCheck, UserX, Pencil, Send, KeyRound, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTenant, DEFAULT_SHIFTS } from '@/contexts/TenantContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ROLE_LABELS, UserRole } from '@/types/models';

interface AdminUser {
  user_id: string;
  display_name: string | null;
  screen_name: string | null;
  email: string | null;
  tenant_id: string | null;
  facility_id: string | null;
  shift: string | null;
  status: 'pending' | 'active' | 'inactive';
  roles: UserRole[];
  created_at: string;
}

const ASSIGNABLE_ROLES_ADMIN: UserRole[] = ['processor', 'maintenance_tech', 'tooling_specialist', 'supervisor', 'manager'];
const ASSIGNABLE_ROLES_SUPER: UserRole[] = [...ASSIGNABLE_ROLES_ADMIN, 'admin', 'super_admin'];

export default function Users() {
  const { currentUser, currentTenant, availableTenants } = useTenant();
  const { toast } = useToast();
  const isSuper = currentUser?.role === 'super_admin';
  const assignableRoles = isSuper ? ASSIGNABLE_ROLES_SUPER : ASSIGNABLE_ROLES_ADMIN;
  const shifts = currentTenant?.shifts ?? DEFAULT_SHIFTS;

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [tab, setTab] = useState<'active' | 'pending' | 'inactive'>('active');

  // Add-user dialog
  const [addOpen, setAddOpen] = useState(false);
  const [addMode, setAddMode] = useState<'create' | 'invite'>('create');
  const [form, setForm] = useState({
    screenName: '', email: '', password: '', displayName: '',
    role: 'processor' as UserRole, shift: '', facilityId: '', tenantId: '',
  });

  // Edit dialog
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [editForm, setEditForm] = useState({
    displayName: '', role: 'processor' as UserRole, shift: '', tenantId: '',
  });

  // Password reset dialog
  const [resetting, setResetting] = useState<AdminUser | null>(null);
  const [resetPassword, setResetPassword] = useState('');
  const [resetResult, setResetResult] = useState<string | null>(null);


  const callApi = async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke('admin-users', { body });
    if (error) throw new Error(error.message);
    if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
    return data;
  };

  const load = async () => {
    setLoading(true);
    try {
      const data = await callApi({ action: 'list' }) as { users: AdminUser[] };
      setUsers(data.users ?? []);
    } catch (e) {
      toast({ title: 'Could not load users', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  const filtered = useMemo(() => users.filter(u => u.status === tab), [users, tab]);
  const counts = useMemo(() => ({
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    inactive: users.filter(u => u.status === 'inactive').length,
  }), [users]);

  const submitAdd = async () => {
    setBusy('add');
    try {
      if (addMode === 'create') {
        if (!form.screenName || !form.password) throw new Error('Screen name and password required');
        await callApi({
          action: 'create',
          screenName: form.screenName,
          password: form.password,
          displayName: form.displayName || form.screenName,
          role: form.role,
          shift: form.shift || null,
          facilityId: form.facilityId || null,
          tenantId: isSuper ? (form.tenantId || undefined) : undefined,
        });
        toast({ title: 'User created', description: `Login: ${form.screenName}` });
      } else {
        if (!form.email) throw new Error('Email required');
        await callApi({
          action: 'invite',
          email: form.email,
          screenName: form.screenName || null,
          displayName: form.displayName || form.email,
          role: form.role,
          shift: form.shift || null,
          facilityId: form.facilityId || null,
          tenantId: isSuper ? (form.tenantId || undefined) : undefined,
        });
        toast({ title: 'Invite sent', description: form.email });
      }
      setAddOpen(false);
      setForm({ screenName: '', email: '', password: '', displayName: '', role: 'processor', shift: '', facilityId: '', tenantId: '' });
      load();
    } catch (e) {
      toast({ title: 'Action failed', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setBusy(null);
    }
  };

  const approve = async (u: AdminUser) => {
    setBusy(u.user_id);
    try {
      await callApi({ action: 'approve', userId: u.user_id, role: u.roles[0] ?? 'processor' });
      toast({ title: 'User approved' });
      load();
    } catch (e) { toast({ title: 'Failed', description: (e as Error).message, variant: 'destructive' }); }
    finally { setBusy(null); }
  };

  const setStatus = async (u: AdminUser, action: 'deactivate' | 'reactivate') => {
    setBusy(u.user_id);
    try {
      await callApi({ action, userId: u.user_id });
      load();
    } catch (e) { toast({ title: 'Failed', description: (e as Error).message, variant: 'destructive' }); }
    finally { setBusy(null); }
  };

  const removeUser = async (u: AdminUser) => {
    if (!confirm(`Permanently delete ${u.display_name || u.email}? This cannot be undone.`)) return;
    setBusy(u.user_id);
    try {
      await callApi({ action: 'delete', userId: u.user_id });
      toast({ title: 'User deleted' });
      load();
    } catch (e) { toast({ title: 'Failed', description: (e as Error).message, variant: 'destructive' }); }
    finally { setBusy(null); }
  };

  const openEdit = (u: AdminUser) => {
    setEditing(u);
    setEditForm({
      displayName: u.display_name ?? '',
      role: (u.roles[0] ?? 'processor') as UserRole,
      shift: u.shift ?? '',
      tenantId: u.tenant_id ?? '',
    });
  };

  const submitEdit = async () => {
    if (!editing) return;
    setBusy(editing.user_id);
    try {
      await callApi({
        action: 'update',
        userId: editing.user_id,
        displayName: editForm.displayName,
        role: editForm.role,
        shift: editForm.shift || null,
        tenantId: isSuper ? (editForm.tenantId || undefined) : undefined,
      });
      toast({ title: 'User updated' });
      setEditing(null);
      load();
    } catch (e) { toast({ title: 'Failed', description: (e as Error).message, variant: 'destructive' }); }
    finally { setBusy(null); }
  };
  const submitReset = async () => {
    if (!resetting) return;
    setBusy(resetting.user_id);
    try {
      const data = await callApi({
        action: 'reset_password',
        userId: resetting.user_id,
        password: resetPassword || undefined,
      }) as { password: string };
      setResetResult(data.password);
      toast({ title: 'Password reset', description: 'Share the temporary password with the user.' });
    } catch (e) { toast({ title: 'Failed', description: (e as Error).message, variant: 'destructive' }); }
    finally { setBusy(null); }
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <UsersIcon className="h-6 w-6 text-primary" />
            User Management
          </h1>
          <p className="text-muted-foreground">
            Manage accounts, roles, and approvals{currentTenant ? ` for ${currentTenant.name}` : ''}
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Add User
        </Button>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
        <TabsList>
          <TabsTrigger value="active">Active <Badge variant="secondary" className="ml-2">{counts.active}</Badge></TabsTrigger>
          <TabsTrigger value="pending">Pending <Badge variant="secondary" className="ml-2">{counts.pending}</Badge></TabsTrigger>
          <TabsTrigger value="inactive">Inactive <Badge variant="secondary" className="ml-2">{counts.inactive}</Badge></TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
          ) : filtered.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-muted-foreground">No {tab} users.</CardContent></Card>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filtered.map(u => (
                <Card key={u.user_id}>
                  <CardContent className="pt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <UserCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate">{u.display_name || u.screen_name || u.email}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {u.screen_name && <span>@{u.screen_name} · </span>}
                          {u.email}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {u.roles.map(r => (
                          <Badge key={r} variant="outline" className="bg-primary/10 text-primary border-primary/30">
                            {ROLE_LABELS[r]}
                          </Badge>
                        ))}
                        {u.shift && <Badge variant="secondary">{u.shift}</Badge>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {u.status === 'pending' && (
                        <Button size="sm" onClick={() => approve(u)} disabled={busy === u.user_id} className="gap-1">
                          <UserCheck className="h-3.5 w-3.5" /> Approve
                        </Button>
                      )}
                      {u.status !== 'inactive' ? (
                        <Button size="sm" variant="outline" onClick={() => setStatus(u, 'deactivate')} disabled={busy === u.user_id} className="gap-1">
                          <UserX className="h-3.5 w-3.5" /> Deactivate
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => setStatus(u, 'reactivate')} disabled={busy === u.user_id} className="gap-1">
                          <UserCheck className="h-3.5 w-3.5" /> Reactivate
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => openEdit(u)} className="gap-1">
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => removeUser(u)} disabled={busy === u.user_id}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add User</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button variant={addMode === 'create' ? 'default' : 'outline'} size="sm" onClick={() => setAddMode('create')} className="gap-1">
                <KeyRound className="h-3.5 w-3.5" /> Direct create
              </Button>
              <Button variant={addMode === 'invite' ? 'default' : 'outline'} size="sm" onClick={() => setAddMode('invite')} className="gap-1">
                <Send className="h-3.5 w-3.5" /> Email invite
              </Button>
            </div>

            {addMode === 'create' ? (
              <>
                <div className="space-y-1.5">
                  <Label>Screen Name</Label>
                  <Input value={form.screenName} onChange={e => setForm({ ...form, screenName: e.target.value })} placeholder="jsmith" />
                </div>
                <div className="space-y-1.5">
                  <Label>Temporary Password</Label>
                  <Input type="text" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="At least 6 characters" />
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="user@company.com" />
              </div>
            )}

            <div className="space-y-1.5">
              <Label>Display Name (optional)</Label>
              <Input value={form.displayName} onChange={e => setForm({ ...form, displayName: e.target.value })} placeholder="John Smith" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <Label>Role</Label>
                <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as UserRole })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {assignableRoles.map(r => <SelectItem key={r} value={r}>{ROLE_LABELS[r]}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Shift</Label>
                <Select value={form.shift || 'none'} onValueChange={(v) => setForm({ ...form, shift: v === 'none' ? '' : v })}>
                  <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {shifts.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isSuper && (
              <div className="space-y-1.5">
                <Label>Organization</Label>
                <Select value={form.tenantId || currentTenant?.id || ''} onValueChange={(v) => setForm({ ...form, tenantId: v })}>
                  <SelectTrigger><SelectValue placeholder="Select organization" /></SelectTrigger>
                  <SelectContent>
                    {availableTenants.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={submitAdd} disabled={busy === 'add'}>
              {busy === 'add' ? <Loader2 className="h-4 w-4 animate-spin" /> : addMode === 'create' ? 'Create User' : 'Send Invite'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Edit User</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label>Display Name</Label>
                <Input value={editForm.displayName} onChange={e => setEditForm({ ...editForm, displayName: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label>Role</Label>
                  <Select value={editForm.role} onValueChange={(v) => setEditForm({ ...editForm, role: v as UserRole })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {assignableRoles.map(r => <SelectItem key={r} value={r}>{ROLE_LABELS[r]}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Shift</Label>
                  <Select value={editForm.shift || 'none'} onValueChange={(v) => setEditForm({ ...editForm, shift: v === 'none' ? '' : v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {shifts.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {isSuper && (
                <div className="space-y-1.5">
                  <Label>Organization</Label>
                  <Select value={editForm.tenantId} onValueChange={(v) => setEditForm({ ...editForm, tenantId: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {availableTenants.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={submitEdit} disabled={!!busy}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
