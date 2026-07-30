import { useState } from 'react';
import { ChevronLeft, ChevronRight, Crosshair, Lightbulb, Shapes, Spline } from 'lucide-react';
import type { GuideBlock } from '@/data/defectGuides';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type TourBlock = Extract<GuideBlock, { type: 'symbolTour' }>;
type TourStep = TourBlock['steps'][number];
type LineType = NonNullable<TourStep['lineTypes']>[number];

const accentText = {
  primary: 'text-primary',
  warning: 'text-warning',
  success: 'text-success',
  muted: 'text-muted-foreground',
} as const;

const accentBorder = {
  primary: 'border-primary',
  warning: 'border-warning',
  success: 'border-success',
  muted: 'border-muted-foreground',
} as const;

function LineSwatch({ line }: { line: LineType }) {
  const accent = line.accent ?? 'primary';
  const style = line.style ?? 'solid';
  return (
    <span
      aria-hidden
      className={cn(
        'block w-12 shrink-0 rounded',
        accentBorder[accent],
        style === 'double' ? 'h-[9px] border-t-[3px] border-b-[3px]' : 'h-0 border-t-[3px]',
        style === 'dashed' && 'border-dashed',
        style === 'dotted' && 'border-dotted',
      )}
    />
  );
}

export function SymbolTour({ block }: { block: TourBlock }) {
  const [active, setActive] = useState(0);
  const step = block.steps[active];
  if (!step) return null;

  return (
    <section className="my-5 rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-4">
      <div className="flex items-start gap-2">
        <Crosshair className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1 space-y-0.5">
          <h4 className="font-semibold text-sm">{block.title ?? 'Trace it step by step'}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {block.description ??
              'Tap a step to highlight the symbols and line types to look for on the drawing.'}
          </p>
        </div>
      </div>

      {/* Step cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {block.steps.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={cn(
                'text-left rounded-md border p-2.5 transition-all min-w-0',
                isActive
                  ? 'border-primary bg-primary/10 shadow-sm ring-1 ring-primary/40'
                  : 'border-border bg-background/60 opacity-70 hover:opacity-100 hover:border-primary/40',
              )}
            >
              <span
                className={cn(
                  'inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-mono font-semibold mb-1',
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                )}
              >
                {i + 1}
              </span>
              <span className="block text-xs font-medium leading-snug">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active step detail */}
      <div className="rounded-md border bg-background/70 p-3 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-wide text-muted-foreground">
              Step {active + 1} of {block.steps.length}
            </div>
            <div className="text-sm font-semibold leading-snug">{step.label}</div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              aria-label="Previous step"
              disabled={active === 0}
              onClick={() => setActive((n) => Math.max(0, n - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              aria-label="Next step"
              disabled={active === block.steps.length - 1}
              onClick={() => setActive((n) => Math.min(block.steps.length - 1, n + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-foreground/90">{step.focus}</p>

        {step.symbols && step.symbols.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <Shapes className="h-3.5 w-3.5" />
              Symbols to look for
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {step.symbols.map((sym, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2 rounded-md border border-primary/25 bg-primary/5 px-2.5 py-2"
                >
                  {sym.glyph && (
                    <span className="font-mono text-sm text-primary shrink-0 leading-5">
                      {sym.glyph}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold leading-snug">{sym.name}</span>
                    <span className="block text-xs text-muted-foreground leading-snug">
                      {sym.hint}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step.lineTypes && step.lineTypes.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <Spline className="h-3.5 w-3.5" />
              Line types on this path
            </div>
            <ul className="space-y-1.5">
              {step.lineTypes.map((line, j) => (
                <li key={j} className="flex items-center gap-2.5 rounded-md border bg-muted/20 px-2.5 py-2">
                  <LineSwatch line={line} />
                  <span className="min-w-0">
                    <span
                      className={cn(
                        'text-xs font-semibold',
                        accentText[line.accent ?? 'primary'],
                      )}
                    >
                      {line.name}
                    </span>
                    <span className="block text-xs text-muted-foreground leading-snug">
                      {line.meaning}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step.tip && (
          <div className="flex gap-2 rounded-md border-l-4 border-l-warning bg-warning/5 p-2.5">
            <Lightbulb className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-foreground/90">{step.tip}</p>
          </div>
        )}
      </div>
    </section>
  );
}
