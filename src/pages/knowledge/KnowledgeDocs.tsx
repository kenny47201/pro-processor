import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { FileText, ZoomIn } from 'lucide-react';

import fountainFlowPreparation from '@/assets/fountain-flow-preparation.png';
import fountainFlowRunnerComparison from '@/assets/fountain-flow-runner-comparison.png';
import fountainFlowPressSettings from '@/assets/fountain-flow-press-settings.png';

interface Infographic {
  id: string;
  title: string;
  description: string;
  category: string;
  src: string;
}

const infographics: Infographic[] = [
  {
    id: 'fountain-flow-preparation',
    title: 'Preparing for Good Fountain Flow',
    description: 'Pre-molding checklist, ideal vs. poor fountain flow characteristics, and best-practice takeaways.',
    category: 'Fountain Flow',
    src: fountainFlowPreparation,
  },
  {
    id: 'fountain-flow-runner-comparison',
    title: 'Fountain Flow: Cold Runner vs Hot Runner vs Stack Mold',
    description: 'Side-by-side comparison of fountain flow behavior, sensitivities, and processing focus across runner system types.',
    category: 'Fountain Flow',
  src: fountainFlowRunnerComparison,
  },
  {
    id: 'fountain-flow-press-settings',
    title: 'Press Settings That Affect Fountain Flow',
    description: 'How machine settings change flow-front behavior, skin formation, orientation, and part quality.',
    category: 'Fountain Flow',
    src: fountainFlowPressSettings,
  },
];

export default function KnowledgeDocs() {
  const [selectedImage, setSelectedImage] = useState<Infographic | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Knowledge Documents</h1>
        <p className="text-muted-foreground">Process guides, infographics, and reference material</p>
      </div>

      {/* Category header */}
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Fountain Flow Series</h2>
        <Badge variant="secondary" className="ml-1">{infographics.length}</Badge>
      </div>

      {/* Infographic grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {infographics.map((item) => (
          <Card
            key={item.id}
            className="group cursor-pointer overflow-hidden border-border/60 bg-card hover:border-primary/40 transition-colors"
            onClick={() => setSelectedImage(item)}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={item.src}
                alt={item.title}
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <CardContent className="p-4 space-y-1">
              <h3 className="font-semibold text-sm leading-tight">{item.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lightbox dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] p-2 overflow-auto">
          {selectedImage && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold px-2 pt-2">{selectedImage.title}</h2>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto rounded"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
