import type { DefectGuide } from './defectGuides';

const refs = [
  { id: 'R1', text: 'Bozzelli, J. Scientific Molding — Contamination, Incompatibility, and Layered Defects.' },
  { id: 'R2', text: 'Plastics Technology. "Troubleshooter: Why Parts Peel Apart." Delamination & Skinning Series.' },
  { id: 'R3', text: 'SPE / ANTEC Papers on Polymer Incompatibility and Interfacial Adhesion in Multi-Resin Systems.' },
  { id: 'R4', text: 'DuPont, BASF, SABIC, Covestro — Engineering Thermoplastic Processing Guides (PC, PA, PBT, ABS).' },
  { id: 'R5', text: 'Autodesk Moldflow / Moldex3D — Shear-Induced Skin/Core Separation Simulation Notes.' },
  { id: 'R6', text: 'Mold-Masters / Husky / INCOE — Hot Runner Tip & Manifold Cleaning, Cross-Contamination Prevention.' },
  { id: 'R7', text: 'Polymer Engineering & Science — Hydrolytic Degradation of PC, PBT, PET and Effect on Layer Cohesion.' },
  { id: 'R8', text: 'PlasticsToday & Eng-Tips practitioner threads on delamination root-cause sequencing.' },
  { id: 'R9', text: 'Engel / Arburg machine technical bulletins — Screw Wear, Mixing Sections, and Melt Homogeneity.' },
  { id: 'R10', text: 'ASTM D638 / ISO 527 — Tensile testing references for evaluating delamination structural impact.' },
];

export const delaminationGuide: DefectGuide = {
  slug: 'delamination',
  title: 'Delamination',
  summary:
    'A layered, peelable surface or sub-surface separation in molded parts caused by polymer incompatibility, contamination, moisture, severe shear, or poor melt cohesion — produces fish-scale flakes that can be lifted with a fingernail or tape and is often a structural, not just cosmetic, defect.',
  category: 'Structural & Cosmetic',
  severity: 'high',
  tags: [
    'delamination',
    'skinning',
    'contamination',
    'incompatible resin',
    'moisture',
    'shear',
    'hot runner',
    'cold runner',
    'regrind',
    'adhesion',
  ],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Delamination is the separation of a molded part into discrete layers — typically a thin "skin" that peels, flakes, or scales away from the underlying core. Unlike splay or flow lines (which are surface-only artifacts of shear or moisture), true delamination represents a real loss of cohesion between adjacent material layers. The interface between layers has little or no molecular entanglement, so the layers behave as physically separate sheets bonded only by friction or weak van der Waals forces.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Visual & tactile signature',
          text:
            'Fish-scale flakes near the gate, peelable skin under fingernail or adhesive tape, onion-layer cross-section when the part is bent or cut, white/silver streaks that lift instead of polish out. If a layer can be removed with tape, it is delamination — not splay, not flow lines.',
        },
        {
          type: 'list',
          items: [
            'Cosmetically visible as silver flakes, blisters, or peeling skin — most often near the gate or in last-fill regions.',
            'Structurally significant: a delaminated wall has a fraction of its expected impact strength because load cannot transfer across the layer interface.',
            'Often misdiagnosed as splay (moisture/shear streaks). Splay does not peel; delamination does.',
            'Can be intermittent — a single contaminated pellet or a brief temperature excursion can cause it for a few shots and disappear.',
          ],
        },
        {
          type: 'table',
          caption: 'Delamination vs commonly confused defects',
          columns: ['Defect', 'Peels with tape?', 'Primary mechanism', 'Typical location'],
          rows: [
            ['Delamination', 'YES', 'Loss of inter-layer cohesion (incompatibility, contamination, shear)', 'Gate area, last-fill, knit lines'],
            ['Splay / Silver streaks', 'No (surface only)', 'Moisture vapor or shear-induced gas streaks', 'Radiating from gate along flow'],
            ['Flow lines', 'No', 'Cooling-rate variation across flow front', 'Throughout flow path'],
            ['Blistering', 'No (raised dome)', 'Trapped gas under skin', 'Random or thick sections'],
            ['Skinning (intentional)', 'No (designed)', 'Co-injection / sandwich molding', 'Designed surface'],
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
            'Delamination has three dominant root-cause families: (a) two materials that should not be mixed are present in the same shot, (b) the melt has been damaged so cohesion is lost, or (c) flow conditions create a thermally distinct skin that does not bond to the core. Diagnosing which family is in play is the entire troubleshooting battle.',
        },
        { type: 'heading', level: 3, text: 'Material factors' },
        {
          type: 'list',
          items: [
            'Polymer incompatibility — the #1 cause. PE in PP, PP in PS, PC in ABS, PA in POM. Even small percentages create non-bonding interfaces.',
            'Excess or wrong regrind — different MFI, contaminated batch, or different generation regrind reduces homogeneity.',
            'Moisture-driven hydrolysis in PC, PBT, PET, PA — degraded chains have lower entanglement and less cohesive strength.',
            'Wrong or excessive purge compound residue carried into production shots.',
            'Filler/additive separation — high glass loading, color concentrate, or release-agent-laden masterbatch can create slip planes.',
            'Highly hygroscopic resins run wet do not just splay — they delaminate when chain scission is severe.',
          ],
        },
        { type: 'heading', level: 3, text: 'Process parameters' },
        {
          type: 'list',
          items: [
            'Melt temperature too LOW → poor mixing, cold skin freezes against the wall before bonding to the core.',
            'Melt temperature too HIGH → thermal degradation, chain scission, lost cohesion.',
            'Injection speed too high → extreme shear at the gate, separating the skin from the core via shear stratification.',
            'Mold temperature too low → fast skin freeze, no time for inter-layer entanglement at fountain flow front.',
            'Insufficient back pressure → poor mixing of color, regrind, and additives → striated melt.',
            'Excessive decompression → air pulled into the nozzle, oxidizes the melt, creates a non-bonding boundary.',
          ],
        },
        { type: 'heading', level: 3, text: 'Mold & runner design' },
        {
          type: 'paragraph',
          text:
            'The cold-runner vs hot-runner distinction is critical and changes both the dominant cause and the response.',
        },
        {
          type: 'table',
          caption: 'Cold runner vs hot runner — delamination mechanism comparison',
          columns: ['Aspect', 'Cold Runner', 'Hot Runner'],
          rows: [
            ['Dominant mechanism', 'Cold-skin layering from sprue/runner bringing in solidified leading edge; cold slug at gate', 'Cross-contamination from prior color/material in manifold; tip hold-up; over-shear at valve gate'],
            ['Contamination risk', 'Lower — runner is purged each shot', 'HIGH — manifold dead spots hold residue indefinitely'],
            ['Color change tolerance', 'Forgiving', 'Critical — incomplete color change shows as delamination of the trailing color'],
            ['Shear at gate', 'Moderate (pin or sub gate)', 'Can be severe at thermal/valve gate — skin/core split possible'],
            ['First fix to try', 'Increase melt + nozzle temp; add cold slug well; reduce runner-to-gate restriction', 'Verify all manifold zones at setpoint; perform full cold-purge color change; inspect tips'],
            ['Worst-case fix', 'Modify runner geometry', 'Disassemble manifold for cleaning'],
          ],
        },
        { type: 'heading', level: 3, text: 'Machine & auxiliary equipment' },
        {
          type: 'list',
          items: [
            'Worn screw / non-return valve → poor mixing, inconsistent shot, melt striations.',
            'Insufficient L/D for the resin → engineering thermoplastics need 20:1+ for proper homogenization.',
            'Wrong screw geometry — general-purpose screw running a high-shear-sensitive resin (PC, PMMA) damages the melt.',
            'Hot Runner Temperature Controller (HRTC) drift — a single zone 20–30 °C off setpoint creates a layered cold/hot melt stream.',
            'Thermolator failure on one mold half → asymmetric skin formation, one side delaminates.',
            'Material handling: cross-contamination at the dryer, hopper, or central conveying line — most underrated root cause in multi-machine plants.',
            'Sprue picker / robot dropping a previous-shot purge slug back into the hopper — happens more than people admit.',
          ],
        },
      ],
    },
    {
      id: 'diagnostics',
      title: '3. Diagnostic Techniques',
      blocks: [
        { type: 'heading', level: 3, text: 'Shop-floor (5-minute) checks' },
        {
          type: 'orderedList',
          items: [
            'Tape test — apply adhesive tape to the suspect area, peel sharply. If a layer lifts, it is delamination.',
            'Fingernail test — try to lift the skin at the gate or last-fill. If it flakes, confirm with tape.',
            'Bend / cut test — flex the part or section it. Onion layers in cross-section confirm internal delamination.',
            'Burn test on a flake — if the flake burns differently than the base resin, contamination is confirmed.',
            'Purge sequence — purge the barrel with virgin resin, run 20 shots. If defect disappears, contamination upstream of the screw is the root cause.',
          ],
        },
        { type: 'heading', level: 3, text: 'Lab / instrumented analysis' },
        {
          type: 'list',
          items: [
            'FTIR (Fourier-Transform Infrared Spectroscopy) on lifted flakes vs base resin — identifies foreign polymer.',
            'DSC (Differential Scanning Calorimetry) — multiple melt peaks indicate a blend of two polymers in one part.',
            'Optical microscopy on cross-section — visualizes layer interfaces and skin thickness.',
            'SEM on the peeled interface — shows whether the failure is adhesive (clean separation) or cohesive (within one layer).',
            'Moisture analysis (Karl Fischer or in-line sensor) — confirm hygroscopic resin moisture content vs spec.',
          ],
        },
        { type: 'heading', level: 3, text: 'Mold-flow simulation' },
        {
          type: 'list',
          items: [
            'Moldflow / Moldex3D — visualize fountain-flow shear rate at the gate, identify locations where shear exceeds the resin\'s critical value.',
            'Skin/core temperature contrast plots — high contrast at the wall indicates a frozen skin that will not bond.',
            'Co-injection or mixed-resin simulations to confirm whether a designed sandwich structure is at risk of layer separation.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Diagnostic decision rule',
          text:
            'If the defect appears immediately after a material change, color change, or regrind addition → contamination/incompatibility. If it appeared gradually as machine ran longer → screw/HRTC wear or moisture. If it appeared after a process change → shear or cold-skin from the new parameters.',
        },
      ],
    },
    {
      id: 'prevention',
      title: '4. Preventive Measures',
      blocks: [
        { type: 'heading', level: 3, text: 'Material & material handling' },
        {
          type: 'list',
          items: [
            'Dedicate hoppers and conveying lines to incompatible polymer families (polyolefins separated from styrenics and engineering resins).',
            'Verify regrind: same lot, same generation count, same color stream. Cap regrind percentage per resin guide.',
            'Dry hygroscopic resins to spec — verify with measured moisture, not just dryer setpoint and dew point.',
            'Use color and additive masterbatches qualified for the carrier resin.',
            'Eliminate release agents on tools that mold cohesion-sensitive parts (PC, PMMA, medical PEEK).',
          ],
        },
        { type: 'heading', level: 3, text: 'Process optimization' },
        {
          type: 'list',
          items: [
            'Run melt temperature in the upper third of the supplier window when delamination risk is high — promotes inter-layer entanglement.',
            'Use moderate-to-high back pressure (50–150 psi typical) for melt homogeneity, but never so high that it shears sensitive resins.',
            'Multi-stage injection: slow start to fill the gate without shear-stratification, faster mid-fill, controlled end of fill.',
            'Mold temperature high enough to delay skin freeze — especially at the gate area.',
            'Minimize decompression (suckback) to the smallest value that prevents drool.',
          ],
        },
        { type: 'heading', level: 3, text: 'Mold design improvements' },
        {
          type: 'list',
          items: [
            'Cold runner: cold slug well, generous gate land, smooth runner-to-gate transition. Avoid undersized gates that create shear hot-spots.',
            'Hot runner: balanced manifold flow paths, correctly sized tips for the resin, no dead spots. Schedule preventive disassembly cleaning for color-change tools.',
            'Avoid sharp wall-thickness transitions — the thin section freezes first and creates a skin discontinuity.',
            'Adequate venting at last-fill regions — trapped gas creates oxidized layers that do not bond.',
          ],
        },
        { type: 'heading', level: 3, text: 'Machine calibration & PM' },
        {
          type: 'list',
          items: [
            'Screw and check-ring inspection on a documented schedule — wear directly correlates with melt inhomogeneity.',
            'Calibrate all hot-runner zones quarterly; inspect thermocouples — a failed TC commonly causes one-cavity delamination.',
            'Verify thermolator flow and ΔT on each mold half before each run.',
            'Use in-line moisture sensors on hygroscopic resins where defect cost is high.',
          ],
        },
      ],
    },
    {
      id: 'corrective-actions',
      title: '5. Corrective Actions',
      blocks: [
        { type: 'heading', level: 3, text: 'In-process adjustments (try in this order)' },
        {
          type: 'orderedList',
          items: [
            'STOP and verify material — confirm the correct resin, correct color, correct regrind ratio is being fed. 80% of delamination cases end here.',
            'Purge the barrel with virgin resin, 15–20 shots, observe if defect clears.',
            'Increase melt temperature by 10 °C steps (within supplier window). Re-evaluate after stabilization.',
            'Increase mold temperature 5–10 °C, especially in the gate area.',
            'Reduce injection speed at the gate (first stage) to lower wall shear rate.',
            'Increase back pressure 10–20 psi for better mixing.',
            'Reduce or eliminate decompression.',
            'Verify all hot-runner zones are at setpoint and stable. Cycle suspect zones.',
            'Reduce regrind percentage to 0% as a diagnostic. If defect clears, regrind quality is the issue.',
          ],
        },
        { type: 'heading', level: 3, text: 'Post-processing (mitigation, not cure)' },
        {
          type: 'list',
          items: [
            'Annealing reduces frozen-in stress but cannot heal a non-bonded interface — do not rely on it for structural parts.',
            'Painting or texturing can hide cosmetic delamination but the structural weakness remains.',
            'Solvent or flame treatment may improve appearance temporarily; both risk further degradation.',
          ],
        },
        { type: 'heading', level: 3, text: 'Redesign / tooling escalation' },
        {
          type: 'list',
          items: [
            'Open the gate land or change gate type (sub → edge, edge → fan) to reduce shear stratification.',
            'For hot runner: replace tips with a profile better matched to the resin; rebalance manifold flow lengths.',
            'Modify part wall to remove sharp thickness transitions.',
            'Add or enlarge vents in last-fill regions.',
            'For chronic cross-contamination: dedicate a tool to a single material family.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Do not ship structural parts with delamination',
          text:
            'A delaminated load-bearing part can lose 50–80% of its impact strength and may fail catastrophically in service. Cosmetic-only parts may be acceptable per spec, but anything carrying load, sealing, or pressure must be quarantined until root cause is corrected and verified with destructive testing.',
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: '6. Troubleshooting Flow',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Use this stepwise flow when delamination is detected on the floor. The first split — recent change vs gradual onset — drives the entire diagnostic path.',
        },
        { type: 'heading', level: 3, text: 'Step 1 — Confirm it is delamination' },
        {
          type: 'list',
          items: [
            'Tape test → layer lifts? → YES, proceed. NO → diagnose as splay, flow line, or blister instead.',
          ],
        },
        { type: 'heading', level: 3, text: 'Step 2 — Triage by onset pattern' },
        {
          type: 'orderedList',
          items: [
            'Started immediately after a material/color/regrind change → CONTAMINATION path: purge, verify feed, check hopper and conveying line.',
            'Started gradually as run progressed → DEGRADATION path: check moisture, screw wear, hot runner zone drift, residence time.',
            'Started after a process parameter change → SHEAR / SKIN path: walk back the parameter change; address melt temp, injection speed, mold temp.',
          ],
        },
        { type: 'heading', level: 3, text: 'Step 3 — Cold runner vs hot runner branch' },
        {
          type: 'orderedList',
          items: [
            'Cold runner → focus on melt temp, cold slug well, gate land, runner balance, regrind quality.',
            'Hot runner → verify every manifold zone at setpoint, inspect tips, perform full cold-purge color change, schedule disassembly cleaning if chronic.',
          ],
        },
        { type: 'heading', level: 3, text: 'Step 4 — Verify the fix' },
        {
          type: 'list',
          items: [
            'Run 20–50 shots after the change and tape-test 5 random parts.',
            'For structural parts, perform impact test (Izod / drop) on samples before releasing the lot.',
            'Document the change, the part numbers affected, and the verification data.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Common pitfalls',
          text:
            'Treating delamination as splay and chasing only moisture. Increasing injection speed to "blow through" the defect — this makes shear-driven delamination worse. Trusting the dryer setpoint instead of measuring resin moisture. Ignoring a single hot-runner zone that is 15–20 °C off setpoint. Not verifying that regrind is the same lot/generation as virgin.',
        },
      ],
    },
    {
      id: 'best-practices',
      title: '7. Industry Best Practices',
      blocks: [
        {
          type: 'list',
          items: [
            'SPE / ANTEC consensus: delamination is a cohesion failure, not a surface defect — diagnose at the interface, not the surface.',
            'Engel / Arburg / Husky technical bulletins: maintain screws and check-rings on a documented PM schedule; melt homogeneity is the foundation of layer cohesion.',
            'Resin supplier guides (DuPont, BASF, SABIC, Covestro): respect the supplier moisture spec measured, not assumed; respect the supplier melt temperature window.',
            'ISO / ASTM: when a delamination occurs on a structural part, treat the lot as suspect until destructive testing confirms strength.',
            'Practitioner consensus from PlasticsToday and Eng-Tips: cross-contamination is the most common root cause in multi-resin plants and the most under-investigated.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Discipline that prevents 90% of delamination',
          text:
            'Dedicated material handling, documented regrind control, measured (not assumed) moisture, balanced and clean hot-runner systems, and a screw PM program. Process tweaks fix symptoms; these disciplines remove root causes.',
        },
      ],
    },
  ],
  references: refs,
};
