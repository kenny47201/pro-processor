// DOE (Design of Experiments) studies registry.
// Each study pairs structured how-to content with a linked calculator/worksheet
// in Process Tools (referenced by `linkedToolId`).

import pressureLoss01 from '@/assets/doe/pressure-loss-01-definition.png';
import pressureLoss02 from '@/assets/doe/pressure-loss-02-drivers.png';
import pressureLoss03 from '@/assets/doe/pressure-loss-03-cold-vs-hot.png';
import pressureLoss04 from '@/assets/doe/pressure-loss-04-how-to-run.png';
import pressureLoss05 from '@/assets/doe/pressure-loss-05-interpreting.png';
import pressureLoss06 from '@/assets/doe/pressure-loss-06-troubleshooting.png';
import viscosity01 from '@/assets/doe/viscosity-curve-01-definition.png';
import viscosity02 from '@/assets/doe/viscosity-curve-02-shifts.png';
import viscosity03 from '@/assets/doe/viscosity-curve-03-polymers.png';
import viscosity04 from '@/assets/doe/viscosity-curve-04-cold-vs-hot.png';
import viscosity05 from '@/assets/doe/viscosity-curve-05-flowchart.png';
import viscosity06 from '@/assets/doe/viscosity-curve-06-using-results.png';
import gateSeal01 from '@/assets/doe/gate-seal-01-definition.png';
import gateSeal02 from '@/assets/doe/gate-seal-02-how-to-run.png';
import gateSeal03 from '@/assets/doe/gate-seal-03-cold-vs-hot.png';
import gateSeal04 from '@/assets/doe/gate-seal-04-what-changes.png';
import gateSeal05 from '@/assets/doe/gate-seal-05-troubleshooting.png';
import gateSeal06 from '@/assets/doe/gate-seal-06-procedure.png';
import bpRpm01 from '@/assets/doe/bp-rpm-01-definition.png';
import bpRpm02 from '@/assets/doe/bp-rpm-02-matrix.png';
import bpRpm03 from '@/assets/doe/bp-rpm-03-cold-vs-hot.png';
import bpRpm04 from '@/assets/doe/bp-rpm-04-procedure.png';
import bpRpm05 from '@/assets/doe/bp-rpm-05-responses.png';
import bpRpm06 from '@/assets/doe/bp-rpm-06-troubleshooting.png';
import decompression01 from '@/assets/doe/decompression-01-definition.png';
import decompression02 from '@/assets/doe/decompression-02-tradeoff.png';
import decompression03 from '@/assets/doe/decompression-03-cold-vs-hot.png';
import decompression04 from '@/assets/doe/decompression-04-procedure.png';
import decompression05 from '@/assets/doe/decompression-05-responses.png';
import decompression06 from '@/assets/doe/decompression-06-troubleshooting.png';

export type DoeSection = {
  id: string;
  title: string;
  image?: string;
  body?: string[];
};

export type DoeStudy = {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  /** Process Tools tool id used to deep-link to the calculator/worksheet. */
  linkedToolId?: string;
  linkedToolLabel?: string;
  /** Optional downloadable references (placed under /public). */
  downloads?: { label: string; href: string }[];
  sections: DoeSection[];
};

export const doeStudies: DoeStudy[] = [
  {
    id: 'pressure-loss-study',
    title: 'Pressure-Loss Study',
    shortTitle: 'Pressure Loss',
    summary:
      'Quantify pressure drop through the melt delivery system (nozzle → sprue → runner/manifold → gate → cavity) to locate restrictions, imbalance, and inefficient melt delivery.',
    linkedToolId: 'pressure-loss',
    linkedToolLabel: 'Pressure Loss Calculator',
    downloads: [
      { label: 'Technical Guide (PDF)', href: '/doe/pressure-loss-study-guide.pdf' },
      { label: 'Technical Guide (DOCX)', href: '/doe/pressure-loss-study-guide.docx' },
    ],
    sections: [
      {
        id: 'definition',
        title: 'Definition & Core Concept',
        image: pressureLoss01,
        body: [
          'A pressure-loss study is a controlled DOE used to measure or infer the pressure drop through the nozzle, runner system, gate, and cavity during filling so the processor can locate restrictions, imbalance, and inefficient melt delivery.',
          'Cold runner: losses concentrate in sprue and runner mass. Hot runner: losses shift to manifold, drops, tips, and gates.',
        ],
      },
      {
        id: 'drivers',
        title: 'What Drives Pressure Loss?',
        image: pressureLoss02,
        body: [
          'Material, mold design, process settings, machine condition, and auxiliary equipment all contribute. The study reveals where pressure is being wasted, whether the mold is balanced, whether viscosity/temperature conditions are appropriate, and whether design or processing changes will give the best improvement.',
        ],
      },
      {
        id: 'cold-vs-hot',
        title: 'Cold Runner vs Hot Runner',
        image: pressureLoss03,
        body: [
          'Interpret hot-runner and cold-runner results differently. A hot runner can hide runner freeze but amplify manifold/tip imbalance; a cold runner adds runner mass and heat loss that directly affect pressure demand.',
        ],
      },
      {
        id: 'how-to-run',
        title: 'How to Run the Study',
        image: pressureLoss04,
        body: [
          'Eight steps: define scope, verify machine/check-ring, prepare material, stabilize mold/hot-runner temps, set a repeatable baseline, run shots and record data, compare losses by segment, then change gate/runner/manifold/temp/speed/profile based on findings.',
          'If repeatability is poor, fix the machine, material handling, or thermal stability before trusting the pressure-loss study.',
        ],
      },
      {
        id: 'interpreting',
        title: 'Interpreting Results',
        image: pressureLoss05,
        body: [
          'Compare required fill pressure curves, identify the dominant loss segment, check cavity-to-cavity balance, and match the pressure signature to its likely meaning (high everywhere, large gate drop, end-fill spike, cavity variation, low repeatability).',
          'Use repeatable data and, when possible, cavity pressure sensors to separate machine pressure from true cavity filling behavior.',
        ],
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting & Corrective Actions',
        image: pressureLoss06,
        body: [
          'Work from the largest pressure drop toward the cavity. Walk the decision tree by location (nozzle, cold runner/sprue, hot runner manifold/tip, gate, end of fill/cavity) and apply the matching corrective actions.',
          'Follow up by confirming lower required pressure within machine limits, maintaining fill time and part quality, and updating the setup sheet with the final conditions.',
        ],
      },
    ],
  },
  {
    id: 'shot-size-cushion-study',
    title: 'Shot Size / Cushion Study',
    shortTitle: 'Shot Size & Cushion',
    summary:
      'Establish the screw recovery position, transfer (V→P) point, and residual melt cushion needed to fill the mold in a repeatable, pressure-transmitting, non-bottomed-out condition.',
    linkedToolId: 'shot-volume',
    linkedToolLabel: 'Shot Volume Calculator',
    downloads: [
      { label: 'Quick-Start Guide (PDF)', href: '/doe/shot-size-cushion-study-guide.pdf' },
      { label: 'Full Technical Reference (PDF)', href: '/doe/shot-size-cushion-study-technical-reference.pdf' },
    ],
    sections: [
      {
        id: 'definition',
        title: 'Definition & Deliverables',
        body: [
          'A shot size / cushion study is a controlled molding experiment that establishes the screw recovery position, transfer position, and residual melt cushion required to fill the mold in a repeatable, pressure-transmitting, non-bottomed-out condition.',
          'Deliverables are not just "a shot size number." They are: a validated fill-only volume, a transfer point near the intended fill percentage (typically 95–98% of molded volume before pack), a final cushion control band, repeatable fill time, repeatable peak pressure, and evidence that pack/hold pressure can be transmitted to the cavity without running out of melt in front of the screw.',
          'For a reciprocating screw, injected volume ≈ (π × screw diameter² / 4) × screw travel — engineering estimate only. Real injected mass also depends on melt density, compressibility, check-ring leakage, decompression, and hydraulic response.',
        ],
      },
      {
        id: 'what-it-is-not',
        title: 'What the Study Is NOT',
        body: [
          'Not "increase shot until the part looks full" — that hides defects under pack pressure.',
          'Not a relative-viscosity curve — that test evaluates fill-rate sensitivity, not fill volume or V→P.',
          'Not a gate seal study — gate seal evaluates hold time and part-weight stabilization after fill/pack are already rational.',
          'Not a universal cushion rule — the same cushion distance can represent very different melt volumes across screw diameters. Rules like 3–6 mm or 5–10% of shot stroke are startup boundaries only, not substitutes for data.',
        ],
      },
      {
        id: 'why-run-it',
        title: 'When & Why to Run It',
        body: [
          'Run the study whenever you must separate fill, pack, and hold behavior: new mold startup, mold transfer between presses, short shots or drifting cushion, flash after a speed increase, medical/automotive validation, or a material-lot/regrind change.',
          'Especially valuable when the same defect could be caused by multiple subsystems — material viscosity, gate restriction, non-return valve leakage, blocked vents, hot-runner imbalance, water-flow instability, or excessive clamp force.',
        ],
      },
      {
        id: 'measurements',
        title: 'Required Measurements',
        body: [
          'Record per shot: screw position at start of injection (with decompression status), transfer position (in the controller’s own units), final cushion (cycle trace, not just HMI snapshot — capture minimum cushion and stabilized cushion), fill time (process response, not just speed setting), peak pressure (plastic/nozzle/cavity preferred; hydraulic acceptable with intensification ratio noted), and part weight (cavity-separated when possible).',
          'Also log water flow + inlet/outlet temps and hot-runner actual zone temps, valve timing, and output % — setpoints alone are not adequate proof of thermal balance.',
        ],
      },
      {
        id: 'material-process',
        title: 'Material & Process Drivers',
        body: [
          'Material: viscosity/MFR, melt temp, mold temp, moisture, fillers, regrind %, color concentrate — each shifts pressure demand and cushion behavior. Tie the study to a fill rate selected from a viscosity curve, not a generic speed %.',
          'Process: injection speed, pressure limit, transfer position, hold pressure, hold time, melt temp, and mold temp all interact. A pressure-limited fill-only study is invalid for transfer and viscosity conclusions.',
          'Polymer notes — PP: semi-crystalline, sensitive to cooling; ABS: cosmetic-sensitive, dry it; PC: high viscosity, narrow degradation window — excess cushion increases residence damage; PA/nylon: hygroscopic; TPE/TPV: compressible, validate supplier-recommended cushion on the tool.',
        ],
      },
      {
        id: 'cold-vs-hot',
        title: 'Cold Runner vs Hot Runner',
        body: [
          'Cold runner: every cycle injects part + sprue + runners + gates. Cushion and shot-size are sensitive to runner weight, cold-slug behavior, sprue/nozzle sealing, runner balance, and regrind practice. Short-shot progression is visually informative.',
          'Hot runner: manifold melt is not ejected each shot, but manifold compressibility, valve timing, tip condition, shear history, and controller stability strongly influence apparent cushion, pressure profile, cavity balance, and fill repeatability. Tip freeze, valve-pin sticking, or heater/T-C failure can mimic material shortage.',
        ],
      },
      {
        id: 'gate-design',
        title: 'Gate Design Effects',
        body: [
          'Gate geometry exposes the difference between "the machine moved plastic" and "the cavity received plastic." Small or poorly located gates → high shear heat, high pressure drop, unbalanced fill, blush, premature freeze-off, unstable cushion. Oversized gates → vestige, long gate-seal time, stringing, drool, and trim issues.',
        ],
      },
      {
        id: 'machine-aux',
        title: 'Machine & Auxiliary Conditions',
        body: [
          'Validate before trusting study data: non-return valve seating, screw-position calibration and zero, hydraulic/electric response time, pressure-transducer calibration, nozzle seating, clamp force, water flow per circuit, dryer dew point + residence, and hot-runner controller alarms.',
          'A drifting cushion may be real check-ring leakage, or it may be water/thermal instability, dryer drift, or controller alarms. Diagnose before changing process settings.',
        ],
      },
      {
        id: 'interpretation',
        title: 'Interpreting Results',
        body: [
          'Interpret pressure and cushion together. A flat cushion with rising peak pressure suggests viscosity rise or gate/vent restriction. A falling cushion with stable pressure suggests check-ring leakage. Pressure spike at end-of-fill suggests transfer too late or venting/overpack.',
          'Confirm with part weight, cavity-by-cavity balance, short-shot appearance, and dimensions — not machine numbers alone.',
        ],
      },
      {
        id: 'sop',
        title: 'Shop-Floor SOP & Acceptance',
        body: [
          'Preflight: thermal soak, water flows verified, hot-runner zones at actual setpoint with no alarms, material dryness confirmed, regrind locked, screw-position calibration verified, pressure limit set high enough to maintain velocity control.',
          'Run: viscosity curve first → select fill speed → run fill-only shots stepping shot size → identify 95–98% short-shot transfer → set cushion band → verify repeatability across ≥30 shots → check cavity-to-cavity weight balance → confirm process window.',
          'Accept when: minimum cushion stays above zero through worst normal material/temperature variation, fill time and peak pressure are repeatable, weight and dimensions meet spec, and no pressure-limited shots occur.',
        ],
      },
      {
        id: 'pitfalls',
        title: 'Common Pitfalls',
        body: [
          'Confusing this study with a viscosity curve or gate-seal study.',
          'Applying a generic cushion rule across different screw diameters.',
          'Running pressure-limited shots and treating them as valid fill-only data.',
          'Trusting HMI cushion snapshot instead of the cycle trace (minimum cushion may be much lower).',
          'Ignoring hot-runner thermal soak time before collecting data.',
          'Mixing regrind percentages mid-study, or changing more than one variable at a time.',
        ],
      },
    ],
  },
  {
    id: 'viscosity-curve-study',
    title: 'Viscosity Curve Study',
    shortTitle: 'Viscosity Curve',
    summary:
      'Plot relative viscosity vs. relative shear rate using progressive short-shot speeds to identify the stable processing window — the foundation of a scientific molding process.',
    linkedToolId: 'viscosity-curve',
    linkedToolLabel: 'Viscosity Curve Study',
    downloads: [
      { label: 'Training Manual (PDF)', href: '/doe/viscosity-curve-study-guide.pdf' },
      { label: 'Training Manual (DOCX)', href: '/doe/viscosity-curve-study-guide.docx' },
    ],
    sections: [
      {
        id: 'definition',
        title: 'Definition, Purpose & Interpretation',
        image: viscosity01,
        body: [
          'A viscosity curve plots how apparent (or relative) viscosity changes as plastic flow rate or shear rate changes during controlled short-shot tests. Polymers are shear-thinning — higher shear rate usually lowers apparent viscosity.',
          'The plateau on the curve identifies the preferred processing window: a broad, stable zone that balances fast fill with low risk of shear heating, degradation, or burning.',
          'Outcomes: establish a robust fill-speed window, reveal viscosity sensitivity to speed, reduce lot-to-lot surprises, support process transfer, and improve consistency in hot- and cold-runner molds.',
        ],
      },
      {
        id: 'shifts',
        title: 'What Shifts the Curve',
        image: viscosity02,
        body: [
          'Material factors: resin family, molecular weight, MFR, additives, fillers, regrind, moisture, lot-to-lot variation, and thermal history.',
          'Process parameters: injection speed/fill time, peak pressure, melt and mold temperature, cushion, transfer position, cooling time, and decompression.',
          'Mold design: gate size and location, runner balance, wall thickness variation, venting, and air traps.',
          'Machine & auxiliary: screw design, check ring, barrel wear, nozzle condition, back pressure, clamp tonnage, chiller, thermolator, hot-runner controller, robot, and dryer.',
          'False-shift warnings: moisture, drifting melt temperature, inconsistent cushion, changing fill target, sticky/leaking check ring, unstable hot-runner zones, poor venting.',
        ],
      },
      {
        id: 'polymers',
        title: 'Polymer Behavior — PP vs ABS vs PC',
        image: viscosity03,
        body: [
          'All three polymers are shear-thinning, but the magnitude and window differ. PC has the highest viscosity, ABS is intermediate, PP flows most easily.',
          'PP: broad processing window, less pressure-sensitive, easier to fill thin sections. Watch over-speeding (flashing) and melt fracture at very high shear.',
          'ABS: moderate window, run mid-speeds, watch pressure rise at the high end. Sensitive to moisture and thermal oxidation.',
          'PC: narrow window, higher pressure-sensitivity especially in thin walls, needs higher melt temperature, and requires drying discipline.',
          'Additives & fillers: glass fiber and mineral fillers increase viscosity; lubricants/flow promoters decrease it; regrind is variable.',
        ],
      },
      {
        id: 'cold-vs-hot',
        title: 'Cold Runner vs Hot Runner',
        image: viscosity04,
        body: [
          'Cold runner studies include additional pressure loss through sprue and runners before the gate — results are more sensitive to geometry and cold material.',
          'Hot runner studies are more influenced by manifold temperature, tip condition, and melt residence time — results are more sensitive to heat management and dwell.',
          'Cold runner pitfalls: unbalanced runners, restrictive sprue bushing, cold slug entering the cavity, inconsistent cushion from runner volume changes.',
          'Hot runner pitfalls: wandering zone temperature, partially blocked tip, gate vestige/stringing, stagnant material and degradation.',
          'Valve-gated vs thermal-gated tips behave differently — account for shut-off, drool, vestige, and freeze-off characteristics.',
        ],
      },
      {
        id: 'how-to-run',
        title: 'Step-by-Step DOE Flowchart',
        image: viscosity05,
        body: [
          '1) Define part and mold to test. 2) Verify machine health. 3) Verify resin and drying. 4) Stabilize melt and mold temperatures. 5) Set a repeatable short-shot target and turn OFF pack/hold.',
          '6) Start at a slow fill speed. 7) Raise speed in small controlled increments (5–15%). 8) Collect peak pressure, fill time, and cushion at each point.',
          '9) Plot relative viscosity vs. relative shear rate. 10) Identify the preferred processing window (stable plateau). 11) Validate with 3–5 repeat shots. 12) Document the final speed window and plan next studies.',
          'Common pitfalls that invalidate the study: changing more than one variable, using different fill targets, running full parts instead of short shots, drifting melt temperature, ignored moisture, unstable manifold zones, check-ring leakage, worn non-return valve, robot/sprue picker interrupting cycle.',
          'What usually comes next: transfer study → pack/hold study → gate seal study → cooling study → process window confirmation.',
        ],
      },
      {
        id: 'using-results',
        title: 'Using the Results — Optimization & Corrective Actions',
        image: viscosity06,
        body: [
          'Too slow: short shots, weld lines, hesitation marks, low gloss, inconsistent filling. Too fast: flash, burn marks, jetting, excessive shear heating, residual stress. Preferred window: complete fill, lower stable injection pressure, wide robust operating window.',
          'Process decisions: select injection speed/fill time in the stable window, set transfer position, plan pack/hold study, confirm gate seal, reduce lot-to-lot sensitivity, and match fill time/pressures/transfer position when transferring between presses.',
          'Cold runner actions: review gate/runner restriction, optimize gate size/location, manage runner cooling, check cold-slug control, watch for gate blush or hesitation.',
          'Hot runner actions: tune manifold/tip temperatures, inspect tips for blockage/wear, manage residence time, reduce drool/stringing, evaluate valve-gate timing.',
          'Production corrective actions: short shots → raise speed in window, raise melt/mold temp, check venting. Flash → reduce speed, verify clamp, check transfer/pack. Burn marks → reduce speed, lower melt temp, increase venting. Flow hesitation → raise speed (still in window), raise temp, check gate/runner. Gloss variation → adjust speed to center of window, stabilize temps. Gate vestige → adjust hold time, optimize gate size or freeze, adjust transfer.',
          'The viscosity curve does not replace engineering judgment — optics, insert molding, and highly cosmetic parts may require additional caution and part-specific testing.',
        ],
      },
    ],
  },
  {
    id: 'melt-temperature-verification',
    title: 'Melt Temperature Verification DOE',
    shortTitle: 'Melt Temp Verification',
    summary:
      'Quantify the actual polymer melt temperature delivered by the machine (not the setpoint) and map how barrel zones, shear, residence time, and runner system drive it. Builds the transfer function: actual melt = f(setpoints, shear, residence, runner).',
    linkedToolId: 'material-data',
    linkedToolLabel: 'Material Data Sheet',
    downloads: [
      { label: 'Technical Guide (PDF)', href: '/doe/melt-temperature-verification-guide.pdf' },
    ],
    sections: [
      {
        id: 'definition',
        title: 'Definition & Critical Distinction',
        body: [
          'A melt-temperature verification DOE is a controlled experiment that measures the actual polymer melt temperature delivered by the injection unit under defined production conditions — not the barrel setpoint. It maps machine setpoints and process variables to measured melt temperature and product-response variables, then converts that into a robust process window, setup standard, and reaction plan.',
          'Critical distinction: a melt-temperature DOE asks "what actual melt temperature is being delivered, and what drives it?" A viscosity curve asks "at a known thermal state, what fill rate is least sensitive to viscosity variation?" They are connected, but combining them casually produces false conclusions.',
          'Run when a mold is being qualified, transferred, revalidated, repaired, converted between cold and hot runner, challenged by lot-to-lot resin changes, or suffering defects pointing toward viscosity, degradation, melt imbalance, or uncontrolled thermal history.',
        ],
      },
      {
        id: 'root-causes',
        title: 'Root-Cause Model — Why Verify, Not Assume',
        body: [
          'Setpoint ≠ delivered melt. Cold-runner purge readings, hot-runner tip-to-tip thermal spread, probe delay, purge cooling, skin formation, and technique all distort the result.',
          'Material drivers: MFR/viscosity, moisture, regrind percentage, color/additive package, lot-to-lot variation, thermal history.',
          'Machine drivers: screw design, L/D, compression ratio, check ring condition, barrel wear, back pressure, screw rpm, decompression, residence time, shot-size-to-barrel ratio.',
          'Mold/runner drivers: cold runner mass, sprue restriction, hot-runner manifold zone balance, tip/drop temperatures, gate type (valve vs thermal), gate freeze-off behavior.',
          'Auxiliary drivers: dryer condition, hopper feed-throat cooling, hot-runner controller stability, robot/sprue-picker cycle timing.',
        ],
      },
      {
        id: 'measurement',
        title: 'Measurement Technique Controls the Result',
        body: [
          'Probe selection: needle thermocouple vs IR vs in-cavity sensor — each has bias. Document the device, calibration date, and dwell time.',
          'Purge protocol: define purge volume, purge duration, and measurement delay. Record the time from purge to first reading and standardize across all runs.',
          'Cold runner: take actual purge melt at the nozzle after a controlled air-shot or onto an insulated surface; avoid skin-only readings.',
          'Hot runner: measure at the machine/nozzle and document tip-to-tip thermal spread; one bad zone biases the entire study.',
          'Repeat readings: minimum 3–5 per condition; record min/max/mean and discard the first shot after any setpoint change.',
        ],
      },
      {
        id: 'doe-architecture',
        title: 'DOE Architecture',
        body: [
          'Factors typically screened: barrel front/nozzle setpoint, screw rpm, back pressure, residence time (via shot-size ratio), and hot-runner manifold/tip setpoint where applicable.',
          'Responses: actual melt temperature, fill time, transfer pressure, peak injection pressure, cavity-pressure integral, part weight, dimensions, short-shot pattern, visual defects, weld-line severity.',
          'Hold all non-test variables stable: resin lot, dryer condition, mold temperature, water flow, cycle time, regrind percentage, decompression, and ambient conditions.',
          'Output is a transfer function — actual melt = f(setpoints, shear, residence, runner system) — that lets the team predict actual melt from controllable inputs.',
        ],
      },
      {
        id: 'cold-vs-hot',
        title: 'Cold Runner vs Hot Runner Rules',
        body: [
          'Cold runner: confirm sprue bushing/nozzle match, clean nozzle tip, sprue puller function, and absence of cold-slug obstruction. Runner mass and cold slugs dominate apparent melt variation.',
          'Hot runner: verify every zone (manifold, drops, tips, gates) is stable and within tolerance before sampling. Tip-to-tip spread is the single biggest source of false readings.',
          'Cold runner regrind is a moving material factor — control percentage, grinder screen, fines, dust, and heat history.',
          'Never use a viscosity curve taken at one actual melt temperature to justify a process running at another actual melt temperature without verification.',
        ],
      },
      {
        id: 'corrective-actions',
        title: 'Preventive & Corrective Actions',
        body: [
          'Do not compensate for a worn screw or leaking check ring by increasing temperature until the mechanical root cause has been assessed.',
          'Control regrind percentage, grinder screen, fines, dust, contamination, and heat history at every changeover.',
          'When actual melt drifts: check dryer outlet temperature/dewpoint, hopper feed-throat cooling, barrel-zone PID tuning, and screw recovery consistency.',
          'When hot-runner tip-to-tip spread exceeds tolerance: verify thermocouple integrity, controller output, manifold heater function, and balance via short-shot or zone-disable testing.',
          'Document the final setpoint window, actual-melt window, and reaction plan. Add to the setup sheet and control plan.',
        ],
      },
    ],
  },
  {
    id: 'short-shot-fill-balance',
    title: 'Short-Shot Fill Balance DOE',
    shortTitle: 'Fill Balance',
    summary:
      'Intentionally produce incomplete, pack-free parts at a fixed fill rate to evaluate how evenly the mold distributes melt before pack/hold can mask imbalance. In multi-cavity tools the primary response is cavity-to-cavity balance; in single-cavity tools it is flow-front symmetry.',
    linkedToolId: 'cavity-variation',
    linkedToolLabel: 'Cavity Variation Study',
    downloads: [
      { label: 'Technical Manual (DOCX)', href: '/doe/short-shot-fill-balance-manual.docx' },
    ],
    sections: [
      {
        id: 'definition',
        title: 'Definition & Operational Distinction',
        body: [
          'A short-shot fill balance DOE is a controlled experiment in which the processor intentionally produces incomplete, pack-free parts at a fixed and validated fill rate, then compares the degree of fill by cavity, by flow path, and by melt-front progression to determine whether the mold, material, machine, and process distribute molten polymer uniformly before pack/hold begins.',
          'Operational distinction: a production short shot is a defect. A DOE short shot is an intentionally created diagnostic part — the difference is process control.',
          'Run after the mold is already capable of making a stable fill-only part. Pack and hold are removed or reduced to machine minimum so second-stage pressure cannot hide the true first-stage fill pattern.',
          'Reduce shot size or transfer position until the most-filled cavity is approximately 60–80% full. Collect multiple labeled short shots so cavity ID, shot-to-shot repeatability, and pattern repeatability can be assessed.',
        ],
      },
      {
        id: 'doe-sequence',
        title: 'Recommended DOE Sequence',
        body: [
          '1) Prerequisites — material, drying, mold temperature, water, machine health verified.',
          '2) Melt-temperature verification — confirm actual delivered melt.',
          '3) Viscosity curve DOE — select a robust fill-rate window.',
          '4) Fill-only baseline — pack off, target ~95–98% fill.',
          '5) Short-shot fill balance — leading cavity ~60–80% full.',
          '6) Corrective action — process / vent / hot runner / gate / cooling / part design.',
          'Control principle: isolate first-stage filling before pack/hold can mask imbalance.',
        ],
      },
      {
        id: 'measurements',
        title: 'What the DOE Measures',
        body: [
          'Cavity-to-cavity short-shot weight — weigh each cavity or runner/part group at the same reduced shot condition. Quantifies balance objectively.',
          'Percent fill by cavity — by volume, image analysis, CAD volume comparison, or consistent weighing.',
          'Melt-front location — photograph each part side-by-side by cavity ID with fixed lighting and scale. Reveals hesitation, racetrack, weld lines, trapped air, and flow-path bias.',
          'Injection pressure curve — machine trace, nozzle pressure, or in-mold pressure. Indicates freeze-off, pressure limitation, viscosity drift, and whether the machine is still velocity-controlled.',
          'Screw position stability — record at transfer, cushion, and hold with pack off. Ensures the machine is not creeping forward during the zero-pack phase.',
          'Cavity pressure arrival and integral — in-mold sensor when installed. Higher-fidelity indicator of melt arrival, peak, and packing potential.',
        ],
      },
      {
        id: 'root-causes',
        title: 'Root Causes of Imbalance',
        body: [
          'Runner and gate design flaws: unbalanced layout, shear-induced viscosity imbalance (Beaumont effect), gate-size variation, restrictive sprue bushing.',
          'Mold-side: venting differences, cooling imbalance between cavities, leader pin/parting line wear causing flash bias, inserts running at different temperatures.',
          'Hot runner: zone temperature drift, partially blocked tip, valve-gate timing skew, manifold leak, drool/stringing.',
          'Process: drifting melt temperature, inconsistent cushion, drifting fill target, regrind variation, machine velocity profile changes.',
          'Material: lot-to-lot MFR variation, moisture, regrind percentage, color/additive package shifts.',
        ],
      },
      {
        id: 'corrective-actions',
        title: 'Corrective Actions & Decision Tree',
        body: [
          'Process first: confirm stable melt temperature, viscosity-curve window, fill-only baseline, and cushion before changing the tool.',
          'Hot-runner: balance manifold/tip setpoints, verify valve-gate timing, inspect tips for wear/blockage, manage residence time.',
          'Venting: add or service vents on the lagging cavities; trapped air mimics imbalance.',
          'Gate/runner: consider gate-steel modification, runner re-sizing, or melt-rotation inserts (MeltFlipper-style) to address shear-induced imbalance.',
          'Cooling: equalize cavity temperatures via independent loop control; differential cooling shifts viscosity cavity-to-cavity.',
          'Last-resort redesign: gate relocation, runner re-cut, or part-design changes if the imbalance is geometric and cannot be processed out.',
        ],
      },
      {
        id: 'pitfalls',
        title: 'Common Pitfalls That Invalidate the Study',
        body: [
          'Leaving pack/hold on — second-stage pressure masks first-stage imbalance.',
          'Inconsistent shot size or transfer position between sampled shots.',
          'Mixing shots from different cycles, cushions, or melt conditions.',
          'Subjective percent-fill estimates without weights or photos.',
          'Skipping the fill-only baseline — you cannot evaluate balance from a packed part.',
          'Confusing a shot-size/cushion study with a fill-balance study; they answer different questions.',
        ],
      },
    ],
  },
  {
    id: 'gate-seal-study',
    title: 'Gate Seal Study',
    shortTitle: 'Gate Seal',
    summary:
      'Determine the minimum pack/hold time after which additional hold time no longer increases part weight — the point at which the gate has frozen and pressure can no longer feed the cavity.',
    linkedToolId: 'gate-freeze',
    linkedToolLabel: 'Gate Freeze Worksheet',
    downloads: [
      { label: 'Technical Reference (PDF)', href: '/doe/gate-seal-study-guide.pdf' },
      { label: 'Editable Manual (DOCX)', href: '/doe/gate-seal-study-guide.docx' },
    ],
    sections: [
      {
        id: 'definition',
        title: 'Definition & Why Run It',
        image: gateSeal01,
        body: [
          'A gate seal study is a process DOE that finds the earliest hold time at which average part weight stops increasing, because the gate has frozen and additional hold pressure can no longer feed the cavity.',
          'Outputs: gate seal time, recommended hold-time window, weight stability, and a measure of process robustness.',
          'Use it to optimize hold time, prevent sinks/voids/underpack, reduce dimensional variation, avoid wasted cycle time, and prevent false optimization based on cosmetic checks alone.',
        ],
      },
      {
        id: 'how-to-run',
        title: 'How to Run & Interpret',
        image: gateSeal02,
        body: [
          'Objective: find the earliest hold time at which average part weight no longer increases.',
          'Procedure: stabilize the process; hold melt temp, mold temp, shot size/cushion, transfer position, hold pressure, and cooling time constant; vary only hold time in planned increments; discard stabilization shots; collect repeats; weigh on a calibrated scale (0.01 g or better); plot average weight vs. hold time.',
          'Read the curve in four zones: underpacked → transition → plateau (weight stability) → wasted hold time beyond seal. The gate seal time is the earliest point on the plateau.',
          'Watch for false plateaus from unstable cushion, temperature drift, mixed cavities, insufficient repeats, poor scale resolution, or moisture/material inconsistency.',
        ],
      },
      {
        id: 'cold-vs-hot',
        title: 'Cold Runner vs Hot Runner Molds',
        image: gateSeal03,
        body: [
          'Cold runner: pressure is lost through sprue and runner before the gate; runner size, balance, and cooling all affect packing. Freeze occurs at the gate and within the cold runner. Watch for runner freeze, cold slugs, or unbalanced runners simulating an early seal.',
          'Hot runner: melt stays molten in the manifold and drop; freeze occurs mainly at the gate or thermal tip. Tip temperature stability dominates seal time; drool, stringing, or tip imbalance can simulate a late seal or hide cavity imbalance.',
          'Practical takeaway: in cold runner molds, study runner/gate pressure losses and cavity balance together; in hot runner molds, study gate behavior alongside manifold and tip temperature control.',
        ],
      },
      {
        id: 'what-changes',
        title: 'What Changes Gate Seal Time',
        image: gateSeal04,
        body: [
          'Material: viscosity, melt temp, crystallization behavior, fillers, moisture, regrind consistency. Lower viscosity / hotter melt lengthens seal time; higher viscosity / cooler melt shortens it.',
          'Process: injection speed profile, transfer position, hold pressure, cooling time, mold temperature — and the only variable in the study itself, hold-time increments.',
          'Mold design: gate type, diameter, land length, runner size/balance, wall thickness near the gate, venting, air traps and flow hesitations.',
          'Machine: screw wear, check-ring leakage, shot-size repeatability, cushion stability, pressure response, clamp force. Poor repeatability makes the study unreliable.',
          'Auxiliary: chillers, mold-temp controllers, hot-runner controllers, dryers, robots/sprue pickers. Unstable temperatures or handling can change measured seal time.',
        ],
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting Results',
        image: gateSeal05,
        body: [
          'Hold time too short: low weight, sinks, voids, short pack, dimensional shrinkage near thick areas, cavity-to-cavity inconsistency. Action: increase hold time, verify hold pressure, check that the gate is not freezing too early, review gate size and mold temp.',
          'Hold time longer than needed: wasted cycle time, little/no weight increase past plateau, possible overpack or flash. Action: reduce hold time toward the plateau and verify quality still passes.',
          'False determination: scattered weight data, drifting plateau, unstable cushion, hot-runner temp drift, moisture variation, inaccurate scale. Action: stabilize the process, separate cavities, calibrate the scale, verify temperature control, purge/dry material, repeat the study.',
          'Verify the conclusion: repeat the study, confirm the average-weight plateau, confirm dimensions, inspect for sinks/voids, review cavity pressure if available, and document the chosen hold time and rationale.',
        ],
      },
      {
        id: 'procedure',
        title: 'Standard Procedure & Decision Flow',
        image: gateSeal06,
        body: [
          'Verify prerequisites: dried/verified material, stable melt and mold temps, stable hot-runner temps (if used), consistent cooling water, calibrated scale, stable shot size/cushion, stable transfer position, consistent part handling, safe machine state.',
          'Run flow: stabilize → select hold-time plan → run each setting → collect repeats → weigh and record → plot average weight vs hold time → check for plateau.',
          'If data unstable: check check-ring leakage, screw wear, cushion variation, temperature drift, scale accuracy, cavity separation, hot-tip imbalance, runner imbalance, moisture, and auxiliary temperature control.',
          'If plateau reached: identify earliest plateau, choose a recommended hold time at or just beyond it, confirm with quality checks, and release with documented setup sheet and DOE record.',
          'Goal: determine the shortest effective hold time that still fully packs the part and maintains part quality.',
        ],
      },
    ],
  },
  {
    id: 'back-pressure-rpm-matrix',
    title: 'Back-Pressure / Screw-RPM Matrix',
    shortTitle: 'BP / RPM Matrix',
    summary:
      'Run a structured two-factor DOE on back pressure and screw RPM to identify the lowest-shear melt-preparation window that still gives stable recovery, acceptable melt quality, and repeatable part quality.',
    linkedToolId: 'material-data',
    linkedToolLabel: 'Material Data Sheet',
    downloads: [
      { label: 'Technical Reference (PDF)', href: '/doe/back-pressure-rpm-matrix-guide.pdf' },
      { label: 'Technical Reference (DOCX)', href: '/doe/back-pressure-rpm-matrix-guide.docx' },
    ],
    sections: [
      {
        id: 'definition',
        title: 'Definition & Core Mechanism',
        image: bpRpm01,
        body: [
          'A back-pressure / screw-RPM matrix is a controlled factorial study that varies plasticizing back pressure and screw rotational speed while holding material condition, barrel profile, mold temperature, and molding conditions constant.',
          'Purpose: find the lowest back pressure and lowest screw surface speed that still provide repeatable recovery, homogeneous melt, acceptable melt temperature, acceptable dispersion, and stable shot-to-shot behavior.',
          'This is a melt-preparation DOE, not a viscosity curve. It qualifies the plasticizing window before injection so downstream studies are not corrupted by unstable melt preparation.',
        ],
      },
      {
        id: 'matrix',
        title: 'Outcome Matrix & Operating Window',
        image: bpRpm02,
        body: [
          'Low BP + low RPM risks poor mixing, unmelts, and color dispersion issues. High BP + high RPM raises shear heat, degradation risk, recovery load, and drool risk.',
          'The practical target is the conservative window: the minimum BP and RPM combination that still gives stable recovery, stable weight/cushion, acceptable melt quality, and recovery completion within cooling time.',
          'Document the selected window with objective responses, not operator preference alone.',
        ],
      },
      {
        id: 'cold-vs-hot',
        title: 'Cold Runner vs Hot Runner Considerations',
        image: bpRpm03,
        body: [
          'Cold runner tools add sprue/runner pressure loss, runner freeze behavior, and regrind feedback. They are often more sensitive to shear in small cold channels and to apparent viscosity shifts caused by plasticizing changes.',
          'Hot runners remove runner scrap from the shot, but add manifold thermal balance, tip stability, residence-time, and dead-spot variables. Interpret BP/RPM results differently because the hot system stays molten between cycles.',
          'Never transfer a window from cold runner to hot runner, or vice versa, without revalidation.',
        ],
      },
      {
        id: 'procedure',
        title: 'Recommended DOE Procedure',
        image: bpRpm04,
        body: [
          'Freeze the baseline first: dry material, stabilize barrel/nozzle/mold temps, verify check-ring repeatability, and lock all non-test variables before changing BP or RPM.',
          'Choose defined BP and RPM levels, preferably comparing screw surface speed instead of raw RPM when different screw diameters are involved. Run the planned matrix in randomized order if practical.',
          'At each cell, reach steady state before recording results. Use a consistent sample size and collect enough repeats to judge range, not just averages.',
        ],
      },
      {
        id: 'responses',
        title: 'Responses to Measure',
        image: bpRpm05,
        body: [
          'Primary responses typically include recovery time, recovery-time range, shot weight/range, cushion stability, melt temperature, screw torque/load, pressure at transfer, part weight, and visible quality indicators.',
          'If fillers, colorants, or sensitive resins are involved, also inspect for fiber attrition, color streaking, splay, odor, or discoloration because these are often early signs of excessive shear or poor melt preparation.',
          'Use the same measurement technique at every cell. Poor measurement discipline can create a false “best” window.',
        ],
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting & Corrective Actions',
        image: bpRpm06,
        body: [
          'Slow recovery often points to excessive back pressure, while splay or silver streaks can indicate excessive screw speed, shear heat, or moisture issues that the DOE is exposing.',
          'Color streaks or poor mixing often indicate too little plasticizing energy; drifting cushion can indicate check-ring wear or broader machine repeatability issues rather than a true BP/RPM optimum problem.',
          'Make one change at a time, reduce shear before adding heat, and document the final window together with machine/material limits and reaction plans.',
        ],
      },
    ],
  },
  {
    id: 'decompression-doe',
    title: 'Decompression DOE',
    shortTitle: 'Decompression',
    summary:
      'Vary decompression amount, speed, and timing to find the minimum effective setting that relieves residual melt pressure without introducing air, splay, cushion instability, or false degradation symptoms.',
    linkedToolId: 'gate-freeze',
    linkedToolLabel: 'Gate Freeze Worksheet',
    downloads: [
      { label: 'Technical Manual (PDF)', href: '/doe/decompression-doe-manual.pdf' },
    ],
    sections: [
      {
        id: 'definition',
        title: 'Definition & Timing',
        image: decompression01,
        body: [
          'Decompression, suck-back, or pull-back is the backward movement of the screw after recovery or before injection to relieve residual melt pressure at the nozzle or runner entrance.',
          'A decompression DOE studies amount, speed, and timing to find the smallest setting that stops drool and stringing without destabilizing the shot or drawing air into the melt stream.',
          'Separate this from a residence/degradation study: decompression can create symptoms that resemble degradation, but it does not quantify material damage by itself.',
        ],
      },
      {
        id: 'tradeoff',
        title: 'The Minimum-Effective Tradeoff',
        image: decompression02,
        body: [
          'Too little decompression leaves pressure in the system, leading to nozzle drool, gate stringing, cold slugs, and inconsistent first-shot behavior.',
          'Too much decompression can draw air into the melt, destabilize the check ring, reduce shot repeatability, and create splay, blisters, or misleading “degradation” symptoms.',
          'The target is a window, not a single magic number: use the minimum effective decompression that solves pressure-relief symptoms while preserving repeatability.',
        ],
      },
      {
        id: 'cold-vs-hot',
        title: 'Cold Runner vs Hot Runner Behavior',
        image: decompression03,
        body: [
          'Cold runner decompression behavior is dominated by the nozzle, sprue, runner, cold slug, and first-shot fill. Pressure is relieved into a system that freezes every cycle.',
          'Hot runner decompression interacts with manifold balance, hot-tip stability, valve timing, residence time, and stagnant pockets because the system stays molten and pressurized between cycles.',
          'Settings that work in a cold runner can be completely wrong in a hot runner. Validate them separately for each mold family and runner system.',
        ],
      },
      {
        id: 'procedure',
        title: 'DOE Procedure',
        image: decompression04,
        body: [
          'Start by stabilizing the baseline: dry resin, stable temperatures, verified shot size/cushion, and no obvious mechanical leakage. If baseline stability is poor, the DOE is not valid.',
          'Define the factors deliberately: post-decompression amount, decompression speed, and whether pre-decompression is used. Build a screening matrix and run each condition with a consistent shot count and observation method.',
          'Keep all non-test variables fixed. Randomize run order when possible and record every setting change so the selected window is auditable and transferable.',
        ],
      },
      {
        id: 'responses',
        title: 'Responses to Measure',
        image: decompression05,
        body: [
          'Track drool length, first-shot fill quality, cushion and weight repeatability, splay or silver streaks, gate stringing/vestige, and machine or cavity pressure-curve behavior.',
          'Use fixed lighting, fixed part orientation, and a documented severity scale for visual ratings so the study does not devolve into opinion.',
          'A good setting improves pressure relief and gate/nozzle behavior while keeping part weight and cushion tight shot-to-shot.',
        ],
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting & Safe Adjustments',
        image: decompression06,
        body: [
          'Nozzle drool often indicates insufficient post-decompression, but low nozzle temperature, shut-off problems, and hot-runner issues can mimic the same symptom. Prove root cause before increasing pullback aggressively.',
          'Splay, blisters, or drifting cushion often point to excessive pullback or check-ring instability. First-shot shortness can indicate too much pre-decompression or loss of available melt at the start of fill.',
          'Best practice is conservative: confirm positive shut-off, adjust in small steps, verify the first shot after each change, and lock the minimum effective setting into the setup sheet once confirmed.',
        ],
      },
    ],
  },
];
