import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Thermometer, RotateCcw } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const BarrelHeatCalculator = () => {
  const [material, setMaterial] = useState('');
  const [barrelCapacity, setBarrelCapacity] = useState('');
  const [heaterBands, setHeaterBands] = useState(4);
  const [results, setResults] = useState<{
    material: string;
    barrelCapacity: string;
    heaterBands: number;
    temperatures: number[];
    profile: string;
  } | null>(null);

  // Material temperature data (middle of range in Fahrenheit)
  const materials: Record<string, number> = {
    'Polypropylene (PP)': 425,
    'Polyethylene (PE)': 400,
    'Polystyrene (PS)': 400,
    'ABS': 450,
    'Nylon (PA)': 500,
    'Polycarbonate (PC)': 575,
    'PET': 500,
    'Acetal (POM)': 375,
    'TPU': 375,
    'PVC': 350
  };

  const calculateTemperatures = () => {
    if (!material || !barrelCapacity || heaterBands < 2) {
      return;
    }

    const baseTemp = materials[material];
    let temperatures: number[] = [];

    if (barrelCapacity === '10-35') {
      // ramp up slope: feed throat (lower) to nozzle (higher)
      const feedTemp = baseTemp - 25;
      const nozzleTemp = baseTemp + 25;
      const tempDiff = feedTemp - nozzleTemp;
      const increment = tempDiff / (heaterBands - 1);

      for (let i = 0; i < heaterBands; i++) {
        temperatures.push(Math.round(feedTemp - (increment * i)));
      }
    } else if (barrelCapacity === '35-75') {
      // Flat profile: all same temperature
      for (let i = 0; i < heaterBands; i++) {
        temperatures.push(baseTemp);
      }
    } else if (barrelCapacity === '75-90') {
      // Reverse slope: feed throat (higher) to nozzle (lower)
      const feedTemp = baseTemp + 25;
      const nozzleTemp = baseTemp - 25;
      const tempDiff = nozzleTemp - feedTemp;
      const increment = tempDiff / (heaterBands - 1);

      for (let i = 0; i < heaterBands; i++) {
        temperatures.push(Math.round(feedTemp + (increment * i)));
      }
    }

    setResults({
      material,
      barrelCapacity,
      heaterBands,
      temperatures,
      profile: barrelCapacity === '10-35' ? 'Ramp Up Curve' : 
               barrelCapacity === '35-75' ? 'Flat Profile' : 
               'Ramp Down Curve'
    });
  };

  const reset = () => {
    setMaterial('');
    setBarrelCapacity('');
    setHeaterBands(4);
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <Card className="industrial-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-primary" />
            Barrel Heat Profile Calculator
          </CardTitle>
          <CardDescription>
            Calculate optimal temperature profile based on material and barrel capacity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Material Selection */}
          <div className="space-y-2">
            <Label htmlFor="material-select" className="text-sm font-semibold">
              Material
            </Label>
            <select
              id="material-select"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select Material</option>
              {Object.keys(materials).map((mat) => (
                <option key={mat} value={mat}>
                  {mat}
                </option>
              ))}
            </select>
          </div>

          {/* Barrel Capacity Usage */}
          <div className="space-y-2">
            <Label htmlFor="capacity-select" className="text-sm font-semibold">
              Barrel Capacity Usage
            </Label>
            <select
              id="capacity-select"
              value={barrelCapacity}
              onChange={(e) => setBarrelCapacity(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select Capacity Range</option>
              <option value="10-35">10% - 35% (Ramp Up Curve)</option>
              <option value="35-75">35% - 75% (Flat Profile)</option>
              <option value="75-90">75% - 90% (Ramp Down Curve)</option>
            </select>
          </div>

          {/* Number of Heater Bands */}
          <div className="space-y-2">
            <Label htmlFor="heater-bands-slider" className="text-sm font-semibold flex justify-between">
              <span>Number of Heater Bands</span>
              <span className="text-primary font-mono">{heaterBands}</span>
            </Label>
            <input
              id="heater-bands-slider"
              type="range"
              min="2"
              max="16"
              value={heaterBands}
              onChange={(e) => setHeaterBands(parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>2</span>
              <span>16</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={calculateTemperatures}
              disabled={!material || !barrelCapacity}
              className="flex-1"
              variant="industrial"
            >
              <Thermometer className="h-4 w-4 mr-2" />
              Calculate Profile
            </Button>
            <Button
              onClick={reset}
              variant="outline"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card className="industrial-panel animate-fade-in">
          <CardHeader>
            <CardTitle className="gradient-text-primary">
              Temperature Profile Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary Information */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div>
                <span className="text-xs font-semibold text-muted-foreground">Material</span>
                <p className="text-sm font-medium text-foreground">{results.material}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground">Profile Type</span>
                <p className="text-sm font-medium text-foreground">{results.profile}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground">Barrel Capacity</span>
                <p className="text-sm font-medium text-foreground">{results.barrelCapacity}%</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground">Heater Bands</span>
                <p className="text-sm font-medium text-foreground">{results.heaterBands}</p>
              </div>
            </div>

            {/* Temperature Zones */}
            <div className="space-y-3">
              {results.temperatures.map((temp, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/40 transition-industrial"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 border border-primary/30">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <span className="font-semibold text-foreground font-mono text-sm">
                      {index === 0 ? 'Feed Throat' : 
                       index === results.temperatures.length - 1 ? 'Nozzle' : 
                       `Zone ${index}`}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-primary font-mono">
                    {temp}°F
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <Alert className="bg-warning/10 border-warning/30">
              <AlertDescription className="text-sm text-foreground">
                <strong>Note:</strong> Temperature differential between feed throat and nozzle 
                is maintained at 50°F maximum for optimal material flow.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BarrelHeatCalculator;
