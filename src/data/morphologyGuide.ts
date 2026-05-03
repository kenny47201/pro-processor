import type { DefectGuide } from './defectGuides';
import morphologyPressSettings from '@/assets/morphology-press-settings.png';
import morphologyPreparation from '@/assets/morphology-preparation.png';
import morphologyRunnerComparison from '@/assets/morphology-runner-comparison.png';

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
  ],
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
  ],
};
