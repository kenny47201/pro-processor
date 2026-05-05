import type { DefectGuide } from './defectGuides';
import orangePeelFountainFlow from '@/assets/orange-peel-fountain-flow.jpg';

export const orangePeelGuide: DefectGuide = {
  slug: 'orange-peel',
  title: 'Orange Peel',
  summary:
    'Irregular, bumpy surface texture resembling citrus skin caused by fountain flow instability, premature skin solidification, or viscoelastic melt fracture. Severely impacts Class A surface aesthetics.',
  category: 'Cosmetic',
  severity: 'medium',
  tags: ['surface finish', 'orange peel', 'melt fracture', 'viscosity', 'mold temperature', 'fountain flow', 'aesthetic', 'DOI'],
  sections: [
    {
      id: 'overview',
      title: '1. Definition & Rheological Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The orange peel defect is a surface imperfection characterized by an irregular, bumpy, or wrinkled texture that visually resembles the skin of a citrus fruit. This texture results in a loss of gloss or poor Distinctness of Image (DOI), severely impacting Class A surfaces. It is classified as a surface waviness defect, occupying the longer wavelength end of the surface structure spectrum.',
        },
        {
          type: 'image',
          src: orangePeelFountainFlow,
          alt: 'Side-by-side comparison of proper fountain flow with smooth surface replication versus disturbed flow with premature skin solidification causing orange peel texture',
          figureNumber: 'Figure 1',
          caption: 'Fountain flow and orange peel formation: Proper flow (left) — hot melt contacts mold wall under pressure, faithfully replicating the smooth surface. Disturbed flow (right) — premature skin solidification creates wrinkled, bumpy texture as the frozen outer layer cannot conform to the cavity wall.',
        },
        { type: 'heading', level: 3, text: '1.1 Fountain flow instability mechanism' },
        {
          type: 'paragraph',
          text:
            'The fundamental origin lies in disturbances within the melt front\'s fountain flow during filling. If the melt flow rate is insufficient or viscosity too high, the surface solidifies prematurely. As flow continues, resistance increases, and the melt front becomes uneven — the solidified outer layer cannot fully replicate the cavity wall, resulting in microscopic wrinkles that become permanent defects.',
        },
        { type: 'heading', level: 3, text: '1.2 Viscoelastic instability' },
        {
          type: 'callout',
          tone: 'info',
          title: 'Deborah number and melt fracture',
          text:
            'When high shear rates cause the process time to fall below the polymer\'s relaxation time, the Deborah number increases. The material behaves more like an elastic solid, leading to surface rupture, unstable slip-stick behavior, or skin displacement — permanently recorded as the orange peel texture.',
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
            'High intrinsic viscosity — major contributor, especially in thick-walled products. PC, PMMA, and ABS are particularly susceptible.',
            'Low thermal conductivity — high-performance resins make heat extraction challenging in thick sections.',
            'Moisture contamination — gas bubbles at the flow front disrupt smooth melt advancement.',
          ],
        },
        { type: 'heading', level: 3, text: '2.2 Process factors' },
        {
          type: 'list',
          items: [
            'Low mold temperature — premature boundary layer solidification prevents surface replication.',
            'Low melt temperature — insufficient thermal energy for polymer conformity.',
            'Low injection speed → surface cures too rapidly → uneven flow front → wrinkling.',
            'High injection speed (near gate) → excessive shear displaces cooled skin layer → dark spots.',
            'Multi-step injection profiling needed: slow start → fast fill → controlled end-of-fill.',
          ],
        },
        { type: 'heading', level: 3, text: '2.3 Mold design factors' },
        {
          type: 'list',
          items: [
            'Non-uniform cooling → temperature gradients → patchy surface quality.',
            'Insufficient mold polish for aesthetic requirement.',
            'Gate location creates flow hesitation or jetting.',
            'Thick sections with poor thermal management.',
          ],
        },
      ],
    },
    {
      id: 'diagnostics',
      title: '3. Diagnostic Techniques',
      blocks: [
        {
          type: 'table',
          caption: 'Objective measurement parameters for orange peel',
          columns: ['Parameter', 'Instrument', 'Standard/Criteria'],
          rows: [
            ['Waviness (Wa)', 'Profilometer', 'Captures macro-waviness responsible for orange peel texture'],
            ['DOI (Distinctness of Image)', 'Wave-scan DOI meter', 'Measures sharpness of reflected image; <80 indicates texture'],
            ['Gloss (GU)', 'Gloss meter (60°)', 'ASTM D2457; lower GU correlates with orange peel severity'],
            ['Surface roughness (Ra)', 'Contact profilometer', 'Separates micro-roughness from macro-waviness'],
          ],
        },
        {
          type: 'table',
          caption: 'Diagnostic and correction matrix',
          columns: ['Observation', 'Probable Cause', 'First Action'],
          rows: [
            ['Uniform orange peel across part', 'Mold temperature too low', 'Increase mold temp 10–30°F'],
            ['Orange peel worse in thick sections', 'Thermal deficit / slow flow', 'Increase melt temp and injection speed'],
            ['Orange peel near gate only', 'Excessive shear / jetting', 'Slow initial injection speed; enlarge gate'],
            ['Orange peel at end-of-fill', 'Flow front cooling before reaching end', 'Increase overall injection speed'],
          ],
        },
      ],
    },
    {
      id: 'corrective-actions',
      title: '4. Corrective & Preventive Actions',
      blocks: [
        { type: 'heading', level: 3, text: '4.1 Thermal optimization' },
        {
          type: 'list',
          items: [
            'Increase mold temperature — first and most impactful adjustment.',
            'Increase melt temperature within material specification.',
            'Ensure cooling circuit uniformity.',
          ],
        },
        { type: 'heading', level: 3, text: '4.2 Flow optimization' },
        {
          type: 'list',
          items: [
            'Use multi-step injection velocity profiling: slow → fast → controlled deceleration.',
            'Increase back pressure for better melt homogeneity.',
            'Optimize gate size to reduce shear stress at entry.',
          ],
        },
        { type: 'heading', level: 3, text: '4.3 DfM & tooling' },
        {
          type: 'list',
          items: [
            'Maintain uniform wall thickness to prevent differential cooling.',
            'Polish mold surface to SPI A-1 or better for Class A requirements.',
            'Gate into thick sections to maintain flow front temperature.',
          ],
        },
      ],
    },
  ],
  references: [
    { id: 'R1', text: 'BYK-Gardner. Orange Peel and DOI Measurement in Automotive Surfaces.' },
    { id: 'R2', text: 'ASTM D2457. Standard Test Method for Specular Gloss of Plastic Films.' },
    { id: 'R3', text: 'Paulson Training. Surface Finish Defects in Injection Molding.' },
    { id: 'R4', text: 'Autodesk Moldflow. Surface Quality Prediction and Optimization.' },
  ],
};
