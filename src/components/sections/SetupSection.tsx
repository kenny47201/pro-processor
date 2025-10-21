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
    additive: "",
  });

  const handleSelectionChange = (field: string, value: string) => {
    setSelections((prev) => ({ ...prev, [field]: value }));
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
          <CardDescription>Select parameters to access the corresponding setup sheet</CardDescription>
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
                  <SelectItem value="Press 1 KM200/390C2">Press 1 KM200/390C2</SelectItem>
                  <SelectItem value="Press 4 KM451/3000GX">Press 4 KM451/3000GX</SelectItem>
                  <SelectItem value="Press 5 KM451/3000GX">Press 5 KM451/3000GX</SelectItem>
                  <SelectItem value="Press 6 H400 RS65/60">Press 6 H400 RS65/60</SelectItem>
                  <SelectItem value="Press 7 H400 RS65/60">Press 7 H400 RS65/60</SelectItem>
                  <SelectItem value="Press 8 KM350-2000CX">Press 8 KM350-2000CX</SelectItem>
                  <SelectItem value="Press 9 KM350/1900/C2+">Press 9 KM350/1900/C2+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mold</label>
              <Select onValueChange={(value) => handleSelectionChange("mold", value)} disabled={!selections.machine}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FF02 24CRI-A/64">FF02 24CRI-A/64</SelectItem>
                  <SelectItem value="FF03 24CRO-A/64">FF03 24CRO-A/64</SelectItem>
                  <SelectItem value="FF07 24CRI-B/64">FF07 24CRI-B/64</SelectItem>
                  <SelectItem value="FF08 24CRO-B/64">FF08 24CRO-B/64</SelectItem>
                  <SelectItem value="FG03 28CRI-A/64">FG03 28CRI-A/64</SelectItem>
                  <SelectItem value="FG04 28CRO-A/64">FG04 28CRO-A/64</SelectItem>
                  <SelectItem value="FH21 33CRO-E/64">FH21 33CRO-E/64</SelectItem>
                  <SelectItem value="FH20 33CRI-E/64">FH20 33CRI-E/64</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Plate</label>
              <Select onValueChange={(value) => handleSelectionChange("plate", value)} disabled={!selections.mold}>
                <SelectTrigger>
                  <SelectValue placeholder="Select plate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Text">Text</SelectItem>
                  <SelectItem value="Pictorial">Pictorial</SelectItem>
                  <SelectItem value="Wave">Wave</SelectItem>
                  <SelectItem value="Preimeter Text">Preimeter Text</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Material</label>
              <Select onValueChange={(value) => handleSelectionChange("material", value)} disabled={!selections.plate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="B6X">B6X</SelectItem>
                  <SelectItem value="B56">B56</SelectItem>
                  <SelectItem value="B6L">B6L</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Color</label>
              <Select onValueChange={(value) => handleSelectionChange("color", value)} disabled={!selections.material}>
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural</SelectItem>
                  <SelectItem value="M1E-Black">M1E-Black</SelectItem>
                  <SelectItem value="P14-White">P14-White</SelectItem>
                  <SelectItem value="MA2-White">MA2-White</SelectItem>
                  <SelectItem value="P3A-Red">P3A-Red</SelectItem>
                  <SelectItem value="MA2-Blue">MA2-Blue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Additive</label>
              <Select onValueChange={(value) => handleSelectionChange("additive", value)} disabled={!selections.color}>
                <SelectTrigger>
                  <SelectValue placeholder="Select additive" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="K31">K31</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Current Selection</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(selections).map(
                ([key, value]) =>
                  value && (
                    <Badge key={key} variant="secondary" className="capitalize">
                      {key}: {value}
                    </Badge>
                  ),
              )}
            </div>

            {Object.values(selections).every((v) => v) && (
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
