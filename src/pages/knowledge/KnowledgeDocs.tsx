import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DefectGuideRenderer } from '@/components/knowledge/DefectGuideRenderer';
import { fountainFlowGuide } from '@/data/fountainFlowGuide';
import { cn } from '@/lib/utils';

export default function KnowledgeDocs() {
  const [activeSection, setActiveSection] = useState(fountainFlowGuide.sections[0]?.id ?? '');
  const [lightboxSrc, setLightboxSrc] = useState<{ src: string; alt: string } | null>(null);

  const currentSection = fountainFlowGuide.sections.find((s) => s.id === activeSection) ?? fountainFlowGuide.sections[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">{fountainFlowGuide.title}</h1>
        <p className="text-muted-foreground">{fountainFlowGuide.summary}</p>
      </div>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2">
        {fountainFlowGuide.sections.map((section) => (
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
