import type { DefectGuide } from './defectGuides';
import fishEyeGelClassification from '@/assets/fish-eye-gel-classification.jpg';

export const fishEyeGuide: DefectGuide = {
  slug: 'fish-eye',
  title: 'Fish Eye Defects',
  summary:
    'Surface blemishes from unmelted or insufficiently plasticized material carried into the mold cavity. Appear as small circular craters or gel-like spots, especially in transparent or thin-walled parts.',
  category: 'Cosmetic',
  severity: 'medium',
  tags: ['gel', 'unmelted', 'contamination', 'plasticization', 'PVC', 'transparency', 'hot runner', 'cold runner'],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A fish eye is a surface blemish resulting from unmelted or insufficiently plasticized material being carried forward with the molten polymer stream into the mold cavity. Upon solidification, this non-homogenized particle manifests as an inclusion. Visually, fish eyes resemble small, localized, circular craters or gel-like spots, especially noticeable in transparent films or thin-walled components.',
        },
        {
          type: 'image',
          src: fishEyeGelClassification,
          alt: 'Side-by-side comparison of P-Gel (polymerization gel from raw material) and E-Gel (extrusion/process gel from thermal degradation) showing internal structure differences',
          figureNumber: 'Figure 1',
          caption: 'Gel classification: P-Gel (left) originates from high molecular weight inclusions in the raw material. E-Gel (right) forms during processing from thermal cross-linking due to excessive residence time or localized overheating. Distinguishing between the two determines whether the fix is material-side or process-side.',
        },
        { type: 'heading', level: 3, text: '1.1 Gel classification' },
        {
          type: 'list',
          items: [
            'P-Gel (Polymerization Gel): originates from raw material — high molecular weight additives, catalyst residues, or incompletely formed polymer molecules.',
            'E-Gel (Extrusion/Process Gel): induced during molding — thermal scorching, cross-linking, or heat-induced networking from excessive residence time.',
          ],
        },
        { type: 'heading', level: 3, text: '1.2 Polymer susceptibility' },
        {
          type: 'table',
          columns: ['Polymer', 'Susceptibility', 'Key Risk'],
          rows: [
            ['PVC (Suspension)', 'High', 'Over-polymerized grains resist fusion; graded by fish eye content'],
            ['TPE (SBS)', 'Moderate-High', 'Forms E-Gels under prolonged high temperature in hot runners'],
            ['PC, PMMA', 'Moderate', 'High shear sensitivity; non-uniform melting generates inclusions'],
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
          type: 'list',
          items: [
            'Incompatible materials and contamination — blending chemically disparate polymers or introducing foreign particulates.',
            'Regrind irregularity and excess — uneven blending, inadequate melting, and increased air entrapment.',
            'Intrinsic impurities (P-Gels) — quality of incoming raw resin including high molecular weight fractions.',
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Machine parameter factors' },
        {
          type: 'list',
          items: [
            'Low melt temperature — insufficient thermal profile for full plasticization.',
            'Insufficient shear heating — low screw RPM and back pressure produce inadequate frictional heating.',
            'Machine wear — worn check valve or excessive screw/barrel clearance reduces plasticization efficiency.',
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Rheological factors' },
        {
          type: 'list',
          items: [
            'Excessive residence time — shot size too small relative to barrel capacity causes E-Gel formation.',
            'Localized high shear rates — at gates causing degradation or cross-linking.',
          ],
        },
      ],
    },
    {
      id: 'corrective-actions',
      title: '3. Corrective Actions',
      blocks: [
        { type: 'heading', level: 3, text: '3.1 Thermal optimization' },
        {
          type: 'list',
          items: [
            'Increase barrel temperature profile to ensure complete plasticization.',
            'Increase back pressure to improve melt homogeneity (balance with degradation risk).',
            'Increase screw speed to add shear heating energy.',
          ],
        },
        { type: 'heading', level: 3, text: '3.2 Material handling' },
        {
          type: 'list',
          items: [
            'Standardize regrind ratio and particle size.',
            'Verify incoming material lot for P-Gel content.',
            'Ensure proper drying of hygroscopic resins.',
          ],
        },
        { type: 'heading', level: 3, text: '3.3 Machine maintenance' },
        {
          type: 'list',
          items: [
            'Inspect and replace worn check rings.',
            'Verify screw/barrel clearance within specification.',
            'Right-size barrel to part shot weight (25–75% barrel utilization).',
          ],
        },
        { type: 'heading', level: 3, text: '3.4 Troubleshooting matrix' },
        {
          type: 'table',
          caption: 'Quick diagnostic matrix',
          columns: ['Symptom/Observation', 'Probable Cause', 'First Action'],
          rows: [
            ['Fish eyes in every shot, all cavities', 'Barrel temperature or screw wear', 'Increase melt temp; inspect screw'],
            ['Fish eyes only in specific cavity', 'Hot runner zone or gate restriction', 'Check zone temperature and gate condition'],
            ['Fish eyes intermittent, random location', 'Contamination or regrind issue', 'Inspect material handling; purge system'],
            ['Fish eyes disappear with higher back pressure', 'Insufficient plasticization', 'Optimize back pressure and screw speed'],
          ],
        },
      ],
    },
  ],
  references: [
    { id: 'R1', text: 'viewmold.com. Injection Molding Fish Eye Defects.' },
    { id: 'R2', text: 'ehdapolymer.com. Fish Eye Defects in Film Production.' },
    { id: 'R3', text: 'Paulson Training. Injection Molding Defect Guide.' },
    { id: 'R4', text: 'DME. Trouble Shooting Guide — Fish Eyes.' },
  ],
};
