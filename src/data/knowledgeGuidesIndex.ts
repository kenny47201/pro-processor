import { fountainFlowGuide } from './fountainFlowGuide';
import { gateFreezeGuide } from './gateFreezeGuide';
import { morphologyGuide } from './morphologyGuide';
import { multiStageGuide } from './multiStageGuide';
import { nucleationGuide } from './nucleationGuide';
import { witnessMarksGuide } from './witnessMarksGuide';
import { volumetricShrinkageGuide } from './volumetricShrinkageGuide';
import { crystallinityGuide } from './crystallinityGuide';
import { proactiveMaintenanceGuide } from './proactiveMaintenanceGuide';
import { hydraulicsPneumaticsGuide } from './hydraulicsPneumaticsGuide';
import { hydraulicPressureDropTroubleshooting } from './hydraulicPressureDropTroubleshooting';
import { pumpFailureSignsGuide } from './pumpFailureSignsGuide';
import { pumpFlowTestGuide } from './pumpFlowTestGuide';
import { hydraulicAirIngestionGuide } from './hydraulicAirIngestionGuide';
import { reservoirAirBleedGuide } from './reservoirAirBleedGuide';
import { cavitationVsAerationGuide } from './cavitationVsAerationGuide';
import { foamyOilRisksGuide } from './foamyOilRisksGuide';
import type { KnowledgeGuide } from './fountainFlowGuide';

export type KnowledgeDepartment = 'Processing' | 'Maintenance' | 'Tool Room';

export interface DepartmentalKnowledgeGuide extends KnowledgeGuide {
  department: KnowledgeDepartment;
}

export const knowledgeGuides: DepartmentalKnowledgeGuide[] = [
  { ...fountainFlowGuide, department: 'Processing' },
  { ...gateFreezeGuide, department: 'Processing' },
  { ...morphologyGuide, department: 'Processing' },
  { ...multiStageGuide, department: 'Processing' },
  { ...nucleationGuide, department: 'Processing' },
  { ...witnessMarksGuide, department: 'Processing' },
  { ...volumetricShrinkageGuide, department: 'Processing' },
  { ...crystallinityGuide, department: 'Processing' },
  { ...proactiveMaintenanceGuide, department: 'Maintenance' },
  { ...hydraulicsPneumaticsGuide, department: 'Maintenance' },
  { ...hydraulicPressureDropTroubleshooting, department: 'Maintenance' },
  { ...pumpFailureSignsGuide, department: 'Maintenance' },
  { ...pumpFlowTestGuide, department: 'Maintenance' },
  { ...hydraulicAirIngestionGuide, department: 'Maintenance' },
  { ...reservoirAirBleedGuide, department: 'Maintenance' },
  { ...cavitationVsAerationGuide, department: 'Maintenance' },
];

export const KNOWLEDGE_DEPARTMENTS: KnowledgeDepartment[] = ['Processing', 'Maintenance', 'Tool Room'];
