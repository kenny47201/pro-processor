import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator } from 'lucide-react';

export function EnergyCostCalculator() {
  const [machineKw, setMachineKw] = useState<string>('');
  const [utilizationPct, setUtilizationPct] = useState<string>('70');
  const [electricRate, setElectricRate] = useState<string>('0.10');
  const [hoursPerDay, setHoursPerDay] = useState<string>('24');
  const [daysPerYear, setDaysPerYear] = useState<string>('250');
  const [auxKw, setAuxKw] = useState<string>('0');
  const [partsPerHour, setPartsPerHour] = useState<string>('');
  const [result, setResult] = useState<{
    totalKw: number; kwhPerDay: number; costPerDay: number; costPerYear: number;
    costPerHour: number; energyPerPart: number; costPerPart: number;
  } | null>(null);

  const handleCalculate = () => {
    const kw = parseFloat(machineKw);
    const util = parseFloat(utilizationPct) / 100;
    const rate = parseFloat(electricRate);
    const hrs = parseFloat(hoursPerDay);
    const days = parseFloat(daysPerYear);
    const aux = parseFloat(auxKw) || 0;
    const pph = parseFloat(partsPerHour) || 0;

    if (isNaN(kw) || isNaN(rate)) return;

    const totalKw = (kw * util) + aux;
    const kwhPerDay = totalKw * hrs;
    const costPerDay = kwhPerDay * rate;
    const costPerYear = costPerDay * days;
    const costPerHour = totalKw * rate;
    const energyPerPart = pph > 0 ? totalKw / pph : 0;
    const costPerPart = pph > 0 ? costPerHour / pph : 0;

    setResult({ totalKw, kwhPerDay, costPerDay, costPerYear, costPerHour, energyPerPart, costPerPart });
  };

  const handleReset = () => {
    setMachineKw(''); setUtilizationPct('70'); setElectricRate('0.10');
    setHoursPerDay('24'); setDaysPerYear('250'); setAuxKw('0');
    setPartsPerHour(''); setResult(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Energy Cost Calculator
        </CardTitle>
        <CardDescription>
          Estimate electricity cost per part, per hour, and annually for a press + auxiliaries
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Machine Power (kW rated)</Label>
            <Input type="number" step="1" placeholder="e.g., 75" value={machineKw} onChange={(e) => setMachineKw(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Avg Utilization (%)</Label>
            <Input type="number" step="5" placeholder="e.g., 70" value={utilizationPct} onChange={(e) => setUtilizationPct(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Auxiliary Equipment (kW)</Label>
            <Input type="number" step="1" placeholder="e.g., 15" value={auxKw} onChange={(e) => setAuxKw(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Electricity Rate ($/kWh)</Label>
            <Input type="number" step="0.01" placeholder="e.g., 0.10" value={electricRate} onChange={(e) => setElectricRate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Hours/Day</Label>
            <Input type="number" step="1" placeholder="24" value={hoursPerDay} onChange={(e) => setHoursPerDay(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Days/Year</Label>
            <Input type="number" step="1" placeholder="250" value={daysPerYear} onChange={(e) => setDaysPerYear(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Parts/Hour (optional)</Label>
            <Input type="number" step="1" placeholder="e.g., 120" value={partsPerHour} onChange={(e) => setPartsPerHour(e.target.value)} />
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
                <p className="text-sm text-muted-foreground">Avg Power Draw</p>
                <p className="text-2xl font-bold text-primary">{result.totalKw.toFixed(1)} kW</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cost/Hour</p>
                <p className="text-2xl font-bold text-primary">${result.costPerHour.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cost/Day</p>
                <p className="text-2xl font-bold text-primary">${result.costPerDay.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cost/Year</p>
                <p className="text-xl font-bold">${result.costPerYear.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">kWh/Day</p>
                <p className="text-xl font-bold">{result.kwhPerDay.toFixed(0)}</p>
              </div>
              {result.costPerPart > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Energy Cost/Part</p>
                  <p className="text-xl font-bold">${result.costPerPart.toFixed(4)}</p>
                  <Badge variant="secondary" className="mt-1 text-xs">{result.energyPerPart.toFixed(3)} kWh/part</Badge>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
