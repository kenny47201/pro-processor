import { useState, useEffect } from 'react';
import { useUnits, lbToKg } from '@/contexts/UnitSystemContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Send } from 'lucide-react';
import { calculateThroughput } from '@/lib/processCalculations';
import { useExport } from './ExportButton';
import { HelperPopover } from './HelperPopover';

export function ThroughputCalculator() {
  const { ref: cardRef, ExportBtn } = useExport('Throughput Calculator');
  const [shotWeight, setShotWeight] = useState<string>('');
  const [cycleTime, setCycleTime] = useState<string>('');
  const [cavities, setCavities] = useState<string>('1');
  const [piecesPerCase, setPiecesPerCase] = useState<string>('100');
  const [result, setResult] = useState<ReturnType<typeof calculateThroughput> | null>(null);

  const handleCalculate = () => {
    const weight = parseFloat(shotWeight);
    const cycle = parseFloat(cycleTime);
    const cav = parseInt(cavities) || 1;
    const ppc = parseInt(piecesPerCase) || 100;

    if (isNaN(weight) || isNaN(cycle) || cycle <= 0) return;

    const calcResult = calculateThroughput(weight, cycle, cav, ppc);
    setResult(calcResult);
  };

  const handleReset = () => {
    setShotWeight('');
    setCycleTime('');
    setCavities('1');
    setPiecesPerCase('100');
    setResult(null);
  };

  const { isMetric, resetNonce } = useUnits();
  useEffect(() => { handleReset(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [resetNonce]);

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Throughput Calculator
          </CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          Lb/hr = Shot Weight × (3600 / Cycle Time) — Parts per hour and cases per hour
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="shotWeight">Shot Weight (g)</Label>
              <HelperPopover title="Derive shot weight" description="Shot weight = (part weight × cavities) + runner weight">
                <ShotWeightHelper onApply={(g) => setShotWeight(g.toFixed(2))} />
              </HelperPopover>
            </div>
            <Input
              id="shotWeight"
              type="number"
              step="0.1"
              placeholder="e.g., 45.5"
              value={shotWeight}
              onChange={(e) => setShotWeight(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cycleTime">Cycle Time (seconds)</Label>
            <Input
              id="cycleTime"
              type="number"
              step="0.1"
              placeholder="e.g., 18.5"
              value={cycleTime}
              onChange={(e) => setCycleTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cavities">Number of Cavities</Label>
            <Input
              id="cavities"
              type="number"
              step="1"
              min="1"
              placeholder="e.g., 4"
              value={cavities}
              onChange={(e) => setCavities(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="piecesPerCase">Pieces per Case</Label>
            <Input
              id="piecesPerCase"
              type="number"
              step="1"
              min="1"
              placeholder="e.g., 100"
              value={piecesPerCase}
              onChange={(e) => setPiecesPerCase(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Shots/Hour</p>
                <p className="text-xl font-bold text-primary">
                  {result.shotsPerHour.toFixed(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Parts/Hour</p>
                <p className="text-xl font-bold text-primary">
                  {result.partsPerHour.toFixed(0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{isMetric ? 'Kg/Hour' : 'Lb/Hour'}</p>
                <p className="text-xl font-bold text-primary">
                  {(isMetric ? lbToKg(result.lbPerHour) : result.lbPerHour).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cases/Hour</p>
                <p className="text-xl font-bold text-primary">
                  {result.casesPerHour.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Parts per Shift (8hr)</p>
                <p className="font-medium">{(result.partsPerHour * 8).toFixed(0)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Cases per Shift (8hr)</p>
                <p className="font-medium">{(result.casesPerHour * 8).toFixed(1)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{isMetric ? 'Kg' : 'Lb'} per Shift (8hr)</p>
                <p className="font-medium">{((isMetric ? lbToKg(result.lbPerHour) : result.lbPerHour) * 8).toFixed(1)}</p>
              </div>
            </div>

            <SendToScheduling partsPerHour={result.partsPerHour} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ShotWeightHelper({ onApply }: { onApply: (g: number) => void }) {
  const [partWeight, setPartWeight] = useState('');
  const [cav, setCav] = useState('1');
  const [runnerWeight, setRunnerWeight] = useState('0');
  const total = (parseFloat(partWeight) || 0) * (parseInt(cav) || 0) + (parseFloat(runnerWeight) || 0);
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        <div><Label className="text-xs">Part (g)</Label><Input type="number" step="0.01" value={partWeight} onChange={e => setPartWeight(e.target.value)} className="h-8" /></div>
        <div><Label className="text-xs">Cavities</Label><Input type="number" value={cav} onChange={e => setCav(e.target.value)} className="h-8" /></div>
        <div><Label className="text-xs">Runner (g)</Label><Input type="number" step="0.01" value={runnerWeight} onChange={e => setRunnerWeight(e.target.value)} className="h-8" /></div>
      </div>
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-muted-foreground">Total shot weight</span>
        <span className="text-sm font-semibold">{total.toFixed(2)} g</span>
      </div>
      <Button size="sm" className="w-full h-7 text-xs" onClick={() => onApply(total)} disabled={!total}>Apply</Button>
    </div>
  );
}

function SendToScheduling({ partsPerHour }: { partsPerHour: number }) {
  const [orderQty, setOrderQty] = useState('10000');
  const [uptime, setUptime] = useState('85');
  const qty = parseFloat(orderQty) || 0;
  const up = (parseFloat(uptime) || 100) / 100;
  const effectivePph = partsPerHour * up;
  const hours = effectivePph > 0 ? qty / effectivePph : 0;
  const shifts = hours / 8;
  return (
    <div className="mt-4 p-4 rounded-lg border-2 border-primary/30 bg-primary/5 space-y-3">
      <div className="flex items-center gap-2">
        <Send className="h-4 w-4 text-primary" />
        <p className="text-sm font-semibold">Send to Scheduling — Run Time Estimate</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label className="text-xs">Order Qty (parts)</Label><Input type="number" value={orderQty} onChange={e => setOrderQty(e.target.value)} className="h-8" /></div>
        <div><Label className="text-xs">Uptime %</Label><Input type="number" value={uptime} onChange={e => setUptime(e.target.value)} className="h-8" /></div>
      </div>
      <div className="grid grid-cols-3 gap-3 pt-1 border-t">
        <div><p className="text-xs text-muted-foreground">Run Hours</p><p className="text-lg font-bold text-primary">{hours.toFixed(1)}</p></div>
        <div><p className="text-xs text-muted-foreground">Shifts (8h)</p><p className="text-lg font-bold text-primary">{shifts.toFixed(2)}</p></div>
        <div><p className="text-xs text-muted-foreground">Days (24h)</p><p className="text-lg font-bold text-primary">{(hours / 24).toFixed(2)}</p></div>
      </div>
    </div>
  );
}
