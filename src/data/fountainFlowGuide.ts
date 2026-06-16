import type { GuideBlock } from './defectGuides';

import fountainFlowPreparation from '@/assets/fountain-flow-preparation.png';
import fountainFlowRunnerComparison from '@/assets/fountain-flow-runner-comparison.png';
import fountainFlowPressSettings from '@/assets/fountain-flow-press-settings.png';

export interface KnowledgeGuide {
  slug: string;
  title: string;
  summary: string;
  sections: { id: string; title: string; blocks: GuideBlock[] }[];
}

export const fountainFlowGuide: KnowledgeGuide = {
  slug: 'fountain-flow',
  title: 'Fountain Flow',
  summary:
    'A comprehensive guide to understanding, preparing for, and optimizing fountain flow in injection molding — covering preparation checklists, runner system comparisons, and press settings.',
  sections: [
    /* ── Section 1: Preparing for Good Fountain Flow ── */
    {
      id: 'preparation',
      title: '1. Preparing for Good Fountain Flow',
      blocks: [
        {
          type: 'paragraph',
          text: 'Good fountain flow begins before the press ever starts. Proper material, mold, machine, and process setup preparation ensures a stable, symmetrical advancing melt front that produces consistent, high-quality parts.',
        },
        { type: 'heading', level: 3, text: '1.1 Before You Start the Press' },
        {
          type: 'paragraph',
          text: 'A disciplined pre-molding checklist addresses four key preparation areas. Skipping any of these increases the risk of flow instability, cosmetic defects, and dimensional variation.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Material Preparation',
        },
        {
          type: 'list',
          items: [
            'Correct resin — verify the exact grade, color, and lot specified on the work order.',
            'Dryness when required — hygroscopic resins (nylon, PC, PET, ABS) must be dried to manufacturer specifications. Moisture causes splay, bubbles, and flow-front disruption.',
            'Consistent lot / additives / regrind — ensure uniform blend ratios. Lot-to-lot viscosity variation changes fountain flow behavior.',
            'Contamination control — purge thoroughly between material changes and inspect hoppers, loaders, and feed throats for cross-contamination.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Mold Preparation',
        },
        {
          type: 'list',
          items: [
            'Correct mold temperature — verify water temperatures, flow rates, and that circuits are connected to the correct zones.',
            'Good venting — clean and inspect vents. Blocked vents cause hesitation marks, burns, and incomplete fill.',
            'Clean gates and runners — remove residual material from cold runner systems; verify hot runner tip condition.',
            'Cooling circuit function — confirm flow through all circuits. Use a flow meter or feel test to catch blocked or bypassed lines.',
            'Cavity-to-cavity balance checks — short-shot studies confirm balanced fill before production.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Machine Preparation',
        },
        {
          type: 'list',
          items: [
            'Stable screw recovery — consistent plasticating ensures uniform melt temperature and viscosity shot to shot.',
            'Check non-return valve performance — a worn or damaged check ring causes shot-to-shot variation in cushion and transfer pressure.',
            'Consistent shot size / cushion — verify that cushion is stable within ±0.5 mm across multiple shots.',
            'Verify transfer repeatability — the V/P transfer point must repeat consistently to maintain fountain flow stability at the fill-to-pack transition.',
            'Sensor / controller readiness — ensure cavity pressure sensors, thermocouples, and process monitoring systems are functional and calibrated.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Process Setup Preparation',
        },
        {
          type: 'list',
          items: [
            'Choose a realistic fill time target — base this on wall thickness, flow length, and material data, not arbitrary speed settings.',
            'Establish melt temperature window — use manufacturer-recommended melt temps as starting points and verify with pyrometer readings.',
            'Confirm gate seal / pack strategy — understand when the gate seals and set pack time accordingly to avoid under- or over-packing.',
            'Define acceptable surface criteria — know the surface quality requirements (Class A, textured, functional) before dialing in the process.',
          ],
        },
        { type: 'heading', level: 3, text: '1.2 What Ideal Fountain Flow Looks Like' },
        {
          type: 'paragraph',
          text: 'In ideal fountain flow, the melt advances with a smooth, symmetrical front. The hot core material flows forward through the center of the cavity, then rolls outward toward the cooler cavity walls where it freezes into a uniform skin layer. This creates a consistent skin-core structure throughout the part.',
        },
        {
          type: 'list',
          items: [
            'Stable front — smooth, symmetrical advancing melt front with no irregularities.',
            'Uniform skin-core structure — consistent frozen skin with a balanced hot core throughout the cross-section.',
            'Balanced fill — even wall contact across the cavity with no racing or lagging regions.',
            'Low hesitation — continuous, uninterrupted flow front movement with no pauses that could create visible marks.',
            'Predictable orientation — consistent molecular alignment pattern that results in uniform shrinkage and mechanical properties.',
          ],
        },
        { type: 'heading', level: 3, text: '1.3 What Poor Fountain Flow Looks Like' },
        {
          type: 'paragraph',
          text: 'When fountain flow is disrupted, the melt front becomes irregular and unpredictable. Instead of a smooth, rolling advancement, the flow front breaks up, hesitates, or advances unevenly. This produces a wide range of visible and structural defects.',
        },
        {
          type: 'list',
          items: [
            'Hesitation — flow front stalls in thin sections or far from the gate, creating visible marks.',
            'Jetting — melt streams into the cavity without forming a proper flow front, leaving snake-like patterns.',
            'Uneven skin thickness — variable frozen layer leads to differential shrinkage and warpage.',
            'Gloss variation — inconsistent surface replication creates matte and glossy patches.',
            'Flow marks — visible lines on the surface from irregular melt front advancement.',
            'Weld-line weakness — when split flow fronts rejoin with insufficient temperature and pressure, mechanical integrity suffers.',
            'Unbalanced fill — one side or section fills before others, causing overpacking and flash in some areas while others are short.',
            'Stress / warpage risk — non-uniform molecular orientation locks in residual stress that manifests as warpage or premature failure.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Key Takeaway',
          text: 'The best fountain flow is not dramatic — it is smooth, repeatable, balanced, and invisible except through the quality it creates.',
        },
        { type: 'heading', level: 3, text: '1.4 In a Perfect World' },
        {
          type: 'paragraph',
          text: 'When all preparation steps are followed and the process is optimized, the following conditions are achieved:',
        },
        {
          type: 'list',
          items: [
            'Balanced thermal conditions across the mold.',
            'Correct fill speed matched to material and geometry.',
            'Controlled shear within the material\'s processing window.',
            'Repeatable transfer from fill to pack every cycle.',
            'Good venting allowing air to escape ahead of the flow front.',
            'Uniform cooling with no hot spots or cold spots.',
            'Stable cavity pressure behavior throughout the pack phase.',
            'Consistent part appearance and dimensions shot after shot.',
          ],
        },
        {
          type: 'image',
          src: fountainFlowPreparation,
          alt: 'Infographic showing preparation checklist for good fountain flow, ideal vs poor fountain flow, and best practice takeaways.',
          figureNumber: 'Figure 1',
          caption: 'Preparing for Good Fountain Flow — Pre-molding checklist, ideal vs. poor fountain flow characteristics, and best-practice takeaways.',
        },
      ],
    },
    /* ── Section 2: Cold Runner vs Hot Runner vs Stack Mold ── */
    {
      id: 'runner-comparison',
      title: '2. Fountain Flow: Cold Runner vs Hot Runner vs Stack Mold',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'Core Principle',
          text: 'Fountain flow occurs in all three mold types during filling; the core mechanism is the same, but thermal history, pressure loss, residence behavior, and balance challenges differ.',
        },
        { type: 'heading', level: 3, text: '2.1 How Fountain Flow Behaves in Each System' },
        {
          type: 'heading',
          level: 3,
          text: 'Cold Runner',
        },
        {
          type: 'list',
          items: [
            'Melt enters cooler gate/runner system, losing heat before reaching the cavity.',
            'Hotter core moves forward while cooler layers freeze on the walls and roll outward.',
            'Classic fountain flow with added thermal losses through the sprue and runner.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Hot Runner',
        },
        {
          type: 'list',
          items: [
            'Melt arrives hotter and more uniform at the gate (when balanced correctly).',
            'Classic fountain flow in the cavity with less thermal history impact from the delivery system.',
            'Gate/tip temperature control is critical to flow-front quality.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Stack Mold',
        },
        {
          type: 'list',
          items: [
            'Same fountain-flow mechanism occurs in each cavity plane.',
            'Upper and lower cavities can differ in thermal and flow conditions due to different flow path lengths.',
            'Balance across levels and cavities is the primary challenge.',
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Main Sensitivities' },
        {
          type: 'table',
          caption: 'Key Sensitivities by Runner System',
          columns: ['Factor', 'Cold Runner', 'Hot Runner', 'Stack Mold'],
          rows: [
            [
              'Heat loss',
              'Added heat loss through sprue/runner',
              'Gate/tip temperature control is critical',
              'Injection rate, clamp, and thermal balance must be tightly controlled',
            ],
            [
              'Pressure',
              'More pressure loss through cold channels',
              'Manifold-to-gate thermal balance',
              'Pressure drop through stack/valves',
            ],
            [
              'Residence',
              'Stronger sensitivity to runner balance',
              'Shear and residence time in runner',
              'Very sensitive to small imbalances',
            ],
            [
              'Additional',
              'Regrind strategy and temperature windows',
              'Risk of stringing/drool if too hot; sensitive to tip design and dwell',
              'Balance across levels is critical',
            ],
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Most Important Processing Focus' },
        {
          type: 'heading',
          level: 3,
          text: 'Cold Runner Processing Focus',
        },
        {
          type: 'list',
          items: [
            'Control melt temperature at machine.',
            'Minimize heat loss (insulation, short runners).',
            'Balance sprue/runner/gates for even fill.',
            'Manage regrind percentage and dry time.',
            'Use adequate injection pressure to overcome losses.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Hot Runner Processing Focus',
        },
        {
          type: 'list',
          items: [
            'Dial-in manifold and gate temperatures for stable flow.',
            'Maintain thermal balance across drops.',
            'Minimize residence time and shear.',
            'Monitor for stringing/drool.',
            'Control injection speed for balanced fill.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Stack Mold Processing Focus',
        },
        {
          type: 'list',
          items: [
            'Balance all cavities and levels.',
            'Match temperatures top to bottom.',
            'Control injection speed and profile.',
            'Maintain sufficient clamp force.',
            'Verify valve/gate timing and sealing.',
            'Use robust process window.',
          ],
        },
        { type: 'heading', level: 3, text: '2.4 Typical Risks If Poorly Controlled' },
        {
          type: 'table',
          caption: 'Common Defect Risks by Runner System',
          columns: ['Cold Runner', 'Hot Runner', 'Stack Mold'],
          rows: [
            ['Short shots', 'Stringing or drool', 'Fill imbalance top vs. bottom'],
            ['Flow/appearance variation', 'Gate seal-off / hesitation', 'Short shots in second level'],
            ['Sink marks (from cooler gates and longer fill)', 'Color or gloss variation', 'Warpage from differential cooling'],
            ['Runner scrap and regrind issues', 'Burns/degradation (excess heat or residence)', 'Flash from clamp or imbalance'],
            ['Warpage from non-uniform cooling', 'Tip leakage / contamination', 'Cycle time variability'],
          ],
        },
        { type: 'heading', level: 3, text: '2.5 Shared Fundamentals' },
        {
          type: 'paragraph',
          text: 'Regardless of runner system, all three share the same fundamental fountain flow physics:',
        },
        {
          type: 'list',
          items: [
            'Advancing flow front — melt moves forward with a characteristic rolling motion.',
            'Skin-core formation — frozen outer layer with hot flowing core.',
            'Wall cooling — heat extraction through the cavity walls shapes the frozen layer.',
            'Molecular orientation — flow direction and cooling rate determine molecular alignment.',
            'Strong influence on appearance and properties — surface finish, strength, and dimensional stability all depend on fountain flow quality.',
          ],
        },
        { type: 'heading', level: 3, text: '2.6 Key Processing Differences' },
        {
          type: 'table',
          caption: 'Processing Differences by Runner System',
          columns: ['Focus Area', 'Cold Runner', 'Hot Runner', 'Stack Mold'],
          rows: [
            ['Thermal Management', 'Minimize losses (preheat, insulation)', 'Tight temp control (manifold & tips)', 'Match temps across levels'],
            ['Pressure / Flow Loss', 'Highest (more losses)', 'Lower (optimized path)', 'Moderate to High (stack & valves)'],
            ['Balance Challenge', 'Runner + gate balance critical', 'Drop-to-drop balance critical', 'Across cavities and levels'],
            ['Waste / Scrap', 'Runner scrap and regrind', 'Minimal runner waste', 'Minimal runner waste'],
            ['Process Control Priority', 'Temp at machine, pressure, balance', 'Gate tip temp, residence, balance', 'Injection rate, clamp, thermal balance'],
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Best-Practice Summary',
          text: 'Control temperature balance, fill consistency, and cavity-to-cavity balance to keep fountain flow stable regardless of runner system.',
        },
        {
          type: 'image',
          src: fountainFlowRunnerComparison,
          alt: 'Infographic comparing fountain flow behavior across cold runner, hot runner, and stack mold systems with diagrams and processing differences.',
          figureNumber: 'Figure 2',
          caption: 'Fountain Flow: Cold Runner vs Hot Runner vs Stack Mold — Side-by-side comparison of flow behavior, sensitivities, and processing strategy.',
        },
      ],
    },
    /* ── Section 3: Press Settings That Affect Fountain Flow ── */
    {
      id: 'press-settings',
      title: '3. Press Settings That Affect Fountain Flow',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'Definition',
          text: 'Fountain flow is always present during filling; settings do not turn it on or off — they control how stable, uniform, and beneficial it becomes.',
        },
        { type: 'heading', level: 3, text: '3.1 Primary Press Settings' },
        {
          type: 'paragraph',
          text: 'Each press setting affects the flow front in predictable ways. Understanding these relationships is essential for systematic troubleshooting and process optimization.',
        },
        {
          type: 'table',
          caption: 'Primary Press Settings and Their Effects on Fountain Flow',
          columns: ['Setting', 'When Increased ↑', 'When Decreased ↓', 'Effect on Fountain Flow & Part Results'],
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
              'Later transfer · More fill-pack overlap · More material packed',
              'Earlier transfer · Less fill-pack overlap · Voids / sinks risk',
              'Later transfer improves packing and reduces sinks; too late can overpack and cause flash.',
            ],
            [
              'Pack / hold pressure and hold time',
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
              'Shot size and cushion consistency',
              'Adequate cushion · Consistent shot volume · Stable fill',
              'Low / inconsistent cushion · Variable shot volume · Inconsistent fill',
              'Consistent shot size and cushion improve fill stability, transfer repeatability, and part consistency.',
            ],
          ],
        },
        { type: 'heading', level: 3, text: '3.2 How Fill Speed Changes the Advancing Flow Front' },
        {
          type: 'paragraph',
          text: 'Fill speed is one of the most direct levers for fountain flow quality. It simultaneously affects shear at the flow front, frozen layer thickness, molecular orientation, and hesitation risk.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Higher Fill Speed (Increased)',
        },
        {
          type: 'list',
          items: [
            'More shear at the flow front.',
            'Thinner frozen layer — the skin has less time to solidify before being pushed outward.',
            'Stronger orientation — molecular chains align more with flow direction.',
            'Better front stability — continuous flow reduces hesitation.',
            'Lower hesitation risk — front advances more consistently.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Lower Fill Speed (Decreased)',
        },
        {
          type: 'list',
          items: [
            'Lower shear at the flow front.',
            'Thicker frozen layer — more time for skin solidification.',
            'Higher hesitation risk — flow front may stall in thin sections.',
            'Less uniform flow — front can become irregular.',
            'Possible short shot — if speed is too low, the melt may freeze before filling the cavity.',
          ],
        },
        { type: 'heading', level: 3, text: '3.3 What Changes in the Part' },
        {
          type: 'paragraph',
          text: 'Fountain flow quality directly affects multiple part attributes. When press settings are optimized for stable fountain flow, the following part characteristics improve:',
        },
        {
          type: 'list',
          items: [
            'Surface finish — smoother, more consistent replication of the mold surface.',
            'Gloss — uniform gloss levels across the part surface.',
            'Flow marks — eliminated or minimized when flow front is stable.',
            'Weld-line quality — stronger weld lines when flow fronts meet at higher temperatures.',
            'Fiber orientation — more predictable in filled materials, improving mechanical performance.',
            'Dimensional consistency — uniform shrinkage from balanced flow and packing.',
            'Residual stress — reduced internal stress from even cooling and orientation.',
            'Warpage — minimized when thermal and flow conditions are symmetrical.',
            'Mechanical strength — optimized molecular and fiber orientation enhances load-bearing capability.',
          ],
        },
        { type: 'heading', level: 3, text: '3.4 Most Direct Process Levers' },
        {
          type: 'paragraph',
          text: 'When troubleshooting fountain flow issues, prioritize these settings in order of impact:',
        },
        {
          type: 'orderedList',
          items: [
            'Fill speed / injection rate — the single most influential setting on flow-front behavior.',
            'Melt temperature — controls viscosity and thermal energy available at the flow front.',
            'Mold temperature — governs skin formation rate and surface replication.',
            'V/P transfer position — determines the fill-to-pack transition quality.',
            'Pack / hold stability — maintains density and compensates for volumetric shrinkage.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Operator Takeaway',
          text: 'Stable fountain flow comes from stable filling conditions; optimize the front, not just the pressure number.',
        },
        {
          type: 'image',
          src: fountainFlowPressSettings,
          alt: 'Infographic showing how press settings affect fountain flow including fill speed, temperatures, pressures, and their effects on part quality.',
          figureNumber: 'Figure 3',
          caption: 'Press Settings That Affect Fountain Flow — How machine settings change flow-front behavior, skin formation, orientation, and part quality.',
        },
      ],
    },
  ],
};
