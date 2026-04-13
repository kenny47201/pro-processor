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

        <TabsContent value="setup" className="mt-6 space-y-6">
          {/* Machine & Tonnage Section */}
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

          {/* Material Properties Section */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              Material Properties
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <MeltDensityCalculator />
            </div>
          </section>

          {/* Throughput & Production Section */}
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

          {/* Studies Section */}
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

          {/* Auxiliary Equipment Section */}
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

        <TabsContent value="optimization">
          <div className="p-8 text-center text-muted-foreground">
            Process Optimization tools coming soon...
          </div>
        </TabsContent>

        <TabsContent value="quality">
          <div className="p-8 text-center text-muted-foreground">
            Quality & SPC tools coming soon...
          </div>
        </TabsContent>

        <TabsContent value="utilities">
          <div className="p-8 text-center text-muted-foreground">
            Utilities & Cost tools coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
