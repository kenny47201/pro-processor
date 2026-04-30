import { useMemo, useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bot, Send, Paperclip, X, Sparkles, ImagePlus, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';
import { defectGuides, type DefectGuide, type GuideBlock } from '@/data/defectGuides';

type FigureRef = {
  id: string; // unique key
  src: string; // bundled asset URL
  alt: string;
  figureNumber?: string;
  caption?: string;
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function flattenGuideText(guide: DefectGuide): string {
  const out: string[] = [];
  for (const sec of guide.sections) {
    out.push(`## ${sec.title}`);
    for (const b of sec.blocks) {
      switch (b.type) {
        case 'heading':
          out.push(`${'#'.repeat(b.level)} ${b.text}`);
          break;
        case 'paragraph':
          out.push(b.text);
          break;
        case 'list':
        case 'orderedList':
          out.push(b.items.map((i) => `- ${i}`).join('\n'));
          break;
        case 'callout':
          out.push(`> ${b.title ? `**${b.title}** — ` : ''}${b.text}`);
          break;
        case 'table':
          out.push(`Table${b.caption ? ` (${b.caption})` : ''}: ${b.columns.join(' | ')}`);
          for (const row of b.rows) out.push(row.join(' | '));
          break;
        case 'image':
          out.push(
            `[${b.figureNumber ?? 'Figure'}] ${b.caption ?? b.alt}` +
              (b.lookFor ? ` — Look for: ${b.lookFor.items.join('; ')}` : ''),
          );
          break;
      }
    }
  }
  return out.join('\n\n');
}

function extractFigures(guide: DefectGuide): FigureRef[] {
  const figs: FigureRef[] = [];
  guide.sections.forEach((sec) => {
    sec.blocks.forEach((b: GuideBlock, idx) => {
      if (b.type === 'image') {
        figs.push({
          id: `${sec.id}-${idx}`,
          src: b.src,
          alt: b.alt,
          figureNumber: b.figureNumber,
          caption: b.caption,
        });
      }
    });
  });
  return figs;
}

async function imgUrlToDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function DefectAIChat() {
  const [params] = useSearchParams();
  const initialSlug = params.get('defect') ?? defectGuides[0]?.slug ?? '';
  const [slug, setSlug] = useState(initialSlug);
  const guide = useMemo(
    () => defectGuides.find((g) => g.slug === slug) ?? defectGuides[0],
    [slug],
  );
  const figures = useMemo(() => extractFigures(guide), [guide]);
  const sectionsText = useMemo(() => flattenGuideText(guide), [guide]);

  const [attached, setAttached] = useState<FigureRef[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Reset attached/messages when defect changes
  useEffect(() => {
    setAttached([]);
    setMessages([]);
  }, [slug]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, streaming]);

  const toggleAttach = (fig: FigureRef) => {
    setAttached((prev) =>
      prev.some((f) => f.id === fig.id)
        ? prev.filter((f) => f.id !== fig.id)
        : [...prev, fig],
    );
  };

  const send = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput('');

    const userMsg: ChatMessage = { role: 'user', content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setStreaming(true);

    let assistantSoFar = '';
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m,
          );
        }
        return [...prev, { role: 'assistant', content: assistantSoFar }];
      });
    };

    try {
      // Convert attached figures to data URLs for multimodal context.
      const figurePayload = await Promise.all(
        attached.map(async (f) => ({
          figureNumber: f.figureNumber,
          caption: f.caption,
          alt: f.alt,
          dataUrl: await imgUrlToDataUrl(f.src),
        })),
      );

      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/defect-ai-chat`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: next,
          defectContext: {
            title: guide.title,
            summary: guide.summary,
            category: guide.category,
            severity: guide.severity,
            sectionsText,
          },
          figures: figurePayload,
        }),
      });

      if (resp.status === 429) {
        toast.error('Rate limit reached. Try again in a moment.');
        setStreaming(false);
        return;
      }
      if (resp.status === 402) {
        toast.error('AI credits exhausted. Add credits to continue.');
        setStreaming(false);
        return;
      }
      if (!resp.ok || !resp.body) {
        toast.error('Failed to reach the AI assistant.');
        setStreaming(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf('\n')) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;
          const json = line.slice(6).trim();
          if (json === '[DONE]') {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (delta) upsertAssistant(delta);
          } catch {
            buf = line + '\n' + buf;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error('Something went wrong while streaming the response.');
    } finally {
      setStreaming(false);
    }
  };

  const suggestions = [
    'What are the most likely root causes for this defect on a thin-wall part?',
    'Walk me through diagnosing this using the attached figure.',
    'Give me a corrective-action checklist I can run on the floor right now.',
    'How do I tell this defect apart from a similar-looking one?',
  ];

  return (
    <div className="container mx-auto p-4 lg:p-6 max-w-7xl">
      <header className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-3">
          <div className="h-11 w-11 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Defect AI Assistant</h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Ask injection-molding troubleshooting questions grounded in the active defect
              dossier. Click a figure to attach it as visual context.
            </p>
          </div>
        </div>
        <Badge variant="outline" className="gap-1.5">
          <Sparkles className="h-3 w-3" />
          Gemini 3 Flash · Multimodal
        </Badge>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
        {/* Context panel */}
        <aside className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                Active defect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select value={slug} onValueChange={setSlug}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {defectGuides.map((g) => (
                    <SelectItem key={g.slug} value={g.slug}>
                      {g.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>
                  <span className="font-medium text-foreground/80">Category:</span>{' '}
                  {guide.category}
                </div>
                <div>
                  <span className="font-medium text-foreground/80">Severity:</span>{' '}
                  <span
                    className={
                      guide.severity === 'high'
                        ? 'text-destructive'
                        : guide.severity === 'medium'
                          ? 'text-warning'
                          : 'text-success'
                    }
                  >
                    {guide.severity}
                  </span>
                </div>
                <p className="pt-1 leading-relaxed">{guide.summary}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                <ImagePlus className="h-4 w-4" /> Figures ({figures.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {figures.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  This dossier has no figures yet.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {figures.map((f) => {
                    const isOn = attached.some((a) => a.id === f.id);
                    return (
                      <button
                        key={f.id}
                        onClick={() => toggleAttach(f)}
                        className={
                          'group relative rounded-md border overflow-hidden text-left transition-all ' +
                          (isOn
                            ? 'border-primary ring-2 ring-primary/40'
                            : 'border-border hover:border-primary/50')
                        }
                        title={f.caption ?? f.alt}
                      >
                        <img
                          src={f.src}
                          alt={f.alt}
                          loading="lazy"
                          className="w-full h-20 object-cover bg-muted/30"
                        />
                        <div className="px-1.5 py-1 text-[10px] font-mono uppercase tracking-wide bg-background/90 truncate">
                          {f.figureNumber ?? 'Figure'}
                        </div>
                        {isOn && (
                          <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </aside>

        {/* Chat panel */}
        <Card className="flex flex-col h-[calc(100vh-13rem)] min-h-[520px]">
          <CardHeader className="border-b py-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>Conversation</span>
              {attached.length > 0 && (
                <span className="text-xs text-muted-foreground font-normal">
                  {attached.length} figure{attached.length === 1 ? '' : 's'} attached
                </span>
              )}
            </CardTitle>
          </CardHeader>

          <ScrollArea className="flex-1">
            <div ref={scrollerRef} className="p-4 space-y-4">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Start a conversation about <strong>{guide.title}</strong>. The full
                    dossier is loaded as context.
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setInput(s)}
                        className="text-left text-xs p-3 rounded-md border border-border bg-muted/20 hover:bg-muted/40 hover:border-primary/40 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === 'user'
                      ? 'flex justify-end'
                      : 'flex justify-start'
                  }
                >
                  <div
                    className={
                      'max-w-[88%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ' +
                      (m.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-foreground')
                    }
                  >
                    {m.role === 'assistant' ? (
                      <div className="prose prose-sm prose-invert max-w-none prose-headings:mt-3 prose-headings:mb-1.5 prose-p:my-2 prose-li:my-0.5 prose-pre:bg-background/60 prose-code:text-primary">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {m.content || '…'}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">{m.content}</div>
                    )}
                  </div>
                </div>
              ))}

              {streaming &&
                messages[messages.length - 1]?.role !== 'assistant' && (
                  <div className="flex justify-start">
                    <div className="bg-muted/50 rounded-lg px-3.5 py-2.5 text-sm flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
                    </div>
                  </div>
                )}
            </div>
          </ScrollArea>

          {/* Attached figure chips */}
          {attached.length > 0 && (
            <div className="border-t px-3 py-2 flex gap-2 flex-wrap bg-muted/20">
              {attached.map((f) => (
                <Badge
                  key={f.id}
                  variant="secondary"
                  className="gap-1.5 pl-1.5 pr-1 py-1"
                >
                  <Paperclip className="h-3 w-3" />
                  <span className="font-mono text-[10px]">
                    {f.figureNumber ?? 'Figure'}
                  </span>
                  <button
                    onClick={() => toggleAttach(f)}
                    className="hover:bg-background/60 rounded p-0.5"
                    aria-label="Detach figure"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          <div className="border-t p-3 flex gap-2 items-end">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={`Ask about ${guide.title}…`}
              rows={2}
              className="resize-none min-h-[60px]"
              disabled={streaming}
            />
            <Button
              onClick={send}
              disabled={!input.trim() || streaming}
              className="h-[60px] w-[60px] flex-shrink-0"
            >
              {streaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
