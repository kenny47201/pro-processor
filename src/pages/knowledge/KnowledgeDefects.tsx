import { useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, ArrowLeft, ChevronRight, Search } from 'lucide-react';
import { defectGuides, getDefectGuide } from '@/data/defectGuides';
import { DefectGuideRenderer } from '@/components/knowledge/DefectGuideRenderer';

const severityColor: Record<string, string> = {
  low: 'bg-success/10 text-success border-success/30',
  medium: 'bg-warning/10 text-warning border-warning/30',
  high: 'bg-destructive/10 text-destructive border-destructive/30',
};

export default function KnowledgeDefects() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const guide = id ? getDefectGuide(id) : null;

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return defectGuides;
    return defectGuides.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.summary.toLowerCase().includes(q) ||
        g.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [query]);

  if (id && guide) {
    return (
      <div className="space-y-6 max-w-5xl">
        <Button variant="ghost" size="sm" onClick={() => navigate('/knowledge/defects')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Defect Guides
        </Button>

        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={severityColor[guide.severity]}>
              {guide.severity.toUpperCase()} severity
            </Badge>
            <Badge variant="secondary">{guide.category}</Badge>
            {guide.tags.map((t) => (
              <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
            ))}
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-warning" />
            {guide.title}
          </h1>
          <p className="text-muted-foreground">{guide.summary}</p>
        </div>

        {/* Table of contents */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="grid gap-1.5 sm:grid-cols-2">
              {guide.sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-primary hover:underline flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                  {s.title}
                </a>
              ))}
            </nav>
          </CardContent>
        </Card>

        {guide.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b">{section.title}</h2>
            <DefectGuideRenderer blocks={section.blocks} />
          </section>
        ))}

        <Separator />

        <section id="references">
          <h2 className="text-2xl font-bold mb-4">References</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-sm">
                {guide.references.map((r) => (
                  <li key={r.id} className="flex gap-3">
                    <span className="font-mono text-primary shrink-0">[{r.id}]</span>
                    <span className="text-foreground/90">{r.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Defect Guides</h1>
        <p className="text-muted-foreground">
          Defect identification, root causes, and corrective actions
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search defects, mechanisms, tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid gap-3">
        {filtered.map((g) => (
          <Link key={g.slug} to={`/knowledge/defects/${g.slug}`}>
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={severityColor[g.severity]}>
                        {g.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">{g.category}</Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
                      {g.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{g.summary}</CardDescription>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1.5">
                  {g.tags.slice(0, 6).map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {filtered.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No defect guides match your search.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
