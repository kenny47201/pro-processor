import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Plus, Trash2 } from 'lucide-react';
import { useExport } from './ExportButton';

interface DefectEntry {
  id: number;
  defect: string;
  count: string;
}

export function RejectRateAnalyzer() {
  const { ref: cardRef, ExportBtn } = useExport('Reject Rate & Pareto Analysis');
  const [totalParts, setTotalParts] = useState<string>('');
  const [defects, setDefects] = useState<DefectEntry[]>([
    { id: 1, defect: 'Short Shot', count: '' },
    { id: 2, defect: 'Flash', count: '' },
    { id: 3, defect: 'Sink Mark', count: '' },
    { id: 4, defect: 'Burn Mark', count: '' },
    { id: 5, defect: 'Weld Line', count: '' },
  ]);
  const [result, setResult] = useState<{
    totalRejects: number; rejectRate: number; yieldRate: number;
    pareto: Array<{ defect: string; count: number; pct: number; cumPct: number }>;
  } | null>(null);

  const addDefect = () => {
    setDefects([...defects, { id: Date.now(), defect: '', count: '' }]);
  };

  const removeDefect = (id: number) => {
    if (defects.length > 1) setDefects(defects.filter(d => d.id !== id));
  };

  const updateDefect = (id: number, field: keyof DefectEntry, value: string) => {
    setDefects(defects.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const handleCalculate = () => {
    const total = parseInt(totalParts);
    if (isNaN(total) || total <= 0) return;

    const validDefects = defects
      .filter(d => d.defect && d.count && parseInt(d.count) > 0)
      .map(d => ({ defect: d.defect, count: parseInt(d.count) }))
      .sort((a, b) => b.count - a.count);

    const totalRejects = validDefects.reduce((sum, d) => sum + d.count, 0);
    const rejectRate = (totalRejects / total) * 100;
    const yieldRate = 100 - rejectRate;

    let cumCount = 0;
    const pareto = validDefects.map(d => {
      cumCount += d.count;
      return {
        defect: d.defect,
        count: d.count,
        pct: (d.count / totalRejects) * 100,
        cumPct: (cumCount / totalRejects) * 100,
      };
    });

    setResult({ totalRejects, rejectRate, yieldRate, pareto });
  };

  const handleReset = () => {
    setTotalParts('');
    setDefects([
      { id: 1, defect: 'Short Shot', count: '' },
      { id: 2, defect: 'Flash', count: '' },
      { id: 3, defect: 'Sink Mark', count: '' },
      { id: 4, defect: 'Burn Mark', count: '' },
      { id: 5, defect: 'Weld Line', count: '' },
    ]);
    setResult(null);
  };

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Reject Rate & Pareto Analysis
          </CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          Track defect types and quantities to identify the vital few causes (80/20 rule)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Total Parts Produced</Label>
          <Input type="number" placeholder="e.g., 5000" value={totalParts} onChange={(e) => setTotalParts(e.target.value)} />
        </div>

        <div className="border rounded-lg p-3 bg-muted/30 space-y-2">
          <Label className="text-sm font-medium">Defect Types & Counts</Label>
          {defects.map((d, idx) => (
            <div key={d.id} className="grid grid-cols-3 gap-2 items-end">
              <div className="col-span-1">
                {idx === 0 && <Label className="text-xs">Defect Name</Label>}
                <Input placeholder="e.g., Flash" value={d.defect} onChange={(e) => updateDefect(d.id, 'defect', e.target.value)} />
              </div>
              <div>
                {idx === 0 && <Label className="text-xs">Count</Label>}
                <Input type="number" placeholder="0" value={d.count} onChange={(e) => updateDefect(d.id, 'count', e.target.value)} />
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeDefect(d.id)} disabled={defects.length <= 1}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addDefect}>
            <Plus className="h-3 w-3 mr-1" /> Add Defect
          </Button>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            <Calculator className="h-4 w-4 mr-2" /> Analyze
          </Button>
          <Button variant="outline" onClick={handleReset}>Reset</Button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Reject Rate</p>
                <p className={`text-2xl font-bold ${result.rejectRate > 5 ? 'text-red-600' : result.rejectRate > 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {result.rejectRate.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Yield</p>
                <p className="text-2xl font-bold text-primary">{result.yieldRate.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Rejects</p>
                <p className="text-2xl font-bold">{result.totalRejects}</p>
              </div>
            </div>

            <div className="pt-3 border-t">
              <p className="text-sm font-medium mb-2">Pareto Chart (sorted by frequency)</p>
              <div className="space-y-1">
                {result.pareto.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs w-24 truncate">{d.defect}</span>
                    <div className="flex-1 bg-muted rounded h-4 overflow-hidden">
                      <div className={`h-full rounded ${d.cumPct <= 80 ? 'bg-red-500' : 'bg-primary/50'}`} style={{ width: `${d.pct}%` }} />
                    </div>
                    <span className="text-xs w-20 text-right">{d.count} ({d.pct.toFixed(0)}%)</span>
                    <Badge variant={d.cumPct <= 80 ? 'destructive' : 'outline'} className="text-xs w-14 justify-center">
                      {d.cumPct.toFixed(0)}%
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Red bars = vital few (80% of defects). Focus improvement efforts here.</p>
            </div>

            <div className="pt-3 border-t bg-primary/5 -m-4 mt-3 p-4 rounded-b-lg">
              <p className="text-sm font-semibold text-primary mb-2">📋 Send to Quality / Process</p>
              <ul className="text-xs space-y-1">
                {result.pareto.filter(d => d.cumPct <= 80).slice(0, 3).map((d, i) => (
                  <li key={i}>• <span className="font-semibold">{d.defect}</span> ({d.count} rejects, {d.pct.toFixed(0)}% of scrap) → open Defect Guide, run root-cause DOE.</li>
                ))}
                <li className="pt-1">• <span className="font-semibold">Scrap cost impact:</span> {result.totalRejects} rejects × cost/part = enter in Cost Per Part → scrap rate {result.rejectRate.toFixed(1)}%.</li>
                <li>• Fixing the top {Math.min(3, result.pareto.length)} defects addresses ~{result.pareto.slice(0, 3).reduce((s, d) => s + d.pct, 0).toFixed(0)}% of scrap.</li>
                {result.rejectRate > 5 && <li className="pt-1">⚠️ Reject rate &gt; 5% — hold shipment and containment sort until root cause identified.</li>}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
