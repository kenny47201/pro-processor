import { useState, useEffect } from 'react';
import { useUnits } from '@/contexts/UnitSystemContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { useExport } from './ExportButton';

export function CaseProductionCalculator() {
  const { ref: cardRef, ExportBtn } = useExport('Case Production & Startup Scrap');
  const [piecesPerCase, setPiecesPerCase] = useState<string>('');
  const [cavitation, setCavitation] = useState<string>('');
  const [cycleTime, setCycleTime] = useState<string>('');
  const [scrapCycles, setScrapCycles] = useState<string>('');
  const [result, setResult] = useState<{
    shotsPerCase: number;
    casesPerHour: number;
    startupScrapCases: number;
  } | null>(null);

  const handleCalculate = () => {
    const ppc = parseFloat(piecesPerCase);
    const cav = parseFloat(cavitation);
    const cycle = parseFloat(cycleTime);
    const scrap = parseFloat(scrapCycles) || 0;

    if (isNaN(ppc) || isNaN(cav) || isNaN(cycle) || cav <= 0 || cycle <= 0 || ppc <= 0) return;

    setResult({
      shotsPerCase: ppc / cav,
      casesPerHour: (3600 / cycle) * cav,
      startupScrapCases: (scrap * cav) / ppc,
    });
  };

  const handleReset = () => {
    setPiecesPerCase('');
    setCavitation('');
    setCycleTime('');
    setScrapCycles('');
    setResult(null);
  };

  const { resetNonce } = useUnits();
  useEffect(() => { handleReset(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [resetNonce]);

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Case Production & Startup Scrap
          </CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          Shots/case, cases/hour, and startup scrap measured in cases
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ppc">Pieces per Case</Label>
            <Input
              id="ppc"
              type="number"
              step="1"
              min="1"
              placeholder="e.g., 100"
              value={piecesPerCase}
              onChange={(e) => setPiecesPerCase(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cav">Cavitation</Label>
            <Input
              id="cav"
              type="number"
              step="1"
              min="1"
              placeholder="e.g., 4"
              value={cavitation}
              onChange={(e) => setCavitation(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cycle">Cycle Time (seconds)</Label>
            <Input
              id="cycle"
              type="number"
              step="0.1"
              placeholder="e.g., 18.5"
              value={cycleTime}
              onChange={(e) => setCycleTime(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="scrap">Total Cycles Scrapped (Startup)</Label>
            <Input
              id="scrap"
              type="number"
              step="1"
              min="0"
              placeholder="e.g., 25"
              value={scrapCycles}
              onChange={(e) => setScrapCycles(e.target.value)}
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
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Shots per Case</p>
                <p className="text-xl font-bold text-primary">{result.shotsPerCase.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">pieces ÷ cavitation</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cases per Hour</p>
                <p className="text-xl font-bold text-primary">{result.casesPerHour.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">(3600 ÷ cycle) × cavitation</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Startup Scrap (Cases)</p>
                <p className="text-xl font-bold text-primary">{result.startupScrapCases.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">scrap cycles × cav ÷ pieces</p>
              </div>
            </div>

            <div className="pt-3 border-t bg-primary/5 -m-4 mt-3 p-4 rounded-b-lg">
              <p className="text-sm font-semibold text-primary mb-2">📋 Send to Scheduling / Packout</p>
              <ul className="text-xs space-y-1">
                <li>• <span className="font-semibold">Pallet build rate:</span> {result.casesPerHour.toFixed(2)} cases/hr → operator changes gaylord/pallet every {(60 / result.casesPerHour).toFixed(1)} min per case.</li>
                <li>• <span className="font-semibold">Per shift (8 hr):</span> {(result.casesPerHour * 8).toFixed(0)} cases • <span className="font-semibold">24 hr:</span> {(result.casesPerHour * 24).toFixed(0)} cases</li>
                <li>• <span className="font-semibold">Order-to-run time:</span> divide order qty (cases) by {result.casesPerHour.toFixed(2)} to get run hours.</li>
                <li>• <span className="font-semibold">Startup allowance:</span> add {result.startupScrapCases.toFixed(2)} cases to material order for startup scrap.</li>
                <li>• <span className="font-semibold">Label print qty:</span> order qty ÷ {result.shotsPerCase.toFixed(0)} shots/case × safety factor.</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
