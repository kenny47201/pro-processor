import type { DefectGuide } from './defectGuides';
import blackSpecksBarrelDiagram from '@/assets/black-specks-barrel-diagram.jpg';
import blackSpecksFlowchart from '@/assets/black-specks-flowchart.jpg';

export const blackSpecksGuide: DefectGuide = {
  slug: 'black-specks',
  title: 'Black Specks',
  summary:
    'Localized inclusions of carbonized polymer residue, degraded additives, or foreign particulate matter encapsulated within or adhered to the surface of a molded part. Caused by thermal degradation, mechanical wear, contamination, or dead spots in the melt delivery system.',
  category: 'Cosmetic & Structural',
  severity: 'high',
  tags: ['contamination', 'degradation', 'carbonization', 'purging', 'hot runner', 'cold runner', 'residence time', 'screw wear'],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Black specks are technically defined as localized inclusions of carbonized polymer residue, degraded additives, or foreign particulate matter that become encapsulated within the melt stream or adhere to the surface of a molded part. While the term is often used generically, the actual composition of a speck determines its root cause and the required corrective action. These defects are characterized by their discrete nature, distinguishing them from broader discoloration or splay.',
        },
        { type: 'heading', level: 3, text: '1.1 Visual & structural manifestation' },
        {
          type: 'table',
          caption: 'Diagnostic indicators by speck type',
          columns: ['Feature', 'Solid Contaminant (External)', 'Carbonized Residue (In-Process)', 'Metallic Wear Particulate'],
          rows: [
            ['Visual shape', 'Sharp edges, distinct geometry', 'Smudged, "cloud-like" or with tails', 'Often circular or flake-like under magnification'],
            ['Surface texture', 'May protrude or cause a pit', 'Usually flush with the surface', 'Can appear shiny or reflective'],
            ['Typical source', 'Regrind, dust, wood flour', 'Overheating, dead spots, long residence', 'Worn screw, check ring, or ejector pins'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Key diagnostic indicators',
          text:
            'Sharp, defined boundaries → external contamination. "Comet tail" or blurred appearance → in-process degradation. Surface vs. embedded: surface specks are often mold-related; embedded specks indicate material or machine issues.',
        },
        {
          type: 'paragraph',
          text:
            'Structurally, black specks can compromise mechanical performance — especially in high-stress applications — by acting as stress concentrators and crack initiation sites.',
        },
        {
          type: 'image',
          src: blackSpecksBarrelDiagram,
          alt: 'Injection molding barrel and screw cross-section showing black speck formation zones including dead spots, worn check ring, and carbonization areas',
          figureNumber: 'Figure 1',
          caption: 'Barrel and screw anatomy highlighting primary black speck formation zones: dead spots where material stagnates and carbonizes, worn check rings that allow backflow and extended residence time, and barrel surface pitting that traps and degrades resin.',
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
            'Identifying the root cause requires holistic analysis of the "4M" categories: Material, Machine, Mold, and Method (Process), plus auxiliary equipment.',
        },
        { type: 'heading', level: 3, text: '2.1 Material factors — chemical degradation' },
        {
          type: 'table',
          caption: 'Material thermal & shear sensitivity',
          columns: ['Material', 'Sensitivity', 'Characteristic Behavior'],
          rows: [
            ['Polypropylene (PP)', 'Low to Moderate', 'Relatively stable; degrades into yellowish-brown streaks if processing temperatures are inconsistent'],
            ['ABS', 'Moderate to High', 'Butadiene component cross-links and chars under excessive shear or temperature'],
            ['Polycarbonate (PC)', 'High', 'High viscosity leads to "gripping" on metal; reheating causes degradation before core melt is plasticized'],
          ],
        },
        {
          type: 'list',
          items: [
            'UV stabilizers, flame retardants, antistatic agents → degrade at lower temperatures than base resin',
            'Glass fibers / mineral fillers → increase internal shear, creating localized "hot spots" for charring',
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Process parameters — the Arrhenius effect' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Critical insight',
          text:
            'Even a small increase in temperature can exponentially increase black speck formation. The rate of degradation follows the Arrhenius equation: k = Ae^(−Ea/RT). Industry standard for optimal residence time: 20%–80% barrel utilization.',
        },
        {
          type: 'table',
          caption: 'Maximum recommended residence times',
          columns: ['Material', 'Max Recommended Residence Time', 'Sensitivity Level'],
          rows: [
            ['Polypropylene (PP)', '8–12 minutes', 'Low'],
            ['ABS', '5–8 minutes', 'Moderate'],
            ['Polycarbonate (PC)', '4–6 minutes', 'High'],
            ['POM (Acetal)', '3–5 minutes', 'Very High'],
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Mold design factors' },
        {
          type: 'list',
          items: [
            'Dead spots in hot runner manifold → material stagnates and chars',
            'Gates too small → excessive frictional heat',
            'Abrupt wall thickness changes → flow hesitation and stagnation during packing',
          ],
        },
        { type: 'heading', level: 3, text: '2.4 Machine factors — screw & barrel mechanics' },
        {
          type: 'table',
          caption: 'Primary sources of "internal" black specks',
          columns: ['Issue', 'Mechanism'],
          rows: [
            ['Screw flight wear', 'Creates dead spots where material accumulates and degrades'],
            ['Check ring wear', 'Allows melt to flow backward, increasing residence time'],
            ['Barrel damage/pitting', 'Material lodges in surface imperfections and carbonizes'],
            ['Nozzle tip / adapter', 'Dead zones at connections trap and degrade material'],
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
            '200x magnification standard for distinguishing organic carbonization from metallic wear particles',
            'Surface specks → often mold-related (dust, grease)',
            'Embedded specks → barrel, screw, or hot runner origin',
          ],
        },
        {
          type: 'image',
          src: blackSpecksFlowchart,
          alt: 'Black speck diagnostic flowchart showing decision tree from detection through classification of external contamination vs carbonized residue vs metallic wear',
          figureNumber: 'Figure 2',
          caption: 'Diagnostic decision tree for black speck classification. Start by examining speck morphology — sharp edges indicate external contamination; smudged or tailed specks indicate in-process carbonization. Surface vs. embedded location narrows the source to mold, barrel, or feed system.',
        },
        { type: 'heading', level: 3, text: '3.2 Diagnostic flow' },
        {
          type: 'orderedList',
          items: [
            'Macro-inspection: Speck (solid) vs. streak (viscous)? Streaks → melt temperature/shear issues. Specks → degradation/contamination.',
            'Location check: Random appearance → barrel and feed system. Same location every time → nozzle or hot runner.',
            'Purge analysis: Specks only in center of purge → barrel is culprit. Specks on outside of purge → nozzle tip or adapter.',
            'Mold flow simulation: Check residence time results, shear rate plots, and temperature distribution for high-risk zones.',
          ],
        },
        { type: 'heading', level: 3, text: '3.3 Common misdiagnoses' },
        {
          type: 'table',
          columns: ['Common Mistake', 'Consequence'],
          rows: [
            ['Assuming all specks are contamination', 'Ignoring internal degradation (barrel, screw, manifold wear)'],
            ['Using chemical purge without understanding the root cause', 'Temporarily masks the issue; specks return'],
            ['Ignoring hopper throat cooling', 'Bridge-melting and degradation at feed zone (standard: 38°C throat cooling)'],
          ],
        },
      ],
    },
    {
      id: 'corrective-actions',
      title: '4. Corrective & Preventive Actions',
      blocks: [
        { type: 'heading', level: 3, text: '4.1 Process optimization' },
        {
          type: 'list',
          items: [
            'Right-size the barrel: 20–80% barrel utilization to minimize residence time',
            'Multi-stage injection with gate slowdown reduces peak shear temperature',
            'For short stoppages (<4 hours): maintain barrel at 20–30°C above softening point',
          ],
        },
        { type: 'heading', level: 3, text: '4.2 Mold design improvements' },
        {
          type: 'list',
          items: [
            'Venting: ≥30% of part perimeter to prevent "diesel effect"',
            'Hot runner geometry: large fillet radii at manifold corners to eliminate dead spots',
            'Valve gate preferred over thermal gate for better flow control',
          ],
        },
        { type: 'heading', level: 3, text: '4.3 Purging strategies' },
        {
          type: 'table',
          columns: ['Action', 'Application'],
          rows: [
            ['Temperature cycling', 'Raise temperature 25–50°C to lower viscosity of stagnant resin, then dislodge with high-viscosity purge'],
            ['Chemical purge compounds', 'Use foaming agents that expand into dead spots; follow with production resin to flush residue'],
            ['Tool modification', 'Consistent location defects: enlarge gate, improve venting, or re-machine manifold transition'],
          ],
        },
        { type: 'heading', level: 3, text: '4.4 Machine maintenance' },
        {
          type: 'list',
          items: [
            'Inspect and replace check rings on regular PM schedule',
            'Screw/barrel inspection: check for scoring, pitting, and dimensional wear',
            'Nozzle and adapter inspection: verify no burrs or step-misalignment at interfaces',
          ],
        },
      ],
    },
    {
      id: 'best-practices',
      title: '5. Industry Best Practices',
      blocks: [
        {
          type: 'table',
          columns: ['Standard', 'Application'],
          rows: [
            ['ISO 1133 / ASTM D1238', 'Melt flow rate testing to monitor degradation over time'],
            ['ISO 13485 (Medical)', 'Mandates documented purge validation and material traceability'],
            ['IATF 16949 (Automotive)', 'Process audit standard requiring black speck tracking in PPM'],
          ],
        },
      ],
    },
  ],
  references: [
    { id: 'R1', text: 'Beaumont Technologies. Injection Molding Glossary — Black Specks.' },
    { id: 'R2', text: 'RJG. Identifying and Eliminating Black Specks in Injection Molding.' },
    { id: 'R3', text: 'Mold-Masters. Hot Runner Troubleshooting Guide.' },
    { id: 'R4', text: 'MINHUI. Black Spots in Injection Molding: Causes & Fixes.' },
    { id: 'R5', text: 'Entec Polymers. Troubleshooting Guide for Injection Molding.' },
    { id: 'R6', text: 'Nanoplas. Causes for Black Specks in Your Injection Molds.' },
    { id: 'R7', text: 'ResearchGate. Troubleshooting Black Specks and Color Streaks in Injection Molded Parts.' },
  ],
};
