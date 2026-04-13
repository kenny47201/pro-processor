import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Plus, Trash2 } from 'lucide-react';

interface DataPoint {
  id: number;
  holdTime: string;
  partWeight: string;
}

export function GateSealStudy() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { id: 1, holdTime: '', partWeight: '' },
    { id: 2, holdTime: '', partWeight: '' },
    { id: 3, holdTime: '', partWeight: '' },
    { id: 4, holdTime: '', partWeight: '' },
    { id: 5, holdTime: '', partWeight: '' },
  ]);
  const [results, setResults] = useState<Array<{ holdTime: number; partWeight: number; sealed: boolean }> | null>(null);

  const addPoint = () => {
    setDataPoints([...dataPoints, { id: Date.now(), holdTime: '', partWeight: '' }]);
  };

  const removePoint = (id: number) => {
    if (dataPoints.length > 3) setDataPoints(dataPoints.filter(p => p.id !== id));
  };

  const updatePoint = (id: number, field: keyof DataPoint, value: string) => {
    setDataPoints(dataPoints.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleCalculate = () => {
    const valid = dataPoints
      .filter(p => p.holdTime && p.partWeight)
      .map(p => ({ holdTime: parseFloat(p.holdTime), partWeight: parseFloat(p.partWeight) }))
      .sort((a, b) => a.holdTime - b.holdTime);

    if (valid.length < 3) return;

    // Gate is sealed when weight stops increasing (delta < 0.5% of max weight)
    const maxWeight = Math.max(...valid.map(v => v.partWeight));
    const threshold = maxWeight * 0.005;

    const analyzed = valid.map((pt, i) => {
      if (i === 0) return { ...pt, sealed: false };
      const delta = Math.abs(pt.partWeight - valid[i - 1].partWeight);
      return { ...pt, sealed: delta < threshold };
    });

    // Mark all points after first sealed as sealed
    let foundSeal = false;
    for (const pt of analyzed) {
      if (pt.sealed) foundSeal = true;
      if (foundSeal) pt.sealed = true;
    }

    setResults(analyzed);
  };

  const handleReset = () => {
    setDataPoints([
      { id: 1, holdTime: '', partWeight: '' },
      { id: 2, holdTime: '', partWeight: '' },
      { id: 3, holdTime: '', partWeight: '' },
      { id: 4, holdTime: '', partWeight: '' },
      { id: 5, holdTime: '', partWeight: '' },
    ]);
    setResults(null);
  };

  const getSealTime = () => {
    if (!results) return null;
    const sealPoint = results.find(r => r.sealed);
    return sealPoint ? sealPoint.holdTime : null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Gate Seal Study
        </CardTitle>
        <CardDescription>
          Incrementally increase hold time and weigh parts to determine gate freeze-off time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-lg p-3 bg-muted/30 space-y-2">
          <Label className="text-sm font-medium">Data Points (increase hold time, weigh each part)</Label>
          {dataPoints.map((point, idx) => (
            <div key={point.id} className="grid grid-cols-3 gap-2 items-end">
              <div>
                {idx === 0 && <Label className="text-xs">Hold Time (s)</Label>}
                <Input type="number" step="0.5" placeholder="e.g., 2.0" value={point.holdTime} onChange={(e) => updatePoint(point.id, 'holdTime', e.target.value)} />
              </div>
              <div>
                {idx === 0 && <Label className="text-xs">Part Weight (g)</Label>}
                <Input type="number" step="0.01" placeholder="e.g., 45.23" value={point.partWeight} onChange={(e) => updatePoint(point.id, 'partWeight', e.target.value)} />
              </div>
              <Button variant="ghost" size="icon" onClick={() => removePoint(point.id)} disabled={dataPoints.length <= 3}>
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

        {results && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-1 px-2">Hold Time (s)</th>
                    <th className="text-left py-1 px-2">Weight (g)</th>
                    <th className="text-left py-1 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i} className="border-b border-muted">
                      <td className="py-1 px-2">{r.holdTime.toFixed(1)}</td>
                      <td className="py-1 px-2">{r.partWeight.toFixed(2)}</td>
                      <td className="py-1 px-2">
                        <Badge variant={r.sealed ? 'default' : 'outline'} className="text-xs">
                          {r.sealed ? '✓ Sealed' : 'Not Sealed'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Visual bar chart */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Part Weight vs Hold Time</Label>
              {results.map((r, i) => {
                const minW = Math.min(...results.map(x => x.partWeight)) * 0.98;
                const maxW = Math.max(...results.map(x => x.partWeight));
                const pct = ((r.partWeight - minW) / (maxW - minW + 0.01)) * 100;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs w-10 text-right">{r.holdTime}s</span>
                    <div className="flex-1 bg-muted rounded h-4 overflow-hidden">
                      <div className={`h-full rounded ${r.sealed ? 'bg-green-500' : 'bg-primary/70'}`} style={{ width: `${Math.max(pct, 5)}%` }} />
                    </div>
                    <span className="text-xs w-14">{r.partWeight.toFixed(2)}g</span>
                  </div>
                );
              })}
            </div>

            {getSealTime() !== null && (
              <div className="pt-2 border-t">
                <Badge variant="default" className="mb-1">Gate Seal Time</Badge>
                <p className="text-sm text-muted-foreground">
                  Gate freezes at approximately <span className="font-semibold text-foreground">{getSealTime()!.toFixed(1)} seconds</span>.
                  Weight stabilized — additional hold time provides no benefit.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
