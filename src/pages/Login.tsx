import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, Zap, ChevronDown, Search, Info } from 'lucide-react';
import { useTenant } from '@/contexts/TenantContext';
import { users, tenants } from '@/data';
import { ROLE_LABELS, ROLE_ICONS, UserRole, Shift, Department } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import logoBadge from '@/assets/logo-badge.png';
import processorIcon from '@/assets/processor-login-icon.png';
import toolingIcon from '@/assets/tooling-login-icon.png';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const roleOrder: UserRole[] = [
  'processor',
  'maintenance_tech',
  'tooling_specialist',
  'supervisor',
  'manager',
  'admin',
  'super_admin',
];

const roleDescriptions: Record<UserRole, string> = {
  processor: 'Complete shift tasks, log issues, access knowledge',
  maintenance_tech: 'Resolve issues, create fix records, document solutions',
  tooling_specialist: 'Manage tooling knowledge, create fix records',
  supervisor: 'Create shift tasks, verify fixes, sign off issues',
  manager: 'Full access, approve fixes, manage team',
  admin: 'User management and settings',
  super_admin: 'Cross-tenant access and management',
};

const roleColors: Record<UserRole, string> = {
  processor: 'bg-blue-500/10 text-blue-500 border-blue-500/30 hover:bg-blue-500/20',
  maintenance_tech: 'bg-orange-500/10 text-orange-500 border-orange-500/30 hover:bg-orange-500/20',
  tooling_specialist: 'bg-purple-500/10 text-purple-500 border-purple-500/30 hover:bg-purple-500/20',
  supervisor: 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20',
  manager: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/20',
  admin: 'bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20',
  super_admin: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/20',
};

export default function Login() {
  const navigate = useNavigate();
  const { login, getDefaultRoute } = useTenant();
  const [selectedTenant, setSelectedTenant] = useState<string>(tenants[0]?.id || '');
  const [selectedShift, setSelectedShift] = useState<Shift | 'all'>('all');
  const [selectedDept, setSelectedDept] = useState<Department | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRoles, setExpandedRoles] = useState<Set<UserRole>>(new Set(['processor', 'supervisor']));

  const handleLogin = (userId: string) => {
    login(userId);
    navigate(getDefaultRoute());
  };

  // Filter users by tenant, shift, and department
  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.tenantId === selectedTenant &&
      (selectedShift === 'all' || u.shift === selectedShift) &&
      (selectedDept === 'all' || u.department === selectedDept) &&
      (searchQuery === '' || 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [selectedTenant, selectedShift, selectedDept, searchQuery]);

  // Group by role
  const usersByRole = useMemo(() => {
    return roleOrder.reduce((acc, role) => {
      acc[role] = filteredUsers.filter(u => u.role === role);
      return acc;
    }, {} as Record<UserRole, typeof users>);
  }, [filteredUsers]);

  // Quick login picks (one per role for selected tenant)
  const quickPicks = useMemo(() => {
    return roleOrder.map(role => 
      users.find(u => u.tenantId === selectedTenant && u.role === role)
    ).filter(Boolean);
  }, [selectedTenant]);

  const toggleRole = (role: UserRole) => {
    const newExpanded = new Set(expandedRoles);
    if (newExpanded.has(role)) {
      newExpanded.delete(role);
    } else {
      newExpanded.add(role);
    }
    setExpandedRoles(newExpanded);
  };

  const departments: Department[] = ['Processing', 'Maintenance', 'Tooling', 'Quality', 'Management'];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <img 
            src={logoBadge} 
            alt="Pro-Processor" 
            className="h-20 w-20 mx-auto mb-4 object-contain"
          />
          <h1 className="text-3xl font-bold text-primary">Pro-Processor</h1>
          <Badge variant="outline" className="mt-3 bg-warning/10 text-warning border-warning/30">
            Demo Mode — All data is simulated
          </Badge>
        </div>

        {/* Tenant Selector */}
        <div className="flex justify-center gap-2 mb-6">
          {tenants.map(tenant => (
            <Button
              key={tenant.id}
              variant={selectedTenant === tenant.id ? 'default' : 'outline'}
              onClick={() => setSelectedTenant(tenant.id)}
              className="gap-2"
            >
              <Building2 className="h-4 w-4" />
              {tenant.name}
            </Button>
          ))}
        </div>

        {/* Quick Login */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-primary" />
              Quick Login by Role
            </CardTitle>
            <CardDescription>
              One-click access to experience each role's perspective
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {quickPicks.map(user => user && (
                <Button
                  key={user.id}
                  variant="outline"
                  className={`h-auto py-3 flex flex-col items-center gap-1 transition-all ${roleColors[user.role]}`}
                  onClick={() => handleLogin(user.id)}
                >
                  {user.role === 'processor' ? (
                    <img src={processorIcon} alt="Processor" className="w-10 h-10 object-contain" />
                  ) : user.role === 'tooling_specialist' ? (
                    <img src={toolingIcon} alt="Tooling Specialist" className="w-[52px] h-[52px] object-contain" />
                  ) : (
                    <span className="text-xl">{ROLE_ICONS[user.role]}</span>
                  )}
                  <span className="text-xs font-medium">{ROLE_LABELS[user.role]}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Full User List */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  All Demo Users
                </CardTitle>
                <CardDescription>
                  {filteredUsers.length} users grouped by role
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Info className="h-3 w-3" />
                Click any user to login
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>
              </div>
              <Select value={selectedShift} onValueChange={(v) => setSelectedShift(v as Shift | 'all')}>
                <SelectTrigger className="w-[120px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shifts</SelectItem>
                  <SelectItem value="Day">Day</SelectItem>
                  <SelectItem value="Swing">Swing</SelectItem>
                  <SelectItem value="Night">Night</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDept} onValueChange={(v) => setSelectedDept(v as Department | 'all')}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Depts</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator className="mb-4" />

            {/* Role Groups */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {roleOrder.map(role => {
                const roleUsers = usersByRole[role];
                if (roleUsers.length === 0) return null;

                const isExpanded = expandedRoles.has(role);

                return (
                  <Collapsible key={role} open={isExpanded} onOpenChange={() => toggleRole(role)}>
                    <CollapsibleTrigger asChild>
                      <button className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          {role === 'processor' ? (
                            <img src={processorIcon} alt="Processor" className="w-8 h-8 object-contain" />
                          ) : role === 'tooling_specialist' ? (
                            <img src={toolingIcon} alt="Tooling Specialist" className="w-10 h-10 object-contain" />
                          ) : (
                            <span className="text-xl">{ROLE_ICONS[role]}</span>
                          )}
                          <div className="text-left">
                            <span className="font-medium">{ROLE_LABELS[role]}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              ({roleUsers.length})
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground hidden md:block">
                            {roleDescriptions[role]}
                          </span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2 mt-1">
                        {roleUsers.map(user => (
                          <Button
                            key={user.id}
                            variant="ghost"
                            className="h-auto py-2 px-3 justify-start text-left hover:bg-muted"
                            onClick={() => handleLogin(user.id)}
                          >
                            <div className="flex items-center gap-3 w-full">
                              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium text-sm flex-shrink-0">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm truncate">{user.name}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{user.department}</span>
                                  <span>•</span>
                                  <Badge variant="outline" className="text-xs px-1.5 py-0">
                                    {user.shift}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          No authentication required — click any user to explore the demo
        </p>
      </div>
    </div>
  );
}
