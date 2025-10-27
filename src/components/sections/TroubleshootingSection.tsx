import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Wrench, MessageSquare, Search, Bot, FileText, Plus, BookOpen } from "lucide-react";
import blackSpecksImg from "@/assets/defects/black-specks.jpg";
import blushImg from "@/assets/defects/blush.jpg";
import burnsImg from "@/assets/defects/burns.jpg";
import ventDepthChartImg from "@/assets/defects/vent-depth-chart.jpg";
import volcanoImg from "@/assets/defects/volcano.jpg";

const TroubleshootingSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [newNote, setNewNote] = useState("");
  const [showMaterialSelector, setShowMaterialSelector] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);

  const materials = [
    'Polypropylene (PP)',
    'Polyethylene (PE)',
    'Polystyrene (PS)',
    'ABS',
    'Nylon (PA)',
    'Polycarbonate (PC)',
    'PET',
    'Acetal (POM)',
    'TPU',
    'PVC'
  ];

  const materialGuides: Record<string, {
    processing: {
      dryingTemp: string;
      dryingTime: string;
      meltTemp: string;
      moldTemp: string;
      injectionPressure: string;
      backPressure: string;
      screwSpeed: string;
    };
    troubleshooting: Array<{
      issue: string;
      cause: string;
      solution: string;
      image?: string;
    }>;
  }> = {
    'Polypropylene (PP)': {
      processing: {
        dryingTemp: 'Not typically required',
        dryingTime: 'N/A',
        meltTemp: '400-450°F (204-232°C)',
        moldTemp: '40-80°F (4-27°C)',
        injectionPressure: '10,000-20,000 psi',
        backPressure: '50-200 psi',
        screwSpeed: '100-300 rpm'
      },
      troubleshooting: [
        { 
          issue: 'Black Specks', 
          cause: 'Contamination in material, heater band malfunction, or material degradation', 
          solution: 'Check surrounding area for airborne contamination, verify heater bands are working properly, clean nozzle and feed throat areas. If material changed, raise heats and run natural material to eliminate previous skin layer.',
          image: blackSpecksImg
        },
        { 
          issue: 'Blush', 
          cause: 'Too fast injection velocity washing away plastic on opposite side of gate', 
          solution: 'Slow down plastic as it enters gate, provide cold slug well before gate, increase melt and mold temperature for smoother transition.',
          image: blushImg
        },
        { 
          issue: 'Brittleness', 
          cause: 'Moisture in material, excessive or low melt temperature, contamination, or excessive regrind', 
          solution: 'Verify moisture content and dry properly. Check melt temperature - adjust if too high or too low. Inspect for contamination. Limit regrind to 25-30%. Verify gate design and location.'
        },
        { 
          issue: 'Burns', 
          cause: 'Trapped air in cavity compressed to ignition point', 
          solution: 'Reduce fill speed, verify proper transfer position at 95% full part, clean or add vents, reduce clamping force, lower melt temperature.',
          image: burnsImg
        },
        { 
          issue: 'Burns in Gates', 
          cause: 'Burrs/sharp corners at gate, gate diameter too small, injection velocity too fast, or obstruction in gate', 
          solution: 'Polish gate area eliminating sharp corners. Ensure gate size is 50-80% of nominal wall thickness. Reduce injection velocity. Check for obstructions in flow path.'
        },
        { 
          issue: 'Cloudy Parts', 
          cause: 'Contamination in material, incorrect cooling rate, or moisture', 
          solution: 'Remove contaminated material, check regrind for contaminants, clean hopper and system. Increase melt temperature. If hygroscopic, improve drying conditions. Adjust cooling rate for semi-crystalline materials.'
        },
        { 
          issue: 'Color Streaks', 
          cause: 'Material contamination, mixing issues, or degradation', 
          solution: 'Clean screw/barrel to remove skin layer from previous runs. Clean nozzle to remove dead spots. For manifold/hot tips: raise temperature 100°F on tips and 50°F on manifold, cycle 10-15 minutes, then cool down.'
        },
        { 
          issue: 'Ejector Pin Marks', 
          cause: 'Stress or deformation from concentrated ejection forces', 
          solution: 'Add more ejector pins to equalize forces. Check for undercuts. Ensure sufficient cooling. Verify proper polishing of detail features around ejector pins.'
        },
        { 
          issue: 'Degraded Polymer', 
          cause: 'Melt temperature too high, screw speed too high, or long residence time', 
          solution: 'Lower melt temperature and screw speed. Reduce residence time in barrel (use 25-75% of barrel for shot capacity). Check for over/under-dried material.'
        },
        { 
          issue: 'Fish Hooks', 
          cause: 'Cold or unmelted material dragged along flow front', 
          solution: 'Check for drool from tip. For valve gates, ensure no build-up on pin and open pin briefly before injection. Adjust injection velocity. Address flow transition points.',
          image: volcanoImg
        },
        { 
          issue: 'Flash', 
          cause: 'Damaged mold, excessive plastic pressure vs clamping force', 
          solution: 'Reduce melt temperature and injection/pack pressure. Ensure part transfers at 95% full. Increase clamp tonnage if needed. Check mold for damage, verify heaters and thermocouples.',
          image: ventDepthChartImg
        },
        { 
          issue: 'Flow Lines', 
          cause: 'Plastic melt flow slowing and freezing causing ripples', 
          solution: 'Increase injection speed and mold temperature. Increase melt temperature to lower viscosity. Increase pack pressure and time to pack out ripples before skin freezes.'
        },
        { 
          issue: 'Hot Tip Drool', 
          cause: 'Over-pressured manifold system', 
          solution: 'Reduce nozzle temperature. Check for moisture in material. Increase decompression (suck back). Review and adjust back pressure. Verify shut-off nozzle is working properly.'
        },
        { 
          issue: 'Jetting', 
          cause: 'Fill rate too fast, material/mold temperature too low', 
          solution: 'Slow injection rate when going through gate, then speed up once fountain flow starts. Increase melt and mold temperature. Consider fan gate design or lengthen cold slug well.'
        },
        { 
          issue: 'Long Gates', 
          cause: 'Plastic solidifying in gate and being pulled out', 
          solution: 'Ensure tip is level with gate when heated. Increase tip temperature. Increase mold breakaway speed. Sharpen gate geometry. Check gate size and tip height.'
        },
        { 
          issue: 'Nozzle Drool', 
          cause: 'Insufficient decompression, excessive back pressure, or moisture', 
          solution: 'Add more decompression/suck back stroke and speed. Reduce back pressure. Check for moisture in material. Verify proper nozzle tip radius and orifice.'
        },
        { 
          issue: 'Parts Sticking in Mold', 
          cause: 'Over-packing, insufficient draft, or temperature issues', 
          solution: 'Reduce pack pressure and time, reestablish gate freeze. Ensure plastic is below HDT at ejection. Add more draft if possible. Increase ejection stroke.'
        },
        { 
          issue: 'Pulls/Deformation', 
          cause: 'Tooling damage, over-packing, or insufficient draft', 
          solution: 'Check for mold damage or undercuts. Reduce pack pressure. Increase mold temperature on ejection side. Verify surface finish is appropriate for material.'
        },
        { 
          issue: 'Shorts/Non-Fills', 
          cause: 'Insufficient material, premature freeze-off', 
          solution: 'Increase mold and melt temperature. Ensure sufficient shot size (screw not bottoming out). Verify proper venting. Increase gate diameter. Check for blockages and ensure sufficient pack pressure.'
        },
        { 
          issue: 'Sinks', 
          cause: 'Outside frozen skin cannot withstand shrinking forces', 
          solution: 'Increase shot size and transfer position to maintain 95% full. Increase pack pressure and time. Reduce mold temperature for thicker skin. Slow injection velocity. Review gate and runner design.'
        },
        { 
          issue: 'Splay', 
          cause: 'Molecular chain breakdown from moisture or excessive processing', 
          solution: 'Dry material properly and check feed throat for condensation. Reduce melt temperature, injection velocity, back pressure, and screw speed. Minimize residence time in barrel.'
        },
        { 
          issue: 'Sprue Sticking', 
          cause: 'Nozzle orifice larger than sprue, insufficient taper, or over-packing', 
          solution: 'Change nozzle tip so orifice is 1/64 or 1/32 smaller than sprue. Increase taper on sprue. Reduce pack time. Increase nozzle temperature. Add insulator between nozzle and mold.'
        },
        { 
          issue: 'Surface Imperfections', 
          cause: 'Low temperatures, insufficient pack, contamination, or poor venting', 
          solution: 'Increase melt and mold temperature. Increase pack pressure and injection fill rate. Clean mold surface. Ensure proper venting. Verify correct steel finish.'
        },
        { 
          issue: 'Voids', 
          cause: 'Plastic tears apart internally as it cools and shrinks', 
          solution: 'Increase pack and hold pressure/time. Heat mold to reduce cooling rate. Increase gate and runner size. Redesign part for uniform wall thickness or gate into thicker sections.'
        },
        { 
          issue: 'Warpage', 
          cause: 'Differential shrinkage from various factors', 
          solution: 'Increase pack/hold pressure and time. Balance mold temperatures between halves. Ensure material below HDT at ejection. Profile pack pressure if needed. Increase cooling time. Consider gate location.'
        },
        { 
          issue: 'Weld Lines', 
          cause: 'Two melt fronts meet and hesitate, creating weak spot', 
          solution: 'Increase melt and mold temperature for better bonding. Increase pack pressure at end of fill. Add vents at weld line location. Increase fill rate for shear thinning. Review gate location.'
        }
      ]
    },
    'Polyethylene (PE)': {
      processing: {
        dryingTemp: 'Not typically required',
        dryingTime: 'N/A',
        meltTemp: '350-450°F (177-232°C)',
        moldTemp: '30-70°F (−1-21°C)',
        injectionPressure: '8,000-15,000 psi',
        backPressure: '25-150 psi',
        screwSpeed: '100-250 rpm'
      },
      troubleshooting: [
        { issue: 'Flow lines', cause: 'Low melt temperature', solution: 'Increase barrel temperature' },
        { issue: 'Flashing', cause: 'Excessive pressure', solution: 'Reduce injection pressure and clamp force' },
        { issue: 'Sticking', cause: 'Mold temp too low', solution: 'Increase mold temperature' }
      ]
    },
    'Polystyrene (PS)': {
      processing: {
        dryingTemp: '150-180°F (65-82°C)',
        dryingTime: '2-3 hours',
        meltTemp: '380-450°F (193-232°C)',
        moldTemp: '40-80°F (4-27°C)',
        injectionPressure: '10,000-20,000 psi',
        backPressure: '100-300 psi',
        screwSpeed: '50-200 rpm'
      },
      troubleshooting: [
        { issue: 'Brittle parts', cause: 'Material degradation', solution: 'Reduce melt temp and residence time' },
        { issue: 'Poor surface', cause: 'Contamination', solution: 'Purge thoroughly, check hopper' },
        { issue: 'Voids', cause: 'Trapped air', solution: 'Increase injection speed, add venting' }
      ]
    },
    'ABS': {
      processing: {
        dryingTemp: '180-200°F (82-93°C)',
        dryingTime: '2-4 hours',
        meltTemp: '400-500°F (204-260°C)',
        moldTemp: '120-180°F (49-82°C)',
        injectionPressure: '10,000-20,000 psi',
        backPressure: '50-500 psi',
        screwSpeed: '50-150 rpm'
      },
      troubleshooting: [
        { issue: 'Weld lines', cause: 'Cold material meeting', solution: 'Increase melt temp and injection speed' },
        { issue: 'Burn marks', cause: 'Air entrapment', solution: 'Add venting, reduce injection speed' },
        { issue: 'Warpage', cause: 'Stress from cooling', solution: 'Increase mold temp, optimize gate location' }
      ]
    },
    'Nylon (PA)': {
      processing: {
        dryingTemp: '180-200°F (82-93°C)',
        dryingTime: '4-8 hours',
        meltTemp: '450-550°F (232-288°C)',
        moldTemp: '140-200°F (60-93°C)',
        injectionPressure: '15,000-25,000 psi',
        backPressure: '100-500 psi',
        screwSpeed: '50-150 rpm'
      },
      troubleshooting: [
        { issue: 'Brittleness', cause: 'Material too dry', solution: 'Ensure moisture content at 0.2-0.3%' },
        { issue: 'Voids/bubbles', cause: 'Moisture or gas', solution: 'Increase drying time, reduce melt temp' },
        { issue: 'Flash', cause: 'Low viscosity', solution: 'Reduce melt temp, increase clamp force' }
      ]
    },
    'Polycarbonate (PC)': {
      processing: {
        dryingTemp: '250-280°F (121-138°C)',
        dryingTime: '4-6 hours',
        meltTemp: '550-650°F (288-343°C)',
        moldTemp: '180-230°F (82-110°C)',
        injectionPressure: '12,000-20,000 psi',
        backPressure: '200-800 psi',
        screwSpeed: '40-80 rpm'
      },
      troubleshooting: [
        { issue: 'Optical defects', cause: 'Contamination or stress', solution: 'Ensure clean material, optimize cooling' },
        { issue: 'Black specks', cause: 'Degradation', solution: 'Reduce residence time, lower temp' },
        { issue: 'Cracking', cause: 'Stress or moisture', solution: 'Anneal parts, improve drying' }
      ]
    },
    'PET': {
      processing: {
        dryingTemp: '300-350°F (149-177°C)',
        dryingTime: '4-6 hours',
        meltTemp: '490-570°F (254-299°C)',
        moldTemp: '40-140°F (4-60°C)',
        injectionPressure: '12,000-20,000 psi',
        backPressure: '100-500 psi',
        screwSpeed: '50-120 rpm'
      },
      troubleshooting: [
        { issue: 'Haze', cause: 'Moisture or contamination', solution: 'Increase drying time, purge system' },
        { issue: 'Crystallization', cause: 'Slow cooling', solution: 'Reduce mold temp, increase cooling time' },
        { issue: 'Brittleness', cause: 'Over-drying', solution: 'Reduce drying time or temperature' }
      ]
    },
    'Acetal (POM)': {
      processing: {
        dryingTemp: '180-200°F (82-93°C)',
        dryingTime: '2-3 hours',
        meltTemp: '350-410°F (177-210°C)',
        moldTemp: '160-200°F (71-93°C)',
        injectionPressure: '10,000-20,000 psi',
        backPressure: '50-300 psi',
        screwSpeed: '80-150 rpm'
      },
      troubleshooting: [
        { issue: 'Formaldehyde odor', cause: 'Degradation', solution: 'Reduce barrel temp and residence time' },
        { issue: 'Flash', cause: 'Material too hot', solution: 'Lower melt temp, increase clamp force' },
        { issue: 'Sink marks', cause: 'Insufficient packing', solution: 'Increase pack pressure and time' }
      ]
    },
    'TPU': {
      processing: {
        dryingTemp: '200-230°F (93-110°C)',
        dryingTime: '2-4 hours',
        meltTemp: '350-420°F (177-216°C)',
        moldTemp: '40-80°F (4-27°C)',
        injectionPressure: '8,000-15,000 psi',
        backPressure: '50-200 psi',
        screwSpeed: '40-100 rpm'
      },
      troubleshooting: [
        { issue: 'Bubbles', cause: 'Moisture', solution: 'Ensure thorough drying' },
        { issue: 'Poor surface', cause: 'Mold temp too low', solution: 'Increase mold temperature' },
        { issue: 'Sticking', cause: 'Excessive mold release', solution: 'Reduce or eliminate mold release agent' }
      ]
    },
    'PVC': {
      processing: {
        dryingTemp: 'Not typically required',
        dryingTime: 'N/A',
        meltTemp: '320-400°F (160-204°C)',
        moldTemp: '40-80°F (4-27°C)',
        injectionPressure: '10,000-20,000 psi',
        backPressure: '50-300 psi',
        screwSpeed: '50-100 rpm'
      },
      troubleshooting: [
        { issue: 'Degradation', cause: 'Temperature too high', solution: 'Reduce barrel temp, minimize residence time' },
        { issue: 'Poor color', cause: 'Heat degradation', solution: 'Lower processing temp, add stabilizers' },
        { issue: 'Brittleness', cause: 'Insufficient plasticizer', solution: 'Check material formulation' }
      ]
    }
  };

  const commonDefects = [
    {
      name: "Core Flash",
      causes: ["Excessive injection pressure", "Worn mold", "Insufficient clamping force"],
      remedies: ["Reduce injection pressure", "Repair/replace mold", "Increase clamp tonnage"],
    },
    {
      name: "Short Shot",
      causes: ["Insufficient material", "Low injection pressure", "Cold material"],
      remedies: ["Increase shot size", "Increase injection pressure", "Raise barrel temperature"],
    },
    {
      name: "Sink Marks",
      causes: ["Thick sections", "Insufficient packing", "High melt temperature"],
      remedies: ["Optimize wall thickness", "Increase pack pressure", "Reduce melt temp"],
    },
    {
      name: "Warpage",
      causes: ["Uneven cooling", "Material stress", "Gate placement"],
      remedies: ["Balance cooling", "Optimize process", "Review gate location"],
    },
  ];

  const machineProblems = [
    {
      category: "Hydraulic",
      issues: [
        { problem: "Slow cycle time", solution: "Check hydraulic fluid level and filter" },
        { problem: "Pressure loss", solution: "Inspect seals and replace if worn" },
        { problem: "Overheating", solution: "Check cooling system and oil condition" },
      ],
    },
    {
      category: "Electrical",
      issues: [
        { problem: "Heater failure", solution: "Test heater bands with multimeter" },
        { problem: "Sensor malfunction", solution: "Calibrate or replace temperature sensors" },
        { problem: "Control issues", solution: "Check wiring connections and software" },
      ],
    },
    {
      category: "Mechanical",
      issues: [
        { problem: "Screw wear", solution: "Inspect screw and barrel, replace if needed" },
        { problem: "Clamp problems", solution: "Check toggle mechanism and lubrication" },
        { problem: "Ejector issues", solution: "Verify ejector pin alignment and function" },
      ],
    },
  ];

  const publicNotes = [
    {
      user: "John Smith",
      date: "2024-01-15",
      issue: "Weld line on ABS parts",
      solution: "Increased melt temp by 10°F and injection speed by 15%. Eliminated weld lines completely.",
      machine: "Haitian MA1200",
    },
    {
      user: "Sarah Johnson",
      date: "2024-01-14",
      issue: "Inconsistent part weight",
      solution:
        "Found worn check ring causing material backflow. Replaced check ring and weights are now consistent ±0.2g.",
      machine: "Engel e-motion 440",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold gradient-text-primary">Troubleshooting & Defects</h2>
        <p className="text-muted-foreground">Comprehensive problem-solving resources and knowledge base</p>
      </div>

      <Tabs defaultValue="defects" className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <TabsList className="h-auto p-1">
            <TabsTrigger value="defects" className="flex-col h-16 px-4 gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs font-medium">Defects</span>
            </TabsTrigger>
          </TabsList>
          <TabsList className="h-auto p-1">
            <TabsTrigger value="machine" className="flex-col h-16 px-4 gap-2">
              <Wrench className="h-4 w-4" />
              <span className="text-xs font-medium">Machine Issues</span>
            </TabsTrigger>
          </TabsList>
          <TabsList className="h-auto p-1">
            <TabsTrigger value="knowledge" className="flex-col h-16 px-4 gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="text-xs font-medium">Knowledge</span>
            </TabsTrigger>
          </TabsList>
          <TabsList className="h-auto p-1">
            <TabsTrigger value="ai-help" className="flex-col h-16 px-4 gap-2">
              <Bot className="h-4 w-4" />
              <span className="text-xs font-medium">AI Assistant</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="defects" className="space-y-6">
          <Card className="industrial-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Injection Molding Defects Database
              </CardTitle>
              <CardDescription>Common defects, causes, and remedies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search defects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {commonDefects
                  .filter((defect) => defect.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((defect, index) => (
                    <Card key={index} className="border-l-4 border-l-accent">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{defect.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h4 className="font-medium text-destructive mb-2">Common Causes:</h4>
                          <div className="flex flex-wrap gap-1">
                            {defect.causes.map((cause, i) => (
                              <Badge key={i} variant="destructive" className="text-xs">
                                {cause}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-success mb-2">Remedies:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {defect.remedies.map((remedy, i) => (
                              <li key={i}>{remedy}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes Section for Defects */}
          <Card className="industrial-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Defects Notes
              </CardTitle>
              <CardDescription>Share your insights about defect solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <Card className="border-dashed border-accent">
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-3">Add Defect Note</h3>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Describe a defect issue and solution..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={3}
                    />
                    <Button size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Share Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="machine" className="space-y-6">
          <Card className="industrial-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Machine Problem Resolution
              </CardTitle>
              <CardDescription>
                Systematic troubleshooting for mechanical, electrical, and hydraulic issues
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {machineProblems.map((category, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Badge variant="outline">{category.category}</Badge>
                    Issues
                  </h3>
                  <div className="grid gap-3">
                    {category.issues.map((issue, i) => (
                      <Card key={i} className="border-l-4 border-l-primary">
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{issue.problem}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{issue.solution}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {index < machineProblems.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notes Section for Machine Issues */}
          <Card className="industrial-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Machine Issues Notes
              </CardTitle>
              <CardDescription>Share your machine troubleshooting insights</CardDescription>
            </CardHeader>
            <CardContent>
              <Card className="border-dashed border-accent">
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-3">Add Machine Note</h3>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Describe a machine issue and solution..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={3}
                    />
                    <Button size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Share Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6">
          <Card className="industrial-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Troubleshooting Knowledge Base
              </CardTitle>
              <CardDescription>
                Comprehensive guides for electrical, mechanical, and molding troubleshooting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <Button variant="industrial" className="h-auto p-6 flex-col items-start w-full">
                  <Wrench className="h-8 w-8 mb-3" />
                  <span className="font-medium text-lg w-full">Mechanical Troubleshooting</span>
                  <span className="text-xs sm:text-sm text-left text-muted-foreground mt-2 w-full break-words leading-relaxed">
                    Step-by-step procedures for mechanical components
                  </span>
                </Button>
                <Button variant="industrial" className="h-auto p-6 flex-col items-start w-full">
                  <AlertTriangle className="h-8 w-8 mb-3" />
                  <span className="font-medium text-lg w-full">Electrical Diagnostics</span>
                  <span className="text-sm text-left text-muted-foreground mt-2 w-full break-words">
                    Systematic approach to electrical issues
                  </span>
                </Button>
                {!showMaterialSelector && !selectedMaterial ? (
                  <Button 
                    variant="industrial" 
                    className="h-auto p-6 flex-col items-start w-full"
                    onClick={() => setShowMaterialSelector(true)}
                  >
                    <FileText className="h-8 w-8 mb-3" />
                    <span className="font-medium text-lg w-full">Molding Process Guide</span>
                    <span className="text-sm text-left text-muted-foreground mt-2 w-full break-words">
                      Process optimization and problem solving
                    </span>
                  </Button>
                ) : showMaterialSelector && !selectedMaterial ? (
                  <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Select Material</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setShowMaterialSelector(false)}
                        >
                          Back
                        </Button>
                      </div>
                      <CardDescription>Choose a plastic material to view processing and troubleshooting guides</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {materials.map((material) => (
                          <Button
                            key={material}
                            variant="outline"
                            className="h-auto p-4 justify-start"
                            onClick={() => {
                              setSelectedMaterial(material);
                              setShowMaterialSelector(false);
                            }}
                          >
                            {material}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : selectedMaterial && materialGuides[selectedMaterial] ? (
                  <div className="space-y-4">
                    <Card className="border-l-4 border-l-primary">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{selectedMaterial} - Processing Guide</CardTitle>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedMaterial(null);
                              setShowMaterialSelector(true);
                            }}
                          >
                            Back to Materials
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Drying Temperature</h4>
                            <p className="font-semibold">{materialGuides[selectedMaterial].processing.dryingTemp}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Drying Time</h4>
                            <p className="font-semibold">{materialGuides[selectedMaterial].processing.dryingTime}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Melt Temperature</h4>
                            <p className="font-semibold">{materialGuides[selectedMaterial].processing.meltTemp}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Mold Temperature</h4>
                            <p className="font-semibold">{materialGuides[selectedMaterial].processing.moldTemp}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Injection Pressure</h4>
                            <p className="font-semibold">{materialGuides[selectedMaterial].processing.injectionPressure}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Back Pressure</h4>
                            <p className="font-semibold">{materialGuides[selectedMaterial].processing.backPressure}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Screw Speed</h4>
                            <p className="font-semibold">{materialGuides[selectedMaterial].processing.screwSpeed}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-accent">
                      <CardHeader>
                        <CardTitle>{selectedMaterial} - Troubleshooting Guide</CardTitle>
                        <CardDescription>Common issues and solutions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {materialGuides[selectedMaterial].troubleshooting.map((item, index) => (
                            <div key={index} className="space-y-3">
                              {item.image && (
                                <div className="rounded-lg overflow-hidden border border-border">
                                  <img 
                                    src={item.image} 
                                    alt={item.issue}
                                    className="w-full h-auto object-cover"
                                  />
                                </div>
                              )}
                              <div className="border-l-2 border-l-muted pl-4 space-y-2">
                                <h4 className="font-medium text-destructive">{item.issue}</h4>
                                <div className="text-sm space-y-1">
                                  <p><span className="font-medium">Cause:</span> {item.cause}</p>
                                  <p><span className="font-medium text-success">Solution:</span> {item.solution}</p>
                                </div>
                              </div>
                              {index < materialGuides[selectedMaterial].troubleshooting.length - 1 && (
                                <Separator />
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : null}
              </div>

              <div className="space-y-4">
                {publicNotes.map((note, index) => (
                  <Card key={index} className="border-l-4 border-l-info">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{note.issue}</h4>
                          <p className="text-sm text-muted-foreground">
                            {note.user} • {note.date} • {note.machine}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm">{note.solution}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-help" className="space-y-6">
          <Card className="industrial-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Assistant
              </CardTitle>
              <CardDescription>Get expert help with injection molding questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Textarea
                  placeholder="Ask me about injection molding problems, process optimization, material properties, or troubleshooting..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  rows={4}
                />
                <Button className="w-full">
                  <Bot className="h-4 w-4 mr-2" />
                  Get AI Assistance
                </Button>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> To enable AI assistance, you'll need to connect to Supabase and configure API
                  access.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TroubleshootingSection;
