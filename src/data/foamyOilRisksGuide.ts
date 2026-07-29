import type { KnowledgeGuide } from './fountainFlowGuide';

export const foamyOilRisksGuide: KnowledgeGuide = {
  slug: 'foamy-oil-risks',
  title: 'Risks of Foamy Oil',
  summary:
    'Why foamy or aerated hydraulic oil is dangerous, how it harms machine performance, and what to check first.',
  sections: [
    {
      id: 'why-foam-matters',
      title: 'Why Foamy Oil Matters',
      blocks: [
        {
          type: 'paragraph',
          text: 'Foamy oil is dangerous because it behaves less like hydraulic fluid and more like a compressible mixture. The system loses stiffness, responds slowly, and can move in jumps or spurts. That compressibility means pressure transmission becomes unreliable, which is bad for clamps, injection movements, and any motion that must be controlled precisely.',
        },
      ],
    },
    {
      id: 'performance-risks',
      title: 'Performance Risks',
      blocks: [
        {
          type: 'paragraph',
          text: 'When air is mixed into the oil, the fluid no longer transmits force predictably. Expect these operational problems:',
        },
        {
          type: 'list',
          items: [
            'Slow or spongy actuator response.',
            'Inconsistent clamp force or injection velocity.',
            'Jerky motion, hunting, or oscillation in closed-loop controls.',
            'Reduced positional accuracy and repeatability.',
          ],
        },
      ],
    },
    {
      id: 'thermal-and-lubrication-risks',
      title: 'Thermal and Lubrication Risks',
      blocks: [
        {
          type: 'paragraph',
          text: 'The air bubbles also reduce lubrication quality and heat transfer, which raises wear and operating temperature. Oil film strength drops where it is needed most, and the fluid cannot carry heat away from pumps, valves, and cylinders as effectively.',
        },
        {
          type: 'list',
          items: [
            'Increased friction and accelerated wear on pumps and valves.',
            'Higher operating temperatures.',
            'Greater risk of varnish and oxidation.',
            'Shortened oil life.',
          ],
        },
      ],
    },
    {
      id: 'mechanical-damage-risks',
      title: 'Mechanical Damage Risks',
      blocks: [
        {
          type: 'paragraph',
          text: 'The long-term risk is mechanical damage. Air bubbles collapsing in the pump can erode gears, vanes, pistons, and wear surfaces. Aeration can accelerate oxidation and degrade seals and oil life. In severe cases, trapped air can also contribute to banging, overheating, and unsafe pressure spikes or dieseling effects in the system.',
        },
      ],
    },
    {
      id: 'what-to-do-next',
      title: 'What to Do Next',
      blocks: [
        {
          type: 'paragraph',
          text: 'If you see foamy oil or suspect aeration, work through these checks in order:',
        },
        {
          type: 'orderedList',
          items: [
            'Check reservoir level and oil condition.',
            'Inspect suction fittings, hoses, clamps, and seals for air leaks.',
            'Verify return flow is not aerating the tank.',
            'Bleed air from cylinders or high points using the correct low-pressure procedure.',
            'Recheck for smooth motion and absence of foam or noise.',
          ],
        },
      ],
    },
  ],
};
