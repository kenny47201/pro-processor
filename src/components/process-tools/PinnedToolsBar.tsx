import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, X, Sparkles } from 'lucide-react';

export interface PinnedToolItem {
  id: string;
  label: string;
  tab: string;
}

interface PinnedToolsBarProps {
  items: PinnedToolItem[];
  onSelect: (item: PinnedToolItem) => void;
  onUnpin: (id: string) => void;
  onClear: () => void;
}

export function PinnedToolsBar({ items, onSelect, onUnpin, onClear }: PinnedToolsBarProps) {
  const isEmpty = items.length === 0;

  return (
    <Card className="border-primary/20 bg-card/60 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {isEmpty ? (
              <Sparkles className="h-4 w-4 text-primary" />
            ) : (
              <Star className="h-4 w-4 text-primary fill-primary" />
            )}
            <h2 className="text-sm font-semibold text-foreground">
              {isEmpty ? 'Pin Your Favorites' : 'Pinned Favorites'}
            </h2>
            {!isEmpty && (
              <span className="text-xs text-muted-foreground">({items.length})</span>
            )}
          </div>
          {!isEmpty && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3 mr-1" />
              Clear all
            </Button>
          )}
        </div>

        {isEmpty ? (
          <p className="text-xs text-muted-foreground">
            Tap the <Star className="inline h-3 w-3 mx-0.5 -mt-0.5" /> icon on any calculator to pin it here for one-click access.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="group inline-flex items-center rounded-md border border-primary/30 bg-background/50 hover:border-primary hover:bg-primary/10 transition-colors"
              >
                <button
                  onClick={() => onSelect(item)}
                  className="h-8 px-3 text-xs font-medium text-foreground"
                >
                  {item.label}
                </button>
                <button
                  onClick={() => onUnpin(item.id)}
                  aria-label={`Unpin ${item.label}`}
                  className="h-8 w-7 flex items-center justify-center text-muted-foreground hover:text-destructive border-l border-primary/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
