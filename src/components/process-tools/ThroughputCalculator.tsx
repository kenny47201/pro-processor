import { useState } from 'react';
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
            <Label htmlFor="shotWeight">Shot Weight (g)</Label>
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
                <p className="text-sm text-muted-foreground">Lb/Hour</p>
                <p className="text-xl font-bold text-primary">
                  {result.lbPerHour.toFixed(2)}
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
                <p className="text-muted-foreground">Lb per Shift (8hr)</p>
                <p className="font-medium">{(result.lbPerHour * 8).toFixed(1)}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
