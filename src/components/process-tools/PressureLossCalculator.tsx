import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Calculator } from 'lucide-react';

interface RunnerSegment {
  id: number;
  name: string;
  length: string;
  diameter: string;
}

interface SegmentResult {
  name: string;
  length: number;
  diameter: number;
  pressureLossPsi: number;
  velocityInS: number;
  shearRate: number;
}

export function PressureLossCalculator() {
  const [segments, setSegments] = useState<RunnerSegment[]>([
    { id: 1, name: 'Sprue', length: '75', diameter: '8' },
    { id: 2, name: 'Primary Runner', length: '100', diameter: '6' },
    { id: 3, name: 'Secondary Runner', length: '50', diameter: '5' },
  ]);
  const [flowRate, setFlowRate] = useState('20'); // cc/s
  const [viscosity, setViscosity] = useState('200'); // Pa·s
  const [results, setResults] = useState<{ segments: SegmentResult[]; totalLoss: number } | null>(null);

  const addSegment = () => {
    setSegments([...segments, { id: Date.now(), name: `Segment ${segments.length + 1}`, length: '', diameter: '' }]);
  };

  const removeSegment = (id: number) => {
    if (segments.length > 1) setSegments(segments.filter(s => s.id !== id));
  };

  const updateSegment = (id: number, field: keyof RunnerSegment, value: string) => {
    setSegments(segments.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleCalculate = () => {
    const Q = parseFloat(flowRate); // cc/s
    const mu = parseFloat(viscosity); // Pa·s
    if (!Q || !mu) return;

    const Q_m3s = Q / 1e6; // m³/s

    const segResults: SegmentResult[] = segments
      .filter(s => s.length && s.diameter)
      .map(s => {
        const L = parseFloat(s.length) / 1000; // m
        const D = parseFloat(s.diameter) / 1000; // m
        const R = D / 2;

        // Hagen-Poiseuille: ΔP = (128 × μ × L × Q) / (π × D⁴)
        const dP_Pa = (128 * mu * L * Q_m3s) / (Math.PI * Math.pow(D, 4));
        const dP_psi = dP_Pa * 0.000145038;

        // Velocity = Q / A
        const A = Math.PI * R * R;
        const velocity_ms = Q_m3s / A;
        const velocity_ins = velocity_ms * 39.3701;

        // Wall shear rate (Newtonian) = (32 × Q) / (π × D³)
        const shearRate = (32 * Q_m3s) / (Math.PI * Math.pow(D, 3));

        return {
          name: s.name,
          length: parseFloat(s.length),
          diameter: parseFloat(s.diameter),
          pressureLossPsi: dP_psi,
          velocityInS: velocity_ins,
          shearRate,
        };
      });

    const totalLoss = segResults.reduce((sum, r) => sum + r.pressureLossPsi, 0);
    setResults({ segments: segResults, totalLoss });
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Calculator className="h-4 w-4 text-primary" />
              Pressure Loss Calculator
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              Hagen-Poiseuille pressure drop across runner segments
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs">Optimization</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Flow Rate (cc/s)</Label>
            <Input type="number" value={flowRate} onChange={e => setFlowRate(e.target.value)} className="h-8 text-sm" />
          </div>
          <div>
            <Label className="text-xs">Melt Viscosity (Pa·s)</Label>
            <Input type="number" value={viscosity} onChange={e => setViscosity(e.target.value)} className="h-8 text-sm" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold">Runner Segments</Label>
            <Button variant="ghost" size="sm" onClick={addSegment} className="h-6 text-xs gap-1">
              <Plus className="h-3 w-3" /> Add
            </Button>
          </div>
          {segments.map(seg => (
            <div key={seg.id} className="grid grid-cols-[1fr_0.6fr_0.6fr_auto] gap-2 items-end">
              <div>
                <Label className="text-[10px] text-muted-foreground">Name</Label>
                <Input value={seg.name} onChange={e => updateSegment(seg.id, 'name', e.target.value)} className="h-7 text-xs" />
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground">L (mm)</Label>
                <Input type="number" value={seg.length} onChange={e => updateSegment(seg.id, 'length', e.target.value)} className="h-7 text-xs" />
              </div>
              <div>
                <Label className="text-[10px] text-muted-foreground">Ø (mm)</Label>
                <Input type="number" value={seg.diameter} onChange={e => updateSegment(seg.id, 'diameter', e.target.value)} className="h-7 text-xs" />
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeSegment(seg.id)} className="h-7 w-7 p-0" disabled={segments.length <= 1}>
                <Trash2 className="h-3 w-3 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        <Button onClick={handleCalculate} className="w-full h-8 text-sm">Calculate Pressure Loss</Button>

        {results && (
          <div className="space-y-3 pt-2 border-t border-border/50">
            <div className="space-y-1">
              {results.segments.map((r, i) => (
                <div key={i} className="flex justify-between text-xs bg-muted/30 rounded px-2 py-1.5">
                  <span className="font-medium">{r.name}</span>
                  <div className="flex gap-3 text-muted-foreground">
                    <span>{r.pressureLossPsi.toFixed(0)} psi</span>
                    <span>{r.velocityInS.toFixed(1)} in/s</span>
                    <span>{r.shearRate.toFixed(0)} s⁻¹</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center bg-primary/10 rounded px-3 py-2">
              <span className="text-sm font-semibold">Total Pressure Loss</span>
              <span className="text-lg font-bold text-primary">{results.totalLoss.toFixed(0)} psi</span>
            </div>
            {results.totalLoss > 15000 && (
              <p className="text-xs text-destructive">⚠ High pressure loss — consider increasing runner diameters or reducing flow rate.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
