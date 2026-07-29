import type { KnowledgeGuide } from './fountainFlowGuide';

export const maintenanceCoreJobGuide: KnowledgeGuide = {
  slug: 'maintenance-core-job-and-mindset',
  title: 'Injection Molding Maintenance: Core Job, Systems, and Technician Mindset',
  summary:
    'Big-picture teaching guide covering the maintenance mindset, machine systems, fluid-power basics, reservoirs, pumps, valves, troubleshooting logic, foundation/vibration, safety, and a training path for new technicians.',
  sections: [
    {
      id: 'core-job',
      title: 'Core Job',
      blocks: [
        {
          type: 'paragraph',
          text: 'Injection molding maintenance is not just "fixing machines"; it is protecting repeatability, uptime, safety, and part quality by keeping hydraulic, pneumatic, thermal, mechanical, and foundation systems healthy.',
        },
        {
          type: 'paragraph',
          text: 'The most important mindset is to trace every symptom back to energy flow, motion control, and contamination control rather than guessing at parts. On a molding floor, a noisy pump, a drifting clamp, a slow ejector, or a temperature instability may all be different faces of the same underlying maintenance failure.',
        },
      ],
    },
    {
      id: 'machine-systems',
      title: 'Machine Systems',
      blocks: [
        {
          type: 'paragraph',
          text: 'Industrial machines commonly use electrical, hydraulic, and pneumatic prime movers. Hydraulic systems deliver high force while pneumatic systems are cleaner and simpler but lower force.',
        },
        {
          type: 'paragraph',
          text: 'For injection molding, hydraulics commonly support clamp force, injection movement, ejector motion, valve gating, and auxiliary functions, while pneumatics often support air blasts, valves, and simple actuators.',
        },
        {
          type: 'paragraph',
          text: 'Machine performance also depends on dynamic forces, vibration, and the stiffness of the support structure. Technicians must respect alignment, anchoring, and vibration symptoms as production issues, not just civil or installation issues.',
        },
      ],
    },
    {
      id: 'fluid-power-basics',
      title: 'Fluid Power Basics',
      blocks: [
        {
          type: 'paragraph',
          text: 'A hydraulic pump creates flow; pressure appears when that flow meets resistance, so "low pressure" and "low flow" are not the same fault.',
        },
        {
          type: 'paragraph',
          text: 'Pneumatic systems use compressible air, so the reservoir, dryers, filters, and pressure controls are not optional — they are part of how the machine behaves.',
        },
        {
          type: 'paragraph',
          text: 'The maintenance technician must understand that motion speed depends on flow, force depends on pressure and area, and unstable motion often comes from leakage, aeration, restriction, or load variation rather than a single "bad component."',
        },
      ],
    },
    {
      id: 'hydraulic-reservoirs',
      title: 'Hydraulic Reservoirs',
      blocks: [
        {
          type: 'paragraph',
          text: 'The reservoir is a major reliability component, not a storage drum. Critical reservoir functions include:',
        },
        {
          type: 'list',
          items: [
            'Return-line submergence',
            'Baffles',
            'Cooling',
            'De-aeration',
            'Contamination settling',
            'Vent/breather condition',
            'Low-level protection',
            'Temperature monitoring',
          ],
        },
        {
          type: 'paragraph',
          text: 'A well-designed reservoir helps trapped air escape, dirt settle, and heat dissipate. A poorly maintained one can reintroduce air, moisture, and contamination into the entire system. For a new technician, reservoir inspection should be a routine first-step task, not an afterthought.',
        },
      ],
    },
    {
      id: 'pumps-compressors',
      title: 'Pumps and Compressors',
      blocks: [
        {
          type: 'paragraph',
          text: 'Pumps deliver flow and can fail through wear, suction starvation, contamination, drive issues, or internal leakage. A healthy pump should develop normal flow and pressure without excessive noise, heat, or foaming.',
        },
        {
          type: 'paragraph',
          text: 'Compressors and air treatment equipment in the pneumatic system need the same discipline: intake filtration, cooling, drying, pressure regulation, and routine inspection. A technician should learn to treat the supply side as the first place to look when several motions become weak or erratic at once.',
        },
      ],
    },
    {
      id: 'valves-actuators',
      title: 'Valves and Actuators',
      blocks: [
        {
          type: 'paragraph',
          text: 'Directional valves determine where fluid goes, while actuators turn that fluid energy into motion. Valves can be affected by dynamic forces, leakage, spool problems, and positioner issues, so a valve that "moves" is not necessarily a valve that is "working correctly."',
        },
        {
          type: 'paragraph',
          text: 'Actuators can lose force or drift because of seal wear, bypassing, incorrect loading, or poor control pressure. On molding equipment, clamp, ejector, and injection motions should be checked as complete systems, not isolated parts.',
        },
      ],
    },
    {
      id: 'troubleshooting-logic',
      title: 'Troubleshooting Logic',
      blocks: [
        {
          type: 'paragraph',
          text: 'A reliable technician follows symptom-based logic: first identify whether the fault is supply-side, control-side, or load-side. Then verify:',
        },
        {
          type: 'list',
          items: [
            'Oil level and fluid condition',
            'Filter restriction',
            'Suction integrity',
            'Valve actuation',
            'Actuator response',
            'Heat and noise patterns',
          ],
        },
        {
          type: 'paragraph',
          text: 'Repeated vibration, changing alignment, or loosened anchoring can create symptoms that look hydraulic but are actually structural or dynamic in origin. Maintenance teams must observe the whole machine, not only the component that is shouting the loudest.',
        },
      ],
    },
    {
      id: 'cavitation-aeration-foaming',
      title: 'Cavitation, Aeration, and Foaming',
      blocks: [
        {
          type: 'paragraph',
          text: 'Air in oil is one of the most destructive and misunderstood problems in fluid power. Cavitation comes from low inlet pressure and bubble collapse; aeration comes from air being drawn in through suction leaks or low oil level.',
        },
        {
          type: 'paragraph',
          text: 'Foamy oil is dangerous because it reduces stiffness, degrades lubrication, worsens heat transfer, and increases wear. New technicians should learn to regard foaming as a warning condition, not a cosmetic issue.',
        },
      ],
    },
    {
      id: 'foundation-vibration',
      title: 'Foundation and Vibration',
      blocks: [
        {
          type: 'paragraph',
          text: 'Machine performance depends on how dynamic forces are transmitted through the foundation and soil. Poor design or degraded support can harm performance and safety.',
        },
        {
          type: 'paragraph',
          text: 'In practical plant terms, loose anchors, cracked mounts, soft feet, or resonance-like vibration can cause misalignment, leaks, sensor trouble, and repeat quality problems. If a molding machine develops recurring "mystery" faults after installation or relocation, the support structure and vibration behavior deserve attention alongside hydraulics and controls.',
        },
        {
          type: 'paragraph',
          text: 'Good maintenance technicians learn to read vibration as a machine language, not just a nuisance.',
        },
      ],
    },
    {
      id: 'safety-priorities',
      title: 'Safety Priorities',
      blocks: [
        {
          type: 'paragraph',
          text: 'Before touching hydraulic or pneumatic circuits, technicians must isolate energy, release pressure, secure motion, and confirm a zero-energy state according to site procedure.',
        },
        {
          type: 'paragraph',
          text: 'Hydraulic leaks are slippery and hazardous, compressed air can move components unexpectedly, and high-pressure fluid release can be violent. Safety is not a separate module from maintenance; it is the method that makes maintenance possible.',
        },
      ],
    },
    {
      id: 'training-path',
      title: 'Training Path',
      blocks: [
        {
          type: 'orderedList',
          items: [
            'Teach system identification: reservoir, pump, valve, actuator, filter, cooler, dryer, and foundation.',
            'Teach energy flow: flow, pressure, force, and why they are different.',
            'Teach inspection habits: leaks, temperature, noise, foaming, vibration, cleanliness, and alignment.',
            'Teach symptom-based troubleshooting with logged readings, not assumptions.',
            'Teach safe isolation and contamination control as daily habits, not exceptions.',
          ],
        },
      ],
    },
    {
      id: 'technician-checklist',
      title: 'Technician Checklist',
      blocks: [
        {
          type: 'list',
          items: [
            'Confirm the machine is safely isolated before work begins.',
            'Check oil level, oil condition, and reservoir vent/breather condition.',
            'Inspect suction lines, filters, and return lines for restriction or air ingress.',
            'Observe motion quality, sound, temperature, and vibration during operation.',
            'Verify valve shifting and actuator response under actual load.',
            'Document what changed, what was tested, and what the final readings were.',
          ],
        },
      ],
    },
  ],
};
