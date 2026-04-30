import type { DefectGuide } from './defectGuides';
import burnMarksGateBurn from '@/assets/burn-marks-gate-burn.jpg';
import burnMarksEndOfFill from '@/assets/burn-marks-end-of-fill.jpg';
import burnMarksRunnerComparison from '@/assets/burn-marks-runner-comparison.jpg';
import burnMarksVentingSolutions from '@/assets/burn-marks-venting-solutions.jpg';
import burnMarksDieselEffect from '@/assets/burn-marks-diesel-effect.jpg';
import burnMarksFlowchart from '@/assets/burn-marks-flowchart.jpg';
// Discoloration
import discolorationMechanismMap from '@/assets/discoloration-mechanism-map.jpg';
import discolorationDeltaEThresholds from '@/assets/discoloration-deltae-thresholds.jpg';
import discolorationRunnerComparison from '@/assets/discoloration-runner-comparison.jpg';
import discolorationFlowchart from '@/assets/discoloration-flowchart.png';
// Flash
import flashProcessEffects from '@/assets/flash-process-effects.jpg';
import flashPartingLineCrossSection from '@/assets/flash-parting-line-cross-section.png';
// Sink marks
import sinkMarksCrossSection from '@/assets/sink-marks-cross-section.png';
import sinkMarksLocationMap from '@/assets/sink-marks-location-map.png';
import sinkMarksFormationTimeline from '@/assets/sink-marks-formation-timeline.png';
import sinkMarksRibDesignRule from '@/assets/sink-marks-rib-design-rule.png';
import flashCorePinCrossSection from '@/assets/flash-core-pin-cross-section.png';
import flashTypeComparison from '@/assets/flash-type-comparison.png';
import flashRunnerComparison from '@/assets/flash-runner-comparison.png';
import flashVentingComparison from '@/assets/flash-venting-comparison.png';
import flashTroubleshootingFlowchart from '@/assets/flash-troubleshooting-flowchart.png';
// Jetting
import jettingTopView from '@/assets/jetting-top-view.jpg';
import jettingCrossSection from '@/assets/jetting-cross-section.jpg';
import jettingGateTypes from '@/assets/jetting-gate-types.png';
import jettingFlowchart from '@/assets/jetting-flowchart.jpg';
// Meld Line
import meldLineFormation from '@/assets/meld-line-formation.jpg';
import meldLineCrossSection from '@/assets/meld-line-cross-section.jpg';
import meldLineRunnerComparison from '@/assets/meld-line-runner-comparison.png';
import meldLineMeetingAngle from '@/assets/meld-line-meeting-angle.jpg';
// Flow Lines
import flowLinesAppearance from '@/assets/flow-lines-appearance.png';
import flowLinesFountainFlow from '@/assets/flow-lines-fountain-flow.png';
import flowLinesVulnerabilityMap from '@/assets/flow-lines-vulnerability-map.png';
import flowLinesRunnerComparison from '@/assets/flow-lines-runner-comparison.png';
import flowLinesPreventionLevers from '@/assets/flow-lines-prevention-levers.png';
import flowLinesDecisionTree from '@/assets/flow-lines-decision-tree.png';
import meldLineFlowchart from '@/assets/meld-line-flowchart.png';

// Shared reference list reused across guides
const commonRefs = [
  { id: 'R1', text: 'BASF. Injection-Molding Problems in Engineering Thermoplastics — Causes and Solutions.' },
  { id: 'R2', text: 'DuPont. Molding Guide for Engineering Thermoplastics.' },
  { id: 'R3', text: 'SABIC. Injection Molding Processing Guides.' },
  { id: 'R4', text: 'Autodesk Moldflow. Troubleshooting Documentation and Insight User Guide.' },
  { id: 'R5', text: 'Moldex3D. Simulation Theory and Practice; Case Studies.' },
  { id: 'R6', text: 'RJG Inc. Decoupled Molding, Cavity Pressure, and Process Troubleshooting References.' },
  { id: 'R7', text: 'Mold-Masters. Hot Runner Troubleshooting Guide.' },
  { id: 'R8', text: 'Husky Injection Molding Systems. Hot Runner Fundamentals.' },
  { id: 'R9', text: 'ASTM D955 / ISO 294-4. Standard Test Methods for Molding Shrinkage of Thermoplastics.' },
  { id: 'R10', text: 'SPE / Plastics Engineering. Defect-focused technical articles and ANTEC papers.' },
  { id: 'R11', text: 'PlasticsToday. The Troubleshooter Series.' },
  { id: 'R12', text: 'Bozzelli, J. Scientific Molding Principles and Process Optimization.' },
];

export const additionalDefectGuides: DefectGuide[] = [
  // ---------------- BURN MARKS ----------------
  {
    slug: 'burn-marks',
    title: 'Burn Marks',
    summary:
      'Brown, black, or charred regions caused by thermal degradation — either from shear heating at the gate (Gate Burn) or adiabatic compression of trapped air at the last-fill zone (Diesel Effect).',
    category: 'Cosmetic & Structural',
    severity: 'high',
    tags: ['gate burn', 'diesel effect', 'venting', 'shear', 'degradation', 'hot runner', 'cold runner'],
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        blocks: [
          {
            type: 'paragraph',
            text:
              'Burn marks are thermally induced discolorations or charred regions on the surface of a molded part caused by excessive heat acting on the polymer melt. Two mechanistically distinct types exist and must be differentiated because their root causes, diagnostics, and corrective actions differ substantially: Gate Burns (shear-driven) and End-of-Fill Burns / Diesel Effect (compression-driven).',
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Irreversible damage',
            text:
              'Both produce permanent polymer degradation. Affected zones are brittle, oxidized, and mechanically inferior — weld-plane strength may be 30–70% below base material. For structural or medical parts, any burn is grounds for automatic rejection.',
          },
          {
            type: 'table',
            caption: 'Gate Burn vs End-of-Fill Burn — Quick Reference',
            columns: ['Attribute', 'Gate Burn', 'End-of-Fill Burn (Diesel)'],
            rows: [
              ['Heat source', 'Frictional shear at gate restriction', 'Adiabatic compression of trapped air'],
              ['Location', 'At or adjacent to gate entry', 'Last-fill zone: corners, ribs, blind pockets'],
              ['Appearance', 'Brown/black streak at gate; downstream streaks if severe', 'Black char dot or patch with silver-gray halo'],
              ['Primary fix', 'Reduce injection speed; increase gate size', 'Add/clean vents; reduce fill speed at last stage'],
              ['Hot runner specific', 'Tip overheating; manifold stagnation', 'Less common; sequential valve gating prevents'],
              ['Cold runner specific', 'Runner pressure drop forces high gate velocity', 'Limited vent locations amplify risk'],
            ],
          },
          {
            type: 'image',
            src: burnMarksGateBurn,
            alt: 'Gate Burn Mark diagram showing thermal degradation at the gate land caused by shear heat, with brown/black discoloration and brittle surface',
            figureNumber: 'Figure 1A',
            caption: 'Gate Burn — shear heat at the gate land causes thermal degradation immediately at or downstream of the gate vestige.',
            lookFor: {
              title: 'Gate Burn — visual signature',
              tone: 'warning',
              items: [
                'Elliptical brown/black halo radiating from the gate center; sometimes with downstream streaks following flow direction.',
                'Burn is co-located with the gate vestige — never deep into the cavity.',
                'Surface feels brittle or rough; in severe cases the cross-section is degraded, not just the skin.',
                'Worsens as injection speed increases — the smoking gun for shear-driven burn.',
              ],
            },
          },
          {
            type: 'image',
            src: burnMarksEndOfFill,
            alt: 'End-of-Fill Burn (Diesel Effect) diagram showing adiabatic compression of trapped air at the last-fill zone causing auto-ignition of the polymer',
            figureNumber: 'Figure 1B',
            caption: 'End-of-Fill Burn (Diesel Effect) — trapped air compressed by the advancing melt front auto-ignites at 300–500 °C and chars the polymer at the cavity extremity.',
            lookFor: {
              title: 'End-of-Fill Burn — visual signature',
              tone: 'warning',
              items: [
                'Discrete black/dark-brown char dot or patch at a corner, rib tip, boss, or end of a long flow path — never near the gate.',
                'Characteristic silver-gray halo around the char zone (partial pyrolysis in the slightly cooler region).',
                'Char residue accumulates on the tool surface at the same spot — confirms diesel mechanism.',
                'Always co-located with a missing, plugged, or undersized vent — the diagnostic key.',
              ],
            },
          },
        ],
      },
      {
        id: 'definition',
        title: '1. Definition & Overview',
        blocks: [
          { type: 'heading', level: 3, text: '1.1 Visual & structural manifestation' },
          {
            type: 'paragraph',
            text:
              'Gate burns appear as discrete discolored regions at the gate vestige, typically elliptical and radiating from the gate center. Downstream streaks following the flow direction indicate severe burn carrying charred material into the cavity. End-of-fill burns appear as discrete black/dark brown spots at the part\'s geometric extremity, often with a characteristic silver-gray halo representing partial pyrolysis adjacent to the primary burn.',
          },
          {
            type: 'paragraph',
            text:
              'At burn locations, the polymer backbone has been chemically degraded. Molecular weight is reduced, volatile decomposition products are generated (HCl from PVC, CO/CO₂ from most thermoplastics), and the affected zone is brittle and oxidized.',
          },
        ],
      },
      {
        id: 'root-causes',
        title: '2. Root Causes',
        blocks: [
          { type: 'heading', level: 3, text: '2.1 Material factors' },
          {
            type: 'list',
            items: [
              'Shear-sensitive resins (PVC, POM, PC, ABS) degrade rapidly at elevated shear/temperature.',
              'Heat-sensitive grades and flame-retardant compounds have narrow processing windows.',
              'Inadequate stabilizer packages or excessive regrind reduce thermal margin.',
              'Glass-filled grades increase shear heating at restrictions.',
            ],
          },
          { type: 'heading', level: 3, text: '2.2 Process parameters — Gate Burn' },
          {
            type: 'list',
            items: [
              'Excessive injection speed → high gate velocity → frictional heating beyond degradation threshold.',
              'Gate too small for shot size — produces shear rates above material limits (typically >100,000 s⁻¹ critical for sensitive resins).',
              'Melt temperature too high — reduces shear margin before degradation onset.',
              'Hot-runner tip overheating or stagnation zones in manifold.',
            ],
          },
          { type: 'heading', level: 3, text: '2.3 Process parameters — End-of-Fill Burn' },
          {
            type: 'list',
            items: [
              'Inadequate venting at last-fill zone — compressed air auto-ignites at 300–500°C.',
              'Excessive fill speed at end of stroke — insufficient time for air escape.',
              'Worn or contaminated vents (clogged with polymer residue or rust).',
              'Clamp tonnage excessive — closes vents too tightly.',
            ],
          },
          {
            type: 'image',
            src: burnMarksDieselEffect,
            alt: 'Diesel Effect adiabatic compression mechanism diagram showing four stages from cavity filling to autoignition and char formation, with air temperature progression from ambient to 300-500°C',
            figureNumber: 'Figure 2',
            caption: 'The Diesel Effect — four-stage adiabatic compression of trapped air. T₂ = T₁ × (P₂/P₁)^((γ-1)/γ); 10:1 compression of 50 °C air reaches ~540 °C, well above polymer degradation.',
            lookFor: {
              title: 'Stages on the floor — what to verify',
              tone: 'warning',
              items: [
                'Stage 2 (compression begins) is where venting must already be open — by Stage 3, char is forming.',
                'If the burn worsens with higher injection speed, you are spending more time in Stage 3 — slow the last 20–30 % of fill.',
                'Char accumulating on the tool surface at one location is a Stage-3 fingerprint — clean and measure that vent first.',
                'Use a short-shot study to identify which corner reaches Stage 2 last — that is your air-trap location.',
              ],
            },
          },
          { type: 'heading', level: 3, text: '2.4 Cold runner vs hot runner' },
          {
            type: 'table',
            columns: ['Aspect', 'Cold Runner', 'Hot Runner'],
            rows: [
              ['Gate burn risk driver', 'Runner pressure drop forces higher gate velocity', 'Tip temperature drift; manifold dead spots; valve-pin shear'],
              ['Diesel risk', 'Higher (constrained vent locations)', 'Lower with sequential valve gating'],
              ['Diagnostic priority', 'Gate size & velocity, vent condition', 'Tip temperature accuracy, manifold balance, residence time'],
            ],
          },
          {
            type: 'image',
            src: burnMarksRunnerComparison,
            alt: 'Cold Runner vs Hot Runner system comparison showing burn mark susceptibility, temperature profiles, and risk factors for both gate burn and end-of-fill burn',
            figureNumber: 'Figure 3',
            caption: 'Cold-runner vs hot-runner susceptibility. Cold runners carry higher risk for both burn types; hot runners reduce risk overall but introduce unique tip and manifold failure modes.',
            lookFor: {
              title: 'How to use this comparison during diagnosis',
              tone: 'info',
              items: [
                'Cold runner + gate burn → start with injection speed and gate diameter; the runner pressure drop is forcing high gate velocity.',
                'Cold runner + EOF burn → vent placement is constrained; expect to add a vent insert or ejector-pin vent.',
                'Hot runner + single-cavity burn → suspect tip thermocouple, dead leg, or stagnation in that drop — not a global process drift.',
                'Hot runner + EOF burn → check valve-gate sequencing first; sequential fill virtually eliminates the diesel mode.',
              ],
            },
          },
          { type: 'heading', level: 3, text: '2.5 Machine factors' },
          {
            type: 'list',
            items: [
              'Worn check ring → backflow → cycle-to-cycle melt history variation.',
              'Worn screw flights → poor melt homogeneity, localized hot spots.',
              'Excessive residence time (oversized barrel for shot size).',
              'Defective or drifting thermocouples masking actual melt temperature.',
            ],
          },
        ],
      },
      {
        id: 'diagnostics',
        title: '3. Diagnostic Techniques',
        blocks: [
          {
            type: 'orderedList',
            items: [
              'Locate the burn — gate area or last-fill area? This is the primary diagnostic split.',
              'Run a short-shot study — observe at 50%, 75%, 95% fill. Air traps reveal future diesel burn locations.',
              'Measure actual melt temperature with a purge-shot pyrometer; do not trust setpoints.',
              'Calculate gate shear rate (4Q / πr³) and compare to material limits.',
              'Inspect vents for damage, residue buildup, or insufficient depth.',
              'For hot runners: review tip temperature history, manifold zone deltas, and startup interruptions.',
            ],
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Decoupled molding helps',
            text:
              'A velocity-controlled fill phase with cavity-pressure transfer often reveals whether the burn correlates with fill speed (shear) or end-of-fill compression (diesel).',
          },
        ],
      },
      {
        id: 'prevention',
        title: '4. Preventive Measures',
        blocks: [
          {
            type: 'list',
            items: [
              'Specify gate size to keep shear rate below the resin\'s recommended maximum.',
              'Design venting at every predicted last-fill location: typical depth 0.013–0.038 mm depending on resin.',
              'Use Moldflow/Moldex3D simulation in DFM to predict air traps and shear hot spots.',
              'For hot runners: specify proper tip geometry, balanced manifold, redundant thermocouples, and zone alarms.',
              'Establish residence-time guideline (shot size ÷ barrel capacity ≥ 20–30%).',
              'Train operators to recognize charred purge as an early warning of barrel hold-up.',
            ],
          },
          {
            type: 'image',
            src: burnMarksVentingSolutions,
            alt: 'Venting Design Solutions diagram comparing poor/no venting, parting-line vent, and ejector-pin/insert vent options for end-of-fill burn prevention, with vent depth reference table by material group',
            figureNumber: 'Figure 4',
            caption: 'Venting design solutions for End-of-Fill burn prevention — three configurations with vent depth reference by material group.',
            lookFor: {
              title: 'Vent design checks before cutting steel',
              tone: 'success',
              items: [
                'Match vent depth to the resin group: polyolefins 0.010–0.020 mm; ABS/HIPS/PS 0.020–0.030 mm; engineering resins (PC, PA, POM, PBT) 0.025–0.040 mm.',
                'Vent width 3–10 mm at the burn location, with a 0.5–1.0 mm relief land behind it venting to atmosphere or vacuum.',
                'For deep ribs, blind pockets, or bosses where parting-line venting is impossible, use ejector-pin clearance or porous-steel (Porcerax) inserts at 0.005–0.015 mm.',
                'Verify clamp tonnage is the minimum that prevents flash — over-clamping closes the vents you just cut.',
              ],
            },
          },
        ],
      },
      {
        id: 'corrective-actions',
        title: '5. Corrective Actions',
        blocks: [
          { type: 'heading', level: 3, text: '5.1 Gate burn — first-response sequence' },
          {
            type: 'orderedList',
            items: [
              'Reduce injection speed in the final fill segment.',
              'Verify and lower melt temperature if at upper limit.',
              'Check hot-runner tip temperature; reduce 5–10°C if drifting high.',
              'Open the gate (remove gate insert, EDM larger diameter) if speed reduction is unacceptable.',
              'Switch to lower-shear gate geometry (fan, tab, or larger edge).',
            ],
          },
          { type: 'heading', level: 3, text: '5.2 End-of-fill burn — first-response sequence' },
          {
            type: 'orderedList',
            items: [
              'Clean existing vents with copper wire or ultrasonic; do not enlarge prematurely.',
              'Reduce final-stage fill velocity (V→P transfer earlier).',
              'Add vents: parting line, ejector pin clearance, vent inserts at burn location.',
              'Reduce clamp tonnage to the minimum that prevents flash.',
              'In severe cases: machine vent slots, add porous steel (Porcerax) inserts at trapped-air zones.',
            ],
          },
          {
            type: 'image',
            src: burnMarksFlowchart,
            alt: 'Burn Mark Diagnosis and Troubleshooting Flowchart with branches for Gate Burn (cold runner and hot runner fixes) and End-of-Fill Burn (vent inspection, fill speed, valve gating, advanced venting)',
            figureNumber: 'Figure 5',
            caption: 'Complete burn-mark diagnostic flowchart — Gate Burn pathway on the left, End-of-Fill (Diesel) pathway on the right, converging at "Burn Mark Resolved → document parameters & update SOP."',
            lookFor: {
              title: 'How to walk this flowchart on the floor',
              tone: 'info',
              items: [
                'Always answer the first decision (where is the burn located?) before changing any parameter — wrong branch = wrong fix.',
                'Cold-runner branch: drop injection speed and check melt temp / back pressure before touching the steel.',
                'Hot-runner branch: tip thermocouple and manifold dead-leg checks come before any process change.',
                'EOF branch: clean the vent first, then reduce last-stage fill speed, then add a vent — in that order.',
                'If "still burning" after the simulation step, escalate to gate geometry or sequential valve gating; do not keep tweaking the same parameters.',
              ],
            },
          },
        ],
      },
      {
        id: 'best-practices',
        title: '6. Industry Best Practices & Pitfalls',
        blocks: [
          {
            type: 'list',
            items: [
              'Never assume a burn is "just cosmetic" — it always indicates degraded polymer.',
              'Diagnose location before changing parameters: gate vs end-of-fill drives entirely different actions.',
              'Document burn location with photos and short-shot studies before any process change.',
              'On hot-runner tools, treat single-cavity burns as thermal/hardware faults, not process drift.',
            ],
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Common pitfalls',
            text:
              'Increasing pack pressure to "push past" a diesel burn — it worsens compression. Lowering melt temp to fix gate burn while leaving injection speed maxed — addresses the wrong variable. Adding tonnage to suppress flash on a vent that needs to stay open.',
          },
        ],
      },
    ],
    references: commonRefs,
  },

  // ---------------- DISCOLORATION ----------------
  {
    slug: 'discoloration',
    title: 'Discoloration',
    summary:
      'Any unintended shift in molded-part color: yellowing, browning, blackening, streaks, specks, or cavity-to-cavity shade mismatch — caused by thermal degradation, contamination, poor pigment dispersion, oxidation, or uneven thermal history.',
    category: 'Cosmetic',
    severity: 'medium',
    tags: ['color shift', 'yellowing', 'black specks', 'contamination', 'hot runner', 'residence time'],
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        blocks: [
          {
            type: 'paragraph',
            text:
              'Discoloration is any unintended shift in part color relative to the approved standard, including overall yellowing/browning, local blackening, streaks, specks, and cavity-to-cavity shade mismatch. Technically it is a symptom rather than a single mechanism, and on the floor the highest-yield split is global vs localized color shift.',
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Diagnostic split',
            text:
              'Global yellowing/browning → suspect residence time, barrel temperature, hot-runner soak, contamination, or oxidized material. Local discoloration near gate, end of fill, weld lines, or vent-limited zones → suspect shear heating, dead spots, trapped gas, hot-runner imbalance, or mold contamination.',
          },
          {
            type: 'table',
            caption: 'ΔE color-difference reference (customer specs override)',
            columns: ['Category', 'Approximate ΔE* threshold'],
            rows: [
              ['Barely perceptible', '1.0'],
              ['Production alert', '3.0'],
              ['Reject / containment', '5.0'],
            ],
          },
          {
            type: 'image',
            src: discolorationMechanismMap,
            alt: 'Mechanism map showing the four primary defect families that produce visible color shift in molded parts: thermal degradation, contamination, colorant/masterbatch dispersion, and oxidation/venting/burn-related shift',
            figureNumber: 'Figure 1',
            caption: 'Mechanism map — the four coupled drivers behind visible color shift on molded parts.',
            lookFor: {
              title: 'Use this map to bucket the defect first',
              tone: 'info',
              items: [
                'Thermal degradation → check residence time, hot-runner soak, and barrel/nozzle setpoints.',
                'Contamination → audit material identity, hopper/throat cleanliness, and changeover purge records.',
                'Colorant/masterbatch dispersion → check feed rate, back pressure, screw mixing, and masterbatch carrier compatibility.',
                'Oxidation / venting / burn → inspect vents at end-of-fill, weld lines, and trapped-air zones.',
              ],
            },
          },
          {
            type: 'image',
            src: discolorationDeltaEThresholds,
            alt: 'Bar chart showing example visual color-difference thresholds for molded parts: 1.0 barely perceptible, 3.0 production alert, 5.0 reject/containment',
            figureNumber: 'Figure 2',
            caption: 'Example ΔE* alert thresholds for molded-part color verification. Customer-specific limits always override generic thresholds.',
            lookFor: {
              title: 'How to read this on the floor',
              tone: 'info',
              items: [
                'Always measure with a calibrated spectrophotometer (CIELAB per ASTM D2244) — never rely on visual judgement alone.',
                'A ΔE in the 1–3 band is a leading indicator: investigate before it crosses 5.',
                'Document the ΔE release criterion with the customer before production — it converts subjective color calls into measurable control.',
              ],
            },
          },
        ],
      },
      {
        id: 'taxonomy',
        title: '1. Practical Taxonomy',
        blocks: [
          {
            type: 'table',
            columns: ['Observed appearance', 'Common physical meaning', 'First checks'],
            rows: [
              ['Uniform yellowing/browning', 'Excess residence, melt too hot, oxidation, hot-runner soak', 'Barrel/nozzle/HR temperatures; downtime history; purge'],
              ['Dark or black specks', 'Degraded hold-up, contamination, burnt fragments', 'Screw tip / check ring; dead spots; HR nozzles; hopper'],
              ['Color streaks / banding', 'Poor dispersion, masterbatch mismatch, incomplete mixing', 'Colorant feed rate; back pressure; screw design'],
              ['Brown region near gate', 'High shear, small gate, tip overheating', 'Gate size; injection speed; nozzle/HR zone temperatures'],
              ['Discoloration at weld lines / EOF', 'Oxidation from trapped air, venting deficiency', 'Venting; fill speed; melt temp; air-trap simulation'],
              ['Cavity-to-cavity mismatch', 'Runner imbalance, unequal thermal history', 'Runner balance; manifold/nozzle temps; cavity pressure'],
            ],
          },
        ],
      },
      {
        id: 'root-causes',
        title: '2. Root Causes',
        blocks: [
          { type: 'heading', level: 3, text: '2.1 Material factors' },
          {
            type: 'list',
            items: [
              'Hygroscopic resins not properly dried (PC, PA, PBT, PET) → hydrolysis → yellowing.',
              'Incompatible regrind or cross-contaminated resin in the hopper/throat.',
              'Carrier resin in masterbatch incompatible with base polymer.',
              'Pigment thermal stability exceeded (e.g., organic pigments above 280°C).',
              'Flame-retardant grades have narrow safe windows; small overruns produce visible color drift.',
            ],
          },
          { type: 'heading', level: 3, text: '2.2 Process parameters' },
          {
            type: 'list',
            items: [
              'Excess melt temperature → oxidation and yellowing.',
              'Excess residence time (small shot in oversized barrel, long downtime cycles).',
              'Excessive screw RPM / back pressure → shear-induced color shift.',
              'Gate too small → local shear burn near gate (brown halo).',
            ],
          },
          { type: 'heading', level: 3, text: '2.3 Cold runner vs hot runner' },
          {
            type: 'paragraph',
            text:
              'Cold runners impose greater pre-gate heat loss, often reducing runner-side thermal degradation but increasing viscosity variation and cavity-to-cavity color spread. Hot runners minimize pre-gate loss and improve uniformity when properly tuned, but add residence time and create surfaces/pockets where degraded material accumulates. Hot runners only outperform cold runners when temperature control, purge discipline, manifold balance, and flow-path cleanliness are tightly controlled.',
          },
          {
            type: 'image',
            src: discolorationRunnerComparison,
            alt: 'Side-by-side schematic comparing cold runner versus hot runner thermal history and color stability',
            figureNumber: 'Figure 3',
            caption: 'Cold runner vs hot runner — color stability trade-off.',
            lookFor: {
              title: 'Trade-offs at a glance',
              tone: 'info',
              items: [
                'Cold runner — more pre-gate heat loss; lower runner-side degradation but more cavity-to-cavity color spread.',
                'Hot runner — stable gate temperature; higher degradation risk if hot spots, dead zones, or excessive soak time exist.',
                'Hot runner only wins when manifold balance, purge discipline, and flow-path cleanliness are tight.',
              ],
            },
          },
        ],
      },
      {
        id: 'diagnostics',
        title: '3. Diagnostic Techniques',
        blocks: [
          {
            type: 'orderedList',
            items: [
              'Measure ΔE with a calibrated spectrophotometer (CIELAB per ASTM D2244) — replace subjective visual calls.',
              'Purge first if global shift is suspected — assume aged/contaminated melt until proven otherwise.',
              'Audit material identity and dryer performance (dew point, residence in hopper).',
              'For specks: inspect screw tip, check ring, nozzle adapter, and hot-runner nozzles for degraded buildup.',
              'For local color: review gate geometry, vent condition, and air-trap maps from simulation.',
              'For cavity mismatch: log hot-runner zone actuals, check manifold balance and water-circuit symmetry.',
            ],
          },
          {
            type: 'image',
            src: discolorationFlowchart,
            alt: 'Troubleshooting flowchart for discoloration emphasizing changeover, residence, temperature, venting, and objective color confirmation',
            figureNumber: 'Figure 4',
            caption: 'Shop-floor troubleshooting sequence — changeover → residence → temperature → venting → objective ΔE confirmation.',
            lookFor: {
              title: 'Sequence to follow on the floor',
              tone: 'success',
              items: [
                'Confirm defect mode (uniform yellowing vs streaks vs local burn) before changing any setpoint.',
                'Check changeover, purge quality, raw material lot, dryer status, and downtime first.',
                'For local issues: inspect venting, air traps, gate shear, and hot spots.',
                'For global shifts: reduce residence and melt temperature, clean barrel/HR/nozzle.',
                'Always close the loop with a ΔE measurement, then lock the process window.',
              ],
            },
          },
        ],
      },
      {
        id: 'prevention',
        title: '4. Preventive Measures',
        blocks: [
          {
            type: 'list',
            items: [
              'Document and enforce purge procedures for material/color changeovers.',
              'Set residence-time targets per resin; alarm on excessive downtime cycles.',
              'Use compatible masterbatch carriers and validate at production temperatures.',
              'Maintain dryer dew point below resin spec; monitor in real time.',
              'Schedule periodic deep-clean of hot-runner nozzles and screw tips.',
              'Establish ΔE release criteria with customer and quality before production.',
            ],
          },
        ],
      },
      {
        id: 'corrective-actions',
        title: '5. Corrective Actions',
        blocks: [
          {
            type: 'orderedList',
            items: [
              'Purge with virgin or commercial purge compound until clean.',
              'Verify material identity from gaylord through hopper to throat.',
              'Lower melt temperature to minimum that supports stable fill.',
              'Reduce residence by adjusting cycle, shot size, or barrel selection.',
              'For hot-runner color drift: check zone actuals individually; do not change all zones together.',
              'For black specks: tear-down clean of screw tip, nozzle, and adapters; standardize regrind ratio.',
            ],
          },
        ],
      },
      {
        id: 'best-practices',
        title: '6. Best Practices & Pitfalls',
        blocks: [
          {
            type: 'callout',
            tone: 'warning',
            title: 'Common pitfalls',
            text:
              'Subjective visual inspection only (no ΔE). Changing all hot-runner zones together and losing diagnostic resolution. Ignoring restart procedures on hot-runner jobs. Treating apparent color change from gloss/texture as chemical discoloration.',
          },
        ],
      },
    ],
    references: commonRefs,
  },

  // ---------------- FLASH ----------------
  {
    slug: 'flash',
    title: 'Flash',
    summary:
      'Uncontrolled escape of polymer melt into unintended clearances — a thin fin or feather edge outside the nominal part boundary. Two dominant families: Parting Line Flash (split-line driven) and Core Flash (local component driven).',
    category: 'Dimensional & Cosmetic',
    severity: 'high',
    tags: ['parting line', 'core flash', 'clamp tonnage', 'mold breathing', 'venting', 'seal-off'],
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        blocks: [
          {
            type: 'paragraph',
            text:
              'Flash is the uncontrolled escape of polymer melt into an unintended clearance, producing a thin fin, feather edge, or burr outside the nominal part boundary. The two dominant families — parting line flash and core flash — share physics but differ in diagnosis and corrective hierarchy. The governing condition is not merely "too much pressure"; it is the combination of flowable melt at the defect location, sufficient gap geometry, and pressure differential that exceeds local resistance.',
          },
          {
            type: 'table',
            columns: ['Attribute', 'Parting Line Flash', 'Core Flash'],
            rows: [
              ['Location', 'Main parting/split line', 'Around pins, inserts, ejectors, sleeves, slides, lifters'],
              ['Visual form', 'Continuous feather edge along perimeter', 'Localized ring, crescent, or burr around features'],
              ['Primary cause', 'Mold opening/breathing, plate deflection, parting wear', 'Component wear, fit tolerance, local deflection, contamination'],
              ['First diagnostic', 'Pressure-induced vs damage-induced', 'Local component fit vs local overpressure'],
              ['Primary corrective', 'Clamp support, transfer/pack reduction, spotting', 'Component repair, fit restoration, seal-off redesign'],
            ],
          },
          {
            type: 'image',
            src: flashTypeComparison,
            alt: 'Side-by-side comparison of parting line flash and core flash',
            figureNumber: 'Figure 1',
            caption: 'Parting line flash (continuous feather edge along the split line) vs core flash (localized ring/crescent at a pin, insert, or shutoff).',
            lookFor: {
              title: 'Classify before you adjust',
              tone: 'info',
              items: [
                'Continuous fin tracking the split line → parting-line family (clamp / breathing / pack).',
                'Localized ring or crescent around a pin, insert, sleeve, or shutoff → core family (fit / wear / local pressure).',
                'Both present together → diagnose parting-line first, then re-evaluate core after pressure is corrected.',
              ],
            },
          },
        ],
      },
      {
        id: 'definition',
        title: '1. Definition & Manifestation',
        blocks: [
          {
            type: 'paragraph',
            text:
              'Visually, parting line flash tracks an edge or split line; core flash appears as a circular or crescent fin around a hole, boss, or insert. Structurally, flash is rarely "just cosmetic" — it interferes with mating surfaces, creates sealing leaks, changes snap-fit geometry, obstructs assembly, and can become a critical cleanliness/safety issue in medical and electrical parts. Flash is also an indirect marker of overpacking, mold wear, poor support, misalignment, or hot-runner thermal instability.',
          },
          {
            type: 'image',
            src: flashPartingLineCrossSection,
            alt: 'Cross-section showing melt escaping through an opened parting line',
            figureNumber: 'Figure 2',
            caption: 'Parting line flash mechanism — mold breathing or worn shut-off lands let melt extrude into the split line under pack pressure.',
            lookFor: {
              title: 'Cross-section diagnostic cues',
              tone: 'warning',
              items: [
                'Gap opens during pack/hold, not during fill — flash thickness scales with peak cavity pressure.',
                'Continuous fin = global breathing or clamp deficit; intermittent fin = localized damage or debris on the land.',
                'Verify support pillars and tie-bar balance before adding tonnage.',
              ],
            },
          },
          {
            type: 'image',
            src: flashCorePinCrossSection,
            alt: 'Cross-section showing flash forming around a worn core pin',
            figureNumber: 'Figure 3',
            caption: 'Core flash mechanism — clearance growth or loss of seal length at a pin, sleeve, insert, or shutoff allows melt to leak around the local feature.',
            lookFor: {
              title: 'Local feature diagnostic cues',
              tone: 'warning',
              items: [
                'Ring or crescent geometry tells you which side of the clearance failed — blue-spot to confirm.',
                'Check seal-land length: short lands flash long before nominal clearance is exceeded.',
                'Cold clearance can be correct while thermal growth at running temperature opens the gap — measure hot if possible.',
              ],
            },
          },
        ],
      },
      {
        id: 'root-causes',
        title: '2. Root Causes',
        blocks: [
          { type: 'heading', level: 3, text: '2.1 Material factors' },
          {
            type: 'list',
            items: [
              'Low melt viscosity / high MFR — reduces resistance to flow into micro-gaps.',
              'High melt temperature — extends fluidity window and slows freeze-off in clearances.',
              'Internal lubricants / mold release — alters pressure transmission.',
              'Resin lot-to-lot viscosity drift can suddenly produce flash on a previously stable process.',
            ],
          },
          { type: 'heading', level: 3, text: '2.2 Process parameters' },
          {
            type: 'list',
            items: [
              'Excessive pack pressure — the dominant driver once cavity is volumetrically full.',
              'Late V→P transfer — overpacks cavity before transfer occurs.',
              'Excessive hold time — prolonged gate-open feeds local leakage.',
              'Excessive injection speed — drives high cavity pressure spike.',
              'Insufficient clamp tonnage — mold breathing opens parting line.',
            ],
          },
          {
            type: 'image',
            src: flashProcessEffects,
            alt: 'Charts of polymer flash risk by resin and clamp force vs flash severity',
            figureNumber: 'Figure 4',
            caption: 'Process parameter effects — polymer flash risk by resin family (left) and clamp force adequacy vs flash severity (right).',
            lookFor: {
              title: 'Read the curves on the floor',
              tone: 'info',
              items: [
                'High-MFR resins (PP, TPU, POM, PA66) sit in the high-risk band — start with conservative pack and earlier transfer.',
                'Flash severity climbs steeply below ~80% of required clamp; above 100% returns diminish — do not chase flash with tonnage.',
                'Use this as a sanity check before changing setpoints: confirm clamp adequacy first.',
              ],
            },
          },
          { type: 'heading', level: 3, text: '2.3 Cold runner vs hot runner' },
          {
            type: 'image',
            src: flashRunnerComparison,
            alt: 'Comparison of cold runner and hot runner pressure profiles relative to flash risk',
            figureNumber: 'Figure 5',
            caption: 'Hot runners maintain melt temperature and pressure closer to the gate, raising local cavity pressure for the same setpoints — a known flash amplifier after conversion.',
            lookFor: {
              title: 'After hot-runner conversion, re-qualify',
              tone: 'warning',
              items: [
                'Transfer position and pack pressure carried over from cold runner are typically too aggressive.',
                'Check manifold-zone balance — a hot drop running 10–15 °C above target will flash that cavity first.',
                'Valve-gate timing and stroke directly affect annular flash around the pin.',
              ],
            },
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Hot-runner conversion warning',
            text:
              'Hot runners preserve melt temperature and pressure closer to the gate, so a previously safe cold-runner pack recipe may now overpressurize the cavity and create flash. Always re-qualify transfer position, pack pressure, nozzle balance, and valve-gate timing after hot-runner conversion.',
          },
          { type: 'heading', level: 3, text: '2.4 Mold & component factors' },
          {
            type: 'list',
            items: [
              'Parting line wear or impact damage (dings, debris).',
              'Plate deflection from inadequate support pillars.',
              'Worn ejector pins, sleeves, or core pins (clearance grew beyond shut-off limit).',
              'Insert misalignment or thermal growth mismatch.',
              'Contamination (debris, regrind chips) trapped on shut-off surfaces.',
            ],
          },
          {
            type: 'image',
            src: flashVentingComparison,
            alt: 'Proper versus inadequate mold venting design',
            figureNumber: 'Figure 6',
            caption: 'Proper vs inadequate mold venting. Vents that are too deep flash directly; vents that are too shallow trap gas, force higher pack, and indirectly create flash elsewhere.',
            lookFor: {
              title: 'Vent inspection checklist',
              tone: 'info',
              items: [
                'Vent depth within resin spec (typical 0.013–0.038 mm depending on viscosity) — measure, do not eyeball.',
                'Land length short enough to clear gas without restricting (typ. 1.0–1.5 mm before relief).',
                'Vents free of polish-over, packed contamination, or crushed edges from over-clamping.',
              ],
            },
          },
        ],
      },
      {
        id: 'diagnostics',
        title: '3. Diagnostic Techniques',
        blocks: [
          {
            type: 'orderedList',
            items: [
              'Determine if flash is parting-line or core (or both).',
              'Cavity pressure trace: establish no-flash baseline; compare peak pressure, transfer pressure, and decay under defect condition.',
              'If flash starts at a repeatable cavity-pressure threshold → pressure capacity vs containment problem.',
              'If flash is local and below normal threshold → tool condition or local fit problem.',
              'Tie-bar strain or mold-breathing measurement reveals clamp adequacy.',
              'For core flash: blue-spot the local component, measure clearance, check concentricity and seal length.',
              'For all-cavities flash on multi-cavity tools: review runner/HR balance and global pressure, not local steel.',
            ],
          },
        ],
      },
      {
        id: 'prevention',
        title: '4. Preventive Measures',
        blocks: [
          {
            type: 'list',
            items: [
              'Design adequate support pillars and parting-line shut-off lands per resin.',
              'Specify proper clearances on ejector pins, sleeves, and inserts (typical 0.013–0.025 mm depending on resin viscosity).',
              'Use cavity pressure sensors for closed-loop transfer on flash-sensitive parts.',
              'Schedule periodic mold spotting and parting-line inspection.',
              'Train operators to differentiate "process flash" from "tool damage flash" before adding tonnage.',
            ],
          },
        ],
      },
      {
        id: 'corrective-actions',
        title: '5. Corrective Actions',
        blocks: [
          { type: 'heading', level: 3, text: '5.1 Parting line flash' },
          {
            type: 'orderedList',
            items: [
              'Reduce pack pressure / hold time and verify flash threshold.',
              'Move transfer earlier (lower transfer position) to reduce overpacking.',
              'Inspect parting line for contamination or damage; clean and re-spot.',
              'Verify clamp tonnage is adequate (not maxed); check tie-bar balance.',
              'For hot-runner: rebalance manifold zone temperatures.',
            ],
          },
          { type: 'heading', level: 3, text: '5.2 Core flash' },
          {
            type: 'orderedList',
            items: [
              'Identify exact local interface: pin, sleeve, insert, lifter, slide, or shutoff.',
              'Measure clearance and seal length; restore fit by replacing or repairing component.',
              'Check thermal growth — undersize at cold may flash at temperature.',
              'Adjust local pack path if gate-adjacent; reduce hold time.',
              'Revalidate with feature-specific inspection.',
            ],
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Do not mask with tonnage',
            text:
              'Increasing clamp force to suppress flash on damaged steel accelerates wear and can crush vents. Repair the steel.',
          },
        ],
      },
      {
        id: 'best-practices',
        title: '6. Best Practices & Pitfalls',
        blocks: [
          {
            type: 'list',
            items: [
              'If reducing hold pressure dramatically does not improve flash → suspect steel, not recipe.',
              'If only one cavity flashes in a balanced tool → look for local mismatch, wear, or thermal imbalance.',
              'If flash appears after material change → check lot viscosity before changing process.',
              'Treat cavity pressure as the truth source; setpoints alone do not reveal overpacking.',
            ],
          },
          {
            type: 'image',
            src: flashTroubleshootingFlowchart,
            alt: 'Flash troubleshooting flowchart from gate/runner check through process adjustments and escalation',
            figureNumber: 'Figure 7',
            caption: 'Shop-floor flash troubleshooting flowchart — start by classifying gate/runner vs cavity flash, then walk the process-adjustment ladder before escalating to tooling.',
            lookFor: {
              title: 'Sequence to follow on the floor',
              tone: 'success',
              items: [
                'Classify location first (gate/runner vs parting line vs core) — branching the wrong way wastes setup time.',
                'Step the process ladder in order: pressure → temp → speed → pack/hold; verify after each change.',
                'If process adjustments do not resolve flash, escalate to mold inspection — do not mask with tonnage.',
              ],
            },
          },
        ],
      },
    ],
    references: commonRefs,
  },

  // ---------------- FLOW LINES ----------------
  {
    slug: 'flow-lines',
    title: 'Flow Lines',
    summary:
      'Surface-visible wavy, ring-like, or gloss-contrast bands following the primary flow path — the visible record of unstable melt-front advancement (unstable fountain flow or slip-stick at the wall).',
    category: 'Cosmetic',
    severity: 'medium',
    tags: ['fountain flow', 'tiger stripes', 'gloss bands', 'fill speed', 'mold temperature', 'gate'],
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        blocks: [
          {
            type: 'paragraph',
            text:
              'Flow lines (also called flow marks, tiger stripes, or gloss bands) are surface-appearance defects caused by non-uniform advancement and solidification of the polymer melt during cavity filling. They appear when the melt front does not maintain a stable combination of temperature, viscosity, and wall shear across time and position. Two principal mechanisms: unstable fountain-flow behavior and slip-stick interfacial behavior near the wall.',
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Counter-intuitive truth',
            text:
              'Lowering fill speed often makes flow lines worse — slower fill increases front cooling and amplifies hesitation. The right answer is usually a stable, deliberately profiled velocity matched to gate geometry and resin, not just "slower."',
          },
        ],
      },
      {
        id: 'definition',
        title: '1. Definition & Visual Manifestation',
        blocks: [
          {
            type: 'image',
            src: flowLinesAppearance,
            alt: 'Three molded plates showing the three visual signatures of flow lines: gate-near concentric rings, mid-flow wave-like banding (tiger stripes), and feature-induced streaking around bosses and ribs, plus a gloss/dull alternation key.',
            figureNumber: 'Figure 1',
            caption: 'Visual appearance of flow lines — gate-near concentric rings, wave-like flow-path banding (tiger stripes), feature-induced streaking, and the characteristic gloss/dull alternation perpendicular to flow.',
            lookFor: {
              title: 'Match the pattern to the cause',
              tone: 'info',
              items: [
                'Concentric rings centered on the gate → cold slug, direct-sprue thermal mismatch, or hot-runner tip drift.',
                'Wave-like bands extending downstream → unstable fountain flow; usually fill-speed profile or melt/mold temp.',
                'Streaks emerging around bosses, ribs, or holes → flow hesitation at geometry transitions.',
                'Alternating gloss/dull bands perpendicular to flow → classic tiger-stripe slip-stick signature, common on filled PP.',
              ],
            },
          },
          {
            type: 'list',
            items: [
              'Gate-centered concentric rings or halos, especially on direct-sprue gating.',
              'Wavy or banded lines extending downstream from the gate along the primary flow path.',
              'Alternating gloss/dull bands on filled PP or appearance-grade automotive interior parts.',
              'Localized color-tone shift where pigment/filler orientation changes light reflection.',
              'Feature-related streaking around ribs, bosses, windows, or abrupt wall-thickness changes.',
            ],
          },
          {
            type: 'paragraph',
            text:
              'Structurally, flow lines are often classified as cosmetic, but the same event that creates banding can change local skin-core morphology, filler distribution, and surface roughness. On medical or optical carriers, the defect can correlate with local stress concentration or birefringence shift.',
          },
        ],
      },
      {
        id: 'root-causes',
        title: '2. Root Causes',
        blocks: [
          {
            type: 'image',
            src: flowLinesFountainFlow,
            alt: 'Side-by-side cross-section comparing stable fountain flow (smooth hemispherical front, no surface defect) with unstable fountain flow (oscillating front, gloss/dull bands printed on the part surface).',
            figureNumber: 'Figure 2',
            caption: 'Root cause — stable vs unstable fountain flow. The unstable front hesitates, slip-sticks at the wall, and prints alternating gloss/dull bands. After Iannuzzi et al. (2009), Tredoux et al. (1999).',
            lookFor: {
              title: 'Mechanism check',
              tone: 'warning',
              items: [
                'Stable front (A): smooth hemispherical advance, melt rolls outward to the cooler walls — no banding.',
                'Unstable front (B): velocity oscillates, skin forms then incoming melt rolls over it, printing a band per event.',
                'Each visible gloss/dull pair on the part corresponds to one front-instability event in time.',
                'Confirm by short-shot study: hesitation marks at the front edge match the band spacing on the full part.',
              ],
            },
          },
          { type: 'heading', level: 3, text: '2.1 Material factors' },
          {
            type: 'list',
            items: [
              'High-viscosity or shear-sensitive grades amplify front instability.',
              'Filled materials (especially mineral-filled PP) show pronounced gloss banding.',
              'Lot-to-lot viscosity drift changes the safe velocity window.',
              'Excessive regrind alters thermal history and melt homogeneity.',
            ],
          },
          { type: 'heading', level: 3, text: '2.2 Process parameters' },
          {
            type: 'list',
            items: [
              'Fill speed too low → front cools, hesitates, and creates banding.',
              'Fill speed too high → front oscillates / slip-sticks at the wall.',
              'Single-step velocity profile when the part needs a staged profile.',
              'Mold temperature too cold — premature skin freeze.',
              'Melt temperature too low — viscosity rises, hesitation worsens.',
            ],
          },
          { type: 'heading', level: 3, text: '2.3 Mold design' },
          {
            type: 'list',
            items: [
              'Gate too small or land too long — pressure drop and shear instability at gate.',
              'Direct sprue without thermal match — cold slug enters cavity.',
              'Abrupt wall transitions create hesitation zones.',
              'Cooling-circuit imbalance — zone-to-zone mold temp delta.',
              'Hot-runner tip temperature drift produces gate-zone halos.',
            ],
          },
          { type: 'heading', level: 3, text: '2.4 Cold runner vs hot runner' },
          {
            type: 'paragraph',
            text:
              'Cold runners introduce additional heat loss before the gate, amplifying temperature gradients, viscosity rise, and hesitation risk. Well-balanced hot runners reduce pressure loss and preserve melt temperature, generally improving cosmetic robustness — but can create flow-line-like defects if manifold/nozzle temperatures are imbalanced, residence is excessive, or tip temperature drifts.',
          },
          {
            type: 'image',
            src: flowLinesRunnerComparison,
            alt: 'Side-by-side schematic comparing cold-runner system (long thermal path: nozzle, sprue, runner, gate, part with significant heat loss) to hot-runner system (short thermal path: heated manifold, tip, gate, part with minimal heat loss).',
            figureNumber: 'Figure 4',
            caption: 'Cold-runner vs hot-runner thermal path. Cold runners drop melt temperature before the gate (hesitation risk); well-balanced hot runners preserve it. Source: Mold-Masters, Husky, SPE technical guides.',
            lookFor: {
              title: 'Pick the right battle',
              tone: 'info',
              items: [
                'Cold runner with cosmetic flow lines → look first at gate temperature and pressure loss across sprue/runner.',
                'Hot runner with cavity-specific banding → audit zone-to-zone manifold/tip temperatures and balance.',
                'Hot runner with gate-zone halos → check tip temperature drift and residence time.',
                'Both systems benefit from gating into the thickest accessible section to minimize hesitation.',
              ],
            },
          },
        ],
      },
      {
        id: 'diagnostics',
        title: '3. Diagnostic Techniques',
        blocks: [
          {
            type: 'image',
            src: flowLinesVulnerabilityMap,
            alt: 'Top-down map of a typical injection molded part showing three vulnerability zones for flow lines: Zone 1 gate-near rings, Zone 2 mid-flow wave bands, and Zone 3 feature-induced streaking around bosses, ribs, and holes.',
            figureNumber: 'Figure 3',
            caption: 'Part vulnerability map — three flow-line zones triaged by location: gate-near (Zone 1), mid-flow tiger stripes (Zone 2), and feature-induced streaks around bosses/ribs/holes (Zone 3).',
            lookFor: {
              title: 'Triage by location first',
              tone: 'info',
              items: [
                'Zone 1 (gate): cold slug, gate restriction, or nozzle/tip temperature mismatch — inspect gate size and tip temp.',
                'Zone 2 (mid-flow): fill speed too low, melt/mold temp low — raise speed (multi-stage) and verify temps.',
                'Zone 3 (around features): hesitation at thickness changes — smooth transitions, relocate gate, profile speed.',
                'Always locate the defect on the part before changing any setpoint.',
              ],
            },
          },
          {
            type: 'orderedList',
            items: [
              'Confirm bands are flow lines (not jetting, splay, or weld lines) — they follow flow direction and respond to speed.',
              'Map band location vs gate, vs thickness transitions, vs feature obstructions.',
              'Run a fill-speed DOE: vary speed in stages and document defect intensity.',
              'Verify actual barrel temperatures, not setpoints.',
              'Check mold temperature uniformity with surface pyrometer.',
              'For multi-cavity: compare cavity-to-cavity to isolate runner/HR imbalance.',
              'Use simulation (Moldflow / Moldex3D) to identify hesitation zones and front-temperature drops.',
            ],
          },
        ],
      },
      {
        id: 'prevention',
        title: '4. Preventive Measures',
        blocks: [
          {
            type: 'image',
            src: flowLinesPreventionLevers,
            alt: 'Infographic of the five preventive levers for flow lines: fill speed control, melt temperature, mold temperature, gate and runner design, and material selection, with a first-response action banner at the bottom.',
            figureNumber: 'Figure 5',
            caption: 'Five preventive levers for flow lines, in working priority order, with the standard first-response sequence to stabilize the process.',
            lookFor: {
              title: 'First-response sequence',
              tone: 'success',
              items: [
                'Lever 1 — Fill speed: stage the velocity profile to keep the front moving without hesitation or oscillation.',
                'Lever 2 — Melt temp: raise within resin limits to lower viscosity and delay front freeze.',
                'Lever 3 — Mold temp: increase and equalize surface temperature to delay skin freeze and improve replication.',
                'Lever 4 — Gate & runner: size adequately and gate into the thickest accessible section.',
                'Lever 5 — Material: confirm flow grade fits the geometry and dry hygroscopic resins to spec.',
              ],
            },
          },
          {
            type: 'list',
            items: [
              'Use velocity-controlled (decoupled) fill — first-stage velocity, second-stage pressure.',
              'Design staged velocity profiles in DFM, not after launch.',
              'Specify proper mold-temperature control with closed-loop thermolators.',
              'Place gates to minimize abrupt thickness transitions in flow path.',
              'For hot runners: individual zone control with precise thermocouples; balanced manifold.',
              'For appearance-critical parts: cavity-pressure sensing and CAE simulation are mandatory.',
            ],
          },
        ],
      },
      {
        id: 'corrective-actions',
        title: '5. Corrective Actions',
        blocks: [
          {
            type: 'image',
            src: flowLinesDecisionTree,
            alt: 'Troubleshooting decision tree for flow lines: classify defect pattern by location (gate-near, mid-flow tiger stripes, or feature-induced), apply zone-specific actions, validate with short-shot study and simulation, then either lock the process or move to tool/geometry redesign.',
            figureNumber: 'Figure 6',
            caption: 'Troubleshooting decision tree — classify by defect location, apply targeted actions, validate, then either lock the process or escalate to tool/geometry redesign.',
            lookFor: {
              title: 'How to walk the tree',
              tone: 'info',
              items: [
                'Start by classifying the pattern: gate-near, mid-flow/tiger stripes, or feature-induced.',
                'Gate-near → inspect gate size and land length, audit nozzle/tip temperature, check for cold slug.',
                'Mid-flow banding → raise fill speed in stages and increase melt/mold temperatures before touching tooling.',
                'Feature-induced → adjust fill-speed profile through the geometry change; consider gate relocation.',
                'Validate every change with a short-shot study and (where available) Moldflow/Moldex3D simulation.',
                'If the defect persists after process work, escalate to tool/geometry redesign; if resolved, lock the process and document.',
              ],
            },
          },
          {
            type: 'orderedList',
            items: [
              'Increase mold temperature 10–20°C — often the highest-leverage single change.',
              'Increase melt temperature within resin window.',
              'Add a velocity profile: faster through the gate zone, controlled through visible areas.',
              'For hot runner: verify and rebalance zone temperatures; check tip condition.',
              'Open the gate or shorten the land if shear-induced.',
              'For cold-runner direct sprues: improve nozzle-sprue thermal match; use a shorter sprue.',
            ],
          },
        ],
      },
      {
        id: 'best-practices',
        title: '6. Best Practices & Pitfalls',
        blocks: [
          {
            type: 'callout',
            tone: 'warning',
            title: 'Common pitfalls',
            text:
              'Lowering fill speed to "calm" the process — usually backfires. Texturing or painting to mask the defect when root-cause elimination is feasible. Ignoring screw, check ring, and nozzle wear when a previously stable process drifts cosmetically.',
          },
        ],
      },
    ],
    references: commonRefs,
  },

  // ---------------- GATE BLUSH ----------------
  {
    slug: 'gate-blush',
    title: 'Gate Blush',
    summary:
      'Frosted, hazy, whitened, or gloss-shifted halo at or just downstream of the gate — caused by abnormal skin formation as melt exits the gate under excessive shear, gate-zone temperature imbalance, or unstable velocity transition.',
    category: 'Cosmetic',
    severity: 'medium',
    tags: ['gate', 'shear', 'hot tip', 'fill profile', 'gate geometry', 'splay confusion'],
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        blocks: [
          {
            type: 'paragraph',
            text:
              'Gate blush is a localized cosmetic defect that appears as a frosted, hazy, whitened, matte, or gloss-shifted area immediately at, around, or just downstream of the gate. Technically it is the visible consequence of abnormal skin formation at the moment the melt exits the gate, usually because the resin experiences excessive or unstable shear, gate-zone temperature imbalance, wall slip, or abrupt velocity changes accelerating from runner into cavity.',
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'First differentiate from splay',
            text:
              'Gate blush is gate-centered and decays with distance from the gate. Splay (silver streaks) extends well beyond the gate and worsens after hopper refill. Calling moisture splay "gate blush" wastes diagnostic time.',
          },
        ],
      },
      {
        id: 'definition',
        title: '1. Definition & Manifestation',
        blocks: [
          {
            type: 'list',
            items: [
              'Cloudy or whitish halo around a direct sprue, edge gate, tunnel gate, or hot-tip gate.',
              'Fan-shaped matte patch immediately downstream of the gate, especially visible on black, gloss, or clear parts.',
              'Concentric ring "bullseye" pattern on direct-sprue or hot-tip gating.',
              'Localized gloss loss even where color change is subtle.',
              'Gate-near shade shift where pigment, mica, or talc alters reflected light.',
            ],
          },
        ],
      },
      {
        id: 'root-causes',
        title: '2. Root Causes',
        blocks: [
          {
            type: 'paragraph',
            text:
              'Four coupled mechanisms dominate: (1) excessive shear/extensional deformation at the gate; (2) disturbed skin formation because local steel/hot-tip is too hot or cold relative to incoming melt; (3) temperature gradients in the melt from cold-runner delivery, nozzle mismatch, or hot-runner imbalance; (4) localized flow slippage or poor surface replication from gate geometry or contamination/wear.',
          },
          { type: 'heading', level: 3, text: '2.1 Material factors' },
          {
            type: 'list',
            items: [
              'High apparent viscosity at gate shear rates raises required pressure drop and dissipation.',
              'Shear-sensitive amorphous resins (PC, ABS, PC alloys) more prone to blush.',
              'Glass-filled materials show fiber-orientation halos.',
              'Mica/metallic pigments amplify blush visibility.',
            ],
          },
          { type: 'heading', level: 3, text: '2.2 Process parameters' },
          {
            type: 'list',
            items: [
              'Excessive initial injection speed → high gate shear → frosted fan.',
              'Too-slow initial speed → uneven skin formation overwritten by faster second stage.',
              'Wrong velocity profile shape (single step vs needed staged profile).',
              'Gate-zone steel too cold (premature skin freeze) or too hot (no skin anchor).',
            ],
          },
          { type: 'heading', level: 3, text: '2.3 Cold runner vs hot runner' },
          {
            type: 'list',
            items: [
              'Cold runner risks: direct sprue halos, cold-slug entry, nozzle mismatch, start-up transients.',
              'Hot runner risks: tip overheating, nozzle-seat mismatch, worn tip/gate interface, poor gate-zone cooling, zone imbalance, delayed freeze.',
              'Hot runners generally improve melt-delivery consistency and can reduce cold-runner blush, but are less forgiving of gate-zone thermal imbalance.',
            ],
          },
        ],
      },
      {
        id: 'diagnostics',
        title: '3. Diagnostic Techniques',
        blocks: [
          {
            type: 'orderedList',
            items: [
              'Inspect under diffuse and specular lighting; rotate the part — blush often appears as gloss loss rather than color change.',
              'Verify defect intensity is strongest at gate and decays downstream.',
              'Compare first-off vs stabilized parts — strong start-up sensitivity indicates thermal mismatch.',
              'Rule out moisture splay: check dryer dew point and resin moisture.',
              'For hot runner: log nozzle-tip temperature and check single-cavity / single-drop patterns.',
              'Run a velocity-profile DOE focusing on the first 10–20% of stroke.',
            ],
          },
        ],
      },
      {
        id: 'prevention',
        title: '4. Preventive Measures',
        blocks: [
          {
            type: 'list',
            items: [
              'Specify gate sizes that keep shear rate within material limits.',
              'Design dedicated gate-zone cooling (especially around hot tips).',
              'For appearance-critical parts: select grades with stable thermal behavior and narrower viscosity variation.',
              'Trial multiple colorant packages — pigment choice changes blush visibility.',
              'For hot-runner tools: validate tip geometry and zone-balance procedure during qualification.',
            ],
          },
        ],
      },
      {
        id: 'corrective-actions',
        title: '5. Corrective Actions',
        blocks: [
          {
            type: 'orderedList',
            items: [
              'Stabilize initial fill velocity with a deliberate profile (avoid both jets and hesitation).',
              'Adjust gate-zone steel temperature: cool if too hot, heat if too cold.',
              'For hot runner: small tip-temperature changes (±5°C) often resolve drift.',
              'Increase gate size or shorten gate land — often the most permanent fix.',
              'Inspect hot-tip wear and gate-insert condition; replace if worn.',
              'For cold runner: improve nozzle-to-sprue thermal match; verify cold-slug well.',
            ],
          },
        ],
      },
      {
        id: 'best-practices',
        title: '6. Best Practices & Pitfalls',
        blocks: [
          {
            type: 'list',
            items: [
              'Do not call it gate blush until moisture splay is ruled out.',
              'Do not keep raising barrel heats on shear-sensitive materials without auditing gate land/diameter.',
              'On hot-runner tools, never ignore single-drop patterns — they are usually thermal or hardware specific.',
              'On cold-runner tools, audit nozzle tip and sprue bushing before changing cavity steel.',
            ],
          },
        ],
      },
    ],
    references: commonRefs,
  },

  // ---------------- JETTING ----------------
  {
    slug: 'jetting',
    title: 'Jetting',
    summary:
      'A snake-like or worm-like surface trace caused when polymer melt exits the gate at excessive velocity and travels across the open cavity without contacting the walls — violating the desirable fountain-flow fill pattern.',
    category: 'Cosmetic & Structural',
    severity: 'high',
    tags: ['gate velocity', 'fountain flow', 'fill profile', 'gate location', 'weld plane'],
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        blocks: [
          {
            type: 'paragraph',
            text:
              'Jetting is a flow-related defect characterized by a snake-like, worm-like, or serpentine surface trace. It occurs when molten polymer exits the gate at excessively high velocity and travels across the open mold cavity without making initial contact with the cavity walls — a direct violation of the desirable "fountain flow" fill pattern. As the jet cools and solidifies during transit, it becomes semi-rigid before the rest of the cavity fills. Subsequent fill engulfs this semi-cooled strand, creating a weld plane at the jet boundary, entrapping air, and producing visible surface defects.',
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Structural consequence',
            text:
              'Bonding strength at jetting weld lines can be 20–60% lower than parent material. For medical, automotive, and pressurized parts, jetting is a structural disqualifier, not just cosmetic.',
          },
        ],
      },
      {
        id: 'definition',
        title: '1. Definition & Manifestation',
        blocks: [
          {
            type: 'paragraph',
            text:
              'In fountain flow (ideal), melt advances as a smooth hemispherical front, touching cooler walls first and building orientation outside-in. In jetting, the polymer bypasses wall contact and penetrates as a free jet, analogous to water from a nozzle into open air. Jetting traces always originate at the gate and follow a tortuous path; flow lines, by contrast, appear perpendicular to flow direction at junctions.',
          },
          {
            type: 'list',
            items: [
              'Surface: glossy meandering ridge or groove tracing from gate inward.',
              'Cross-section: distinct boundary zone (weld plane) between jet strand and surrounding fill.',
              'Air entrapment: looping path creates pockets — appears as voids, blisters, or sinks.',
              'Stress concentration: differential cooling creates residual stress fields.',
              'Color variation: shear-induced color separation may show as a streak.',
            ],
          },
        ],
      },
      {
        id: 'root-causes',
        title: '2. Root Causes',
        blocks: [
          { type: 'heading', level: 3, text: '2.1 Material susceptibility' },
          {
            type: 'list',
            items: [
              'Low-viscosity / high-MFI resins jet most readily (high-flow PP, PE, low-viscosity PA).',
              'Cold melt behaves as elastic strand and resists wall adherence.',
              'Highly shear-thinning grades amplify gate-velocity effects.',
            ],
          },
          { type: 'heading', level: 3, text: '2.2 Process parameters' },
          {
            type: 'list',
            items: [
              'Excessive injection speed — primary driver.',
              'Cold melt or cold mold — strand stays elastic instead of laminating to wall.',
              'Single-stage high-velocity profile when a slow→fast ramp is needed.',
              'Late V→P transfer pushes too much volume at high speed.',
            ],
          },
          { type: 'heading', level: 3, text: '2.3 Mold design (often the true cause)' },
          {
            type: 'list',
            items: [
              'Gate aimed into open cavity space rather than at a wall (no impingement).',
              'Gate aimed at a thin wall directly — should aim at thick wall or post for impingement.',
              'Gate geometry creates a sharp jet (small round gate vs flat fan/tab gate).',
              'Long flow length immediately after the gate without geometry to disrupt the jet.',
            ],
          },
          { type: 'heading', level: 3, text: '2.4 Cold runner vs hot runner' },
          {
            type: 'paragraph',
            text:
              'Hot runners deliver hotter, more consistent melt to the gate (±1–5°C vs 10–30°C drop in cold runners), reducing the cold-strand mechanism. However, hot-runner systems also enable higher effective gate velocities and need careful tip selection to avoid jetting. Cold-runner systems are more sensitive to start-up transients and cold-slug entry.',
          },
        ],
      },
      {
        id: 'diagnostics',
        title: '3. Diagnostic Techniques',
        blocks: [
          {
            type: 'orderedList',
            items: [
              'Run a short-shot study at 25%, 50%, 75% fill — jetting is visible as the worm forms.',
              'Inspect gate aim relative to nearest cavity wall — is there an impingement target?',
              'Measure actual melt and mold temperatures.',
              'Run a fill-speed DOE — jetting typically eliminates with a slow first-stage profile.',
              'Use Moldflow/Moldex3D to predict jetting (look for ballistic flow patterns at gate).',
            ],
          },
        ],
      },
      {
        id: 'prevention',
        title: '4. Preventive Measures',
        blocks: [
          {
            type: 'list',
            items: [
              'Aim the gate at a wall, post, or thick boss — never into open space.',
              'Use fan, tab, or overlap gates instead of small round gates on flat surfaces.',
              'Specify staged velocity profile in DFM: slow through gate, fast through bulk fill.',
              'Maintain mold temperature in upper resin window for jetting-prone parts.',
              'For low-viscosity resins, increase gate land slightly to slow gate-exit velocity.',
            ],
          },
        ],
      },
      {
        id: 'corrective-actions',
        title: '5. Corrective Actions',
        blocks: [
          {
            type: 'orderedList',
            items: [
              'Implement 2-stage injection: very slow through the gate (10–20% of stroke), then fast.',
              'Increase melt and mold temperatures within material window.',
              'Increase gate size or change gate type (round → fan/tab).',
              'Relocate gate to impinge on a wall.',
              'For hot runner: consider valve-gate or modified tip geometry.',
              'Reduce overall injection speed if profile change is not feasible.',
            ],
          },
        ],
      },
      {
        id: 'best-practices',
        title: '6. Best Practices & Pitfalls',
        blocks: [
          {
            type: 'callout',
            tone: 'warning',
            title: 'Common pitfalls',
            text:
              'Treating jetting as cosmetic when bonded weld plane reduces strength 20–60%. Increasing pack to "hide" jetting — pack does not heal a frozen weld. Adding more gates without relocating — multiple jets is no better than one.',
          },
        ],
      },
    ],
    references: commonRefs,
  },

  // ---------------- MELD LINE SEPARATION ----------------
  {
    slug: 'meld-line-separation',
    title: 'Meld Line Separation',
    summary:
      'Loss of continuity, strength, or visible integrity along a re-merged flow-front seam — when the seam fails to heal sufficiently during fill/pack and later opens under load, impact, pressure cycling, or environmental exposure.',
    category: 'Structural',
    severity: 'high',
    tags: ['weld line', 'knit line', 'interface temperature', 'meeting angle', 'fiber orientation'],
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        blocks: [
          {
            type: 'paragraph',
            text:
              'Meld line separation is the loss of continuity, strength, or visible integrity along a re-merged flow-front seam. Many shops group all such seams under "weld lines" or "knit lines"; technically a meld line is the stronger, shallower-angle re-merge, while a knit/weld line is the more severe head-on collision. Separation occurs when the seam does not heal sufficiently during fill/pack and later opens under demolding stress, assembly load, impact, pressure cycling, or environmental exposure.',
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Three governing metrics',
            text:
              '(1) Interface temperature at re-merge — must be high enough for interdiffusion. (2) Flow-front meeting angle — shallower is stronger. (3) Local pressure available after re-merge — must consolidate the seam during pack/hold.',
          },
          {
            type: 'table',
            columns: ['Term', 'Formation', 'Strength'],
            rows: [
              ['Knit line', 'Head-on, butt-like collision', 'Lowest'],
              ['Weld line', 'Umbrella term; angles below ~140°', 'Low to moderate'],
              ['Meld line', 'Shallow-angle re-merge after split flow', 'Moderate to high if conditions are good'],
              ['Meld line separation', 'Meld seam opens or fractures under load', 'Failure state'],
            ],
          },
        ],
      },
      {
        id: 'definition',
        title: '1. Definition & Manifestation',
        blocks: [
          {
            type: 'paragraph',
            text:
              'Visually, meld separation appears as a faint linear witness line that may turn into whitening, notch opening, crack propagation, leakage, or torque-strip failure. It commonly appears downstream of holes, bosses, ribs, inserts, windows, and multi-gated meeting zones. Structurally, the seam region has lower interfacial entanglement, altered orientation, possible filler-rich/poor zones, and stress concentration at the surface notch. In fiber-filled materials, fibers orient unfavorably across the seam, lowering transverse strength.',
          },
        ],
      },
      {
        id: 'root-causes',
        title: '2. Root Causes',
        blocks: [
          { type: 'heading', level: 3, text: '2.1 Material factors' },
          {
            type: 'list',
            items: [
              'High-viscosity grades resist interdiffusion at the seam.',
              'Glass-fiber-reinforced grades — fibers align across seam, dramatically reducing transverse strength.',
              'Moisture-sensitive resins (PA, PBT, PC) hydrolyze at the seam if undried.',
              'Incompatible regrind or contamination concentrate at the slow-moving meld zone.',
            ],
          },
          { type: 'heading', level: 3, text: '2.2 Process parameters' },
          {
            type: 'list',
            items: [
              'Melt temperature too low — cold front preserves frozen skin, no healing.',
              'Mold temperature too low — interface freezes before consolidation.',
              'Fill speed too low — front cools excessively before re-merge.',
              'Insufficient pack pressure or pack ends before gate freeze.',
              'Gate freezes before pressure transmits to seam — common with small gates on thick parts.',
            ],
          },
          { type: 'heading', level: 3, text: '2.3 Mold design' },
          {
            type: 'list',
            items: [
              'Seam location at high-stress zone (snap fit, bending, sealing land).',
              'Inadequate venting at re-merge point — trapped air burns or insulates the interface.',
              'Gate placement creates head-on collision instead of shallow re-merge.',
              'No overflow tab to move the seam out of the critical area.',
              'Hot-runner imbalance creates uneven front timing.',
            ],
          },
        ],
      },
      {
        id: 'diagnostics',
        title: '3. Diagnostic Techniques',
        blocks: [
          {
            type: 'orderedList',
            items: [
              'Confirm seam location using short-shot study and CAD overlay.',
              'Run Moldflow/Moldex3D to predict meeting angle, interface temperature, and pressure.',
              'Microscopy of the seam: look for unfused interface, fiber bridging, or contamination.',
              'Tensile/impact test bars across the seam vs base material.',
              'For fiber-filled: SEM analysis of fiber orientation across the seam.',
              'For pressure parts: burst test with seam at the failure origin.',
            ],
          },
        ],
      },
      {
        id: 'prevention',
        title: '4. Preventive Measures',
        blocks: [
          {
            type: 'list',
            items: [
              'In DFM: place gates so the seam falls outside high-stress and cosmetic zones.',
              'Use overflow tabs or flow leaders to push the seam to a safe location.',
              'For fiber-filled parts, design with seam-strength reduction factor (often 50–70%).',
              'Specify sequential valve gating to control flow-front timing.',
              'Maintain wall uniformity; radius abrupt corners.',
              'Vent the re-merge zone explicitly.',
            ],
          },
        ],
      },
      {
        id: 'corrective-actions',
        title: '5. Corrective Actions',
        blocks: [
          {
            type: 'orderedList',
            items: [
              'Raise melt temperature within resin limits — improves interdiffusion.',
              'Raise mold surface temperature 10–20°C at seam zone.',
              'Increase fill speed moderately to reach seam hotter.',
              'Improve venting at seam location.',
              'Add overflow tab in next tool revision.',
              'For hot runner: rebalance zones to time fronts deliberately; consider sequential valve gating.',
              'Reduce moisture (re-dry resin) for hygroscopic grades.',
            ],
          },
        ],
      },
      {
        id: 'best-practices',
        title: '6. Best Practices & Pitfalls',
        blocks: [
          {
            type: 'list',
            items: [
              'Once gate is frozen, more hold time does nothing for the seam.',
              'If a hot runner solves appearance but not the fracture, suspect degradation or fiber orientation.',
              'Treat seam complaints in moisture-sensitive resins as a drying audit until proven otherwise.',
              'Cosmetic improvement is NOT proof of structural improvement — always retest.',
            ],
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Common pitfalls',
            text:
              'Adding hold time after gate freeze. Raising temperature without re-verifying moisture and residence. Ignoring hot-runner balance in multi-cavity tools. Assuming clamp force is a seam fix when the real problem is air trap or temperature.',
          },
        ],
      },
    ],
    references: commonRefs,
  },

  // ---------------- SHORT SHOT ----------------
  {
    slug: 'short-shot',
    title: 'Short Shot',
    summary:
      'Incomplete cavity fill — the melt freezes or loses sufficient flow energy before reaching the last-fill zones, leaving the part geometrically incomplete. Always 100% scrap; an unambiguous dimensional non-conformance.',
    category: 'Dimensional',
    severity: 'high',
    tags: ['fill pressure', 'viscosity', 'thin wall', 'venting', 'runner imbalance', 'check ring'],
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        blocks: [
          {
            type: 'paragraph',
            text:
              'A short shot is a molding defect in which the injected polymer melt fails to completely fill the mold cavity, resulting in a part that is geometrically incomplete. The melt front freezes or loses sufficient flow energy before reaching the last-fill zone(s). Short shots are immediately visible and represent complete part rejection — unlike internal defects, a short shot is unambiguous dimensional non-conformance.',
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Short shot vs flash',
            text:
              'Short shot is the geometric opposite of flash. Both can coexist on the same part — flash at the gate zone and short at the far end of fill — indicating a flow restriction rather than a simple shot-size problem.',
          },
        ],
      },
      {
        id: 'definition',
        title: '1. Definition & Manifestation',
        blocks: [
          {
            type: 'list',
            items: [
              'Incomplete geometry: edges, tabs, fins, ribs, or whole end-of-fill regions missing.',
              'Rounded, frosted, or striated melt front (not sharp) where flow froze.',
              'Weld-line stub with void at near-merge zones.',
              'Progressive pattern: cavity farthest from sprue or with longest flow path shorts first.',
              'Consistent location every cycle (in a stable tool) — distinguishes from process drift.',
            ],
          },
        ],
      },
      {
        id: 'root-causes',
        title: '2. Root Causes',
        blocks: [
          { type: 'heading', level: 3, text: '2.1 Material factors' },
          {
            type: 'paragraph',
            text:
              'Melt viscosity is the most critical material driver. High-viscosity (low-MFI) melts resist flow, lose pressure rapidly over flow length, and freeze prematurely in thin sections. Lower MFI = higher viscosity = higher short-shot risk. Glass-filled grades, flame-retardant compounds, and PC/PSU/PEEK have elevated risk.',
          },
          { type: 'heading', level: 3, text: '2.2 Process parameters' },
          {
            type: 'list',
            items: [
              'Insufficient injection pressure available (machine maxed out).',
              'Insufficient injection speed → premature flow-front freeze.',
              'Melt temperature too low → high viscosity, premature freeze.',
              'Mold temperature too low — often the most overlooked variable.',
              'Shot size insufficient or no cushion (check ring leaking).',
              'V→P transfer too early.',
            ],
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Mold temperature is often the answer',
            text:
              'For thin-wall and high-viscosity applications, a 15°C mold-temperature increase can eliminate short shots that 20 additional MPa of injection pressure cannot.',
          },
          { type: 'heading', level: 3, text: '2.3 Mold design' },
          {
            type: 'list',
            items: [
              'Wall too thin for flow length (L/T ratio exceeds material capability).',
              'Gate too small or too far from end-of-fill area.',
              'Runner system undersized — excessive pressure drop.',
              'Inadequate venting → air-trap short shot at last-fill zone.',
              'Multi-cavity runner imbalance — far cavities short while near cavities pack.',
            ],
          },
          { type: 'heading', level: 3, text: '2.4 Cold runner vs hot runner' },
          {
            type: 'list',
            items: [
              'Cold runner: pressure loss in runner reduces effective fill pressure; cold slugs can block gates.',
              'Hot runner: tip clogging, valve-gate malfunction, zone temperature drift, or manifold imbalance can short individual cavities.',
              'Multi-drop hot runners require zone-by-zone balancing for short-shot prevention.',
            ],
          },
          { type: 'heading', level: 3, text: '2.5 Machine & auxiliary' },
          {
            type: 'list',
            items: [
              'Worn check ring — backflow during pack reduces effective shot.',
              'Worn screw flights → poor melt homogeneity, viscosity variation.',
              'Hydraulic pump or accumulator weak → pressure-limited.',
              'Chiller/thermolator drift → mold temp below setpoint.',
            ],
          },
        ],
      },
      {
        id: 'diagnostics',
        title: '3. Diagnostic Techniques',
        blocks: [
          {
            type: 'orderedList',
            items: [
              'Run a short-shot study: progressively reduce shot size from 50% → 90% in 5% steps. Document fill progression with photos.',
              'Check if pressure is at machine limit during fill — if yes, machine is pressure-limited.',
              'Verify cushion and shot consistency — rules out check ring leakage.',
              'Compare cavity-to-cavity in multi-cavity tools — isolate runner/HR imbalance.',
              'Verify actual melt and mold temperatures with pyrometer.',
              'For air-trap shorts: identify last-fill zone with simulation; inspect vents.',
              'For hot runner: log zone temperatures and check valve-gate actuation.',
            ],
          },
        ],
      },
      {
        id: 'prevention',
        title: '4. Preventive Measures',
        blocks: [
          {
            type: 'list',
            items: [
              'In DFM: verify L/T ratio is within material capability; specify high-flow grades for thin walls.',
              'Use Moldflow/Moldex3D to validate fill in design phase.',
              'Specify proper venting at every predicted last-fill location.',
              'For multi-cavity: use balanced (naturally or artificially) runners; verify with short-shot study at qualification.',
              'For hot runner: specify alarmed individual zones and validate balance procedure.',
              'Establish process window with documented short-shot threshold.',
            ],
          },
        ],
      },
      {
        id: 'corrective-actions',
        title: '5. Corrective Actions — Priority Sequence',
        blocks: [
          {
            type: 'orderedList',
            items: [
              'Verify shot size and cushion are stable (rule out check ring).',
              'Increase mold temperature (often the highest leverage).',
              'Increase melt temperature within resin window.',
              'Increase injection speed (especially through thin sections).',
              'Increase injection pressure if not machine-limited.',
              'Move V→P transfer later (higher % fill at transfer).',
              'Clean or enlarge vents at identified air-trap locations.',
              'For hot runner: rebalance zones; check valve-gate timing; verify drop temperatures.',
              'Tooling redesign: enlarge gate, relocate gate, add gate, increase runner diameter.',
            ],
          },
        ],
      },
      {
        id: 'best-practices',
        title: '6. Best Practices & Pitfalls',
        blocks: [
          {
            type: 'callout',
            tone: 'warning',
            title: 'Common pitfalls',
            text:
              'Maxing out injection pressure without addressing viscosity (mold temp / melt temp). Neglecting mold temperature as a diagnostic variable. Attributing all hot-runner shorts to process when the issue is a cold drop or valve-gate fault. Ignoring vent condition — air traps prevent fill regardless of pressure.',
          },
        ],
      },
    ],
    references: commonRefs,
  },

  // ---------------- SINK MARKS ----------------
  {
    slug: 'sink-marks',
    title: 'Sink Marks',
    summary:
      'Localized concave surface depressions produced when interior shrinkage exceeds the ability of the solidified skin and feed system to maintain the nominal outer profile — primarily a packing-and-freeze problem opposite thick features.',
    category: 'Cosmetic & Dimensional',
    severity: 'medium',
    tags: ['shrinkage', 'pack pressure', 'gate freeze', 'wall thickness', 'rib design', 'boss'],
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        blocks: [
          {
            type: 'paragraph',
            text:
              'Sink marks are localized concave surface depressions produced when the volumetric shrinkage of the hotter, slower-cooling interior exceeds the ability of the already-solidified skin and the still-open feed system to maintain the nominal outer profile. They are primarily a packing-and-freeze problem, secondarily a geometry problem, and only indirectly a machine problem.',
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Hierarchy of causes',
            text:
              'Sinks emerge when local volumetric contraction, local stiffness development, and feed-path availability are misaligned in time. Address in this order: (1) geometry & mass concentration, (2) gate freeze & pressure transmission, (3) material shrink behavior, (4) mold thermal balance, (5) machine consistency.',
          },
        ],
      },
      {
        id: 'definition',
        title: '1. Definition & Distinction',
        blocks: [
          {
            type: 'image',
            src: sinkMarksCrossSection,
            alt: 'Cross-section showing a rib on the back of a nominal wall causing a sink mark on the cosmetic show surface',
            figureNumber: 'Figure 1',
            caption:
              'Cross section — a thick rib on the back side acts as a hot core. As its interior shrinks after the skin freezes, the cosmetic show surface is pulled inward, producing a sink mark directly opposite the rib.',
            lookFor: {
              tone: 'warning',
              title: 'What to look for',
              items: [
                'Depression directly opposite a rib, boss, or thick intersection.',
                'Solidified outer skin (yellow) over a still-hot interior (red) — the classic skin/core thermal imbalance.',
                'Dashed orange zone marks the hot core / thick section that drives volumetric shrinkage.',
                'Cosmetic visibility increases on glossy or dark show surfaces.',
              ],
            },
          },
          {
            type: 'list',
            items: [
              'Shallow dimples opposite ribs, bosses, gussets, thick walls, inserts, or reinforced intersections.',
              'Higher visibility on glossy Class A surfaces, dark colors, metallic pigments, broad flat walls.',
              'Often invisible at ejection and more apparent after a short post-mold dwell.',
              'Commonly accompanied by gloss change or read-through of buried features.',
            ],
          },
          {
            type: 'table',
            caption: 'Sink mark vs related defects',
            columns: ['Defect', 'Mechanism', 'Discriminator'],
            rows: [
              ['Sink mark', 'Interior shrinkage > support/feed', 'Opposite a thick feature; improves with pack/gate changes'],
              ['Vacuum void', 'Interior shrinkage accommodated internally', 'No external depression; detect by sectioning or CT'],
              ['Warp', 'Differential shrinkage across part', 'Macroscopic shape change vs localized dent'],
              ['Flow line', 'Flow-front instability during fill', 'Directional marks rather than localized dent'],
            ],
          },
        ],
      },
      {
        id: 'root-causes',
        title: '2. Root Causes',
        blocks: [
          {
            type: 'image',
            src: sinkMarksFormationTimeline,
            alt: 'Four-stage timeline: mold fills, packing, gate freezes, interior cools and sink appears',
            figureNumber: 'Figure 3',
            caption:
              'Sink formation timeline — the surface remains nominal through fill and pack. Once the gate freezes, no more melt can be fed; as the still-hot interior continues to cool and contract, the now-rigid skin is pulled inward and a sink appears.',
            lookFor: {
              tone: 'warning',
              title: 'Why timing matters',
              items: [
                'Stages 1–2: defect not yet visible — early inspection misses it.',
                'Stage 3 (gate freeze): the last opportunity to compensate via pack pressure.',
                'Stage 4: sink emerges minutes-to-hours after ejection — verify with delayed inspection.',
                'Most sink fixes target Stage 3: extend the open-gate window (larger gate, hotter melt, valve-gate hold).',
              ],
            },
          },
          { type: 'heading', level: 3, text: '2.1 Material factors' },
          {
            type: 'list',
            items: [
              'High volumetric shrinkage (semi-crystalline resins: PP, PE, POM, PA, PBT) — high sink tendency.',
              'High melt viscosity → harder to transmit pack pressure into thick remote regions.',
              'Glass and mineral fillers reduce overall shrinkage but raise viscosity (narrow window).',
              'Excessive regrind shifts shrink behavior shot-to-shot.',
            ],
          },
          { type: 'heading', level: 3, text: '2.2 Process parameters' },
          {
            type: 'list',
            items: [
              'Insufficient pack pressure or pack time — interior under-fed during cooling.',
              'Gate freezes before packing complete — most common single cause.',
              'Mold temperature too high → extended cooling, more shrinkage to compensate.',
              'Cooling time too short — interior still molten at ejection.',
              'Check ring leakage → effective pack pressure drops.',
            ],
          },
          { type: 'heading', level: 3, text: '2.3 Mold design' },
          {
            type: 'list',
            items: [
              'Wall thickness ratio violations: ribs > 60% of nominal wall create sink opposite.',
              'Bosses without proper coring create thick mass at the base.',
              'Gate located far from thickest section — pressure can\'t reach where needed.',
              'Undersized gate → freezes before adequate packing.',
              'Unbalanced multi-cavity runner — some cavities pack, others sink.',
              'Inadequate cooling at thick zones → extended melt state, more shrinkage.',
            ],
          },
          { type: 'heading', level: 3, text: '2.4 Cold runner vs hot runner' },
          {
            type: 'paragraph',
            text:
              'Cold runners are limited by gate freeze timing — pack pressure transmission ends when the gate freezes. Hot runners offer a longer feed window because the gate stays open via tip control or valve gating, but only deliver this advantage when manifold balance, valve-gate timing, and tip temperatures are stable.',
          },
        ],
      },
      {
        id: 'diagnostics',
        title: '3. Diagnostic Techniques',
        blocks: [
          {
            type: 'image',
            src: sinkMarksLocationMap,
            alt: 'Top-down enclosure outline showing sink mark locations opposite ribs, bosses, gussets, thick wall steps, and inserts',
            figureNumber: 'Figure 2',
            caption:
              'Plan view of a typical enclosure — sink marks (dashed red) appear on the show surface directly opposite hidden mass concentrations: ribs, bosses, gussets, thick wall steps, and metal inserts.',
            lookFor: {
              tone: 'info',
              title: 'Diagnostic mapping',
              items: [
                'Overlay defect photo onto CAD plan view — sinks should align with hidden ribs, bosses, or thick intersections.',
                'A sink with no opposing thick feature points to a different mechanism (gas trap, weld, flow line).',
                'Boss sinks indicate insufficient coring; rib sinks indicate rib-to-wall thickness > 60% rule.',
                'Insert sinks signal the surrounding wall is too thick around the metal — re-core or relieve.',
              ],
            },
          },
          {
            type: 'orderedList',
            items: [
              'Map sink location vs CAD section — identify the thick feature opposite.',
              'Check if defect grows after ejection (5 min, 24 hr) — yes → shrinkage/freeze problem.',
              'Run a gate-freeze study: increase hold time in steps, weigh parts. When weight stops increasing, useful hold has ended.',
              'If gate is freezing too early → enlarge gate, reduce land, move gate, raise mold/melt temp.',
              'Compare first-cavity vs last-cavity in multi-cavity tools.',
              'For hot runner: log nozzle-tip temperatures and verify zone consistency.',
            ],
          },
        ],
      },
      {
        id: 'prevention',
        title: '4. Preventive Measures',
        blocks: [
          {
            type: 'list',
            items: [
              'Design rule: rib thickness ≤ 60% of adjacent nominal wall.',
              'Core out bosses; design with rib networks instead of solid mass.',
              'Place gates at or near the thickest critical section.',
              'Specify proper cooling at thick zones — baffles, bubblers, or beryllium-copper inserts.',
              'For semi-crystalline resins, design with documented shrinkage allowance.',
              'Use simulation to predict gate freeze and volumetric shrinkage in DFM.',
            ],
          },
        ],
      },
      {
        id: 'corrective-actions',
        title: '5. Corrective Actions',
        blocks: [
          {
            type: 'orderedList',
            items: [
              'Increase pack pressure (within clamp/flash limits).',
              'Increase hold time up to gate-freeze point.',
              'Increase melt temperature modestly — improves pressure transmission.',
              'Decrease mold temperature at thick zones — speeds skin formation.',
              'Increase cooling time so interior stiffens before depression forms.',
              'Replace check ring if cushion is unstable.',
              'For hot runner: extend valve-gate hold-open time.',
              'Tooling: enlarge gate, shorten land, relocate to thick section, add cooling at thick areas.',
            ],
          },
        ],
      },
      {
        id: 'best-practices',
        title: '6. Best Practices & Pitfalls',
        blocks: [
          {
            type: 'list',
            items: [
              'Use texture intentionally to hide unavoidable mild read-through, but never as primary corrective action.',
              'Collaborate with mold maker on gate relocation, runner rebalance, and cooling-circuit changes.',
              'Document gate-freeze study results — it is the highest-value single test for sink troubleshooting.',
              'If pack increases stop reducing sink, gate is frozen — further pack just causes flash.',
            ],
          },
        ],
      },
    ],
    references: commonRefs,
  },

  // ---------------- SPLAY ----------------
  {
    slug: 'splay-silver-streaks',
    title: 'Splay (Silver Streaks)',
    summary:
      'Elongated silver, white, gray, or yellow-brown streaks running with the flow direction — the visible record of gas-bearing, vapor-bearing, or degraded melt reaching the cavity surface. Includes moisture splay, degradation splay, gas splay, and shear-induced gate splay.',
    category: 'Cosmetic & Structural',
    severity: 'high',
    tags: ['moisture', 'drying', 'degradation', 'residence time', 'shear', 'contamination', 'hot runner'],
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        blocks: [
          {
            type: 'paragraph',
            text:
              'Splay (silver streaks, silver marks, splash marks) is the visual record of a gas-bearing melt front that should have been homogeneous but was not. It is not a single mechanism — it is a defect family. For most shops the dominant causes rank: residual moisture in hygroscopic resin → thermal degradation / residence damage → shear overheating at gates → contamination/regrind → air ingestion. Disciplined classification matters because each subtype has a different corrective action.',
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Do not assume "wet material"',
            text:
              'Shops that classify every silver streak as moisture waste enormous time. Moisture is common, but degradation splay, gas splay, and contamination splay differ in physical mechanism and corrective action. Classify before changing parameters.',
          },
        ],
      },
      {
        id: 'definition',
        title: '1. Definition & Classification',
        blocks: [
          { type: 'heading', level: 3, text: '1.1 Splay subtypes by mechanism' },
          {
            type: 'list',
            items: [
              'Moisture splay: residual water in hygroscopic resin or moisture pickup during conveying/hopper dwell.',
              'Thermal-degradation splay: overheating, excessive residence time, hang-up, dead spots, or over-shearing.',
              'Air / volatile splay: air ingestion, poor melt homogenization, vent issues, or volatile additives.',
              'Shear / gate splay: localized overheating from undersized gate or excessive gate velocity.',
              'Contamination splay: incompatible resin, regrind, or release agent in the melt.',
            ],
          },
          { type: 'heading', level: 3, text: '1.2 Visual & structural manifestation' },
          {
            type: 'list',
            items: [
              'Fine silver/white streaks aligned with flow path, densest near gate.',
              'Feathered or fan-like marks radiating from gate or restriction.',
              'Yellowed, browned, or black-speck streaking when caused by thermal degradation.',
              'Film-like roughness or slight peel in severe moisture/contamination cases.',
              'Structurally: moisture splay in PC/PBT/PET/PA/TPU may indicate hydrolysis with mechanical-property loss.',
            ],
          },
        ],
      },
      {
        id: 'root-causes',
        title: '2. Root Causes',
        blocks: [
          { type: 'heading', level: 3, text: '2.1 Material factors' },
          {
            type: 'table',
            columns: ['Resin', 'Sensitivity', 'Dominant mechanism'],
            rows: [
              ['PC', 'Very high', 'Moisture, hydrolysis, hot-runner residence'],
              ['PA / Nylon', 'Very high', 'Moisture; foamy purge and silvering'],
              ['PBT / PET', 'High', 'Hydrolysis, overheating, shear at gate'],
              ['ABS', 'Moderate-high', 'Moisture, degradation, regrind'],
              ['TPU', 'Moderate-high', 'Moisture, additive volatility, degradation'],
              ['PP / PE', 'Low-moderate', 'Air entrapment, additive outgassing, contamination'],
            ],
          },
          { type: 'heading', level: 3, text: '2.2 Process parameters' },
          {
            type: 'list',
            items: [
              'Melt temperature too high → degradation splay and volatile generation.',
              'Excessive residence time (small shot, oversized barrel, long downtime).',
              'Excessive screw RPM / back pressure → shear-induced gas generation.',
              'Excessive decompression → air ingestion at nozzle.',
              'Gate too small → localized shear overheating produces gate splay.',
            ],
          },
          { type: 'heading', level: 3, text: '2.3 Cold runner vs hot runner' },
          {
            type: 'paragraph',
            text:
              'Cold runners reduce post-nozzle residence but introduce cold interfaces and nozzle-freeze behavior. Hot runners reduce runner scrap and improve fill consistency but add manifold/nozzle-tip dwell zones where overheating, hold-up, contamination bake-on, or local moisture release can generate severe streaking. Same symptom — different root cause depending on architecture.',
          },
          { type: 'heading', level: 3, text: '2.4 Auxiliary equipment' },
          {
            type: 'list',
            items: [
              'Dryer dew point not on target (most common moisture splay cause).',
              'Hopper not sealed → re-wetting of dried resin.',
              'Loader hose leaks → ambient air carrying moisture.',
              'Long resin residence in hot hopper → degradation of heat-sensitive grades.',
            ],
          },
        ],
      },
      {
        id: 'diagnostics',
        title: '3. Diagnostic Techniques',
        blocks: [
          {
            type: 'orderedList',
            items: [
              'Classify the streak: location, direction, color, severity. Worsens after hopper refill? → moisture. Worsens after downtime? → residence/degradation.',
              'Verify resin moisture content with a calibrated moisture analyzer (do not trust dryer setpoint).',
              'Verify dryer dew point and hopper seal integrity.',
              'Measure actual melt temperature with purge-shot pyrometer.',
              'Inspect screw recovery stability, back pressure, decompression stroke.',
              'For gate splay: inspect gate condition and calculate shear rate.',
              'For hot runner: log nozzle-tip and manifold temperatures; check zone-to-zone deltas.',
              'Inspect regrind cleanliness and ratio.',
            ],
          },
        ],
      },
      {
        id: 'prevention',
        title: '4. Preventive Measures',
        blocks: [
          {
            type: 'list',
            items: [
              'Specify and validate dryer dew point per resin (typically -40°C for hygroscopic engineering grades).',
              'Use sealed hoppers and insulated transfer hoses.',
              'Document drying time, residence time, and dryer-to-machine timing.',
              'Establish residence-time targets (shot size ≥ 20–30% of barrel capacity).',
              'For hot runner: validate residence and zone balance at qualification.',
              'Specify gate sizes within material shear-rate limits.',
              'Standardize regrind ratio and quality.',
            ],
          },
        ],
      },
      {
        id: 'corrective-actions',
        title: '5. Corrective Actions',
        blocks: [
          { type: 'heading', level: 3, text: '5.1 Moisture splay' },
          {
            type: 'orderedList',
            items: [
              'Re-dry resin to spec; verify moisture content directly.',
              'Restore dryer dew point; check desiccant condition.',
              'Seal hopper; reduce hopper dwell time.',
              'Lower throughput only if dryer residence is inadequate.',
            ],
          },
          { type: 'heading', level: 3, text: '5.2 Degradation splay' },
          {
            type: 'orderedList',
            items: [
              'Lower melt temperature to minimum that supports stable fill.',
              'Reduce residence (smaller shot ratio, faster cycle, smaller barrel).',
              'Tear-down clean of screw, tip, and nozzle for hold-up.',
              'For hot runner: clean manifold dead spots; verify zone accuracy.',
            ],
          },
          { type: 'heading', level: 3, text: '5.3 Gate / shear splay' },
          {
            type: 'orderedList',
            items: [
              'Reduce injection speed in the gate-fill segment.',
              'Enlarge gate or shorten land.',
              'Reduce melt temperature to widen shear margin.',
            ],
          },
          { type: 'heading', level: 3, text: '5.4 Air / volatile splay' },
          {
            type: 'orderedList',
            items: [
              'Reduce decompression stroke.',
              'Increase back pressure modestly to expel entrained air.',
              'Audit nozzle seat and check for leaks.',
            ],
          },
        ],
      },
      {
        id: 'best-practices',
        title: '6. Best Practices & Pitfalls',
        blocks: [
          {
            type: 'list',
            items: [
              'If defect appears after breaks → suspect residence time or hot-runner dwell.',
              'If defect appears after hopper refill → suspect moisture or contamination.',
              'Trust measured moisture content and actual melt temperature, not setpoints.',
              'Foamy or smoking purge is the strongest single field signal for moisture or degradation.',
            ],
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Common pitfalls',
            text:
              'Assuming all silver streaks mean wet resin. Trusting barrel setpoints instead of measuring melt. Increasing temperature to "improve flow" on a degradation problem. Ignoring dryer audits because the dryer setpoint looks fine.',
          },
        ],
      },
    ],
    references: commonRefs,
  },
];
