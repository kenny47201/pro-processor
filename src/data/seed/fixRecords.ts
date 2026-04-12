import { FixRecord, FixVerification } from '@/types/models';

export const fixRecords: FixRecord[] = [
  // ============================================
  // Acme Pharma Closures (T1) - 6 fix records
  // ============================================
  
  // Committed - from ISS4 (dryer issue)
  {
    id: 'FIX1',
    tenantId: 'T1',
    sourceIssueId: 'ISS4',
    title: 'Dryer Regeneration Cycle Failure Fix',
    problemSummary: 'Desiccant dryer unit #1 not completing regeneration cycle, causing material moisture levels to exceed specification.',
    rootCause: 'Faulty solenoid valve in the regeneration circuit was intermittently sticking closed, preventing proper airflow during the regeneration phase.',
    fixSteps: [
      { step: 1, detail: 'Isolate dryer from production line and ensure proper lockout/tagout' },
      { step: 2, detail: 'Remove access panel to regeneration valve assembly' },
      { step: 3, detail: 'Test solenoid valve with multimeter - check for 24VDC signal' },
      { step: 4, detail: 'Replace faulty solenoid valve (Part #DRY-SOL-24V-A)' },
      { step: 5, detail: 'Reassemble and run 3 complete regeneration cycles' },
      { step: 6, detail: 'Verify moisture levels are within 0.02% specification' },
    ],
    verificationChecklist: [
      { check: 'Regeneration cycle completes within 4 hours', passed: true },
      { check: 'Dew point reaches -40°F during drying phase', passed: true },
      { check: 'Material moisture content below 0.02%', passed: true },
      { check: 'No fault codes on controller display', passed: true },
    ],
    relatedDefectIds: [],
    relatedAssetIds: ['A5'],
    relatedMaterialIds: ['M1', 'M2'],
    createdBy: 'U3',
    createdAt: '2024-01-19T14:30:00Z',
    status: 'Committed',
    committedToKnowledgeDocId: 'DOC-FIX1',
  },

  // Verified - ready for commit, from ISS3 (wall thickness issue)
  {
    id: 'FIX2',
    tenantId: 'T1',
    sourceIssueId: 'ISS3',
    title: 'Hold Pressure Adjustment for Wall Thickness',
    problemSummary: 'Cap wall thickness measuring below specification (0.48mm vs 0.50mm) on cavities 8-12.',
    rootCause: 'Hold pressure had drifted from 92 bar to 85 bar due to hydraulic valve wear. The reduced pressure caused insufficient packing in the affected cavities.',
    fixSteps: [
      { step: 1, detail: 'Stop production and document current pressure settings' },
      { step: 2, detail: 'Increase hold pressure from 85 bar to 92 bar' },
      { step: 3, detail: 'Run 50 shots and measure wall thickness on cavities 8-12' },
      { step: 4, detail: 'Confirm all measurements are 0.50mm ± 0.02mm' },
      { step: 5, detail: 'Update process sheet with new hold pressure setting' },
    ],
    verificationChecklist: [
      { check: 'Wall thickness on cavities 8-12 is within spec', passed: true },
      { check: 'No flash on parting line', passed: true },
      { check: 'Process sheet updated with new settings', passed: true },
    ],
    relatedDefectIds: [],
    relatedAssetIds: ['A3'],
    relatedMaterialIds: ['M1'],
    createdBy: 'U6',
    createdAt: '2024-01-19T15:30:00Z',
    status: 'Verified',
  },

  // Pending Verification - from ISS1 (thermocouple)
  {
    id: 'FIX3',
    tenantId: 'T1',
    sourceIssueId: 'ISS1',
    title: 'Zone 3 Thermocouple Replacement Procedure',
    problemSummary: 'Intermittent temperature readings on Zone 3 causing process instability and part variations.',
    rootCause: 'Original thermocouple was degraded with corrosion at the junction point, causing resistance fluctuations and erratic readings.',
    fixSteps: [
      { step: 1, detail: 'Allow barrel to cool to ambient temperature' },
      { step: 2, detail: 'Remove retaining clip and pull old thermocouple' },
      { step: 3, detail: 'Apply anti-seize compound to new thermocouple threads' },
      { step: 4, detail: 'Insert new J-type thermocouple and secure with clip' },
      { step: 5, detail: 'Calibrate zone using reference thermometer' },
      { step: 6, detail: 'Monitor readings for 24 hours before normal production' },
    ],
    verificationChecklist: [
      { check: 'Temperature readings stable within ±2°F', passed: undefined },
      { check: 'No temperature alarms for 24 hours', passed: undefined },
      { check: 'Part dimensions consistent across all shifts', passed: undefined },
    ],
    relatedDefectIds: [],
    relatedAssetIds: ['A1'],
    relatedMaterialIds: [],
    createdBy: 'U3',
    createdAt: '2024-01-22T10:30:00Z',
    status: 'PendingVerification',
  },

  // Draft - not yet submitted
  {
    id: 'FIX4',
    tenantId: 'T1',
    sourceIssueId: undefined,
    title: 'Hydraulic Accumulator Precharge Procedure',
    problemSummary: 'Cycle time drift observed over shift duration, affecting production efficiency.',
    rootCause: 'Accumulator nitrogen precharge pressure had dropped from 1200 PSI to 950 PSI, causing slower hydraulic response.',
    fixSteps: [
      { step: 1, detail: 'Verify accumulator pressure using nitrogen gauge' },
      { step: 2, detail: 'If below 1150 PSI, recharge to 1200 PSI ± 50' },
      { step: 3, detail: 'Check bladder integrity during recharge' },
    ],
    verificationChecklist: [
      { check: 'Precharge pressure at 1200 PSI ± 50', passed: undefined },
      { check: 'Cycle time within 24.5s ± 0.5s', passed: undefined },
    ],
    relatedDefectIds: [],
    relatedAssetIds: ['A2'],
    relatedMaterialIds: [],
    createdBy: 'U3',
    createdAt: '2024-01-23T09:00:00Z',
    status: 'Draft',
  },

  // Pending Verification
  {
    id: 'FIX5',
    tenantId: 'T1',
    sourceIssueId: 'ISS2',
    title: 'Clamp Force Adjustment for Flash Prevention',
    problemSummary: 'Intermittent flash on cavities 14-16 of the 32-cavity cap mold.',
    rootCause: 'Mold wear on parting line surface near cavities 14-16 allowed material escape under previous clamp force settings.',
    fixSteps: [
      { step: 1, detail: 'Increase clamp force from 280T to 300T' },
      { step: 2, detail: 'Inspect parting line with blue dye check' },
      { step: 3, detail: 'Run 100 shots and inspect all parts from cavities 14-16' },
      { step: 4, detail: 'Document parting line wear for tooling PM schedule' },
    ],
    verificationChecklist: [
      { check: 'No flash on cavities 14-16 for 500+ shots', passed: undefined },
      { check: 'Parting line wear documented', passed: undefined },
      { check: 'PM ticket created for mold repair', passed: undefined },
    ],
    relatedDefectIds: [],
    relatedAssetIds: ['A3'],
    relatedMaterialIds: ['M1'],
    createdBy: 'U5',
    createdAt: '2024-01-22T11:00:00Z',
    status: 'PendingVerification',
  },

  // Rejected - needs rework
  {
    id: 'FIX6',
    tenantId: 'T1',
    sourceIssueId: undefined,
    title: 'Color Masterbatch Letdown Ratio Adjustment',
    problemSummary: 'Parts showing inconsistent color intensity across production lots.',
    rootCause: 'Masterbatch letdown ratio was not adjusted for new material lot with higher pigment concentration.',
    fixSteps: [
      { step: 1, detail: 'Test new masterbatch lot at 3% letdown ratio' },
      { step: 2, detail: 'Compare to color standard using spectrophotometer' },
    ],
    verificationChecklist: [
      { check: 'Delta E value below 1.0 vs color standard', passed: false },
    ],
    relatedDefectIds: [],
    relatedAssetIds: [],
    relatedMaterialIds: ['M3'],
    createdBy: 'U1',
    createdAt: '2024-01-20T08:00:00Z',
    status: 'Rejected',
  },

  // ============================================
  // Northbound Plastics (T2) - 4 fix records
  // ============================================
  
  // Committed
  {
    id: 'FIX7',
    tenantId: 'T2',
    sourceIssueId: undefined,
    title: 'Glass-Filled Nylon Screw Purge Procedure',
    problemSummary: 'Material buildup in screw flights causing periodic overload faults on extruder motor.',
    rootCause: 'Glass fibers accumulating in dead spots of screw flights over extended production runs, creating binding condition.',
    fixSteps: [
      { step: 1, detail: 'Run high-viscosity purge compound at end of each shift' },
      { step: 2, detail: 'Increase barrel temperature by 20°F during purge' },
      { step: 3, detail: 'Run purge until compound comes out clean (typically 10 lbs)' },
      { step: 4, detail: 'Document purge completion in shift log' },
    ],
    verificationChecklist: [
      { check: 'No motor overload faults for 30 days', passed: true },
      { check: 'Purge log maintained by all shifts', passed: true },
      { check: 'Screw inspection shows no buildup at PM intervals', passed: true },
    ],
    relatedDefectIds: [],
    relatedAssetIds: ['A7'],
    relatedMaterialIds: ['M5'],
    createdBy: 'U11',
    createdAt: '2024-01-15T14:00:00Z',
    status: 'Committed',
    committedToKnowledgeDocId: 'DOC-FIX7',
  },

  // Verified
  {
    id: 'FIX8',
    tenantId: 'T2',
    sourceIssueId: 'ISS7',
    title: 'Gas Assist Timing Calibration for Housing Mold',
    problemSummary: 'Sink marks appearing on thick sections of housing parts despite gas assist injection.',
    rootCause: 'Gas injection delay was too long, allowing material to cool past optimal temperature for gas penetration.',
    fixSteps: [
      { step: 1, detail: 'Reduce gas injection delay from 2.5s to 1.8s' },
      { step: 2, detail: 'Increase gas pressure from 200 bar to 250 bar' },
      { step: 3, detail: 'Run 25 shots and section-cut for gas channel verification' },
      { step: 4, detail: 'Measure sink depth with profilometer' },
    ],
    verificationChecklist: [
      { check: 'Sink depth below 0.05mm on all thick sections', passed: true },
      { check: 'Gas channel centered in thick sections', passed: true },
      { check: 'No gas blowout at gates', passed: true },
    ],
    relatedDefectIds: [],
    relatedAssetIds: ['A8'],
    relatedMaterialIds: [],
    createdBy: 'U12',
    createdAt: '2024-01-21T10:00:00Z',
    status: 'Verified',
  },

  // Pending Verification
  {
    id: 'FIX9',
    tenantId: 'T2',
    sourceIssueId: 'ISS8',
    title: 'Dryer Temperature Profile for Glass-Filled Nylon',
    problemSummary: 'Material moisture content exceeding 0.1% limit, causing splay defects in parts.',
    rootCause: 'Dryer temperature was set too low for glass-filled nylon grade, insufficient to drive out moisture within standard drying time.',
    fixSteps: [
      { step: 1, detail: 'Increase dryer temperature from 150°F to 180°F' },
      { step: 2, detail: 'Extend drying time from 4 hours to 6 hours minimum' },
      { step: 3, detail: 'Verify hopper capacity provides adequate residence time' },
      { step: 4, detail: 'Test moisture content with Karl Fischer titrator' },
    ],
    verificationChecklist: [
      { check: 'Moisture content below 0.08% after drying', passed: undefined },
      { check: 'No splay defects in production parts', passed: undefined },
      { check: 'Dryer settings documented in work instructions', passed: undefined },
    ],
    relatedDefectIds: [],
    relatedAssetIds: [],
    relatedMaterialIds: ['M5'],
    createdBy: 'U10',
    createdAt: '2024-01-22T10:00:00Z',
    status: 'PendingVerification',
  },

  // Draft
  {
    id: 'FIX10',
    tenantId: 'T2',
    sourceIssueId: undefined,
    title: 'Connector Pin Alignment Issue Resolution',
    problemSummary: 'Connector housing pins occasionally misaligned after assembly.',
    rootCause: 'Work in progress - investigating mold alignment and ejection pattern.',
    fixSteps: [
      { step: 1, detail: 'Check mold alignment with dial indicator' },
    ],
    verificationChecklist: [
      { check: 'Pin alignment within 0.05mm tolerance', passed: undefined },
    ],
    relatedDefectIds: [],
    relatedAssetIds: ['A8'],
    relatedMaterialIds: ['M5'],
    createdBy: 'U12',
    createdAt: '2024-01-23T08:00:00Z',
    status: 'Draft',
  },
];

export const fixVerifications: FixVerification[] = [
  // FIX1 verifications (Committed)
  {
    id: 'FXVER1',
    fixRecordId: 'FIX1',
    verifierUserId: 'U6', // Supervisor verified
    decision: 'Approve',
    notes: 'Fix procedure is thorough and well-documented. Dryer has been running without issues for 48 hours. Recommend adding solenoid inspection to quarterly PM schedule.',
    timestamp: '2024-01-19T16:00:00Z',
  },

  // FIX2 verifications (Verified)
  {
    id: 'FXVER2',
    fixRecordId: 'FIX2',
    verifierUserId: 'U6',
    decision: 'Approve',
    notes: 'Measured parts from cavities 8-12 are all within specification. Process sheet has been updated. Good root cause analysis.',
    timestamp: '2024-01-20T09:00:00Z',
  },

  // FIX5 - has a request for changes
  {
    id: 'FXVER3',
    fixRecordId: 'FIX5',
    verifierUserId: 'U6',
    decision: 'RequestChanges',
    notes: 'Need to add a step for documenting the parting line wear measurements before proceeding. Also specify what tonnage increment was used.',
    timestamp: '2024-01-22T14:00:00Z',
  },

  // FIX6 rejected
  {
    id: 'FXVER4',
    fixRecordId: 'FIX6',
    verifierUserId: 'U6',
    decision: 'Reject',
    notes: 'The fix steps are incomplete. Need full procedure including spectrophotometer calibration and retention of color samples. Delta E was 1.8 on test, not acceptable.',
    timestamp: '2024-01-21T10:00:00Z',
  },

  // FIX7 verifications (Committed)
  {
    id: 'FXVER5',
    fixRecordId: 'FIX7',
    verifierUserId: 'U13',
    decision: 'Approve',
    notes: 'Purge procedure has been followed for 2 weeks with zero motor faults. Excellent preventive solution.',
    timestamp: '2024-01-20T11:00:00Z',
  },

  // FIX8 verifications (Verified)
  {
    id: 'FXVER6',
    fixRecordId: 'FIX8',
    verifierUserId: 'U13',
    decision: 'Approve',
    notes: 'Section cuts confirmed proper gas channel formation. Sink marks eliminated. Ready for manager sign-off and commit to knowledge base.',
    timestamp: '2024-01-22T08:00:00Z',
  },
];
