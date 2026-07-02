import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, GitBranch } from 'lucide-react';
import { useExport } from './ExportButton';

interface CavityEntry {
  id: number;
  label: string;
  runnerLength: number;
  runnerDiameter: number;
  fillTime: number;
  partWeight: number;
}

interface BalanceResult {
  avgFillTime: number;
  avgWeight: number;
  fillTimeRange: number;
  fillTimeImbalance: number;
  weightRange: number;
  weightImbalance: number;
  worstCavityFill: string;
  worstCavityWeight: string;
  overallRating: 'Excellent' | 'Good' | 'Marginal' | 'Poor';
  cavityDetails: Array<{
    label: string;
    fillDeviation: number;
    weightDeviation: number;
    flowIndex: number;
  }>;
}

const LAYOUT_PRESETS: Record<string, number> = {
  '2': 2,
  '4': 4,
  '8': 8,
  '16': 16,
  'custom': 0,
};

function createDefaultCavity(id: number): CavityEntry {
  return { id, label: `Cavity ${id}`, runnerLength: 6, runnerDiameter: 0.25, fillTime: 0, partWeight: 0 };
}

export function RunnerBalanceCalculator() {
  const { ref: cardRef, ExportBtn } = useExport('Runner Balance Calculator');
  const [cavities, setCavities] = useState<CavityEntry[]>([
    createDefaultCavity(1),
    createDefaultCavity(2),
    createDefaultCavity(3),
    createDefaultCavity(4),
  ]);
  const [result, setResult] = useState<BalanceResult | null>(null);

  const handlePreset = (val: string) => {
    const count = LAYOUT_PRESETS[val];
    if (!count) return;
    setCavities(Array.from({ length: count }, (_, i) => createDefaultCavity(i + 1)));
    setResult(null);
  };

  const updateCavity = (id: number, field: keyof CavityEntry, value: string) => {
    setCavities(prev => prev.map(c => c.id === id ? { ...c, [field]: field === 'label' ? value : parseFloat(value) || 0 } : c));
  };

  const addCavity = () => {
    const nextId = Math.max(...cavities.map(c => c.id), 0) + 1;
    setCavities(prev => [...prev, createDefaultCavity(nextId)]);
  };

  const removeCavity = (id: number) => {
    if (cavities.length <= 2) return;
    setCavities(prev => prev.filter(c => c.id !== id));
  };

  const calculate = () => {
    const fills = cavities.map(c => c.fillTime);
    const weights = cavities.map(c => c.partWeight);

    const avgFill = fills.reduce((a, b) => a + b, 0) / fills.length;
    const avgWeight = weights.reduce((a, b) => a + b, 0) / weights.length;
    const fillRange = Math.max(...fills) - Math.min(...fills);
    const weightRange = Math.max(...weights) - Math.min(...weights);
    const fillImbalance = avgFill > 0 ? (fillRange / avgFill) * 100 : 0;
    const weightImbalance = avgWeight > 0 ? (weightRange / avgWeight) * 100 : 0;

    const worstFillIdx = fills.indexOf(Math.max(...fills.map(f => Math.abs(f - avgFill))));
    const worstWeightIdx = weights.indexOf(Math.max(...weights.map(w => Math.abs(w - avgWeight))));

    const cavityDetails = cavities.map(c => {
      const fillDev = avgFill > 0 ? ((c.fillTime - avgFill) / avgFill) * 100 : 0;
      const weightDev = avgWeight > 0 ? ((c.partWeight - avgWeight) / avgWeight) * 100 : 0;
      // Flow index: relative runner resistance (L/D^4 proxy)
      const flowIndex = c.runnerDiameter > 0 ? c.runnerLength / Math.pow(c.runnerDiameter, 4) : 0;
      return { label: c.label, fillDeviation: fillDev, weightDeviation: weightDev, flowIndex };
    });

    let rating: BalanceResult['overallRating'] = 'Excellent';
    if (fillImbalance > 10 || weightImbalance > 5) rating = 'Poor';
    else if (fillImbalance > 5 || weightImbalance > 3) rating = 'Marginal';
    else if (fillImbalance > 2 || weightImbalance > 1) rating = 'Good';

    setResult({
      avgFillTime: avgFill,
      avgWeight: avgWeight,
      fillTimeRange: fillRange,
      fillTimeImbalance: fillImbalance,
      weightRange: weightRange,
      weightImbalance: weightImbalance,
      worstCavityFill: cavities[worstFillIdx]?.label || '',
      worstCavityWeight: cavities[worstWeightIdx]?.label || '',
      overallRating: rating,
      cavityDetails,
    });
  };

  const ratingColor: Record<string, string> = {
    Excellent: 'bg-green-500/20 text-green-400 border-green-500/30',
    Good: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Marginal: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Poor: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Runner Balance Calculator
          </CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          Analyze multi-cavity runner layouts for balanced fill by comparing fill times, part weights, and runner geometry across cavities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Label>Cavity Layout Preset</Label>
            <Select onValueChange={handlePreset}>
              <SelectTrigger><SelectValue placeholder="Select preset..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 Cavities</SelectItem>
                <SelectItem value="4">4 Cavities</SelectItem>
                <SelectItem value="8">8 Cavities</SelectItem>
                <SelectItem value="16">16 Cavities</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm" onClick={addCavity}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
          <div className="grid grid-cols-[1fr_80px_80px_80px_80px_32px] gap-1 text-sm font-medium text-muted-foreground px-1">
            <span>Cavity</span>
            <span>Length (in)</span>
            <span>Dia (in)</span>
            <span>Fill (s)</span>
            <span>Weight (g)</span>
            <span></span>
          </div>
          {cavities.map(c => (
            <div key={c.id} className="grid grid-cols-[1fr_80px_80px_80px_80px_32px] gap-1 items-center">
              <Input value={c.label} onChange={e => updateCavity(c.id, 'label', e.target.value)} className="h-8 text-xs" />
              <Input type="number" value={c.runnerLength || ''} onChange={e => updateCavity(c.id, 'runnerLength', e.target.value)} className="h-8 text-xs" />
              <Input type="number" value={c.runnerDiameter || ''} onChange={e => updateCavity(c.id, 'runnerDiameter', e.target.value)} className="h-8 text-xs" step="0.01" />
              <Input type="number" value={c.fillTime || ''} onChange={e => updateCavity(c.id, 'fillTime', e.target.value)} className="h-8 text-xs" step="0.01" />
              <Input type="number" value={c.partWeight || ''} onChange={e => updateCavity(c.id, 'partWeight', e.target.value)} className="h-8 text-xs" step="0.01" />
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeCavity(c.id)} disabled={cavities.length <= 2}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>

        <Button onClick={calculate} className="w-full">Analyze Balance</Button>

        {result && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Balance Rating</span>
              <Badge className={ratingColor[result.overallRating]}>{result.overallRating}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-muted-foreground text-xs">Fill Time Imbalance</p>
                <p className="text-lg font-bold">{result.fillTimeImbalance.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">Range: {result.fillTimeRange.toFixed(3)}s | Avg: {result.avgFillTime.toFixed(3)}s</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-muted-foreground text-xs">Weight Imbalance</p>
                <p className="text-lg font-bold">{result.weightImbalance.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">Range: {result.weightRange.toFixed(2)}g | Avg: {result.avgWeight.toFixed(2)}g</p>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <p className="font-medium text-sm mb-2">Per-Cavity Deviation</p>
              <div className="grid grid-cols-[1fr_70px_70px_80px] gap-1 text-muted-foreground font-medium">
                <span>Cavity</span><span>Fill Δ%</span><span>Wt Δ%</span><span>Flow Index</span>
              </div>
              {result.cavityDetails.map(d => (
                <div key={d.label} className="grid grid-cols-[1fr_70px_70px_80px] gap-1">
                  <span>{d.label}</span>
                  <span className={Math.abs(d.fillDeviation) > 5 ? 'text-destructive' : ''}>{d.fillDeviation > 0 ? '+' : ''}{d.fillDeviation.toFixed(1)}%</span>
                  <span className={Math.abs(d.weightDeviation) > 3 ? 'text-destructive' : ''}>{d.weightDeviation > 0 ? '+' : ''}{d.weightDeviation.toFixed(1)}%</span>
                  <span>{d.flowIndex.toFixed(0)}</span>
                </div>
              ))}
            </div>

            {result.overallRating !== 'Excellent' && (
              <div className="bg-muted/50 rounded-lg p-3 text-xs space-y-1">
                <p className="font-medium text-sm">Recommendations</p>
                {result.fillTimeImbalance > 5 && (
                  <p>• Consider equalizing runner lengths or using Melt Flipper™ technology to correct fill imbalance.</p>
                )}
                {result.weightImbalance > 3 && (
                  <p>• Weight variation exceeds 3%. Check for temperature gradients, venting differences, or gate size inconsistencies.</p>
                )}
                <p>• Review cavities with highest Flow Index values — longer runners with smaller diameters create more resistance.</p>
              </div>
            )}

            <div className="rounded-md border border-primary/30 bg-primary/5 p-3 space-y-1.5">
              <p className="text-xs font-semibold text-primary uppercase tracking-wide">Send to Toolroom</p>
              <p className="text-xs">Increase runner Ø on cavities running <strong>slow / light</strong>; reduce Ø or add flow restrictor on cavities running <strong>fast / heavy</strong>. Target ≤2% fill Δ and ≤1% weight Δ.</p>
              <div className="grid grid-cols-[1fr_70px_90px] gap-1 text-[11px] pt-1">
                <span className="text-muted-foreground font-medium">Cavity</span>
                <span className="text-muted-foreground font-medium">Δ Wt</span>
                <span className="text-muted-foreground font-medium">Action</span>
                {result.cavityDetails.map(d => {
                  const action = d.weightDeviation < -1 ? 'Enlarge Ø' : d.weightDeviation > 1 ? 'Restrict / balance' : 'Hold';
                  return (
                    <>
                      <span key={d.label + '-l'}>{d.label}</span>
                      <span key={d.label + '-d'} className="font-mono">{d.weightDeviation > 0 ? '+' : ''}{d.weightDeviation.toFixed(1)}%</span>
                      <span key={d.label + '-a'} className="font-medium">{action}</span>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
