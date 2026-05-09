import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
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
}

interface Tenant {
  id: string;
  name: string;
  slug: string;
}

interface Facility {
  id: string;
  tenant_id: string;
  name: string;
}

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  shift?: string;
  department?: string;
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
  const [authUser, setAuthUser] = useState<SupabaseUser | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [currentFacility, setCurrentFacility] = useState<Facility | null>(null);
  const [availableTenants, setAvailableTenants] = useState<Tenant[]>([]);
  const [availableFacilities, setAvailableFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user profile and related data
  const loadUserData = useCallback(async (user: SupabaseUser) => {
    try {
      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Fetch user roles
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      const primaryRole = (roles?.[0]?.role as UserRole) || 'processor';

      // Fetch tenants
      const { data: tenants } = await supabase.from('tenants').select('*');
      setAvailableTenants(tenants || []);

      // Set current tenant
      const userTenant = tenants?.find(t => t.id === profile?.tenant_id) || tenants?.[0] || null;
      setCurrentTenant(userTenant);

      // Fetch facilities for tenant
      if (userTenant) {
        const { data: facilities } = await supabase
          .from('facilities')
          .select('*')
          .eq('tenant_id', userTenant.id);
        setAvailableFacilities(facilities || []);

        const userFacility = facilities?.find(f => f.id === profile?.facility_id) || facilities?.[0] || null;
        setCurrentFacility(userFacility);
      }

      setCurrentUser({
        id: user.id,
        name: profile?.display_name || user.email || 'User',
        email: user.email || '',
        role: primaryRole,
        shift: profile?.shift || undefined,
        tenantId: profile?.tenant_id || undefined,
        facilityId: profile?.facility_id || undefined,
      });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error loading user data:', error);
      } else {
        console.error('Failed to load user data');
      }
    }
  }, []);

  // Auth state listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setAuthUser(session.user);
          // Use setTimeout to avoid Supabase auth deadlock
          setTimeout(() => loadUserData(session.user), 0);
        } else {
          setAuthUser(null);
          setCurrentUser(null);
          setCurrentTenant(null);
          setCurrentFacility(null);
          setAvailableTenants([]);
          setAvailableFacilities([]);
        }
        setIsLoading(false);
      }
    );

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAuthUser(session.user);
        loadUserData(session.user);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [loadUserData]);

  const login = useCallback(async (screenName: string, password: string) => {
    // Convert screen name to internal email format for Supabase auth
    const email = `${screenName.toLowerCase().replace(/\s+/g, '_')}@proprocessor.app`;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
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
