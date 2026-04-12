import { Users as UsersIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/EmptyState';

export default function Users() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <UsersIcon className="h-6 w-6 text-primary" />
          User Management
        </h1>
        <p className="text-muted-foreground">Manage users, roles, and permissions</p>
      </div>

      <EmptyState
        type="generic"
        title="No users configured"
        description="User management will be available once users are added to the system."
      />
    </div>
  );
}
