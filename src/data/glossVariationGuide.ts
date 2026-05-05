import type { DefectGuide } from './defectGuides';

export const glossVariationGuide: DefectGuide = {
  slug: 'gloss-variation',
  title: 'Gloss Variation',
  summary:
    'Non-uniform surface gloss caused by imbalances in mold surface replication vs. polymer shrinkage/stiffening. Manifests as patchy, dull, or streaky areas on high-aesthetic parts.',
  category: 'Cosmetic',
  severity: 'medium',
  tags: ['surface finish', 'gloss', 'mold temperature', 'fountain flow', 'replication', 'aesthetic', 'hot runner', 'cold runner'],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Gloss describes the optical response of a molded plastic surface to incident light. High-gloss finishes are characterized by specular reflection; low-gloss finishes cause light to diffuse. Gloss uniformity is a measurable quality attribute that directly influences customer acceptance in consumer electronics, automotive interiors, and medical devices.',
        },
        { type: 'heading', level: 3, text: '1.1 Competing mechanisms' },
        {
          type: 'list',
          items: [
            'Mold surface replication — high cavity pressure forces the melt skin into intimate contact with the polished mold wall, transferring micro-topography.',
            'Polymer shrinkage & viscoelastic stiffening — as the polymer cools, volumetric shrinkage introduces microscopic surface irregularities that scatter light.',
          ],
        },
        { type: 'heading', level: 3, text: '1.2 Gloss Transition Defect (GTD)' },
        {
          type: 'paragraph',
          text:
            'A visually recognizable transition line between low- and high-gloss areas, typically perpendicular to the flow direction. GTD is a kinetic defect tied to heat transfer rate and the restricted duration for high melt pressure to counteract viscoelastic stiffening.',
        },
      ],
    },
    {
      id: 'root-causes',
      title: '2. Root Causes',
      blocks: [
        { type: 'heading', level: 3, text: '2.1 Processing parameter imbalance' },
        {
          type: 'table',
          caption: 'Influence of primary process parameters on surface gloss',
          columns: ['Parameter', 'Effect on Gloss', 'Mechanism'],
          rows: [
            ['Mold temperature ↑', 'Increases gloss', 'Slows solidification, allows longer replication time'],
            ['Melt temperature ↑', 'Increases gloss', 'Lowers viscosity, improves surface conformity'],
            ['Injection speed ↑', 'Increases gloss', 'Keeps surface hot and pliable during mold contact'],
            ['Packing pressure ↑', 'Moderate increase', 'Compensates shrinkage but skin may already be set'],
            ['Cooling rate ↑', 'Decreases gloss', 'Premature solidification prevents replication'],
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Material & rheological factors' },
        {
          type: 'list',
          items: [
            'Amorphous polymers (PC, ABS) — soften gradually, more stable gloss process window.',
            'Semi-crystalline polymers (PP, Nylon) — sharper melting point, non-uniform crystallization creates internal light scattering.',
            'Fillers (glass fiber, talc) — increase surface roughness and reduce gloss. Higher shear rates needed to overcome increased viscosity.',
            'Moisture contamination — causes splay and gas defects that disrupt smooth surface replication.',
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Mold design factors' },
        {
          type: 'list',
          items: [
            'Non-uniform cooling channel layout → localized temperature differences → patchy gloss.',
            'Surface finish quality — polish level directly determines achievable gloss ceiling.',
            'Gate location — flow hesitation and jetting near gates create gloss transition lines.',
            'Wall thickness variation — differential cooling creates inconsistent replication.',
          ],
        },
      ],
    },
    {
      id: 'diagnostics',
      title: '3. Diagnostic Techniques',
      blocks: [
        {
          type: 'list',
          items: [
            'Gloss meter measurement (ASTM D2457) at 20°, 60°, and 85° angles — quantifies variation across part surface.',
            'Spectrophotometry (SPIN vs. SPEX) — separates surface texture effects from color shift.',
            'Mold surface temperature mapping — identifies cooling imbalances.',
            'Short-shot study — reveals flow front progression and potential hesitation zones.',
          ],
        },
        {
          type: 'table',
          caption: 'Troubleshooting matrix for common gloss defects',
          columns: ['Observation', 'Probable Cause', 'First Action'],
          rows: [
            ['Uniform dull finish across part', 'Mold temperature too low', 'Increase mold temperature 10–20°F'],
            ['Gloss transition line perpendicular to flow', 'Flow hesitation / GTD', 'Increase injection speed; raise melt temp'],
            ['Patchy gloss near gate', 'Jetting or excessive shear', 'Slow initial injection speed; widen gate'],
            ['Dull streaks aligned with flow', 'Filler orientation or poor homogenization', 'Increase back pressure; verify melt uniformity'],
          ],
        },
      ],
    },
    {
      id: 'corrective-actions',
      title: '4. Corrective & Preventive Actions',
      blocks: [
        { type: 'heading', level: 3, text: '4.1 Thermal adjustments' },
        {
          type: 'list',
          items: [
            'Increase mold temperature — most significant single factor for gloss improvement.',
            'Ensure uniform cooling channel flow rates and temperatures.',
            'Increase melt temperature within material window.',
          ],
        },
        { type: 'heading', level: 3, text: '4.2 Flow & pressure optimization' },
        {
          type: 'list',
          items: [
            'Increase injection speed to keep flow front temperature high.',
            'Optimize V→P switchover to maintain pressure during early packing.',
            'Increase pack pressure (secondary effect after thermal optimization).',
          ],
        },
        { type: 'heading', level: 3, text: '4.3 Mold design improvements' },
        {
          type: 'list',
          items: [
            'Re-design cooling circuits for uniform heat extraction.',
            'Increase mold polish level (SPI A-1 for optical gloss).',
            'Gate relocation to minimize hesitation and jetting.',
          ],
        },
      ],
    },
  ],
  references: [
    { id: 'R1', text: 'ASTM D2457. Standard Test Method for Specular Gloss of Plastic Films and Solid Plastics.' },
    { id: 'R2', text: 'Beaumont Technologies. Surface Finish and Gloss in Injection Molding.' },
    { id: 'R3', text: 'Autodesk Moldflow. Gloss and Surface Quality Analysis.' },
  ],
};
