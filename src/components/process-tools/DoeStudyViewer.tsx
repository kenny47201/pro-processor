import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, Download, FlaskConical, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { doeStudies, type DoeStudy } from '@/data/doeStudies';
import { cn } from '@/lib/utils';
import { ZoomableImage } from '@/components/ui/zoomable-image';

interface Props {
  /** Optional: jump straight to a calculator within ProcessTools. */
  onOpenTool?: (toolId: string) => void;
}

export function DoeStudyViewer({ onOpenTool }: Props) {
  const navigate = useNavigate();
  const [active, setActive] = useState<DoeStudy | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const handleOpenStudy = (study: DoeStudy) => {
    setActive(study);
    setActiveSection(study.sections[0]?.id ?? '');
  };

  const handleOpenCalculator = (toolId: string) => {
    if (onOpenTool) {
      onOpenTool(toolId);
    } else {
      navigate(`/process-tools?tool=${toolId}`);
    }
  };

  // Listing
  if (!active) {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <FlaskConical className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Design of Experiments (DOEs)
            </h2>
            <p className="text-sm text-muted-foreground">
              Structured how-to guides for each optimization study, linked to the matching
              calculator or worksheet.
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {doeStudies.map((study) => (
            <Card
              key={study.id}
              className="hover:border-primary/60 transition-colors cursor-pointer"
              onClick={() => handleOpenStudy(study)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="text-xs">
                        {study.sections.length} sections
                      </Badge>
                      {study.linkedToolLabel && (
                        <Badge variant="outline" className="text-xs gap-1">
                          <Calculator className="h-3 w-3" />
                          {study.linkedToolLabel}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base">{study.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{study.summary}</CardDescription>
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

  // Detail
  const current = active.sections.find((s) => s.id === activeSection) ?? active.sections[0];

  return (
    <div className="space-y-5">
      <Button variant="ghost" size="sm" onClick={() => setActive(null)}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to DOEs
      </Button>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-foreground">{active.title}</h2>
          <p className="text-sm text-muted-foreground max-w-3xl">{active.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {active.linkedToolId && (
            <Button
              size="sm"
              onClick={() => handleOpenCalculator(active.linkedToolId!)}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Open {active.linkedToolLabel ?? 'Calculator'}
            </Button>
          )}
          {active.downloads?.map((d) => (
            <Button key={d.href} variant="outline" size="sm" asChild>
              <a href={d.href} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-2" />
                {d.label}
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2">
        {active.sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={cn(
              'px-3 py-1.5 rounded-md text-sm font-medium transition-colors border',
              activeSection === s.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-muted/40 text-muted-foreground border-border hover:bg-muted hover:text-foreground',
            )}
          >
            {s.title}
          </button>
        ))}
      </div>

      {current && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{current.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {current.image && (
              <button
                type="button"
                onClick={() => setLightbox(current.image!)}
                className="block w-full rounded-md overflow-hidden border border-border bg-card hover:border-primary/60 transition-colors"
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-auto cursor-zoom-in"
                  loading="lazy"
                />
              </button>
            )}
            {current.body?.map((p, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </CardContent>
        </Card>
      )}

      <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-[100vw] w-screen h-[100dvh] sm:h-[95vh] sm:max-w-6xl sm:w-[95vw] p-0 overflow-hidden bg-background/95 border-border">
          {lightbox && (
            <TransformWrapper
              initialScale={1}
              minScale={1}
              maxScale={8}
              centerOnInit
              wheel={{ step: 0.2 }}
              doubleClick={{ mode: 'toggle', step: 2 }}
              pinch={{ step: 5 }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <div className="relative w-full h-full">
                  <TransformComponent
                    wrapperClass="!w-full !h-full"
                    contentClass="!w-full !h-full flex items-center justify-center"
                  >
                    <img
                      src={lightbox}
                      alt=""
                      className="max-w-full max-h-full object-contain select-none"
                      draggable={false}
                    />
                  </TransformComponent>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full border border-border bg-background/90 backdrop-blur px-2 py-1 shadow-lg">
                    <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => zoomOut()}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => resetTransform()}>
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => zoomIn()}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-9 w-9 rounded-full bg-background/80 backdrop-blur border border-border"
                    onClick={() => setLightbox(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </TransformWrapper>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
