import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateClampTonnage } from '@/lib/processCalculations';
import { TYPICAL_CAVITY_PRESSURES, STANDARD_TONNAGES } from '@/types/processTools';
import { useExport } from './ExportButton';

type Units = 'imperial' | 'metric';

// Conversion constants
const CM2_PER_IN2 = 6.4516;
const PSI_PER_BAR = 14.5038;
const METRIC_TONS_PER_US_TON = 0.907185;

export function TonnageCalculator() {
  const { ref: cardRef, ExportBtn } = useExport('Clamp Tonnage Calculator');
  const [units, setUnits] = useState<Units>('imperial');
  const [projectedArea, setProjectedArea] = useState<string>('');
  const [cavityPressure, setCavityPressure] = useState<string>('');
  const [safetyFactor, setSafetyFactor] = useState<string>('1.1');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [result, setResult] = useState<{ requiredTonnage: number; recommendedMachine: number } | null>(null);

  const isMetric = units === 'metric';
  const areaUnit = isMetric ? 'cm²' : 'in²';
  const pressureUnit = isMetric ? 'bar' : 'psi';
  const tonUnit = isMetric ? 'metric tons' : 'US tons';

  const handleUnitsChange = (next: Units) => {
    if (!next || next === units) return;
    // Convert existing values so the user doesn't lose their input
    const area = parseFloat(projectedArea);
    const pressure = parseFloat(cavityPressure);
    if (next === 'metric') {
      if (!isNaN(area)) setProjectedArea((area * CM2_PER_IN2).toFixed(2));
      if (!isNaN(pressure)) setCavityPressure((pressure / PSI_PER_BAR).toFixed(1));
    } else {
      if (!isNaN(area)) setProjectedArea((area / CM2_PER_IN2).toFixed(2));
      if (!isNaN(pressure)) setCavityPressure((pressure * PSI_PER_BAR).toFixed(0));
    }
    setUnits(next);
    setResult(null);
  };

  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material);
    if (material && TYPICAL_CAVITY_PRESSURES[material]) {
      const psi = TYPICAL_CAVITY_PRESSURES[material].typical;
      setCavityPressure(isMetric ? (psi / PSI_PER_BAR).toFixed(1) : psi.toString());
    }
  };

  const handleCalculate = () => {
    const areaIn = parseFloat(projectedArea);
    const pressureIn = parseFloat(cavityPressure);
    const safety = parseFloat(safetyFactor);

    if (isNaN(areaIn) || isNaN(pressureIn) || isNaN(safety)) return;

    // Convert to imperial for the underlying calc
    const areaSqIn = isMetric ? areaIn / CM2_PER_IN2 : areaIn;
    const pressurePsi = isMetric ? pressureIn * PSI_PER_BAR : pressureIn;

    setResult(calculateClampTonnage(areaSqIn, pressurePsi, safety));
  };

  const handleReset = () => {
    setProjectedArea('');
    setCavityPressure('');
    setSafetyFactor('1.1');
    setSelectedMaterial('');
    setResult(null);
  };

  const displayTons = (usTons: number) => (isMetric ? usTons * METRIC_TONS_PER_US_TON : usTons);
  const matRange = selectedMaterial ? TYPICAL_CAVITY_PRESSURES[selectedMaterial] : null;

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle className="flex items-center gap-2">Clamp Tonnage Calculator</CardTitle>
          <div className="flex items-center gap-2">
            <ToggleGroup
              type="single"
              size="sm"
              value={units}
              onValueChange={(v) => handleUnitsChange(v as Units)}
            >
              <ToggleGroupItem value="imperial" aria-label="Imperial units">Imperial</ToggleGroupItem>
              <ToggleGroupItem value="metric" aria-label="Metric units">Metric</ToggleGroupItem>
            </ToggleGroup>
            <ExportBtn />
          </div>
        </div>
        <CardDescription>
          F<sub>required</sub> = Projected Area × Cavity Pressure × Safety Factor
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="material" className="flex items-center gap-1">
              Material (Optional)
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>Select material to auto-fill typical cavity pressure</TooltipContent>
              </Tooltip>
            </Label>
            <Select value={selectedMaterial} onValueChange={handleMaterialChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select material..." />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(TYPICAL_CAVITY_PRESSURES).map((mat) => (
                  <SelectItem key={mat} value={mat}>{mat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectedArea" className="flex items-center gap-1">
              Projected Area ({areaUnit})
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  Total projected area of all cavities + runners in parting line view
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="projectedArea"
              type="number"
              step="0.01"
              placeholder={isMetric ? 'e.g., 164.5' : 'e.g., 25.5'}
              value={projectedArea}
              onChange={(e) => setProjectedArea(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cavityPressure" className="flex items-center gap-1">
              Cavity Pressure ({pressureUnit})
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  {matRange ? (
                    <span>
                      {selectedMaterial} typical range:{' '}
                      {isMetric
                        ? `${(matRange.min / PSI_PER_BAR).toFixed(0)} - ${(matRange.max / PSI_PER_BAR).toFixed(0)} bar`
                        : `${matRange.min.toLocaleString()} - ${matRange.max.toLocaleString()} psi`}
                    </span>
                  ) : (
                    'Peak cavity pressure during fill/pack'
                  )}
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="cavityPressure"
              type="number"
              step={isMetric ? '1' : '100'}
              placeholder={isMetric ? 'e.g., 690' : 'e.g., 10000'}
              value={cavityPressure}
              onChange={(e) => setCavityPressure(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="safetyFactor" className="flex items-center gap-1">
              Safety Factor
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  Typical: 1.1 (10%) for standard parts, 1.2+ for large/critical parts
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="safetyFactor"
              type="number"
              step="0.05"
              placeholder="e.g., 1.1"
              value={safetyFactor}
              onChange={(e) => setSafetyFactor(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate
          </Button>
          <Button variant="outline" onClick={handleReset}>Reset</Button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Required Tonnage</p>
                <p className="text-2xl font-bold text-primary">
                  {displayTons(result.requiredTonnage).toFixed(1)} {tonUnit}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recommended Machine</p>
                <p className="text-2xl font-bold text-primary">
                  {displayTons(result.recommendedMachine).toFixed(0)} {tonUnit}
                </p>
                <Badge variant="secondary" className="mt-1">
                  {((result.requiredTonnage / result.recommendedMachine) * 100).toFixed(0)}% utilization
                </Badge>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">
                Available Machine Sizes Near Your Requirement:
              </p>
              <div className="flex flex-wrap gap-2">
                {STANDARD_TONNAGES.filter(
                  (t) => t >= result.requiredTonnage * 0.8 && t <= result.requiredTonnage * 1.5
                ).map((t) => (
                  <Badge
                    key={t}
                    variant={t === result.recommendedMachine ? 'default' : 'outline'}
                    className={t < result.requiredTonnage ? 'opacity-50' : ''}
                  >
                    {displayTons(t).toFixed(0)}
                    {isMetric ? ' t' : 'T'} {t < result.requiredTonnage && '⚠️'}
                  </Badge>
                ))}
              </div>
              {isMetric && (
                <p className="text-xs text-muted-foreground mt-2">
                  Machine sizes converted from standard US ton ratings.
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
