import { Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTenant } from '@/contexts/TenantContext';
import { Badge } from '@/components/ui/badge';

export default function Tenants() {
  const { availableTenants } = useTenant();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          Tenant Management
        </h1>
        <p className="text-muted-foreground">Manage organizations and their configurations</p>
      </div>

      {availableTenants.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No tenants configured yet. Add your first organization to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableTenants.map(tenant => (
            <Card key={tenant.id}>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  {tenant.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">{tenant.slug}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
