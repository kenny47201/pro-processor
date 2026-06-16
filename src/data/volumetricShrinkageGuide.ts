import type { KnowledgeGuide } from './fountainFlowGuide';

import shrinkageOverview from '@/assets/shrinkage-overview.png';
import shrinkageCycleSequence from '@/assets/shrinkage-cycle-sequence.png';
import shrinkagePressSettings from '@/assets/shrinkage-press-settings.png';
import shrinkageRunnerComparison from '@/assets/shrinkage-runner-comparison.png';
import shrinkagePreparation from '@/assets/shrinkage-preparation.png';

export const volumetricShrinkageGuide: KnowledgeGuide = {
  slug: 'volumetric-contraction-shrinkage',
  title: 'Volumetric Contraction / Shrinkage',
  summary:
    'A comprehensive guide to volumetric contraction and shrinkage in injection molding — what it is, how it develops through the cycle, press settings, runner-system differences, and preparation/troubleshooting.',
  sections: [
    /* ------------------------------------------------------------------ */
    /*  SECTION 1 — What It Is, Why It Happens, Where It Shows Up          */
    /* ------------------------------------------------------------------ */
    {
      id: 'overview',
      title: '1. What It Is & Where It Shows Up',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'Definition',
          text: 'Volumetric contraction/shrinkage is the reduction in polymer volume as the melt cools from melt temperature to ejection and then to room temperature. It is normal and unavoidable, but must be controlled and made uniform.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Key Idea',
          text: 'Shrinkage is normal. Non-uniform shrinkage is the problem.',
        },
        { type: 'heading', level: 2, text: '1.1 When It Occurs' },
        {
          type: 'list',
          items: [
            'During cooling after fill',
            'During pack/hold while the gate is still open',
            'After gate seal',
            'During ejection cooling',
            'Sometimes after molding as the part reaches room temperature',
          ],
        },
        { type: 'heading', level: 2, text: '1.2 Why It Happens' },
        {
          type: 'list',
          items: [
            'Cooling causes density increase.',
            'Semi-crystalline polymers usually shrink more than amorphous.',
            'Pressure loss and poor packing allow more local contraction.',
          ],
        },
        { type: 'heading', level: 2, text: '1.3 Where Its Effects Are Seen' },
        {
          type: 'list',
          items: [
            'Dimensions smaller than steel',
            'Sink marks over thick sections, ribs, bosses',
            'Internal voids',
            'Warpage/distortion',
            'Ovality',
            'Mismatch between cavities',
            'Gate-to-end variation',
          ],
        },
        { type: 'heading', level: 2, text: '1.4 In a Perfect World' },
        {
          type: 'paragraph',
          text: 'Uniform, predictable, repeatable shrinkage in all directions with stable dimensions and minimal sink/warpage.',
        },
        { type: 'heading', level: 2, text: '1.5 Quick Visual Symptoms' },
        {
          type: 'table',
          caption: 'Common Shrinkage-Related Defects',
          columns: ['Symptom', 'Description'],
          rows: [
            ['Sink', 'Dimple or depression over thick sections, ribs or bosses.'],
            ['Void', 'Internal gaps from incomplete packing or high shrinkage.'],
            ['Warp', 'Part bends or twists as it cools.'],
            ['Undersize part', 'Overall dimensions are smaller than steel.'],
            ['Cavity-to-cavity variation', 'Parts from different cavities are not the same size.'],
          ],
        },
        { type: 'image', src: shrinkageOverview, alt: 'Volumetric Contraction / Shrinkage — Overview infographic' },
      ],
    },
    /* ------------------------------------------------------------------ */
    /*  SECTION 2 — How Shrinkage Develops Through the Cycle               */
    /* ------------------------------------------------------------------ */
    {
      id: 'cycle-sequence',
      title: '2. How It Develops Through the Cycle',
      blocks: [
        { type: 'heading', level: 2, text: '2.1 Cycle Sequence' },
        {
          type: 'table',
          caption: 'Five Stages of Shrinkage Development',
          columns: ['Stage', 'Phase', 'What Happens'],
          rows: [
            ['1', 'Fill', 'Melt fills the cavity from the gate. Air is displaced ahead of the flow.'],
            ['2', 'Pack / Hold', 'Gate remains open. Pressure is applied to push in more material and offset cooling shrinkage.'],
            ['3', 'Gate Seal', 'Gate solidifies (freezes). Cavity is sealed and can no longer be fed. Shrinkage continues from cooling.'],
            ['4', 'Cooling', 'Part cools toward room temperature. Material contracts. Dimensions stabilize gradually.'],
            ['5', 'Ejection / Room Temp', 'Part is ejected and continues to stabilize at room temperature. Final dimensions are smaller than cavity.'],
          ],
        },
        { type: 'heading', level: 2, text: '2.2 What Pressure Does' },
        {
          type: 'table',
          caption: 'Cavity Pressure Effects',
          columns: ['Condition', 'Effect'],
          rows: [
            ['Higher cavity pressure (while gate is open)', 'More material added to offset cooling shrinkage. Lower specific volume inside the part. → Less shrinkage.'],
            ['Lower pressure or short hold', 'Less material added. Higher specific volume inside the part. → More local shrinkage.'],
          ],
        },
        { type: 'heading', level: 2, text: '2.3 How Defects Form' },
        {
          type: 'table',
          caption: 'Packing Level vs Defect',
          columns: ['Condition', 'Result'],
          rows: [
            ['Well packed = Uniform shrinkage', 'Even packing offsets cooling. Part shrinks uniformly. No sink.'],
            ['Under-packed = Sink', 'Top surface is not supported. More contraction at surface causes a sink mark.'],
            ['Severe under-packing = Internal void', 'Insufficient material in molten core. Shrinkage creates an internal void or porosity.'],
          ],
        },
        { type: 'heading', level: 2, text: '2.4 Material Behavior' },
        {
          type: 'table',
          caption: 'Semi-Crystalline vs Amorphous',
          columns: ['Type', 'Behavior'],
          rows: [
            ['Semi-crystalline (e.g., PP)', 'Molecules form crystals as they cool. Tighter packing pulls chains closer together. Usually higher shrinkage.'],
            ['Amorphous (e.g., PC, ABS)', 'No crystallization; molecules stay more random. Lower density change. Usually lower shrinkage.'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Pressure vs. Specific Volume Concept',
          text: 'High pressure = lower specific volume = less shrinkage. As pressure increases, specific volume decreases.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Key Takeaway',
          text: 'Shrinkage begins as soon as the melt cools. Good packing controls it only until the gate seals.',
        },
        { type: 'image', src: shrinkageCycleSequence, alt: 'How shrinkage develops through the molding cycle — infographic' },
      ],
    },
    /* ------------------------------------------------------------------ */
    /*  SECTION 3 — Press Settings                                         */
    /* ------------------------------------------------------------------ */
    {
      id: 'press-settings',
      title: '3. Press Settings',
      blocks: [
        { type: 'heading', level: 2, text: '3.1 Settings Matrix' },
        {
          type: 'table',
          caption: 'How Each Setting Affects Shrinkage',
          columns: ['Setting', 'If Increased', 'If Decreased', 'Typical Effect on Shrinkage', 'Watch-Outs'],
          rows: [
            ['Melt temperature', 'Lower viscosity, better fill', 'Higher viscosity, risk of short shot', 'Often increases shrinkage risk if density loss and longer cooling dominate', 'Thermal degradation, gas, burn marks, longer cooling'],
            ['Mold temperature', 'Better flow, less frozen layer', 'Higher flow resistance, more shear heating variation', 'Usually increases shrinkage (semi-crystalline); may reduce it (amorphous)', 'Cycle time ↑, part warp, ejection issues'],
            ['Injection speed', 'Faster fill, higher shear heat', 'Slower fill, possible weld lines', 'Small effect; too high can increase shrinkage via more heat and orientation', 'Jetting, burn, flashing at the gate'],
            ['V/P transfer position', 'More packed volume', 'Less packed volume', 'Later transfer reduces shrinkage and sink', 'Flash, overpack, high clamp load'],
            ['Pack pressure', 'Higher cavity pressure', 'Lower cavity pressure', 'Higher pressure reduces shrinkage and sink', 'Flash, stress, distortion, excessive clamp force'],
            ['Hold time', 'More time to pack the part', 'Less time to pack the part', 'Reduces shrinkage until gate seal; extra time gives no benefit', 'Longer cycle, flash if excessive'],
            ['Gate seal time', 'Keeps gate open longer', 'Gate seals earlier', 'Later gate seal reduces shrinkage and sink', 'Flash, drool, overpacking'],
            ['Cooling time', 'More time to cool in mold', 'Ejects hotter, less time to cool', 'More cooling reduces post-mold shrinkage and warp', 'Longer cycle; check part removal temperature'],
            ['Cushion consistency', 'More stable cushion volume', 'Variable cushion, less control', 'More consistent pack & shrinkage results', 'Too large cushion can trap air'],
            ['Shot size', 'More material in shot', 'Less material in shot', 'Slight improvement (stability), not a fix for shrinkage', 'Overfills runner, increases cycle time and material use'],
            ['Back pressure', 'Better melt homogeneity', 'Less mixing, possible voids', 'Small effect; improves part-to-part consistency', 'Too high increases heat and wear'],
            ['Screw recovery consistency', 'More consistent melt and shot', 'Variable shot size and cushion', 'More consistent density and shrinkage', 'Check for slip, backflow variations'],
            ['Cooling-water balance', 'More uniform mold temperatures', 'Hot/cold spots in mold', 'Better balance reduces warp and uneven shrinkage', 'Flow restrictions, air pockets, scale buildup'],
          ],
        },
        { type: 'heading', level: 2, text: '3.2 Settings with the Biggest Leverage' },
        {
          type: 'list',
          items: [
            'Pack pressure',
            'Hold time until gate seal',
            'Transfer position',
            'Melt temperature',
            'Mold temperature',
            'Cooling uniformity',
          ],
        },
        { type: 'heading', level: 2, text: '3.3 Packing Scenarios' },
        {
          type: 'table',
          caption: 'Too Little Pack vs Balanced vs Too Much Pack',
          columns: ['Scenario', 'Result'],
          rows: [
            ['Too little pack', 'Sink mark or internal voids from insufficient pressure or hold.'],
            ['Balanced pack and cooling', 'Uniform density, minimal sink, low residual stress, stable dimensions.'],
            ['Too much pack', 'Flash, overpack, high stress, distortion and ejection issues.'],
          ],
        },
        { type: 'heading', level: 2, text: '3.4 Quick Rules' },
        {
          type: 'list',
          items: [
            'Increase hold only until gate seal.',
            'Do not chase shrinkage with one setting only.',
            'Verify cavity balance and cooling balance.',
            'Measure hot-to-cold stabilization time before releasing parts.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'How to Use This Chart',
          text: 'Adjust one setting at a time within safe limits. Observe part dimensions, sink, voids and warp. Confirm improvements with measurements. Lock in changes and document the result.',
        },
        { type: 'image', src: shrinkagePressSettings, alt: 'Press settings that affect shrinkage — infographic' },
      ],
    },
    /* ------------------------------------------------------------------ */
    /*  SECTION 4 — Runner Comparison                                      */
    /* ------------------------------------------------------------------ */
    {
      id: 'runner-comparison',
      title: '4. Cold Runner vs Hot Runner vs Stack Molds',
      blocks: [
        { type: 'heading', level: 2, text: '4.1 Comparison Matrix' },
        {
          type: 'table',
          caption: 'Runner System Comparison for Shrinkage',
          columns: ['Comparison Area', 'Cold Runner', 'Hot Runner', 'Stack Mold'],
          rows: [
            ['Material delivery path', 'Sprue → runner → gates → cavities. Runner solidifies each cycle.', 'Sprue → heated manifold → hot tips → gates → cavities. Melt stays hot to the gate.', 'Sprue → distribution system → upper cavities (PL1) → lower cavities (PL2). Two mold levels must fill.'],
            ['Temperature control challenge', 'Runner and sprue cooling must be consistent. Cooling differences change freeze time and available pack time.', 'Manifold and tip temperatures must be stable and balanced across all drops. Tip temperature strongly affects gate quality and packing.', 'Two mold levels must be uniformly temperature-controlled. Plate and core balance, clamp, and parallelism significantly affect results.'],
            ['Cavity balance sensitivity', 'Moderate. Runner/cavity balance and sprue/runner cooling affect consistency, but generally more forgiving.', 'High. Small temperature or flow imbalances at the tips can change cavity fill, pack, and shrinkage.', 'Very high. Flow splits between levels and within each level. Balance differences amplify shrinkage variation.'],
            ['Typical shrinkage behavior', 'More thermal variation shot-to-shot possible due to runner cooling. Shrinkage can vary with runner freeze time.', 'More consistent when balanced and stable. Thermal balance across tips and cavities is critical for uniform shrinkage.', 'Shrinkage uniformity depends on both levels. Level-to-level thermal differences cause mismatch and distortion risk.'],
            ['Cavity-to-cavity variation risk', 'Moderate. Influenced by runner balance, gate location, and cooling.', 'High if tip temperatures or flow settings are not balanced. Small changes can cause large variation.', 'Very high if level balance or mold parallelism is off. Risk of cavity-to-cavity and level-to-level mismatch.'],
            ['Gate seal behavior', 'Easier to understand — runner freezes first, then gates. Freeze time can be controlled with cooling.', 'Gate seal depends on tip temperature and heat loss. Small temp shifts change freeze time and packing window.', 'Upper level gate seal affects melt available to lower level. Differences in freeze between levels are common.'],
            ['Common shrinkage-related defects', 'Sink from runner imbalance, differential shrink across part, warpage from uneven cooling.', 'Gate vestige / stringing, inconsistent sink or short shots, warpage from thermal imbalance.', 'Sink and mismatch between levels, warpage / twist / step, flash from non-parallel plates.'],
            ['Processing focus', 'Control runner and sprue cooling. Maintain consistent cycle time and runner freeze time. Minimize shot-to-shot thermal variation.', 'Dial and maintain manifold & tip temperatures. Balance flow across tips. Monitor gate quality and packing consistency.', 'Balance both levels and all cavities. Ensure clamp force and platen parallelism. Monitor level fill, pack, and mold temperatures.'],
          ],
        },
        { type: 'heading', level: 2, text: '4.2 What Stays the Same Across All Three' },
        {
          type: 'list',
          items: [
            'Shrinkage is driven by material, pressure history, thermal history, and part geometry.',
            'Uniform cooling and consistent packing are critical for minimizing shrinkage variation.',
            'Non-uniform shrinkage leads to sinks, voids, warpage, and dimensional variation.',
            'Good process control reduces variation, improves quality, and lowers scrap.',
          ],
        },
        { type: 'heading', level: 2, text: '4.3 Processing Priorities by Runner Type' },
        { type: 'heading', level: 3, text: 'Cold Runner' },
        {
          type: 'list',
          items: [
            'Set and stabilize mold temperature (runner & cavities). Keep cycle time consistent.',
            'Balance runner lengths and gate sizes where possible.',
            'Monitor runner freeze time and pack/hold time.',
            'Inspect runners for buildup and cooling passage health.',
            'Reduce shot-to-shot thermal variation.',
          ],
        },
        { type: 'heading', level: 3, text: 'Hot Runner' },
        {
          type: 'list',
          items: [
            'Stabilize manifold and tip temperatures.',
            'Balance flow across all tips (pressure & volume).',
            'Verify gate quality — look for vestige/stringing.',
            'Monitor pack/hold for each cavity.',
            'Document and lock in settings. Watch for drift.',
          ],
        },
        { type: 'heading', level: 3, text: 'Stack Mold' },
        {
          type: 'list',
          items: [
            'Balance both levels (flow, pack, and cooling).',
            'Ensure platen parallelism and clamp consistency.',
            'Verify distribution system is not restricting flow.',
            'Monitor level fill and gate seal differences.',
            'Use consistent cycle time and temperatures.',
          ],
        },
        { type: 'image', src: shrinkageRunnerComparison, alt: 'Cold runner vs hot runner vs stack molds — Shrinkage comparison infographic' },
      ],
    },
    /* ------------------------------------------------------------------ */
    /*  SECTION 5 — Preparation & Troubleshooting                          */
    /* ------------------------------------------------------------------ */
    {
      id: 'preparation',
      title: '5. Preparation & Troubleshooting',
      blocks: [
        { type: 'heading', level: 2, text: '5.1 Before You Mold' },
        { type: 'heading', level: 3, text: 'Part Design' },
        {
          type: 'list',
          items: ['Keep wall thickness uniform', 'Avoid heavy sections', 'Design ribs/bosses correctly'],
        },
        { type: 'heading', level: 3, text: 'Mold Design / Readiness' },
        {
          type: 'list',
          items: [
            'Balanced runners/manifold',
            'Effective venting',
            'Proper gate size/location',
            'Uniform cooling circuits',
            'Clean water lines',
            'Thermolator/chiller stability',
          ],
        },
        { type: 'heading', level: 3, text: 'Material Readiness' },
        {
          type: 'list',
          items: ['Correct resin', 'Moisture control where required', 'Consistent lot', 'Proper color/additive mix'],
        },
        { type: 'heading', level: 3, text: 'Machine Readiness' },
        {
          type: 'list',
          items: [
            'Repeatable shot size',
            'Stable cushion',
            'Functional check ring',
            'Calibrated pressures',
            'Consistent recovery',
          ],
        },
        { type: 'heading', level: 3, text: 'Measurement Plan' },
        {
          type: 'list',
          items: [
            'Define which dimensions to monitor',
            'How long parts must stabilize before final dimensional check',
          ],
        },
        { type: 'heading', level: 2, text: '5.2 Troubleshooting Map — Observe the Symptom' },
        {
          type: 'table',
          caption: 'Symptom-Based Troubleshooting Actions',
          columns: ['Action', 'Sink', 'Void', 'Warpage', 'Undersize Dimensions', 'Cavity-to-Cavity Variation'],
          rows: [
            ['Row 1', 'Increase pack pressure', 'Increase pack pressure', 'Check cooling balance', 'Increase pack pressure', 'Check cavity balance'],
            ['Row 2', 'Increase hold time', 'Increase hold time', 'Increase hold time', 'Increase hold time', 'Check runner/manifold balance'],
            ['Row 3', 'Check gate seal', 'Reduce melt temp', 'Verify mold temperature', 'Check gate seal', 'Verify cooling uniformity'],
            ['Row 4', 'Check melt temperature', 'Check gate seal', 'Check part design', 'Verify mold temperature', 'Check gate consistency'],
            ['Row 5', 'Verify mold temperature', 'Improve venting', 'Reduce melt temp', 'Check part design', 'Check machine consistency'],
            ['Row 6', 'Check part design', 'Check part design', 'Improve part support', 'Check measurement method', 'Check part design'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Workflow',
          text: 'Make adjustments → Verify results → Standardize.',
        },
        { type: 'heading', level: 2, text: '5.3 Perfect-World Shrinkage' },
        {
          type: 'table',
          caption: 'Controlled / Ideal vs Poorly Controlled',
          columns: ['Controlled / Ideal', 'Poorly Controlled'],
          rows: [
            ['Flat and dimensionally stable', 'Visible sink marks'],
            ['Minimal sink (within spec)', 'Warpage / distortion'],
            ['Dimensions within tolerance', 'Dimensions out of tolerance'],
            ['Low variation (tight spread)', 'High variation (wide spread)'],
            ['Cavity-to-cavity consistency', 'Cavity-to-cavity mismatch'],
          ],
        },
        { type: 'heading', level: 2, text: '5.4 Master Processor Mindset' },
        {
          type: 'list',
          items: [
            'Shrinkage is expected.',
            'Uniformity beats brute force.',
            'Pack until gate seal.',
            'Cool evenly.',
            'Measure consistently.',
            'Look for trends, not single parts.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Goal',
          text: 'Stable dimensions, minimal sink, minimal warp, repeatable parts shot after shot.',
        },
        { type: 'image', src: shrinkagePreparation, alt: 'Preparation before molding, troubleshooting, and the ideal result — infographic' },
      ],
    },
  ],
};
