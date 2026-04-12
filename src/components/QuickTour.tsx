import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lightbulb, 
  X, 
  CheckSquare, 
  MessageSquare, 
  Wrench, 
  BookOpen,
  Users,
  Building2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTenant } from '@/contexts/TenantContext';
import { ROLE_LABELS, UserRole } from '@/types/models';

interface TourStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  route: string;
  badge?: string;
}

const tourByRole: Record<UserRole, TourStep[]> = {
  processor: [
    {
      icon: <CheckSquare className="h-5 w-5" />,
      title: "Review Shift Tasks",
      description: "Check your assigned tasks for this shift",
      route: "/shift-tasks",
      badge: "Start Here",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Start a Conversation",
      description: "Ask questions or report observations",
      route: "/conversations",
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      title: "Log an Issue",
      description: "Report problems for maintenance tracking",
      route: "/issues",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Browse Knowledge",
      description: "Find guides and troubleshooting tips",
      route: "/knowledge",
    },
  ],
  maintenance_tech: [
    {
      icon: <Wrench className="h-5 w-5" />,
      title: "Check Open Issues",
      description: "View and resolve assigned issues",
      route: "/issues",
      badge: "Start Here",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Create Fix Records",
      description: "Document solutions for knowledge capture",
      route: "/knowledge/fixes",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Search Defect Guides",
      description: "Find proven solutions for common problems",
      route: "/knowledge/defects",
    },
    {
      icon: <CheckSquare className="h-5 w-5" />,
      title: "View Shift Tasks",
      description: "Check maintenance tasks for today",
      route: "/shift-tasks",
    },
  ],
  tooling_specialist: [
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Manage Knowledge",
      description: "Create and update tooling documentation",
      route: "/knowledge",
      badge: "Start Here",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Review Fix Records",
      description: "Verify and commit tooling fixes",
      route: "/knowledge/fixes",
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      title: "Tooling Issues",
      description: "Track mold and tool-related problems",
      route: "/issues",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Collaborate",
      description: "Discuss tooling topics with the team",
      route: "/conversations",
    },
  ],
  supervisor: [
    {
      icon: <CheckSquare className="h-5 w-5" />,
      title: "Create Shift Tasks",
      description: "Assign tasks to your team",
      route: "/shift-tasks",
      badge: "Start Here",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Verify Fix Records",
      description: "Review and approve documented fixes",
      route: "/knowledge/fixes",
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      title: "Monitor Issues",
      description: "Track issue resolution progress",
      route: "/issues",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Team Conversations",
      description: "Stay connected with your team",
      route: "/conversations",
    },
  ],
  manager: [
    {
      icon: <Wrench className="h-5 w-5" />,
      title: "Issue Dashboard",
      description: "Monitor all open issues and priorities",
      route: "/issues",
      badge: "Start Here",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Commit Fix Records",
      description: "Approve fixes for knowledge base",
      route: "/knowledge/fixes",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Manage Users",
      description: "Add and configure team members",
      route: "/users",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Knowledge Overview",
      description: "Review documentation health",
      route: "/knowledge",
    },
  ],
  admin: [
    {
      icon: <Users className="h-5 w-5" />,
      title: "User Management",
      description: "Add users, set roles and departments",
      route: "/users",
      badge: "Start Here",
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      title: "Tag Taxonomy",
      description: "Configure tags for organization",
      route: "/settings",
    },
    {
      icon: <CheckSquare className="h-5 w-5" />,
      title: "Shift Tasks",
      description: "Review task completion across shifts",
      route: "/shift-tasks",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Knowledge Base",
      description: "Manage documentation and guides",
      route: "/knowledge",
    },
  ],
  super_admin: [
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Tenant Management",
      description: "Switch between tenants, verify isolation",
      route: "/tenants",
      badge: "Start Here",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "User Overview",
      description: "Manage users across all tenants",
      route: "/users",
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      title: "Cross-Tenant Issues",
      description: "Monitor issues across organizations",
      route: "/issues",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Knowledge Health",
      description: "Review documentation across tenants",
      route: "/knowledge",
    },
  ],
};

export function QuickTour() {
  const navigate = useNavigate();
  const { currentUser } = useTenant();
  const [isVisible, setIsVisible] = useState(true);

  if (!currentUser || !isVisible) return null;

  const steps = tourByRole[currentUser.role] || tourByRole.processor;

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-primary" />
            Quick Tour
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Welcome, {currentUser.name}! Here's what you can do as a {ROLE_LABELS[currentUser.role]}:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => navigate(step.route)}
              className="group flex flex-col items-start gap-2 p-4 rounded-lg bg-background/50 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
            >
              <div className="flex items-center gap-2 w-full">
                <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {step.icon}
                </div>
                {step.badge && (
                  <Badge variant="secondary" className="ml-auto text-xs bg-primary/10 text-primary">
                    {step.badge}
                  </Badge>
                )}
              </div>
              <div>
                <p className="font-medium text-sm group-hover:text-primary transition-colors">
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all ml-auto" />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
