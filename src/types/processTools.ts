// ============================================
// Process Tools Type Definitions
// ============================================

// Calculator result types
export interface TonnageResult {
  projectedArea: number;
  cavityPressure: number;
  safetyFactor: number;
  requiredTonnage: number;
  recommendedMachineSize: number;
}

export interface ShotVolumeResult {
  partVolume: number;
  runnerVolume: number;
  numberOfCavities: number;
  totalShotVolume: number;
  totalShotWeight: number;
  partWeight: number;
  runnerWeight: number;
}

export interface ThroughputResult {
  shotWeight: number;
  cycleTime: number;
  lbPerHour: number;
  partsPerHour: number;
  piecesPerCase: number;
  casesPerHour: number;
}

export interface CavityVariationResult {
  cavityWeights: number[];
  averageWeight: number;
  range: number;
  standardDeviation: number;
  coefficientOfVariation: number;
  maxDeviation: number;
}

export interface RunnerPressureLossResult {
  segments: Array<{
    name: string;
    length: number;
    diameter: number;
    pressureLoss: number;
  }>;
  totalPressureLoss: number;
}

export interface RunnerScrapYieldResult {
  partWeight: number;
  runnerWeight: number;
  cavities: number;
  shotsPerHour: number;
  runnerScrapPercent: number;
  runnerScrapLbPerHour: number;
  yieldPercent: number;
}

export interface ShearRateResult {
  volumetricFlowRate: number;
  gateDiameter: number;
  gateType: 'circular' | 'rectangular';
  gateWidth?: number;
  gateHeight?: number;
  shearRate: number;
  recommendation: string;
}

export interface DryerSizingResult {
  materialThroughput: number;
  requiredResidenceTime: number;
  requiredHopperVolume: number;
  recommendedDryerCapacity: number;
  safetyMargin: number;
}

export interface ChillerSizingResult {
  heatLoad: number; // BTU/hr
  tonsRequired: number;
  gpmRequired: number;
  recommendedCapacity: number;
}

// Study types
export interface ViscosityCurvePoint {
  shearRate: number;
  viscosity: number;
  temperature?: number;
}

export interface PackHoldStudyPoint {
  holdPressure: number;
  holdTime: number;
  partWeight: number;
  notes?: string;
}

export interface CoolTimeStudyPoint {
  coolTime: number;
  partTemp: number;
  partQuality: 'good' | 'marginal' | 'reject';
  notes?: string;
}

export interface GateSealStudyPoint {
  holdTime: number;
  partWeight: number;
  sealed: boolean;
}

export interface ShortShotStudyPoint {
  fillPercent: number;
  strokePosition: number;
  fillVolume: number;
  notes?: string;
}

// Common unit conversions
export const UNIT_CONVERSIONS = {
  // Volume
  cubicInchesToCubicCm: 16.387,
  cubicCmToCubicInches: 0.061024,
  // Weight
  gramsToOunces: 0.035274,
  ouncesToGrams: 28.3495,
  gramsToPounds: 0.00220462,
  poundsToGrams: 453.592,
  // Pressure
  psiToBar: 0.0689476,
  barToPsi: 14.5038,
  psiToMPa: 0.00689476,
  mpaToPsi: 145.038,
  // Area
  sqInchToSqCm: 6.4516,
  sqCmToSqInch: 0.155,
  // Force
  tonsToKN: 8.89644,
  knToTons: 0.112404,
};

// Material density defaults (g/cm³)
export const MATERIAL_DENSITIES: Record<string, number> = {
  'ABS': 1.05,
  'Acetal (POM)': 1.41,
  'Acrylic (PMMA)': 1.18,
  'Nylon 6': 1.13,
  'Nylon 66': 1.14,
  'PC': 1.20,
  'PC/ABS': 1.12,
  'PE-HD': 0.95,
  'PE-LD': 0.92,
  'PET': 1.37,
  'PP': 0.91,
  'PS': 1.05,
  'PVC Rigid': 1.40,
  'PVC Flexible': 1.30,
  'TPE': 1.10,
  'TPU': 1.20,
  'Custom': 1.00,
};

// Typical cavity pressures by material (psi)
export const TYPICAL_CAVITY_PRESSURES: Record<string, { min: number; max: number; typical: number }> = {
  'ABS': { min: 8000, max: 15000, typical: 10000 },
  'Acetal (POM)': { min: 10000, max: 20000, typical: 15000 },
  'Acrylic (PMMA)': { min: 8000, max: 15000, typical: 12000 },
  'Nylon 6': { min: 6000, max: 12000, typical: 8000 },
  'Nylon 66': { min: 8000, max: 15000, typical: 10000 },
  'PC': { min: 10000, max: 20000, typical: 15000 },
  'PC/ABS': { min: 8000, max: 16000, typical: 12000 },
  'PE-HD': { min: 4000, max: 10000, typical: 6000 },
  'PE-LD': { min: 3000, max: 8000, typical: 5000 },
  'PET': { min: 8000, max: 15000, typical: 10000 },
  'PP': { min: 4000, max: 10000, typical: 6000 },
  'PS': { min: 5000, max: 12000, typical: 8000 },
  'PVC Rigid': { min: 8000, max: 15000, typical: 10000 },
  'PVC Flexible': { min: 3000, max: 8000, typical: 5000 },
  'TPE': { min: 3000, max: 8000, typical: 5000 },
  'TPU': { min: 5000, max: 12000, typical: 8000 },
};

// Drying parameters by material
export const DRYING_PARAMETERS: Record<string, { temp: number; time: number; dewPoint: number }> = {
  'ABS': { temp: 180, time: 2, dewPoint: -20 },
  'Acetal (POM)': { temp: 180, time: 2, dewPoint: -40 },
  'Acrylic (PMMA)': { temp: 180, time: 2, dewPoint: -20 },
  'Nylon 6': { temp: 175, time: 4, dewPoint: -40 },
  'Nylon 66': { temp: 175, time: 4, dewPoint: -40 },
  'PC': { temp: 250, time: 4, dewPoint: -40 },
  'PC/ABS': { temp: 230, time: 3, dewPoint: -40 },
  'PE-HD': { temp: 140, time: 1, dewPoint: 0 },
  'PE-LD': { temp: 140, time: 1, dewPoint: 0 },
  'PET': { temp: 300, time: 4, dewPoint: -40 },
  'PP': { temp: 140, time: 1, dewPoint: 0 },
  'PS': { temp: 160, time: 1, dewPoint: 0 },
  'PVC Rigid': { temp: 160, time: 1, dewPoint: 0 },
  'PVC Flexible': { temp: 140, time: 1, dewPoint: 0 },
  'TPE': { temp: 160, time: 2, dewPoint: -20 },
  'TPU': { temp: 200, time: 3, dewPoint: -40 },
};

// Standard machine tonnage sizes
export const STANDARD_TONNAGES = [
  28, 35, 50, 55, 66, 77, 88, 110, 125, 154, 165, 200, 220, 275, 300, 330, 
  385, 400, 440, 500, 550, 610, 650, 720, 800, 900, 1000, 1100, 1300, 1500,
  1800, 2000, 2500, 3000, 3500, 4000, 5000, 6000
];
