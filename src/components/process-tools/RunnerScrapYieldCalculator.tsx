import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateRunnerScrapYield } from '@/lib/processCalculations';

export function RunnerScrapYieldCalculator() {
  const [partWeight, setPartWeight] = useState<string>('');
  const [runnerWeight, setRunnerWeight] = useState<string>('');
  const [cavities, setCavities] = useState<string>('1');
  const [cycleTime, setCycleTime] = useState<string>('');
  const [materialCost, setMaterialCost] = useState<string>('');
  const [result, setResult] = useState<ReturnType<typeof calculateRunnerScrapYield> & { 
    costPerHour?: number; 
    costPerShift?: number 
  } | null>(null);

  const handleCalculate = () => {
    const pWeight = parseFloat(partWeight);
    const rWeight = parseFloat(runnerWeight);
    const cav = parseInt(cavities) || 1;
    const cycle = parseFloat(cycleTime);

    if (isNaN(pWeight) || isNaN(rWeight) || isNaN(cycle) || cycle <= 0) return;

    const shotsPerHour = 3600 / cycle;
    const calcResult = calculateRunnerScrapYield(pWeight, rWeight, cav, shotsPerHour);

    const matCost = parseFloat(materialCost);
    let costPerHour: number | undefined;
    let costPerShift: number | undefined;

    if (!isNaN(matCost) && matCost > 0) {
      costPerHour = calcResult.runnerScrapLbPerHour * matCost;
      costPerShift = costPerHour * 8;
    }

    setResult({ ...calcResult, costPerHour, costPerShift });
  };

  const handleReset = () => {
    setPartWeight('');
    setRunnerWeight('');
    setCavities('1');
    setCycleTime('');
    setMaterialCost('');
    setResult(null);
  };

  const getScrapStatus = (percent: number) => {
    if (percent <= 5) return { label: 'Excellent', variant: 'default' as const };
    if (percent <= 15) return { label: 'Good', variant: 'secondary' as const };
    if (percent <= 30) return { label: 'High', variant: 'outline' as const };
    return { label: 'Excessive', variant: 'destructive' as const };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Runner Scrap & Yield Calculator
        </CardTitle>
        <CardDescription>
          Calculate runner scrap percentage, yield rate, and material costs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="partWeight" className="flex items-center gap-1">
              Part Weight (g)
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  Weight of a single part (not shot weight)
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="partWeight"
              type="number"
              step="0.01"
              placeholder="e.g., 12.5"
              value={partWeight}
              onChange={(e) => setPartWeight(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="runnerWeight">Runner Weight (g)</Label>
            <Input
              id="runnerWeight"
              type="number"
              step="0.01"
              placeholder="e.g., 8.2"
              value={runnerWeight}
              onChange={(e) => setRunnerWeight(e.target.value)}
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

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="materialCost" className="flex items-center gap-1">
              Material Cost ($/lb) — Optional
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  Enter to calculate scrap cost per hour/shift
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="materialCost"
              type="number"
              step="0.01"
              placeholder="e.g., 1.85"
              value={materialCost}
              onChange={(e) => setMaterialCost(e.target.value)}
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
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Analysis Results</h4>
              <Badge variant={getScrapStatus(result.runnerScrapPercent).variant}>
                {getScrapStatus(result.runnerScrapPercent).label} Scrap Rate
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Yield %</p>
                <p className="text-2xl font-bold text-green-600">
                  {result.yieldPercent.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scrap %</p>
                <p className="text-2xl font-bold text-orange-600">
                  {result.runnerScrapPercent.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scrap Lb/Hr</p>
                <p className="text-xl font-bold">
                  {result.runnerScrapLbPerHour.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Part Output Lb/Hr</p>
                <p className="text-xl font-bold">
                  {result.partOutputLbPerHour.toFixed(2)}
                </p>
              </div>
            </div>

            {result.costPerHour !== undefined && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2 text-warning">Scrap Cost Impact</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Cost per Hour</p>
                    <p className="text-xl font-bold text-warning">
                      ${result.costPerHour.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cost per 8hr Shift</p>
                    <p className="text-xl font-bold text-warning">
                      ${result.costPerShift?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Optimization Tips:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Consider hot runner if scrap &gt; 15% and volume justifies investment</li>
                <li>• Regrind at controlled ratios (typically 20-30% max) to reduce virgin use</li>
                <li>• Optimize runner design to minimize cold runner volume</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
