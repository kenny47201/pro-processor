import { fountainFlowGuide } from './fountainFlowGuide';
import { gateFreezeGuide } from './gateFreezeGuide';
import { morphologyGuide } from './morphologyGuide';
import { multiStageGuide } from './multiStageGuide';
import { nucleationGuide } from './nucleationGuide';
import { witnessMarksGuide } from './witnessMarksGuide';
import { volumetricShrinkageGuide } from './volumetricShrinkageGuide';
import { crystallinityGuide } from './crystallinityGuide';
import type { KnowledgeGuide } from './fountainFlowGuide';

export const knowledgeGuides: KnowledgeGuide[] = [
  fountainFlowGuide,
  gateFreezeGuide,
  morphologyGuide,
  multiStageGuide,
  nucleationGuide,
  witnessMarksGuide,
  volumetricShrinkageGuide,
  crystallinityGuide,
];
