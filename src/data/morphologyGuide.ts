import type { DefectGuide } from './defectGuides';
import morphologyPressSettings from '@/assets/morphology-press-settings.png';
import morphologyPreparation from '@/assets/morphology-preparation.png';
import morphologyRunnerComparison from '@/assets/morphology-runner-comparison.png';
import morphologyTroubleshootingMatrix from '@/assets/morphology-troubleshooting-matrix.jpg';
import morphologyCrystallinityGuide from '@/assets/morphology-crystallinity-guide.jpg';
import morphologyOrientationStress from '@/assets/morphology-orientation-stress.jpg';
import morphologyCoolingWallThickness from '@/assets/morphology-cooling-wall-thickness.jpg';

export const morphologyGuide: DefectGuide = {
  slug: 'morphology',
  title: 'Injection Molding Morphology',
  summary:
    'How press settings shape part morphology, how to prepare for ideal morphology before the first shot, and how morphology differs across cold runner, hot runner, and stack mold systems.',
  category: 'Process Fundamentals',
  severity: 'medium',
  tags: [
    'morphology',
    'crystallinity',
    'orientation',
    'skin core',
    'shrinkage',
    'warpage',
    'press settings',
    'cold runner',
    'hot runner',
    'stack mold',
    'frozen-in stress',
    'cooling rate',
    'wall thickness',
    'amorphous',
    'semi-crystalline',
  ],
  references: [],
  sections: [
    {
      id: 'press-settings',
      title: 'Press Settings That Shape Morphology',
      blocks: [
        {
          type: 'image',
          src: morphologyPressSettings,
          alt: 'Injection Molding Morphology — Press Settings That Build It',
          caption:
            'How the four histories (thermal, shear, pressure, cooling) combine to determine part morphology, with a 14-parameter settings matrix and troubleshooting guide.',
          figureNumber: 'Figure 1',
        } as any,
      ],
    },
    {
      id: 'preparation',
      title: 'Preparation and the Ideal State',
      blocks: [
        {
          type: 'image',
          src: morphologyPreparation,
          alt: 'Injection Molding Morphology — Preparation and the Ideal State',
          caption:
            '17 preparation factors that shape morphology before the first shot, plus a cross-section of ideal symmetric skin–core–skin structure.',
          figureNumber: 'Figure 2',
        } as any,
      ],
    },
    {
      id: 'runner-comparison',
      title: 'Cold Runner vs Hot Runner vs Stack Mold',
      blocks: [
        {
          type: 'image',
          src: morphologyRunnerComparison,
          alt: 'Injection Molding Morphology — Cold Runner vs Hot Runner vs Stack Mold',
          caption:
            'Side-by-side comparison of how cold runner, hot runner, and stack mold systems affect thermal history, shear, gate freeze, pressure loss, and cavity-to-cavity consistency.',
          figureNumber: 'Figure 3',
        } as any,
      ],
    },
    {
      id: 'troubleshooting-matrix',
      title: 'Morphology Troubleshooting Matrix',
      blocks: [
        {
          type: 'image',
          src: morphologyTroubleshootingMatrix,
          alt: 'Morphology Troubleshooting Matrix — 8 common defects with root causes, affected layers, press adjustments, and runner system fixes',
          caption:
            'Diagnose–Correct–Optimize: 8 common morphology-related defects (warpage, sink marks, voids, brittleness, surface haze, flow lines, differential shrinkage, residual stress) mapped to root causes, affected morphology layers, press adjustments, and runner system fixes.',
          figureNumber: 'Figure 4',
        } as any,
      ],
    },
    {
      id: 'crystallinity-guide',
      title: 'Crystallinity vs Amorphous Morphology',
      blocks: [
        {
          type: 'image',
          src: morphologyCrystallinityGuide,
          alt: 'Crystallinity vs Amorphous Morphology Guide — semi-crystalline vs amorphous polymer comparison',
          caption:
            'Semi-crystalline (PP, PA, POM, PBT, PEEK) vs amorphous (ABS, PC, PMMA, PS, PEI) polymer morphology: molecular structures, cooling rate effects on crystallinity, gate location impact, and recommended mold temperatures.',
          figureNumber: 'Figure 5',
        } as any,
      ],
    },
    {
      id: 'orientation-stress',
      title: 'Shear-Induced Orientation & Frozen-In Stress',
      blocks: [
        {
          type: 'image',
          src: morphologyOrientationStress,
          alt: 'Shear-Induced Orientation & Frozen-In Stress — velocity profiles, orientation patterns, and injection speed recommendations',
          caption:
            'How injection speed and melt temperature create molecular orientation: velocity profiles, shear rate distribution, tensile strength anisotropy, shrinkage differentials, optical birefringence, gate proximity effects, and recommended injection speed profiles.',
          figureNumber: 'Figure 6',
        } as any,
      ],
    },
    {
      id: 'cooling-wall-thickness',
      title: 'Cooling Rate & Wall Thickness Effects',
      blocks: [
        {
          type: 'image',
          src: morphologyCoolingWallThickness,
          alt: 'Cooling Rate & Wall Thickness Effects on Morphology — temperature gradients, crystallinity profiles, and coolant optimization',
          caption:
            'How cooling rate varies with wall thickness (1–6 mm) and its impact on skin thickness, core crystallinity, mold temperature effects, coolant channel placement optimization, and gate freeze timing.',
          figureNumber: 'Figure 7',
        } as any,
      ],
    },
  ],
};
