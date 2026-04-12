import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateChillerSizing } from '@/lib/processCalculations';

export function ChillerSizingCalculator() {
  const [shotWeight, setShotWeight] = useState<string>('');
  const [cycleTime, setCycleTime] = useState<string>('');
  const [meltTemp, setMeltTemp] = useState<string>('450');
  const [ejectTemp, setEjectTemp] = useState<string>('180');
  const [specificHeat, setSpecificHeat] = useState<string>('0.4');
  const [deltaT, setDeltaT] = useState<string>('10');
  const [result, setResult] = useState<ReturnType<typeof calculateChillerSizing> | null>(null);

  const handleCalculate = () => {
    const weight = parseFloat(shotWeight);
    const cycle = parseFloat(cycleTime);
    const melt = parseFloat(meltTemp);
    const eject = parseFloat(ejectTemp);
    const cp = parseFloat(specificHeat);
    const dt = parseFloat(deltaT);

    if (isNaN(weight) || isNaN(cycle) || isNaN(melt) || isNaN(eject)) return;

    const calcResult = calculateChillerSizing(weight, cycle, melt, eject, cp, dt);
    setResult(calcResult);
  };

  const handleReset = () => {
    setShotWeight('');
    setCycleTime('');
    setMeltTemp('450');
    setEjectTemp('180');
    setSpecificHeat('0.4');
    setDeltaT('10');
    setResult(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Chiller Sizing Calculator
        </CardTitle>
        <CardDescription>
          Tons = Q(BTU/hr) / 12,000 — GPM = Q / (500 × ΔT)
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
            <Label htmlFor="meltTemp">Melt Temperature (°F)</Label>
            <Input
              id="meltTemp"
              type="number"
              step="5"
              placeholder="e.g., 450"
              value={meltTemp}
              onChange={(e) => setMeltTemp(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ejectTemp">Eject Temperature (°F)</Label>
            <Input
              id="ejectTemp"
              type="number"
              step="5"
              placeholder="e.g., 180"
              value={ejectTemp}
              onChange={(e) => setEjectTemp(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specificHeat" className="flex items-center gap-1">
              Specific Heat (BTU/lb·°F)
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  Typical range for plastics: 0.3-0.5 BTU/lb·°F
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="specificHeat"
              type="number"
              step="0.05"
              placeholder="e.g., 0.4"
              value={specificHeat}
              onChange={(e) => setSpecificHeat(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deltaT" className="flex items-center gap-1">
              Allowable ΔT (°F)
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  Temperature rise across mold cooling circuit (typical 5-15°F)
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="deltaT"
              type="number"
              step="1"
              placeholder="e.g., 10"
              value={deltaT}
              onChange={(e) => setDeltaT(e.target.value)}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Heat Load</p>
                <p className="text-2xl font-bold text-primary">
                  {result.heatLoadBtuHr.toLocaleString(undefined, { maximumFractionDigits: 0 })} BTU/hr
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Chiller Capacity Required</p>
                <p className="text-2xl font-bold text-primary">
                  {result.tonsRequired.toFixed(2)} tons
                </p>
                <Badge variant="secondary" className="mt-1">
                  Recommend {Math.ceil(result.tonsRequired * 1.2)} ton unit
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Flow Rate Required</p>
                <p className="text-2xl font-bold text-primary">
                  {result.gpmRequired.toFixed(1)} GPM
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Notes:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Add 20% safety margin for recommended chiller size</li>
                <li>• Consider additional loads: hot runner, material dryer, etc.</li>
                <li>• Verify pump capacity meets GPM requirement at mold pressure drop</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
