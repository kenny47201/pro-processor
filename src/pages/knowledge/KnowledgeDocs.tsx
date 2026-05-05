import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DefectGuideRenderer } from '@/components/knowledge/DefectGuideRenderer';
import { fountainFlowGuide } from '@/data/fountainFlowGuide';
import { gateFreezeGuide } from '@/data/gateFreezeGuide';
import { morphologyGuide } from '@/data/morphologyGuide';
import { multiStageGuide } from '@/data/multiStageGuide';
import { nucleationGuide } from '@/data/nucleationGuide';
import { witnessMarksGuide } from '@/data/witnessMarksGuide';
import { volumetricShrinkageGuide } from '@/data/volumetricShrinkageGuide';
import { cn } from '@/lib/utils';
import type { KnowledgeGuide } from '@/data/fountainFlowGuide';

const guides: KnowledgeGuide[] = [fountainFlowGuide, gateFreezeGuide, morphologyGuide, multiStageGuide, nucleationGuide, witnessMarksGuide, volumetricShrinkageGuide];

export default function KnowledgeDocs() {
  const [activeGuide, setActiveGuide] = useState(guides[0]);
  const [activeSection, setActiveSection] = useState(guides[0].sections[0]?.id ?? '');
  const [lightboxSrc, setLightboxSrc] = useState<{ src: string; alt: string } | null>(null);

  const currentSection = activeGuide.sections.find((s) => s.id === activeSection) ?? activeGuide.sections[0];

  const handleGuideChange = (guide: KnowledgeGuide) => {
    setActiveGuide(guide);
    setActiveSection(guide.sections[0]?.id ?? '');
  };

  return (
    <div className="space-y-6">
      {/* Guide selector */}
      {guides.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {guides.map((guide) => (
            <button
              key={guide.slug}
              onClick={() => handleGuideChange(guide)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-semibold transition-colors border-2',
                activeGuide.slug === guide.slug
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted/30 text-muted-foreground border-border hover:bg-muted hover:text-foreground',
              )}
            >
              {guide.title}
            </button>
          ))}
        </div>
      )}

      {/* Header */}
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

      {/* Guide content */}
      {currentSection && <DefectGuideRenderer blocks={currentSection.blocks} />}

      {/* Lightbox for images */}
      <Dialog open={!!lightboxSrc} onOpenChange={() => setLightboxSrc(null)}>
        <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] p-2 overflow-auto">
          {lightboxSrc && (
            <img
              src={lightboxSrc.src}
              alt={lightboxSrc.alt}
              className="w-full h-auto rounded"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
