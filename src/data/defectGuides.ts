import { additionalDefectGuides } from './additionalDefectGuides';
import { coldSlugMarksGuide } from './coldSlugMarksGuide';
import { delaminationGuide } from './delaminationGuide';
import { warpageGuide } from './warpageGuide';
import { voidsGuide } from './voidsGuide';
import { shrinkageGuide } from './shrinkageGuide';
import { weldLinesGuide } from './weldLinesGuide';

export interface DefectGuideSection {
  id: string;
  title: string;
  /** Markdown-ish blocks rendered by the page */
  blocks: GuideBlock[];
}

export type GuideBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'orderedList'; items: string[] }
  | { type: 'callout'; tone: 'info' | 'warning' | 'success'; title?: string; text: string }
  | { type: 'table'; columns: string[]; rows: string[][]; caption?: string }
  | {
      type: 'image';
      src: string;
      alt: string;
      /** Short descriptive caption rendered under the figure. */
      caption?: string;
      /** Optional figure label, e.g. "Figure 2". Rendered as a tag above the caption. */
      figureNumber?: string;
      /** Optional diagnostic checklist — "what to look for" items shown beside the figure. */
      lookFor?: { title?: string; items: string[]; tone?: 'info' | 'warning' | 'success' };
    };

export interface DefectGuide {
  slug: string;
  title: string;
  summary: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
  tags: string[];
  sections: DefectGuideSection[];
  references: { id: string; text: string }[];
}

export const defectGuides: DefectGuide[] = [
  {
    slug: 'bubbles-blisters',
    title: 'Bubbles & Blisters',
    summary:
      'Gas-filled internal pockets (bubbles) and raised surface domes (blisters) caused by moisture, trapped gas, degradation, or unfed shrinkage.',
    category: 'Cosmetic & Structural',
    severity: 'high',
    tags: ['moisture', 'venting', 'hot runner', 'cold runner', 'shrinkage', 'degradation'],
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        blocks: [
          {
            type: 'paragraph',
            text:
              "Bubbles and blisters are related but distinct defects. A 'bubble' is a gas- or vapor-filled pocket inside the section — often internal or sub-surface and only visible in transparent materials or after sectioning. A 'blister' is a raised, dome-like surface defect created when gas accumulates near the skin and pushes the outer layer outward. Both indicate non-homogeneous melt, trapped gas, volatile release, or shrinkage that wasn't compensated. They are NOT interchangeable with sink marks or vacuum voids, although the shop floor often confuses all four. [R1][R11][R12][R13]",
          },
          {
            type: 'paragraph',
            text:
              'Highest-probability causes rank differently by resin family. In hygroscopic materials (PC, PA, PBT, PET, blends), residual moisture is the first variable to verify — water becomes vapor or causes hydrolysis during melting. In non-hygroscopic materials (PP, PE), moisture is rarely primary; bubbles more commonly tie to trapped air, additive overheating, excessive decompression, feed-throat air entrainment, dead spots, or shrinkage in thick sections. [R2][R3][R8][R11]',
          },
          {
            type: 'paragraph',
            text:
              'The systems-level distinction that matters most: cold runner vs hot runner. Cold runners add thermal drop and cold-slug interfaces. Hot runners stabilize fill but add manifold/nozzle residence time, more thermal zones, and more failure modes (overheating, hold-up, controller drift). The defect cannot be diagnosed correctly without knowing which runner system is in the tool. [R3][R9][R10][R14]',
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Fastest reliable diagnostic sequence',
            text:
              'Classify the defect (internal bubble vs surface blister vs shrinkage void vs sink) → verify actual resin moisture (don\'t trust the dryer setpoint) → measure actual melt temperature with a purge-shot pyrometer → check screw recovery, back pressure, decompression, check-ring → inspect venting, gate freeze timing, thick-to-thin transitions → see if the symptom changes with runner zone adjustment. Correct based on physical mechanism, not visual symptom alone. [R1][R4][R8][R9][R12]',
          },
          {
            type: 'table',
            caption: 'Quick-response metric table',
            columns: ['Parameter', 'High-risk signal', 'Primary interpretation', 'First verification'],
            rows: [
              ['Moisture content', 'Silvering, blistering, bubbles, odor', 'Moisture or hydrolysis risk', 'Measure resin moisture; verify dryer dew point and hopper sealing'],
              ['Melt temperature', 'Foamed purge, smoke, volatile smell', 'Thermal degradation / volatile release', 'Measure actual melt temperature at purge'],
              ['Pack / hold', 'Internal bubbles in thick section', 'Shrinkage cavity or gas not compressed out', 'Review cavity pressure, pack pressure, gate freeze timing'],
              ['Hot-runner zones', 'Defect worsens by cavity or nozzle', 'Tip or manifold imbalance / hold-up', 'Check zone actuals, sensor health, startup history'],
              ['Venting', 'End-of-fill bubble or blister near last-fill area', 'Gas entrapment', 'Inspect vents, witness marks, trapped-air locations'],
            ],
          },
        ],
      },
      {
        id: 'definition',
        title: '1. Definition & Overview',
        blocks: [
          { type: 'heading', level: 3, text: '1.1 Precise technical definition' },
          {
            type: 'paragraph',
            text:
              'Bubbles are gas-filled cavities embedded within the polymer section — spherical, elliptical, elongated, or irregular. Their content may be air, moisture-derived steam, volatile decomposition products, gas entrained during plasticization, or a mix of gas and shrinkage-driven low pressure. In opaque parts they may be invisible at the surface; in transparent parts they are usually optically obvious. [R11][R12][R13]',
          },
          {
            type: 'paragraph',
            text:
              'Blisters are surface-adjacent gas pockets that lift the polymer skin and create a raised protrusion. A blister may remain a smooth dome, or the surface may craze, split, or open if the skin is thin or brittle. Relative to a bubble, a blister is shallower and closer to the surface; relative to a sink mark, a blister protrudes outward rather than depressing inward. [R1][R11][R18]',
          },
          {
            type: 'paragraph',
            text:
              'Bubbles/blisters must be distinguished from vacuum voids and sink marks. A vacuum void is a shrinkage cavity that forms when the core of a thick section contracts after the skin has frozen and packing can no longer feed the volume loss. A sink mark is the external depression from the same imbalance. By contrast, a bubble or blister contains gas or vapor — generated internally, entrained, or trapped. The two families can coexist in the same part. [R4][R6][R11][R13]',
          },
          { type: 'heading', level: 3, text: '1.2 Visual & structural manifestation' },
          {
            type: 'table',
            caption: 'Distinguishing bubbles, blisters, sinks, and vacuum voids',
            columns: ['Defect', 'Typical location', 'Surface appearance', 'Dominant mechanism'],
            rows: [
              ['Bubble', 'Internal or sub-surface', 'May be invisible externally; visible in transparent parts', 'Gas / vapor pocket, sometimes combined with shrinkage'],
              ['Blister', 'Near skin', 'Raised dome or swollen patch', 'Gas trapped close to surface or skin separation'],
              ['Sink mark', 'Over thick section, rib, or boss', 'Depression or dimpling', 'External skin drawn inward by late shrinkage'],
              ['Vacuum void', 'Core of thick section', 'Usually no surface sign until sectioned', 'Unfed core shrinkage after gate freeze'],
            ],
          },
          {
            type: 'paragraph',
            text:
              'Structurally, these defects matter beyond appearance. Internal bubbles reduce effective cross-section, act as crack initiators, disrupt optics, and change local modulus. In transparent medical housings or fluidic parts they can invalidate inspection, compromise leak-tightness, or trap sterilant residues. In plated or painted housings, blisters can telegraph through coatings during aging. In load-bearing clips and bosses they can trigger premature brittle fracture. [R2][R11][R13]',
          },
          {
            type: 'paragraph',
            text:
              'Morphology gives clues. Moisture-related defects often appear with silvering or foamed purge. Gas entrapment defects cluster at end-of-fill, near blind pockets, around thick-to-thin transitions, or adjacent to poorly vented features. Shrinkage-driven bubbles concentrate in thick sections and worsen when hold pressure/time is too low or gate freeze is too early. Surface blisters often appear after demolding or after warm storage as trapped gas expands. [R1][R2][R11][R12][R18]',
          },
        ],
      },
      {
        id: 'root-causes',
        title: '2. Root Causes',
        blocks: [
          { type: 'heading', level: 3, text: '2.1 Material factors' },
          {
            type: 'paragraph',
            text:
              'Material condition is the first branch in the decision tree. Hygroscopic resins absorb atmospheric moisture and release water vapor or hydrolytically degrade when heated. DuPont notes excess moisture in nylon causes hydrolysis and surface defects like bubbles or blisters; BASF and SABIC tie pellet moisture and poor drying control to visual gas defects and reduced mechanical properties. [R1][R2][R3]',
          },
          {
            type: 'paragraph',
            text:
              'Viscosity matters — gas removal and pressure transmission are viscosity-dependent. High-viscosity melts resist bubble collapse and make venting harder. Very low-viscosity melts may entrain air more easily under aggressive plasticizing or decompression. Bubble persistence is therefore a function of both gas generation and the melt\'s ability to compress, dissolve, or transport gas before the skin freezes. [R1][R2][R5]',
          },
          {
            type: 'paragraph',
            text:
              'Additives and fillers change the risk profile. Residual solvents, color concentrates with incompatible carriers, foaming contaminants, lubricants above effective range, or degraded regrind can outgas. Reinforcements may increase shear heating at restrictions and alter skin permeability, making sub-surface gas pockets more likely to telegraph as blisters. Mold-Masters warns that recycled resins show higher apparent hygroscopicity and should be dried separately from virgin resin. [R9][R11]',
          },
          {
            type: 'table',
            caption: 'Polymer susceptibility profile',
            columns: ['Polymer family', 'Susceptibility', 'Primary mechanism', 'Process implication'],
            rows: [
              ['PP / PE', 'Moderate', 'Trapped air, additive outgassing, shrinkage in thick sections', 'Drying secondary; venting, packing, decompression, geometry dominate'],
              ['ABS', 'Moderate–high', 'Residual moisture, thermal degradation, excessive shear, colorant/regrind volatiles', 'Monitor melt temp and residence time tightly'],
              ['PC', 'High', 'Moisture, hydrolysis, volatile release, hot-runner overexposure', 'Moisture measurement and actual melt verification mandatory'],
              ['PA / Nylon', 'Very high', 'Moisture uptake and hydrolysis; foamed purge and blisters', 'Dryer dew point, residence time, hopper sealing critical'],
              ['PET / PBT', 'High', 'Moisture and hydrolysis; gas from degraded melt', 'Drying discipline and limited residence time essential'],
              ['Filled blends', 'High if misprocessed', 'Shear heating, trapped gas at transitions, additive/regrind incompatibility', 'Gate design and temperature uniformity become more important'],
            ],
          },
          { type: 'heading', level: 3, text: '2.2 Process parameters' },
          {
            type: 'paragraph',
            text:
              'Injection speed has competing effects. Higher speed reduces front cooling time and can reduce shrinkage-driven bubbles by improving pressure transmission. The same increase can also worsen gas entrapment, raise shear heating at gates, and drive more air or volatiles into the part. There is no universal direction — the right change depends on whether the defect is air-entrapment-, moisture/degradation-, or shrinkage-dominant. [R1][R11][R12]',
          },
          {
            type: 'paragraph',
            text:
              'Injection pressure, hold pressure, and hold time distinguish gas defects from shrinkage cavities. If a bubble shrinks or disappears when hold pressure/time is increased and gate freeze delayed, the defect has a strong shrinkage component. If it persists despite greater packing but improves with drying, venting, or lower melt temperature, gas or moisture is more likely. [R4][R6]',
          },
          {
            type: 'paragraph',
            text:
              'Cooling rate and mold temperature control skin formation. Low mold temperature can freeze the skin too early, trapping gas beneath it and raising the chance of a surface blister. High mold temperature improves venting and surface replication but can extend gas mobility or delay sufficient skin strength if volatiles are present. The optimum supports stable filling, adequate packing, and predictable venting — not "the colder the better." [R1][R3][R11]',
          },
          {
            type: 'paragraph',
            text:
              'Gate size, location, and freeze timing are often underweighted. Small gates create high shear and localized overheating that releases volatiles or moisture as gas. Gates far from thick sections make pressure transmission to bubble-prone areas difficult. Gates that freeze early convert a packable condition into an unfeedable one. For cosmetic parts with bosses or thick hubs, direct gating or short last-packing paths dramatically reduce internal bubbles. [R3][R4][R6][R11]',
          },
          { type: 'heading', level: 3, text: '2.3 Mold design — cold vs hot runner, walls, venting' },
          {
            type: 'table',
            caption: 'Cold-runner vs hot-runner effects',
            columns: ['Design area', 'Cold runner', 'Hot runner', 'Bubble / blister consequence'],
            rows: [
              ['Thermal history', 'Shorter runner residence time; colder melt at gate', 'Longer manifold/nozzle residence time; more thermal zones', 'Cold runner reduces dwell-driven degradation but adds cold interfaces; hot runner can improve continuity OR create gas via overheating/hold-up'],
              ['Gate condition', 'Sprue/runner can form cold slug; earlier gate freeze', 'Tip thermally conditioned; valve or open tip state matters', 'Cold slug or early freeze can seed bubbles; poorly tuned hot tip can overheat or drool'],
              ['Maintenance burden', 'Lower controller complexity', 'Heaters, thermocouples, tips, manifold balancing required', 'Sensor drift or heater failure produces cavity-specific blisters'],
              ['Scrap / regrind loop', 'Runner scrap can add contamination if reground poorly', 'No runner scrap, but startup purge burden higher', 'Regrind moisture/contamination produces bubbles in cold runners; hot runner startup residue does the same'],
            ],
          },
          {
            type: 'paragraph',
            text:
              'Wall thickness variation is a classic bubble generator. Thick nodes, rib intersections, and boss roots cool slowly; if the skin freezes and pressure feed is lost, the core forms a cavity that may stay internal or migrate as a blister. Poor thin-to-thick transitions also trap air and create recirculation zones where volatiles concentrate. Keep walls uniform, core out massive sections, and radius transitions. [R3][R4][R6][R11]',
          },
          {
            type: 'paragraph',
            text:
              'Venting is decisive for surface blisters. Poorly vented end-of-fill regions trap air that gets compressed, heated, and held against a soft skin. The shop-floor clue is position: if the defect repeats at last-fill or in blind pockets, suspect venting before changing resin. [R14]',
          },
          { type: 'heading', level: 3, text: '2.4 Machine factors' },
          {
            type: 'paragraph',
            text:
              'Screw design and wear affect melt homogeneity, residence time, and gas entrainment. Excessive wear lowers pumping efficiency, changes actual compression ratio, and makes back-pressure settings less predictive. A worn or sticking non-return valve allows reverse flow during packing, reducing cavity pressure and converting fed shrinkage into bubbles or blisters. Mold-Masters explicitly lists back-flow valve malfunction as a probable cause. [R7][R9]',
          },
          {
            type: 'paragraph',
            text:
              'Back pressure has a dual role. Adequate back pressure improves homogeneity, expels trapped air between pellets, and reduces unmelted regions. Excessive back pressure increases shear heating and residence time, which degrades sensitive resins. Use the minimum that yields stable melt quality. Shops running near zero back pressure to save cycle time often pay for it in gas defects. [R1][R2][R3][R9]',
          },
          {
            type: 'paragraph',
            text:
              'Decompression deserves specific attention. A stroke that is too long or too abrupt pulls air into the front of the melt or destabilizes the nozzle, especially in hot-runner and open-nozzle systems. The telltale sign is shot-to-shot instability or foamy purge immediately after recovery. [R7][R9]',
          },
          {
            type: 'paragraph',
            text:
              'Clamp force has little direct causal relationship with bubbles compared to flash, but it matters indirectly through venting. If clamp force closes vents too early, trapped-gas defects worsen. Treat clamp as a secondary knob, not a first-line one. [R12][R14]',
          },
          { type: 'heading', level: 3, text: '2.5 Auxiliary equipment' },
          {
            type: 'paragraph',
            text:
              'Dryers and hopper systems are first-order controls for hygroscopic materials. Relevant metrics: actual dew point, air flow, hopper residence time, hopper-lid sealing, throughput, conveying-system leaks, and re-exposure of partially dried material to ambient air. RJG emphasizes that moisture defects usually come from the drying system not performing as assumed — not from the material being "not dried long enough." [R8]',
          },
          {
            type: 'paragraph',
            text:
              'Chillers and thermolators govern mold temperature stability, which influences skin formation, venting, and packing. Poor flow, clogged circuits, or imbalanced thermal circuits can make one cavity blister while others run clean. When bubbles localize to a cavity family, treat thermal equipment as part of the root-cause set. [R3][R6]',
          },
          {
            type: 'paragraph',
            text:
              'Hot-runner controllers influence bubble formation more than most technicians expect. Zone overshoot, sensor drift, or heater mismatch can overexpose resin in one nozzle while nominal setpoints look correct. [R9][R10]',
          },
        ],
      },
      {
        id: 'case-studies',
        title: '3. Real-World Case Studies',
        blocks: [
          {
            type: 'paragraph',
            text:
              'Cases below are composite production scenarios based on recurring mechanisms documented in supplier bulletins, process manuals, simulation guidance, and practitioner troubleshooting patterns. Anonymized for training use.',
          },
          { type: 'heading', level: 3, text: '3.1 Automotive interior carrier — opaque PP, cold runner' },
          { type: 'paragraph', text: 'Part: matte-black structural carrier with rib field and screw bosses; 2-cavity cold-runner tool.' },
          { type: 'paragraph', text: 'Symptom: internal bubbles visible after sectioning and occasional shallow surface domes near boss roots after warm storage.' },
          { type: 'paragraph', text: 'Initial misdiagnosis: treated as sink only — hold pressure raised aggressively. Cosmetic surface improved slightly but sectioned parts still showed cavities.' },
          { type: 'paragraph', text: 'Root cause: mixed mechanism — thick boss/rib intersections, early gate freeze in restrictive cold runner, insufficient pressure transmission to boss root. Modest gas content but the cavity behaved like a bubble because the core pulled away while the skin stayed intact.' },
          { type: 'paragraph', text: 'Corrective actions: enlarged gate, increased hold time after gate-freeze study, reduced boss wall, cored the root. Containment included cavity-pressure monitoring.' },
          { type: 'callout', tone: 'success', text: 'Outcome: internal bubbles eliminated; cavity-to-cavity variation collapsed within containment.' },

          { type: 'heading', level: 3, text: '3.2 Medical transparent housing — PC, hot runner' },
          { type: 'paragraph', text: 'Part: optically inspected transparent housing in a valve-gated hot-runner tool.' },
          { type: 'paragraph', text: 'Symptom: sub-surface bubbles clustered near one nozzle plus occasional silvering on startup lots.' },
          { type: 'paragraph', text: 'Initial misdiagnosis: contamination suspected because only one cavity was consistently affected.' },
          { type: 'paragraph', text: 'Root cause: controller actuals stable, but purge-shot measurement and teardown showed local nozzle overexposure and residue build-up. Marginal drying amplified the issue into localized gas defects.' },
          { type: 'paragraph', text: 'Corrective actions: restored dryer performance, sealed hopper, shortened startup dwell, cleaned nozzle, reduced unnecessary hold at temperature, tightened startup purge discipline.' },
          { type: 'callout', tone: 'success', text: 'Outcome: bubble rate fell below cosmetic reject limit; cavity-to-cavity variation disappeared.' },

          { type: 'heading', level: 3, text: '3.3 Consumer electronics bezel — ABS/PC, hot runner' },
          { type: 'paragraph', text: 'Part: high-gloss bezel with blind pockets and Class-A surfaces.' },
          { type: 'paragraph', text: 'Symptom: raised blisters near end-of-fill, visible under side lighting.' },
          { type: 'paragraph', text: 'Initial misdiagnosis: chased mold and melt temperature without inspecting vents — defect looked like a coating issue.' },
          { type: 'paragraph', text: 'Root cause: gas entrapment in blind pockets plus clamp/vent interaction. High clamp load and poor vent maintenance kept trapped gas beneath the skin.' },
          { type: 'paragraph', text: 'Corrective actions: cleaned and requalified vents, added venting in blind region, slowed initial speed slightly, recovered fill with faster mid-fill segment.' },
          { type: 'callout', tone: 'success', text: 'Outcome: blistering stopped without changing material or cycle time materially.' },

          { type: 'heading', level: 3, text: '3.4 Practitioner field notes' },
          {
            type: 'list',
            items: [
              'Technician: "If the purge shot looks foamy, stop changing mold temperature and prove moisture or degradation first."',
              'Engineer: "A cavity-specific bubble in a hot runner is not random until the nozzle, sensor, and startup history are ruled out."',
              'Tooling: "If the defect sits at end-of-fill every time, check venting before redesigning the whole process."',
            ],
          },
        ],
      },
      {
        id: 'diagnostics',
        title: '4. Diagnostic Techniques',
        blocks: [
          {
            type: 'paragraph',
            text:
              'Begin by classifying the defect correctly. Translucent or transparent parts can be inspected with transmitted light or a light table to distinguish internal bubbles from raised blisters. For opaque parts, use side lighting, gloss-angle changes, or warm-storage observation to determine whether the feature protrudes (blister) or depresses (sink). Cross-sectioning remains the fastest definitive method in many plants. [R11][R12][R13]',
          },
          {
            type: 'paragraph',
            text:
              'Microscopy resolves disputed classifications. Stereomicroscopy confirms whether the skin has lifted. Cross-sectional optical microscopy shows whether the cavity is internal, near-surface, or connected to flow layers. [R11]',
          },
          {
            type: 'paragraph',
            text:
              'Simulation must be framed honestly. Moldflow and Moldex3D are strong at predicting air traps, temperature gradients, fill imbalance, pressure transmission, weld lines, and shrinkage tendencies — excellent for identifying conditions where bubbles/blisters are likely. They do not explicitly simulate every moisture, hydrolysis, or blister-growth mechanism in standard analyses. Use gas-trap outputs, venting studies, end-of-fill pressure, volumetric shrinkage, temperature history, and residence-time proxies. [R5][R6][R17]',
          },
          {
            type: 'paragraph',
            text:
              'Non-destructive evaluation: X-ray/CT for internal bubbles in critical parts; ultrasonic where section thickness permits; infrared thermography to find thermal imbalance correlated with blister-prone regions; leak testing for fluidic parts. CT is most informative but usually reserved for validation, launch, or failure analysis due to cost.',
          },
          {
            type: 'table',
            caption: 'Diagnostic signature matrix',
            columns: ['Observed symptom', 'Most likely mechanism', 'Fastest proving test', 'Common false lead'],
            rows: [
              ['Foamed purge + silvering + bubbles', 'Moisture or degradation', 'Measure moisture; verify actual melt temp and residence time', 'Assuming the dryer setpoint proves the resin is dry'],
              ['Raised dome at last-fill area', 'Gas entrapment / blister', 'Inspect venting; reduce initial speed slightly; evaluate end-of-fill air trap', 'Treating it as sink and only increasing hold pressure'],
              ['Internal bubble in thick boss', 'Shrinkage + gas / poor feed', 'Gate-freeze study; increase hold time / gate size; section part', 'Blaming venting only'],
              ['Single hot-runner cavity affected', 'Nozzle-zone or residence imbalance', 'Swap or inspect nozzle zone; audit startup history', 'Changing global machine settings first'],
            ],
          },
        ],
      },
      {
        id: 'prevention',
        title: '5. Preventive Measures',
        blocks: [
          { type: 'heading', level: 3, text: '5.1 Material selection and handling' },
          {
            type: 'paragraph',
            text:
              'Choose resins whose moisture sensitivity, volatility, and cosmetic robustness fit the application. For transparent or appearance-critical parts, the combination of resin family, drying discipline, and color/additive package determines whether the process window is realistically robust. Verify drying requirements from the supplier guide, set moisture-content acceptance limits, and use separate regrind handling if regrind is allowed at all. [R2][R3][R8]',
          },
          {
            type: 'paragraph',
            text:
              'Treat additives cautiously. Flow promoters or lubricants reduce shear and help filling, but they also alter volatile content or slip behavior outside their design range. The goal is not to "add something to stop bubbles" but to ensure the additive package is chemically and thermally compatible.',
          },
          { type: 'heading', level: 3, text: '5.2 Process optimization — runner-specific' },
          {
            type: 'paragraph',
            text:
              'Cold-runner molds: keep material dry and homogeneous before the runner, avoid excessive pressure loss through long/small runners, and maintain enough pack duration before gate freeze to feed thick sections. Cold runners may be more forgiving for moisture/degradation defects (lower runner residence time) but less forgiving for shrinkage (gate freezes earlier; pressure path longer). [R3][R6][R10]',
          },
          {
            type: 'paragraph',
            text:
              'Hot-runner molds: prevention shifts toward thermal discipline. Startup, interruption handling, controller calibration, nozzle balance, and purge practice are critical. Hot runners can dramatically improve cosmetic consistency, but the same system can generate cavity-specific bubbles if one nozzle runs hot, leaks, or holds stagnant resin. Use controller alarms, startup SOPs, and zone trending — do not rely on displayed setpoint alone. [R9][R10]',
          },
          {
            type: 'paragraph',
            text:
              'Multi-stage injection helps with gas-entrapment blisters. A slower initial speed reduces severe compression of trapped gas at entry; a faster mid-fill segment maintains melt temperature and avoids hesitation; the final segment minimizes air-trap severity at last-fill. Pair with adequate venting — not a substitute for vent design.',
          },
          { type: 'heading', level: 3, text: '5.3 Mold design improvements' },
          {
            type: 'list',
            items: [
              'Place gates so the longest pressure path does not terminate in the thickest section unless that section is fully vented and feedable.',
              'Increase gate size or choose a gate type that delays freeze when thick sections must be packed out.',
              'Core out bosses, hubs, and heavy ribs rather than solving mass concentration with machine settings alone.',
              'Vent known air-trap regions proactively, including blind pockets, deep ribs, and end-of-fill areas.',
              'For multicavity tools, balance runner lengths and pressure drop so one cavity is not systematically bubble-prone.',
            ],
          },
          { type: 'heading', level: 3, text: '5.4 Machine calibration and maintenance' },
          {
            type: 'paragraph',
            text:
              'Bubble defects often emerge as equipment drift before they become chronic process failures. Inspect screw wear, check-ring sealing, nozzle condition, heater and sensor health, hot-runner harness integrity, and dryer performance on a schedule — not only after rejects appear. The value is detecting wear conditions before they create unplanned process instability. [R6]',
          },
        ],
      },
      {
        id: 'corrective',
        title: '6. Corrective Actions',
        blocks: [
          { type: 'heading', level: 3, text: '6.1 In-process adjustments' },
          {
            type: 'table',
            caption: 'Corrective action matrix by physical mechanism',
            columns: ['Mechanism', 'Primary process action', 'Secondary action', 'Cold-runner note', 'Hot-runner note'],
            rows: [
              ['Moisture / hydrolysis', 'Stop and prove moisture content; restore drying', 'Lower unnecessary melt temp; reduce dwell time', 'Inspect cold slug / purge evidence; do not blame runner first', 'Audit startup dwell, nozzle actuals, and hold-up zones immediately'],
              ['Gas entrapment / blister', 'Improve venting and modify fill profile', 'Reduce severe initial speed, then recover with faster mid-fill', 'Check last-fill venting and parting-line vent land', 'Check venting plus cavity-specific nozzle effects'],
              ['Shrinkage-driven bubble', 'Increase hold pressure / time and delay gate freeze', 'Increase gate size or move gate closer to thick section', 'Long pressure path often makes this worse', 'Hot runner may improve feed if nozzle/tip is stable'],
              ['Degradation / volatile release', 'Lower actual melt temp and reduce residence time', 'Purge contaminated material; inspect regrind and colorants', 'Simpler diagnosis — runner dwell is lower', 'Investigate manifold/nozzle overheating or stagnation first'],
            ],
          },
          { type: 'heading', level: 3, text: '6.2 Post-processing solutions' },
          {
            type: 'paragraph',
            text:
              'Treat post-processing as containment, not root-cause correction. Minor cosmetic blisters can sometimes be sanded, polished, or painted over after rework review, but that does not remove the structural discontinuity. For plated or coated parts, blistering often telegraphs through the finish later, especially after thermal cycling. [R11][R18]',
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Annealing has limited applicability',
            text:
              'It may relieve residual stress or reduce post-mold dimensional movement in some materials, but it does not reliably "heal" true gas-filled bubbles. If a blister was driven by trapped volatiles or a weak skin, annealing can worsen the appearance by changing internal pressure balance. Use only when the supplier approves the practice and the mechanism is understood.',
          },
          { type: 'heading', level: 3, text: '6.3 Redesign strategies' },
          {
            type: 'paragraph',
            text:
              'If the same feature bubbles at every validated process setting, redesign is warranted. The three most effective geometric interventions: reduce section thickness, core out concentrated mass, and move the gate so the thick region remains fed longer. For end-of-fill blisters, redesign vents and allow gas egress before changing cosmetic surface texture. Tooling redesign is expensive, but usually cheaper than chronic sort, rework, and warranty risk.',
          },
        ],
      },
      {
        id: 'best-practices',
        title: '7. Industry Best Practices',
        blocks: [
          {
            type: 'paragraph',
            text:
              'Use standards appropriately. ASTM D955 and ISO 294-4 are shrinkage-measurement standards, not bubble standards, but they\'re relevant — many internal cavities blamed on gas are actually shrinkage problems or mixed gas/shrinkage problems. Standardized shrinkage measurement separates material behavior from poor pressure transmission and provides a common language with material suppliers and customers. [R6][R7]',
          },
          {
            type: 'paragraph',
            text:
              'The most repeatable industry guidance comes from scientific molding: control melt preparation, prove actual melt conditions, track cavity pressure where justified, define the gate-freeze window, and distinguish filling defects from packing defects before making changes. Machine and hot-runner vendors emphasize maintenance, startup discipline, and real measurement over setpoint faith. [R8][R9][R10]',
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Heuristic decision rules',
            text:
              'All cavities + worsens with humidity/dryer upset → prove moisture first. One hot-runner cavity → suspect nozzle-zone or residence imbalance first. Thick sections + responds to hold changes → treat as feed/shrinkage problem. End-of-fill + local venting changes it → treat as trapped gas until proven otherwise.',
          },
        ],
      },
      {
        id: 'troubleshooting',
        title: '8. Troubleshooting Guide',
        blocks: [
          { type: 'heading', level: 3, text: '8.1 Step-by-step flowchart' },
          {
            type: 'orderedList',
            items: [
              'Confirm defect class: raised blister, internal bubble, sink, or vacuum void.',
              'Check material family: hygroscopic or non-hygroscopic?',
              'Verify actual resin moisture content and dryer dew point / hopper sealing.',
              'Verify actual melt temperature with purge-shot measurement.',
              'Inspect purge quality: foaming, odor, discoloration, unmelted particles, smoke.',
              'Review decompression, back pressure, screw recovery, and check-ring stability.',
              'Determine whether defect location is thick-section, end-of-fill, cavity-specific, or random.',
              'For thick-section defects: run gate-freeze / hold study before changing venting only.',
              'For end-of-fill defects: inspect vents, air traps, and fill-profile compression severity.',
              'For cavity-specific hot-runner defects: audit nozzle-zone actuals, startup dwell, and residue.',
              'Lock the corrected condition into an SOP with measured, not assumed, critical parameters.',
            ],
          },
          { type: 'heading', level: 3, text: '8.2 Common pitfalls' },
          {
            type: 'list',
            items: [
              'Pitfall: treating every bubble as moisture. Avoidance: classify by location, transparency, and response to hold pressure.',
              'Pitfall: trusting dryer settings. Avoidance: measure dew point and resin moisture, and inspect hopper integrity.',
              'Pitfall: chasing melt temperature without measuring actual melt. Avoidance: use purge-shot measurement and review residence time.',
              'Pitfall: raising hold pressure on a gas-entrapment blister until flash appears. Avoidance: prove venting and fill-profile effects first.',
              'Pitfall: ignoring cavity specificity in hot-runner tools. Avoidance: review nozzle zones and startup / interruption history by cavity.',
            ],
          },
        ],
      },
    ],
    references: [
      { id: 'R1', text: 'BASF. Injection-Molding Problems in Engineering Thermoplastics — Causes and Solutions.' },
      { id: 'R2', text: 'DuPont. Zytel and Minlon Nylon Resins Molding Guide — moisture, venting, defect effects.' },
      { id: 'R3', text: 'SABIC. Injection molding processing guides and resin processing references.' },
      { id: 'R4', text: 'Autodesk Moldflow. Troubleshooting guidance for sink/void behavior and simulation workflows.' },
      { id: 'R5', text: 'Moldex3D. Injection molding simulation; gas-assisted and foam modules.' },
      { id: 'R6', text: 'ASTM D955-21. Standard Test Method for Measuring Shrinkage from Mold Dimensions of Thermoplastics.' },
      { id: 'R7', text: 'ISO 294-4:2018. Plastics — Injection moulding of test specimens — Determination of moulding shrinkage.' },
      { id: 'R8', text: 'RJG. How to Prevent Moisture-Related Defects in Injection Molding.' },
      { id: 'R9', text: 'Mold-Masters. Hot Runner Troubleshooting Guide / User Manual.' },
      { id: 'R10', text: 'Husky. Hot Runner Product Handbook and controller materials.' },
      { id: 'R11', text: 'Ascend Materials. Tech Tip: Blisters — surface and cross-sectional interpretation.' },
      { id: 'R12', text: 'DME. Trouble Shooting — Bubbles. Practical process and venting adjustments.' },
      { id: 'R13', text: 'Beaumont Technologies. Injection Molding Glossary — Void.' },
      { id: 'R14', text: 'Autodesk University venting presentation / tooling recommendations.' },
      { id: 'R15', text: 'Zarges et al. Influence of Different Hot Runner-Systems on Temperature and Residence Time.' },
      { id: 'R17', text: 'Moldex3D foam/gas-assisted module documentation.' },
      { id: 'R18', text: 'Industry blister cross-section interpretation references.' },
    ],
  },
  ...additionalDefectGuides,
  coldSlugMarksGuide,
  delaminationGuide,
  warpageGuide,
  voidsGuide,
  shrinkageGuide,
  weldLinesGuide,
];

export const getDefectGuide = (slug: string) =>
  defectGuides.find((g) => g.slug === slug);
