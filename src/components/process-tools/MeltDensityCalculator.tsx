import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Beaker, Copy, Download, Plus, Trash2, HelpCircle, ChevronDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useExport } from './ExportButton';

// Types
interface SampleRow {
  id: number;
  mass: string;
}

interface ApparentResults {
  volumeCc: number;
  densities: number[];
  mean: number;
  stdev: number;
  cvPercent: number;
  min: number;
  max: number;
  recommendedDensity: number;
  passed: boolean;
  outliers: number[];
}

interface PVTResults {
  densityGcc: number;
  densityKgM3: number;
}

// Helper functions
const convertDiameterToCm = (value: number, unit: 'mm' | 'in'): number => {
  return unit === 'mm' ? value / 10 : value * 2.54;
};

const convertStrokeToCm = (value: number, unit: 'mm' | 'in'): number => {
  return unit === 'mm' ? value / 10 : value * 2.54;
};

const calculateMean = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
};

const calculateStdev = (values: number[], mean: number): number => {
  if (values.length < 2) return 0;
  const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
  return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / (values.length - 1));
};

export function MeltDensityCalculator() {
  const { ref: cardRef, ExportBtn } = useExport('Melt Density Calculator');
  return (
    <Card ref={cardRef} className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Beaker className="h-5 w-5 text-primary" />
            Melt Density Calculator
          </CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          Calculate melt density using machine calibration or PVT data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="apparent" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="apparent">Apparent (Machine)</TabsTrigger>
            <TabsTrigger value="pvt">PVT (Physics)</TabsTrigger>
          </TabsList>
          <TabsContent value="apparent" className="mt-4">
            <ApparentDensityTab />
          </TabsContent>
          <TabsContent value="pvt" className="mt-4">
            <PVTDensityTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function ApparentDensityTab() {
  // Inputs
  const [diameter, setDiameter] = useState('');
  const [diameterUnit, setDiameterUnit] = useState<'mm' | 'in'>('mm');
  const [strokeMode, setStrokeMode] = useState<'A' | 'B'>('A');
  const [strokeLength, setStrokeLength] = useState('');
  const [startPosition, setStartPosition] = useState('');
  const [endPosition, setEndPosition] = useState('');
  const [strokeUnit, setStrokeUnit] = useState<'mm' | 'in'>('mm');
  const [samples, setSamples] = useState<SampleRow[]>(
    Array.from({ length: 10 }, (_, i) => ({ id: i + 1, mass: '' }))
  );
  const [recommendedPolicy, setRecommendedPolicy] = useState<'mean' | 'mean-1s' | 'mean-2s'>('mean');
  const [cvThreshold, setCvThreshold] = useState('1.0');
  const [outlierSigma, setOutlierSigma] = useState('2');
  const [helpOpen, setHelpOpen] = useState(false);

  // Calculate stroke
  const computedStroke = useMemo(() => {
    if (strokeMode === 'A') {
      return parseFloat(strokeLength) || 0;
    } else {
      const start = parseFloat(startPosition) || 0;
      const end = parseFloat(endPosition) || 0;
      const delta = start - end;
      return delta > 0 ? delta : 0;
    }
  }, [strokeMode, strokeLength, startPosition, endPosition]);

  const strokeError = useMemo(() => {
    if (strokeMode === 'B') {
      const start = parseFloat(startPosition) || 0;
      const end = parseFloat(endPosition) || 0;
      if (start && end && start <= end) {
        return 'Start position must be greater than end position';
      }
    }
    return null;
  }, [strokeMode, startPosition, endPosition]);

  // Calculate results
  const results = useMemo((): ApparentResults | null => {
    const d = parseFloat(diameter);
    if (!d || d <= 0 || computedStroke <= 0) return null;

    const validMasses = samples
      .map(s => parseFloat(s.mass))
      .filter(m => !isNaN(m) && m > 0);

    if (validMasses.length === 0) return null;

    // Convert to cm
    const dCm = convertDiameterToCm(d, diameterUnit);
    const strokeCm = convertStrokeToCm(computedStroke, strokeUnit);

    // Calculate volume
    const area = Math.PI * Math.pow(dCm / 2, 2);
    const volumeCc = area * strokeCm;

    // Calculate densities
    const densities = validMasses.map(m => m / volumeCc);

    // Statistics
    const mean = calculateMean(densities);
    const stdev = calculateStdev(densities, mean);
    const cvPercent = mean > 0 ? (stdev / mean) * 100 : 0;
    const min = Math.min(...densities);
    const max = Math.max(...densities);

    // Recommended density based on policy
    let recommendedDensity = mean;
    if (recommendedPolicy === 'mean-1s') {
      recommendedDensity = mean - stdev;
    } else if (recommendedPolicy === 'mean-2s') {
      recommendedDensity = mean - 2 * stdev;
    }

    // Pass/Fail
    const cvThresholdNum = parseFloat(cvThreshold) || 1.0;
    const passed = cvPercent <= cvThresholdNum;

    // Outliers
    const outlierSigmaNum = parseFloat(outlierSigma) || 2;
    const outliers: number[] = [];
    if (stdev > 0) {
      densities.forEach((d, i) => {
        if (Math.abs(d - mean) > outlierSigmaNum * stdev) {
          outliers.push(i);
        }
      });
    }

    return {
      volumeCc,
      densities,
      mean,
      stdev,
      cvPercent,
      min,
      max,
      recommendedDensity,
      passed,
      outliers,
    };
  }, [diameter, diameterUnit, computedStroke, strokeUnit, samples, recommendedPolicy, cvThreshold, outlierSigma]);

  const addSample = () => {
    setSamples([...samples, { id: samples.length + 1, mass: '' }]);
  };

  const removeSample = (index: number) => {
    if (samples.length > 1) {
      setSamples(samples.filter((_, i) => i !== index));
    }
  };

  const updateSample = (index: number, mass: string) => {
    const updated = [...samples];
    updated[index] = { ...updated[index], mass };
    setSamples(updated);
  };

  const copySummary = () => {
    if (!results) return;
    const summary = `Melt Density Summary (Apparent Method)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Volume: ${results.volumeCc.toFixed(4)} cc
Mean Density: ${results.mean.toFixed(4)} g/cc
Stdev: ${results.stdev.toFixed(4)} g/cc
%CV: ${results.cvPercent.toFixed(2)}%
Min: ${results.min.toFixed(4)} g/cc
Max: ${results.max.toFixed(4)} g/cc
Recommended (${recommendedPolicy}): ${results.recommendedDensity.toFixed(4)} g/cc
Status: ${results.passed ? 'PASS' : 'FAIL'}
Samples: ${results.densities.length}
Outliers: ${results.outliers.length}`;
    navigator.clipboard.writeText(summary);
    toast.success('Summary copied to clipboard');
  };

  const exportJSON = () => {
    if (!results) return;
    const data = {
      inputs: {
        diameter: parseFloat(diameter),
        diameterUnit,
        strokeMode,
        stroke: computedStroke,
        strokeUnit,
        samples: samples.filter(s => parseFloat(s.mass) > 0).map(s => parseFloat(s.mass)),
        recommendedPolicy,
        cvThreshold: parseFloat(cvThreshold),
        outlierSigma: parseFloat(outlierSigma),
      },
      outputs: {
        volumeCc: results.volumeCc,
        meanDensity: results.mean,
        stdev: results.stdev,
        cvPercent: results.cvPercent,
        min: results.min,
        max: results.max,
        recommendedDensity: results.recommendedDensity,
        passed: results.passed,
        outliers: results.outliers,
        densities: results.densities,
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'apparent-melt-density.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('JSON exported');
  };

  return (
    <div className="space-y-6">
      {/* Help Panel */}
      <Collapsible open={helpOpen} onOpenChange={setHelpOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Example: Apparent Density Calculation
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${helpOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-4 bg-muted/50 rounded-lg text-sm">
          <p className="font-medium mb-2">Worked Example:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Barrel diameter: 40 mm → D_cm = 4.0 cm</li>
            <li>• Stroke: 50 mm → Δx_cm = 5.0 cm</li>
            <li>• Area = π × (4.0/2)² = 12.566 cm²</li>
            <li>• Volume = 12.566 × 5.0 = 62.83 cc</li>
            <li>• Sample weights: 56.5, 57.2, 56.8, 57.0, 56.6 g</li>
            <li>• Densities: 0.899, 0.910, 0.904, 0.907, 0.901 g/cc</li>
            <li>• Mean = 0.904 g/cc, Stdev = 0.0043, %CV = 0.47%</li>
          </ul>
          <p className="mt-2 text-xs italic">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="underline decoration-dotted">
                  What is Apparent Density?
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  Apparent density is machine/setup-calibrated density calculated by weighing actual shots and dividing by the calculated swept volume.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
        </CollapsibleContent>
      </Collapsible>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Diameter */}
        <div className="space-y-2">
          <Label>Screw/Barrel Diameter</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={diameter}
              onChange={(e) => setDiameter(e.target.value)}
              placeholder="Enter diameter"
              min="0"
              step="0.1"
            />
            <Select value={diameterUnit} onValueChange={(v) => setDiameterUnit(v as 'mm' | 'in')}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mm">mm</SelectItem>
                <SelectItem value="in">in</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stroke Mode Toggle */}
        <div className="space-y-2">
          <Label>Stroke Definition Mode</Label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={strokeMode === 'B'}
                onCheckedChange={(checked) => setStrokeMode(checked ? 'B' : 'A')}
              />
              <span className="text-sm text-muted-foreground">
                {strokeMode === 'A' ? 'Direct Length' : 'Start/End Position'}
              </span>
            </div>
          </div>
        </div>

        {/* Stroke Input (Mode A) */}
        {strokeMode === 'A' && (
          <div className="space-y-2">
            <Label>Stroke Length (Δx)</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={strokeLength}
                onChange={(e) => setStrokeLength(e.target.value)}
                placeholder="Enter stroke"
                min="0"
                step="0.1"
              />
              <Select value={strokeUnit} onValueChange={(v) => setStrokeUnit(v as 'mm' | 'in')}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mm">mm</SelectItem>
                  <SelectItem value="in">in</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Stroke Input (Mode B) */}
        {strokeMode === 'B' && (
          <>
            <div className="space-y-2">
              <Label>Start Position</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={startPosition}
                  onChange={(e) => setStartPosition(e.target.value)}
                  placeholder="Start"
                  min="0"
                  step="0.1"
                />
                <Select value={strokeUnit} onValueChange={(v) => setStrokeUnit(v as 'mm' | 'in')}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm">mm</SelectItem>
                    <SelectItem value="in">in</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>End Position</Label>
              <Input
                type="number"
                value={endPosition}
                onChange={(e) => setEndPosition(e.target.value)}
                placeholder="End"
                min="0"
                step="0.1"
              />
              {strokeError && (
                <p className="text-xs text-destructive">{strokeError}</p>
              )}
              {computedStroke > 0 && !strokeError && (
                <p className="text-xs text-muted-foreground">
                  Δx = {computedStroke.toFixed(2)} {strokeUnit}
                </p>
              )}
            </div>
          </>
        )}

        {/* Recommended Use Policy */}
        <div className="space-y-2">
          <Label>Recommended Use Policy</Label>
          <Select value={recommendedPolicy} onValueChange={(v) => setRecommendedPolicy(v as 'mean' | 'mean-1s' | 'mean-2s')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mean">Mean</SelectItem>
              <SelectItem value="mean-1s">Mean − 1σ</SelectItem>
              <SelectItem value="mean-2s">Mean − 2σ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quality Thresholds */}
        <div className="space-y-2">
          <Label>%CV Threshold</Label>
          <Input
            type="number"
            value={cvThreshold}
            onChange={(e) => setCvThreshold(e.target.value)}
            placeholder="1.0"
            min="0"
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <Label>Outlier Threshold (σ)</Label>
          <Input
            type="number"
            value={outlierSigma}
            onChange={(e) => setOutlierSigma(e.target.value)}
            placeholder="2"
            min="0"
            step="0.5"
          />
        </div>
      </div>

      {/* Sample Weights Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Sample Weights (grams)</Label>
          <Button variant="outline" size="sm" onClick={addSample}>
            <Plus className="h-4 w-4 mr-1" />
            Add Row
          </Button>
        </div>
        <div className="border rounded-lg overflow-hidden max-h-64 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead>Mass (g)</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {samples.map((sample, index) => (
                <TableRow key={sample.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={sample.mass}
                      onChange={(e) => updateSample(index, e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSample(index)}
                      disabled={samples.length <= 1}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">Volume</p>
              <p className="text-lg font-semibold">{results.volumeCc.toFixed(3)} cc</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">Mean</p>
              <p className="text-lg font-semibold">{results.mean.toFixed(4)} g/cc</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">Stdev</p>
              <p className="text-lg font-semibold">{results.stdev.toFixed(4)}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">%CV</p>
              <p className="text-lg font-semibold">{results.cvPercent.toFixed(2)}%</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">Recommended</p>
              <p className="text-lg font-semibold text-primary">{results.recommendedDensity.toFixed(4)}</p>
            </div>
            <div className={`rounded-lg p-3 text-center ${results.passed ? 'bg-success/10' : 'bg-destructive/10'}`}>
              <p className="text-xs text-muted-foreground">Status</p>
              <div className="flex items-center justify-center gap-1">
                {results.passed ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-lg font-semibold text-success">PASS</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="text-lg font-semibold text-destructive">FAIL</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="border rounded-lg overflow-hidden max-h-48 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Mass (g)</TableHead>
                  <TableHead>Volume (cc)</TableHead>
                  <TableHead>Density (g/cc)</TableHead>
                  <TableHead>Deviation</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {samples
                  .map((s, i) => ({ mass: parseFloat(s.mass), index: i }))
                  .filter(s => !isNaN(s.mass) && s.mass > 0)
                  .map((sample, resultIndex) => {
                    const density = results.densities[resultIndex];
                    const deviation = density - results.mean;
                    const isOutlier = results.outliers.includes(resultIndex);
                    return (
                      <TableRow key={sample.index}>
                        <TableCell>{resultIndex + 1}</TableCell>
                        <TableCell>{sample.mass.toFixed(2)}</TableCell>
                        <TableCell>{results.volumeCc.toFixed(3)}</TableCell>
                        <TableCell>{density.toFixed(4)}</TableCell>
                        <TableCell className={deviation >= 0 ? 'text-success' : 'text-destructive'}>
                          {deviation >= 0 ? '+' : ''}{deviation.toFixed(4)}
                        </TableCell>
                        <TableCell>
                          {isOutlier ? (
                            <Badge variant="destructive">Outlier</Badge>
                          ) : (
                            <Badge variant="secondary">OK</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={copySummary}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Summary
            </Button>
            <Button variant="outline" onClick={exportJSON}>
              <Download className="h-4 w-4 mr-2" />
              Export JSON
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function PVTDensityTab() {
  const [specificVolume, setSpecificVolume] = useState('');
  const [volumeUnit, setVolumeUnit] = useState<'cm3g' | 'm3kg'>('cm3g');
  const [temperature, setTemperature] = useState('');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [pressure, setPressure] = useState('');
  const [pressureUnit, setPressureUnit] = useState<'bar' | 'psi' | 'MPa'>('bar');
  const [polymer, setPolymer] = useState('');
  const [grade, setGrade] = useState('');
  const [helpOpen, setHelpOpen] = useState(false);

  const results = useMemo((): PVTResults | null => {
    const v = parseFloat(specificVolume);
    if (!v || v <= 0) return null;

    // Convert to cm³/g if needed
    let vCm3PerG = v;
    if (volumeUnit === 'm3kg') {
      vCm3PerG = v * 1000; // 1 m³/kg = 1000 cm³/g
    }

    const densityGcc = 1 / vCm3PerG;
    const densityKgM3 = densityGcc * 1000;

    return { densityGcc, densityKgM3 };
  }, [specificVolume, volumeUnit]);

  const copySummary = () => {
    if (!results) return;
    const tempStr = temperature ? `${temperature}°${tempUnit}` : 'N/A';
    const pressStr = pressure ? `${pressure} ${pressureUnit}` : 'N/A';
    const summary = `Melt Density Summary (PVT Method)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Specific Volume: ${specificVolume} ${volumeUnit === 'cm3g' ? 'cm³/g' : 'm³/kg'}
Density: ${results.densityGcc.toFixed(4)} g/cc (${results.densityKgM3.toFixed(1)} kg/m³)
Temperature: ${tempStr}
Pressure: ${pressStr}
Polymer: ${polymer || 'N/A'}
Grade: ${grade || 'N/A'}`;
    navigator.clipboard.writeText(summary);
    toast.success('Summary copied to clipboard');
  };

  const exportJSON = () => {
    if (!results) return;
    const data = {
      inputs: {
        specificVolume: parseFloat(specificVolume),
        volumeUnit: volumeUnit === 'cm3g' ? 'cm³/g' : 'm³/kg',
        temperature: temperature ? parseFloat(temperature) : null,
        tempUnit,
        pressure: pressure ? parseFloat(pressure) : null,
        pressureUnit,
        polymer: polymer || null,
        grade: grade || null,
      },
      outputs: {
        densityGcc: results.densityGcc,
        densityKgM3: results.densityKgM3,
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pvt-melt-density.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('JSON exported');
  };

  return (
    <div className="space-y-6">
      {/* Help Panel */}
      <Collapsible open={helpOpen} onOpenChange={setHelpOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Example: PVT Density Calculation
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${helpOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-4 bg-muted/50 rounded-lg text-sm">
          <p className="font-medium mb-2">Worked Example:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Specific volume from datasheet: 1.12 cm³/g at 230°C, 1 bar</li>
            <li>• ρ = 1 / 1.12 = 0.893 g/cc</li>
            <li>• In kg/m³: 0.893 × 1000 = 893 kg/m³</li>
            <li className="mt-2">• If given in m³/kg: 0.00112 m³/kg</li>
            <li>• Convert: 0.00112 × 1000 = 1.12 cm³/g</li>
            <li>• ρ = 1 / 1.12 = 0.893 g/cc (same result)</li>
          </ul>
          <p className="mt-2 text-xs italic">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="underline decoration-dotted">
                  What is PVT Density?
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  PVT density is physics-based, derived from supplier-provided specific volume v(T,P) data. It represents the theoretical density at specified temperature and pressure conditions.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
        </CollapsibleContent>
      </Collapsible>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Specific Volume */}
        <div className="space-y-2">
          <Label>Specific Volume (v)</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={specificVolume}
              onChange={(e) => setSpecificVolume(e.target.value)}
              placeholder="Enter specific volume"
              min="0"
              step="0.001"
            />
            <Select value={volumeUnit} onValueChange={(v) => setVolumeUnit(v as 'cm3g' | 'm3kg')}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cm3g">cm³/g</SelectItem>
                <SelectItem value="m3kg">m³/kg</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {parseFloat(specificVolume) <= 0 && specificVolume !== '' && (
            <p className="text-xs text-destructive">Specific volume must be greater than 0</p>
          )}
        </div>

        {/* Temperature (optional) */}
        <div className="space-y-2">
          <Label>Temperature (optional)</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="e.g. 230"
              step="1"
            />
            <Select value={tempUnit} onValueChange={(v) => setTempUnit(v as 'C' | 'F')}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="C">°C</SelectItem>
                <SelectItem value="F">°F</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pressure (optional) */}
        <div className="space-y-2">
          <Label>Pressure (optional)</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={pressure}
              onChange={(e) => setPressure(e.target.value)}
              placeholder="e.g. 1"
              min="0"
              step="0.1"
            />
            <Select value={pressureUnit} onValueChange={(v) => setPressureUnit(v as 'bar' | 'psi' | 'MPa')}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">bar</SelectItem>
                <SelectItem value="psi">psi</SelectItem>
                <SelectItem value="MPa">MPa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Polymer */}
        <div className="space-y-2">
          <Label>Polymer (optional)</Label>
          <Select value={polymer} onValueChange={setPolymer}>
            <SelectTrigger>
              <SelectValue placeholder="Select polymer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PP">PP</SelectItem>
              <SelectItem value="PE">PE</SelectItem>
              <SelectItem value="ABS">ABS</SelectItem>
              <SelectItem value="PA">PA</SelectItem>
              <SelectItem value="PET">PET</SelectItem>
              <SelectItem value="PC">PC</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grade */}
        <div className="space-y-2 md:col-span-2">
          <Label>Grade (optional)</Label>
          <Input
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="e.g. Moplen HP501H"
          />
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground">Density</p>
              <p className="text-xl font-bold text-primary">{results.densityGcc.toFixed(4)} g/cc</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground">Density (alt)</p>
              <p className="text-xl font-semibold">{results.densityKgM3.toFixed(1)} kg/m³</p>
            </div>
            {temperature && (
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground">Temperature</p>
                <p className="text-lg font-semibold">{temperature}°{tempUnit}</p>
              </div>
            )}
            {pressure && (
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground">Pressure</p>
                <p className="text-lg font-semibold">{pressure} {pressureUnit}</p>
              </div>
            )}
          </div>

          {/* Material Info */}
          {(polymer || grade) && (
            <div className="flex gap-2 flex-wrap">
              {polymer && <Badge variant="outline">{polymer}</Badge>}
              {grade && <Badge variant="secondary">{grade}</Badge>}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={copySummary}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Summary
            </Button>
            <Button variant="outline" onClick={exportJSON}>
              <Download className="h-4 w-4 mr-2" />
              Export JSON
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
