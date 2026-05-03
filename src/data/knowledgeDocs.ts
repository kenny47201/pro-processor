import { fountainFlowGuide } from './fountainFlowGuide';
import { morphologyGuide } from './morphologyGuide';
import type { DefectGuide } from './defectGuides';

// Knowledge docs reuse the same structure as defect guides for rendering consistency
export type KnowledgeDoc = DefectGuide;

export const knowledgeDocs: KnowledgeDoc[] = [
  fountainFlowGuide,
  morphologyGuide,
];

export const getKnowledgeDoc = (slug: string) =>
  knowledgeDocs.find((d) => d.slug === slug);
