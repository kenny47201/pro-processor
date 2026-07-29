import type { KnowledgeGuide } from './fountainFlowGuide';

export const pumpFlowTestGuide: KnowledgeGuide = {
  slug: 'hydraulic-pump-flow-test',
  title: 'Hydraulic Pump Flow Test',
  summary:
    'A practical guide to performing a hydraulic pump flow test to verify rated flow under pressure, detect internal leakage, and distinguish pump wear from suction or downstream faults.',
  sections: [
    {
      id: 'why-test',
      title: 'Why Perform a Pump Flow Test',
      blocks: [
        {
          type: 'paragraph',
          text: 'A good pump flow test verifies whether the pump can deliver its rated flow under pressure. A pump with worn internals may still spin normally but leak oil internally and lose volumetric efficiency. The practical idea is to compare flow at a low-load condition against flow at a controlled pressure rise; a meaningful drop in flow as pressure increases is a classic sign of internal leakage.',
        },
      ],
    },
    {
      id: 'what-you-need',
      title: 'What You Need',
      blocks: [
        {
          type: 'paragraph',
          text: 'Gather the right equipment before starting so the test produces reliable, comparable results:',
        },
        {
          type: 'list',
          items: [
            'A calibrated flow meter sized for the circuit.',
            'A pressure gauge or transducer at the pump outlet.',
            'A means to load the pump in a controlled way, usually a test stand or adjustable load valve.',
            'Clean hydraulic fluid at normal operating temperature, because viscosity affects leakage and test results.',
          ],
        },
      ],
    },
    {
      id: 'basic-setup',
      title: 'Basic Test Setup',
      blocks: [
        {
          type: 'paragraph',
          text: 'Install instrumentation carefully so readings represent true pump performance:',
        },
        {
          type: 'orderedList',
          items: [
            'Connect the flow meter in the pressure line from the pump.',
            'Install a pressure gauge as close to the pump outlet as practical.',
            'Route flow through an adjustable load so pressure can be increased gradually.',
            'Warm the system to normal operating temperature before taking readings, since cold oil can hide leakage and hot oil can exaggerate it.',
            'Make sure the suction side is unrestricted, because suction starvation can mimic a bad pump.',
          ],
        },
      ],
    },
    {
      id: 'test-procedure',
      title: 'Test Procedure',
      blocks: [
        {
          type: 'paragraph',
          text: 'Follow a consistent procedure each time so results can be compared against previous tests or manufacturer specifications:',
        },
        {
          type: 'orderedList',
          items: [
            'Run the pump at its normal drive speed.',
            'Record the pump flow at the lowest safe pressure or near no-load condition.',
            'Increase pressure in steps while holding pump speed constant.',
            'Record flow and pressure at each step.',
            'Compare the measured flow to the pump’s expected specification at the same speed and temperature.',
            'Watch for a steep flow decline as pressure rises; that is the key indicator of internal leakage.',
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
          text: 'Use the flow-versus-pressure curve to separate normal behavior from common faults:',
        },
        {
          type: 'table',
          columns: ['Observation', 'Likely Diagnosis'],
          rows: [
            ['Flow stays close to rated value at low pressure and only decreases modestly as pressure rises', 'Normal pump'],
            ['Flow starts low or falls off sharply as pressure increases', 'Worn pump with internal slip'],
            ['Flow is unstable, noisy, or foamy; pressure fluctuates', 'Suction problem, not pump wear'],
            ['Flow looks acceptable at the pump but pressure cannot build in the circuit', 'Valve or relief issue downstream'],
          ],
        },
      ],
    },
    {
      id: 'signs-internal-leakage',
      title: 'Signs the Test Points to Internal Leakage',
      blocks: [
        {
          type: 'paragraph',
          text: 'When several of these signs appear together, internal leakage becomes the most probable cause:',
        },
        {
          type: 'list',
          items: [
            'Pump develops less flow than expected at the same speed.',
            'Flow drops noticeably when system pressure is applied.',
            'Oil temperature rises faster than normal during the test.',
            'Case drain flow is excessive on pumps that have a case drain, which often confirms internal bypassing.',
            'The pump may still sound normal at idle but loses performance under load.',
          ],
        },
      ],
    },
    {
      id: 'good-practice',
      title: 'Good Practice',
      blocks: [
        {
          type: 'paragraph',
          text: 'Document the test properly and compare against manufacturer limits:',
        },
        {
          type: 'orderedList',
          items: [
            'Use the machine’s service manual or the pump manufacturer’s test limits whenever possible, because acceptable flow loss depends on pump type, size, and wear tolerance.',
            'If the pump fails the test, document the readings, temperature, speed, and pressure points so you can distinguish pump wear from suction restriction or downstream leakage.',
          ],
        },
      ],
    },
  ],
};
