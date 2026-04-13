import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function CycleTimeEstimator() {
  const [fillTime, setFillTime] = useState<string>('');
  const [packHoldTime, setPackHoldTime] = useState<string>('');
  const [coolingTime, setCoolingTime] = useState<string>('');
  const [moldOpenTime, setMoldOpenTime] = useState<string>('1.5');
  const [ejectionTime, setEjectionTime] = useState<string>('1.0');
  const [moldCloseTime, setMoldCloseTime] = useState<string>('1.5');
  const [robotTime, setRobotTime] = useState<string>('0');
  const [result, setResult] = useState<{
    totalCycle: number; dryTime: number; plastTime: number;
    fillPct: number; packPct: number; coolPct: number; moldPct: number;
  } | null>(null);

  const handleCalculate = () => {
    const fill = parseFloat(fillTime) || 0;
    const pack = parseFloat(packHoldTime) || 0;
    const cool = parseFloat(coolingTime) || 0;
    const open = parseFloat(moldOpenTime) || 0;
    const eject = parseFloat(ejectionTime) || 0;
    const close = parseFloat(moldCloseTime) || 0;
    const robot = parseFloat(robotTime) || 0;

    if (fill + pack + cool <= 0) return;

    const dryTime = open + eject + close + robot;
    const totalCycle = fill + pack + cool + dryTime;
    const plastTime = cool; // plasticating typically during cooling

    setResult({
      totalCycle,
      dryTime,
      plastTime,
      fillPct: (fill / totalCycle) * 100,
      packPct: (pack / totalCycle) * 100,
      coolPct: (cool / totalCycle) * 100,
      moldPct: (dryTime / totalCycle) * 100,
    });
  };

  const handleReset = () => {
    setFillTime(''); setPackHoldTime(''); setCoolingTime('');
    setMoldOpenTime('1.5'); setEjectionTime('1.0'); setMoldCloseTime('1.5');
    setRobotTime('0'); setResult(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Cycle Time Breakdown
        </CardTitle>
        <CardDescription>
          Total Cycle = Fill + Pack/Hold + Cooling + Mold Open/Close/Eject
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Fill Time (s)
              <Tooltip><TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger>
                <TooltipContent>Time from injection start to velocity-to-pressure transfer</TooltipContent>
              </Tooltip>
            </Label>
            <Input type="number" step="0.1" placeholder="e.g., 1.5" value={fillTime} onChange={(e) => setFillTime(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Pack/Hold Time (s)</Label>
            <Input type="number" step="0.1" placeholder="e.g., 8.0" value={packHoldTime} onChange={(e) => setPackHoldTime(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Cooling Time (s)</Label>
            <Input type="number" step="0.1" placeholder="e.g., 15.0" value={coolingTime} onChange={(e) => setCoolingTime(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Mold Open Time (s)</Label>
            <Input type="number" step="0.1" placeholder="1.5" value={moldOpenTime} onChange={(e) => setMoldOpenTime(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Ejection Time (s)</Label>
            <Input type="number" step="0.1" placeholder="1.0" value={ejectionTime} onChange={(e) => setEjectionTime(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Mold Close Time (s)</Label>
            <Input type="number" step="0.1" placeholder="1.5" value={moldCloseTime} onChange={(e) => setMoldCloseTime(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Robot/Delay Time (s)</Label>
            <Input type="number" step="0.5" placeholder="0" value={robotTime} onChange={(e) => setRobotTime(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            <Calculator className="h-4 w-4 mr-2" /> Calculate
          </Button>
          <Button variant="outline" onClick={handleReset}>Reset</Button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Cycle Time</p>
                <p className="text-2xl font-bold text-primary">{result.totalCycle.toFixed(1)} sec</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Parts/Hour (1 cav)</p>
                <p className="text-2xl font-bold text-primary">{(3600 / result.totalCycle).toFixed(0)}</p>
              </div>
            </div>

            <div className="pt-3 border-t space-y-1">
              <Label className="text-xs text-muted-foreground">Cycle Breakdown</Label>
              {[
                { label: 'Fill', pct: result.fillPct, color: 'bg-blue-500' },
                { label: 'Pack/Hold', pct: result.packPct, color: 'bg-green-500' },
                { label: 'Cooling', pct: result.coolPct, color: 'bg-cyan-500' },
                { label: 'Mold Motion', pct: result.moldPct, color: 'bg-orange-500' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-xs w-20">{item.label}</span>
                  <div className="flex-1 bg-muted rounded h-4 overflow-hidden">
                    <div className={`h-full rounded ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                  <span className="text-xs w-12 text-right">{item.pct.toFixed(0)}%</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                💡 Cooling typically represents 60-80% of total cycle. Optimize cooling channels for the largest cycle reduction.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
