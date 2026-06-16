import type { KnowledgeGuide } from './fountainFlowGuide';

import morphologyPressSettings from '@/assets/morphology-press-settings.png';
import morphologyPreparation from '@/assets/morphology-preparation.png';
import morphologyRunnerComparison from '@/assets/morphology-runner-comparison.png';

export const morphologyGuide: KnowledgeGuide = {
  slug: 'injection-molding-morphology',
  title: 'Injection Molding Morphology',
  summary:
    'A comprehensive guide to understanding how thermal, shear, pressure, and cooling histories combine to determine part morphology — covering press settings, preparation, runner system comparisons, and troubleshooting.',
  sections: [
    /* ── Section 1: Four Histories, One Structure ── */
    {
      id: 'four-histories',
      title: '1. Four Histories, One Structure',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'Core Principle',
          text: 'Part morphology is not random — it is engineered. The structure you get is the result of the melt\'s thermal history, shear history, pressure history, and cooling history.',
        },
        { type: 'heading', level: 3, text: '1.1 The Four Histories' },
        {
          type: 'paragraph',
          text: 'Every injection-molded part\'s internal structure is shaped by four interdependent process histories. Understanding each one — and how they interact — is the foundation for controlling morphology.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Thermal History',
        },
        {
          type: 'paragraph',
          text: 'Heat input and removal control molecular mobility and crystal growth. The temperature profile the melt experiences from barrel to cavity determines how much time molecules have to organize.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Shear History',
        },
        {
          type: 'paragraph',
          text: 'Flow and shear align polymer chains and influence crystal orientation. The shear rate during filling determines molecular alignment in the skin and transition layers.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pressure History',
        },
        {
          type: 'paragraph',
          text: 'Packing and pressure maintain density and reduce voids. The pressure applied during packing compresses the melt, compensates for volumetric shrinkage, and influences final part density.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cooling History',
        },
        {
          type: 'paragraph',
          text: 'Heat extraction rate sets skin/core balance and frozen-in stress. Cooling rate controls how thick the frozen skin layer becomes, the degree of crystallinity, and the level of residual stress locked into the part.',
        },
        { type: 'heading', level: 3, text: '1.2 The Process-to-Structure Flow' },
        {
          type: 'orderedList',
          items: [
            'Thermal History — heat added and removed.',
            'Shear History — flow and shear in the cavity.',
            'Pressure History — packing and consolidation.',
            'Cooling History — heat removal and solidification.',
            'Morphology Outcomes — how the part behaves in service.',
          ],
        },
        { type: 'heading', level: 3, text: '1.3 Morphology Outcomes' },
        {
          type: 'paragraph',
          text: 'The combined effect of the four histories determines these measurable part characteristics:',
        },
        {
          type: 'list',
          items: [
            'Orientation / Anisotropy — molecular chain alignment direction and degree.',
            'Crystallinity — degree and uniformity of crystal structure (semi-crystalline resins).',
            'Skin / Core Balance — relative thickness and properties of frozen skin vs. molten core.',
            'Frozen-In Stress — residual stress locked in during cooling.',
            'Shrinkage — volumetric reduction as the part cools and solidifies.',
            'Warpage — distortion from non-uniform shrinkage or stress.',
            'Gloss / Appearance — surface finish quality and consistency.',
            'Sink / Void Tendency — surface depressions or internal voids from inadequate packing.',
            'Dimensional Stability — ability to hold specified dimensions over time and temperature.',
          ],
        },
      ],
    },
    /* ── Section 2: Press Settings That Shape Morphology ── */
    {
      id: 'press-settings',
      title: '2. Press Settings That Shape Morphology',
      blocks: [
        {
          type: 'paragraph',
          text: 'Each of the 14 primary press settings affects morphology in predictable ways. Understanding these cause-and-effect relationships enables systematic process optimization.',
        },
        { type: 'heading', level: 3, text: '2.1 Settings Matrix' },
        {
          type: 'table',
          caption: '14 Press Settings and Their Effects on Morphology',
          columns: ['#', 'Parameter', 'Increased (↑) Usually Causes...', 'Decreased (↓) Usually Causes...'],
          rows: [
            ['1', 'Melt Temperature (melt heat content)', 'Lower viscosity, more flow, more orientation, lower viscosity skin, lower stress. May lower crystallinity in some polymers.', 'Higher viscosity, less flow, more frozen-in stress, higher crystallinity. Potential short shots.'],
            ['2', 'Mold Temperature (cooling rate)', 'Slower cooling, thicker skin with lower orientation, higher crystallinity, higher gloss. May increase cycle.', 'Faster cooling, thinner skin, higher orientation, lower crystallinity, more frozen-in stress, lower gloss.'],
            ['3', 'Injection Speed / Fill Time (shear rate, orientation)', 'Higher orientation, thinner skin, higher stress, lower crystallinity, better replication at moderate levels.', 'Lower orientation, thicker skin, lower stress, higher crystallinity. Risk of hesitation marks if too low.'],
            ['4', 'Transfer Position (when packing starts)', 'Earlier pack: more pack time, lower voids, lower shrinkage, better sink control.', 'Later pack: less pack time, more voids, higher shrinkage, more sink tendency.'],
            ['5', 'Peak Injection Pressure (overcomes resistance)', 'Better fill of details, less hesitation, less flow imbalance.', 'Short shots, weld lines, flow imbalance, poor replication.'],
            ['6', 'Pack / Hold Pressure (density control)', 'Higher density, lower shrinkage and voids. Overpacking = higher stress, more sink.', 'Lower density, more shrinkage and voids, more sink tendency.'],
            ['7', 'Hold Time (time under pressure)', 'More time to pack, lower shrinkage, lower voids. Too long = higher stress, cycle time penalty.', 'Short pack time, more shrinkage and voids, more sink.'],
            ['8', 'Back Pressure (melt homogeneity)', 'More uniform melt, less streaks, fewer gels. Slightly higher melt temp, more shear heating.', 'Possible unmelted particles, streaks, inconsistent color and properties.'],
            ['9', 'Screw RPM / Recovery Rate (shear heat input)', 'More shear heating, lower viscosity, potential orientation increase. Higher throughput.', 'Lower shear heating, higher viscosity, less orientation.'],
            ['10', 'Decompression (relieve residual pressure)', 'Lower residual pressure, more consistent shots, less flash and drool.', 'Higher residual pressure, more drool, inconsistent shot size.'],
            ['11', 'Shot Size / Cushion (consistency buffer)', 'More cushion = consistent pack, stable part weight, fewer voids.', 'Too little cushion = inconsistent pack, shorted shots, voids.'],
            ['12', 'Cooling Time (heat removal)', 'Thicker solid layer, lower shrinkage change after ejection, better dimensional stability. Longer cycle.', 'Higher ejection temp, more warpage, more sink and shrinkage change.'],
            ['13', 'Clamp Condition (clamp force & parallelism)', 'Proper clamp & parallel = uniform cavity gap, consistent pack, less flash, better dimensional stability.', 'Low clamp or non-parallel = flash, uneven pack, distortion, variation.'],
            ['14', 'Process Consistency (all settings)', 'Stable, repeatable settings = uniform morphology, low variation, predictable performance.', 'Variation in any setting = variation in morphology and part performance.'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Important Note',
          text: 'Effects of these settings depend on polymer type, wall thickness, mold design, gate design, and runner system. Semi-crystalline materials such as PP show stronger crystallinity-related changes.',
        },
        { type: 'heading', level: 3, text: '2.2 What Bad Morphology Looks Like' },
        {
          type: 'paragraph',
          text: 'When press settings are not optimized, morphology-related defects appear. Each defect has characteristic causes and improvement strategies:',
        },
        {
          type: 'table',
          caption: 'Troubleshooting Matrix — Common Morphology Defects',
          columns: ['Defect', 'Typical Causes', 'Improve By'],
          rows: [
            ['Warped Part', 'Uneven cooling, high orientation gradient, uneven pack', 'Balance cooling, adjust pack/hold, adjust speed / mold temp'],
            ['Hazy or Uneven Appearance', 'High frozen-in stress, non-uniform cooling, contaminants', 'Lower speed or melt temp, increase mold temp, increase holding time'],
            ['Brittle at Gate Area', 'High orientation, high shear / fast fill, low mold temp', 'Lower speed, lower melt temp, increase mold temp'],
            ['Weak Weld Line', 'Low temp at meeting fronts, high speed, low pressure', 'Increase melt/mold temp, lower speed, increase pack pressure'],
            ['Inconsistent Shrinkage', 'Inconsistent pack, variable cushion, uneven cooling', 'Stabilize pack/hold, increase cushion, balance cooling'],
            ['Cavity-to-Cavity Variation', 'Uneven flow, uneven cooling, clamp / alignment issues', 'Balance flow & cooling, check clamp & parallelism, standardize settings'],
            ['High Stress Cracking Tendency', 'High frozen-in stress, overpacking, aggressive eject temperature', 'Lower speed / melt temp, reduce pack / hold, increase cooling'],
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Key Takeaway',
          text: 'Good morphology is a system. Understand the histories. Set the inputs. Control the outcomes. Right settings. Right structure. Right part. Every time.',
        },
        {
          type: 'image',
          src: morphologyPressSettings,
          alt: 'Infographic showing 14 press settings that shape morphology, the process-to-structure flow, and a troubleshooting matrix for common morphology defects.',
          figureNumber: 'Figure 1',
          caption: 'Press Settings That Build Morphology — How the four histories combine to determine part morphology, with a 14-parameter settings matrix and troubleshooting guide.',
        },
      ],
    },
    /* ── Section 3: Preparation and the Ideal State ── */
    {
      id: 'preparation',
      title: '3. Preparation & the Ideal State',
      blocks: [
        {
          type: 'paragraph',
          text: 'Morphology is shaped before the first shot is ever made. Seventeen preparation factors determine the starting conditions for the four histories.',
        },
        { type: 'heading', level: 3, text: '3.1 Before Molding: What Shapes Morphology Before the First Shot' },
        {
          type: 'heading',
          level: 3,
          text: 'Material Preparation (1–7)',
        },
        {
          type: 'orderedList',
          items: [
            'Correct Resin Selection — the right polymer grade and additives set the foundation for desired crystallinity, flow, and strength.',
            'Understand Morphology Type — know if the resin is amorphous or semi-crystalline; this determines how structure forms and responds.',
            'Drying & Moisture Control — remove moisture to prevent hydrolysis, voids, silver streaks, and loss of molecular weight.',
            'Material Lot Consistency — lot-to-lot consistency ensures repeatable melt viscosity, crystallization, and mechanical performance.',
            'Regrind Level Control — control regrind %, type, and history to avoid degradation and inconsistent morphology.',
            'Additive & Color Dispersion — uniform dispersion prevents agglomerates, weak spots, and inconsistent crystallization.',
            'Contamination Prevention — keep material and equipment clean; contaminants act as stress concentrators and flow disruptors.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Machine Preparation (8–9)',
        },
        {
          type: 'list',
          items: [
            'Correct Barrel Sizing — proper L/D and compression support homogeneous melting and consistent shear history.',
            'Proper Screw Design & Condition — the right geometry and wear condition deliver correct shear, mixing, and melt quality.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Mold & Process Preparation (10–17)',
        },
        {
          type: 'list',
          items: [
            'Nozzle Condition — a smooth, clean nozzle ensures uniform flow and prevents hesitation and drool.',
            'Verified Melt Temperature Profile — correct and stable temps control viscosity, orientation, and prevent degradation.',
            'Mold Temperature Controller Capability — accurate, stable control enables the right cooling rate, critical for crystallinity and orientation.',
            'Cooling Circuit Flow Balance — balanced flow and ΔT across the mold ensure uniform cooling and consistent morphology.',
            'Hot Runner Controller Verification — stable heat and sequencing prevent cold slugs, variation, and fountain flow inconsistencies.',
            'Venting & Gate Condition — proper venting and gate geometry prevent traps, burns, and inconsistent flow fronts.',
            'Mold Alignment & Mechanical Condition — parallel, aligned, and well-maintained molds prevent flash, uneven cooling, and stress.',
            'Scientific Molding Trials / DOE / Process Window Confirmation — use data to find the robust window that delivers ideal morphology and repeatable performance.',
          ],
        },
        { type: 'heading', level: 3, text: '3.2 What Ideal Morphology Looks Like' },
        {
          type: 'paragraph',
          text: 'In a perfect world, the part exhibits a symmetric skin–core–skin structure with uniform properties throughout:',
        },
        {
          type: 'list',
          items: [
            'Controlled, thin skin layer with uniform thickness.',
            'Controlled orientation in skin layers, parallel to flow.',
            'Balanced transition layer between skin and core.',
            'Fine, uniform crystal structure (for semi-crystalline materials).',
            'Minimal residual stress and distortion.',
            'Uniform cooling across thickness.',
            'Uniform left / right symmetry.',
          ],
        },
        { type: 'heading', level: 3, text: '3.3 How Ideal Morphology Manifests in the Part' },
        {
          type: 'list',
          items: [
            'Low warpage.',
            'Predictable shrinkage.',
            'Stable dimensions.',
            'Balanced mechanical properties.',
            'Consistent gate appearance.',
            'Uniform surface finish.',
            'Lower cracking tendency.',
            'Repeatable cavity-to-cavity quality.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Working Principle',
          text: 'Build morphology before the shot, shape it during filling and packing, and lock it in during cooling.',
        },
        {
          type: 'image',
          src: morphologyPreparation,
          alt: 'Infographic showing 17 preparation factors that shape morphology before the first shot, plus a cross-section of ideal symmetric skin-core-skin structure.',
          figureNumber: 'Figure 2',
          caption: 'Preparation and the Ideal State — 17 preparation factors and the ideal symmetric skin–core–skin structure.',
        },
      ],
    },
    /* ── Section 4: Cold Runner vs Hot Runner vs Stack Mold ── */
    {
      id: 'runner-comparison',
      title: '4. Cold Runner vs Hot Runner vs Stack Mold',
      blocks: [
        {
          type: 'paragraph',
          text: 'All three runner systems produce the same fundamental morphology (skin–transition–core), but the thermal history, shear conditions, and balance challenges differ significantly.',
        },
        { type: 'heading', level: 3, text: '4.1 System Overview' },
        {
          type: 'heading',
          level: 3,
          text: 'Cold Runner',
        },
        {
          type: 'list',
          items: [
            'Runner is part of the mold — melt cools in the runner before reaching the gate.',
            'Lower melt temperature at gate.',
            'Higher pressure loss through cold channels.',
            'Through-thickness morphology: cooler after runner travel.',
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
            'Melt stays molten to the gate — thermal control delivers hotter melt at gate.',
            'Lower pressure loss (optimized flow path).',
            'Shear concentrated at gate tip.',
            'Through-thickness morphology: hotter at gate area.',
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
            'Two or more molds in one press cycle — multiple parting planes.',
            'Each level can see different melt temperature depending on balance and cooling.',
            'Highest risk for variation by level and cavity.',
            'Through-thickness morphology: may vary by level & cavity depending on balance and cooling.',
          ],
        },
        { type: 'heading', level: 3, text: '4.2 Morphology Factor Comparison' },
        {
          type: 'table',
          caption: 'Morphology Factors by Runner System',
          columns: ['Factor', 'Cold Runner', 'Hot Runner', 'Stack Mold'],
          rows: [
            ['Melt Thermal History', 'Melt cools in runner. Lower melt temp at gate.', 'Thermal control to gate. Hotter melt at gate.', 'Each level can see different melt temp depending on balance and cooling.'],
            ['Residence Time', 'Longer (melt spends time in runner and gate).', 'Shorter (melt delivered directly to gate).', 'Varies by level; typically similar to hot runner but dependent on balance.'],
            ['Shear History', 'More shear in runner and at turns/changes in direction.', 'Lower shear in manifold if well designed; shear concentrated at gate tip.', 'Varies by level and flow path; imbalance increases shear in some cavities.'],
            ['Gate Seal Behavior', 'Gate cools quickly; higher risk of early freeze if cycle or runner temp is low.', 'Gate area stays hot; freeze occurs later in cavity. Hot gate can alter skin/core structure near gate.', 'Gate timing can differ between levels; risk of early freeze if imbalance exists.'],
            ['Pressure Loss', 'Higher due to runner length, turns, and cooler melt.', 'Lower pressure loss (optimized flow path).', 'Higher potential due to longer flow path to upper/lower levels.'],
            ['Balance Sensitivity', 'Moderate — affected by runner length and layout.', 'High — manifold balance and nozzle tip balance are critical.', 'Very High — flow balance between cavities and levels is critical.'],
            ['Cavity-to-Cavity Consistency', 'More variation possible with long or imbalanced runners.', 'Better consistency when hot runner is balanced and stable.', 'Most challenging — levels and cavities can vary if any imbalance or deflection occurs.'],
            ['Likely Morphology Variation', 'Higher — cooler melt at gate and pressure/flow variation create skin/core differences.', 'Lower — more uniform thermal history; gate heat can increase orientation near gate.', 'Highest risk — variation by level and cavity due to temperature, pressure, and cooling differences.'],
          ],
        },
        { type: 'heading', level: 3, text: '4.3 Biggest Differences Between Systems' },
        {
          type: 'list',
          items: [
            'Thermal Uniformity — how evenly the melt stays hot from barrel to gate.',
            'Balance — how evenly melt, pressure, and cooling are delivered to each cavity and level.',
            'Gate Condition — how hot/cold and stable the gate area is when melt enters the cavity.',
            'Cavity-to-Cavity Consistency — how similar the parts are from cavity to cavity (and level to level).',
          ],
        },
        { type: 'heading', level: 3, text: '4.4 How Processing Changes by System' },
        {
          type: 'heading',
          level: 3,
          text: 'Cold Runner Processing',
        },
        {
          type: 'paragraph',
          text: 'Settings needing tighter control:',
        },
        {
          type: 'list',
          items: [
            'Melt temperature (higher may be needed).',
            'Mold temperature (reduce to avoid freeze-off).',
            'Packing/pressure and time (offset pressure loss).',
          ],
        },
        {
          type: 'paragraph',
          text: 'Problems that most often distort morphology:',
        },
        {
          type: 'list',
          items: [
            'Cool melt at gate, early gate seal.',
            'Pressure loss from long/complex runners.',
            'Imbalance between cavities.',
          ],
        },
        {
          type: 'paragraph',
          text: 'What to monitor:',
        },
        {
          type: 'list',
          items: [
            'Runner and mold temperature.',
            'Gate seal time and fill balance.',
            'Part weight, pressure at switchover.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Hot Runner Processing',
        },
        {
          type: 'paragraph',
          text: 'Settings needing tighter control:',
        },
        {
          type: 'list',
          items: [
            'Manifold and nozzle temperatures.',
            'Tip temperature (each nozzle).',
            'Melt temperature (too hot can change structure).',
          ],
        },
        {
          type: 'paragraph',
          text: 'Problems that most often distort morphology:',
        },
        {
          type: 'list',
          items: [
            'Manifold or tip temperature imbalance.',
            'Overheating at gate (skin/orientation changes).',
            'Nozzle drool or leakage.',
          ],
        },
        {
          type: 'paragraph',
          text: 'What to monitor:',
        },
        {
          type: 'list',
          items: [
            'Manifold and tip temperatures.',
            'Pressure at the gate/nozzle.',
            'Part weight and appearance near gate.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Stack Mold Processing',
        },
        {
          type: 'paragraph',
          text: 'Settings needing tighter control:',
        },
        {
          type: 'list',
          items: [
            'Flow balance between cavities and levels.',
            'Mold temperature balance across levels.',
            'Packing/pressure for each level.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Problems that most often distort morphology:',
        },
        {
          type: 'list',
          items: [
            'Uneven flow/pressure between levels.',
            'Uneven cooling across plates.',
            'Platen deflection and mold temperature drift.',
          ],
        },
        {
          type: 'paragraph',
          text: 'What to monitor:',
        },
        {
          type: 'list',
          items: [
            'Per-level cavity pressure and fill balance.',
            'Cooling water temperature and flow per level.',
            'Part weight, dimensions, and visual differences.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Process Takeaway',
          text: 'Choose the right runner system for the part and process. Then control thermal history, balance, and gate condition to build consistent morphology.',
        },
        {
          type: 'image',
          src: morphologyRunnerComparison,
          alt: 'Infographic comparing morphology across cold runner, hot runner, and stack mold systems with through-thickness diagrams and factor comparison tables.',
          figureNumber: 'Figure 3',
          caption: 'Cold Runner vs Hot Runner vs Stack Mold — Side-by-side comparison of how each system affects thermal history, shear, gate seal, pressure loss, and cavity-to-cavity consistency.',
        },
      ],
    },
  ],
};
