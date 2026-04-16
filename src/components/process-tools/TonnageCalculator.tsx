import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateClampTonnage } from '@/lib/processCalculations';
import { TYPICAL_CAVITY_PRESSURES, STANDARD_TONNAGES } from '@/types/processTools';
import { useExport } from './ExportButton';

export function TonnageCalculator() {
  const { ref: cardRef, ExportBtn } = useExport('Clamp Tonnage Calculator');
  const [projectedArea, setProjectedArea] = useState<string>('');
  const [cavityPressure, setCavityPressure] = useState<string>('');
  const [safetyFactor, setSafetyFactor] = useState<string>('1.1');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [result, setResult] = useState<{ requiredTonnage: number; recommendedMachine: number } | null>(null);

  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material);
    if (material && TYPICAL_CAVITY_PRESSURES[material]) {
      setCavityPressure(TYPICAL_CAVITY_PRESSURES[material].typical.toString());
    }
  };

  const handleCalculate = () => {
    const area = parseFloat(projectedArea);
    const pressure = parseFloat(cavityPressure);
    const safety = parseFloat(safetyFactor);

    if (isNaN(area) || isNaN(pressure) || isNaN(safety)) {
      return;
    }

    const calcResult = calculateClampTonnage(area, pressure, safety);
    setResult(calcResult);
  };

  const handleReset = () => {
    setProjectedArea('');
    setCavityPressure('');
    setSafetyFactor('1.1');
    setSelectedMaterial('');
    setResult(null);
  };

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Clamp Tonnage Calculator
          </CardTitle>
          <ExportBtn />
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
                <TooltipContent>
                  Select material to auto-fill typical cavity pressure
                </TooltipContent>
              </Tooltip>
            </Label>
            <Select value={selectedMaterial} onValueChange={handleMaterialChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select material..." />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(TYPICAL_CAVITY_PRESSURES).map((mat) => (
                  <SelectItem key={mat} value={mat}>
                    {mat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectedArea" className="flex items-center gap-1">
              Projected Area (in²)
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
              placeholder="e.g., 25.5"
              value={projectedArea}
              onChange={(e) => setProjectedArea(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cavityPressure" className="flex items-center gap-1">
              Cavity Pressure (psi)
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  {selectedMaterial && TYPICAL_CAVITY_PRESSURES[selectedMaterial] ? (
                    <span>
                      {selectedMaterial} typical range: {TYPICAL_CAVITY_PRESSURES[selectedMaterial].min.toLocaleString()} - {TYPICAL_CAVITY_PRESSURES[selectedMaterial].max.toLocaleString()} psi
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
              step="100"
              placeholder="e.g., 10000"
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
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Required Tonnage</p>
                <p className="text-2xl font-bold text-primary">
                  {result.requiredTonnage.toFixed(1)} tons
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recommended Machine</p>
                <p className="text-2xl font-bold text-primary">
                  {result.recommendedMachine} ton
                </p>
                <Badge variant="secondary" className="mt-1">
                  {((result.requiredTonnage / result.recommendedMachine) * 100).toFixed(0)}% utilization
                </Badge>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Available Machine Sizes Near Your Requirement:</p>
              <div className="flex flex-wrap gap-2">
                {STANDARD_TONNAGES
                  .filter(t => t >= result.requiredTonnage * 0.8 && t <= result.requiredTonnage * 1.5)
                  .map((t) => (
                    <Badge 
                      key={t} 
                      variant={t === result.recommendedMachine ? 'default' : 'outline'}
                      className={t < result.requiredTonnage ? 'opacity-50' : ''}
                    >
                      {t}T {t < result.requiredTonnage && '⚠️'}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
