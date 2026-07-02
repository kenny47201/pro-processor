import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Info, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateShotVolumeWeight } from '@/lib/processCalculations';
import { MATERIAL_DENSITIES } from '@/types/processTools';
import { useExport } from './ExportButton';
import { HelperPopover } from './HelperPopover';
import {
  boxVolumeCc,
  cylinderVolumeCc,
  discVolumeCc,
  tubeVolumeCc,
  volumeFromWeightCc,
  fullRoundRunnerCc,
  halfRoundRunnerCc,
  trapezoidalRunnerCc,
  sprueConeCc,
  shotVolumeToStrokeMm,
} from '@/lib/geometryHelpers';

// -------------------- Part Volume Helper --------------------
function PartVolumeHelper({ density, onApply }: { density: number; onApply: (v: number) => void }) {
  const [weight, setWeight] = useState('');
  const [box, setBox] = useState({ l: '', w: '', h: '' });
  const [cyl, setCyl] = useState({ d: '', h: '' });
  const [disc, setDisc] = useState({ d: '', t: '' });
  const [tube, setTube] = useState({ od: '', id: '', h: '' });

  const fromWeight = volumeFromWeightCc(parseFloat(weight) || 0, density || 0);
  const fromBox = boxVolumeCc(+box.l || 0, +box.w || 0, +box.h || 0);
  const fromCyl = cylinderVolumeCc(+cyl.d || 0, +cyl.h || 0);
  const fromDisc = discVolumeCc(+disc.d || 0, +disc.t || 0);
  const fromTube = tubeVolumeCc(+tube.od || 0, +tube.id || 0, +tube.h || 0);

  const row = (v: number) => (
    <div className="flex items-center justify-between mt-2 p-2 bg-muted rounded">
      <span className="text-sm">= <b>{v.toFixed(3)}</b> cm³</span>
      <Button size="sm" type="button" disabled={!v} onClick={() => onApply(+v.toFixed(3))}>
        Use this <ArrowRight className="h-3 w-3 ml-1" />
      </Button>
    </div>
  );

  return (
    <Tabs defaultValue="weight" className="w-full">
      <TabsList className="grid grid-cols-5 h-8">
        <TabsTrigger value="weight" className="text-xs">Weight</TabsTrigger>
        <TabsTrigger value="box" className="text-xs">Box</TabsTrigger>
        <TabsTrigger value="cyl" className="text-xs">Cyl</TabsTrigger>
        <TabsTrigger value="disc" className="text-xs">Disc</TabsTrigger>
        <TabsTrigger value="tube" className="text-xs">Tube</TabsTrigger>
      </TabsList>

      <TabsContent value="weight" className="space-y-2">
        <p className="text-xs text-muted-foreground">V = weight ÷ density. Uses selected material density ({density || '—'} g/cm³).</p>
        <div className="space-y-1">
          <Label className="text-xs">Part weight (g)</Label>
          <Input type="number" step="0.01" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        {row(fromWeight)}
      </TabsContent>

      <TabsContent value="box" className="space-y-2">
        <p className="text-xs text-muted-foreground">L × W × H (mm)</p>
        <div className="grid grid-cols-3 gap-2">
          <Input placeholder="L" type="number" value={box.l} onChange={(e) => setBox({ ...box, l: e.target.value })} />
          <Input placeholder="W" type="number" value={box.w} onChange={(e) => setBox({ ...box, w: e.target.value })} />
          <Input placeholder="H" type="number" value={box.h} onChange={(e) => setBox({ ...box, h: e.target.value })} />
        </div>
        {row(fromBox)}
      </TabsContent>

      <TabsContent value="cyl" className="space-y-2">
        <p className="text-xs text-muted-foreground">π × (d/2)² × h (mm)</p>
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Diameter" type="number" value={cyl.d} onChange={(e) => setCyl({ ...cyl, d: e.target.value })} />
          <Input placeholder="Height" type="number" value={cyl.h} onChange={(e) => setCyl({ ...cyl, h: e.target.value })} />
        </div>
        {row(fromCyl)}
      </TabsContent>

      <TabsContent value="disc" className="space-y-2">
        <p className="text-xs text-muted-foreground">Same formula as cylinder — good for lids, gaskets</p>
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Diameter" type="number" value={disc.d} onChange={(e) => setDisc({ ...disc, d: e.target.value })} />
          <Input placeholder="Thickness" type="number" value={disc.t} onChange={(e) => setDisc({ ...disc, t: e.target.value })} />
        </div>
        {row(fromDisc)}
      </TabsContent>

      <TabsContent value="tube" className="space-y-2">
        <p className="text-xs text-muted-foreground">OD − ID cylinder</p>
        <div className="grid grid-cols-3 gap-2">
          <Input placeholder="OD" type="number" value={tube.od} onChange={(e) => setTube({ ...tube, od: e.target.value })} />
          <Input placeholder="ID" type="number" value={tube.id} onChange={(e) => setTube({ ...tube, id: e.target.value })} />
          <Input placeholder="Height" type="number" value={tube.h} onChange={(e) => setTube({ ...tube, h: e.target.value })} />
        </div>
        {row(fromTube)}
      </TabsContent>
    </Tabs>
  );
}

// -------------------- Runner Volume Helper --------------------
type RunnerSeg = {
  id: number;
  shape: 'full' | 'half' | 'trap' | 'sprue';
  d?: string; l?: string; count?: string;
  top?: string; bot?: string; depth?: string;
  smallD?: string; largeD?: string;
};

function segVolume(s: RunnerSeg): number {
  const count = +(s.count || '1');
  if (s.shape === 'full') return fullRoundRunnerCc(+(s.d || 0), +(s.l || 0), count);
  if (s.shape === 'half') return halfRoundRunnerCc(+(s.d || 0), +(s.l || 0), count);
  if (s.shape === 'trap') return trapezoidalRunnerCc(+(s.top || 0), +(s.bot || 0), +(s.depth || 0), +(s.l || 0), count);
  if (s.shape === 'sprue') return sprueConeCc(+(s.smallD || 0), +(s.largeD || 0), +(s.l || 0));
  return 0;
}

function RunnerVolumeHelper({ onApply }: { onApply: (v: number) => void }) {
  const [segs, setSegs] = useState<RunnerSeg[]>([
    { id: 1, shape: 'sprue', smallD: '', largeD: '', l: '' },
    { id: 2, shape: 'full', d: '', l: '', count: '2' },
  ]);
  const total = segs.reduce((sum, s) => sum + segVolume(s), 0);

  const update = (id: number, patch: Partial<RunnerSeg>) =>
    setSegs((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const add = () => setSegs((p) => [...p, { id: Date.now(), shape: 'full', d: '', l: '', count: '1' }]);
  const remove = (id: number) => setSegs((p) => p.filter((s) => s.id !== id));

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">Add every segment: sprue, primary/secondary runners, sub-runners. All dimensions in mm.</p>
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {segs.map((s) => (
          <div key={s.id} className="border rounded p-2 space-y-1.5">
            <div className="flex items-center gap-2">
              <Select value={s.shape} onValueChange={(v: RunnerSeg['shape']) => update(s.id, { shape: v })}>
                <SelectTrigger className="h-7 text-xs flex-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sprue">Sprue (cone)</SelectItem>
                  <SelectItem value="full">Full-round</SelectItem>
                  <SelectItem value="half">Half-round</SelectItem>
                  <SelectItem value="trap">Trapezoidal</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => remove(s.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            {s.shape === 'sprue' && (
              <div className="grid grid-cols-3 gap-1">
                <Input className="h-7 text-xs" placeholder="Small ⌀" type="number" value={s.smallD || ''} onChange={(e) => update(s.id, { smallD: e.target.value })} />
                <Input className="h-7 text-xs" placeholder="Large ⌀" type="number" value={s.largeD || ''} onChange={(e) => update(s.id, { largeD: e.target.value })} />
                <Input className="h-7 text-xs" placeholder="Length" type="number" value={s.l || ''} onChange={(e) => update(s.id, { l: e.target.value })} />
              </div>
            )}
            {(s.shape === 'full' || s.shape === 'half') && (
              <div className="grid grid-cols-3 gap-1">
                <Input className="h-7 text-xs" placeholder="⌀" type="number" value={s.d || ''} onChange={(e) => update(s.id, { d: e.target.value })} />
                <Input className="h-7 text-xs" placeholder="Length" type="number" value={s.l || ''} onChange={(e) => update(s.id, { l: e.target.value })} />
                <Input className="h-7 text-xs" placeholder="Count" type="number" value={s.count || ''} onChange={(e) => update(s.id, { count: e.target.value })} />
              </div>
            )}
            {s.shape === 'trap' && (
              <div className="grid grid-cols-5 gap-1">
                <Input className="h-7 text-xs" placeholder="Top W" type="number" value={s.top || ''} onChange={(e) => update(s.id, { top: e.target.value })} />
                <Input className="h-7 text-xs" placeholder="Bot W" type="number" value={s.bot || ''} onChange={(e) => update(s.id, { bot: e.target.value })} />
                <Input className="h-7 text-xs" placeholder="Depth" type="number" value={s.depth || ''} onChange={(e) => update(s.id, { depth: e.target.value })} />
                <Input className="h-7 text-xs" placeholder="Length" type="number" value={s.l || ''} onChange={(e) => update(s.id, { l: e.target.value })} />
                <Input className="h-7 text-xs" placeholder="Count" type="number" value={s.count || ''} onChange={(e) => update(s.id, { count: e.target.value })} />
              </div>
            )}
            <p className="text-[10px] text-muted-foreground text-right">{segVolume(s).toFixed(3)} cm³</p>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={add} className="w-full h-7 text-xs">
        <Plus className="h-3 w-3 mr-1" /> Add segment
      </Button>
      <div className="flex items-center justify-between mt-2 p-2 bg-muted rounded">
        <span className="text-sm">Total runner = <b>{total.toFixed(3)}</b> cm³</span>
        <Button size="sm" type="button" disabled={!total} onClick={() => onApply(+total.toFixed(3))}>
          Use this <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );
}

// -------------------- Main Calculator --------------------
export function ShotVolumeCalculator() {
  const { ref: cardRef, ExportBtn } = useExport('Shot Volume & Weight Calculator');
  const [partVolume, setPartVolume] = useState<string>('');
  const [runnerVolume, setRunnerVolume] = useState<string>('');
  const [cavities, setCavities] = useState<string>('1');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [customDensity, setCustomDensity] = useState<string>('');
  const [result, setResult] = useState<ReturnType<typeof calculateShotVolumeWeight> | null>(null);

  // Machine translation
  const [screwD, setScrewD] = useState('');
  const [cushion, setCushion] = useState('4');
  const [decomp, setDecomp] = useState('0');

  const getDensity = (): number => {
    if (selectedMaterial === 'Custom') return parseFloat(customDensity) || 1.0;
    return MATERIAL_DENSITIES[selectedMaterial] || 1.0;
  };

  const handleCalculate = () => {
    const pVol = parseFloat(partVolume);
    const rVol = parseFloat(runnerVolume) || 0;
    const numCavities = parseInt(cavities) || 1;
    if (isNaN(pVol)) return;
    setResult(calculateShotVolumeWeight(pVol, rVol, numCavities, getDensity()));
  };

  const handleReset = () => {
    setPartVolume(''); setRunnerVolume(''); setCavities('1');
    setSelectedMaterial(''); setCustomDensity(''); setResult(null);
    setScrewD(''); setCushion('4'); setDecomp('0');
  };

  const strokeMm = result && +screwD > 0
    ? shotVolumeToStrokeMm(result.totalShotVolume, +screwD, +cushion || 0, +decomp || 0)
    : 0;
  const transferMm = strokeMm > 0
    ? (+cushion || 0) + (strokeMm - (+cushion || 0)) * 0.05  // 95% fill => 5% remaining
    : 0;

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Shot Volume & Weight Calculator</CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          Calculate part, runner, and total shot volume, then translate to a machine stroke setting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Material</Label>
            <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
              <SelectTrigger><SelectValue placeholder="Select material..." /></SelectTrigger>
              <SelectContent>
                {Object.keys(MATERIAL_DENSITIES).map((mat) => (
                  <SelectItem key={mat} value={mat}>{mat} ({MATERIAL_DENSITIES[mat]} g/cm³)</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedMaterial === 'Custom' && (
            <div className="space-y-2">
              <Label>Custom Density (g/cm³)</Label>
              <Input type="number" step="0.01" placeholder="e.g., 1.15" value={customDensity} onChange={(e) => setCustomDensity(e.target.value)} />
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-1">
                Single Part Volume (cm³)
                <Tooltip><TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger>
                  <TooltipContent>Volume of one part cavity. Use the helper if you only have weight or dimensions.</TooltipContent>
                </Tooltip>
              </Label>
              <HelperPopover title="Derive part volume" description="From part weight or basic geometry">
                <PartVolumeHelper density={getDensity()} onApply={(v) => setPartVolume(String(v))} />
              </HelperPopover>
            </div>
            <Input type="number" step="0.1" placeholder="e.g., 15.5" value={partVolume} onChange={(e) => setPartVolume(e.target.value)} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-1">
                Runner Volume (cm³)
                <Tooltip><TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger>
                  <TooltipContent>Total runner system volume (sprue + runners + gates). Zero for hot runners.</TooltipContent>
                </Tooltip>
              </Label>
              <HelperPopover title="Derive runner volume" description="Add every sprue and runner segment">
                <RunnerVolumeHelper onApply={(v) => setRunnerVolume(String(v))} />
              </HelperPopover>
            </div>
            <Input type="number" step="0.1" placeholder="e.g., 8.2 (0 for hot runner)" value={runnerVolume} onChange={(e) => setRunnerVolume(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Number of Cavities</Label>
            <Input type="number" step="1" min="1" placeholder="e.g., 4" value={cavities} onChange={(e) => setCavities(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate
          </Button>
          <Button variant="outline" onClick={handleReset}>Reset</Button>
        </div>

        {result && (
          <>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Shot Volume</p>
                  <p className="text-xl font-bold text-primary">{result.totalShotVolume.toFixed(2)} cm³</p>
                  <p className="text-xs text-muted-foreground">({(result.totalShotVolume * 0.061024).toFixed(2)} in³)</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Shot Weight</p>
                  <p className="text-xl font-bold text-primary">{result.totalShotWeight.toFixed(2)} g</p>
                  <p className="text-xs text-muted-foreground">({(result.totalShotWeight * 0.035274).toFixed(2)} oz)</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Part Weight (each)</p>
                  <p className="text-xl font-bold">{result.partWeight.toFixed(2)} g</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Runner Weight</p>
                  <p className="text-xl font-bold">{result.runnerWeight.toFixed(2)} g</p>
                </div>
              </div>
            </div>

            {/* Machine translation block */}
            <div className="mt-4 p-4 border-2 border-primary/40 rounded-lg bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <p className="font-semibold text-sm">Send to Press — Shot Size (mm)</p>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Enter your screw diameter to convert shot volume into a screw-position setting you can key into the HMI.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Screw diameter (mm)</Label>
                  <Input type="number" placeholder="e.g., 40" value={screwD} onChange={(e) => setScrewD(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Cushion (mm)</Label>
                  <Input type="number" value={cushion} onChange={(e) => setCushion(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Decompression (mm)</Label>
                  <Input type="number" value={decomp} onChange={(e) => setDecomp(e.target.value)} />
                </div>
              </div>
              {strokeMm > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">Shot Size setting</p>
                    <p className="text-2xl font-bold text-primary">{strokeMm.toFixed(1)} mm</p>
                    <p className="text-[10px] text-muted-foreground">Total screw stroke incl. cushion & decomp</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Transfer position (V→P @ 95%)</p>
                    <p className="text-2xl font-bold">{transferMm.toFixed(1)} mm</p>
                    <p className="text-[10px] text-muted-foreground">Starting point — verify with a short-shot study</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
