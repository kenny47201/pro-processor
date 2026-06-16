import type { KnowledgeGuide } from './fountainFlowGuide';

import gateFreezeWeightVsHold from '@/assets/gate-freeze-weight-vs-hold.png';
import gateFreezeColdRunner from '@/assets/gate-freeze-cold-runner.png';
import gateFreezeSealTiming from '@/assets/gate-freeze-seal-timing.png';
import gateFreezeStackMold from '@/assets/gate-freeze-stack-mold.png';

export const gateFreezeGuide: KnowledgeGuide = {
  slug: 'gate seal-off-kinetics',
  title: 'Gate Seal-Off Kinetics',
  summary:
    'A comprehensive guide to understanding when and why the gate seals during packing — covering the physics of freeze-off, press settings that affect it, runner system differences, and how to run a gate seal study.',
  sections: [
    /* ── Section 1: What Gate Seal-Off Is ── */
    {
      id: 'what-it-is',
      title: '1. What Gate Seal-Off Is',
      blocks: [
        {
          type: 'paragraph',
          text: 'Gate seal-off is the point at which the polymer in the narrow gate solidifies enough that pack/hold pressure can no longer push material into the cavity. The gate has "sealed," and any additional hold time beyond this point is wasted cycle time.',
        },
        { type: 'heading', level: 3, text: '1.1 Definition' },
        {
          type: 'paragraph',
          text: 'The word "kinetics" matters because gate seal-off is not an instant event — it is a time-dependent process governed by heat transfer, pressure, gate geometry, and material behavior. In a classic cold-runner study, shot weight rises as hold time increases, then levels off when the gate seals and additional hold time no longer adds material to the part.',
        },
        { type: 'heading', level: 3, text: '1.2 Why It Matters' },
        {
          type: 'paragraph',
          text: 'Gate seal-off kinetics is one of the main reasons hold time exists at all. The timing of the gate seal directly controls part quality and cycle efficiency:',
        },
        {
          type: 'list',
          items: [
            'Hold time too short — the cavity loses pressure before the gate seals, causing backflow, lower part weight, sink marks, voids, and higher dimensional variation.',
            'Hold time too long — cycle time is wasted without improving the part, directly reducing machine capacity and raising cost.',
            'Hold time optimized — set slightly beyond the freeze point to protect against normal variation while maximizing efficiency.',
          ],
        },
        { type: 'heading', level: 3, text: '1.3 How It Happens' },
        {
          type: 'paragraph',
          text: 'The gate is usually the last small cross-section between the pressurized cavity and the feed system, so it acts like the "thermal fuse" of the process. Heat leaves the melt through the steel around the gate; once the gate skin becomes thick enough, the remaining molten core can no longer transmit pressure effectively, and flow stops.',
        },
        {
          type: 'paragraph',
          text: 'The exact freeze time depends on:',
        },
        {
          type: 'list',
          items: [
            'Gate size and shape — larger or thicker gates delay freeze-off.',
            'Resin viscosity and crystallization behavior — semi-crystalline resins behave differently from amorphous ones.',
            'Mold steel and cooling design — cooling channel layout, distance to gate, and steel mass all affect heat extraction.',
            'Mold temperature — warmer steel removes heat more slowly.',
            'Melt temperature — hotter melt needs more time to lose heat before sealing.',
            'Packing pressure — higher pressure keeps material dense and can delay apparent weight plateau.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Beginner Model',
          text: 'Think of the gate like a narrowing ice tunnel. At first it is wide enough that pressure can still push material through; as the walls cool, the tunnel shrinks until the last bit of molten polymer can no longer move. The exact time this takes depends on how much heat the melt starts with, how fast the steel can remove it, how big the tunnel is, and whether pressure is still being applied.',
        },
        {
          type: 'image',
          src: gateFreezeWeightVsHold,
          alt: 'Graph showing part weight rising with hold time then plateauing at the gate seal-off point.',
          figureNumber: 'Figure 1',
          caption: 'Weight vs. Hold Time — Part weight rises as the cavity fills and packs. When the gate seals, flow stops and weight plateaus.',
        },
      ],
    },
    /* ── Section 2: Cold Runner Gate Sealing ── */
    {
      id: 'cold-runner-sealing',
      title: '2. Cold Runner Mold — Gate Sealing',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cold runner molds show the clearest gate seal curve because the gate is expected to freeze thermally. The sealing process follows three distinct phases.',
        },
        { type: 'heading', level: 3, text: '2.1 The Three Phases' },
        {
          type: 'orderedList',
          items: [
            'Filling — melt flows through the gate into the cavity. The gate is fully open and flow is unrestricted.',
            'Cooling — polymer near the gate cools and solidifies. A frozen layer grows inward from the gate walls, progressively narrowing the flow channel.',
            'Gate Sealed — the gate is frozen. Flow stops completely. No more material can enter or leave the cavity.',
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Key Characteristics' },
        {
          type: 'list',
          items: [
            'Seal timing depends on cooling rate, part thickness, gate size, and mold temperature.',
            'Part weight rises with hold time, then plateaus sharply once the gate seals.',
            'Cold runners generate runner scrap or ejected runners, so the feed system itself can freeze and influence the apparent pack response.',
            'If the runner and part plateau together, the feed system may be freezing first.',
            'If the part plateaus while the runner keeps changing, the limitation may be in the part geometry rather than the gate.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Study Tip',
          text: 'Cold runner gate seal studies produce the sharpest, most readable plateau curves. They are the ideal starting point for learning this technique.',
        },
        {
          type: 'image',
          src: gateFreezeColdRunner,
          alt: 'Cross-section diagram showing three stages of gate sealing in a cold runner mold: Filling, Cooling, and Gate Sealed.',
          figureNumber: 'Figure 2',
          caption: 'Cold Runner Mold — Gate Sealing — Three-phase progression from open flow through cooling to complete gate seal.',
        },
      ],
    },
    /* ── Section 3: Gate Behavior Comparison — Seal Timing ── */
    {
      id: 'seal-timing-comparison',
      title: '3. Gate Behavior Comparison — Seal Timing',
      blocks: [
        {
          type: 'paragraph',
          text: 'How and when the gate seals differs significantly between cold runner, hot runner (open gate), and valve-gated hot runner systems. Understanding these differences is essential for interpreting gate seal studies correctly.',
        },
        { type: 'heading', level: 3, text: '3.1 Cold Runner' },
        {
          type: 'paragraph',
          text: 'Gate seals by cooling. The melt in the gate loses heat to the surrounding steel until a solid skin forms that blocks flow.',
        },
        {
          type: 'list',
          items: [
            'Phases: Filling → Cooling → Sealed.',
            'Seal timing depends on cooling rate, part thickness, gate size, and mold temperature.',
            'Produces the sharpest weight-vs-hold-time plateau.',
          ],
        },
        { type: 'heading', level: 3, text: '3.2 Hot Runner (Open Gate)' },
        {
          type: 'paragraph',
          text: 'Gate seals by thermal shut-off. The runner system is kept molten, but the gate tip area eventually cools enough to restrict flow.',
        },
        {
          type: 'list',
          items: [
            'Phases: Filling / Packing → Shut-Off → Sealed.',
            'Seal timing is controlled by hot runner nozzle temperature (thermal shut-off).',
            'The gate may never produce a perfectly flat weight plateau — part weight often keeps increasing slightly and stabilizes by trend rather than sharp seal.',
            'Gate/tip temperature control is critical for consistent seal behavior.',
          ],
        },
        { type: 'heading', level: 3, text: '3.3 Valve-Gated Hot Runner' },
        {
          type: 'paragraph',
          text: 'Gate seals by valve pin. A mechanical pin closes the gate at a programmed time or pressure, so seal timing is governed by valve actuation rather than pure thermal freeze.',
        },
        {
          type: 'list',
          items: [
            'Phases: Filling / Packing → Valve Closes → Sealed.',
            'Seal timing is controlled by valve actuation (timed or by position/pressure).',
            'Mechanical closure replaces pure thermal sealing behavior.',
            'More precise and repeatable seal timing than thermal methods.',
          ],
        },
        { type: 'heading', level: 3, text: '3.4 Comparison Summary' },
        {
          type: 'table',
          caption: 'Gate Seal Mechanisms by System Type',
          columns: ['Factor', 'Cold Runner', 'Hot Runner (Open)', 'Valve-Gated Hot Runner'],
          rows: [
            ['Seal mechanism', 'Thermal cooling', 'Thermal shut-off at tip', 'Mechanical valve pin'],
            ['Seal timing control', 'Gate size, mold temp, cooling', 'Nozzle temperature', 'Valve actuation timing'],
            ['Plateau shape', 'Sharp, clear', 'Gradual / trending', 'Determined by valve close time'],
            ['Repeatability', 'Good (thermal)', 'Moderate (thermal variation)', 'Best (mechanical)'],
          ],
        },
        {
          type: 'image',
          src: gateFreezeSealTiming,
          alt: 'Side-by-side comparison of gate seal timing for cold runner, hot runner open gate, and valve-gated hot runner systems.',
          figureNumber: 'Figure 3',
          caption: 'Gate Behavior Comparison — Seal Timing — How and when the gate seals for cold runner, hot runner (open gate), and valve-gated hot runner systems.',
        },
      ],
    },
    /* ── Section 4: Stack Mold Differences ── */
    {
      id: 'stack-mold',
      title: '4. Stack Mold — Different Thermal Paths',
      blocks: [
        {
          type: 'paragraph',
          text: 'Stack molds add complexity because upper and lower cavities can experience different cooling rates, so gate seal-off can occur at different times.',
        },
        { type: 'heading', level: 3, text: '4.1 Why Levels Freeze Differently' },
        {
          type: 'heading',
          level: 3,
          text: 'Level 1 (Upper Cavity)',
        },
        {
          type: 'list',
          items: [
            'Closer to the colder top clamp plate.',
            'Shorter / more direct heat path.',
            'Cools faster.',
            'Freezes earlier.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Level 2 (Lower Cavity)',
        },
        {
          type: 'list',
          items: [
            'Heat must pass through manifold and support plate.',
            'Longer heat path / more resistance.',
            'Cools slower.',
            'Freezes later.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Key Principle',
          text: 'Different thermal paths = Different freeze-off times. This means a single hold setting may not produce the same seal timing everywhere in the tool.',
        },
        { type: 'heading', level: 3, text: '4.2 Practical Implications' },
        {
          type: 'list',
          items: [
            'Multiple parting planes with potentially asymmetric flow paths.',
            'Each gate or level can freeze at different times due to runner length, thermal exposure, pressure drop, and cooling balance differences.',
            'Stack molds demand more attention to cavity-to-cavity balance.',
            'Verify balance by weighing parts from each level independently during gate seal studies.',
            'Temperature matching between levels is critical for consistent seal timing.',
          ],
        },
        {
          type: 'image',
          src: gateFreezeStackMold,
          alt: 'Cross-section diagram of a stack mold showing different thermal paths between upper and lower cavity levels.',
          figureNumber: 'Figure 4',
          caption: 'Stack Mold — Different Thermal Paths, Different Freeze-Off — Upper and lower cavities experience different cooling rates, causing gate seal-off to occur at different times.',
        },
      ],
    },
    /* ── Section 5: Press Settings That Affect Freeze-Off ── */
    {
      id: 'press-settings',
      title: '5. Press Settings & Parameter Effects',
      blocks: [
        {
          type: 'paragraph',
          text: 'Several press settings directly influence when the gate seals. Understanding these relationships allows systematic control of freeze-off timing.',
        },
        { type: 'heading', level: 3, text: '5.1 Press Settings' },
        {
          type: 'table',
          caption: 'How Press Settings Change Gate Seal-Off',
          columns: ['Setting', 'Increase It and the Gate Usually...', 'Why'],
          rows: [
            ['Melt temperature', 'Freezes later', 'Hotter melt needs more time to lose heat before sealing.'],
            ['Mold temperature', 'Freezes later', 'Warmer steel removes heat more slowly from the gate.'],
            ['Hold / pack pressure', 'Can keep the gate open slightly longer; increases amount packed before seal', 'Higher pressure keeps material dense and can delay the apparent end of weight increase; can also influence crystallization in some resins.'],
            ['Hold time', 'Does not change the physics of freeze-off, but determines whether you are holding before or after seal', 'Too short means backflow; too long means wasted time.'],
            ['Injection speed', 'Often changes apparent freeze behavior indirectly', 'Faster fill creates more shear heating and a different temperature history near the gate.'],
            ['Back pressure', 'Affects melt conditioning, not gate seal directly', 'Changes melt density, mixing, and barrel temperature uniformity more than gate sealing itself.'],
            ['Cooling time', 'Does not change when the gate seals', 'Cooling time is often reduced when hold time is increased during a study to keep total cycle constant.'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Beginner Rule',
          text: 'Hotter melt, hotter mold, and a larger or thicker gate all tend to delay freeze-off. Colder conditions and smaller gates tend to make it happen sooner.',
        },
        { type: 'heading', level: 3, text: '5.2 Common Parameter Effects' },
        {
          type: 'table',
          caption: 'Summary of Common Parameter Changes and Their Effects',
          columns: ['Change', 'Likely Result'],
          rows: [
            ['Increase melt temperature', 'Longer freeze-off time, more chance of overpacking if hold is not adjusted.'],
            ['Increase mold temperature', 'Longer freeze-off time.'],
            ['Increase gate size', 'Longer freeze-off time, more packing window.'],
            ['Decrease gate size', 'Shorter freeze-off time, earlier seal.'],
            ['Increase hold pressure', 'More part weight before freeze; may also increase flash risk if clamp is insufficient.'],
            ['Increase cooling efficiency near gate', 'Shorter freeze-off time.'],
            ['Use hot runner', 'No runner freeze scrap, but less obvious thermal plateau.'],
            ['Use valve gate', 'Mechanical closure replaces pure thermal sealing behavior.'],
          ],
        },
      ],
    },
    /* ── Section 6: Pre-Molding Choices & How to Study It ── */
    {
      id: 'study-method',
      title: '6. How to Study Gate Seal-Off',
      blocks: [
        { type: 'heading', level: 3, text: '6.1 What Changes Before Molding' },
        {
          type: 'paragraph',
          text: 'Several pre-molding choices strongly affect freeze-off kinetics and should be considered before running a study:',
        },
        {
          type: 'list',
          items: [
            'Gate design — bigger gates, thicker gates, fan gates, submarine gates, and valve gates all change heat flow and sealing time.',
            'Material choice — amorphous and semi-crystalline resins behave differently because crystallization changes the pressure–temperature response during packing.',
            'Drying and moisture control — poorly dried hygroscopic resins can shift viscosity and packing behavior, which affects the observed freeze time.',
            'Mold temperature control design — cooling channel layout, distance to the gate, steel mass, and heat extraction efficiency matter before the first shot.',
            'Mold flow analysis — simulation can estimate freeze timing but physical validation is still needed because real tools usually differ from idealized models.',
          ],
        },
        { type: 'heading', level: 3, text: '6.2 The Standard Method' },
        {
          type: 'paragraph',
          text: 'The standard gate seal (gate-seal) study is straightforward:',
        },
        {
          type: 'orderedList',
          items: [
            'Lock all process parameters except hold time. Use a consistent cycle, barrel temp, injection speed, and transfer position.',
            'Start with a short hold time (e.g. 1 second).',
            'Run 5+ consecutive shots, weigh each, and record the average.',
            'Increase hold time by 0.5–1 second and repeat.',
            'Plot weight versus hold time.',
            'Identify the plateau — where part weight stabilizes.',
            'Set production hold time slightly above the freeze point, not exactly on it.',
          ],
        },
        { type: 'heading', level: 3, text: '6.3 Reading the Curve' },
        {
          type: 'list',
          items: [
            'Weight rises steeply — the gate is still open and the part is still being packed.',
            'Weight levels off — the gate is frozen and additional hold time is wasted.',
            'Weight never flattens cleanly (hot runner) — look for a stable low-rate increase instead of a classic plateau.',
            'Runner and part plateau together — the feed system may be freezing first.',
            'Part plateaus while runner keeps changing — the limitation may be in part geometry rather than the gate.',
          ],
        },
        { type: 'heading', level: 3, text: '6.4 Practical Mastery Rules' },
        {
          type: 'orderedList',
          items: [
            'Optimize fill first, then pack, then hold time.',
            'Set melt temperature, mold temperature, and fill speed before doing a freeze study.',
            'Use a scale and plot weight versus hold time.',
            'Set hold time slightly beyond the plateau, not right on it.',
            'Recheck the study after any major change in resin, gate design, mold temperature, or press setup.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Working Takeaway',
          text: 'Gate seal-off kinetics is the timing law that tells you when packing can stop without hurting the part. Master it by learning the interaction of gate geometry, heat transfer, pressure, and runner type — then validate with a real gate seal study on the actual mold.',
        },
      ],
    },
  ],
};
