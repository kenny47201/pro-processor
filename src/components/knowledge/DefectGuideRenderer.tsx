import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  Info,
  CheckCircle2,
  Calculator,
  ArrowRight,
  Eye,
  Ruler,
  Settings2,
  ClipboardCheck,
  RotateCcw,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { GuideBlock } from '@/data/defectGuides';
import { cn } from '@/lib/utils';
import { ZoomableImage } from '@/components/ui/zoomable-image';

const groupKindConfig = {
  inspect: { icon: Eye, label: 'Inspect', accent: 'text-primary' },
  measure: { icon: Ruler, label: 'Measure', accent: 'text-warning' },
  calculator: { icon: Calculator, label: 'Calculate', accent: 'text-primary' },
  setting: { icon: Settings2, label: 'Review settings', accent: 'text-foreground' },
} as const;

function DiagnoseChecklist({
  block,
  storageKey,
}: {
  block: Extract<GuideBlock, { type: 'diagnoseChecklist' }>;
  storageKey: string;
}) {
  const total = useMemo(
    () => block.groups.reduce((n, g) => n + g.items.length, 0),
    [block],
  );
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const persist = (next: Record<string, boolean>) => {
    setChecked(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      /* ignore quota errors */
    }
  };

  const toggle = (key: string) => persist({ ...checked, [key]: !checked[key] });
  const reset = () => persist({});

  const completed = Object.values(checked).filter(Boolean).length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="my-5 rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-4">
      <div className="flex items-start gap-2">
        <ClipboardCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div className="space-y-0.5 min-w-0 flex-1">
          <div className="font-semibold text-sm">
            {block.title ?? 'Diagnose Checklist'}
          </div>
          {block.description && (
            <div className="text-xs text-muted-foreground leading-relaxed">
              {block.description}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-muted-foreground tabular-nums">
            {completed}/{total} · {pct}%
          </span>
          {completed > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-xs"
              onClick={reset}
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </div>

      <div className="h-1 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="space-y-3">
        {block.groups.map((group, gi) => {
          const cfg = groupKindConfig[group.kind];
          const Icon = cfg.icon;
          return (
            <div key={gi} className="rounded-md border bg-background/60 p-3">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={cn('h-4 w-4', cfg.accent)} />
                <span className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
                  {group.label}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {cfg.label}
                </span>
              </div>
              <ul className="space-y-1.5">
                {group.items.map((item, ii) => {
                  const key = `${gi}:${ii}`;
                  const id = `${storageKey}:${key}`;
                  const isChecked = !!checked[key];
                  return (
                    <li key={ii} className="flex items-start gap-2.5 group">
                      <Checkbox
                        id={id}
                        checked={isChecked}
                        onCheckedChange={() => toggle(key)}
                        className="mt-0.5"
                      />
                      <div className="min-w-0 flex-1">
                        <label
                          htmlFor={id}
                          className={cn(
                            'text-sm leading-snug cursor-pointer block',
                            isChecked && 'line-through text-muted-foreground',
                          )}
                        >
                          {item.text}
                        </label>
                        {item.hint && (
                          <div
                            className={cn(
                              'text-xs text-muted-foreground mt-0.5 leading-snug',
                              isChecked && 'line-through opacity-60',
                            )}
                          >
                            {item.hint}
                          </div>
                        )}
                      </div>
                      {item.toolId && (
                        <Link
                          to={`/process-tools?tool=${item.toolId}`}
                          className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline px-2 py-0.5 rounded border border-primary/30 hover:bg-primary/10 transition-colors"
                        >
                          Open
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
          case 'calculatorLinks':
            return (
              <div
                key={i}
                className="my-5 rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-3"
              >
                <div className="flex items-start gap-2">
                  <Calculator className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5 min-w-0">
                    <div className="font-semibold text-sm">
                      {block.title ?? 'Related Process Tools'}
                    </div>
                    {block.description && (
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        {block.description}
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {block.links.map((link, j) => (
                    <Link
                      key={j}
                      to={`/process-tools?tool=${link.toolId}`}
                      className="group flex items-start gap-2 rounded-md border bg-background hover:bg-accent hover:border-primary/50 transition-colors p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {link.label}
                        </div>
                        {link.description && (
                          <div className="text-xs text-muted-foreground mt-0.5 leading-snug">
                            {link.description}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          case 'diagnoseChecklist': {
            const sig = `${block.title ?? 'diagnose'}|${block.groups
              .map((g) => `${g.kind}:${g.items.length}`)
              .join(',')}`;
            const storageKey = `defect-checklist:${sig}`;
            return <DiagnoseChecklist key={i} block={block} storageKey={storageKey} />;
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
