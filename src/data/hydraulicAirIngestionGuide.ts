import type { KnowledgeGuide } from './fountainFlowGuide';

export const hydraulicAirIngestionGuide: KnowledgeGuide = {
  slug: 'hydraulic-air-ingestion-suction-lines',
  title: 'Air Ingestion in Hydraulic Suction Lines',
  summary:
    'A practical guide to testing for air ingestion in hydraulic suction lines using temporary isolation, visual checks, and simple field tests to locate suction-side leaks.',
  sections: [
    {
      id: 'why-test',
      title: 'Why Test for Air Ingestion',
      blocks: [
        {
          type: 'paragraph',
          text: 'The most effective way to test for air ingestion in hydraulic suction lines is to look for a temporary change in pump behavior when you isolate or seal suspected leak points, because suction-side leaks usually pull air in rather than letting oil out.',
        },
      ],
    },
    {
      id: 'practical-tests',
      title: 'Practical Tests',
      blocks: [
        {
          type: 'paragraph',
          text: 'Use simple, low-risk checks to narrow down where air is entering the system:',
        },
        {
          type: 'list',
          items: [
            'Visual check for foaming. Look in the reservoir or sight glass for foam, bubbles, or shimmering oil, which are strong signs of air entering the fluid.',
            'Listen for a change in sound. Aeration often creates a noisy, erratic whine or gravel-like sound; if a suspected fitting is temporarily sealed and the noise changes, that points to the leak location.',
            'Oil-on-fitting test. Brush oil over suction-line fittings and connections while the pump is running; if the sound briefly improves, air was likely being drawn in at that point.',
            'Plastic wrap test. Wrap plastic tightly around a suspected union or cam fitting; if the wrap tightens or the symptom changes, that section may be leaking air.',
            'Shaving cream test on shaft seals. If the shaft seal is suspected, apply shaving cream around the seal area and watch for holes forming as air is pulled in.',
            'Check fluid level and vortexing. A low reservoir level can let a vortex form at the suction inlet, which allows air ingestion even if no fitting is visibly leaking.',
          ],
        },
      ],
    },
    {
      id: 'inspect-first',
      title: 'What to Inspect First',
      blocks: [
        {
          type: 'paragraph',
          text: 'Start with the most common causes of suction-side air ingestion and restriction:',
        },
        {
          type: 'orderedList',
          items: [
            'Suction strainer condition and cleanliness.',
            'Hose condition, including cracks, soft spots, and collapsed linings.',
            'Clamp tightness and fitting alignment.',
            'Reservoir fluid level and inlet submergence.',
            'Sharp bends, cracked hoses, and poor sealing at threaded joints.',
            'Return flow churning in the reservoir and entraining air.',
          ],
        },
      ],
    },
    {
      id: 'interpret-results',
      title: 'How to Interpret Results',
      blocks: [
        {
          type: 'paragraph',
          text: 'Use the combination of symptoms and test results to separate air ingestion from mechanical pump wear:',
        },
        {
          type: 'table',
          columns: ['Observation', 'Likely Diagnosis'],
          rows: [
            ['Pump is noisy, oil is foamy, and sealing a fitting changes the sound', 'Air ingestion at or near that fitting'],
            ['Symptoms persist after all suction points are checked', 'Suspect pump shaft seal, reservoir design, or severe suction-side restriction causing cavitation'],
            ['Noise is steady and does not change when fittings are sealed', 'Mechanical pump wear or internal leakage more likely'],
          ],
        },
      ],
    },
    {
      id: 'safety-note',
      title: 'Safety Note',
      blocks: [
        {
          type: 'paragraph',
          text: 'Do not open suction lines or hold discharge lines by hand during testing, and keep clear of moving parts while jogging the pump. Use the machine’s lockout and test procedure whenever you move from observation to disassembly.',
        },
      ],
    },
  ],
};
