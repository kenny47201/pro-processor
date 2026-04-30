import type { DefectGuide } from './defectGuides';
import coldSlugMarksFlowchart from '@/assets/cold-slug-marks-flowchart.png';

const refs = [
  { id: 'R1', text: 'Plastics Technology. "Don\'t Forget the Cold Slug Well." The Troubleshooter Series.' },
  { id: 'R2', text: 'SEAWIN Industrial. Eliminate Cold Slugs in Injection Molding: A Guide.' },
  { id: 'R3', text: 'The Improvement of Weldline and Flow Mark Defection by Using Injection Molding Analysis (Mold Flow Case Study).' },
  { id: 'R4', text: 'Autodesk Moldflow. Runner Balance and Flow-Front Temperature Analysis Documentation.' },
  { id: 'R5', text: 'Moldex3D. Cold Slug and Hesitation Simulation References.' },
  { id: 'R6', text: 'Mold-Masters / Husky. Hot Runner Nozzle Tip and Valve Gate Design Guides.' },
  { id: 'R7', text: 'Bozzelli, J. Scientific Molding — Multi-Stage Injection and Melt Quality.' },
  { id: 'R8', text: 'SPE / ANTEC Papers on Cold Slug Mitigation in Engineering Thermoplastics (PC, LCP, PEEK).' },
  { id: 'R9', text: 'BASF / SABIC / DuPont. Engineering Thermoplastic Processing Guides.' },
  { id: 'R10', text: 'In-situ Birefringence and Ultrasonic Diagnostics for Melt Manipulation Phenomena (Polymer Engineering & Science).' },
];

export const coldSlugMarksGuide: DefectGuide = {
  slug: 'cold-slug-marks',
  title: 'Cold Slug Marks',
  summary:
    'Surface blemishes — typically dull spots, wavy lines, or discolored patches near the gate — caused when a prematurely solidified plug of polymer (a cold slug) from the nozzle tip or runner leading edge is carried into the cavity ahead of the main melt front.',
  category: 'Cosmetic & Flow',
  severity: 'medium',
  tags: ['cold slug', 'cold slug well', 'gate area', 'nozzle tip', 'hot runner', 'cold runner', 'flow mark', 'sprue'],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A cold slug is a small mass of polymer that has cooled below its effective processing temperature inside the nozzle tip, sprue, or leading runner before injection begins. When the next shot fires, this semi-solid plug is pushed ahead of the main melt front and frozen into the part — most often visible as a defect at or near the first point of cavity fill.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Visual signature',
          text:
            'Look near the gate. Cold slug marks present as dull or matte spots, wavy "comet-tail" lines flowing away from the gate, discolored patches, or in severe cases a small protrusion of solidified material embedded in the surface.',
        },
        {
          type: 'list',
          items: [
            'Almost always located at or radiating from the gate.',
            'Distinct from sink marks (volumetric) and from splay (moisture/shear streaks running along flow).',
            'May be cosmetic only, or — if the slug spans a structural section — can locally weaken the part by acting as a micro weld plane.',
          ],
        },
      ],
    },
    {
      id: 'root-causes',
      title: '2. Root Causes',
      blocks: [
        {
          type: 'heading', level: 3, text: '2.1 Material Factors',
        },
        {
          type: 'list',
          items: [
            'High melt viscosity or narrow processing window (PC, PEEK, LCP, filled Nylons).',
            'Low Melt Flow Index (MFI) grades that cool quickly at the nozzle tip.',
            'Nucleating pigments and certain colorants that promote premature crystallization.',
            'Flame-retardant additives forcing reduced melt temperature, narrowing the safe window.',
          ],
        },
        {
          type: 'table',
          caption: 'Susceptibility of Common Polymers to Cold Slug Marks',
          columns: ['Polymer', 'Susceptibility', 'Reason'],
          rows: [
            ['Polypropylene (PP)', 'Low–Moderate', 'Wide processing window, good flow.'],
            ['ABS', 'Moderate', 'Amorphous; sensitive at low mold temps or slow injection.'],
            ['Polycarbonate (PC)', 'High', 'High viscosity; large melt-to-mold ΔT (280–320 °C melt).'],
            ['Polyamide (Nylon)', 'Moderate–High', 'Sharp melting point; freezes fast on cold steel.'],
            ['LCP', 'Very High', 'Unique rheology; cold slugs form readily at hot-runner tips.'],
            ['PEEK', 'High', '360–400 °C processing; tight thermal control required.'],
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Process Parameters' },
        {
          type: 'list',
          items: [
            'Slow injection speed → melt lingers in nozzle/runner and cools.',
            'Insufficient injection pressure → melt cannot displace the cold plug fast enough.',
            'Low melt temperature → most common process-side root cause.',
            'Low mold temperature → accelerates freezing of leading melt front and runner walls.',
            'Excessive cooling time / long cycle → barrel residence and nozzle dwell increase.',
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Mold Design — Cold Runner vs. Hot Runner' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'This distinction is critical',
          text:
            'Cold runner systems defend against cold slugs mechanically (with a Cold Slug Well). Hot runner systems defend against them thermally (precise tip and manifold control). Mixing up the strategy is one of the most common mistakes in defect resolution.',
        },
        {
          type: 'table',
          caption: 'Cold Runner vs. Hot Runner — Cold Slug Defense',
          columns: ['Attribute', 'Cold Runner Mold', 'Hot Runner Mold'],
          rows: [
            ['Primary defense', 'Cold Slug Well at sprue base & runner branch ends', 'Precise nozzle-tip & manifold temperature control'],
            ['Where slug forms', 'Sprue puller, runner leading edge', 'Almost exclusively at the nozzle tip (gate interface)'],
            ['Key design feature', 'Z-puller / reverse-taper well to retain slug', 'Valve gate; insulated tip; tight zone control (±1 °C)'],
            ['Failure mode', 'Missing or undersized cold slug well', 'Out-of-tune HRTC zone, faulty heater band, leaky tip'],
            ['Mitigation lever', 'Geometry change (well, runner balance, gate location)', 'Process & controller tuning; valve-pin timing'],
          ],
        },
        { type: 'heading', level: 3, text: '2.4 Cold Slug Well — Design Guidelines (Cold Runner Only)' },
        {
          type: 'list',
          items: [
            'Location: directly opposite the sprue opening AND at the end of every long branch runner.',
            'Diameter: typically 8–10 mm, slightly larger than the main runner diameter.',
            'Depth: ~6 mm, or 1.5–2× the runner diameter.',
            'Taper: 0.5–1° draft for clean ejection.',
            'Z-puller pin or reverse taper at the bottom to positively pull the slug out with the runner.',
          ],
        },
        { type: 'heading', level: 3, text: '2.5 Machine & Auxiliary Factors' },
        {
          type: 'list',
          items: [
            'Worn screw or non-return valve → inconsistent melt temperature and pressure.',
            'Insufficient back pressure → non-homogeneous melt with cold pockets.',
            'Faulty thermolator or chiller → cold spots in the mold.',
            'Malfunctioning Hot Runner Temperature Controller (HRTC) → leading cause of cold slugs in hot runner tools.',
            'Sprue picker / robot — does not cause the defect, but reliably removing the runner prevents a fallen slug from re-entering the cavity on the next shot.',
          ],
        },
      ],
    },
    {
      id: 'diagnostics',
      title: '3. Diagnostic Techniques',
      blocks: [
        { type: 'heading', level: 3, text: '3.1 Visual Inspection' },
        {
          type: 'list',
          items: [
            'Surface irregularities near the gate — dull spots, wavy lines, comet tails.',
            'Dark streaks or discoloration radiating from the gate vestige.',
            'Small solid protrusions or "blobs" embedded at the gate area.',
            'Inconsistent gloss between gate-adjacent and far-field zones.',
          ],
        },
        { type: 'heading', level: 3, text: '3.2 Mold Flow Analysis (CAE)' },
        {
          type: 'list',
          items: [
            'Flow-front temperature: a sharp local drop indicates high cold-slug or hesitation risk.',
            'Tracer-particle studies: introduce virtual cold slugs and trace their path into the cavity.',
            'Runner balance analysis: identifies branches where melt cools prematurely.',
            'Validate design fixes (e.g., adding a cold slug well) before cutting steel.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Documented case — Moldflow validation',
          text:
            'In a published study, the melt-front temperature in the defect area was 178.3 °C. After adding a cold slug well to the runner, simulated bulk melt temperature in the same zone rose to 215.2 °C — a 36.9 °C improvement that eliminated the flow mark in production.',
        },
        { type: 'heading', level: 3, text: '3.3 In-Process Monitoring & NDT' },
        {
          type: 'list',
          items: [
            'In-line melt temperature sensors detect short-term thermal excursions.',
            'Cavity pressure sensors show a characteristic spike at fill start when a slug is forced through.',
            'Ultrasonic transducers can detect flow-front velocity changes and onset of solidification.',
            'IR sensors in the runner can trigger an alarm or eject suspect shots before slug entry.',
          ],
        },
      ],
    },
    {
      id: 'prevention',
      title: '4. Preventive Measures',
      blocks: [
        { type: 'heading', level: 3, text: '4.1 Material Selection & Preparation' },
        {
          type: 'list',
          items: [
            'Choose higher-MFI grades or flow-enhanced formulations for thin-wall or long-flow geometries.',
            'Use internal lubricants / flow promoters cautiously — verify mechanical impact.',
            'Dry resins to spec (e.g., PC: 120 °C × 4–6 h to ≤ 0.02% moisture). Wet resin worsens viscosity behavior at the tip.',
          ],
        },
        { type: 'heading', level: 3, text: '4.2 Process Optimization' },
        {
          type: 'table',
          caption: 'Parameter Adjustments — Cold Runner vs. Hot Runner',
          columns: ['Parameter', 'Cold Runner Mold', 'Hot Runner Mold'],
          rows: [
            ['Melt temperature', 'Move toward the upper end of the processing window.', 'Maintain a precise, flat profile across manifold and drops.'],
            ['Injection speed', 'Multi-stage: fast through the runner, decelerate into the cavity.', 'Multi-stage; emphasize consistent high speed to limit tip heat loss.'],
            ['Mold temperature', 'Increase 5–10 °C to slow melt-front cooling.', 'Ensure uniform mold temp; gate area must not be a heat sink for the tip.'],
            ['Back pressure', 'Increase (≈ 5–15 MPa) for melt homogeneity.', 'Same — improves melt quality entering the manifold.'],
            ['Nozzle / tip temp', 'Verify heater bands; nozzle tip should be hot.', 'Critical: tight zone control (±1 °C); insulation jackets help.'],
            ['Sprue break', 'Optimize retraction distance & timing to limit tip heat loss.', 'Less critical — focus shifts to valve-gate timing.'],
          ],
        },
        { type: 'heading', level: 3, text: '4.3 Mold Design Improvements' },
        {
          type: 'list',
          items: [
            'Cold runner: add or resize cold slug wells at sprue base and every long branch end; add Z-puller or reverse taper.',
            'Hot runner: select tip style (open, torpedo, valve-gated) appropriate for the resin; add insulation; verify gate-area cooling does not over-chill the tip.',
            'Optimize runner layout for balance and smooth transitions; eliminate sharp corners that cause stagnation.',
            'Reposition or resize the gate so any residual slug is not driven straight into a cosmetic surface.',
            'Equalize wall thickness in the gate region to avoid hesitation that compounds cold material.',
          ],
        },
        { type: 'heading', level: 3, text: '4.4 Machine Calibration' },
        {
          type: 'list',
          items: [
            'Routine inspection of screw, non-return valve, and barrel for wear.',
            'Calibrate HRTC zones; verify thermocouple integrity on every drop.',
            'Verify chiller / thermolator setpoints match measured mold-surface temperature.',
          ],
        },
      ],
    },
    {
      id: 'corrective-actions',
      title: '5. Corrective Actions',
      blocks: [
        { type: 'heading', level: 3, text: '5.1 In-Process Adjustments (try first, in order)' },
        {
          type: 'orderedList',
          items: [
            'Increase melt and nozzle temperature 5–10 °C (within material window).',
            'Increase initial injection velocity; use a multi-stage profile.',
            'Increase back pressure modestly to homogenize the melt.',
            'Increase mold temperature 5–10 °C (cold runner) or verify uniformity (hot runner).',
            'Optimize sprue-break distance/timing to reduce tip heat loss between shots.',
            'For hot runners: re-tune affected zone, verify tip thermocouple, inspect heater band.',
          ],
        },
        { type: 'heading', level: 3, text: '5.2 Tooling Changes (if process tuning fails)' },
        {
          type: 'list',
          items: [
            'Cold runner: add or enlarge cold slug well; add Z-puller; rebalance runner.',
            'Hot runner: change nozzle tip style, add insulation jacket, switch to a valve-gate where appropriate.',
            'Relocate or enlarge the gate to redirect any residual slug away from cosmetic surfaces.',
          ],
        },
        { type: 'heading', level: 3, text: '5.3 Post-Processing (cosmetic only)' },
        {
          type: 'list',
          items: [
            'Polishing or vapor-finishing to reduce visibility of dull spots.',
            'Painting, plating, or texturing to mask gate-area cosmetic defects.',
            'Annealing to relieve localized residual stress around the slug.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Post-processing is a mask, not a fix',
          text:
            'Cold slug marks indicate a real disturbance in melt continuity. For structural, medical, or safety-critical parts, eliminate the root cause — do not paint over it.',
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
            'Use the following decision flow when cold slug marks are detected. Step 1 is always visual: location of the mark drives whether you investigate the runner system or process parameters first.',
        },
        {
          type: 'image',
          src: coldSlugMarksFlowchart,
          alt: 'Cold Slug Marks troubleshooting decision flowchart: visual inspection branches into Runner System Check (cold/hot runner paths) and Process Parameter Check (melt temp, injection speed, back pressure, moisture), converging on a Problem Solved verification step.',
          figureNumber: 'Response Guide',
          caption: 'Cold Slug Marks — full response & decision flowchart.',
          lookFor: {
            title: 'How to use this flowchart on the floor',
            tone: 'info',
            items: [
              'Confirm the defect is a cold slug mark (silvery teardrop near the gate) before entering the tree — splay and jetting use different paths.',
              'Branch by runner system first: cold-runner issues usually trace to cold-slug well sizing; hot-runner issues trace to tip temperature and gate freeze.',
              'On the process branch, change one parameter at a time and re-run 5–10 shots before moving to the next node.',
              'If both branches return to start, escalate to mold maintenance — worn gate land or undersized cold-slug well.',
            ],
          },
        },
        { type: 'heading', level: 3, text: 'Step 1 — Visual Inspection: where are the marks?' },
        {
          type: 'list',
          items: [
            'Near gate / sprue → go to Runner System Check (Step 2A).',
            'Random / dispersed across part → go to Process Parameter Check (Step 2B).',
          ],
        },
        { type: 'heading', level: 3, text: 'Step 2A — Runner System Check' },
        {
          type: 'orderedList',
          items: [
            'Cold runner? → Is a cold slug well present and correctly sized? If NO → add or redesign the cold slug well. If YES → check runner layout balance/smoothness; optimize runner & gate design if needed.',
            'Hot runner? → Are nozzle and manifold temperature controllers accurate? If NO → calibrate or repair HRTC. If YES → check valve-gate timing and tip cleanliness; adjust or service.',
          ],
        },
        { type: 'heading', level: 3, text: 'Step 2B — Process Parameter Check' },
        {
          type: 'orderedList',
          items: [
            'Is melt / nozzle temperature too low? → Increase melt and nozzle temp by 5–10 °C.',
            'Is injection speed too slow? → Increase initial injection speed; use a multi-stage profile.',
            'Is back pressure insufficient? → Increase back pressure for melt homogeneity.',
            'Is the material wet? → Verify dryer and measured moisture content; dry to spec.',
          ],
        },
        { type: 'heading', level: 3, text: 'Step 3 — Verify' },
        {
          type: 'list',
          items: [
            'Run 10–20 shots after each change. Inspect first-fill area at the gate.',
            'If problem solved → document the change and lock in the process.',
            'If not solved → re-evaluate root cause; escalate to tooling / engineering for design review.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Common pitfalls',
          text:
            'Raising melt temperature blindly without checking the tip / HRTC zone. Treating a hot-runner tip problem with a cold-runner mindset (chasing cold slug well geometry that does not exist). Ignoring sprue-break timing as a heat-loss source. Trusting controller setpoints instead of measuring melt and mold temperatures directly.',
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
            'SPE / ANTEC consensus: design the cold slug well first — it is cheap insurance against a class of defects that is expensive to chase later.',
            'Engel / Arburg / Husky guidance: precise nozzle and manifold temperature control with calibrated, redundant thermocouples is the single highest-leverage control on hot-runner cold slug formation.',
            'Scientific molding (Bozzelli): use a multi-stage injection profile and verify melt quality with measured viscosity rather than assumed setpoints.',
            'Mold designers: include a cold slug well at every long runner branch end, not just at the sprue base.',
          ],
        },
      ],
    },
  ],
  references: refs,
};
