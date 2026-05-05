import type { DefectGuide } from './defectGuides';
import wallThicknessDifferentialCooling from '@/assets/wall-thickness-differential-cooling.jpg';

export const wallThicknessGuide: DefectGuide = {
  slug: 'wall-thickness',
  title: 'Non-Uniform Wall Thickness',
  summary:
    'Substantial variation in material cross-section leading to differential cooling, internal stresses, sink marks, voids, warpage, and flow path pathologies. A design-driven defect requiring DfM intervention.',
  category: 'Dimensional & Structural',
  severity: 'high',
  tags: ['wall thickness', 'sink marks', 'warpage', 'DfM', 'ribs', 'bosses', 'cooling', 'hot runner', 'cold runner'],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Non-Uniform Wall Thickness (NUWT) is characterized by substantial variation in the material cross-section of a single injection molded component. DFM standards stipulate that the thickness of adjacent walls should maintain a ratio of no less than 40% to 60% relative to the nominal wall thickness.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Fundamental principle',
          text:
            'The root of all NUWT-related defects is differential cooling. Thicker sections retain thermal energy longer, delaying solidification and volumetric shrinkage compared to adjacent thinner sections. This time lag generates profound, unbalanced internal stresses.',
        },
        {
          type: 'image',
          src: wallThicknessDifferentialCooling,
          alt: 'Cross-section showing non-uniform wall thickness effects: thick sections with delayed cooling causing sink marks and voids, versus thin sections with premature solidification, plus the 0.6T rib design rule',
          figureNumber: 'Figure 1',
          caption: 'Differential cooling in non-uniform walls: Thick sections retain thermal energy longer, creating sink marks on the surface and internal voids. The 0.6T rule — rib/boss thickness ≤ 60% of adjacent wall — minimizes differential cooling and associated defects.',
        },
        { type: 'heading', level: 3, text: '1.1 Primary defects induced by NUWT' },
        {
          type: 'list',
          items: [
            'Sink marks and voids — molten core contracts after skin solidifies, pulling surface inward or creating internal vacuum.',
            'Warpage and deformation — anisotropic thermal gradients establish unbalanced stresses relieved after ejection.',
            'Air traps and burns — flow races around thin regions in thick surroundings, trapping and compressing air.',
            'Weld lines — flow fronts traveling different thickness paths converge at different temperatures, failing to fuse.',
          ],
        },
      ],
    },
    {
      id: 'root-causes',
      title: '2. Root Causes',
      blocks: [
        { type: 'heading', level: 3, text: '2.1 Material science factors' },
        {
          type: 'table',
          columns: ['Polymer Type', 'Example Materials', 'Shrinkage Behavior', 'NUWT Susceptibility'],
          rows: [
            ['Semi-Crystalline', 'PP, PA, PBT', 'High (1.5–4%+); anisotropic', 'Significant warpage'],
            ['Amorphous', 'ABS, PC', 'Lower; typically isotropic', 'Sink marks, voids (less structural warpage)'],
          ],
        },
        {
          type: 'paragraph',
          text:
            'Reinforcing fillers (glass/carbon fiber) reduce overall shrinkage but introduce anisotropic fiber orientation that can amplify warpage in NUWT parts.',
        },
        { type: 'heading', level: 3, text: '2.2 Part design factors' },
        {
          type: 'list',
          items: [
            'Design rule non-compliance: rib/boss thickness should be ≤ 60% of adjacent wall (T_rib ≤ 0.6 × T_wall).',
            'Rib height: generally ≤ 3× nominal wall thickness.',
            'Abrupt geometric transitions create stress concentration and differential cooling zones.',
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Runner system divergence' },
        {
          type: 'table',
          columns: ['Runner System', 'Primary Challenge', 'Consequence'],
          rows: [
            ['Cold Runner', 'Additional thermal drop through cold runner channels', 'Inconsistent melt temp reaching thick vs. thin sections'],
            ['Hot Runner', 'Uniform melt delivery but harder to control localized pressure', 'Differential packing in multi-thickness regions'],
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
            'Thickness analysis (CAD tools, CMM, or ultrasonic) — map actual wall variation across the part.',
            'Short-shot study — reveals flow path and hesitation zones caused by thickness transitions.',
            'Mold flow simulation — predicts fill pattern, weld line locations, and differential cooling.',
          ],
        },
        {
          type: 'table',
          caption: 'Troubleshooting decision tree',
          columns: ['Observed Defect', 'Cause Mechanism', 'First Action'],
          rows: [
            ['Sink marks opposite ribs/bosses', 'Rib too thick relative to wall', 'Redesign rib to ≤ 0.6T; core out boss'],
            ['Warpage after ejection', 'Differential cooling / fiber orientation', 'Add conformal cooling; adjust hold time'],
            ['Short shot in thin section', 'Flow races through thick before thin fills', 'Relocate gate nearer thin section'],
            ['Weld line in thin-to-thick transition', 'Split flow reconverges at different temps', 'Increase melt temp; optimize gate location'],
          ],
        },
      ],
    },
    {
      id: 'corrective-actions',
      title: '4. Corrective & Preventive Actions',
      blocks: [
        { type: 'heading', level: 3, text: '4.1 Design for Manufacturability (DfM)' },
        {
          type: 'list',
          items: [
            'Maintain wall thickness ratio ≥ 40–60% across the part.',
            'Use gradual transitions (3:1 taper ratio) between thick and thin sections.',
            'Core out thick sections — hollow bosses, cored ribs.',
            'Rib thickness ≤ 60% of adjacent wall; rib height ≤ 3× wall.',
          ],
        },
        { type: 'heading', level: 3, text: '4.2 Gating & runner optimization' },
        {
          type: 'list',
          items: [
            'Gate into the thickest section to ensure packing path to all areas.',
            'Use sequential valve gating in hot runner to control fill balance.',
            'Size runners to deliver uniform melt temperature.',
          ],
        },
        { type: 'heading', level: 3, text: '4.3 Process adjustments' },
        {
          type: 'list',
          items: [
            'Extended hold time and pressure to pack thick sections.',
            'Differential cooling — increase cooling in thick areas, reduce in thin.',
            'Multi-stage injection profiles to balance fill speed across varying thickness.',
          ],
        },
        { type: 'heading', level: 3, text: '4.4 Wall thickness ranges for common resins' },
        {
          type: 'table',
          columns: ['Polymer', 'Recommended Wall (mm)', 'Max Recommended (mm)'],
          rows: [
            ['ABS', '1.14–3.56', '3.56'],
            ['Polycarbonate (PC)', '1.02–3.81', '3.81'],
            ['Polypropylene (PP)', '0.64–3.81', '3.81'],
            ['Nylon (PA)', '0.76–2.92', '2.92'],
            ['Acetal (POM)', '0.76–3.05', '3.05'],
          ],
        },
      ],
    },
  ],
  references: [
    { id: 'R1', text: 'Protolabs. Injection Molding Wall Thickness Guidelines.' },
    { id: 'R2', text: 'Fictiv. Wall Thickness Recommendations for Injection Molding.' },
    { id: 'R3', text: 'Xcentric Mold & Engineering. Uniform Wall Thickness Design Guide.' },
    { id: 'R4', text: 'Autodesk Moldflow. Understanding Thickness Calculation.' },
  ],
};
