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
  holdPressure: string;
  partWeight: string;
  dimension: string;
}

export function PackHoldStudy() {
  const { ref: cardRef, ExportBtn } = useExport('Pack & Hold Pressure Study');
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { id: 1, holdPressure: '', partWeight: '', dimension: '' },
    { id: 2, holdPressure: '', partWeight: '', dimension: '' },
    { id: 3, holdPressure: '', partWeight: '', dimension: '' },
    { id: 4, holdPressure: '', partWeight: '', dimension: '' },
    { id: 5, holdPressure: '', partWeight: '', dimension: '' },
  ]);
  const [targetDimension, setTargetDimension] = useState<string>('');
  const [results, setResults] = useState<Array<{ holdPressure: number; partWeight: number; dimension: number; status: string }> | null>(null);

  const addPoint = () => {
    setDataPoints([...dataPoints, { id: Date.now(), holdPressure: '', partWeight: '', dimension: '' }]);
  };

  const removePoint = (id: number) => {
    if (dataPoints.length > 3) setDataPoints(dataPoints.filter(p => p.id !== id));
  };

  const updatePoint = (id: number, field: keyof DataPoint, value: string) => {
    setDataPoints(dataPoints.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleCalculate = () => {
    const target = parseFloat(targetDimension);
    const valid = dataPoints
      .filter(p => p.holdPressure && p.partWeight)
      .map(p => ({
        holdPressure: parseFloat(p.holdPressure),
        partWeight: parseFloat(p.partWeight),
        dimension: parseFloat(p.dimension) || 0,
      }))
      .sort((a, b) => a.holdPressure - b.holdPressure);

    if (valid.length < 3) return;

    const analyzed = valid.map((pt, i) => {
      let status = 'Under-packed';
      if (i > 0) {
        const weightDelta = ((pt.partWeight - valid[i - 1].partWeight) / valid[i - 1].partWeight) * 100;
        if (weightDelta < 0.3) status = 'Saturated';
        else if (!isNaN(target) && target > 0 && pt.dimension > 0) {
          const dimDelta = Math.abs(pt.dimension - target);
          if (dimDelta < target * 0.002) status = 'On Target';
        }
      }
      if (i === valid.length - 1 && status === 'Under-packed') {
        const prevWeight = i > 0 ? valid[i - 1].partWeight : 0;
        const weightDelta = ((pt.partWeight - prevWeight) / (prevWeight || 1)) * 100;
        if (weightDelta < 0.3) status = 'Saturated';
      }
      return { ...pt, status };
    });

    setResults(analyzed);
  };

  const handleReset = () => {
    setDataPoints([
      { id: 1, holdPressure: '', partWeight: '', dimension: '' },
      { id: 2, holdPressure: '', partWeight: '', dimension: '' },
      { id: 3, holdPressure: '', partWeight: '', dimension: '' },
      { id: 4, holdPressure: '', partWeight: '', dimension: '' },
      { id: 5, holdPressure: '', partWeight: '', dimension: '' },
    ]);
    setTargetDimension('');
    setResults(null);
  };

  const getOptimalPressure = () => {
    if (!results) return null;
    const onTarget = results.find(r => r.status === 'On Target');
    if (onTarget) return onTarget;
    const saturated = results.find(r => r.status === 'Saturated');
    if (saturated) return saturated;
    return null;
  };

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Pack & Hold Pressure Study
          </CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          Incrementally increase pack pressure — find the optimal point where weight and dimensions stabilize
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Target Critical Dimension (optional)</Label>
          <Input type="number" step="0.001" placeholder="e.g., 2.500 inches" value={targetDimension} onChange={(e) => setTargetDimension(e.target.value)} />
        </div>

        <div className="border rounded-lg p-3 bg-muted/30 space-y-2">
          <Label className="text-sm font-medium">Data Points</Label>
          {dataPoints.map((point, idx) => (
            <div key={point.id} className="grid grid-cols-4 gap-2 items-end">
              <div>
                {idx === 0 && <Label className="text-xs">Hold PSI</Label>}
                <Input type="number" placeholder="e.g., 500" value={point.holdPressure} onChange={(e) => updatePoint(point.id, 'holdPressure', e.target.value)} />
              </div>
              <div>
                {idx === 0 && <Label className="text-xs">Weight (g)</Label>}
                <Input type="number" step="0.01" placeholder="e.g., 42.5" value={point.partWeight} onChange={(e) => updatePoint(point.id, 'partWeight', e.target.value)} />
              </div>
              <div>
                {idx === 0 && <Label className="text-xs">Dimension</Label>}
                <Input type="number" step="0.001" placeholder="optional" value={point.dimension} onChange={(e) => updatePoint(point.id, 'dimension', e.target.value)} />
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
                    <th className="text-left py-1 px-2">Hold PSI</th>
                    <th className="text-left py-1 px-2">Weight (g)</th>
                    <th className="text-left py-1 px-2">Dimension</th>
                    <th className="text-left py-1 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i} className="border-b border-muted">
                      <td className="py-1 px-2">{r.holdPressure}</td>
                      <td className="py-1 px-2">{r.partWeight.toFixed(2)}</td>
                      <td className="py-1 px-2">{r.dimension > 0 ? r.dimension.toFixed(3) : '-'}</td>
                      <td className="py-1 px-2">
                        <Badge variant={r.status === 'On Target' || r.status === 'Saturated' ? 'default' : 'outline'} className="text-xs">
                          {r.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {getOptimalPressure() && (
              <div className="pt-2 border-t">
                <Badge variant="default" className="mb-1">Recommended Pack Pressure</Badge>
                <p className="text-sm text-muted-foreground">
                  Optimal hold pressure: <span className="font-semibold text-foreground">{getOptimalPressure()!.holdPressure} psi</span> — 
                  part weight stabilizes at <span className="font-semibold text-foreground">{getOptimalPressure()!.partWeight.toFixed(2)}g</span>.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
