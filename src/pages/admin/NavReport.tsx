import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle2, XCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// ── Source of truth: keep in sync with App.tsx ──
const definedRoutes = [
  '/login', '/',
  '/knowledge', '/knowledge/docs', '/knowledge/docs/:id',
  '/knowledge/defects', '/knowledge/defects/:id',
  '/knowledge/fixes', '/knowledge/fixes/new', '/knowledge/fixes/:id',
  '/knowledge/fixes/:id/verify', '/knowledge/fixes/:id/commit',
  '/process-tools',
  '/shift-tasks', '/shift-tasks/new', '/shift-tasks/:id',
  '/conversations', '/conversations/new', '/conversations/:id',
  '/issues', '/issues/new', '/issues/:id',
  '/users', '/settings', '/tenants',
];

const sidebarLinks = [
  { label: 'Knowledge Hub', path: '/knowledge' },
  { label: 'Documents', path: '/knowledge/docs' },
  { label: 'Defect Guides', path: '/knowledge/defects' },
  { label: 'Fix Records', path: '/knowledge/fixes' },
  { label: 'Process Tools', path: '/process-tools' },
  { label: 'Shift Tasks', path: '/shift-tasks' },
  { label: 'Conversations', path: '/conversations' },
  { label: 'Issues', path: '/issues' },
  { label: 'Users', path: '/users' },
  { label: 'Settings', path: '/settings' },
  { label: 'Tenants', path: '/tenants' },
];

const knowledgeLinks = [
  { label: 'Knowledge Docs', path: '/knowledge/docs' },
  { label: 'Defect Guides', path: '/knowledge/defects' },
  { label: 'Fix Records', path: '/knowledge/fixes' },
];

const removedFeatures = ['defect-ai', 'DefectAI', 'Defect AI'];

function matchesRoute(link: string, routes: string[]): boolean {
  return routes.some((route) => {
    if (route === link) return true;
    const base = route.replace(/:[^/]+/g, '');
    return base === link;
  });
}

interface CheckResult {
  label: string;
  path: string;
  source: 'sidebar' | 'knowledge';
  valid: boolean;
}

export default function NavReport() {
  const results = useMemo<CheckResult[]>(() => {
    const checks: CheckResult[] = [];
    for (const s of sidebarLinks) {
      checks.push({ label: s.label, path: s.path, source: 'sidebar', valid: matchesRoute(s.path, definedRoutes) });
    }
    for (const k of knowledgeLinks) {
      checks.push({ label: k.label, path: k.path, source: 'knowledge', valid: matchesRoute(k.path, definedRoutes) });
    }
    return checks;
  }, []);

  const broken = results.filter((r) => !r.valid);
  const valid = results.filter((r) => r.valid);
  const hasRemnants = removedFeatures.some((term) =>
    [...sidebarLinks, ...knowledgeLinks].some((l) => l.label.toLowerCase().includes(term.toLowerCase()) || l.path.toLowerCase().includes(term.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link to="/settings">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Navigation Health Report
          </h1>
          <p className="text-muted-foreground">Automated check of all sidebar and knowledge page links</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-primary">{results.length}</p>
            <p className="text-sm text-muted-foreground">Total Links Checked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-success">{valid.length}</p>
            <p className="text-sm text-muted-foreground">Valid Routes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className={`text-3xl font-bold ${broken.length > 0 ? 'text-destructive' : 'text-success'}`}>{broken.length}</p>
            <p className="text-sm text-muted-foreground">Broken Links</p>
          </CardContent>
        </Card>
      </div>

      {/* Remnant check */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            {hasRemnants ? <XCircle className="h-5 w-5 text-destructive" /> : <CheckCircle2 className="h-5 w-5 text-success" />}
            Removed Feature Check
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {hasRemnants
              ? 'Warning: References to removed features (Defect AI) were found in navigation links.'
              : 'No references to removed features (Defect AI) found — clean.'}
          </p>
        </CardContent>
      </Card>

      {/* Detailed results */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Link Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {results.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-3 gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {r.valid
                    ? <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    : <XCircle className="h-4 w-4 text-destructive shrink-0" />}
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{r.label}</p>
                    <p className="text-xs text-muted-foreground font-mono truncate">{r.path}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className="text-xs capitalize">{r.source}</Badge>
                  <Link to={r.path}>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground hover:text-primary" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
