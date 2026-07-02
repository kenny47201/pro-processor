import { useUnits, UnitSystem } from '@/contexts/UnitSystemContext';
import { useToast } from '@/hooks/use-toast';
import { Ruler } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UnitSystemToggle() {
  const { system, setSystem } = useUnits();
  const { toast } = useToast();

  const handleChange = (next: UnitSystem) => {
    if (next === system) return;
    setSystem(next);
    toast({
      title: `Units switched to ${next === 'metric' ? 'Metric' : 'Imperial'}`,
      description: 'Calculator inputs have been cleared.',
    });
  };

  const btnBase =
    'px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary';

  return (
    <div className="inline-flex items-center gap-2 rounded-lg border bg-card/50 px-2 py-1">
      <Ruler className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-xs text-muted-foreground uppercase tracking-wide">Units</span>
      <div role="group" aria-label="Unit system" className="inline-flex overflow-hidden rounded-md border">
        <button
          type="button"
          onClick={() => handleChange('imperial')}
          className={cn(btnBase, system === 'imperial' ? 'bg-primary text-primary-foreground' : 'bg-transparent text-muted-foreground hover:text-foreground')}
          aria-pressed={system === 'imperial'}
        >
          Imperial
        </button>
        <button
          type="button"
          onClick={() => handleChange('metric')}
          className={cn(btnBase, system === 'metric' ? 'bg-primary text-primary-foreground' : 'bg-transparent text-muted-foreground hover:text-foreground')}
          aria-pressed={system === 'metric'}
        >
          Metric
        </button>
      </div>
    </div>
  );
}
