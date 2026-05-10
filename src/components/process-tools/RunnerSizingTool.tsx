import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ruler } from 'lucide-react';
import { useExport } from './ExportButton';

interface SizingResult {
  recommendedDiameter: number;
  crossSection: number;
  fillVelocity: number;
  shearRate: number;
  pressureDrop: number;
  rating: string;
  ratingColor: string;
}

// Common material runner sizing guidelines (diameter in mm for wall thickness)
const MATERIAL_PRESETS: Record<string, { name: string; minDia: number; maxDia: number; viscosity: number }> = {
  pp: { name: 'PP', minDia: 3.0, maxDia: 10.0, viscosity: 150 },
  pe: { name: 'PE (HDPE/LDPE)', minDia: 3.0, maxDia: 10.0, viscosity: 120 },
  abs: { name: 'ABS', minDia: 4.0, maxDia: 12.0, viscosity: 250 },
  pc: { name: 'Polycarbonate', minDia: 5.0, maxDia: 12.0, viscosity: 350 },
  pa: { name: 'Nylon (PA)', minDia: 3.0, maxDia: 10.0, viscosity: 180 },
  pom: { name: 'Acetal (POM)', minDia: 3.0, maxDia: 10.0, viscosity: 200 },
  pbt: { name: 'PBT', minDia: 4.0, maxDia: 10.0, viscosity: 220 },
  ps: { name: 'Polystyrene', minDia: 3.0, maxDia: 10.0, viscosity: 130 },
  tpe: { name: 'TPE / TPU', minDia: 4.0, maxDia: 12.0, viscosity: 300 },
  custom: { name: 'Custom', minDia: 3.0, maxDia: 15.0, viscosity: 200 },
};

export function RunnerSizingTool() {
  const { ref: cardRef, ExportBtn } = useExport('Runner Sizing Tool');
  const [material, setMaterial] = useState('abs');
  const [partWeight, setPartWeight] = useState('25'); // grams
  const [wallThickness, setWallThickness] = useState('2.5'); // mm
  const [cavities, setCavities] = useState('4');
  const [runnerLength, setRunnerLength] = useState('120'); // mm
  const [flowRate, setFlowRate] = useState('15'); // cc/s
  const [result, setResult] = useState<SizingResult | null>(null);

  const handleCalculate = () => {
    const wt = parseFloat(wallThickness);
    const pw = parseFloat(partWeight);
    const cav = parseInt(cavities);
    const rl = parseFloat(runnerLength);
    const Q = parseFloat(flowRate);
    const preset = MATERIAL_PRESETS[material];
    if (!wt || !pw || !cav || !rl || !Q) return;

    // Rule of thumb: runner diameter ≈ wall thickness × 1.5 to 2.0, minimum material spec
    const ruleOfThumb = Math.max(wt * 1.6, preset.minDia);

    // Volume-based sizing: ensure runner can deliver enough material
    // Total shot volume estimation (density ~1.1 g/cc average)
    const totalShotVolCc = (pw * cav) / 1.1;
    const fillTimeS = totalShotVolCc / Q;

    // Runner volume per length for candidate diameter
    const candidateDia = Math.max(ruleOfThumb, Math.ceil(ruleOfThumb * 2) / 2); // round to 0.5mm
    const R = (candidateDia / 2) / 1000; // meters
    const L = rl / 1000;
    const Q_m3s = Q / 1e6;

    const crossSection = Math.PI * Math.pow(candidateDia / 2, 2); // mm²
    const velocity_ms = Q_m3s / (Math.PI * R * R);
    const velocity_ins = velocity_ms * 39.3701;

    // Shear rate at wall
    const shearRate = (32 * Q_m3s) / (Math.PI * Math.pow(candidateDia / 1000, 3));

    // Pressure drop
    const mu = preset.viscosity;
    const dP_Pa = (128 * mu * L * Q_m3s) / (Math.PI * Math.pow(candidateDia / 1000, 4));
    const dP_psi = dP_Pa * 0.000145038;

    // Rating
    let rating: string;
    let ratingColor: string;
    if (candidateDia < preset.minDia) {
      rating = 'Too Small — increase diameter';
      ratingColor = 'text-destructive';
    } else if (candidateDia > preset.maxDia) {
      rating = 'Oversized — may cause long cooling';
      ratingColor = 'text-yellow-600';
    } else if (shearRate > 80000) {
      rating = 'High shear — consider larger diameter';
      ratingColor = 'text-yellow-600';
    } else {
      rating = 'Good — within recommended range';
      ratingColor = 'text-green-600';
    }

    setResult({
      recommendedDiameter: candidateDia,
      crossSection,
      fillVelocity: velocity_ins,
      shearRate,
      pressureDrop: dP_psi,
      rating,
      ratingColor,
    });
  };

  return (
    <Card ref={cardRef} className="border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Runner Sizing Tool
            </CardTitle>
            <CardDescription>
              Recommend runner diameter based on material, part, and flow requirements
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <ExportBtn />
            <Badge variant="outline" className="text-xs">Optimization</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm">Material</Label>
          <Select value={material} onValueChange={setMaterial}>
            <SelectTrigger className="h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(MATERIAL_PRESETS).map(([key, val]) => (
                <SelectItem key={key} value={key}>{val.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-sm">Part Weight (g)</Label>
            <Input type="number" value={partWeight} onChange={e => setPartWeight(e.target.value)} className="h-8 text-sm" />
          </div>
          <div>
            <Label className="text-sm">Wall Thickness (mm)</Label>
            <Input type="number" value={wallThickness} onChange={e => setWallThickness(e.target.value)} className="h-8 text-sm" />
          </div>
          <div>
            <Label className="text-sm">Cavities</Label>
            <Input type="number" value={cavities} onChange={e => setCavities(e.target.value)} className="h-8 text-sm" />
          </div>
          <div>
            <Label className="text-sm">Runner Length (mm)</Label>
            <Input type="number" value={runnerLength} onChange={e => setRunnerLength(e.target.value)} className="h-8 text-sm" />
          </div>
        </div>

        <div>
          <Label className="text-sm">Volumetric Flow Rate (cc/s)</Label>
          <Input type="number" value={flowRate} onChange={e => setFlowRate(e.target.value)} className="h-8 text-sm" />
        </div>

        <Button onClick={handleCalculate} className="w-full h-8 text-sm">Calculate Runner Size</Button>

        {result && (
          <div className="space-y-3 pt-2 border-t border-border/50">
            <div className="text-center bg-primary/10 rounded px-3 py-3">
              <p className="text-xs text-muted-foreground">Recommended Runner Diameter</p>
              <p className="text-2xl font-bold text-primary">{result.recommendedDiameter.toFixed(1)} mm</p>
              <p className={`text-xs font-medium mt-1 ${result.ratingColor}`}>{result.rating}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-muted/30 rounded px-2 py-1.5">
                <span className="text-muted-foreground">Cross Section</span>
                <p className="font-semibold">{result.crossSection.toFixed(1)} mm²</p>
              </div>
              <div className="bg-muted/30 rounded px-2 py-1.5">
                <span className="text-muted-foreground">Fill Velocity</span>
                <p className="font-semibold">{result.fillVelocity.toFixed(1)} in/s</p>
              </div>
              <div className="bg-muted/30 rounded px-2 py-1.5">
                <span className="text-muted-foreground">Wall Shear Rate</span>
                <p className="font-semibold">{result.shearRate.toFixed(0)} s⁻¹</p>
              </div>
              <div className="bg-muted/30 rounded px-2 py-1.5">
                <span className="text-muted-foreground">Pressure Drop</span>
                <p className="font-semibold">{result.pressureDrop.toFixed(0)} psi</p>
              </div>
            </div>

            <div className="text-[10px] text-muted-foreground bg-muted/20 rounded p-2">
              <strong>Guidelines:</strong> Runner Ø should be 1.5–2× wall thickness. Full-round runners are preferred. 
              Keep shear rate below 50,000 s⁻¹ for most materials. Verify with short-shot studies.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
