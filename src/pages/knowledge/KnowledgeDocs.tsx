import { useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FileText, Printer, ArrowLeft, ChevronRight, Image as ImageIcon, ZoomIn, Wrench } from 'lucide-react';
import { knowledgeDocs } from '@/data/knowledgeDocs';

interface ExtractedImage {
  src: string;
  alt: string;
  caption?: string;
  figureNumber?: string;
}

function extractImages(doc: (typeof knowledgeDocs)[0]): ExtractedImage[] {
  const images: ExtractedImage[] = [];
  for (const section of doc.sections) {
    for (const block of section.blocks) {
      if (block.type === 'image') {
        images.push({
          src: (block as any).src,
          alt: (block as any).alt ?? '',
          caption: (block as any).caption,
          figureNumber: (block as any).figureNumber,
        });
      }
    }
  }
  return images;
}

export default function KnowledgeDocs() {
  const navigate = useNavigate();
  const [openDocSlug, setOpenDocSlug] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<ExtractedImage | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const docsWithImages = useMemo(
    () =>
      knowledgeDocs
        .map((doc) => ({ doc, images: extractImages(doc) }))
        .filter(({ images }) => images.length > 0),
    [],
  );

  const activeDoc = openDocSlug
    ? docsWithImages.find(({ doc }) => doc.slug === openDocSlug)
    : null;

  const handlePrint = () => {
    if (!printRef.current) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const images = activeDoc?.images ?? [];
    const title = activeDoc?.doc.title ?? 'Infographics';

    printWindow.document.write(`<!DOCTYPE html>
<html><head><title>${title}</title>
<style>
  @media print {
    @page { margin: 0.5in; }
    .page-break { page-break-after: always; }
    .page-break:last-child { page-break-after: auto; }
  }
  body { margin: 0; padding: 20px; font-family: system-ui, sans-serif; background: white; }
  .infographic { width: 100%; max-width: 100%; height: auto; display: block; }
  .caption { font-size: 11px; color: #666; margin-top: 8px; text-align: center; }
  .figure { font-weight: 600; }
  h1 { font-size: 18px; margin-bottom: 16px; }
</style></head><body>
<h1>${title}</h1>
${images
  .map(
    (img, i) => `
  <div class="${i < images.length - 1 ? 'page-break' : ''}" style="margin-bottom:24px">
    <img class="infographic" src="${img.src}" alt="${img.alt}" />
    ${img.caption ? `<p class="caption"><span class="figure">${img.figureNumber ? img.figureNumber + ' — ' : ''}</span>${img.caption}</p>` : ''}
  </div>`,
  )
  .join('')}
</body></html>`);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  // Detail view — thumbnails for selected topic
  if (activeDoc) {
    return (
      <div className="space-y-6 max-w-5xl">
        <div className="no-print">
          <Button variant="ghost" size="sm" onClick={() => setOpenDocSlug(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Knowledge Docs
          </Button>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 no-print">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              {activeDoc.doc.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {activeDoc.images.length} infographic{activeDoc.images.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print All
          </Button>
        </div>

        <div ref={printRef} className="print-infographics grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 print:block print:grid-cols-1">
          {activeDoc.images.map((img, i) => (
            <div key={i} className="print-infographic-page">
              <Card
                className="overflow-hidden cursor-pointer hover:border-primary transition-colors group print:border-none print:shadow-none print:overflow-visible"
                onClick={() => setLightboxImg(img)}
              >
                <div className="relative aspect-[4/3] bg-muted/30 flex items-center justify-center overflow-hidden print:aspect-auto print:bg-transparent">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="object-contain w-full h-full p-2 print:p-0 print:max-h-[85vh]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center no-print">
                    <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                {(img.figureNumber || img.caption) && (
                  <CardContent className="p-3">
                    <p className="text-xs text-muted-foreground line-clamp-2 print:line-clamp-none print:text-black print:text-center print:mt-2">
                      {img.figureNumber && <span className="font-semibold text-foreground print:text-black">{img.figureNumber} — </span>}
                      {img.caption}
                    </p>
                  </CardContent>
                )}
              </Card>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <Dialog open={!!lightboxImg} onOpenChange={() => setLightboxImg(null)}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-2 sm:p-4">
            {lightboxImg && (
              <div className="flex flex-col items-center gap-3">
                <img
                  src={lightboxImg.src}
                  alt={lightboxImg.alt}
                  className="max-w-full max-h-[80vh] object-contain"
                />
                {lightboxImg.caption && (
                  <p className="text-sm text-muted-foreground text-center max-w-2xl">
                    {lightboxImg.figureNumber && <span className="font-semibold text-foreground">{lightboxImg.figureNumber} — </span>}
                    {lightboxImg.caption}
                  </p>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // List view — topic folders
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Knowledge Documents</h1>
        <p className="text-muted-foreground">
          Printable infographic references for process fundamentals
        </p>
      </div>

      <div className="grid gap-3">
        {docsWithImages.map(({ doc, images }) => (
          <Card
            key={doc.slug}
            className="hover:border-primary transition-colors cursor-pointer"
            onClick={() => setOpenDocSlug(doc.slug)}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <ImageIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-xs">{doc.category}</Badge>
                </div>
                <h3 className="font-semibold">{doc.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {images.length} infographic{images.length !== 1 ? 's' : ''}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
            </CardContent>
          </Card>
        ))}

        {docsWithImages.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No infographics available yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
