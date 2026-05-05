import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ArrowLeft, ChevronRight, FileText } from 'lucide-react';
import { DefectGuideRenderer } from '@/components/knowledge/DefectGuideRenderer';
import { knowledgeGuides } from '@/data/knowledgeGuidesIndex';
import { cn } from '@/lib/utils';
import type { KnowledgeGuide } from '@/data/fountainFlowGuide';

export default function KnowledgeDocs() {
  const [activeGuide, setActiveGuide] = useState<KnowledgeGuide | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const [lightboxSrc, setLightboxSrc] = useState<{ src: string; alt: string } | null>(null);

  const handleGuideSelect = (guide: KnowledgeGuide) => {
    setActiveGuide(guide);
    setActiveSection(guide.sections[0]?.id ?? '');
  };

  // Detail view for a selected guide
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

        {/* Section tabs */}
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

  // Card listing view
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Knowledge Docs</h1>
        <p className="text-muted-foreground">
          Process guides, material guides, and machine documentation
        </p>
      </div>

      <div className="grid gap-3">
        {knowledgeGuides.map((guide) => (
          <Card
            key={guide.slug}
            className="hover:border-primary transition-colors cursor-pointer"
            onClick={() => handleGuideSelect(guide)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 min-w-0">
                  <Badge variant="secondary" className="text-xs">
                    {guide.sections.length} sections
                  </Badge>
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
        ))}
      </div>
    </div>
  );
}
