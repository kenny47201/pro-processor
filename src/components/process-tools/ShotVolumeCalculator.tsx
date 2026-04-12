import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateShotVolumeWeight } from '@/lib/processCalculations';
import { MATERIAL_DENSITIES } from '@/types/processTools';

export function ShotVolumeCalculator() {
  const [partVolume, setPartVolume] = useState<string>('');
  const [runnerVolume, setRunnerVolume] = useState<string>('');
  const [cavities, setCavities] = useState<string>('1');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [customDensity, setCustomDensity] = useState<string>('');
  const [result, setResult] = useState<ReturnType<typeof calculateShotVolumeWeight> | null>(null);

  const getDensity = (): number => {
    if (selectedMaterial === 'Custom') {
      return parseFloat(customDensity) || 1.0;
    }
    return MATERIAL_DENSITIES[selectedMaterial] || 1.0;
  };

  const handleCalculate = () => {
    const pVol = parseFloat(partVolume);
    const rVol = parseFloat(runnerVolume) || 0;
    const numCavities = parseInt(cavities) || 1;
    const density = getDensity();

    if (isNaN(pVol)) return;

    const calcResult = calculateShotVolumeWeight(pVol, rVol, numCavities, density);
    setResult(calcResult);
  };

  const handleReset = () => {
    setPartVolume('');
    setRunnerVolume('');
    setCavities('1');
    setSelectedMaterial('');
    setCustomDensity('');
    setResult(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Shot Volume & Weight Calculator
        </CardTitle>
        <CardDescription>
          Calculate part, runner, and total shot volume and weight
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="material">Material</Label>
            <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
              <SelectTrigger>
                <SelectValue placeholder="Select material..." />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(MATERIAL_DENSITIES).map((mat) => (
                  <SelectItem key={mat} value={mat}>
                    {mat} ({MATERIAL_DENSITIES[mat]} g/cm³)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedMaterial === 'Custom' && (
            <div className="space-y-2">
              <Label htmlFor="customDensity">Custom Density (g/cm³)</Label>
              <Input
                id="customDensity"
                type="number"
                step="0.01"
                placeholder="e.g., 1.15"
                value={customDensity}
                onChange={(e) => setCustomDensity(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="partVolume" className="flex items-center gap-1">
              Single Part Volume (cm³)
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  Volume of one part cavity
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="partVolume"
              type="number"
              step="0.1"
              placeholder="e.g., 15.5"
              value={partVolume}
              onChange={(e) => setPartVolume(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="runnerVolume" className="flex items-center gap-1">
              Runner Volume (cm³)
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  Total runner system volume (sprue + runners + gates)
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="runnerVolume"
              type="number"
              step="0.1"
              placeholder="e.g., 8.2 (0 for hot runner)"
              value={runnerVolume}
              onChange={(e) => setRunnerVolume(e.target.value)}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Shot Volume</p>
                <p className="text-xl font-bold text-primary">
                  {result.totalShotVolume.toFixed(2)} cm³
                </p>
                <p className="text-xs text-muted-foreground">
                  ({(result.totalShotVolume * 0.061024).toFixed(2)} in³)
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Shot Weight</p>
                <p className="text-xl font-bold text-primary">
                  {result.totalShotWeight.toFixed(2)} g
                </p>
                <p className="text-xs text-muted-foreground">
                  ({(result.totalShotWeight * 0.035274).toFixed(2)} oz)
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Part Weight (each)</p>
                <p className="text-xl font-bold">
                  {result.partWeight.toFixed(2)} g
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Runner Weight</p>
                <p className="text-xl font-bold">
                  {result.runnerWeight.toFixed(2)} g
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
