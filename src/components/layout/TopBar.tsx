import { Building2, ChevronDown } from 'lucide-react';
import { useTenant } from '@/contexts/TenantContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export function TopBar() {
  const { 
    currentUser, 
    currentTenant, 
    currentFacility, 
    availableTenants,
    switchTenant,
  } = useTenant();

  const isSuperAdmin = currentUser?.role === 'super_admin';

  return (
    <div className="flex-1 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Tenant/Facility indicator */}
        {currentTenant && (
          <div className="flex items-center gap-2">
            {isSuperAdmin ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span className="font-medium">{currentTenant.name}</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-popover border-border">
                  <DropdownMenuLabel>Switch Tenant</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {availableTenants.map(tenant => (
                    <DropdownMenuItem 
                      key={tenant.id}
                      onClick={() => switchTenant(tenant.id)}
                      className={tenant.id === currentTenant.id ? 'bg-primary/10' : ''}
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      {tenant.name}
                      {tenant.id === currentTenant.id && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          Current
                        </Badge>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">{currentTenant.name}</span>
              </div>
            )}
            
            {currentFacility && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="text-sm text-muted-foreground">
                  {currentFacility.name}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Shift indicator */}
        {currentUser?.shift && (
          <Badge variant="secondary" className="text-xs">
            {currentUser.shift} Shift
          </Badge>
        )}
      </div>
    </div>
  );
}
