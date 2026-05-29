
-- ============================================================
-- BOOKMARK: snapshot schema bookmark_20260529
-- Restore later with: INSERT INTO public.<table> SELECT * FROM bookmark_20260529.<table>;
-- ============================================================
CREATE SCHEMA IF NOT EXISTS bookmark_20260529;

CREATE TABLE bookmark_20260529.tenants                     AS TABLE public.tenants;
CREATE TABLE bookmark_20260529.facilities                  AS TABLE public.facilities;
CREATE TABLE bookmark_20260529.profiles                    AS TABLE public.profiles;
CREATE TABLE bookmark_20260529.user_roles                  AS TABLE public.user_roles;
CREATE TABLE bookmark_20260529.issues                      AS TABLE public.issues;
CREATE TABLE bookmark_20260529.issue_events                AS TABLE public.issue_events;
CREATE TABLE bookmark_20260529.issue_signoffs              AS TABLE public.issue_signoffs;
CREATE TABLE bookmark_20260529.issue_watchers              AS TABLE public.issue_watchers;
CREATE TABLE bookmark_20260529.knowledge_fixes             AS TABLE public.knowledge_fixes;
CREATE TABLE bookmark_20260529.fix_trials                  AS TABLE public.fix_trials;
CREATE TABLE bookmark_20260529.attachments                 AS TABLE public.attachments;
CREATE TABLE bookmark_20260529.conversations               AS TABLE public.conversations;
CREATE TABLE bookmark_20260529.conversation_messages       AS TABLE public.conversation_messages;
CREATE TABLE bookmark_20260529.conversation_participants   AS TABLE public.conversation_participants;
CREATE TABLE bookmark_20260529.shift_task_lists            AS TABLE public.shift_task_lists;
CREATE TABLE bookmark_20260529.shift_task_items            AS TABLE public.shift_task_items;
CREATE TABLE bookmark_20260529.shift_task_activity_log     AS TABLE public.shift_task_activity_log;

COMMENT ON SCHEMA bookmark_20260529 IS 'Bookmark snapshot taken 2026-05-29 before fresh-instance reset. Restore by copying rows back into public.*.';

-- ============================================================
-- WIPE: fresh instance (preserve super admin only)
-- ============================================================
DELETE FROM public.shift_task_activity_log;
DELETE FROM public.shift_task_items;
DELETE FROM public.shift_task_lists;
DELETE FROM public.conversation_messages;
DELETE FROM public.conversation_participants;
DELETE FROM public.conversations;
DELETE FROM public.attachments;
DELETE FROM public.fix_trials;
DELETE FROM public.knowledge_fixes;
DELETE FROM public.issue_signoffs;
DELETE FROM public.issue_watchers;
DELETE FROM public.issue_events;
DELETE FROM public.issues;
DELETE FROM public.facilities;

-- Remove all non-super-admin roles and profiles
DELETE FROM public.user_roles
  WHERE user_id NOT IN (SELECT user_id FROM public.user_roles WHERE role = 'super_admin');
DELETE FROM public.profiles
  WHERE user_id NOT IN (SELECT user_id FROM public.user_roles WHERE role = 'super_admin');

-- Detach super admin from any tenant, then remove all tenants
UPDATE public.profiles SET tenant_id = NULL, facility_id = NULL
  WHERE user_id IN (SELECT user_id FROM public.user_roles WHERE role = 'super_admin');
DELETE FROM public.tenants;
