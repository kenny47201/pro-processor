import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ArrowLeft, ChevronRight, FileText, Settings2, Wrench, Hammer, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DefectGuideRenderer } from '@/components/knowledge/DefectGuideRenderer';
import { knowledgeGuides, KNOWLEDGE_DEPARTMENTS, type KnowledgeDepartment } from '@/data/knowledgeGuidesIndex';
import { cn } from '@/lib/utils';
import type { KnowledgeGuide } from '@/data/fountainFlowGuide';

/** Recursively pull every human-readable string out of a guide block. */
function blockText(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => blockText(v, out));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (k === 'src' || k === 'type' || k === 'id') continue;
      blockText(v, out);
    }
  }
  return out;
}

function makeSnippet(text: string, term: string) {
  const i = text.toLowerCase().indexOf(term);
  if (i < 0) return text.slice(0, 160);
  const start = Math.max(0, i - 60);
  return `${start > 0 ? '…' : ''}${text.slice(start, i + term.length + 100)}…`;
}

const DEPT_ICONS: Record<KnowledgeDepartment, React.ReactNode> = {
  'Processing': <Settings2 className="h-4 w-4" />,
  'Maintenance': <Wrench className="h-4 w-4" />,
  'Tool Room': <Hammer className="h-4 w-4" />,
};

export default function KnowledgeDocs() {
  const [activeGuide, setActiveGuide] = useState<KnowledgeGuide | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const [activeDept, setActiveDept] = useState<KnowledgeDepartment>('Processing');
  const [lightboxSrc, setLightboxSrc] = useState<{ src: string; alt: string } | null>(null);
  const [query, setQuery] = useState('');

  // Full-text index over every section of the open guide.
  const searchIndex = useMemo(
    () =>
      (activeGuide?.sections ?? []).map((s) => ({
        id: s.id,
        title: s.title,
        text: blockText(s.blocks).join(' \u2022 '),
      })),
    [activeGuide],
  );

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (term.length < 2) return [];
    return searchIndex
      .map((s) => {
        const hay = `${s.title} ${s.text}`.toLowerCase();
        let hits = 0;
        let from = 0;
        for (;;) {
          const i = hay.indexOf(term, from);
          if (i < 0) break;
          hits += 1;
          from = i + term.length;
        }
        return { ...s, hits, snippet: makeSnippet(s.text, term) };
      })
      .filter((s) => s.hits > 0)
      .sort((a, b) => b.hits - a.hits);
  }, [query, searchIndex]);

  const handleGuideSelect = (guide: KnowledgeGuide) => {
    setActiveGuide(guide);
    setQuery('');
    setActiveSection(guide.sections[0]?.id ?? '');
  };

  if (activeGuide) {
    const currentSection = activeGuide.sections.find((s) => s.id === activeSection) ?? activeGuide.sections[0];

    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setActiveGuide(null)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Knowledge Docs
        </Button>

        <div>
          <h1 className="text-2xl font-bold">{activeGuide.title}</h1>
          <p className="text-muted-foreground">{activeGuide.summary}</p>
        </div>

        {/* Full-text search across this guide */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search this guide — topics, components, defect names, symptoms…"
              className="pl-9 pr-9"
              aria-label="Search this guide"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {query.trim().length >= 2 && (
            <div className="rounded-md border border-border bg-muted/20 p-3 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
                {results.length === 0
                  ? 'No matches in this guide'
                  : `${results.length} section${results.length === 1 ? '' : 's'} match "${query.trim()}"`}
              </div>
              {results.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setActiveSection(r.id);
                    setQuery('');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-left rounded-md border border-border bg-background/70 p-2.5 hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold truncate">{r.title}</span>
                    <Badge variant="secondary" className="ml-auto shrink-0 text-[10px]">
                      {r.hits} hit{r.hits === 1 ? '' : 's'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{r.snippet}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {activeGuide.sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors border',
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted/40 text-muted-foreground border-border hover:bg-muted hover:text-foreground',
              )}
            >
              {section.title}
            </button>
          ))}
        </div>

        {currentSection && <DefectGuideRenderer blocks={currentSection.blocks} />}

        <Dialog open={!!lightboxSrc} onOpenChange={() => setLightboxSrc(null)}>
          <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] p-2 overflow-auto">
            {lightboxSrc && (
              <img src={lightboxSrc.src} alt={lightboxSrc.alt} className="w-full h-auto rounded" />
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  const filtered = knowledgeGuides.filter((g) => g.department === activeDept);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Knowledge Docs</h1>
        <p className="text-muted-foreground">
          Process guides, material guides, and machine documentation by department
        </p>
      </div>

      {/* Department tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-2">
        {KNOWLEDGE_DEPARTMENTS.map((dept) => {
          const count = knowledgeGuides.filter((g) => g.department === dept).length;
          return (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={cn(
                'inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border',
                activeDept === dept
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted/40 text-muted-foreground border-border hover:bg-muted hover:text-foreground',
              )}
            >
              {DEPT_ICONS[dept]}
              {dept}
              <Badge variant="secondary" className="ml-1">{count}</Badge>
            </button>
          );
        })}
      </div>

      <div className="grid gap-3">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground text-sm">
              No {activeDept} guides yet. Check back soon.
            </CardContent>
          </Card>
        ) : (
          filtered.map((guide) => (
            <Card
              key={guide.slug}
              className="hover:border-primary transition-colors cursor-pointer"
              onClick={() => handleGuideSelect(guide)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {guide.sections.length} sections
                      </Badge>
                      <Badge variant="outline" className="text-xs inline-flex items-center gap-1">
                        {DEPT_ICONS[guide.department]}
                        {guide.department}
                      </Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary shrink-0" />
                      {guide.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{guide.summary}</CardDescription>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
