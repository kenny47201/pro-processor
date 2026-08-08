// ============================================
// Pro-Processor Domain Types (Simplified)
// ============================================

// Role definitions
export type UserRole = 
  | 'processor'
  | 'maintenance_tech'
  | 'tooling_specialist'
  | 'supervisor'
  | 'manager'
  | 'admin'
  | 'super_admin';

export type Department = 'Processing' | 'Maintenance' | 'Tooling' | 'Quality' | 'Management';
export type Shift = 'Day' | 'Swing' | 'Night';

// ============================================
// Core Entities
// ============================================

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface Facility {
  id: string;
  tenantId: string;
  name: string;
  location: string;
  timezone: string;
}

export interface User {
  id: string;
  tenantId: string;
  facilityId: string;
  name: string;
  email: string;
  role: UserRole;
  department: Department;
  shift: Shift;
  avatar?: string;
  status: 'Active' | 'Inactive';
}

// ============================================
// Assets & Materials
// ============================================

export type AssetType = 'Press' | 'Mold' | 'Auxiliary';
export type AssetStatus = 'Running' | 'Idle' | 'Down';

export interface Asset {
  id: string;
  tenantId: string;
  facilityId: string;
  type: AssetType;
  name: string;
  model?: string;
  manufacturer?: string;
  specs?: Record<string, string>;
  status: AssetStatus;
  tags: string[];
}

export type MaterialType = 'Resin' | 'Additive' | 'Colorant';

export interface Material {
  id: string;
  tenantId: string;
  name: string;
  type: MaterialType;
  manufacturer?: string;
  grade?: string;
  properties?: Record<string, string>;
  handlingNotes?: string;
  tags: string[];
}

// ============================================
// Knowledge Engine
// ============================================

export type KnowledgeDocType = 
  | 'DefectGuide'
  | 'ProcessGuide'
  | 'MaterialGuide'
  | 'MachineGuide'
  | 'AuxGuide';

export type KnowledgeDocStatus = 'Draft' | 'Published' | 'Archived';
export type KnowledgeLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface KnowledgeDoc {
  id: string;
  tenantId: string;
  type: KnowledgeDocType;
  title: string;
  summary: string;
  body: string;
  tags: string[];
  level: KnowledgeLevel;
  relatedAssetIds: string[];
  relatedMaterialIds: string[];
  createdBy: string;
  createdAt: string;
  status: KnowledgeDocStatus;
}

export type DefectSeverity = 'Cosmetic' | 'Functional' | 'Critical';

export interface DefectGuide extends KnowledgeDoc {
  type: 'DefectGuide';
  symptoms: string[];
  causes: Array<{ cause: string; likelihood: 'High' | 'Medium' | 'Low' }>;
  confirmChecks: string[];
  fixes: Array<{ step: number; detail: string }>;
  prevention: string[];
  severity: DefectSeverity;
  images?: Array<{ url: string; caption: string }>;
}

export type FixRecordStatus = 
  | 'Draft'
  | 'PendingVerification'
  | 'Verified'
  | 'Committed'
  | 'Rejected';

export interface FixRecord {
  id: string;
  tenantId: string;
  sourceIssueId?: string;
  title: string;
  problemSummary: string;
  rootCause: string;
  fixSteps: Array<{ step: number; detail: string }>;
  verificationChecklist: Array<{ check: string; passed?: boolean }>;
  relatedDefectIds: string[];
  relatedAssetIds: string[];
  relatedMaterialIds: string[];
  createdBy: string;
  createdAt: string;
  status: FixRecordStatus;
  committedToKnowledgeDocId?: string;
}

export type VerificationDecision = 'Approve' | 'Reject' | 'RequestChanges';

export interface FixVerification {
  id: string;
  fixRecordId: string;
  verifierUserId: string;
  decision: VerificationDecision;
  notes: string;
  timestamp: string;
}

// ============================================
// Messaging - Shift Tasks
// ============================================

export type ShiftTaskListStatus = 'Active' | 'Completed' | 'Cancelled';

export interface ShiftTaskList {
  id: string;
  tenantId: string;
  facilityId: string;
  date: string;
  shift: Shift;
  createdBy: string;
  title: string;
  notes?: string;
  status: ShiftTaskListStatus;
}

export type TaskPriority = 'Normal' | 'High' | 'Urgent';
export type TaskItemStatus = 'Pending' | 'InProgress' | 'Done' | 'Skipped';

export interface ShiftTaskItem {
  id: string;
  taskListId: string;
  text: string;
  priority: TaskPriority;
  assignedTo: { type: 'user' | 'department'; id: string };
  completedBy?: string;
  completedAt?: string;
  notes?: string;
  status: TaskItemStatus;
}

// ============================================
// Messaging - Conversations
// ============================================

export type ConversationVisibility = 'Open' | 'Private';
export type ConversationStatus = 'Active' | 'Archived';

export interface Conversation {
  id: string;
  tenantId: string;
  facilityId: string;
  visibility: ConversationVisibility;
  title: string;
  participantIds: string[];
  context?: {
    assetId?: string;
    materialId?: string;
    issueId?: string;
    tags?: string[];
  };
  createdBy: string;
  createdAt: string;
  lastMessageAt: string;
  status: ConversationStatus;
}

export interface ConversationMessage {
  id: string;
  conversationId: string;
  userId: string;
  timestamp: string;
  body: string;
  mentions: string[];
  attachments?: Array<{ type: string; url: string; name: string }>;
}

// ============================================
// Messaging - Issues
// ============================================

export type IssueCategory = 'Process' | 'Maintenance' | 'Tooling' | 'Quality';
export type IssuePriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type IssueStatus = 'Open' | 'InProgress' | 'NeedsVerification' | 'Closed';

export interface Issue {
  id: string;
  tenantId: string;
  facilityId: string;
  linkedConversationId?: string;
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
  context?: {
    assetId?: string;
    materialId?: string;
    moldId?: string;
  };
  ownerId: string;
  watcherIds: string[];
  status: IssueStatus;
  createdAt: string;
  dueBy?: string;
  closedAt?: string;
}

export type IssueEventAction = 
  | 'Created'
  | 'Assigned'
  | 'StatusChange'
  | 'Comment'
  | 'FixAdded'
  | 'Escalated';

export interface IssueEvent {
  id: string;
  issueId: string;
  timestamp: string;
  action: IssueEventAction;
  actorId: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export type SignOffDecision = 'Approved' | 'Rejected' | 'NeedsWork';

export interface IssueSignOff {
  id: string;
  issueId: string;
  managerId: string;
  decision: SignOffDecision;
  notes: string;
  timestamp: string;
}

// ============================================
// Role Configuration
// ============================================

export const ROLE_LABELS: Record<UserRole, string> = {
  processor: 'Processor',
  maintenance_tech: 'Maintenance Tech',
  tooling_specialist: 'Tooling Specialist',
  supervisor: 'Supervisor',
  manager: 'Manager',
  admin: 'Admin',
  super_admin: 'Super Admin',
};

export const ROLE_ICONS: Record<UserRole, string> = {
  processor: '⚙️',
  maintenance_tech: '🔧',
  tooling_specialist: '🔩',
  supervisor: '📊',
  manager: '👔',
  admin: '🔐',
  super_admin: '🌐',
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  processor: ['/', '/knowledge', '/process-tools', '/shift-tasks', '/conversations', '/issues'],
  maintenance_tech: ['/', '/knowledge', '/process-tools', '/shift-tasks', '/conversations', '/issues'],
  tooling_specialist: ['/', '/knowledge', '/process-tools', '/shift-tasks', '/conversations', '/issues'],
  supervisor: ['/', '/knowledge', '/process-tools', '/shift-tasks', '/conversations', '/issues'],
  manager: ['/', '/knowledge', '/process-tools', '/shift-tasks', '/conversations', '/issues', '/users', '/settings'],
  admin: ['/', '/knowledge', '/process-tools', '/shift-tasks', '/conversations', '/issues', '/users', '/settings', '/tenants', '/verification-audit'],
  super_admin: ['/', '/knowledge', '/process-tools', '/shift-tasks', '/conversations', '/issues', '/users', '/settings', '/tenants', '/verification-audit'],
};

export const ROLE_DEFAULT_ROUTE: Record<UserRole, string> = {
  processor: '/',
  maintenance_tech: '/',
  tooling_specialist: '/',
  supervisor: '/',
  manager: '/',
  admin: '/',
  super_admin: '/',
};

export const CAN_CREATE_SHIFT_TASKS: UserRole[] = ['supervisor', 'manager', 'admin', 'super_admin'];
export const CAN_VERIFY_FIXES: UserRole[] = ['supervisor', 'manager', 'admin', 'super_admin'];
export const CAN_SIGNOFF_ISSUES: UserRole[] = ['manager', 'admin', 'super_admin'];
export const CAN_CREATE_FIXES: UserRole[] = ['maintenance_tech', 'tooling_specialist', 'supervisor', 'manager', 'admin', 'super_admin'];
export const CAN_COMMIT_FIXES: UserRole[] = ['manager', 'admin', 'super_admin'];
