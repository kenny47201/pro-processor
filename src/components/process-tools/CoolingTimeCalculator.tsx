import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const THERMAL_DIFFUSIVITY: Record<string, number> = {
  'ABS': 0.00012,
  'PC': 0.00012,
  'PP': 0.00009,
  'PE-HD': 0.00011,
  'Nylon 66': 0.00012,
  'PET': 0.00010,
  'PS': 0.00009,
  'Acetal (POM)': 0.00010,
  'Custom': 0.00010,
};

export function CoolingTimeCalculator() {
  const [wallThickness, setWallThickness] = useState<string>('');
  const [meltTemp, setMeltTemp] = useState<string>('');
  const [moldTemp, setMoldTemp] = useState<string>('');
  const [ejectTemp, setEjectTemp] = useState<string>('');
  const [material, setMaterial] = useState<string>('');
  const [customDiffusivity, setCustomDiffusivity] = useState<string>('');
  const [result, setResult] = useState<{ coolingTime: number; minCoolingTime: number; recommendation: string } | null>(null);

  const handleCalculate = () => {
    const h = parseFloat(wallThickness); // mm
    const Tm = parseFloat(meltTemp);
    const Tw = parseFloat(moldTemp);
    const Te = parseFloat(ejectTemp);
    const alpha = material === 'Custom' ? parseFloat(customDiffusivity) : THERMAL_DIFFUSIVITY[material];

    if (isNaN(h) || isNaN(Tm) || isNaN(Tw) || isNaN(Te) || !alpha) return;
    if (Te <= Tw || Tm <= Te) return;

    // Cooling time formula: t = (h²) / (π² × α) × ln(4/π × (Tm - Tw)/(Te - Tw))
    // h in cm for calculation
    const hCm = h / 10;
    const coolingTime = (hCm * hCm) / (Math.PI * Math.PI * alpha) * Math.log((4 / Math.PI) * (Tm - Tw) / (Te - Tw));
    const minCoolingTime = coolingTime * 0.85;

    let recommendation = '';
    if (coolingTime < 5) recommendation = 'Very short cooling — verify part stability and ejection quality.';
    else if (coolingTime < 15) recommendation = 'Normal range for thin-wall parts.';
    else if (coolingTime < 30) recommendation = 'Moderate cooling — standard for most parts.';
    else recommendation = 'Extended cooling — consider conformal cooling channels or material change.';

    setResult({ coolingTime, minCoolingTime, recommendation });
  };

  const handleReset = () => {
    setWallThickness('');
    setMeltTemp('');
    setMoldTemp('');
    setEjectTemp('');
    setMaterial('');
    setCustomDiffusivity('');
    setResult(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Cooling Time Estimator
        </CardTitle>
        <CardDescription>
          t = (h² / π²α) × ln(4/π × (T<sub>m</sub> - T<sub>w</sub>) / (T<sub>e</sub> - T<sub>w</sub>))
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Material</Label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger><SelectValue placeholder="Select material..." /></SelectTrigger>
              <SelectContent>
                {Object.keys(THERMAL_DIFFUSIVITY).map(m => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {material === 'Custom' && (
            <div className="space-y-2">
              <Label>Thermal Diffusivity (cm²/s)</Label>
              <Input type="number" step="0.00001" placeholder="e.g., 0.00010" value={customDiffusivity} onChange={(e) => setCustomDiffusivity(e.target.value)} />
            </div>
          )}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Max Wall Thickness (mm)
              <Tooltip><TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger>
                <TooltipContent>Thickest wall section of the part</TooltipContent>
              </Tooltip>
            </Label>
            <Input type="number" step="0.1" placeholder="e.g., 3.0" value={wallThickness} onChange={(e) => setWallThickness(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Melt Temperature (°F)</Label>
            <Input type="number" placeholder="e.g., 500" value={meltTemp} onChange={(e) => setMeltTemp(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Mold Temperature (°F)</Label>
            <Input type="number" placeholder="e.g., 120" value={moldTemp} onChange={(e) => setMoldTemp(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Ejection Temperature (°F)</Label>
            <Input type="number" placeholder="e.g., 200" value={ejectTemp} onChange={(e) => setEjectTemp(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            <Calculator className="h-4 w-4 mr-2" /> Calculate
          </Button>
          <Button variant="outline" onClick={handleReset}>Reset</Button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Cooling Time</p>
                <p className="text-2xl font-bold text-primary">{result.coolingTime.toFixed(1)} sec</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Minimum Cooling Time</p>
                <p className="text-2xl font-bold text-primary">{result.minCoolingTime.toFixed(1)} sec</p>
                <Badge variant="secondary" className="mt-1 text-xs">85% factor</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">{result.recommendation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
