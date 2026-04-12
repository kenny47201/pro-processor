import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { 
  User, 
  Tenant, 
  Facility, 
  UserRole, 
  ROLE_PERMISSIONS, 
  ROLE_DEFAULT_ROUTE,
  CAN_CREATE_SHIFT_TASKS,
  CAN_VERIFY_FIXES,
  CAN_SIGNOFF_ISSUES,
  CAN_CREATE_FIXES,
  CAN_COMMIT_FIXES,
} from '@/types/models';
import { users, tenants, facilities } from '@/data';

interface TenantContextType {
  currentUser: User | null;
  currentTenant: Tenant | null;
  currentFacility: Facility | null;
  isAuthenticated: boolean;
  login: (userId: string) => void;
  logout: () => void;
  switchTenant: (tenantId: string) => void;
  switchFacility: (facilityId: string) => void;
  hasPermission: (route: string) => boolean;
  getDefaultRoute: () => string;
  availableTenants: Tenant[];
  availableFacilities: Facility[];
  // Role capability checks
  canCreateShiftTasks: boolean;
  canVerifyFixes: boolean;
  canSignOffIssues: boolean;
  canCreateFixes: boolean;
  canCommitFixes: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [currentFacility, setCurrentFacility] = useState<Facility | null>(null);

  const login = useCallback((userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const tenant = tenants.find(t => t.id === user.tenantId);
    const facility = facilities.find(f => f.id === user.facilityId);

    setCurrentUser(user);
    setCurrentTenant(tenant || null);
    setCurrentFacility(facility || null);
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentTenant(null);
    setCurrentFacility(null);
  }, []);

  const switchTenant = useCallback((tenantId: string) => {
    if (currentUser?.role !== 'super_admin') return;
    
    const tenant = tenants.find(t => t.id === tenantId);
    if (!tenant) return;

    const facility = facilities.find(f => f.tenantId === tenantId);
    setCurrentTenant(tenant);
    setCurrentFacility(facility || null);
  }, [currentUser]);

  const switchFacility = useCallback((facilityId: string) => {
    const facility = facilities.find(f => f.id === facilityId);
    if (!facility) return;
    
    if (facility.tenantId !== currentTenant?.id) return;
    
    setCurrentFacility(facility);
  }, [currentTenant]);

  const hasPermission = useCallback((route: string) => {
    if (!currentUser) return false;
    const permissions = ROLE_PERMISSIONS[currentUser.role] || [];
    return permissions.some(p => route === p || route.startsWith(p + '/'));
  }, [currentUser]);

  const getDefaultRoute = useCallback(() => {
    if (!currentUser) return '/login';
    return ROLE_DEFAULT_ROUTE[currentUser.role] || '/shift-tasks';
  }, [currentUser]);

  // Role capability checks
  const canCreateShiftTasks = currentUser ? CAN_CREATE_SHIFT_TASKS.includes(currentUser.role) : false;
  const canVerifyFixes = currentUser ? CAN_VERIFY_FIXES.includes(currentUser.role) : false;
  const canSignOffIssues = currentUser ? CAN_SIGNOFF_ISSUES.includes(currentUser.role) : false;
  const canCreateFixes = currentUser ? CAN_CREATE_FIXES.includes(currentUser.role) : false;
  const canCommitFixes = currentUser ? CAN_COMMIT_FIXES.includes(currentUser.role) : false;

  const availableTenants = currentUser?.role === 'super_admin' ? tenants : 
    currentUser ? tenants.filter(t => t.id === currentUser.tenantId) : [];

  const availableFacilities = currentTenant 
    ? facilities.filter(f => f.tenantId === currentTenant.id)
    : [];

  return (
    <TenantContext.Provider value={{
      currentUser,
      currentTenant,
      currentFacility,
      isAuthenticated: !!currentUser,
      login,
      logout,
      switchTenant,
      switchFacility,
      hasPermission,
      getDefaultRoute,
      availableTenants,
      availableFacilities,
      canCreateShiftTasks,
      canVerifyFixes,
      canSignOffIssues,
      canCreateFixes,
      canCommitFixes,
    }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    // During HMR, context may temporarily be undefined - force page reload
    if (import.meta.hot) {
      console.warn('TenantContext undefined during HMR, reloading...');
      window.location.reload();
    }
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}

// Helper hook to get filtered data based on current tenant/facility
export function useFilteredData() {
  const { currentTenant, currentFacility } = useTenant();

  const filterByTenant = useCallback(<T extends { tenantId?: string }>(items: T[]) => {
    if (!currentTenant) return [];
    return items.filter(item => item.tenantId === currentTenant.id);
  }, [currentTenant]);

  const filterByFacility = useCallback(<T extends { facilityId?: string }>(items: T[]) => {
    if (!currentFacility) return [];
    return items.filter(item => item.facilityId === currentFacility.id);
  }, [currentFacility]);

  return { filterByTenant, filterByFacility };
}
