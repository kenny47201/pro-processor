import { Link } from 'react-router-dom';
import { BookOpen, FileText, AlertTriangle, Wrench, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Knowledge() {
  const sections = [
    {
      title: 'Knowledge Docs',
      description: 'Process guides, material guides, and machine documentation',
      icon: <FileText className="h-6 w-6" />,
      link: '/knowledge/docs',
      count: 0,
      color: 'text-blue-500',
    },
    {
      title: 'Defect Guides',
      description: 'Defect identification, root causes, and corrective actions',
      icon: <AlertTriangle className="h-6 w-6" />,
      link: '/knowledge/defects',
      count: 0,
      color: 'text-orange-500',
    },
    {
      title: 'Fix Records',
      description: 'Documented solutions and verified fixes',
      icon: <Wrench className="h-6 w-6" />,
      link: '/knowledge/fixes',
      count: 0,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Knowledge Hub
        </h1>
        <p className="text-muted-foreground">Access process documentation, defect guides, and fix records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link key={section.title} to={section.link}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-muted/50 ${section.color}`}>
                    {section.icon}
                  </div>
                  <Badge variant="secondary">{section.count}</Badge>
                </div>
                <CardTitle className="text-base">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-sm text-primary">
                  Browse <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
