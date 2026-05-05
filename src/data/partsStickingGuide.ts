import type { DefectGuide } from './defectGuides';
import partsStickingCrossSection from '@/assets/parts-sticking-mold-cross-section.jpg';
import partsStickingIshikawa from '@/assets/parts-sticking-ishikawa.jpg';
import partsStickingFlowchart from '@/assets/parts-sticking-flowchart.jpg';

export const partsStickingGuide: DefectGuide = {
  slug: 'parts-sticking',
  title: 'Parts Sticking',
  summary:
    'Part fails to release from the mold during ejection due to excessive friction, vacuum, insufficient draft, over-packing, or surface adhesion. Causes cycle interruption, part damage, mold damage, and inconsistent production.',
  category: 'Ejection & Release',
  severity: 'high',
  tags: ['sticking', 'adhesion', 'draft angle', 'ejection', 'core pull', 'vacuum', 'over-packing', 'mold release', 'hot runner', 'cold runner', 'sprue', 'valve pin'],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Part sticking — also called mold adhesion — occurs when the molded part does not release cleanly from the mold during the ejection phase. The part may remain on the cavity (stationary) side, cling to the core (movable) side beyond normal retention, or resist release at the sprue, runner, or gate. This defect halts or disrupts the molding cycle, risks part distortion or damage, and can cause progressive mold damage if not corrected promptly.',
        },
        {
          type: 'image',
          src: partsStickingCrossSection,
          alt: 'Mold cross-section showing stationary cavity side, movable core side, and hot runner gate sticking zones',
          figureNumber: 'Figure 1',
          caption: 'Mold cross-section identifying the four primary sticking zones: sprue/runner (cold runner), cavity side, core side, and hot runner gate area.',
          lookFor: {
            title: 'Identify the sticking zone first',
            tone: 'info',
            items: [
              'Sprue/runner sticking — part stays on the stationary side at the sprue bushing.',
              'Cavity-side sticking — part fails to transfer to the core side at mold open.',
              'Core-side sticking — part grips the core and resists ejector push.',
              'Gate-area sticking (HR) — vestige tears or gate drools at the valve pin tip.',
            ],
          },
        },
        { type: 'heading', level: 3, text: '1.1 Why correct release matters' },
        {
          type: 'list',
          items: [
            'Part damage — drag marks, whitening, warpage, or cracking from forced ejection.',
            'Mold damage — bent ejector pins, worn core surfaces, damaged shut-offs from stuck parts caught between halves.',
            'Cycle interruption — operator intervention, robot faults, downstream starvation.',
            'Inconsistent quality — sticking often varies shot-to-shot, creating reject spikes.',
          ],
        },
        { type: 'heading', level: 3, text: '1.2 Draft angle fundamentals' },
        {
          type: 'callout',
          tone: 'info',
          title: 'Draft and release',
          text:
            'Draft angle is the slight taper applied to vertical walls in the direction of mold opening. With adequate draft (≥ 0.5° per side), the part separates from the steel immediately upon opening. Without draft (0°), the part creates a vacuum seal and friction lock against the mold wall — exponentially increasing ejection force requirements.',
        },
        {
          type: 'table',
          caption: 'Minimum recommended draft angles by surface condition',
          columns: ['Surface Finish', 'Minimum Draft', 'Notes'],
          rows: [
            ['Polished (SPI A-1/A-2)', '0.5° per side', 'Smooth release but vacuum risk on deep cores'],
            ['Semi-polished (SPI B-1/B-2)', '1.0° per side', 'Standard starting point for most parts'],
            ['Textured (MT/VDI)', '1.0° + 1.0° per 0.001" depth', 'Texture locks part — add draft proportional to depth'],
            ['Heavy texture / leather grain', '3.0°–5.0° per side', 'Consult texture vendor for exact requirement'],
          ],
        },
      ],
    },
    {
      id: 'root-causes',
      title: '2. Root Causes & Mechanics',
      blocks: [
        {
          type: 'image',
          src: partsStickingIshikawa,
          alt: 'Ishikawa fishbone diagram showing root causes of part sticking organized by Mold, Method, Material, Machine, and Manual/HR categories',
          figureNumber: 'Figure 2',
          caption: 'Ishikawa root cause analysis — Part Sticking. Five contributing families: Mold, Method, Material, Machine, and Manual/HR-Specific factors.',
          lookFor: {
            title: 'Systematic cause identification',
            tone: 'warning',
            items: [
              'Start with the Mold branch — draft angle and surface condition are the most common root causes.',
              'Method branch — over-packing and cooling time dominate process-related sticking.',
              'Material branch — amorphous resins (PC, ABS) have higher adhesion tendency than semi-crystalline.',
              'Check Machine and Manual branches only after Mold and Method are ruled out.',
            ],
          },
        },
        { type: 'heading', level: 3, text: '2.1 Mold factors' },
        {
          type: 'list',
          items: [
            'Insufficient draft angle (< 0.5°) — creates vacuum seal and friction lock during ejection.',
            'Surface scratches, burrs, or wear — mechanical interlocking between part and mold steel.',
            'Poor venting — trapped air creates vacuum on core surfaces.',
            'Ejector pin deficiency — insufficient number, size, or placement to overcome adhesion forces.',
            'Undercuts or negative draft from wear or design — physically prevents release.',
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Process / method factors' },
        {
          type: 'list',
          items: [
            'Over-packing / excessive hold pressure — part shrinks tightly onto core features.',
            'Insufficient cooling time — part too soft at ejection, deforms and grips steel.',
            'Uneven mold temperature — differential shrinkage causes unbalanced clamping on core.',
            'Fast mold breakaway speed — insufficient time for vacuum release between part and cavity.',
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Material factors' },
        {
          type: 'list',
          items: [
            'Amorphous resins (PC, ABS, PMMA) — higher surface adhesion and less mold shrinkage than semi-crystalline.',
            'High filler content (glass fiber) — abrasive wear increases surface roughness and mechanical grip.',
            'Contamination or excessive regrind — unpredictable shrinkage and surface adhesion.',
            'Lack of internal lubricant — no natural release agent in formulation (e.g., unfilled PC).',
          ],
        },
        { type: 'heading', level: 3, text: '2.4 Machine factors' },
        {
          type: 'list',
          items: [
            'Excessive clamp pressure — mold distortion creates localized tight spots.',
            'Cycle time variation — inconsistent cooling produces variable shrinkage.',
            'Non-return valve wear — inconsistent shot size leads to variable packing.',
          ],
        },
        { type: 'heading', level: 3, text: '2.5 Cold runner & hot runner specific' },
        {
          type: 'table',
          columns: ['System', 'Sticking Mechanism', 'Key Checks'],
          rows: [
            ['Cold Runner — Sprue', 'Nozzle tip/bushing orifice mismatch creates undercut at sprue', 'Tip diameter must be 1/16" smaller than bushing bore; check for burrs or damage'],
            ['Cold Runner — Runner', 'Insufficient puller pin engagement or Z-pin pull', 'Verify puller pin height and condition; check runner ejection stroke'],
            ['Hot Runner — Gate', 'Valve pin seizure, drooling, or gate adhesion from tip temperature', 'Inspect valve pin for galling; verify tip temperature setpoint and heater balance'],
            ['Hot Runner — Vestige', 'Gate not cleanly severed — vestige anchors part to cavity side', 'Check valve pin timing and actuation pressure; inspect gate insert condition'],
          ],
        },
      ],
    },
    {
      id: 'diagnostics',
      title: '3. Diagnostic Techniques',
      blocks: [
        {
          type: 'image',
          src: partsStickingFlowchart,
          alt: 'Troubleshooting decision tree flowchart for diagnosing part sticking by location',
          figureNumber: 'Figure 3',
          caption: 'Troubleshooting decision tree — follow the sticking location to identify the most probable cause and first corrective action.',
          lookFor: {
            title: 'Follow the location-based path',
            tone: 'info',
            items: [
              'Always start by identifying WHERE the part sticks — the location dictates the diagnostic branch.',
              'Sprue/runner branch: check nozzle tip vs. bushing geometry first.',
              'Cavity-side branch: inspect for drag marks (friction) vs. deformation (thermal/stress).',
              'Core-side branch: increase cooling time as the universal first action.',
              'Hot runner branch: evaluate valve pin condition and tip temperature.',
            ],
          },
        },
        { type: 'heading', level: 3, text: '3.1 Visual inspection' },
        {
          type: 'table',
          caption: 'Surface evidence and interpretation',
          columns: ['Observation', 'Probable Cause', 'First Action'],
          rows: [
            ['Drag marks / scrapes on part surface', 'Friction — scratches, burrs, or insufficient draft', 'Polish mold in pull direction; verify draft angle'],
            ['Whitened stress marks at ejector locations', 'Part too soft or ejector area too small', 'Increase cooling time; enlarge ejector pad area'],
            ['Part warped after removal', 'Differential cooling or premature ejection', 'Balance mold temperature; extend cooling time'],
            ['Sprue stuck in bushing', 'Nozzle tip/bushing mismatch or undercut', 'Check tip diameter vs. bushing bore; polish bushing'],
            ['Gate vestige torn or elongated', 'Valve pin not fully closed or gate drool', 'Check valve pin timing; reduce tip temperature'],
          ],
        },
        { type: 'heading', level: 3, text: '3.2 Process-based diagnostics' },
        {
          type: 'list',
          items: [
            'Ejection force measurement — peak force > 2× normal indicates mechanical interference or excessive shrink-on-core.',
            'Short-shot study — progressively fill to identify if sticking begins at fill or during pack phase.',
            'Cooling time study — incrementally increase cooling to find minimum time for clean release.',
            'Mold temperature mapping — IR camera or thermocouple survey to identify hot spots that delay local solidification.',
          ],
        },
        { type: 'heading', level: 3, text: '3.3 Tooling diagnostics' },
        {
          type: 'list',
          items: [
            'Blue check (Dykem) on parting line and shut-off surfaces to confirm steel-to-steel contact.',
            'Core pin and ejector pin inspection — measure diameter, check for galling, verify alignment.',
            'Sprue bushing inspection — bore diameter, polish condition, nozzle seat alignment.',
            'Vent condition audit — blocked vents create vacuum on core surfaces.',
          ],
        },
      ],
    },
    {
      id: 'corrective-actions',
      title: '4. Corrective & Preventive Actions',
      blocks: [
        { type: 'heading', level: 3, text: '4.1 Process corrections' },
        {
          type: 'list',
          items: [
            'Reduce pack/hold pressure — first and most impactful process adjustment for core-side sticking.',
            'Increase cooling time — allows part to solidify and shrink away from cavity surfaces.',
            'Slow mold open / breakaway speed — gives vacuum time to release between part and steel.',
            'Reduce melt temperature — higher viscosity reduces surface wetting and adhesion.',
            'Adjust mold temperature differential — run core slightly warmer so part preferentially releases from cavity.',
          ],
        },
        { type: 'heading', level: 3, text: '4.2 Tooling corrections' },
        {
          type: 'list',
          items: [
            'Increase draft angle — minimum 0.5° per side on polished surfaces; add 1° per 0.001" of texture depth.',
            'Polish mold surfaces in the direction of draw — remove scratches, burrs, and EDM recast layer.',
            'Add or enlarge ejector pins — distribute ejection force over larger area to prevent localized stress.',
            'Install air poppets or air-assist ejection on deep cores or large flat surfaces.',
            'Re-machine nozzle seat and sprue bushing to ensure proper alignment and no undercut.',
          ],
        },
        { type: 'heading', level: 3, text: '4.3 Cold runner corrections' },
        {
          type: 'list',
          items: [
            'Verify nozzle tip orifice is 1/16" smaller than sprue bushing bore — prevents undercut at interface.',
            'Polish sprue bushing bore and verify taper matches nozzle taper.',
            'Check sprue puller pin engagement — must positively grip cold slug during mold open.',
            'Increase sprue cooling to ensure full solidification before ejection.',
          ],
        },
        { type: 'heading', level: 3, text: '4.4 Hot runner corrections' },
        {
          type: 'list',
          items: [
            'Inspect and replace valve pin — check for galling, wear, or misalignment.',
            'Reduce nozzle tip temperature — excessive heat causes gate drool and adhesion.',
            'Verify valve actuation timing and pressure — pin must fully close before mold opens.',
            'Check heater balance across all zones — temperature variation causes inconsistent gate quality.',
          ],
        },
        { type: 'heading', level: 3, text: '4.5 Material & auxiliary' },
        {
          type: 'list',
          items: [
            'Apply external mold release agent as temporary measure — not a long-term solution.',
            'Evaluate internal lubricant additive (zinc stearate, silicone MB) for chronic sticking resins.',
            'Reduce regrind percentage if sticking correlates with regrind content.',
            'Consider mold coating (TiN, DLC, or nickel-PTFE) for chronic adhesion surfaces.',
          ],
        },
        { type: 'heading', level: 3, text: '4.6 DfM guidelines' },
        {
          type: 'list',
          items: [
            'Design minimum 1° draft on all surfaces parallel to mold opening direction.',
            'Avoid zero-draft vertical walls — even 0.25° dramatically reduces ejection force.',
            'Place texture only on surfaces with sufficient draft to accommodate texture depth.',
            'Design ejector pin locations to distribute force evenly — avoid thin sections and cosmetic surfaces.',
            'Minimize deep narrow cores — use core-side cooling and air-assist for L/D ratios > 3:1.',
          ],
        },
      ],
    },
  ],
  references: [
    { id: 'R1', text: 'Paulson Training Programs. Injection Molding Troubleshooting — Part Sticking.' },
    { id: 'R2', text: 'RJG Inc. Systematic Molding — Ejection Phase Analysis.' },
    { id: 'R3', text: 'Protolabs. Design Tip — Draft Angle Guidelines for Injection Molding.' },
    { id: 'R4', text: 'Beaumont Technologies. Mold Filling Imbalance and Its Effect on Part Release.' },
    { id: 'R5', text: 'Society of Plastics Engineers. SPE ANTEC — Ejection Force Measurement and Optimization.' },
    { id: 'R6', text: 'Mold-Masters. Hot Runner Troubleshooting — Gate Quality and Valve Pin Maintenance.' },
  ],
};
