import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Info, CheckCircle2, Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { GuideBlock } from '@/data/defectGuides';
import { cn } from '@/lib/utils';

const calloutConfig = {
  info: { icon: Info, classes: 'border-l-primary bg-primary/5 text-foreground' },
  warning: { icon: AlertTriangle, classes: 'border-l-warning bg-warning/5 text-foreground' },
  success: { icon: CheckCircle2, classes: 'border-l-success bg-success/5 text-foreground' },
} as const;

export function DefectGuideRenderer({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return block.level === 2 ? (
              <h2 key={i} className="text-xl font-semibold mt-6">{block.text}</h2>
            ) : (
              <h3 key={i} className="text-lg font-semibold mt-4 text-primary">{block.text}</h3>
            );
          case 'paragraph':
            return (
              <p key={i} className="text-sm leading-relaxed text-foreground/90">
                {block.text}
              </p>
            );
          case 'list':
            return (
              <ul key={i} className="list-disc pl-5 space-y-1.5 text-sm text-foreground/90">
                {block.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            );
          case 'orderedList':
            return (
              <ol key={i} className="list-decimal pl-5 space-y-1.5 text-sm text-foreground/90">
                {block.items.map((it, j) => <li key={j}>{it}</li>)}
              </ol>
            );
          case 'callout': {
            const cfg = calloutConfig[block.tone];
            const Icon = cfg.icon;
            return (
              <div key={i} className={cn('border-l-4 rounded-md p-4 flex gap-3', cfg.classes)}>
                <Icon className="h-5 w-5 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  {block.title && <div className="font-semibold text-sm">{block.title}</div>}
                  <div className="text-sm leading-relaxed">{block.text}</div>
                </div>
              </div>
            );
          }
          case 'table':
            return (
              <Card key={i} className="overflow-hidden">
                {block.caption && (
                  <div className="px-4 py-2 bg-muted/40 border-b text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {block.caption}
                  </div>
                )}
                <CardContent className="p-0 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/30">
                      <tr>
                        {block.columns.map((c, j) => (
                          <th key={j} className="text-left px-3 py-2 font-semibold border-b">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, r) => (
                        <tr key={r} className="border-b last:border-0 hover:bg-muted/20">
                          {row.map((cell, c) => (
                            <td key={c} className="px-3 py-2 align-top text-foreground/90">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            );
          case 'image': {
            const lookForCfg = block.lookFor ? calloutConfig[block.lookFor.tone ?? 'info'] : null;
            const LookForIcon = lookForCfg?.icon;
            return (
              <figure key={i} className="my-5 space-y-3">
                <div className="rounded-md border bg-muted/20 overflow-hidden">
                  <img
                    src={block.src}
                    alt={block.alt}
                    loading="lazy"
                    className="w-full h-auto block"
                  />
                </div>
                {(block.figureNumber || block.caption) && (
                  <figcaption className="text-xs text-muted-foreground text-center space-y-1">
                    {block.figureNumber && (
                      <div className="inline-block px-2 py-0.5 rounded bg-muted/60 text-foreground/80 font-mono uppercase tracking-wide text-[10px]">
                        {block.figureNumber}
                      </div>
                    )}
                    {block.caption && <div className="italic leading-relaxed">{block.caption}</div>}
                  </figcaption>
                )}
                {block.lookFor && lookForCfg && LookForIcon && (
                  <div className={cn('border-l-4 rounded-md p-3 flex gap-3', lookForCfg.classes)}>
                    <LookForIcon className="h-4 w-4 shrink-0 mt-0.5" />
                    <div className="space-y-1.5 min-w-0">
                      <div className="font-semibold text-xs uppercase tracking-wide">
                        {block.lookFor.title ?? 'What to look for'}
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-sm leading-relaxed">
                        {block.lookFor.items.map((it, j) => <li key={j}>{it}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
              </figure>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
