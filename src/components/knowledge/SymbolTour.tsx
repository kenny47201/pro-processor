import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Eye,
  Lightbulb,
  NotebookPen,
  RotateCcw,
  Shapes,
  Spline,
} from 'lucide-react';
import type { GuideBlock } from '@/data/defectGuides';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTenant } from '@/contexts/TenantContext';

type TourBlock = Extract<GuideBlock, { type: 'symbolTour' }>;
type TourStep = TourBlock['steps'][number];
type LineType = NonNullable<TourStep['lineTypes']>[number];

type TourProgress = {
  active: number;
  checked: Record<string, boolean>;
  notes: Record<string, string>;
  a11y: boolean;
};

const emptyProgress: TourProgress = { active: 0, checked: {}, notes: {}, a11y: false };

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

function LineSwatch({ line, a11y }: { line: LineType; a11y: boolean }) {
  const accent = line.accent ?? 'primary';
  const style = line.style ?? 'solid';
  const weight = a11y ? 'border-t-[6px]' : 'border-t-[3px]';
  return (
    <span
      aria-hidden
      className={cn(
        'block shrink-0 rounded',
        a11y ? 'w-16' : 'w-12',
        accentBorder[accent],
        style === 'double'
          ? cn(a11y ? 'h-[14px]' : 'h-[9px]', weight, a11y ? 'border-b-[6px]' : 'border-b-[3px]')
          : cn('h-0', weight),
        style === 'dashed' && 'border-dashed',
        style === 'dotted' && 'border-dotted',
      )}
    />
  );
}

export function SymbolTour({ block }: { block: TourBlock }) {
  const { currentUser } = useTenant();
  const userKey = currentUser?.id ?? 'guest';
  const tourKey = useMemo(() => {
    const sig = `${block.title ?? 'tour'}|${block.steps.map((s) => s.label).join('~')}`;
    return `symbol-tour:${userKey}:${sig}`;
  }, [block, userKey]);

  const [state, setState] = useState<TourProgress>(emptyProgress);
  const [restored, setRestored] = useState(false);

  // Load per-user progress whenever the user or tour changes.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let next = emptyProgress;
    try {
      const raw = window.localStorage.getItem(tourKey);
      if (raw) next = { ...emptyProgress, ...(JSON.parse(raw) as Partial<TourProgress>) };
    } catch {
      /* ignore corrupt storage */
    }
    setState({
      ...next,
      active: Math.min(Math.max(next.active ?? 0, 0), block.steps.length - 1),
    });
    setRestored(
      !!next && (next.active > 0 || Object.keys(next.checked ?? {}).length > 0),
    );
  }, [tourKey, block.steps.length]);

  const update = useCallback(
    (patch: Partial<TourProgress>) => {
      setState((prev) => {
        const next = { ...prev, ...patch };
        try {
          window.localStorage.setItem(tourKey, JSON.stringify(next));
        } catch {
          /* ignore quota errors */
        }
        return next;
      });
    },
    [tourKey],
  );

  const active = state.active;
  const step = block.steps[active];
  if (!step) return null;

  const a11y = state.a11y;
  const setActive = (n: number) => update({ active: n });

  const totalSymbols = block.steps.reduce((n, s) => n + (s.symbols?.length ?? 0), 0);
  const doneSymbols = Object.values(state.checked).filter(Boolean).length;
  const pct = totalSymbols ? Math.round((doneSymbols / totalSymbols) * 100) : 0;

  const stepChecked = (step.symbols ?? []).filter((_, j) => state.checked[`${active}:${j}`]).length;
  const noteValue = state.notes[String(active)] ?? '';

  const reset = () =>
    update({ active: 0, checked: {}, notes: {} });

  return (
    <section
      className={cn(
        'my-5 rounded-lg border bg-primary/5 p-4 space-y-4',
        a11y ? 'border-2 border-primary bg-primary/10' : 'border-primary/30',
        a11y && 'text-[15px]',
      )}
    >
      <div className="flex items-start gap-2">
        <Crosshair className={cn('text-primary shrink-0 mt-0.5', a11y ? 'h-6 w-6' : 'h-5 w-5')} />
        <div className="min-w-0 flex-1 space-y-0.5">
          <h4 className={cn('font-semibold', a11y ? 'text-base' : 'text-sm')}>
            {block.title ?? 'Trace it step by step'}
          </h4>
          <p className={cn('leading-relaxed', a11y ? 'text-sm text-foreground/80' : 'text-xs text-muted-foreground')}>
            {block.description ??
              'Tap a step to highlight the symbols and line types to look for on the drawing.'}
          </p>
        </div>
      </div>

      {/* Progress + controls */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-mono tabular-nums text-muted-foreground">
            {doneSymbols}/{totalSymbols} symbols · {pct}%
          </span>
          {(doneSymbols > 0 || active > 0) && (
            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={reset}>
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-muted-foreground" aria-hidden />
          <Label htmlFor={`${tourKey}-a11y`} className="text-xs cursor-pointer">
            High-contrast mode
          </Label>
          <Switch
            id={`${tourKey}-a11y`}
            checked={a11y}
            onCheckedChange={(v) => update({ a11y: v })}
            aria-label="Toggle high-contrast, larger touch targets"
          />
        </div>
      </div>

      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>

      {restored && active > 0 && (
        <p className="text-[11px] text-muted-foreground">
          Resumed where you left off (step {active + 1}).
        </p>
      )}

      {/* Step cards */}
      <div className={cn('grid gap-2', a11y ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3')}>
        {block.steps.map((s, i) => {
          const isActive = i === active;
          const count = s.symbols?.length ?? 0;
          const done = (s.symbols ?? []).filter((_, j) => state.checked[`${i}:${j}`]).length;
          const complete = count > 0 && done === count;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={cn(
                'text-left rounded-md border transition-all min-w-0',
                a11y ? 'p-4 min-h-[64px] border-2' : 'p-2.5',
                isActive
                  ? 'border-primary bg-primary/10 shadow-sm ring-1 ring-primary/40'
                  : cn(
                      'border-border bg-background/60 hover:border-primary/40',
                      a11y ? 'opacity-100' : 'opacity-70 hover:opacity-100',
                    ),
              )}
            >
              <span className="flex items-center gap-1.5 mb-1">
                <span
                  className={cn(
                    'inline-flex items-center justify-center rounded-full font-mono font-semibold',
                    a11y ? 'h-7 w-7 text-xs' : 'h-5 w-5 text-[10px]',
                    isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                  )}
                >
                  {i + 1}
                </span>
                {complete && <Check className="h-4 w-4 text-success" aria-label="All symbols identified" />}
                {count > 0 && (
                  <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
                    {done}/{count}
                  </span>
                )}
              </span>
              <span className={cn('block font-medium leading-snug', a11y ? 'text-sm' : 'text-xs')}>
                {s.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active step detail */}
      <div className={cn('rounded-md border bg-background/70 p-3 space-y-3', a11y && 'border-2 p-4')}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-wide text-muted-foreground">
              Step {active + 1} of {block.steps.length}
            </div>
            <div className={cn('font-semibold leading-snug', a11y ? 'text-base' : 'text-sm')}>
              {step.label}
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button
              size="icon"
              variant={a11y ? 'outline' : 'ghost'}
              className={a11y ? 'h-11 w-11' : 'h-7 w-7'}
              aria-label="Previous step"
              disabled={active === 0}
              onClick={() => setActive(Math.max(0, active - 1))}
            >
              <ChevronLeft className={a11y ? 'h-5 w-5' : 'h-4 w-4'} />
            </Button>
            <Button
              size="icon"
              variant={a11y ? 'outline' : 'ghost'}
              className={a11y ? 'h-11 w-11' : 'h-7 w-7'}
              aria-label="Next step"
              disabled={active === block.steps.length - 1}
              onClick={() => setActive(Math.min(block.steps.length - 1, active + 1))}
            >
              <ChevronRight className={a11y ? 'h-5 w-5' : 'h-4 w-4'} />
            </Button>
          </div>
        </div>

        <p className={cn('leading-relaxed text-foreground/90', a11y ? 'text-base' : 'text-sm')}>
          {step.focus}
        </p>

        {step.symbols && step.symbols.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                <Shapes className="h-3.5 w-3.5" />
                Symbols to look for — check them off
              </div>
              <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
                {stepChecked}/{step.symbols.length}
              </span>
            </div>
            <ul className={cn('grid gap-1.5', a11y ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2')}>
              {step.symbols.map((sym, j) => {
                const key = `${active}:${j}`;
                const id = `${tourKey}:${key}`;
                const isChecked = !!state.checked[key];
                return (
                  <li
                    key={j}
                    className={cn(
                      'flex items-start gap-2.5 rounded-md border transition-colors',
                      a11y ? 'px-3 py-3 border-2 min-h-[56px]' : 'px-2.5 py-2',
                      isChecked
                        ? 'border-success/50 bg-success/10'
                        : cn('bg-primary/5', a11y ? 'border-primary' : 'border-primary/25'),
                    )}
                  >
                    <Checkbox
                      id={id}
                      checked={isChecked}
                      onCheckedChange={() =>
                        update({ checked: { ...state.checked, [key]: !isChecked } })
                      }
                      className={cn('mt-0.5', a11y && 'h-6 w-6')}
                    />
                    {sym.glyph && (
                      <span
                        className={cn(
                          'font-mono text-primary shrink-0 leading-5',
                          a11y ? 'text-lg' : 'text-sm',
                        )}
                      >
                        {sym.glyph}
                      </span>
                    )}
                    <label htmlFor={id} className="min-w-0 cursor-pointer">
                      <span
                        className={cn(
                          'block font-semibold leading-snug',
                          a11y ? 'text-sm' : 'text-xs',
                          isChecked && 'line-through text-muted-foreground',
                        )}
                      >
                        {sym.name}
                      </span>
                      <span
                        className={cn(
                          'block leading-snug',
                          a11y ? 'text-sm text-foreground/80' : 'text-xs text-muted-foreground',
                        )}
                      >
                        {sym.hint}
                      </span>
                    </label>
                  </li>
                );
              })}
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
                <li
                  key={j}
                  className={cn(
                    'flex items-center gap-2.5 rounded-md border bg-muted/20',
                    a11y ? 'px-3 py-3 border-2' : 'px-2.5 py-2',
                  )}
                >
                  <LineSwatch line={line} a11y={a11y} />
                  <span className="min-w-0">
                    <span
                      className={cn(
                        'font-semibold',
                        a11y ? 'text-sm' : 'text-xs',
                        accentText[line.accent ?? 'primary'],
                      )}
                    >
                      {line.name}
                    </span>
                    <span
                      className={cn(
                        'block leading-snug',
                        a11y ? 'text-sm text-foreground/80' : 'text-xs text-muted-foreground',
                      )}
                    >
                      {line.meaning}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes */}
        <div className="space-y-1.5">
          <Label
            htmlFor={`${tourKey}-note-${active}`}
            className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
          >
            <NotebookPen className="h-3.5 w-3.5" />
            Notes for this step
          </Label>
          <Textarea
            id={`${tourKey}-note-${active}`}
            value={noteValue}
            onChange={(e) => update({ notes: { ...state.notes, [String(active)]: e.target.value } })}
            placeholder="Port numbers, tag IDs, what you found on the drawing..."
            className={cn('resize-y', a11y ? 'text-sm min-h-[88px]' : 'text-xs min-h-[64px]')}
          />
        </div>

        {step.tip && (
          <div
            className={cn(
              'flex gap-2 rounded-md border-l-4 border-l-warning bg-warning/5',
              a11y ? 'p-3.5' : 'p-2.5',
            )}
          >
            <Lightbulb className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <p className={cn('leading-relaxed text-foreground/90', a11y ? 'text-sm' : 'text-xs')}>
              {step.tip}
            </p>
          </div>
        )}
      </div>

      {/* Symbol glossary */}
      <details className="rounded-md border border-border bg-background/70 group">
        <summary
          className={cn(
            'flex cursor-pointer list-none items-center gap-2 font-semibold select-none',
            a11y ? 'px-4 py-3.5 text-sm' : 'px-3 py-2.5 text-xs',
          )}
        >
          <BookOpen className="h-4 w-4 text-primary shrink-0" />
          Symbol glossary — every symbol in this tour, its legend line, and common interpretations
          <ChevronRight className="h-4 w-4 ml-auto shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
        </summary>
        <div className={cn('border-t border-border space-y-3', a11y ? 'p-4' : 'p-3')}>
          {block.steps.map((s, i) =>
            (s.symbols ?? []).length === 0 ? null : (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wide text-muted-foreground">
                    Step {i + 1}
                  </span>
                  <span className={cn('font-medium truncate', a11y ? 'text-sm' : 'text-xs')}>{s.label}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-[10px] ml-auto shrink-0"
                    onClick={() => setActive(i)}
                  >
                    Go to step
                  </Button>
                </div>
                <ul className="space-y-1.5">
                  {(s.symbols ?? []).map((sym, j) => {
                    const line = sym.lineRef
                      ? (s.lineTypes ?? []).find((l) => l.name === sym.lineRef)
                      : undefined;
                    const identified = !!state.checked[`${i}:${j}`];
                    return (
                      <li
                        key={j}
                        className={cn(
                          'rounded-md border bg-muted/20 space-y-1',
                          a11y ? 'px-3 py-3 border-2' : 'px-2.5 py-2',
                        )}
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          {sym.glyph && (
                            <span className={cn('font-mono text-primary', a11y ? 'text-lg' : 'text-sm')}>
                              {sym.glyph}
                            </span>
                          )}
                          <span className={cn('font-semibold', a11y ? 'text-sm' : 'text-xs')}>{sym.name}</span>
                          {identified && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-success">
                              <Check className="h-3 w-3" /> identified
                            </span>
                          )}
                        </div>
                        <p
                          className={cn(
                            'leading-snug',
                            a11y ? 'text-sm text-foreground/80' : 'text-xs text-muted-foreground',
                          )}
                        >
                          {sym.hint}
                        </p>
                        {line && (
                          <div className="flex items-center gap-2">
                            <LineSwatch line={line} a11y={false} />
                            <span
                              className={cn(
                                'text-[11px]',
                                accentText[line.accent ?? 'primary'],
                              )}
                            >
                              {line.name}
                            </span>
                            <span className="text-[11px] text-muted-foreground truncate">
                              — {line.meaning}
                            </span>
                          </div>
                        )}
                        {sym.meanings && sym.meanings.length > 0 && (
                          <ul className="list-disc pl-4 space-y-0.5">
                            {sym.meanings.map((m, k) => (
                              <li
                                key={k}
                                className={cn(
                                  'leading-snug',
                                  a11y ? 'text-sm text-foreground/80' : 'text-xs text-muted-foreground',
                                )}
                              >
                                {m}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ),
          )}
        </div>
      </details>
    </section>
  );
}
