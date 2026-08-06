import type { UserRole } from '@/types/models';

/**
 * Central, UI-side mirror of the database RLS delete policies.
 * Keep these in sync with the RLS policies — they exist so users never see
 * a destructive button that the backend will reject.
 */

interface Actor {
  id: string;
  role: UserRole;
  tenantId?: string;
}

const isSuper = (a?: Actor | null) => a?.role === 'super_admin';
const isAdmin = (a?: Actor | null) => a?.role === 'admin';
const isManagerUp = (a?: Actor | null) =>
  !!a && ['manager', 'admin', 'super_admin'].includes(a.role);
const isSupervisorUp = (a?: Actor | null) =>
  !!a && ['supervisor', 'manager', 'admin', 'super_admin'].includes(a.role);

const sameTenant = (a?: Actor | null, tenantId?: string | null) =>
  !!a?.tenantId && !!tenantId && a.tenantId === tenantId;

/** knowledge_fixes DELETE: super admin, or tenant admin. */
export const canDeleteFixRecord = (a: Actor | null | undefined, tenantId?: string | null) =>
  isSuper(a) || (isAdmin(a) && sameTenant(a, tenantId));

/** fix_trials DELETE: super admin, own trial, or tenant admin. */
export const canDeleteFixTrial = (
  a: Actor | null | undefined,
  trial: { logged_by?: string | null; tenant_id?: string | null },
) => isSuper(a) || (!!a && trial.logged_by === a.id) || (isAdmin(a) && sameTenant(a, trial.tenant_id));

/** attachments DELETE: super admin, own upload, or tenant admin. */
export const canDeleteAttachment = (
  a: Actor | null | undefined,
  att: { uploaded_by?: string | null; tenant_id?: string | null },
) => isSuper(a) || (!!a && att.uploaded_by === a.id) || (isAdmin(a) && sameTenant(a, att.tenant_id));

/** conversation_messages DELETE: super admin, own message, or tenant admin. */
export const canDeleteMessage = (
  a: Actor | null | undefined,
  msg: { user_id?: string | null },
) => isSuper(a) || isAdmin(a) || (!!a && msg.user_id === a.id);

/** conversations DELETE: super admin, creator, or tenant admin. */
export const canDeleteConversation = (
  a: Actor | null | undefined,
  conv: { created_by?: string | null; tenant_id?: string | null },
) => isSuper(a) || (!!a && conv.created_by === a.id) || (isAdmin(a) && sameTenant(a, conv.tenant_id));

/** issues DELETE: super admin only. */
export const canDeleteIssue = (a: Actor | null | undefined) => isSuper(a);

/** issue_events (comments) DELETE: super admin, own comment, or admin. */
export const canDeleteIssueComment = (
  a: Actor | null | undefined,
  ev: { actor_id?: string | null },
) => isSuper(a) || isAdmin(a) || (!!a && ev.actor_id === a.id);

/** shift_task_lists / shift_task_items DELETE: supervisor and above. */
export const canDeleteShiftTask = (a: Actor | null | undefined) => isSupervisorUp(a);

/** machines / molds DELETE: manager and above, own tenant. */
export const canDeleteRegistryAsset = (a: Actor | null | undefined, tenantId?: string | null) =>
  isSuper(a) || (isManagerUp(a) && sameTenant(a, tenantId));

/** tenants DELETE: super admin only. */
export const canDeleteTenant = (a: Actor | null | undefined) => isSuper(a);

/** user accounts / roles: super admin, or tenant admin for non-super users. */
export const canDeleteUser = (
  a: Actor | null | undefined,
  target: { role?: UserRole; tenantId?: string | null },
) => isSuper(a) || (isAdmin(a) && target.role !== 'super_admin' && sameTenant(a, target.tenantId));
