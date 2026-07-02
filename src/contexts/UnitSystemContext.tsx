import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type UnitSystem = 'imperial' | 'metric';

type UnitLabels = {
  length: string;        // in / mm
  lengthSmall: string;   // in / mm (thin walls)
  area: string;          // in² / cm²
  volume: string;        // in³ / cm³
  mass: string;          // oz / g
  massLarge: string;     // lb / kg
  temp: string;          // °F / °C
  pressure: string;      // psi / bar
  force: string;         // US ton / kN
  flowMass: string;      // lb/hr / kg/hr
  flowVol: string;       // in³/s / cm³/s
  waterFlow: string;     // gpm / L/min
  distance: string;      // in / mm (screw stroke)
};

const IMPERIAL_LABELS: UnitLabels = {
  length: 'in', lengthSmall: 'in', area: 'in²', volume: 'in³',
  mass: 'oz', massLarge: 'lb', temp: '°F', pressure: 'psi',
  force: 'US ton', flowMass: 'lb/hr', flowVol: 'in³/s',
  waterFlow: 'gpm', distance: 'in',
};

const METRIC_LABELS: UnitLabels = {
  length: 'mm', lengthSmall: 'mm', area: 'cm²', volume: 'cm³',
  mass: 'g', massLarge: 'kg', temp: '°C', pressure: 'bar',
  force: 'kN', flowMass: 'kg/hr', flowVol: 'cm³/s',
  waterFlow: 'L/min', distance: 'mm',
};

// Conversion helpers ---------------------------------------------------------
export const inToMm = (v: number) => v * 25.4;
export const mmToIn = (v: number) => v / 25.4;
export const in2ToCm2 = (v: number) => v * 6.4516;
export const cm2ToIn2 = (v: number) => v / 6.4516;
export const in3ToCm3 = (v: number) => v * 16.387064;
export const cm3ToIn3 = (v: number) => v / 16.387064;
export const ozToG = (v: number) => v * 28.3495;
export const gToOz = (v: number) => v / 28.3495;
export const lbToKg = (v: number) => v * 0.453592;
export const kgToLb = (v: number) => v / 0.453592;
export const fToC = (v: number) => (v - 32) * 5 / 9;
export const cToF = (v: number) => v * 9 / 5 + 32;
export const psiToBar = (v: number) => v * 0.0689476;
export const barToPsi = (v: number) => v / 0.0689476;
export const tonToKn = (v: number) => v * 8.89644;
export const knToTon = (v: number) => v / 8.89644;
export const gpmToLpm = (v: number) => v * 3.78541;
export const lpmToGpm = (v: number) => v / 3.78541;

type Ctx = {
  system: UnitSystem;
  setSystem: (s: UnitSystem) => void;
  toggle: () => void;
  resetNonce: number;
  L: UnitLabels;
  isMetric: boolean;
};

const UnitSystemContext = createContext<Ctx | null>(null);

const STORAGE_KEY = 'process-tools-unit-system';

export function UnitSystemProvider({ children }: { children: ReactNode }) {
  const [system, setSystemState] = useState<UnitSystem>(() => {
    if (typeof window === 'undefined') return 'imperial';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'metric' ? 'metric' : 'imperial';
  });
  const [resetNonce, setResetNonce] = useState(0);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, system); } catch { /* ignore */ }
  }, [system]);

  const setSystem = useCallback((s: UnitSystem) => {
    setSystemState((prev) => {
      if (prev === s) return prev;
      setResetNonce((n) => n + 1);
      return s;
    });
  }, []);

  const toggle = useCallback(() => {
    setSystem(system === 'imperial' ? 'metric' : 'imperial');
  }, [system, setSystem]);

  const value = useMemo<Ctx>(() => ({
    system,
    setSystem,
    toggle,
    resetNonce,
    L: system === 'metric' ? METRIC_LABELS : IMPERIAL_LABELS,
    isMetric: system === 'metric',
  }), [system, setSystem, toggle, resetNonce]);

  return <UnitSystemContext.Provider value={value}>{children}</UnitSystemContext.Provider>;
}

export function useUnits(): Ctx {
  const ctx = useContext(UnitSystemContext);
  if (!ctx) {
    // Safe fallback so individual calculators can still render outside the provider (e.g. in tests).
    return {
      system: 'imperial',
      setSystem: () => {},
      toggle: () => {},
      resetNonce: 0,
      L: IMPERIAL_LABELS,
      isMetric: false,
    };
  }
  return ctx;
}
