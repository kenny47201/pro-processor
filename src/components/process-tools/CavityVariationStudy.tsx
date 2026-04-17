import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Plus, Trash2, Camera } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { calculateCavityVariation } from '@/lib/processCalculations';
import { useExport } from './ExportButton';

export function CavityVariationStudy() {
  const { ref: cardRef, ExportBtn } = useExport('Cavity-to-Cavity Weight Variation Study');
  const [weights, setWeights] = useState<string[]>(['', '', '', '']);
  const [result, setResult] = useState<ReturnType<typeof calculateCavityVariation> | null>(null);

  const handleWeightChange = (index: number, value: string) => {
    const newWeights = [...weights];
    newWeights[index] = value;
    setWeights(newWeights);
  };

  const addCavity = () => {
    setWeights([...weights, '']);
  };

  const removeCavity = (index: number) => {
    if (weights.length > 2) {
      setWeights(weights.filter((_, i) => i !== index));
    }
  };

  const handleCalculate = () => {
    const numericWeights = weights
      .map(w => parseFloat(w))
      .filter(w => !isNaN(w) && w > 0);

    if (numericWeights.length < 2) return;

    const calcResult = calculateCavityVariation(numericWeights);
    setResult(calcResult);
  };

  const handleReset = () => {
    setWeights(['', '', '', '']);
    setResult(null);
  };

  const getVariationStatus = (cv: number) => {
    if (cv <= 2) return { label: 'Excellent', variant: 'default' as const, color: 'text-green-600' };
    if (cv <= 5) return { label: 'Good', variant: 'secondary' as const, color: 'text-yellow-600' };
    if (cv <= 10) return { label: 'Marginal', variant: 'outline' as const, color: 'text-orange-600' };
    return { label: 'Poor', variant: 'destructive' as const, color: 'text-red-600' };
  };

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Cavity-to-Cavity Weight Variation Study
          </CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          Measure and analyze part weight variation across cavities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Camera className="h-4 w-4" />
          <AlertDescription>
            Take a screenshot of your results for your records — data resets on page refresh.
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <Label>Cavity Weights (g)</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {weights.map((weight, index) => (
              <div key={index} className="flex gap-1">
                <div className="flex-1">
                  <Input
                    type="number"
                    step="0.001"
                    placeholder={`Cavity ${index + 1}`}
                    value={weight}
                    onChange={(e) => handleWeightChange(index, e.target.value)}
                  />
                </div>
                {weights.length > 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => removeCavity(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={addCavity}>
            <Plus className="h-4 w-4 mr-2" />
            Add Cavity
          </Button>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            <Calculator className="h-4 w-4 mr-2" />
            Analyze
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>

        {result && result.average > 0 && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Analysis Results</h4>
              <Badge variant={getVariationStatus(result.coefficientOfVariation).variant}>
                {getVariationStatus(result.coefficientOfVariation).label} Balance
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Average Weight</p>
                <p className="text-xl font-bold text-primary">
                  {result.average.toFixed(3)} g
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Range</p>
                <p className="text-xl font-bold">
                  {result.range.toFixed(3)} g
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Std Deviation</p>
                <p className="text-xl font-bold">
                  {result.standardDeviation.toFixed(4)} g
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CV%</p>
                <p className={`text-xl font-bold ${getVariationStatus(result.coefficientOfVariation).color}`}>
                  {result.coefficientOfVariation.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Max Deviation</p>
                <p className="text-xl font-bold">
                  {result.maxDeviation.toFixed(3)} g
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Max Deviation %</p>
                <p className="text-xl font-bold">
                  ±{result.maxDeviationPercent.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Guidelines:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• CV ≤ 2%: Excellent balance, production ready</li>
                <li>• CV 2-5%: Good balance, acceptable for most applications</li>
                <li>• CV 5-10%: Marginal, may need mold maintenance or process adjustment</li>
                <li>• CV &gt; 10%: Poor balance, investigate hot runner or filling issues</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
