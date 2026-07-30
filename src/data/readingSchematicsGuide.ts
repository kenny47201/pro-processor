import type { KnowledgeGuide } from './fountainFlowGuide';
import schematicsOverviewCard from '@/assets/schematics-overview-infographic.png';
import schematicsHydraulicCard from '@/assets/schematics-hydraulic-infographic.png';
import schematicsPneumaticCard from '@/assets/schematics-pneumatic-infographic.png';
import schematicsElectricalCard from '@/assets/schematics-electrical-infographic.png';

export const readingSchematicsGuide: KnowledgeGuide = {
  slug: 'reading-schematics-hydraulic-pneumatic-electrical',
  title: 'How to Read Schematics: Hydraulic, Pneumatic, and Electrical',
  summary:
    'Beginner-friendly method for reading hydraulic, pneumatic, and electrical schematics: find the source, trace the control path, identify the loads, and follow the return.',
  sections: [
    {
      id: 'start-here',
      title: 'Start Here',
      blocks: [
        {
          type: 'paragraph',
          text: 'A schematic is not a picture of the machine; it is a simplified drawing that shows what connects to what and what each part is supposed to do. Once you learn to follow the lines and recognize the symbols, you can understand how the machine works without opening it up. The key is to read it like a story: where does power enter, what controls it, and where does it go next.',
        },
        {
          type: 'image',
          src: schematicsOverviewCard,
          alt: 'Beginner overview reference card comparing hydraulic, pneumatic, and electrical schematics with common symbols',
          figureNumber: 'Card 1',
          caption:
            'Beginner overview: first steps, line-type legend, the three system types, four questions to ask, mistakes to avoid, learning order, and common symbols.',
        },
      ],
    },

    {
      id: 'first-steps',
      title: 'First Steps for Any Schematic',
      blocks: [
        {
          type: 'orderedList',
          items: [
            'Find the title block or legend. This tells you what kind of schematic you are looking at, the machine name, and sometimes the symbol standard being used.',
            'Identify the power source. In hydraulic drawings this is usually a pump and reservoir; in pneumatic drawings it is usually a compressor and air supply; in electrical drawings it is usually a power feed, transformer, or control power source.',
            'Find the loads. Loads are the things doing work, such as cylinders, motors, relays, solenoids, or heaters.',
            'Trace the control path. Ask what opens, closes, energizes, or shifts the system so the load can move.',
            'Read from the source outward. Start at the supply, then follow the path through control devices, then to the actuator or output.',
          ],
        },
      ],
    },
    {
      id: 'hydraulic',
      title: 'Reading Hydraulic Schematics',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hydraulic schematics show how oil is pumped, controlled, and returned to the reservoir. A solid line usually shows the main oil path, dashed lines often show pilot or drain lines, and crossing lines may or may not be connected depending on whether there is a connection dot or a hop-over symbol. Pumps are commonly shown as circles with directional triangles, valves as square boxes, and fluid-conditioning devices such as filters or coolers often appear as diamond-shaped symbols.',
        },
        {
          type: 'orderedList',
          items: [
            'Find the reservoir and pump. This is where the oil starts and where pressure energy is created.',
            'Identify the main pressure line. Follow the line leaving the pump toward the valves and actuators.',
            'Look for pressure control devices. Relief valves, pressure-reducing valves, and counterbalance valves protect the system or hold loads in place.',
            'Find directional control valves. These route oil to extend, retract, start, stop, or hold motion.',
            'Find the actuators. Cylinders and motors are the devices that do the physical work.',
            'Check the return path. Oil must eventually get back to the tank, usually through a return line, filter, or cooler.',
          ],
        },
        {
          type: 'paragraph',
          text: 'A good beginner trick is to ask, "If oil leaves the pump, what valve decides where it goes next?" That question usually leads you through the whole circuit.',
        },
        {
          type: 'symbolTour',
          title: 'Trace a hydraulic circuit step by step',
          description:
            'Tap a step to highlight the symbols and line types to find at that point in the drawing. Work the steps in order and you will have traced the circuit tank to tank.',
          steps: [
            {
              label: 'Find the reservoir and pump',
              focus:
                'Start at the bottom of the drawing where the tank symbol sits, then find the pump feeding out of it. This is where pressure energy is created and where every trace should begin.',
              symbols: [
                { glyph: '⊔', name: 'Reservoir / tank', hint: 'Open-top rectangle; return lines drop into it.' },
                { glyph: '◯▶', name: 'Fixed pump', hint: 'Circle with one solid triangle pointing out.' },
                { glyph: '◯▶▶', name: 'Variable pump', hint: 'Circle with an arrow drawn diagonally through it.' },
                { glyph: 'M', name: 'Electric motor', hint: 'Circle marked M coupled to the pump.' },
              ],
              lineTypes: [
                { name: 'Working line', style: 'solid', accent: 'primary', meaning: 'Main oil flow leaving the pump.' },
                { name: 'Drain line', style: 'dashed', accent: 'muted', meaning: 'Case drain back to tank; carries no work.' },
              ],
              tip: 'If a suction strainer is drawn between tank and pump, note it — it is the first suspect for cavitation noise.',
            },
            {
              label: 'Follow the pressure line',
              focus:
                'Follow the solid line leaving the pump outlet. Note every tee and every gauge port along the way; those are your test points when you troubleshoot later.',
              symbols: [
                { glyph: '⊙', name: 'Pressure gauge', hint: 'Circle with a pointer; marks a legitimate test point.' },
                { glyph: '●', name: 'Connection dot', hint: 'Lines that cross WITH a dot are joined.' },
                { glyph: '⌒', name: 'Hop-over', hint: 'Lines that cross with a hop are NOT joined.' },
              ],
              lineTypes: [
                { name: 'Pressure line', style: 'solid', accent: 'primary', meaning: 'Full system pressure downstream of the pump.' },
              ],
              tip: 'Where the line splits, both branches see the same pressure — only flow divides.',
            },
            {
              label: 'Identify pressure controls',
              focus:
                'Find the devices that limit or hold pressure before the oil reaches an actuator. Their pilot lines tell you what they are sensing.',
              symbols: [
                { glyph: '▣↗', name: 'Relief valve', hint: 'Single square with an arrow and a spring; sets max pressure.' },
                { glyph: '▣↘', name: 'Reducing valve', hint: 'Square with the arrow offset; lowers pressure to one branch.' },
                { glyph: '▣⇅', name: 'Counterbalance', hint: 'Holds a load against gravity until pilot pressure arrives.' },
              ],
              lineTypes: [
                { name: 'Pilot line', style: 'dashed', accent: 'warning', meaning: 'Small signal line that shifts or sets a valve.' },
                { name: 'Tank / return', style: 'solid', accent: 'success', meaning: 'Relieved oil dumping back to reservoir.' },
              ],
              tip: 'A relief valve that dumps to tank all shift is wasted horsepower and the usual source of hot oil.',
            },
            {
              label: 'Find the directional valve',
              focus:
                'Locate the boxed valve that decides where the oil goes. Count the boxes for positions and the ports on each box for ways, then check how it is shifted.',
              symbols: [
                { glyph: '▭▭▭', name: '4/3 directional valve', hint: 'Three boxes = three positions; four ports = four ways.' },
                { glyph: '⌁', name: 'Solenoid operator', hint: 'Small angled box on the valve end; energized electrically.' },
                { glyph: '⌇', name: 'Spring return', hint: 'Coil symbol; shows the rest position when de-energized.' },
              ],
              lineTypes: [
                { name: 'Working lines A and B', style: 'solid', accent: 'primary', meaning: 'Route to the two actuator ports.' },
                { name: 'Pilot line', style: 'dashed', accent: 'warning', meaning: 'Pilot-operated valves need pressure to shift.' },
              ],
              tip: 'Read the center box: closed center holds, tandem center unloads the pump, float center lets the actuator drift.',
            },
            {
              label: 'Find the actuators',
              focus:
                'Follow lines A and B to the device doing the work. Note rod side versus cap side — that is what sets clamp force and speed.',
              symbols: [
                { glyph: '⊏⊐', name: 'Double-acting cylinder', hint: 'Rectangle with a piston and rod; ports on both ends.' },
                { glyph: '◯▶◀', name: 'Hydraulic motor', hint: 'Circle with triangles pointing in; rotary output.' },
                { glyph: '⨯', name: 'Flow control', hint: 'Restrictor with an arrow; meters speed, not force.' },
              ],
              lineTypes: [
                { name: 'Working line', style: 'solid', accent: 'primary', meaning: 'Pressurized side pushing the piston.' },
                { name: 'Return line', style: 'solid', accent: 'success', meaning: 'Displaced oil leaving the opposite port.' },
              ],
              tip: 'Speed comes from flow, force comes from pressure times area. Check which one the complaint is really about.',
            },
            {
              label: 'Close the loop back to tank',
              focus:
                'Finish the trace by following the return path through any filter or cooler and back into the reservoir. A circuit you cannot trace back to tank is a circuit you have not finished reading.',
              symbols: [
                { glyph: '◇', name: 'Filter', hint: 'Diamond with a dashed centerline.' },
                { glyph: '◇≈', name: 'Cooler / heat exchanger', hint: 'Diamond with arrows showing heat removal.' },
                { glyph: '⊔', name: 'Reservoir', hint: 'The trace ends where it started.' },
              ],
              lineTypes: [
                { name: 'Return line', style: 'solid', accent: 'success', meaning: 'Low-pressure oil heading home.' },
                { name: 'Drain line', style: 'dashed', accent: 'muted', meaning: 'Case drains must reach tank unrestricted.' },
              ],
              tip: 'Restricted return or a bypassing return filter shows up as back pressure and sluggish retract.',
            },
          ],
        },
        {
          type: 'image',
          src: schematicsHydraulicCard,
          alt: 'Hydraulic schematic reference card showing main parts, line types, reading order, and an example circuit',
          figureNumber: 'Card 2',
          caption:
            'Hydraulic reference card: main parts to find first, line-type legend, connection dot versus hop-over, six-step reading order, and a tank-to-tank example circuit.',
        },

      ],
    },
    {
      id: 'pneumatic',
      title: 'Reading Pneumatic Schematics',
      blocks: [
        {
          type: 'paragraph',
          text: 'Pneumatic schematics look similar to hydraulic ones, but they show compressed air instead of oil. The same basic symbol logic applies, but the system is usually simpler because air is exhausted to atmosphere instead of returned to a tank. You will still see valves, cylinders, flow controls, regulators, filters, and sometimes a compressor, receiver, and air preparation unit.',
        },
        {
          type: 'orderedList',
          items: [
            'Find the air supply. This may be a compressor, air line, or plant air header.',
            'Find the air preparation section. Filters, regulators, and lubricators condition the air before it reaches the machine.',
            'Trace the control valve. This is usually the part that decides when air goes to a cylinder or vent.',
            'Find the cylinder or air motor. This is the part that moves.',
            'Look for exhaust paths. Exhaust is often shown venting to atmosphere, sometimes through a muffler or quick-exhaust device.',
            'Check pilot lines and signal lines. These often control the main valve with very little air flow.',
          ],
        },
        {
          type: 'paragraph',
          text: 'A pneumatic circuit is often easier to understand if you think of it as "air in, air controlled, air out".',
        },
        {
          type: 'symbolTour',
          title: 'Trace a pneumatic circuit step by step',
          description:
            'Tap a step to highlight the symbols and line types to find. Air in, air controlled, air out — the trace ends at atmosphere, not at a tank.',
          steps: [
            {
              label: 'Find the air supply',
              focus:
                'Start at the compressor, receiver, or plant air header symbol. Note the supply pressure called out on the drawing; every downstream setting is relative to it.',
              symbols: [
                { glyph: '◯▶', name: 'Compressor', hint: 'Circle with an outward triangle, like a pump.' },
                { glyph: '⬭', name: 'Receiver tank', hint: 'Oval or rounded vessel storing volume.' },
                { glyph: '▽', name: 'Air supply / source', hint: 'Open triangle marking the plant air connection.' },
              ],
              lineTypes: [
                { name: 'Main air line', style: 'solid', accent: 'primary', meaning: 'Full supply pressure to the machine.' },
              ],
              tip: 'Low plant air at the header makes every device downstream look faulty. Verify supply before chasing valves.',
            },
            {
              label: 'Check air preparation (FRL)',
              focus:
                'Find the filter, regulator, and lubricator group. This is where dirty, wet, unregulated air becomes usable air, and where most nuisance faults start.',
              symbols: [
                { glyph: '◇', name: 'Filter / water separator', hint: 'Diamond with a bowl and drain underneath.' },
                { glyph: '▣↘', name: 'Regulator', hint: 'Square with an adjustable spring arrow.' },
                { glyph: '◇◦', name: 'Lubricator', hint: 'Diamond with a drop symbol inside.' },
              ],
              lineTypes: [
                { name: 'Regulated air', style: 'solid', accent: 'primary', meaning: 'Downstream of the regulator at set pressure.' },
                { name: 'Drain', style: 'dashed', accent: 'muted', meaning: 'Condensate path out of the filter bowl.' },
              ],
              tip: 'A dashed box drawn around the three devices means a combined FRL unit, not three separate parts.',
            },
            {
              label: 'Trace the control valve',
              focus:
                'Find the boxed directional valve that decides when air reaches the cylinder. Check its actuators on both ends: solenoid, pilot, manual lever, or spring return.',
              symbols: [
                { glyph: '▭▭', name: '5/2 valve', hint: 'Two boxes, five ports: supply, two work ports, two exhausts.' },
                { glyph: '⌁', name: 'Solenoid operator', hint: 'Electrically shifted; ties back to the electrical print.' },
                { glyph: '⌇', name: 'Spring return', hint: 'Defines the safe rest position on air loss.' },
              ],
              lineTypes: [
                { name: 'Work lines', style: 'solid', accent: 'primary', meaning: 'Air routed to each cylinder port.' },
                { name: 'Pilot line', style: 'dashed', accent: 'warning', meaning: 'Low-flow signal that shifts the main valve.' },
              ],
              tip: 'Note the rest position. It tells you where the cylinder parks when the machine loses air or power.',
            },
            {
              label: 'Find the cylinder or air motor',
              focus:
                'Follow the work lines to the moving device, and note any flow controls at its ports. In pneumatics, speed is almost always set by metering exhaust, not supply.',
              symbols: [
                { glyph: '⊏⊐', name: 'Double-acting cylinder', hint: 'Ports on both ends; air both extends and retracts.' },
                { glyph: '⊏|', name: 'Single-acting cylinder', hint: 'One port plus a return spring.' },
                { glyph: '⨯▷', name: 'Flow control with check', hint: 'Restrictor plus bypass check; meters one direction only.' },
              ],
              lineTypes: [
                { name: 'Work line', style: 'solid', accent: 'primary', meaning: 'Pressurized side driving the stroke.' },
                { name: 'Metered exhaust', style: 'solid', accent: 'success', meaning: 'Air leaving through the restricted port sets speed.' },
              ],
              tip: 'Bouncy or lurching motion usually means meter-in control or an undersized cylinder, not a bad valve.',
            },
            {
              label: 'Follow the exhaust to atmosphere',
              focus:
                'Finish at the exhaust ports. Unlike hydraulics, the trace ends venting to atmosphere, often through a muffler or a quick-exhaust valve mounted at the cylinder.',
              symbols: [
                { glyph: '▽', name: 'Exhaust to atmosphere', hint: 'Open triangle at the valve exhaust ports.' },
                { glyph: '▽≡', name: 'Muffler / silencer', hint: 'Triangle with hatching; restricts if clogged.' },
                { glyph: '▣▽', name: 'Quick exhaust valve', hint: 'Dumps cylinder air locally for fast retract.' },
              ],
              lineTypes: [
                { name: 'Exhaust path', style: 'solid', accent: 'success', meaning: 'Air on its way out of the system.' },
              ],
              tip: 'A plugged muffler slows a cylinder exactly like a failing valve. Check it before you replace parts.',
            },
            {
              label: 'Check pilot and signal lines',
              focus:
                'Trace the thin dashed lines last. They carry almost no flow but decide when everything else happens, and they link the pneumatic print to the electrical print.',
              symbols: [
                { glyph: '⌁', name: 'Solenoid pilot', hint: 'Where a PLC output enters the air circuit.' },
                { glyph: '◉', name: 'Pressure switch', hint: 'Sends a signal back to the control system.' },
                { glyph: '▣&', name: 'AND / OR logic valve', hint: 'Shuttle or two-pressure valve used as air logic.' },
              ],
              lineTypes: [
                { name: 'Pilot / signal line', style: 'dashed', accent: 'warning', meaning: 'Control signal, not working air.' },
                { name: 'Electrical link', style: 'dotted', accent: 'muted', meaning: 'Cross-reference to the electrical schematic.' },
              ],
              tip: 'If the valve never shifts, decide first whether the missing thing is the pilot signal or the main air.',
            },
          ],
        },
        {
          type: 'image',
          src: schematicsPneumaticCard,
          alt: 'Pneumatic schematic reference card showing air supply, FRL, valves, exhaust paths, and an example circuit',
          figureNumber: 'Card 3',
          caption:
            'Pneumatic reference card: air supply and preparation, valves and flow controls, exhaust and pilot lines, plus a double-acting cylinder example circuit.',
        },

      ],
    },
    {
      id: 'electrical',
      title: 'Reading Electrical Schematics',
      blocks: [
        {
          type: 'paragraph',
          text: 'Electrical schematics are different in one important way: they show signals and power for control, not fluid flow. Instead of oil or air moving through valves, electricity moves through wires, switches, relays, contactors, sensors, coils, and motors. Electrical schematics often use logic-like behavior, so a small switch or sensor can control a much larger device through a relay or contactor.',
        },
        {
          type: 'orderedList',
          items: [
            'Find the power source. This may be line power, a control transformer, or a DC supply.',
            'Identify protection devices. Fuses, breakers, overloads, and emergency stops are usually near the power entry.',
            'Find the control devices. These can be pushbuttons, limit switches, pressure switches, proximity sensors, relays, or PLC inputs.',
            'Find the output devices. These are usually solenoids, motor starters, contactors, indicator lights, or alarms.',
            'Trace the circuit from left to right or top to bottom. Many drawings are organized so current flows through the logic in a readable direction.',
            'Look for normally open and normally closed contacts. These tell you what happens when a switch is at rest versus when it is activated.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Think of an electrical schematic as a decision tree: "If this switch closes, then this relay energizes, then this coil shifts the valve or starts the motor".',
        },
        {
          type: 'symbolTour',
          title: 'Trace an electrical ladder step by step',
          description:
            'Tap a step to highlight the symbols and line types to find. Read each rung left to right: power in, permissives, coil out.',
          steps: [
            {
              label: 'Find the power source',
              focus:
                'Identify the rails first. On a ladder drawing the left rail is the hot side and the right rail is the common or neutral. Note the voltage of the control circuit before you probe anything.',
              symbols: [
                { glyph: 'L1 / L2', name: 'Supply rails', hint: 'Vertical lines on each side of the ladder.' },
                { glyph: '⧢', name: 'Control transformer', hint: 'Two coils; steps 480 VAC down to 120 VAC control.' },
                { glyph: '+24 / 0V', name: 'DC power supply', hint: 'Feeds PLC I/O and sensors.' },
              ],
              lineTypes: [
                { name: 'Power conductor', style: 'solid', accent: 'primary', meaning: 'Carries control voltage through the rung.' },
                { name: 'Ground / bonding', style: 'dotted', accent: 'muted', meaning: 'Equipment grounding, not a signal path.' },
              ],
              tip: 'Always confirm which common your meter is referenced to. A wrong common produces convincing wrong readings.',
            },
            {
              label: 'Identify protection and E-stops',
              focus:
                'Just past the power entry, find the fuses, breakers, overloads, and emergency stop contacts. If any of these are open, every rung below them is dead.',
              symbols: [
                { glyph: '▭⌇', name: 'Fuse', hint: 'Small rectangle in series with the rail.' },
                { glyph: '⌒⌒', name: 'Circuit breaker', hint: 'Switch with a trip element.' },
                { glyph: '⊘', name: 'E-stop (NC)', hint: 'Mushroom head, normally closed contact.' },
                { glyph: '⌁OL', name: 'Overload contact', hint: 'Opens the starter rung on thermal trip.' },
              ],
              lineTypes: [
                { name: 'Protected feed', style: 'solid', accent: 'primary', meaning: 'Downstream of protection devices.' },
                { name: 'Safety circuit', style: 'double', accent: 'warning', meaning: 'Dual-channel safety wiring on newer prints.' },
              ],
              tip: 'Test source side and load side of each protective device. Half the "dead machine" calls stop right here.',
            },
            {
              label: 'Find the control devices',
              focus:
                'Read the inputs in the middle of the rung. These are the permissives — every one of them must be satisfied before the output on the right can energize.',
              symbols: [
                { glyph: '─┤├─', name: 'Normally open contact', hint: 'Closes when its device or coil is activated.' },
                { glyph: '─┤/├─', name: 'Normally closed contact', hint: 'Opens when activated; passes power at rest.' },
                { glyph: '⊙PB', name: 'Pushbutton', hint: 'Momentary start or stop input.' },
                { glyph: '⌐LS', name: 'Limit / proximity switch', hint: 'Position feedback; often a PLC input.' },
              ],
              lineTypes: [
                { name: 'Rung conductor', style: 'solid', accent: 'primary', meaning: 'Series path — all contacts must close.' },
                { name: 'Parallel branch', style: 'solid', accent: 'success', meaning: 'Any one closed branch passes power (seal-in).' },
              ],
              tip: 'Contacts are drawn de-energized and at rest. Ask what the state should be right now before calling one faulty.',
            },
            {
              label: 'Find the output device',
              focus:
                'The right end of the rung is the output. Identify what it actually drives — a relay coil, a contactor, a solenoid on the hydraulic or pneumatic print, a heater, or a lamp.',
              symbols: [
                { glyph: '─( )─', name: 'Relay / contactor coil', hint: 'Circle at the far right of the rung.' },
                { glyph: '─(SOL)─', name: 'Valve solenoid', hint: 'Cross-references directly to a valve on the fluid print.' },
                { glyph: '⊗', name: 'Indicator lamp', hint: 'Shows state; useful free diagnostics.' },
                { glyph: 'M', name: 'Motor starter', hint: 'Contactor plus overload driving a motor.' },
              ],
              lineTypes: [
                { name: 'Output leg', style: 'solid', accent: 'primary', meaning: 'Coil side of the rung back to common.' },
                { name: 'Cross-reference', style: 'dotted', accent: 'muted', meaning: 'Points to the contacts this coil operates elsewhere.' },
              ],
              tip: 'Voltage at the coil but no action means a failed coil or an open common. No voltage means the fault is upstream.',
            },
            {
              label: 'Follow the contact cross-references',
              focus:
                'Use the numbers printed beside each coil to jump to the rungs where its contacts appear. This is how one rung reaches out and controls the rest of the machine.',
              symbols: [
                { glyph: '12 / 407', name: 'Rung cross-reference', hint: 'Line numbers listed under a coil.' },
                { glyph: '─┤├─CR1', name: 'Referenced contact', hint: 'Same tag as the coil, appearing on another rung.' },
                { glyph: 'I:1/4', name: 'PLC I/O address', hint: 'Ties field wiring to program logic.' },
              ],
              lineTypes: [
                { name: 'Logic reference', style: 'dotted', accent: 'muted', meaning: 'Not a wire — a pointer to another sheet.' },
              ],
              tip: 'Chase the cross-references before you pull a panel apart. The failing device is often two rungs away from the symptom.',
            },
          ],
        },
        {
          type: 'image',
          src: schematicsElectricalCard,
          alt: 'Electrical schematic reference card showing power sources, protection, control devices, contact behavior, and a ladder example circuit',
          figureNumber: 'Card 4',
          caption:
            'Electrical reference card: power and protection, control and output devices, normally open versus normally closed behavior, and a start/stop relay ladder example.',
        },

      ],
    },
    {
      id: 'compare',
      title: 'How to Compare Them',
      blocks: [
        {
          type: 'table',
          columns: ['System', 'Power Source', 'What Moves', 'Control Devices', 'Where It Ends'],
          rows: [
            ['Hydraulic', 'Pump and reservoir', 'Pressurized oil', 'Relief, directional, and flow valves', 'Return line back to tank'],
            ['Pneumatic', 'Compressor, receiver, plant air', 'Compressed air', 'FRL, regulators, directional and flow valves', 'Exhaust to atmosphere'],
            ['Electrical', 'Line power, transformer, DC supply', 'Current and control signals', 'Switches, sensors, relays, PLC outputs', 'Load energized, then circuit opens'],
          ],
        },
      ],
    },
    {
      id: 'simple-method',
      title: 'A Simple Reading Method',
      blocks: [
        {
          type: 'paragraph',
          text: 'Use the same four questions on every schematic:',
        },
        {
          type: 'orderedList',
          items: [
            'Where does power come from?',
            'What controls it?',
            'What does it move or energize?',
            'Where does it return or stop?',
          ],
        },
        {
          type: 'paragraph',
          text: 'If you can answer those four questions, you can usually understand the entire circuit at a beginner level.',
        },
      ],
    },
    {
      id: 'mistakes',
      title: 'Beginner Mistakes to Avoid',
      blocks: [
        {
          type: 'list',
          items: [
            'Do not assume every line means the same thing; line type can matter a lot.',
            'Do not read only one symbol in isolation; always check the neighboring symbols and the line paths.',
            'Do not assume "top of the page" means "first in operation" unless the drawing explicitly supports that.',
            'Do not confuse electrical control signals with hydraulic or pneumatic power lines.',
          ],
        },
      ],
    },
    {
      id: 'practice-example',
      title: 'Practice Example',
      blocks: [
        {
          type: 'paragraph',
          text: 'Imagine a hydraulic clamp circuit. The pump sends oil to a directional valve, the valve sends oil to a cylinder, the cylinder clamps the mold, and a pressure device protects the circuit if pressure rises too high. In the electrical drawing, a pushbutton or PLC output energizes the solenoid that moves that valve. The pneumatic version works the same way, except air replaces oil and exhaust goes to atmosphere.',
        },
      ],
    },
    {
      id: 'learning-order',
      title: 'Learning Order',
      blocks: [
        {
          type: 'paragraph',
          text: 'If you are a complete beginner, learn in this order:',
        },
        {
          type: 'orderedList',
          items: [
            'Basic symbols and line types.',
            'Supply source and return path.',
            'Valves and what they control.',
            'Actuators and loads.',
            'Control logic and safety devices.',
            'Full-circuit tracing from start to finish.',
          ],
        },
        {
          type: 'paragraph',
          text: 'That sequence keeps the subject simple and prevents the diagrams from feeling overwhelming.',
        },
      ],
    },
  ],
};
