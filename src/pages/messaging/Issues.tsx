import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Plus, AlertCircle, ChevronRight, Loader2, Search, Wrench } from 'lucide-react';
import { useIssues, type IssueCategory, type IssuePriority, type IssueStatus } from '@/hooks/useIssues';
import { useMachines, useMolds } from '@/hooks/useMachinesMolds';
import { useTenant } from '@/contexts/TenantContext';
import { EmptyState } from '@/components/EmptyState';
import { formatDistanceToNow } from 'date-fns';


const STATUS_STYLES: Record<IssueStatus, string> = {
  open: 'bg-warning/10 text-warning border-warning/30',
  in_progress: 'bg-primary/10 text-primary border-primary/30',
  needs_verification: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  closed: 'bg-muted text-muted-foreground border-border',
};

const PRIORITY_STYLES: Record<IssuePriority, string> = {
  low: 'bg-muted text-muted-foreground border-border',
  medium: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  high: 'bg-warning/10 text-warning border-warning/30',
  critical: 'bg-destructive/10 text-destructive border-destructive/30',
};

const CATEGORY_LABELS: Record<IssueCategory, string> = {
  process: 'Process',
  maintenance: 'Maintenance',
  tooling: 'Tooling',
  quality: 'Quality',
};

const STATUS_LABELS: Record<IssueStatus, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  needs_verification: 'Needs Verification',
  closed: 'Closed',
};

export default function Issues() {
  const navigate = useNavigate();
  const { currentUser } = useTenant();
  const [statusFilter, setStatusFilter] = useState<'all' | IssueStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | IssueCategory>('all');
  const [machineFilter, setMachineFilter] = useState<'all' | string>('all');
  const [moldFilter, setMoldFilter] = useState<'all' | string>('all');
  const [search, setSearch] = useState('');

  const { data: machines = [] } = useMachines(currentUser?.tenantId ?? null);
  const { data: molds = [] } = useMolds(currentUser?.tenantId ?? null);
  const machineName = (id: string | null) => machines.find(m => m.id === id)?.name;
  const moldName = (id: string | null) => molds.find(m => m.id === id)?.name;

  const { data: issues, isLoading } = useIssues({
    status: statusFilter === 'all' ? undefined : statusFilter,
    category: categoryFilter === 'all' ? undefined : categoryFilter,
    asset_id: machineFilter === 'all' ? undefined : machineFilter,
    mold_id: moldFilter === 'all' ? undefined : moldFilter,
  });

  const anyFilter = !!search || statusFilter !== 'all' || categoryFilter !== 'all'
    || machineFilter !== 'all' || moldFilter !== 'all';

  const filtered = useMemo(() => {
    if (!issues) return [];
    const q = search.trim().toLowerCase();
    if (!q) return issues;
    return issues.filter(i =>
      i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
    );
  }, [issues, search]);


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Wrench className="h-6 w-6 text-primary" />
            Problem Tracker
          </h1>
          <p className="text-muted-foreground">Recurring technical issues and resolution history</p>
        </div>
        <Button onClick={() => navigate('/issues/new')} className="gap-2">
          <Plus className="h-4 w-4" />
          Report Issue
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search issues..."
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {(Object.keys(STATUS_LABELS) as IssueStatus[]).map(s => (
              <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as typeof categoryFilter)}>
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {(Object.keys(CATEGORY_LABELS) as IssueCategory[]).map(c => (
              <SelectItem key={c} value={c}>{CATEGORY_LABELS[c]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={machineFilter} onValueChange={setMachineFilter}>
          <SelectTrigger className="w-[170px]"><SelectValue placeholder="All presses" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All presses</SelectItem>
            {machines.map(m => (
              <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={moldFilter} onValueChange={setMoldFilter}>
          <SelectTrigger className="w-[170px]"><SelectValue placeholder="All molds" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All molds</SelectItem>
            {molds.map(m => (
              <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          type="issues"
          title={anyFilter ? 'No matching issues' : 'No issues reported'}
          description={anyFilter
            ? 'Try adjusting your filters.'
            : 'When issues arise, report them here to track resolution.'}
          action={{ label: 'Report Issue', onClick: () => navigate('/issues/new') }}
        />

      ) : (
        <div className="grid gap-3">
          {filtered.map(issue => (
            <Card
              key={issue.id}
              className="hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => navigate(`/issues/${issue.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={STATUS_STYLES[issue.status]}>
                        {STATUS_LABELS[issue.status]}
                      </Badge>
                      <Badge variant="outline" className={PRIORITY_STYLES[issue.priority]}>
                        {issue.priority.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="bg-card text-muted-foreground">
                        {CATEGORY_LABELS[issue.category]}
                      </Badge>
                    </div>
                    <CardTitle className="text-base">{issue.title}</CardTitle>
                    {issue.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{issue.description}</p>
                    )}
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Reported {formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
