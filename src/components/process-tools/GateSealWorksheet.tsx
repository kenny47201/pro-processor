import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Plus, Trash2, ChevronRight, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { useExport } from './ExportButton';

interface DataPoint {
  id: number;
  holdTime: string;
  partWeight: string;
}

interface AnalyzedPoint {
  holdTime: number;
  partWeight: number;
  delta: number;
  deltaPercent: number;
  sealed: boolean;
}

const STEPS = [
  {
    number: 1,
    title: 'Set Up the Machine',
    description: 'Lock all process parameters except hold time. Use a consistent cycle, barrel temp, injection speed, and transfer position.',
  },
  {
    number: 2,
    title: 'Run Shots & Record Weights',
    description: 'Start with a short hold time (e.g. 1 s). Run 5+ consecutive shots, weigh each. Record the average below. Increase hold time by 0.5–1 s and repeat.',
  },
  {
    number: 3,
    title: 'Analyze the Plateau',
    description: 'Enter your data points below. The tool will identify where part weight stabilizes — that is your gate seal (seal) point.',
  },
];

export function GateSealWorksheet() {
  const { ref: cardRef, ExportBtn } = useExport('Gate Seal Study Worksheet');
  const [currentStep, setCurrentStep] = useState(0);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { id: 1, holdTime: '', partWeight: '' },
    { id: 2, holdTime: '', partWeight: '' },
    { id: 3, holdTime: '', partWeight: '' },
    { id: 4, holdTime: '', partWeight: '' },
    { id: 5, holdTime: '', partWeight: '' },
    { id: 6, holdTime: '', partWeight: '' },
  ]);
  const [results, setResults] = useState<AnalyzedPoint[] | null>(null);
  const [sealTime, setSealTime] = useState<number | null>(null);

  const addPoint = () => {
    setDataPoints([...dataPoints, { id: Date.now(), holdTime: '', partWeight: '' }]);
  };

  const removePoint = (id: number) => {
    if (dataPoints.length > 3) setDataPoints(dataPoints.filter(p => p.id !== id));
  };

  const updatePoint = (id: number, field: keyof DataPoint, value: string) => {
    setDataPoints(dataPoints.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleAnalyze = () => {
    const valid = dataPoints
      .filter(p => p.holdTime && p.partWeight)
      .map(p => ({ holdTime: parseFloat(p.holdTime), partWeight: parseFloat(p.partWeight) }))
      .sort((a, b) => a.holdTime - b.holdTime);

    if (valid.length < 3) return;

    const maxWeight = Math.max(...valid.map(v => v.partWeight));
    const threshold = maxWeight * 0.005; // 0.5% of max weight

    const analyzed: AnalyzedPoint[] = valid.map((pt, i) => {
      const delta = i === 0 ? 0 : pt.partWeight - valid[i - 1].partWeight;
      const deltaPercent = i === 0 ? 0 : (delta / valid[i - 1].partWeight) * 100;
      return { ...pt, delta, deltaPercent, sealed: false };
    });

    // Find first point where weight gain < threshold
    let foundSeal = false;
    let freezeTime: number | null = null;
    for (let i = 1; i < analyzed.length; i++) {
      if (!foundSeal && Math.abs(analyzed[i].delta) < threshold) {
        foundSeal = true;
        freezeTime = analyzed[i].holdTime;
      }
      if (foundSeal) analyzed[i].sealed = true;
    }

    setResults(analyzed);
    setSealTime(freezeTime);
    setCurrentStep(2); // Jump to step 3 (analysis)
  };

  const handleReset = () => {
    setDataPoints([
      { id: 1, holdTime: '', partWeight: '' },
      { id: 2, holdTime: '', partWeight: '' },
      { id: 3, holdTime: '', partWeight: '' },
      { id: 4, holdTime: '', partWeight: '' },
      { id: 5, holdTime: '', partWeight: '' },
      { id: 6, holdTime: '', partWeight: '' },
    ]);
    setResults(null);
    setSealTime(null);
    setCurrentStep(0);
  };

  const validCount = dataPoints.filter(p => p.holdTime && p.partWeight).length;

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Gate Seal Study Worksheet
          </CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          Step-by-step worksheet to determine minimum hold time from part weight vs. hold-time data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">

        {/* Step indicators */}
        <div className="flex items-center gap-1">
          {STEPS.map((step, idx) => (
            <div key={step.number} className="flex items-center gap-1 flex-1">
              <button
                onClick={() => setCurrentStep(idx)}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-colors w-full
                  ${currentStep === idx
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : currentStep > idx
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-muted/40 text-muted-foreground/60'
                  }`}
              >
                {currentStep > idx ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                ) : (
                  <span className="h-4 w-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0">
                    {step.number}
                  </span>
                )}
                <span className="truncate">{step.title}</span>
              </button>
              {idx < STEPS.length - 1 && <ChevronRight className="h-3 w-3 text-muted-foreground/40 shrink-0" />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="border rounded-lg p-4 bg-muted/20 space-y-1">
          <p className="text-sm font-medium">{STEPS[currentStep].title}</p>
          <p className="text-xs text-muted-foreground">{STEPS[currentStep].description}</p>
        </div>

        {/* Data entry — always visible for steps 1-2 */}
        {currentStep <= 1 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Hold Time vs. Part Weight</Label>
              <Badge variant="outline" className="text-xs">
                {validCount} / {dataPoints.length} entered
              </Badge>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-[1fr_1fr_40px] gap-px bg-border text-xs font-medium">
                <div className="bg-muted px-3 py-2">Hold Time (s)</div>
                <div className="bg-muted px-3 py-2">Part Weight (g)</div>
                <div className="bg-muted px-3 py-2"></div>
              </div>
              {dataPoints.map((point) => (
                <div key={point.id} className="grid grid-cols-[1fr_1fr_40px] gap-px bg-border">
                  <div className="bg-card px-1 py-1">
                    <Input
                      type="number"
                      step="0.5"
                      placeholder="e.g. 2.0"
                      value={point.holdTime}
                      onChange={(e) => updatePoint(point.id, 'holdTime', e.target.value)}
                      className="h-8 text-sm border-0 bg-transparent"
                    />
                  </div>
                  <div className="bg-card px-1 py-1">
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g. 45.23"
                      value={point.partWeight}
                      onChange={(e) => updatePoint(point.id, 'partWeight', e.target.value)}
                      className="h-8 text-sm border-0 bg-transparent"
                    />
                  </div>
                  <div className="bg-card flex items-center justify-center">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removePoint(point.id)} disabled={dataPoints.length <= 3}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={addPoint}>
                <Plus className="h-3 w-3 mr-1" /> Add Row
              </Button>
            </div>
            <div className="flex gap-2 pt-1">
              <Button onClick={handleAnalyze} className="flex-1" disabled={validCount < 3}>
                <Calculator className="h-4 w-4 mr-2" /> Analyze ({validCount < 3 ? `need ${3 - validCount} more` : 'ready'})
              </Button>
              <Button variant="outline" onClick={handleReset}>Reset</Button>
            </div>
          </div>
        )}

        {/* Results — Step 3 */}
        {currentStep === 2 && results && (
          <div className="space-y-4">
            {/* Minimum hold time result card */}
            <div className={`rounded-lg p-4 border-2 ${sealTime !== null ? 'border-green-500/40 bg-green-500/5' : 'border-yellow-500/40 bg-yellow-500/5'}`}>
              <div className="flex items-start gap-3">
                {sealTime !== null ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 shrink-0" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-yellow-500 mt-0.5 shrink-0" />
                )}
                <div>
                  <p className="text-sm font-semibold">
                    {sealTime !== null ? 'Gate Seal Detected' : 'No Clear Plateau Found'}
                  </p>
                  {sealTime !== null ? (
                    <>
                      <p className="text-2xl font-bold text-foreground mt-1">
                        {sealTime.toFixed(1)} s <span className="text-sm font-normal text-muted-foreground">minimum hold time</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Part weight stabilized at this hold time — additional hold provides no packing benefit. 
                        Set hold time at or slightly above this value for production.
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-1">
                      Weight is still increasing across all data points. Add longer hold times to find the plateau.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {sealTime !== null && (
              <div className="rounded-lg p-4 border-2 border-primary/30 bg-primary/5 space-y-2">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> Send to Press — Hold Timer
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Minimum</p>
                    <p className="text-base font-bold text-primary">{sealTime.toFixed(1)} s</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Production (+10%)</p>
                    <p className="text-base font-bold text-primary">{(sealTime * 1.1).toFixed(1)} s</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Safe (+20%)</p>
                    <p className="text-base font-bold text-primary">{(sealTime * 1.2).toFixed(1)} s</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter the +10% value in the HMI as <span className="font-mono">Hold Time</span>. Remaining cooling is set by the Cooling Timer (see Cooling Time calculator).
                </p>
              </div>
            )}

            {/* Data table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted text-xs">
                    <th className="text-left py-2 px-3">Hold (s)</th>
                    <th className="text-left py-2 px-3">Weight (g)</th>
                    <th className="text-left py-2 px-3">Δ Weight (g)</th>
                    <th className="text-left py-2 px-3">Δ %</th>
                    <th className="text-left py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i} className={`border-t ${r.sealed ? 'bg-green-500/5' : ''}`}>
                      <td className="py-1.5 px-3 font-mono text-xs">{r.holdTime.toFixed(1)}</td>
                      <td className="py-1.5 px-3 font-mono text-xs">{r.partWeight.toFixed(2)}</td>
                      <td className="py-1.5 px-3 font-mono text-xs">
                        {i === 0 ? '—' : (r.delta >= 0 ? '+' : '') + r.delta.toFixed(2)}
                      </td>
                      <td className="py-1.5 px-3 font-mono text-xs">
                        {i === 0 ? '—' : (r.deltaPercent >= 0 ? '+' : '') + r.deltaPercent.toFixed(2) + '%'}
                      </td>
                      <td className="py-1.5 px-3">
                        <Badge variant={r.sealed ? 'default' : 'outline'} className="text-[10px]">
                          {r.sealed ? '✓ Sealed' : 'Filling'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Visual bar chart */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Part Weight vs Hold Time</Label>
              {results.map((r, i) => {
                const minW = Math.min(...results.map(x => x.partWeight)) * 0.98;
                const maxW = Math.max(...results.map(x => x.partWeight));
                const pct = ((r.partWeight - minW) / (maxW - minW + 0.01)) * 100;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs w-12 text-right font-mono">{r.holdTime.toFixed(1)}s</span>
                    <div className="flex-1 bg-muted rounded h-5 overflow-hidden relative">
                      <div
                        className={`h-full rounded transition-all ${r.sealed ? 'bg-green-500/70' : 'bg-primary/60'}`}
                        style={{ width: `${Math.max(pct, 4)}%` }}
                      />
                      {r.sealed && i === results.findIndex(x => x.sealed) && (
                        <div className="absolute inset-y-0 flex items-center" style={{ left: `${Math.max(pct, 4)}%` }}>
                          <div className="w-px h-full bg-green-500" />
                          <span className="text-[9px] text-green-500 ml-1 whitespace-nowrap font-medium">← seal point</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs w-16 font-mono">{r.partWeight.toFixed(2)}g</span>
                  </div>
                );
              })}
            </div>

            {/* Back to edit */}
            <div className="flex gap-2 pt-1">
              <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                ← Edit Data
              </Button>
              <Button variant="outline" onClick={handleReset}>Start Over</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
