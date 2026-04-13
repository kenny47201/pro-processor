import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Plus, Trash2 } from 'lucide-react';

export function CpkCalculator() {
  const [usl, setUsl] = useState<string>('');
  const [lsl, setLsl] = useState<string>('');
  const [measurements, setMeasurements] = useState<string>('');
  const [result, setResult] = useState<{
    mean: number; stdDev: number; cp: number; cpk: number; cpu: number; cpl: number;
    min: number; max: number; range: number; count: number; rating: string;
  } | null>(null);

  const handleCalculate = () => {
    const upper = parseFloat(usl);
    const lower = parseFloat(lsl);
    const values = measurements
      .split(/[\s,;]+/)
      .map(v => parseFloat(v.trim()))
      .filter(v => !isNaN(v));

    if (isNaN(upper) || isNaN(lower) || values.length < 5) return;

    const n = values.length;
    const mean = values.reduce((a, b) => a + b, 0) / n;
    const stdDev = Math.sqrt(values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / (n - 1));
    const cp = (upper - lower) / (6 * stdDev);
    const cpu = (upper - mean) / (3 * stdDev);
    const cpl = (mean - lower) / (3 * stdDev);
    const cpk = Math.min(cpu, cpl);
    const min = Math.min(...values);
    const max = Math.max(...values);

    let rating = 'Excellent';
    if (cpk < 0.67) rating = 'Not Capable';
    else if (cpk < 1.0) rating = 'Poor';
    else if (cpk < 1.33) rating = 'Capable';
    else if (cpk < 1.67) rating = 'Good';

    setResult({ mean, stdDev, cp, cpk, cpu, cpl, min, max, range: max - min, count: n, rating });
  };

  const handleReset = () => {
    setUsl('');
    setLsl('');
    setMeasurements('');
    setResult(null);
  };

  const getCpkColor = (cpk: number) => {
    if (cpk >= 1.67) return 'text-green-600';
    if (cpk >= 1.33) return 'text-green-500';
    if (cpk >= 1.0) return 'text-yellow-600';
    if (cpk >= 0.67) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Cpk / Process Capability
        </CardTitle>
        <CardDescription>
          Cpk = min((USL - μ) / 3σ, (μ - LSL) / 3σ) — measures how centered and capable your process is
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Lower Spec Limit (LSL)</Label>
            <Input type="number" step="0.001" placeholder="e.g., 2.490" value={lsl} onChange={(e) => setLsl(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Upper Spec Limit (USL)</Label>
            <Input type="number" step="0.001" placeholder="e.g., 2.510" value={usl} onChange={(e) => setUsl(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Measurements (paste values separated by commas, spaces, or newlines — min 5)</Label>
          <textarea
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[80px]"
            placeholder="2.501, 2.499, 2.503, 2.498, 2.502, 2.500..."
            value={measurements}
            onChange={(e) => setMeasurements(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            <Calculator className="h-4 w-4 mr-2" /> Calculate
          </Button>
          <Button variant="outline" onClick={handleReset}>Reset</Button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Cpk</p>
                <p className={`text-2xl font-bold ${getCpkColor(result.cpk)}`}>{result.cpk.toFixed(3)}</p>
                <Badge variant={result.cpk >= 1.33 ? 'default' : 'destructive'} className="mt-1 text-xs">{result.rating}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cp</p>
                <p className="text-2xl font-bold text-primary">{result.cp.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mean (μ)</p>
                <p className="text-lg font-semibold">{result.mean.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Std Dev (σ)</p>
                <p className="text-lg font-semibold">{result.stdDev.toFixed(4)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t">
              <div>
                <p className="text-xs text-muted-foreground">CPU</p>
                <p className="text-sm font-medium">{result.cpu.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">CPL</p>
                <p className="text-sm font-medium">{result.cpl.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Min / Max</p>
                <p className="text-sm font-medium">{result.min.toFixed(4)} / {result.max.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">n / Range</p>
                <p className="text-sm font-medium">{result.count} / {result.range.toFixed(4)}</p>
              </div>
            </div>

            <div className="pt-3 border-t">
              <p className="text-xs text-muted-foreground mb-1">Cpk Guidelines:</p>
              <ul className="text-xs text-muted-foreground space-y-0.5">
                <li>• &lt; 0.67: Not capable — immediate action needed</li>
                <li>• 0.67 – 1.00: Poor — significant improvement needed</li>
                <li>• 1.00 – 1.33: Capable — meets minimum requirements</li>
                <li>• 1.33 – 1.67: Good — automotive/medical standard</li>
                <li>• &gt; 1.67: Excellent — Six Sigma level</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
