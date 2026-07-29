import type { KnowledgeGuide } from './fountainFlowGuide';

export const cavitationVsAerationGuide: KnowledgeGuide = {
  slug: 'cavitation-vs-aeration',
  title: 'Cavitation versus Aeration',
  summary:
    'A quick diagnostic guide to telling cavitation and aeration apart in a hydraulic system by sound, oil condition, and root cause.',
  sections: [
    {
      id: 'what-is-cavitation',
      title: 'What Is Cavitation?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cavitation is the formation of vapor cavities in the fluid from excessively low pressure at the pump inlet. Those bubbles collapse when they reach higher pressure and create shock damage to metal surfaces. It is fundamentally a pressure problem: the pump inlet cannot deliver enough fluid to fill the pumping chambers, so the fluid literally boils into vapor at the low-pressure point.',
        },
      ],
    },
    {
      id: 'what-is-aeration',
      title: 'What Is Aeration?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Aeration is outside air entering the suction side of the pump through leaks, loose fittings, or low oil level, so the pump ingests an air-oil mixture instead of solid fluid. It is fundamentally an air-leak or fluid-level problem: the pump is pulling in air along with the oil.',
        },
      ],
    },
    {
      id: 'sound-clues',
      title: 'Listen First: Sound Patterns',
      blocks: [
        {
          type: 'paragraph',
          text: 'The sound pattern is one of the best clues when distinguishing the two conditions:',
        },
        {
          type: 'list',
          items: [
            'Cavitation usually makes a steady, high-pitched whine that tracks with pump speed and load.',
            'Aeration tends to sound more erratic and may include a marbles-or-gravel noise as slugs of air move through the pump.',
            'Aeration noise often changes when the reservoir level changes or when you briefly block suspected leak points.',
          ],
        },
      ],
    },
    {
      id: 'oil-and-visual-clues',
      title: 'Oil Condition and Visual Clues',
      blocks: [
        {
          type: 'paragraph',
          text: 'Foamy oil in the reservoir strongly supports aeration. Look for foam, bubbles, or a shimmering surface in the sight glass. Cavitation can also be present if the suction side is starved enough to pull vapor bubbles out of the fluid, but it does not usually create persistent foam in the reservoir.',
        },
        {
          type: 'list',
          items: [
            'Persistent foam → suspect aeration first.',
            'Clear oil but high-pitched whine under load → suspect cavitation.',
            'Both together → the suction side is severely starved; check restriction and air leaks.',
          ],
        },
      ],
    },
    {
      id: 'quick-field-checks',
      title: 'Quick Field Checks',
      blocks: [
        {
          type: 'paragraph',
          text: 'Use these simple tests to narrow the cause without disassembling anything:',
        },
        {
          type: 'orderedList',
          items: [
            'Check oil level and condition. Low or foamy oil points toward aeration.',
            'Inspect suction-line fittings, seals, and clamps for visible leaks or wet spots.',
            'Listen to the pump under varying load. A steady whine that gets worse with load suggests cavitation.',
            'Temporarily seal suspected air-ingestion points and listen for a change in sound or response.',
            'Check suction strainers and filters for restriction that could cause cavitation.',
          ],
        },
      ],
    },
    {
      id: 'fix-direction',
      title: 'Which Fix Goes Where',
      blocks: [
        {
          type: 'paragraph',
          text: 'Aeration is solved by stopping the air leak, raising the oil level, or improving return-line submergence. Cavitation is solved by removing suction-side restriction, increasing inlet pressure, slowing the pump, or correcting oil viscosity for the operating temperature.',
        },
      ],
    },
  ],
};
