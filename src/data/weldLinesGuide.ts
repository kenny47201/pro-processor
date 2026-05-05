import type { DefectGuide } from './defectGuides';

export const weldLinesGuide: DefectGuide = {
  slug: 'weld-lines',
  title: 'Weld Lines',
  summary:
    'Visible and/or structural lines formed where two flow fronts meet but do not fully fuse. Caused by flow division around obstacles (cores, holes, multiple gates), low melt-front temperature, low pressure, poor venting, or contaminated melt. A weak weld can be both a cosmetic and a structural defect.',
  category: 'Cosmetic & Structural',
  severity: 'medium',
  tags: [
    'weld line', 'meld line', 'knit line', 'flow front', 'venting',
    'melt temperature', 'multi-gate', 'hot runner', 'cold runner', 'mold flow',
  ],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A weld line (also called a knit line) forms where two melt-flow fronts meet head-on inside the cavity — typically downstream of an obstacle such as a core pin, a hole, or between gates in a multi-gated tool. A meld line is a related defect where two fronts converge at a shallow angle and merge progressively rather than colliding directly. Both are interfaces where polymer chains have limited time to entangle across the boundary.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Weld vs meld — why it matters',
          text:
            'Weld lines (≥ ~135° meeting angle) tend to be stronger because chains have more time to interdiffuse. Meld lines (< ~135°) and "cold welds" — where flow fronts have already cooled significantly — produce the weakest joints and the most visible cosmetic notches. Strength loss across a poor weld can exceed 50% of the bulk material strength.',
        },
        { type: 'heading', level: 3, text: '1.2 Visual & structural manifestation' },
        {
          type: 'list',
          items: [
            'A fine line, V-notch, or color streak on the cosmetic surface, often downstream of holes, bosses, or core pins.',
            'On filled or pigmented materials, the line may be more visible because fillers/pigments do not orient across the interface.',
            'Structurally, the weld is a stress concentration that initiates cracks under impact or fatigue loading.',
            'Critical for transparent parts, painted/plated parts, and structural fasteners where the weld is in the load path.',
          ],
        },
      ],
    },
    {
      id: 'root-causes',
      title: '2. Root Causes',
      blocks: [
        { type: 'heading', level: 3, text: '2.1 Material factors' },
        {
          type: 'list',
          items: [
            'High-viscosity grades cool faster at the front and produce colder, weaker welds.',
            'Glass and mineral fillers do not bridge the weld interface — fiber-filled grades typically lose 30–60% of unfilled tensile strength at the weld.',
            'Pigments and incompatible color concentrates can darken the weld line and reduce interfacial adhesion.',
            'Moisture or volatiles trapped at the meeting point reduce contact area and create voids in the weld.',
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Process parameters' },
        {
          type: 'table',
          caption: 'Process effects on weld-line strength and visibility',
          columns: ['Parameter', 'Direction', 'Effect'],
          rows: [
            ['Melt temperature', 'Increase', 'Hotter fronts → better fusion, less visible weld'],
            ['Mold temperature', 'Increase', 'Slows skin formation; allows more interdiffusion'],
            ['Injection speed', 'Increase', 'Hotter front at meeting point; reduces cold-weld risk'],
            ['Pack pressure', 'Increase', 'Compresses interface; helps molecular contact'],
            ['Hold time', 'Increase', 'Maintains pressure across the weld until freeze'],
            ['Back pressure', 'Verify', 'Ensures homogeneous melt — avoids cold streaks'],
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Mold design — cold runner vs hot runner' },
        {
          type: 'table',
          caption: 'Runner system effects on weld lines',
          columns: ['Aspect', 'Cold Runner', 'Hot Runner'],
          rows: [
            ['Melt-front temperature uniformity', 'Lower (heat lost in runner)', 'Higher (melt stays at barrel temp)'],
            ['Multi-gate timing control', 'Fixed by runner geometry', 'Sequential / cascade valve gating possible'],
            ['Ability to relocate the weld', 'Requires re-cutting runners', 'Re-program valve-gate sequence'],
            ['Failure modes', 'Runner imbalance, cold slug at front', 'Tip temperature drift, valve mistiming'],
          ],
        },
        {
          type: 'paragraph',
          text:
            'On hot-runner tools with multiple drops, sequential (cascade) valve gating is the most effective tool to either eliminate a weld line or move it to a non-critical location. Opening valves in sequence forces a single moving flow front rather than two converging fronts.',
        },
        { type: 'heading', level: 3, text: '2.4 Venting & geometry' },
        {
          type: 'list',
          items: [
            'Air or gas trapped at the meeting point is the #1 cause of weak, burned, or visible welds — a vent at every weld location is mandatory.',
            'Sharp transitions and thin sections downstream of an obstacle cool the front faster and worsen weld visibility.',
            'Multiple gates with mismatched flow lengths cause off-center welds in unintended locations.',
          ],
        },
      ],
    },
    {
      id: 'diagnostics',
      title: '3. Diagnostic Techniques',
      blocks: [
        {
          type: 'list',
          items: [
            'Visual inspection under raking light reveals the line; index the location relative to gates and obstacles.',
            'Microscopy of a sectioned weld shows the V-notch depth and any voids or contamination at the interface.',
            'Tensile testing of weld-line specimens vs. bulk specimens quantifies strength loss.',
            'Mold-flow simulation (Moldflow, Moldex3D) predicts weld location, meeting angle, and front temperature — use it before re-cutting steel.',
            'Short-shot studies confirm fill pattern and identify the actual meeting point.',
          ],
        },
      ],
    },
    {
      id: 'prevention',
      title: '4. Preventive Measures',
      blocks: [
        {
          type: 'list',
          items: [
            'Run mold-flow simulation early in design to predict weld locations and verify they fall outside cosmetic and structural-critical regions.',
            'Add vents at every predicted weld location.',
            'Specify gate count and location to push welds to non-critical surfaces or eliminate them via sequential gating on hot-runner tools.',
            'Increase wall thickness locally at the weld region if possible — keeps the front hot longer.',
            'For fiber-filled parts, design assuming weld-line strength is 30–60% of bulk; add ribs or thickness to compensate.',
            'Avoid pigment systems known to dramatically increase weld visibility.',
          ],
        },
      ],
    },
    {
      id: 'corrective',
      title: '5. Corrective Actions',
      blocks: [
        {
          type: 'orderedList',
          items: [
            'Raise melt temperature 5–15 °C and re-evaluate. Watch for degradation (splay, color shift).',
            'Raise mold temperature 5–10 °C on the affected side.',
            'Increase injection speed (or steepen the velocity profile near the meeting point) to deliver hotter melt to the weld.',
            'Increase pack pressure and extend hold time so the interface stays under pressure during freeze.',
            'Verify and clear vents at the weld location — burned/clogged vents will undo every other change.',
            'On hot-runner tools, retime valve gates to convert the converging front into a single moving front, or relocate the weld.',
            'If process is exhausted: relocate or re-size gates, add an overflow well at the weld, or thicken the local wall.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Do not paint over a structural weld',
          text:
            'Cosmetic remediation (sanding, coating, texturing) hides the line but does not restore strength. If the weld is in a load path, validate the structural fix with tensile or impact testing — not just visual approval.',
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: '6. Quick-Reference Troubleshooting',
      blocks: [
        {
          type: 'table',
          caption: 'Symptom → most likely cause → first action',
          columns: ['Symptom', 'Most Likely Cause', 'First Action'],
          rows: [
            ['Sharp visible line, no burn', 'Cold front meeting', 'Raise melt & mold temp; raise injection speed'],
            ['Burn mark or discoloration at line', 'Trapped gas at weld', 'Open / clean vents at weld location'],
            ['Weld line in unexpected place', 'Imbalanced runner or gate timing', 'Mold-flow study; retime valve gates'],
            ['Part fractures along weld under load', 'Weak interfacial fusion (filled material)', 'Increase wall, relocate weld via gating, redesign'],
            ['Visible weld only on certain colors', 'Pigment / colorant orientation', 'Trial alternate masterbatch; raise melt temp'],
          ],
        },
      ],
    },
  ],
  references: [
    { id: 'R1', text: 'Polymer Engineering & Science — Weld Line Strength in Glass-Filled Thermoplastics.' },
    { id: 'R2', text: 'Plastics Technology — Troubleshooter: Weld & Meld Line Defect Series.' },
    { id: 'R3', text: 'SPE / ANTEC Papers on flow-front interdiffusion and weld-line mechanics.' },
    { id: 'R4', text: 'Autodesk Moldflow / Moldex3D — Weld-line prediction and meeting-angle analysis.' },
    { id: 'R5', text: 'Husky / Mold-Masters / INCOE — Sequential Valve Gating Application Notes.' },
    { id: 'R6', text: 'OEM technical datasheets (PA, PBT, PC, ABS, PP) — weld-line strength derating factors.' },
    { id: 'R7', text: 'ISO 294 — Plastics: Injection moulding of test specimens.' },
  ],
};
