import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, Upload, Search } from "lucide-react";

const SetupSection = () => {
  const [selections, setSelections] = useState({
    machine: "",
    mold: "",
    plate: "",
    material: "",
    color: "",
    additive: ""
  });

  const handleSelectionChange = (field: string, value: string) => {
    setSelections(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold gradient-text-primary">Setup Sheets</h2>
          <p className="text-muted-foreground">Configure and access injection molding setup parameters</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card className="industrial-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Setup Sheet Selection
          </CardTitle>
          <CardDescription>
            Select parameters to access the corresponding setup sheet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Machine</label>
              <Select onValueChange={(value) => handleSelectionChange("machine", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select machine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="haitian-ma1200">Haitian MA1200</SelectItem>
                  <SelectItem value="engel-e-motion-440">Engel e-motion 440</SelectItem>
                  <SelectItem value="arburg-270s">Arburg 270S</SelectItem>
                  <SelectItem value="milacron-magna-330">Milacron Magna 330</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mold</label>
              <Select 
                onValueChange={(value) => handleSelectionChange("mold", value)}
                disabled={!selections.machine}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mold-001">Mold-001 (4 Cavity)</SelectItem>
                  <SelectItem value="mold-002">Mold-002 (8 Cavity)</SelectItem>
                  <SelectItem value="mold-003">Mold-003 (2 Cavity)</SelectItem>
                  <SelectItem value="mold-004">Mold-004 (16 Cavity)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Plate</label>
              <Select 
                onValueChange={(value) => handleSelectionChange("plate", value)}
                disabled={!selections.mold}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select plate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard-a">Standard A</SelectItem>
                  <SelectItem value="standard-b">Standard B</SelectItem>
                  <SelectItem value="custom-c1">Custom C1</SelectItem>
                  <SelectItem value="custom-c2">Custom C2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Material</label>
              <Select 
                onValueChange={(value) => handleSelectionChange("material", value)}
                disabled={!selections.plate}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abs-high-impact">ABS High Impact</SelectItem>
                  <SelectItem value="polypropylene">Polypropylene</SelectItem>
                  <SelectItem value="nylon-6">Nylon 6</SelectItem>
                  <SelectItem value="polycarbonate">Polycarbonate</SelectItem>
                  <SelectItem value="pet">PET</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Color</label>
              <Select 
                onValueChange={(value) => handleSelectionChange("color", value)}
                disabled={!selections.material}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="custom">Custom Mix</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Additive</label>
              <Select 
                onValueChange={(value) => handleSelectionChange("additive", value)}
                disabled={!selections.color}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select additive" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="uv-stabilizer">UV Stabilizer</SelectItem>
                  <SelectItem value="flame-retardant">Flame Retardant</SelectItem>
                  <SelectItem value="glass-fiber">Glass Fiber 30%</SelectItem>
                  <SelectItem value="carbon-fiber">Carbon Fiber</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Current Selection</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(selections).map(([key, value]) => 
                value && (
                  <Badge key={key} variant="secondary" className="capitalize">
                    {key}: {value}
                  </Badge>
                )
              )}
            </div>

            {Object.values(selections).every(v => v) && (
              <Card className="border-success/20 bg-success/5">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-success" />
                      <span className="font-medium">Setup Sheet Available</span>
                    </div>
                    <Button size="sm" className="glow-primary">
                      View Setup Sheet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupSection;