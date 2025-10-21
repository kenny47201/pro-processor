import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Thermometer, Clock, Gauge, BarChart3 } from "lucide-react";
import BarrelHeatCalculator from "@/components/calculators/BarrelHeatCalculator";

const StartupSection = () => {
  const [tonnageInputs, setTonnageInputs] = useState({
    projectedArea: "",
    injectionPressure: "",
    safetyFactor: "1.2"
  });

  const [shotSizeInputs, setShotSizeInputs] = useState({
    partWeight: "",
    runnerWeight: "",
    cushion: "3"
  });

  const [barrelInputs, setBarrelInputs] = useState({
    material: "",
    suggestedTemp: "",
    capacity: "",
    heaterBands: ""
  });

  const calculateTonnage = () => {
    const area = parseFloat(tonnageInputs.projectedArea);
    const pressure = parseFloat(tonnageInputs.injectionPressure);
    const safety = parseFloat(tonnageInputs.safetyFactor);
    
    if (area && pressure && safety) {
      return ((area * pressure * safety) / 1000).toFixed(1);
    }
    return "";
  };

  const calculateShotSize = () => {
    const part = parseFloat(shotSizeInputs.partWeight);
    const runner = parseFloat(shotSizeInputs.runnerWeight);
    const cushion = parseFloat(shotSizeInputs.cushion);
    
    if (part && runner && cushion) {
      const total = part + runner;
      return (total + (total * cushion / 100)).toFixed(2);
    }
    return "";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold gradient-text-primary">Sample/Startup</h2>
        <p className="text-muted-foreground">Calculators and optimization tools for injection molding startup</p>
      </div>

      <Tabs defaultValue="calculators" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculators">Calculators</TabsTrigger>
          <TabsTrigger value="barrel-heat">Barrel Heat</TabsTrigger>
          <TabsTrigger value="studies">Studies & Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="calculators" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tonnage Calculator */}
            <Card className="industrial-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  Tonnage Calculator
                </CardTitle>
                <CardDescription>
                  Calculate required clamping force
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projected-area">Projected Area (in²)</Label>
                  <Input
                    id="projected-area"
                    value={tonnageInputs.projectedArea}
                    onChange={(e) => setTonnageInputs(prev => ({...prev, projectedArea: e.target.value}))}
                    placeholder="Enter projected area"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="injection-pressure">Injection Pressure (psi)</Label>
                  <Input
                    id="injection-pressure"
                    value={tonnageInputs.injectionPressure}
                    onChange={(e) => setTonnageInputs(prev => ({...prev, injectionPressure: e.target.value}))}
                    placeholder="Enter injection pressure"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="safety-factor">Safety Factor</Label>
                  <Input
                    id="safety-factor"
                    value={tonnageInputs.safetyFactor}
                    onChange={(e) => setTonnageInputs(prev => ({...prev, safetyFactor: e.target.value}))}
                    placeholder="1.2"
                  />
                </div>
                {calculateTonnage() && (
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground">Required Tonnage:</p>
                    <p className="text-2xl font-bold text-primary">{calculateTonnage()} tons</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shot Size Calculator */}
            <Card className="industrial-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Shot Size Calculator
                </CardTitle>
                <CardDescription>
                  Estimate required shot size
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="part-weight">Part Weight (g)</Label>
                  <Input
                    id="part-weight"
                    value={shotSizeInputs.partWeight}
                    onChange={(e) => setShotSizeInputs(prev => ({...prev, partWeight: e.target.value}))}
                    placeholder="Enter part weight"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="runner-weight">Runner Weight (g)</Label>
                  <Input
                    id="runner-weight"
                    value={shotSizeInputs.runnerWeight}
                    onChange={(e) => setShotSizeInputs(prev => ({...prev, runnerWeight: e.target.value}))}
                    placeholder="Enter runner weight"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cushion">Cushion (%)</Label>
                  <Input
                    id="cushion"
                    value={shotSizeInputs.cushion}
                    onChange={(e) => setShotSizeInputs(prev => ({...prev, cushion: e.target.value}))}
                    placeholder="3"
                  />
                </div>
                {calculateShotSize() && (
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <p className="text-sm text-muted-foreground">Required Shot Size:</p>
                    <p className="text-2xl font-bold text-accent">{calculateShotSize()} g</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Barrel Temperature Calculator */}
            <Card className="industrial-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5" />
                  Barrel Temperature Profile
                </CardTitle>
                <CardDescription>
                  Calculate heating profile based on material and capacity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    value={barrelInputs.material}
                    onChange={(e) => setBarrelInputs(prev => ({...prev, material: e.target.value}))}
                    placeholder="e.g., ABS, PP, PC"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="suggested-temp">Suggested Temp (°F)</Label>
                  <Input
                    id="suggested-temp"
                    value={barrelInputs.suggestedTemp}
                    onChange={(e) => setBarrelInputs(prev => ({...prev, suggestedTemp: e.target.value}))}
                    placeholder="Enter manufacturer's suggested temp"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Barrel Capacity (%)</Label>
                  <Input
                    id="capacity"
                    value={barrelInputs.capacity}
                    onChange={(e) => setBarrelInputs(prev => ({...prev, capacity: e.target.value}))}
                    placeholder="Capacity utilization"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heater-bands">Number of Heater Bands</Label>
                  <Input
                    id="heater-bands"
                    value={barrelInputs.heaterBands}
                    onChange={(e) => setBarrelInputs(prev => ({...prev, heaterBands: e.target.value}))}
                    placeholder="Enter number of bands"
                  />
                </div>
                <Button className="w-full">Generate Temperature Profile</Button>
              </CardContent>
            </Card>

            {/* Cool Time Calculator */}
            <Card className="industrial-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Cool Time Calculator
                </CardTitle>
                <CardDescription>
                  Optimize cooling time for part quality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Part Thickness (mm)</Label>
                  <Input placeholder="Enter max part thickness" />
                </div>
                <div className="space-y-2">
                  <Label>Material Thermal Diffusivity</Label>
                  <Input placeholder="Material property" />
                </div>
                <div className="space-y-2">
                  <Label>Mold Temperature (°C)</Label>
                  <Input placeholder="Current mold temp" />
                </div>
                <div className="space-y-2">
                  <Label>Ejection Temperature (°C)</Label>
                  <Input placeholder="Target ejection temp" />
                </div>
                <Button className="w-full">Calculate Cool Time</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="barrel-heat" className="space-y-6">
          <BarrelHeatCalculator />
        </TabsContent>

        <TabsContent value="studies" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Study Cards */}
            {[
              { title: "Viscosity Curve", description: "Material flow characteristics" },
              { title: "Pack & Hold Study", description: "Optimize packing pressure and time" },
              { title: "Cool Time Optimization", description: "Balance cycle time and quality" },
              { title: "Gate Seal Study", description: "Determine optimal gate seal time" },
              { title: "Short Shot Study", description: "Progressive fill analysis" },
              { title: "Parts Per Hour Analysis", description: "Production rate calculations" }
            ].map((study, index) => (
              <Card key={index} className="industrial-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    {study.title}
                  </CardTitle>
                  <CardDescription>{study.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Launch Study
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StartupSection;