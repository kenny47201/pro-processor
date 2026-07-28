import { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  useMachines, useMolds, useUpsertMachine, useDeleteMachine, useUpsertMold, useDeleteMold,
  type Machine, type Mold, type MachineStatus, type MoldStatus,
} from '@/hooks/useMachinesMolds';

const MACHINE_STATUS: MachineStatus[] = ['active', 'idle', 'down', 'retired'];
const MOLD_STATUS: MoldStatus[] = ['active', 'in_repair', 'retired'];

interface Props { tenantId: string; canEdit: boolean; }

export function MachineRegistry({ tenantId, canEdit }: Props) {
  const { data = [], isLoading } = useMachines(tenantId);
  const upsert = useUpsertMachine();
  const del = useDeleteMachine();
  const { toast } = useToast();
  const [editing, setEditing] = useState<Partial<Machine> | null>(null);

  const save = async () => {
    if (!editing?.name?.trim()) { toast({ title: 'Name required', variant: 'destructive' }); return; }
    try {
      await upsert.mutateAsync({
        id: editing.id,
        tenant_id: tenantId,
        name: editing.name.trim(),
        asset_tag: editing.asset_tag?.trim() || null,
        manufacturer: editing.manufacturer?.trim() || null,
        model: editing.model?.trim() || null,
        tonnage: editing.tonnage != null ? Number(editing.tonnage) : null,
        shot_size_oz: editing.shot_size_oz != null ? Number(editing.shot_size_oz) : null,
        status: (editing.status as MachineStatus) ?? 'active',
        notes: editing.notes?.trim() || null,
      });
      toast({ title: editing.id ? 'Press updated' : 'Press added' });
      setEditing(null);
    } catch (e) {
      toast({ title: 'Save failed', description: (e as Error).message, variant: 'destructive' });
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this press? Historical references keep their record.')) return;
    try { await del.mutateAsync({ id, tenant_id: tenantId }); toast({ title: 'Press deleted' }); }
    catch (e) { toast({ title: 'Delete failed', description: (e as Error).message, variant: 'destructive' }); }
  };

  return (
    <div className="space-y-3">
      {canEdit && !editing && (
        <div className="flex justify-end">
          <Button size="sm" onClick={() => setEditing({ status: 'active' })} className="gap-1">
            <Plus className="h-3.5 w-3.5" /> Add Press
          </Button>
        </div>
      )}
      {editing && (
        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1"><Label className="text-xs">Name *</Label>
                <Input value={editing.name ?? ''} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="Press 4" />
              </div>
              <div className="space-y-1"><Label className="text-xs">Asset tag</Label>
                <Input value={editing.asset_tag ?? ''} onChange={e => setEditing({ ...editing, asset_tag: e.target.value })} placeholder="A-104" />
              </div>
              <div className="space-y-1"><Label className="text-xs">Manufacturer</Label>
                <Input value={editing.manufacturer ?? ''} onChange={e => setEditing({ ...editing, manufacturer: e.target.value })} placeholder="Milacron" />
              </div>
              <div className="space-y-1"><Label className="text-xs">Model</Label>
                <Input value={editing.model ?? ''} onChange={e => setEditing({ ...editing, model: e.target.value })} placeholder="Roboshot 165R" />
              </div>
              <div className="space-y-1"><Label className="text-xs">Tonnage</Label>
                <Input type="number" value={editing.tonnage ?? ''} onChange={e => setEditing({ ...editing, tonnage: e.target.value ? Number(e.target.value) : null })} />
              </div>
              <div className="space-y-1"><Label className="text-xs">Shot size (oz)</Label>
                <Input type="number" step="0.01" value={editing.shot_size_oz ?? ''} onChange={e => setEditing({ ...editing, shot_size_oz: e.target.value ? Number(e.target.value) : null })} />
              </div>
              <div className="space-y-1"><Label className="text-xs">Status</Label>
                <Select value={editing.status ?? 'active'} onValueChange={v => setEditing({ ...editing, status: v as MachineStatus })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{MACHINE_STATUS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1 sm:col-span-2"><Label className="text-xs">Notes</Label>
                <Input value={editing.notes ?? ''} onChange={e => setEditing({ ...editing, notes: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setEditing(null)} className="gap-1"><X className="h-3.5 w-3.5" /> Cancel</Button>
              <Button size="sm" onClick={save} disabled={upsert.isPending} className="gap-1"><Save className="h-3.5 w-3.5" /> Save</Button>
            </div>
          </CardContent>
        </Card>
      )}
      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : data.length === 0 ? (
        <Card><CardContent className="py-10 text-center text-muted-foreground">No presses registered yet.</CardContent></Card>
      ) : data.map(m => (
        <Card key={m.id}>
          <CardContent className="pt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-medium truncate">{m.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {[m.asset_tag, m.manufacturer, m.model, m.tonnage ? `${m.tonnage}t` : null, m.shot_size_oz ? `${m.shot_size_oz} oz` : null].filter(Boolean).join(' · ') || '—'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={m.status === 'active' ? 'default' : 'secondary'}>{m.status}</Badge>
              {canEdit && <>
                <Button variant="ghost" size="sm" onClick={() => setEditing(m)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm" onClick={() => remove(m.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function MoldRegistry({ tenantId, canEdit }: Props) {
  const { data = [], isLoading } = useMolds(tenantId);
  const upsert = useUpsertMold();
  const del = useDeleteMold();
  const { toast } = useToast();
  const [editing, setEditing] = useState<Partial<Mold> | null>(null);

  const save = async () => {
    if (!editing?.name?.trim()) { toast({ title: 'Name required', variant: 'destructive' }); return; }
    try {
      await upsert.mutateAsync({
        id: editing.id,
        tenant_id: tenantId,
        name: editing.name.trim(),
        tool_number: editing.tool_number?.trim() || null,
        cavities: editing.cavities != null ? Number(editing.cavities) : null,
        part_name: editing.part_name?.trim() || null,
        status: (editing.status as MoldStatus) ?? 'active',
        notes: editing.notes?.trim() || null,
      });
      toast({ title: editing.id ? 'Mold updated' : 'Mold added' });
      setEditing(null);
    } catch (e) {
      toast({ title: 'Save failed', description: (e as Error).message, variant: 'destructive' });
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this mold? Historical references keep their record.')) return;
    try { await del.mutateAsync({ id, tenant_id: tenantId }); toast({ title: 'Mold deleted' }); }
    catch (e) { toast({ title: 'Delete failed', description: (e as Error).message, variant: 'destructive' }); }
  };

  return (
    <div className="space-y-3">
      {canEdit && !editing && (
        <div className="flex justify-end">
          <Button size="sm" onClick={() => setEditing({ status: 'active' })} className="gap-1">
            <Plus className="h-3.5 w-3.5" /> Add Mold
          </Button>
        </div>
      )}
      {editing && (
        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1"><Label className="text-xs">Name *</Label>
                <Input value={editing.name ?? ''} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="12-cav widget" />
              </div>
              <div className="space-y-1"><Label className="text-xs">Tool number</Label>
                <Input value={editing.tool_number ?? ''} onChange={e => setEditing({ ...editing, tool_number: e.target.value })} placeholder="A-12" />
              </div>
              <div className="space-y-1"><Label className="text-xs">Cavities</Label>
                <Input type="number" value={editing.cavities ?? ''} onChange={e => setEditing({ ...editing, cavities: e.target.value ? Number(e.target.value) : null })} />
              </div>
              <div className="space-y-1"><Label className="text-xs">Part name</Label>
                <Input value={editing.part_name ?? ''} onChange={e => setEditing({ ...editing, part_name: e.target.value })} />
              </div>
              <div className="space-y-1"><Label className="text-xs">Status</Label>
                <Select value={editing.status ?? 'active'} onValueChange={v => setEditing({ ...editing, status: v as MoldStatus })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{MOLD_STATUS.map(s => <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1 sm:col-span-2"><Label className="text-xs">Notes</Label>
                <Input value={editing.notes ?? ''} onChange={e => setEditing({ ...editing, notes: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setEditing(null)} className="gap-1"><X className="h-3.5 w-3.5" /> Cancel</Button>
              <Button size="sm" onClick={save} disabled={upsert.isPending} className="gap-1"><Save className="h-3.5 w-3.5" /> Save</Button>
            </div>
          </CardContent>
        </Card>
      )}
      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : data.length === 0 ? (
        <Card><CardContent className="py-10 text-center text-muted-foreground">No molds registered yet.</CardContent></Card>
      ) : data.map(m => (
        <Card key={m.id}>
          <CardContent className="pt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-medium truncate">{m.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {[m.tool_number, m.part_name, m.cavities ? `${m.cavities} cav` : null].filter(Boolean).join(' · ') || '—'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={m.status === 'active' ? 'default' : 'secondary'}>{m.status.replace('_', ' ')}</Badge>
              {canEdit && <>
                <Button variant="ghost" size="sm" onClick={() => setEditing(m)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm" onClick={() => remove(m.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
