import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AlertTriangle, Search, Filter, ArrowLeft, CheckCircle2, XCircle, AlertCircle, Wrench, Shield, Cpu, FlaskConical, ExternalLink, Edit2, Clock, ChevronRight, Tag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useTenant } from '@/contexts/TenantContext';
import { defectGuides, companyNotes } from '@/data/seed/knowledgeDocs';
import { assets, materials } from '@/data/seed/assets';
import { users } from '@/data/seed/users';
import { fixRecords } from '@/data/seed/fixRecords';
import { issues } from '@/data/seed/issues';
import { DefectGuide, DefectSeverity, KnowledgeLevel } from '@/types/models';
import { format } from 'date-fns';

const SEVERITY_CONFIG: Record<DefectSeverity, { label: string; color: string; icon: React.ElementType }> = {
  Critical: { label: 'Critical', color: 'bg-destructive/10 text-destructive border-destructive/20', icon: XCircle },
  Functional: { label: 'Functional', color: 'bg-warning/10 text-warning border-warning/20', icon: AlertCircle },
  Cosmetic: { label: 'Cosmetic', color: 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20', icon: CheckCircle2 },
};

const LEVEL_CONFIG: Record<KnowledgeLevel, { label: string; color: string }> = {
  Beginner: { label: 'Beginner', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  Intermediate: { label: 'Intermediate', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
  Advanced: { label: 'Advanced', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
};

const LIKELIHOOD_CONFIG = {
  High: 'bg-red-500/10 text-red-500',
  Medium: 'bg-yellow-500/10 text-yellow-500',
  Low: 'bg-green-500/10 text-green-500',
};

function DefectsList() {
  const { currentTenant } = useTenant();
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');

  const tenantDefects = useMemo(() => {
    return defectGuides.filter(d => d.tenantId === currentTenant?.id);
  }, [currentTenant?.id]);

  // Get unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    tenantDefects.forEach(d => d.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [tenantDefects]);

  // Apply filters
  const filteredDefects = useMemo(() => {
    return tenantDefects.filter(defect => {
      const matchesSearch = searchQuery === '' || 
        defect.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        defect.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        defect.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesSeverity = severityFilter === 'all' || defect.severity === severityFilter;
      const matchesLevel = levelFilter === 'all' || defect.level === levelFilter;
      const matchesTag = tagFilter === 'all' || defect.tags.includes(tagFilter);

      return matchesSearch && matchesSeverity && matchesLevel && matchesTag;
    });
  }, [tenantDefects, searchQuery, severityFilter, levelFilter, tagFilter]);

  // Group by severity
  const groupedDefects = useMemo(() => {
    const groups: Record<DefectSeverity, DefectGuide[]> = {
      Critical: [],
      Functional: [],
      Cosmetic: [],
    };
    filteredDefects.forEach(defect => {
      groups[defect.severity].push(defect);
    });
    return groups;
  }, [filteredDefects]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Defect Guides</h1>
          <p className="text-muted-foreground">
            Troubleshooting guides for injection molding defects
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search defects by name, symptoms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="Functional">Functional</SelectItem>
                  <SelectItem value="Cosmetic">Cosmetic</SelectItem>
                </SelectContent>
              </Select>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Select value={tagFilter} onValueChange={setTagFilter}>
                <SelectTrigger className="w-[160px]">
                  <Tag className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredDefects.length} of {tenantDefects.length} defect guides
      </div>

      {/* Grouped by Severity */}
      {(['Critical', 'Functional', 'Cosmetic'] as DefectSeverity[]).map(severity => {
        const defects = groupedDefects[severity];
        if (defects.length === 0) return null;
        
        const config = SEVERITY_CONFIG[severity];
        const Icon = config.icon;
        
        return (
          <div key={severity} className="space-y-3">
            <div className="flex items-center gap-2">
              <Icon className={`h-5 w-5 ${severity === 'Critical' ? 'text-destructive' : severity === 'Functional' ? 'text-warning' : 'text-muted-foreground'}`} />
              <h2 className="text-lg font-semibold">{severity} Defects</h2>
              <Badge variant="secondary" className="ml-2">{defects.length}</Badge>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {defects.map(defect => (
                <Link key={defect.id} to={`/knowledge/defects/${defect.id}`}>
                  <Card className={`h-full transition-colors hover:border-primary/50 hover:bg-card/80 ${severity === 'Critical' ? 'border-destructive/30' : ''}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base leading-tight">{defect.title}</CardTitle>
                        <Badge variant="outline" className={config.color}>
                          {severity}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{defect.summary}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">
                          Top cause: <span className="font-medium text-foreground">{defect.causes[0]?.cause}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {defect.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          <Badge variant="outline" className={`text-xs ${LEVEL_CONFIG[defect.level].color}`}>
                            {defect.level}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {filteredDefects.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-medium">No defect guides found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function DefectDetail({ defectId }: { defectId: string }) {
  const { currentTenant } = useTenant();
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  const defect = defectGuides.find(d => d.id === defectId && d.tenantId === currentTenant?.id);
  const note = companyNotes.find(n => n.docId === defectId);

  // Get related entities
  const relatedAssets = assets.filter(a => defect?.relatedAssetIds.includes(a.id));
  const relatedMaterials = materials.filter(m => defect?.relatedMaterialIds.includes(m.id));
  
  // Find fix records that might be related to this defect type
  const relatedFixes = fixRecords.filter(f => 
    f.relatedDefectIds.includes(defectId) ||
    f.relatedAssetIds.some(id => defect?.relatedAssetIds.includes(id))
  );

  // Find issues that might be related
  const relatedIssues = issues.filter(i =>
    i.context?.assetId && defect?.relatedAssetIds.includes(i.context.assetId)
  );

  const author = users.find(u => u.id === defect?.createdBy);
  const noteEditor = note ? users.find(u => u.id === note.editedBy) : null;

  if (!defect) {
    return (
      <div className="space-y-6">
        <Link to="/knowledge/defects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Defect Guides
        </Link>
        <Card>
          <CardContent className="py-12 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-medium">Defect guide not found</h3>
          </CardContent>
        </Card>
      </div>
    );
  }

  const severityConfig = SEVERITY_CONFIG[defect.severity];
  const SeverityIcon = severityConfig.icon;

  const handleSaveNote = () => {
    setIsEditingNote(false);
  };

  return (
    <div className="space-y-6">
      <Link to="/knowledge/defects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Defect Guides
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`rounded-lg p-3 ${severityConfig.color}`}>
            <SeverityIcon className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className={severityConfig.color}>
                {defect.severity}
              </Badge>
              <Badge variant="outline" className={LEVEL_CONFIG[defect.level].color}>
                {defect.level}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold">{defect.title}</h1>
            <p className="text-muted-foreground mt-1">{defect.summary}</p>
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Author:</span>{' '}
              <span className="font-medium">{author?.name || 'Unknown'}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Created:</span>{' '}
              <span className="font-medium">{format(new Date(defect.createdAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Tags:</span>
              {defect.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="diagnosis" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
              <TabsTrigger value="fixes">Fixes</TabsTrigger>
              <TabsTrigger value="prevention">Prevention</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="diagnosis" className="space-y-4 mt-4">
              {/* Symptoms */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    Symptoms
                  </CardTitle>
                  <CardDescription>What you'll observe on the parts</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {defect.symptoms.map((symptom, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Causes */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    Possible Causes
                  </CardTitle>
                  <CardDescription>Ranked by likelihood</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {defect.causes.map((cause, i) => (
                      <div key={i} className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/50">
                        <span>{cause.cause}</span>
                        <Badge variant="outline" className={LIKELIHOOD_CONFIG[cause.likelihood]}>
                          {cause.likelihood}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Confirm Checks */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Confirmation Checks
                  </CardTitle>
                  <CardDescription>Verify the root cause before fixing</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {defect.confirmChecks.map((check, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="h-5 w-5 rounded border flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs text-muted-foreground">{i + 1}</span>
                        </div>
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fixes" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    Fix Procedure
                  </CardTitle>
                  <CardDescription>Step-by-step resolution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {defect.fixes.map((fix) => (
                      <li key={fix.step} className="flex items-start gap-3 text-sm">
                        <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-medium">
                          {fix.step}
                        </div>
                        <span className="pt-0.5">{fix.detail}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* Approved Fixes from Fix Records */}
              {relatedFixes.filter(f => f.status === 'Committed').length > 0 && (
                <Card className="border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Verified Fixes from Your Team
                    </CardTitle>
                    <CardDescription>Tribal knowledge from resolved issues</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {relatedFixes.filter(f => f.status === 'Committed').map(fix => (
                      <Link key={fix.id} to={`/knowledge/fixes/${fix.id}`} className="block">
                        <div className="p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{fix.title}</span>
                            <Badge variant="outline" className="bg-primary/10 text-primary">Verified</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{fix.problemSummary}</p>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="prevention" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    Prevention Measures
                  </CardTitle>
                  <CardDescription>How to prevent this defect from occurring</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {defect.prevention.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Company Notes</CardTitle>
                  <CardDescription>Internal notes and updates for your team</CardDescription>
                </CardHeader>
                <CardContent>
                  {note && !isEditingNote ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Last edited by {noteEditor?.name} on {format(new Date(note.editedAt), 'MMM d, yyyy')}</span>
                          <Badge variant="outline" className="text-xs">v{note.version}</Badge>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => {
                          setNoteContent(note.content);
                          setIsEditingNote(true);
                        }}>
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                      <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                        <div className="whitespace-pre-wrap text-sm">{note.content}</div>
                      </div>
                    </div>
                  ) : isEditingNote ? (
                    <div className="space-y-3">
                      <Textarea
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        placeholder="Add internal notes, updates, or clarifications..."
                        rows={6}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSaveNote}>Save Note</Button>
                        <Button variant="outline" size="sm" onClick={() => setIsEditingNote(false)}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">No company notes yet</p>
                      <Button variant="outline" size="sm" className="mt-2" onClick={() => setIsEditingNote(true)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Add Company Note
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Cross Links */}
        <div className="space-y-4">
          {/* Related Assets */}
          {relatedAssets.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Applicable Equipment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {relatedAssets.map(asset => (
                  <div key={asset.id} className="flex items-center gap-2 text-sm">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <span>{asset.name}</span>
                    <Badge variant="outline" className="text-xs ml-auto">{asset.type}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Related Materials */}
          {relatedMaterials.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Affected Materials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {relatedMaterials.map(material => (
                  <div key={material.id} className="flex items-center gap-2 text-sm">
                    <FlaskConical className="h-4 w-4 text-muted-foreground" />
                    <span>{material.name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Related Issues */}
          {relatedIssues.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Related Issues</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {relatedIssues.slice(0, 5).map(issue => (
                  <Link key={issue.id} to={`/issues/${issue.id}`} className="block">
                    <div className="flex items-center gap-2 text-sm hover:text-primary">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{issue.title}</span>
                    </div>
                  </Link>
                ))}
                {relatedIssues.length > 5 && (
                  <p className="text-xs text-muted-foreground">+{relatedIssues.length - 5} more</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Related Fix Records */}
          {relatedFixes.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Fix Records</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {relatedFixes.slice(0, 5).map(fix => (
                  <Link key={fix.id} to={`/knowledge/fixes/${fix.id}`} className="block">
                    <div className="flex items-center gap-2 text-sm hover:text-primary">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{fix.title}</span>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function KnowledgeDefects() {
  const { id } = useParams();

  if (id) {
    return <DefectDetail defectId={id} />;
  }

  return <DefectsList />;
}
