import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateGateShearRate } from '@/lib/processCalculations';
import { useExport } from './ExportButton';

export function ShearRateCalculator() {
  const { ref: cardRef, ExportBtn } = useExport('Gate Shear Rate Calculator');
  const [flowRate, setFlowRate] = useState<string>('');
  const [gateType, setGateType] = useState<'circular' | 'rectangular'>('circular');
  const [gateDiameter, setGateDiameter] = useState<string>('');
  const [gateWidth, setGateWidth] = useState<string>('');
  const [gateHeight, setGateHeight] = useState<string>('');
  const [fillTime, setFillTime] = useState<string>('');
  const [shotVolume, setShotVolume] = useState<string>('');
  const [result, setResult] = useState<{ shearRate: number; recommendation: string } | null>(null);

  const calculateFlowRateFromFill = () => {
    const vol = parseFloat(shotVolume);
    const time = parseFloat(fillTime);
    if (!isNaN(vol) && !isNaN(time) && time > 0) {
      return vol / time;
    }
    return parseFloat(flowRate) || 0;
  };

  const handleCalculate = () => {
    const volumetricFlowRate = calculateFlowRateFromFill();
    
    if (volumetricFlowRate <= 0) return;

    const calcResult = calculateGateShearRate(
      volumetricFlowRate,
      gateType,
      parseFloat(gateDiameter),
      parseFloat(gateWidth),
      parseFloat(gateHeight)
    );
    setResult(calcResult);
  };

  const handleReset = () => {
    setFlowRate('');
    setGateType('circular');
    setGateDiameter('');
    setGateWidth('');
    setGateHeight('');
    setFillTime('');
    setShotVolume('');
    setResult(null);
  };

  const getShearRateStatus = (rate: number) => {
    if (rate < 10000) return { variant: 'secondary' as const, color: 'text-blue-600' };
    if (rate < 50000) return { variant: 'default' as const, color: 'text-green-600' };
    if (rate < 100000) return { variant: 'outline' as const, color: 'text-orange-600' };
    return { variant: 'destructive' as const, color: 'text-red-600' };
  };

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Gate Shear Rate Calculator
          </CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          γ = (4 × Q) / (π × r³) for circular gates — approximate shear rate through the gate
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Gate Type</Label>
            <Select value={gateType} onValueChange={(v: 'circular' | 'rectangular') => setGateType(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="circular">Circular (Pin/Tunnel)</SelectItem>
                <SelectItem value="rectangular">Rectangular (Edge/Tab)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {gateType === 'circular' ? (
            <div className="space-y-2">
              <Label htmlFor="gateDiameter">Gate Diameter (mm)</Label>
              <Input
                id="gateDiameter"
                type="number"
                step="0.01"
                placeholder="e.g., 1.5"
                value={gateDiameter}
                onChange={(e) => setGateDiameter(e.target.value)}
              />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="gateWidth">Gate Width (mm)</Label>
                <Input
                  id="gateWidth"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 3.0"
                  value={gateWidth}
                  onChange={(e) => setGateWidth(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gateHeight">Gate Height (mm)</Label>
                <Input
                  id="gateHeight"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 1.0"
                  value={gateHeight}
                  onChange={(e) => setGateHeight(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <div className="border rounded-lg p-3 bg-muted/30">
          <Label className="text-sm font-medium mb-2 block">Flow Rate Input (choose one method)</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="flowRate" className="text-xs flex items-center gap-1">
                Direct: Flow Rate (cm³/s)
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Enter volumetric flow rate directly if known
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="flowRate"
                type="number"
                step="0.1"
                placeholder="e.g., 50"
                value={flowRate}
                onChange={(e) => setFlowRate(e.target.value)}
                disabled={!!shotVolume && !!fillTime}
              />
            </div>
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              — OR —
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="shotVolume" className="text-xs">Shot Vol (cm³)</Label>
                  <Input
                    id="shotVolume"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 25"
                    value={shotVolume}
                    onChange={(e) => setShotVolume(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="fillTime" className="text-xs">Fill Time (s)</Label>
                  <Input
                    id="fillTime"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 0.5"
                    value={fillTime}
                    onChange={(e) => setFillTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
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

        {result && result.shearRate > 0 && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Shear Rate</p>
                <p className={`text-3xl font-bold ${getShearRateStatus(result.shearRate).color}`}>
                  {result.shearRate.toLocaleString(undefined, { maximumFractionDigits: 0 })} s⁻¹
                </p>
              </div>
              <Badge variant={getShearRateStatus(result.shearRate).variant} className="text-xs">
                {result.shearRate < 10000 ? 'Low' : result.shearRate < 50000 ? 'Optimal' : result.shearRate < 100000 ? 'High' : 'Excessive'}
              </Badge>
            </div>

            <p className="text-sm">{result.recommendation}</p>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Typical Shear Rate Guidelines:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• &lt; 10,000 s⁻¹: Low — risk of hesitation marks, poor fill</li>
                <li>• 10,000 - 50,000 s⁻¹: Optimal — good balance for most materials</li>
                <li>• 50,000 - 100,000 s⁻¹: High — monitor for gate blush</li>
                <li>• &gt; 100,000 s⁻¹: Excessive — risk of degradation, splay</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
