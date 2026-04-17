import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator } from 'lucide-react';
import { useExport } from './ExportButton';

export function CostPerPartCalculator() {
  const { ref: cardRef, ExportBtn } = useExport('Cost Per Part Calculator');
  const [materialCostPerLb, setMaterialCostPerLb] = useState<string>('');
  const [partWeightGrams, setPartWeightGrams] = useState<string>('');
  const [runnerWeightGrams, setRunnerWeightGrams] = useState<string>('');
  const [cavities, setCavities] = useState<string>('1');
  const [cycleTime, setCycleTime] = useState<string>('');
  const [machineRate, setMachineRate] = useState<string>('');
  const [scrapRate, setScrapRate] = useState<string>('2');
  const [regrindPercent, setRegrindPercent] = useState<string>('0');
  const [laborRate, setLaborRate] = useState<string>('0');
  const [result, setResult] = useState<{
    materialCost: number; machineCost: number; laborCost: number; totalCost: number;
    partsPerHour: number; costPer1000: number; runnerCost: number;
  } | null>(null);

  const handleCalculate = () => {
    const matCost = parseFloat(materialCostPerLb);
    const partWt = parseFloat(partWeightGrams);
    const runnerWt = parseFloat(runnerWeightGrams) || 0;
    const cav = parseInt(cavities) || 1;
    const cycle = parseFloat(cycleTime);
    const machRate = parseFloat(machineRate) || 0;
    const scrap = parseFloat(scrapRate) || 0;
    const regrind = parseFloat(regrindPercent) || 0;
    const labor = parseFloat(laborRate) || 0;

    if (isNaN(matCost) || isNaN(partWt) || isNaN(cycle)) return;

    const partWtLb = partWt / 453.592;
    const runnerWtLb = runnerWt / 453.592;
    const runnerPerPart = runnerWtLb / cav;
    const regrindSavings = runnerPerPart * (regrind / 100);
    const materialCostPerPart = (partWtLb + runnerPerPart - regrindSavings) * matCost * (1 + scrap / 100);
    const runnerCost = (runnerPerPart - regrindSavings) * matCost;

    const shotsPerHour = 3600 / cycle;
    const partsPerHour = shotsPerHour * cav;
    const machineCostPerPart = machRate > 0 ? machRate / partsPerHour : 0;
    const laborCostPerPart = labor > 0 ? labor / partsPerHour : 0;

    const totalCost = materialCostPerPart + machineCostPerPart + laborCostPerPart;

    setResult({
      materialCost: materialCostPerPart,
      machineCost: machineCostPerPart,
      laborCost: laborCostPerPart,
      totalCost,
      partsPerHour,
      costPer1000: totalCost * 1000,
      runnerCost,
    });
  };

  const handleReset = () => {
    setMaterialCostPerLb(''); setPartWeightGrams(''); setRunnerWeightGrams('');
    setCavities('1'); setCycleTime(''); setMachineRate('');
    setScrapRate('2'); setRegrindPercent('0'); setLaborRate('0');
    setResult(null);
  };

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Cost Per Part Calculator
          </CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          Material + machine + labor cost breakdown per part
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Material Cost ($/lb)</Label>
            <Input type="number" step="0.01" placeholder="e.g., 1.25" value={materialCostPerLb} onChange={(e) => setMaterialCostPerLb(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Part Weight (grams)</Label>
            <Input type="number" step="0.1" placeholder="e.g., 35.0" value={partWeightGrams} onChange={(e) => setPartWeightGrams(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Runner Weight (grams)</Label>
            <Input type="number" step="0.1" placeholder="e.g., 12.0" value={runnerWeightGrams} onChange={(e) => setRunnerWeightGrams(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label># Cavities</Label>
            <Input type="number" min="1" placeholder="e.g., 4" value={cavities} onChange={(e) => setCavities(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Cycle Time (seconds)</Label>
            <Input type="number" step="0.1" placeholder="e.g., 30" value={cycleTime} onChange={(e) => setCycleTime(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Machine Rate ($/hr)</Label>
            <Input type="number" step="1" placeholder="e.g., 85" value={machineRate} onChange={(e) => setMachineRate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Scrap Rate (%)</Label>
            <Input type="number" step="0.5" placeholder="e.g., 2" value={scrapRate} onChange={(e) => setScrapRate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Regrind Usage (%)</Label>
            <Input type="number" step="5" placeholder="e.g., 25" value={regrindPercent} onChange={(e) => setRegrindPercent(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Labor Rate ($/hr, 0 if unmanned)</Label>
            <Input type="number" step="1" placeholder="e.g., 25" value={laborRate} onChange={(e) => setLaborRate(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            <Calculator className="h-4 w-4 mr-2" /> Calculate
          </Button>
          <Button variant="outline" onClick={handleReset}>Reset</Button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Cost/Part</p>
                <p className="text-2xl font-bold text-primary">${result.totalCost.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cost per 1,000</p>
                <p className="text-2xl font-bold text-primary">${result.costPer1000.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Parts/Hour</p>
                <p className="text-2xl font-bold text-primary">{result.partsPerHour.toFixed(0)}</p>
              </div>
            </div>

            <div className="pt-3 border-t">
              <p className="text-sm text-muted-foreground mb-2">Cost Breakdown</p>
              <div className="space-y-2">
                {[
                  { label: 'Material', value: result.materialCost, color: 'bg-blue-500' },
                  { label: 'Machine', value: result.machineCost, color: 'bg-green-500' },
                  { label: 'Labor', value: result.laborCost, color: 'bg-orange-500' },
                ].map(item => {
                  const pct = (item.value / result.totalCost) * 100;
                  return (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className="text-xs w-16">{item.label}</span>
                      <div className="flex-1 bg-muted rounded h-4 overflow-hidden">
                        <div className={`h-full rounded ${item.color}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs w-20 text-right">${item.value.toFixed(4)} ({pct.toFixed(0)}%)</span>
                    </div>
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
