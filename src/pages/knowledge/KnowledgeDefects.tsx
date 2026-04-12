import { EmptyState } from '@/components/EmptyState';

export default function KnowledgeDefects() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Defect Guides</h1>
        <p className="text-muted-foreground">Defect identification, root causes, and corrective actions</p>
      </div>

      <EmptyState
        type="knowledge"
        title="No defect guides yet"
        description="Defect guides will appear here once they are created."
      />
    </div>
  );
}
