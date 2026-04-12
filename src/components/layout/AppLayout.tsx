import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { TopBar } from './TopBar';
import { useTenant } from '@/contexts/TenantContext';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isAuthenticated, hasPermission, getDefaultRoute } = useTenant();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Check route permission
    if (!hasPermission(location.pathname) && location.pathname !== '/') {
      navigate(getDefaultRoute());
    }
  }, [isAuthenticated, hasPermission, location.pathname, navigate, getDefaultRoute]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col">
          <header className="h-14 flex items-center gap-4 border-b border-border px-4 bg-card/50">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <TopBar />
          </header>
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
