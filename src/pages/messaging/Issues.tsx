import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Plus, Filter, Clock, User, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTenant } from '@/contexts/TenantContext';
import { issues as allIssues } from '@/data/seed/issues';
import { users } from '@/data/seed/users';
import { assets } from '@/data/seed/assets';
import { format, formatDistanceToNow, isPast } from 'date-fns';
import { IssueStatus, IssuePriority, IssueCategory } from '@/types/models';

const STATUS_CONFIG: Record<IssueStatus, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive'; className: string }> = {
  Open: { label: 'Open', variant: 'destructive', className: 'border-destructive/30 bg-destructive/10 text-destructive' },
  InProgress: { label: 'In Progress', variant: 'outline', className: 'border-amber-500/30 bg-amber-500/10 text-amber-500' },
  NeedsVerification: { label: 'Needs Verification', variant: 'outline', className: 'border-primary/30 bg-primary/10 text-primary' },
  Closed: { label: 'Closed', variant: 'secondary', className: 'bg-muted text-muted-foreground' },
};

const PRIORITY_CONFIG: Record<IssuePriority, { label: string; className: string }> = {
  Low: { label: 'Low', className: 'text-muted-foreground' },
  Medium: { label: 'Medium', className: 'text-foreground' },
  High: { label: 'High', className: 'text-amber-500' },
  Critical: { label: 'Critical', className: 'text-destructive font-semibold' },
};

const CATEGORY_ICONS: Record<IssueCategory, string> = {
  Process: '⚙️',
  Maintenance: '🔧',
  Tooling: '🔩',
  Quality: '📋',
};

export default function Issues() {
  const { currentUser, currentTenant } = useTenant();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tenantIssues = useMemo(() => {
    if (!currentTenant) return [];
    
    return allIssues
      .filter(issue => issue.tenantId === currentTenant.id)
      .filter(issue => {
        if (statusFilter !== 'all' && issue.status !== statusFilter) return false;
        if (categoryFilter !== 'all' && issue.category !== categoryFilter) return false;
        if (priorityFilter !== 'all' && issue.priority !== priorityFilter) return false;
        if (searchQuery) {
          const lower = searchQuery.toLowerCase();
          return issue.title.toLowerCase().includes(lower) || 
                 issue.description.toLowerCase().includes(lower);
        }
        return true;
      })
      .sort((a, b) => {
        // Sort by priority first, then by date
        const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [currentTenant, statusFilter, categoryFilter, priorityFilter, searchQuery]);

  const statusCounts = useMemo(() => {
    if (!currentTenant) return { Open: 0, InProgress: 0, NeedsVerification: 0, Closed: 0 };
    const tenantAll = allIssues.filter(i => i.tenantId === currentTenant.id);
    return {
      Open: tenantAll.filter(i => i.status === 'Open').length,
      InProgress: tenantAll.filter(i => i.status === 'InProgress').length,
      NeedsVerification: tenantAll.filter(i => i.status === 'NeedsVerification').length,
      Closed: tenantAll.filter(i => i.status === 'Closed').length,
    };
  }, [currentTenant]);

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name ?? 'Unassigned';
  };

  const getAssetName = (assetId: string | undefined) => {
    if (!assetId) return null;
    const asset = assets.find(a => a.id === assetId);
    return asset?.name;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Issues</h1>
            <p className="text-muted-foreground">
              Track and resolve production issues
            </p>
          </div>
        </div>
        <Button asChild>
          <Link to="/issues/new">
            <Plus className="h-4 w-4 mr-2" />
            Log Issue
          </Link>
        </Button>
      </div>

      {/* Status summary */}
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant="outline" 
          className={`cursor-pointer ${statusFilter === 'Open' ? 'ring-2 ring-primary' : ''} ${STATUS_CONFIG.Open.className}`}
          onClick={() => setStatusFilter(statusFilter === 'Open' ? 'all' : 'Open')}
        >
          Open ({statusCounts.Open})
        </Badge>
        <Badge 
          variant="outline" 
          className={`cursor-pointer ${statusFilter === 'InProgress' ? 'ring-2 ring-primary' : ''} ${STATUS_CONFIG.InProgress.className}`}
          onClick={() => setStatusFilter(statusFilter === 'InProgress' ? 'all' : 'InProgress')}
        >
          In Progress ({statusCounts.InProgress})
        </Badge>
        <Badge 
          variant="outline" 
          className={`cursor-pointer ${statusFilter === 'NeedsVerification' ? 'ring-2 ring-primary' : ''} ${STATUS_CONFIG.NeedsVerification.className}`}
          onClick={() => setStatusFilter(statusFilter === 'NeedsVerification' ? 'all' : 'NeedsVerification')}
        >
          Needs Verification ({statusCounts.NeedsVerification})
        </Badge>
        <Badge 
          variant="secondary" 
          className={`cursor-pointer ${statusFilter === 'Closed' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setStatusFilter(statusFilter === 'Closed' ? 'all' : 'Closed')}
        >
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Closed ({statusCounts.Closed})
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Process">Process</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Tooling">Tooling</SelectItem>
                <SelectItem value="Quality">Quality</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* Issues List */}
      <div className="space-y-3">
        {tenantIssues.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No issues found matching your filters</p>
            </CardContent>
          </Card>
        ) : (
          tenantIssues.map(issue => {
            const isOverdue = issue.dueBy && isPast(new Date(issue.dueBy)) && issue.status !== 'Closed';
            const assetName = getAssetName(issue.context?.assetId);
            
            return (
              <Link key={issue.id} to={`/issues/${issue.id}`}>
                <Card className={`hover:bg-accent/50 transition-colors cursor-pointer ${isOverdue ? 'border-destructive/50' : ''}`}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{CATEGORY_ICONS[issue.category]}</span>
                          <Badge variant="outline" className={STATUS_CONFIG[issue.status].className}>
                            {STATUS_CONFIG[issue.status].label}
                          </Badge>
                          <span className={`text-sm font-medium ${PRIORITY_CONFIG[issue.priority].className}`}>
                            {issue.priority === 'Critical' && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                            {issue.priority}
                          </span>
                          {isOverdue && (
                            <Badge variant="destructive" className="text-xs">
                              OVERDUE
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="font-semibold truncate mb-1">{issue.title}</h3>
                        
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                          {issue.description}
                        </p>

                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          {assetName && (
                            <span className="flex items-center gap-1">
                              🔧 {assetName}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {getUserName(issue.ownerId)}
                          </span>
                          {issue.dueBy && (
                            <span className={`flex items-center gap-1 ${isOverdue ? 'text-destructive' : ''}`}>
                              <Clock className="h-3 w-3" />
                              Due {format(new Date(issue.dueBy), 'MMM d')}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                        <span>{formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}</span>
                        <Badge variant="outline" className="text-xs">
                          #{issue.id}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
