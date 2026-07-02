import { useState } from 'react';
import { useUnits, inToMm } from '@/contexts/UnitSystemContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useExport } from './ExportButton';

const VENT_DEPTHS: Record<string, { min: number; max: number; typical: number; unit: string }> = {
  'ABS': { min: 0.0010, max: 0.0020, typical: 0.0015, unit: 'in' },
  'Acetal (POM)': { min: 0.0005, max: 0.0010, typical: 0.0008, unit: 'in' },
  'Acrylic (PMMA)': { min: 0.0010, max: 0.0020, typical: 0.0015, unit: 'in' },
  'Nylon 6': { min: 0.0005, max: 0.0010, typical: 0.0008, unit: 'in' },
  'Nylon 66': { min: 0.0005, max: 0.0010, typical: 0.0008, unit: 'in' },
  'PC': { min: 0.0010, max: 0.0020, typical: 0.0015, unit: 'in' },
  'PC/ABS': { min: 0.0010, max: 0.0020, typical: 0.0015, unit: 'in' },
  'PE-HD': { min: 0.0010, max: 0.0020, typical: 0.0015, unit: 'in' },
  'PE-LD': { min: 0.0015, max: 0.0025, typical: 0.0020, unit: 'in' },
  'PET': { min: 0.0005, max: 0.0010, typical: 0.0008, unit: 'in' },
  'PP': { min: 0.0010, max: 0.0020, typical: 0.0015, unit: 'in' },
  'PS': { min: 0.0010, max: 0.0020, typical: 0.0015, unit: 'in' },
  'PVC Rigid': { min: 0.0008, max: 0.0015, typical: 0.0010, unit: 'in' },
  'TPE': { min: 0.0005, max: 0.0010, typical: 0.0008, unit: 'in' },
  'TPU': { min: 0.0005, max: 0.0010, typical: 0.0008, unit: 'in' },
};

export function VentDepthCalculator() {
  const { ref: cardRef, ExportBtn } = useExport('Vent Depth Reference');
  const { isMetric } = useUnits();
  const fmt = (inches: number) => isMetric
    ? `${inToMm(inches).toFixed(3)} mm`
    : `${inches.toFixed(4)}"`;
  const [material, setMaterial] = useState<string>('');
  const [partPerimeter, setPartPerimeter] = useState<string>('');
  const [ventWidth, setVentWidth] = useState<string>('0.250');
  const [result, setResult] = useState<{
    depth: { min: number; max: number; typical: number };
    ventLandLength: number;
    recommendedVents: number;
    totalVentLength: number;
  } | null>(null);

  const handleCalculate = () => {
    if (!material || !VENT_DEPTHS[material]) return;
    const perimInput = parseFloat(partPerimeter) || 0;
    const perim = isMetric ? perimInput / 25.4 : perimInput; // canonical inches
    const widthInput = parseFloat(ventWidth) || (isMetric ? 6.35 : 0.250);
    const width = isMetric ? widthInput / 25.4 : widthInput; // canonical inches
    const depth = VENT_DEPTHS[material];
    const ventLandLength = 0.040;
    const recommendedVents = perim > 0 ? Math.ceil(perim / 1.0) : 0;
    const totalVentLength = recommendedVents * width;

    setResult({ depth, ventLandLength, recommendedVents, totalVentLength });
  };

  const handleReset = () => {
    setMaterial(''); setPartPerimeter(''); setVentWidth('0.250'); setResult(null);
  };

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Vent Depth Reference
          </CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          Recommended vent depths by material — prevent flash while allowing gas escape
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Material</Label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger><SelectValue placeholder="Select material..." /></SelectTrigger>
              <SelectContent>
                {Object.keys(VENT_DEPTHS).map(m => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Part Perimeter at Parting Line ({isMetric ? 'mm' : 'in'})</Label>
            <Input type="number" step="0.1" placeholder={isMetric ? 'e.g., 320' : 'e.g., 12.5'} value={partPerimeter} onChange={(e) => setPartPerimeter(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Vent Width ({isMetric ? 'mm' : 'in'})</Label>
            <Input type="number" step={isMetric ? '0.5' : '0.025'} placeholder={isMetric ? '6.35' : '0.250'} value={ventWidth} onChange={(e) => setVentWidth(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            <Calculator className="h-4 w-4 mr-2" /> Look Up
          </Button>
          <Button variant="outline" onClick={handleReset}>Reset</Button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Min Depth</p>
                <p className="text-xl font-bold">{fmt(result.depth.min)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Typical Depth</p>
                <p className="text-xl font-bold text-primary">{fmt(result.depth.typical)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Max Depth</p>
                <p className="text-xl font-bold">{fmt(result.depth.max)}</p>
              </div>
            </div>

            <div className="pt-3 border-t grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Land Length</p>
                <p className="text-sm font-medium">{result.ventLandLength.toFixed(3)}" (typical)</p>
              </div>
              {result.recommendedVents > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground">Estimated Vents Needed</p>
                  <p className="text-sm font-medium">~{result.recommendedVents} vents</p>
                </div>
              )}
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                💡 Vent depth is material-dependent. Too deep = flash. Too shallow = burns and shorts. Always verify with material supplier TDS.
              </p>
            </div>

            <div className="pt-3 border-t bg-primary/5 -m-4 mt-3 p-4 rounded-b-lg">
              <p className="text-sm font-semibold text-primary mb-2">📋 Send to Toolroom — Vent Cut Spec</p>
              <ul className="text-xs space-y-1">
                <li>• <span className="font-semibold">Vent depth:</span> {result.depth.typical.toFixed(4)}" (min {result.depth.min.toFixed(4)}" / max {result.depth.max.toFixed(4)}")</li>
                <li>• <span className="font-semibold">Vent width:</span> {parseFloat(ventWidth).toFixed(3)}" each</li>
                <li>• <span className="font-semibold">Land length:</span> {result.ventLandLength.toFixed(3)}" then relieve to 0.010" for {(result.ventLandLength * 5).toFixed(3)}"</li>
                {result.recommendedVents > 0 && (
                  <>
                    <li>• <span className="font-semibold">Quantity:</span> ~{result.recommendedVents} vents evenly around parting line</li>
                    <li>• <span className="font-semibold">Total vent width:</span> {result.totalVentLength.toFixed(2)}"</li>
                  </>
                )}
                <li>• Also vent ejector pins, subgates, and last-to-fill areas identified by short-shot study.</li>
                <li>• Tolerance: −0.0000 / +0.0002" on depth. Verify with feeler gauge after cutting.</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
