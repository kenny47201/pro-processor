import type { KnowledgeGuide } from './fountainFlowGuide';

import nucleationFundamentals from '@/assets/nucleation-fundamentals.png';
import nucleationEffectsInPart from '@/assets/nucleation-effects-in-part.png';
import nucleationPreparation from '@/assets/nucleation-preparation.png';
import nucleationPressSettings from '@/assets/nucleation-press-settings.png';
import nucleationRunnerComparison from '@/assets/nucleation-runner-comparison.png';

export const nucleationGuide: KnowledgeGuide = {
  slug: 'nucleation-in-injection-molding',
  title: 'Nucleation in Injection Molding',
  summary:
    'A comprehensive guide to nucleation in injection molding — covering fundamentals, where nucleation effects appear in the molded part, preparation strategy, press settings, and runner-system differences.',
  sections: [
    {
      id: 'fundamentals',
      title: '1. Fundamentals: What It Is, Why It Matters, and How It Begins',
      blocks: [
        { type: 'heading', level: 3, text: '1.1 Definition' },
        {
          type: 'paragraph',
          text: 'Nucleation is the formation of the first stable ordered regions in a cooling semi-crystalline polymer melt. These tiny ordered clusters are the starting points for crystal growth, which later develops into spherulites.',
        },
        {
          type: 'paragraph',
          text: 'It can occur by homogeneous nucleation within the pure melt or by heterogeneous nucleation on foreign surfaces, fillers, pigments, mold surfaces, or nucleating agents.',
        },
        { type: 'heading', level: 3, text: '1.2 Why It Matters' },
        {
          type: 'list',
          items: [
            'Affects crystallization rate and overall cycle time.',
            'Influences shrinkage and warpage.',
            'Controls stiffness and dimensional stability.',
            'Impacts clarity and impact balance.',
            'Determines processing window robustness.',
          ],
        },
        { type: 'heading', level: 3, text: '1.3 When It Occurs' },
        {
          type: 'orderedList',
          items: [
            'Melt state above melting temperature.',
            'Cooling begins.',
            'Undercooling develops.',
            'Stable nuclei form.',
            'Crystals grow during cooling/packing.',
            'Final solid morphology is locked in.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Nucleation begins after the melt drops below its equilibrium melting range and enough undercooling exists.',
        },
        { type: 'heading', level: 3, text: '1.4 How It Happens' },
        {
          type: 'orderedList',
          items: [
            'Random chains — polymer chains above melting temperature are mobile and disordered.',
            'Local ordering — temperature drops and a few chain segments begin to align.',
            'Critical nucleus — a cluster reaches critical size and becomes stable.',
            'Crystal growth — chains fold and attach to the nucleus, growing lamellae outward to form spherulites.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'What Promotes Heterogeneous Nucleation',
          text: 'Impurities, pigments, fillers, mold surfaces, and nucleating agents provide surfaces where polymer chains can organize more easily.',
        },
        { type: 'heading', level: 3, text: '1.5 Two Main Types' },
        {
          type: 'table',
          caption: 'Homogeneous vs Heterogeneous Nucleation',
          columns: ['Type', 'Where It Occurs', 'Key Behavior'],
          rows: [
            ['Homogeneous nucleation', 'Within a very pure, additive-free melt', 'Requires large undercooling and is less common in real molding.'],
            ['Heterogeneous nucleation', 'On additives, contaminants, fibers, pigments, mold surfaces, and residual structures', 'Requires less undercooling and dominates in production molding.'],
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Key Beginner Takeaway',
          text: 'Faster and more numerous nuclei usually create a finer crystal structure and faster crystallization. Fewer nuclei usually create a coarser crystal structure and slower crystallization.',
        },
        {
          type: 'paragraph',
          text: 'Common semi-crystalline materials where nucleation matters include PP, PE, POM, PA, PET, PBT, and PPS. Amorphous polymers do not crystallize in the same way.',
        },
        {
          type: 'image',
          src: nucleationFundamentals,
          alt: 'Infographic explaining nucleation in injection molding fundamentals, timing, mechanism, and the difference between homogeneous and heterogeneous nucleation.',
          figureNumber: 'Figure 1',
          caption: 'Nucleation in Injection Molding — Fundamentals, why it matters, when it occurs, how it begins, and the two main nucleation types.',
        },
      ],
    },
    {
      id: 'effects-in-part',
      title: '2. Nucleation Effects Seen in the Molded Part',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'Important Concept',
          text: 'Nuclei themselves are microscopic and usually are not seen directly with the naked eye. What the molder sees are the consequences of nucleation and crystal growth.',
        },
        { type: 'heading', level: 3, text: '2.1 What Changes in the Part' },
        {
          type: 'list',
          items: [
            'Morphology.',
            'Shrinkage.',
            'Warpage.',
            'Stiffness.',
            'Clarity.',
            'Gloss.',
            'Sink behavior.',
            'Dimensional change.',
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Where Effects Appear in the Part' },
        {
          type: 'paragraph',
          text: 'Nucleation density and resulting morphology vary across the part based on cooling rate, shear history, and section thickness.',
        },
        {
          type: 'list',
          items: [
            'Gate region — high shear and often higher nucleation density.',
            'Thick section — slower cooling and lower nucleation density potential.',
            'Ribs and bosses — create thick zones with slower cooling.',
            'Thin wall — faster cooling and often higher nucleation density.',
            'End-of-fill area / flow end — lower temperature and fewer nuclei, with orientation decay.',
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Through-Thickness View' },
        {
          type: 'list',
          items: [
            'Skin layer — rapid cooling and high nucleation time structure.',
            'Shear/oriented layer — oriented chains with altered nucleation.',
            'Core — slower cooling, lower nucleation density, and larger spherulites.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Nucleation density is typically highest near rapidly cooled, high-shear regions and lowest in slow-cooling, thick areas or flow ends.',
        },
        { type: 'heading', level: 3, text: '2.4 What You May Observe' },
        {
          type: 'list',
          items: [
            'Higher or lower mold shrinkage.',
            'Warpage or differential distortion.',
            'Changes in stiffness and heat resistance.',
            'Changes in impact performance.',
            'Haze/clarity differences in semi-crystalline parts.',
            'Gloss or surface appearance changes.',
            'Gate area dimensional sensitivity.',
            'Differential shrink around ribs, bosses, and thick sections.',
          ],
        },
        { type: 'heading', level: 3, text: '2.5 Typical Morphology Pattern' },
        {
          type: 'paragraph',
          text: 'Fine crystals typically appear near the surface, while larger spherulites develop in the core. Morphology can vary with cooling rate, shear, nucleating agents, and section thickness.',
        },
        { type: 'heading', level: 3, text: '2.6 How to Verify It' },
        {
          type: 'list',
          items: [
            'Polarized light microscopy (PLM).',
            'Differential scanning calorimetry (DSC).',
            'Density / crystallinity checks.',
            'Mold shrinkage study.',
            'Dimensional mapping / CMM measurement.',
            'Warp measurement / flatness checks.',
            'Cut-and-polish cross sections.',
            'Cavity-to-cavity comparison.',
          ],
        },
        { type: 'heading', level: 3, text: '2.7 Cause-and-Effect Examples' },
        {
          type: 'list',
          items: [
            'More nuclei plus fast cooling can create finer structure and less time for each crystal to grow.',
            'Fewer nuclei plus slow cooling can create coarser structure, larger spherulites, and more visible differential shrink risk.',
            'Strong shear near the gate can alter morphology and directional shrinkage.',
            'Thick sections provide more time for crystal growth and greater local shrinkage.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Shop-Floor Takeaway',
          text: 'Nucleation effects are usually seen indirectly in dimensions, flatness, appearance, and mechanical behavior. Compare across gate-to-end-of-fill, skin-to-core, and thin-to-thick sections to recognize the patterns and take action.',
        },
        {
          type: 'image',
          src: nucleationEffectsInPart,
          alt: 'Infographic showing where nucleation effects appear in the molded part, what you may observe, and how to verify morphology changes.',
          figureNumber: 'Figure 2',
          caption: 'Nucleation Effects Seen in the Molded Part — Where effects appear, what changes in the part, how to verify them, and typical cause-and-effect patterns.',
        },
      ],
    },
    {
      id: 'preparation',
      title: '3. Preparation Before Molding & When to Implement Nucleation Control',
      blocks: [
        { type: 'heading', level: 3, text: '3.1 Before Molding: What Influences Nucleation' },
        {
          type: 'list',
          items: [
            'Resin selection — nucleated grade vs standard grade.',
            'Additives — nucleating agents, clarifiers, talc, fibers, pigments.',
            'Drying and moisture control where required.',
            'Regrind ratio and lot-to-lot consistency.',
            'Pellet contamination control and housekeeping.',
            'Material storage temperature and handling.',
            'Mold cleanliness, gate condition, and vent condition.',
            'Temperature controller calibration and cooling circuit health.',
          ],
        },
        { type: 'heading', level: 3, text: '3.2 When Nucleation Should Be Intentionally Implemented' },
        {
          type: 'paragraph',
          text: 'Implement nucleation intentionally when you need:',
        },
        {
          type: 'list',
          items: [
            'Faster crystallization and shorter cycle time.',
            'Finer crystal structure.',
            'Improved stiffness or heat resistance.',
            'More consistent shrinkage and dimensions.',
            'Improved clarity in clarified PP systems.',
            'Better process robustness across cavities.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Caution',
          text: 'Improvements may trade off with impact, haze, or other properties depending on resin and additive package.',
        },
        { type: 'heading', level: 3, text: '3.3 How It Is Implemented' },
        {
          type: 'orderedList',
          items: [
            'Define the property target.',
            'Select the right resin/additive system.',
            'Verify drying and material handling.',
            'Set thermal conditions: melt and mold temperature.',
            'Tune fill, pack, and cooling.',
            'Validate with dimensions, warpage, appearance, and if needed DSC/microscopy.',
          ],
        },
        { type: 'heading', level: 3, text: '3.4 Common Pre-Molding Material & Tooling Factors' },
        {
          type: 'table',
          caption: 'Factors That Influence Nucleation Before the First Shot',
          columns: ['Factor', 'Effect on Nucleation'],
          rows: [
            ['Resin grade', 'Nucleated grades from more nuclei and crystallize faster.'],
            ['Additive dispersion', 'Well-dispersed nucleating agents create more uniform nuclei.'],
            ['Moisture', 'Excess moisture can reduce molecular weight and clarity, and may create voids and inconsistent nucleation.'],
            ['Contamination', 'Dirt, gels, and foreign particles can create variable nucleation and defects.'],
            ['Regrind', 'Too high or inconsistent levels can dilute additives and change nucleation behavior.'],
            ['Color concentrate', 'Pigments can act as nucleating sites; level and dispersion matter.'],
            ['Mold surface temperature uniformity', 'Hot spots or cold spots change nucleation density and part uniformity.'],
            ['Hot runner controller accuracy', 'Temperature overshoot/undershoot changes melt history and nucleation.'],
            ['Gate geometry condition', 'Worn or inconsistent gates alter shear and pressure history, affecting nucleation.'],
          ],
        },
        { type: 'heading', level: 3, text: '3.5 Mistakes to Avoid' },
        {
          type: 'list',
          items: [
            'Changing too many settings at once.',
            'Assuming setpoint equals actual steel temperature.',
            'Ignoring residence time in hot runners.',
            'Inconsistent regrind/additive levels.',
            'Poor drying discipline for moisture-sensitive resins.',
            'Judging nucleation only by appearance without dimensional data.',
          ],
        },
        { type: 'heading', level: 3, text: '3.6 Master Molder Checklist' },
        {
          type: 'list',
          items: [
            'Material verified: grade, additives, lot.',
            'Dryer verified if dew point and time are required.',
            'Mold temperature mapped and stable.',
            'Cavity balance checked.',
            'Gate freeze understood.',
            'Dimensional study planned.',
            'Cavity-to-cavity comparison planned.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Bottom Line',
          text: 'Nucleation is controlled by material, temperature history, pressure history, shear, and time. Mastering nucleation means preparing the material correctly, controlling the mold and melt environment, and reading the part for the hidden story of its crystal structure.',
        },
        {
          type: 'image',
          src: nucleationPreparation,
          alt: 'Infographic showing preparation before molding, when to implement nucleation control, implementation steps, and a master checklist.',
          figureNumber: 'Figure 3',
          caption: 'Preparation Before Molding & When to Implement Nucleation Control — Material choices, pre-molding preparation, implementation steps, and best-practice checklist.',
        },
      ],
    },
    {
      id: 'press-settings',
      title: '4. Press Settings That Affect Nucleation',
      blocks: [
        {
          type: 'callout',
          tone: 'warning',
          title: 'Important',
          text: 'Nucleation and crystal growth are related but not identical. A setting may increase undercooling and promote nucleation, while also shortening the time available for crystal growth.',
        },
        { type: 'heading', level: 3, text: '4.1 Primary Settings' },
        {
          type: 'table',
          caption: 'Machine Settings That Influence Nucleation',
          columns: ['Setting', 'If Increased', 'If Decreased', 'Typical Part-Level Result'],
          rows: [
            ['Melt temperature', 'Melts out prior structure, more time to cool', 'Preserves more residual structure and reaches undercooling sooner', 'Lower melt temp can favor residual morphology but risks poor fill/high stress if too low.'],
            ['Mold temperature', 'Slower cooling, less undercooling at a given moment', 'Faster skin cooling and more undercooling near wall', 'Lower mold temp can create finer surface and more undercooling; higher mold temp can create coarser morphology if hotter.'],
            ['Injection speed / fill time', 'Shorter fill time and more shear with more flow-induced ordering', 'Longer fill time and lower shear with less flow alignment', 'Higher speed can change morphology near gate and skin layers.'],
            ['Shear rate', 'Can break agglomerates and create flow-induced ordering', 'Less shear and less flow-induced ordering', 'Higher shear can alter nucleation density and crystal orientation.'],
            ['Pack / hold pressure', 'Improves material contact, affects local crystallization and shrinkage', 'Less pressure and more shrinkage/voids', 'Too much pressure can mask or exaggerate dimensional effects and stress.'],
            ['Pack / hold time', 'More time for densification and post-fill crystallization', 'Less time for densification and crystal growth', 'Longer time can reduce shrinkage; too long may increase cycle time and little benefit after freeze.'],
            ['Cooling time', 'More time for crystal growth and perfection', 'Less time for growth and more undercooling at ejection', 'Shorter time can leave less developed crystals and higher potential for warpage.'],
            ['Screw RPM', 'Higher shear and heat input, may reduce viscosity', 'Lower shear, heat, and less mixing', 'High RPM can alter morphology and degrade if excessive.'],
            ['Back pressure', 'More mixing and higher shear/melt homogenization', 'Less mixing and less uniform melt potential', 'High back pressure can reduce gels but may change nucleation behavior.'],
            ['Residence time', 'More heat history and more chance to erase prior structure', 'Less heat history and may preserve residual structure', 'Long residence can reduce residual nuclei but increase degradation risk.'],
            ['Decompression / suck-back stability', 'Lower residual pressure and consistent suck-back', 'Higher residual pressure or variable suck-back', 'Stable decompression reduces stringing and shot-to-shot variation.'],
            ['Shot-to-shot consistency', 'More consistent melt and thermal conditions', 'Greater variation in temp/volume from shot to shot', 'Consistent shots mean consistent morphology and dimensions.'],
          ],
        },
        { type: 'heading', level: 3, text: '4.2 Most Important Practical Trends' },
        {
          type: 'list',
          items: [
            'Higher melt temperature usually melts out prior structure, delays nucleation onset, and may produce coarser morphology if cooling is slow.',
            'Lower melt temperature can preserve more residual structure and reach undercooling sooner, but too low can cause poor fill or high stress.',
            'Lower mold temperature causes faster skin cooling and more undercooling near the wall, which may favor surface morphology but can limit crystal growth time.',
            'Higher mold temperature allows more time for crystallization and growth, but can reduce nucleation density at a given moment.',
            'Higher injection speed and shear create flow-induced ordering and can alter morphology near the gate and in skin layers.',
            'Higher pack pressure improves material contact and can influence local crystallization and shrinkage, but too much can mask or exaggerate dimensional effects.',
          ],
        },
        { type: 'heading', level: 3, text: '4.3 Settings That Usually Change First' },
        {
          type: 'orderedList',
          items: [
            'Mold temperature — biggest impact on undercooling and cycle time.',
            'Melt temperature — adjust to influence residual structure and fill.',
            'Fill speed — tweak to balance fill quality and shear/ordering.',
            'Pack profile — adjust pressure and time for shrinkage and contact.',
            'Cooling time — set to achieve stability and target properties.',
            'Material/additive review — verify resin grade, nucleating agents, and additives.',
          ],
        },
        { type: 'heading', level: 3, text: '4.4 Symptoms the Molder May See' },
        {
          type: 'list',
          items: [
            'Warpage.',
            'Dimensional drift.',
            'Cavity imbalance.',
            'Gloss change.',
            'Haze.',
            'Stiffness change.',
            'Gate area variation.',
            'Ejection differences.',
            'Cycle-time changes.',
          ],
        },
        { type: 'heading', level: 3, text: '4.5 Directional Effects' },
        {
          type: 'list',
          items: [
            'Gate region vs. end-of-fill — near the gate, flow and shear may increase ordering and heat; at the end of fill, material may cool faster and nucleate more.',
            'Skin vs. core — the skin cools first and sees more undercooling; the core stays warmer and has more time for crystal growth.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Rule of Thumb',
          text: 'More undercooling generally favors nucleation. More time above the mobility limit generally favors crystal growth. The final morphology is the result of both.',
        },
        {
          type: 'paragraph',
          text: 'Watch more than one symptom. Correlate settings with what you see in the part.',
        },
        {
          type: 'image',
          src: nucleationPressSettings,
          alt: 'Infographic showing press settings that affect nucleation, practical trends, common symptoms, and rule-of-thumb guidance.',
          figureNumber: 'Figure 4',
          caption: 'Press Settings That Affect Nucleation — Which settings matter, what happens when they change, and what to watch in the part.',
        },
      ],
    },
    {
      id: 'runner-comparison',
      title: '5. Cold Runner vs Hot Runner vs Stack Mold',
      blocks: [
        { type: 'heading', level: 3, text: '5.1 What Stays the Same' },
        {
          type: 'list',
          items: [
            'Polymer type and undercooling still control nucleation in all mold types.',
            'Pressure history still matters.',
            'Shear history still matters.',
            'Additives/fillers still matter.',
            'Cooling rate still matters.',
          ],
        },
        { type: 'heading', level: 3, text: '5.2 Comparison Matrix' },
        {
          type: 'table',
          caption: 'How Nucleation Behavior Changes by Mold Type',
          columns: ['Mold Type', 'Nucleation Characteristics', 'Common Risks', 'Processing Focus'],
          rows: [
            ['Cold Runner', 'Melt loses heat in sprue/runner, cold slug risk, gate freeze occurs relatively quickly, thermal gradient can be larger.', 'Cold slug or hesitation at gate, early gate freeze, higher melt temperature variation, runner scrap/regrind must be managed.', 'Maintain stable nozzle and front-zone temperatures, use cold slug wells and proper purging, balance runners to minimize pressure drop, optimize pack/hold and runner scrap/regrind strategy.'],
            ['Hot Runner', 'Manifold and tips keep melt molten, thermal history and residence time matter more, gate thermal condition strongly affects morphology, gate freeze can be delayed.', 'Excess residence time and degradation, drool/stringing at gates, uneven tip/manifold temperatures, gate remains open too long and part quality issues.', 'Tight control of manifold and tip temperatures, monitor and manage residence time, color/material changeover discipline, prevent drool/stringing, tune gate thermal condition for morphology.'],
            ['Stack Mold', 'Same nucleation physics as other tools, but temperature balance and fill balance between levels become major issues, platen-side differences can create level-to-level morphology and shrink variation, hot runner balancing is often more demanding.', 'Uneven level temperatures, uneven fill to top vs bottom cavities, differential shrinkage between levels, more difficult hot runner balance across levels, clamp/platen asymmetry effects.', 'Ensure level-to-level thermal balance, balance fill to both parting planes, verify clamp and platen uniformity, balance cavity families within each level, confirm cooling circuits and flow balance.'],
          ],
        },
        { type: 'heading', level: 3, text: '5.3 Processing Differences' },
        {
          type: 'table',
          caption: 'Runner-System Processing Focus',
          columns: ['Cold Runner Processing Focus', 'Hot Runner Processing Focus', 'Stack Mold Processing Focus'],
          rows: [[
            'Nozzle and front-zone stability, cold slug wells and purge, runner balance to limit pressure drop, faster gate freeze, watch runner-generated variation.',
            'Manifold and tip temperature control, residence time control, color/material changeover discipline, avoid drool/stringing, gate thermal tuning for morphology.',
            'Level-to-level thermal balance, fill balance to both parting planes, clamp and platen uniformity, cavity family balance within each level, cooling circuit verification.'
          ]],
        },
        { type: 'heading', level: 3, text: '5.4 Similarities and Differences' },
        {
          type: 'table',
          caption: 'At-a-Glance Summary',
          columns: ['Similarities', 'Differences'],
          rows: [
            ['Same semi-crystalline crystallization physics.', 'Thermal history before the cavity differs.'],
            ['Same material/additive effects.', 'Gate freeze behavior differs.'],
            ['Same importance of undercooling and shear.', 'Balance difficulty differs.'],
            ['—', 'Cavity-to-cavity consistency risk differs.'],
            ['—', 'How strongly runner/manifold temperature affects the cavity melt differs.'],
          ],
        },
        { type: 'heading', level: 3, text: '5.5 Practical Shop-Floor Guidance' },
        {
          type: 'orderedList',
          items: [
            'Establish a stable melt temperature first.',
            'Verify mold surface temperatures, not just controller setpoints.',
            'Compare gate-side and end-of-fill shrinkage.',
            'Track cavity-to-cavity or level-to-level variation.',
            'In hot runner tools, monitor residence time and tip temperature drift.',
            'In stack molds, confirm both levels are thermally and hydraulically balanced.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Bottom Line',
          text: 'A hot runner or stack mold does not change the science of nucleation; it changes the melt history and the difficulty of maintaining uniform nucleation conditions across all cavities.',
        },
        {
          type: 'image',
          src: nucleationRunnerComparison,
          alt: 'Infographic comparing nucleation behavior across cold runner, hot runner, and stack mold systems with processing differences and shop-floor guidance.',
          figureNumber: 'Figure 5',
          caption: 'Cold Runner vs Hot Runner vs Stack Mold — How nucleation behavior compares, where the differences come from, and how processing changes.',
        },
      ],
    },
  ],
};
