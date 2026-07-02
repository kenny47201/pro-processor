import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateDryerSizing } from '@/lib/processCalculations';
import { DRYING_PARAMETERS } from '@/types/processTools';
import { useExport } from './ExportButton';

export function DryerSizingCalculator() {
  const { ref: cardRef, ExportBtn } = useExport('Dryer Sizing Calculator');
  const [throughput, setThroughput] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [residenceTime, setResidenceTime] = useState<string>('');
  const [bulkDensity, setBulkDensity] = useState<string>('35');
  const [safetyFactor, setSafetyFactor] = useState<string>('1.25');
  const [result, setResult] = useState<ReturnType<typeof calculateDryerSizing> | null>(null);

  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material);
    if (material && DRYING_PARAMETERS[material]) {
      setResidenceTime(DRYING_PARAMETERS[material].time.toString());
    }
  };

  const handleCalculate = () => {
    const thru = parseFloat(throughput);
    const time = parseFloat(residenceTime);
    const density = parseFloat(bulkDensity) || 35;
    const safety = parseFloat(safetyFactor) || 1.25;

    if (isNaN(thru) || isNaN(time)) return;

    const calcResult = calculateDryerSizing(thru, time, density, safety);
    setResult(calcResult);
  };

  const handleReset = () => {
    setThroughput('');
    setSelectedMaterial('');
    setResidenceTime('');
    setBulkDensity('35');
    setSafetyFactor('1.25');
    setResult(null);
  };

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Dryer Sizing Calculator
          </CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          Hopper Volume = (Throughput × Residence Time) / Bulk Density
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Material</Label>
            <Select value={selectedMaterial} onValueChange={handleMaterialChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select material..." />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(DRYING_PARAMETERS).map((mat) => (
                  <SelectItem key={mat} value={mat}>
                    {mat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="throughput">Material Throughput (lb/hr)</Label>
            <Input
              id="throughput"
              type="number"
              step="0.1"
              placeholder="e.g., 25.5"
              value={throughput}
              onChange={(e) => setThroughput(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="residenceTime" className="flex items-center gap-1">
              Required Residence Time (hours)
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  {selectedMaterial && DRYING_PARAMETERS[selectedMaterial] ? (
                    <span>
                      {selectedMaterial}: {DRYING_PARAMETERS[selectedMaterial].time}hr @ {DRYING_PARAMETERS[selectedMaterial].temp}°F, dewpoint {DRYING_PARAMETERS[selectedMaterial].dewPoint}°F
                    </span>
                  ) : (
                    'Time material must spend in hopper to achieve proper moisture level'
                  )}
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="residenceTime"
              type="number"
              step="0.5"
              placeholder="e.g., 4"
              value={residenceTime}
              onChange={(e) => setResidenceTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bulkDensity" className="flex items-center gap-1">
              Bulk Density (lb/ft³)
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  Typical pellet bulk density: 30-40 lb/ft³
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="bulkDensity"
              type="number"
              step="1"
              placeholder="e.g., 35"
              value={bulkDensity}
              onChange={(e) => setBulkDensity(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="safetyFactor">Safety Factor</Label>
            <Input
              id="safetyFactor"
              type="number"
              step="0.05"
              placeholder="e.g., 1.25"
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
                <p className="text-sm text-muted-foreground">Required Hopper Volume</p>
                <p className="text-2xl font-bold text-primary">
                  {result.requiredHopperVolumeCuFt.toFixed(1)} ft³
                </p>
                <p className="text-xs text-muted-foreground">
                  ({(result.requiredHopperVolumeCuFt * 7.48).toFixed(0)} gallons)
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recommended Dryer Capacity</p>
                <p className="text-2xl font-bold text-primary">
                  {result.recommendedDryerCapacityLbHr.toFixed(1)} lb/hr
                </p>
              </div>
            </div>

            {selectedMaterial && DRYING_PARAMETERS[selectedMaterial] && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Drying Parameters for {selectedMaterial}</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    Temp: {DRYING_PARAMETERS[selectedMaterial].temp}°F
                  </Badge>
                  <Badge variant="secondary">
                    Time: {DRYING_PARAMETERS[selectedMaterial].time} hr
                  </Badge>
                  <Badge variant="secondary">
                    Dew Point: {DRYING_PARAMETERS[selectedMaterial].dewPoint}°F
                  </Badge>
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t rounded-md border border-primary/30 bg-primary/5 p-3 space-y-1.5">
              <p className="text-xs font-semibold text-primary uppercase tracking-wide">Send to Material Handling</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                <span className="text-muted-foreground">Hopper size (min)</span>
                <span className="font-mono font-semibold">{result.requiredHopperVolumeCuFt.toFixed(1)} ft³ ({(result.requiredHopperVolumeCuFt * 7.48).toFixed(0)} gal)</span>
                <span className="text-muted-foreground">Dryer air rating</span>
                <span className="font-mono font-semibold">≥ {result.recommendedDryerCapacityLbHr.toFixed(0)} lb/hr</span>
                {selectedMaterial && DRYING_PARAMETERS[selectedMaterial] && (
                  <>
                    <span className="text-muted-foreground">HMI dryer setpoint</span>
                    <span className="font-mono font-semibold">{DRYING_PARAMETERS[selectedMaterial].temp}°F, dp ≤ {DRYING_PARAMETERS[selectedMaterial].dewPoint}°F</span>
                    <span className="text-muted-foreground">Start-of-run purge</span>
                    <span className="font-mono font-semibold">{DRYING_PARAMETERS[selectedMaterial].time} hr before molding</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
