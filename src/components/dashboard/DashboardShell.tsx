import { ReactNode } from 'react';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTenant } from '@/contexts/TenantContext';
import { ROLE_LABELS } from '@/types/models';

interface DashboardShellProps {
  subtitle?: string;
  children: ReactNode;
}

export function DashboardShell({ subtitle, children }: DashboardShellProps) {
  const { currentUser, currentTenant } = useTenant();
  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground flex items-center gap-2 flex-wrap">
            <Badge variant="secondary">{ROLE_LABELS[currentUser.role]}</Badge>
            {currentUser.shift && (
              <>
                <span>•</span>
                <span>{currentUser.shift} Shift</span>
              </>
            )}
            {subtitle && (
              <>
                <span>•</span>
                <span className="text-xs">{subtitle}</span>
              </>
            )}
          </p>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          <div className="flex items-center gap-2 justify-end">
            <Clock className="h-4 w-4" />
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </div>
          {currentTenant && <div className="text-xs mt-1">{currentTenant.name}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  subtext?: string;
  color?: string;
  onClick?: () => void;
}

export function MetricCard({ icon, label, value, subtext, color = 'text-primary', onClick }: MetricCardProps) {
  return (
    <Card
      className={onClick ? 'cursor-pointer hover:border-primary/50 transition-colors' : ''}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className={`p-2 rounded-lg bg-muted/50 inline-flex ${color}`}>{icon}</div>
        <div className="mt-3">
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-sm font-medium text-foreground">{label}</div>
          {subtext && <div className="text-xs text-muted-foreground mt-1">{subtext}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

interface ListCardProps {
  title: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}

export function ListCard({ title, icon, action, children }: ListCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function ComingSoonNote({ note }: { note: string }) {
  return (
    <div className="text-xs text-muted-foreground italic">
      Not tracked yet — {note}
    </div>
  );
}
