import { ReactNode } from 'react';
import { 
  FileText, 
  MessageSquare, 
  Wrench, 
  CheckSquare, 
  BookOpen,
  Search,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  type: 'issues' | 'conversations' | 'shift-tasks' | 'knowledge' | 'fixes' | 'search' | 'generic';
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const defaults: Record<string, { icon: ReactNode; title: string; description: string }> = {
  issues: {
    icon: <Wrench className="h-12 w-12" />,
    title: "No Issues Found",
    description: "Great news! There are no open issues matching your filters.",
  },
  conversations: {
    icon: <MessageSquare className="h-12 w-12" />,
    title: "No Conversations Yet",
    description: "Start a conversation to collaborate with your team.",
  },
  'shift-tasks': {
    icon: <CheckSquare className="h-12 w-12" />,
    title: "No Shift Tasks",
    description: "No tasks have been assigned for this shift yet.",
  },
  knowledge: {
    icon: <BookOpen className="h-12 w-12" />,
    title: "No Documents Found",
    description: "No knowledge documents match your current filters.",
  },
  fixes: {
    icon: <FileText className="h-12 w-12" />,
    title: "No Fix Records",
    description: "Fix records will appear here once issues are resolved and documented.",
  },
  search: {
    icon: <Search className="h-12 w-12" />,
    title: "No Results",
    description: "Try adjusting your search terms or filters.",
  },
  generic: {
    icon: <FileText className="h-12 w-12" />,
    title: "Nothing Here",
    description: "This section is empty.",
  },
};

export function EmptyState({ type, title, description, action }: EmptyStateProps) {
  const config = defaults[type] || defaults.generic;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="p-4 rounded-full bg-muted/50 text-muted-foreground mb-4">
        {config.icon}
      </div>
      <h3 className="text-lg font-medium mb-2">
        {title || config.title}
      </h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        {description || config.description}
      </p>
      {action && (
        <Button onClick={action.onClick} className="gap-2">
          <Plus className="h-4 w-4" />
          {action.label}
        </Button>
      )}
    </div>
  );
}
