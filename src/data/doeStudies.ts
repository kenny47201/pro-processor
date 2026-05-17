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
      { label: 'Technical Reference (PDF)', href: '/doe/shot-size-cushion-study-guide.pdf' },
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
];
