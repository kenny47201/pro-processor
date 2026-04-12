import { useState, useMemo } from 'react';
import { Settings as SettingsIcon, Tags, Plus, Trash2, Edit2, Search, FolderTree } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTenant } from '@/contexts/TenantContext';
import { knowledgeDocs, defectGuides, issues, assets, materials } from '@/data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

type TagCategory = 'Knowledge' | 'Issues' | 'Assets' | 'Materials';

interface TagInfo {
  name: string;
  category: TagCategory;
  usageCount: number;
}

export default function Settings() {
  const { currentTenant } = useTenant();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<TagCategory | 'all'>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [newTagName, setNewTagName] = useState('');
  const [newTagCategory, setNewTagCategory] = useState<TagCategory>('Knowledge');

  // Aggregate all tags from tenant data
  const allTags = useMemo(() => {
    const tagMap = new Map<string, TagInfo>();

    // Knowledge docs tags
    const tenantDocs = knowledgeDocs.filter(d => d.tenantId === currentTenant?.id);
    tenantDocs.forEach(doc => {
      doc.tags.forEach(tag => {
        const existing = tagMap.get(tag);
        if (existing) {
          existing.usageCount++;
        } else {
          tagMap.set(tag, { name: tag, category: 'Knowledge', usageCount: 1 });
        }
      });
    });

    // Defect guides tags
    const tenantDefects = defectGuides.filter(d => d.tenantId === currentTenant?.id);
    tenantDefects.forEach(doc => {
      doc.tags.forEach(tag => {
        const existing = tagMap.get(tag);
        if (existing) {
          existing.usageCount++;
        } else {
          tagMap.set(tag, { name: tag, category: 'Knowledge', usageCount: 1 });
        }
      });
    });

    // Asset tags
    const tenantAssets = assets.filter(a => a.tenantId === currentTenant?.id);
    tenantAssets.forEach(asset => {
      asset.tags.forEach(tag => {
        const existing = tagMap.get(tag);
        if (existing) {
          existing.usageCount++;
          if (existing.category === 'Knowledge') existing.category = 'Assets';
        } else {
          tagMap.set(tag, { name: tag, category: 'Assets', usageCount: 1 });
        }
      });
    });

    // Material tags
    const tenantMaterials = materials.filter(m => m.tenantId === currentTenant?.id);
    tenantMaterials.forEach(material => {
      material.tags.forEach(tag => {
        const existing = tagMap.get(tag);
        if (existing) {
          existing.usageCount++;
          if (existing.category === 'Knowledge' || existing.category === 'Assets') {
            existing.category = 'Materials';
          }
        } else {
          tagMap.set(tag, { name: tag, category: 'Materials', usageCount: 1 });
        }
      });
    });

    return Array.from(tagMap.values()).sort((a, b) => b.usageCount - a.usageCount);
  }, [currentTenant]);

  const filteredTags = useMemo(() => {
    return allTags.filter(tag => {
      const matchesSearch = searchQuery === '' || 
        tag.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || tag.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [allTags, searchQuery, categoryFilter]);

  // Group by category
  const tagsByCategory = useMemo(() => {
    const groups: Record<TagCategory, TagInfo[]> = {
      Knowledge: [],
      Issues: [],
      Assets: [],
      Materials: [],
    };
    filteredTags.forEach(tag => {
      groups[tag.category].push(tag);
    });
    return groups;
  }, [filteredTags]);

  const handleCreateTag = () => {
    if (!newTagName.trim()) return;
    toast({
      title: "Tag Created (Demo)",
      description: `"${newTagName}" would be added to ${newTagCategory} taxonomy.`,
    });
    setIsCreateOpen(false);
    setNewTagName('');
  };

  const handleEditTag = (oldName: string, newName: string) => {
    toast({
      title: "Tag Updated (Demo)",
      description: `"${oldName}" would be renamed to "${newName}".`,
    });
    setEditingTag(null);
  };

  const handleDeleteTag = (tag: TagInfo) => {
    toast({
      title: "Tag Deleted (Demo)",
      description: `"${tag.name}" would be removed (${tag.usageCount} items affected).`,
      variant: "destructive",
    });
  };

  const categoryColors: Record<TagCategory, string> = {
    Knowledge: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    Issues: 'bg-orange-500/10 text-orange-500 border-orange-500/30',
    Assets: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
    Materials: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SettingsIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Configure facility settings and tag taxonomy
            </p>
          </div>
        </div>
      </div>

      {/* Tag Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Tags className="h-5 w-5 text-primary" />
                Tag Management
              </CardTitle>
              <CardDescription>
                Manage tags used across knowledge base, issues, and assets
              </CardDescription>
            </div>
            <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Tag
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select 
              value={categoryFilter} 
              onValueChange={(v) => setCategoryFilter(v as TagCategory | 'all')}
            >
              <SelectTrigger className="w-[150px]">
                <FolderTree className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Knowledge">Knowledge</SelectItem>
                <SelectItem value="Issues">Issues</SelectItem>
                <SelectItem value="Assets">Assets</SelectItem>
                <SelectItem value="Materials">Materials</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-4 gap-4">
            {(['Knowledge', 'Issues', 'Assets', 'Materials'] as TagCategory[]).map(cat => (
              <Card key={cat} className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">
                    {tagsByCategory[cat].length}
                  </div>
                  <div className="text-sm text-muted-foreground">{cat}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />

          {/* Tag List by Category */}
          {categoryFilter === 'all' ? (
            <div className="space-y-6">
              {(['Knowledge', 'Assets', 'Materials'] as TagCategory[]).map(category => {
                const categoryTags = tagsByCategory[category];
                if (categoryTags.length === 0) return null;

                return (
                  <div key={category}>
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Badge variant="outline" className={categoryColors[category]}>
                        {category}
                      </Badge>
                      <span className="text-muted-foreground">({categoryTags.length} tags)</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categoryTags.map(tag => (
                        <div 
                          key={tag.name}
                          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border hover:border-primary/50 transition-colors"
                        >
                          {editingTag === tag.name ? (
                            <Input
                              autoFocus
                              defaultValue={tag.name}
                              className="h-6 w-24 text-xs"
                              onBlur={(e) => handleEditTag(tag.name, e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleEditTag(tag.name, (e.target as HTMLInputElement).value);
                                }
                                if (e.key === 'Escape') {
                                  setEditingTag(null);
                                }
                              }}
                            />
                          ) : (
                            <>
                              <span className="text-sm">{tag.name}</span>
                              <span className="text-xs text-muted-foreground">({tag.usageCount})</span>
                              <div className="hidden group-hover:flex items-center gap-1 ml-1">
                                <button 
                                  onClick={() => setEditingTag(tag.name)}
                                  className="p-0.5 hover:text-primary"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteTag(tag)}
                                  className="p-0.5 hover:text-destructive"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {filteredTags.map(tag => (
                <div 
                  key={tag.name}
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border hover:border-primary/50 transition-colors"
                >
                  <span className="text-sm">{tag.name}</span>
                  <span className="text-xs text-muted-foreground">({tag.usageCount})</span>
                  <div className="hidden group-hover:flex items-center gap-1 ml-1">
                    <button 
                      onClick={() => setEditingTag(tag.name)}
                      className="p-0.5 hover:text-primary"
                    >
                      <Edit2 className="h-3 w-3" />
                    </button>
                    <button 
                      onClick={() => handleDeleteTag(tag)}
                      className="p-0.5 hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredTags.length === 0 && (
                <p className="text-muted-foreground text-sm">No tags found</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Tag Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Create New Tag</DialogTitle>
            <DialogDescription>
              Add a new tag to the taxonomy
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tagName">Tag Name</Label>
              <Input 
                id="tagName" 
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="e.g., startup, cooling, troubleshooting"
              />
            </div>
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select 
                value={newTagCategory} 
                onValueChange={(v) => setNewTagCategory(v as TagCategory)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Knowledge">Knowledge</SelectItem>
                  <SelectItem value="Issues">Issues</SelectItem>
                  <SelectItem value="Assets">Assets</SelectItem>
                  <SelectItem value="Materials">Materials</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTag} disabled={!newTagName.trim()}>
              Create Tag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
