import type { KnowledgeGuide } from './fountainFlowGuide';

export const proactiveMaintenanceGuide: KnowledgeGuide = {
  slug: 'proactive-maintenance',
  title: 'Precision Injection Molding Maintenance: A Comprehensive Teaching Guide',
  summary:
    'A seven-module teaching guide covering the mindset shift from reactive to proactive maintenance, CLF basics, RCM/FMEA, RCA, planning & spares, the human element, and KPIs — grounded in Baptista and applied to precision injection molding.',
  sections: [
    {
      id: 'reactive-curse',
      title: 'Module 1: Breaking the Reactive Curse',
      blocks: [
        { type: 'paragraph', text: 'Reference: Baptista, Chapter 1 — "The Sad Story of Antonio".' },
        {
          type: 'paragraph',
          text:
            'In injection molding, the "reactive curse" looks like this: a heater band burns out, the technician replaces it, the machine runs, and everyone cheers. But why did the band burn out? Was it a failing solid-state relay (SSR) sending continuous voltage? A bad thermocouple causing the controller to overcompensate? If you just replace the band, it will blow out again — potentially ruining a $150,000 mold through thermal runaway.',
        },
        { type: 'heading', level: 3, text: 'Your New Mandate' },
        {
          type: 'orderedList',
          items: [
            'Stop celebrating the breakdown — we do not praise fixing failures; we praise preventing them.',
            'Transition to proactive — shift from "Run-to-Fail" to Predictive and Preventive Maintenance.',
            'Respect the downtime — reactive maintenance ruins lives, interrupts sleep, and causes immense stress. Being proactive gives you, your family, and the production team peace of mind.',
          ],
        },
      ],
    },
    {
      id: 'basics-clf',
      title: 'Module 2: The Forgotten Cornerstone (Basic Maintenance)',
      blocks: [
        { type: 'paragraph', text: 'Reference: Baptista, Chapter 5 — "Maintenance Basics".' },
        {
          type: 'paragraph',
          text:
            'Advanced diagnostics mean nothing if the basics are ignored. In precision injection molding, the holy trinity of basic maintenance is Cleaning, Lubrication, and Fastening (CLF).',
        },
        { type: 'heading', level: 3, text: '2.1 Cleaning' },
        {
          type: 'list',
          items: [
            'Mold: plastic dust, mold release, and degraded grease clog vents, causing gas traps and burns. Clean vents and parting lines daily using proper solvents and brass tools (never steel).',
            'Machine: keep platens clean. Dirt or rust on platen faces causes the mold to sit unevenly, producing flash and premature mold damage.',
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Lubrication' },
        {
          type: 'list',
          items: [
            'Over-lubrication is as deadly as under-lubrication. All-electric servo motors and ball screws require exact micro-doses of specific synthetic greases.',
            'Toggle clamps require continuous, automated lubrication. Verify the lube pump is functioning and the correct ISO grade oil reaches every pin — a dry toggle pin will gall and seize.',
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Fastening' },
        {
          type: 'list',
          items: [
            'Tie-bar nuts must be torqued to the machine builder\'s exact specification using a hydraulic tensioner. Loose nuts sag the platens and destroy mold parallelism.',
            'Mold bolts: use the correct grade (typically 12.9) and torque mold retaining clamps to spec.',
          ],
        },
      ],
    },
    {
      id: 'rcm-fmea',
      title: 'Module 3: Elementary Proactive Strategies (RCM & FMEA)',
      blocks: [
        { type: 'paragraph', text: 'Reference: Baptista, Chapter 4 — "Steps to Reach Proactive Maintenance".' },
        {
          type: 'paragraph',
          text:
            'To be proactive, we use Reliability-Centered Maintenance (RCM) and Failure Mode and Effects Analysis (FMEA). We do not guess — we analyze.',
        },
        { type: 'heading', level: 3, text: '3.1 FMEA — Injection Molding Machine (Plasticating Unit)' },
        {
          type: 'table',
          columns: ['Element', 'Detail'],
          rows: [
            ['Component', 'Plasticating screw'],
            ['Failure Mode', 'Bimetallic coating wears off on the flights'],
            ['Effect', 'Loss of melt homogeneity, nozzle drool, longer cycles, black specks'],
            ['Detection', 'Visual part inspection, melt temperature stability, recovery time monitoring'],
            ['Preventive Action', 'Ultrasonic testing of screw and barrel ID every 6 months; replace when clearance exceeds 0.003 in / in of diameter'],
          ],
        },
        { type: 'heading', level: 3, text: '3.2 FMEA — Mold (Cooling Lines)' },
        {
          type: 'table',
          columns: ['Element', 'Detail'],
          rows: [
            ['Component', 'Cooling lines'],
            ['Failure Mode', 'Calcium carbonate scale buildup'],
            ['Effect', 'Reduced heat transfer, longer cycles, warped parts'],
            ['Detection', 'Monitor ΔT between inlet and outlet — a drop indicates restricted flow'],
            ['Preventive Action', 'Flush molds with descaling solution quarterly; use treated water in MTCs'],
          ],
        },
      ],
    },
    {
      id: 'rca',
      title: 'Module 4: Root Cause Analysis (RCA)',
      blocks: [
        { type: 'paragraph', text: 'Reference: Baptista, Chapter 3 — "How to Change the Situation".' },
        {
          type: 'paragraph',
          text: 'When a failure occurs, perform an RCA. Do not stop at the immediate cause — find the root cause.',
        },
        { type: 'heading', level: 3, text: '4.1 Worked Example — Tripped Hydraulic Pump Motor' },
        {
          type: 'orderedList',
          items: [
            'Problem: machine stopped due to tripped hydraulic pump motor overload.',
            'Immediate cause: motor drew excessive amperage.',
            'Why? Hydraulic oil was too viscous.',
            'Why? Oil temperature was too low.',
            'Why? Oil cooler valve was stuck closed.',
            'Why? Valve spool was contaminated with varnish.',
            'Why? Hydraulic oil was never sampled or changed against a fluid analysis schedule.',
            'Root cause: lack of a preventive fluid analysis and filtration maintenance program.',
            'Corrective action: implement monthly hydraulic oil particle counting, annual oil replacement, and clean the valve.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Rule of thumb: if your RCA ends with "operator error" or "bad part," you haven\'t dug deep enough. The system allowed the error or the bad part to cause a failure.',
        },
      ],
    },
    {
      id: 'planning-spares',
      title: 'Module 5: Planning, Scheduling, and Spare Parts',
      blocks: [
        { type: 'paragraph', text: 'Reference: Baptista, Chapter 7 — "Other Important Building Blocks".' },
        { type: 'paragraph', text: 'A technician without a plan is just a person wandering the shop floor.' },
        { type: 'heading', level: 3, text: '5.1 Planning and Scheduling' },
        {
          type: 'list',
          items: [
            'Backlog: maintain a calculated backlog of future work. A worn ejector pin is planned, ordered, and scheduled for the next mold changeover.',
            'Work Order (WO): never start a job without a WO. It must include LOTO procedure, required tools, and hazards (e.g., "Overhead mold weight: 4,000 lbs — verify crane capacity").',
          ],
        },
        { type: 'heading', level: 3, text: '5.2 Spare Parts Management' },
        {
          type: 'list',
          items: [
            'Standardize CMMS descriptions — a "1/2 inch socket head cap screw" should not appear as "hex bolt, 1/2, Allen."',
            'Critical molding spares to stage in the tool crib:',
          ],
        },
        {
          type: 'list',
          items: [
            'Heater bands and thermocouples for every barrel size.',
            'Nozzle tip and seat inserts.',
            'Common ejector pins, return pins, guide pins and bushings.',
            'Hydraulic filter elements and seals for the main proportional valves.',
            'Toggle clamp linkage pins and bushings.',
          ],
        },
      ],
    },
    {
      id: 'human-element',
      title: 'Module 6: The Human Element and Organizational Problems',
      blocks: [
        { type: 'paragraph', text: 'Reference: Baptista, Chapter 6 — "Maintenance Professionals: The Stigmatized Heroes".' },
        { type: 'heading', level: 3, text: '6.1 Human Error in Maintenance' },
        {
          type: 'paragraph',
          text:
            'Human error is rarely "carelessness" — it is usually a systemic issue.',
        },
        {
          type: 'list',
          items: [
            'Slips/Lapses: a technician forgets to reconnect a cooling line after a mold change. Solution: mandatory mold-change checklist with sign-off by both setter and technician.',
            'Violations: a technician bypasses a mold safety door interlock to run faster. Solution: cultural — safety is never compromised for production, and management must support a technician who halts production for safety.',
          ],
        },
        { type: 'heading', level: 3, text: '6.2 Avoiding the "Micromanagement Curse" (The Fruit Farm)' },
        {
          type: 'paragraph',
          text:
            'As you grow into senior roles, understand that micromanagement destroys maintenance efficiency. The planner must plan and the technician must execute. If the planner constantly hovers, the WO process breaks down. Trust the system.',
        },
      ],
    },
    {
      id: 'kpis',
      title: 'Module 7: Key Performance Indicators (KPIs)',
      blocks: [
        { type: 'paragraph', text: 'Reference: Baptista, Chapters 4 & 7.' },
        { type: 'paragraph', text: 'You will be measured by data, not by how sweaty you get.' },
        {
          type: 'table',
          columns: ['KPI', 'Definition', 'Target Direction'],
          rows: [
            ['MTBF', 'Mean Time Between Failures — for IMMs and molds', 'Increase'],
            ['MTTR', 'Mean Time To Repair — time to restore full operational capacity', 'Decrease'],
            ['PM Compliance', 'Percentage of PMs completed on time', '> 95%'],
            ['OEE', 'Overall Equipment Effectiveness = Availability × Performance × Quality', 'Increase (maintenance drives Availability & Performance)'],
          ],
        },
      ],
    },
  ],
};
