import type { KnowledgeGuide } from './fountainFlowGuide';

export const hydraulicPressureDropTroubleshooting: KnowledgeGuide = {
  slug: 'hydraulic-pressure-drop-troubleshooting',
  title: 'Common Troubleshooting Steps for Hydraulic Pressure Drops',
  summary:
    'A practical, step-by-step guide for diagnosing low hydraulic pressure in injection molding and fluid-power systems — from symptom verification to fast diagnostic patterns.',
  sections: [
    {
      id: 'verify-symptom',
      title: '1. Verify the Symptom First',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Check whether pressure is low at the pump outlet, after a filter, at the valve, or at the actuator. A pressure drop at one point and not another usually narrows the fault to a restriction, leak, or valve issue.',
        },
      ],
    },
    {
      id: 'fluid-level-condition',
      title: '2. Check Fluid Level and Condition',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Low oil level, aeration, contamination, or overheated fluid can all reduce effective pressure and cause unstable operation. Inspect the reservoir sight glass, check oil color and odor, and look for foam or bubbles that indicate air entrainment.',
        },
      ],
    },
    {
      id: 'inspect-suction-side',
      title: '3. Inspect the Suction Side',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Look for blocked strainers, collapsed hoses, loose fittings, air leaks, or restrictions between reservoir and pump. Suction problems often show up as noise, cavitation, or foamy oil.',
        },
      ],
    },
    {
      id: 'test-pump-output',
      title: '4. Test the Pump Output',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A worn pump may still turn but fail to deliver enough flow to build pressure under load. If pressure is low everywhere, pump wear or drive problems become more likely. Compare actual flow and pressure against the manufacturer specification.',
        },
      ],
    },
    {
      id: 'examine-relief-valve',
      title: '5. Examine the Relief Valve',
      blocks: [
        {
          type: 'paragraph',
          text:
            'If the relief valve is set too low, stuck open, or leaking internally, system pressure will never rise properly. This is one of the first components to suspect when pressure tops out below normal.',
        },
      ],
    },
    {
      id: 'check-filters-lines',
      title: '6. Check Filters and Lines for Restriction',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A clogged filter can starve the pump or create excessive pressure loss across the circuit. Restriction on the pressure or return side can also cause slow motion and heat buildup. Check differential pressure indicators and filter service intervals.',
        },
      ],
    },
    {
      id: 'internal-leakage',
      title: '7. Look for Internal Leakage',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Worn cylinder seals, valve leakage, or bypassing components can cause pressure to fall when the system is loaded. Internal leakage is especially important if pressure builds briefly and then decays.',
        },
      ],
    },
    {
      id: 'directional-control-valves',
      title: '8. Verify Directional and Control Valve Operation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A spool that is not shifting fully, is contaminated, or has damaged seals may bleed pressure or block flow. Manual override and pressure checks across the valve help confirm this. Listen for erratic solenoid operation and check coil resistance.',
        },
      ],
    },
    {
      id: 'actuator-load-binding',
      title: '9. Check Actuator Load and Mechanical Binding',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A stuck clamp, misaligned guide, or overloaded cylinder can make the system appear to have a pressure problem when the real issue is excessive resistance. Verify that the mechanical motion is free and within design load limits.',
        },
      ],
    },
    {
      id: 'instrumentation-accuracy',
      title: '10. Confirm Instrumentation Accuracy',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A bad gauge, transducer, or loose pressure tap can create a false diagnosis. Always compare readings at more than one point if possible, and calibrate sensors on a regular schedule.',
        },
      ],
    },
    {
      id: 'fast-diagnostic-pattern',
      title: 'Fast Diagnostic Pattern',
      blocks: [
        {
          type: 'paragraph',
          text: 'Use these patterns to narrow the fault quickly:',
        },
        {
          type: 'list',
          items: [
            'Low pressure everywhere: suspect pump, suction supply, or relief valve.',
            'Low pressure only under load: suspect internal leakage or actuator/mechanical load.',
            'Pressure drop after filters/valves: suspect restriction or clogged components.',
            'Intermittent pressure loss: suspect air ingress, contamination, sticking valves, or electrical control issues.',
          ],
        },
      ],
    },
    {
      id: 'best-maintenance-habit',
      title: 'Best Maintenance Habit',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Start with the simplest checks: oil level, leaks, filter condition, and gauge readings, then move toward valves, pump, and actuators. That sequence prevents unnecessary teardown and usually finds the problem faster.',
        },
      ],
    },
  ],
};
