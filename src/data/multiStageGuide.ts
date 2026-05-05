import type { KnowledgeGuide } from './fountainFlowGuide';

import multiStageConcept from '@/assets/multi-stage-core-concept.png';
import multiStageEffects from '@/assets/multi-stage-effects-in-part.png';
import multiStagePressSettings from '@/assets/multi-stage-press-settings.png';
import multiStageRunnerComparison from '@/assets/multi-stage-runner-comparison.png';
import multiStagePreparation from '@/assets/multi-stage-preparation.png';

export const multiStageGuide: KnowledgeGuide = {
  slug: 'multi-stage-injection',
  title: 'Multi-Stage Injection',
  summary:
    'A comprehensive guide to multi-stage injection — understanding the core concept, fill sequence, press settings, runner system differences, part effects, and preparation for optimal multi-stage process control.',
  sections: [
    /* ── Section 1: Core Concept and Fill Sequence ── */
    {
      id: 'core-concept',
      title: '1. Core Concept & Fill Sequence',
      blocks: [
        { type: 'heading', level: 3, text: '1.1 Definition' },
        {
          type: 'paragraph',
          text: 'Multi-stage injection is the use of two or more programmed injection velocity or pressure segments during the fill phase so the melt front can be controlled as geometry, flow length, wall thickness, and resistance change through the cavity.',
        },
        { type: 'heading', level: 3, text: '1.2 Why It Is Used' },
        {
          type: 'list',
          items: [
            'Control melt front behavior.',
            'Reduce jetting and blush at the gate.',
            'Prevent hesitation in thin sections.',
            'Improve weld line quality.',
            'Reduce burning from trapped air.',
            'Limit flash at end of fill.',
            'Fill difficult geometry more consistently.',
          ],
        },
        { type: 'heading', level: 3, text: '1.3 Three-Stage Fill Sequence' },
        {
          type: 'paragraph',
          text: 'A typical multi-stage fill uses three velocity stages, each matched to a different region of cavity resistance:',
        },
        {
          type: 'table',
          caption: 'Three-Stage Fill Sequence',
          columns: ['Stage', 'Fill %', 'Typical Goal', 'Common Result'],
          rows: [
            ['Stage 1', '0–10%', 'Gate entry control', 'Reduces jetting, gate blush, splay sensitivity.'],
            ['Stage 2', '10–85%', 'Bulk cavity fill', 'Maintains front temperature and avoids hesitation.'],
            ['Stage 3', '85–95%', 'Controlled end fill', 'Reduces burn marks, flash, overrun, pressure spike.'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Key Note',
          text: 'V/P transfer typically occurs near 95–99% full depending on part and process strategy.',
        },
        { type: 'heading', level: 3, text: '1.4 Key Principle' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Important',
          text: 'The purpose is not to make filling slower overall. The purpose is to change fill behavior at the right locations in the cavity.',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Takeaway',
          text: 'In a well-tuned process, the melt front moves smoothly, the cavity fills consistently, and V/P transfer occurs without a pressure spike or short shot.',
        },
        {
          type: 'image',
          src: multiStageConcept,
          alt: 'Infographic showing multi-stage injection core concept, three-stage fill sequence diagram, stage goals, and visual mini-charts.',
          figureNumber: 'Figure 1',
          caption: 'Core Concept and Fill Sequence — Definition, three-stage fill example, stage goals, and screw position/cavity fill charts.',
        },
      ],
    },
    /* ── Section 2: Where Effects Show in the Part ── */
    {
      id: 'part-effects',
      title: '2. Where Effects Show in the Part',
      blocks: [
        {
          type: 'paragraph',
          text: 'Multi-stage injection effects are visible at specific locations on the part — gate area, thin-to-thick transitions, around ribs and bosses, flow-around cores/holes, weld line meeting points, last-fill areas, and vent-limited corners.',
        },
        { type: 'heading', level: 3, text: '2.1 If Stages Are Set Correctly' },
        {
          type: 'list',
          items: [
            'Smooth gate entry.',
            'Stable melt front.',
            'Reduced hesitation.',
            'Better weld line formation.',
            'Less trapped-air burning.',
            'Lower flash tendency near end fill.',
            'More consistent part weight and dimensions.',
          ],
        },
        { type: 'heading', level: 3, text: '2.2 If Stages Are Set Poorly' },
        {
          type: 'table',
          caption: 'Common Problems from Poor Stage Settings',
          columns: ['Wrong Condition', 'What Happens in the Cavity', 'What You See on the Part'],
          rows: [
            ['Stage 1 too fast', 'Unstable gate entry', 'Jetting, gate blush, splay emphasis.'],
            ['Stage 1 too slow', 'Sluggish entry / early cooling', 'Poor gate appearance, flow hesitation in thin start sections.'],
            ['Stage 2 too slow', 'Front cools during bulk fill', 'Hesitation, poor weld lines, shorts in difficult areas.'],
            ['Stage 2 too fast', 'Excessive shear / trapped air compression', 'Burn risk, gloss change, possible overpacking at flow restrictions.'],
            ['Stage 3 too fast', 'Hard end fill', 'Flash, burn marks, pressure spike, dimensional instability.'],
            ['Stage 3 too slow or transfer too early', 'Cavity not fully developed before pack', 'Short shot, weak knit area, low part weight.'],
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Perfect-World Result' },
        {
          type: 'paragraph',
          text: 'In a well-tuned multi-stage fill, the melt front advances smoothly, changes speed only where needed, arrives at the last-fill area controlled and hot enough to fuse properly, and reaches V/P transfer without a pressure spike.',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Key Takeaway',
          text: 'Multi-stage injection shows up in the part as surface quality, fill consistency, weld line quality, burn / flash tendency, and dimensional stability.',
        },
        {
          type: 'image',
          src: multiStageEffects,
          alt: 'Infographic showing where multi-stage injection effects appear on the part, with poor vs ideal defect maps.',
          figureNumber: 'Figure 2',
          caption: 'Where Effects Show in the Part — Effect locations, correct vs. poor stage settings, visual defect map, and ideal part characteristics.',
        },
      ],
    },
    /* ── Section 3: Press Settings ── */
    {
      id: 'press-settings',
      title: '3. Press Settings & How They Affect the Process',
      blocks: [
        { type: 'heading', level: 3, text: '3.1 Primary Machine Settings' },
        {
          type: 'table',
          caption: 'Multi-Stage Injection Machine Settings',
          columns: ['Setting', 'If Increased', 'If Decreased', 'What It Influences'],
          rows: [
            ['Stage 1 injection speed', 'More gate shear, more jetting risk if excessive', 'Softer gate entry, but possible freeze / hesitation if too low', 'Gate appearance and gate entry stability.'],
            ['Stage 2 injection speed', 'Hotter front, less hesitation, but more shear if excessive', 'Cooler front, more hesitation / weak weld lines', 'Bulk fill behavior.'],
            ['Stage 3 injection speed', 'Faster end fill, but more burn / flash / pressure spike risk', 'Gentler end fill, but possible short shot if too low', 'End-fill control.'],
            ['Injection pressure limit', 'Allows fill under resistance, but may mask problems / increase flash risk', 'May cap fill too early and cause short shots', 'Ability to maintain programmed velocity.'],
            ['V/P transfer position', 'Later transfer increases cavity fill before pack, but can spike pressure / flash', 'Earlier transfer reduces spike, but can underfill before pack', 'Fill completion and repeatability.'],
            ['Pack / hold pressure', 'Improves density and dimensions, but can overpack / flash', 'Lower density and part weight, more sink risk', 'Final density after transfer.'],
            ['Melt temperature', 'Lowers viscosity, improves flow, but increases stringing / degradation risk if excessive', 'Higher viscosity and more hesitation', 'Viscosity and shear sensitivity.'],
            ['Mold temperature', 'Keeps front hotter and improves fusion, but longer cooling', 'More rapid skin freeze and more hesitation', 'Surface finish and weld line quality.'],
            ['Cushion size', 'More stable transfer cushion if controlled', 'Unstable pack if too small', 'Transfer consistency.'],
            ['Screw recovery / back pressure', 'Better melt consistency when appropriate, but excess heat if too high', 'Less melt uniformity if too low', 'Melt quality entering fill.'],
          ],
        },
        { type: 'heading', level: 3, text: '3.2 Stage Timing Diagram' },
        {
          type: 'paragraph',
          text: 'Injection velocity is plotted against screw position (not time) for position-based stage control. Stage 1 covers gate entry (0–10% fill), Stage 2 covers bulk fill (10–85%), and Stage 3 covers end fill (85–95%). V/P transfer occurs near the end of Stage 3.',
        },
        { type: 'heading', level: 3, text: '3.3 Processing Rules of Thumb' },
        {
          type: 'list',
          items: [
            'Use position-based stage changes whenever possible.',
            'Change stages where geometry or resistance changes.',
            'Tune with short shots first.',
            'Set V/P transfer after the fill profile is stable.',
            'Make one controlled change at a time.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Warning',
          text: 'If actual injection pressure hits the machine pressure limit, the machine can no longer follow the programmed velocity stage accurately.',
        },
        { type: 'heading', level: 3, text: '3.4 Quick Shop-Floor Guide' },
        {
          type: 'table',
          caption: 'Shop-Floor Troubleshooting',
          columns: ['Problem', 'Fix'],
          rows: [
            ['Too much jetting at gate', 'Lower Stage 1 speed.'],
            ['Hesitation in thin section', 'Increase Stage 2 speed or melt / mold temperature as appropriate.'],
            ['Burn at end of fill', 'Slow Stage 3 and check venting.'],
            ['Flash at end fill', 'Slow Stage 3, review transfer, pressure, and clamp / tooling condition.'],
            ['Short shot near transfer', 'Move transfer later or improve fill profile.'],
          ],
        },
        {
          type: 'image',
          src: multiStagePressSettings,
          alt: 'Infographic showing multi-stage injection press settings, stage timing diagram, processing rules, and shop-floor troubleshooting guide.',
          figureNumber: 'Figure 3',
          caption: 'Press Settings and How They Affect the Process — Machine settings matrix, stage timing diagram, processing rules, and quick shop-floor guide.',
        },
      ],
    },
    /* ── Section 4: Cold Runner vs Hot Runner vs Stack Mold ── */
    {
      id: 'runner-comparison',
      title: '4. Cold Runner vs Hot Runner vs Stack Mold',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'Core Principle',
          text: 'Multi-stage injection is the same basic strategy in all mold types: control the melt front by changing fill speed or pressure as cavity resistance changes. The difference is where the melt loses heat, how balanced the system is, and how sensitive the process becomes to runner and manifold behavior.',
        },
        { type: 'heading', level: 3, text: '4.1 Cold Runner' },
        {
          type: 'list',
          items: [
            'Melt loses heat in sprue and runner before reaching the cavity.',
            'Fill response is influenced by runner size, runner balance, and cold slug control.',
            'Often needs enough mid-fill speed to keep the front hot through runner losses.',
            'Stage 1 still helps reduce jetting at the gate.',
            'End-fill control remains important for flash and burns.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Key watch items:',
        },
        {
          type: 'list',
          items: [
            'Runner balance.',
            'Cold slug wells.',
            'Regrind / runner handling.',
            'Greater material waste.',
          ],
        },
        { type: 'heading', level: 3, text: '4.2 Hot Runner' },
        {
          type: 'list',
          items: [
            'Melt reaches the gate hotter and with less pressure loss through runners.',
            'Gate area is more sensitive to tip temperature and thermal control.',
            'Stage 1 is often critical for controlling gate blush, stringing tendency, or gate drool-related behavior.',
            'Multi-stage fill can be very responsive because runner heat is maintained.',
            'Balance also depends on manifold design and tip condition.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Key watch items:',
        },
        {
          type: 'list',
          items: [
            'Tip temperature consistency.',
            'Gate freeze behavior.',
            'Thermal balance between drops.',
            'Less material waste, but higher sensitivity to thermal issues.',
          ],
        },
        { type: 'heading', level: 3, text: '4.3 Stack Mold' },
        {
          type: 'list',
          items: [
            'Same multi-stage principles, but applied to two parting planes / flow levels.',
            'Fill balance between mold levels is critical.',
            'Pressure loss and fill imbalance can be amplified by the larger flow system.',
            'Stage changes must support balanced fill to both levels before transfer.',
            'End-fill control is especially important to avoid one level flashing while the other underfills.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Key watch items:',
        },
        {
          type: 'list',
          items: [
            'Level-to-level balance.',
            'Clamp requirements and deflection sensitivity.',
            'Runner / manifold symmetry.',
            'Transfer repeatability across both mold faces.',
          ],
        },
        { type: 'heading', level: 3, text: '4.4 Similarities vs Differences' },
        {
          type: 'table',
          caption: 'Multi-Stage Injection Across Runner Systems',
          columns: ['Factor', 'Cold Runner', 'Hot Runner', 'Stack Mold'],
          rows: [
            ['Same goal in all systems', 'Yes: control melt front and end fill', 'Yes: control melt front and end fill', 'Yes: control melt front and end fill'],
            ['Main heat loss location', 'Sprue / runner', 'Mainly gate / cavity', 'Depends on runner / manifold plus two mold levels'],
            ['Most sensitive area', 'Runner balance', 'Gate thermal control', 'Level-to-level fill balance'],
            ['Common process focus', 'Keep front hot enough', 'Stabilize gate behavior', 'Maintain balanced simultaneous fill'],
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Takeaway',
          text: 'Cold runner systems are more affected by runner cooling, hot runners are more affected by gate thermal behavior, and stack molds demand the strongest balance control across multiple cavity planes.',
        },
        {
          type: 'image',
          src: multiStageRunnerComparison,
          alt: 'Infographic comparing multi-stage injection across cold runner, hot runner, and stack mold systems with diagrams and key watch items.',
          figureNumber: 'Figure 4',
          caption: 'Cold Runner vs Hot Runner vs Stack Mold — How multi-stage injection applies across runner systems with key watch items and similarities/differences.',
        },
      ],
    },
    /* ── Section 5: Preparation, Setup, and the Ideal Result ── */
    {
      id: 'preparation',
      title: '5. Preparation, Setup & Ideal Result',
      blocks: [
        { type: 'heading', level: 3, text: '5.1 Before Molding: Preparation Checklist' },
        {
          type: 'list',
          items: [
            'Verify material type, lot, and moisture condition.',
            'Confirm melt temperature target and barrel profile.',
            'Confirm mold temperature control is stable.',
            'Inspect gate size, gate condition, and vent condition.',
            'Verify runner / manifold balance and hot runner controller settings if used.',
            'Confirm screw, non-return valve, and hydraulic / servo response are healthy.',
            'Set accurate shot size and stable cushion target.',
            'Review part geometry: thin walls, thick sections, ribs, bosses, end-fill areas.',
          ],
        },
        { type: 'heading', level: 3, text: '5.2 Setup Workflow' },
        {
          type: 'orderedList',
          items: [
            'Start with safe conservative fill settings.',
            'Perform short-shot study to map the flow pattern.',
            'Identify geometry changes and likely stage-change locations.',
            'Program Stage 1, Stage 2, and Stage 3 by screw position.',
            'Tune fill only before tuning pack / hold.',
            'Establish V/P transfer position.',
            'Verify part weight, dimensions, and appearance.',
            'Document the validated process window.',
          ],
        },
        { type: 'heading', level: 3, text: '5.3 What Preparation Most Affects Success' },
        {
          type: 'list',
          items: [
            'Good venting.',
            'Balanced runner / manifold system.',
            'Stable melt quality.',
            'Clean gates and parting lines.',
            'Correct machine sizing and response.',
            'Known material behavior and viscosity sensitivity.',
          ],
        },
        { type: 'heading', level: 3, text: '5.4 In a Perfect World: The Ideal Process' },
        {
          type: 'list',
          items: [
            'Smooth gate entry with no pressure spike at transfer.',
            'Stable mid-fill front with repeatable cushion.',
            'Controlled end fill with consistent part weight.',
            'Clean surface and complete fill.',
            'Smooth pressure rise with no spike at V/P transfer.',
            'Tight, repeatable weights shot after shot.',
          ],
        },
        { type: 'heading', level: 3, text: '5.5 Quick Reference: Stage Purpose' },
        {
          type: 'table',
          caption: 'Stage Purpose Summary',
          columns: ['Stage', 'Fill % (Typical)', 'Purpose'],
          rows: [
            ['Stage 1', '0–10%', 'Slow start at gate to prevent jetting and protect gate / vents.'],
            ['Stage 2', '10–85%', 'Bulk of fill through main flow path with controlled front behavior.'],
            ['Stage 3', '85–95%', 'Finish fill and transfer with controlled end fill.'],
          ],
        },
        { type: 'heading', level: 3, text: '5.6 Common Setup Mistakes' },
        {
          type: 'list',
          items: [
            'Trying to fix a bad fill profile with pack pressure.',
            'Making stage changes without a short-shot study.',
            'Switching stages by time when position control is available.',
            'Ignoring venting or gate condition.',
            'Running transfer too late into a pressure spike.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Remember',
          text: 'Fix the cause, not the symptom. Percentages are typical ranges — adjust based on part geometry, material, and process strategy.',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Final Takeaway',
          text: 'The best multi-stage process is prepared before the first good shot: stable material, stable mold, stable machine, mapped flow pattern, and stage changes placed where the cavity actually needs them.',
        },
        {
          type: 'image',
          src: multiStagePreparation,
          alt: 'Infographic showing multi-stage injection preparation checklist, setup workflow, ideal process results, and common setup mistakes.',
          figureNumber: 'Figure 5',
          caption: 'Preparation, Setup, and the Ideal Result — Pre-molding checklist, 8-step setup workflow, ideal process characteristics, stage purpose reference, and common mistakes to avoid.',
        },
      ],
    },
  ],
};
