## Goal
Make every process calculator self-sufficient: technicians can derive every required input from part measurements, material data, or machine specs without leaving Process Tools, and can translate results into values they can key directly into the press.

## Pattern (applied to all 22 calculators)
Each calculator gets three consistent additions:

1. **Info popovers on every input** — explain what the value is, where to measure it, typical ranges, and a "Help me calculate this" link that opens an inline mini-calculator (Popover + small form) which writes the result back into the parent field.
2. **Inline helper calculators** — small self-contained forms that appear inside the popover or an expandable "Derive from measurements" section. No page navigation.
3. **"Send to press" output block** — every calculator ends with a section that converts the abstract result into a machine-input value (mm of stroke, °C setpoints, seconds of hold, cm³/s injection speed, etc.), with the exact label the tech sees on the HMI.

## Phase 1 — Shot Volume & Weight Calculator (this turn)

Add three inline helpers + a shot-size translator:

**A. "Single Part Volume" helper** (popover on the Part Volume input)
- Method 1: From part weight + material density → `V = weight / density`
- Method 2: From simple geometry (box, cylinder, disc) → volume formula picker
- "Use this value" button writes back to Part Volume field

**B. "Runner Volume" helper** (popover on the Runner Volume input)
- Full-round: `V = π × (d/2)² × L × n`
- Trapezoidal: `V = ((top+bottom)/2) × depth × L × n`
- Half-round: `V = 0.5 × π × (d/2)² × L × n`
- Plus sprue cone: `V = (π × L / 3) × (R₁² + R₁R₂ + R₂²)`
- Sums all segments, writes back to Runner Volume field

**C. New "Shot Size → Machine Stroke" translator** (added below results)
- Inputs: barrel/screw diameter (mm), cushion (mm, default 3–5), decompression (mm, default 0)
- Formula: `stroke_mm = (shotVolume_cc × 1000) / (π × (D/2)²) + cushion + decompression`
- Output labeled **"Shot Size (mm)"** and **"Transfer Position estimate (mm)"** at 95% fill — exactly what the tech types into the press.

## Phase 2 — Apply pattern to remaining calculators (next turns, one per turn to keep changes reviewable)

For each: Tonnage, Throughput, Cavity Variation, Runner Pressure Loss, Runner Scrap/Yield, Shear Rate, Dryer, Chiller, Cooling Time, Cycle Time, Cost/Part, Cpk, Energy Cost, Gate Seal, Melt Density, Pack/Hold, Pressure Loss, Reject Rate, Runner Balance, Runner Sizing, Vent Depth, Viscosity Curve, Unit Converter — add the equivalent input-helpers + "Send to press" translation block.

## Technical Notes
- New shared component `src/components/process-tools/HelperPopover.tsx` — wraps an Info icon in a Popover, renders children (the mini-calc), exposes an `onApply(value)` callback that writes to the parent field.
- New helper module `src/lib/geometryHelpers.ts` — box/cylinder/disc/tube volumes, runner shapes, sprue cone, screw stroke math.
- Reuse existing `MATERIAL_DENSITIES` for weight→volume conversions.
- Zero backend changes.

## Deliverable This Turn
Only Phase 1 (Shot Volume calculator). After you confirm the pattern feels right, I'll roll it across the other 21 calculators.
