import { useState, useRef, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TonnageCalculator } from '@/components/process-tools/TonnageCalculator';
import { ShotVolumeCalculator } from '@/components/process-tools/ShotVolumeCalculator';
import { ThroughputCalculator } from '@/components/process-tools/ThroughputCalculator';
import { CavityVariationStudy } from '@/components/process-tools/CavityVariationStudy';
import { ShearRateCalculator } from '@/components/process-tools/ShearRateCalculator';
import { RunnerScrapYieldCalculator } from '@/components/process-tools/RunnerScrapYieldCalculator';
import { DryerSizingCalculator } from '@/components/process-tools/DryerSizingCalculator';
import { ChillerSizingCalculator } from '@/components/process-tools/ChillerSizingCalculator';
import { MeltDensityCalculator } from '@/components/process-tools/MeltDensityCalculator';
import { ViscosityCurveStudy } from '@/components/process-tools/ViscosityCurveStudy';
import { GateSealStudy } from '@/components/process-tools/GateSealStudy';
import { CoolingTimeCalculator } from '@/components/process-tools/CoolingTimeCalculator';
import { PackHoldStudy } from '@/components/process-tools/PackHoldStudy';
import { CpkCalculator } from '@/components/process-tools/CpkCalculator';
import { CostPerPartCalculator } from '@/components/process-tools/CostPerPartCalculator';
import { RejectRateAnalyzer } from '@/components/process-tools/RejectRateAnalyzer';
import { UnitConverterTool } from '@/components/process-tools/UnitConverterTool';
import { CycleTimeEstimator } from '@/components/process-tools/CycleTimeEstimator';
import { EnergyCostCalculator } from '@/components/process-tools/EnergyCostCalculator';
import { VentDepthCalculator } from '@/components/process-tools/VentDepthCalculator';
import { PressureLossCalculator } from '@/components/process-tools/PressureLossCalculator';
import { RunnerSizingTool } from '@/components/process-tools/RunnerSizingTool';
import { RunnerBalanceCalculator } from '@/components/process-tools/RunnerBalanceCalculator';
import { MaterialDataSheet } from '@/components/process-tools/MaterialDataSheet';
import { RecentToolsBar } from '@/components/process-tools/RecentToolsBar';
import { useRecentTools, RecentToolEntry } from '@/hooks/useRecentTools';
import { Badge } from '@/components/ui/badge';
import { Wrench, Scale, Gauge, Thermometer } from 'lucide-react';

type ToolDef = {
  id: string;
  label: string;
  tab: string;
  Component: React.ComponentType;
};

const TOOL_REGISTRY: Record<string, ToolDef[]> = {
  setup: [
    { id: 'tonnage', label: 'Clamp Tonnage', tab: 'setup', Component: TonnageCalculator },
    { id: 'shot-volume', label: 'Shot Volume', tab: 'setup', Component: ShotVolumeCalculator },
    { id: 'melt-density', label: 'Melt Density', tab: 'setup', Component: MeltDensityCalculator },
    { id: 'throughput', label: 'Throughput', tab: 'setup', Component: ThroughputCalculator },
    { id: 'runner-scrap', label: 'Runner Scrap Yield', tab: 'setup', Component: RunnerScrapYieldCalculator },
    { id: 'cavity-variation', label: 'Cavity Variation', tab: 'setup', Component: CavityVariationStudy },
    { id: 'shear-rate', label: 'Shear Rate', tab: 'setup', Component: ShearRateCalculator },
    { id: 'dryer-sizing', label: 'Dryer Sizing', tab: 'setup', Component: DryerSizingCalculator },
    { id: 'chiller-sizing', label: 'Chiller Sizing', tab: 'setup', Component: ChillerSizingCalculator },
  ],
  optimization: [
    { id: 'viscosity-curve', label: 'Viscosity Curve', tab: 'optimization', Component: ViscosityCurveStudy },
    { id: 'gate-seal', label: 'Gate Seal Study', tab: 'optimization', Component: GateSealStudy },
    { id: 'pack-hold', label: 'Pack & Hold Study', tab: 'optimization', Component: PackHoldStudy },
    { id: 'cooling-time', label: 'Cooling Time', tab: 'optimization', Component: CoolingTimeCalculator },
    { id: 'pressure-loss', label: 'Pressure Loss', tab: 'optimization', Component: PressureLossCalculator },
    { id: 'runner-sizing', label: 'Runner Sizing', tab: 'optimization', Component: RunnerSizingTool },
    { id: 'runner-balance', label: 'Runner Balance', tab: 'optimization', Component: RunnerBalanceCalculator },
  ],
  quality: [
    { id: 'cpk', label: 'Cpk Calculator', tab: 'quality', Component: CpkCalculator },
    { id: 'reject-rate', label: 'Reject Rate', tab: 'quality', Component: RejectRateAnalyzer },
    { id: 'cost-per-part', label: 'Cost per Part', tab: 'quality', Component: CostPerPartCalculator },
  ],
  utilities: [
    { id: 'material-data', label: 'Material Data Sheet', tab: 'utilities', Component: MaterialDataSheet },
    { id: 'unit-converter', label: 'Unit Converter', tab: 'utilities', Component: UnitConverterTool },
    { id: 'vent-depth', label: 'Vent Depth', tab: 'utilities', Component: VentDepthCalculator },
    { id: 'cycle-time', label: 'Cycle Time', tab: 'utilities', Component: CycleTimeEstimator },
    { id: 'energy-cost', label: 'Energy Cost', tab: 'utilities', Component: EnergyCostCalculator },
  ],
};

const ALL_TOOLS = Object.values(TOOL_REGISTRY).flat();

function findTool(id: string) {
  return ALL_TOOLS.find((t) => t.id === id);
}

export default function ProcessTools() {
  const [activeTab, setActiveTab] = useState('setup');
  const { recents, recordUse, clear } = useRecentTools();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToolClick = useCallback(
    (id: string) => {
      const tool = findTool(id);
      if (!tool) return;
      recordUse(tool.id, tool.label, tool.tab);
    },
    [recordUse]
  );

  const handleRecentSelect = useCallback(
    (entry: RecentToolEntry) => {
      const tool = findTool(entry.id);
      if (!tool) return;
      recordUse(tool.id, tool.label, tool.tab);
      setActiveTab(tool.tab);
      // Wait for tab content to render, then scroll to anchor
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(`tool-${tool.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            el.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-background');
            setTimeout(() => {
              el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-background');
            }, 2000);
          }
        }, 80);
      });
    },
    [recordUse]
  );

  const renderToolGrid = (tools: ToolDef[], cols: 1 | 2 = 2) => (
    <div
      className={`grid grid-cols-1 ${cols === 2 ? 'xl:grid-cols-2' : ''} gap-6`}
    >
      {tools.map(({ id, Component }) => (
        <div
          key={id}
          id={`tool-${id}`}
          onClick={() => handleToolClick(id)}
          className="rounded-lg transition-all scroll-mt-24"
        >
          <Component />
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6" ref={containerRef}>
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          Process Tools
        </h1>
        <p className="text-muted-foreground mt-1">
          Engineering calculators, studies, and analysis tools for injection molding
        </p>
        <div className="flex gap-2 mt-3">
          <Badge variant="default">Setup & Sizing</Badge>
          <Badge variant="outline">Process Optimization</Badge>
          <Badge variant="outline">Quality & SPC</Badge>
          <Badge variant="outline">Utilities & Cost</Badge>
        </div>
      </div>

      <RecentToolsBar
        recents={recents}
        onSelect={handleRecentSelect}
        onClear={clear}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="setup" className="flex items-center gap-1.5">
            <Scale className="h-4 w-4" />
            <span className="hidden sm:inline">Setup & Sizing</span>
            <span className="sm:hidden">Setup</span>
          </TabsTrigger>
          <TabsTrigger value="optimization" className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4" />
            <span className="hidden sm:inline">Optimization</span>
            <span className="sm:hidden">Optim</span>
          </TabsTrigger>
          <TabsTrigger value="quality" className="flex items-center gap-1.5">
            <Thermometer className="h-4 w-4" />
            <span className="hidden sm:inline">Quality</span>
            <span className="sm:hidden">QC</span>
          </TabsTrigger>
          <TabsTrigger value="utilities" className="flex items-center gap-1.5">
            <Wrench className="h-4 w-4" />
            <span className="hidden sm:inline">Utilities</span>
            <span className="sm:hidden">Utils</span>
          </TabsTrigger>
        </TabsList>

        {/* ===== SETUP & SIZING ===== */}
        <TabsContent value="setup" className="mt-6 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Machine & Tonnage
            </h2>
            {renderToolGrid(TOOL_REGISTRY.setup.filter((t) => ['tonnage', 'shot-volume'].includes(t.id)))}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Material Properties
            </h2>
            {renderToolGrid(TOOL_REGISTRY.setup.filter((t) => t.id === 'melt-density'))}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Throughput & Production
            </h2>
            {renderToolGrid(TOOL_REGISTRY.setup.filter((t) => ['throughput', 'runner-scrap'].includes(t.id)))}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Studies & Analysis
            </h2>
            {renderToolGrid(TOOL_REGISTRY.setup.filter((t) => ['cavity-variation', 'shear-rate'].includes(t.id)))}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Auxiliary Equipment Sizing
            </h2>
            {renderToolGrid(TOOL_REGISTRY.setup.filter((t) => ['dryer-sizing', 'chiller-sizing'].includes(t.id)))}
          </section>
        </TabsContent>

        {/* ===== OPTIMIZATION ===== */}
        <TabsContent value="optimization" className="mt-6 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Scientific Molding Studies
            </h2>
            {renderToolGrid(TOOL_REGISTRY.optimization.filter((t) => ['viscosity-curve', 'gate-seal'].includes(t.id)))}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Pack, Hold & Cooling
            </h2>
            {renderToolGrid(TOOL_REGISTRY.optimization.filter((t) => ['pack-hold', 'cooling-time'].includes(t.id)))}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Runner System Analysis
            </h2>
            {renderToolGrid(TOOL_REGISTRY.optimization.filter((t) => ['pressure-loss', 'runner-sizing'].includes(t.id)))}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Runner Balance Analysis
            </h2>
            {renderToolGrid(TOOL_REGISTRY.optimization.filter((t) => t.id === 'runner-balance'))}
          </section>
        </TabsContent>

        {/* ===== QUALITY ===== */}
        <TabsContent value="quality" className="mt-6 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Statistical Process Control
            </h2>
            {renderToolGrid(TOOL_REGISTRY.quality.filter((t) => ['cpk', 'reject-rate'].includes(t.id)))}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Cost Analysis
            </h2>
            {renderToolGrid(TOOL_REGISTRY.quality.filter((t) => t.id === 'cost-per-part'))}
          </section>
        </TabsContent>

        {/* ===== UTILITIES ===== */}
        <TabsContent value="utilities" className="mt-6 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Material Reference
            </h2>
            {renderToolGrid(TOOL_REGISTRY.utilities.filter((t) => t.id === 'material-data'), 1)}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Conversions & Reference
            </h2>
            {renderToolGrid(TOOL_REGISTRY.utilities.filter((t) => ['unit-converter', 'vent-depth'].includes(t.id)))}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Cycle & Energy
            </h2>
            {renderToolGrid(TOOL_REGISTRY.utilities.filter((t) => ['cycle-time', 'energy-cost'].includes(t.id)))}
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
