import { useMemo, useState } from 'react';
import { Check, ChevronsUpDown, Plug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useMachines, useMolds } from '@/hooks/useMachinesMolds';
import { useTenant } from '@/contexts/TenantContext';

interface PickerProps {
  value: string | null | undefined;
  onChange: (id: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function MachinePicker({ value, onChange, placeholder = 'Select press…', disabled, className }: PickerProps) {
  const { currentUser } = useTenant();
  const { data = [], isLoading } = useMachines(currentUser?.tenantId ?? null);
  const [open, setOpen] = useState(false);
  const selected = useMemo(() => data.find(m => m.id === value), [data, value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          disabled={disabled}
          className={cn('w-full justify-between font-normal', className)}
        >
          <span className="flex items-center gap-2 min-w-0 truncate">
            <Plug className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            {selected ? (
              <span className="truncate">
                {selected.name}
                {selected.tonnage ? <span className="text-muted-foreground"> · {selected.tonnage}t</span> : null}
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
          <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search presses…" />
          <CommandList>
            <CommandEmpty>{isLoading ? 'Loading…' : 'No presses registered.'}</CommandEmpty>
            <CommandGroup>
              {value && (
                <CommandItem
                  value="__clear__"
                  onSelect={() => { onChange(null); setOpen(false); }}
                  className="text-muted-foreground italic"
                >
                  Clear selection
                </CommandItem>
              )}
              {data.map(m => (
                <CommandItem
                  key={m.id}
                  value={`${m.name} ${m.asset_tag ?? ''} ${m.manufacturer ?? ''} ${m.model ?? ''}`}
                  onSelect={() => { onChange(m.id); setOpen(false); }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === m.id ? 'opacity-100' : 'opacity-0')} />
                  <div className="flex flex-col min-w-0">
                    <span className="truncate">{m.name}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {[m.asset_tag, m.manufacturer, m.model, m.tonnage ? `${m.tonnage}t` : null]
                        .filter(Boolean).join(' · ') || '—'}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function MoldPicker({ value, onChange, placeholder = 'Select mold…', disabled, className }: PickerProps) {
  const { currentUser } = useTenant();
  const { data = [], isLoading } = useMolds(currentUser?.tenantId ?? null);
  const [open, setOpen] = useState(false);
  const selected = useMemo(() => data.find(m => m.id === value), [data, value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          disabled={disabled}
          className={cn('w-full justify-between font-normal', className)}
        >
          <span className="flex items-center gap-2 min-w-0 truncate">
            {selected ? (
              <span className="truncate">
                {selected.name}
                {selected.tool_number ? <span className="text-muted-foreground"> · {selected.tool_number}</span> : null}
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
          <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search molds…" />
          <CommandList>
            <CommandEmpty>{isLoading ? 'Loading…' : 'No molds registered.'}</CommandEmpty>
            <CommandGroup>
              {value && (
                <CommandItem
                  value="__clear__"
                  onSelect={() => { onChange(null); setOpen(false); }}
                  className="text-muted-foreground italic"
                >
                  Clear selection
                </CommandItem>
              )}
              {data.map(m => (
                <CommandItem
                  key={m.id}
                  value={`${m.name} ${m.tool_number ?? ''} ${m.part_name ?? ''}`}
                  onSelect={() => { onChange(m.id); setOpen(false); }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === m.id ? 'opacity-100' : 'opacity-0')} />
                  <div className="flex flex-col min-w-0">
                    <span className="truncate">{m.name}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {[m.tool_number, m.part_name, m.cavities ? `${m.cavities} cav` : null]
                        .filter(Boolean).join(' · ') || '—'}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
