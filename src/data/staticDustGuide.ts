import type { DefectGuide } from './defectGuides';
import staticDustTriboelectric from '@/assets/static-dust-triboelectric.jpg';

export const staticDustGuide: DefectGuide = {
  slug: 'static-dust',
  title: 'Static Dust Attraction',
  summary:
    'Electrostatic surface charges on insulative polymer parts attract ambient particulates, causing cosmetic contamination, coating defects, and functional failures in medical/electronic applications.',
  category: 'Cosmetic & Functional',
  severity: 'medium',
  tags: ['static', 'dust', 'contamination', 'triboelectric', 'ionization', 'cleanroom', 'hot runner', 'cold runner', 'ESD'],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Technical Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Static dust attraction in precision injection molding is defined as the process-induced accumulation of high-intensity electrostatic surface charges on non-conductive polymer components, creating an attractive force for ambient particulates and airborne debris. Surface potentials in molding operations frequently reach 10–20 kV.',
        },
        { type: 'heading', level: 3, text: '1.1 The triboelectric mechanism' },
        {
          type: 'list',
          items: [
            'Rapid contact and separation of the polymer melt against steel mold walls.',
            'Friction of pellets within the conveying system.',
            'Mechanical peeling of parts from mold faces or robotic end-of-arm tooling.',
          ],
        },
        {
          type: 'image',
          src: staticDustTriboelectric,
          alt: 'Diagram showing triboelectric charge buildup on a molded part during ejection, dust particle attraction to charged surface, and ionizer bar solution for neutralizing charge',
          figureNumber: 'Figure 1',
          caption: 'Triboelectric charging mechanism: During ejection, rapid contact-separation between the polymer part and steel mold generates surface charges up to 10–20 kV. Charged surfaces attract ambient dust particles. An ionizer bar positioned at the mold face neutralizes charge immediately upon ejection.',
        },
        { type: 'heading', level: 3, text: '1.2 Defect manifestations' },
        {
          type: 'table',
          columns: ['Defect Type', 'Description', 'Applications Affected'],
          rows: [
            ['Branching/Feathering Patterns', 'Dendritic formations (Lichtenberg figures) from localized high-intensity charge', 'Cosmetic surfaces, transparent panels'],
            ['Encapsulated Black Specks', 'Dust attracted to melt stream embedded within part wall', 'Clear resins (PC, Copolyesters)'],
            ['Surface Haziness', 'Uniform fine particulate layer degrading gloss or transparency', 'Optical components, displays'],
            ['Coating/Painting Defects', '"Ink fly" or uneven metallic paint lay-down', 'Automotive bumpers, interior panels'],
          ],
        },
      ],
    },
    {
      id: 'root-causes',
      title: '2. Root Causes',
      blocks: [
        { type: 'heading', level: 3, text: '2.1 Material conductivity' },
        {
          type: 'table',
          caption: 'Material classification by surface resistivity',
          columns: ['Classification', 'Surface Resistivity (Ω/sq)', 'Behavior'],
          rows: [
            ['Conductive', '< 10⁵', 'Charges move freely; can be grounded'],
            ['Static Dissipative', '10⁶ – 10¹²', 'Charges move slowly to ground; prevents rapid ESD'],
            ['Anti-static', '10¹⁰ – 10¹²', 'Inhibits initial charge generation through friction'],
            ['Insulative', '> 10¹²', 'Charges trapped on surface; primary source of dust attraction'],
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Polymer susceptibility' },
        {
          type: 'table',
          columns: ['Polymer', 'Triboelectric Tendency', 'Static Risk'],
          rows: [
            ['Polypropylene (PP)', 'Gains electrons (negative)', 'High — superior insulator; charging during cooling'],
            ['ABS', 'Moderate', 'High — particle agglomeration in hopper; >10 kV during demolding'],
            ['Polycarbonate (PC)', 'Loses electrons (positive)', 'Very High — optical-grade surface sensitivity'],
            ['Nylon (PA)', 'Strongly positive', 'Moderate — hygroscopic nature provides some dissipation'],
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Runner system impact' },
        {
          type: 'table',
          caption: 'Comparative static factors',
          columns: ['Static Factor', 'Cold Runner', 'Hot Runner'],
          rows: [
            ['Primary charge source', 'Part separation from cold runner/sprue', 'Demolding from cavity (less runner handling)'],
            ['Regrind contribution', 'High — re-grinding generates triboelectric charge', 'None (no runner to regrind)'],
            ['Thermal profile', 'More temperature variation → more charge variation', 'Uniform thermal history → more predictable charge'],
          ],
        },
        { type: 'heading', level: 3, text: '2.4 Machine & process factors' },
        {
          type: 'list',
          items: [
            'Aggressive compression ratio → over-shearing, degradation, high charge.',
            'Excessive back pressure → increased residence time and mechanical work.',
            'Worn check rings → dead spots where charred material releases, nucleating dust attraction.',
            'High ejection speed → maximum triboelectric charge generation at demolding.',
          ],
        },
      ],
    },
    {
      id: 'diagnostics',
      title: '3. Diagnostic Techniques',
      blocks: [
        {
          type: 'table',
          columns: ['Tool', 'Application', 'Diagnostic Criterion'],
          rows: [
            ['Electrostatic field meter', 'Measure surface potential at demolding', '> 5 kV = high contamination risk'],
            ['Charged plate monitor', 'Quantify charge decay half-life', '> 2 sec = inadequate dissipation'],
            ['The "5-Second Test"', 'Hold part away from surfaces; measure charge', 'Increasing or stable charge > 1 kV = "dust magnet"'],
          ],
        },
        { type: 'heading', level: 3, text: '3.1 Troubleshooting flow' },
        {
          type: 'orderedList',
          items: [
            'Identify contamination on surface → YES → proceed to charge verification.',
            'Measure charge with static meter → > 5 kV → proceed to source identification.',
            'Is charge generated at demolding? → YES → optimize ejection and add ionization.',
            'Is charge generated during conveying? → YES → ground conveyors, add in-line ionizers.',
            'Is charge persistent (no decay)? → YES → material solution needed (anti-static additive).',
          ],
        },
      ],
    },
    {
      id: 'corrective-actions',
      title: '4. Mitigation & Prevention',
      blocks: [
        { type: 'heading', level: 3, text: '4.1 Material solutions' },
        {
          type: 'list',
          items: [
            'Internal anti-static agents (glycerol monostearate) — migrate to surface, absorb moisture, create dissipative layer.',
            'Conductive fillers (CNTs, carbon fibers) — create permanent grounded path for ESD-critical applications.',
          ],
        },
        { type: 'heading', level: 3, text: '4.2 Process optimization' },
        {
          type: 'list',
          items: [
            'Reduce ejection speed to minimize triboelectric charge generation.',
            'Maintain ambient humidity at 40–60% RH — natural charge dissipation.',
            'Optimize mold temperature to reduce thermal gradient at demolding.',
          ],
        },
        { type: 'heading', level: 3, text: '4.3 Active ionization (most effective quick fix)' },
        {
          type: 'list',
          items: [
            'At the mold face → neutralize parts as ejected.',
            'On the robot arm → neutralize during transfer.',
            'Above collection bin → prevent secondary charging from part-to-part contact.',
          ],
        },
        { type: 'heading', level: 3, text: '4.4 Common pitfalls' },
        {
          type: 'table',
          columns: ['Pitfall', 'Consequence', 'Best Practice'],
          rows: [
            ['Grounding insulative polymer', 'Charge is trapped; grounding does nothing', 'Use ionization, not grounding, for insulative materials'],
            ['Neutralizing too early', 'Charge regenerates on non-ionized conveyors', 'Neutralize at last possible stage before packaging'],
            ['Ignoring humidity', 'Low humidity amplifies static 5–10×', 'Maintain 40–60% RH in production area'],
          ],
        },
      ],
    },
  ],
  references: [
    { id: 'R1', text: 'Fraser Antistatic. Static Control for Cleanroom Injection Moulding.' },
    { id: 'R2', text: 'KEYENCE America. Contamination Inside Headlamps — Automotive Industry.' },
    { id: 'R3', text: 'Entec Polymers. Troubleshooting Guide for Injection Molding.' },
    { id: 'R4', text: 'On Drug Delivery. Effects of Static on Plastics Used in Drug Delivery Devices.' },
  ],
};
