import type { KnowledgeGuide } from './fountainFlowGuide';

export const pumpFailureSignsGuide: KnowledgeGuide = {
  slug: 'common-signs-of-pump-failure',
  title: 'Common Signs of Pump Failure',
  summary:
    'A field guide to recognizing hydraulic pump failure in injection molding and fluid-power systems — from slow motion and noisy operation to contamination and quick diagnostic checks.',
  sections: [
    {
      id: 'common-signs',
      title: 'Common Signs of Pump Failure',
      blocks: [
        {
          type: 'paragraph',
          text: 'Pump problems rarely appear overnight. Most failures give warning signs that show up as changes in speed, pressure, sound, temperature, or oil condition. Recognizing these signs early prevents catastrophic failure and unplanned downtime.',
        },
        {
          type: 'list',
          items: [
            'Slow machine motion. The cylinder or motor still moves, but more slowly than normal, especially under load.',
            'Loss of pressure under demand. Pressure may look normal at idle, then fall when the machine tries to clamp, inject, or retract.',
            'Noisy operation. Growling, whining, knocking, or a “gravel” sound often points to cavitation, aeration, or worn pump parts.',
            'Excess heat. A pump that is bypassing internally or working against restriction often heats the oil and nearby components.',
            'Foamy or milky oil. This can indicate air ingress or contamination, both of which damage pump performance.',
            'Pressure fluctuation or hunting. A weak or damaged pump may not deliver steady flow, so the system pressure bounces.',
            'Metal contamination in the filter. Fine metallic debris in the filter or reservoir is a serious warning of internal wear.',
            'Hard starting or erratic loading. The machine may struggle to build pressure at startup or behave inconsistently from cycle to cycle.',
          ],
        },
      ],
    },
    {
      id: 'what-they-mean',
      title: 'What These Signs Usually Mean',
      blocks: [
        {
          type: 'paragraph',
          text: 'Each symptom points to a specific failure mode. Use the pattern of symptoms to narrow the root cause before disassembling the pump.',
        },
        {
          type: 'table',
          columns: ['Symptom Pattern', 'Likely Cause'],
          rows: [
            ['Slow motion + loss of pressure under load', 'Worn internal clearances causing internal leakage'],
            ['Growling, whining, or knocking noise', 'Cavitation or aeration from suction starvation'],
            ['Overheating + foamy oil', 'Air ingress, contamination, or internal bypassing'],
            ['Pressure hunting or fluctuation', 'Unstable flow delivery from worn pump or control issue'],
            ['Metal debris in filter or reservoir', 'Internal mechanical wear of pump components'],
            ['Hard starting or erratic loading', 'Drive misalignment, coupling issue, or failing motor'],
          ],
        },
        {
          type: 'paragraph',
          text: 'A single symptom is rarely enough to condemn a pump. Look for combinations: noise plus heat plus pressure loss strongly suggest suction starvation or internal wear. Slow motion alone may be a valve, filter, or actuator problem.',
        },
      ],
    },
    {
      id: 'quick-field-check',
      title: 'A Quick Field Check',
      blocks: [
        {
          type: 'paragraph',
          text: 'Use this short diagnostic sequence before deciding the pump needs replacement:',
        },
        {
          type: 'orderedList',
          items: [
            'Check oil level and condition.',
            'Listen for abnormal pump noise.',
            'Inspect suction lines, strainers, and fittings.',
            'Look for heat, leaks, and foaming.',
            'Compare pump outlet pressure with pressure at the load.',
            'Check the return filter for debris.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If the pump is noisy, hot, and cannot build pressure even with the rest of the circuit isolated, pump wear or suction starvation becomes very likely.',
        },
      ],
    },
  ],
};
