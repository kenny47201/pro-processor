import { Asset, Material } from '@/types/models';

export const assets: Asset[] = [
  // ============================================
  // Acme Pharma Closures (T1, F1)
  // ============================================
  {
    id: 'A1',
    tenantId: 'T1',
    facilityId: 'F1',
    type: 'Press',
    name: 'Engel 500T #1',
    model: 'Victory 500',
    manufacturer: 'Engel',
    status: 'Running',
    tags: ['high-volume', 'medical'],
  },
  {
    id: 'A2',
    tenantId: 'T1',
    facilityId: 'F1',
    type: 'Press',
    name: 'Arburg 320T',
    model: 'Allrounder 320',
    manufacturer: 'Arburg',
    status: 'Running',
    tags: ['precision', 'cleanroom'],
  },
  {
    id: 'A3',
    tenantId: 'T1',
    facilityId: 'F1',
    type: 'Mold',
    name: 'Cap Mold 32-Cavity',
    model: 'CM-32-PH',
    manufacturer: 'MoldTech',
    status: 'Running',
    tags: ['pharma-grade', 'hot-runner'],
  },
  {
    id: 'A4',
    tenantId: 'T1',
    facilityId: 'F1',
    type: 'Mold',
    name: 'Closure Mold 16-Cavity',
    model: 'CL-16-STD',
    manufacturer: 'AccuMold',
    status: 'Idle',
    tags: ['standard', 'cold-runner'],
  },
  {
    id: 'A5',
    tenantId: 'T1',
    facilityId: 'F1',
    type: 'Auxiliary',
    name: 'Dryer Unit #1',
    model: 'DryMax 200',
    manufacturer: 'Conair',
    status: 'Running',
    tags: ['desiccant'],
  },
  // ============================================
  // Northbound Plastics (T2, F2)
  // ============================================
  {
    id: 'A6',
    tenantId: 'T2',
    facilityId: 'F2',
    type: 'Press',
    name: 'Haitian Jupiter 650T',
    model: 'Jupiter III',
    manufacturer: 'Haitian',
    status: 'Running',
    tags: ['automotive', 'high-tonnage'],
  },
  {
    id: 'A7',
    tenantId: 'T2',
    facilityId: 'F2',
    type: 'Press',
    name: 'Milacron 280T',
    model: 'Roboshot S280',
    manufacturer: 'Milacron',
    status: 'Down',
    tags: ['electric', 'precision'],
  },
  {
    id: 'A8',
    tenantId: 'T2',
    facilityId: 'F2',
    type: 'Mold',
    name: 'Housing Mold 4-Cavity',
    model: 'HM-4-AUTO',
    manufacturer: 'ToolCraft',
    status: 'Running',
    tags: ['automotive', 'gas-assist'],
  },
];

export const materials: Material[] = [
  // ============================================
  // Acme Pharma Closures (T1)
  // ============================================
  {
    id: 'M1',
    tenantId: 'T1',
    name: 'PP Homopolymer - Medical Grade',
    type: 'Resin',
    manufacturer: 'LyondellBasell',
    grade: 'Purell HP570M',
    properties: { mfi: '12', density: '0.905' },
    handlingNotes: 'Dry 2-4 hrs at 80°C if moisture detected',
    tags: ['medical', 'FDA-approved'],
  },
  {
    id: 'M2',
    tenantId: 'T1',
    name: 'HDPE - Pharma Closure',
    type: 'Resin',
    manufacturer: 'Braskem',
    grade: 'HD7255',
    properties: { mfi: '8', density: '0.952' },
    handlingNotes: 'No drying required under normal conditions',
    tags: ['closure', 'child-resistant'],
  },
  {
    id: 'M3',
    tenantId: 'T1',
    name: 'Blue Masterbatch',
    type: 'Colorant',
    manufacturer: 'Clariant',
    grade: 'Renol Blue 2B',
    tags: ['colorant', 'pharma-safe'],
  },
  // ============================================
  // Northbound Plastics (T2)
  // ============================================
  {
    id: 'M4',
    tenantId: 'T2',
    name: 'ABS - Automotive Grade',
    type: 'Resin',
    manufacturer: 'SABIC',
    grade: 'Cycolac MG47',
    properties: { mfi: '10', impactStrength: '320' },
    handlingNotes: 'Dry 3-4 hrs at 85°C',
    tags: ['automotive', 'high-impact'],
  },
  {
    id: 'M5',
    tenantId: 'T2',
    name: 'Glass-Filled Nylon 6/6',
    type: 'Resin',
    manufacturer: 'DuPont',
    grade: 'Zytel 70G33',
    properties: { glassContent: '33%', meltTemp: '280°C' },
    handlingNotes: 'Critical: Dry 4+ hrs at 90°C. Hygroscopic.',
    tags: ['structural', 'glass-filled'],
  },
];
