import type { KnowledgeGuide } from './fountainFlowGuide';

export const reservoirAirBleedGuide: KnowledgeGuide = {
  slug: 'bleeding-trapped-air-reservoir',
  title: 'Bleeding Trapped Air from a Reservoir',
  summary:
    'A field guide to safely removing trapped air from a hydraulic reservoir or circuit by addressing the source, cycling the system, and following reservoir design best practices.',
  sections: [
    {
      id: 'why-bleed',
      title: 'Why Trapped Air Matters',
      blocks: [
        {
          type: 'paragraph',
          text: 'Trapped air in a hydraulic reservoir or circuit should be bled out by removing the source of the air first, then cycling the system so the free air can rise and escape. Air in the system causes spongy motion, erratic pressure, noise, and accelerated wear from cavitation and oxidation.',
        },
      ],
    },
    {
      id: 'reservoir-steps',
      title: 'If the Reservoir Is the Trap Point',
      blocks: [
        {
          type: 'paragraph',
          text: 'Start by checking the reservoir itself before assuming the circuit is at fault:',
        },
        {
          type: 'orderedList',
          items: [
            'Make sure the oil level is correct and the suction inlet is fully submerged.',
            'Confirm the return flow enters below the oil surface without excessive turbulence.',
            'Verify the reservoir is properly vented so pressure can equalize as fluid level changes.',
            'Run the pump at low pressure and allow the system to cycle so free air can rise and escape.',
            'Watch the sight glass for foam or bubbles and continue cycling until the oil appears clear.',
          ],
        },
      ],
    },
    {
      id: 'actuator-steps',
      title: 'If a Cylinder or Actuator Is Trapping Air',
      blocks: [
        {
          type: 'paragraph',
          text: 'When the air is trapped in an actuator rather than the reservoir, use controlled motion to move the air back toward the tank or a bleed point:',
        },
        {
          type: 'orderedList',
          items: [
            'Cycle the actuator slowly with low pressure.',
            'Orient the ports so air moves upward toward the bleed point or back to the reservoir.',
            'Open bleed fittings at high points if the design allows, and close them once oil appears without bubbles.',
            'Continue cycling until motion becomes smooth and non-spongy.',
            'Jerky or pulsating movement means air is still present — do not increase pressure to force it out.',
          ],
        },
      ],
    },
    {
      id: 'field-rules',
      title: 'Field Rules to Follow',
      blocks: [
        {
          type: 'paragraph',
          text: 'A few simple rules prevent damage and recurring air problems:',
        },
        {
          type: 'list',
          items: [
            'Do not dead-head the pump while trying to bleed air.',
            'Do not overpressure a system just to force air out.',
            'Do not assume a reservoir will self-clear if the return flow is splashing or whipping the oil surface.',
            'Good reservoir design and proper return-line submergence are important because poor return conditions can keep re-entraining air into the oil.',
          ],
        },
      ],
    },
    {
      id: 'verify-clear',
      title: 'How to Verify the System Is Clear',
      blocks: [
        {
          type: 'paragraph',
          text: 'After bleeding, confirm the problem is resolved with these checks:',
        },
        {
          type: 'list',
          items: [
            'Actuator motion is smooth and consistent across the full stroke.',
            'Pressure readings are stable and repeatable.',
            'No foam, bubbles, or shimmering oil is visible in the reservoir or sight glass.',
            'Pump noise has returned to normal.',
          ],
        },
      ],
    },
  ],
};
