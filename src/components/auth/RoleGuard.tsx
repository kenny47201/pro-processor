import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import type { UserRole } from '@/types/models';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
}

/**
 * Client-side defense-in-depth role guard. Server-side enforcement still
 * happens via Supabase RLS — this component prevents the UI from rendering
 * privileged pages to users without the required role.
 */
export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { currentUser, isLoading, getDefaultRoute } = useTenant();

  if (isLoading) return null;
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to={getDefaultRoute()} replace />;
  }
  return <>{children}</>;
}
