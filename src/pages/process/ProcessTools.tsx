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
import { Badge } from '@/components/ui/badge';
import { Wrench, Scale, Gauge, Thermometer } from 'lucide-react';

export default function ProcessTools() {
  return (
    <div className="space-y-6">
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

      <Tabs defaultValue="setup" className="w-full">
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
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <TonnageCalculator />
              <ShotVolumeCalculator />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Material Properties
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <MeltDensityCalculator />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Throughput & Production
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <ThroughputCalculator />
              <RunnerScrapYieldCalculator />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Studies & Analysis
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <CavityVariationStudy />
              <ShearRateCalculator />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Auxiliary Equipment Sizing
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <DryerSizingCalculator />
              <ChillerSizingCalculator />
            </div>
          </section>
        </TabsContent>

        {/* ===== OPTIMIZATION ===== */}
        <TabsContent value="optimization" className="mt-6 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Scientific Molding Studies
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <ViscosityCurveStudy />
              <GateSealStudy />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Pack, Hold & Cooling
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <PackHoldStudy />
              <CoolingTimeCalculator />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Runner System Analysis
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <PressureLossCalculator />
              <RunnerSizingTool />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Runner Balance Analysis
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <RunnerBalanceCalculator />
            </div>
          </section>
        </TabsContent>

        {/* ===== QUALITY ===== */}
        <TabsContent value="quality" className="mt-6 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Statistical Process Control
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <CpkCalculator />
              <RejectRateAnalyzer />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Cost Analysis
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <CostPerPartCalculator />
            </div>
          </section>
        </TabsContent>

        {/* ===== UTILITIES ===== */}
        <TabsContent value="utilities" className="mt-6 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Conversions & Reference
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <UnitConverterTool />
              <VentDepthCalculator />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Cycle & Energy
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <CycleTimeEstimator />
              <EnergyCostCalculator />
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
