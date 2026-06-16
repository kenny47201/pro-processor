import type { DefectGuide } from './defectGuides';
import voidsCrossSection from '@/assets/voids-cross-section.jpg';
import voidsWallThickness from '@/assets/voids-wall-thickness.jpg';
import voidsFlowchart from '@/assets/voids-flowchart.jpg';
import voidsPressureProfile from '@/assets/voids-pressure-profile.jpg';
import voidsRunnerSchematic from '@/assets/voids-runner-schematic.jpg';
import voidsBossRibDesign from '@/assets/voids-boss-rib-design.jpg';

export const voidsGuide: DefectGuide = {
  slug: 'voids',
  title: 'Voids',
  summary:
    'Internal gas-filled or vacuum-filled cavities formed within thick cross-sections when volumetric shrinkage during cooling is not compensated by adequate pack pressure. Unlike sink marks, voids are fully enclosed by solid polymer with no surface opening.',
  category: 'Internal / Structural',
  severity: 'high',
  tags: [
    'voids', 'vacuum void', 'shrinkage', 'pack pressure', 'gate seal',
    'thick section', 'hot runner', 'cold runner', 'venting', 'moisture',
  ],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A void in injection molding is an internal, gas- or vacuum-filled cavity that forms within the body of a molded thermoplastic part — typically in thick cross-sections — as a result of volumetric shrinkage during cooling that is not compensated by adequate pack pressure or material feed. Unlike a sink mark (which is a surface depression), a void is an enclosed discontinuity entirely surrounded by solid polymer with no opening to the outer surface.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Voids vs. sink marks — same root cause',
          text:
            'Both originate from volumetric shrinkage. The determining factor is surface skin thickness. If the outer skin solidifies quickly (well-cooled walls, crystalline polymer), the skin resists collapse and a void forms internally. If the skin remains pliable, it collapses inward producing a sink mark. Voids and sinks are a continuum of the same defect mode.',
        },
        {
          type: 'image',
          src: voidsCrossSection,
          alt: 'Cross-section of a part showing internal void with shrinkage arrows',
          figureNumber: 'Figure 1-A',
          caption: 'Cross-sectional view: shrinkage forces pull the polymer away from the core, leaving an internal void.',
          lookFor: {
            title: 'Diagnostic clues in the cross-section',
            tone: 'info',
            items: [
              'Void shape: spherical = vacuum/shrinkage void; elongated or torn = trapped gas or moisture.',
              'Void location: centered in the thickest mass = pack/hold issue; near surface = gas/moisture origin.',
              'Wall around the void: stress-whitening rings indicate shrinkage tear, not gas entrapment.',
              'Multiple aligned voids along flow path = degassing of moisture; isolated single void = local thick section.',
            ],
          },
        },
        { type: 'heading', level: 3, text: '1.2 Detection' },
        {
          type: 'paragraph',
          text:
            'Externally a void-containing part may appear normal. Detection typically requires sectioning, transmitted light inspection (PP, PC, PMMA), X-ray, CT scan, or ultrasonic testing for opaque parts. Internally, voids appear as irregular, oblong, or spherical air pockets, sometimes with stress-whitening at their walls.',
        },
        {
          type: 'image',
          src: voidsWallThickness,
          alt: 'Wall thickness vs void formation diagram showing thin, medium, and thick sections',
          figureNumber: 'Figure 1-B',
          caption: 'Wall thickness vs void formation: thicker sections solidify their skin first and trap shrinkage as internal voids. Sections ≥ 8 mm carry the highest void risk.',
          lookFor: {
            title: 'What to flag during part review',
            tone: 'warning',
            items: [
              'Any nominal wall ≥ 4× the surrounding wall — coring out is preferable to thick sections.',
              'Bosses and rib intersections — the junction is effectively double-thickness and concentrates voids.',
              'Section transitions sharper than 3:1 — they freeze unevenly and trap shrinkage downstream.',
              'Mass concentrations far from the gate — the pressure path freezes off before pack reaches them.',
            ],
          },
        },
        { type: 'heading', level: 3, text: '1.3 Structural impact' },
        {
          type: 'table',
          caption: 'Functional consequences of internal voids',
          columns: ['Impact Category', 'Effect of Void', 'Severity'],
          rows: [
            ['Tensile strength', '10–40% reduction depending on void size and orientation', 'HIGH'],
            ['Fatigue life', 'Stress concentration at void boundary initiates crack propagation', 'HIGH'],
            ['Dimensional accuracy', 'Excessive local shrinkage causes warpage and dimensional drift', 'MEDIUM'],
            ['Pressure integrity', 'Critical failure mode for valves, connectors, manifolds', 'HIGH'],
            ['Aesthetics', 'Hidden in opaque parts; cloudy in transparent materials', 'LOW–MED'],
            ['Post-processing', 'Voids exposed during machining create surface pits & leak paths', 'MEDIUM'],
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
            'Volumetric shrinkage is a property of the resin family. Crystalline polymers (PP, PE, POM, PA, PBT) shrink more than amorphous (ABS, PC, PMMA, PS). Higher shrinkage materials in thick sections are inherently more void-prone. Moisture in hygroscopic resins (PC, PA, PBT, PET) compounds the problem by generating steam during plasticization that ends up trapped as voids or vapor blisters.',
        },
        {
          type: 'table',
          caption: 'Drying requirements for hygroscopic resins',
          columns: ['Resin', 'Max Moisture (ppm)', 'Drying Temp (°C)', 'Time (h)'],
          rows: [
            ['PC', '< 200', '120', '4'],
            ['PA6', '< 1000', '80', '4'],
            ['PA66', '< 1500', '80', '4'],
            ['PBT', '< 200', '120', '3–4'],
            ['PET', '< 50', '160', '4–6'],
            ['ABS', '< 1000', '80', '2–4'],
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Process parameters' },
        {
          type: 'table',
          caption: 'Process parameters and void formation',
          columns: ['Parameter', 'Too Low / Too Short', 'Too High / Too Long'],
          rows: [
            ['Pack pressure', 'Insufficient feed → voids in thick sections', 'Flash, over-packed gate area'],
            ['Pack/hold time', 'Gate not sealed → backflow → voids', 'Wasted cycle time'],
            ['Melt temperature', 'Higher viscosity → poor pack transmission', 'Degradation, gas, splay'],
            ['Mold temperature', 'Skin freezes too fast → traps shrinkage as void', 'Long cycle, possible sink instead of void'],
            ['Injection speed', 'Premature freezing in gate area', 'Shear heating, gas entrapment'],
            ['Cushion', 'No reservoir for pack', 'Material degradation from extra residence'],
          ],
        },
        {
          type: 'image',
          src: voidsPressureProfile,
          alt: 'Cavity pressure profile chart showing optimal hold vs low hold pressure void risk',
          figureNumber: 'Figure 2',
          caption: 'Cavity pressure profile during fill / pack-hold / cool. Sustained hold pressure (green) feeds shrinkage and prevents voids; insufficient hold (red dashed) lets pressure collapse before gate seal, dramatically raising void risk.',
        },
        {
          type: 'table',
          caption: 'Runner system effect on void formation',
          columns: ['Aspect', 'Cold Runner', 'Hot Runner'],
          rows: [
            ['Pressure available at gate', 'Reduced by runner pressure loss', 'Closer to barrel pressure'],
            ['Gate seal timing', 'Earlier — limits hold window', 'Controllable via tip temp / valve gate'],
            ['Cavity balance', 'Depends on geometric balance', 'Individual zone control'],
            ['Void risk in thick sections', 'Higher unless gate is sized generously', 'Lower if tip & manifold balanced'],
            ['Failure modes', 'Cold slug, undersized gate, runner freeze', 'Tip drift, valve-gate mistiming, hold-up degradation'],
          ],
        },
        {
          type: 'image',
          src: voidsRunnerSchematic,
          alt: 'Cold runner vs hot runner system schematic',
          figureNumber: 'Figure 3',
          caption: 'Cold runner systems lose pressure and heat through the solidifying runner — gate seals earlier and elevates void risk. Hot runner systems maintain melt at temperature up to the gate, transmitting pack pressure more reliably to the cavity.',
        },
        {
          type: 'list',
          items: [
            'Worn check ring or non-return valve allows backflow during pack — pressure does not reach the cavity.',
            'Inadequate clamp tonnage causes parting-line opening, dropping cavity pressure.',
            'Dryer underperformance (low dew point, short residence) leaves moisture in resin, generating steam voids.',
            'Cycle-time variability disturbs mold thermal balance, intermittently producing voids.',
          ],
        },
      ],
    },
    {
      id: 'diagnostics',
      title: '3. Diagnostic Techniques',
      blocks: [
        {
          type: 'table',
          caption: 'Detection methods by part type',
          columns: ['Method', 'Detection Capability', 'Best For'],
          rows: [
            ['Visual / sectioning', 'Direct visualization', 'Destructive QA, root-cause confirmation'],
            ['Transmitted light', 'Voids ≥ ~0.5 mm', 'Transparent / translucent (PC, PMMA, PP)'],
            ['X-ray / CT', 'Voids ≥ ~0.1 mm', 'Critical opaque parts (medical, automotive)'],
            ['Ultrasonic', 'Internal discontinuities', 'Thick-walled structural parts'],
            ['Part weight tracking', 'Indirect — weight drop signals unfed shrinkage', 'Production SPC monitoring'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Quick weight check',
          text:
            'A part that weighs significantly below nominal almost always has either flash, short shot, or unfed shrinkage (sink or void). Weighing every 10th shot is the cheapest void early-warning system you can run.',
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
            'Design for uniform wall thickness; core out bosses and ribs to eliminate thick masses.',
            'Locate gates at or near the thickest section so pack pressure can reach it before it freezes.',
            'Size gates generously enough to delay gate seal through the entire pack window.',
            'Profile injection: fast fill to gate, slow during pack for thick sections.',
            'Run a gate-seal study at startup — set hold time based on weight stabilization, not assumption.',
            'Dry hygroscopic resins to spec; verify dew point continuously.',
            'For hot-runner tools, individually balance zones and verify valve-gate timing.',
          ],
        },
        {
          type: 'image',
          src: voidsBossRibDesign,
          alt: 'Boss and rib design comparison: poor solid boss vs cored hollow boss with rib design rules',
          figureNumber: 'Figure 4',
          caption: 'Void-resistant geometry: a solid boss with wall thickness equal to the nominal wall (T:T = 1:1) traps shrinkage as a void. Cored-out hollow bosses keep the wall ≤ 0.6T. Ribs follow the same rule — width ≤ 0.6T, height ≤ 3× rib width.',
        },
      ],
    },
    {
      id: 'corrective',
      title: '5. Corrective Actions',
      blocks: [
        {
          type: 'orderedList',
          items: [
            'Increase pack pressure in 5–10% steps until void closes or flash appears.',
            'Extend hold time until part weight stabilizes (gate-seal endpoint).',
            'Raise melt temperature 5–10 °C to reduce viscosity and improve pack transmission — watch for degradation/splay.',
            'Raise mold temperature on the void side to delay skin formation and allow late feed.',
            'Slow the pack-phase injection rate so material feeds rather than packs against frozen skin.',
            'On hot-runner tools, raise tip temperature in the affected zone or extend valve-gate open time.',
            'If the void is in a thick boss, redesign the boss (core out, reduce wall) or gate directly into it.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Voids are not cosmetic',
          text:
            'Pressure-bearing or load-bearing parts with internal voids are structurally compromised. Treat voids as a functional defect — do not accept them for fluid manifolds, structural clips, or fatigue-loaded components.',
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: '6. Troubleshooting Flowchart',
      blocks: [
        {
          type: 'image',
          src: voidsFlowchart,
          alt: 'Void defect diagnostic flowchart',
          figureNumber: 'Figure 5',
          caption: 'Void diagnostic flowchart: classify location → cavity count → resin condition → pack/weight → runner type → geometry → check ring → vent.',
          lookFor: {
            title: 'How to walk this flowchart',
            tone: 'info',
            items: [
              'Section a representative part first — the void location dictates the entry branch (gas vs shrinkage vs degassing).',
              'If voids appear in only some cavities, jump straight to the cavity-balance and check-ring branches.',
              'Confirm resin moisture (dryer dewpoint, residence time) before changing pack — wet resin masks every other input.',
              'After each process change, re-section a fresh part — surface inspection alone will miss the result.',
            ],
          },
        },
      ],
    },
  ],
  references: [
    { id: 'R1', text: 'ISO 294 — Plastics: Injection moulding of test specimens.' },
    { id: 'R2', text: 'ASTM D3641 — Standard Practice for Injection Molding Test Specimens of Thermoplastic Molding Materials.' },
    { id: 'R3', text: 'SPE Guidelines — Defect Analysis & Process Control.' },
    { id: 'R4', text: 'Bozzelli, J. — Scientific Molding: Pack/Hold and Gate-Seal Studies.' },
    { id: 'R5', text: 'Husky Injection Molding Systems — Hot Runner Systems Technical Manual.' },
    { id: 'R6', text: 'Mold-Masters — Hot Runner Temperature Control Best Practices.' },
    { id: 'R7', text: 'Ley, N. — Practical Guide to Injection Moulding (gate design & hold pressure optimization).' },
    { id: 'R8', text: 'Technical Paper — Gate Seal-Off Time Study for Thick-Section PP Parts.' },
  ],
};
