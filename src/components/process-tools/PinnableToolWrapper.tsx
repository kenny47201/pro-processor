import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PinnableToolWrapperProps {
  id: string;
  label: string;
  pinned: boolean;
  onTogglePin: (id: string) => void;
  children: React.ReactNode;
}

export function PinnableToolWrapper({
  id,
  label,
  pinned,
  onTogglePin,
  children,
}: PinnableToolWrapperProps) {
  return (
    <div
      id={`tool-${id}`}
      className="relative rounded-lg transition-all scroll-mt-24 [&>*]:pt-10"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onTogglePin(id);
        }}
        aria-label={pinned ? `Unpin ${label}` : `Pin ${label}`}
        title={pinned ? `Unpin ${label}` : `Pin ${label}`}
        className={cn(
          'absolute top-2 left-1/2 -translate-x-1/2 z-10 inline-flex items-center justify-center p-1 rounded-md',
          'hover:text-primary transition-colors',
          pinned ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        <Star className={cn('h-4 w-4', pinned && 'fill-primary')} />
      </button>
      {children}
    </div>
  );
}
