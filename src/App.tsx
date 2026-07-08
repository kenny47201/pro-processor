import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StandaloneProcessTools from "./pages/process/StandaloneProcessTools";

const ProtectedApp = lazy(() => import("./ProtectedApp"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-muted-foreground">Loading...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public standalone module */}
          <Route path="/tools" element={<StandaloneProcessTools />} />
          <Route path="/process-tools-standalone" element={<StandaloneProcessTools />} />

          {/* Authenticated Pro-Processor app */}
          <Route
            path="/*"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ProtectedApp />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
