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
