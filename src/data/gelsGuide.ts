import type { DefectGuide } from './defectGuides';
import gelFisheyeImg from '@/assets/defects/gel-fisheye.jpg';
import gelBlackSpecksImg from '@/assets/defects/gel-black-specks.jpg';
import gelPipsImg from '@/assets/defects/gel-pips.jpg';

export const gelsGuide: DefectGuide = {
  slug: 'gels',
  title: 'Gels',
  summary:
    'Localized rheological anomalies — small inclusions of physically entangled high-molecular-weight polymer ("unmelts") or chemically cross-linked, thermo-oxidatively degraded material — that disrupt melt homogeneity and act as cosmetic defects, optical inclusions, and structural stress concentrators.',
  category: 'Cosmetic & Structural',
  severity: 'high',
  tags: [
    'gels',
    'fish-eyes',
    'unmelts',
    'cross-linking',
    'degradation',
    'hot runner',
    'cold runner',
    'residence time',
    'shear heating',
    'contamination',
  ],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'In polymer processing, a "gel" is any small, localized mass of material within a molded part that differs significantly in physical or chemical properties from the surrounding polymer matrix. Gels are not merely cosmetic — they are localized rheological anomalies that signal systemic failures in material handling, process control, or tool design. In medical device and automotive optics applications, gels can lead to catastrophic functional failures.',
        },
        { type: 'heading', level: 3, text: '1.1 Two fundamental classes' },
        {
          type: 'table',
          caption: 'Physical vs. chemical gels',
          columns: ['Class', 'Mechanism', 'Reversibility', 'Typical Origin'],
          rows: [
            [
              'Physical gel ("unmelt", "high-MW seed")',
              'Heavily entangled or very high molecular weight chains that fail to fully melt within barrel residence time',
              'Reversible — disentangles under higher shear or thermal energy',
              'Insufficient plasticization, oversized barrel, screw wear, low back pressure',
            ],
            [
              'Chemical gel (cross-link)',
              '3-D covalently bonded network from thermo-oxidative degradation or residual polymerization',
              'Irreversible — will not melt regardless of subsequent heat or shear',
              'Excessive heat, high shear, long residence with trace oxygen; often charred → black specks',
            ],
          ],
        },
        { type: 'heading', level: 3, text: '1.2 Visual manifestation by resin family' },
        {
          type: 'table',
          caption: 'Gel manifestation diagnostic table',
          columns: ['Manifestation', 'Physical Appearance', 'Root Cause Category', 'Diagnostic Method'],
          rows: [
            ['Fish-eyes / windows', 'Translucent, lens-shaped inclusion in clear resin (PC, PMMA)', 'Unmelted high-MW material', 'Polarized light microscopy'],
            ['Black specks', 'Dark, brittle inclusions', 'Carbonization / thermo-oxidative degradation', 'FTIR or SEM/EDX'],
            ['Surface pips / seeds', 'Localized raised bumps on opaque parts', 'Unmelted particles or cross-links', 'Profilometry / visual under raking light'],
            ['Discolored streaks', 'Hazy yellow/brown flow lines', 'Thermo-oxidative aging', 'Colorimetry'],
          ],
        },
        { type: 'heading', level: 3, text: '1.3 Visual reference gallery' },
        {
          type: 'paragraph',
          text:
            'Use the following reference images to visually match what you see on the part to the most likely gel class. Confirm with the diagnostic methods listed in §1.2.',
        },
        {
          type: 'image',
          src: gelFisheyeImg,
          alt: 'Macro view of a fish-eye gel inclusion in a clear plastic part',
          figureNumber: 'Fig. 1.3a',
          caption: 'Fish-eye gel — translucent lens-shaped inclusion with a denser glassy core and faint halo, typical of unmelted high-MW seeds in clear resins (PC, PMMA, PS).',
          lookFor: {
            tone: 'info',
            title: 'What to look for',
            items: [
              'Lens or "eye" shape with a denser optical core',
              'Surrounding halo or stress field visible under polarized light',
              'Most visible in clear or lightly tinted resins',
              'Often disappears when shear/temperature is raised → physical (reversible) gel',
            ],
          },
        },
        {
          type: 'image',
          src: gelBlackSpecksImg,
          alt: 'Macro view of black-speck gel contamination on a light plastic surface',
          figureNumber: 'Fig. 1.3b',
          caption: 'Black-speck gels — carbonized, brittle inclusions from thermo-oxidative degradation. Often originate from dead spots in the hot runner manifold or screw flights.',
          lookFor: {
            tone: 'warning',
            title: 'What to look for',
            items: [
              'Dark brown to black specks, sometimes with a degradation halo',
              'Brittle and friable when probed (versus hard mineral contamination)',
              'Frequency rises after color/material changeovers or long dwell',
              'Confirm carbonization with FTIR or SEM/EDX',
            ],
          },
        },
        {
          type: 'image',
          src: gelPipsImg,
          alt: 'Macro view of pip and unmelt gel defects raised on a plastic surface',
          figureNumber: 'Fig. 1.3c',
          caption: 'Pips / unmelts — small raised opaque nodules of unmelted polymer, sometimes with comet-like flow tails. Common in PP, HDPE, and reprocessed resins with broad MW distribution.',
          lookFor: {
            tone: 'info',
            title: 'What to look for',
            items: [
              'Raised bumps detectable under raking light or by fingertip',
              'Comet/teardrop tail pointing in the flow direction',
              'Opaque white core in otherwise translucent resin',
              'Increase back pressure or screw recovery time to verify it is an unmelt',
            ],
          },
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Gels are stress concentrators',
          text:
            'A gel has different thermal expansion and contraction characteristics than the surrounding bulk polymer. The gel/matrix interface is a site of inherent weakness and a common crack-initiation point under mechanical loading — especially in thin-walled parts where the gel diameter is a meaningful fraction of wall thickness.',
        },
      ],
    },
    {
      id: 'root-causes',
      title: '2. Root Causes',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Gel formation is rarely the result of a single isolated variable. It is the outcome of complex interaction between material chemistry, thermodynamic processing, and mechanical hardware. Diagnose across all four "M" categories: Material, Machine, Mold, and Method.',
        },
        { type: 'heading', level: 3, text: '2.1 Material susceptibility' },
        {
          type: 'table',
          caption: 'Resin-specific gelation pathways',
          columns: ['Material', 'Primary Gelation Pathway', 'Process Watch-Outs'],
          rows: [
            [
              'Polypropylene (PP) / Polyolefins',
              'Shear-induced chain scission and recombination into cross-linked networks',
              'High-speed packaging cycles; residual catalyst impurities in PCR amplify thermo-oxidative gelation',
            ],
            [
              'ABS',
              'Polybutadiene rubber phase cross-links under heat; SAN matrix is more stable',
              'Long hot runner manifold residence creates hard rubbery gels and "tiger stripes"',
            ],
            [
              'Polycarbonate (PC)',
              'Narrow processing window above 300 °C; oxidation in dead zones; hydrolytic chain scission if wet',
              'Residence time critical; dry to < 0.02 % moisture; manifold dead spots produce black specks',
            ],
            [
              'PVC, POM',
              'Auto-catalytic thermal degradation; very narrow thermal budget',
              'Never leave heat-soaked during stoppages — purge with PP or bank temps down',
            ],
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Process parameters — viscous dissipation & residence time' },
        {
          type: 'callout',
          tone: 'info',
          title: 'Shear heating equation',
          text:
            'Melt temperature is not solely a function of barrel heater bands. Viscous dissipation generates heat as Φ = η · γ̇². At high injection speeds, localized temperature at the gate can spike tens of °C above the barrel set point, crossing into carbonization and forming gels at the flow front.',
        },
        {
          type: 'list',
          items: [
            'Injection speed too high → shear heating at nozzle/gate carbonizes shear-sensitive resins.',
            'Back pressure too high → improves dispersion and air removal but adds mechanical work; risk for PVC, POM, PC.',
            'Residence time too long → sum of time × temperature ("thermal history") drives cross-linking; oversized barrels or long cycles compound risk.',
            'Decompression / suck-back too aggressive → entrains air at the screw tip, accelerating oxidation.',
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Mold design — cold runner vs. hot runner' },
        {
          type: 'table',
          caption: 'Runner system gel risk profile',
          columns: ['Parameter', 'Cold Runner Impact', 'Hot Runner Impact'],
          rows: [
            ['Residence time', 'Minimal — refreshed every shot', 'Significant — risk of stagnation in manifold'],
            ['Thermal gradient', 'High — risk of cold slugs at nozzle', 'Low — but risk of localized "hot spots"'],
            ['Gate design', 'Simplified — usually edge or sub-gate', 'Complex — valve gates or hot tips'],
            ['Primary gel type', 'Cold-slug unmelts pushed into the cavity', 'Carbonized chemical gels and black specks from dead zones'],
            ['Mitigation focus', 'Cold-slug wells, sprue tip temperature control', 'Polished flow channels, balanced manifold, precise PID'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Hot runner dead spots',
          text:
            'Dead spots or stagnant zones in manifolds — corners where flow velocity is near zero — give material effectively infinite residence time. Trapped polymer carbonizes, then breaks loose and enters the melt stream as black specks or hard chemical gels. This is the single most common hot-runner gel mechanism.',
        },
        { type: 'heading', level: 3, text: '2.4 Machine factors — screw, barrel, venting' },
        {
          type: 'list',
          items: [
            'Worn screw flights allow melt to "leak" backward — uncontrolled shear and erratic residence time produce unmelt gels visible as clear specks.',
            'Mixing sections (Maddock, pineapple) and barrier flights are required for full plasticization; missing or worn mixers leave high-MW seeds intact.',
            'Excessive clamp force can crush vents → trapped air compresses adiabatically (diesel effect) and burns the polymer at the end of fill — often misidentified as a gel.',
            'Failing thermocouples in hot runner zones can let a zone "run away" 50 °C above set point, causing rapid gelation and carbonization.',
          ],
        },
        { type: 'heading', level: 3, text: '2.5 Auxiliary equipment' },
        {
          type: 'list',
          items: [
            'Hot runner controllers — PID drift or thermocouple failure → uncontrolled overheat.',
            'Chillers / TCUs — fluctuating mold temperature changes the frozen-layer thickness and flow-front velocity, creating shear-rate variations that drive gels.',
            'Sprue pickers / robots — inconsistent removal increases residence variability; dropped sprues into regrind introduce dust and seed particles for future gels.',
          ],
        },
      ],
    },
    {
      id: 'diagnostics',
      title: '3. Diagnostic Techniques',
      blocks: [
        { type: 'heading', level: 3, text: '3.1 Visual & microscopic identification' },
        {
          type: 'list',
          items: [
            'Polarized light microscopy — physical (unmelt) gels show distinct birefringence stress patterns from differential cooling; charred chemical gels appear opaque and non-refractive.',
            'Hot stage microscopy — heat the sample under the microscope. If the gel melts, it was a physical entanglement. If it remains solid as the matrix becomes fluid, it is a cross-linked chemical gel.',
          ],
        },
        { type: 'heading', level: 3, text: '3.2 Analytical chemistry methods' },
        {
          type: 'table',
          columns: ['Technique', 'What it identifies'],
          rows: [
            ['FTIR (Fourier Transform Infrared Spectroscopy)', 'Chemical fingerprint — distinguishes parent polymer from foreign resin or oxidized material; carbonyl peak indicates thermo-oxidative degradation'],
            ['SEM/EDX (Scanning Electron Microscopy / EDX)', 'Inorganic contaminants — confirms iron/chromium (worn screw) or silicon (filler clumps) elemental signatures'],
            ['MFR / MVR (ISO 1133, ASTM D1238)', 'Molecular degradation — > 20 % MFR shift virgin → molded indicates chain scission and gel risk'],
          ],
        },
        { type: 'heading', level: 3, text: '3.3 Simulation-based prediction' },
        {
          type: 'list',
          items: [
            'Residence time mapping (Moldflow / Moldex3D) — flag manifold regions where material stays molten beyond the resin\'s thermal budget.',
            'Shear-heat simulation — predict localized temperature spikes at gates; > 30 °C rise warns of gelation in PP, ABS.',
          ],
        },
      ],
    },
    {
      id: 'corrective-actions',
      title: '4. Corrective & Preventive Actions',
      blocks: [
        { type: 'heading', level: 3, text: '4.1 In-process adjustments' },
        {
          type: 'list',
          items: [
            'Black specks appearing → run a high-velocity purge with a chemical purging compound to scrub the barrel and manifold.',
            'Fish-eyes (unmelts) → raise rear-zone barrel temperature and increase back pressure to improve melt homogeneity.',
            'Shear-driven gels at gate → drop injection speed or implement a multi-stage velocity profile (slow through gate, fast through body).',
          ],
        },
        { type: 'heading', level: 3, text: '4.2 Process optimization' },
        {
          type: 'list',
          items: [
            'Multi-stage injection ("velocity profile") — slow start across gate, fast fill mid-part to prevent both shear gels and premature freeze unmelts.',
            'In hot runner systems, keep manifold temperature 5–10 °C below barrel temperature when fill pressure allows — reduces thermal load during longest residence.',
            'Generate a viscosity curve (η vs. injection speed) for every new mold to find the stable processing plateau.',
            'Use Decoupled Molding (Decoupled II) to separate fill from pack — better control of flow-front velocity, the primary driver of cosmetic gel defects.',
          ],
        },
        { type: 'heading', level: 3, text: '4.3 Mold design improvements' },
        {
          type: 'list',
          items: [
            'Cold runners — add and properly size cold-slug wells at the end of the sprue and runner branches to trap nozzle-tip cold material.',
            'Hot runners — specify rheologically (not just geometrically) balanced manifolds with polished flow channels and large fillet radii; eliminate sharp elbows and recesses at nozzle drops.',
            'Increase gate size to reduce shear restriction; relocate gates to thicker sections to stabilize the flow front and avoid jetting.',
            'Maintain uniform wall thickness to eliminate flow hesitation and race-tracking that cause localized shear variations.',
            'Vent ≥ 30 % of part perimeter to prevent diesel-effect burn that mimics gels.',
          ],
        },
        { type: 'heading', level: 3, text: '4.4 Material handling & formulation' },
        {
          type: 'list',
          items: [
            'Specify resins with narrow molecular weight distribution and a robust antioxidant (A/O) package — radical scavengers neutralize cross-linking initiators.',
            'For long-flow parts, use higher-flow grades to reduce required injection pressure and shear heat.',
            'Dry hygroscopic resins (PC, PA, PET, PBT) to TDS spec; verify with a moisture analyzer rather than trusting the dryer setpoint.',
            'Limit and qualify regrind ratio; isolate regrind from contamination during reclaim.',
          ],
        },
        { type: 'heading', level: 3, text: '4.5 Machine maintenance' },
        {
          type: 'list',
          items: [
            'Pull and measure the screw every ~100,000 cycles — a 0.005" flight clearance increase significantly raises unmelt gel risk.',
            'Inspect check ring, nozzle tip, and adapter interfaces for wear, burrs, and step misalignment.',
            'Audit hot runner controllers — replace drifting thermocouples; specify high-end controllers with soft-start to prevent heat-up overshoot.',
            'Thermal-image the manifold during steady-state production — all zones should track within ±2 °C of set point.',
          ],
        },
      ],
    },
    {
      id: 'case-studies',
      title: '5. Real-World Case Studies',
      blocks: [
        { type: 'heading', level: 3, text: 'Automotive — PC headlamp lens "fish-eyes"' },
        {
          type: 'paragraph',
          text:
            'A Tier 1 supplier of PC automotive headlamp lenses had intermittent haze and fish-eye defects on Class A surfaces. Polarized light microscopy identified high-MW entanglements (physical gels). Root cause: hot runner residence time at a 45 s cycle exceeded the resin\'s stability limit. Solution: rheologically balanced manifold with polished channels and a 10 °C barrel temperature reduction eliminated the inclusions without sacrificing fill pressure.',
        },
        { type: 'heading', level: 3, text: 'Medical — PP syringe hub brittle failures' },
        {
          type: 'paragraph',
          text:
            'A medical PP syringe manufacturer saw localized brittle failures during hub-to-needle assembly. Cross-sections showed gels near the gate. FTIR identified highly cross-linked PP. Cause: injection speed pushed for a 6 s cycle generated extreme shear heating at the sub-gate. A multi-stage profile (slow through gate, fast through body) eliminated the cross-linked gels.',
        },
        { type: 'heading', level: 3, text: 'Consumer — High-gloss ABS laptop housing pips' },
        {
          type: 'paragraph',
          text:
            'High-gloss ABS housings had post-paint surface "pips" first assumed to be dust. SEM/EDX showed charred polybutadiene. Root cause: a small recess in the hot runner nozzle drop was a stagnant zone where material hung up and degraded over days of production. A redesigned nozzle tip eliminated the dead spot.',
        },
      ],
    },
    {
      id: 'best-practices',
      title: '6. Industry Best Practices & Standards',
      blocks: [
        {
          type: 'table',
          columns: ['Standard / Practice', 'Application'],
          rows: [
            ['ISO 1133 / ASTM D1238 (MFR)', 'Track melt flow rate virgin → molded; > 20 % shift indicates degradation and gel risk'],
            ['ISO 1133-2', 'Stringent variant for moisture-sensitive resins (PC, PET, PA) where time-temperature history is critical'],
            ['Scientific Molding (viscosity curve)', 'Identify stable injection-speed plateau least likely to generate shear gels'],
            ['Decoupled II Molding', 'Separate fill and pack stages for tighter flow-front velocity control'],
            ['Startup / shutdown SOP', 'Never heat-soak ABS, POM, PVC during shift change — bank to ~120 °C or purge with PP'],
          ],
        },
        { type: 'heading', level: 3, text: 'Emerging technology' },
        {
          type: 'list',
          items: [
            'IoT manifold sensors monitor melt pressure/temperature in real time; pressure spikes correlated with stagnation flag suspect parts via the MES.',
            'AI-driven process optimization detects gel-event signatures in injection pressure curves (a gel\'s higher viscosity creates a momentary resistance) and adjusts hold pressure in real time.',
            'Self-healing polymer additives migrate to molecular stress sites and quench cross-linking radicals before gels form.',
          ],
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: '7. Troubleshooting Flow',
      blocks: [
        {
          type: 'orderedList',
          items: [
            'Material verification — Is the resin dried to spec? Is the regrind ratio too high? Reduce regrind to test.',
            'Process audit — Compare current melt temperature to TDS. Lower 10 °C if at the high end. Check shot-to-shot fill time consistency (erratic = screw wear / failing check valve).',
            'Hardware inspection (hot runner) — Thermal-image the manifold; all zones within ±2 °C of set point.',
            'Hardware inspection (cold runner) — Inspect nozzle tip for frozen material; verify cold slug well is clean and properly sized.',
            'Confirmation tests — High-velocity purge: gels clear momentarily → residence time issue. Reduce injection speed: gels clear → shear heating issue. Pull screw: wear → mechanical instability. Run Moldflow: stagnant zones → design flaw.',
          ],
        },
      ],
    },
  ],
  references: [
    { id: 'R1', text: 'Polymer Gels: Classification and Recent Developments in Biomedical Applications. PMC.' },
    { id: 'R2', text: 'Troubleshooting and Mitigating Gels in Polyethylene Film Products.' },
    { id: 'R3', text: 'MD Plastics. Melting in Screw Extruders: Causes.' },
    { id: 'R4', text: 'Sterilization Packaging Manufacturers Council FAQ — Gels in Extrusions.' },
    { id: 'R5', text: 'Intertek. Evaluating Gels in Plastics: Methods, Causes & Quality Control.' },
    { id: 'R6', text: 'The Madison Group. Using Data to Pinpoint Cosmetic Defect Causes in Injection Molded Parts.' },
    { id: 'R7', text: 'Mold-Masters / MHS. Hot Runner Manifolds Explained.' },
    { id: 'R8', text: 'Beaumont Technologies. Rheologically Balanced Manifold Design.' },
    { id: 'R9', text: 'Ampacet Corporation. Solutions for Problems With Gels.' },
    { id: 'R10', text: 'Plastics Today. Top 10 Injection Molding Mistakes and How to Fix Them.' },
    { id: 'R11', text: 'Autodesk Moldflow. Residence Time and Shear Heat Simulation Documentation.' },
    { id: 'R12', text: 'Moldex3D 2026 Product Documentation — Flow, Cooling, Warpage and Defect Prediction.' },
    { id: 'R13', text: 'Goettfert. MFR Standards: ISO 1133 and ASTM D1238.' },
    { id: 'R14', text: 'ZwickRoell. ISO 1133 Melt Flow Index Plastics.' },
    { id: 'R15', text: 'MDPI. Enhancing the Product Quality of the Injection Process Using eXplainable AI.' },
  ],
};
