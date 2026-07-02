import { ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

interface HelperPopoverProps {
  label?: string;
  title: string;
  description?: string;
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
}

/**
 * Small info/helper trigger rendered next to an input label.
 * Children render the inline mini-calculator; they receive no props but
 * should call an "Apply" button provided by the parent that closes the popover
 * via the caller's own state (parent controls onApply -> setField -> close).
 */
export function HelperPopover({ label = 'Help me calculate', title, description, children, align = 'start' }: HelperPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground">
          <HelpCircle className="h-3 w-3 mr-1" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-96 max-w-[92vw]">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold">{title}</p>
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          {children}
        </div>
      </PopoverContent>
    </Popover>
  );
}
