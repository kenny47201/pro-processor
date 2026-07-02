# Global Units Toggle for Process Tools

## Goal
Add one global Metric/Imperial switch to the Process Tools header. Every calculator reads it, relabels its inputs/outputs, and clears its state when the user flips the switch. Default is Imperial.

## Architecture

**1. New `UnitSystemContext` (`src/contexts/UnitSystemContext.tsx`)**
- State: `system: 'imperial' | 'metric'` (default `'imperial'`, persisted to `localStorage`).
- Exposes `system`, `setSystem`, and a `resetNonce` counter that increments on every switch — calculators listen to it to clear their state.
- Ships a `useUnits()` hook + shared conversion helpers (`toMm`, `toIn`, `cToF`, `fToC`, `barToPsi`, `psiToBar`, `gToOz`, `ozToG`, `lbToKg`, `kgToLb`, `cm3ToIn3`, `in3ToCm3`, etc.).
- Ships a `unitLabels` object per system so components pull labels from a single source (e.g. `L.length`, `L.temp`, `L.pressure`, `L.mass`, `L.volume`, `L.flowRate`).

**2. Provider + toggle in `ProcessTools.tsx`**
- Wrap the page in `<UnitSystemProvider>`.
- Add a segmented `Imperial | Metric` control in the page header (right side of the H1 row).
- Show a small toast when switching: "Units switched to Metric — inputs cleared."

**3. Per-calculator changes** (applied uniformly to all 22 tools + Material Data Sheet display units)
- Import `useUnits()` and destructure `system`, `resetNonce`, and the relevant labels.
- Replace hard-coded unit strings in `<Label>`, `<CardDescription>`, placeholders, and result units with values from `unitLabels`.
- Convert user input to the calculation's canonical unit before calling the shared math in `processCalculations.ts` / `geometryHelpers.ts` — the underlying formulas stay unchanged.
- Convert result values back to the active system for display (e.g. tonnage stays as US tons but shows kN alongside when metric; cooling temps switch °F↔°C; wall thickness in↔mm; pressures psi↔bar; volumes in³↔cm³; masses oz/lb↔g/kg).
- `useEffect(() => handleReset(), [resetNonce])` on each calculator so all inputs and results clear on switch.

**4. Tools that are already unit-agnostic**
- `UnitConverterTool`, `CpkCalculator`, `RejectRateAnalyzer`, `CavityVariationStudy` (grams are SI and used globally), `ThroughputCalculator` (lb/hr vs kg/hr toggle), `EnergyCostCalculator` (kWh is SI; only currency stays), `CostPerPartCalculator` (currency only) — these still get the label swap where a unit is shown, but no math changes.

## Rollout Order
1. Context + provider + header toggle.
2. Setup & Sizing tab (Tonnage, Shot Volume, Melt Density, Throughput, Case Production, Runner Scrap, Cavity Variation, Shear Rate, Dryer, Chiller).
3. Optimization tab (Viscosity, Gate Seal, Pack/Hold, Cooling Time, Pressure Loss, Runner Sizing, Runner Balance).
4. Quality tab (Cpk, Reject Rate, Cost per Part).
5. Utilities tab (Material Data Sheet, Vent Depth, Cycle Time, Energy Cost). Unit Converter unchanged.

## Technical Notes
- Canonical internal units chosen to match the existing formulas so `processCalculations.ts` is untouched: length mm, temp °F for cooling (formula is unit-agnostic in ΔT), pressure psi, mass g, volume cm³, flow g/s, force US tons. Conversions happen only at the input/output boundary of each component.
- `resetNonce` avoids each calculator having to diff `system` itself and prevents stale mixed-unit values.
- Label maps live in the context file so we never re-hardcode "mm" or "°F" in component JSX.

## Out of Scope
- DOE viewer content (static reference material with embedded units in prose).
- Knowledge docs / defect guides.
- Persisting per-user preference to the backend (localStorage is enough for now; can be moved to profile later).
