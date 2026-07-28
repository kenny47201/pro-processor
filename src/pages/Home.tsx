import { useTenant } from '@/contexts/TenantContext';
import ProcessorDashboard from '@/components/dashboard/ProcessorDashboard';
import MaintenanceDashboard from '@/components/dashboard/MaintenanceDashboard';
import ToolingDashboard from '@/components/dashboard/ToolingDashboard';
import SupervisorDashboard from '@/components/dashboard/SupervisorDashboard';
import ManagerDashboard from '@/components/dashboard/ManagerDashboard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';

export default function Home() {
  const { currentUser } = useTenant();
  if (!currentUser) return null;

  const dashboard = (() => {
    switch (currentUser.role) {
      case 'processor':
        return <ProcessorDashboard />;
      case 'maintenance_tech':
        return <MaintenanceDashboard />;
      case 'tooling_specialist':
        return <ToolingDashboard />;
      case 'supervisor':
        return <SupervisorDashboard />;
      case 'manager':
      case 'admin':
      case 'super_admin':
      default:
        return <ManagerDashboard />;
    }
  })();

  return (
    <div className="space-y-6">
      {dashboard}
      <ActivityFeed />
    </div>
  );
}
