import type { DefectGuide } from './defectGuides';
import warpageFlowchart from '@/assets/warpage-flowchart.jpg';
import warpageTwisting from '@/assets/warpage-twisting.jpg';
import warpageCooling from '@/assets/warpage-cooling.jpg';

export const warpageGuide: DefectGuide = {
  slug: 'warpage',
  title: 'Warpage',
  summary:
    'Geometric deviation from the nominal part shape caused by differential residual stresses from non-uniform thermal gradients, anisotropic shrinkage, fiber orientation, and inhomogeneous density distribution. Manifests as bowing, twisting, saddle, or corner-lift after ejection.',
  category: 'Dimensional & Structural',
  severity: 'high',
  tags: [
    'warpage', 'shrinkage', 'cooling', 'fiber orientation', 'pack/hold',
    'mold temperature', 'hot runner', 'cold runner', 'CMM', 'differential cooling',
  ],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Warpage (warping, warp) is a geometric deviation from the intended nominal shape of a molded part caused by differential internal residual stresses induced during the molding cycle. These stresses arise from non-uniform thermal gradients, anisotropic material shrinkage, fiber/filler orientation, and inhomogeneous density distribution during solidification. Warpage manifests after ejection as constrained residual stresses are released and the part reaches thermal equilibrium.',
        },
        {
          type: 'paragraph',
          text:
            'The driving mechanism is thermomechanical: as polymer melt fills the cavity, undergoes phase change, and cools, different regions experience different shrinkage rates. If those gradients are not balanced, the resulting net moment causes the part to deflect out of its intended plane.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Standards reference',
          text:
            'ASTM D955 defines mold shrinkage as the difference in dimensions between the cavity and the molded part, expressed as a fraction of the cavity dimension. Differential shrinkage — variation in this value across the part — is the root mechanical cause of warpage.',
        },
        { type: 'heading', level: 3, text: '1.2 Common manifestations' },
        {
          type: 'table',
          caption: 'Warpage manifestations and primary causes',
          columns: ['Warp Type', 'Visual Description', 'Primary Cause', 'Typical Materials'],
          rows: [
            ['Bowing / Banana', 'Curves along primary length axis like a bow', 'Asymmetric mold temperatures (cavity vs. core)', 'Flat planar parts: PP, ABS, PC sheets'],
            ['Saddle / Dome', 'Curves in two axes (convex or concave)', 'Biaxial differential shrinkage', 'Wide thin panels; automotive door trim'],
            ['Twisting / Torsional', 'Opposing corners displaced in opposite directions', 'Asymmetric fiber/filler orientation', 'GF-filled PA, PPS, LCP parts'],
            ['Corner Lifting / Edge Curl', 'Flat part with corners or edges lifting', 'Residual stress concentration at corners', 'Thin-walled boxes, trays, covers'],
            ['Sink-Induced Warp', 'Local depression coupled with adjacent lift', 'Thick bosses or ribs solidifying late', 'Parts with non-uniform geometry'],
          ],
        },
        {
          type: 'image',
          src: warpageTwisting,
          alt: 'Twisting / torsional warp deflection contour map showing high-stress zone',
          figureNumber: 'Figure 1',
          caption: 'Twisting/torsional warp deflection map; the high-stress zone correlates with anisotropic fiber orientation and uneven cooling.',
          lookFor: {
            title: 'What to look for on the contour map',
            tone: 'info',
            items: [
              'Diagonal deflection pattern across the part — classic signature of fiber orientation, not pack pressure.',
              'Hot-spot color (red/orange) clustered on one face — indicates one mold half is running hotter than the other.',
              'Symmetric warp around the gate — points to flow-induced orientation; asymmetric warp points to cooling imbalance.',
              'Compare the high-stress zone against the gate location — re-gating can rotate the orientation pattern.',
            ],
          },
        },
        { type: 'heading', level: 3, text: '1.3 Economic impact' },
        {
          type: 'list',
          items: [
            'Scrap and rework: parts that cannot be corrected are scrapped; others require fixture annealing, mechanical straightening, or machining.',
            'Production downtime: parameter changes, mold modifications, and trial runs interrupt schedules.',
            'Downstream assembly failures at OEM level — particularly in automotive, medical, and consumer electronics.',
            'Tool modification costs: corrective mold work (gates, cooling) can run $5,000–$50,000+ per occurrence.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Industry insight',
          text:
            'Plastics Technology Magazine (2022): ~18% of injection molding scrap events are attributable to dimensional non-conformance including warpage, with average correction costs of $12,000–$45,000 per mold tool.',
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
          caption: 'Polymer mold shrinkage ranges & warp susceptibility',
          columns: ['Material', 'Typical Shrinkage (%)', 'Warp Susceptibility', 'Notes'],
          rows: [
            ['PP (unfilled)', '1.0 – 2.5', 'High', 'Crystalline; very direction-sensitive'],
            ['HDPE', '1.5 – 4.0', 'Very high', 'Highest crystalline shrinkage'],
            ['PA6 / PA66', '0.8 – 1.5', 'High (with moisture)', 'Hygroscopic; condition before mold'],
            ['ABS', '0.5 – 0.7', 'Moderate', 'Amorphous, more forgiving'],
            ['PC', '0.6 – 0.8', 'Moderate', 'Stress-sensitive; control melt temp'],
            ['PC/ABS', '0.5 – 0.7', 'Moderate', 'Good dimensional stability'],
            ['PBT GF30', '0.2 – 0.4', 'High anisotropy', 'GF reduces in-flow shrink, raises cross-flow'],
          ],
        },
        {
          type: 'paragraph',
          text:
            'Glass fibers reduce shrinkage in the flow direction but not perpendicular to it; the resulting anisotropy is the dominant cause of twisting in fiber-filled parts. Mineral fillers reduce total shrinkage and improve dimensional stability. Regrind, pigments, and moisture all shift actual shrinkage from the data-sheet value.',
        },
        { type: 'heading', level: 3, text: '2.2 Process parameters — differential cooling' },
        {
          type: 'image',
          src: warpageCooling,
          alt: 'Differential cooling diagram — cavity vs core temperature mismatch causing warp',
          figureNumber: 'Figure 2',
          caption: 'Differential cooling between cavity and core sides of the mold is the single largest process driver of warp.',
          lookFor: {
            title: 'Diagnostic checks driven by this diagram',
            tone: 'warning',
            items: [
              'Measure cavity vs core surface temperature with a contact pyrometer — a delta > 10 °C will warp most semi-crystalline resins.',
              'Concave side of the warp curls toward the hotter mold half — use this to identify which side needs cooler water.',
              'Check water-line flow rate and inlet/outlet ΔT separately on each half; turbulent flow (Re > 4000) is required.',
              'Verify cooling-line layout matches part geometry — long unsupported runs above thick sections are common offenders.',
            ],
          },
        },
        {
          type: 'table',
          caption: 'Process parameter impact on warpage',
          columns: ['Parameter', 'Effect on Warp', 'Recommended Action'],
          rows: [
            ['Mold temperature differential (cavity vs core)', 'Primary driver of bowing', 'Hold ±2 °C across the cavity face'],
            ['Pack / hold pressure', 'Insufficient = differential shrinkage', 'Pack until gate freeze; verify with gate-seal study'],
            ['Hold time', 'Too short locks in differential shrinkage', 'Establish via gate-seal study, not assumption'],
            ['Cooling time', 'Too short = post-ejection relaxation warp', 'Add until in-mold dimension stabilizes'],
            ['Injection speed', 'High shear induces fiber orientation', 'Profile speed; slow at gates for fiber-filled'],
            ['Melt temperature', 'Too high increases volumetric shrinkage', 'Stay within resin window; verify at purge'],
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Cold runner vs hot runner' },
        {
          type: 'table',
          caption: 'Runner system effects on warp control',
          columns: ['Aspect', 'Cold Runner', 'Hot Runner'],
          rows: [
            ['Pressure transmission to cavity', 'Reduced by runner & gate pressure loss', 'Maintained close to cavity'],
            ['Cavity-to-cavity balance', 'Geometric balance only', 'Individual zone control possible'],
            ['Gate freeze risk', 'Higher (cold gate)', 'Lower (heated tip / valve gate)'],
            ['Pack repeatability', 'Subject to cold-slug variation', 'More consistent if zones balanced'],
            ['Failure modes that drive warp', 'Premature gate freeze, runner imbalance', 'Tip drift, manifold imbalance, valve-gate timing'],
          ],
        },
        { type: 'heading', level: 3, text: '2.4 Wall thickness & geometry' },
        {
          type: 'paragraph',
          text:
            'Wall thickness variation drives local cooling-rate differences. Thick intersections continue contracting after thin skins are dimensionally fixed — the physics behind shrinkage gradients, sinks, and the warp couples that come with them. Keep walls uniform; if thick sections are unavoidable, gate them directly or core them out.',
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
            'Quantify the warp on a CMM, surface plate with dial indicator, laser scanner, or structured-light scanner. Record the magnitude and the geometric form (bow, twist, saddle, corner-lift).',
            'Determine if warp is consistent shot-to-shot. Random variation points to material lot, screw wear, or chiller/thermolator instability — not the steel.',
            'Identify whether the tool is hot or cold runner, and follow the runner-specific checks.',
            'Validate cooling: measure mold steel temperature on cavity and core sides with surface pyrometer or embedded TCs; verify chiller actuals.',
            'Validate material: verify shrinkage spec, dryness, lot, and any regrind percentage.',
            'If the above are stable, evaluate mold design: wall transitions, gate location, vent restriction, and cooling channel layout.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'CAE tip',
          text:
            'Moldflow / Moldex3D warp analysis is most useful when seeded with measured material PVT and actual process inputs (real melt temp, real mold temp). Garbage-in, garbage-out applies — simulation alone will not find a chiller fault.',
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
            'Design for uniform wall thickness; radius all transitions; core out heavy sections and bosses.',
            'Locate gates so flow length to all extremities is roughly equal; for fiber-filled parts, orient gates so fibers align with the dominant load.',
            'Specify cooling channels for ±2 °C uniformity across cavity face; consider conformal cooling for problem cores.',
            'Establish a gate-seal study and set hold time accordingly — never guess.',
            'For hot-runner tools, individually balance zone temperatures and verify with short shots.',
            'Dry hygroscopic resins to spec; verify dryer dew point, not just setpoint.',
            'Limit regrind percentage in dimensional-critical parts; segregate dryers for virgin and regrind.',
          ],
        },
      ],
    },
    {
      id: 'corrective',
      title: '5. Corrective Actions',
      blocks: [
        { type: 'heading', level: 3, text: '5.1 In-process adjustments (try first, low cost)' },
        {
          type: 'orderedList',
          items: [
            'Increase hold pressure in 5–10% increments and re-measure; stop when warp stabilizes or flash appears.',
            'Extend hold time until part weight stops increasing — this confirms gate is sealing fully.',
            'Balance mold-half temperatures: raise the colder side or lower the hotter side until ΔT < 5 °C.',
            'Extend cooling time 10–20% to reduce post-ejection relaxation warp.',
            'On hot-runner tools, rebalance zone setpoints; on cold runners, check sprue/runner for cold-slug issues.',
            'For fiber-filled resins, slow injection to reduce shear-induced fiber orientation.',
          ],
        },
        { type: 'heading', level: 3, text: '5.2 Tooling actions (when process is exhausted)' },
        {
          type: 'list',
          items: [
            'Add or relocate cooling channels to balance heat removal between cavity and core.',
            'Add or relocate gates to equalize flow length and pack path.',
            'Open vents at last-fill regions to remove pack pressure interference from trapped air.',
            'For chronic warp, consider fixture annealing as a downstream secondary operation.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Validate after every change',
          text:
            'Re-CMM the part after each corrective action. Do not stack changes — change one variable at a time so the cause-and-effect is unambiguous.',
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: '6. Troubleshooting Flowchart',
      blocks: [
        {
          type: 'image',
          src: warpageFlowchart,
          alt: 'Warpage troubleshooting flowchart for injection molding',
          caption: 'Figure 3 — Warpage troubleshooting flowchart: quantify → check shot-to-shot consistency → branch by runner system → cooling → material → mold design → validate.',
        },
        {
          type: 'table',
          caption: 'Step-by-step troubleshooting summary',
          columns: ['Step', 'Action', 'Validation'],
          rows: [
            ['1', 'Quantify warp magnitude and pattern', 'CMM or fixture report'],
            ['2', 'Confirm shot-to-shot consistency', 'Measure 30 consecutive shots'],
            ['3', 'Branch by runner type and run runner checks', 'Document tip / sprue condition'],
            ['4', 'Evaluate cooling balance and chiller performance', 'Surface pyrometer, ±2 °C target'],
            ['5', 'Evaluate material shrinkage, moisture, regrind', 'Moisture meter, lot trace'],
            ['6', 'Evaluate mold design (wall, vent, gate)', 'Re-CMM after tooling change'],
          ],
        },
      ],
    },
  ],
  references: [
    { id: 'R1', text: 'ASTM D955 — Standard Test Method of Measuring Shrinkage from Mold Dimensions of Thermoplastics.' },
    { id: 'R2', text: 'ISO 294-4 — Plastics: Injection moulding of test specimens — Part 4: Determination of moulding shrinkage.' },
    { id: 'R3', text: 'Plastics Technology Magazine, 2022 — Annual Scrap & Defect Survey.' },
    { id: 'R4', text: 'Bozzelli, J. — Scientific Molding & Injection Molding Process Optimization.' },
    { id: 'R5', text: 'RJG Inc. — Tolerances, Shrinkage, and Process Strategies (technical articles).' },
    { id: 'R6', text: 'Autodesk Moldflow Help — Warpage analysis and shrinkage prediction methodology.' },
    { id: 'R7', text: 'Husky Injection Molding Systems — Hot Runner System Balance Guidance.' },
    { id: 'R8', text: 'Mold-Masters — Hot Runner Temperature Control Best Practices.' },
    { id: 'R9', text: 'Zhao et al. — Recent progress in minimizing warpage and shrinkage of injection moulded parts (2022, open-access review).' },
  ],
};
