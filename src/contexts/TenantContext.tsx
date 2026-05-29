import React, { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  UserRole, 
  ROLE_PERMISSIONS, 
  ROLE_DEFAULT_ROUTE,
  CAN_CREATE_SHIFT_TASKS,
  CAN_VERIFY_FIXES,
  CAN_SIGNOFF_ISSUES,
  CAN_CREATE_FIXES,
  CAN_COMMIT_FIXES,
} from '@/types/models';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface Profile {
  id: string;
  user_id: string;
  tenant_id: string | null;
  facility_id: string | null;
  display_name: string | null;
  screen_name: string | null;
  avatar_url: string | null;
  shift: string | null;
  status?: 'pending' | 'active' | 'inactive' | null;
}

interface Tenant {
  id: string;
  name: string;
  slug: string;
  shifts: string[];
}

export const DEFAULT_SHIFTS = ['Day', 'Swing', 'Night'];

interface Facility {
  id: string;
  tenant_id: string;
  name: string;
}

export type Department = 'Processing' | 'Tooling' | 'Maintenance';
export const DEPARTMENTS: Department[] = ['Processing', 'Tooling', 'Maintenance'];

export function departmentForRole(role: UserRole): Department | null {
  if (role === 'processor') return 'Processing';
  if (role === 'tooling_specialist') return 'Tooling';
  if (role === 'maintenance_tech') return 'Maintenance';
  return null; // supervisor/manager/admin/super_admin → see all
}

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  shift?: string;
  department: Department | null;
  canSeeAllDepartments: boolean;
  tenantId?: string;
  facilityId?: string;
}

interface TenantContextType {
  currentUser: CurrentUser | null;
  currentTenant: Tenant | null;
  currentFacility: Facility | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (screenName: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  switchTenant: (tenantId: string) => void;
  switchFacility: (facilityId: string) => void;
  hasPermission: (route: string) => boolean;
  getDefaultRoute: () => string;
  availableTenants: Tenant[];
  availableFacilities: Facility[];
  canCreateShiftTasks: boolean;
  canVerifyFixes: boolean;
  canSignOffIssues: boolean;
  canCreateFixes: boolean;
  canCommitFixes: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const loadRequestId = useRef(0);
  const [authUser, setAuthUser] = useState<SupabaseUser | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [currentFacility, setCurrentFacility] = useState<Facility | null>(null);
  const [availableTenants, setAvailableTenants] = useState<Tenant[]>([]);
  const [availableFacilities, setAvailableFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const clearUserData = useCallback(() => {
    setAuthUser(null);
    setCurrentUser(null);
    setCurrentTenant(null);
    setCurrentFacility(null);
    setAvailableTenants([]);
    setAvailableFacilities([]);
  }, []);

  // Load user profile and related data
  const loadUserData = useCallback(async (user: SupabaseUser, requestId: number) => {
    try {
      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      // If the auth session has no matching profile (e.g. after a tenant wipe),
      // force sign-out so the app returns to the fresh-instance splash.
      if (!profile) {
        await supabase.auth.signOut();
        if (requestId === loadRequestId.current) clearUserData();
        return;
      }

      if (profile?.status === 'pending' || profile?.status === 'inactive') {
        await supabase.auth.signOut();
        if (requestId === loadRequestId.current) clearUserData();
        return;
      }

      // Fetch user roles
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      const primaryRole = (roles?.[0]?.role as UserRole) || 'processor';

      // Fetch tenants
      const { data: tenants } = await supabase.from('tenants').select('*');
      const normalized: Tenant[] = (tenants || []).map((t: { id: string; name: string; slug: string; shifts?: string[] | null }) => ({
        id: t.id, name: t.name, slug: t.slug, shifts: t.shifts && t.shifts.length ? t.shifts : DEFAULT_SHIFTS,
      }));
      if (requestId !== loadRequestId.current) return;
      setAvailableTenants(normalized);

      // Set current tenant
      const userTenant = normalized.find(t => t.id === profile?.tenant_id) || normalized[0] || null;
      setCurrentTenant(userTenant);

      // Fetch facilities for tenant
      if (userTenant) {
        const { data: facilities } = await supabase
          .from('facilities')
          .select('*')
          .eq('tenant_id', userTenant.id);
        if (requestId !== loadRequestId.current) return;
        setAvailableFacilities(facilities || []);

        const userFacility = facilities?.find(f => f.id === profile?.facility_id) || facilities?.[0] || null;
        setCurrentFacility(userFacility);
      }

      if (requestId !== loadRequestId.current) return;

      setCurrentUser({
        id: user.id,
        name: profile?.display_name || user.email || 'User',
        email: user.email || '',
        role: primaryRole,
        shift: profile?.shift || undefined,
        department: departmentForRole(primaryRole),
        canSeeAllDepartments: departmentForRole(primaryRole) === null,
        tenantId: profile?.tenant_id || undefined,
        facilityId: profile?.facility_id || undefined,
      });
    } catch (error) {
      if (requestId === loadRequestId.current) clearUserData();
      if (import.meta.env.DEV) {
        console.error('Error loading user data:', error);
      } else {
        console.error('Failed to load user data');
      }
    }
  }, [clearUserData]);

  // Auth state listener
  useEffect(() => {
    let isMounted = true;
    let loadedUserId: string | null = null;

    const startUserLoad = (user: SupabaseUser, showLoading: boolean) => {
      const requestId = ++loadRequestId.current;
      setAuthUser(user);
      if (showLoading) setIsLoading(true);
      setTimeout(() => {
        loadUserData(user, requestId).finally(() => {
          if (isMounted && requestId === loadRequestId.current) {
            loadedUserId = user.id;
            setIsLoading(false);
          }
        });
      }, 0);
    };

    const finishSignedOut = () => {
      ++loadRequestId.current;
      loadedUserId = null;
      clearUserData();
      setIsLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          // Skip reloads for token refreshes / tab-focus when user unchanged
          if (loadedUserId === session.user.id && event !== 'SIGNED_IN' && event !== 'INITIAL_SESSION') {
            return;
          }
          startUserLoad(session.user, loadedUserId !== session.user.id);
        } else if (event === 'SIGNED_OUT' || event === 'INITIAL_SESSION') {
          finishSignedOut();
        }
      }
    );

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        startUserLoad(session.user, loadedUserId !== session.user.id);
      } else {
        finishSignedOut();
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [clearUserData, loadUserData]);

  const login = useCallback(async (screenName: string, password: string) => {
    // Convert screen name to internal email format for Supabase auth
    const email = `${screenName.toLowerCase().replace(/\s+/g, '_')}@proprocessor.app`;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    // Check account status — block pending/inactive
    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('status')
        .eq('user_id', data.user.id)
        .maybeSingle();
      if (profile?.status === 'pending') {
        await supabase.auth.signOut();
        return { error: 'Your account is awaiting admin approval.' };
      }
      if (profile?.status === 'inactive') {
        await supabase.auth.signOut();
        return { error: 'This account has been deactivated. Contact your admin.' };
      }
    }
    return {};
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const switchTenant = useCallback(async (tenantId: string) => {
    if (currentUser?.role !== 'super_admin') return;
    
    const tenant = availableTenants.find(t => t.id === tenantId);
    if (!tenant) return;

    setCurrentTenant(tenant);
    
    const { data: facilities } = await supabase
      .from('facilities')
      .select('*')
      .eq('tenant_id', tenantId);
    setAvailableFacilities(facilities || []);
    setCurrentFacility(facilities?.[0] || null);
  }, [currentUser, availableTenants]);

  const switchFacility = useCallback((facilityId: string) => {
    const facility = availableFacilities.find(f => f.id === facilityId);
    if (!facility) return;
    if (facility.tenant_id !== currentTenant?.id) return;
    setCurrentFacility(facility);
  }, [currentTenant, availableFacilities]);

  const hasPermission = useCallback((route: string) => {
    if (!currentUser) return false;
    const permissions = ROLE_PERMISSIONS[currentUser.role] || [];
    return permissions.some(p => route === p || route.startsWith(p + '/'));
  }, [currentUser]);

  const getDefaultRoute = useCallback(() => {
    if (!currentUser) return '/login';
    return ROLE_DEFAULT_ROUTE[currentUser.role] || '/';
  }, [currentUser]);

  const canCreateShiftTasks = currentUser ? CAN_CREATE_SHIFT_TASKS.includes(currentUser.role) : false;
  const canVerifyFixes = currentUser ? CAN_VERIFY_FIXES.includes(currentUser.role) : false;
  const canSignOffIssues = currentUser ? CAN_SIGNOFF_ISSUES.includes(currentUser.role) : false;
  const canCreateFixes = currentUser ? CAN_CREATE_FIXES.includes(currentUser.role) : false;
  const canCommitFixes = currentUser ? CAN_COMMIT_FIXES.includes(currentUser.role) : false;

  return (
    <TenantContext.Provider value={{
      currentUser,
      currentTenant,
      currentFacility,
      isAuthenticated: !!currentUser,
      isLoading,
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
    if (import.meta.hot) {
      console.warn('TenantContext undefined during HMR, reloading...');
      window.location.reload();
    }
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}

export function useFilteredData() {
  const { currentTenant, currentFacility } = useTenant();

  const filterByTenant = useCallback(<T extends { tenantId?: string; tenant_id?: string }>(items: T[]) => {
    if (!currentTenant) return [];
    return items.filter(item => (item.tenantId || item.tenant_id) === currentTenant.id);
  }, [currentTenant]);

  const filterByFacility = useCallback(<T extends { facilityId?: string; facility_id?: string }>(items: T[]) => {
    if (!currentFacility) return [];
    return items.filter(item => (item.facilityId || item.facility_id) === currentFacility.id);
  }, [currentFacility]);

  return { filterByTenant, filterByFacility };
}
