import { KnowledgeDoc, DefectGuide } from '@/types/models';

// ============================================
// Company Notes Type (versioned stub for each doc)
// ============================================
export interface CompanyNote {
  id: string;
  docId: string;
  content: string;
  editedBy: string;
  editedAt: string;
  version: number;
}

// ============================================
// Standard Knowledge Documents (not DefectGuides)
// ============================================
export const knowledgeDocs: KnowledgeDoc[] = [
  // ============================================
  // PROCESS GUIDES (4)
  // ============================================
  {
    id: 'DOC1',
    tenantId: 'T1',
    type: 'ProcessGuide',
    title: 'Scientific Molding Fundamentals',
    summary: 'Core principles of data-driven injection molding process setup and optimization.',
    body: `## Overview
Scientific molding is a systematic approach to injection molding that relies on data, physics, and material science rather than trial-and-error adjustments.

## Core Principles

### 1. Viscosity Curve Development
- Establish the relationship between injection speed and fill pressure
- Identify the optimal injection velocity for consistent fill behavior
- Document the viscosity curve for each material/mold combination

### 2. Cavity Balance Study
- Short-shot study to verify balanced filling across all cavities
- Identify and document any imbalances
- Adjust runner sizing or valve gate timing as needed

### 3. Gate Seal Study
- Determine minimum hold time for gate seal
- Weigh parts at incrementing hold times
- Gate seal occurs when part weight stabilizes

### 4. Cooling Time Optimization
- Minimize cooling while maintaining part quality
- Monitor part temperature at ejection
- Target consistent dimensional stability

## Setup Procedure

1. **Material Preparation**: Verify drying conditions and moisture content
2. **Mold Setup**: Install mold, verify water connections, check safety systems
3. **Initial Parameters**: Use material supplier recommendations
4. **Viscosity Curve**: Complete fill study at varying speeds
5. **Pack/Hold Setup**: Perform gate seal study
6. **Optimization**: Fine-tune for quality and cycle time

## Key Metrics to Track

| Parameter | Target Range | Tolerance |
|-----------|--------------|-----------|
| Fill Time | Per viscosity curve | ±0.05s |
| Peak Pressure | 60-80% capacity | ±200 psi |
| Cushion | 0.25-0.5 inch | ±0.05 inch |
| Cycle Time | Minimized | ±0.2s |

## Troubleshooting Indicators

- **Rising peak pressure**: Material viscosity change or wear
- **Inconsistent cushion**: Check ring wear or valve issues
- **Cycle time drift**: Hydraulic or accumulator issues`,
    tags: ['scientific-molding', 'process-setup', 'fundamentals', 'training'],
    level: 'Intermediate',
    relatedAssetIds: ['A1', 'A2', 'A6', 'A7'],
    relatedMaterialIds: [],
    createdBy: 'U6',
    createdAt: '2023-06-15T10:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC2',
    tenantId: 'T1',
    type: 'ProcessGuide',
    title: 'Cap & Closure Molding Best Practices',
    summary: 'Specialized techniques for high-quality pharmaceutical closure production.',
    body: `## Overview
Pharmaceutical closures require exceptional consistency, cleanliness, and dimensional control to ensure proper sealing and patient safety.

## Critical Quality Attributes

### Dimensional Control
- Wall thickness: Typically 0.50mm ± 0.02mm
- Inner diameter: Critical for seal integrity
- Thread pitch and depth: Must match bottle specs

### Surface Quality
- No sink marks in visible areas
- Parting line flash below 0.03mm
- No contamination or discoloration

## Process Window Development

### Fill Phase
- Use 95-98% pack transfer to prevent overpacking
- Maintain consistent fill time ±0.03s
- Monitor peak pressure for viscosity changes

### Pack/Hold Phase
- Hold pressure: 50-70% of peak pressure
- Gate seal typically 2-4 seconds
- Verify cushion consistency

### Cooling Phase
- Mold temperature: Material-specific (typically 40-60°C)
- Cooling time: Verify dimensional stability at ejection
- Water flow rate: Minimum 2 GPM per circuit

## Cleanroom Considerations

- HEPA filtration at press area
- Material handling protocols
- Gowning requirements
- Purge material disposal procedures

## Quality Sampling

| Frequency | Checks |
|-----------|--------|
| Every hour | Wall thickness (5 parts) |
| Every 2 hours | Dimensional layout (2 parts) |
| Every shift | Seal test (10 parts) |
| Each startup | First article inspection |`,
    tags: ['pharmaceutical', 'closures', 'caps', 'quality-control'],
    level: 'Advanced',
    relatedAssetIds: ['A1', 'A2', 'A3', 'A4'],
    relatedMaterialIds: ['M1', 'M2'],
    createdBy: 'U6',
    createdAt: '2023-08-20T14:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC3',
    tenantId: 'T2',
    type: 'ProcessGuide',
    title: 'Gas Assist Injection Molding Setup',
    summary: 'Complete setup and troubleshooting guide for gas-assisted injection molding.',
    body: `## Overview
Gas assist injection molding uses high-pressure nitrogen to core out thick sections, reducing sink marks, weight, and cycle time.

## Theory of Operation

1. Partial shot of plastic is injected (typically 70-90% volume)
2. Nitrogen gas is injected through special pin or nozzle
3. Gas follows path of least resistance (hottest/thickest sections)
4. Gas pressure packs out the part from the inside
5. Gas is vented before mold opens

## Equipment Requirements

### Gas System Components
- Nitrogen generator or tank supply
- Pressure intensifier (up to 5000 psi)
- Control unit with programmable profiles
- Gas injection pins or modified nozzle

### Mold Requirements
- Gas channels designed in thick sections
- Overflow wells for gas breakthrough
- Proper venting at gas exhaust locations

## Setup Procedure

1. **Determine shot size**: Start at 80% of full shot
2. **Set gas delay**: Usually 0.5-2.5 seconds after injection
3. **Set gas pressure**: Start at 150-200 bar, increase as needed
4. **Adjust gas hold time**: Match to cooling requirements
5. **Set vent time**: Ensure all gas escapes before mold opens

## Process Windows

| Parameter | Starting Point | Adjust For |
|-----------|----------------|------------|
| Shot size | 75-85% | Gas channel size |
| Gas delay | 1.5-2.0 sec | Skin thickness |
| Gas pressure | 200 bar | Sink marks |
| Gas time | Equal to cooling | Part quality |

## Common Issues

- **Fingering**: Gas pressure too high or shot too small
- **No gas penetration**: Delay too long, material too cold
- **Gas blowout at gate**: Shot size too small`,
    tags: ['gas-assist', 'thick-wall', 'advanced-process'],
    level: 'Advanced',
    relatedAssetIds: ['A8'],
    relatedMaterialIds: ['M4'],
    createdBy: 'U13',
    createdAt: '2023-07-10T09:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC4',
    tenantId: 'T1',
    type: 'ProcessGuide',
    title: 'Process Validation Protocol (IQ/OQ/PQ)',
    summary: 'Qualification protocol template for pharmaceutical-grade injection molding.',
    body: `## Overview
Process validation ensures that a manufacturing process consistently produces products meeting predetermined specifications and quality attributes.

## Validation Stages

### Installation Qualification (IQ)
- Verify equipment installed per specifications
- Document utility connections
- Confirm calibration of all instruments
- Archive equipment manuals and drawings

### Operational Qualification (OQ)
- Test all machine functions
- Establish parameter ranges
- Challenge alarm systems
- Document capability studies

### Performance Qualification (PQ)
- Produce 3 consecutive lots at validated settings
- Statistical analysis of quality data
- Demonstrate process reproducibility
- Final approval for production release

## Documentation Requirements

| Document | Purpose |
|----------|---------|
| Validation Master Plan | Overall strategy |
| Protocol | Specific test procedures |
| Executed Protocol | Completed tests with data |
| Deviation Reports | Any non-conformances |
| Final Report | Summary and approval |

## Acceptance Criteria

- Cpk ≥ 1.33 for critical dimensions
- No quality failures during PQ
- All equipment functions verified
- Training completed and documented`,
    tags: ['validation', 'pharmaceutical', 'regulatory', 'quality'],
    level: 'Advanced',
    relatedAssetIds: ['A1', 'A2'],
    relatedMaterialIds: ['M1', 'M2'],
    createdBy: 'U8',
    createdAt: '2023-05-05T11:00:00Z',
    status: 'Published',
  },

  // ============================================
  // MACHINE GUIDES (6)
  // ============================================
  {
    id: 'DOC5',
    tenantId: 'T1',
    type: 'MachineGuide',
    title: 'Engel Victory 500T Operating Manual',
    summary: 'Complete operating guide for the Engel Victory 500-ton all-electric press.',
    body: `## Equipment Overview

The Engel Victory 500T is a high-performance all-electric injection molding machine designed for precision applications in medical and pharmaceutical manufacturing.

### Key Specifications
| Specification | Value |
|--------------|-------|
| Clamping Force | 500 metric tons |
| Shot Capacity | 1200g PS |
| Screw Diameter | 70mm |
| Max Injection Speed | 200 mm/s |
| Platen Size | 1100 x 1100 mm |

## Common Failure Modes

### Servo Motor Faults
- **Symptoms**: E-stop activation, position errors
- **Causes**: Encoder issues, motor overheating
- **Resolution**: Check encoder cables, verify cooling

### Screw Drive Issues
- **Symptoms**: Inconsistent shot size, plasticizing variation
- **Causes**: Check ring wear, screw wear
- **Resolution**: Measure check ring, inspect screw flights

### Clamping Unit
- **Symptoms**: Platen alignment issues, mold damage
- **Causes**: Tie bar stress, toggle wear
- **Resolution**: Check tie bar stretch, inspect bushings

## Setup Considerations

1. **Leveling**: Verify machine is level within 0.05mm/m
2. **Utilities**: 480V 3-phase, compressed air at 100 psi
3. **Cooling**: 20 GPM @ 60°F water supply
4. **Foundation**: Minimum 12" reinforced concrete pad

## Operating Procedures

### Startup Sequence
1. Verify all safety guards are in place
2. Turn on main power and water
3. Start hydraulic/servo systems
4. Preheat barrel to operating temperature
5. Run purge cycles until material is clean

### Shutdown Sequence
1. Reduce barrel temperatures by 50°F
2. Purge barrel with cleaning compound
3. Close mold in low-pressure mode
4. Turn off heaters and water
5. Lock out main power

## Troubleshooting Quick Reference

| Alarm Code | Issue | First Action |
|------------|-------|--------------|
| E001 | Motor overload | Check for barrel obstructions |
| E012 | Position error | Verify encoder connection |
| E045 | Temperature fault | Check thermocouple |
| E078 | Hydraulic low | Check oil level and filters |

## Safety Notes

⚠️ **WARNING**: Never reach into mold area with guards open
⚠️ **CAUTION**: Allow 30 minutes cooling before maintenance
⚠️ **NOTICE**: Log all fault codes for maintenance review`,
    tags: ['engel', 'electric-press', 'medical-grade', 'equipment'],
    level: 'Intermediate',
    relatedAssetIds: ['A1'],
    relatedMaterialIds: [],
    createdBy: 'U3',
    createdAt: '2023-04-01T08:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC6',
    tenantId: 'T1',
    type: 'MachineGuide',
    title: 'Arburg Allrounder 320 Quick Start',
    summary: 'Fast reference guide for daily operation of the Arburg 320T hydraulic press.',
    body: `## Equipment Overview

The Arburg Allrounder 320 is a versatile hydraulic injection molding machine suitable for precision cleanroom applications.

### Key Specifications
| Specification | Value |
|--------------|-------|
| Clamping Force | 320 metric tons |
| Shot Capacity | 680g PS |
| Screw Diameter | 55mm |
| Max Injection Speed | 150 mm/s |

## Common Failure Modes

### Hydraulic System
- **Symptoms**: Slow response, pressure fluctuations
- **Causes**: Low oil, dirty filters, worn pump
- **Resolution**: Check oil level, replace filters quarterly

### Injection Unit
- **Symptoms**: Shot-to-shot variation, cushion drift
- **Causes**: Check ring wear, nozzle leakage
- **Resolution**: Inspect check ring at PM intervals

## Setup Considerations

- Hydraulic oil: ISO VG46 (change annually)
- Operating pressure: 2500 psi nominal
- Oil temperature: 45°C optimal

## Safety Notes

⚠️ **WARNING**: Hydraulic lines can retain pressure
⚠️ **CAUTION**: Oil temperature can exceed 60°C`,
    tags: ['arburg', 'hydraulic-press', 'cleanroom'],
    level: 'Beginner',
    relatedAssetIds: ['A2'],
    relatedMaterialIds: [],
    createdBy: 'U3',
    createdAt: '2023-04-15T10:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC7',
    tenantId: 'T2',
    type: 'MachineGuide',
    title: 'Haitian Jupiter 650T Setup Guide',
    summary: 'Comprehensive setup and operation guide for high-tonnage automotive molding.',
    body: `## Equipment Overview

The Haitian Jupiter III 650T is a two-platen servo-hydraulic machine designed for large automotive components.

### Key Specifications
| Specification | Value |
|--------------|-------|
| Clamping Force | 650 metric tons |
| Shot Capacity | 2800g PS |
| Screw Diameter | 90mm |
| Platen Size | 1450 x 1350 mm |

## Common Failure Modes

### Servo-Pump System
- **Symptoms**: Slow cycle, high energy consumption
- **Causes**: Pump wear, proportional valve issues
- **Resolution**: Check pump efficiency, calibrate valves

### Two-Platen Clamping
- **Symptoms**: Flash, mold crushing
- **Causes**: Tie bar nut wear, hydraulic leaks
- **Resolution**: Re-torque nuts, check seals

## Setup Considerations

1. Floor space: 7m x 4m minimum
2. Power: 630A @ 480V 3-phase
3. Crane capacity: 5 tons for mold changes

## Safety Notes

⚠️ **WARNING**: Two-platen machines have high closing speeds
⚠️ **CAUTION**: Use proper rigging for heavy mold handling`,
    tags: ['haitian', 'two-platen', 'automotive', 'high-tonnage'],
    level: 'Intermediate',
    relatedAssetIds: ['A6'],
    relatedMaterialIds: ['M4'],
    createdBy: 'U11',
    createdAt: '2023-05-20T09:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC8',
    tenantId: 'T2',
    type: 'MachineGuide',
    title: 'Milacron Roboshot S280 Precision Guide',
    summary: 'Technical guide for the all-electric precision molding machine.',
    body: `## Equipment Overview

The Milacron Roboshot S280 is an all-electric machine optimized for precision parts and glass-filled materials.

### Key Specifications
| Specification | Value |
|--------------|-------|
| Clamping Force | 280 metric tons |
| Shot Capacity | 425g PS |
| Screw Diameter | 50mm |
| Positional Accuracy | ±0.01mm |

## Common Failure Modes

### Electric Drive System
- **Symptoms**: Motor overload faults, position errors
- **Causes**: Screw binding, encoder drift
- **Resolution**: Check for material buildup, recalibrate

### Ball Screw Assemblies
- **Symptoms**: Backlash, positioning errors
- **Causes**: Wear, lubrication failure
- **Resolution**: Check preload, verify lubrication

## Special Considerations for Glass-Filled Materials

- Use hardened screw and barrel (Xaloy or equivalent)
- Reduce screw RPM to minimize fiber degradation
- Monitor motor current for binding conditions
- Regular screw pulls for inspection (monthly)

## Safety Notes

⚠️ **WARNING**: Electric drives maintain torque when powered
⚠️ **CAUTION**: Glass fibers require proper PPE during purging`,
    tags: ['milacron', 'electric-press', 'precision', 'glass-filled'],
    level: 'Advanced',
    relatedAssetIds: ['A7'],
    relatedMaterialIds: ['M5'],
    createdBy: 'U11',
    createdAt: '2023-06-01T11:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC9',
    tenantId: 'T1',
    type: 'MachineGuide',
    title: 'Hot Runner Controller Setup',
    summary: 'Configuration and troubleshooting for multi-zone hot runner systems.',
    body: `## Overview

Hot runner controllers maintain precise temperature control of the manifold and nozzles to ensure consistent material flow.

## Controller Configuration

### Zone Setup
1. Map each zone to physical thermocouple location
2. Set temperature setpoints per material requirements
3. Configure alarm thresholds (typically ±10°F)
4. Set startup sequence with preheat delays

### PID Tuning
- Auto-tune each zone on first startup
- Verify stable temperature within ±2°F
- Document PID values for each zone

## Common Failure Modes

### Thermocouple Issues
- **Symptoms**: Erratic readings, runaway temperature
- **Causes**: Broken wire, poor connection, age
- **Resolution**: Check connections, replace TC

### Heater Failures
- **Symptoms**: Zone won't reach temp, high current draw
- **Causes**: Heater burnout, short circuit
- **Resolution**: Measure heater resistance, replace if needed

## Setup Considerations

- Allow 30-minute soak time before running
- Monitor heater current during startup
- Verify all zones before automatic mode

## Safety Notes

⚠️ **WARNING**: Hot runner components exceed 400°F
⚠️ **CAUTION**: Always use insulated tools`,
    tags: ['hot-runner', 'temperature-control', 'mold-equipment'],
    level: 'Intermediate',
    relatedAssetIds: ['A3'],
    relatedMaterialIds: ['M1', 'M2'],
    createdBy: 'U5',
    createdAt: '2023-07-01T08:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC10',
    tenantId: 'T1',
    type: 'MachineGuide',
    title: 'Mold Installation & Removal Procedure',
    summary: 'Standard operating procedure for safe mold changes.',
    body: `## Pre-Change Preparation

1. Verify crane/hoist capacity for mold weight
2. Gather all required rigging equipment
3. Review mold specifications (water, air, electrical)
4. Ensure replacement mold is ready and inspected

## Removal Procedure

### Step 1: Prepare Machine
- Purge barrel with cleaning compound
- Reduce barrel temperature to standby
- Close mold at low pressure
- Disconnect water lines (drain if required)

### Step 2: Disconnect Utilities
- Disconnect all electrical connections
- Disconnect hydraulic lines (if applicable)
- Remove pneumatic connections
- Tag all connections for reinstallation

### Step 3: Remove Mold
- Attach lifting chains/straps to eyebolts
- Take up slack on crane/hoist
- Remove clamps in sequence (start from center)
- Lift mold straight up out of machine
- Move to storage/prep area

## Installation Procedure

### Step 1: Prepare Mold
- Clean mold faces and locating ring
- Verify ejector stroke and pattern
- Check all utilities match machine

### Step 2: Install Mold
- Center locating ring in fixed platen
- Lower mold onto mounting surfaces
- Install clamps starting from center
- Connect all utilities

### Step 3: Verify Installation
- Check platen parallel within 0.002"
- Verify water flow in all circuits
- Test ejector function
- Run mold at low pressure

## Safety Notes

⚠️ **WARNING**: Never work under suspended loads
⚠️ **CAUTION**: Lock out all energy sources before work`,
    tags: ['mold-setup', 'safety', 'procedure'],
    level: 'Beginner',
    relatedAssetIds: ['A1', 'A2', 'A3', 'A4', 'A6', 'A7', 'A8'],
    relatedMaterialIds: [],
    createdBy: 'U5',
    createdAt: '2023-03-15T09:00:00Z',
    status: 'Published',
  },

  // ============================================
  // MATERIAL GUIDES (6)
  // ============================================
  {
    id: 'DOC11',
    tenantId: 'T1',
    type: 'MaterialGuide',
    title: 'PP Homopolymer - Medical Grade Processing',
    summary: 'Complete processing guide for Purell HP570M medical-grade polypropylene.',
    body: `## Material Overview

Purell HP570M is a high-purity polypropylene homopolymer designed for pharmaceutical and medical packaging applications.

### Key Properties
| Property | Value | Unit |
|----------|-------|------|
| Melt Flow Index | 12 | g/10min |
| Density | 0.905 | g/cm³ |
| HDT @ 0.45 MPa | 100 | °C |
| Tensile Strength | 35 | MPa |

## Common Failure Modes

### Moisture Issues
- **Symptoms**: Splay, bubbles in parts
- **Causes**: Contaminated material, humid storage
- **Resolution**: Dry 2-4 hrs at 80°C, verify moisture <0.02%

### Degradation
- **Symptoms**: Yellow discoloration, brittle parts
- **Causes**: Excessive barrel temperature, long residence time
- **Resolution**: Reduce temps, minimize cycle time

## Processing Parameters

### Barrel Temperatures
| Zone | Temperature |
|------|-------------|
| Feed | 180-190°C |
| Compression | 200-220°C |
| Metering | 210-230°C |
| Nozzle | 220-240°C |

### Process Settings
- Mold temperature: 40-60°C
- Back pressure: 3-5 bar
- Screw speed: 50-150 RPM
- Hold pressure: 30-50% of injection

## Handling Notes

- Store in sealed containers
- Keep away from heat sources
- FIFO inventory management
- Maximum shelf life: 2 years

## Regulatory Compliance

- FDA 21 CFR 177.1520 compliant
- USP Class VI certification available
- Suitable for pharmaceutical contact`,
    tags: ['polypropylene', 'medical-grade', 'FDA-approved', 'pharmaceutical'],
    level: 'Intermediate',
    relatedAssetIds: ['A1', 'A2'],
    relatedMaterialIds: ['M1'],
    createdBy: 'U1',
    createdAt: '2023-05-10T10:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC12',
    tenantId: 'T1',
    type: 'MaterialGuide',
    title: 'HDPE Closure Grade Processing',
    summary: 'Processing parameters and guidelines for HD7255 closure-grade HDPE.',
    body: `## Material Overview

Braskem HD7255 is a high-density polyethylene designed for pharmaceutical and child-resistant closure applications.

### Key Properties
| Property | Value | Unit |
|----------|-------|------|
| Melt Flow Index | 8 | g/10min |
| Density | 0.952 | g/cm³ |
| ESCR (F50) | >1000 | hours |
| Tensile Yield | 27 | MPa |

## Common Failure Modes

### Warpage
- **Symptoms**: Caps not sealing properly, thread distortion
- **Causes**: Uneven cooling, improper pack pressure
- **Resolution**: Balance mold cooling, adjust hold pressure

### Stress Cracking
- **Symptoms**: Cracks near gates or threads
- **Causes**: Over-packing, contact with chemicals
- **Resolution**: Reduce hold pressure, verify compatibility

## Processing Parameters

### Barrel Temperatures
| Zone | Temperature |
|------|-------------|
| Feed | 170-180°C |
| Compression | 190-210°C |
| Metering | 200-220°C |
| Nozzle | 210-230°C |

### Process Settings
- Mold temperature: 20-40°C
- Back pressure: 2-5 bar
- Screw speed: 40-120 RPM

## Handling Notes

- No drying required under normal conditions
- If moisture detected, dry 1-2 hrs at 80°C
- Avoid prolonged exposure to UV light`,
    tags: ['HDPE', 'closure', 'child-resistant', 'pharmaceutical'],
    level: 'Intermediate',
    relatedAssetIds: ['A1', 'A2', 'A4'],
    relatedMaterialIds: ['M2'],
    createdBy: 'U1',
    createdAt: '2023-06-05T14:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC13',
    tenantId: 'T2',
    type: 'MaterialGuide',
    title: 'ABS Automotive Grade Processing',
    summary: 'Processing guide for SABIC Cycolac MG47 high-impact ABS.',
    body: `## Material Overview

SABIC Cycolac MG47 is an injection-molding grade ABS designed for automotive interior applications requiring high impact strength and good surface finish.

### Key Properties
| Property | Value | Unit |
|----------|-------|------|
| Melt Flow Index | 10 | g/10min |
| Notched Izod Impact | 320 | J/m |
| HDT @ 1.8 MPa | 96 | °C |
| Tensile Strength | 44 | MPa |

## Common Failure Modes

### Surface Defects
- **Symptoms**: Splay, silver streaks, poor gloss
- **Causes**: Moisture, high shear, barrel degradation
- **Resolution**: Verify drying, reduce injection speed

### Brittleness
- **Symptoms**: Parts cracking in use or during ejection
- **Causes**: Overdrying, excessive regrind, degradation
- **Resolution**: Check drying time, limit regrind to 25%

## Processing Parameters

### Drying Requirements
- Temperature: 80-85°C
- Time: 3-4 hours minimum
- Target moisture: <0.05%

### Barrel Temperatures
| Zone | Temperature |
|------|-------------|
| Feed | 200-210°C |
| Compression | 220-240°C |
| Metering | 230-250°C |
| Nozzle | 230-250°C |

### Process Settings
- Mold temperature: 50-70°C
- Back pressure: 3-7 bar
- Screw speed: 40-100 RPM

## Handling Notes

- Always dry before processing
- Do not exceed 4 hours drying at temperature
- Store in climate-controlled area`,
    tags: ['ABS', 'automotive', 'high-impact', 'interior'],
    level: 'Intermediate',
    relatedAssetIds: ['A6'],
    relatedMaterialIds: ['M4'],
    createdBy: 'U10',
    createdAt: '2023-07-15T11:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC14',
    tenantId: 'T2',
    type: 'MaterialGuide',
    title: 'Glass-Filled Nylon 6/6 Processing Guide',
    summary: 'Critical processing requirements for DuPont Zytel 70G33 glass-reinforced PA66.',
    body: `## Material Overview

DuPont Zytel 70G33 is a 33% glass-fiber reinforced polyamide 6/6 for structural automotive and industrial applications.

### Key Properties
| Property | Value | Unit |
|----------|-------|------|
| Glass Content | 33 | % |
| Tensile Strength | 195 | MPa |
| Flexural Modulus | 10,000 | MPa |
| HDT @ 1.8 MPa | 250 | °C |

## Common Failure Modes

### Fiber Breakage
- **Symptoms**: Low strength, visible fiber pullout
- **Causes**: High screw speed, sharp transitions
- **Resolution**: Reduce RPM, optimize runner design

### Moisture Degradation
- **Symptoms**: Splay, bubbles, poor properties
- **Causes**: Inadequate drying, hygroscopic nature
- **Resolution**: CRITICAL: Dry 4+ hrs at 90°C

### Screw/Barrel Wear
- **Symptoms**: Shot variation, motor overload
- **Causes**: Glass fiber abrasion
- **Resolution**: Use hardened components, schedule regular inspection

## Processing Parameters

### Drying Requirements ⚠️ CRITICAL
- Temperature: 85-90°C
- Time: 4-6 hours minimum
- Target moisture: <0.02%
- Desiccant dryer required

### Barrel Temperatures
| Zone | Temperature |
|------|-------------|
| Feed | 270-280°C |
| Compression | 280-290°C |
| Metering | 285-295°C |
| Nozzle | 285-295°C |

### Process Settings
- Mold temperature: 80-100°C
- Back pressure: 5-10 bar
- Screw speed: 30-60 RPM (REDUCED for fiber integrity)

## Equipment Requirements

- Hardened barrel and screw (Xaloy, D-2, or equivalent)
- Hardened check ring with abrasion-resistant coating
- High-temperature capable hot runner (if used)

## Safety Notes

⚠️ **CAUTION**: Glass fibers can cause skin irritation
⚠️ **CAUTION**: Wear eye protection during purging
⚠️ **CAUTION**: Material dust is an inhalation hazard`,
    tags: ['glass-filled', 'nylon', 'PA66', 'structural', 'automotive'],
    level: 'Advanced',
    relatedAssetIds: ['A7'],
    relatedMaterialIds: ['M5'],
    createdBy: 'U10',
    createdAt: '2023-08-01T09:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC15',
    tenantId: 'T1',
    type: 'MaterialGuide',
    title: 'Masterbatch Handling & Letdown Guide',
    summary: 'Best practices for color masterbatch storage, handling, and letdown calculations.',
    body: `## Overview

Color masterbatch concentrates require proper handling to ensure consistent coloration across production lots.

## Storage Requirements

- Temperature: 60-80°F (15-27°C)
- Humidity: <50% RH preferred
- Away from direct sunlight
- Sealed containers

## Letdown Ratio Calculation

### Standard Formula
\`\`\`
Letdown % = (Masterbatch weight / Total material weight) × 100
\`\`\`

### Typical Ranges
- Standard colors: 2-4%
- High-opacity colors: 3-5%
- Special effects: Per supplier recommendation

## Common Failure Modes

### Color Variation
- **Symptoms**: Shade differences between lots
- **Causes**: Inconsistent letdown, lot variation
- **Resolution**: Verify feeder calibration, test new lots

### Poor Dispersion
- **Symptoms**: Streaking, color spots
- **Causes**: Insufficient mixing, incompatible carrier
- **Resolution**: Increase back pressure, verify carrier compatibility

## Quality Control

| Test | Frequency | Target |
|------|-----------|--------|
| Color match | Each lot | Delta E < 1.0 |
| Dispersion | Each setup | No visible streaks |
| Impact | Weekly | Per material spec |

## Safety Notes

⚠️ **CAUTION**: Some pigments may stain skin
⚠️ **NOTICE**: Retain samples from each lot for traceability`,
    tags: ['masterbatch', 'color', 'additive', 'quality-control'],
    level: 'Beginner',
    relatedAssetIds: [],
    relatedMaterialIds: ['M3'],
    createdBy: 'U1',
    createdAt: '2023-04-20T13:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC16',
    tenantId: 'T2',
    type: 'MaterialGuide',
    title: 'Regrind Management Best Practices',
    summary: 'Guidelines for incorporating regrind material while maintaining quality.',
    body: `## Overview

Proper regrind management reduces material costs while maintaining consistent part quality.

## Regrind Quality Requirements

### Visual Inspection
- No contamination or foreign material
- Consistent pellet size (no fines or large chunks)
- No discoloration or degradation

### Testing Requirements
- MFI verification quarterly
- Mechanical properties spot-check
- Color comparison to virgin

## Recommended Blend Ratios

| Material Type | Max Regrind | Notes |
|--------------|-------------|-------|
| Unfilled resins | 25-30% | Higher for non-critical parts |
| Glass-filled | 15-20% | Fiber length reduction |
| Impact-modified | 20% | Impact property loss |
| Medical/Pharma | 0% | Not permitted |

## Common Issues

### Property Degradation
- **Symptoms**: Reduced impact, discoloration
- **Causes**: Multiple heat histories, contamination
- **Resolution**: Limit regrind percentage, improve segregation

### Processing Variation
- **Symptoms**: Inconsistent flow, short shots
- **Causes**: Variable pellet size, mixed materials
- **Resolution**: Granulator maintenance, material separation

## Best Practices

1. Segregate regrind by material and color
2. Label all containers with material, date, and source
3. First-in-first-out usage
4. Regular granulator blade maintenance
5. Screen out fines if >10% present`,
    tags: ['regrind', 'recycling', 'cost-reduction', 'sustainability'],
    level: 'Beginner',
    relatedAssetIds: [],
    relatedMaterialIds: ['M4', 'M5'],
    createdBy: 'U10',
    createdAt: '2023-09-01T10:00:00Z',
    status: 'Published',
  },

  // ============================================
  // AUXILIARY GUIDES (4)
  // ============================================
  {
    id: 'DOC17',
    tenantId: 'T1',
    type: 'AuxGuide',
    title: 'Desiccant Dryer Operation & Troubleshooting',
    summary: 'Complete guide to desiccant dryer setup, operation, and maintenance.',
    body: `## Equipment Overview

Desiccant dryers use molecular sieve desiccant beds to remove moisture from hygroscopic plastic materials.

### Operating Principle
1. Wet air from hopper passes through active desiccant bed
2. Moisture is adsorbed by desiccant material
3. Regeneration cycle heats second bed to release moisture
4. Beds alternate between drying and regeneration

## Common Failure Modes

### Incomplete Regeneration
- **Symptoms**: Dew point won't reach setpoint
- **Causes**: Faulty heating element, stuck valves
- **Resolution**: Check heater resistance, clean/replace valves

### Desiccant Degradation
- **Symptoms**: Gradual dew point increase over time
- **Causes**: Age, contamination, thermal cycling
- **Resolution**: Replace desiccant (typically 3-5 year life)

### Air Leaks
- **Symptoms**: Low airflow, poor drying
- **Causes**: Worn seals, loose fittings
- **Resolution**: Pressure test system, replace seals

## Setup Parameters

### Standard Settings
| Parameter | Typical Value |
|-----------|--------------|
| Process air temp | Material-specific |
| Regeneration temp | 350-450°F |
| Dew point target | -40°F |
| Airflow | 1 CFM per lb/hr throughput |

## Troubleshooting

| Symptom | Likely Cause | Action |
|---------|--------------|--------|
| High dew point | Desiccant worn | Replace desiccant |
| Low airflow | Filter clogged | Clean/replace filters |
| No regeneration | Heater fault | Check element and controls |
| Cycling error | Valve stuck | Clean or replace valves |

## Maintenance Schedule

| Frequency | Task |
|-----------|------|
| Daily | Check dew point reading |
| Weekly | Inspect filters |
| Monthly | Clean inlet filters |
| Quarterly | Check regeneration temps |
| Annually | Full system inspection |

## Safety Notes

⚠️ **WARNING**: Regeneration heaters exceed 400°F
⚠️ **CAUTION**: Allow cooling before maintenance`,
    tags: ['dryer', 'desiccant', 'material-handling', 'auxiliary'],
    level: 'Intermediate',
    relatedAssetIds: ['A5'],
    relatedMaterialIds: ['M1', 'M2', 'M5'],
    createdBy: 'U3',
    createdAt: '2023-06-10T08:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC18',
    tenantId: 'T1',
    type: 'AuxGuide',
    title: 'Mold Temperature Controller Setup',
    summary: 'Guide to water and oil temperature control units for mold temperature management.',
    body: `## Overview

Temperature control units (TCUs) maintain consistent mold temperatures for dimensional stability and surface quality.

### Types of TCUs
- **Water units**: Up to 250°F (standard applications)
- **Pressurized water**: Up to 350°F (higher temp needs)
- **Oil units**: Up to 600°F (high-temp materials)

## Common Failure Modes

### Poor Temperature Control
- **Symptoms**: Temperature swings, parts quality variation
- **Causes**: Pump wear, thermostat issues, scale buildup
- **Resolution**: Check pump, calibrate controller, descale

### Flow Restrictions
- **Symptoms**: Uneven mold temperature, hot spots
- **Causes**: Scale, debris, crushed hoses
- **Resolution**: Flush circuits, check hose routing

## Setup Considerations

### Water Quality
- Use treated/deionized water
- pH should be 7.0-8.5
- Check corrosion inhibitor levels monthly

### Flow Rates
- Minimum: 2 GPM per circuit
- Target: Turbulent flow (Reynolds >4000)
- Verify flow with ball-type indicators

## Safety Notes

⚠️ **WARNING**: Pressurized water can cause severe burns
⚠️ **CAUTION**: Ensure hoses rated for operating pressure`,
    tags: ['temperature-control', 'TCU', 'mold-cooling', 'auxiliary'],
    level: 'Beginner',
    relatedAssetIds: ['A3', 'A4', 'A8'],
    relatedMaterialIds: [],
    createdBy: 'U5',
    createdAt: '2023-05-25T11:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC19',
    tenantId: 'T2',
    type: 'AuxGuide',
    title: 'Granulator Operation & Safety',
    summary: 'Safe operation procedures for beside-the-press granulators.',
    body: `## Equipment Overview

Granulators reduce sprues, runners, and rejected parts into regrind material for reprocessing.

## Safety Systems

### Required Safety Features
- Interlocked feed hopper
- Throat guard or metal detector
- Emergency stop accessible from all sides
- Lockout/tagout capability

### Pre-Operation Checks
1. Verify all guards are in place
2. Check rotor knife condition
3. Inspect screen for damage
4. Clear feed throat of foreign objects

## Common Failure Modes

### Blade Wear
- **Symptoms**: Poor cut quality, fines generation
- **Causes**: Normal wear, glass-filled materials
- **Resolution**: Rotate/sharpen blades, replace if needed

### Motor Overload
- **Symptoms**: Frequent trips, slow grinding
- **Causes**: Dull blades, screen blockage, overfeeding
- **Resolution**: Check blades, clear screen, reduce feed rate

## Maintenance Schedule

| Frequency | Task |
|-----------|------|
| Each shift | Visual inspection |
| Weekly | Clean screens |
| Monthly | Check blade gap |
| Quarterly | Sharpen/rotate blades |
| Annually | Motor inspection |

## Safety Notes

⚠️ **DANGER**: Rotating blades cause severe injury
⚠️ **WARNING**: Always lock out before any maintenance
⚠️ **CAUTION**: Wear hearing protection during operation`,
    tags: ['granulator', 'regrind', 'auxiliary', 'safety'],
    level: 'Beginner',
    relatedAssetIds: [],
    relatedMaterialIds: ['M4', 'M5'],
    createdBy: 'U10',
    createdAt: '2023-08-15T09:00:00Z',
    status: 'Published',
  },
  {
    id: 'DOC20',
    tenantId: 'T2',
    type: 'AuxGuide',
    title: 'Robot End-of-Arm Tooling Guide',
    summary: 'Design and setup guidelines for EOAT in injection molding applications.',
    body: `## Overview

End-of-arm tooling (EOAT) interfaces between the robot and the molded parts for consistent part removal and placement.

## Tooling Types

### Vacuum Cups
- Best for flat surfaces
- Quick release capability
- Material-specific cup selection

### Mechanical Grippers
- For complex geometries
- Higher gripping force
- Require more maintenance

### Combination Tools
- Multiple parts per cycle
- Sprue gripping + part handling
- More complex setup

## Common Failure Modes

### Vacuum Leaks
- **Symptoms**: Dropped parts, slow cycle
- **Causes**: Worn cups, damaged lines
- **Resolution**: Replace cups, check connections

### Alignment Issues
- **Symptoms**: Part damage, robot faults
- **Causes**: Tool plate shifted, arm collision
- **Resolution**: Recalibrate positions, check mounting

## Design Guidelines

1. Keep weight minimal (affects cycle time)
2. Provide clear sensor mounting
3. Include quick-change capability
4. Design for part cooling during transfer

## Safety Notes

⚠️ **WARNING**: Robot moves at high speed
⚠️ **CAUTION**: Verify teach pendant in manual mode during setup`,
    tags: ['robot', 'EOAT', 'automation', 'auxiliary'],
    level: 'Intermediate',
    relatedAssetIds: ['A6', 'A7'],
    relatedMaterialIds: [],
    createdBy: 'U11',
    createdAt: '2023-09-10T14:00:00Z',
    status: 'Published',
  },

  // ============================================
  // COMMITTED FIX RECORDS AS DOCS (2)
  // ============================================
  {
    id: 'DOC-FIX1',
    tenantId: 'T1',
    type: 'ProcessGuide',
    title: 'Fix: Dryer Regeneration Cycle Failure',
    summary: 'Verified fix procedure for desiccant dryer regeneration solenoid valve failure.',
    body: `## Problem Summary
Desiccant dryer unit #1 not completing regeneration cycle, causing material moisture levels to exceed specification.

## Root Cause
Faulty solenoid valve in the regeneration circuit was intermittently sticking closed, preventing proper airflow during the regeneration phase.

## Fix Procedure

### Step 1
Isolate dryer from production line and ensure proper lockout/tagout

### Step 2
Remove access panel to regeneration valve assembly

### Step 3
Test solenoid valve with multimeter - check for 24VDC signal

### Step 4
Replace faulty solenoid valve (Part #DRY-SOL-24V-A)

### Step 5
Reassemble and run 3 complete regeneration cycles

### Step 6
Verify moisture levels are within 0.02% specification

## Verification Checklist
- ✅ Regeneration cycle completes within 4 hours
- ✅ Dew point reaches -40°F during drying phase
- ✅ Material moisture content below 0.02%
- ✅ No fault codes on controller display

## Origin
This fix was captured from Issue ISS4 and verified by supervisor U6.

---
*This document was auto-generated from verified Fix Record FIX1*`,
    tags: ['dryer', 'maintenance', 'verified-fix', 'tribal-knowledge'],
    level: 'Intermediate',
    relatedAssetIds: ['A5'],
    relatedMaterialIds: ['M1', 'M2'],
    createdBy: 'U3',
    createdAt: '2024-01-19T16:30:00Z',
    status: 'Published',
  },
  {
    id: 'DOC-FIX7',
    tenantId: 'T2',
    type: 'ProcessGuide',
    title: 'Fix: Glass-Filled Nylon Screw Purge Procedure',
    summary: 'Verified preventive purging procedure to prevent motor overload on glass-filled material runs.',
    body: `## Problem Summary
Material buildup in screw flights causing periodic overload faults on extruder motor.

## Root Cause
Glass fibers accumulating in dead spots of screw flights over extended production runs, creating binding condition.

## Fix Procedure

### Step 1
Run high-viscosity purge compound at end of each shift

### Step 2
Increase barrel temperature by 20°F during purge

### Step 3
Run purge until compound comes out clean (typically 10 lbs)

### Step 4
Document purge completion in shift log

## Verification Checklist
- ✅ No motor overload faults for 30 days
- ✅ Purge log maintained by all shifts
- ✅ Screw inspection shows no buildup at PM intervals

## Origin
This fix was verified by supervisor U13 after 2 weeks of successful implementation.

---
*This document was auto-generated from verified Fix Record FIX7*`,
    tags: ['glass-filled', 'purging', 'preventive', 'verified-fix', 'tribal-knowledge'],
    level: 'Intermediate',
    relatedAssetIds: ['A7'],
    relatedMaterialIds: ['M5'],
    createdBy: 'U11',
    createdAt: '2024-01-20T12:00:00Z',
    status: 'Published',
  },
];

// ============================================
// DEFECT GUIDES (12)
// ============================================
export const defectGuides: DefectGuide[] = [
  {
    id: 'DEF1',
    tenantId: 'T1',
    type: 'DefectGuide',
    title: 'Short Shot (Incomplete Fill)',
    summary: 'Parts not completely filled, typically at the farthest points from the gate.',
    body: 'Short shots occur when the mold cavity does not fill completely before the material freezes. This is one of the most common injection molding defects and is typically caused by insufficient material, pressure, or temperature.',
    tags: ['fill-defect', 'process', 'common'],
    level: 'Beginner',
    relatedAssetIds: ['A1', 'A2', 'A6', 'A7'],
    relatedMaterialIds: ['M1', 'M2', 'M4'],
    createdBy: 'U1',
    createdAt: '2023-03-01T10:00:00Z',
    status: 'Published',
    symptoms: [
      'Part is visibly incomplete at far end from gate',
      'Edges or thin sections are missing material',
      'Part is lighter than normal weight',
      'Fill pattern shows material stopping prematurely',
    ],
    causes: [
      { cause: 'Insufficient shot size', likelihood: 'High' },
      { cause: 'Injection pressure too low', likelihood: 'High' },
      { cause: 'Material too cold (barrel or mold)', likelihood: 'Medium' },
      { cause: 'Inadequate venting', likelihood: 'Medium' },
      { cause: 'Gate restriction or freeze-off', likelihood: 'Medium' },
      { cause: 'Material flow path too long', likelihood: 'Low' },
    ],
    confirmChecks: [
      'Verify cushion is maintained (0.25-0.5 inch)',
      'Check fill pressure vs. machine capability',
      'Measure part weight against specification',
      'Perform short-shot study to visualize fill pattern',
    ],
    fixes: [
      { step: 1, detail: 'Verify cushion - if zero, increase shot size' },
      { step: 2, detail: 'Increase injection pressure by 10% increments' },
      { step: 3, detail: 'Raise barrel temperature 10-20°F in metering zone' },
      { step: 4, detail: 'Check and clean vents (0.0005-0.002" depth for most materials)' },
      { step: 5, detail: 'If persists, consider gate enlargement or additional gates' },
    ],
    prevention: [
      'Establish viscosity curve during process development',
      'Maintain consistent material lot and drying',
      'Regular vent cleaning schedule',
      'Monitor peak pressure as process indicator',
    ],
    severity: 'Critical',
  },
  {
    id: 'DEF2',
    tenantId: 'T1',
    type: 'DefectGuide',
    title: 'Flash',
    summary: 'Thin film of material that escapes between mold surfaces at parting line or vents.',
    body: 'Flash occurs when molten plastic escapes from the mold cavity at the parting line, ejector pins, slides, or vents. It creates thin sheets or strings of material that must be removed for part acceptance.',
    tags: ['parting-line', 'tooling', 'common'],
    level: 'Beginner',
    relatedAssetIds: ['A1', 'A2', 'A3', 'A4'],
    relatedMaterialIds: ['M1', 'M2'],
    createdBy: 'U5',
    createdAt: '2023-03-05T11:00:00Z',
    status: 'Published',
    symptoms: [
      'Thin plastic film along parting line',
      'Material in vent grooves',
      'Excess material at ejector pin locations',
      'Stringy material at slide interfaces',
    ],
    causes: [
      { cause: 'Excessive injection pressure', likelihood: 'High' },
      { cause: 'Clamp force too low', likelihood: 'High' },
      { cause: 'Worn or damaged parting line surfaces', likelihood: 'Medium' },
      { cause: 'Mold not closing properly', likelihood: 'Medium' },
      { cause: 'Material too fluid (high temperature)', likelihood: 'Medium' },
      { cause: 'Vents too deep', likelihood: 'Low' },
    ],
    confirmChecks: [
      'Blue-dye parting line check for damage',
      'Verify clamp tonnage calculation',
      'Check mold alignment with dial indicator',
      'Measure material MFI for specification compliance',
    ],
    fixes: [
      { step: 1, detail: 'Reduce pack/hold pressure by 5-10%' },
      { step: 2, detail: 'Verify and increase clamp tonnage if below calculated requirement' },
      { step: 3, detail: 'Inspect parting line surfaces and repair if damaged' },
      { step: 4, detail: 'Reduce barrel temperatures 10°F in front zones' },
      { step: 5, detail: 'Check vent depths - reduce to 0.0005" if excessive' },
    ],
    prevention: [
      'Calculate proper clamp force (projected area × pack pressure)',
      'Include parting line inspection in PM schedule',
      'Establish maximum pack pressure limits',
      'Regular mold maintenance and cleaning',
    ],
    severity: 'Functional',
  },
  {
    id: 'DEF3',
    tenantId: 'T1',
    type: 'DefectGuide',
    title: 'Sink Marks',
    summary: 'Depressions in the part surface, typically opposite thick sections or ribs.',
    body: 'Sink marks are localized depressions in the surface of molded parts. They occur when the outer skin of the part cools and solidifies first, then shrinks inward as the thick inner sections cool.',
    tags: ['surface-defect', 'pack-hold', 'design-related'],
    level: 'Intermediate',
    relatedAssetIds: ['A1', 'A2', 'A8'],
    relatedMaterialIds: ['M1', 'M4'],
    createdBy: 'U6',
    createdAt: '2023-03-10T09:00:00Z',
    status: 'Published',
    symptoms: [
      'Visible depression opposite ribs or bosses',
      'Surface not flat in thick-wall areas',
      'Cosmetic appearance unacceptable',
      'Sink depth measurable with profilometer',
    ],
    causes: [
      { cause: 'Insufficient pack/hold pressure', likelihood: 'High' },
      { cause: 'Hold time too short (gate seal incomplete)', likelihood: 'High' },
      { cause: 'Mold too hot', likelihood: 'Medium' },
      { cause: 'Part wall too thick relative to nominal', likelihood: 'Medium' },
      { cause: 'Gate location far from thick section', likelihood: 'Low' },
    ],
    confirmChecks: [
      'Gate seal study to verify adequate hold time',
      'Measure sink depth with surface profilometer',
      'Check wall thickness ratio (rib <60% of wall)',
      'Verify pack pressure reaches thick sections',
    ],
    fixes: [
      { step: 1, detail: 'Increase hold pressure 5-10% increments' },
      { step: 2, detail: 'Extend hold time until gate seal is confirmed' },
      { step: 3, detail: 'Reduce mold temperature in area of sink' },
      { step: 4, detail: 'Consider gas assist for thick sections (if applicable)' },
      { step: 5, detail: 'Work with tooling to reduce wall thickness if design allows' },
    ],
    prevention: [
      'Design ribs at 50-60% of nominal wall',
      'Gate location near thick sections',
      'Gate seal study on initial setup',
      'Maintain consistent hold pressure capability',
    ],
    severity: 'Cosmetic',
  },
  {
    id: 'DEF4',
    tenantId: 'T1',
    type: 'DefectGuide',
    title: 'Splay / Silver Streaks',
    summary: 'Silver or white streaks radiating from the gate, typically caused by moisture or degradation.',
    body: 'Splay appears as silver or gray streaks on the part surface, radiating outward from the gate. It is most commonly caused by moisture in the material but can also result from material degradation or trapped air.',
    tags: ['surface-defect', 'moisture', 'degradation'],
    level: 'Intermediate',
    relatedAssetIds: ['A1', 'A2', 'A6', 'A7'],
    relatedMaterialIds: ['M1', 'M4', 'M5'],
    createdBy: 'U1',
    createdAt: '2023-03-15T14:00:00Z',
    status: 'Published',
    symptoms: [
      'Silver or white streaks on surface',
      'Streaks radiate from gate area',
      'Often more visible on textured surfaces',
      'May be accompanied by bubbles or voids',
    ],
    causes: [
      { cause: 'Moisture in material (most common)', likelihood: 'High' },
      { cause: 'Material degradation (excessive temperature)', likelihood: 'Medium' },
      { cause: 'Trapped air from poor screw recovery', likelihood: 'Medium' },
      { cause: 'Contamination in material', likelihood: 'Low' },
      { cause: 'Cold material entering mold', likelihood: 'Low' },
    ],
    confirmChecks: [
      'Test material moisture with analyzer (Karl Fischer or equivalent)',
      'Check barrel temperature profile for overheating',
      'Inspect purge shot for degradation signs',
      'Verify screw recovery parameters',
    ],
    fixes: [
      { step: 1, detail: 'Verify material is properly dried to specification' },
      { step: 2, detail: 'If moisture OK, reduce barrel temperatures 10-20°F' },
      { step: 3, detail: 'Reduce screw RPM and adjust back pressure' },
      { step: 4, detail: 'Check for contamination in hopper and feed throat' },
      { step: 5, detail: 'If persists, purge barrel and start with fresh material' },
    ],
    prevention: [
      'Continuous moisture monitoring on hygroscopic materials',
      'Proper material handling and storage',
      'Regular dryer maintenance and dew point verification',
      'Establish maximum residence time limits',
    ],
    severity: 'Functional',
  },
  {
    id: 'DEF5',
    tenantId: 'T1',
    type: 'DefectGuide',
    title: 'Weld Lines / Knit Lines',
    summary: 'Lines where two flow fronts meet and do not fully bond, causing weakness.',
    body: 'Weld lines form when two or more flow fronts meet during mold filling. If the fronts are too cool when they meet, they do not fully fuse together, creating a visible line and potential weak point.',
    tags: ['structural-defect', 'flow-related', 'design-related'],
    level: 'Intermediate',
    relatedAssetIds: ['A1', 'A2', 'A8'],
    relatedMaterialIds: ['M1', 'M4', 'M5'],
    createdBy: 'U6',
    createdAt: '2023-03-20T10:00:00Z',
    status: 'Published',
    symptoms: [
      'Visible line where flows meet',
      'Weakness at weld location (fails under stress)',
      'Color difference at weld (especially with pearlescent)',
      'Notch visible on textured surfaces',
    ],
    causes: [
      { cause: 'Low melt temperature', likelihood: 'High' },
      { cause: 'Low mold temperature', likelihood: 'High' },
      { cause: 'Slow injection speed', likelihood: 'Medium' },
      { cause: 'Poor venting at weld location', likelihood: 'Medium' },
      { cause: 'Multiple gates creating flow splits', likelihood: 'Medium' },
    ],
    confirmChecks: [
      'Flow simulation to predict weld location',
      'Destructive testing of weld strength',
      'Check venting at weld position',
      'Evaluate fill pattern with short shots',
    ],
    fixes: [
      { step: 1, detail: 'Increase barrel temperature 10-20°F' },
      { step: 2, detail: 'Increase mold temperature near weld area' },
      { step: 3, detail: 'Increase injection speed for hotter flow fronts' },
      { step: 4, detail: 'Add or improve venting at weld location' },
      { step: 5, detail: 'Consider gate relocation to move weld (tooling change)' },
    ],
    prevention: [
      'Mold flow analysis during design phase',
      'Position welds in non-critical areas',
      'Adequate venting where welds will form',
      'Material selection for weld strength (avoid fiber-filled in weld areas)',
    ],
    severity: 'Functional',
  },
  {
    id: 'DEF6',
    tenantId: 'T1',
    type: 'DefectGuide',
    title: 'Burn Marks',
    summary: 'Black or brown discoloration, typically at the end of fill, caused by trapped gas ignition.',
    body: 'Burn marks (also called diesel effect) occur when air or gas trapped in the mold cavity is compressed during injection and ignites. This causes black or brown marks, usually at the end of fill.',
    tags: ['surface-defect', 'venting', 'critical'],
    level: 'Beginner',
    relatedAssetIds: ['A1', 'A2', 'A6'],
    relatedMaterialIds: ['M1', 'M2', 'M4'],
    createdBy: 'U1',
    createdAt: '2023-04-01T11:00:00Z',
    status: 'Published',
    symptoms: [
      'Black or brown marks at end of fill',
      'Burns typically at vent locations',
      'Burning smell from mold',
      'Marks may vary in severity shot to shot',
    ],
    causes: [
      { cause: 'Inadequate venting', likelihood: 'High' },
      { cause: 'Injection speed too fast', likelihood: 'High' },
      { cause: 'Vents plugged with material', likelihood: 'Medium' },
      { cause: 'Excessive clamping force closing vents', likelihood: 'Low' },
    ],
    confirmChecks: [
      'Inspect all vent locations for depth and cleanliness',
      'Slow injection speed to observe burn change',
      'Check for compression marks in short shots',
      'Verify vent depth (0.0005-0.002" typical)',
    ],
    fixes: [
      { step: 1, detail: 'Reduce injection speed in final 10-20% of fill' },
      { step: 2, detail: 'Clean all vents of any material buildup' },
      { step: 3, detail: 'Add or deepen venting at burn location' },
      { step: 4, detail: 'Reduce clamp force if vents are being crushed' },
      { step: 5, detail: 'Consider vacuum venting for persistent issues' },
    ],
    prevention: [
      'Adequate venting designed into mold',
      'Regular vent cleaning schedule',
      'Viscosity curve to establish proper fill speeds',
      'Include profiled injection (slow at end of fill)',
    ],
    severity: 'Critical',
  },
  {
    id: 'DEF7',
    tenantId: 'T2',
    type: 'DefectGuide',
    title: 'Warpage',
    summary: 'Part distortion after ejection due to uneven cooling or residual stress.',
    body: 'Warpage occurs when the part distorts from its intended shape after ejection. It is caused by differential shrinkage within the part due to uneven cooling, molecular orientation, or residual stress.',
    tags: ['dimensional-defect', 'cooling', 'design-related'],
    level: 'Advanced',
    relatedAssetIds: ['A6', 'A7', 'A8'],
    relatedMaterialIds: ['M4', 'M5'],
    createdBy: 'U12',
    createdAt: '2023-04-10T09:00:00Z',
    status: 'Published',
    symptoms: [
      'Part does not lay flat on inspection surface',
      'Corners or edges lifted',
      'Part fails fixture or assembly requirements',
      'Distortion increases with time after molding',
    ],
    causes: [
      { cause: 'Uneven mold temperature', likelihood: 'High' },
      { cause: 'Non-uniform wall thickness', likelihood: 'High' },
      { cause: 'Ejection while part is too hot', likelihood: 'Medium' },
      { cause: 'Excessive pack pressure', likelihood: 'Medium' },
      { cause: 'Fiber orientation (glass-filled materials)', likelihood: 'Medium' },
    ],
    confirmChecks: [
      'Map mold temperature with IR camera',
      'Measure cooling water flow in all circuits',
      'Check part temperature at ejection',
      'Measure differential shrinkage in flow vs. cross-flow',
    ],
    fixes: [
      { step: 1, detail: 'Balance mold temperature across all zones' },
      { step: 2, detail: 'Extend cooling time to reduce ejection temperature' },
      { step: 3, detail: 'Reduce pack pressure if over-packing evident' },
      { step: 4, detail: 'Consider fixturing hot parts to constrain shape' },
      { step: 5, detail: 'Optimize gate location for balanced fill (tooling change)' },
    ],
    prevention: [
      'Uniform wall thickness in design',
      'Balanced cooling circuit design',
      'Gate placement for balanced fill',
      'Consider shrinkage anisotropy in glass-filled materials',
    ],
    severity: 'Functional',
  },
  {
    id: 'DEF8',
    tenantId: 'T2',
    type: 'DefectGuide',
    title: 'Brittleness',
    summary: 'Parts that crack or break under normal use or during handling.',
    body: 'Brittle parts fail under stresses they should normally withstand. This can be caused by material degradation, improper processing, or contamination.',
    tags: ['structural-defect', 'degradation', 'critical'],
    level: 'Intermediate',
    relatedAssetIds: ['A6', 'A7'],
    relatedMaterialIds: ['M4', 'M5'],
    createdBy: 'U10',
    createdAt: '2023-04-15T14:00:00Z',
    status: 'Published',
    symptoms: [
      'Parts crack during assembly or use',
      'Fracture at normal handling loads',
      'Failure at weld lines or stress concentrations',
      'Impact testing fails specification',
    ],
    causes: [
      { cause: 'Material degradation (excessive heat history)', likelihood: 'High' },
      { cause: 'Moisture in hygroscopic materials', likelihood: 'High' },
      { cause: 'Excessive regrind content', likelihood: 'Medium' },
      { cause: 'Contamination', likelihood: 'Medium' },
      { cause: 'Over-packing causing residual stress', likelihood: 'Low' },
    ],
    confirmChecks: [
      'Check material MFI vs. virgin specification',
      'Verify drying conditions and moisture content',
      'Audit regrind percentage being used',
      'Inspect barrel for degraded material',
    ],
    fixes: [
      { step: 1, detail: 'Verify material is properly dried' },
      { step: 2, detail: 'Reduce barrel temperatures, especially rear zones' },
      { step: 3, detail: 'Reduce or eliminate regrind temporarily' },
      { step: 4, detail: 'Purge barrel completely with fresh material' },
      { step: 5, detail: 'Reduce pack pressure if stress cracking evident' },
    ],
    prevention: [
      'Proper material handling and storage',
      'Controlled regrind usage (max 20-25%)',
      'Regular MFI testing of incoming material',
      'Barrel temperature within material recommendations',
    ],
    severity: 'Critical',
  },
  {
    id: 'DEF9',
    tenantId: 'T2',
    type: 'DefectGuide',
    title: 'Jetting',
    summary: 'Snake-like pattern on surface from material spraying into cavity.',
    body: 'Jetting occurs when the melt stream enters the cavity at high velocity and snakes across the surface before the cavity fills normally. This creates a distinctive pattern of squiggly lines.',
    tags: ['surface-defect', 'fill-related', 'gate-related'],
    level: 'Intermediate',
    relatedAssetIds: ['A6', 'A8'],
    relatedMaterialIds: ['M4'],
    createdBy: 'U12',
    createdAt: '2023-05-01T10:00:00Z',
    status: 'Published',
    symptoms: [
      'Worm-like or snake pattern on part surface',
      'Pattern starts near gate area',
      'Surface has folded appearance',
      'Pattern visible on short shots',
    ],
    causes: [
      { cause: 'Gate too small for material viscosity', likelihood: 'High' },
      { cause: 'Injection speed too fast', likelihood: 'High' },
      { cause: 'Gate positioned to spray into cavity', likelihood: 'Medium' },
      { cause: 'Material too cold (viscosity too high)', likelihood: 'Medium' },
    ],
    confirmChecks: [
      'Perform short shot at reduced speed',
      'Check gate size vs. material recommendations',
      'Evaluate gate location for impingement point',
    ],
    fixes: [
      { step: 1, detail: 'Reduce initial injection speed (first 10-20% of stroke)' },
      { step: 2, detail: 'Increase barrel temperature to reduce viscosity' },
      { step: 3, detail: 'Consider enlarging gate (tooling change)' },
      { step: 4, detail: 'Reposition gate to impinge on wall (tooling change)' },
    ],
    prevention: [
      'Gate design to direct flow against wall',
      'Gate size appropriate for material',
      'Profiled injection with slow start',
    ],
    severity: 'Cosmetic',
  },
  {
    id: 'DEF10',
    tenantId: 'T1',
    type: 'DefectGuide',
    title: 'Gate Blush',
    summary: 'Discoloration or texture difference in the gate area.',
    body: 'Gate blush appears as a change in color or texture immediately surrounding the gate. It is caused by high shear stress as material enters through the gate restriction.',
    tags: ['surface-defect', 'gate-related', 'cosmetic'],
    level: 'Beginner',
    relatedAssetIds: ['A1', 'A2'],
    relatedMaterialIds: ['M1', 'M2'],
    createdBy: 'U1',
    createdAt: '2023-05-10T11:00:00Z',
    status: 'Published',
    symptoms: [
      'Halo of different color or gloss near gate',
      'Frosted appearance around gate',
      'Visible on transparent or translucent parts',
      'More apparent with textured surfaces',
    ],
    causes: [
      { cause: 'Injection speed too fast through gate', likelihood: 'High' },
      { cause: 'Gate too small', likelihood: 'High' },
      { cause: 'Mold temperature too low', likelihood: 'Medium' },
      { cause: 'Material too cold', likelihood: 'Medium' },
    ],
    confirmChecks: [
      'Reduce injection speed and observe change',
      'Measure gate dimensions',
      'Check mold temperature near gate',
    ],
    fixes: [
      { step: 1, detail: 'Reduce injection speed for first 10-20% of fill' },
      { step: 2, detail: 'Increase mold temperature in gate area' },
      { step: 3, detail: 'Increase barrel temperature 10-15°F' },
      { step: 4, detail: 'Consider larger gate or different gate type (tooling change)' },
    ],
    prevention: [
      'Proper gate sizing during mold design',
      'Profiled injection with slow start',
      'Gate location in non-cosmetic area when possible',
    ],
    severity: 'Cosmetic',
  },
  {
    id: 'DEF11',
    tenantId: 'T2',
    type: 'DefectGuide',
    title: 'Voids',
    summary: 'Internal bubbles or empty spaces within the part wall.',
    body: 'Voids are internal bubbles within the part that cannot be seen externally without sectioning. They reduce structural integrity and can cause part failures under load.',
    tags: ['structural-defect', 'internal', 'pack-hold'],
    level: 'Advanced',
    relatedAssetIds: ['A6', 'A7', 'A8'],
    relatedMaterialIds: ['M4', 'M5'],
    createdBy: 'U12',
    createdAt: '2023-06-01T09:00:00Z',
    status: 'Published',
    symptoms: [
      'Bubbles visible when part is sectioned',
      'Part lighter than expected',
      'X-ray or CT scan shows internal cavities',
      'Part fails under load unexpectedly',
    ],
    causes: [
      { cause: 'Insufficient pack pressure', likelihood: 'High' },
      { cause: 'Gate seal too early', likelihood: 'High' },
      { cause: 'Thick sections not adequately packed', likelihood: 'Medium' },
      { cause: 'Moisture (if accompanied by surface splay)', likelihood: 'Medium' },
      { cause: 'Material shrinkage in thick areas', likelihood: 'Medium' },
    ],
    confirmChecks: [
      'Section part to confirm void presence',
      'Perform gate seal study',
      'Weigh parts vs. target weight',
      'Check material for moisture if also seeing splay',
    ],
    fixes: [
      { step: 1, detail: 'Increase pack/hold pressure' },
      { step: 2, detail: 'Extend hold time to maintain pressure longer' },
      { step: 3, detail: 'Reduce mold temperature in thick sections' },
      { step: 4, detail: 'Consider gas-assist for thick sections' },
      { step: 5, detail: 'If moisture-related, verify drying conditions' },
    ],
    prevention: [
      'Gate seal study during process development',
      'Design parts with uniform wall thickness',
      'Gas-assist consideration for thick sections',
      'Proper drying of hygroscopic materials',
    ],
    severity: 'Critical',
  },
  {
    id: 'DEF12',
    tenantId: 'T1',
    type: 'DefectGuide',
    title: 'Discoloration / Yellowing',
    summary: 'Color change in material, typically yellowing from heat degradation.',
    body: 'Discoloration occurs when material changes color during processing, usually due to thermal degradation. Yellowing is most common in clear or white materials.',
    tags: ['surface-defect', 'degradation', 'common'],
    level: 'Beginner',
    relatedAssetIds: ['A1', 'A2', 'A6'],
    relatedMaterialIds: ['M1', 'M2', 'M4'],
    createdBy: 'U1',
    createdAt: '2023-06-15T14:00:00Z',
    status: 'Published',
    symptoms: [
      'Parts appear yellow or off-color',
      'Color variation between shots',
      'Darker color in gate area (high shear)',
      'Burnt smell from barrel',
    ],
    causes: [
      { cause: 'Barrel temperature too high', likelihood: 'High' },
      { cause: 'Excessive residence time', likelihood: 'High' },
      { cause: 'Degraded material in barrel', likelihood: 'Medium' },
      { cause: 'Contamination from previous material', likelihood: 'Medium' },
      { cause: 'Material at end of shelf life', likelihood: 'Low' },
    ],
    confirmChecks: [
      'Check barrel temperature vs. material specs',
      'Calculate residence time',
      'Purge and inspect for degraded material',
      'Compare to virgin material sample',
    ],
    fixes: [
      { step: 1, detail: 'Reduce barrel temperatures 10-20°F' },
      { step: 2, detail: 'Reduce cycle time or shot size to minimize residence' },
      { step: 3, detail: 'Purge barrel thoroughly with fresh material' },
      { step: 4, detail: 'If contamination, perform complete barrel pullback and clean' },
    ],
    prevention: [
      'Barrel temperatures per material specifications',
      'Minimize residence time (proper shot size selection)',
      'Regular purging between material changes',
      'First-in-first-out material usage',
    ],
    severity: 'Cosmetic',
  },
];

// ============================================
// COMPANY NOTES (Editable, Versioned)
// ============================================
export const companyNotes: CompanyNote[] = [
  {
    id: 'NOTE1',
    docId: 'DOC5', // Engel Victory guide
    content: '**Internal Note**: Service contract expires 03/2024. Contact regional rep for renewal quote.\n\nTraining scheduled for new operators on 02/15/2024.',
    editedBy: 'U3',
    editedAt: '2024-01-15T10:00:00Z',
    version: 2,
  },
  {
    id: 'NOTE2',
    docId: 'DOC11', // PP Medical Guide
    content: 'Supplier changed lot numbering system in Q4 2023. New lots start with "HP24-".\n\nApproved alternative: LyondellBasell HP561R (verify with QA before use).',
    editedBy: 'U1',
    editedAt: '2024-01-10T14:00:00Z',
    version: 1,
  },
  {
    id: 'NOTE3',
    docId: 'DEF1', // Short Shot guide
    content: 'Common issue on startup after weekend shutdown. Allow extra warm-up time for Engel presses.',
    editedBy: 'U6',
    editedAt: '2024-01-12T08:30:00Z',
    version: 1,
  },
  {
    id: 'NOTE4',
    docId: 'DOC14', // Glass-Filled Nylon guide
    content: '⚠️ **CRITICAL**: We had a major issue in 12/2023 with splay from underdrying. Always verify dryer is at 90°C for minimum 4 hours.\n\nSee Fix Record FIX9 for temperature profile adjustments.',
    editedBy: 'U10',
    editedAt: '2024-01-20T09:00:00Z',
    version: 3,
  },
  {
    id: 'NOTE5',
    docId: 'DOC17', // Dryer guide
    content: 'Desiccant was replaced in Unit #1 on 01/19/2024 after FIX1 issue. Next replacement due 01/2027.\n\nSolenoid part number changed: Now use DRY-SOL-24V-B (improved seal design).',
    editedBy: 'U3',
    editedAt: '2024-01-20T11:00:00Z',
    version: 2,
  },
];
