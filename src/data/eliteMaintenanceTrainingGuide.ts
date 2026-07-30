import type { KnowledgeGuide } from './fountainFlowGuide';

export const eliteMaintenanceTrainingGuide: KnowledgeGuide = {
  slug: 'elite-injection-molding-maintenance-technician-training',
  title: 'Elite Injection Molding Maintenance Technician Training (Complete Edition)',
  summary: 'Full maintenance technician curriculum and field reference: safety core, clamp, injection, hydraulic, electrical, hot runner, pneumatic, cooling, and auxiliary systems, plus PM, diagnostics, repair SOPs, documentation, and appendices.',
  sections: [
    {
      id: 'about-this-manual',
      title: 'About This Manual',
      blocks: [
        {
          type: 'paragraph',
          text: 'Pro-Processor / Maintenance Department Standard Edition: Complete Edition Rev. 1.0 Release date: June 13, 2026 Primary audience: Injection molding maintenance technicians, maintenance leads, process technicians cross-training into maintenance, and supervisors responsible for machine uptime, product quality, and maintenance safety. Scope: Hydraulic, all-electric, and hybrid injection molding machines; clamp tonnage classes from 25 tons through 6,000+ tons; hydraulic direct clamp, toggle, hydromechanical/two-platen, all-electric clamp, and tie-bar-less clamp architectures; IMM injection units; hot runners; hydraulics; electrical drives; controls; pneumatics; cooling; mold temperature control; drying; conveying; blending; granulation; robots; chillers; compressed air; conveyors; part handling; PM, troubleshooting, repair SOPs, and documentation systems. WARNING: This manual is a training and job-planning resource. It is not a substitute for OEM manuals, engineered risk assessments, facility-specific lockout/tagout procedures, arc-flash labels, qualified electrical worker training, EPA 608 certification, or legally required safety programs. Before performing work, verify the exact machine model, wiring prints, hydraulic schematics, safety circuit design, OEM bulletins, and site policies.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Contents by Part'
        },
        {
          type: 'list',
          items: [
            'Front Safety Core - mandatory foundational safety requirements and hazard-control philosophy.',
            'Part 1 - Foundations of injection molding machine systems.',
            'Part 2 - Clamp systems: theory, components, troubleshooting, and repair.',
            'Part 3 - Injection units: theory, components, troubleshooting, and repair.',
            'Part 4 - Hydraulic systems: theory, components, troubleshooting, and repair.',
            'Part 5 - Electrical and drive systems: theory, components, troubleshooting, and repair.',
            'Part 6 - Hot runner systems: theory, components, troubleshooting, and repair.',
            'Part 7 - Pneumatic systems: theory, components, troubleshooting, and repair.',
            'Part 8 - Cooling and temperature management systems.',
            'Part 9 - Auxiliary equipment: MTCs, dryers, conveying, blending, granulators, robots, chillers, compressed air, conveyors, and downstream systems.',
            'Part 10 - Preventive and predictive maintenance.',
            'Part 11 - Troubleshooting methodology and master diagnostic decision trees.',
            'Part 12 - Repair SOPs.',
            'Part 13 - Documentation, work orders, and maintenance records.',
            'Part 14 - Continuous improvement and professional development.',
            'Appendices - baseline readings, failure codes, implementation checklist, controls reference, and fault signature matrix.'
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Revision Control'
        },
        {
          type: 'table',
          columns: [
            'Revision',
            'Date',
            'Owner',
            'Change summary'
          ],
          rows: [
            [
              '1.0',
              '2026-06-13',
              'Pro-Processor / Maintenance Department Standard',
              'Initial complete edition generated for injection molding maintenance technician training.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'How to Use This Manual'
        },
        {
          type: 'paragraph',
          text: 'This manual is built as a progressive curriculum and a field reference. A new technician should read the theory first, then perform supervised hands-on tasks using the SOPs and checklists. A senior technician should use the diagnostic decision trees, PM criteria, and cross-system failure signatures as a rapid root-cause framework. 1. Start with safety. Read the front safety chapters before using the technical procedures. Every repair section has contextual WARNING, CAUTION, and NOTE callouts placed before the affected work step. 2. Work from symptoms to systems. Do not replace parts because an alarm exists. Confirm the complaint, isolate the affected energy domain, prove inputs and outputs, verify feedback devices, then test the actuator or load. 3. Use OEM documentation as the controlling document. Torque values, hydraulic pressures, oil grades, grease types, servo parameters, electrical ratings, safety circuit architecture, and calibration steps vary by machine. 4. Document baseline values. A technician without baseline data is guessing. Capture pressure, temperature, current, voltage, cycle position, process curve, alarm history, and repair test results. 5. Treat auxiliary equipment as part of the molding system. A press is only one node in the cell. Dryers, loaders, chillers, MTCs, robots, hot runners, compressed air, and conveyors can create apparent IMM problems.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Technical Reference Basis and Standards Awareness'
        },
        {
          type: 'paragraph',
          text: 'The manual aligns with the intent of widely used U.S. and international safety references and plastics machinery interface conventions. The user of this manual must verify the current legally adopted edition and the facility-specific compliance program before implementation.'
        },
        {
          type: 'list',
          items: [
            'OSHA 29 CFR 1910.147 for control of hazardous energy and lockout/tagout program structure.',
            'OSHA 29 CFR 1910 Subpart S for electrical utilization safety and safe work practices around electrical equipment.',
            'OSHA 29 CFR 1910 Subpart O and 1910.212 for machine guarding principles and point-of- operation / nip-point hazard protection.',
            'NFPA 70E for electrical safety in the workplace, including shock, arc flash, arc blast, energized work justification, PPE, boundaries, and electrically safe work condition concepts.',
            'ANSI/PLASTICS B151.1 for injection molding machine safety hazards and risk-reduction expectations for horizontal and vertical IMMs.',
            'ISO 13849-1 / EN ISO 13849 for safety-related control systems, performance level concepts, diagnostic coverage, redundancy, and validation expectations.',
            'EUROMAP recommendations for IMM interfaces, including robot/handling device electrical interfaces and data exchange with MES/host systems such as EUROMAP 77 /'
          ]
        },
        {
          type: 'paragraph',
          text: 'OPC UA.'
        },
        {
          type: 'list',
          items: [
            'ANSI/RIA / A3 industrial robot safety standards and related OSHA robotics guidance for robot systems integrated with IMMs.',
            'EPA Section 608 awareness for refrigerant-containing chillers and HVACR service work.'
          ]
        }
      ]
    },
    {
      id: 'front-safety-core-mandatory-foundation',
      title: 'Front Safety Core - Mandatory Foundation',
      blocks: [
        {
          type: 'heading',
          level: 3,
          text: 'S0.1 Safety Philosophy for Injection Molding Maintenance'
        },
        {
          type: 'paragraph',
          text: 'Injection molding maintenance exposes technicians to stacked hazards. A single press can contain 480 VAC mains, DC bus voltage inside servo drives, 120 VAC control circuits, 24 VDC inputs and outputs, hydraulic pressure above 2,000 psi (13.8 MPa), charged accumulators, hot barrel surfaces above 500 deg F (260 deg C), hot runner components, heavy mold components, stored gravity energy, robot work envelopes, pneumatic motion, and rotating auxiliary equipment. The correct safety philosophy is to remove energy, prevent restart, verify zero energy, control the work zone, and restore the system only after a deliberate functional test. WARNING: Never bypass a safety gate, mold area interlock, light curtain, robot fence switch, two-hand control, emergency stop, or safety-rated input to keep production running. Bypassing safety functions can create fatal crushing, shearing, burn, or electrocution hazards and can destroy the legal defensibility of the maintenance program. Maintenance quality is safety quality. A poorly tightened hydraulic fitting can inject oil through skin. A loose heater terminal can burn a panel. A miscalibrated safety gate switch can permit clamp motion while a person is in the mold area. A miswired robot interface can allow mold close with EOAT in the mold. A maintenance technician is therefore not only repairing equipment; the technician is preserving the engineered risk controls that keep people alive.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'S0.2 Core Hazard Categories'
        },
        {
          type: 'table',
          columns: [
            'Hazard category',
            'Typical source',
            'Primary risk',
            'mindset'
          ],
          rows: [
            [
              'Electrical',
              'Mains disconnect, transformers, drives, heater circuits, control panels',
              'Shock, electrocution, arc flash, arc blast, burns',
              'De-energize when possible; qualified electrical worker only for justified live diagnostics; follow NFPA 70E and site arc-flash labels.'
            ],
            [
              'Hydraulic',
              'HPU, accumulators, injection cylinders, clamp cylinders, core pull circuits',
              'Crush, injection injury, sudden movement, hose whip',
              'LOTO, bleed down, block gravity loads, verify pressure at gauge/test point.'
            ],
            [
              'Thermal',
              'Barrel, nozzle, hot runner, MTC oil, mold faces, purge',
              'Burns, fire, degraded resin fumes',
              'Heat gloves/face shield, purge guard, ventilation, controlled cool-down.'
            ],
            [
              'Mechanical',
              'Clamp, toggle links, robot axes, conveyors, granulator rotors',
              'Crush, shear, entanglement, amputation',
              'Guarding, interlocks, blocked motion, zero mechanical energy.'
            ],
            [
              'Pneumatic',
              'Air manifolds, EOAT grippers, valve gates, cylinders',
              'Stored air movement, whipping lines, pinch points',
              'Isolate and bleed; verify pressure gauge zero; secure payload.'
            ],
            [
              'Chemical',
              'Hydraulic oil, grease, resin decomposition, refrigerants, colorants',
              'Skin/eye injury, respiratory exposure, fire, environmental release',
              'SDS review, PPE, ventilation, certified personnel for refrigerants.'
            ],
            [
              'Noise',
              'Granulators, hydraulic pumps, air leaks, blowoff',
              'Hearing damage',
              'Hearing protection and noise source correction.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'S0.3 Lockout/Tagout - IMM and Auxiliary Equipment'
        },
        {
          type: 'paragraph',
          text: 'Lockout/tagout, abbreviated LOTO, is the formal process of isolating and securing hazardous energy before servicing or maintenance. In injection molding, LOTO must cover more than the electrical main disconnect. The technician must identify every energy source that can move, heat, pressurize, lift, rotate, discharge, or release stored energy. WARNING: Perform LOTO before removing guards, entering the mold area for maintenance, disconnecting hydraulic lines, replacing heaters, working inside electrical panels, servicing robot axes, removing granulator screens or knives, servicing conveyors, opening MTC cabinets, or working on any equipment where unexpected startup could injure personnel. A complete IMM lockout normally includes electrical main isolation, control power isolation where separate, hydraulic pump isolation, accumulator bleed/isolation, pneumatic isolation and bleed, thermal cool-down or thermal control, gravity blocking of moving platens or injection units if applicable, robot/automation lockout, and auxiliary lockout for connected equipment. Group LOTO uses a lockbox or equivalent mechanism so every authorized employee maintains personal control over energy isolation.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'LOTO Verification Sequence'
        },
        {
          type: 'paragraph',
          text: '1. Notify affected employees and production supervision. 2. Review the machine-specific energy control procedure and current job scope. 3. Stop the machine using normal stop sequence; place automation in safe state. 4. Open electrical disconnects and apply personal locks/tags. 5. Isolate hydraulic pumps and bleed stored pressure; verify with pressure gauge at correct test point. 6. Isolate pneumatic supply; bleed downstream air; verify zero gauge pressure. 7. Control thermal hazards by cooling, guarding, or applying heat PPE; do not assume a heater is cold because the controller is off. 8. Block or mechanically restrain gravity loads and suspended components. 9. Attempt start using normal controls to verify no motion, no pump start, and no actuator response. 10. Test for absence of voltage only when qualified and using an approved live-dead-live meter verification method. 11. Perform the work. Maintain control of removed guards, jumpers, keys, and test devices. 12. Before restoration, reinstall guards, remove tools, clear personnel, remove locks by authorized owners only, restore energy, and perform controlled functional test.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'S0.4 Electrical Safety and Live Testing Boundaries'
        },
        {
          type: 'paragraph',
          text: 'Most maintenance diagnostics should be performed de-energized or through safe diagnostic screens, I/O pages, test plugs, thermal imaging through closed panel windows, or externally accessible measurement points. Live voltage checks may be justified only when the fault cannot be diagnosed de-energized, when the technician is qualified, when the job is planned, and when facility electrical safety procedures permit it. WARNING: Only qualified electrical workers may perform live electrical diagnostics. Follow the facility electrical safety program, arc-flash labels, shock boundaries, insulated tools, rated meter leads, PPE, and energized work permit requirements where applicable. Do not use generic PPE categories in place of an equipment-specific arc-flash label and current risk assessment. Typical U.S. IMM circuits include 24 VDC inputs/outputs, 120 VAC solenoids or contactor coils, 240 VAC heater circuits, 480 VAC three-phase motors and drive feeds, and high-voltage DC bus circuits inside drives. A 24 VDC control wire can be safe from shock compared with mains voltage but still energize a dangerous motion output. A 480 VAC drive cabinet can retain lethal DC bus voltage after disconnect opening. Always verify discharge time and test points in the drive manual. Normal target Safe diagnostic'
        },
        {
          type: 'table',
          columns: [
            'Measurement',
            'concept',
            'Fault implication',
            'discipline'
          ],
          rows: [
            [
              '24 VDC controls',
              'Usually about 22-26 VDC under load',
              'Bad power supply, shorted sensor, ground fault, open fuse, overloaded output',
              'Use COM reference shown on print; verify source and load side.'
            ],
            [
              '120 VAC control circuit',
              'Often about 110-125 VAC depending supply',
              'Open fuse, bad transformer, loose neutral, failed relay/PLC output',
              'Use CAT-rated meter; one hand discipline where applicable.'
            ],
            [
              '240 VAC heater circuit',
              'Line-to-line voltage at heater output when commanded',
              'Open SSR/contactor, blown fuse, open heater, short to ground',
              'Confirm command, output, and load resistance.'
            ],
            [
              '480 VAC motor/drive feed',
              'Balanced three-phase supply',
              'Phase loss, bad contactor, drive input issue',
              'Qualified electrical worker only; verify phase-to-phase and phase-to-ground.'
            ],
            [
              'Thermocouple millivolts',
              'Small polarity- sensitive signal',
              'Reversed polarity, open TC, shorted cable, wrong type',
              'Avoid applying voltage to TC input; use correct meter setting.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'S0.5 Hydraulic Safety'
        },
        {
          type: 'paragraph',
          text: 'Hydraulic systems in injection molding machines convert motor power into high force and high-speed movement. The danger is not only pressure but stored energy. Accumulators can hold pressure after pump shutdown. Vertical or unsupported loads can move when a valve shifts or a hose is opened. Hot oil can burn skin. Pinholes in high-pressure lines can inject oil into tissue and require emergency medical treatment. WARNING: Never use a hand, rag, or body part to search for hydraulic leaks. Use cardboard, wood, or leak detection methods while standing clear. A hydraulic injection injury is a medical emergency even if the wound looks small. Before opening a hydraulic circuit, identify the circuit, lower or block loads, isolate the pump, bleed pressure, verify zero pressure at the relevant test point, and crack fittings cautiously with shielding. The pressure gauge must be rated for the circuit and the expected spike; a 1,000 psi gauge on a 2,500 psi circuit is itself a hazard and a false diagnostic tool.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'S0.6 Robot, Automation, and Mold Area Safety'
        },
        {
          type: 'paragraph',
          text: 'Robot work envelopes overlap the highest-risk area of the injection cell: the mold open space. Safety-rated interlocks, EUROMAP interface signals, robot fence gates, light curtains, scanners, and emergency stops must be validated as an integrated system. The automation may be stopped while a press is enabled, or the press may be stopped while robot axes still have drive power. Treat the cell as a system, not isolated machines. WARNING: Never teach, jog, or recover a robot inside the mold area unless the cell is in the correct reduced-speed/manual mode, personnel are clear of pinch points, the robot path is controlled, the press cannot close unexpectedly, and the procedure is authorized by the site robot safety program. When a robot crash occurs, do not immediately jog away at full speed. First stop, secure the work zone, inspect EOAT, check mold damage, confirm payload security, and recover along the path of least additional damage. After recovery, verify mastering, home references, vacuum/gripper sensors, robot-to-IMM handshake, and mold protection settings before returning to automatic operation.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'S0.7 Refrigerant Safety and EPA 608 Awareness'
        },
        {
          type: 'paragraph',
          text: 'Chillers contain a process water circuit and a refrigerant circuit. Molding maintenance technicians commonly service strainers, pumps, flow switches, condenser coils, fans, water valves, and water treatment items. Refrigerant leak repair, refrigerant recovery, charging, and sealed-system service require proper certification and equipment. WARNING: Do not vent refrigerant, open refrigerant circuits, bypass pressure controls, or attempt refrigerant charging unless you are certified and authorized for that work. Call qualified HVACR or chiller service personnel when refrigerant circuit symptoms appear.'
        }
      ]
    },
    {
      id: 'part-1-foundations-of-injection-molding-machine-systems',
      title: 'Part 1 - Foundations of Injection Molding Machine Systems',
      blocks: [
        {
          type: 'heading',
          level: 3,
          text: '1.1 The Injection Molding Process: A Systems-Level Overview'
        },
        {
          type: 'paragraph',
          text: 'Injection molding converts plastic pellets into molded parts through a repeated sequence of drying or conditioning, material conveying, plasticizing, injection, packing, holding, cooling, mold opening, ejection, part handling, and cycle recovery. Maintenance technicians must understand this process because many machine failures first appear as quality defects, and many quality defects first appear to be machine failures. A molding cell is a controlled system. The machine creates clamp force, melt pressure, velocity, screw rotation, barrel heat, ejector motion, and core-pull motion. The mold forms the part and contains cooling circuits, venting, slides, lifters, hot runners, and mechanical shutoffs. Auxiliary equipment controls material condition, melt delivery, mold temperature, part removal, inspection, scrap handling, and downstream logistics. The technician must diagnose across the entire system before assigning blame to the press. A typical cycle is: mold close, clamp tonnage build, injection forward, velocity-to-pressure transfer, pack/hold, screw recovery, cooling, decompression if used, mold open, ejection, robot takeout, and mold close permissive. Each cycle step has permissives and feedback. If the machine stalls at mold close, the cause may be clamp hydraulics, toggle lubrication, safety gate feedback, robot enable-mold-close signal, low air pressure, mold protection, core pull position, or a mechanical obstruction in the mold. Key maintenance insight: process curves are machine health indicators. A rising injection pressure at the same fill time can indicate material viscosity change, cold barrel zone, hot runner restriction, check-ring leakage, venting restriction, or dryer failure. A drifting cushion may indicate check ring wear, screw feed inconsistency, loader starvation, melt decompression settings, or injection cylinder seal leakage. A longer recovery time may indicate screw/barrel wear, feed throat heating, back pressure changes, motor/drive problems, or resin bridging.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Injection Molding Cell System Map'
        },
        {
          type: 'paragraph',
          text: 'Bulk material -> Dryer -> Loader/receiver -> Hopper -> Feed throat -> Screw/barrel -> Nozzle/hot runner -> Mold cavities -> Cooling/MTC/chiller -> Part handling robot/conveyor -> Grinder/regrind/blender -> Quality inspection/MES'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Real-World Scenario - A quality defect that is not a press failure'
        },
        {
          type: 'paragraph',
          text: 'A press begins making parts with silver streaks. Operators report the barrel temperatures are on setpoint and the screw recovery looks normal. The first mechanic checks heater bands and finds no issue. The root cause is a desiccant dryer regeneration valve stuck partially open, causing high dew point and wet hygroscopic resin. The press was responding correctly to bad material condition. Correct maintenance response: 1. Confirm whether the resin is hygroscopic and verify drying requirement. 2. Check dryer actual hopper temperature, return air temperature, dew point, airflow, filters, and desiccant bed regeneration status. 3. Pull a sample from the hopper and compare to properly dried material where possible. 4. Correct dryer fault, purge affected material, document dryer readings, and notify processing/QC.'
        },
        {
          type: 'heading',
          level: 3,
          text: '1.2 Machine Identification and Documentation Literacy'
        },
        {
          type: 'paragraph',
          text: 'A technician must be able to identify the exact machine configuration before troubleshooting. The machine serial plate, controller information screen, electrical cabinet drawing pocket, hydraulic schematic, pneumatic schematic, lubrication chart, safety circuit validation record, robot interface drawing, auxiliary equipment asset tags, and PM history are diagnostic tools. The most expensive troubleshooting mistake is working from the wrong print or assuming two machines are wired the same because they are the same tonnage. Critical identifiers include OEM, model, serial number, year, clamp tonnage, screw diameter, injection unit size, maximum injection pressure, hydraulic oil type, pump type, drive type, control platform, safety controller model, hot runner interface, robot interface, mold mounting pattern, tie bar spacing or tie-bar-less frame design, platen dimensions, ejector pattern, and auxiliary communication protocols.'
        },
        {
          type: 'table',
          columns: [
            'Document type',
            'What it tells the technician',
            'Typical maintenance use'
          ],
          rows: [
            [
              'Electrical schematic',
              'Power distribution, fuses, terminals, safety relays, PLC I/O, drives, heaters',
              'Trace voltage, identify outputs, verify sensor wiring, troubleshoot drive faults.'
            ],
            [
              'Hydraulic schematic',
              'Pump, valves, accumulators, pressure controls, cylinders, flow paths',
              'Locate test points, isolate pressure loss, understand sequence faults.'
            ],
            [
              'Pneumatic schematic',
              'FRL, solenoids, cylinders, valve gates, EOAT circuits',
              'Find low air, stuck solenoid, incorrect routing, valve gate issues.'
            ],
            [
              'Mechanical assembly drawing',
              'Bearings, rails, toggles, platens, screws, seals, wear parts',
              'Plan disassembly, alignment, lubrication, and parts ordering.'
            ],
            [
              'Safety validation record',
              'Safety function, channel architecture, stop category, test method',
              'Prove interlocks and prevent unsafe bypasses.'
            ],
            [
              'OEM alarm manual',
              'Fault code meaning and conditions',
              'Avoid chasing symptoms without knowing trigger logic.'
            ],
            [
              'PM history',
              'Recurring failures, replaced parts, measurements',
              'Detect chronic failure and improve PM strategy.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: '1.3 Metrology and Measurement for Maintenance'
        },
        {
          type: 'paragraph',
          text: 'Metrology is the science and practice of measurement. Maintenance metrology converts opinions into evidence. A technician should know how to measure voltage, current, resistance, insulation resistance, pressure, flow, temperature, vibration, alignment, backlash, straightness, parallelism, lubrication condition, torque, and process trends. The question is not simply “what is the value?” but “is this value measured at the correct point, with the correct instrument, under the correct load, and compared to a valid baseline?” Maintenance-grade'
        },
        {
          type: 'table',
          columns: [
            'Measurement',
            'Instrument',
            'Common mistake',
            'practice'
          ],
          rows: [
            [
              'Voltage',
              'CAT-rated multimeter',
              'Measuring to the wrong common or neutral',
              'Use the print, verify meter live-dead-live, measure source and load sides.'
            ],
            [
              'Current',
              'Clamp meter / drive readout',
              'Measuring unloaded current and assuming health',
              'Compare under repeatable load and trend over time.'
            ],
            [
              'Resistance',
              'Multimeter / milliohm meter',
              'Testing in-circuit through parallel paths',
              'Isolate component leads when necessary.'
            ],
            [
              'Insulation resistance',
              'Megohmmeter',
              'Megging electronics or thermocouple inputs',
              'Disconnect sensitive electronics; follow OEM voltage limits. Maintenance-grade'
            ],
            [
              'Hydraulic pressure',
              'Rated pressure gauge / transducer',
              'Using wrong range or ignoring spikes',
              'Use appropriate range, snubber if needed, read during the fault step.'
            ],
            [
              'Temperature',
              'Thermocouple probe / IR / thermal camera',
              'Trusting IR on shiny metal',
              'Use contact probe or emissivity correction; compare to controller PV.'
            ],
            [
              'Flow',
              'Flow meter / ultrasonic / rotameter',
              'Checking temperature only',
              'Low flow can hide behind normal supply temperature.'
            ],
            [
              'Alignment',
              'Dial indicator / laser / straightedge',
              'Measuring with machine loaded differently',
              'Use OEM fixture and load condition; record readings.'
            ]
          ]
        }
      ]
    },
    {
      id: 'part-2-clamp-systems-theory-components-troubleshooting-and-r',
      title: 'Part 2 - Clamp Systems: Theory, Components, Troubleshooting, and Repair',
      blocks: [
        {
          type: 'heading',
          level: 3,
          text: '2.1 Clamp System Purpose and Universal Principles'
        },
        {
          type: 'paragraph',
          text: 'The clamp system closes the mold, protects the mold during closing, builds and holds clamp force during injection and packing, opens the mold, and provides the structure that keeps the mold halves aligned. Clamp failures create flash, short shots, broken cores, crushed vents, damaged leader pins, cracked platens, tie-bar strain imbalance, robot interference, and catastrophic crush hazards. Clamp tonnage is the force that resists cavity pressure trying to separate the mold. The required clamp force depends on projected part area, runner area, cavity pressure, number of cavities, material, process, and safety factor. Maintenance does not normally set clamp tonnage from scratch, but maintenance must understand that low or uneven clamp force can look like tooling damage or process drift. Generic force concepts: hydraulic cylinder force equals pressure times effective piston area. Toggle clamp force is generated by a mechanical linkage approaching over-center; small movement near lockup creates high force multiplication. Electric clamp force is generated by servo torque through ballscrews, rack-and-pinion systems, or mechanical linkages, with feedback from encoders and strain/position systems. Hydromechanical and two-platen clamps use long stroke cylinders for movement and mechanical locking or short high-pressure clamp cylinders for force. WARNING: Clamp motion is a crushing hazard. Do not enter the mold area, place hands between platens, or work on tie-bars/toggles/ejectors unless LOTO is applied and the moving platen is mechanically secured where required.'
        },
        {
          type: 'heading',
          level: 3,
          text: '2.2 Hydraulic Direct Clamp Systems'
        },
        {
          type: 'paragraph',
          text: 'A hydraulic direct clamp uses one or more large hydraulic cylinders to close the mold and generate clamp force directly. It is mechanically simpler than a toggle but depends heavily on cylinder seal condition, hydraulic pressure control, platen guidance, tie-bar stretch measurement, and oil cleanliness. Direct hydraulic clamps are common on some large-tonnage or older machines because force is controllable and not dependent on toggle geometry. Major components include clamp cylinder, piston/rod seals, platen guide shoes, tie-bars or frame members, clamp pressure valve, proportional pressure control, hydraulic pump supply, mold protection pressure/velocity control, moving platen position transducer, safety gate circuit, mold height adjustment where present, ejector system, and core-pull circuits.'
        },
        {
          type: 'table',
          columns: [
            'Interval',
            'Maintenance activity',
            'Pass/fail criteria',
            'Documentation'
          ],
          rows: [
            [
              'Daily',
              'Check visible hydraulic leaks, platen area cleanliness, safety gates, abnormal noise',
              'No active leaks, guards functional, no unusual drift',
              'Operator/ maintenance daily inspection.'
            ],
            [
              'Weekly',
              'Inspect hoses, fittings, guide rails, platen lubrication, clamp pressure repeatability',
              'No hose abrasion, stable pressure, lubrication present',
              'Weekly clamp PM entry.'
            ],
            [
              'Monthly',
              'Trend clamp pressure, clamp position repeatability, mold protection behavior',
              'No unexplained pressure rise/drop, no position hunting',
              'Monthly machine health log.'
            ],
            [
              'Quarterly',
              'Check cylinder drift, tie-bar strain/clamp force if equipment available',
              'Drift within OEM limits, balanced force',
              'Quarterly PM / calibration record.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Hydraulic Direct Clamp Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: slow close, no clamp tonnage, platen drift, mold protection nuisance trips, uneven flash. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Hydraulic Clamp Cylinder Seal Replacement - Generic Planning Procedure'
        },
        {
          type: 'paragraph',
          text: 'Scope: Large hydraulic clamp cylinders on direct clamp machines. Use OEM disassembly procedure and lifting plan. Required tools and materials: OEM manual, lockout locks, pressure gauges, lifting equipment, seal kit, clean oil-compatible tools, lint-free wipes, torque tools, caps/plugs, alignment tools. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Review cylinder assembly drawing, seal kit contents, lifting weights, required blocking, and contamination-control plan. 2. Apply LOTO, block moving platen where applicable, bleed hydraulic pressure, and verify zero pressure at the relevant clamp circuit test point. 3. Clean the exterior around hose and cylinder ports before opening the circuit. 4. Tag and cap hydraulic hoses immediately after disconnecting to prevent contamination and misrouting. 5. Support cylinder components with rated lifting devices; never rely on hydraulic pressure to hold position. 6. Disassemble according to OEM order; inspect rod finish, barrel scoring, piston wear, bearing bands, and seal grooves. 7. Replace seals using correct orientation and lubricant; do not twist, cut, stretch beyond limit, or mix old and new seal components. 8. Reassemble using OEM torque values and sequence. Reconnect hoses by tag and verify routing against schematic. 9. Filter/flush affected circuit if contamination entered. Refill and bleed as required. 10. Restore energy under controlled conditions. Jog at low pressure/speed, check for leaks, then perform clamp force and position verification. Functional test criteria: No leaks, no abnormal heat/noise, platen movement smooth, clamp force repeatable, mold protection functional, and all safety gates verified. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Real-World Scenario - Hydraulic clamp loses tonnage after warm-up'
        },
        {
          type: 'paragraph',
          text: 'A hydraulic direct clamp reaches tonnage during startup but loses clamp force after two hours. Parts flash at the parting line. The quick assumption is a bad mold, but pressure trending shows clamp pressure decay while the valve command remains steady. Correct maintenance response: 1. Verify actual clamp pressure with an independent gauge or calibrated transducer. 2. Check oil temperature and viscosity range; overheated thin oil worsens internal leakage. 3. Compare pressure decay with pump off and valves centered to isolate cylinder seal leakage vs valve leakage. 4. Inspect clamp pressure valve and proportional valve leakage; verify command and feedback. 5. Plan seal repair or valve rebuild based on isolation test, not part appearance alone.'
        },
        {
          type: 'heading',
          level: 3,
          text: '2.3 Toggle Clamp Systems - Single Toggle, Double Toggle, Hydraulic and Electric Actuated'
        },
        {
          type: 'paragraph',
          text: 'A toggle clamp converts actuator movement into amplified clamp force through mechanical links. As the toggle approaches lockup, linkage geometry creates high force multiplication and high stiffness. Toggle systems are efficient and fast but require lubrication, alignment, bushing integrity, platen parallelism, correct mold height setting, and careful inspection for cracks or wear. Hydraulic toggle machines use a hydraulic cylinder to move the toggle. All-electric toggle machines use servo motors and ballscrews or geared drives to move the linkage. Single-toggle systems use one primary linkage path; double-toggle systems use mirrored or compound linkages for force distribution and platen movement. Both can suffer from link pin wear, bushing wear, lubrication starvation, bent links, tie-bar imbalance, platen skew, and lockup position errors. Electric toggles add servo alarms, encoder homing faults, ballscrew wear, brake issues, and drive parameter sensitivity. WARNING: A toggle mechanism can store mechanical energy. Do not remove toggle pins, links, cylinders, ballscrews, or servo components without supporting and unloading the mechanism according to OEM instructions.'
        },
        {
          type: 'table',
          columns: [
            'Interval',
            'Maintenance activity',
            'Pass/fail criteria',
            'Documentation'
          ],
          rows: [
            [
              'Daily',
              'Listen for toggle knock, inspect grease presence and safety gate operation',
              'No dry pins, no hammering, gate stops motion',
              'Daily press walkaround.'
            ],
            [
              'Weekly',
              'Inspect auto-lube reservoir, lines, manifolds, pin ends, link plates',
              'Grease delivered to all points, no broken lines',
              'Lube PM sheet.'
            ],
            [
              'Monthly',
              'Check clamp parallelism indicators, mold height repeatability, tie-bar strain balance where available',
              'No trend toward imbalance or skew',
              'Clamp health log.'
            ],
            [
              'Semiannual',
              'Inspect toggle pins/bushings, link cracks, platen shoes, ballscrews/linear guides on electric units',
              'Wear within OEM limits',
              'Mechanical PM report.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Toggle Clamp Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: toggle knock, failure to lock, motor overload, clamp tonnage variation, uneven parting-line flash. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Toggle Linkage Inspection and Pin/Bushing Replacement'
        },
        {
          type: 'paragraph',
          text: 'Scope: Hydraulic or electric toggle clamp linkage service. Required tools and materials: LOTO kit, OEM prints, grease, dial indicator, lifting/support equipment, pin puller, bushing tools, torque tools, NDT if required. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Review OEM support points and determine whether the linkage must be positioned in a service-safe state before lockout. 2. Apply LOTO and block any component that could shift when pins are removed. 3. Clean grease and debris from link joints; mark orientation of links, shims, and spacers. 4. Measure looseness/backlash before disassembly and photograph wear patterns. 5. Remove pins using approved tooling; do not torch or hammer in a way that distorts link plates unless OEM repair plan allows it. 6. Inspect pins for scoring, fretting, galling, hardness loss, and lubrication starvation; inspect bushings for ovality and cracking. 7. Replace worn components as a matched repair where required; clean all grease passages. 8. Reassemble with OEM lubrication, shims, torque values, and retaining hardware. 9. Cycle slowly, confirm no binding, verify lube delivery, then verify clamp force and mold protection. Functional test criteria: No abnormal noise, no hot joints after cycling, lockup position stable, clamp force balance acceptable, mold protection and gate circuits verified. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Real-World Scenario - Toggle clamp overload after mold change'
        },
        {
          type: 'paragraph',
          text: 'After a mold change, an electric toggle press alarms on clamp servo overload near lockup. The mold fits physically and the processor increases mold close force, making the alarm worse. The root cause is incorrect mold height causing the toggle to over-compress before proper lockup geometry. Correct maintenance response: 1. Stop and review mold height setup; do not force lockup with higher torque. 2. Verify mold thickness against machine range and HMI mold height value. 3. Check platen parallelism and leader pin alignment. 4. Run mold close at reduced speed/force and observe load trend near lockup. 5. Reset mold height/clamp force calibration per OEM procedure.'
        },
        {
          type: 'heading',
          level: 3,
          text: '2.4 Hydromechanical / Two-Platen Clamp Systems'
        },
        {
          type: 'paragraph',
          text: 'Hydromechanical and two-platen clamps separate fast platen travel from high clamp-force generation. A common architecture uses travel cylinders to move the platen, mechanical locking nuts or clamps to engage the tie-bars, and short-stroke high-pressure clamp cylinders to build tonnage. This design is efficient for large machines because it avoids very long high- pressure clamp cylinders and reduces machine footprint. Key components include moving platen travel cylinders, tie-bars, locking nuts, tie-bar threads or grooves, hydraulic clamp cylinders, locking sensors, platen position system, clamp pressure controls, lubrication system, and safety logic that prevents injection until locks are confirmed. WARNING: Two-platen locks and tie-bar nuts are high-energy components. A false lock confirmation or damaged thread/groove can create severe equipment damage or personnel hazards. Treat lock-position feedback as safety-critical machine feedback.'
        },
        {
          type: 'table',
          columns: [
            'Interval',
            'Maintenance activity',
            'Pass/fail criteria',
            'Documentation'
          ],
          rows: [
            [
              'Daily',
              'Check lock engagement alarms, hydraulic leaks, lock lubrication, abnormal clunking',
              'No lock faults or leaks',
              'Daily log.'
            ],
            [
              'Monthly',
              'Inspect lock sensors, tie-bar lock areas, grease delivery, pressure build curve',
              'Consistent lock timing and pressure rise',
              'Clamp PM.'
            ],
            [
              'Quarterly',
              'Verify tie-bar strain/clamp force balance; inspect lock wear',
              'Balanced within OEM limits',
              'Calibration record.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Two-Platen Clamp Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: lock not confirmed, clamp tonnage slow to build, uneven force, tie-bar lock alarm, travel cylinder drift. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: '2.5 All-Electric Clamp Systems'
        },
        {
          type: 'paragraph',
          text: 'All-electric clamp systems use servo motors, gearboxes, belts, ballscrews, rack-and-pinion drives, linear guides, encoders, brakes, and servo amplifiers to move and apply clamp force. Electric clamp systems offer high repeatability and energy efficiency, but maintenance demands precise mechanical condition, clean lubrication, drive health, correct homing, and valid feedback. Mechanical friction translates directly into motor current and drive alarms. Common failure modes include ballscrew lubrication starvation, linear guide contamination, coupling looseness, belt wear, brake drag, encoder faults, servo overload, drive overcurrent, thermal overload, and home sensor misalignment. Unlike hydraulic machines, an electric clamp may have little leakage evidence; the best early warning is trend data: rising current for the same movement profile, increasing following error, higher servo temperature, and more frequent position faults. WARNING: Servo drives can retain hazardous DC bus voltage after power removal. Follow drive discharge verification instructions before touching drive terminals or motor leads.'
        },
        {
          type: 'table',
          columns: [
            'Interval',
            'Maintenance activity',
            'Pass/fail criteria',
            'Documentation'
          ],
          rows: [
            [
              'Daily',
              'Check servo alarms, abnormal axis sound, guards, lubrication visible indicators',
              'No alarms/noise',
              'Daily cell log.'
            ],
            [
              'Monthly',
              'Inspect belts/couplings, ballscrew lubrication, guide rails, cable carriers',
              'No cracks, fraying, backlash, dry rails',
              'Electric axis PM.'
            ],
            [
              'Quarterly',
              'Trend servo current, following error, brake holding test, encoder battery if applicable',
              'Stable trends and battery above limit',
              'Controls PM.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'All-Electric Clamp Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: following error, overcurrent, home fault, brake alarm, clamp force deviation. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: '2.6 Tie-Bar-Less Clamp Systems'
        },
        {
          type: 'paragraph',
          text: 'Tie-bar-less machines use a force-transmitting frame or C-frame / platen structure to allow unrestricted mold access. Design principles differ by OEM, but the maintenance concerns are consistent: frame deflection, platen parallelism, guideway condition, clamp force calibration, mold weight/mounting, and safety gate/robot integration. Because tie-bars do not guide the moving platen in the traditional way, the frame and guidance system must be treated as precision structures. Tie-bar-less architecture improves automation access and mold change flexibility, but it is less forgiving of damaged ways, improper mold support, uneven mold mounting, and neglected alignment. Force transmission occurs through the machine frame; cracks, loose structural fasteners, worn guide shoes, or frame distortion can create flash or mold wear without obvious hydraulic/electrical faults.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tie-Bar-Less Clamp Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: platen skew, repeat flash, mold alignment wear, clamp force calibration drift, guide noise. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: '2.7 Mold Protection, Safety Gates, Ejectors, Core Pulls, and Clamp-Adjacent Systems'
        },
        {
          type: 'paragraph',
          text: 'Clamp troubleshooting cannot be separated from mold protection and adjacent systems. Mold protection uses low-pressure mold close, position windows, force/pressure limits, and sometimes servo load monitoring to stop mold close before crushing a part, runner, slide, lifter, robot EOAT, or foreign object. Ejectors and core pulls must be confirmed in safe positions before mold close. Safety gates must stop hazardous motion. Robot interfaces must give a valid enable- mold-close signal. WARNING: Never defeat mold protection to overcome a nuisance alarm without understanding why the alarm occurred. A crushed mold can cost more than the press repair and can create projectile or pinch hazards. Diagnostic strategy: when mold close stops unexpectedly, read the exact stop condition. Separate safety stop, robot stop, core pull not home, ejector not back, mold protection force exceeded, mold close timeout, position mismatch, and servo/hydraulic drive fault. Each path has different evidence and different risk.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Mold Protection / Ejector / Core Pull Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: mold protection stop, core not home, ejector return fault, robot not clear, safety gate mismatch. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        }
      ]
    },
    {
      id: 'part-3-injection-units-theory-components-troubleshooting-and',
      title: 'Part 3 - Injection Units: Theory, Components, Troubleshooting, and Repair',
      blocks: [
        {
          type: 'heading',
          level: 3,
          text: '3.1 Reciprocating Screw Theory'
        },
        {
          type: 'paragraph',
          text: 'The reciprocating screw performs two jobs. During recovery, it rotates to convey pellets, melt resin, mix additives, and build a measured shot in front of the screw while the screw moves backward. During injection, the screw stops rotating and acts like a plunger, moving forward to inject molten plastic through the nozzle, sprue, runner, hot runner, and gates into the mold. The check ring or non-return valve should close during injection so melt does not leak backward over the screw flights. A maintenance technician must understand plasticizing because mechanical wear appears as process instability. Screw/barrel wear reduces conveying efficiency, increases recovery time, creates melt temperature variation, and can increase black specks through stagnation. Check ring wear creates cushion variation, short shots, inconsistent part weight, and apparent pressure instability. Feed throat cooling problems cause bridging, surging, or poor feed.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Screw Zones'
        },
        {
          type: 'paragraph',
          text: 'Hopper -> Feed zone -> Transition/compression zone -> Metering zone -> Check ring -> Nozzle'
        },
        {
          type: 'paragraph',
          text: 'solids conveying melting/compression melt pumping'
        },
        {
          type: 'heading',
          level: 3,
          text: '3.2 Screw, Barrel, Check Ring, and Nozzle Components'
        },
        {
          type: 'paragraph',
          text: 'A screw has flights, root, channels, mixing sections if equipped, and a tip assembly. The barrel contains hardened liner or nitrided/bimetallic wear surfaces. The check ring assembly may include a ring, seat, retainer, and tip. Nozzles may be open, reverse-taper, shutoff, valve-style, or application-specific. Maintenance inspection focuses on wear, scoring, corrosion, galling, carbon, degradation buildup, broken tips, leaking threads, heater contact, thermocouple fit, and alignment between nozzle and sprue bushing.'
        },
        {
          type: 'table',
          columns: [
            'Component',
            'Function',
            'Common failure',
            'Press symptom'
          ],
          rows: [
            [
              'Screw flights',
              'Convey and melt material',
              'Wear, corrosion, broken flight',
              'Long recovery, poor melt quality, black specks.'
            ],
            [
              'Barrel',
              'Pressure vessel and heat transfer body',
              'ID wear, scoring, feed throat wear',
              'Inconsistent shot, long recovery, poor temperature control.'
            ],
            [
              'Check ring / NRV',
              'Prevent backflow during injection',
              'Worn ring/seat, sticking, contamination',
              'Cushion drift, short shots, weight variation.'
            ],
            [
              'Nozzle',
              'Transfer melt to mold/hot runner',
              'Leak, drool, freeze- off, misalignment',
              'Nozzle leak, gate string, short shot, degraded material.'
            ],
            [
              'Injection cylinder/servo axis',
              'Drive screw forward',
              'Seal leak, servo following error, encoder issue',
              'Velocity error, pressure loss, drift.'
            ],
            [
              'Carriage / sled',
              'Move injection unit to mold',
              'Cylinder leak, rails dry, alignment issue',
              'Nozzle leak, sprue bushing wear, carriage alarm.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Injection Unit Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: cushion drift, short shot, long recovery, high injection pressure, nozzle leak, screw position fault. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'table',
          columns: [
            'Interval',
            'Maintenance activity',
            'Pass/fail criteria',
            'Documentation'
          ],
          rows: [
            [
              'Daily',
              'Check nozzle leak, barrel heat alarms, feed throat temperature, hopper magnet, abnormal recovery noise',
              'No leaks, stable heat, magnet clean',
              'Daily log.'
            ],
            [
              'Weekly',
              'Inspect heater band tightness, thermocouple seating, carriage rails, hopper throat cooling',
              'No loose bands, no water leaks',
              'Weekly PM.'
            ],
            [
              'Monthly',
              'Trend recovery time, cushion variation, peak pressure at constant job',
              'No drift beyond process baseline',
              'Process/ maintenance trend sheet.'
            ],
            [
              'Annual or wear- triggered',
              'Pull screw for inspection, measure screw/barrel clearance, inspect NRV',
              'Wear within OEM/material limits',
              'Screw/barrel inspection report.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Check Ring / Non-Return Valve Inspection'
        },
        {
          type: 'paragraph',
          text: 'Scope: Screw tip and check ring inspection during screw pull or front-end service. Required tools and materials: LOTO kit, heat PPE, screw puller if applicable, OEM tooling, brass tools, torque wrench, anti-seize if approved, inspection gauges, cleaning tools. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Purge material safely, reduce barrel temperature per material/OEM procedure, and cool to safe service temperature unless hot disassembly is required by OEM. 2. Apply LOTO. Confirm heater circuits are off and barrel/nozzle thermal hazards are controlled. 3. Remove nozzle/front-end components according to OEM procedure; support heavy components. 4. Remove check ring assembly. Do not damage seating surfaces with steel tools. 5. Inspect ring OD, seat face, tip, retainer, cracks, galling, carbon, and freedom of movement. 6. Measure wear where gauges/specs exist. Replace as assembly when seat and ring wear pattern are matched or OEM requires it. 7. Clean threads and mating surfaces; reassemble with OEM torque and approved anti-seize if specified. 8. Heat soak, purge, and run a check-ring repeatability test using cushion/part weight trend at stable process settings. Functional test criteria: Stable cushion and part weight, no front-end leak, normal peak pressure, no abnormal recovery noise. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: '3.3 Hydraulic, Accumulator-Assisted, Electric, and Hybrid Injection Units'
        },
        {
          type: 'paragraph',
          text: 'Hydraulic injection units use injection cylinders and proportional/servo hydraulic valves to control screw velocity and pressure. Accumulator-assisted units store hydraulic energy in accumulators to supply very high injection flow for fast filling. All-electric injection units use servo motors and ballscrews to drive screw axial movement. Hybrid systems combine hydraulic plasticizing or clamp with electric injection, or electric clamp with hydraulic injection, depending on OEM architecture. Accumulator-assisted systems require special attention to precharge, isolation, pressure decay, safety blocks, and nitrogen handling. Electric injection axes require ballscrew lubrication, encoder integrity, servo tuning, brake function, and drive diagnostics. Hydraulic injection units require seal integrity, valve response, pressure transducer accuracy, and oil cleanliness. WARNING: Accumulator systems can store lethal energy after pump shutdown. Do not loosen fittings, remove valves, or service accumulator circuits until isolated, discharged, and verified with the OEM-approved procedure.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Accumulator-Assisted Injection Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: fast fill pressure collapse, accumulator low precharge alarm, injection velocity not reached, hydraulic shock. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'All-Electric Injection Axis Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: following error, injection servo overload, abnormal ballscrew noise, pressure mismatch, position drift. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: '3.4 Hopper, Feed Throat, Carriage, and Nozzle Alignment'
        },
        {
          type: 'paragraph',
          text: 'The feed system must deliver consistent pellets to the screw. Water-cooled feed throats prevent pellets from softening too early. A blocked hopper, failed loader, feed throat water leak, magnet full of metal, or bridged material can create recovery issues that look like screw wear. The carriage must push the nozzle squarely against the sprue bushing or hot runner inlet. Misalignment creates nozzle leaks, bushing wear, drool, poor transfer, and potential mold damage.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Real-World Scenario - Recovery time increases after material change'
        },
        {
          type: 'paragraph',
          text: 'A machine running PP recovers in 3.8 seconds. After a material change, recovery drifts to 6.5 seconds with occasional feed surging. The screw and motor are blamed. Inspection finds feed throat cooling water valve shut and pellets softening at the throat. Correct maintenance response: 1. Check loader supply and hopper material level. 2. Check feed throat temperature and water flow. 3. Inspect hopper magnet and throat for fines or bridging. 4. Trend recovery current/pressure before condemning screw/barrel. 5. Correct feed throat cooling and document baseline recovery after stabilization.'
        }
      ]
    },
    {
      id: 'part-4-hydraulic-systems-theory-components-troubleshooting-a',
      title: 'Part 4 - Hydraulic Systems: Theory, Components, Troubleshooting, and Repair',
      blocks: [
        {
          type: 'heading',
          level: 3,
          text: '4.1 Hydraulic Theory for IMM Maintenance'
        },
        {
          type: 'paragraph',
          text: 'Hydraulics transmit power through pressurized fluid. Pressure is resistance to flow; flow creates actuator speed; force equals pressure times area; hydraulic power equals pressure times flow. In maintenance practice, a pressure problem may actually be a flow problem, a flow problem may actually be a restriction problem, and a heat problem may be wasted power from leakage, bypassing, or incorrect valve command. Injection molding hydraulics use fixed or variable displacement pumps, servo pumps, accumulators, proportional valves, servo valves, directional valves, relief valves, pressure reducing valves, counterbalance valves, check valves, filters, heat exchangers, reservoirs, cylinders, motors, and manifold blocks. Each circuit has a function and a sequence. Understanding the schematic is mandatory.'
        },
        {
          type: 'table',
          columns: [
            'Hydraulic concept',
            'Floor meaning',
            'Common diagnostic trap'
          ],
          rows: [
            [
              'Pressure',
              'Load resistance or force potential',
              'Seeing pressure and assuming flow exists.'
            ],
            [
              'Flow',
              'Movement speed or cooling/oil transfer rate',
              'Measuring static pressure when dynamic flow is failing.'
            ],
            [
              'Restriction',
              'Pressure drop across a component',
              'Replacing pumps when a plugged filter or hose is the restriction.'
            ],
            [
              'Internal leakage',
              'Flow bypassing inside pump/valve/cylinder',
              'Blaming external leaks only.'
            ],
            [
              'Contamination',
              'Particles/water/oxidation in oil',
              'Replacing valves without fixing dirty oil.'
            ],
            [
              'Cavitation',
              'Vapor bubbles from inlet starvation',
              'Replacing noisy pump without checking suction strainer, oil level, viscosity.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: '4.2 Hydraulic Power Unit and Pump Systems'
        },
        {
          type: 'paragraph',
          text: 'The hydraulic power unit (HPU) stores oil, removes heat, filters contamination, and converts motor power into hydraulic flow. Common pump types include vane pumps, gear pumps, axial piston pumps, variable displacement pumps, and servo-pump systems. Variable pumps adjust displacement to demand. Servo-hydraulic systems may use a servo motor driving a pump to reduce energy use and improve response. Pump symptoms include noise, low pressure, slow movement, high oil temperature, unstable pressure, drive overload, cavitation, aeration, and contamination generation. Always verify oil level, suction restrictions, pump rotation, coupling condition, motor current, inlet leaks, filter condition, relief settings, and valve commands before replacing a pump.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Hydraulic Power Unit Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: pump noise, low pressure, high oil temperature, slow clamp/injection, motor overload. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'table',
          columns: [
            'Interval',
            'Maintenance activity',
            'Pass/fail criteria',
            'Documentation'
          ],
          rows: [
            [
              'Daily',
              'Oil level, temperature, pump noise, active leaks, filter indicators',
              'Level in range, temperature stable, no alarms',
              'Daily HPU log.'
            ],
            [
              'Monthly',
              'Sample oil visually, check breathers, inspect hoses/couplings, trend motor current',
              'No water/foam/dark oil, no hose damage',
              'Monthly PM.'
            ],
            [
              'Quarterly',
              'Oil analysis, filter element review, cooler cleaning, pressure baseline',
              'ISO cleanliness and viscosity in target',
              'Oil analysis report.'
            ],
            [
              'Annual',
              'Reservoir inspection/cleaning if condition requires, suction strainer inspection, cooler integrity check',
              'No sludge, no suction restriction',
              'Annual hydraulic PM.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Hydraulic Filter Element Replacement'
        },
        {
          type: 'paragraph',
          text: 'Scope: Pressure, return, or offline filtration elements on IMM hydraulic systems. Required tools and materials: LOTO kit, correct element, drain pan, clean plugs/caps, lint- free wipes, PPE, oil-compatible gloves. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Identify filter type and verify replacement element part number, micron rating, beta rating, seal material, and flow direction. 2. Apply LOTO if required by filter location and equipment state; relieve hydraulic pressure. 3. Clean exterior of filter housing before opening. 4. Remove element without dropping debris into housing; inspect element for metal, seal fragments, or abnormal debris. 5. Clean bowl/housing with lint-free method. Replace seals included in kit. 6. Install element in correct orientation. Do not force a wrong element. 7. Restore system, check for leaks, bleed if required, and reset filter indicator only after verifying operation. 8. Document element condition. Escalate metal debris or repeated premature plugging for oil analysis and component inspection. Functional test criteria: No leaks, filter indicator normal, oil level correct, no abnormal pump noise, work order includes debris observations. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: '4.3 Proportional Valves, Servo Valves, and Directional Valves'
        },
        {
          type: 'paragraph',
          text: 'Directional valves route oil. Proportional valves modulate flow or pressure based on electrical command. Servo valves are high-response precision valves often used where very fast and accurate control is required. These valves depend on clean oil, correct electrical command, proper null/bias setup, feedback integrity, and healthy pilot pressure where applicable. A sticky valve can look like a bad cylinder, bad pump, bad sensor, or controller fault. Diagnostic approach: verify the valve is commanded, verify coil voltage/current or drive signal, verify enable/pilot pressure, check spool feedback if available, compare pressure upstream/downstream, and test mechanical movement only under controlled safe conditions. Contamination-related valve faults often repeat after replacement unless oil cleanliness and filter performance are corrected. WARNING: Do not swap proportional or servo valves casually between machines without verifying part number, spool type, feedback configuration, null adjustment, parameter requirements, and cleanliness protocol. A wrong valve can cause uncontrolled motion or severe process instability.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Hydraulic Valve Control Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: axis moves one direction only, slow response, pressure overshoot, hunting, no motion despite command. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: '4.4 Hydraulic Cylinders, Hoses, Fittings, Accumulators, and Fluid Management'
        },
        {
          type: 'paragraph',
          text: 'Cylinders convert hydraulic pressure into linear motion. Hoses and fittings route oil. Accumulators store energy. Fluid condition determines component life. Common cylinder faults include external leakage, internal bypass, scored rods, damaged wipers, bent rods, loose mounts, and air entrainment. Hose faults include abrasion, cracking, blistering, wrong pressure rating, improper bend radius, and fitting leaks. Accumulator faults include low precharge, bladder failure, gas leakage, and unsafe isolation. WARNING: Accumulator charging and service must be performed only by trained personnel using nitrogen, correct charging equipment, and OEM procedures. Never use oxygen or compressed air to charge a hydraulic accumulator.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Hydraulic Hose Replacement'
        },
        {
          type: 'paragraph',
          text: 'Scope: Hydraulic hose replacement on IMM or auxiliary hydraulic equipment. Required tools and materials: LOTO kit, correct hose assembly, caps/plugs, wrench set, torque wrench if specified, spill kit, PPE, tags, schematic. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Identify circuit, pressure rating, temperature rating, fluid compatibility, length, fitting type, and routing. 2. Apply LOTO, relieve pressure, control gravity loads, and verify zero pressure at the relevant test point. 3. Clean the area and tag both hose ends before removal. 4. Cap/plug open ports immediately to prevent contamination. 5. Remove hose and inspect failure mode: abrasion, twist, heat, pressure pulse, fitting defect, or age. 6. Install replacement without twist, rubbing, tight bend radius, or unsupported span. Use clamps/guards as designed. 7. Torque fittings per OEM/fitting manufacturer guidance. Do not overtighten tapered fittings to stop a leak without inspection. 8. Restore pressure slowly, check for leaks with safe methods, cycle equipment, and recheck routing under motion. Functional test criteria: No leaks, no rubbing through full motion, pressure stable, hose failure mode documented for prevention. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        }
      ]
    },
    {
      id: 'part-5-electrical-and-drive-systems-theory-components-troubl',
      title: 'Part 5 - Electrical and Drive Systems: Theory, Components, Troubleshooting, and Repair',
      blocks: [
        {
          type: 'heading',
          level: 3,
          text: '5.1 Electrical Architecture of IMM Cells'
        },
        {
          type: 'paragraph',
          text: 'An IMM electrical system usually contains incoming three-phase power, main disconnect, fusing/circuit breakers, transformers or power supplies, control circuits, PLC or industrial controller, safety relays or safety PLC, HMI, servo drives, VFDs, contactors, SSRs, heater circuits, temperature inputs, sensors, solenoids, encoder/resolver feedback, network buses, and auxiliary interfaces. Troubleshooting must separate power distribution, control logic, field device, load, and feedback. Electrical failures often have mechanical causes. A servo overcurrent may result from a dry ballscrew. A heater SSR failure may result from a loose heater band drawing uneven current. A blown fuse may be downstream of a shorted cable in a robot cable carrier. A thermocouple alarm may be a crushed mold cable. Treat electrical faults as system faults until proven otherwise. WARNING: Before opening an electrical enclosure, verify authorization, PPE, arc- flash label requirements, and whether an electrically safe work condition is required. Do not assume a disconnect removes every voltage source; back-fed auxiliary power and UPS/control circuits may remain energized.'
        },
        {
          type: 'heading',
          level: 3,
          text: '5.2 Three-Phase Power, Motors, VFDs, Servo Drives, and Servo Motors'
        },
        {
          type: 'paragraph',
          text: 'Three-phase power supplies large motors, pumps, drives, and heaters. Phase imbalance, loose terminals, failing contactors, poor grounding, and voltage dips create intermittent faults. VFDs vary motor speed by converting AC to DC and back to controlled-frequency AC. Servo drives close high-performance position, velocity, or torque loops using feedback from encoders or resolvers. Servo systems require correct feedback, motor phasing, brake release, mechanical load condition, and parameter integrity. A drive alarm is a symptom, not a diagnosis. Record the exact alarm, axis, operating state, DC bus voltage, drive ready status, enable chain, motor temperature, encoder status, and load condition. Check whether the fault occurs at enable, at motion start, at a specific position, under load, or after warm-up.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Servo Drive / VFD / Motor Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: overcurrent, following error, encoder fault, brake fault, overtemperature, DC bus undervoltage. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Servo Motor Replacement - Generic'
        },
        {
          type: 'paragraph',
          text: 'Scope: Servo motor replacement on electric clamp, injection, ejector, robot, or auxiliary axis. Required tools and materials: LOTO kit, OEM motor, encoder cable, power cable, torque tools, alignment tools, lifting support, parameter backup access. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Back up axis parameters and record motor nameplate, encoder type, brake voltage, and cable IDs. 2. Move axis to safe service position if possible, then apply LOTO and verify drive DC bus discharged. 3. Mark coupling/belt position and cable routing. Support vertical or gravity-loaded axes. 4. Disconnect power and feedback cables by connector, not by pulling on cable bodies. 5. Remove motor while preserving shims, keys, couplings, and orientation. 6. Inspect coupling, gearbox input, brake dust, oil contamination, and mechanical load for the root cause of failure. 7. Install motor with correct alignment and torque. Reconnect cables with strain relief and correct bend radius. 8. Restore power in maintenance mode. Verify encoder communication, brake release, home/reference, and low-speed jog. 9. Perform mastering/homing/calibration if required before automatic operation. Functional test criteria: Axis jogs smoothly, no alarms, home position valid, following error normal, brake holds, guards and safety functions verified. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: '5.3 PLCs, Safety PLCs, HMIs, I/O, and Network Buses'
        },
        {
          type: 'paragraph',
          text: 'A programmable logic controller (PLC) or industrial controller reads inputs, executes logic, and drives outputs. A safety PLC or safety relay handles safety-rated functions such as gates, E- stops, light curtains, robot safety signals, and safe torque off. HMIs display alarms, parameters, trends, and service screens. Networks such as PROFIBUS, PROFINET, EtherCAT, DeviceNet, CANopen, Ethernet/IP, and OEM buses connect I/O racks, drives, robots, temperature controllers, and auxiliary equipment. A technician does not need to be a controls engineer to troubleshoot effectively, but must understand the difference between physical input state, controller input bit, logic permissive, output bit, output module voltage, and load response. Many faults are solved by proving where the signal stops.'
        },
        {
          type: 'table',
          columns: [
            'Layer',
            'Question',
            'Typical tool'
          ],
          rows: [
            [
              'Field device',
              'Is the sensor/switch physically changing?',
              'Visual check, meter, prox tester.'
            ],
            [
              'Input module',
              'Does the controller see the signal?',
              'HMI I/O screen, PLC software if authorized.'
            ],
            [
              'Logic permissive',
              'Is the program allowing the action?',
              'Alarm screen, sequence page, permissive list.'
            ],
            [
              'Output module',
              'Is the output commanded and powered?',
              'I/O screen, meter.'
            ],
            [
              'Load',
              'Does the solenoid/contactor/valve/m otor respond?',
              'Meter, coil test, mechanical inspection.'
            ],
            [
              'Feedback',
              'Did the machine confirm movement/result?',
              'Sensor/transducer/encoder trend.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'PLC I/O and Network Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: missing input, output not energizing, network node offline, safety channel mismatch, HMI communication fault. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: '5.4 Temperature Control: Heater Bands, SSRs, Contactors, Thermocouples, and RTDs'
        },
        {
          type: 'paragraph',
          text: 'Temperature control loops compare process value (PV) from a thermocouple or RTD to setpoint (SP), then drive an output such as SSR, contactor, or power controller. PID control adjusts output based on error, accumulated error, and rate of change. Maintenance must distinguish heater load faults, sensor faults, controller output faults, wiring faults, and heat transfer faults. Heater band fit matters. A loose band can read as on-temperature while heat transfer is poor, causing local overheating, burned insulation, or slow recovery. A thermocouple not seated in its well can read air temperature, causing overshoot. Reversed thermocouple polarity can drive a zone into runaway depending on controller behavior. A shorted SSR can heat with no command. WARNING: Heater circuits commonly use 240 VAC or other hazardous voltages. Turn off and lock out heater power before resistance checks or heater replacement. Live output checks are qualified-personnel-only tasks.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Barrel / Mold / Hot Runner Temperature Zone Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: no heat, runaway heat, open thermocouple, ground fault, slow heat-up, temperature overshoot. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Heater Band Replacement'
        },
        {
          type: 'paragraph',
          text: 'Scope: Barrel, nozzle, adapter, or manifold external heater band replacement. Required tools and materials: LOTO kit, heat PPE, correct heater band, thermocouple tools, meter, anti-seize if approved, torque screwdriver, wire labels. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Identify exact zone, voltage, wattage, diameter, width, lead style, termination, and thermocouple relationship. 2. Cool or guard the work area, apply LOTO to heater power, and verify absence of voltage. 3. Label wires before disconnecting. Inspect terminals for discoloration, loose screws, and insulation damage. 4. Remove old band and inspect barrel/nozzle surface for plastic, rust, carbon, or high spots. Clean contact surface. 5. Install new band with full contact and correct orientation; do not trap leads under the band or route leads over hot edges. 6. Tighten per heater manufacturer/OEM guidance. Recheck after initial heat cycle if required. 7. Measure resistance and insulation/ground condition if procedure requires. 8. Restore power, command heat, verify current draw, temperature rise, and controller stability. Functional test criteria: Zone heats at expected rate, no ground fault, no loose leads, PV tracks SP, no overshoot beyond process tolerance. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        }
      ]
    },
    {
      id: 'part-6-hot-runner-systems-theory-components-troubleshooting',
      title: 'Part 6 - Hot Runner Systems: Theory, Components, Troubleshooting, and Repair',
      blocks: [
        {
          type: 'heading',
          level: 3,
          text: '6.1 Hot Runner Theory'
        },
        {
          type: 'paragraph',
          text: 'A hot runner system keeps plastic molten from machine nozzle to cavity gate using heated manifolds, drops, tips, nozzles, bushings, and controllers. Hot runners reduce cold runner scrap and improve cycle efficiency, but they add thermal, electrical, pneumatic/hydraulic, mechanical, and sequencing complexity. Maintenance must understand zone mapping, heater resistance, thermocouple polarity, ground faults, valve gate actuation, manifold leakage, and startup/shutdown discipline. Hot tips rely on thermal balance at the gate. Valve gates use pins driven by pneumatic, hydraulic, or electric actuators to open and close the gate. A temperature issue can look like a valve gate issue; a pin issue can look like a temperature issue; a bad cable can look like a manifold failure. Zone mapping is therefore core maintenance work. WARNING: Hot runner molds can remain hot and pressurized after machine stop. Follow mold-specific cool-down, depressurization, and LOTO procedures before opening junction boxes, removing tips, or servicing valve gate actuators.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Hot Runner System Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: cold zone, runaway zone, ground fault, gate freeze, gate stringing, valve gate not opening, manifold leak. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: '6.2 Hot Runner Component Identification'
        },
        {
          type: 'table',
          columns: [
            'Component',
            'Function',
            'Maintenance focus'
          ],
          rows: [
            [
              'Manifold heater',
              'Maintains melt temperature in manifold',
              'Resistance, insulation, lead routing, even heating.'
            ],
            [
              'Drop/nozzle heater',
              'Controls each drop or nozzle',
              'Zone mapping, lead damage, thermocouple match.'
            ],
            [
              'Thermocouple',
              'Reports zone temperature',
              'Type J/K, polarity, seating, open/short, cross-wiring.'
            ],
            [
              'Valve gate actuator',
              'Moves gate pin',
              'Air/oil pressure, seals, solenoid, timing, stroke.'
            ],
            [
              'Gate pin',
              'Opens/closes melt path',
              'Wear, tip damage, alignment, sticking.'
            ],
            [
              'Junction box/cable',
              'Connects mold to controller',
              'Pin damage, ground faults, connector heat, strain relief.'
            ],
            [
              'Controller zone card',
              'Controls heater output',
              'SSR/triac output, fuse, sensor input, PID settings.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Hot Runner Zone Fault Isolation'
        },
        {
          type: 'paragraph',
          text: 'Scope: Fault isolation for one hot runner heater or thermocouple zone. Required tools and materials: LOTO kit, zone map, controller manual, multimeter, insulation tester if authorized, connector breakout if available, PPE. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Record zone alarm, actual PV, setpoint, output percentage, mold cavity/drop number, and whether the fault follows the controller channel or mold zone. 2. Turn off heater power and apply LOTO before resistance/continuity checks. 3. Measure heater resistance at controller output, cable end, mold connector, and internal mold junction if accessible. Compare to expected wattage-derived resistance. 4. Check heater-to-ground insulation per OEM procedure. Disconnect electronics before megger testing. 5. Check thermocouple continuity and polarity. Verify the thermocouple responds to gentle local heat where safe. 6. Swap controller channel only if OEM allows and documentation is clear; never move wires without updating zone map. 7. Repair cable, connector, heater, or thermocouple based on the point where the fault appears/disappears. 8. Restore, heat soak, verify zone stability, and run a controlled startup. Functional test criteria: Correct zone heats and reads properly, no ground fault, zone map updated, and startup sequence completes without alarms. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: '6.3 Hot Runner Startup, Shutdown, and Zone Balancing'
        },
        {
          type: 'paragraph',
          text: 'Startup should bring thermal mass to equilibrium before injection. Large manifolds often require soak time so the steel and melt channel reach stable temperature. Sequential startup may heat manifolds before tips or use soft-start to reduce moisture-related heater failures. Zone balancing compares setpoint, actual response, output percentage, cavity fill balance, and thermal history. A high-output zone at temperature may indicate poor heater contact or excessive heat loss. A low-output zone with high temperature may indicate cross-wired thermocouple or heat transfer from neighboring zones.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Real-World Scenario - Cold drop misdiagnosed as bad heater'
        },
        {
          type: 'paragraph',
          text: 'A 64-cavity hot runner shows one cold drop alarm. The heater resistance at the controller is normal. The thermocouple reads ambient while the drop is hot. The issue is an open thermocouple wire in the mold cable, not a heater. Correct maintenance response: 1. Do not replace the heater because the zone says cold. 2. Check output percentage. If output is high but heater resistance is normal, verify sensor feedback. 3. Measure thermocouple at controller pins, cable, mold connector, and junction box. 4. Repair cable and retest polarity before heating.'
        }
      ]
    },
    {
      id: 'part-7-pneumatic-systems-theory-components-troubleshooting-a',
      title: 'Part 7 - Pneumatic Systems: Theory, Components, Troubleshooting, and Repair',
      blocks: [
        {
          type: 'heading',
          level: 3,
          text: '7.1 Pneumatic System Role in Injection Molding Cells'
        },
        {
          type: 'paragraph',
          text: 'Compressed air drives valve gates, sprue pickers, EOAT grippers, slides on some molds, part blowoff, conveyors, diverter gates, loader valves, and auxiliary actuators. Pneumatics are simple compared with hydraulics but highly sensitive to air quality, moisture, pressure drop, flow restriction, leaking fittings, stuck solenoids, and misadjusted flow controls. Maintenance must separate pressure from flow. A gauge may show 80 psi (552 kPa) static pressure while a cylinder stalls because a clogged fitting or undersized line cannot deliver flow. Air leaks waste energy and reduce the ability of valve gates and robots to respond on time. WARNING: Isolate and bleed compressed air before disconnecting pneumatic lines or servicing cylinders. A disconnected line can whip and a cylinder can move unexpectedly as trapped air escapes.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pneumatic Circuit Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: low pressure, cylinder slow, valve gate not actuating, gripper dropping part, solenoid not shifting. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'table',
          columns: [
            'Interval',
            'Maintenance activity',
            'Pass/fail criteria',
            'Documentation'
          ],
          rows: [
            [
              'Daily',
              'Drain bowls where manual, check regulator settings, listen for leaks',
              'No water accumulation, pressure stable',
              'Daily cell check.'
            ],
            [
              'Weekly',
              'Inspect tubing, fittings, mufflers, FRL bowls, lubricator if used',
              'No leaks/cracks, filter not clogged',
              'Pneumatic PM.'
            ],
            [
              'Monthly',
              'Check solenoid function, cylinder cushions, flow controls, vacuum level',
              'Stable actuation time',
              'PM report.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - FRL Filter Element Replacement and Regulator Check'
        },
        {
          type: 'paragraph',
          text: 'Scope: Press-side filter/regulator/lubricator service. Required tools and materials: LOTO/air isolation, correct filter element, bowl seals, pressure gauge, PPE. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Notify production of air isolation. Place equipment in safe state. 2. Isolate upstream air and bleed downstream pressure to zero. 3. Remove bowl and filter element; inspect for water, oil, resin dust, desiccant dust, or metal. 4. Install correct element and seals. Inspect bowl for cracks and chemical attack. 5. Restore air slowly and set regulator to machine/cell requirement. 6. Test affected pneumatic functions and check for leaks. Functional test criteria: No leaks, pressure recovers under actuation load, pneumatic devices cycle normally. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        }
      ]
    },
    {
      id: 'part-8-cooling-and-temperature-management-systems',
      title: 'Part 8 - Cooling and Temperature Management Systems',
      blocks: [
        {
          type: 'heading',
          level: 3,
          text: '8.1 Cooling as a Process and Maintenance System'
        },
        {
          type: 'paragraph',
          text: 'Cooling controls part dimensions, cycle time, crystallinity, warpage, shrinkage, ejection temperature, and mold life. Maintenance must understand cooling circuits as thermal and hydraulic systems. A mold can have correct supply temperature but poor flow through a plugged circuit. A chiller can be healthy while a dirty strainer starves one press. A thermolator can heat properly but cavitate because its pump inlet is restricted. The heat path is plastic melt to mold steel, mold steel to coolant, coolant to MTC/chiller/tower, and then to ambient or plant water. A fault at any point can appear as dimensional drift, sticking, cycle increase, sink, warp, or inconsistent cavity balance.'
        },
        {
          type: 'heading',
          level: 3,
          text: '8.2 Machine Cooling, Mold Cooling, Water Quality, Flow Meters, and Sensors'
        },
        {
          type: 'paragraph',
          text: 'Machine cooling circuits may serve hydraulic oil coolers, feed throats, servo drives, electrical cabinets, and barrel feed zones. Mold cooling circuits serve cavity/core steel, slides, lifters, inserts, and hot runner plates. Water quality controls scaling, corrosion, biological fouling, conductivity, and heat transfer. A thin layer of scale significantly reduces heat transfer and can force processors to adjust temperatures to compensate for a maintenance problem.'
        },
        {
          type: 'table',
          columns: [
            'Fault',
            'Process symptom',
            'Maintenance verification'
          ],
          rows: [
            [
              'Low mold flow',
              'Warp, sticking, long cycle, cavity imbalance',
              'Flow meter, pressure drop, circuit flush, strainer check.'
            ],
            [
              'Scale buildup',
              'Poor heat transfer, high return temp',
              'Delta-T comparison, borescope/flush discharge, water treatment log.'
            ],
            [
              'Bad MTC sensor',
              'Temperature drift or overshoot',
              'Compare PV to calibrated external probe.'
            ],
            [
              'Chiller capacity issue',
              'Multiple presses warm, high supply temp',
              'Chiller load, compressor status, condenser condition, flow.'
            ],
            [
              'Feed throat cooling loss',
              'Bridging, feed surging',
              'Temperature and flow check at throat.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cooling / Temperature Management Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: mold too hot, no flow alarm, dimensional drift, hydraulic oil overheating, chiller alarm. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        }
      ]
    },
    {
      id: 'part-9-auxiliary-equipment-theory-components-troubleshooting',
      title: 'Part 9 - Auxiliary Equipment: Theory, Components, Troubleshooting, Repair, and Integration',
      blocks: [
        {
          type: 'paragraph',
          text: 'Auxiliary equipment is core production infrastructure. A world-class maintenance technician treats every dryer, loader, blender, MTC, robot, granulator, chiller, and conveyor as part of the molding machine system. The goal is not simply to restart a device; the goal is to restore validated process conditions and protect part quality.'
        },
        {
          type: 'heading',
          level: 3,
          text: '9A - Mold Temperature Controllers: Water, Oil, Hot Runner Controllers, Multi- Zone Systems, IMM Integration, and Water Quality'
        },
        {
          type: 'paragraph',
          text: 'Mold temperature controllers, often called MTCs or thermolators, circulate controlled- temperature fluid through mold circuits. Water-based units are common for low-to-moderate temperatures. Oil-based units operate at higher temperatures but add fire, burn, leak, and fluid degradation hazards. Hot runner controllers are electrical temperature control systems for mold manifolds and drops. Complex cells may use multi-zone MTCs to control core, cavity, slides, inserts, and hot halves separately. The control loop includes a temperature sensor, controller, heater, cooling valve or heat exchanger, pump, flow path, and mold circuit. Temperature stability depends on fluid flow, pump performance, heater output, cooling valve control, sensor accuracy, circuit cleanliness, and mold connection discipline. A mold temperature fault can create dimensional drift, sticking, warp, sink, gloss variation, cycle time increase, and startup scrap. WARNING: Oil-based MTCs can operate above the boiling point of water and can cause severe burns or fire if leaking oil contacts ignition sources. Use thermal PPE, control leaks immediately, and follow OEM fire prevention requirements.'
        },
        {
          type: 'table',
          columns: [
            'Interval',
            'Maintenance activity',
            'Pass/fail criteria',
            'Documentation'
          ],
          rows: [
            [
              'Daily',
              'Check actual vs setpoint, leaks, flow indication, pump noise, hoses, quick connects',
              'Stable temp, no leaks, normal flow',
              'MTC daily log.'
            ],
            [
              'Weekly',
              'Clean strainers, inspect hoses, verify flow switch response, check water quality indicators',
              'No restriction, alarms functional',
              'MTC PM.'
            ],
            [
              'Monthly',
              'Compare controller PV to reference thermometer, inspect heater current, pump seal area',
              'Sensor within site tolerance',
              'Calibration/PM log.'
            ],
            [
              'Quarterly',
              'Flush circuits, inspect pump coupling/impeller where accessible, check cooling valve',
              'Flow restored, no cavitation',
              'Quarterly thermal PM.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Mold Temperature Controller Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: no heat, no flow, overtemperature, leaking, cavitation, unstable temperature. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - MTC Pump Seal Replacement'
        },
        {
          type: 'paragraph',
          text: 'Scope: Water-based or oil-based MTC pump seal replacement. Required tools and materials: LOTO kit, thermal PPE, drain pan, correct seal kit, pump manual, wrench set, alignment tools. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Shut down unit and isolate electrical power. Allow fluid to cool to a safe service temperature. 2. Close supply/return valves and relieve pressure. Drain fluid below pump level. 3. Tag wiring and piping. Remove pump/motor assembly as required by OEM. 4. Disassemble pump cleanly; inspect shaft sleeve, impeller, bearings, housing, and seal faces. 5. Install new seal without touching polished faces. Replace gaskets/O-rings. 6. Reassemble, align coupling if present, refill/vent circuit, and check rotation if motor was disconnected. 7. Run at low temperature first, check for leaks, then heat to operating setpoint and verify stability. Functional test criteria: No seal leak, no cavitation, stable flow, temperature reaches setpoint without abnormal noise. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Real-World Scenario - MTC no-flow alarm creates apparent mold issue'
        },
        {
          type: 'paragraph',
          text: 'A press develops parts sticking on the core side. The process technician raises mold temperature to compensate. Maintenance finds a partially plugged return strainer on the core MTC; actual flow through the core circuit is low even though supply temperature is correct. Correct maintenance response: 1. Verify actual flow and return temperature, not only controller setpoint. 2. Clean strainer and flush the mold circuit. 3. Return process settings to validated baseline after thermal stability returns. 4. Document water quality and circuit contamination for corrective action.'
        },
        {
          type: 'heading',
          level: 3,
          text: '9B - Drying Systems: Desiccant, Hot Air, Compressed Air, Vacuum, IR, and Central Systems'
        },
        {
          type: 'paragraph',
          text: 'Drying removes moisture from resin or keeps resin at a controlled moisture level before plasticizing. Hygroscopic resins absorb moisture into the pellet structure and require desiccant, vacuum, compressed-air, or IR drying depending on material. Non-hygroscopic resins mainly carry surface moisture and may use hot air drying or hopper heating. Poor drying causes splay, bubbles, streaks, hydrolysis, reduced molecular weight or IV in sensitive polymers, brittle parts, and deposits in the screw/hot runner. Drying is controlled by temperature, dew point, airflow, residence time, hopper size, material throughput, desiccant condition, filter condition, and regeneration. A dryer can show correct temperature and still fail because airflow is low or dew point is high. A hopper can be sized correctly but fail if the loader short-cycles material through it.'
        },
        {
          type: 'table',
          columns: [
            'Dryer type',
            '',
            'Best use',
            '',
            'Maintenance focus',
            ''
          ],
          rows: [
            [
              'Desiccant dryer',
              '',
              'Hygroscopic engineering resins',
              '',
              'Desiccant beds, regeneration valves, dew point, filters, heaters, blowers.',
              ''
            ],
            [
              'Hot air dryer',
              '',
              'Non-hygroscopic or surface moisture removal',
              '',
              'Blower, heater, filters, temperature distribution.',
              ''
            ],
            [
              'Compressed air dryer',
              '',
              'Small throughput / point-of- use dry air',
              '',
              'Cartridge/filter replacement, dew point, oil carryover.',
              ''
            ],
            [
              'Vacuum dryer',
              '',
              'Fast drying with lower oxidation risk',
              '',
              'Vacuum seals, chamber valves, vacuum pump, cycle timing.',
              ''
            ],
            [
              'Central dryer',
              '',
              'Multiple presses / plant system',
              '',
              'Tower sequencing, manifold balance, conveying air, dew point, controls.',
              ''
            ],
            [
              'IR dryer',
              '',
              'Rapid heating/drying, PET and specialty applications',
              '',
              'Emitter condition, belt/conveyor, sensor calibration.',
              ''
            ],
            [
              'Interval',
              'Maintenance activity',
              '',
              'Pass/fail criteria',
              '',
              'Documentation'
            ],
            [
              'Daily',
              'Check hopper temp, return temp, dew point, alarms, filter differential if available',
              '',
              'Values within resin spec',
              '',
              'Dryer daily log.'
            ],
            [
              'Weekly',
              'Clean filters, inspect hoses, check hopper seals and loader seals',
              '',
              'No leaks or restrictions',
              '',
              'Dryer PM.'
            ],
            [
              'Monthly',
              'Verify airflow, inspect regeneration heaters/valves, calibrate dew point sensor if due',
              '',
              'Airflow and dew point stable',
              '',
              'Dryer service record.'
            ],
            [
              'Annual or condition- based',
              'Replace/recondition desiccant, inspect blower, heater contactors/SSRs',
              '',
              'Dew point recovery meets spec',
              '',
              'Annual dryer PM.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Drying System Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: high dew point, low airflow, no heat, splay, bubbles, streaks, reduced IV. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Desiccant Dryer Filter and Dew Point Verification'
        },
        {
          type: 'paragraph',
          text: 'Scope: Routine service on desiccant dryer process and regeneration circuits. Required tools and materials: LOTO kit, filters, dew point reference if available, thermometer, PPE, cleaning tools. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Record current hopper temperature, return temperature, dew point, regeneration status, and alarms. 2. Apply LOTO before opening blower/filter compartments. 3. Replace or clean process and regeneration filters. Inspect for pellet dust, fines, oil, or desiccant dust. 4. Inspect hose clamps, hopper lid gasket, sight glass seals, and loader seals for air leaks. 5. Restore and allow stabilization. Verify dew point trend after regeneration cycle. 6. Compare to material drying requirement and document pass/fail. Functional test criteria: Dew point and airflow meet resin requirement, filters dated, no leaks, quality notified if suspect material was processed. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Real-World Scenario - Splay traced to dryer airflow'
        },
        {
          type: 'paragraph',
          text: 'A nylon job shows splay after lunch. Barrel temperatures and back pressure are unchanged. Dew point reads acceptable, but airflow is low due to a blinded return filter. Moisture removal is inadequate because dry air is not moving through the hopper bed. Correct maintenance response: 1. Verify resin type and drying requirement. 2. Check dew point and airflow together. 3. Inspect filters and hopper seals. 4. Purge affected material and document hold/quarantine recommendation if quality-critical.'
        },
        {
          type: 'heading',
          level: 3,
          text: '9C - Material Conveying Systems: Central and Beside-the-Press'
        },
        {
          type: 'paragraph',
          text: 'Material conveying systems move pellets from gaylords, silos, dryers, grinders, or blenders to the press hopper. Central systems use vacuum pumps or regenerative blowers, receivers, conveying lines, diverter valves, purge valves, filters, and controls. Beside-the-press loaders use smaller receivers and vacuum motors. Conveying faults cause no-material alarms, starvation, cross-contamination, dust, fines, poor blender accuracy, and apparent screw recovery issues. Velocity and material-to-air ratio matter. Too low a pickup velocity plugs the line; too high a velocity creates dust, angel hair, pellet damage, and line wear. Maintenance decisions such as line repairs, hose routing, filter changes, and receiver leaks directly affect conveying physics.'
        },
        {
          type: 'table',
          columns: [
            'Interval',
            'Maintenance activity',
            'Pass/fail criteria',
            'Documentation'
          ],
          rows: [
            [
              'Daily',
              'Check receiver fill, loader alarms, vacuum pump sound, material source labeling',
              'Correct material, no starvation',
              'Conveying log.'
            ],
            [
              'Weekly',
              'Clean receiver filters/socks, inspect flaps, seals, vacuum hoses',
              'No leaks, flap seals close',
              'Conveying PM.'
            ],
            [
              'Monthly',
              'Inspect diverter valves, line wear, vacuum pump filters/oil/vanes if applicable',
              'Valves position correctly',
              'Central system PM.'
            ],
            [
              'Quarterly',
              'Check line purge sequence, material cross-contamination controls, silo filters/dust collectors',
              'No carryover, dust controlled',
              'System audit.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Material Conveying Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: no material, slow conveying, line plug, receiver overfill, filter blinding, cross-contamination. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Vacuum Receiver Filter Sock Replacement'
        },
        {
          type: 'paragraph',
          text: 'Scope: Throat-mounted or floor-mounted receiver filter replacement. Required tools and materials: LOTO/air isolation, correct filter sock, PPE, vacuum, cleaning tools. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Stop loader sequence and isolate electrical/pneumatic energy as required. 2. Confirm material source and protect against contamination during opening. 3. Remove receiver cover and old filter; prevent fines from dropping into clean material stream. 4. Inspect gasket, level sensor, flap valve, and body for wear. 5. Install correct filter sock and verify seal. Clean sensor face if applicable. 6. Restore operation and observe a full convey cycle. Functional test criteria: Receiver fills within normal time, no dust leakage, level sensor responds, material identity maintained. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: '9D - Gravimetric and Volumetric Blending and Dosing Systems'
        },
        {
          type: 'paragraph',
          text: 'Blenders control resin, regrind, additives, and colorant ratios. Gravimetric blenders weigh each ingredient using load cells and dispense to target weights. Volumetric feeders meter by auger speed or time and depend on calibration. Liquid color systems use pumps and check valves to dose colorant. Blender faults cause color drift, part weight variation, mechanical property drift, contamination, and rejected lots. Integration with the IMM may be recipe-based, shot-weight- based, or communication-based. A blender must receive correct throughput assumptions and material bulk density. Maintenance must protect load cells from overload, keep slide gates and augers clean, maintain seals, verify calibration, and ensure recipes are not altered without process approval.'
        },
        {
          type: 'table',
          columns: [
            'Interval',
            'Maintenance activity',
            'Pass/fail criteria',
            'Documentation'
          ],
          rows: [
            [
              'Daily',
              'Check ingredient levels, alarms, color consistency, material labels',
              'Correct recipe/materials',
              'Blend log.'
            ],
            [
              'Weekly',
              'Clean hoppers, inspect slide gates/augers, check load cell area for binding',
              'No bridging, no stuck gates',
              'Blender PM.'
            ],
            [
              'Monthly',
              'Verify calibration, inspect motors/gearboxes, check communication',
              'Weights within tolerance',
              'Calibration record.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Blender / Doser Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: color inconsistency, weighing error, ingredient out, auger motor fault, recipe communication fault. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Gravimetric Blender Load Cell Calibration Check'
        },
        {
          type: 'paragraph',
          text: 'Scope: Calibration verification for weigh-bin gravimetric blender. Required tools and materials: Certified test weights, OEM calibration procedure, cleaning tools, LOTO if servicing actuators. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Clean weigh bin and ensure it moves freely without hose, wire, or pellet interference. 2. Record current recipe and calibration values before adjustment. 3. Use certified weights and OEM calibration mode. Do not lean on the frame during calibration. 4. Verify zero and span. Repeat to confirm stability. 5. Run a controlled batch and compare target vs actual ingredient weights. 6. Lock recipe access where required and document calibration result. Functional test criteria: Weight readings repeat within site tolerance, no mechanical binding, recipe protected, sample blend accepted. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: '9E - Granulators and Grinders: Beside-the-Press and Central'
        },
        {
          type: 'paragraph',
          text: 'Granulators reduce runners, sprues, and rejected parts into regrind. Rotor design, knife sharpness, knife clearance, screen size, feed rate, motor drive condition, and dust collection determine particle quality. Poor granulator maintenance creates excessive fines, contamination, heat, noise, jams, motor overloads, and poor regrind consistency. Regrind quality then affects drying, feeding, blending, melt quality, and part properties. WARNING: Granulator rotors are severe amputation hazards. Interlocks and anti- restart systems must be functional. Apply LOTO and verify zero motion before opening cutting chambers, removing screens, or servicing knives.'
        },
        {
          type: 'table',
          columns: [
            'Interval',
            'Maintenance activity',
            'Pass/fail criteria',
            'Documentation'
          ],
          rows: [
            [
              'Daily',
              'Check interlocks, abnormal noise, screen condition, bin cleanliness',
              'Interlocks stop machine, no contamination',
              'Granulator daily log.'
            ],
            [
              'Weekly',
              'Inspect knives, clearance, belts, bearings, dust collection',
              'Sharp knives, correct clearance',
              'Granulator PM.'
            ],
            [
              'Monthly',
              'Check motor current, thermal overloads, rotor wear, sound enclosure',
              'Stable load/noise',
              'Maintenance record.'
            ],
            [
              'Material change',
              'Clean chamber, screen, bin, conveying hose, and magnets',
              'No cross- contamination',
              'Changeover checklist.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Granulator Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: jam, overload, excessive fines, contamination, high noise, poor regrind quality. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Granulator Knife Clearance Adjustment'
        },
        {
          type: 'paragraph',
          text: 'Scope: Rotor/bed knife inspection and adjustment on granulator. Required tools and materials: LOTO kit, cut-resistant gloves, feeler gauges, torque tools, OEM clearance spec, knife handling fixture. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Apply LOTO and test anti-restart. Wait for rotor to stop completely. 2. Open chamber using OEM procedure. Support heavy screens or hoppers. 3. Clean chamber and inspect knives for chips, cracks, dull edges, and uneven wear. 4. Set clearance with feeler gauges per OEM spec across full knife length. 5. Torque knife bolts in required sequence. Use only approved fasteners. 6. Rotate rotor by hand using approved method to verify no contact. 7. Close guards, restore power, and test with a small controlled feed. Functional test criteria: No knife contact, normal motor current, acceptable particle size, all interlocks pass test. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: '9F - Robots and End-of-Arm Tooling: Cartesian, SCARA, 6-Axis, EOAT, Interfaces, Safety, Calibration'
        },
        {
          type: 'paragraph',
          text: 'Robots remove parts, place inserts, degate, inspect, stack, package, and interface with downstream equipment. Cartesian robots move in X/Y/Z axes and may use servo or pneumatic axes. Sprue pickers are simpler variants. SCARA and 6-axis robots are used where complex motion or secondary operations are required. EOAT includes vacuum cups, grippers, sensors, quick-change plates, vacuum generators, tubing, wiring, and mechanical frames. Robot maintenance must preserve repeatability and safety. Servo axes need ballscrew/linear guide lubrication, belt/coupling inspection, encoder health, home sensor verification, battery replacement, and cable carrier inspection. Pneumatic axes need cylinder seals, cushions, flow controls, and air quality. 6-axis robots add gearboxes, brakes, mastering, batteries, controller cooling, teach pendant condition, and safety-rated monitored zones. WARNING: Do not enter a robot cell based only on robot stopped status. Verify safety mode, drive power state, stored pneumatic/vacuum energy, IMM clamp state, and all cell-specific LOTO requirements.'
        },
        {
          type: 'table',
          columns: [
            'Interval',
            'Maintenance activity',
            'Pass/fail criteria',
            'Documentation'
          ],
          rows: [
            [
              'Daily',
              'Check EOAT cups/grippers, vacuum level, robot alarms, cable damage',
              'Parts held reliably, no alarms',
              'Robot daily log.'
            ],
            [
              'Weekly',
              'Inspect rails, belts, tubing, prox switches, quick- change locks',
              'No wear/leaks/loose hardware',
              'Robot PM.'
            ],
            [
              'Monthly',
              'Lubricate per OEM, back up programs, verify home and IMM handshake',
              'Positions repeat, backup current',
              'Automation PM.'
            ],
            [
              'Annual or OEM interval',
              'Replace batteries, inspect gear oil/grease, verify safety devices and mastering',
              'No battery alarms, safety validated',
              'Annual robot service record.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Robot / EOAT / IMM Interface Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: position error, overload, encoder fault, communication fault, EOAT vacuum fault, mold close not enabled. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - EOAT Vacuum Cup and Sensor Service'
        },
        {
          type: 'paragraph',
          text: 'Scope: Vacuum EOAT service for part removal. Required tools and materials: LOTO/robot safe mode, replacement cups, tubing, vacuum gauge, sensor tester, hand tools. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Place robot and IMM in safe maintenance mode; prevent clamp close and robot auto cycle. 2. Inspect cup wear, cuts, deformation, contamination, and mounting height. 3. Replace cups as a set where wear affects level contact. Check fittings and tubing for leaks. 4. Clean or replace vacuum filters/mufflers and inspect venturi or pump. 5. Verify vacuum sensor threshold with actual vacuum gauge and part present/absent states. 6. Jog slowly and verify EOAT clears mold, part, runner, and safety guarding. 7. Run dry cycle and first-piece cycle with technician outside hazard zone. Functional test criteria: Vacuum reaches threshold, sensor changes state correctly, robot path clear, IMM handshake works, no dropped parts. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Real-World Scenario - Mold close blocked by robot signal'
        },
        {
          type: 'paragraph',
          text: 'The press will not close after part removal. The clamp screen says robot not clear. Robot is physically out of the mold, but the enable-mold-closure signal is low because a cable carrier wire is broken intermittently. Correct maintenance response: 1. Confirm robot actual position and safety state. 2. Check IMM input for enable mold closure. 3. Check robot output and interface relay/contact. 4. Inspect EUROMAP/SPI connector, cable carrier, and strain relief. 5. Repair cable and validate both normal and safety handshake functions.'
        },
        {
          type: 'heading',
          level: 3,
          text: '9G - Chillers and Process Cooling Equipment'
        },
        {
          type: 'paragraph',
          text: 'A chiller removes heat from process water through the refrigeration cycle: compressor, condenser, expansion device, evaporator. Process water flows through the evaporator, loses heat to refrigerant, and returns to the plant/machine/mold system. Air-cooled chillers reject heat through condenser coils and fans; water-cooled chillers reject heat through condenser water and possibly cooling towers. Maintenance technicians commonly service the process water side, fans, strainers, pumps, sensors, and condenser cleaning. Certified refrigeration technicians service sealed refrigerant circuits. Chiller faults create high process water temperature, hydraulic oil overheating, mold temperature drift, long cycle time, dimensional instability, compressor trips, high discharge pressure, low suction pressure, flow alarms, or freeze faults. Always distinguish process water flow faults from refrigerant circuit faults. WARNING: Refrigerant circuit opening, recovery, charging, leak repair, and refrigerant handling require proper certification and equipment. Molding maintenance personnel should not vent refrigerant or bypass safety pressure controls.'
        },
        {
          type: 'table',
          columns: [
            'Interval',
            'Maintenance activity',
            'Pass/fail criteria',
            'Documentation'
          ],
          rows: [
            [
              'Daily',
              'Check supply/return temp, pressure, flow, alarms, condenser airflow',
              'Stable temp/flow, no alarms',
              'Chiller log.'
            ],
            [
              'Weekly',
              'Clean strainers, inspect pump seals, check fans/coils',
              'No restriction/leaks',
              'Cooling PM.'
            ],
            [
              'Monthly',
              'Clean air-cooled condenser coils, inspect water-cooled condenser strainers, trend compressor amps',
              'Heat rejection normal',
              'Chiller PM.'
            ],
            [
              'Seasonal',
              'Cooling tower basin/fill/drift eliminators, water treatment review',
              'Water treatment in range',
              'Tower service log.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Chiller / Process Cooling Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: insufficient cooling, high discharge pressure, low suction pressure, compressor fault, flow alarm, overtemperature. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Chiller Process Water Strainer Cleaning'
        },
        {
          type: 'paragraph',
          text: 'Scope: Cleaning process water strainer on chiller or distribution loop. Required tools and materials: LOTO/pump isolation, wrenches, brush, replacement gasket, bucket, PPE. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Notify affected presses if cooling interruption will occur. 2. Stop pump or isolate strainer using valves; relieve pressure. 3. Open strainer carefully and capture water. Remove basket/screen. 4. Inspect debris type: scale, rust, biological slime, gasket fragments, plastic pellets. 5. Clean and reinstall with good gasket. Open valves slowly and vent air if required. 6. Restart pump and verify pressure drop, flow, and temperature stability. Functional test criteria: No leak, normal differential pressure, flow restored, debris documented for water-quality action. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: '9H - Compressed Air Systems Maintained by the Molding Department'
        },
        {
          type: 'paragraph',
          text: 'Plant compressed air begins in the compressor room, but the molding department is often responsible for point-of-use filtration, regulation, distribution manifolds, hoses, quick disconnects, blowoff devices, valve gate air, robot EOAT air, pneumatic cylinders, and leak correction. Air quality affects solenoid life, cylinder seals, valve gate timing, vacuum generators, and part cleanliness. Relevant air quality concepts include particulate, water, oil aerosol, oil vapor, pressure dew point, and pressure stability. ISO 8573 cleanliness classes are used to specify compressed air quality; the exact class needed depends on application, resin/product cleanliness requirements, and OEM equipment needs.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Press-Side Compressed Air Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: low pressure, moisture, oil carryover, solenoid sticking, valve gate timing variation, robot grip faults. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: '9I - Conveyors, Part Handling, Vision, Degating, and Downstream Equipment'
        },
        {
          type: 'paragraph',
          text: 'Downstream equipment moves, cools, inspects, separates, trims, and packages parts. Belt conveyors require tracking, tension, rollers, bearings, drive motors, guards, and sensor mounts. Cooling conveyors add fans and fixtures. Vision systems require clean lenses, stable lighting, correct triggering, controlled mounting, and communication health. Degating and trimming equipment adds blades, dies, pneumatic/hydraulic actuators, guarding, and scrap management. A conveyor fault can damage parts or block robot discharge, causing press alarms. A loose vision light can increase false rejects. A dull degating blade can create burrs and scrap. Maintenance must understand these quality impacts and document when downstream faults may have affected product disposition.'
        },
        {
          type: 'table',
          columns: [
            'Interval',
            'Maintenance activity',
            'Pass/fail criteria',
            'Documentation'
          ],
          rows: [
            [
              'Daily',
              'Check belt tracking, jams, guards, sensors, reject bins',
              'No rubbing/jams, guards intact',
              'Cell daily check.'
            ],
            [
              'Weekly',
              'Inspect rollers, bearings, drive belts, fan operation, sensor brackets',
              'No looseness/noise',
              'Conveyor PM.'
            ],
            [
              'Monthly',
              'Verify vision lens/light cleanliness, degating blade condition, actuator timing',
              'Stable inspection/trim',
              'Downstream PM.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Downstream Equipment Diagnostic Decision Tree'
        },
        {
          type: 'paragraph',
          text: 'Use this logical tree before replacing components. The objective is to separate command, power, feedback, actuator/load, and mechanical process causes. 1. Confirm the complaint. Record the alarm text, machine state, cycle step, recipe, recent change, and whether the symptom is repeatable. Examples: belt tracking fault, robot place fault, vision communication fault, false rejects, degating jam. 2. Verify safety status. Check E-stop, safety gates, light curtains, robot interlock, guarding, and permissive conditions. If a safety channel is involved, follow the safety validation procedure and do not bypass the channel. 3. Check command. On the HMI or PLC I/O screen, confirm whether the control is requesting the motion, heat, pump, valve, drive enable, or output. 4. Check enabling conditions. Look for missing prox switches, pressure switches, temperature ready signals, low oil level, low air pressure, water flow faults, robot enable signals, or mold protection active conditions. 5. Check power. Verify control power, fuses, overloads, drive ready state, contactor status, SSR command, hydraulic pressure, air pressure, or cooling flow as appropriate. 6. Check feedback. Confirm the sensor, encoder, transducer, thermocouple, RTD, limit switch, flow switch, or pressure switch agrees with physical reality. 7. Check the actuator or load. Test the valve coil, motor, heater band, pump, cylinder, robot axis, or auxiliary device only after isolating the circuit and following PPE/LOTO requirements. 8. Check mechanical resistance and contamination. Binding, wear, misalignment, contamination, clogged filters, plugged lines, scaled circuits, and damaged tooling often mimic electrical or hydraulic faults. 9. Make one controlled change. Retest and document the before/after values. Do not stack multiple uncontrolled changes. 10. Escalate to OEM/service engineering when safety circuits, servo tuning, controller parameters, structural frame alignment, refrigerant circuits, or code-protected controls are involved.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Conveyor Belt Tracking Adjustment'
        },
        {
          type: 'paragraph',
          text: 'Scope: Belt conveyor tracking and tension correction. Required tools and materials: LOTO kit as required, hand tools, straightedge, OEM manual. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Stop conveyor and apply LOTO if guarding or nip points will be accessed. 2. Inspect belt for damage, debris, loaded product, and frame squareness. 3. Set baseline tension evenly; do not overtension to compensate for misalignment. 4. Jog conveyor at slow speed if safe and permitted, keeping hands clear of nip points. 5. Adjust tracking in small increments and allow belt to stabilize. 6. Verify sensors, guides, and transfer points do not push the belt off track. 7. Restore guards and run with product load. Functional test criteria: Belt tracks centered under load, no roller noise, no product damage, guards installed. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        }
      ]
    },
    {
      id: 'part-10-preventive-and-predictive-maintenance',
      title: 'Part 10 - Preventive and Predictive Maintenance',
      blocks: [
        {
          type: 'heading',
          level: 3,
          text: '10.1 PM Philosophy'
        },
        {
          type: 'paragraph',
          text: 'Preventive maintenance is not a calendar ritual; it is a risk-control system. A good PM program reduces unplanned downtime, protects validated process conditions, prevents safety failures, and captures deterioration before the machine forces a crisis. Poor PM programs generate paperwork while machines continue to fail. PM tasks must have failure modes, inspection criteria, acceptable limits, escalation triggers, and documented results. The right PM interval depends on duty cycle, material abrasiveness/corrosiveness, tonnage, environment, oil cleanliness, water quality, automation complexity, and history. A 24/7 high-cavitation medical closure press has a different risk profile from a low-duty prototype machine.'
        },
        {
          type: 'heading',
          level: 3,
          text: '10.2 IMM and Auxiliary PM Master Schedule'
        },
        {
          type: 'table',
          columns: [
            'Asset class',
            'Daily',
            'Weekly',
            'Monthly',
            'Annual'
          ],
          rows: [
            [
              'IMM clamp/injection',
              'Leaks, alarms, safety gates, lubrication indicators',
              'Hoses, heaters, sensors, guideways',
              'Trend pressures/curre nts/recovery/cu shion',
              'Oil analysis, clamp calibration, screw inspection.'
            ],
            [
              'Hydraulic system',
              'Oil temp/level/nois e',
              'Hose and filter visual',
              'Motor current, cooler, breathers',
              'Oil analysis, reservoir inspection.'
            ],
            [
              'Electrical/drives',
              'Alarms, cabinet cooling',
              'Fans/filters, loose external cables',
              'Thermal scan where authorized',
              'Backup parameters, inspect terminals during outage.'
            ],
            [
              'Hot runner',
              'Zone alarms, cable condition',
              'Connector inspection',
              'Resistance/ ground trends if scheduled',
              'Zone map audit, cable rebuild.'
            ],
            [
              'MTC/chiller',
              'Temp/flow/ leaks',
              'Strainers/hoses',
              'Sensor comparison',
              'Flush/ treatment/ capacity test.'
            ],
            [
              'Dryer',
              'Temp/dew point/airflow',
              'Filters/hoses',
              'Dew point calibration check',
              'Desiccant service/blower inspection.'
            ],
            [
              'Conveying/ blending',
              'Material supply/alarms',
              'Filters/flaps/ gates',
              'Calibration and valve inspection',
              'Line audit and contamination audit.'
            ],
            [
              'Robots/ automation',
              'EOAT/ vacuum/alarms',
              'Cables/rails/ tubing',
              'Lubrication/ backup',
              'Batteries/ mastering/ safety validation.'
            ],
            [
              'Granulators',
              'Noise/interlocks',
              'Knives/ screens/belts',
              'Motor current/clearan ce',
              'Rotor/bearing service.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: '10.3 Predictive Maintenance Technologies'
        },
        {
          type: 'paragraph',
          text: 'Predictive maintenance uses condition data to forecast failure before functional failure occurs. In injection molding, the highest-value PdM tools are vibration analysis for motors/pumps/gearboxes/granulators/chillers, thermal imaging for electrical panels/heaters/bearings, ultrasonic leak detection for compressed air and vacuum, oil analysis for hydraulic systems and gearboxes, motor circuit analysis for motor insulation and winding condition, drive trending for servo load/following error, and process curve trending for injection/clamp health.'
        },
        {
          type: 'table',
          columns: [
            'Technology',
            'Best target',
            'Useful indicator',
            'Escalation trigger'
          ],
          rows: [
            [
              'Vibration analysis',
              'Motors, pumps, gearboxes, granulators, chillers',
              'Bearing fault frequency, imbalance, misalignment',
              'Trend increase or alarm band.'
            ],
            [
              'Thermal imaging',
              'Electrical panels, heaters, bearings, motors',
              'Hot terminal, unbalanced phase, failing contactor',
              'Temperature anomaly vs similar load.'
            ],
            [
              'Ultrasonic',
              'Air leaks, vacuum leaks, bearings',
              'Leak intensity, bearing noise',
              'Energy waste or vacuum instability.'
            ],
            [
              'Oil analysis',
              'Hydraulic tanks, gearboxes',
              'Particle count, water, viscosity, TAN, metals',
              'Cleanliness/wear trend above limits.'
            ],
            [
              'Drive trending',
              'Servo axes and VFDs',
              'Current, torque, following error, temp',
              'Rising load at same motion profile.'
            ],
            [
              'Process curve trending',
              'Injection/clamp/ plasticizing',
              'Peak pressure, recovery, cushion, clamp force',
              'Drift from validated baseline.'
            ]
          ]
        }
      ]
    },
    {
      id: 'part-11-troubleshooting-methodology-and-master-diagnostic-de',
      title: 'Part 11 - Troubleshooting Methodology and Master Diagnostic Decision Trees',
      blocks: [
        {
          type: 'heading',
          level: 3,
          text: '11.1 Elite Troubleshooting Mindset'
        },
        {
          type: 'paragraph',
          text: 'Elite troubleshooting is disciplined evidence management. The goal is not to be fast at guessing; the goal is to be fast at eliminating wrong paths. The technician collects symptoms, identifies the system boundary, determines what changed, separates command/power/feedback/load, and proves the failure mode. A senior technician does not replace the easiest part first; a senior technician tests the most likely failure point with the least risk and highest diagnostic value. 1. Define the problem. What exactly fails, when, how often, under what job, and at what cycle step? 2. Stabilize safety and production risk. Decide whether the machine must be stopped, quarantined, or allowed to run under controlled monitoring. 3. Check recent change. Mold change, material lot, PM, wiring work, parameter change, crash, water work, dryer alarm, robot program, operator intervention. 4. Use the sequence. Identify which input, permissive, output, actuator, and feedback must occur next. 5. Measure under fault conditions. A good reading at idle may be meaningless under load. 6. Prefer non-invasive tests first. HMI data, trend screens, I/O indicators, external gauges, thermal images, and controlled jogs. 7. Use substitution carefully. Swapping parts can create two broken machines and erase evidence. 8. Verify repair. A repaired machine must pass functional test, safety test, and process- quality confirmation.'
        },
        {
          type: 'heading',
          level: 3,
          text: '11.2 Master Fault Categories'
        },
        {
          type: 'table',
          columns: [
            'Fault category',
            'First isolation question',
            'Typical evidence'
          ],
          rows: [
            [
              'No motion',
              'Is command present and permissives true?',
              'I/O status, safety chain, output voltage, hydraulic/air pressure.'
            ],
            [
              'Slow motion',
              'Is flow/current/velocity limited or is load high?',
              'Pressure/flow, servo current, binding, filters.'
            ],
            [
              'No heat',
              'Is output commanded and load intact?',
              'SSR/contactor state, heater resistance, fuses, voltage.'
            ],
            [
              'Runaway heat',
              'Is output stuck or sensor false low?',
              'SSR short, thermocouple location/polarity, controller output.'
            ],
            [
              'Pressure loss',
              'Is pump supply, valve control, or cylinder/load leaking?',
              'Gauge at pump and actuator, oil temp, valve command.'
            ],
            [
              'Position fault',
              'Is feedback wrong or movement actually wrong?',
              'Encoder/prox state, mechanical obstruction, drive following error.'
            ],
            [
              'Quality drift',
              'Did machine condition, material condition, thermal condition, or tooling condition change?',
              'Process trends, dryer/MTC/chiller/blender data.'
            ],
            [
              'Intermittent fault',
              'What changes with time, heat, vibration, motion, or cable flex?',
              'Trend, tap test if safe, cable carrier inspection, thermal scan.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: '11.3 Master Decision Tree - Press Stops Mid-Cycle'
        },
        {
          type: 'paragraph',
          text: '1. Record exact cycle step and alarm. Do not clear alarm before recording it. 2. Determine whether the stop was safety, sequence permissive, drive/hydraulic fault, auxiliary fault, or process fault. 3. If safety: verify E-stops, gates, light curtains, robot safety, safety relay/PLC diagnostics. Do not bypass. 4. If sequence permissive: identify missing input such as mold open, ejector back, core home, robot clear, carriage forward, air pressure, water flow, material ready. 5. If drive/hydraulic: record axis, command, feedback, load, pressure/current, and position. 6. If auxiliary: check dryer, loader, MTC, chiller, robot, conveyor, hot runner, blender communication or ready signal. 7. After repair, dry-cycle machine without mold risk if appropriate, then run controlled production validation.'
        },
        {
          type: 'heading',
          level: 3,
          text: '11.4 Data Acquisition and Process Curve Interpretation'
        },
        {
          type: 'paragraph',
          text: 'Process curves are maintenance instruments. Injection pressure, screw position, injection velocity, clamp force, hydraulic pressure, servo current, recovery time, cushion, transfer position, and melt/mold temperature trends can reveal developing faults. Maintenance should know the validated baseline for critical jobs. The best time to capture a baseline is when the machine is running good parts after a confirmed PM or repair.'
        },
        {
          type: 'table',
          columns: [
            'Trend change',
            'Possible maintenance causes',
            'Cross-check'
          ],
          rows: [
            [
              'Peak injection pressure rising',
              'Cold zone, plugged gate, dryer/material issue, check ring, vent restriction',
              'Heater output, hot runner zones, material moisture, short-shot balance.'
            ],
            [
              'Cushion decreasing',
              'Check ring leak, feed starvation, screw wear, decompression issue',
              'Part weight, recovery trend, hopper/feed throat.'
            ],
            [
              'Recovery time increasing',
              'Screw wear, feed issue, motor/drive load, back pressure change',
              'Servo current/hydraulic pressure, feed throat temp, material supply.'
            ],
            [
              'Clamp force drifting',
              'Hydraulic leak, toggle/mold height issue, sensor calibration',
              'Pressure/strain readings, oil temp, mold height.'
            ],
            [
              'Cycle stops at ejection',
              'Ejector sensor/cylinder/servo, robot not ready, part stuck',
              'I/O, actuator pressure/current, EOAT feedback.'
            ]
          ]
        }
      ]
    },
    {
      id: 'part-12-repair-procedures-and-standard-operating-procedures',
      title: 'Part 12 - Repair Procedures and Standard Operating Procedures',
      blocks: [
        {
          type: 'paragraph',
          text: 'This part consolidates generic SOP structures for major maintenance repairs. Each procedure must be adapted to the exact machine, OEM manual, plant LOTO procedure, and validated production process. Torque values, lubricants, seal orientations, calibration modes, and parameter values are OEM-specific unless explicitly listed by the manufacturer.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Hydraulic Pump Replacement'
        },
        {
          type: 'paragraph',
          text: 'Scope: IMM hydraulic pump or servo pump replacement. Required tools and materials: LOTO, lifting device, coupling tools, alignment tools, clean caps/plugs, oil sample kit, OEM pump, torque tools. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Record pump model, rotation, displacement, pressure rating, controller parameters if servo pump, and failure symptoms. 2. Apply LOTO and bleed hydraulic pressure. Drain only as much oil as required and protect reservoir from contamination. 3. Tag hoses, electrical connectors, and coupling position. Remove pump using proper lifting/support. 4. Inspect coupling, motor shaft, suction line, inlet strainer, oil condition, and failed pump debris. 5. Install replacement pump with correct rotation and alignment. Prime if required. 6. Flush/replace filters if contamination suspected. Restore oil level. 7. Start at low pressure if possible, check for leaks/noise, verify pressure and flow functions. 8. Trend temperature and filter indicator after return to service. Functional test criteria: No cavitation, no leaks, pressure/flow meet baseline, motor current normal, oil contamination plan documented. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Pressure Transducer Replacement'
        },
        {
          type: 'paragraph',
          text: 'Scope: Hydraulic or melt pressure transducer replacement where accessible to maintenance. Required tools and materials: LOTO, pressure bleed tools, correct transducer, connector tools, calibration procedure, PPE. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Verify transducer type, range, output signal, thread, seal, and calibration requirements. 2. Apply LOTO and relieve process/hydraulic pressure. For melt sensors, cool or control heat per OEM procedure. 3. Disconnect cable by connector; inspect cable pins and shielding. 4. Remove transducer without damaging port threads. Inspect port for debris or damage. 5. Install correct seal/torque per OEM. Do not overtighten sensor body. 6. Reconnect and perform zero/span or calibration procedure if required. 7. Verify HMI reading at zero and under controlled known pressure. Functional test criteria: Reading stable, no leak, calibration documented, alarm cleared. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Safety Gate Switch Replacement and Validation'
        },
        {
          type: 'paragraph',
          text: 'Scope: Replacement of guard/gate interlock switches on IMM or cell guarding. Required tools and materials: LOTO, approved switch, actuator/key, safety validation checklist, meter, OEM safety print. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Review safety circuit design and replacement part equivalency. Do not substitute non-safety-rated devices. 2. Apply LOTO and secure gate/guard mechanically. 3. Replace switch and actuator in correct alignment. Preserve tamper-resistant hardware where required. 4. Wire exactly to safety print; verify channel separation and connector pinout. 5. Perform safety validation: gate open stops hazardous motion, gate closed permits only when all conditions true, fault detection works as designed. 6. Document validation and have required responsible person sign off. Functional test criteria: Safety function passes site validation. No production release until validation is complete. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Thermocouple Replacement'
        },
        {
          type: 'paragraph',
          text: 'Scope: Barrel, nozzle, mold, MTC, or hot runner thermocouple replacement. Required tools and materials: LOTO, correct TC type J/K, meter, labels, heat PPE, anti-seize if approved. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Identify zone and thermocouple type. Verify polarity and connector style. 2. Apply LOTO to heater/control power as required and control hot surfaces. 3. Label wires and remove old thermocouple carefully. 4. Inspect well or mounting point for plastic, corrosion, looseness, or poor contact. 5. Install new thermocouple fully seated with strain relief and heat- resistant routing. 6. Verify continuity/polarity and compare PV to ambient before heating. 7. Heat zone and verify PV responds in correct direction. Functional test criteria: PV stable and accurate versus reference, no reversed polarity, zone controls properly. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Robot Battery Replacement'
        },
        {
          type: 'paragraph',
          text: 'Scope: Position memory battery replacement for robot or servo controller. Required tools and materials: OEM battery kit, PPE, backup procedure, robot manual. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Back up robot program and mastering data before battery replacement. 2. Review whether power must remain on during replacement; follow OEM exactly. 3. Place robot in safe mode and control cell access. 4. Replace battery within allowed time window and polarity. 5. Verify no mastering/encoder alarms. If mastering lost, stop and follow OEM mastering procedure. 6. Document date and next replacement interval. Functional test criteria: No battery alarms, robot positions valid, program backup confirmed. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'SOP - Cooling Circuit Flush'
        },
        {
          type: 'paragraph',
          text: 'Scope: Mold or machine cooling circuit cleaning/flushing. Required tools and materials: Flush cart, hoses, PPE, chemical approved by site, flow meter, waste container. WARNING: Apply the machine-specific LOTO procedure before beginning. Verify zero hazardous energy for the specific circuit being serviced. Use OEM procedures where they differ from this generic SOP. Procedure: 1. Identify circuit and material compatibility. Review SDS for cleaning chemical. 2. Isolate circuit and protect nearby electrical devices from water/chemical exposure. 3. Connect flush cart in correct direction; capture discharge and note debris type. 4. Flush until flow and discharge cleanliness meet site criteria. 5. Neutralize/rinse if chemical used. Reconnect with correct flow direction. 6. Verify flow, leaks, and temperature stability under production conditions. Functional test criteria: Flow restored, no leaks, chemical handled correctly, water quality issue documented. Documentation: Record asset ID, symptom, fault code, failed component, root cause, parts used, before/after readings, technician name, date/time, and any follow-up PM or engineering action.'
        }
      ]
    },
    {
      id: 'part-13-documentation-work-orders-and-maintenance-records',
      title: 'Part 13 - Documentation, Work Orders, and Maintenance Records',
      blocks: [
        {
          type: 'heading',
          level: 3,
          text: '13.1 Documentation Philosophy'
        },
        {
          type: 'paragraph',
          text: 'Documentation is the memory of the maintenance department. A repair that is not documented cannot be trended, audited, repeated, or improved. In regulated or high-consequence molding, documentation also supports product disposition and customer confidence. The work order must explain what failed, how it was proven, what was changed, what measurements were taken, and why the machine was safe and capable when returned to service.'
        },
        {
          type: 'heading',
          level: 3,
          text: '13.2 Work Order Anatomy'
        },
        {
          type: 'paragraph',
          text: 'Field Required content Asset ID Machine, mold, robot, auxiliary, controller, serial where useful. Symptom Operator complaint, alarm, cycle step, quality issue. Safety controls LOTO used, PPE, special hazards, validation required. Diagnostics Measurements, I/O states, pressure/voltage/temperature, trend data. Root cause Failed component and failure mode, not just replaced part. Corrective action Repair steps, parts, settings restored. Verification Functional test, safety test, process/quality confirmation. Follow-up PM change, engineering action, spare part need, training issue.'
        },
        {
          type: 'heading',
          level: 3,
          text: '13.3 Templates'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Daily IMM Inspection Checklist'
        },
        {
          type: 'list',
          items: [
            'No active hydraulic leaks',
            'Safety gates and E-stops checked per site procedure',
            'No abnormal pump/motor/servo noise',
            'Lubrication system level and alarms normal',
            'Barrel/nozzle/hot runner zone alarms absent',
            'Water/MTC/chiller flow normal',
            'Robot/EOAT clear and functional',
            'Housekeeping around mold area and electrical panels acceptable'
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Repair Work Order Template'
        },
        {
          type: 'paragraph',
          text: 'Asset ID: ________ Date/time: ________ Technician: ________ Shift: ________ Problem statement: __________________________________________________ Alarm/code/cycle step: ______________________________________________ LOTO/PPE used: ______________________________________________________ Diagnostics performed and readings: __________________________________ Root cause: _________________________________________________________ Corrective action: __________________________________________________ Parts used: _________________________________________________________ Functional test: ____________________________________________________ Safety validation required/completed: ________________________________ Quality/process release by: _________________________________________'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Spare Parts Criticality Matrix'
        },
        {
          type: 'table',
          columns: [
            'Criticality',
            'Definition',
            'Examples',
            'Stocking strategy'
          ],
          rows: [
            [
              'A - Critical',
              'Failure stops production or creates safety/regulatory risk',
              'Safety switches, servo drives, HPU filters, hot runner cables, robot batteries',
              'Stock on site or guaranteed rapid access.'
            ],
            [
              'B - Important',
              'Failure reduces capacity or causes extended downtime',
              'Pump seals, heaters, thermocouples, sensors, belts',
              'Stock based on usage and lead time.'
            ],
            [
              'C - Consumable',
              'Routine wear item',
              'Filters, cups, hoses, fittings, grease',
              'Kanban/min-max.'
            ],
            [
              'D - Noncritical',
              'Low downtime impact or generic availability',
              'Common hardware',
              'Standard storeroom.'
            ]
          ]
        }
      ]
    },
    {
      id: 'part-14-continuous-improvement-and-professional-development',
      title: 'Part 14 - Continuous Improvement and Professional Development',
      blocks: [
        {
          type: 'heading',
          level: 3,
          text: '14.1 Reliability-Centered Maintenance at Technician Level'
        },
        {
          type: 'paragraph',
          text: 'Reliability-centered maintenance, or RCM, asks what functions matter, how they fail, what happens when they fail, and what maintenance task can prevent or detect that failure economically. A technician applies RCM by challenging useless PM tasks, adding measurements to vague tasks, identifying repeat failures, and proposing design or process changes that eliminate chronic downtime. Example: replacing the same hot runner cable every six months is not reliability; identifying that the cable is unsupported at the mold junction box and adding strain relief is reliability. Cleaning an MTC strainer every Friday is PM; documenting debris type and fixing water treatment is continuous improvement.'
        },
        {
          type: 'heading',
          level: 3,
          text: '14.2 Maintenance Improvement Proposal Template'
        },
        {
          type: 'paragraph',
          text: 'Problem: What recurring failure, safety exposure, quality risk, or wasted labor exists? Evidence: Work order count, downtime hours, scrap impact, photos, measurements, trend data. Root cause: What physical, procedural, training, design, or spare-parts issue creates the problem? Proposed countermeasure: What exactly should be changed? Cost and resources: Parts, labor, downtime, contractor/OEM support. Expected ROI: Downtime avoided, scrap reduced, safety risk reduced, PM time reduced. Validation plan: How success will be measured after implementation.'
        },
        {
          type: 'heading',
          level: 3,
          text: '14.3 Professional Development Pathway'
        },
        {
          type: 'paragraph',
          text: 'A maintenance technician in injection molding should build competency in mechanical systems, industrial electricity, PLC/I/O troubleshooting, hydraulics, pneumatics, servo drives, plastics process fundamentals, safety systems, robot integration, auxiliary equipment, documentation, and root-cause analysis. The progression from helper to elite technician is not based only on years of service. It is based on verified capability: safe work, accurate diagnosis, quality-conscious repair, reliable documentation, and the ability to teach others.'
        },
        {
          type: 'table',
          columns: [
            'Skill tier',
            'Competency target',
            'Proof of capability'
          ],
          rows: [
            [
              'Foundational',
              'LOTO, basic tools, drawings, meters, PM tasks',
              'Completes supervised PMs and documents readings.'
            ],
            [
              'Intermediate',
              'Hydraulic/electrical diagnostics, auxiliary repair, hot runner basics',
              'Solves repeatable faults with evidence and safe practices.'
            ],
            [
              'Advanced',
              'Servo systems, safety validation, complex cells, predictive maintenance',
              'Leads critical repairs and improves PM strategy.'
            ],
            [
              'Elite',
              'Systems thinking, RCA, training, reliability engineering partnership',
              'Reduces repeat failures and mentors others.'
            ]
          ]
        }
      ]
    },
    {
      id: 'appendices',
      title: 'Appendices',
      blocks: [
        {
          type: 'heading',
          level: 3,
          text: 'Appendix A - Common Baseline Readings and Ranges'
        },
        {
          type: 'paragraph',
          text: 'These values are generic training ranges only. Always verify machine prints, OEM manuals, and facility standards.'
        },
        {
          type: 'table',
          columns: [
            'Item',
            'Generic range / expectation',
            'Diagnostic note'
          ],
          rows: [
            [
              '24 VDC control power',
              '22-26 VDC under load',
              'Low voltage under load suggests supply, fuse, short, or overload.'
            ],
            [
              '120 VAC controls',
              '110-125 VAC typical U.S. plant range',
              'Verify transformer taps and neutral.'
            ],
            [
              '480 VAC three-phase',
              'Balanced phase-to-phase within facility tolerance',
              'Imbalance damages motors/drives.'
            ],
            [
              'Heater resistance',
              'R = V^2 / W',
              'Compare to identical zones and nameplate wattage.'
            ],
            [
              'Thermocouple',
              'Continuity plus mV response to heat',
              'Do not apply external voltage to controller TC input.'
            ],
            [
              'Hydraulic oil temp',
              'OEM dependent, often controlled around 100-130 deg F (38-54 deg C)',
              'High temp accelerates oxidation and leakage.'
            ],
            [
              'Compressed air',
              'Application dependent, often 80-100 psi (552-689 kPa)',
              'Check dynamic pressure during actuation.'
            ],
            [
              'Chilled water delta-T',
              'Application dependent',
              'Too high may mean low flow; too low may mean low heat transfer or over-flow.'
            ]
          ]
        },
        {
          type: 'heading',
          level: 3,
          text: 'Appendix B - Failure Mode Coding'
        },
        {
          type: 'paragraph',
          text: 'Code Failure mode ELEC-OPEN Open circuit, broken wire, blown fuse, failed contact. ELEC-SHORT Short circuit, ground fault, insulation failure. HYD-LEAK-EXT External hydraulic leak. HYD-LEAK-INT Internal hydraulic bypass/leakage. MECH-WEAR Wear, backlash, looseness, scoring. MECH-BIND Binding, misalignment, obstruction. THERM-SENSOR Thermocouple/RTD/sensor fault. THERM-LOAD Heater, SSR, contactor, heat transfer fault. CTRL-PARAM Parameter, recipe, calibration, or setup error. AUX-READY Auxiliary ready signal or integration failure. SAFETY-VAL Safety device failed or validation required. CONTAM Contamination: oil, water, dust, resin, metal, biological, chemical.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Appendix C - Source and Standards Checklist for Site Implementation'
        },
        {
          type: 'list',
          items: [
            'Collect OEM manuals for every IMM model, robot, MTC, dryer, loader, blender, hot runner controller, chiller, granulator, and conveyor.',
            'Collect electrical, hydraulic, pneumatic, cooling, and safety schematics for each asset.',
            'Verify all current OSHA, NFPA, ANSI/PLASTICS, ANSI/RIA/A3, ISO, EUROMAP, EPA, state, local, insurer, and customer requirements with qualified safety/compliance personnel.',
            'Create machine-specific LOTO placards and validate them annually or after modification.',
            'Create machine-specific measurement baselines for voltage, pressure, current, temperatures, process curves, recovery time, clamp force, and auxiliary performance.',
            'Create training signoff sheets tied to supervised demonstrations, not reading alone.'
          ]
        }
      ]
    },
    {
      id: 'control-platform-reference-brand-agnostic-diagnostic-transfe',
      title: 'Control Platform Reference - Brand-Agnostic Diagnostic Transfer',
      blocks: [
        {
          type: 'paragraph',
          text: 'The following reference section consolidates common diagnostic actions for major control architectures. It is not a substitute for OEM password rules, licensed software, or authorized controls engineering support.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Siemens Sinumerik / Simatic S7 / S7-1500'
        },
        {
          type: 'paragraph',
          text: 'PROFINET/PROFIBUS diagnostics, module status LEDs, hardware diagnostics buffer, online I/O tables, drive object faults, safety program status where authorized. Universal diagnostic workflow: identify alarm, record state, check safety/permissive status, view I/O, compare command to feedback, inspect network node status, verify power supply, and back up parameters before replacement or firmware-level work. WARNING: Do not alter protected parameters, safety logic, drive tuning, or calibration values without authorization, backups, and a documented rollback plan.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Beckhoff TwinCAT / EtherCAT'
        },
        {
          type: 'paragraph',
          text: 'EtherCAT state machine, terminal diagnostics, distributed clocks, drive status words, TwinSAFE diagnostics, I/O mapping, ADS communication. Universal diagnostic workflow: identify alarm, record state, check safety/permissive status, view I/O, compare command to feedback, inspect network node status, verify power supply, and back up parameters before replacement or firmware-level work. WARNING: Do not alter protected parameters, safety logic, drive tuning, or calibration values without authorization, backups, and a documented rollback plan.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Bosch Rexroth IndraDrive / IndraMotion / Sytronix'
        },
        {
          type: 'paragraph',
          text: 'Drive diagnostic classes, Sercos/Ethernet bus status, motor feedback, hydraulic servo-pump command/feedback, parameter backups. Universal diagnostic workflow: identify alarm, record state, check safety/permissive status, view I/O, compare command to feedback, inspect network node status, verify power supply, and back up parameters before replacement or firmware-level work. WARNING: Do not alter protected parameters, safety logic, drive tuning, or calibration values without authorization, backups, and a documented rollback plan.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Fanuc CNC / Servo-Based Architectures'
        },
        {
          type: 'paragraph',
          text: 'Servo amplifier alarms, pulse coder/encoder faults, battery status, axis diagnostics, ladder/I/O screens, PMC status where authorized. Universal diagnostic workflow: identify alarm, record state, check safety/permissive status, view I/O, compare command to feedback, inspect network node status, verify power supply, and back up parameters before replacement or firmware-level work. WARNING: Do not alter protected parameters, safety logic, drive tuning, or calibration values without authorization, backups, and a documented rollback plan.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Engel CC300'
        },
        {
          type: 'paragraph',
          text: 'Sequence pages, alarm history, drive diagnostics, safety status, temperature/hot runner pages, service screens per authorization. Universal diagnostic workflow: identify alarm, record state, check safety/permissive status, view I/O, compare command to feedback, inspect network node status, verify power supply, and back up parameters before replacement or firmware-level work. WARNING: Do not alter protected parameters, safety logic, drive tuning, or calibration values without authorization, backups, and a documented rollback plan.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Arburg Selogica / Gestica'
        },
        {
          type: 'paragraph',
          text: 'Graphical sequence logic, alarm help, drive states, core/ejector permissives, parameter backup functions. Universal diagnostic workflow: identify alarm, record state, check safety/permissive status, view I/O, compare command to feedback, inspect network node status, verify power supply, and back up parameters before replacement or firmware-level work. WARNING: Do not alter protected parameters, safety logic, drive tuning, or calibration values without authorization, backups, and a documented rollback plan.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Husky Polaris'
        },
        {
          type: 'paragraph',
          text: 'High-cavitation molding cell diagnostics, hot runner/control integration, process trend and clamp/injection data views. Universal diagnostic workflow: identify alarm, record state, check safety/permissive status, view I/O, compare command to feedback, inspect network node status, verify power supply, and back up parameters before replacement or firmware-level work. WARNING: Do not alter protected parameters, safety logic, drive tuning, or calibration values without authorization, backups, and a documented rollback plan.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'KraussMaffei MC6 / MC5'
        },
        {
          type: 'paragraph',
          text: 'Axis diagnostics, hydraulic/electric status pages, alarm history, robot interface permissives, data backup. Universal diagnostic workflow: identify alarm, record state, check safety/permissive status, view I/O, compare command to feedback, inspect network node status, verify power supply, and back up parameters before replacement or firmware-level work. WARNING: Do not alter protected parameters, safety logic, drive tuning, or calibration values without authorization, backups, and a documented rollback plan.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Milacron Mosaic'
        },
        {
          type: 'paragraph',
          text: 'Alarm navigation, I/O diagnostics, temperature control screens, clamp/injection trend data. Universal diagnostic workflow: identify alarm, record state, check safety/permissive status, view I/O, compare command to feedback, inspect network node status, verify power supply, and back up parameters before replacement or firmware-level work. WARNING: Do not alter protected parameters, safety logic, drive tuning, or calibration values without authorization, backups, and a documented rollback plan.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Sumitomo/Demag NC5 / NC5plus'
        },
        {
          type: 'paragraph',
          text: 'Servo axis monitoring, clamp/injection sequence pages, robot interface diagnostics, alarm history. Universal diagnostic workflow: identify alarm, record state, check safety/permissive status, view I/O, compare command to feedback, inspect network node status, verify power supply, and back up parameters before replacement or firmware-level work. WARNING: Do not alter protected parameters, safety logic, drive tuning, or calibration values without authorization, backups, and a documented rollback plan.'
        },
        {
          type: 'heading',
          level: 3,
          text: 'Haitian / Zhafir Mars / Jupiter Controls'
        },
        {
          type: 'paragraph',
          text: 'Hybrid/electric drive status, hydraulic servo-pump alarms, I/O screens, temperature and sequence diagnostics. Universal diagnostic workflow: identify alarm, record state, check safety/permissive status, view I/O, compare command to feedback, inspect network node status, verify power supply, and back up parameters before replacement or firmware-level work. WARNING: Do not alter protected parameters, safety logic, drive tuning, or calibration values without authorization, backups, and a documented rollback plan.'
        }
      ]
    },
    {
      id: 'cross-system-fault-signature-matrix',
      title: 'Cross-System Fault Signature Matrix',
      blocks: [
        {
          type: 'table',
          columns: [
            'Observed symptom',
            'Possible IMM causes',
            'causes',
            'checks'
          ],
          rows: [
            [
              'Short shots',
              'Injection pressure limit, check ring leak, cold barrel/hot runner, blocked nozzle',
              'Dryer issue, loader starvation, blender ratio error, MTC too cold',
              'Process curve, cushion, hopper level, dryer dew point, hot runner zones.'
            ],
            [
              'Flash',
              'Low/uneven clamp force, platen/toggle wear, mold damage',
              'MTC/cooling causing dimensional mismatch',
              'Clamp force, mold parting line, tie-bar strain, cooling flow.'
            ],
            [
              'Splay/bubbles',
              'Degraded melt, excessive shear, barrel contamination',
              'Wet resin, dryer airflow/dew point failure',
              'Dryer logs, material moisture, barrel temps, residence time.'
            ],
            [
              'Warp',
              'Cooling imbalance, clamp alignment, ejection issue',
              'MTC/chiller flow, plugged mold circuit, robot handling distortion',
              'Mold flow delta-T, part temp, robot grip, cooling circuit flush.'
            ],
            [
              'Burns/black specks',
              'Dead spots, screw/barrel wear, hot runner overheat',
              'Dryer overheating, contaminated regrind/granulator',
              'Purge pattern, hot runner output, grinder cleanliness.'
            ],
            [
              'Cycle time increase',
              'Slow clamp/injection/reco very/ejector',
              'Robot delay, conveyor blockage, chiller/MTC temperature delay',
              'Cycle breakdown, robot timing, recovery trend, cooling temps.'
            ],
            [
              'Random press stop',
              'Safety gate, drive fault, hydraulic pressure',
              'Robot interface, loader no-material, MTC flow, chiller alarm',
              'Alarm history sorted by first fault, ready signal chain.'
            ]
          ]
        }
      ]
    },
    {
      id: 'final-training-standard',
      title: 'Final Training Standard',
      blocks: [
        {
          type: 'paragraph',
          text: 'A technician is considered competent in a system only after demonstrating safe isolation, component identification, schematic navigation, baseline measurement, fault isolation, repair planning, repair execution under supervision where required, functional test, safety validation, and documentation. Reading this manual creates knowledge. Competence is created by supervised practice, verified skill, disciplined measurement, and consistent documentation.'
        }
      ]
    }
  ]
};
