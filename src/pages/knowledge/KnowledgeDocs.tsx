import { EmptyState } from '@/components/EmptyState';

export default function KnowledgeDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Knowledge Documents</h1>
        <p className="text-muted-foreground">Process guides, material guides, and machine documentation</p>
      </div>

      <EmptyState
        type="knowledge"
        title="No documents yet"
        description="Knowledge documents will appear here once they are created."
      />
    </div>
  );
}
