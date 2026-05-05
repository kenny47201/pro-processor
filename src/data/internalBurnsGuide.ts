import type { DefectGuide } from './defectGuides';
import internalBurnsDieselEffect from '@/assets/internal-burns-diesel-effect.jpg';
import internalBurnsVentingDesign from '@/assets/internal-burns-venting-design.jpg';

export const internalBurnsGuide: DefectGuide = {
  slug: 'internal-burns',
  title: 'Internal Burns',
  summary:
    'Thermal degradation beneath the part surface appearing as black, brown, or rust-colored specks/streaks. Caused by adiabatic compression (diesel effect), shear-induced heating, or prolonged residence time.',
  category: 'Cosmetic & Structural',
  severity: 'high',
  tags: ['burn marks', 'diesel effect', 'venting', 'degradation', 'shear heating', 'residence time', 'hot runner', 'cold runner'],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Internal burns represent thermal degradation of the polymer beneath the surface of the molded component. These defects manifest as irreversible discoloration — black, brown, or rust-colored specks or streaks embedded within the part cross-section. Their presence confirms superheating and subsequent thermal degradation.',
        },
        { type: 'heading', level: 3, text: '1.1 Internal burns vs. surface burns' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Critical distinction',
          text:
            'Surface burns are localized discolorations at edges or final fill areas caused by adiabatic compression of trapped air against the mold wall — overwhelmingly pointing to venting deficiency. Internal burns suggest issues with the polymer\'s thermal history or systemic contamination.',
        },
        { type: 'heading', level: 3, text: '1.2 Burning mechanisms' },
        {
          type: 'table',
          caption: 'Three mechanisms of internal burn formation',
          columns: ['Mechanism', 'Description', 'Primary System'],
          rows: [
            ['Adiabatic Compression (Diesel Effect)', 'Trapped gas compressed rapidly → temperature spike ignites gas and degrades polymer', 'Cold Runner (high velocity)'],
            ['Shear-Induced Heating', 'Friction between polymer layers or with mold/machine surfaces → localized superheating', 'Both (undersized gates, thin walls)'],
            ['Prolonged Residence Time (RTD)', 'Extended exposure to high temperature in barrel or manifold → thermal oxidative degradation', 'Hot Runner (primary concern)'],
          ],
        },
      ],
    },
    {
      id: 'root-causes',
      title: '2. Root Causes (4M Analysis)',
      blocks: [
        { type: 'heading', level: 3, text: '2.1 Material factors' },
        {
          type: 'list',
          items: [
            'Polymers with low thermal stability degrade under standard processing temperatures.',
            'Improperly dried hygroscopic resins — water flashes to steam, contributing to adiabatic compression.',
            'Additives (flame retardants, colorants) with lower Tdeg than base resin cause off-gassing.',
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Mold factors' },
        {
          type: 'list',
          items: [
            'Venting deficiency — the most frequently identified cause of compression burns. Recommended vent depths: 0.012–0.025 mm for small parts, 0.025–0.038 mm for larger components.',
            'Excessively small gates induce high shear heating.',
            'Complex features (deep ribs, blind pockets, sharp internal corners) trap gas.',
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Process factors' },
        {
          type: 'list',
          items: [
            'High injection velocity — primary catalyst for adiabatic compression burns.',
            'Excessive barrel temperatures.',
            'Oversized barrel (shot size < 25% capacity) → extended residence time.',
          ],
        },
        { type: 'heading', level: 3, text: '2.4 Hot runner vs cold runner comparison' },
        {
          type: 'table',
          columns: ['Root Cause', 'Cold Runner', 'Hot Runner'],
          rows: [
            ['Adiabatic compression', 'High risk (rapid fill)', 'Moderate risk'],
            ['Residence time degradation', 'Low risk', 'High risk (manifold dead zones)'],
            ['Shear heating', 'At gates/runners', 'At nozzle tips and valve pins'],
            ['Primary mitigation', 'Venting design (0.012–0.038 mm)', 'Thermal zone management + venting'],
          ],
        },
      ],
    },
    {
      id: 'diagnostics',
      title: '3. Diagnostic Techniques',
      blocks: [
        {
          type: 'orderedList',
          items: [
            'Tier 1: Identify burn location — end-of-fill (venting), gate area (shear), random (material degradation).',
            'Tier 2: Verify material — check certificate of analysis, pre-drying log, residual moisture content.',
            'Tier 3: Process data logging — monitor peak injection pressure, melt temperature, and cycle-to-cycle variation.',
            'Tier 4: Mold flow analysis — shear rate plots, air trap prediction, temperature distribution.',
          ],
        },
        {
          type: 'table',
          caption: 'Burn location diagnostic matrix',
          columns: ['Burn Location/Type', 'Primary Cause', 'First Action'],
          rows: [
            ['End-of-fill / last-fill areas', 'Gas entrapment (diesel effect)', 'Improve venting; reduce injection speed'],
            ['Near gate or thin sections', 'Shear-induced heating', 'Enlarge gate; reduce injection speed'],
            ['Random, intermittent streaks', 'Residence time degradation', 'Right-size barrel; inspect hot runner zones'],
            ['Post-boss or rib areas', 'Trapped gas in blind pocket', 'Add vent pins or porous inserts'],
          ],
        },
      ],
    },
    {
      id: 'corrective-actions',
      title: '4. Corrective & Preventive Actions',
      blocks: [
        { type: 'heading', level: 3, text: '4.1 Mold venting (most critical)' },
        {
          type: 'list',
          items: [
            'Vent depth: 0.012–0.025 mm (small parts), 0.025–0.038 mm (larger parts).',
            'Land length: 3–6 mm before opening to evacuation channel.',
            'Vent ≥30% of part perimeter at final fill locations.',
            'Add vent pins or porous steel inserts in blind pockets.',
          ],
        },
        { type: 'heading', level: 3, text: '4.2 Process adjustments' },
        {
          type: 'list',
          items: [
            'Reduce injection velocity — especially near end of fill (multi-stage profiles).',
            'Lower barrel temperatures within material window.',
            'Right-size barrel to maintain 25–75% utilization.',
          ],
        },
        { type: 'heading', level: 3, text: '4.3 Hot runner prevention' },
        {
          type: 'list',
          items: [
            'Minimize manifold volume and dead zones.',
            'Implement zone-by-zone temperature monitoring.',
            'Regular purging schedule for stagnant zones.',
          ],
        },
      ],
    },
  ],
  references: [
    { id: 'R1', text: 'NanoMoldCoating. Injection Molding Defects: Burns Troubleshooting Chart.' },
    { id: 'R2', text: 'RJG. Injection Molding Burn Marks — Causes and Solutions.' },
    { id: 'R3', text: 'Beaumont Technologies. Injection Molding Defect Analysis.' },
    { id: 'R4', text: 'Mold-Masters. Hot Runner Design for Reduced Residence Time.' },
  ],
};
