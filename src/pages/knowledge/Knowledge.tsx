import { useState, useMemo } from 'react';
import { BookOpen, FileText, AlertTriangle, Wrench, ArrowRight, Search, Filter, Tag, Cpu, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTenant } from '@/contexts/TenantContext';
import { knowledgeDocs, defectGuides } from '@/data/seed/knowledgeDocs';
import { fixRecords } from '@/data/seed/fixRecords';
import { assets, materials } from '@/data/seed/assets';

type SearchResult = {
  id: string;
  type: 'doc' | 'defect' | 'fix' | 'asset' | 'material';
  title: string;
  description: string;
  href: string;
  tags: string[];
  metadata?: string;
};

const sections = [
  {
    title: 'Documents',
    description: 'Process guides, material guides, machine guides',
    icon: FileText,
    href: '/knowledge/docs',
    countKey: 'docs',
  },
  {
    title: 'Defect Guides',
    description: 'Troubleshooting guides for common defects',
    icon: AlertTriangle,
    href: '/knowledge/defects',
    countKey: 'defects',
  },
  {
    title: 'Fix Records',
    description: 'Tribal knowledge from resolved issues',
    icon: Wrench,
    href: '/knowledge/fixes',
    countKey: 'fixes',
  },
];

const TYPE_ICONS = {
  doc: FileText,
  defect: AlertTriangle,
  fix: Wrench,
  asset: Cpu,
  material: FlaskConical,
};

const TYPE_LABELS = {
  doc: 'Document',
  defect: 'Defect Guide',
  fix: 'Fix Record',
  asset: 'Equipment',
  material: 'Material',
};

export default function Knowledge() {
  const { currentTenant } = useTenant();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');

  // Get tenant-specific counts
  const counts = useMemo(() => {
    const tenantDocs = knowledgeDocs.filter(d => d.tenantId === currentTenant?.id && d.type !== 'DefectGuide');
    const tenantDefects = defectGuides.filter(d => d.tenantId === currentTenant?.id);
    const tenantFixes = fixRecords.filter(f => f.tenantId === currentTenant?.id);
    
    return {
      docs: tenantDocs.length,
      defects: tenantDefects.length,
      fixes: tenantFixes.length,
    };
  }, [currentTenant?.id]);

  // Build search index
  const searchIndex = useMemo<SearchResult[]>(() => {
    const results: SearchResult[] = [];
    
    // Add docs
    knowledgeDocs
      .filter(d => d.tenantId === currentTenant?.id && d.type !== 'DefectGuide')
      .forEach(doc => {
        results.push({
          id: doc.id,
          type: 'doc',
          title: doc.title,
          description: doc.summary,
          href: `/knowledge/docs/${doc.id}`,
          tags: doc.tags,
          metadata: doc.type,
        });
      });
    
    // Add defects
    defectGuides
      .filter(d => d.tenantId === currentTenant?.id)
      .forEach(defect => {
        results.push({
          id: defect.id,
          type: 'defect',
          title: defect.title,
          description: defect.summary,
          href: `/knowledge/defects/${defect.id}`,
          tags: defect.tags,
          metadata: defect.severity,
        });
      });
    
    // Add fix records
    fixRecords
      .filter(f => f.tenantId === currentTenant?.id)
      .forEach(fix => {
        results.push({
          id: fix.id,
          type: 'fix',
          title: fix.title,
          description: fix.problemSummary,
          href: `/knowledge/fixes/${fix.id}`,
          tags: [],
          metadata: fix.status,
        });
      });
    
    // Add assets
    assets
      .filter(a => a.tenantId === currentTenant?.id)
      .forEach(asset => {
        results.push({
          id: asset.id,
          type: 'asset',
          title: asset.name,
          description: `${asset.manufacturer || ''} ${asset.model || ''} - ${asset.type}`.trim(),
          href: `/knowledge/docs`, // Link to filtered docs
          tags: asset.tags,
          metadata: asset.type,
        });
      });
    
    // Add materials
    materials
      .filter(m => m.tenantId === currentTenant?.id)
      .forEach(material => {
        results.push({
          id: material.id,
          type: 'material',
          title: material.name,
          description: `${material.manufacturer || ''} ${material.grade || ''} - ${material.type}`.trim(),
          href: `/knowledge/docs`, // Link to filtered docs
          tags: material.tags,
          metadata: material.type,
        });
      });
    
    return results;
  }, [currentTenant?.id]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    searchIndex.forEach(item => item.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [searchIndex]);

  // Filter search results
  const searchResults = useMemo(() => {
    if (!searchQuery && typeFilter === 'all' && tagFilter === 'all') {
      return [];
    }
    
    return searchIndex.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesTag = tagFilter === 'all' || item.tags.includes(tagFilter);
      
      return matchesSearch && matchesType && matchesTag;
    });
  }, [searchIndex, searchQuery, typeFilter, tagFilter]);

  const showSearchResults = searchQuery || typeFilter !== 'all' || tagFilter !== 'all';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Knowledge Hub</h1>
          <p className="text-muted-foreground">
            Search and browse guides, defect solutions, and tribal knowledge
          </p>
        </div>
      </div>

      {/* Global Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Search</CardTitle>
          <CardDescription>Search across all knowledge content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search guides, defects, fixes, equipment, materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="doc">Documents</SelectItem>
                  <SelectItem value="defect">Defect Guides</SelectItem>
                  <SelectItem value="fix">Fix Records</SelectItem>
                  <SelectItem value="asset">Equipment</SelectItem>
                  <SelectItem value="material">Materials</SelectItem>
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

      {/* Search Results */}
      {showSearchResults ? (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {searchResults.length} results found
          </div>
          
          {searchResults.length > 0 ? (
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All ({searchResults.length})</TabsTrigger>
                <TabsTrigger value="doc">Docs ({searchResults.filter(r => r.type === 'doc').length})</TabsTrigger>
                <TabsTrigger value="defect">Defects ({searchResults.filter(r => r.type === 'defect').length})</TabsTrigger>
                <TabsTrigger value="fix">Fixes ({searchResults.filter(r => r.type === 'fix').length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map(result => {
                    const Icon = TYPE_ICONS[result.type];
                    return (
                      <Link key={`${result.type}-${result.id}`} to={result.href}>
                        <Card className="h-full transition-colors hover:border-primary/50 hover:bg-card/80">
                          <CardHeader className="pb-2">
                            <div className="flex items-start gap-2">
                              <Icon className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs shrink-0">
                                    {TYPE_LABELS[result.type]}
                                  </Badge>
                                  {result.metadata && (
                                    <Badge variant="secondary" className="text-xs shrink-0">
                                      {result.metadata}
                                    </Badge>
                                  )}
                                </div>
                                <CardTitle className="text-sm leading-tight truncate">{result.title}</CardTitle>
                              </div>
                            </div>
                            <CardDescription className="line-clamp-2 text-xs">
                              {result.description}
                            </CardDescription>
                          </CardHeader>
                          {result.tags.length > 0 && (
                            <CardContent className="pt-0">
                              <div className="flex flex-wrap gap-1">
                                {result.tags.slice(0, 2).map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </TabsContent>
              
              {['doc', 'defect', 'fix'].map(type => (
                <TabsContent key={type} value={type} className="mt-4">
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {searchResults.filter(r => r.type === type).map(result => {
                      const Icon = TYPE_ICONS[result.type];
                      return (
                        <Link key={result.id} to={result.href}>
                          <Card className="h-full transition-colors hover:border-primary/50 hover:bg-card/80">
                            <CardHeader className="pb-2">
                              <div className="flex items-start gap-2">
                                <Icon className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div className="flex-1">
                                  <CardTitle className="text-sm leading-tight">{result.title}</CardTitle>
                                  {result.metadata && (
                                    <Badge variant="secondary" className="text-xs mt-1">
                                      {result.metadata}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <CardDescription className="line-clamp-2 text-xs">
                                {result.description}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Search className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 font-medium">No results found</h3>
                <p className="text-sm text-muted-foreground">
                  Try different search terms or filters
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <>
          {/* Section Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {sections.map((section) => (
              <Link key={section.href} to={section.href}>
                <Card className="h-full transition-colors hover:border-primary/50 hover:bg-card/80">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <section.icon className="h-6 w-6 text-primary" />
                      <span className="text-2xl font-bold text-primary">
                        {counts[section.countKey as keyof typeof counts]}
                      </span>
                    </div>
                    <CardTitle className="flex items-center justify-between">
                      {section.title}
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          {/* Quick Access by Category */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* By Equipment */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-muted-foreground" />
                  Browse by Equipment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {assets.filter(a => a.tenantId === currentTenant?.id).map(asset => (
                    <Link key={asset.id} to={`/knowledge/docs?asset=${asset.id}`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        {asset.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* By Material */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-muted-foreground" />
                  Browse by Material
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {materials.filter(m => m.tenantId === currentTenant?.id).map(material => (
                    <Link key={material.id} to={`/knowledge/docs?material=${material.id}`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        {material.name.split(' - ')[0]}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Fix Records */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-muted-foreground" />
                  Recently Verified Fixes
                </CardTitle>
                <Link to="/knowledge/fixes" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              <CardDescription>Tribal knowledge from your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {fixRecords
                  .filter(f => f.tenantId === currentTenant?.id && (f.status === 'Verified' || f.status === 'Committed'))
                  .slice(0, 3)
                  .map(fix => (
                    <Link key={fix.id} to={`/knowledge/fixes/${fix.id}`}>
                      <div className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors">
                        <div className="min-w-0">
                          <h4 className="font-medium text-sm truncate">{fix.title}</h4>
                          <p className="text-xs text-muted-foreground truncate">{fix.problemSummary}</p>
                        </div>
                        <Badge variant={fix.status === 'Committed' ? 'default' : 'secondary'} className="shrink-0 ml-2">
                          {fix.status}
                        </Badge>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
