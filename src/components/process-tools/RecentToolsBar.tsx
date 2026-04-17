import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, X, Sparkles } from 'lucide-react';
import { RecentToolEntry } from '@/hooks/useRecentTools';

interface RecentToolsBarProps {
  recents: RecentToolEntry[];
  onSelect: (entry: RecentToolEntry) => void;
  onClear: () => void;
}

export function RecentToolsBar({ recents, onSelect, onClear }: RecentToolsBarProps) {
  const isEmpty = recents.length === 0;

  return (
    <Card className="border-primary/20 bg-card/60 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {isEmpty ? (
              <Sparkles className="h-4 w-4 text-primary" />
            ) : (
              <Clock className="h-4 w-4 text-primary" />
            )}
            <h2 className="text-sm font-semibold text-foreground">
              {isEmpty ? 'Quick Access' : 'Recently Used'}
            </h2>
            {!isEmpty && (
              <span className="text-xs text-muted-foreground">
                ({recents.length})
              </span>
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
              Clear
            </Button>
          )}
        </div>

        {isEmpty ? (
          <p className="text-xs text-muted-foreground">
            Calculators you open will appear here for quick access.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {recents.map((entry) => (
              <Button
                key={entry.id}
                variant="outline"
                size="sm"
                onClick={() => onSelect(entry)}
                className="h-8 text-xs border-primary/30 hover:border-primary hover:bg-primary/10"
              >
                {entry.label}
                {entry.count > 1 && (
                  <span className="ml-1.5 text-[10px] text-muted-foreground">
                    ×{entry.count}
                  </span>
                )}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
