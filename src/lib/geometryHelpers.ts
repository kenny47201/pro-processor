// ============================================
// Geometry & Machine Translation Helpers
// Small pure functions used by inline
// "derive from measurements" mini-calculators.
// All volumes returned in cm³, all lengths mm.
// ============================================

const MM3_PER_CC = 1000;

/** Box / rectangular prism: L × W × H (mm) → cm³ */
export function boxVolumeCc(lMm: number, wMm: number, hMm: number): number {
  return (lMm * wMm * hMm) / MM3_PER_CC;
}

/** Solid cylinder: π r² h (mm) → cm³ */
export function cylinderVolumeCc(diameterMm: number, heightMm: number): number {
  const r = diameterMm / 2;
  return (Math.PI * r * r * heightMm) / MM3_PER_CC;
}

/** Thin disc (same as cylinder, aliased for clarity) */
export function discVolumeCc(diameterMm: number, thicknessMm: number): number {
  return cylinderVolumeCc(diameterMm, thicknessMm);
}

/** Hollow tube: outer − inner cylinder */
export function tubeVolumeCc(odMm: number, idMm: number, heightMm: number): number {
  return cylinderVolumeCc(odMm, heightMm) - cylinderVolumeCc(idMm, heightMm);
}

/** Weight (g) ÷ density (g/cm³) = volume (cm³) */
export function volumeFromWeightCc(weightGrams: number, densityGCc: number): number {
  if (!densityGCc) return 0;
  return weightGrams / densityGCc;
}

// ---------- Runner shapes (one segment, total for N cavities) ----------

/** Full-round runner: π (d/2)² × L × count */
export function fullRoundRunnerCc(diameterMm: number, lengthMm: number, count = 1): number {
  return cylinderVolumeCc(diameterMm, lengthMm) * count;
}

/** Half-round runner: ½ π (d/2)² × L × count */
export function halfRoundRunnerCc(diameterMm: number, lengthMm: number, count = 1): number {
  return 0.5 * cylinderVolumeCc(diameterMm, lengthMm) * count;
}

/** Trapezoidal runner: ((top+bottom)/2) × depth × L × count */
export function trapezoidalRunnerCc(
  topWidthMm: number,
  bottomWidthMm: number,
  depthMm: number,
  lengthMm: number,
  count = 1,
): number {
  const areaMm2 = ((topWidthMm + bottomWidthMm) / 2) * depthMm;
  return (areaMm2 * lengthMm * count) / MM3_PER_CC;
}

/** Sprue cone (frustum): (π L / 3)(R1² + R1 R2 + R2²) */
export function sprueConeCc(smallDiameterMm: number, largeDiameterMm: number, lengthMm: number): number {
  const r1 = smallDiameterMm / 2;
  const r2 = largeDiameterMm / 2;
  return (Math.PI * lengthMm * (r1 * r1 + r1 * r2 + r2 * r2)) / (3 * MM3_PER_CC);
}

// ---------- Machine translation ----------

/**
 * Convert shot volume (cm³) into screw stroke (mm) for a given barrel diameter.
 * stroke = (V_cc × 1000) / (π × (D/2)²) + cushion + decompression
 */
export function shotVolumeToStrokeMm(
  shotVolumeCc: number,
  screwDiameterMm: number,
  cushionMm = 4,
  decompressionMm = 0,
): number {
  if (!screwDiameterMm) return 0;
  const r = screwDiameterMm / 2;
  const areaMm2 = Math.PI * r * r;
  const rawStrokeMm = (shotVolumeCc * MM3_PER_CC) / areaMm2;
  return rawStrokeMm + cushionMm + decompressionMm;
}

/** Transfer (V→P switchover) position at a given % of fill, in mm from cushion. */
export function transferPositionMm(
  totalStrokeMm: number,
  cushionMm: number,
  fillPercent = 95,
): number {
  const fillStroke = (totalStrokeMm - cushionMm) * (fillPercent / 100);
  return cushionMm + (totalStrokeMm - cushionMm) - fillStroke;
}
