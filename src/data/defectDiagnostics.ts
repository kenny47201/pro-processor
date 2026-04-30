/**
 * Per-defect Diagnose Checklist + Calculator Links registry.
 *
 * One entry per defect slug. The renderer auto-injects these blocks into the
 * matching guide so we don't have to hand-edit every long guide file.
 *
 * Calculator toolIds must match those declared in src/pages/process/ProcessTools.tsx
 * TOOL_REGISTRY (e.g. 'cooling-time', 'pack-hold', 'shot-volume', 'shear-rate',
 * 'tonnage', 'viscosity-curve', 'gate-seal', 'pressure-loss', 'runner-sizing',
 * 'runner-balance', 'cavity-variation', 'melt-density', 'throughput',
 * 'runner-scrap', 'dryer-sizing', 'chiller-sizing', 'cpk', 'reject-rate',
 * 'cost-per-part', 'material-data', 'unit-converter', 'vent-depth',
 * 'cycle-time', 'energy-cost').
 */

import type { GuideBlock } from './defectGuides';

export interface DefectDiagnostics {
  /** A short, ordered set of inspect/measure/calculate/setting checks. */
  checklist: Extract<GuideBlock, { type: 'diagnoseChecklist' }>;
  /** A focused panel of related calculators, shown alongside the checklist. */
  links: Extract<GuideBlock, { type: 'calculatorLinks' }>;
}

/**
 * Helper to keep entries terse. Builds both the checklist and the
 * derived calculator-links panel from the same source of truth.
 */
function build(opts: {
  defect: string;
  intro: string;
  inspect: string[];
  measure: string[];
  calculators: { toolId: string; text: string; hint?: string; label: string; description: string }[];
  settings: string[];
}): DefectDiagnostics {
  return {
    checklist: {
      type: 'diagnoseChecklist',
      title: `Diagnose ${opts.defect} — Auto-Suggested Checklist`,
      description: opts.intro,
      groups: [
        { label: 'Visual & geometric inspection', kind: 'inspect', items: opts.inspect.map((t) => ({ text: t })) },
        { label: 'Measure on the press', kind: 'measure', items: opts.measure.map((t) => ({ text: t })) },
        {
          label: 'Quantify with calculators',
          kind: 'calculator',
          items: opts.calculators.map((c) => ({ text: c.text, hint: c.hint, toolId: c.toolId })),
        },
        { label: 'Settings to review on the controller', kind: 'setting', items: opts.settings.map((t) => ({ text: t })) },
      ],
    },
    links: {
      type: 'calculatorLinks',
      title: 'Related Process Tools',
      description: `Calculators most relevant to diagnosing ${opts.defect.toLowerCase()}.`,
      links: opts.calculators.map((c) => ({ toolId: c.toolId, label: c.label, description: c.description })),
    },
  };
}

const COMMON_INTRO =
  'Work top-to-bottom. Each step narrows the cause. Calculator rows open the relevant Process Tool in one click. Progress is saved on this device.';

export const defectDiagnostics: Record<string, DefectDiagnostics> = {
  // -------- Bubbles & Blisters --------
  'bubbles-blisters': build({
    defect: 'Bubbles & Blisters',
    intro: COMMON_INTRO,
    inspect: [
      'Classify: internal bubble (transparent / sectioned) vs raised surface blister vs sink/void.',
      'Map defect to last-fill / blind-pocket / thick-section zones on the CAD plan view.',
      'Inspect vents and witness marks at end-of-fill for trapped air signatures.',
      'Compare cavity-to-cavity if multi-cavity — single-cavity issue points to vent or hot-runner zone.',
    ],
    measure: [
      'Measure resin moisture at the throat — do not trust the dryer setpoint.',
      'Verify actual melt temperature with a purge-shot pyrometer.',
      'Log barrel residence time vs shot size — > 3× is a degradation risk.',
      'Check decompression / suckback distance; excessive pull-back entrains air.',
    ],
    calculators: [
      { toolId: 'dryer-sizing', text: 'Verify dryer capacity vs throughput and residence time.', label: 'Dryer Sizing', description: 'Confirm dryer can hold resin to spec dew point at your throughput.' },
      { toolId: 'shot-volume', text: 'Confirm shot size vs barrel capacity (residence-time risk).', label: 'Shot & Part Volume', description: 'Catch under-utilized barrels that hold melt too long and degrade it.' },
      { toolId: 'vent-depth', text: 'Check vent depth vs resin spec for end-of-fill venting.', label: 'Vent Depth Calculator', hint: 'Most common root cause for blisters at last-fill.', description: 'Size vents per polymer family to evacuate trapped gas.' },
      { toolId: 'pack-hold', text: 'Run a gate-freeze study to separate gas defects from shrinkage cavities.', label: 'Pack & Hold Study', description: 'A bubble that shrinks with more pack is shrinkage-driven, not gas.' },
    ],
    settings: [
      'Decompression — reduce to minimum required to break drool.',
      'Back pressure — increase modestly to homogenize melt and compress entrained air.',
      'Melt temperature — lower if smoke or odor on purge (degradation).',
      'Injection speed — slow at end-of-fill to give gas time to vent.',
    ],
  }),

  // -------- Burn Marks --------
  'burn-marks': build({
    defect: 'Burn Marks',
    intro: COMMON_INTRO,
    inspect: [
      'Locate the burn — almost always at last-fill, blind ribs, or end of long flow paths.',
      'Inspect vents at the burn site for carbon plating or hobbing damage.',
      'Check for dieseling pattern (V-shaped scorch) confirming compressed-air ignition.',
    ],
    measure: [
      'Measure vent depth with a feeler gauge at the burn site.',
      'Time the fill stage — burn severity often scales with high-speed end-of-fill.',
      'Verify mold parting-line cleanliness; sticky residue blocks venting.',
    ],
    calculators: [
      { toolId: 'vent-depth', text: 'Verify vent depth is at the maximum for the resin without flashing.', label: 'Vent Depth Calculator', hint: 'Primary fix for dieseling burns.', description: 'Maximize vent depth per polymer family to prevent gas compression.' },
      { toolId: 'shear-rate', text: 'Check shear rate at gates — exceeding the resin limit causes shear burn.', label: 'Shear Rate Calculator', description: 'Identify gates that exceed the polymer shear limit.' },
      { toolId: 'pressure-loss', text: 'Estimate runner pressure loss — high loss masks fill-speed issues.', label: 'Pressure Loss Calculator', description: 'Confirm the runner system isn\'t throttling fill.' },
    ],
    settings: [
      'Reduce injection velocity at end-of-fill (multi-stage profile).',
      'Lower melt temperature 5–10 °C if shear burn is suspected.',
      'Increase clamp tonnage only if burns coincide with flash — otherwise vent first.',
    ],
  }),

  // -------- Discoloration --------
  'discoloration': build({
    defect: 'Discoloration',
    intro: COMMON_INTRO,
    inspect: [
      'Classify: yellowing (degradation), streaks (contamination), gate halo (shear), color shift (concentrate let-down).',
      'Inspect hopper, throat, and screw for cross-contamination from prior resin.',
      'Check colorant carrier compatibility and let-down ratio against spec.',
    ],
    measure: [
      'Measure actual melt temperature with a purge-shot pyrometer.',
      'Calculate residence time = barrel capacity / shot size × cycle.',
      'Verify regrind percentage and storage exposure (UV, moisture).',
    ],
    calculators: [
      { toolId: 'shot-volume', text: 'Confirm shot size is 30–70% of barrel capacity to limit residence time.', label: 'Shot & Part Volume', description: 'Right-size the barrel/shot ratio to prevent cook-off.' },
      { toolId: 'cycle-time', text: 'Estimate cycle and residence time vs material thermal stability spec.', label: 'Cycle Time Estimator', description: 'Tie cycle time to residence-time risk for the polymer.' },
      { toolId: 'throughput', text: 'Verify throughput vs dryer capacity — wet resin yellows on heat.', label: 'Throughput Calculator', description: 'Catch dryer-undersized conditions that produce moisture-driven discoloration.' },
    ],
    settings: [
      'Reduce melt temperature to mid-window if yellowing.',
      'Reduce back pressure if shear-driven streaking.',
      'Purge thoroughly between resin or color changes; document purge sequence.',
    ],
  }),

  // -------- Flash --------
  'flash': build({
    defect: 'Flash',
    intro: COMMON_INTRO,
    inspect: [
      'Locate flash — parting line (clamp/vent issue) vs ejector pins / slides (wear).',
      'Inspect parting line for damage, contamination, or worn shutoffs.',
      'Verify mold is fully closed and seated — check tie-bar stretch readings.',
    ],
    measure: [
      'Measure projected area accurately (cavities + runners).',
      'Verify clamp tonnage on the press matches the projected-area requirement with safety factor.',
      'Check cavity pressure peak vs clamp force.',
    ],
    calculators: [
      { toolId: 'tonnage', text: 'Recalculate required clamp tonnage with a 10–20% safety factor.', label: 'Clamp Tonnage Calculator', hint: 'Most common flash root cause is undersized clamp for projected area.', description: 'Verify the press has enough tonnage for the projected area and resin.' },
      { toolId: 'pack-hold', text: 'Run a gate-freeze study — over-packing past gate freeze causes flash.', label: 'Pack & Hold Study', description: 'Trim hold time to the gate-freeze point, not beyond.' },
      { toolId: 'vent-depth', text: 'Verify vents are within max depth — over-deep vents flash.', label: 'Vent Depth Calculator', description: 'Confirm vent depth respects polymer max before flashing.' },
    ],
    settings: [
      'Reduce pack pressure or hold time first — cheapest fix.',
      'Reduce injection velocity if peak cavity pressure exceeds clamp.',
      'Increase clamp tonnage only if calculator confirms undersized.',
      'Lower melt temperature to raise viscosity if marginal.',
    ],
  }),

  // -------- Flow Lines --------
  'flow-lines': build({
    defect: 'Flow Lines',
    intro: COMMON_INTRO,
    inspect: [
      'Trace flow lines back to gate — concentric rings indicate hesitation or slow front.',
      'Check for thin-to-thick wall transitions causing race-tracking.',
      'Compare gloss across the flow path — dull = cooled too early.',
    ],
    measure: [
      'Verify mold surface temperature at the affected zone with contact pyrometer.',
      'Check melt temperature and runner pressure drop.',
      'Time the fill stage — slow fill is the dominant cause.',
    ],
    calculators: [
      { toolId: 'viscosity-curve', text: 'Run a viscosity curve to find the velocity-stable injection rate.', label: 'Viscosity Curve Study', hint: 'Fill on the flat portion of the curve to eliminate flow instability.', description: 'Find the injection velocity where viscosity is stable.' },
      { toolId: 'shear-rate', text: 'Verify shear rate is within polymer window at the gate.', label: 'Shear Rate Calculator', description: 'Confirm gate shear isn\'t causing local cooling artifacts.' },
      { toolId: 'pressure-loss', text: 'Quantify runner + gate pressure loss vs press capability.', label: 'Pressure Loss Calculator', description: 'Identify pressure-starved fills that produce hesitation lines.' },
    ],
    settings: [
      'Increase injection velocity to fill on the viscosity-stable plateau.',
      'Increase mold and melt temperature 5–10 °C.',
      'Use multi-stage velocity to accelerate through wall transitions.',
    ],
  }),

  // -------- Gate Blush --------
  'gate-blush': build({
    defect: 'Gate Blush',
    intro: COMMON_INTRO,
    inspect: [
      'Confirm halo / discoloration radiates from the gate vestige.',
      'Inspect gate land for nicks, burrs, or wear that increase shear locally.',
      'Check gate type (edge, sub, pin, valve) vs resin recommendation.',
    ],
    measure: [
      'Measure gate dimensions vs design (wear can double effective shear).',
      'Verify melt temperature and first-stage velocity.',
    ],
    calculators: [
      { toolId: 'shear-rate', text: 'Check shear rate at the gate vs polymer maximum.', label: 'Shear Rate Calculator', hint: 'Blush almost always = excessive gate shear.', description: 'Compare actual gate shear to the resin spec.' },
      { toolId: 'viscosity-curve', text: 'Find the injection velocity where the melt is shear-stable.', label: 'Viscosity Curve Study', description: 'Identify the velocity sweet spot to limit gate shear.' },
      { toolId: 'runner-sizing', text: 'Confirm gate diameter is correctly sized for the part volume.', label: 'Runner Sizing Tool', description: 'Right-size gates to bring shear under the polymer limit.' },
    ],
    settings: [
      'Reduce first-stage injection velocity through the gate.',
      'Use a velocity ramp: slow through gate, accelerate after.',
      'Increase melt temperature to lower viscosity at the gate.',
    ],
  }),

  // -------- Jetting --------
  'jetting': build({
    defect: 'Jetting',
    intro: COMMON_INTRO,
    inspect: [
      'Look for snake-like trails of cooled material extending from the gate.',
      'Check whether gate impinges into open cavity vs onto a wall (overlap gate).',
      'Verify gate is positioned to allow the jet to impact a surface within 1–2 wall thicknesses.',
    ],
    measure: [
      'Time first-stage fill — jetting is a fast first-stage / cold-mold combination.',
      'Verify mold-surface temperature at the gate area.',
    ],
    calculators: [
      { toolId: 'viscosity-curve', text: 'Identify the slowest stable first-stage velocity.', label: 'Viscosity Curve Study', description: 'Find a slower fill rate that still avoids hesitation.' },
      { toolId: 'shear-rate', text: 'Check gate shear is not so low the jet stays cold and rope-like.', label: 'Shear Rate Calculator', description: 'Balance gate shear so the jet attaches to the wall.' },
    ],
    settings: [
      'Slow first-stage injection velocity dramatically; ramp up after gate is established.',
      'Increase melt and mold temperature to reduce skin formation on the jet.',
      'If geometry permits, retrofit an overlap or fan gate.',
    ],
  }),

  // -------- Meld Line Separation --------
  'meld-line-separation': build({
    defect: 'Meld Line Separation',
    intro: COMMON_INTRO,
    inspect: [
      'Confirm separation occurs where two flow fronts meet at a shallow angle (meld, not weld).',
      'Map gate locations and predicted meld-line position vs cosmetic / structural zones.',
      'Inspect for trapped air at the meld — burns indicate venting failure.',
    ],
    measure: [
      'Measure flow-front temperature where fronts meet (target < 20 °C drop from melt).',
      'Verify mold-surface temperature uniformity across the meld zone.',
    ],
    calculators: [
      { toolId: 'viscosity-curve', text: 'Optimize injection velocity to keep front temperature high at the meld.', label: 'Viscosity Curve Study', description: 'Faster, stable fill keeps the meeting fronts hot.' },
      { toolId: 'pressure-loss', text: 'Verify pack pressure can reach the meld line.', label: 'Pressure Loss Calculator', description: 'Confirm pressure transmission to the meld.' },
      { toolId: 'vent-depth', text: 'Vent the meld zone — trapped gas weakens the bond.', label: 'Vent Depth Calculator', description: 'Size vents at meld zones for trapped air.' },
    ],
    settings: [
      'Increase melt temperature 5–10 °C.',
      'Increase mold temperature in the meld zone.',
      'Increase injection velocity so fronts meet hot.',
      'Increase pack pressure if separation looks like under-packed gap.',
    ],
  }),

  // -------- Short Shot --------
  'short-shot': build({
    defect: 'Short Shot',
    intro: COMMON_INTRO,
    inspect: [
      'Identify which features fail to fill — last-fill area or thin walls.',
      'Check for vent blockage (trapped air mimics short shot).',
      'Compare cavity-to-cavity in multi-cavity tools.',
    ],
    measure: [
      'Measure actual shot size vs calculated part + runner volume.',
      'Verify cushion is positive (≥ 3–5 mm) shot-to-shot.',
      'Check check-ring with a leak test if cushion drifts.',
    ],
    calculators: [
      { toolId: 'shot-volume', text: 'Confirm shot weight vs part + runner volume with a margin.', label: 'Shot & Part Volume', hint: 'First and most common cause: under-shot.', description: 'Verify shot size covers part + runner with cushion.' },
      { toolId: 'pressure-loss', text: 'Quantify pressure loss through runner + gate vs press capability.', label: 'Pressure Loss Calculator', description: 'Confirm press has the pressure to fill at the chosen velocity.' },
      { toolId: 'tonnage', text: 'Confirm clamp isn\'t opening from over-pressure (mimics short shot).', label: 'Clamp Tonnage Calculator', description: 'Rule out clamp lift from over-injection.' },
      { toolId: 'cavity-variation', text: 'Run cavity-balance study for multi-cavity tools.', label: 'Cavity Variation Study', description: 'Quantify which cavities consistently short.' },
    ],
    settings: [
      'Increase shot size to restore cushion.',
      'Increase injection velocity and pressure limit.',
      'Increase melt temperature 5–10 °C.',
      'Open vents to release trapped air.',
    ],
  }),

  // -------- Splay --------
  'splay-silver-streaks': build({
    defect: 'Splay (Silver Streaks)',
    intro: COMMON_INTRO,
    inspect: [
      'Classify: moisture splay (broad silver), shear splay (gate radial), degradation splay (yellow-brown), gas splay (long streaks).',
      'Inspect dryer dew point, hopper seal, and conveying line for moisture ingress.',
      'Check for resin sitting in a wet hopper overnight.',
    ],
    measure: [
      'Measure resin moisture at the throat with an inline moisture analyzer.',
      'Measure dryer dew point — should be ≤ −40 °C for hygroscopic resins.',
      'Verify melt temperature and residence time.',
    ],
    calculators: [
      { toolId: 'dryer-sizing', text: 'Confirm dryer airflow and capacity vs throughput.', label: 'Dryer Sizing', hint: 'Most splay is moisture-driven — verify drying first.', description: 'Catch under-sized dryers that can\'t hold resin to spec.' },
      { toolId: 'shot-volume', text: 'Verify barrel utilization — over-large barrels degrade resin.', label: 'Shot & Part Volume', description: 'Right-size shot to barrel to prevent residence-time degradation.' },
      { toolId: 'shear-rate', text: 'Check gate shear if splay radiates from gate.', label: 'Shear Rate Calculator', description: 'Confirm shear-driven splay isn\'t the actual mechanism.' },
    ],
    settings: [
      'Reduce melt temperature if degradation suspected.',
      'Reduce decompression to minimum.',
      'Increase back pressure modestly to compress entrained air.',
      'Slow injection at gate if shear splay.',
    ],
  }),

  // -------- Cold Slug Marks --------
  'cold-slug-marks': build({
    defect: 'Cold Slug Marks',
    intro: COMMON_INTRO,
    inspect: [
      'Confirm location is at or radiating from the gate (rules out splay/jetting).',
      'Identify runner system: cold runner (check cold-slug well) vs hot runner (check tip temp).',
      'Inspect sprue puller / cold-slug well geometry vs design intent.',
    ],
    measure: [
      'Measure nozzle and tip temperatures with a contact pyrometer.',
      'For hot runners: log every drop\'s actual zone temperature for 20 cycles.',
      'Time the sprue-break dwell — long dwell drops nozzle-tip temperature.',
    ],
    calculators: [
      { toolId: 'runner-balance', text: 'Verify runner balance — cold legs cool faster and form slugs.', label: 'Runner Balance Calculator', description: 'Identify unbalanced legs that cool prematurely.' },
      { toolId: 'runner-sizing', text: 'Confirm runner diameter avoids excessive cooling.', label: 'Runner Sizing Tool', description: 'Right-size runners to maintain melt temperature.' },
      { toolId: 'cycle-time', text: 'Estimate dwell time at the nozzle tip between shots.', label: 'Cycle Time Estimator', description: 'Tie cycle time to nozzle-tip cooling risk.' },
    ],
    settings: [
      'Increase melt and nozzle-tip temperature 5–10 °C (within window).',
      'Increase initial injection speed; multi-stage profile.',
      'Optimize sprue-break distance and timing.',
      'For hot runners: re-tune affected zones; verify tip thermocouples.',
    ],
  }),

  // -------- Delamination --------
  'delamination': build({
    defect: 'Delamination',
    intro: COMMON_INTRO,
    inspect: [
      'Confirm peeling layers (not skin lift or blister) — try lifting a layer with a fingernail.',
      'Check for resin contamination — incompatible regrind or wrong material in hopper.',
      'Inspect colorant and additive carrier compatibility with base resin.',
    ],
    measure: [
      'Measure resin moisture — wet hygroscopic resins delaminate.',
      'Verify melt temperature isn\'t below the resin minimum.',
      'Verify cold mold — cold steel produces a distinct skin layer.',
    ],
    calculators: [
      { toolId: 'dryer-sizing', text: 'Confirm dryer holds hygroscopic resin to spec moisture.', label: 'Dryer Sizing', description: 'Wet resin is a leading cause of delamination.' },
      { toolId: 'shear-rate', text: 'Verify gate shear isn\'t over-orienting the skin.', label: 'Shear Rate Calculator', description: 'Excess shear orients molecules into a peelable layer.' },
      { toolId: 'material-data', text: 'Check resin compatibility for blended / regrind feeds.', label: 'Material Data Sheet', description: 'Reference compatibility data before mixing materials.' },
    ],
    settings: [
      'Increase melt temperature to ensure full melting.',
      'Increase mold temperature to slow skin formation.',
      'Increase back pressure to homogenize melt.',
      'Eliminate suspect regrind or contaminants.',
    ],
  }),

  // -------- Warpage --------
  'warpage': build({
    defect: 'Warpage',
    intro: COMMON_INTRO,
    inspect: [
      'Classify warp pattern: bow, twist, dish, or saddle — each maps to a different cause.',
      'Identify wall-thickness variation — uneven walls shrink differentially.',
      'Check for fiber-orientation effects in glass-filled resins (warp parallel to flow).',
    ],
    measure: [
      'Measure mold-surface temperature uniformity (both halves) with contact pyrometer.',
      'Track shrinkage in flow vs cross-flow direction.',
      'Verify ejection isn\'t happening before the part stiffens.',
    ],
    calculators: [
      { toolId: 'cooling-time', text: 'Estimate cooling time so the part is rigid before ejection.', label: 'Cooling Time Calculator', hint: 'Premature ejection is a top warp cause.', description: 'Calculate cooling time for the thickest section.' },
      { toolId: 'pack-hold', text: 'Tune pack pressure / hold time to even out shrinkage.', label: 'Pack & Hold Study', description: 'Even packing reduces differential shrinkage.' },
      { toolId: 'chiller-sizing', text: 'Verify chiller capacity for uniform mold-half cooling.', label: 'Chiller Sizing', description: 'Adequate chiller capacity prevents one-sided cooling.' },
      { toolId: 'cavity-variation', text: 'Run a cavity-variation study to isolate single-cavity warp.', label: 'Cavity Variation Study', description: 'Identify a single misbehaving cavity vs a tool-wide issue.' },
    ],
    settings: [
      'Increase cooling time before ejection.',
      'Balance both mold-half temperatures (within 5 °C).',
      'Increase pack pressure modestly to reduce shrinkage variation.',
      'Reduce melt temperature if over-shrinkage in semi-crystallines.',
    ],
  }),

  // -------- Voids --------
  'voids': build({
    defect: 'Voids',
    intro: COMMON_INTRO,
    inspect: [
      'Section a part to confirm internal void (vs surface bubble or sink).',
      'Map voids to thickest sections — they form where the core can\'t be fed.',
      'Check rib-to-wall ratios — > 0.6× wall is a void risk.',
    ],
    measure: [
      'Run a gradual gate-freeze study with weight tracking.',
      'Measure cushion stability over 20 shots.',
      'Verify cooling time vs thickest wall.',
    ],
    calculators: [
      { toolId: 'pack-hold', text: 'Run a gate-freeze study — voids = inadequate packing before freeze.', label: 'Pack & Hold Study', hint: 'Decisive test for voids.', description: 'Identify if pack ends before the gate freezes.' },
      { toolId: 'cooling-time', text: 'Estimate cooling time for the thickest section.', label: 'Cooling Time Calculator', description: 'Confirm cooling allows full core solidification.' },
      { toolId: 'shot-volume', text: 'Confirm shot size + runner volume support full pack.', label: 'Shot & Part Volume', description: 'Verify enough material is available to feed the core.' },
    ],
    settings: [
      'Increase pack pressure (within clamp/flash limits).',
      'Increase hold time up to gate freeze.',
      'Increase melt temperature for better pressure transmission.',
      'Lower mold temperature at thick zones to stiffen skin.',
    ],
  }),

  // -------- Shrinkage --------
  'shrinkage': build({
    defect: 'Shrinkage',
    intro: COMMON_INTRO,
    inspect: [
      'Measure dimensional shrinkage in flow vs cross-flow on cooled parts.',
      'Check for differential cooling — one mold half hotter than the other.',
      'Verify part dimensions after 24-hour conditioning, not at ejection.',
    ],
    measure: [
      'Track mold-surface temperature with contact pyrometer (both halves).',
      'Run a gate-freeze study — under-packed parts shrink more.',
      'Verify cushion stability shot-to-shot.',
    ],
    calculators: [
      { toolId: 'pack-hold', text: 'Run a gate-freeze study to optimize hold time.', label: 'Pack & Hold Study', description: 'Maximize useful hold to compensate for shrinkage.' },
      { toolId: 'cooling-time', text: 'Estimate cooling time so the part is fully solid before ejection.', label: 'Cooling Time Calculator', description: 'Adequate cooling locks dimensions.' },
      { toolId: 'material-data', text: 'Reference resin shrinkage spec for flow vs cross-flow direction.', label: 'Material Data Sheet', description: 'Use published shrinkage values to set tooling allowances.' },
    ],
    settings: [
      'Increase pack pressure within clamp limits.',
      'Increase hold time to gate-freeze point.',
      'Lower mold temperature to reduce volumetric contraction.',
      'Lower melt temperature if dimensions over-shrink.',
    ],
  }),

  // -------- Weld Lines --------
  'weld-lines': build({
    defect: 'Weld Lines',
    intro: COMMON_INTRO,
    inspect: [
      'Confirm weld is at a head-on flow front meeting (vs meld at shallow angle).',
      'Map weld locations vs gates and obstructions (holes, inserts).',
      'Inspect vents at weld zones — trapped gas weakens the bond.',
    ],
    measure: [
      'Measure flow-front temperature at the weld zone (target < 20 °C drop).',
      'Verify mold-surface temperature at the weld is at upper end of window.',
    ],
    calculators: [
      { toolId: 'viscosity-curve', text: 'Find the injection velocity that keeps the front hot at the weld.', label: 'Viscosity Curve Study', description: 'Faster, stable fill keeps weld fronts hot.' },
      { toolId: 'pressure-loss', text: 'Verify pack pressure can reach the weld line.', label: 'Pressure Loss Calculator', description: 'Confirm pressure transmission to the weld.' },
      { toolId: 'vent-depth', text: 'Vent the weld zone — trapped air weakens the joint.', label: 'Vent Depth Calculator', description: 'Size vents at weld zones to evacuate trapped gas.' },
    ],
    settings: [
      'Increase melt temperature 5–10 °C.',
      'Increase mold-surface temperature in the weld zone.',
      'Increase injection velocity so fronts meet hot.',
      'Add or relocate gates so welds fall in non-critical zones.',
    ],
  }),
};

export const getDefectDiagnostics = (slug: string): DefectDiagnostics | undefined =>
  defectDiagnostics[slug];
