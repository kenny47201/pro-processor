import type { KnowledgeGuide } from './fountainFlowGuide';

export const hydraulicsPneumaticsGuide: KnowledgeGuide = {
  slug: 'hydraulics-pneumatics-technician-guide',
  title: 'Hydraulics & Pneumatics: A Teaching Guide for Maintenance Technicians',
  summary:
    'Twelve-module teaching guide covering fluid-power fundamentals, system anatomy, safety, fault diagnosis, contamination control, and minimum technician competency — applied to injection molding.',
  sections: [
    {
      id: 'what-imm-does',
      title: '1. What an Injection Molding Machine is Really Doing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'An injection molding machine is a cyclic system that plasticizes material, injects it into a mold, holds pressure as the part cools, then ejects the finished part. Maintenance technicians support a machine whose quality and repeatability depend on motion control, pressure control, temperature control, and cleanliness.',
        },
        {
          type: 'paragraph',
          text:
            'Industrial machines rely on fluid power to move clamps, injectors, ejectors, valves, and auxiliaries. Practical fault-finding skills matter more than abstract design theory.',
        },
      ],
    },
    {
      id: 'fluid-power-principles',
      title: '2. Core Fluid-Power Principles',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Hydraulic systems use pressurized liquid to transmit force; pneumatic systems use compressed gas. Hydraulics produce very high force with compact actuators. Pneumatics are simpler, cleaner in exhaust, and common for auxiliary motions, but deliver lower force at lower pressure.',
        },
        {
          type: 'paragraph',
          text:
            'The same fundamental relationship applies in both: force depends on pressure and piston area. Think in terms of pressure, flow, and load together — not as separate topics.',
        },
        {
          type: 'paragraph',
          text:
            'A common maintenance mistake is chasing pressure alone while ignoring flow restriction, leakage, or poor actuator condition — all of which can make a machine move slowly or inconsistently even when the gauge looks "normal."',
        },
      ],
    },
    {
      id: 'hydraulic-anatomy',
      title: '3. Hydraulic System Anatomy',
      blocks: [
        {
          type: 'list',
          items: [
            'Reservoir',
            'Pump',
            'Prime mover',
            'Filter',
            'Pressure regulation',
            'Directional control valves',
            'Actuators',
            'Return lines',
          ],
        },
        {
          type: 'paragraph',
          text:
            'The pump is not a "pressure source" by itself — it creates flow. Pressure develops only when that flow meets resistance from a load or valve setting. Dead-heading a pump can drive pressure dangerously high, so pressure relief or regulation is mandatory.',
        },
        {
          type: 'paragraph',
          text:
            'A no-motion complaint is often not "the pump is bad," but "the pump is pumping into a blocked, bypassed, unloaded, or internally leaking circuit."',
        },
      ],
    },
    {
      id: 'pneumatic-anatomy',
      title: '4. Pneumatic System Anatomy',
      blocks: [
        {
          type: 'list',
          items: [
            'Compressor',
            'Air treatment equipment (cooling, drying, filtration)',
            'Storage / receiver',
            'Pressure regulation',
            'Distribution to the machine',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Air must be cooled and dried. Compression raises temperature and creates condensation; water in air systems leads to corrosion, sticking valves, poor control, and premature seal wear.',
        },
        {
          type: 'paragraph',
          text:
            'The reservoir smooths demand because air is compressible. Without storage, actuator response becomes soft and slow. On the molding floor this matters on mold air valves, air ejectors, blow-off circuits, air blast cooling, and pneumatic auxiliaries — all of which fail from contamination before they fail mechanically.',
        },
      ],
    },
    {
      id: 'first-inspections',
      title: '5. What Technicians Must Inspect First',
      blocks: [
        {
          type: 'paragraph',
          text: 'Start with the basics before changing components:',
        },
        {
          type: 'list',
          items: [
            'Oil level',
            'Air quality',
            'Filter condition',
            'Leaks',
            'Noise',
            'Heat',
            'Contamination',
            'Loose fittings',
            'Abnormal cycle behavior',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Ask: is the problem supply-side, control-side, or load-side? Slow clamp movement may come from low hydraulic flow, a sticking directional valve, a clogged filter, a worn pump, or an internal cylinder leak — the symptom alone does not prove which one is guilty.',
        },
      ],
    },
    {
      id: 'safety',
      title: '6. Safety Rules Technicians Cannot Skip',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Industrial fluid-power systems can maim or kill. Every intervention begins with safe isolation and verification that stored energy has been relieved.',
        },
        { type: 'heading', level: 3, text: '6.1 Required steps before opening any circuit' },
        {
          type: 'orderedList',
          items: [
            'Isolate electrical power.',
            'Relieve pressure in hydraulic and pneumatic circuits.',
            'Secure moving parts.',
            'Confirm zero-energy state using the plant procedure.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'A cylinder can move unexpectedly if trapped pressure remains, even after the machine is switched off. "Power off" is never enough.',
        },
      ],
    },
    {
      id: 'hydraulic-faults',
      title: '7. Hydraulic Faults and What They Usually Mean',
      blocks: [
        {
          type: 'table',
          columns: ['Symptom', 'Likely Causes'],
          rows: [
            ['Slow movement', 'Restricted flow, low pump output, clogged filter, excessive internal leakage, valve not fully shifting'],
            ['Weak force / loss of force', 'Low pressure, relief valve issue, worn pump components, cylinder bypassing, air entrainment'],
            ['Overheating', 'Energy wasted across relief valve, restrictions, or internal leakage instead of doing useful work'],
            ['Noisy pump', 'Cavitation, aeration, inlet restriction, low fluid level'],
            ['Erratic motion / drifting actuator', 'Internal valve leakage, worn seals, air in fluid, unstable control signal'],
            ['External leakage', 'Failed seals, loose fittings, cracked housing, over-pressure damage'],
          ],
        },
      ],
    },
    {
      id: 'pneumatic-faults',
      title: '8. Pneumatic Faults and What They Usually Mean',
      blocks: [
        {
          type: 'list',
          items: [
            'Leakage — the largest hidden energy waste in pneumatic systems.',
            'Moisture — water in lines corrodes components and sticks spools.',
            'Dirty filters — starve actuators and destabilize regulators.',
            'Sticky spools — cause hesitation or partial shifting.',
            'Weak regulators — inconsistent downstream pressure.',
            'Undersized or blocked tubing — restrict flow, reduce force and speed.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Because air is compressible, pneumatic problems often show up as sluggish motion, inconsistent clamping, or a cylinder that "hunts" or hesitates before moving. If a pneumatic device behaves differently from one cycle to the next, suspect contamination, water accumulation, or a failing regulator before assuming the actuator itself is worn out.',
        },
        {
          type: 'paragraph',
          text:
            'Exhaust air is simply vented — watch for unexpected exhaust restriction (dirty mufflers, blocked ports). Restricted exhaust slows return motion and creates false impressions of actuator failure.',
        },
      ],
    },
    {
      id: 'valves-actuators',
      title: '9. Valves, Actuators, and Control Behavior',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Directional control valves determine where fluid goes; actuators convert fluid energy into motion. The valve is the "decision-maker" and the actuator is the "worker." A machine symptom often starts in the valve but ends at the actuator.',
        },
        {
          type: 'paragraph',
          text:
            'Valve actuators and positioners may be used when precise, proportional control is needed. Dynamic forces from the process can shift valve position if control hardware is not properly balanced. Test valve response under real operating conditions — not just by listening for a click.',
        },
      ],
    },
    {
      id: 'cleanliness',
      title: '10. Cleanliness and Contamination Control',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Contamination control is one of the highest-value maintenance skills in any molding plant. Hydraulic fluid must be clean because particles damage pumps, valves, and seals. Compressed air must be dry and filtered because moisture and dirt degrade pneumatic components.',
        },
        {
          type: 'paragraph',
          text:
            'Filters, breathers, dryers, and separators are production-critical components — not optional accessories. They often determine the life of expensive hardware.',
        },
      ],
    },
    {
      id: 'troubleshooting-sequence',
      title: '11. A Practical Troubleshooting Sequence',
      blocks: [
        {
          type: 'orderedList',
          items: [
            'Isolate the symptom — one motion, one side of the machine, one mold, or the whole system?',
            'Verify the supply condition (fluid/air, filters, pressure at source).',
            'Verify the control signal (electrical command, pilot pressure).',
            'Verify the actuator response (movement, force, speed).',
            'Verify the return / exhaust path (back-pressure, restrictions).',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Use gauges, temperature checks, sound, leakage inspection, and cycle observation to narrow the fault before disassembly. If a circuit has both pressure and flow symptoms, solve the flow restriction or leakage problem first — pressure alone is misleading.',
        },
        {
          type: 'paragraph',
          text:
            'Teach technicians to ask "Where is the energy being lost?" rather than "Which part should I replace?"',
        },
      ],
    },
    {
      id: 'minimum-competency',
      title: '12. Minimum Competency for New Technicians',
      blocks: [
        {
          type: 'list',
          items: [
            'Identify major hydraulic and pneumatic components.',
            'Read basic ISO/ANSI fluid-power symbols and trace fluid paths.',
            'Explain how pressure, flow, and force interact.',
            'Understand the role of pumps, compressors, filters, regulators, valves, actuators, reservoirs, and air dryers.',
            'Isolate energy safely (LOTO, zero-energy verification).',
            'Recognize contamination problems.',
            'Document findings clearly so the next shift can continue the work.',
          ],
        },
      ],
    },
    {
      id: 'training-sequence',
      title: '13. Training Sequence',
      blocks: [
        {
          type: 'orderedList',
          items: [
            'Start with safety, lockout/tagout, and zero-energy verification.',
            'Teach the difference between hydraulics and pneumatics using real machine examples.',
            'Walk the class through a full system: supply → conditioning → control → actuator → return/exhaust.',
            'Drill troubleshooting by symptom, not by guesswork.',
            'End with hands-on inspection of filters, leaks, regulators, valves, and cylinder behavior.',
          ],
        },
      ],
    },
    {
      id: 'technician-checklist',
      title: '14. Technician Checklist',
      blocks: [
        {
          type: 'list',
          items: [
            'Confirm machine isolation before touching any circuit.',
            'Check fluid or air supply condition first.',
            'Inspect filters, dryers, breathers, and separators.',
            'Look for leaks, heat, noise, contamination, and abnormal cycle timing.',
            'Verify valve operation and actuator motion under load.',
            'Record what changed, what was tested, and what fixed the problem.',
          ],
        },
      ],
    },
  ],
};
