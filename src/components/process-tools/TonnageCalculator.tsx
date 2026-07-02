import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TYPICAL_CAVITY_PRESSURES, STANDARD_TONNAGES } from '@/types/processTools';
import { useExport } from './ExportButton';
import { HelperPopover } from './HelperPopover';
import { rectangleAreaMm2, circleAreaMm2, mm2ToIn2, mm2ToCm2 } from '@/lib/geometryHelpers';
import { useUnits } from '@/contexts/UnitSystemContext';

type Units = 'imperial' | 'metric';

// Conversion constants
const CM2_PER_IN2 = 6.4516;
const METRIC_TONS_PER_US_TON = 0.907185;

// Convert an average cavity pressure (psi) into required clamp tonnage per unit area.
// 1 US ton-force = 2000 lbf, so tons/in² = psi / 2000.
const psiToTonsPerSqIn = (psi: number) => psi / 2000;
const tonsPerSqInToMetric = (t: number) => (t * METRIC_TONS_PER_US_TON) / CM2_PER_IN2; // metric tons / cm²

export function TonnageCalculator() {
  const { ref: cardRef, ExportBtn } = useExport('Clamp Tonnage Calculator');
  const { system, resetNonce } = useUnits();
  const units: Units = system;
  const [partArea, setPartArea] = useState<string>('');
  const [cavities, setCavities] = useState<string>('');
  const [runnerArea, setRunnerArea] = useState<string>('');
  const [runners, setRunners] = useState<string>('');
  const [tonsPerArea, setTonsPerArea] = useState<string>('');
  const [material, setMaterial] = useState<string>('');
  const [result, setResult] = useState<{ totalArea: number; tonnage: number } | null>(null);

  const isMetric = units === 'metric';
  const areaUnit = isMetric ? 'sq.cm' : 'sq.in';
  const tonsPerAreaUnit = isMetric ? 'tons / sq.cm' : 'tons / sq.in';
  const tonUnit = isMetric ? 'metric tons' : 'US tons';


  // Clear inputs when the global unit system flips.
  useEffect(() => {
    setPartArea('');
    setRunnerArea('');
    setTonsPerArea('');
    setResult(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetNonce]);

  const handleMaterialChange = (mat: string) => {
    setMaterial(mat);
    const range = TYPICAL_CAVITY_PRESSURES[mat];
    if (!range) return;
    const avgPsi = (range.min + range.max) / 2;
    const tpaImperial = psiToTonsPerSqIn(avgPsi);
    setTonsPerArea(isMetric ? tonsPerSqInToMetric(tpaImperial).toFixed(4) : tpaImperial.toFixed(3));
  };

  const handleCalculate = () => {
    const pa = parseFloat(partArea) || 0;
    const nc = parseFloat(cavities) || 0;
    const ra = parseFloat(runnerArea) || 0;
    const nr = parseFloat(runners) || 0;
    const tpa = parseFloat(tonsPerArea);
    if (isNaN(tpa)) return;
    const totalArea = pa * nc + ra * nr;
    setResult({ totalArea, tonnage: totalArea * tpa });
  };

  const handleReset = () => {
    setPartArea('');
    setCavities('');
    setRunnerArea('');
    setRunners('');
    setTonsPerArea('');
    setMaterial('');
    setResult(null);
  };

  const materialInfo = useMemo(() => {
    const range = material ? TYPICAL_CAVITY_PRESSURES[material] : null;
    if (!range) return null;
    const avgPsi = (range.min + range.max) / 2;
    return { avgPsi, min: range.min, max: range.max };
  }, [material]);

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle className="flex items-center gap-2">Clamp Tonnage Calculator</CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          Total Projected Area × Required Tonnage per unit area = Calculated Tonnage
        </CardDescription>
        <p className="text-xs text-muted-foreground pt-1">Note: All inputs should be in the same unit system.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {/* Projected Area of 1 Part / Cavity */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <div className="flex items-center gap-1 flex-wrap">
              <Label htmlFor="partArea">Projected Area of 1 Part / Cavity</Label>
              <HelperPopover title="Derive projected area from part dimensions" description="Enter the outline of the part as seen looking down at the parting line.">
                <PartAreaDeriver isMetric={isMetric} onApply={(v) => setPartArea(v.toFixed(3))} />
              </HelperPopover>
            </div>
            <div className="flex items-center gap-2">
              <Input
                id="partArea"
                type="number"
                step="0.01"
                className="w-32"
                value={partArea}
                onChange={(e) => setPartArea(e.target.value)}
              />
              <span className="text-sm text-muted-foreground w-14">{areaUnit}</span>
            </div>
          </div>

          {/* Number of cavities */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <Label htmlFor="cavities">Number of Cavities</Label>
            <div className="flex items-center gap-2">
              <Input
                id="cavities"
                type="number"
                step="1"
                className="w-32"
                value={cavities}
                onChange={(e) => setCavities(e.target.value)}
              />
              <span className="text-sm text-muted-foreground w-14" />
            </div>
          </div>

          {/* Projected Area of 1 Runner */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <Label htmlFor="runnerArea">Projected Area of 1 Runner</Label>
            <div className="flex items-center gap-2">
              <Input
                id="runnerArea"
                type="number"
                step="0.01"
                className="w-32"
                value={runnerArea}
                onChange={(e) => setRunnerArea(e.target.value)}
              />
              <span className="text-sm text-muted-foreground w-14">{areaUnit}</span>
            </div>
          </div>

          {/* Number of Runners */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <Label htmlFor="runners">Number of Runners</Label>
            <div className="flex items-center gap-2">
              <Input
                id="runners"
                type="number"
                step="1"
                className="w-32"
                value={runners}
                onChange={(e) => setRunners(e.target.value)}
              />
              <span className="text-sm text-muted-foreground w-14" />
            </div>
          </div>

          {/* Material selector */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <Label htmlFor="material" className="flex items-center gap-1">
              Material (auto-fills tonnage/area)
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  Uses the average of typical cavity pressures for the selected material to compute the
                  required tonnage per unit area (psi ÷ 2000 = tons/in²).
                </TooltipContent>
              </Tooltip>
            </Label>
            <div className="flex items-center gap-2">
              <Select value={material} onValueChange={handleMaterialChange}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(TYPICAL_CAVITY_PRESSURES).map((mat) => (
                    <SelectItem key={mat} value={mat}>{mat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground w-14" />
            </div>
          </div>

          {/* Required tonnage per sq area */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <Label htmlFor="tonsPerArea">Required tonnage per unit area</Label>
            <div className="flex items-center gap-2">
              <Input
                id="tonsPerArea"
                type="number"
                step="0.001"
                className="w-32"
                value={tonsPerArea}
                onChange={(e) => setTonsPerArea(e.target.value)}
              />
              <span className="text-sm text-muted-foreground w-14">{tonsPerAreaUnit}</span>
            </div>
          </div>

          {materialInfo && (
            <p className="text-xs text-muted-foreground">
              {material}: typical cavity pressure {materialInfo.min.toLocaleString()}–
              {materialInfo.max.toLocaleString()} psi (avg {materialInfo.avgPsi.toLocaleString()} psi).
            </p>
          )}
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
                <p className="text-sm text-muted-foreground">Total Projected Area</p>
                <p className="text-2xl font-bold text-primary">
                  {result.totalArea.toFixed(2)} <span className="text-base font-normal">{areaUnit}</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Calculated Tonnage</p>
                <p className="text-2xl font-bold text-primary">
                  {result.tonnage.toFixed(1)} <span className="text-base font-normal">{tonUnit}</span>
                </p>
              </div>
            </div>
          </div>
        )}
        {result && (() => {
          // Send to Press: recommend next standard machine (imperial tons) with safety margin.
          const tonnageUsTons = isMetric ? result.tonnage / METRIC_TONS_PER_US_TON : result.tonnage;
          const withSafety = tonnageUsTons * 1.1;
          const recommended = STANDARD_TONNAGES.find((t) => t >= withSafety) || STANDARD_TONNAGES[STANDARD_TONNAGES.length - 1];
          return (
            <div className="mt-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Send to Press</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Required (+10% safety)</p>
                  <p className="font-semibold">{withSafety.toFixed(1)} US tons</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Recommended machine size</p>
                  <p className="font-semibold">{recommended} US tons</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Pick a press ≥ recommended. If capacity is tight, verify actual peak cavity pressure during a short-shot study.
              </p>
            </div>
          );
        })()}
      </CardContent>
    </Card>
  );
}

// -----------------------------------------------------------------------------
// Inline helper: derive projected area from part dimensions
// -----------------------------------------------------------------------------
function PartAreaDeriver({ isMetric, onApply }: { isMetric: boolean; onApply: (val: number) => void }) {
  const [shape, setShape] = useState<'rect' | 'circle'>('rect');
  const [l, setL] = useState('');
  const [w, setW] = useState('');
  const [d, setD] = useState('');

  const compute = (): number | null => {
    if (shape === 'rect') {
      const lMm = parseFloat(l);
      const wMm = parseFloat(w);
      if (!lMm || !wMm) return null;
      const mm2 = rectangleAreaMm2(lMm, wMm);
      return isMetric ? mm2ToCm2(mm2) : mm2ToIn2(mm2);
    }
    const dMm = parseFloat(d);
    if (!dMm) return null;
    const mm2 = circleAreaMm2(dMm);
    return isMetric ? mm2ToCm2(mm2) : mm2ToIn2(mm2);
  };

  const preview = compute();

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button type="button" size="sm" variant={shape === 'rect' ? 'default' : 'outline'} onClick={() => setShape('rect')}>Rectangle</Button>
        <Button type="button" size="sm" variant={shape === 'circle' ? 'default' : 'outline'} onClick={() => setShape('circle')}>Circle / Round</Button>
      </div>
      <p className="text-xs text-muted-foreground">Enter dimensions in <b>mm</b> (part outline as seen from the parting line).</p>
      {shape === 'rect' ? (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Length (mm)</Label>
            <Input type="number" value={l} onChange={(e) => setL(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">Width (mm)</Label>
            <Input type="number" value={w} onChange={(e) => setW(e.target.value)} />
          </div>
        </div>
      ) : (
        <div>
          <Label className="text-xs">Outside diameter (mm)</Label>
          <Input type="number" value={d} onChange={(e) => setD(e.target.value)} />
        </div>
      )}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-muted-foreground">
          {preview !== null ? `= ${preview.toFixed(3)} ${isMetric ? 'cm²' : 'in²'}` : '—'}
        </span>
        <Button type="button" size="sm" disabled={preview === null} onClick={() => preview !== null && onApply(preview)}>
          Use this value
        </Button>
      </div>
    </div>
  );
}
