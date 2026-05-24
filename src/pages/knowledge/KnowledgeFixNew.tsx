import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useTenant } from '@/contexts/TenantContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ParamChange {
  param: string;
  before: string;
  after: string;
  units: string;
}

const CATEGORY_FIELDS: { key: 'defect' | 'tool' | 'press' | 'material' | 'color' | 'additive'; label: string; placeholder: string }[] = [
  { key: 'defect', label: 'Defect', placeholder: 'e.g. Short shot, Flash, Sink' },
  { key: 'tool', label: 'Tool / Mold', placeholder: 'Tool ID or mold name' },
  { key: 'press', label: 'Press', placeholder: 'Machine name or asset tag' },
  { key: 'material', label: 'Material', placeholder: 'e.g. PP HOM, ABS, PC/ABS' },
  { key: 'color', label: 'Color', placeholder: 'Color name or code' },
  { key: 'additive', label: 'Additive', placeholder: 'e.g. UV stabilizer, MB %' },
];

export default function KnowledgeFixNew() {
  const navigate = useNavigate();
  const { currentUser, currentTenant, currentFacility, canCreateFixes } = useTenant();
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [fixSummary, setFixSummary] = useState('');
  const [cats, setCats] = useState<Record<string, string>>({});
  const [problem, setProblem] = useState('');
  const [rootCause, setRootCause] = useState('');
  const [solution, setSolution] = useState('');
  const [params, setParams] = useState<ParamChange[]>([]);

  const addParam = () => setParams((p) => [...p, { param: '', before: '', after: '', units: '' }]);
  const updateParam = (i: number, patch: Partial<ParamChange>) =>
    setParams((p) => p.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  const removeParam = (i: number) => setParams((p) => p.filter((_, idx) => idx !== i));

  const save = async (status: 'draft' | 'committed') => {
    if (!currentUser || !currentTenant) {
      toast.error('Not signed in');
      return;
    }
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    setSaving(true);
    const cleanParams = params.filter((p) => p.param.trim() || p.before.trim() || p.after.trim());
    const payload = {
      tenant_id: currentTenant.id,
      facility_id: currentFacility?.id ?? null,
      created_by: currentUser.id,
      title: title.trim(),
      fix_summary: fixSummary.trim() || null,
      defect: cats.defect?.trim() || null,
      tool: cats.tool?.trim() || null,
      press: cats.press?.trim() || null,
      material: cats.material?.trim() || null,
      color: cats.color?.trim() || null,
      additive: cats.additive?.trim() || null,
      problem: problem.trim(),
      root_cause: rootCause.trim(),
      solution: solution.trim(),
      parameter_changes: cleanParams,
      status,
      committed_by: status === 'committed' ? currentUser.id : null,
      committed_at: status === 'committed' ? new Date().toISOString() : null,
    };
    const { data, error } = await supabase
      .from('knowledge_fixes')
      .insert([payload])
      .select('id')
      .single();
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(status === 'committed' ? 'Fix committed' : 'Draft saved');
    navigate(`/knowledge/fixes/${data.id}`);
  };

  if (!canCreateFixes) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate('/knowledge/fixes')} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Fix Records
        </Button>
        <Card><CardContent className="py-12 text-center text-muted-foreground">
          You don't have permission to create fix records.
        </CardContent></Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/knowledge/fixes')} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Fix Records
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Create Fix Record</CardTitle>
          <CardDescription>
            Capture a documented solution. Save as draft to refine later, or commit to publish to your team.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short, searchable title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Fix summary</Label>
            <Input
              id="summary"
              value={fixSummary}
              onChange={(e) => setFixSummary(e.target.value)}
              placeholder="One-line summary of the fix"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold">Context</Label>
            <p className="text-xs text-muted-foreground mb-3">Tag what this fix applies to. All optional.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {CATEGORY_FIELDS.map((f) => (
                <div key={f.key} className="space-y-1.5">
                  <Label htmlFor={f.key} className="text-xs">{f.label}</Label>
                  <Input
                    id={f.key}
                    value={cats[f.key] ?? ''}
                    onChange={(e) => setCats((c) => ({ ...c, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="problem">Problem</Label>
            <Textarea id="problem" rows={3} value={problem} onChange={(e) => setProblem(e.target.value)}
              placeholder="What was observed / what went wrong" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="root">Root cause</Label>
            <Textarea id="root" rows={3} value={rootCause} onChange={(e) => setRootCause(e.target.value)}
              placeholder="Why it happened" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="solution">Solution</Label>
            <Textarea id="solution" rows={4} value={solution} onChange={(e) => setSolution(e.target.value)}
              placeholder="Step-by-step fix that resolved it" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <Label className="text-sm font-semibold">Process parameter changes</Label>
                <p className="text-xs text-muted-foreground">Before / after values for the parameters you adjusted.</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addParam} className="gap-1">
                <Plus className="h-3.5 w-3.5" /> Add
              </Button>
            </div>
            {params.length === 0 ? (
              <div className="rounded-md border border-dashed py-6 text-center text-sm text-muted-foreground">
                No parameter changes recorded.
              </div>
            ) : (
              <div className="space-y-2">
                {params.map((p, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_1fr_90px_auto] gap-2 items-center">
                    <Input placeholder="Parameter" value={p.param} onChange={(e) => updateParam(i, { param: e.target.value })} />
                    <Input placeholder="Before" value={p.before} onChange={(e) => updateParam(i, { before: e.target.value })} />
                    <Input placeholder="After" value={p.after} onChange={(e) => updateParam(i, { after: e.target.value })} />
                    <Input placeholder="Units" value={p.units} onChange={(e) => updateParam(i, { units: e.target.value })} />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeParam(i)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end pt-2 border-t">
            <Button variant="outline" onClick={() => navigate('/knowledge/fixes')} disabled={saving}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={() => save('draft')} disabled={saving} className="gap-2">
              <Save className="h-4 w-4" /> Save draft
            </Button>
            <Button onClick={() => save('committed')} disabled={saving} className="gap-2">
              Commit fix
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
