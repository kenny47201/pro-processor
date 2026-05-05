import type { DefectGuide } from './defectGuides';
import bossFlashCrossSection from '@/assets/boss-flash-cross-section.jpg';
import bossFlashDesignRules from '@/assets/boss-flash-design-rules.jpg';

export const bossFlashGuide: DefectGuide = {
  slug: 'boss-flash',
  title: 'Boss Flash',
  summary:
    'Extraneous thin layer of solidified plastic at boss-core pin interfaces caused by seal failure under high cavity pressure. Affects fastener fit, assembly, and dimensional stability.',
  category: 'Dimensional',
  severity: 'medium',
  tags: ['flash', 'boss', 'core pin', 'clamp force', 'shut-off', 'hot runner', 'cold runner', 'parting line'],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A boss is a localized, typically cylindrical protrusion on a molded part designed for strength, alignment, or mechanical fastening. Boss flash is a specific type of flash localized at the interface where the core pin — which forms the interior diameter of the boss — seals against the main cavity steel. This location constitutes a specialized, high-stress shut-off area.',
        },
        {
          type: 'image',
          src: bossFlashCrossSection,
          alt: 'Cross-section of a boss with core pin showing flash formation at the shut-off interface between core pin and cavity steel',
          figureNumber: 'Figure 1',
          caption: 'Boss flash formation: Cross-section showing the core pin / cavity steel shut-off interface where flash forms when internal melt pressure exceeds the localized mechanical resistance of the seal. Flash appears as a thin film at the base or tip of the boss interior.',
        },
        { type: 'heading', level: 3, text: '1.1 Functional & aesthetic consequences' },
        {
          type: 'list',
          items: [
            'Functional impairment: flash around a boss compromises critical dimensional stability for assembly — prevents proper fastener threading, interferes with heat staking, and misaligns mating components.',
            'Increased cost and waste: necessitates secondary operations — manual trimming, vibratory finishing, or cryogenic deflashing.',
          ],
        },
        { type: 'heading', level: 3, text: '1.2 Cold runner vs hot runner context' },
        {
          type: 'table',
          columns: ['Runner System', 'Flash Characteristics'],
          rows: [
            ['Cold Runner', 'Flash from primary mold parting line, vent gaps, or clearances around moving components as high injection pressure forces mold halves apart slightly'],
            ['Hot Runner', 'All mechanical flash sources plus thermal leakage or drooling from hot nozzle tip seal or valve pin failure — requires thermal and electrical system diagnostics'],
          ],
        },
      ],
    },
    {
      id: 'root-causes',
      title: '2. Root Causes & Mechanics',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'Fundamental principle',
          text:
            'Flash results from a condition where internal melt pressure (P_Internal) exceeds localized mechanical resistance of the mold (P_External). This is driven by tooling, machine, and process factors.',
        },
        { type: 'heading', level: 3, text: '2.1 Tooling & mold mechanical deficiencies' },
        {
          type: 'list',
          items: [
            'Insufficient shut-off integrity and wear — physical damage (denting, abrasion) to parting line or core pin shut-off surfaces.',
            'Ejector and core pin clearance — tolerance gap between pins and their corresponding bores exceeds the material\'s flash gap threshold.',
            'Mold deflection under injection pressure — insufficient plate rigidity causes micro-flexing that opens seal gaps.',
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Machine factors' },
        {
          type: 'list',
          items: [
            'Insufficient clamp tonnage — mold separation under injection pressure.',
            'Platen parallelism — uneven clamping creates localized low-force zones.',
            'Tie bar stretch differential — worn tie bars create uneven clamp distribution.',
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Process factors' },
        {
          type: 'list',
          items: [
            'Excessive injection pressure or velocity.',
            'Over-packing during hold phase.',
            'High melt temperature reducing viscosity beyond tool design capability.',
            'V→P transfer too late, allowing pressure spikes at end of fill.',
          ],
        },
        { type: 'heading', level: 3, text: '2.4 Hot runner specific causes' },
        {
          type: 'list',
          items: [
            'Valve pin wear or misalignment — incomplete gate seal.',
            'Nozzle tip temperature too high — drooling or stringing at gate.',
            'Controller malfunction — unintended heating or valve timing errors.',
          ],
        },
      ],
    },
    {
      id: 'diagnostics',
      title: '3. Diagnostic Techniques',
      blocks: [
        { type: 'heading', level: 3, text: '3.1 Process diagnostics' },
        {
          type: 'list',
          items: [
            'Short shot study: gradually increase fill to observe where flash initiates.',
            'Pressure-only test (no pack/hold): determines if flash occurs during fill or pack phase.',
            'Cavity pressure monitoring: peak pressure at boss location identifies local over-pressure.',
          ],
        },
        { type: 'heading', level: 3, text: '3.2 Tooling diagnostics' },
        {
          type: 'list',
          items: [
            'Blue check (witness mark) on parting line and shut-off surfaces.',
            'Core pin diameter measurement vs. specification.',
            'Mold deflection analysis under rated clamp tonnage.',
          ],
        },
      ],
    },
    {
      id: 'corrective-actions',
      title: '4. Corrective & Preventive Actions',
      blocks: [
        { type: 'heading', level: 3, text: '4.1 Process corrections' },
        {
          type: 'list',
          items: [
            'Reduce pack pressure and/or hold time incrementally.',
            'Lower injection speed (especially near end of fill).',
            'Optimize V→P switchover position to prevent over-packing.',
            'Reduce melt temperature if within material window.',
          ],
        },
        { type: 'heading', level: 3, text: '4.2 Hot runner specific corrections' },
        {
          type: 'list',
          items: [
            'Inspect and replace valve pin and seat components.',
            'Verify nozzle tip temperature matches material specification.',
            'Check valve timing sequence and controller calibration.',
          ],
        },
        { type: 'heading', level: 3, text: '4.3 Tooling corrections' },
        {
          type: 'list',
          items: [
            'Re-machine parting line and shut-off surfaces to restore seal.',
            'Replace worn core pins — verify diameter and concentricity.',
            'Add support pillars under boss areas to reduce plate deflection.',
          ],
        },
        {
          type: 'image',
          src: bossFlashDesignRules,
          alt: 'Comparison of incorrect solid boss design versus correct cored-out hollow boss design showing the 0.6T wall thickness rule and proper draft angle',
          figureNumber: 'Figure 2',
          caption: 'Boss DfM design rules: INCORRECT — solid boss with wall equal to adjacent wall causes flash and sink marks. CORRECT — cored-out hollow boss with wall ≤ 60% of adjacent wall (0.6T rule), minimum 0.5° draft per side for reliable shut-off.',
        },
        { type: 'heading', level: 3, text: '4.4 DfM guidelines for bosses' },
        {
          type: 'list',
          items: [
            'Boss wall thickness ≤ 60% of adjacent nominal wall.',
            'Core pin draft ≥ 0.5° per side for reliable shut-off.',
            'Locate bosses away from parting line when possible.',
            'Consider cored-out hollow boss designs to reduce local pressure.',
          ],
        },
      ],
    },
  ],
  references: [
    { id: 'R1', text: 'Plastics Engineering. Intro to Plastics: Flash in Injection Molding.' },
    { id: 'R2', text: 'Team PTI. Glossary of Injection Molding Terms — Boss.' },
    { id: 'R3', text: 'ACO Mold. Hot Runner vs Cold Runner: Exploring the Pros and Cons.' },
    { id: 'R4', text: 'Protolabs. Injection Molding Design Guide — Boss Design.' },
    { id: 'R5', text: 'FUTEK. Injection Molding Force Feedback Applications.' },
  ],
};
