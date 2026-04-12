import { 
  BookOpen, 
  FileText, 
  AlertTriangle, 
  Wrench,
  ClipboardList,
  MessageSquare,
  AlertCircle,
  Users,
  Settings,
  Building2,
  LogOut,
  ChevronDown,
  Calculator,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useTenant } from '@/contexts/TenantContext';
import { useNavigate } from 'react-router-dom';
import logoBadge from '@/assets/logo-badge.png';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ROLE_LABELS } from '@/types/models';

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { currentUser, hasPermission, logout } = useTenant();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items grouped by section
  const knowledgeItems = [
    { title: 'Knowledge Hub', url: '/knowledge', icon: BookOpen },
    { title: 'Documents', url: '/knowledge/docs', icon: FileText },
    { title: 'Defect Guides', url: '/knowledge/defects', icon: AlertTriangle },
    { title: 'Fix Records', url: '/knowledge/fixes', icon: Wrench },
  ];

  const processToolsItems = [
    { title: 'Process Tools', url: '/process-tools', icon: Calculator },
  ];

  const messagingItems = [
    { title: 'Shift Tasks', url: '/shift-tasks', icon: ClipboardList },
    { title: 'Conversations', url: '/conversations', icon: MessageSquare },
    { title: 'Issues', url: '/issues', icon: AlertCircle },
  ];

  const adminItems = [
    { title: 'Users', url: '/users', icon: Users },
    { title: 'Settings', url: '/settings', icon: Settings },
  ];

  const superAdminItems = [
    { title: 'Tenants', url: '/tenants', icon: Building2 },
  ];

  const renderNavItem = (item: { title: string; url: string; icon: React.ComponentType<{ className?: string }> }) => {
    if (!hasPermission(item.url)) return null;
    
    return (
      <SidebarMenuItem key={item.url}>
        <SidebarMenuButton asChild>
          <NavLink 
            to={item.url} 
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            activeClassName="bg-primary/20 text-primary font-medium"
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  const hasAnyPermission = (items: { url: string }[]) => 
    items.some(item => hasPermission(item.url));

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img 
            src={logoBadge} 
            alt="Pro-Processor" 
            className="h-10 w-10 object-contain"
          />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-primary text-sm">PRO-PROCESSOR</span>
              <span className="text-xs text-muted-foreground">Knowledge Engine</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {/* Knowledge Section */}
        {hasAnyPermission(knowledgeItems) && (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-sidebar-accent/50 rounded px-2 py-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {!collapsed && 'Knowledge'}
                  </span>
                  {!collapsed && (
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  )}
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {knowledgeItems.map(renderNavItem)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}

        {/* Process Tools Section */}
        {hasAnyPermission(processToolsItems) && (
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {!collapsed && 'Process Tools'}
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {processToolsItems.map(renderNavItem)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Messaging Section */}
        {hasAnyPermission(messagingItems) && (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-sidebar-accent/50 rounded px-2 py-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {!collapsed && 'Messaging'}
                  </span>
                  {!collapsed && (
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  )}
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {messagingItems.map(renderNavItem)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}

        {/* Admin Section */}
        {hasAnyPermission(adminItems) && (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-sidebar-accent/50 rounded px-2 py-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {!collapsed && 'Admin'}
                  </span>
                  {!collapsed && (
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  )}
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {adminItems.map(renderNavItem)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}

        {/* Super Admin Section */}
        {hasAnyPermission(superAdminItems) && (
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {!collapsed && 'Super Admin'}
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {superAdminItems.map(renderNavItem)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        {currentUser && !collapsed && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium text-sm">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {ROLE_LABELS[currentUser.role]}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}
        {currentUser && collapsed && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            className="w-full"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
