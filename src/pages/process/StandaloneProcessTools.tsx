import ProcessTools from "./ProcessTools";
import { InstallProcessToolsButton } from "@/components/process-tools/InstallProcessToolsButton";
import { Calculator, Factory, Gauge, Wrench } from "lucide-react";

export default function StandaloneProcessTools() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                <Factory className="h-4 w-4" />
                Pro-Processor Tools
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Standalone Injection Molding Process Tools
                </h1>
                <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">
                  A focused calculator and study workspace for molding setup, optimization, process capability,
                  material reference, cycle estimates, energy cost, and engineering support.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <InstallProcessToolsButton />
              <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
                <div className="rounded-lg border border-border bg-background px-3 py-2">
                  <Calculator className="mx-auto mb-1 h-4 w-4 text-primary" />
                  Calculators
                </div>
                <div className="rounded-lg border border-border bg-background px-3 py-2">
                  <Gauge className="mx-auto mb-1 h-4 w-4 text-primary" />
                  Studies
                </div>
                <div className="rounded-lg border border-border bg-background px-3 py-2">
                  <Wrench className="mx-auto mb-1 h-4 w-4 text-primary" />
                  Utilities
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
            This standalone module intentionally excludes Pro-Processor account workflows, shift tasks,
            conversations, issue tracking, tenant administration, and plant accountability records. It is the
            process-toolkit surface only. Open this screen once online after deployment, then install it for
            offline calculator and study access.
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ProcessTools />
      </main>
    </div>
  );
}
