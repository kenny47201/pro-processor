import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Plus, Trash2 } from 'lucide-react';
import { useExport } from './ExportButton';

interface DataPoint {
  id: number;
  injectionSpeed: string;
  fillTime: string;
  peakPressure: string;
}

export function ViscosityCurveStudy() {
  const { ref: cardRef, ExportBtn } = useExport('Viscosity Curve Study');
  const [shotVolume, setShotVolume] = useState<string>('');
  const [intensificationRatio, setIntensificationRatio] = useState<string>('10');
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { id: 1, injectionSpeed: '', fillTime: '', peakPressure: '' },
    { id: 2, injectionSpeed: '', fillTime: '', peakPressure: '' },
    { id: 3, injectionSpeed: '', fillTime: '', peakPressure: '' },
  ]);
  const [results, setResults] = useState<Array<{ speed: number; fillTime: number; shearRate: number; viscosity: number }> | null>(null);

  const addPoint = () => {
    setDataPoints([...dataPoints, { id: Date.now(), injectionSpeed: '', fillTime: '', peakPressure: '' }]);
  };

  const removePoint = (id: number) => {
    if (dataPoints.length > 2) {
      setDataPoints(dataPoints.filter(p => p.id !== id));
    }
  };

  const updatePoint = (id: number, field: keyof DataPoint, value: string) => {
    setDataPoints(dataPoints.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleCalculate = () => {
    const vol = parseFloat(shotVolume);
    const ir = parseFloat(intensificationRatio);
    if (isNaN(vol) || isNaN(ir)) return;

    const calculated = dataPoints
      .filter(p => p.fillTime && p.peakPressure)
      .map(p => {
        const fillTime = parseFloat(p.fillTime);
        const peakPressure = parseFloat(p.peakPressure);
        const speed = parseFloat(p.injectionSpeed) || 0;
        const flowRate = vol / fillTime; // cm³/s
        const plasticPressure = peakPressure * ir; // psi
        const viscosity = plasticPressure / flowRate;
        return { speed, fillTime, shearRate: flowRate, viscosity };
      })
      .sort((a, b) => a.shearRate - b.shearRate);

    if (calculated.length >= 2) {
      setResults(calculated);
    }
  };

  const handleReset = () => {
    setShotVolume('');
    setIntensificationRatio('10');
    setDataPoints([
      { id: 1, injectionSpeed: '', fillTime: '', peakPressure: '' },
      { id: 2, injectionSpeed: '', fillTime: '', peakPressure: '' },
      { id: 3, injectionSpeed: '', fillTime: '', peakPressure: '' },
    ]);
    setResults(null);
  };

  const findOptimalRegion = () => {
    if (!results || results.length < 3) return null;
    let minSlopeIdx = 0;
    let minSlope = Infinity;
    for (let i = 1; i < results.length; i++) {
      const slope = Math.abs(results[i].viscosity - results[i - 1].viscosity) / (results[i].shearRate - results[i - 1].shearRate + 0.001);
      if (slope < minSlope) {
        minSlope = slope;
        minSlopeIdx = i;
      }
    }
    return results[minSlopeIdx];
  };

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Viscosity Curve (In-Machine Rheology)
          </CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          Relative viscosity study — vary injection speed to find the process-insensitive region
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Shot Volume (cm³)</Label>
            <Input type="number" step="0.1" placeholder="e.g., 45" value={shotVolume} onChange={(e) => setShotVolume(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Intensification Ratio</Label>
            <Input type="number" step="0.5" placeholder="e.g., 10" value={intensificationRatio} onChange={(e) => setIntensificationRatio(e.target.value)} />
          </div>
        </div>

        <div className="border rounded-lg p-3 bg-muted/30 space-y-2">
          <Label className="text-sm font-medium">Data Points (vary speed, record fill time & peak pressure)</Label>
          {dataPoints.map((point, idx) => (
            <div key={point.id} className="grid grid-cols-4 gap-2 items-end">
              <div>
                {idx === 0 && <Label className="text-xs">Speed (%)</Label>}
                <Input type="number" placeholder="e.g., 20" value={point.injectionSpeed} onChange={(e) => updatePoint(point.id, 'injectionSpeed', e.target.value)} />
              </div>
              <div>
                {idx === 0 && <Label className="text-xs">Fill Time (s)</Label>}
                <Input type="number" step="0.01" placeholder="e.g., 2.5" value={point.fillTime} onChange={(e) => updatePoint(point.id, 'fillTime', e.target.value)} />
              </div>
              <div>
                {idx === 0 && <Label className="text-xs">Peak PSI (hyd)</Label>}
                <Input type="number" placeholder="e.g., 1200" value={point.peakPressure} onChange={(e) => updatePoint(point.id, 'peakPressure', e.target.value)} />
              </div>
              <Button variant="ghost" size="icon" onClick={() => removePoint(point.id)} disabled={dataPoints.length <= 2}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addPoint}>
            <Plus className="h-3 w-3 mr-1" /> Add Point
          </Button>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            <Calculator className="h-4 w-4 mr-2" /> Analyze
          </Button>
          <Button variant="outline" onClick={handleReset}>Reset</Button>
        </div>

        {results && results.length >= 2 && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-1 px-2">Speed %</th>
                    <th className="text-left py-1 px-2">Fill Time (s)</th>
                    <th className="text-left py-1 px-2">Flow Rate</th>
                    <th className="text-left py-1 px-2">Rel. Viscosity</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i} className="border-b border-muted">
                      <td className="py-1 px-2">{r.speed || '-'}</td>
                      <td className="py-1 px-2">{r.fillTime.toFixed(2)}</td>
                      <td className="py-1 px-2">{r.shearRate.toFixed(1)} cm³/s</td>
                      <td className="py-1 px-2 font-medium">{r.viscosity.toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Visual bar representation */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Relative Viscosity (lower = less resistant to flow)</Label>
              {results.map((r, i) => {
                const maxVisc = Math.max(...results.map(x => x.viscosity));
                const pct = (r.viscosity / maxVisc) * 100;
                const optimal = findOptimalRegion();
                const isOptimal = optimal && Math.abs(r.shearRate - optimal.shearRate) < 0.01;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs w-12 text-right">{r.speed || r.shearRate.toFixed(0)}</span>
                    <div className="flex-1 bg-muted rounded h-4 overflow-hidden">
                      <div className={`h-full rounded ${isOptimal ? 'bg-green-500' : 'bg-primary/70'}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {findOptimalRegion() && (
              <div className="pt-2 border-t">
                <Badge variant="default" className="mb-1">Recommended Region</Badge>
                <p className="text-sm text-muted-foreground">
                  The flattest part of the curve (most process-insensitive) appears near a flow rate of{' '}
                  <span className="font-semibold text-foreground">{findOptimalRegion()!.shearRate.toFixed(1)} cm³/s</span>.
                  Set fill time near <span className="font-semibold text-foreground">{findOptimalRegion()!.fillTime.toFixed(2)}s</span>.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
