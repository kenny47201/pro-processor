import { useState } from 'react';
import { Wrench, Plus, Search, Clock, CheckCircle, AlertTriangle, BookOpen, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTenant } from '@/contexts/TenantContext';
import { fixRecords } from '@/data/seed/fixRecords';
import { users } from '@/data/seed/users';
import { assets } from '@/data/seed/assets';
import { FixRecordStatus } from '@/types/models';
import { format } from 'date-fns';

const STATUS_CONFIG: Record<FixRecordStatus, { label: string; className: string; icon: React.ReactNode }> = {
  Draft: {
    label: 'Draft',
    className: 'bg-muted text-muted-foreground',
    icon: <Clock className="h-3 w-3" />,
  },
  PendingVerification: {
    label: 'Pending Verification',
    className: 'bg-warning/15 text-warning border-warning/30',
    icon: <AlertTriangle className="h-3 w-3" />,
  },
  Verified: {
    label: 'Verified',
    className: 'bg-primary/15 text-primary border-primary/30',
    icon: <CheckCircle className="h-3 w-3" />,
  },
  Committed: {
    label: 'Committed',
    className: 'bg-success/15 text-success border-success/30',
    icon: <BookOpen className="h-3 w-3" />,
  },
  Rejected: {
    label: 'Rejected',
    className: 'bg-destructive/15 text-destructive border-destructive/30',
    icon: <AlertTriangle className="h-3 w-3" />,
  },
};

export default function KnowledgeFixes() {
  const { currentTenant, canCreateFixes } = useTenant();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const tenantFixes = fixRecords.filter(f => f.tenantId === currentTenant?.id);

  const filteredFixes = tenantFixes.filter(fix => {
    const matchesSearch = 
      fix.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fix.problemSummary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || fix.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Count by status
  const statusCounts = tenantFixes.reduce((acc, fix) => {
    acc[fix.status] = (acc[fix.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getCreator = (userId: string) => users.find(u => u.id === userId);
  const getAsset = (assetId: string) => assets.find(a => a.id === assetId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Wrench className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Fix Records</h1>
            <p className="text-muted-foreground">
              Tribal knowledge captured from resolved issues
            </p>
          </div>
        </div>
        {canCreateFixes && (
          <Button asChild>
            <Link to="/knowledge/fixes/new">
              <Plus className="h-4 w-4 mr-2" />
              New Fix Record
            </Link>
          </Button>
        )}
      </div>

      {/* Status Pipeline */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Fix Record Pipeline</CardTitle>
          <CardDescription>Track fixes from creation to knowledge base commitment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(STATUS_CONFIG).map(([status, config]) => (
              <Badge 
                key={status}
                variant="outline" 
                className={`cursor-pointer transition-opacity ${config.className} ${statusFilter === status ? '' : 'opacity-60 hover:opacity-100'}`}
                onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
              >
                {config.icon}
                <span className="ml-1">{config.label}</span>
                <span className="ml-1.5 text-xs opacity-70">({statusCounts[status] || 0})</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search fix records..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.entries(STATUS_CONFIG).map(([status, config]) => (
              <SelectItem key={status} value={status}>
                {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Fix Records List */}
      <div className="space-y-3">
        {filteredFixes.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No fix records found matching your criteria.
            </CardContent>
          </Card>
        ) : (
          filteredFixes.map(fix => {
            const creator = getCreator(fix.createdBy);
            const linkedAsset = fix.relatedAssetIds[0] ? getAsset(fix.relatedAssetIds[0]) : undefined;
            const statusConfig = STATUS_CONFIG[fix.status];

            return (
              <Link key={fix.id} to={`/knowledge/fixes/${fix.id}`}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={statusConfig.className}>
                            {statusConfig.icon}
                            <span className="ml-1">{statusConfig.label}</span>
                          </Badge>
                          {fix.sourceIssueId && (
                            <Badge variant="secondary" className="text-xs">
                              From Issue #{fix.sourceIssueId}
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold truncate">{fix.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {fix.problemSummary}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>By {creator?.name || 'Unknown'}</span>
                          <span>{format(new Date(fix.createdAt), 'MMM d, yyyy')}</span>
                          {linkedAsset && (
                            <Badge variant="outline" className="text-xs">
                              {linkedAsset.name}
                            </Badge>
                          )}
                          <span className="flex items-center gap-1">
                            <FileCheck className="h-3 w-3" />
                            {fix.fixSteps.length} steps
                          </span>
                        </div>
                      </div>
                      {fix.status === 'Committed' && (
                        <div className="flex items-center gap-1 text-success">
                          <BookOpen className="h-4 w-4" />
                          <span className="text-xs">In Knowledge Base</span>
                        </div>
                      )}
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
