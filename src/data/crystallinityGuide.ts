import type { KnowledgeGuide } from "./fountainFlowGuide";
import crystallinityFundamentals from "@/assets/crystallinity-fundamentals.jpg";
import crystallinitySkinCore from "@/assets/crystallinity-skin-core.jpg";
import crystallinityProcessVariables from "@/assets/crystallinity-process-variables.jpg";
import crystallinityRunnerComparison from "@/assets/crystallinity-runner-comparison.jpg";
import crystallinityDefects from "@/assets/crystallinity-defects.jpg";
import crystallinityMolecularChain from "@/assets/crystallinity-molecular-chain.jpg";
import crystallinitySkinCoreMorphology from "@/assets/crystallinity-skin-core-morphology.jpg";
import crystallinityDegreeChart from "@/assets/crystallinity-degree-chart.jpg";
import crystallinityGateFreezeKinetics from "@/assets/crystallinity-gate-freeze-kinetics.jpg";
import crystallinityCoolingRate from "@/assets/crystallinity-cooling-rate.jpg";
import crystallinitySpheruliteStructure from "@/assets/crystallinity-spherulite-structure.jpg";
import crystallinityPropertyTrends from "@/assets/crystallinity-property-trends.jpg";

export const crystallinityGuide: KnowledgeGuide = {
  slug: "crystallinity-in-plastics",
  title: "Crystallinity in Plastics & Injection Molding",
  summary:
    "Complete technical guide from first principles to shop-floor optimization — covering polymer science fundamentals, material-by-material behavior, process variables, cold vs hot runner analysis, mold design, defects, diagnostics, case studies, shop-floor action guides, glossary, and formula sheet. Source: Crystallinity in Plastics and Injection Molding Master Training Manual, 33 pages.",
  sections: [
    /* ───────── Section 1: Executive Summary (Manual §A, pp 3–4) ───────── */
    {
      id: "executive-summary",
      title: "A. Executive Summary",
      blocks: [
        { type: "heading", level: 2, text: "Executive Technical Summary" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section A — Pages 3–4.",
        },
        {
          type: "image",
          src: crystallinityDegreeChart,
          alt: "Degree of crystallinity vs mechanical, thermal, and optical properties",
          figureNumber: "crystallinity",
          caption:
            "Degree of crystallinity changes mechanical, thermal, and optical behavior. (Master Training Manual, Page 1)",
        },
        {
          type: "paragraph",
          text: 'Crystallinity in plastics is the fraction and arrangement of polymer chain segments that have folded, aligned, and packed into ordered regions during cooling from the melt. Injection molding does not simply "make a plastic part"; it drives the resin through a highly specific temperature, shear, pressure, and time history. That history determines whether chain segments remain randomly entangled, become oriented, form small crystalline lamellae, grow into spherulites, connect through tie molecules, or freeze before meaningful order can develop.',
        },
        {
          type: "paragraph",
          text: "The correct production term for common engineering materials such as PP, PE, PA, POM, PBT, PET, PPS, and PEEK is semicrystalline, not fully crystalline. A molded part contains crystalline regions embedded in amorphous material. The practical target is not maximum crystallinity — it is stable, repeatable, fit-for-function morphology.",
        },
        {
          type: "paragraph",
          text: "Crystallinity matters because it changes density, volumetric shrinkage, linear shrinkage, stiffness, tensile behavior, creep resistance, fatigue behavior, heat-deflection behavior, chemical resistance, wear behavior, barrier properties, surface finish, opacity, dimensional stability, and failure mode. The same resin can mold into a dimensionally stable production component or a drifting, warped, brittle, opaque, sink-prone part depending on mold temperature, gate seal, pack/hold profile, cooling balance, residence time, and material condition.",
        },
        {
          type: "table",
          caption: "Control Families — Master Training Manual, Page 3",
          columns: ["Control Family", "Primary Levers", "Why They Matter"],
          rows: [
            [
              "Material",
              "Polymer family, grade, molecular weight, copolymer content, nucleation package, fillers, fibers, moisture, regrind, colorant, flame retardant.",
              "Material chemistry decides whether crystallization can occur and how fast it occurs.",
            ],
            [
              "Process",
              "Melt temperature, mold temperature, injection speed, transfer position, pack pressure, hold time, cooling time, residence time, screw recovery, back pressure, drying, cycle stability.",
              "These variables define the path through the crystallization window and decide how much packing is transmitted before the gate stops accepting material.",
            ],
            [
              "Mold",
              "Gate type/size/location, wall thickness, cooling layout, core/cavity balance, baffles/bubblers, venting, flow length, texture, hot spots, stack-mold thermal path.",
              "The mold defines local heat extraction, shear history, pressure loss, frozen layer growth, and cavity-to-cavity thermal variation.",
            ],
            [
              "Machine/Equipment",
              "Screw, non-return valve, heater bands, thermocouples, nozzle, hot-runner controller, TCU, chiller, coolant flow, cavity pressure sensors.",
              "Equipment condition decides whether the nominal setup actually creates the intended melt state, pressure transmission, and mold-surface temperature.",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Mold temperature is usually the strongest crystallinity lever because it controls the local cooling rate and the time available for polymer chains to rearrange while they are still mobile. Melt temperature is important but frequently misunderstood — higher melt temperature does not automatically create higher crystallinity.",
        },
        {
          type: "callout",
          tone: "success",
          title: "Processor Translation (Page 4)",
          text: 'Crystallinity control is not "run it hotter" or "run it colder." The correct workflow is: confirm the resin and drying state, measure actual melt and mold surface temperature, establish gate seal, confirm cavity balance, map weight and shrinkage, validate with DSC or density when needed, then lock the window with alarms and reaction plans.',
        },
      ],
    },

    /* ───────── Section 2: Foundations (Manual §B, pp 5–6) ───────── */
    {
      id: "foundations",
      title: "B. Foundations",
      blocks: [
        { type: "heading", level: 2, text: "What Crystallinity Is" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section B — Pages 5–6.",
        },
        {
          type: "paragraph",
          text: "Plain-language definition: crystallinity is the amount of molecular order inside the plastic. An amorphous melt resembles a bowl of cooked spaghetti: long chains tangled in random directions. A crystalline region resembles a stack of folded, aligned chain segments packed closely together. A real injection molded semicrystalline part contains both states at the same time: ordered lamellae and spherulites embedded in a disordered amorphous matrix.",
        },
        {
          type: "paragraph",
          text: "Engineering definition: degree of crystallinity, usually written Xc, is the mass fraction or volume fraction of a polymer sample that exists in ordered crystalline domains. In practice, Xc is inferred from thermal analysis, density, X-ray diffraction, spectroscopy, or microscopy. It is sample-location dependent — a gate sample, edge sample, skin sample, core sample, thick rib, thin wall, and weld line can all produce different results from the same molded shot.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Semicrystalline, Not Fully Crystalline",
          text: "The correct term for PP, PE, PA, POM, PBT, PET, PPS, and PEEK is semicrystalline. A molded part contains crystalline regions embedded in amorphous material. Even when a resin crystallizes aggressively, chain length, entanglement, comonomer content, branching, fillers, local cooling gradients, and limited cycle time prevent perfect, defect-free crystallinity.",
        },
        {
          type: "image",
          src: crystallinityMolecularChain,
          alt: "Molecular chain with amorphous region and crystalline lamella",
          figureNumber: "Figure B-1",
          caption:
            "Molecular chain with amorphous region and crystalline lamella: the same long chain can contain ordered and disordered segments. (Master Training Manual, Page 6)",
        },
        {
          type: "table",
          caption: "Key Structural Terms — Section B, Page 5",
          columns: ["Term", "Meaning for Injection Molding"],
          rows: [
            [
              "Perfect crystal",
              "Theoretical fully ordered structure. Normal injection molded polymers do not reach this state.",
            ],
            ["Crystalline region", "Local ordered domain where chain segments pack into a periodic arrangement."],
            ["Lamella", "Thin folded-chain crystalline plate, roughly 5–30 nm thick."],
            [
              "Spherulite",
              "Radial aggregate of lamellae growing from a nucleus — micrometers to hundreds of micrometers.",
            ],
            [
              "Tie molecule",
              "Chain segment bridging crystalline regions through amorphous material. Critical for toughness.",
            ],
            [
              "Amorphous region",
              "Disordered chain volume between crystals. Provides ductility, stress relaxation, and transparency in some polymers.",
            ],
            [
              "Nucleation",
              "Birth of a stable crystal embryo — usually heterogeneous in production (fillers, pigments, mold walls).",
            ],
            [
              "Crystal growth",
              "Addition and folding of chain segments onto existing nuclei while mobility and driving force remain favorable.",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Polymers do not crystallize like metals. Chain segments must diffuse, rotate, fold, disentangle, and pack while the material is simultaneously cooling. Thermodynamics says whether order is favorable; kinetics decides whether chains had enough time and mobility to get there.",
        },
        {
          type: "callout",
          tone: "warning",
          title: "Mental Model (Page 6)",
          text: 'The processor does not directly set "percent crystallinity" on the machine. The processor sets a temperature-pressure-shear-time pathway. The morphology is the consequence of that pathway plus the resin formulation and mold design.',
        },
      ],
    },

    /* ───────── Section 3: Polymer Science Fundamentals (Manual §C, p 7) ───────── */
    {
      id: "polymer-science",
      title: "C. Polymer Science Fundamentals",
      blocks: [
        { type: "heading", level: 2, text: "Polymer Science Fundamentals Required to Understand Crystallinity" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section C — Page 7.",
        },
        {
          type: "paragraph",
          text: "A beginner can understand crystallinity by starting with geometry. Chains that are regular, symmetrical, and mobile can pack. Chains that are bulky, irregular, heavily branched, randomly substituted, crosslinked, degraded, contaminated, or frozen too quickly cannot pack well.",
        },
        {
          type: "table",
          caption: "Polymer Science Fundamentals — Section C, Page 7",
          columns: ["Fundamental", "Injection Molding Significance"],
          rows: [
            [
              "Chain regularity",
              "Regular repeat units and consistent stereochemistry allow neighboring segments to approach and pack. Irregular architecture suppresses lattice formation.",
            ],
            [
              "Tacticity",
              "Isotactic or syndiotactic arrangement can promote crystallinity; atactic randomness usually suppresses crystallization. PP is the shop-floor example.",
            ],
            [
              "Branching",
              "Branching interrupts chain packing. HDPE crystallizes more readily than LDPE because it has less branching.",
            ],
            [
              "Copolymer content",
              "Random comonomers disrupt regularity, slow crystallization, lower melting behavior, and alter shrinkage. Impact copolymer PP is not the same as homopolymer PP.",
            ],
            [
              "Molecular weight",
              "Higher MW increases entanglement and may slow diffusion, but can increase tie-molecule population and toughness. Degradation lowers MW and can change crystallization rate and failure mode.",
            ],
            [
              "Molecular weight distribution",
              "Broad distributions contain short chains that crystallize more readily and long chains that resist diffusion. Processing behavior may change lot to lot.",
            ],
            [
              "Chain mobility",
              "Crystals form only if segments can move. Above Tg the amorphous phase gains mobility; near Tm crystals melt; in the crystallization window mobility and driving force overlap.",
            ],
            [
              "Supercooling",
              "Crystallization usually occurs below the equilibrium melting point. More supercooling increases driving force but too much cooling immobilizes the chains.",
            ],
            [
              "Nucleating agents",
              "Provide many stable starting points. More nuclei usually mean faster crystallization and smaller spherulites.",
            ],
            [
              "Fillers and fibers",
              "Can nucleate crystals and constrain shrinkage. Fibers also create anisotropic shrinkage due to orientation.",
            ],
            [
              "Moisture",
              "In hygroscopic polymers, moisture can plasticize the amorphous phase and, if severe, cause hydrolysis that permanently reduces molecular weight.",
            ],
            [
              "Thermal history",
              "Prior melt exposure, regrind, hot-runner dwell, shutdowns, and drying history change viscosity, nucleation, degradation, and crystallization behavior.",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Tg and Tm must not be confused. Tg describes the mobility shift of amorphous regions. Tm describes the loss of crystalline order. A semicrystalline polymer has both and therefore can show both Tg and Tm. An amorphous polymer generally has Tg but no true crystalline melting point.",
        },
        {
          type: "callout",
          tone: "warning",
          title: "Critical Correction (Page 7)",
          text: "Crystallization can make a polymer denser, but it does not make the molded part heavier unless external mass is absorbed later, such as moisture uptake in nylon. Part weight rises during a hold-time study because the gate remains open and additional polymer is packed into the cavity, not because the existing polymer gained mass.",
        },
      ],
    },

    /* ───────── Section 4: How Crystallization Happens (Manual §D, pp 8–9) ───────── */
    {
      id: "crystallization-mechanism",
      title: "D. Crystallization Mechanism",
      blocks: [
        { type: "heading", level: 2, text: "How Crystallization Actually Happens" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section D — Pages 8–9.",
        },
        {
          type: "paragraph",
          text: "The molding cycle creates crystallinity in stages. Each stage leaves a fingerprint on the final morphology.",
        },
        {
          type: "table",
          caption: "Crystallization Stages During the Molding Cycle — Section D, Page 8",
          columns: ["Stage", "What Is Happening", "Crystallinity Consequence"],
          rows: [
            [
              "1. Dry / Feed",
              "Pellets are dried if required and fed into the barrel.",
              "Moisture state and pellet history set viscosity, hydrolysis risk, and starting thermal condition.",
            ],
            [
              "2. Melting / Plasticizing",
              "Screw rotation conveys, compresses, melts, mixes, and meters resin.",
              "Existing crystals melt; crystal memory may be erased or partially retained depending on temperature and residence. Excess heat can degrade the resin.",
            ],
            [
              "3. Shot Accumulation",
              "Melt waits in front of the screw and in hot-runner manifolds/drops/tips.",
              "Residence time and local hot spots change molecular weight, colorant stability, nucleation, and viscosity.",
            ],
            [
              "4. Fill",
              "Melt enters cavity under pressure through runner and gate restrictions.",
              "Fountain flow puts hot melt against cold steel. High shear near walls and gate orients chains and can trigger flow-induced crystallization.",
            ],
            [
              "5. Pack / Hold",
              "After transfer, pressure feeds more melt while the gate remains open.",
              "Compensates crystallization shrinkage and raises local density. Ends when gate seals or valve closes.",
            ],
            [
              "6. Cooling",
              "Heat leaves through steel and coolant; skin cools fastest, core slowest.",
              "Nuclei form and lamellae grow. Core usually has more time for spherulitic crystallization than skin.",
            ],
            [
              "7. Ejection",
              "Part leaves the mold with residual temperature gradients and stresses.",
              "If core remains above a relevant transition or crystallization window, post-mold shrinkage and warp can continue.",
            ],
            [
              "8. Conditioning / Service",
              "Part equilibrates to ambient humidity and temperature or sees service heat.",
              "Relaxation, moisture uptake, annealing, or secondary crystallization can change dimensions and properties.",
            ],
          ],
        },
        {
          type: "image",
          src: crystallinitySkinCoreMorphology,
          alt: "Skin-core morphology cross-section showing frozen skin, shear-affected subskin, and spherulitic core layers",
          figureNumber: "Figure D-1",
          caption:
            "The Microscopic Landscape: Skin-Core Morphology & Crystalline Evolution. (Master Training Manual, Page 9)",
          lookFor: {
            tone: "info",
            title: "Wall Morphology Layers (Page 9)",
            items: [
              "Layer 1 — Amorphous/Frozen Skin (0.05–0.2 mm): instantaneous quenching against cold steel, fountain flow prevents large crystals",
              "Layer 2 — Shear-Affected Subskin (0.1–0.5 mm): flow-induced crystallization with shish-kebab morphology",
              "Layer 3 — Quiescent Spherulitic Core (60–80% of wall): slow cooling allows large spherulitic growth",
            ],
          },
        },
        {
          type: "paragraph",
          text: 'Flow-induced crystallization is important in high-shear regions. Stretched and aligned chains can form shish-kebab morphology where fibrillar chain bundles ("shish") template perpendicular folded-chain lamellae ("kebabs"). This raises local stiffness and anisotropy.',
        },
        {
          type: "table",
          caption: "Enthalpy of Fusion Reference — DSC Testing (Section D, Page 9 & Section N, Page 23)",
          columns: ["Polymer", "Theoretical Heat of Fusion (100% Crystalline)"],
          rows: [
            ["Polyoxymethylene (POM)", "326 J/g"],
            ["Polyethylene (PE)", "293 J/g"],
            ["Polyamide 12 (PA12)", "245 J/g"],
            ["Polyamide 6 (PA6)", "230 J/g"],
            ["Polyamide 66 (PA66)", "226 J/g"],
            ["Polypropylene (PP)", "207 J/g"],
            ["PEOX", "197 J/g"],
            ["Polyethylene Terephthalate (PET)", "140 J/g"],
            ["Polybutylene-1 (PB-1)", "125 J/g"],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Gate Seal Connection (Page 9)",
          text: "Crystallinity and gate seal are coupled. Crystallization causes densification while the part is cooling. If the gate is open, pack can compensate. If the gate is sealed, the cavity is isolated and remaining shrinkage becomes dimensional change or internal defects.",
        },
      ],
    },

    /* ───────── Section 5: Semi-Crystalline vs Amorphous (Manual §E, p 10) ───────── */
    {
      id: "semicrystalline-vs-amorphous",
      title: "E. Semi-Crystalline vs Amorphous",
      blocks: [
        { type: "heading", level: 2, text: "Semicrystalline vs Amorphous Plastics" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section E — Page 10.",
        },
        {
          type: "callout",
          tone: "warning",
          title: "Most Expensive Troubleshooting Error",
          text: 'Treating every polymer as though it crystallizes. ABS and PC are not fixed by "crystallinity control" in the same sense as PP, PA, POM, PBT, or PEEK.',
        },
        {
          type: "table",
          caption: "Semicrystalline vs Amorphous Comparison — Section E, Page 10",
          columns: ["Topic", "Semicrystalline", "Amorphous"],
          rows: [
            [
              "Thermal behavior",
              "Have a true melting range (Tm) and usually a Tg. Crystals melt at Tm.",
              "Have Tg but no normal crystalline melting point. Soften over a range above Tg.",
            ],
            [
              "Structure",
              "Two phases: ordered lamellae/spherulites plus amorphous regions.",
              "Primarily disordered chain packing; may have orientation but not lamellar crystalline domains.",
            ],
            [
              "Shrinkage",
              "Higher, more time-dependent, often more anisotropic.",
              "Usually lower and more predictable, though residual stress can still distort parts.",
            ],
            [
              "Optics",
              "Crystals scatter light; often translucent to opaque.",
              "Often clearer when unfilled, dry, and stress-free.",
            ],
            [
              "Chemical resistance",
              "Often stronger — tight packing limits solvent penetration.",
              "Often more solvent-sensitive, but chemistry still dominates.",
            ],
            [
              "Process sensitivity",
              "Mold temp, gate seal, pack, cooling strongly affect morphology.",
              "Mold temp affects stress, gloss, replication but not crystallization.",
            ],
            ["Typical examples", "PP, PE, PA6, PA66, POM, PBT, PET, PPS, PEEK.", "ABS, PC, PC/ABS, SAN, PMMA, PS."],
          ],
        },
        {
          type: "paragraph",
          text: "Blends and specialty grades require precision. PC/ABS behaves primarily as an amorphous blend in standard molding. PBT/PC contains a semicrystalline polyester contribution and an amorphous PC contribution. PET may be molded amorphous for clarity or crystallized for heat resistance. (Section E, Page 10)",
        },
        {
          type: "callout",
          tone: "info",
          title: "Shop-Floor Rule (Page 10)",
          text: "Before diagnosing a defect as crystallinity-driven, ask: Is this resin semicrystalline under normal injection molding? If not, pivot to stress, cooling, moisture, degradation, venting, packing, or contamination.",
        },
      ],
    },

    /* ───────── Section 6: Material-by-Material Behavior (Manual §F, pp 11–13) ───────── */
    {
      id: "material-behavior",
      title: "F. Material Behavior",
      blocks: [
        { type: "heading", level: 2, text: "Material-by-Material Behavior" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section F — Pages 11–13. Teaching bands — use to orient troubleshooting, not to release a process. Supplier grade sheets override every general range.",
        },
        {
          type: "table",
          caption: "Teaching Bands by Polymer Family — Section F, Pages 11–12",
          columns: ["Family", "State", "Thermal Guide", "Mold Temp Band", "Key Risks"],
          rows: [
            [
              "PP homo/copolymer",
              "Semicrystalline",
              "Tg ≈ -10–0°C; Tm ≈ 160–168°C",
              "20–80°C",
              "Shrinkage, warpage, opacity, gate blush, post-mold drift, stiffness variation",
            ],
            [
              "HDPE / LDPE",
              "Semicrystalline",
              "HDPE Tm ≈ 128–136°C; LDPE ≈ 105–115°C",
              "20–60°C",
              "Density change, shrinkage, warpage, thick-section drift",
            ],
            [
              "PA6 / PA66",
              "Semicrystalline, hygroscopic",
              "PA6 Tm ≈ 220°C; PA66 Tm ≈ 255–265°C; dry Tg ≈ 50–70°C",
              "60–100°C",
              "Moisture effects, hydrolysis, post-mold conditioning, brittle dry parts",
            ],
            [
              "POM / Acetal",
              "Semicrystalline",
              "Tm ≈ 165–180°C; Tg below room temp",
              "80–120°C",
              "High shrinkage, voids/sink if underpacked, formaldehyde risk",
            ],
            [
              "PBT",
              "Semicrystalline polyester",
              "Tm ≈ 220–225°C; Tg ≈ 40–50°C",
              "40–100°C",
              "Hydrolysis, glass-fiber anisotropy, warp, poor surface",
            ],
            [
              "PET",
              "Condition-dependent",
              "Tm ≈ 245–255°C; Tg ≈ 70–80°C",
              "Cold for clarity; hot for heat resistance",
              "IV loss from moisture, haze, crystallization shrink",
            ],
            [
              "PPS",
              "Semicrystalline high-perf",
              "Tm ≈ 280–285°C; Tg ≈ 85–90°C",
              "120–160°C",
              "Under-crystallized skins, weld weakness, brittle response",
            ],
            [
              "PEEK / PAEK",
              "Semicrystalline high-perf",
              "Tm ≈ 343°C; Tg ≈ 143°C",
              "160–200°C",
              "Amorphous skins, delayed crystallization, high-value scrap",
            ],
            ["ABS", "Amorphous", "Tg ≈ 100–110°C", "40–80°C", "Residual stress, gloss, weld lines — not crystallinity"],
            ["PC", "Amorphous", "Tg ≈ 145°C", "80–120°C", "Stress cracking, birefringence, haze — not crystallization"],
            [
              "PC/ABS",
              "Amorphous blend",
              "Blend Tg; no practical Tm",
              "60–100°C",
              "Weld strength, gloss, stress, paint/plate performance",
            ],
            [
              "SAN / PMMA",
              "Amorphous",
              "Tg ≈ 100–110°C",
              "40–80°C",
              "Optical stress, cracking, flow marks, surface replication",
            ],
            [
              "TPU / TPE",
              "Grade-dependent",
              "Hard/soft segment dependent",
              "Supplier-specific",
              "Do not generalize; evaluate supplier morphology target",
            ],
            [
              "Filled / reinforced",
              "Matrix-dependent",
              "Matrix values modified by filler/fiber",
              "Matrix and supplier-specific",
              "Anisotropic shrink, fiber orientation, nucleation, warpage",
            ],
          ],
        },
        { type: "heading", level: 3, text: "F.1 Polypropylene (PP) — Page 11" },
        {
          type: "paragraph",
          text: "PP is the standard shop-floor example of crystallinity control because it crystallizes readily, responds strongly to mold temperature and nucleation, and shows visible shrinkage and opacity shifts. Homopolymer PP usually reaches higher crystallinity and stiffness than random or impact copolymers. Nucleated and clarified grades form many smaller spherulites and can achieve useful crystalline development faster than un-nucleated grades. Raising mold temperature generally increases crystal growth, stiffness, heat resistance, density, and total shrinkage.",
        },
        { type: "heading", level: 3, text: "F.2 Polyethylene (PE) — Page 12" },
        {
          type: "paragraph",
          text: "PE crystallinity is strongly linked to branching. HDPE has less branching, packs more efficiently, and reaches higher density and stiffness than LDPE. LLDPE has short-chain branching that modifies crystal thickness, toughness, and seal behavior. PE parts can continue shrinking after ejection when thick sections leave the mold hot. Processors should separate grade density from processing crystallinity.",
        },
        { type: "heading", level: 3, text: "F.3 Polyamide (PA6 / PA66) — Page 12" },
        {
          type: "paragraph",
          text: "Nylons are semicrystalline and hygroscopic. They crystallize during cooling, but their final dimensions and properties also depend on moisture conditioning. Water plasticizes the amorphous phase, lowers effective Tg, increases toughness, changes stiffness, and changes dimensions. A dry-as-molded PA part and a conditioned PA part are not the same component. Drying discipline is non-negotiable — wet nylon splay is not a crystallinity defect.",
        },
        { type: "heading", level: 3, text: "F.4 POM / Acetal — Page 12" },
        {
          type: "paragraph",
          text: "POM crystallizes rapidly and shrinks strongly. It offers dimensional stability and wear performance when processed correctly, but underpacking, premature gate seal, or uneven mold temperature can create voids, sink, and delayed dimensional change. Its thermal stability window is narrower than many commodity materials; overheating and excessive residence can release formaldehyde.",
        },
        { type: "heading", level: 3, text: "F.5 PBT and PET — Page 12" },
        {
          type: "paragraph",
          text: "PBT and PET are semicrystalline polyesters and are hydrolysis-sensitive. Drying and intrinsic viscosity preservation are central. PBT crystallizes relatively fast; PET can be molded amorphous or crystalline depending on cooling path. Glass-filled polyester grades are highly anisotropic. For PET, the processor must know whether the target is clarity/toughness (amorphous) or heat resistance (crystallized).",
        },
        { type: "heading", level: 3, text: "F.6 PPS and PEEK / PAEK — Page 12" },
        {
          type: "paragraph",
          text: "PPS and PEEK are high-performance semicrystalline polymers where under-crystallization can erase the value of the material. PEEK commonly requires high mold temperatures to avoid amorphous skins. Cold spots, hot-runner imbalance, or early ejection can cause property scatter that may not be obvious visually. Use supplier guidance, DSC, density, microscopy, and dimensional aging.",
        },
        { type: "heading", level: 3, text: "F.7 Amorphous Families — Page 12" },
        {
          type: "paragraph",
          text: 'ABS, PC, PC/ABS, SAN, PMMA do not develop semicrystalline lamellae under ordinary injection molding. Mold temperature controls stress relaxation, frozen orientation, surface replication, gloss, and weld-line interdiffusion rather than degree of crystallinity. Avoid the phrase "not enough crystallinity" — use stress, temperature gradient, moisture, degradation, weld quality, or surface replication as diagnostic language.',
        },
        {
          type: "heading",
          level: 3,
          text: "F.8 Filled, Reinforced, Flame-Retarded, Colored, and Regrind Grades — Page 13",
        },
        {
          type: "paragraph",
          text: 'Additives change crystallization in multiple ways. Talc and some pigments nucleate crystals. Glass fibers nucleate crystals and create anisotropic shrink. Flame retardants may change thermal stability and nucleation. Regrind carries previous thermal history, possible moisture exposure, degraded molecules, and debris that may act as nuclei. "Same resin" is not truly the same input if the regrind fraction and history change.',
        },
      ],
    },

    /* ───────── Section 7: Visual Appearance (Manual §G, pp 14–15) ───────── */
    {
      id: "visual-appearance",
      title: "G. Visual & Microstructure",
      blocks: [
        { type: "heading", level: 2, text: "Visual Appearance and Microstructure" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section G — Pages 14–15.",
        },
        {
          type: "paragraph",
          text: "Crystallinity is invisible to the naked eye as a percentage, but its consequences are often visible. Higher crystallinity usually increases opacity because crystals scatter light. Large spherulites can produce haze, brittleness, or visible texture under polarized microscopy. Differential crystallinity appears as gloss variation, sink/shrink patterns, gate halos, flow-direction effects, or warpage.",
        },
        {
          type: "image",
          src: crystallinityCoolingRate,
          alt: "Cooling rate effect on crystallinity — slow cooling vs rapid quenching",
          figureNumber: "Figure G-1",
          caption:
            "Cooling rate effect: slow cooling gives chains time to organize; rapid quenching traps more disorder. (Page 14)",
        },
        {
          type: "image",
          src: crystallinitySpheruliteStructure,
          alt: "Spherulite structure with crystalline lamellae radiating from nucleation point",
          figureNumber: "Figure G-2",
          caption:
            "Spherulite structure: crystalline lamellae radiate from nuclei with amorphous tie chains between ordered regions. (Page 14)",
        },
        {
          type: "image",
          src: crystallinityPropertyTrends,
          alt: "General property trends with increasing crystallinity — stiffness, tensile, melting, transparency",
          figureNumber: "Figure G-3",
          caption:
            "General property trends with increasing crystallinity: stiffness and tensile strength rise, transparency falls, and melting behavior becomes more pronounced. (Page 15)",
        },
        {
          type: "table",
          caption: "What Crystallinity Looks Like — Section G, Page 15",
          columns: ["Observation Scale", "What Crystallinity Can Look Like", "Processor/Quality Caution"],
          rows: [
            [
              "Microscope / PLM",
              "Spherulites, skin-core layers, Maltese-cross patterns, lamellar aggregates, orientation bands.",
              "Use microtomed sections from gate, end-of-fill, thick and thin zones.",
            ],
            [
              "Appearance",
              "Opacity, haze, gloss shift, flow bands, gate halo, differential texture replication.",
              "Visual signs are indirect; verify with density, DSC, microscopy, or shrink map.",
            ],
            [
              "Dimensional map",
              "High-shrink zones, post-mold drift, differential warp, thick-section contraction.",
              "Map at ejection, 24 h, 72 h, and after heat/humidity conditioning.",
            ],
            [
              "Fracture surface",
              "Brittle inter-spherulitic fracture, ductile tearing, fiber pullout, weld-line failure.",
              "Fracture is often mixed with degradation, moisture, notch, and weld quality.",
            ],
            [
              "Cavity pressure trace",
              "Gate seal timing, pack effectiveness, pressure decay, end-of-fill pressure.",
              "Correlate process signature to measured weight, dimensions, and morphology.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Teaching Sequence (Page 15)",
          text: "Use the visuals in this order: chain order vs disorder, lamellae, spherulites, cooling rate, skin-core morphology, then gate seal. That moves the trainee from molecule to morphology to process control.",
        },
      ],
    },

    /* ───────── Section 8: Property Effects (Manual §H, pp 15–16) ───────── */
    {
      id: "property-effects",
      title: "H. Property Effects",
      blocks: [
        { type: "heading", level: 2, text: "Effect of Crystallinity on Material Properties" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section H — Pages 15–16.",
        },
        {
          type: "paragraph",
          text: "Tight chain packing reduces free volume, increases density, restricts molecular motion, creates harder domains, scatters light, and increases shrinkage that must be compensated during molding. Exceptions are driven by spherulite size, tie-molecule density, molecular weight, moisture, fiber orientation, filler loading, weld quality, and degradation.",
        },
        {
          type: "table",
          caption: "Property Trends with Crystallinity Change — Section H, Page 16",
          columns: ["Property", "When Xc Increases", "When Xc Decreases", "Exception / Caution"],
          rows: [
            [
              "Density",
              "Increases — crystalline domains pack more tightly.",
              "Lower density, more free volume.",
              "Voids and fillers can confound measurement.",
            ],
            [
              "Volumetric shrinkage",
              "Increases — specific volume decreases during crystal growth.",
              "Decreases but post-mold crystallization may occur later.",
              "Packing can compensate only before gate seal.",
            ],
            [
              "Linear shrinkage",
              "Usually increases; anisotropy may increase with flow/fiber orientation.",
              "Usually lower but frozen stress may relax later.",
              "Always map flow, cross-flow, thickness, and cavity-to-cavity.",
            ],
            [
              "Warpage",
              "Risk increases if crystallinity is nonuniform.",
              "Risk still exists from frozen stress and differential cooling.",
              "Uniform crystallinity is more important than maximum.",
            ],
            [
              "Stiffness / Modulus",
              "Usually increases.",
              "Usually decreases.",
              "Impact copolymers and moisture can reverse expectations.",
            ],
            [
              "Tensile strength",
              "Often increases to an optimum.",
              "May decrease if morphology is underdeveloped.",
              "Coarse spherulites and weak welds lower practical strength.",
            ],
            [
              "Elongation / Ductility",
              "Often decreases — crystals restrict deformation.",
              "Often increases, but residual stress may embrittle.",
              "Tie molecules and MW dominate toughness.",
            ],
            [
              "Impact resistance",
              "Can improve or decline depending on morphology.",
              "Can improve if stress is low.",
              'Do not assume "more crystalline = more brittle" without testing.',
            ],
            [
              "Creep resistance",
              "Usually improves — crystals resist chain slippage.",
              "Usually worse at elevated temperature.",
              "Long-term load and service temperature matter.",
            ],
            [
              "Heat deflection",
              "Usually improves.",
              "Usually declines.",
              "Under-crystallized PEEK/PPS/PET can fail heat requirements.",
            ],
            [
              "Chemical resistance",
              "Usually improves — lower solvent diffusion.",
              "Usually weaker.",
              "Stress cracking can still occur with high molded-in stress.",
            ],
            [
              "Barrier behavior",
              "Often improves — crystals create tortuous diffusion paths.",
              "Usually weaker barrier.",
              "Orientation and fillers can alter result.",
            ],
            [
              "Friction / Wear",
              "Often improves in POM, PA, PEEK, PE, PPS.",
              "May be poorer or more temperature-sensitive.",
              "Wear grades include lubricants/fillers that complicate interpretation.",
            ],
            [
              "Transparency",
              "Usually decreases — crystals scatter light.",
              "Usually increases if stress and inclusions are low.",
              "Clarifiers create small crystals to reduce scattering in PP.",
            ],
            [
              "Surface finish",
              "Can improve or worsen depending on mold temp, spherulite size, shrinkage.",
              "Often easier to achieve high gloss if stress is managed.",
              "Surface is a skin phenomenon; bulk Xc may not explain it.",
            ],
            [
              "Dimensional stability",
              "Improves when crystallization is completed uniformly in-mold.",
              "Can be stable if stresses are low.",
              "Under-crystallized parts may drift later.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Most Useful Production Rule (Page 16)",
          text: "For precision semicrystalline parts, a lower-shrink part at ejection is not automatically better. It may be under-crystallized and waiting to shrink later. Evaluate dimensions over time and after service-temperature exposure.",
        },
      ],
    },

    /* ───────── Section 9: Process Variables (Manual §I, p 17) ───────── */
    {
      id: "process-variables",
      title: "I. Process Variables",
      blocks: [
        { type: "heading", level: 2, text: "Injection Molding Process Variables That Control Crystallinity" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section I — Page 17. This is the operating core of the manual.",
        },
        {
          type: "paragraph",
          text: "Each setting affects crystallinity through temperature history, shear orientation, pressure/density, gate seal timing, residence degradation, nucleation, cooling rate, or post-mold drift. Do not change multiple variables without recording logic and measuring output.",
        },
        {
          type: "image",
          src: crystallinityProcessVariables,
          alt: "Process variables controlling crystallinity — injection molding machine with labeled control points",
          figureNumber: "Figure I-1",
          caption: "Key process variables and their mechanisms for controlling crystallinity. (Page 17)",
        },
        {
          type: "table",
          caption: "Complete Process Variable Matrix — Section I, Page 17",
          columns: ["Variable", "If Raised", "If Lowered", "Guidance"],
          rows: [
            [
              "Melt temperature",
              "Improves flow, may erase nuclei, extends cooling, raises degradation risk.",
              "Raises viscosity/pressure, may preserve nuclei, can cause poor melt and welds.",
              "Measure actual melt — do not rely only on barrel setpoints.",
            ],
            [
              "Barrel profile",
              "Hotter front/nozzle may improve fill but can overheat drool-prone materials.",
              "Too cool may leave unmelt or high shear.",
              "Use resin-specific profiles; verify melt homogeneity.",
            ],
            [
              "Nozzle temperature",
              "Reduces nozzle freeze, can increase stringing and gate blush.",
              "Can cause cold slug, short shots, weak welds.",
              "Check actual nozzle and tip condition.",
            ],
            [
              "Mold surface temperature",
              "More crystal growth, lower residual stress, more shrink; possible longer cycle.",
              "Quench skin, lower Xc, high stress, post-mold drift.",
              "Measure steel surface, not only TCU setpoint.",
            ],
            [
              "Injection speed",
              "More orientation/FIC, shear heat, gate blush, reduced freeze during fill.",
              "Less shear, more premature freeze, hesitation, poor welds.",
              "Use velocity profiling near gates/welds if needed.",
            ],
            [
              "V/P transfer",
              "Later transfer can overfill, flash, high stress.",
              "Earlier transfer can underfill, sink, low density.",
              "Optimize with short-shot and cavity pressure when available.",
            ],
            [
              "Pack pressure",
              "Raises density, reduces sink/voids; excessive stress/flash possible.",
              "Underpack, shrink, voids, lower local density.",
              "Only effective before gate seal.",
            ],
            [
              "Pack / Hold time",
              "Effective until gate seal; beyond seal wastes cycle.",
              "Premature end causes sink and drift.",
              "Run weight-vs-hold-time study.",
            ],
            [
              "Cushion",
              "Too large may add residence and variability.",
              "Too small can bottom out and lose pack control.",
              "Trend cushion consistency as machine health indicator.",
            ],
            [
              "Cooling time",
              "More in-mold crystallization and stability; longer cycle.",
              "Hot ejection, distortion, post-mold drift.",
              "Use ejection temperature and dimensional aging, not guesswork.",
            ],
            [
              "Coolant flow / TCU",
              "More turbulent flow improves heat removal and consistency.",
              "Low flow/fouling causes hot spots and cavity variation.",
              "Record supply/return temps and flow.",
            ],
            [
              "Residence time",
              "More degradation, color shift, viscosity loss.",
              "Usually safer thermally.",
              "Audit barrel + hot runner + shot size.",
            ],
            [
              "Screw RPM",
              "More shear heat, mixing, possible degradation.",
              "Cooler, less mixing, longer recovery.",
              "Track recovery consistency.",
            ],
            [
              "Back pressure",
              "Better mixing; more heat and possible degradation.",
              "Less shear heat; poor mixing or air entrapment.",
              "Use enough for stable melt, not as a brute-force heater.",
            ],
            [
              "Decompression / Suckback",
              "Can pull air/moisture, cause splay if excessive.",
              "Drool/stringing risk if too low.",
              "Do not mask hot tip problems with excessive decompression.",
            ],
            [
              "Cycle time variation",
              "Long cycles overcool parts and overheat hot runners.",
              "Short cycles eject hot, underdeveloped cores.",
              "Segregate interruption shots.",
            ],
            [
              "Regrind percentage",
              "More variability; possible faster nucleation or degradation.",
              "Virgin-only is more stable but cost/sustainability tradeoff.",
              "Control percent, history, drying, and blend uniformity.",
            ],
            [
              "Moisture content",
              "Wet resin can splay, hydrolyze, lower MW, alter Xc.",
              "Overdrying can embrittle certain materials.",
              "Use moisture analyzer when critical.",
            ],
            [
              "Drying conditions",
              "Overheating/overdrying can degrade or age material.",
              "Underdrying causes moisture defects/hydrolysis.",
              "Document time, temp, dew point, airflow.",
            ],
            [
              "Material lot variation",
              "New lot may crystallize differently even at same settings.",
              "Old lot/regrind mix may behave differently.",
              "Qualify lots with part weight, dimensions, and critical tests.",
            ],
            [
              "Hot-runner zone temps",
              "Overhot tips cause drool, stringing, lower gate Xc, degradation.",
              "Too cold tips cause freeze, shorts, pressure spikes.",
              "Trend each zone and compare actual gate condition.",
            ],
            [
              "Valve-gate timing",
              "Later close allows more pack; too late can overpack or mark.",
              "Earlier close isolates cavity before shrink compensation.",
              "Validate by cavity weight, pressure, and dimensions.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "success",
          title: "Order of Operations (Page 17)",
          text: "1) Confirm actual material condition. 2) Confirm actual melt and mold surface temperature. 3) Establish fill-only baseline. 4) Establish gate seal. 5) Optimize pack. 6) Optimize cooling. 7) Validate dimensions over time. Random setpoint changes create folklore, not process knowledge.",
        },
      ],
    },

    /* ───────── Section 10: Cold vs Hot Runner (Manual §J, pp 18–19) ───────── */
    {
      id: "runner-comparison",
      title: "J. Cold vs Hot Runner",
      blocks: [
        { type: "heading", level: 2, text: "Cold Runner vs Hot Runner: Full Comparative Analysis" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section J — Pages 18–19.",
        },
        {
          type: "paragraph",
          text: "Cold runners and hot runners produce different crystallization outcomes because they deliver different thermal histories. A cold runner cools and freezes every shot. A hot runner keeps the delivery path molten across shots, changing residence time, gate seal mechanism, pack transmission, scrap/regrind, startup/shutdown risk, and gate-zone morphology.",
        },
        {
          type: "image",
          src: crystallinityGateFreezeKinetics,
          alt: "Gate seal-off kinetics and runner-system comparison",
          figureNumber: "Figure J-1",
          caption:
            "Gate seal-off kinetics and runner-system comparison. Weight-vs-hold-time plateau identifies natural gate seal in freeze-controlled systems. (Page 18)",
        },
        {
          type: "table",
          caption: "Runner System Comparative Analysis — Section J, Pages 18–19",
          columns: ["Factor", "Cold Runner", "Hot Runner", "Crystallinity Impact", "Recommendation"],
          rows: [
            [
              "Thermal history",
              "Sprue/runner/gate cool every shot; less continuous hot dwell.",
              "Manifold/drops/tips keep resin molten; added heated residence.",
              "Hot runner delivers warmer, steadier melt but adds degradation risk.",
              "Audit total residence including hot runner volume and stoppages.",
            ],
            [
              "Gate seal",
              "Physical freeze of gate land — clear and weight-study friendly.",
              "Open tips seal by viscosity/pressure; valve gates seal mechanically.",
              "Changes pack window and gate-area crystallinity.",
              "Run gate-seal studies appropriate to gate type.",
            ],
            [
              "Pack transmission",
              "Limited by progressive runner/gate seal.",
              "More direct hydraulic connection while manifold is molten.",
              "Hot runner may pack more efficiently and consistently.",
              "Balance manifold and cavity weights.",
            ],
            [
              "Residence degradation",
              "Shorter hot exposure but regrind adds heat history.",
              "Long exposure possible, especially slow cycles and stoppages.",
              "MW and nucleation behavior can drift.",
              "Use standby, purge, and residence-time limits.",
            ],
            [
              "Regrind",
              "Runner scrap reused; changes nucleation, moisture, degradation.",
              "Minimal runner scrap; less regrind pressure.",
              "Cold runner with uncontrolled regrind has more material-state variation.",
              "Specify regrind %, dryness, segregation, max heat history.",
            ],
            [
              "Gate-zone crystallinity",
              "Gate cools from steel; moderate/high Xc near frozen gate.",
              "Heated gate can delay crystallization or create amorphous halo.",
              "Local properties near gate may differ from body.",
              "Section gate areas when failures start near gate.",
            ],
            [
              "Thermal control",
              "Simpler tooling; cooling balance still critical.",
              "Many heaters, TCs, tips, valve pins, controllers.",
              "Hot runner consistent only when in equilibrium and healthy.",
              "Trend zones and reject startup/transition shots.",
            ],
            [
              "Cycle time",
              "Runner cooling can dominate cycle.",
              "No cold runner cooling burden; cavity cooling remains.",
              "Hot runner may shorten cycle but increases thermal burden.",
              "Do not sacrifice part stability for cycle rate.",
            ],
            [
              "Color/material change",
              "Runner purged mechanically but scrap is high.",
              "Dead spots/manifold residence can extend transition.",
              "Contamination or old material can alter Xc.",
              "Use documented purge sequence and first-shot quarantine.",
            ],
            [
              "Stack/family molds",
              "Geometric balance important; thermal path differences still matter.",
              "Thermal and rheological balance are critical; hot drops may vary.",
              "Cavity-to-cavity morphology spread can increase.",
              "Weight, pressure, and dimensional data must be cavity-specific.",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Open thermal tip gates keep the gate region hot from behind. Valve gates remove natural freeze as the primary seal mechanism; gate close time becomes a programmable parameter. Cold runner gate seal is easier to measure through a conventional part-weight plateau. (Section J, Page 19)",
        },
        {
          type: "callout",
          tone: "info",
          title: "Stack Mold Note (Page 19)",
          text: "Different mold levels can have different thermal paths. Upper cavities may be closer to a colder clamp plate and freeze earlier. Lower cavities may receive heat through manifold/support structures and freeze later. Treat stack molds as cavity-level thermal systems, not as one average mold.",
        },
      ],
    },

    /* ───────── Section 11: Mold & Equipment (Manual §K + §L, pp 20–21) ───────── */
    {
      id: "mold-equipment",
      title: "K–L. Mold & Equipment",
      blocks: [
        { type: "heading", level: 2, text: "Mold Design Effects on Crystallinity" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section K — Page 20; Section L — Page 21.",
        },
        {
          type: "paragraph",
          text: "The mold controls local heat extraction and local shear. Crystallinity is designed into the tool before it is adjusted at the press. A process cannot fully compensate for a gate that freezes too early, a thick rib cooling 5× slower than the nominal wall, a dead-ended cooling channel, or a blocked baffle.",
        },
        {
          type: "table",
          caption: "Mold Feature Effects — Section K, Page 20",
          columns: ["Tool Feature", "Mechanism", "Crystallinity / Part Effect", "Action"],
          rows: [
            [
              "Gate type",
              "Controls shear, pressure drop, seal mechanism, vestige temp.",
              "Small tunnel: fast freeze/high shear; Fan: lower shear; Valve: mechanical seal.",
              "Select gate based on pack window and morphology, not only trim convenience.",
            ],
            [
              "Gate size / land",
              "Controls gate seal time and pressure loss.",
              "Undersized: early seal, underpack, sink/voids. Oversized: delay seal.",
              "Run gate seal and pressure-drop studies before locking.",
            ],
            [
              "Gate location",
              "Sets flow length, weld placement, fiber orientation, gate-zone morphology.",
              "Near-gate sees highest heat/shear; end-of-fill may quench and weld poorly.",
              "Place gates to balance shrink, weld strength, and critical dimensions.",
            ],
            [
              "Wall thickness",
              "Thick areas cool slowly, crystallize and shrink more.",
              "Thin-to-thick transitions create differential Xc and warpage.",
              "Use uniform walls, coring, ribs, gradual transitions.",
            ],
            [
              "Cooling channels",
              "Control mold-surface temperature and local gradients.",
              "Far/blocked/uneven channels create hot spots and Xc variation.",
              "Design for turbulent flow, balanced circuits, measured flow.",
            ],
            [
              "Core / Cavity balance",
              "Different sides crystallize differently.",
              "Hot core side shrinks more and pulls part toward it.",
              "Map both halves; use conformal cooling, bubblers, baffles.",
            ],
            [
              "Venting",
              "Poor venting causes burns, shorts, hesitation, weak welds.",
              "Hesitation cools local melt and changes structure.",
              "Maintain vent depth, clean vents, evaluate trapped gas.",
            ],
            [
              "Flow leaders/deflectors",
              "Alter fill pattern and local shear/cooling.",
              "Can improve balance or create new orientation gradients.",
              "Simulate and confirm with short shots and cavity pressure.",
            ],
            [
              "Texture/polish",
              "Affects surface heat transfer, replication, gloss, and ejection.",
              "Rough textures may require higher mold temp or pack.",
              "Validate appearance and dimensions together.",
            ],
            [
              "Ejection design",
              "Hot, under-crystallized cores deform during ejection.",
              "Pins can mark or distort semi-solid areas.",
              "Use adequate cooling and ejection area; verify ejection temp.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Mold Review Question Set (Page 20)",
          text: "For each critical dimension, ask: What wall thickness feeds it? Which gate fills it? What cavity surface cools it? When does the gate seal? Is there a runner-system heat source nearby? What does the cavity pressure trace say? What is the local ejection temperature?",
        },
        { type: "heading", level: 3, text: "Machine and Equipment Effects — Section L, Page 21" },
        {
          type: "paragraph",
          text: "Machine settings are only as real as the equipment executing them. A press can display stable numbers while actual melt temperature, shot size, check-ring seal, nozzle condition, hot-runner tip temperature, or mold-coolant flow is drifting.",
        },
        {
          type: "table",
          caption: "Equipment Impact on Crystallinity — Section L, Page 21",
          columns: ["Equipment Item", "What It Controls", "Crystallinity Relevance"],
          rows: [
            [
              "Screw design/compression",
              "Melt quality, shear heat, unmelt risk, residence.",
              "Affects Xc through melt homogeneity and thermal history.",
            ],
            [
              "Mixing section",
              "Color/additive distribution; can add shear heat.",
              "Poor mixing creates local nucleation/color variation; excessive mixing can degrade.",
            ],
            [
              "Non-return valve",
              "Shot and pack consistency.",
              "Worn NRV causes weight/density variation mimicking Xc scatter.",
            ],
            [
              "Screw/barrel wear",
              "Plasticizing consistency and melt control.",
              "Changes shear heat, residence, and shot repeatability.",
            ],
            [
              "Nozzle condition",
              "Cold slug, drool, pressure loss, heat transfer.",
              "Cold slugs cause weak morphology; hot nozzles cause drool/degradation.",
            ],
            [
              "Heater bands / TCs",
              "Barrel/nozzle temperatures.",
              "Failed hardware changes actual melt without obvious setup change.",
            ],
            [
              "TCU / Chiller",
              "Mold-surface temperature via coolant.",
              "Fouled lines and low flow cause local Xc variation.",
            ],
            [
              "Hot-runner controller",
              "Manifold, drops, tips, valve gates.",
              "Zone drift creates cavity-specific thermal history.",
            ],
            [
              "Cavity pressure sensors",
              "Actual pressure-time history inside the tool.",
              "Best method to connect pack, gate seal, viscosity, and dimensions.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Direct vs Indirect Causation (Page 21)",
          text: "Clamp force, platen parallelism, and robot takeout do not directly change crystal lattices. They can indirectly change the part by altering venting, flash, cooling time, ejection temperature, or handling distortion. Keep root-cause language precise.",
        },
      ],
    },

    /* ───────── Section 12: Defects & Troubleshooting (Manual §M, p 22) ───────── */
    {
      id: "defects-troubleshooting",
      title: "M. Defects & Troubleshooting",
      blocks: [
        { type: "heading", level: 2, text: "Defects, Failure Modes, and Troubleshooting" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section M — Page 22.",
        },
        {
          type: "paragraph",
          text: "The correct troubleshooting stance is to separate crystallinity defects from crystallinity-adjacent defects. Warpage, sink, voids, brittleness, opacity, and dimensional drift can be morphology-driven. Splay is usually moisture or volatile degradation. Burns are venting and thermal degradation. Identify which history changed: thermal, pressure, shear, moisture, contamination, or handling.",
        },
        {
          type: "image",
          src: crystallinityDefects,
          alt: "Crystallinity defects and troubleshooting flowchart",
          figureNumber: "Figure M-1",
          caption: "Common crystallinity-related defects with diagnostic flowchart. (Page 22)",
        },
        {
          type: "table",
          caption: "Defect Troubleshooting Matrix — Section M, Page 22",
          columns: ["Defect", "Crystallinity Mechanism", "Adjacent Causes", "Confirm With", "Corrective Actions"],
          rows: [
            [
              "Warpage",
              "Differential Xc and shrinkage from uneven cooling, wall thickness, pack, or fiber orientation.",
              "Uneven pack, mold distortion, ejection, handling, fiber orientation.",
              "Map mold surface temps, part weight, dimensions over time; section part.",
              "Balance cooling, correct wall transitions, establish gate seal, adjust pack.",
            ],
            [
              "Sink marks",
              "Core crystallization shrink not compensated before gate seal.",
              "Low pack pressure, short hold, thick section, small gate.",
              "Weight-vs-hold-time study; cross-section for voids.",
              "Increase pack before gate seal, enlarge gate, reduce thick mass.",
            ],
            [
              "Voids",
              "Internal shrinkage cavity from isolated core contraction.",
              "Moisture/gas, poor venting, decompression air.",
              "Cut section, density, weight trend, moisture test.",
              "Improve packing/gate, dry resin, vent.",
            ],
            [
              "Brittleness",
              "Coarse spherulites, low tie molecules, under-crystallization with stress, or over-crystallized brittle morphology.",
              "Degradation, contamination, dry PA, notch, weld weakness.",
              "DSC/density plus impact/tensile, moisture, melt-flow shift.",
              "Correct drying/dwell, mold temp, nucleation, gate/weld design.",
            ],
            [
              "Dimensional drift",
              "Post-mold crystallization or stress relaxation.",
              "Moisture uptake, handling fixture, conditioning change.",
              "Measure at ejection, 24 h, 72 h, heat/humidity exposure.",
              "Increase in-mold cooling, raise mold temp, controlled anneal.",
            ],
            [
              "Opacity / Haze",
              "Local Xc or spherulite size variation.",
              "Colorant, contamination, moisture, surface texture.",
              "Visual map vs temp map; microscopy/DSC/density.",
              "Stabilize mold temp, gate temp, cooling, lot/additives.",
            ],
            [
              "Differential gloss",
              "Skin crystallinity, texture replication, cooling rate, shear.",
              "Mold polish, contamination, venting, velocity marks.",
              "Compare gloss map to flow and thermal map.",
              "Adjust mold temp/velocity/gate, clean mold/vents.",
            ],
            [
              "Gate blush / Halo",
              "Local shear orientation and thermal gradient near gate.",
              "Too small gate, high velocity, hot tip, material shear sensitivity.",
              "Short shot, gate pressure, microscopy near gate.",
              "Increase gate, profile speed, adjust tip temp.",
            ],
            [
              "Weld-line weakness",
              "Low temperature and poor interdiffusion; local morphology incomplete.",
              "Venting, contamination, low melt/mold temp, fiber orientation.",
              "Tensile/weld testing, vent inspection, short shots.",
              "Increase local temperature, improve venting, relocate gate.",
            ],
            [
              "Splay",
              "Not normally a crystallinity defect.",
              "Moisture, hydrolysis, volatiles, degradation, air.",
              "Moisture test, purge inspection, drying audit.",
              "Dry properly, reduce degradation, fix decompression/venting.",
            ],
            [
              "Short shots / Hesitation",
              "Premature freeze can suppress full morphology and pack.",
              "Pressure limit, cold slug, vent block, poor transfer.",
              "Fill study and pressure trace.",
              "Raise melt/mold carefully, improve venting, check gate/nozzle.",
            ],
            [
              "Cracking / ESC",
              "Residual stress and morphology raise chemical sensitivity.",
              "Wrong material, chemical exposure, notch, assembly stress.",
              "Stress solvent test, DSC/density, fracture analysis.",
              "Reduce stress, optimize crystallinity, change material/geometry.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Troubleshooting Discipline (Page 22)",
          text: "Do not chase crystallinity until the resin is verified, moisture is controlled, actual melt/mold temperatures are measured, gate seal is known, and part weight is stable. Otherwise the team will confuse material condition, packing, and morphology.",
        },
      ],
    },

    /* ───────── Section 13: Diagnostic Methods (Manual §N, p 23) ───────── */
    {
      id: "diagnostics",
      title: "N. Diagnostics & Measurement",
      blocks: [
        { type: "heading", level: 2, text: "Diagnostic and Measurement Methods" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section N — Page 23.",
        },
        {
          type: "paragraph",
          text: 'Visual inspection is fast but indirect. Professional crystallinity work requires measurement. If the question is "What is the actual Xc?" use DSC, XRD, or validated spectroscopy. If the question is "Did the process drift?" use part weight, dimensions, density, cavity pressure, and mold-surface temperature. If the question is "Where is the structure different?" use microtomy and microscopy.',
        },
        { type: "heading", level: 3, text: "DSC Crystallinity Formulas (Page 23)" },
        {
          type: "list",
          items: [
            "Unfilled resin: Xc = [(ΔHm − ΔHcc) / ΔHm0] × 100",
            "Filled / reinforced: Xc = [(ΔHm − ΔHcc) / (w_polymer × ΔHm0)] × 100",
            "ΔHm = measured melting enthalpy; ΔHcc = cold-crystallization enthalpy; ΔHm0 = theoretical heat of fusion for 100% crystalline; w_polymer = polymer mass fraction after subtracting nonmelting fillers.",
          ],
        },
        {
          type: "table",
          caption: "Diagnostic Methods — Section N, Page 23",
          columns: ["Method", "What It Measures", "Strengths", "Limits / Cautions", "Best Use"],
          rows: [
            [
              "Visual inspection",
              "Indirect appearance clues.",
              "Fast, free, good for mapping.",
              "Cannot quantify Xc; easily confused.",
              "First-pass screening.",
            ],
            [
              "Part weight vs hold time",
              "Mass accepted before gate seal.",
              "Excellent for gate seal and pack optimization.",
              "Does not isolate crystallinity alone.",
              "Scientific molding setup.",
            ],
            [
              "Shrink / dimensional map",
              "Geometry response over time and location.",
              "Directly linked to customer risk.",
              "Needs conditioning plan.",
              "Validation and troubleshooting.",
            ],
            [
              "Density / specific gravity",
              "Bulk density related to crystalline packing.",
              "Relatively fast and inexpensive.",
              "Voids, fillers, moisture confound.",
              "Comparative QA and development.",
            ],
            [
              "DSC",
              "Thermal transitions, melting/crystallization enthalpy.",
              "Primary quantitative method for Xc.",
              "Needs correct references and filler correction.",
              "Lab confirmation and DOE.",
            ],
            [
              "XRD",
              "Crystalline phase/order and orientation.",
              "Strong structural evidence.",
              "Higher cost/skill; sample prep matters.",
              "Failure analysis and research.",
            ],
            [
              "Polarized light microscopy",
              "Spherulites, skin-core, orientation bands.",
              "Best for local morphology.",
              "Destructive; skilled interpretation.",
              "Root-cause and training.",
            ],
            [
              "FTIR / Raman",
              "Spectral indicators of ordering.",
              "Surface-sensitive; useful for high-perf polymers.",
              "Requires calibration.",
              "PEEK/PAEK and comparative analysis.",
            ],
            [
              "Cavity pressure / temperature",
              "Real-time pressure and thermal fingerprint.",
              "Best in-process view of gate seal and pack.",
              "Requires instrumented tool.",
              "Process validation and monitoring.",
            ],
            [
              "Simulation",
              "Predicted fill, pack, cooling, shrink, warp.",
              "Good design comparison before steel changes.",
              "Material model quality dominates.",
              "DOE planning and mold design.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Lab Caution (Page 23)",
          text: "Reference heat-of-fusion values vary by source, polymorph, grade, and lab method. A production control plan must state the selected value, filler correction, sample location, heating rate, and whether cold crystallization is subtracted.",
        },
      ],
    },

    /* ───────── Section 14: Process Development (Manual §O, p 24) ───────── */
    {
      id: "process-development",
      title: "O. Process Development",
      blocks: [
        { type: "heading", level: 2, text: "Process Development and Optimization Strategy" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section O — Page 24.",
        },
        {
          type: "paragraph",
          text: "A crystallinity-sensitive process should be developed as a structured sequence, not by tribal setpoint movement.",
        },
        {
          type: "list",
          items: [
            "1. Confirm material: grade, lot, colorant, filler, regrind %, drying condition, moisture content, and supplier processing window.",
            "2. Confirm machine: actual melt temperature, screw recovery consistency, cushion stability, NRV health, pressure capability, and residence time.",
            "3. Confirm mold: actual mold-surface temperature map, coolant flow, gate condition, venting, hot spots, stack/family cavity differences, and hot-runner zone health.",
            "4. Run fill-only and short-shot studies to validate flow pattern, balance, pressure drop, weld locations, and hesitation.",
            "5. Run gate seal study — weight vs hold time for freeze-controlled gates; timing study for valve gates.",
            "6. Establish pack pressure and hold time based on weight plateau, cavity pressure, dimensions, sink/void results, and flash/stress limits.",
            "7. Sweep mold temperature after fill and pack are stable to determine crystallinity sensitivity, cycle tradeoff, and dimensional aging.",
            "8. Optimize cooling time by ejection temperature, dimensional stability, and post-mold drift — not just robot clearance.",
            "9. Use DOE when interactions are strong: mold temp × pack, melt temp × cooling time, gate close × pack, tip temp × gate blush.",
            "10. Validate with part weight, critical dimensions, shrink map, appearance, mechanical tests, and morphology method when required.",
            "11. Lock the process with alarms, reaction plan, startup scrap/quarantine rules, shutdown/purge rules, and maintenance intervals.",
          ],
        },
        {
          type: "table",
          caption: "Scientific Molding Study Sequence — Section O, Page 24",
          columns: ["Study", "Input Changed", "Keep Constant", "Output Measured", "Decision"],
          rows: [
            [
              "Viscosity study",
              "Fill speed / flow rate",
              "Material, melt, mold temp, transfer",
              "Peak pressure, fill pressure, fill time",
              "Choose stable velocity region.",
            ],
            [
              "Cavity balance",
              "Shot size / short-shot progression",
              "Velocity profile, temps",
              "Cavity fill progression, weights",
              "Find imbalance and flow restrictions.",
            ],
            [
              "Pressure drop",
              "Sequential flow path measurement",
              "Velocity, temps",
              "Pressure at machine/cavity",
              "Confirm pressure budget.",
            ],
            [
              "Gate seal",
              "Hold time",
              "Pack pressure, fill, temps",
              "Part weight plateau, cavity pressure",
              "Set hold time and evaluate gate size.",
            ],
            [
              "Mold temperature sweep",
              "Mold surface temperature",
              "Fill/pack/cooling initially",
              "Dimensions, Xc, shrink, appearance",
              "Choose crystallinity/cycle balance.",
            ],
            [
              "Cooling study",
              "Cooling time",
              "Fill/pack/mold temp",
              "Ejection temp, drift, warp",
              "Minimum stable cooling time.",
            ],
            [
              "DOE",
              "Two or more key variables",
              "Material/machine/mold state",
              "Critical-to-quality metrics",
              "Robust window and interactions.",
            ],
          ],
        },
      ],
    },

    /* ───────── Section 15: Case Studies (Manual §P, p 25) ───────── */
    {
      id: "case-studies",
      title: "P. Case Studies",
      blocks: [
        { type: "heading", level: 2, text: "Industry Case-Study Style Examples" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section P — Page 25. Training scenarios synthesized from common failure patterns to teach diagnostic logic.",
        },
        {
          type: "table",
          caption: "Case Studies — Section P, Page 25",
          columns: ["Case", "Symptom", "Likely Mechanism", "Evidence", "Corrective Plan"],
          rows: [
            [
              "POM precision gear drift",
              "Gears met dimensions at ejection but failed after storage.",
              "Low mold temp and insufficient hold left hot cores under-crystallized and underpacked.",
              "Weight plateau late; density low; dimensions changed after 72 h.",
              "Raised mold temp within supplier band, extended hold to gate seal, increased cooling, validated with density and aging.",
            ],
            [
              "PP cap warpage in multi-cavity tool",
              "Two cavities ran oval while others were stable.",
              "Cooling imbalance plus regrind % variation changed local Xc and shrink.",
              "Cavity-specific weights and IR mold map showed hotter cores.",
              "Cleaned cooling circuits, balanced flow, controlled regrind, reset pack by cavity weight.",
            ],
            [
              "PA66 housing brittleness",
              "Parts cracked during snap-fit assembly.",
              "Dry-as-molded condition, possible hydrolysis from poor drying, high stress from cold mold.",
              "Moisture high before drying; impact failed; DSC/density indicated low variable development.",
              "Dried to spec, reduced residence, increased mold temp, validated conditioned properties.",
            ],
            [
              "PBT connector warp",
              "Glass-filled connector bowed after reflow/heat exposure.",
              "Fiber orientation plus nonuniform crystallinity and low tool temp created delayed movement.",
              "Warp worsened after thermal exposure; microscopy showed skin-core imbalance.",
              "Adjusted gate/packing, raised mold temp, improved cooling balance, added heat-aging validation.",
            ],
            [
              "Hot-runner PP gate halo",
              "Gloss/opacity halo around gate on only two drops.",
              "Hot tip temperature imbalance delayed local crystallization and changed orientation.",
              "Problem followed hot-runner zones; cavity weights not identical.",
              "Repaired thermocouple/heater, rebalanced tips, profiled injection speed near gate.",
            ],
            [
              "PEEK high-value part property scatter",
              "Parts passed dimensions but failed high-temp modulus requirements.",
              "Tool temperature low in one area produced amorphous skin and incomplete crystallization.",
              "DSC by location showed Xc difference; surface color/opacity varied subtly.",
              "Raised and balanced mold temperature, extended controlled cooling, added DSC release sample plan.",
            ],
          ],
        },
      ],
    },

    /* ───────── Section 16: Shop-Floor Action Guides (Manual §Q, p 26) ───────── */
    {
      id: "shop-floor-guides",
      title: "Q. Shop-Floor Guides",
      blocks: [
        { type: "heading", level: 2, text: "Shop-Floor Action Guides" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section Q — Page 26.",
        },
        { type: "heading", level: 3, text: "Q.1 Fifteen-Minute Crystallinity Audit" },
        {
          type: "list",
          items: [
            "1. Confirm the material family: semicrystalline or amorphous.",
            "2. Check material condition: lot, color, regrind %, drying time, dryer temp, dew point, moisture reading.",
            "3. Record actual cycle time, cooling time, fill time, transfer position, cushion, peak pressure, pack pressure, hold time, screw recovery.",
            "4. Measure actual melt temperature. Compare to setup sheet and supplier range.",
            "5. Measure actual mold surface temperature at gate, end-of-fill, thick sections, core side, cavity side, each cavity.",
            "6. Weigh 10 parts by cavity. Look for scatter and drift after interruptions.",
            "7. Review gate seal data. If none exists, schedule a hold-time/weight study.",
            "8. Segregate startup, interruption, hot-runner standby recovery, and material-change transition shots.",
            "9. Compare visual defects to thermal map and cavity weight map before changing settings.",
            "10. Document the one controlled change to be tested and the measurement that will prove it.",
          ],
        },
        { type: "heading", level: 3, text: "Q.2 Startup Checklist for Semicrystalline Resins" },
        {
          type: "list",
          items: [
            "Resin dried to supplier spec; moisture verified when critical.",
            "Regrind percent, lot, and heat history controlled.",
            "Barrel, nozzle, and hot runner at stable temperature long enough for soak.",
            "Mold surface temperature verified at critical locations after thermal stabilization.",
            "Cooling flow rates and supply/return temperatures recorded.",
            "First shots quarantined until weights, dimensions, and appearance stabilize.",
            "Cavity-specific weights captured for multi-cavity and family molds.",
            "Gate seal / valve timing confirmed for current material and runner condition.",
          ],
        },
        { type: "heading", level: 3, text: "Q.3 Shutdown / Interruption Guide" },
        {
          type: "list",
          items: [
            "For hot runners, use documented standby temperatures and purge rules.",
            "Segregate parts before and after a stoppage.",
            "If cycle was interrupted with material in barrel/manifold, purge enough to remove thermally aged material.",
            "Reverify part weight and critical dimensions after restart; morphology may lag behind visual appearance.",
          ],
        },
      ],
    },

    /* ───────── Section 17: Standards & Best Practices (Manual §R, p 27) ───────── */
    {
      id: "standards-best-practices",
      title: "R. Standards & Best Practices",
      blocks: [
        { type: "heading", level: 2, text: "Best Practices, Standards, and Professional Guidance" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section R — Page 27.",
        },
        {
          type: "table",
          caption: "Standards and References — Section R, Page 27",
          columns: ["Reference Type", "What It Governs", "How to Use It"],
          rows: [
            [
              "ASTM D3418",
              "DSC for transition temperatures and enthalpies of fusion/crystallization.",
              "Use for DSC-based Xc, Tm, Tc, and process development.",
            ],
            [
              "ISO 11357 series",
              "DSC general principles and crystallization kinetics methods.",
              "Use for DSC procedures, kinetics, and international lab alignment.",
            ],
            [
              "ASTM D792",
              "Density and specific gravity by displacement.",
              "Useful for comparative crystallinity/density checks.",
            ],
            ["ISO 1183", "Density methods for plastics.", "Alternative density standard in global labs."],
            [
              "Supplier data sheets",
              "Grade-specific melt, mold, drying, shrink, residence, and safety guidance.",
              "Production release must follow grade-specific supplier guidance.",
            ],
            [
              "Customer control plan",
              "Critical dimensions, capability targets, sampling, reaction plan.",
              "Defines production acceptance, not crystallinity standards alone.",
            ],
            [
              "Scientific molding records",
              "Viscosity study, pressure drop, gate seal, cooling study, DOE, cavity balance.",
              "Best way to connect settings to measured outcomes.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "success",
          title: "Professional Standard (Page 27)",
          text: "Never release a crystallinity-sensitive process solely on appearance and first-piece dimensions. Use a validation package: material condition, thermal map, gate seal, cavity balance, weight/dimension aging, and morphology testing when the application warrants it.",
        },
      ],
    },

    /* ───────── Section 18: Quick-Reference Tools (Manual §S, p 28) ───────── */
    {
      id: "quick-reference",
      title: "S. Quick-Reference Tools",
      blocks: [
        { type: "heading", level: 2, text: "Flowcharts, Tables, and Quick-Reference Tools" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section S — Page 28.",
        },
        { type: "heading", level: 3, text: "S.1 Decision Tree: Is This Really a Crystallinity Problem?" },
        {
          type: "table",
          caption: "Crystallinity Decision Tree — Section S, Page 28",
          columns: ["Step", "Question", "Action"],
          rows: [
            [
              "1",
              "Is the resin semicrystalline in normal injection molding?",
              "No: investigate stress, moisture, degradation, venting, pack, or contamination. Yes: continue.",
            ],
            [
              "2",
              "Did the issue follow mold temperature, cooling, cycle time, or hot-runner change?",
              "Yes: thermal-history issue likely. Map actual mold surface and gate/tip temperatures.",
            ],
            [
              "3",
              "Did part weight change?",
              "Yes: pack/gate seal/material viscosity changed. Run hold-time and weight study.",
            ],
            [
              "4",
              "Did dimensions drift after 24–72 h or heat exposure?",
              "Yes: post-mold crystallization or relaxation possible. Validate aging and ejection temp.",
            ],
            [
              "5",
              "Is appearance affected without weight/dimension shift?",
              "Check local skin morphology, shear, gate blush, colorant, moisture, texture, or contamination.",
            ],
            [
              "6",
              "Can DSC/density/microscopy confirm the structure difference?",
              "If critical, test samples from affected and unaffected locations/cavities.",
            ],
          ],
        },
        { type: "heading", level: 3, text: "S.2 First Adjustment Priority Matrix" },
        {
          type: "table",
          caption: "First Adjustment Priority Matrix — Section S, Page 28",
          columns: ["Symptom", "First Area to Check", "Why"],
          rows: [
            [
              "Sink/voids with low part weight",
              "Pack pressure / hold time / gate size",
              "Verify gate seal first. Pack only works before gate seal.",
            ],
            [
              "Warp with cavity-to-cavity variation",
              "Cooling balance and cavity weights",
              "Do not average all cavities; map each cavity.",
            ],
            [
              "Dimensional drift after aging",
              "Mold temperature, cooling time, ejection temp",
              "Consider controlled anneal only after validation.",
            ],
            [
              "Gate halo/blush",
              "Gate shear, tip temperature, velocity profile",
              "Changing bulk mold temp may miss root cause.",
            ],
            [
              "Brittle PA",
              "Moisture/drying, residence, mold temp, conditioning",
              "Dry-as-molded nylon properties are not final conditioned properties.",
            ],
            [
              "Hot-runner random defects after stoppage",
              "Residence time / purge / hot-runner zones",
              "Segregate and purge interruption shots.",
            ],
            [
              "Opacity variation",
              "Mold temp, cooling rate, nucleation/color lot",
              "Confirm with DSC/density/microscopy if critical.",
            ],
          ],
        },
      ],
    },

    /* ───────── Section 19: References (Manual §T, p 29) ───────── */
    {
      id: "references",
      title: "T. References & Sources",
      blocks: [
        { type: "heading", level: 2, text: "References, Source Register, and Further Reading" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section T — Page 29.",
        },
        {
          type: "paragraph",
          text: "This guide was consolidated from the source package below. The goal was de-duplication, technical qualification, classroom usability, and shop-floor actionability.",
        },
        {
          type: "table",
          caption: "Source File Register — Section T, Page 29",
          columns: ["Source File / Asset", "Contribution Retained"],
          rows: [
            [
              "_STEP BY STEP__NO AUTOPILOT__NO FLUFF__METRICS MOD.pdf",
              "Original scope/specification: A–U structure, no-fluff posture, metrics, hot-runner/cold-runner through-line, SME checklist.",
            ],
            [
              "Crystallinity in Injection Molding Guide.docx",
              "Compact draft manual: beginner framing, process levers, diagnostics, scientific molding sequence, troubleshooting.",
            ],
            [
              "Crystallinity in Plastics Injection Molding Guide - DeepSeek.pdf",
              "Long-form draft: expanded material behavior, process matrices, validation workflow, startup/shutdown, case studies.",
            ],
            [
              "Crystallinity_Complete_Technical_Guide.docx",
              "Expanded guide: polymer science, runner comparison, process/mold/machine effects, troubleshooting, SME checklist.",
            ],
            [
              "crystallinity_in_plastics_injection_molding_manual.docx",
              "Processor-focused: plain-language, shop-floor action guides, myth-vs-reality, concise tables.",
            ],
            [
              "$Crystallinity_In_Injection_Molding_Consolidated_Fact_Checked_Teaching_Manual$.pdf",
              "Fact-checked consolidated: reference register, corrected claims, material ranges, DSC formula, evidence qualifications.",
            ],
            [
              "Visual images: degree of crystallinity, gate seal-off kinetics, lamellae, cooling rate, spherulites, skin-core",
              "Embedded visual teaching plates connecting molecular structure to molding outcomes.",
            ],
            [
              "The_Molecular_Blueprint.pdf / The_Molecular_Blueprint1.pdf",
              "Visual storyboard reference for molecular-to-process teaching sequence.",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Suggested external reading: polymer processing handbooks, resin supplier processing guides for the exact grade, DSC and density standards (ASTM D3418, ISO 11357, ASTM D792, ISO 1183), hot-runner supplier maintenance manuals, scientific molding training materials, polymer morphology textbooks, and peer-reviewed articles on post-mold shrinkage, flow-induced crystallization, and skin-core morphology.",
        },
      ],
    },

    /* ───────── Section 20: Glossary (Manual Appendix A, p 31) ───────── */
    {
      id: "glossary",
      title: "Appendix A. Glossary",
      blocks: [
        { type: "heading", level: 2, text: "Glossary" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Appendix A — Page 31.",
        },
        {
          type: "table",
          caption: "Glossary — Appendix A, Page 31",
          columns: ["Term", "Definition"],
          rows: [
            [
              "Annealing",
              "Controlled heating after molding to relieve stress or complete crystallization. Can improve stability but may add shrinkage; must be validated.",
            ],
            [
              "Amorphous",
              "Disordered polymer chain arrangement. Amorphous polymers soften through Tg and lack a true crystalline melting point.",
            ],
            [
              "Cold crystallization",
              "Crystallization observed during reheating of an under-crystallized sample, often detected in DSC. Indicates remaining crystallization potential.",
            ],
            [
              "Crystallization window",
              "Temperature band where chain mobility and thermodynamic driving force allow meaningful nucleation and growth.",
            ],
            [
              "Fountain flow",
              "Flow pattern where melt at the center moves forward then rolls outward to contact the mold wall, creating skin formation and orientation.",
            ],
            [
              "Gate seal",
              "Loss of the ability to feed material through the gate because it solidified or was mechanically closed.",
            ],
            [
              "Nucleating agent",
              "Additive that increases crystal start sites, reducing spherulite size and speeding crystallization.",
            ],
            [
              "Post-mold shrinkage",
              "Dimensional change after ejection from continued crystallization, stress relaxation, thermal contraction, or moisture conditioning.",
            ],
            ["Quenching", "Rapid cooling that freezes chains before they fully organize."],
            ["Semicrystalline", "Polymer morphology containing both crystalline and amorphous regions."],
            ["Shish-kebab", "Flow-induced morphology with oriented chain bundle core and lamellae growing outward."],
            [
              "Skin-core morphology",
              "Layered morphology caused by faster cooling and higher shear near mold walls than at the part core.",
            ],
          ],
        },
      ],
    },

    /* ───────── Section 21: Formula Sheet (Manual Appendix B, p 32) ───────── */
    {
      id: "formula-sheet",
      title: "Appendix B. Formulas",
      blocks: [
        { type: "heading", level: 2, text: "Formula Sheet" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Appendix B — Page 32.",
        },
        {
          type: "table",
          caption: "Formula Sheet — Appendix B, Page 32",
          columns: ["Concept", "Expression", "Use / Caution"],
          rows: [
            [
              "DSC crystallinity, unfilled",
              "Xc = [(ΔHm − ΔHcc) / ΔHm0] × 100",
              "Use same polymer chemistry and reference heat of fusion.",
            ],
            [
              "DSC crystallinity, filled",
              "Xc = [(ΔHm − ΔHcc) / (w_polymer × ΔHm0)] × 100",
              "Correct for glass, mineral, carbon black, FR solids, and other nonmelting mass.",
            ],
            [
              "Weight study gate seal",
              "Gate seal time = hold time where part weight plateaus",
              "Valid for natural freeze-controlled gates; valve gates require timing logic.",
            ],
            [
              "Shrinkage",
              "Shrinkage % = [(mold dimension − part dimension) / mold dimension] × 100",
              "Measure at defined time and conditioning state.",
            ],
            [
              "Density comparison",
              "Higher density generally indicates higher crystallinity when composition and void content are constant",
              "Not standalone proof if fillers, voids, moisture, or regrind vary.",
            ],
          ],
        },
      ],
    },

    /* ───────── Section 22: Trainer Lesson Plan (Manual Appendix C, p 33) ───────── */
    {
      id: "trainer-lesson-plan",
      title: "Appendix C. Lesson Plan",
      blocks: [
        { type: "heading", level: 2, text: "Trainer Lesson Plan and Knowledge Check" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Appendix C — Page 33.",
        },
        {
          type: "paragraph",
          text: "Training objective: by the end of the module, the learner should be able to define semicrystalline morphology, explain skin-core development, connect crystallinity to shrinkage and properties, distinguish hot-runner and cold-runner effects, run a basic gate seal study, and choose a diagnostic method.",
        },
        {
          type: "table",
          caption: "2-Hour Training Schedule — Appendix C, Page 33",
          columns: ["Time", "Topic"],
          rows: [
            ["0–15 min", "Molecular structure: amorphous vs crystalline, lamellae, spherulites, tie molecules."],
            [
              "15–35 min",
              "Molding cycle walkthrough: pellet, melt, fill, pack, cooling, ejection, post-mold conditioning.",
            ],
            [
              "35–55 min",
              "Property and defect linkage: shrinkage, stiffness, opacity, warpage, sink, brittleness, drift.",
            ],
            [
              "55–75 min",
              "Process controls: mold temperature, pack/hold, gate seal, cooling, residence, drying, regrind.",
            ],
            [
              "75–95 min",
              "Cold runner vs hot runner: gate seal, residence, pack transmission, regrind, hot tips, valve gates.",
            ],
            ["95–115 min", "Diagnostic lab: DSC equation, density, microscopy, weight plateau, cavity pressure."],
            ["115–120 min", "Quiz and plant-specific action plan."],
          ],
        },
        { type: "heading", level: 3, text: "Knowledge Check Questions (Page 33)" },
        {
          type: "list",
          items: [
            '1. Why is "semicrystalline" more accurate than "crystalline plastic" for injection molded PP or PA?',
            "2. A part weight stops increasing after 3.8 seconds of hold time. What does that tell you?",
            "3. Why can a part that measures good at ejection shrink or warp 48 hours later?",
            "4. What does a hot runner change that a cold runner does not?",
            "5. Why is splay in nylon usually not a crystallinity defect?",
            "6. What four measurements would you collect before changing mold temperature to fix warpage?",
            "7. Why can a higher mold temperature increase shrinkage but improve long-term dimensional stability?",
            "8. Why does glass fiber make shrinkage anisotropic?",
            "9. Which method would you use to quantify Xc: visual inspection, DSC, or part weight? Explain.",
            "10. When would a valve-gate timing study replace a conventional gate seal study?",
          ],
        },
      ],
    },

    /* ───────── Section 23: SME Review Checklist (Manual §U, p 30) ───────── */
    {
      id: "sme-review",
      title: "U. SME Review Checklist",
      blocks: [
        { type: "heading", level: 2, text: "SME Review Checklist" },
        {
          type: "callout",
          tone: "info",
          title: "Source Reference",
          text: "Master Training Manual, Section U — Page 30.",
        },
        {
          type: "paragraph",
          text: "Use this checklist before releasing the document as a company training document or before adapting it to a specific resin, mold, or customer program.",
        },
        {
          type: "table",
          caption: "SME Review Checklist — Section U, Page 30",
          columns: ["Reviewer", "Review Task"],
          rows: [
            [
              "Polymer science SME",
              "Confirm definitions of lamellae, spherulites, tie molecules, Tg, Tm, nucleation, crystal growth, and Xc measurement.",
            ],
            [
              "Processing SME",
              "Validate process-variable matrix against internal molding standards and grade-specific experience.",
            ],
            [
              "Tooling SME",
              "Review mold-design section for gate, runner, cooling, venting, stack-mold, and hot-runner accuracy.",
            ],
            [
              "Quality / Lab SME",
              "Confirm DSC, density, XRD, microscopy, and measurement language aligns with lab capability.",
            ],
            [
              "Safety SME",
              "Review material-specific degradation warnings, especially POM, PVC, PET/PBT hydrolysis, and high-temp materials.",
            ],
            [
              "Training owner",
              "Decide which sections are mandatory for operators, setup technicians, process engineers, quality engineers, and managers.",
            ],
            [
              "Plant owner",
              "Add plant-specific reaction plans, job travelers, material handling rules, and approved setpoint ranges.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "success",
          title: "Final Training Control (Page 30)",
          text: "This document is suitable as a master template. For production use, append plant-specific setup sheets, resin grade data, mold drawings, validated process windows, cavity pressure references, critical-dimension maps, and customer requirements.",
        },
      ],
    },
  ],
};
