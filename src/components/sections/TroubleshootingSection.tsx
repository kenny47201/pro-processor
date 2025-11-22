import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Wrench, 
  MessageSquare, 
  Search, 
  Bot,
  FileText,
  Plus,
  BookOpen,
  ArrowLeft,
  ChevronRight
} from "lucide-react";

const TroubleshootingSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [newNote, setNewNote] = useState("");
  const [selectedDefect, setSelectedDefect] = useState<string | null>(null);

  const commonDefects = [
    { name: "Flow lines" },
    { name: "Jetting" },
    { name: "Weld lines" },
    { name: "Sink marks" },
    { name: "Voids" },
    { name: "Burn marks" },
    { name: "Discoloration" },
    { name: "Orange peel" },
    { name: "Gloss variation" },
    { name: "Silver streaking" },
    { name: "Blushing" },
    { name: "Waviness" },
    { name: "Parting line mismatch" },
    { name: "Drag marks" },
    { name: "Core shift" },
    { name: "Short shot" },
    { name: "Flash" },
    { name: "Warpage" },
    { name: "Undercut deformation" },
    { name: "Ejector pin marks" },
    { name: "Excessive shrinkage" },
    { name: "Critical dimension failure" },
    { name: "Brittle fracture" },
    { name: "Wrinkling" },
    { name: "Non-uniform wall effects" },
    { name: "Weak weld line strength" },
    { name: "Delamination" },
    { name: "Material degradation" },
    { name: "Stress cracking" },
    { name: "Creep deformation" },
    { name: "Layering" },
    { name: "Fiber pull-out" },
    { name: "Blisters" },
    { name: "Internal voids" },
    { name: "Cold slug inclusion" },
    { name: "Inclusions / contamination" },
    { name: "Melt fracture" },
    { name: "Internal burns" },
    { name: "Flecking" },
    { name: "Mottling" },
    { name: "Gels" },
    { name: "Gloss halos" },
    { name: "Fish eyes" },
    { name: "Shot-to-shot variation" },
    { name: "Cycle warpage variation" },
    { name: "Gate vestige" },
    { name: "Regrind-related property loss" },
    { name: "Melt hesitation" },
    { name: "Part sticking" },
    { name: "Hydrolysis damage" },
    { name: "Yellowing" },
    { name: "Chemical attack marks" },
    { name: "Fiber-filled sink/voids" },
    { name: "Incomplete ribs/bosses" },
    { name: "Boss flash" },
    { name: "Insert push-out" },
    { name: "Overmold adhesion failure" },
    { name: "Undeveloped threads" },
    { name: "Local overheating" },
    { name: "Cold spots" },
    { name: "Cooling-line blush" },
    { name: "Splay" },
    { name: "Static dust attraction" },
    { name: "Odor/off-gassing" },
    { name: "Coating adhesion failure" },
    { name: "Crazing" },
    { name: "Mold release residue" },
    { name: "Cold weld" },
    { name: "Corner thinning" },
    { name: "Clamp/support stress marks" },
    { name: "Side-action sticking" },
    { name: "Post-process distortion" }
  ];

  const machineProblems = [
    {
      category: "Hydraulic",
      issues: [
        { problem: "Slow cycle time", solution: "Check hydraulic fluid level and filter" },
        { problem: "Pressure loss", solution: "Inspect seals and replace if worn" },
        { problem: "Overheating", solution: "Check cooling system and oil condition" }
      ]
    },
    {
      category: "Electrical", 
      issues: [
        { problem: "Heater failure", solution: "Test heater bands with multimeter" },
        { problem: "Sensor malfunction", solution: "Calibrate or replace temperature sensors" },
        { problem: "Control issues", solution: "Check wiring connections and software" }
      ]
    },
    {
      category: "Mechanical",
      issues: [
        { problem: "Screw wear", solution: "Inspect screw and barrel, replace if needed" },
        { problem: "Clamp problems", solution: "Check toggle mechanism and lubrication" },
        { problem: "Ejector issues", solution: "Verify ejector pin alignment and function" }
      ]
    }
  ];

  const publicNotes = [
    {
      user: "John Smith",
      date: "2024-01-15",
      issue: "Weld line on ABS parts",
      solution: "Increased melt temp by 10°F and injection speed by 15%. Eliminated weld lines completely.",
      machine: "Haitian MA1200"
    },
    {
      user: "Sarah Johnson", 
      date: "2024-01-14",
      issue: "Inconsistent part weight",
      solution: "Found worn check ring causing material backflow. Replaced check ring and weights are now consistent ±0.2g.",
      machine: "Engel e-motion 440"
    }
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
          {selectedDefect ? (
            // Detail View
            <Card className="industrial-panel">
              <CardHeader>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedDefect(null)}
                  className="mb-4 -ml-2"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Defects List
                </Button>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  {selectedDefect} - Technical Dossier
                </CardTitle>
                <CardDescription>
                  Comprehensive technical documentation and analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/30 p-6 rounded-lg text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Technical dossier content will be uploaded here
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            // List View
            <Card className="industrial-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Injection Molding Defects Database
                </CardTitle>
                <CardDescription>
                  Select a defect to view its technical dossier
                </CardDescription>
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
                
                <div className="space-y-3">
                  {commonDefects.filter(defect => 
                    defect.name.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((defect, index) => (
                    <Card 
                      key={index} 
                      className="border-l-4 border-l-accent cursor-pointer hover:bg-accent/5 transition-colors"
                      onClick={() => setSelectedDefect(defect.name)}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{defect.name}</h3>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes Section for Defects */}
          <Card className="industrial-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Defects Notes
              </CardTitle>
              <CardDescription>
                Share your insights about defect solutions
              </CardDescription>
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
              <CardDescription>
                Share your machine troubleshooting insights
              </CardDescription>
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
                  <span className="text-sm text-left text-muted-foreground mt-2 w-full break-words">
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
                <Button variant="industrial" className="h-auto p-6 flex-col items-start w-full">
                  <FileText className="h-8 w-8 mb-3" />
                  <span className="font-medium text-lg w-full">Molding Process Guide</span>
                  <span className="text-sm text-left text-muted-foreground mt-2 w-full break-words">
                    Process optimization and problem solving
                  </span>
                </Button>
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
              <CardDescription>
                Get expert help with injection molding questions
              </CardDescription>
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
                  <strong>Note:</strong> To enable AI assistance, you'll need to connect to Supabase and configure API access.
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