import type { KnowledgeGuide } from './fountainFlowGuide';

import witnessMarksOverview from '@/assets/witness-marks-overview.png';
import witnessMarksFormation from '@/assets/witness-marks-formation.png';
import witnessMarksRunnerComparison from '@/assets/witness-marks-runner-comparison.png';
import witnessMarksPrevention from '@/assets/witness-marks-prevention.png';

export const witnessMarksGuide: KnowledgeGuide = {
  slug: 'witness-marks-in-injection-molding',
  title: 'Witness Marks',
  summary:
    'A comprehensive guide to witness marks in injection molding — what they are, how they form, runner-system differences, and how to prevent and control them.',
  sections: [
    /* ------------------------------------------------------------------ */
    /*  SECTION 1 — What They Are, Where They Appear                       */
    /* ------------------------------------------------------------------ */
    {
      id: 'overview',
      title: '1. What They Are & Where They Appear',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'Definition',
          text: 'Witness marks are visible surface indications left by mold features or process transitions. They commonly appear at parting lines, gate vestige, ejector pin locations, insert or slide shutoffs, and other tooling interfaces. In good molding they are controlled, repeatable, and placed in low-cosmetic areas.',
        },
        { type: 'heading', level: 3, text: '1.1 Five Common Witness Mark Types' },
        {
          type: 'table',
          caption: 'Witness Mark Types',
          columns: ['#', 'Type', 'Description'],
          rows: [
            ['1', 'Parting line witness mark', 'Thin line where cavity and core meet.'],
            ['2', 'Gate witness / vestige', 'Small mark at gate location.'],
            ['3', 'Ejector pin witness', 'Faint circular imprint from ejector pin.'],
            ['4', 'Insert or shutoff witness', 'Visible line at insert/slide interface.'],
            ['5', 'Texture / polish mismatch witness', 'Change in surface finish where textures or polishes meet.'],
          ],
        },
        { type: 'heading', level: 3, text: '1.2 Normal vs Problem' },
        {
          type: 'table',
          caption: 'Controlled / Acceptable vs Exaggerated / Problematic',
          columns: ['Controlled / Acceptable', 'Exaggerated / Problematic'],
          rows: [
            ['Faint and low profile', 'Raised, proud'],
            ['Uniform and repeatable', 'Highly visible'],
            ['Aligned with tooling features', 'Misaligned or irregular'],
            ['Located in low-cosmetic areas', 'Inconsistent from part to part'],
            ['—', 'Located on critical or cosmetic surfaces'],
          ],
        },
        { type: 'heading', level: 3, text: '1.3 Where You See the Effects on the Part' },
        {
          type: 'list',
          items: [
            'Cosmetic surface',
            'Sealing surfaces',
            'Fit features',
            'Gate area',
            'Ejector landings',
            'Shutoff transitions',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Note',
          text: 'A witness mark is not always a defect. It becomes a quality issue when it is too visible, raised, misaligned, inconsistent, or located on a critical surface.',
        },
        { type: 'image', src: witnessMarksOverview, alt: 'Witness Marks in Injection Molding — Overview infographic' },
      ],
    },
    /* ------------------------------------------------------------------ */
    /*  SECTION 2 — How Witness Marks Happen                               */
    /* ------------------------------------------------------------------ */
    {
      id: 'formation',
      title: '2. How They Form',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'Key Insight',
          text: 'Witness marks form when tooling interfaces, melt flow transitions, packing behavior, cooling differences, or ejection events leave a visible record on the molded surface. Some are expected and intentional; others become cosmetic or functional problems when they are too large or inconsistent.',
        },
        { type: 'heading', level: 3, text: '2.1 How Witness Marks Form During Molding' },
        {
          type: 'table',
          caption: 'Formation Stages',
          columns: ['Stage', 'Phase', 'What Happens'],
          rows: [
            ['1', 'Fill', 'Melt enters through the gate and fills the cavity.'],
            ['2', 'Flow-front transition', 'Flow fronts meet and change direction.'],
            ['3', 'Pack/Hold', 'Pressure is applied to compensate for shrinkage.'],
            ['4', 'Cooling / Shrinkage', 'Part cools and shrinks; stresses and differentials develop.'],
            ['5', 'Ejection / Release', 'Ejectors push the part free; release occurs at interfaces.'],
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Six Primary Formation Mechanisms' },
        {
          type: 'orderedList',
          items: [
            'Parting line mismatch or steel wear — misalignment or wear creates steps or gaps that print on the part.',
            'Gate vestige left by freeze-off and pull-off — gate remains after freeze-off; pull-off creates a surface imprint.',
            'Ejector force imprint from hot or under-cooled parts — ejectors leave marks when the part is still soft or not fully cooled.',
            'Insert / slide shutoff transition — interfaces where moving components stop or meet leave visible transitions.',
            'Surface finish mismatch between textures or polish levels — different texture or polish levels create visible break lines.',
            'Flow hesitation or pack imbalance that exaggerates visibility — unbalanced fill or pack increases stress, warp, or differential shrinkage at interfaces.',
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Press Settings That Affect Witness Marks' },
        {
          type: 'table',
          caption: 'Process Parameters and Their Effects',
          columns: ['Parameter', 'Too High ↑', 'Too Low ↓'],
          rows: [
            ['Injection speed', 'Can exaggerate vestige, jetting, and visual transitions', 'Can increase hesitation and visible flow evidence'],
            ['Transfer position / V-P switchover', 'Late switchover can over-pack or flash them', 'Early or inconsistent switchover can under-pack witness areas'],
            ['Pack / hold pressure', 'Can flatten some marks but also make parting-line or gate evidence more visible', '—'],
            ['Hold time', 'Too long gives no benefit after gate seal', 'Too short can leave sink/shrink around witness areas'],
            ['Melt temperature', 'Hotter melt can increase gate vestige smear and ejection marking if part is still soft', '—'],
            ['Mold temperature', 'Hotter steel can improve replication but also make witness lines more readable on cosmetic surfaces', '—'],
            ['Cooling time', '—', 'Too short increases ejector marks and deformation; enough cooling reduces print-through'],
            ['Clamp force / mold protection', '—', 'Poor alignment or low effective support can worsen parting line witness marks'],
          ],
        },
        { type: 'heading', level: 3, text: '2.4 When It Occurs / When It Is Accepted' },
        {
          type: 'table',
          caption: 'Natural Occurrence vs Acceptance Criteria',
          columns: ['Occurs Naturally When', 'Accepted When'],
          rows: [
            ['Tooling surfaces meet', 'Faint'],
            ['Gates break', 'Repeatable'],
            ['Ejectors contact the part', 'Located off critical surfaces'],
            ['Inserts or slides shut off', 'Within cosmetic specifications'],
            ['Textures transition', '—'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Note',
          text: 'If the mark changes suddenly, suspect a process shift, steel damage, alignment issue, gate condition change, or cooling problem.',
        },
        { type: 'image', src: witnessMarksFormation, alt: 'How Witness Marks Happen — Formation mechanisms infographic' },
      ],
    },
    /* ------------------------------------------------------------------ */
    /*  SECTION 3 — Runner Comparison                                      */
    /* ------------------------------------------------------------------ */
    {
      id: 'runner-comparison',
      title: '3. Cold Runner, Hot Runner & Stack Molds',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'Key Insight',
          text: 'Witness marks exist in all mold systems, but their source, severity, and process response change with runner style, gating method, and mold architecture.',
        },
        { type: 'heading', level: 3, text: '3.1 Cold Runner Molds' },
        { type: 'heading', level: 3, text: 'A — Common Witness Mark Sources' },
        {
          type: 'list',
          items: [
            'Sprue/gate vestige',
            'Tab/sub gate break',
            'Runner pull effects',
            'Parting line mismatch',
            'Ejector marks',
          ],
        },
        { type: 'heading', level: 3, text: 'B — What They Typically Look Like on the Part' },
        {
          type: 'list',
          items: [
            'Small nub, bump, or vestige at gate or tab',
            'Slight pull or flow drag marks',
            'Parting line step or mismatch',
            'Faint circular or pin-point impressions from ejectors',
          ],
        },
        { type: 'heading', level: 3, text: 'C — Press Settings / Process Levers That Matter Most' },
        {
          type: 'list',
          items: ['Gate seal', 'Runner balance', 'Gate trim', 'Mold alignment', 'Cooling uniformity'],
        },
        { type: 'heading', level: 3, text: 'D — Typical Troubleshooting Focus' },
        {
          type: 'list',
          items: [
            'Check gate seal and trim quality',
            'Balance runner lengths and sizes',
            'Verify parting line alignment',
            'Check ejector pin condition',
            'Review cooling uniformity and flow',
          ],
        },
        { type: 'heading', level: 3, text: 'E — Main Processing Difference' },
        {
          type: 'paragraph',
          text: 'Emphasis on gate seal, runner balance, gate trim, mold alignment, and cooling uniformity.',
        },
        { type: 'heading', level: 3, text: '3.2 Hot Runner Molds' },
        { type: 'heading', level: 3, text: 'A — Common Witness Mark Sources' },
        {
          type: 'list',
          items: [
            'Gate blush or vestige at thermal gate',
            'Hot-tip stringing',
            'Manifold/nozzle temperature imbalance',
            'Gate seal timing',
            'Valve gate timing (if present)',
            'Parting line and ejector marks still possible',
          ],
        },
        { type: 'heading', level: 3, text: 'B — What They Typically Look Like on the Part' },
        {
          type: 'list',
          items: [
            'Blush or faint disc at gate',
            'Fine string or whisker',
            'Slight color or gloss change at gate',
            'Parting line step or mismatch',
            'Ejector pin impressions',
          ],
        },
        { type: 'heading', level: 3, text: 'C — Press Settings / Process Levers That Matter Most' },
        {
          type: 'list',
          items: [
            'Hot tip temperature',
            'Manifold balance',
            'Gate seal',
            'Decompression',
            'Fill-to-pack consistency',
          ],
        },
        { type: 'heading', level: 3, text: 'D — Typical Troubleshooting Focus' },
        {
          type: 'list',
          items: [
            'Balance hot tip and manifold temps',
            'Verify gate seal / valve timing',
            'Tune decompression and back pressure',
            'Confirm gate seal and fill-to-pack',
            'Check nozzle alignment and wear',
          ],
        },
        { type: 'heading', level: 3, text: 'E — Main Processing Difference' },
        {
          type: 'paragraph',
          text: 'Emphasis on hot tip temperature, manifold balance, gate seal, decompression, and fill-to-pack consistency.',
        },
        { type: 'heading', level: 3, text: '3.3 Stack Molds' },
        { type: 'heading', level: 3, text: 'A — Common Witness Mark Sources' },
        {
          type: 'list',
          items: [
            'Balance differences between cavity levels',
            'Platen deflection',
            'Cooling variation by level',
            'Alignment / parallelism issues',
            'Parting line and ejector marks may be more sensitive',
          ],
        },
        { type: 'heading', level: 3, text: 'B — What They Typically Look Like on the Part' },
        {
          type: 'list',
          items: [
            'Mark location or size differs between levels',
            'Parting line mismatch more pronounced',
            'Shutoff lines or flow evidence may be more visible',
            'Ejector marks may vary by level',
          ],
        },
        { type: 'heading', level: 3, text: 'C — Press Settings / Process Levers That Matter Most' },
        {
          type: 'list',
          items: [
            'Fill balance front-to-back',
            'Clamp distribution',
            'Parallelism',
            'Synchronized cooling',
            'Runner / hot runner balance between levels',
          ],
        },
        { type: 'heading', level: 3, text: 'D — Typical Troubleshooting Focus' },
        {
          type: 'list',
          items: [
            'Verify fill balance front-to-back',
            'Check clamp and platen parallelism',
            'Balance cooling for both levels',
            'Confirm runner / hot runner balance',
            'Inspect alignment and support',
          ],
        },
        { type: 'heading', level: 3, text: 'E — Main Processing Difference' },
        {
          type: 'paragraph',
          text: 'Emphasis on fill balance front-to-back, clamp distribution, parallelism, synchronized cooling, and runner/hot runner balance between levels.',
        },
        { type: 'heading', level: 3, text: '3.4 Similarities Across All Three' },
        {
          type: 'orderedList',
          items: [
            'Witness marks are records of tooling or process events.',
            'Visibility increases on glossy or critical surfaces.',
            'Repeatability matters as much as size.',
            'Better alignment, cooling, and transfer consistency usually help.',
            'Part design and mark location are important.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Practical Rule',
          text: 'A faint, repeatable witness mark in a planned low-cosmetic area is usually acceptable. A changing or highly visible witness mark is a process or tooling signal.',
        },
        { type: 'image', src: witnessMarksRunnerComparison, alt: 'Witness Marks in Cold Runner, Hot Runner, and Stack Molds — Comparison infographic' },
      ],
    },
    /* ------------------------------------------------------------------ */
    /*  SECTION 4 — Preventing and Controlling Witness Marks               */
    /* ------------------------------------------------------------------ */
    {
      id: 'prevention',
      title: '4. Prevention & Control',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'Key Principle',
          text: 'The best witness mark is controlled, intentional, low-profile and placed where it does not affect fit, function, seal, or cosmetics. Prevention starts before the first shot.',
        },
        { type: 'heading', level: 3, text: '4.1 Before Molding: Preparation Checklist' },
        {
          type: 'orderedList',
          items: [
            'Verify mold alignment, shutoffs, inserts, and parting line condition.',
            'Confirm ejector pin height, flushness, and smooth movement.',
            'Inspect gate condition and hot-runner tip/nozzle condition.',
            'Match texture and polish transitions to the drawing and cosmetic plan.',
            'Confirm cooling circuits, thermolators, and temperature control are functioning.',
            'Verify venting, support pillars, clamp surfaces, and platen condition.',
            'Review print for critical cosmetic, seal, and fit surfaces.',
          ],
        },
        { type: 'heading', level: 3, text: '4.2 During Setup: Process Checklist' },
        {
          type: 'orderedList',
          items: [
            'Establish a stable fill profile and consistent transfer position.',
            'Set pack/hold only high enough to achieve dimensions without exaggerating witness areas.',
            'Determine gate seal time and avoid unnecessary hold time.',
            'Set melt and mold temperatures to the resin\'s stable processing window.',
            'Use sufficient cooling time before ejection.',
            'Verify clamp tonnage, parallelism, and mold protection settings.',
            'Trend witness mark appearance shot-to-shot and by cavity.',
          ],
        },
        { type: 'heading', level: 3, text: '4.3 In a Perfect World: Ideal vs Poor Control' },
        {
          type: 'table',
          caption: 'Ideal State vs Poor Control',
          columns: ['Ideal', 'Poor Control'],
          rows: [
            ['Faint, uniform parting line in low-cosmetic area', 'Pronounced parting line flash and mismatch'],
            ['Low-profile ejector marks aligned to tooling features', 'Raised, proud ejector marks'],
            ['Gate vestige low-profile and on non-cosmetic surface', 'Heavy, raised gate vestige'],
            ['Shutoff transitions aligned and consistent', 'Irregular, misaligned shutoff witness'],
          ],
        },
        { type: 'heading', level: 3, text: '4.4 What Good Looks Like' },
        {
          type: 'list',
          items: ['Faint', 'Repeatable', 'Aligned to tooling features', 'Low profile', 'Stable cavity-to-cavity', 'Off critical surfaces'],
        },
        { type: 'heading', level: 3, text: '4.5 Red Flags' },
        {
          type: 'list',
          items: [
            'Sudden change',
            'One-cavity only',
            'Raised / proud line',
            'Flash at witness area',
            'Ejection whitening or drag',
            'Mark drifting with process changes',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Troubleshooting Tip',
          text: 'If witness marks worsen, separate the problem into tooling, thermal, filling, packing, cooling, and ejection categories.',
        },
        { type: 'image', src: witnessMarksPrevention, alt: 'Preventing and Controlling Witness Marks — Preparation & setup infographic' },
      ],
    },
  ],
};
