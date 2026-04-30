import type { DefectGuide } from './defectGuides';
import shrinkageTimeline from '@/assets/shrinkage-timeline.jpg';
import shrinkageFlowchart from '@/assets/shrinkage-flowchart.jpg';

export const shrinkageGuide: DefectGuide = {
  slug: 'shrinkage',
  title: 'Shrinkage',
  summary:
    'Reduction in linear dimension between mold cavity and molded part after processing. Includes immediate moulding shrinkage, post-moulding shrinkage, and anisotropic shrinkage between flow and transverse directions. Drives dimensional drift, sinks, voids, and warp.',
  category: 'Dimensional',
  severity: 'high',
  tags: [
    'shrinkage', 'dimensional', 'pvT', 'pack/hold', 'gate freeze',
    'anisotropy', 'fiber orientation', 'cooling', 'hot runner', 'cold runner',
  ],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Shrinkage in injection molding is the dimensional contraction that occurs as the polymer changes from melt to solid and continues to relax after ejection. Technically, it is the difference between the mold cavity dimension and the molded part dimension at a specified time and conditioning state, usually reported as a percentage in the flow direction and normal to flow.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Standards',
          text:
            'ASTM D955 measures shrinkage from mold dimensions under specified conditions and 24 h / 48 h readings. ISO 294-4 determines moulding and post-moulding shrinkage on standard test specimens and explicitly recognizes directional dependence relative to melt flow.',
        },
        {
          type: 'image',
          src: shrinkageTimeline,
          alt: 'Moulding and post-moulding shrinkage timeline chart',
          figureNumber: 'Figure 1',
          caption: 'Shrinkage develops during filling/packing/cooling and continues after ejection as residual stress relaxes and the polymer approaches equilibrium.',
          lookFor: {
            title: 'What to look for on the timeline',
            tone: 'info',
            items: [
              'Steep drop during packing — indicates whether hold pressure is feeding the cavity or losing seal at the gate.',
              'Slope between demould and 24 h — large continued shrinkage points to residual stress or insufficient cooling time.',
              'Divergence between flow and cross-flow directions — anisotropy from fiber orientation; expect the larger value parallel to flow for unfilled resins, perpendicular for fiber-filled.',
              'Late drift past 48 h — moisture conditioning of hygroscopic resins (PA, PC) rather than true shrinkage.',
            ],
          },
        },
        { type: 'heading', level: 3, text: '1.2 How shrinkage manifests' },
        {
          type: 'list',
          items: [
            'Visually: dimensional undersize, hole-to-hole mismatch, bow/warp when shrinkage is non-uniform, sink marks where local mass shrinks but is not fed, assembly interference outside tolerance.',
            'Structurally: density gradients, frozen-in orientation, residual stress, anisotropic contraction in filled resins, local volumetric deficits in thick sections that progress into voids or sinks.',
            'Metrologically: a part can pass at demould and fail at 24 h or 48 h. For hygroscopic materials, post-mold moisture uptake further complicates the dimensional trend.',
          ],
        },
        {
          type: 'table',
          caption: 'Typical linear shrinkage by material family',
          columns: ['Material', 'Shrinkage Range (%)', 'Notes'],
          rows: [
            ['PC/ABS', '0.5 – 0.7', 'Amorphous, good dimensional stability'],
            ['ABS', '0.5 – 0.7', 'Sensitive to hold pressure and gate freeze'],
            ['PC', '0.6 – 0.8', 'Stress-sensitive; control melt temp & residence'],
            ['PBT GF30', '0.2 – 0.4', 'Lower in flow, higher anisotropy'],
            ['PA6', '0.8 – 1.5', 'Hygroscopic; condition before measuring'],
            ['PP', '1.0 – 2.5', 'Crystalline, high global shrink'],
            ['HDPE', '1.5 – 4.0', 'Highest crystalline shrink — major sink risk'],
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
            'pvT behavior is the primary material-level driver. As pressure and temperature fall, specific volume changes; the integral of that change is the part\'s volumetric shrinkage. Crystalline materials shrink more than amorphous. Glass fiber reduces in-flow shrinkage and creates anisotropy that translates into differential shrinkage and warp. Mineral fillers usually lower total shrinkage and improve dimensional stability.',
        },
        {
          type: 'table',
          caption: 'Material family shrinkage profile',
          columns: ['Family', 'Behavior', 'Risk Profile', 'Process Note'],
          rows: [
            ['PP / PE', 'Higher crystalline contraction', 'High global shrink, high sink risk in thick sections', 'Needs robust packing; mold temp affects crystallinity'],
            ['ABS', 'Lower amorphous contraction', 'Moderate, good dimensional stability', 'Sensitive to hold pressure & gate freeze'],
            ['PC', 'Low–moderate amorphous', 'Lower shrink; stress sensitivity dominates', 'Control melt temp & residence to avoid degradation'],
            ['PA (unfilled)', 'Moderate–high + moisture effects', 'Time-dependent dimensional drift', 'Drying & post-mold conditioning critical'],
            ['GF-filled grades', 'Lower in-flow, higher anisotropy', 'Directional dimensional drift', 'Orientation control & balanced flow critical'],
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Process parameters' },
        {
          type: 'paragraph',
          text:
            'Pack pressure, hold time, melt temperature, and mold temperature are the primary process levers. Insufficient pack or premature gate freeze locks in additional shrinkage. Higher mold temperature in crystalline materials may increase final shrinkage but reduces residual stress. Multi-stage injection (velocity-controlled fill + intentional pack profile) gives better repeatability than single-stage pressure.',
        },
        { type: 'heading', level: 3, text: '2.3 Gate design, size, and location' },
        {
          type: 'list',
          items: [
            'Gate size governs pressure drop and gate freeze time. Undersized gates make the machine look "fully packed" while the cavity has already been isolated from the pressure source.',
            'Gate location governs which features feed last. Thick sections far from the gate are classic shrinkage and sink locations.',
            'Hot-runner valve gates can dramatically improve dimensional control if they stay open long enough for shrinkage flow. A valve gate that closes early behaves like a premature freeze.',
          ],
        },
        { type: 'heading', level: 3, text: '2.4 Cold runner vs hot runner' },
        {
          type: 'table',
          caption: 'Relative shrinkage-control implications',
          columns: ['Category', 'Cold Runner', 'Hot Runner'],
          rows: [
            ['Runner heat loss', 'High', 'Low'],
            ['Gate freeze risk', 'High (limits pack window)', 'Low (controllable)'],
            ['Pack pressure transmission', 'Reduced', 'Maintained'],
            ['Cavity-to-cavity repeatability', 'Geometric balance only', 'Per-zone control'],
            ['Failure modes', 'Cold slug, runner imbalance, undersized gate', 'Tip drift, manifold imbalance, valve timing'],
          ],
        },
        { type: 'heading', level: 3, text: '2.5 Mold design & geometry' },
        {
          type: 'paragraph',
          text:
            'Wall thickness variation drives local cooling-rate differences. Thick intersections continue to contract after thin skins are dimensionally fixed — the physics behind shrinkage gradients, sink marks, and voids. Runner and gate flaws alter pressure history; non-geometrically-balanced multi-cavity layouts produce uneven cavity pressure and uneven shrinkage. Venting is usually secondary for shrinkage but becomes primary when trapped air resists late feed.',
        },
        { type: 'heading', level: 3, text: '2.6 Machine factors' },
        {
          type: 'paragraph',
          text:
            'Screw and check-ring wear allow inconsistent shot transfer and unstable pack — directly translating to size variation. Back pressure affects melt homogeneity. Insufficient clamp causes parting-line opening or flash, altering effective cavity volume and apparent shrinkage.',
        },
      ],
    },
    {
      id: 'diagnostics',
      title: '3. Diagnostic Techniques',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Always pair visual inspection with dimensional metrology and a timestamp: at demould, 1 h, 24 h, and 48 h where practical. CMM or optical scanning should be aligned to functional datums, not cosmetic surfaces. Measure both flow and cross-flow directions where anisotropy is expected.',
        },
        {
          type: 'list',
          items: [
            'Microscopy and microtome sectioning — correlate local sink/void regions with wall-thickness intersections or fiber orientation layers.',
            'Cavity pressure transducers — quantify actual pack transmission and gate freeze.',
            'Gate-seal study by part weight — increase hold time in steps until weight stops changing.',
            'Moldflow / Moldex3D shrinkage and warp simulation seeded with measured pvT and actual process inputs.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Field note',
          text:
            'When a part gets shorter as material viscosity rises, you do not automatically have a mold problem — you may have a packing-window problem. First prove the gate is still open long enough to feed shrinkage.',
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
            'Separate fill, pack, and hold conceptually. Establish a viscosity-robust fill, then set hold time based on actual gate-freeze evidence rather than assumption.',
            'For cold runners, protect the pack window: limit runner pressure loss, avoid undersized gates, ensure gate stays open long enough to feed contraction.',
            'For hot runners, use individual zone control and verify thermal balance — do not assume the manifold is inherently balanced.',
            'Keep wall thickness uniform where tolerances are tight. If thick sections are unavoidable, gate them directly or give them a reliable feed path.',
            'Balance multi-cavity layouts geometrically AND thermally. Equal steel does not guarantee equal shrinkage.',
            'Design cooling for uniform steel temperature and predictable heat removal — conformal cooling often reduces shrinkage spread better than brute-force pressure increases.',
          ],
        },
      ],
    },
    {
      id: 'corrective',
      title: '5. Corrective Actions',
      blocks: [
        {
          type: 'table',
          caption: 'Symptom → corrective action',
          columns: ['Symptom', 'First Action', 'If No Improvement'],
          rows: [
            ['Global undersize, stable shot-to-shot', 'Steel-safe mold compensation; recut steel to add stock', 'Review material lot & shrinkage spec'],
            ['Global undersize, unstable shot-to-shot', 'Stabilize cushion, melt temp, viscosity', 'Replace check ring; verify barrel temps'],
            ['Local sink in thick section', 'Increase pack pressure & time; raise mold temp on the side', 'Redesign rib/boss; gate closer to thick area'],
            ['Anisotropic distortion in GF parts', 'Slow injection to reduce fiber orientation', 'Relocate gate to align fibers with load direction'],
            ['Drift between 24 h and 48 h', 'Anneal/condition parts before final measurement', 'Switch to lower-shrink grade or add filler'],
          ],
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: '6. Troubleshooting Flowchart',
      blocks: [
        {
          type: 'image',
          src: shrinkageFlowchart,
          alt: 'Shrinkage troubleshooting flowchart',
          caption: 'Figure 2 — Decision tree: classify global undersize vs local sink/void, then branch by stability and geometry.',
        },
      ],
    },
  ],
  references: [
    { id: 'R1', text: 'ASTM D955 — Standard Test Method of Measuring Shrinkage from Mold Dimensions of Thermoplastics.' },
    { id: 'R2', text: 'ISO 294-4 — Plastics: Injection moulding of test specimens — Determination of moulding and post-moulding shrinkage.' },
    { id: 'R3', text: 'BASF — Processing Injection Moulding (Elastollan); Ultrason® Injection Molding Brochure.' },
    { id: 'R4', text: 'BASF — Injection-Molding Problems in Engineering Thermoplastics.' },
    { id: 'R5', text: 'RJG — Tolerances, Shrinkage, and Process Strategies; Cavity Pressure technical articles.' },
    { id: 'R6', text: 'Autodesk Moldflow Help — Shrinkage prediction method for 3D models.' },
    { id: 'R7', text: 'Moldex3D — Achieve Plastic Part Dimension Accuracy through 3D Volume Shrinkage Compensation.' },
    { id: 'R8', text: 'Husky — Hot Runners Play a Key Role in Optimizing System Balance.' },
    { id: 'R9', text: 'Mold-Masters — The Importance of Precise Hot Runner Temperature Control.' },
    { id: 'R10', text: 'Zhao et al. — Recent progress in minimizing the warpage and shrinkage of injection moulded parts (open-access review, 2022).' },
    { id: 'R11', text: 'ASME Journal of Manufacturing Science and Engineering — In-Situ Shrinkage Sensor for Injection Molding.' },
  ],
};
