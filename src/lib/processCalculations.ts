// ============================================
// Process Tools Calculation Functions
// ============================================

import { STANDARD_TONNAGES, UNIT_CONVERSIONS } from '@/types/processTools';

// ============================================
// Setup & Sizing Calculators
// ============================================

/**
 * Calculate required clamp tonnage
 * F_required = projected area × cavity pressure × safety factor
 */
export function calculateClampTonnage(
  projectedAreaSqIn: number,
  cavityPressurePsi: number,
  safetyFactor: number = 1.1
): { requiredTonnage: number; recommendedMachine: number } {
  // Force in pounds = area (sq in) × pressure (psi)
  const forceInPounds = projectedAreaSqIn * cavityPressurePsi * safetyFactor;
  // Convert to tons (1 ton = 2000 lbs)
  const requiredTonnage = forceInPounds / 2000;
  
  // Find recommended machine size (next standard size up)
  const recommendedMachine = STANDARD_TONNAGES.find(t => t >= requiredTonnage) || 
    STANDARD_TONNAGES[STANDARD_TONNAGES.length - 1];
  
  return { requiredTonnage, recommendedMachine };
}

/**
 * Calculate shot volume and weight
 */
export function calculateShotVolumeWeight(
  partVolumeCubicCm: number,
  runnerVolumeCubicCm: number,
  numberOfCavities: number,
  materialDensity: number // g/cm³
): {
  totalShotVolume: number;
  totalShotWeight: number;
  partWeight: number;
  runnerWeight: number;
} {
  const totalPartVolume = partVolumeCubicCm * numberOfCavities;
  const totalShotVolume = totalPartVolume + runnerVolumeCubicCm;
  
  const partWeight = partVolumeCubicCm * materialDensity;
  const runnerWeight = runnerVolumeCubicCm * materialDensity;
  const totalShotWeight = totalShotVolume * materialDensity;
  
  return {
    totalShotVolume,
    totalShotWeight,
    partWeight,
    runnerWeight,
  };
}

/**
 * Calculate throughput metrics
 * Lb/hr = shot weight × (3600 / cycle time)
 */
export function calculateThroughput(
  shotWeightGrams: number,
  cycleTimeSeconds: number,
  cavities: number,
  piecesPerCase: number
): {
  lbPerHour: number;
  partsPerHour: number;
  casesPerHour: number;
  shotsPerHour: number;
} {
  const shotsPerHour = 3600 / cycleTimeSeconds;
  const partsPerHour = shotsPerHour * cavities;
  const lbPerHour = (shotWeightGrams * shotsPerHour) * UNIT_CONVERSIONS.gramsToPounds;
  const casesPerHour = partsPerHour / piecesPerCase;
  
  return {
    lbPerHour,
    partsPerHour,
    casesPerHour,
    shotsPerHour,
  };
}

/**
 * Calculate cavity-to-cavity weight variation statistics
 */
export function calculateCavityVariation(weights: number[]): {
  average: number;
  range: number;
  standardDeviation: number;
  coefficientOfVariation: number;
  maxDeviation: number;
  maxDeviationPercent: number;
} {
  if (weights.length === 0) {
    return { average: 0, range: 0, standardDeviation: 0, coefficientOfVariation: 0, maxDeviation: 0, maxDeviationPercent: 0 };
  }
  
  const average = weights.reduce((a, b) => a + b, 0) / weights.length;
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const range = max - min;
  
  const squaredDiffs = weights.map(w => Math.pow(w - average, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / weights.length;
  const standardDeviation = Math.sqrt(variance);
  const coefficientOfVariation = (standardDeviation / average) * 100;
  
  const maxDeviation = Math.max(Math.abs(max - average), Math.abs(min - average));
  const maxDeviationPercent = (maxDeviation / average) * 100;
  
  return {
    average,
    range,
    standardDeviation,
    coefficientOfVariation,
    maxDeviation,
    maxDeviationPercent,
  };
}

/**
 * Calculate runner pressure loss for a segment
 * Using simplified Hagen-Poiseuille approximation
 */
export function calculateRunnerPressureLoss(
  lengthMm: number,
  diameterMm: number,
  flowRateCc: number,
  viscosityPaS: number = 200 // typical melt viscosity
): number {
  // Convert to SI units
  const lengthM = lengthMm / 1000;
  const radiusM = (diameterMm / 2) / 1000;
  const flowRateM3s = (flowRateCc / 1000000); // approximate per second
  
  // Hagen-Poiseuille: ΔP = (8 × μ × L × Q) / (π × r⁴)
  const pressureLossPa = (8 * viscosityPaS * lengthM * flowRateM3s) / (Math.PI * Math.pow(radiusM, 4));
  
  // Convert to PSI
  return pressureLossPa * 0.000145038;
}

/**
 * Calculate runner scrap and yield rates
 */
export function calculateRunnerScrapYield(
  partWeightGrams: number,
  runnerWeightGrams: number,
  cavities: number,
  shotsPerHour: number
): {
  runnerScrapPercent: number;
  runnerScrapLbPerHour: number;
  yieldPercent: number;
  partOutputLbPerHour: number;
} {
  const totalPartsWeight = partWeightGrams * cavities;
  const totalShotWeight = totalPartsWeight + runnerWeightGrams;
  
  const runnerScrapPercent = (runnerWeightGrams / totalShotWeight) * 100;
  const yieldPercent = (totalPartsWeight / totalShotWeight) * 100;
  
  const runnerScrapLbPerHour = (runnerWeightGrams * shotsPerHour) * UNIT_CONVERSIONS.gramsToPounds;
  const partOutputLbPerHour = (totalPartsWeight * shotsPerHour) * UNIT_CONVERSIONS.gramsToPounds;
  
  return {
    runnerScrapPercent,
    runnerScrapLbPerHour,
    yieldPercent,
    partOutputLbPerHour,
  };
}

/**
 * Calculate shear rate through the gate
 * For circular gate: γ = (4 × Q) / (π × r³)
 * For rectangular gate: γ = (6 × Q) / (w × h²)
 */
export function calculateGateShearRate(
  volumetricFlowRateCcS: number,
  gateType: 'circular' | 'rectangular',
  gateDiameterMm?: number,
  gateWidthMm?: number,
  gateHeightMm?: number
): { shearRate: number; recommendation: string } {
  let shearRate: number;
  
  if (gateType === 'circular' && gateDiameterMm) {
    const radiusM = (gateDiameterMm / 2) / 1000;
    const flowRateM3s = volumetricFlowRateCcS / 1000000;
    shearRate = (4 * flowRateM3s) / (Math.PI * Math.pow(radiusM, 3));
  } else if (gateType === 'rectangular' && gateWidthMm && gateHeightMm) {
    const widthM = gateWidthMm / 1000;
    const heightM = gateHeightMm / 1000;
    const flowRateM3s = volumetricFlowRateCcS / 1000000;
    shearRate = (6 * flowRateM3s) / (widthM * Math.pow(heightM, 2));
  } else {
    return { shearRate: 0, recommendation: 'Invalid gate parameters' };
  }
  
  // Provide recommendation based on typical ranges
  let recommendation: string;
  if (shearRate < 10000) {
    recommendation = 'LOW - May cause hesitation marks or poor fill';
  } else if (shearRate < 50000) {
    recommendation = 'OPTIMAL - Good balance of fill and quality';
  } else if (shearRate < 100000) {
    recommendation = 'HIGH - Monitor for gate blush or burning';
  } else {
    recommendation = 'EXCESSIVE - Risk of material degradation';
  }
  
  return { shearRate, recommendation };
}

/**
 * Calculate dryer sizing requirements
 */
export function calculateDryerSizing(
  materialThroughputLbHr: number,
  requiredResidenceTimeHours: number,
  bulkDensityLbCuFt: number = 35, // typical for pellets
  safetyFactor: number = 1.25
): {
  requiredHopperVolumeCuFt: number;
  recommendedDryerCapacityLbHr: number;
} {
  // Volume = (throughput × residence time) / bulk density
  const requiredHopperVolumeCuFt = (materialThroughputLbHr * requiredResidenceTimeHours) / bulkDensityLbCuFt;
  const recommendedDryerCapacityLbHr = materialThroughputLbHr * safetyFactor;
  
  return {
    requiredHopperVolumeCuFt: requiredHopperVolumeCuFt * safetyFactor,
    recommendedDryerCapacityLbHr,
  };
}

/**
 * Calculate chiller sizing requirements
 * Tons = Q(BTU/hr) / 12,000
 * GPM = Q / (500 × ΔT°F)
 */
export function calculateChillerSizing(
  shotWeightGrams: number,
  cycleTimeSeconds: number,
  meltTempF: number,
  ejectTempF: number,
  specificHeatBtuLbF: number = 0.4, // typical for plastics
  deltaT_allowableF: number = 10
): {
  heatLoadBtuHr: number;
  tonsRequired: number;
  gpmRequired: number;
} {
  const shotsPerHour = 3600 / cycleTimeSeconds;
  const shotWeightLb = shotWeightGrams * UNIT_CONVERSIONS.gramsToPounds;
  
  // Q_remove = m × Cp × ΔT (per shot)
  const heatPerShotBtu = shotWeightLb * specificHeatBtuLbF * (meltTempF - ejectTempF);
  const heatLoadBtuHr = heatPerShotBtu * shotsPerHour;
  
  // Tons of refrigeration
  const tonsRequired = heatLoadBtuHr / 12000;
  
  // GPM = Q / (500 × ΔT)
  const gpmRequired = heatLoadBtuHr / (500 * deltaT_allowableF);
  
  return {
    heatLoadBtuHr,
    tonsRequired,
    gpmRequired,
  };
}

/**
 * Calculate max shot capacity utilization
 */
export function calculateShotUtilization(
  shotWeightGrams: number,
  barrelCapacityGrams: number
): {
  utilizationPercent: number;
  recommendation: string;
} {
  const utilizationPercent = (shotWeightGrams / barrelCapacityGrams) * 100;
  
  let recommendation: string;
  if (utilizationPercent < 20) {
    recommendation = 'LOW - Risk of material degradation from long residence time';
  } else if (utilizationPercent < 30) {
    recommendation = 'MARGINAL - Consider smaller barrel or faster cycle';
  } else if (utilizationPercent <= 80) {
    recommendation = 'OPTIMAL - Good balance of capacity and residence';
  } else {
    recommendation = 'HIGH - May have plasticating issues, consider larger machine';
  }
  
  return { utilizationPercent, recommendation };
}

/**
 * Calculate screw swept volume
 */
export function calculateScrewSweptVolume(
  barrelDiameterMm: number,
  strokeMm: number
): {
  sweptVolumeCc: number;
  sweptVolumeOz: number;
} {
  const barrelRadiusCm = (barrelDiameterMm / 2) / 10;
  const strokeCm = strokeMm / 10;
  
  const sweptVolumeCc = Math.PI * Math.pow(barrelRadiusCm, 2) * strokeCm;
  const sweptVolumeOz = sweptVolumeCc * 0.033814;
  
  return { sweptVolumeCc, sweptVolumeOz };
}

/**
 * Calculate plasticating output
 */
export function calculatePlasticatingOutput(
  shotWeightGrams: number,
  cycleTimeSeconds: number
): {
  lbPerHour: number;
  kgPerHour: number;
} {
  const cyclesPerHour = 3600 / cycleTimeSeconds;
  const kgPerHour = (shotWeightGrams * cyclesPerHour) / 1000;
  const lbPerHour = kgPerHour * 2.20462;
  
  return { lbPerHour, kgPerHour };
}

/**
 * Calculate linear shrinkage
 */
export function calculateLinearShrinkage(
  moldDimension: number,
  partDimension: number
): {
  shrinkagePercent: number;
  shrinkagePerInch: number;
} {
  const shrinkagePercent = ((moldDimension - partDimension) / moldDimension) * 100;
  const shrinkagePerInch = shrinkagePercent / 100; // in/in
  
  return { shrinkagePercent, shrinkagePerInch };
}
