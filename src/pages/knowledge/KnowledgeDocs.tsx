import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Search, Filter, Tag, Cpu, FlaskConical, Settings, BookOpen, ArrowLeft, ExternalLink, Edit2, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useTenant } from '@/contexts/TenantContext';
import { knowledgeDocs, companyNotes, CompanyNote } from '@/data/seed/knowledgeDocs';
import { assets, materials } from '@/data/seed/assets';
import { users } from '@/data/seed/users';
import { fixRecords } from '@/data/seed/fixRecords';
import { issues } from '@/data/seed/issues';
import { KnowledgeDoc, KnowledgeDocType, KnowledgeLevel } from '@/types/models';
import { format } from 'date-fns';

const TYPE_CONFIG: Record<KnowledgeDocType, { label: string; icon: React.ElementType; color: string }> = {
  ProcessGuide: { label: 'Process Guide', icon: Settings, color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  MaterialGuide: { label: 'Material Guide', icon: FlaskConical, color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  MachineGuide: { label: 'Machine Guide', icon: Cpu, color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  AuxGuide: { label: 'Auxiliary Guide', icon: Settings, color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  DefectGuide: { label: 'Defect Guide', icon: BookOpen, color: 'bg-red-500/10 text-red-500 border-red-500/20' },
};

const LEVEL_CONFIG: Record<KnowledgeLevel, { label: string; color: string }> = {
  Beginner: { label: 'Beginner', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  Intermediate: { label: 'Intermediate', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
  Advanced: { label: 'Advanced', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
};

function DocsList() {
  const { currentTenant } = useTenant();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');

  // Filter docs (exclude DefectGuide as they have their own page)
  const tenantDocs = useMemo(() => {
    return knowledgeDocs.filter(doc => 
      doc.tenantId === currentTenant?.id && 
      doc.type !== 'DefectGuide'
    );
  }, [currentTenant?.id]);

  // Get unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    tenantDocs.forEach(doc => doc.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [tenantDocs]);

  // Apply filters
  const filteredDocs = useMemo(() => {
    return tenantDocs.filter(doc => {
      const matchesSearch = searchQuery === '' || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesType = typeFilter === 'all' || doc.type === typeFilter;
      const matchesLevel = levelFilter === 'all' || doc.level === levelFilter;
      const matchesTag = tagFilter === 'all' || doc.tags.includes(tagFilter);

      return matchesSearch && matchesType && matchesLevel && matchesTag;
    });
  }, [tenantDocs, searchQuery, typeFilter, levelFilter, tagFilter]);

  // Group by type
  const groupedDocs = useMemo(() => {
    const groups: Record<string, KnowledgeDoc[]> = {};
    filteredDocs.forEach(doc => {
      if (!groups[doc.type]) groups[doc.type] = [];
      groups[doc.type].push(doc);
    });
    return groups;
  }, [filteredDocs]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-muted-foreground">
            Process guides, material guides, and machine documentation
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
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="ProcessGuide">Process Guide</SelectItem>
                  <SelectItem value="MaterialGuide">Material Guide</SelectItem>
                  <SelectItem value="MachineGuide">Machine Guide</SelectItem>
                  <SelectItem value="AuxGuide">Auxiliary Guide</SelectItem>
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
        Showing {filteredDocs.length} of {tenantDocs.length} documents
      </div>

      {/* Grouped Documents */}
      {Object.entries(groupedDocs).map(([type, docs]) => {
        const config = TYPE_CONFIG[type as KnowledgeDocType];
        const Icon = config?.icon || FileText;
        
        return (
          <div key={type} className="space-y-3">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">{config?.label || type}</h2>
              <Badge variant="secondary" className="ml-2">{docs.length}</Badge>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {docs.map(doc => (
                <Link key={doc.id} to={`/knowledge/docs/${doc.id}`}>
                  <Card className="h-full transition-colors hover:border-primary/50 hover:bg-card/80">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base leading-tight">{doc.title}</CardTitle>
                        <Badge variant="outline" className={LEVEL_CONFIG[doc.level].color}>
                          {doc.level}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{doc.summary}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {doc.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{doc.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {filteredDocs.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-medium">No documents found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function DocDetail({ docId }: { docId: string }) {
  const { currentTenant } = useTenant();
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  const doc = knowledgeDocs.find(d => d.id === docId && d.tenantId === currentTenant?.id);
  const note = companyNotes.find(n => n.docId === docId);

  // Get related entities
  const relatedAssets = assets.filter(a => doc?.relatedAssetIds.includes(a.id));
  const relatedMaterials = materials.filter(m => doc?.relatedMaterialIds.includes(m.id));
  
  // Find fix records that reference this doc
  const relatedFixes = fixRecords.filter(f => 
    f.committedToKnowledgeDocId === docId || 
    f.relatedAssetIds.some(id => doc?.relatedAssetIds.includes(id))
  );

  // Find issues related to the same assets
  const relatedIssues = issues.filter(i =>
    i.context?.assetId && doc?.relatedAssetIds.includes(i.context.assetId)
  );

  const author = users.find(u => u.id === doc?.createdBy);
  const noteEditor = note ? users.find(u => u.id === note.editedBy) : null;

  if (!doc) {
    return (
      <div className="space-y-6">
        <Link to="/knowledge/docs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Documents
        </Link>
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-medium">Document not found</h3>
          </CardContent>
        </Card>
      </div>
    );
  }

  const config = TYPE_CONFIG[doc.type];
  const Icon = config?.icon || FileText;

  const handleSaveNote = () => {
    // In a real app, this would save to the database
    setIsEditingNote(false);
  };

  return (
    <div className="space-y-6">
      <Link to="/knowledge/docs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Documents
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`rounded-lg p-3 ${config?.color || 'bg-muted'}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className={config?.color}>
                {config?.label}
              </Badge>
              <Badge variant="outline" className={LEVEL_CONFIG[doc.level].color}>
                {doc.level}
              </Badge>
              <Badge variant="outline">{doc.status}</Badge>
            </div>
            <h1 className="text-2xl font-bold">{doc.title}</h1>
            <p className="text-muted-foreground mt-1">{doc.summary}</p>
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
              <span className="font-medium">{format(new Date(doc.createdAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Tags:</span>
              {doc.tags.map(tag => (
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
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="content">
                <TabsList>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="company-notes">
                    Company Notes
                    {note && <span className="ml-1 text-xs text-muted-foreground">(v{note.version})</span>}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="mt-4">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap font-mono text-sm bg-muted/50 p-4 rounded-lg">
                      {doc.body}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="company-notes" className="mt-4">
                  <div className="space-y-4">
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
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Cross Links */}
        <div className="space-y-4">
          {/* Related Assets */}
          {relatedAssets.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Related Equipment</CardTitle>
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
                <CardTitle className="text-sm">Related Materials</CardTitle>
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

          {/* Related Fix Records */}
          {relatedFixes.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Related Fix Records</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {relatedFixes.slice(0, 3).map(fix => (
                  <Link key={fix.id} to={`/knowledge/fixes/${fix.id}`} className="block">
                    <div className="flex items-center gap-2 text-sm hover:text-primary">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{fix.title}</span>
                    </div>
                  </Link>
                ))}
                {relatedFixes.length > 3 && (
                  <p className="text-xs text-muted-foreground">+{relatedFixes.length - 3} more</p>
                )}
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
                {relatedIssues.slice(0, 3).map(issue => (
                  <Link key={issue.id} to={`/issues/${issue.id}`} className="block">
                    <div className="flex items-center gap-2 text-sm hover:text-primary">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{issue.title}</span>
                    </div>
                  </Link>
                ))}
                {relatedIssues.length > 3 && (
                  <p className="text-xs text-muted-foreground">+{relatedIssues.length - 3} more</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function KnowledgeDocs() {
  const { id } = useParams();

  if (id) {
    return <DocDetail docId={id} />;
  }

  return <DocsList />;
}
