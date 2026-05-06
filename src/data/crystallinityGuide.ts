import type { KnowledgeGuide } from './fountainFlowGuide';
import crystallinityFundamentals from '@/assets/crystallinity-fundamentals.jpg';
import crystallinitySkinCore from '@/assets/crystallinity-skin-core.jpg';
import crystallinityProcessVariables from '@/assets/crystallinity-process-variables.jpg';
import crystallinityRunnerComparison from '@/assets/crystallinity-runner-comparison.jpg';
import crystallinityDefects from '@/assets/crystallinity-defects.jpg';

export const crystallinityGuide: KnowledgeGuide = {
  slug: 'crystallinity-in-plastics',
  title: 'Crystallinity in Plastics & Injection Molding',
  summary:
    'Complete technical guide from first principles to shop-floor optimization — covering polymer science fundamentals, material-by-material behavior, process variables, cold vs hot runner analysis, mold design, defects, and troubleshooting.',
  sections: [
    /* ───────── Section 1: Foundations ───────── */
    {
      id: 'foundations',
      title: 'Foundations',
      blocks: [
        { type: 'heading', level: 2, text: 'What Crystallinity Is' },
        {
          type: 'paragraph',
          text: 'Crystallinity is the fraction and arrangement of polymer chain segments that have folded, aligned, and packed into ordered regions during cooling from the melt. Injection molding drives resin through a specific temperature, shear, pressure, and time history that determines whether chains remain randomly entangled, become oriented, form crystalline lamellae, grow into spherulites, or freeze before meaningful order develops.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Semicrystalline, Not Fully Crystalline',
          text: 'The correct term for PP, PE, PA, POM, PBT, PET, PPS, and PEEK is semicrystalline. A molded part contains crystalline regions embedded in amorphous material. The practical target is not maximum crystallinity — it is stable, repeatable, fit-for-function morphology.',
        },
        {
          type: 'image',
          src: crystallinityFundamentals,
          alt: 'Crystallinity fundamentals — polymer chain diagram with amorphous regions vs ordered crystalline lamellae and spherulite structure',
          figureNumber: 'Figure B-1',
          caption: 'Polymer chains with amorphous regions and crystalline lamellae: the same chain can contain ordered and disordered segments.',
        },
        {
          type: 'table',
          caption: 'Key Structural Terms',
          columns: ['Term', 'Meaning for Injection Molding'],
          rows: [
            ['Perfect crystal', 'Theoretical fully ordered structure. Normal injection molded polymers do not reach this state.'],
            ['Crystalline region', 'Local ordered domain where chain segments pack into a periodic arrangement.'],
            ['Lamella', 'Thin folded-chain crystalline plate, roughly 5–30 nm thick.'],
            ['Spherulite', 'Radial aggregate of lamellae growing from a nucleus — micrometers to hundreds of micrometers.'],
            ['Tie molecule', 'Chain segment bridging crystalline regions through amorphous material. Critical for toughness.'],
            ['Amorphous region', 'Disordered chain volume between crystals. Provides ductility, stress relaxation, and transparency in some polymers.'],
            ['Nucleation', 'Birth of a stable crystal embryo — usually heterogeneous in production (fillers, pigments, mold walls).'],
            ['Crystal growth', 'Addition and folding of chain segments onto existing nuclei while mobility and driving force remain favorable.'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Polymers do not crystallize like metals. Chain segments must diffuse, rotate, fold, disentangle, and pack while the material is simultaneously cooling. Thermodynamics says whether order is favorable; kinetics decides whether chains had enough time and mobility to get there.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Mental Model',
          text: 'The processor does not directly set "percent crystallinity" on the machine. The processor sets a temperature-pressure-shear-time pathway. The morphology is the consequence of that pathway plus the resin formulation and mold design.',
        },
      ],
    },

    /* ───────── Section 2: How Crystallization Happens ───────── */
    {
      id: 'crystallization-mechanism',
      title: 'Crystallization Mechanism',
      blocks: [
        { type: 'heading', level: 2, text: 'How Crystallization Actually Happens' },
        {
          type: 'paragraph',
          text: 'The molding cycle creates crystallinity in stages. Each stage leaves a fingerprint on the final morphology.',
        },
        {
          type: 'table',
          caption: 'Crystallization Stages During the Molding Cycle',
          columns: ['Stage', 'What Is Happening', 'Crystallinity Consequence'],
          rows: [
            ['1. Dry / Feed', 'Pellets are dried if required and fed into the barrel.', 'Moisture state and pellet history set viscosity, hydrolysis risk, and starting thermal condition.'],
            ['2. Melting / Plasticizing', 'Screw rotation conveys, compresses, melts, mixes, and meters resin.', 'Existing crystals melt; crystal memory may be erased or partially retained depending on temperature and residence.'],
            ['3. Shot Accumulation', 'Melt waits in front of the screw and in hot-runner manifolds/drops/tips.', 'Residence time and local hot spots change molecular weight, nucleation, and viscosity.'],
            ['4. Fill', 'Melt enters cavity under pressure through runner and gate restrictions.', 'Fountain flow puts hot melt against cold steel. High shear near walls can trigger flow-induced crystallization.'],
            ['5. Pack / Hold', 'After transfer, pressure feeds more melt while the gate remains open.', 'Compensates crystallization shrinkage and raises local density. Ends when gate seals.'],
            ['6. Cooling', 'Heat leaves through steel and coolant; skin cools fastest, core slowest.', 'Nuclei form and lamellae grow. Core usually has more time for spherulitic crystallization than skin.'],
            ['7. Ejection', 'Part leaves the mold with residual temperature gradients and stresses.', 'If core remains above a relevant transition, post-mold shrinkage and warp can continue.'],
            ['8. Conditioning / Service', 'Part equilibrates to ambient humidity and temperature or sees service heat.', 'Relaxation, moisture uptake, annealing, or secondary crystallization can change dimensions and properties.'],
          ],
        },
        {
          type: 'image',
          src: crystallinitySkinCore,
          alt: 'Skin-core morphology cross-section showing frozen skin, shear-affected subskin, and spherulitic core layers',
          figureNumber: 'Figure D-1',
          caption: 'Quenched skin, shear-affected subskin, and slower-cooling spherulitic core develop different crystallinity and orientation across the wall.',
          lookFor: {
            tone: 'info',
            title: 'Wall Morphology Layers',
            items: [
              'Layer 1 — Amorphous/Frozen Skin (0.05–0.2 mm): instantaneous quenching against cold steel',
              'Layer 2 — Shear-Affected Subskin (0.1–0.5 mm): flow-induced crystallization with shish-kebab morphology',
              'Layer 3 — Quiescent Spherulitic Core (60–80% of wall): slow cooling allows large spherulitic growth',
            ],
          },
        },
        {
          type: 'paragraph',
          text: 'Flow-induced crystallization is important in high-shear regions. Stretched and aligned chains can form shish-kebab morphology where fibrillar chain bundles ("shish") template perpendicular folded-chain lamellae ("kebabs"). This raises local stiffness and anisotropy.',
        },
        {
          type: 'table',
          caption: 'Enthalpy of Fusion Reference (DSC Testing)',
          columns: ['Polymer', 'Theoretical Heat of Fusion (100% Crystalline)'],
          rows: [
            ['Polyoxymethylene (POM)', '326 J/g'],
            ['Polyethylene (PE)', '293 J/g'],
            ['Polyamide 66 (PA66)', '226 J/g'],
            ['Polypropylene (PP)', '207 J/g'],
            ['Polyethylene Terephthalate (PET)', '140 J/g'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Gate Seal Connection',
          text: 'Crystallinity and gate seal are coupled. Crystallization causes densification while the part is cooling. If the gate is open, pack can compensate. If the gate is sealed, the cavity is isolated and remaining shrinkage becomes dimensional change or internal defects.',
        },
      ],
    },

    /* ───────── Section 3: Semi-Crystalline vs Amorphous ───────── */
    {
      id: 'semicrystalline-vs-amorphous',
      title: 'Semi-Crystalline vs Amorphous',
      blocks: [
        { type: 'heading', level: 2, text: 'Semicrystalline vs Amorphous Plastics' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Most Expensive Troubleshooting Error',
          text: 'Treating every polymer as though it crystallizes. ABS and PC are not fixed by "crystallinity control" in the same sense as PP, PA, POM, PBT, or PEEK.',
        },
        {
          type: 'table',
          caption: 'Semicrystalline vs Amorphous Comparison',
          columns: ['Topic', 'Semicrystalline', 'Amorphous'],
          rows: [
            ['Thermal behavior', 'Have a true melting range (Tm) and usually a Tg.', 'Have Tg but no crystalline melting point. Soften over a range above Tg.'],
            ['Structure', 'Two phases: ordered lamellae/spherulites plus amorphous regions.', 'Primarily disordered chain packing; may have orientation but not lamellar crystalline domains.'],
            ['Shrinkage', 'Higher, more time-dependent, often more anisotropic.', 'Usually lower and more predictable.'],
            ['Optics', 'Crystals scatter light; often translucent to opaque.', 'Often clearer when unfilled, dry, and stress-free.'],
            ['Chemical resistance', 'Often stronger — tight packing limits solvent penetration.', 'Often more solvent-sensitive.'],
            ['Process sensitivity', 'Mold temp, gate seal, pack, cooling strongly affect morphology.', 'Mold temp affects stress, gloss, replication but not crystallization.'],
            ['Typical examples', 'PP, PE, PA6, PA66, POM, PBT, PET, PPS, PEEK.', 'ABS, PC, PC/ABS, SAN, PMMA, PS.'],
          ],
        },
        { type: 'heading', level: 3, text: 'Material-by-Material Behavior' },
        {
          type: 'table',
          caption: 'Teaching Bands by Polymer Family',
          columns: ['Family', 'State', 'Thermal Guide', 'Mold Temp Band', 'Key Risks'],
          rows: [
            ['PP homo/copolymer', 'Semicrystalline', 'Tg ≈ -10–0°C; Tm ≈ 160–168°C', '20–80°C', 'Shrinkage, warpage, opacity, gate blush, post-mold drift'],
            ['HDPE / LDPE', 'Semicrystalline', 'HDPE Tm ≈ 128–136°C', '20–60°C', 'Density change, shrinkage, warpage, thick-section drift'],
            ['PA6 / PA66', 'Semicrystalline, hygroscopic', 'PA6 Tm ≈ 220°C; PA66 Tm ≈ 255–265°C', '60–100°C', 'Moisture effects, hydrolysis, post-mold conditioning, brittle dry parts'],
            ['POM / Acetal', 'Semicrystalline', 'Tm ≈ 165–180°C', '80–120°C', 'High shrinkage, voids/sink if underpacked, formaldehyde risk'],
            ['PBT', 'Semicrystalline polyester', 'Tm ≈ 220–225°C', '40–100°C', 'Hydrolysis, glass-fiber anisotropy, warp, poor surface'],
            ['PET', 'Condition-dependent', 'Tm ≈ 245–255°C; Tg ≈ 70–80°C', 'Cold for clarity; hot for heat resistance', 'IV loss from moisture, haze, crystallization shrink'],
            ['PPS', 'Semicrystalline high-perf', 'Tm ≈ 280–285°C', '120–160°C', 'Under-crystallized skins, weld weakness, brittle response'],
            ['PEEK / PAEK', 'Semicrystalline high-perf', 'Tm ≈ 343°C; Tg ≈ 143°C', '160–200°C', 'Amorphous skins, delayed crystallization, high-value scrap'],
            ['ABS', 'Amorphous', 'Tg ≈ 100–110°C', '40–80°C', 'Residual stress, gloss, weld lines — not crystallinity'],
            ['PC', 'Amorphous', 'Tg ≈ 145°C', '80–120°C', 'Stress cracking, birefringence, haze — not crystallization'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Shop-Floor Rule',
          text: 'Before diagnosing a defect as crystallinity-driven, ask: Is this resin semicrystalline under normal injection molding? If not, pivot to stress, cooling, moisture, degradation, venting, packing, or contamination.',
        },
      ],
    },

    /* ───────── Section 4: Property Effects ───────── */
    {
      id: 'property-effects',
      title: 'Property Effects',
      blocks: [
        { type: 'heading', level: 2, text: 'Effect of Crystallinity on Material Properties' },
        {
          type: 'paragraph',
          text: 'Tight chain packing reduces free volume, increases density, restricts molecular motion, creates harder domains, scatters light, and increases shrinkage that must be compensated during molding.',
        },
        {
          type: 'table',
          caption: 'Property Trends with Crystallinity Change',
          columns: ['Property', 'When Xc Increases', 'When Xc Decreases', 'Exception / Caution'],
          rows: [
            ['Density', 'Increases — crystalline domains pack more tightly.', 'Lower density, more free volume.', 'Voids and fillers can confound measurement.'],
            ['Volumetric shrinkage', 'Increases — specific volume decreases during crystal growth.', 'Decreases but post-mold crystallization may occur later.', 'Packing can compensate only before gate seal.'],
            ['Warpage', 'Risk increases if crystallinity is nonuniform.', 'Risk still exists from frozen stress and differential cooling.', 'Uniform crystallinity is more important than maximum.'],
            ['Stiffness / Modulus', 'Usually increases.', 'Usually decreases.', 'Impact copolymers and moisture can reverse expectations.'],
            ['Tensile strength', 'Often increases to an optimum.', 'May decrease if morphology is underdeveloped.', 'Coarse spherulites and weak welds lower practical strength.'],
            ['Elongation / Ductility', 'Often decreases — crystals restrict deformation.', 'Often increases, but residual stress may embrittle.', 'Tie molecules and MW dominate toughness.'],
            ['Impact resistance', 'Can improve or decline depending on morphology.', 'Can improve if stress is low.', 'Do not assume "more crystalline = more brittle" without testing.'],
            ['Heat deflection', 'Usually improves.', 'Usually declines.', 'Under-crystallized PEEK/PPS/PET can fail heat requirements.'],
            ['Chemical resistance', 'Usually improves — lower solvent diffusion.', 'Usually weaker.', 'Stress cracking can still occur with high molded-in stress.'],
            ['Transparency', 'Usually decreases — crystals scatter light.', 'Usually increases if stress and inclusions are low.', 'Clarifiers create small crystals to reduce scattering in PP.'],
            ['Dimensional stability', 'Improves when crystallization is completed uniformly in-mold.', 'Can be stable if stresses are low.', 'Under-crystallized parts may drift later.'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Most Useful Production Rule',
          text: 'For precision semicrystalline parts, a lower-shrink part at ejection is not automatically better. It may be under-crystallized and waiting to shrink later. Evaluate dimensions over time and after service-temperature exposure.',
        },
      ],
    },

    /* ───────── Section 5: Process Variables ───────── */
    {
      id: 'process-variables',
      title: 'Process Variables',
      blocks: [
        { type: 'heading', level: 2, text: 'Injection Molding Process Variables That Control Crystallinity' },
        {
          type: 'paragraph',
          text: 'This is the operating core of the manual. Each setting affects crystallinity through temperature history, shear orientation, pressure/density, gate seal timing, residence degradation, nucleation, cooling rate, or post-mold drift. Do not change multiple variables without recording logic and measuring output.',
        },
        {
          type: 'image',
          src: crystallinityProcessVariables,
          alt: 'Process variables controlling crystallinity — injection molding machine with labeled control points',
          figureNumber: 'Figure I-1',
          caption: 'Key process variables and their mechanisms for controlling crystallinity.',
        },
        {
          type: 'table',
          caption: 'Process Variable Matrix',
          columns: ['Variable', 'If Raised', 'If Lowered', 'Guidance'],
          rows: [
            ['Melt temperature', 'Improves flow, may erase nuclei, extends cooling, raises degradation risk.', 'Raises viscosity/pressure, may preserve nuclei, can cause poor melt and welds.', 'Measure actual melt — do not rely only on barrel setpoints.'],
            ['Mold surface temperature', 'More crystal growth, lower residual stress, more shrink; possible longer cycle.', 'Quench skin, lower Xc, high stress, post-mold drift.', 'Measure steel surface, not only TCU setpoint.'],
            ['Injection speed', 'More orientation/FIC, shear heat, gate blush, reduced freeze during fill.', 'Less shear, more premature freeze, hesitation, poor welds.', 'Use velocity profiling near gates/welds if needed.'],
            ['V/P transfer', 'Later transfer can overfill, flash, high stress.', 'Earlier transfer can underfill, sink, low density.', 'Optimize with short-shot and cavity pressure when available.'],
            ['Pack pressure', 'Raises density, reduces sink/voids; excessive stress/flash possible.', 'Underpack, shrink, voids, lower local density.', 'Only effective before gate seal.'],
            ['Pack / Hold time', 'Effective until gate seal; beyond seal wastes cycle.', 'Premature end causes sink and drift.', 'Run weight-vs-hold-time study.'],
            ['Cooling time', 'More in-mold crystallization and stability; longer cycle.', 'Hot ejection, distortion, post-mold drift.', 'Use ejection temperature and dimensional aging, not guesswork.'],
            ['Residence time', 'More degradation, color shift, viscosity loss.', 'Usually safer thermally.', 'Audit barrel + hot runner + shot size.'],
            ['Screw RPM', 'More shear heat, mixing, possible degradation.', 'Cooler, less mixing, longer recovery.', 'Track recovery consistency.'],
            ['Back pressure', 'Better mixing; more heat and possible degradation.', 'Less shear heat; poor mixing or air entrapment.', 'Use enough for stable melt, not as a brute-force heater.'],
            ['Regrind percentage', 'More variability; possible faster nucleation or degradation.', 'Virgin-only is more stable but cost/sustainability tradeoff.', 'Control percent, history, drying, and blend uniformity.'],
            ['Moisture content', 'Wet resin can splay, hydrolyze, lower MW, alter Xc.', 'Overdrying can embrittle certain materials.', 'Use moisture analyzer when critical.'],
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Order of Operations for Process Changes',
          text: '1) Confirm actual material condition. 2) Confirm actual melt and mold surface temperature. 3) Establish fill-only baseline. 4) Establish gate seal. 5) Optimize pack. 6) Optimize cooling. 7) Validate dimensions over time. Random setpoint changes create folklore, not process knowledge.',
        },
      ],
    },

    /* ───────── Section 6: Cold Runner vs Hot Runner ───────── */
    {
      id: 'runner-comparison',
      title: 'Cold vs Hot Runner',
      blocks: [
        { type: 'heading', level: 2, text: 'Cold Runner vs Hot Runner: Full Comparative Analysis' },
        {
          type: 'paragraph',
          text: 'Cold runners and hot runners produce different crystallization outcomes because they deliver different thermal histories. A cold runner cools and freezes every shot. A hot runner keeps the delivery path molten across shots, changing residence time, gate seal mechanism, pack transmission, scrap/regrind, startup/shutdown risk, and gate-zone morphology.',
        },
        {
          type: 'image',
          src: crystallinityRunnerComparison,
          alt: 'Cold runner vs hot runner crystallinity effects comparison with gate freeze-off mechanisms',
          figureNumber: 'Figure J-1',
          caption: 'Gate freeze-off kinetics and runner-system comparison. Weight-vs-hold-time plateau identifies natural gate seal in freeze-controlled systems.',
        },
        {
          type: 'table',
          caption: 'Runner System Comparative Analysis',
          columns: ['Factor', 'Cold Runner', 'Hot Runner', 'Crystallinity Impact'],
          rows: [
            ['Thermal history', 'Sprue/runner/gate cool every shot; less continuous hot dwell.', 'Manifold/drops/tips keep resin molten; added heated residence.', 'Hot runner delivers warmer melt but adds degradation risk.'],
            ['Gate seal', 'Physical freeze of gate land — clear and weight-study friendly.', 'Open tips seal by viscosity/pressure; valve gates seal mechanically.', 'Changes pack window and gate-area crystallinity.'],
            ['Pack transmission', 'Limited by progressive runner/gate freeze.', 'More direct hydraulic connection while manifold is molten.', 'Hot runner may pack more efficiently and consistently.'],
            ['Residence degradation', 'Shorter hot exposure but regrind adds heat history.', 'Long exposure possible, especially slow cycles and stoppages.', 'MW and nucleation behavior can drift.'],
            ['Regrind', 'Runner scrap reused; changes nucleation, moisture, degradation.', 'Minimal runner scrap; less regrind pressure.', 'Cold runner with uncontrolled regrind has more material-state variation.'],
            ['Gate-zone crystallinity', 'Gate cools from steel; moderate/high Xc near frozen gate.', 'Heated gate can delay crystallization or create amorphous halo.', 'Local properties near gate may differ from body.'],
            ['Cycle time', 'Runner cooling can dominate cycle.', 'No cold runner cooling burden; cavity cooling remains.', 'Hot runner may shorten cycle but increases thermal-control burden.'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Stack Mold Note',
          text: 'Different mold levels can have different thermal paths. Upper cavities may be closer to a colder clamp plate and freeze earlier. Lower cavities may receive heat through manifold/support structures and freeze later. Treat stack molds as cavity-level thermal systems, not as one average mold.',
        },
      ],
    },

    /* ───────── Section 7: Mold & Equipment ───────── */
    {
      id: 'mold-equipment',
      title: 'Mold & Equipment',
      blocks: [
        { type: 'heading', level: 2, text: 'Mold Design Effects on Crystallinity' },
        {
          type: 'paragraph',
          text: 'The mold controls local heat extraction and local shear. Crystallinity is designed into the tool before it is adjusted at the press. A process cannot fully compensate for a gate that freezes too early, a thick rib cooling 5× slower than the nominal wall, a dead-ended cooling channel, or a blocked baffle.',
        },
        {
          type: 'table',
          caption: 'Mold Feature Effects',
          columns: ['Tool Feature', 'Mechanism', 'Crystallinity / Part Effect', 'Action'],
          rows: [
            ['Gate type', 'Controls shear, pressure drop, seal mechanism.', 'Small tunnel: fast freeze/high shear; Fan: lower shear; Valve: mechanical seal.', 'Select gate based on pack window and morphology.'],
            ['Gate size / land', 'Controls gate freeze time and pressure loss.', 'Undersized: early seal, underpack, sink/voids. Oversized: delay seal.', 'Run gate-freeze and pressure-drop studies.'],
            ['Wall thickness', 'Thick areas cool slowly, crystallize and shrink more.', 'Thin-to-thick transitions create differential Xc and warpage.', 'Use uniform walls, coring, ribs, gradual transitions.'],
            ['Cooling channels', 'Control mold-surface temperature and local gradients.', 'Far/blocked/uneven channels create hot spots and Xc variation.', 'Design for turbulent flow, balanced circuits.'],
            ['Core / Cavity balance', 'Different sides crystallize differently.', 'Hot core side shrinks more and pulls part toward it.', 'Map both halves; use conformal cooling, bubblers, baffles.'],
            ['Venting', 'Poor venting causes burns, shorts, hesitation.', 'Hesitation cools local melt and changes structure.', 'Maintain vent depth, clean vents.'],
            ['Ejection design', 'Hot, under-crystallized cores deform during ejection.', 'Pins can mark or distort semi-solid areas.', 'Use adequate cooling and ejection area.'],
          ],
        },
        { type: 'heading', level: 3, text: 'Machine and Equipment Effects' },
        {
          type: 'paragraph',
          text: 'Machine settings are only as real as the equipment executing them. A press can display stable numbers while actual melt temperature, shot size, check-ring seal, or coolant flow is drifting.',
        },
        {
          type: 'table',
          caption: 'Equipment Impact on Crystallinity',
          columns: ['Equipment Item', 'What It Controls', 'Crystallinity Relevance'],
          rows: [
            ['Screw design', 'Melt quality, shear heat, unmelt risk, residence.', 'Affects Xc through melt homogeneity and thermal history.'],
            ['Non-return valve', 'Shot and pack consistency.', 'Worn NRV causes weight/density variation mimicking Xc scatter.'],
            ['Nozzle condition', 'Cold slug, drool, pressure loss, heat transfer.', 'Cold slugs cause weak morphology; hot nozzles cause drool/degradation.'],
            ['Heater bands / TCs', 'Barrel/nozzle temperatures.', 'Failed hardware changes actual melt without obvious setup change.'],
            ['TCU / Chiller', 'Mold-surface temperature via coolant.', 'Fouled lines and low flow cause local Xc variation.'],
            ['Hot-runner controller', 'Manifold, drops, tips, valve gates.', 'Zone drift creates cavity-specific thermal history and gate-zone Xc variation.'],
            ['Cavity pressure sensors', 'Actual pressure-time history inside the tool.', 'Best method to connect pack, gate seal, viscosity, and dimensions.'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Direct vs Indirect Causation',
          text: 'Clamp force, platen parallelism, and robot takeout do not directly change crystal lattices. They can indirectly change the part by altering venting, flash, cooling time, ejection temperature, or handling distortion. Keep root-cause language precise.',
        },
      ],
    },

    /* ───────── Section 8: Defects & Troubleshooting ───────── */
    {
      id: 'defects-troubleshooting',
      title: 'Defects & Troubleshooting',
      blocks: [
        { type: 'heading', level: 2, text: 'Defects, Failure Modes, and Troubleshooting' },
        {
          type: 'paragraph',
          text: 'Separate crystallinity defects from crystallinity-adjacent defects. Warpage, sink, voids, brittleness, opacity, and dimensional drift can be morphology-driven. Splay is usually moisture or volatile degradation. Burns are venting and thermal degradation. Identify which history changed: thermal, pressure, shear, moisture, contamination, or handling.',
        },
        {
          type: 'image',
          src: crystallinityDefects,
          alt: 'Crystallinity defects and troubleshooting flowchart — warpage, sink marks, voids, brittleness, dimensional drift',
          figureNumber: 'Figure M-1',
          caption: 'Common crystallinity-related defects with diagnostic flowchart.',
        },
        {
          type: 'table',
          caption: 'Defect Troubleshooting Matrix',
          columns: ['Defect', 'Crystallinity Mechanism', 'Adjacent Causes', 'Confirm With', 'Corrective Actions'],
          rows: [
            ['Warpage', 'Differential Xc and shrinkage from uneven cooling, wall thickness, or fiber orientation.', 'Uneven pack, mold distortion, ejection, handling.', 'Map mold surface temps, part weight, dimensions over time.', 'Balance cooling, correct wall transitions, establish gate seal.'],
            ['Sink marks', 'Core crystallization shrink not compensated before gate seal.', 'Low pack, short hold, thick section, small gate.', 'Weight-vs-hold-time study; cross-section for voids.', 'Increase pack before gate seal, enlarge gate, reduce thick mass.'],
            ['Voids', 'Internal shrinkage cavity from isolated core contraction.', 'Moisture/gas, poor venting, decompression air.', 'Cut section, density, weight trend, moisture test.', 'Improve packing/gate, dry resin, vent.'],
            ['Brittleness', 'Coarse spherulites, low tie molecules, under-crystallization with stress.', 'Degradation, contamination, dry PA, notch, weld weakness.', 'DSC/density plus impact/tensile, moisture, melt-flow shift.', 'Correct drying/dwell, mold temp, nucleation, gate/weld design.'],
            ['Dimensional drift', 'Post-mold crystallization or stress relaxation.', 'Moisture uptake, handling fixture, conditioning change.', 'Measure at ejection, 24 h, 72 h, heat/humidity exposure.', 'Increase in-mold cooling, raise mold temp, controlled anneal.'],
            ['Opacity / Haze', 'Local Xc or spherulite size variation.', 'Colorant, contamination, moisture, surface texture.', 'Visual map vs temp map; microscopy/DSC/density.', 'Stabilize mold temp, gate temp, cooling, lot/additives.'],
            ['Gate blush / Halo', 'Local shear orientation and thermal gradient near gate.', 'Too small gate, high velocity, hot tip.', 'Short shot, gate pressure, microscopy near gate.', 'Increase gate, profile speed, adjust tip temp.'],
            ['Weld-line weakness', 'Low temperature and poor interdiffusion; local morphology incomplete.', 'Venting, contamination, low melt/mold temp, fiber orientation.', 'Tensile/weld testing, vent inspection, short shots.', 'Increase local temperature, improve venting, relocate gate.'],
            ['Cracking / ESC', 'Residual stress and morphology raise chemical sensitivity.', 'Wrong material, chemical exposure, notch, assembly stress.', 'Stress solvent test, DSC/density, fracture analysis.', 'Reduce stress, optimize crystallinity, change material/geometry.'],
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Processor Translation',
          text: 'Crystallinity control is not "run it hotter" or "run it colder." The correct workflow is: confirm the resin and drying state, measure actual melt and mold surface temperature, establish gate seal, confirm cavity balance, map weight and shrinkage, validate with DSC or density when needed, then lock the window with alarms and reaction plans.',
        },
      ],
    },
  ],
};
