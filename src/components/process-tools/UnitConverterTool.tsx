import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, ArrowRight } from 'lucide-react';
import { useExport } from './ExportButton';

const CATEGORIES: Record<string, Array<{ unit: string; factor: number }>> = {
  Pressure: [
    { unit: 'psi', factor: 1 },
    { unit: 'bar', factor: 0.0689476 },
    { unit: 'MPa', factor: 0.00689476 },
    { unit: 'kg/cm²', factor: 0.070307 },
    { unit: 'kPa', factor: 6.89476 },
  ],
  Temperature: [
    { unit: '°F', factor: 1 },
    { unit: '°C', factor: 1 },
  ],
  Weight: [
    { unit: 'grams', factor: 1 },
    { unit: 'ounces', factor: 0.035274 },
    { unit: 'pounds', factor: 0.00220462 },
    { unit: 'kg', factor: 0.001 },
  ],
  Length: [
    { unit: 'mm', factor: 1 },
    { unit: 'inches', factor: 0.03937 },
    { unit: 'cm', factor: 0.1 },
    { unit: 'feet', factor: 0.003281 },
  ],
  Volume: [
    { unit: 'cm³', factor: 1 },
    { unit: 'in³', factor: 0.061024 },
    { unit: 'liters', factor: 0.001 },
    { unit: 'fl oz', factor: 0.033814 },
  ],
  Force: [
    { unit: 'US tons', factor: 1 },
    { unit: 'metric tons', factor: 0.907185 },
    { unit: 'kN', factor: 8.89644 },
    { unit: 'lbf', factor: 2000 },
  ],
};

export function UnitConverterTool() {
  const { ref: cardRef, ExportBtn } = useExport('Unit Converter');
  const [category, setCategory] = useState<string>('Pressure');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const units = CATEGORIES[category] || [];

  const convert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return '';

    // Temperature special case
    if (category === 'Temperature') {
      if (fromUnit === '°F' && toUnit === '°C') return ((val - 32) * 5 / 9).toFixed(2);
      if (fromUnit === '°C' && toUnit === '°F') return (val * 9 / 5 + 32).toFixed(2);
      if (fromUnit === toUnit) return val.toFixed(2);
      return '';
    }

    const from = units.find(u => u.unit === fromUnit);
    const to = units.find(u => u.unit === toUnit);
    if (!from || !to) return '';

    // Convert to base unit, then to target
    const baseValue = val / from.factor;
    return (baseValue * to.factor).toFixed(6).replace(/\.?0+$/, '');
  };

  const result = convert();

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Unit Converter
          </CardTitle>
          <ExportBtn />
        </div>
        <CardDescription>
          Common conversions for injection molding — pressure, temperature, weight, length, volume, force
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={(v) => { setCategory(v); setFromUnit(''); setToUnit(''); }}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.keys(CATEGORIES).map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
          <div className="space-y-2">
            <Label className="text-xs">From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger><SelectValue placeholder="Unit..." /></SelectTrigger>
              <SelectContent>
                {units.map(u => (
                  <SelectItem key={u.unit} value={u.unit}>{u.unit}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="number" placeholder="Enter value" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          </div>

          <ArrowRight className="h-5 w-5 text-muted-foreground mb-6" />

          <div className="space-y-2">
            <Label className="text-xs">To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger><SelectValue placeholder="Unit..." /></SelectTrigger>
              <SelectContent>
                {units.map(u => (
                  <SelectItem key={u.unit} value={u.unit}>{u.unit}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex h-10 w-full items-center rounded-md border border-input bg-muted/50 px-3 text-sm font-semibold">
              {result || '—'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
