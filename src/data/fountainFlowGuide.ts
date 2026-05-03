import type { DefectGuide } from './defectGuides';
import fountainFlowPreparation from '@/assets/fountain-flow-preparation.png';
import fountainFlowRunnerComparison from '@/assets/fountain-flow-runner-comparison.png';
import fountainFlowPressSettings from '@/assets/fountain-flow-press-settings.png';

export const fountainFlowGuide: DefectGuide = {
  slug: 'fountain-flow',
  title: 'Fountain Flow',
  summary:
    'How melt fountain flow works during filling, how press settings affect it, and how to prepare for stable, repeatable flow across cold runner, hot runner, and stack mold systems.',
  category: 'Process Fundamentals',
  severity: 'medium',
  tags: [
    'fountain flow',
    'fill speed',
    'melt temperature',
    'mold temperature',
    'flow front',
    'skin formation',
    'cold runner',
    'hot runner',
    'stack mold',
    'orientation',
    'hesitation',
  ],
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Fountain flow is the fundamental melt-front behavior during the filling phase of injection molding. As plastic enters the cavity, the hotter core material advances forward and rolls outward toward the cooler mold walls, creating a "fountain" pattern. This mechanism controls skin formation, molecular orientation, weld-line quality, surface finish, and dimensional stability. Understanding fountain flow is essential to diagnosing a wide range of cosmetic and structural defects.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Definition',
          text:
            'Fountain flow is always present during filling; settings do not turn it on or off — they control how stable, uniform, and beneficial it becomes.',
        },
      ],
    },
    {
      id: 'preparing-for-good-flow',
      title: 'Preparing for Good Fountain Flow',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Stable fountain flow requires preparation across four domains before the press starts: material, mold, machine, and process setup. The infographic below outlines what to check in each area, what ideal fountain flow looks like, and what poor flow symptoms indicate.',
        },
        {
          type: 'image',
          src: fountainFlowPreparation,
          alt: 'Infographic: Preparing for Good Fountain Flow — checklists for material, mold, machine, and process preparation; ideal vs. poor fountain flow visuals',
          figureNumber: 'Figure 1',
          caption:
            'Preparing for Good Fountain Flow. Section A covers pre-press checklists for material preparation (correct resin, dryness, regrind control), mold preparation (temperature, venting, gates/runners, cavity balance), machine preparation (screw recovery, NRV, shot size, transfer repeatability), and process setup (fill time target, melt window, gate freeze confirmation). Section B illustrates ideal fountain flow with a stable front, uniform skin-core structure, balanced fill, low hesitation, and predictable orientation. Section C contrasts poor flow showing hesitation, jetting, uneven skin thickness, gloss variation, flow marks, weld-line weakness, unbalanced fill, and stress/warpage risk. Section D lists the ideal conditions: balanced thermal conditions, correct fill speed, controlled shear, repeatable transfer, good venting, uniform cooling, stable cavity pressure, and consistent part appearance.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Before You Start the Press',
        },
        {
          type: 'table',
          columns: ['Material Prep', 'Mold Prep', 'Machine Prep', 'Process Setup'],
          rows: [
            ['Correct resin', 'Correct mold temperature', 'Stable screw recovery', 'Realistic fill time target'],
            ['Dryness when required', 'Good venting', 'Check NRV performance', 'Establish melt temp window'],
            ['Consistent lot / additives / regrind', 'Clean gates and runners', 'Consistent shot size / cushion', 'Confirm gate freeze / pack strategy'],
            ['Contamination control', 'Cooling circuit function', 'Verify transfer repeatability', 'Define acceptable surface criteria'],
            ['', 'Cavity-to-cavity balance checks', 'Sensor / controller readiness', ''],
          ],
          caption: 'Pre-press checklist organized by domain.',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Final Takeaway',
          text:
            'The best fountain flow is not dramatic — it is smooth, repeatable, balanced, and invisible except through the quality it creates.',
        },
      ],
    },
    {
      id: 'press-settings',
      title: 'Press Settings That Affect Fountain Flow',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Nine primary press settings directly influence fountain flow behavior, skin formation, molecular orientation, and part quality. The infographic below maps how increasing or decreasing each parameter changes the advancing flow front and the resulting part characteristics.',
        },
        {
          type: 'image',
          src: fountainFlowPressSettings,
          alt: 'Infographic: Press Settings That Affect Fountain Flow — table of 9 parameters with increase/decrease effects and flow-front diagrams',
          figureNumber: 'Figure 2',
          caption:
            'Press Settings That Affect Fountain Flow. The table covers Fill Speed / Injection Rate, Melt Temperature, Mold Temperature, Injection Pressure Limit, V/P Transfer Position, Pack/Hold Pressure and Hold Time, Screw Recovery Back Pressure, Screw RPM / Recovery Rate, and Shot Size / Cushion Consistency. Each row shows what happens when the setting is increased vs. decreased, and the net effect on fountain flow and part results. The bottom section illustrates how higher fill speed creates more shear, thinner frozen layer, and stronger orientation vs. lower fill speed with thicker frozen layer and higher hesitation risk.',
        },
        {
          type: 'table',
          columns: ['Setting', 'When Increased ↑', 'When Decreased ↓', 'Effect on Flow & Part'],
          rows: [
            [
              'Fill speed / injection rate',
              'Higher shear at front · Thinner frozen layer · Stronger fountain flow',
              'Lower shear at front · Thicker frozen layer · Higher hesitation risk',
              'Higher speed improves flow-front stability and orientation but can increase stress and burn risk.',
            ],
            [
              'Melt temperature',
              'Lower viscosity · Easier flow · Hotter core',
              'Higher viscosity · Harder flow · Cooler core',
              'Higher melt temp improves flow and surface; too high can degrade material and increase flash.',
            ],
            [
              'Mold temperature',
              'Slower skin formation · Thinner frozen layer · More uniform front',
              'Faster skin formation · Thicker frozen layer · Less uniform front',
              'Higher mold temp improves surface finish and reduces hesitation; too high can extend cycle time.',
            ],
            [
              'Injection pressure limit',
              'Higher driving force · Pushes front harder · Reduces hesitation',
              'Less driving force · More hesitation · Short fills risk',
              'Adequate pressure prevents hesitation; excess can cause flash, high stress, and tool wear.',
            ],
            [
              'V/P transfer position',
              'Later transfer · More fill–pack overlap · More material packed',
              'Earlier transfer · Less fill–pack overlap · Voids / sinks risk',
              'Later transfer improves packing and reduces sinks; too late can overpack and cause flash.',
            ],
            [
              'Pack / hold pressure & time',
              'More packing force · More time to pack · Reduce sinks & voids',
              'Less packing force · Less time to pack · Sinks & voids risk',
              'Adequate pack/hold builds stable core and maintains density.',
            ],
            [
              'Screw recovery back pressure',
              'Better melt homogenization · Consistent melt · Stable viscosity',
              'Less homogenization · Viscosity variation · Flow inconsistency',
              'Proper back pressure stabilizes melt quality and flow-front consistency.',
            ],
            [
              'Screw RPM / recovery rate',
              'More throughput · Faster recovery',
              'Less throughput · Slower recovery',
              'Match recovery to shot size for consistent fill and cycle time.',
            ],
            [
              'Shot size & cushion consistency',
              'Adequate cushion · Consistent shot volume · Stable fill',
              'Low / inconsistent cushion · Variable shot volume · Inconsistent fill',
              'Consistent shot size and cushion improve fill stability, transfer repeatability, and part consistency.',
            ],
          ],
          caption: 'Summary of how each primary press setting affects fountain flow and part quality.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Most Direct Process Levers',
        },
        {
          type: 'orderedList',
          items: [
            'Fill speed / injection rate',
            'Melt temperature',
            'Mold temperature',
            'V/P transfer position',
            'Pack / hold stability',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Operator Takeaway',
          text:
            'Stable fountain flow comes from stable filling conditions; optimize the front, not just the pressure number.',
        },
      ],
    },
    {
      id: 'runner-system-comparison',
      title: 'Fountain Flow: Cold Runner vs Hot Runner vs Stack Mold',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Fountain flow occurs in all three mold types during filling. The core mechanism is the same, but thermal history, pressure loss, residence behavior, and balance challenges differ significantly. Understanding these differences is critical for troubleshooting flow-related defects across different mold configurations.',
        },
        {
          type: 'image',
          src: fountainFlowRunnerComparison,
          alt: 'Infographic: Fountain Flow in Cold Runner vs Hot Runner vs Stack Mold — behavior, sensitivities, processing focus, and defect risks',
          figureNumber: 'Figure 3',
          caption:
            'Fountain Flow: Cold Runner vs Hot Runner vs Stack Mold. Compares how fountain flow behaves, main sensitivities, most important processing focus, and typical risks/defects for each runner system. Includes a shared-fundamentals summary (advancing flow front, skin-core formation, wall cooling, molecular orientation) and a key processing differences table across thermal management, pressure/flow loss, balance challenge, waste/scrap, and process control priority.',
        },
        {
          type: 'table',
          columns: ['Focus Area', 'Cold Runner', 'Hot Runner', 'Stack Mold'],
          rows: [
            [
              'Thermal Management',
              'Minimize losses (preheat, insulation)',
              'Tight temp control (manifold & tips)',
              'Match temps across levels',
            ],
            [
              'Pressure / Flow Loss',
              'Highest (more losses)',
              'Lower (optimized path)',
              'Moderate to High (stack & valves)',
            ],
            [
              'Balance Challenge',
              'Runner + gate balance critical',
              'Drop-to-drop balance critical',
              'Across cavities and levels',
            ],
            [
              'Waste / Scrap',
              'Runner scrap and regrind',
              'Minimal runner waste',
              'Minimal runner waste',
            ],
            [
              'Process Control Priority',
              'Temp at machine, pressure, balance',
              'Gate tip temp, residence, balance',
              'Injection rate, clamp, thermal balance',
            ],
          ],
          caption: 'Key processing differences by runner system type.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Typical Risks if Poorly Controlled',
        },
        {
          type: 'table',
          columns: ['Cold Runner', 'Hot Runner', 'Stack Mold'],
          rows: [
            ['Short shots', 'Stringing or drool', 'Fill imbalance top vs. bottom'],
            ['Flow / appearance variation', 'Gate freeze-off / hesitation', 'Short shots in second level'],
            ['Sink marks (cooler gates, longer fill)', 'Color or gloss variation', 'Warpage from differential cooling'],
            ['Runner scrap and regrind issues', 'Burns / degradation (excess heat or residence)', 'Flash from clamp or imbalance'],
            ['Warpage from non-uniform cooling', 'Tip leakage / contamination', 'Cycle time variability'],
          ],
          caption: 'Common defects by runner system when fountain flow is not properly managed.',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Best-Practice Summary',
          text:
            'Control temperature balance, fill consistency, and cavity-to-cavity balance to keep fountain flow stable regardless of runner system.',
        },
      ],
    },
    {
      id: 'what-changes-in-the-part',
      title: 'What Fountain Flow Changes in the Part',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Fountain flow directly influences several critical part characteristics. Understanding these effects helps connect process adjustments to measurable outcomes.',
        },
        {
          type: 'list',
          items: [
            'Surface finish and gloss',
            'Flow marks and weld-line quality',
            'Fiber orientation',
            'Dimensional consistency',
            'Residual stress',
            'Warpage',
            'Mechanical strength',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'In a Perfect World',
          text:
            'Balanced thermal conditions, correct fill speed, controlled shear, repeatable transfer, good venting, uniform cooling, stable cavity pressure behavior, and consistent part appearance and dimensions.',
        },
      ],
    },
  ],
  references: [
    {
      id: 'R1',
      text: 'Beaumont, J.P. — Runner and Gating Design Handbook, 3rd Ed.',
    },
    {
      id: 'R2',
      text: 'Rosato, D.V. & Rosato, D.V. — Injection Molding Handbook, 3rd Ed.',
    },
    {
      id: 'R3',
      text: 'Osswald, T.A. & Menges, G. — Materials Science of Polymers for Engineers, 3rd Ed.',
    },
    {
      id: 'R4',
      text: 'RJG Inc. — Systematic Molding & Decoupled Molding Principles.',
    },
  ],
};
