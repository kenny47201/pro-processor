// ============================================
// Pro-Processor Seed Data Export (Simplified)
// ============================================

export { tenants, facilities } from './seed/tenants';
export { users } from './seed/users';
export { shiftTaskLists, shiftTaskItems } from './seed/shiftTasks';
export { assets, materials } from './seed/assets';
export { conversations, conversationMessages } from './seed/conversations';
export { issues, issueEvents, issueSignOffs } from './seed/issues';
export { fixRecords, fixVerifications } from './seed/fixRecords';
export { knowledgeDocs, defectGuides, companyNotes } from './seed/knowledgeDocs';
export type { CompanyNote } from './seed/knowledgeDocs';

// Re-export types for convenience
export type {
  Tenant,
  Facility,
  User,
  UserRole,
  Department,
  Shift,
  ShiftTaskList,
  ShiftTaskItem,
  Asset,
  Material,
  Conversation,
  ConversationMessage,
  Issue,
  IssueEvent,
  IssueSignOff,
  FixRecord,
  FixVerification,
  KnowledgeDoc,
  DefectGuide,
} from '@/types/models';