import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ArrowLeft, ChevronRight, FileText, Settings2, Wrench, Hammer } from 'lucide-react';
import { DefectGuideRenderer } from '@/components/knowledge/DefectGuideRenderer';
import { knowledgeGuides, KNOWLEDGE_DEPARTMENTS, type KnowledgeDepartment } from '@/data/knowledgeGuidesIndex';
import { cn } from '@/lib/utils';
import type { KnowledgeGuide } from '@/data/fountainFlowGuide';

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

  const handleGuideSelect = (guide: KnowledgeGuide) => {
    setActiveGuide(guide);
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
