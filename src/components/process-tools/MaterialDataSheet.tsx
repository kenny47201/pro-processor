import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useExport } from './ExportButton';
import { Search, BookOpen, Thermometer, Droplets, Gauge, Wind } from 'lucide-react';

interface ResinData {
  name: string;
  abbreviation: string;
  family: string;
  type: 'amorphous' | 'semi-crystalline';
  meltTempMin: number;
  meltTempMax: number;
  moldTempMin: number;
  moldTempMax: number;
  dryTempC: number;
  dryTimeHrs: number;
  maxMoisturePct: number;
  densitySolid: number;
  densityMelt: number;
  shrinkageMin: number;
  shrinkageMax: number;
  injectionPressureMin: number;
  injectionPressureMax: number;
  backPressureMin: number;
  backPressureMax: number;
  screwSpeedRPM: string;
  ventDepthMm: string;
  notes: string;
}

const RESINS: ResinData[] = [
  {
    name: 'Polypropylene', abbreviation: 'PP', family: 'Polyolefin', type: 'semi-crystalline',
    meltTempMin: 200, meltTempMax: 280, moldTempMin: 20, moldTempMax: 80,
    dryTempC: 80, dryTimeHrs: 2, maxMoisturePct: 0.1,
    densitySolid: 0.905, densityMelt: 0.74, shrinkageMin: 1.0, shrinkageMax: 2.5,
    injectionPressureMin: 11600, injectionPressureMax: 20300, backPressureMin: 725, backPressureMax: 4350,
    screwSpeedRPM: '50–100', ventDepthMm: '0.025–0.050',
    notes: 'Good chemical resistance. Low moisture uptake — drying optional unless foaming is observed.'
  },
  {
    name: 'Polyethylene (HDPE)', abbreviation: 'HDPE', family: 'Polyolefin', type: 'semi-crystalline',
    meltTempMin: 190, meltTempMax: 280, moldTempMin: 10, moldTempMax: 70,
    dryTempC: 80, dryTimeHrs: 1, maxMoisturePct: 0.1,
    densitySolid: 0.954, densityMelt: 0.78, shrinkageMin: 1.5, shrinkageMax: 4.0,
    injectionPressureMin: 8700, injectionPressureMax: 17400, backPressureMin: 725, backPressureMax: 2900,
    screwSpeedRPM: '50–100', ventDepthMm: '0.025–0.050',
    notes: 'High shrinkage — especially in thick sections. Typically does not require drying.'
  },
  {
    name: 'Polyethylene (LDPE)', abbreviation: 'LDPE', family: 'Polyolefin', type: 'semi-crystalline',
    meltTempMin: 160, meltTempMax: 240, moldTempMin: 20, moldTempMax: 60,
    dryTempC: 70, dryTimeHrs: 1, maxMoisturePct: 0.1,
    densitySolid: 0.920, densityMelt: 0.76, shrinkageMin: 1.5, shrinkageMax: 3.5,
    injectionPressureMin: 7250, injectionPressureMax: 14500, backPressureMin: 725, backPressureMax: 2900,
    screwSpeedRPM: '40–80', ventDepthMm: '0.025–0.050',
    notes: 'Flexible, low-stiffness. No drying usually needed.'
  },
  {
    name: 'Acrylonitrile Butadiene Styrene', abbreviation: 'ABS', family: 'Styrenic', type: 'amorphous',
    meltTempMin: 220, meltTempMax: 270, moldTempMin: 40, moldTempMax: 80,
    dryTempC: 80, dryTimeHrs: 3, maxMoisturePct: 0.05,
    densitySolid: 1.05, densityMelt: 0.94, shrinkageMin: 0.4, shrinkageMax: 0.8,
    injectionPressureMin: 11600, injectionPressureMax: 21750, backPressureMin: 725, backPressureMax: 4350,
    screwSpeedRPM: '40–80', ventDepthMm: '0.025–0.050',
    notes: 'Good impact strength. Hygroscopic — must be dried. Susceptible to splay if moisture present.'
  },
  {
    name: 'Polystyrene (GPPS)', abbreviation: 'PS', family: 'Styrenic', type: 'amorphous',
    meltTempMin: 180, meltTempMax: 260, moldTempMin: 20, moldTempMax: 50,
    dryTempC: 70, dryTimeHrs: 2, maxMoisturePct: 0.1,
    densitySolid: 1.05, densityMelt: 0.95, shrinkageMin: 0.3, shrinkageMax: 0.6,
    injectionPressureMin: 8700, injectionPressureMax: 17400, backPressureMin: 725, backPressureMax: 2900,
    screwSpeedRPM: '50–100', ventDepthMm: '0.025–0.050',
    notes: 'Brittle, excellent clarity. Easy to process. Low shrinkage.'
  },
  {
    name: 'High Impact Polystyrene', abbreviation: 'HIPS', family: 'Styrenic', type: 'amorphous',
    meltTempMin: 190, meltTempMax: 260, moldTempMin: 20, moldTempMax: 60,
    dryTempC: 70, dryTimeHrs: 2, maxMoisturePct: 0.1,
    densitySolid: 1.04, densityMelt: 0.94, shrinkageMin: 0.3, shrinkageMax: 0.7,
    injectionPressureMin: 8700, injectionPressureMax: 18850, backPressureMin: 725, backPressureMax: 3625,
    screwSpeedRPM: '50–90', ventDepthMm: '0.025–0.050',
    notes: 'Improved toughness vs GPPS. Opaque. Good dimensional stability.'
  },
  {
    name: 'Polycarbonate', abbreviation: 'PC', family: 'Engineering', type: 'amorphous',
    meltTempMin: 280, meltTempMax: 320, moldTempMin: 80, moldTempMax: 120,
    dryTempC: 120, dryTimeHrs: 4, maxMoisturePct: 0.02,
    densitySolid: 1.20, densityMelt: 1.06, shrinkageMin: 0.5, shrinkageMax: 0.8,
    injectionPressureMin: 14500, injectionPressureMax: 26100, backPressureMin: 1088, backPressureMax: 4350,
    screwSpeedRPM: '30–60', ventDepthMm: '0.025–0.050',
    notes: 'High clarity, high heat. Very hygroscopic — proper drying critical. Sensitive to residence time.'
  },
  {
    name: 'Polycarbonate / ABS Blend', abbreviation: 'PC/ABS', family: 'Engineering', type: 'amorphous',
    meltTempMin: 240, meltTempMax: 290, moldTempMin: 70, moldTempMax: 100,
    dryTempC: 100, dryTimeHrs: 4, maxMoisturePct: 0.03,
    densitySolid: 1.12, densityMelt: 1.00, shrinkageMin: 0.5, shrinkageMax: 0.7,
    injectionPressureMin: 11600, injectionPressureMax: 23200, backPressureMin: 725, backPressureMax: 4350,
    screwSpeedRPM: '40–70', ventDepthMm: '0.025–0.050',
    notes: 'Combines PC toughness with ABS processability. Common in automotive interiors.'
  },
  {
    name: 'Polyamide 6 (Nylon 6)', abbreviation: 'PA6', family: 'Engineering', type: 'semi-crystalline',
    meltTempMin: 230, meltTempMax: 280, moldTempMin: 60, moldTempMax: 100,
    dryTempC: 80, dryTimeHrs: 6, maxMoisturePct: 0.15,
    densitySolid: 1.14, densityMelt: 0.98, shrinkageMin: 0.8, shrinkageMax: 2.0,
    injectionPressureMin: 11600, injectionPressureMax: 23200, backPressureMin: 725, backPressureMax: 4350,
    screwSpeedRPM: '40–80', ventDepthMm: '0.013–0.025',
    notes: 'Very hygroscopic — requires thorough drying. High shrinkage. Excellent wear resistance.'
  },
  {
    name: 'Polyamide 66 (Nylon 66)', abbreviation: 'PA66', family: 'Engineering', type: 'semi-crystalline',
    meltTempMin: 270, meltTempMax: 300, moldTempMin: 60, moldTempMax: 100,
    dryTempC: 80, dryTimeHrs: 6, maxMoisturePct: 0.10,
    densitySolid: 1.14, densityMelt: 0.98, shrinkageMin: 1.0, shrinkageMax: 2.5,
    injectionPressureMin: 13050, injectionPressureMax: 24650, backPressureMin: 725, backPressureMax: 4350,
    screwSpeedRPM: '40–80', ventDepthMm: '0.013–0.025',
    notes: 'Higher melt point than PA6. Narrow processing window. Excellent mechanical properties.'
  },
  {
    name: 'Polyoxymethylene (Acetal)', abbreviation: 'POM', family: 'Engineering', type: 'semi-crystalline',
    meltTempMin: 190, meltTempMax: 210, moldTempMin: 60, moldTempMax: 120,
    dryTempC: 80, dryTimeHrs: 3, maxMoisturePct: 0.10,
    densitySolid: 1.41, densityMelt: 1.18, shrinkageMin: 1.5, shrinkageMax: 3.0,
    injectionPressureMin: 11600, injectionPressureMax: 21750, backPressureMin: 725, backPressureMax: 2900,
    screwSpeedRPM: '40–70', ventDepthMm: '0.013–0.025',
    notes: 'Excellent dimensional stability, low friction. Narrow processing window. Generates formaldehyde gas — ensure venting.'
  },
  {
    name: 'Polyethylene Terephthalate', abbreviation: 'PET', family: 'Polyester', type: 'semi-crystalline',
    meltTempMin: 260, meltTempMax: 290, moldTempMin: 20, moldTempMax: 140,
    dryTempC: 150, dryTimeHrs: 4, maxMoisturePct: 0.02,
    densitySolid: 1.37, densityMelt: 1.18, shrinkageMin: 1.5, shrinkageMax: 3.0,
    injectionPressureMin: 11600, injectionPressureMax: 21750, backPressureMin: 725, backPressureMax: 3625,
    screwSpeedRPM: '40–70', ventDepthMm: '0.013–0.025',
    notes: 'Very hygroscopic. Cold mold → amorphous/clear. Hot mold → crystalline/opaque. IV loss if overdried.'
  },
  {
    name: 'Polybutylene Terephthalate', abbreviation: 'PBT', family: 'Polyester', type: 'semi-crystalline',
    meltTempMin: 230, meltTempMax: 270, moldTempMin: 40, moldTempMax: 90,
    dryTempC: 120, dryTimeHrs: 4, maxMoisturePct: 0.03,
    densitySolid: 1.31, densityMelt: 1.12, shrinkageMin: 1.5, shrinkageMax: 2.5,
    injectionPressureMin: 11600, injectionPressureMax: 20300, backPressureMin: 725, backPressureMax: 3625,
    screwSpeedRPM: '40–70', ventDepthMm: '0.013–0.025',
    notes: 'Faster crystallization than PET. Good electrical properties. Common in connectors.'
  },
  {
    name: 'Polymethyl Methacrylate', abbreviation: 'PMMA', family: 'Acrylic', type: 'amorphous',
    meltTempMin: 220, meltTempMax: 270, moldTempMin: 40, moldTempMax: 90,
    dryTempC: 80, dryTimeHrs: 4, maxMoisturePct: 0.05,
    densitySolid: 1.19, densityMelt: 1.06, shrinkageMin: 0.3, shrinkageMax: 0.8,
    injectionPressureMin: 11600, injectionPressureMax: 21750, backPressureMin: 725, backPressureMax: 4350,
    screwSpeedRPM: '30–60', ventDepthMm: '0.025–0.050',
    notes: 'Excellent optical clarity (92% light transmission). Brittle. Sensitive to shear — use large gates.'
  },
  {
    name: 'Thermoplastic Polyurethane', abbreviation: 'TPU', family: 'Elastomer', type: 'semi-crystalline',
    meltTempMin: 190, meltTempMax: 230, moldTempMin: 20, moldTempMax: 60,
    dryTempC: 100, dryTimeHrs: 3, maxMoisturePct: 0.03,
    densitySolid: 1.20, densityMelt: 1.05, shrinkageMin: 0.5, shrinkageMax: 2.0,
    injectionPressureMin: 7250, injectionPressureMax: 17400, backPressureMin: 363, backPressureMax: 2175,
    screwSpeedRPM: '20–50', ventDepthMm: '0.025–0.050',
    notes: 'Flexible elastomer. Low shear/speed recommended. Can stick in mold — use mold release if needed.'
  },
  {
    name: 'Thermoplastic Elastomer', abbreviation: 'TPE', family: 'Elastomer', type: 'amorphous',
    meltTempMin: 180, meltTempMax: 240, moldTempMin: 20, moldTempMax: 60,
    dryTempC: 70, dryTimeHrs: 2, maxMoisturePct: 0.05,
    densitySolid: 1.05, densityMelt: 0.92, shrinkageMin: 0.5, shrinkageMax: 2.0,
    injectionPressureMin: 5800, injectionPressureMax: 14500, backPressureMin: 363, backPressureMax: 2175,
    screwSpeedRPM: '20–50', ventDepthMm: '0.025–0.050',
    notes: 'Soft-touch over-molding applications. Low injection speeds preferred. Shore A 20–90 range.'
  },
  {
    name: 'Polyphenylene Sulfide', abbreviation: 'PPS', family: 'High-Performance', type: 'semi-crystalline',
    meltTempMin: 300, meltTempMax: 340, moldTempMin: 130, moldTempMax: 160,
    dryTempC: 150, dryTimeHrs: 4, maxMoisturePct: 0.02,
    densitySolid: 1.35, densityMelt: 1.15, shrinkageMin: 0.5, shrinkageMax: 1.5,
    injectionPressureMin: 14500, injectionPressureMax: 29000, backPressureMin: 725, backPressureMax: 4350,
    screwSpeedRPM: '30–60', ventDepthMm: '0.013–0.025',
    notes: 'Excellent chemical and thermal resistance. Very high mold temps required. Flash-prone — tight tooling needed.'
  },
  {
    name: 'Polyetherimide', abbreviation: 'PEI (Ultem)', family: 'High-Performance', type: 'amorphous',
    meltTempMin: 340, meltTempMax: 400, moldTempMin: 140, moldTempMax: 175,
    dryTempC: 150, dryTimeHrs: 6, maxMoisturePct: 0.02,
    densitySolid: 1.27, densityMelt: 1.10, shrinkageMin: 0.5, shrinkageMax: 0.8,
    injectionPressureMin: 14500, injectionPressureMax: 29000, backPressureMin: 1088, backPressureMax: 4350,
    screwSpeedRPM: '30–60', ventDepthMm: '0.013–0.025',
    notes: 'Amber transparent. High heat (HDT 200°C). Aerospace and medical grade. Requires high-temp capable machine.'
  },
  {
    name: 'Polyether Ether Ketone', abbreviation: 'PEEK', family: 'High-Performance', type: 'semi-crystalline',
    meltTempMin: 360, meltTempMax: 400, moldTempMin: 160, moldTempMax: 200,
    dryTempC: 150, dryTimeHrs: 4, maxMoisturePct: 0.02,
    densitySolid: 1.30, densityMelt: 1.13, shrinkageMin: 1.0, shrinkageMax: 2.0,
    injectionPressureMin: 14500, injectionPressureMax: 31900, backPressureMin: 1088, backPressureMax: 4350,
    screwSpeedRPM: '20–50', ventDepthMm: '0.013–0.025',
    notes: 'Premium high-performance resin. Extreme heat and chemical resistance. Requires specialized equipment.'
  },
  {
    name: 'Styrene Acrylonitrile', abbreviation: 'SAN', family: 'Styrenic', type: 'amorphous',
    meltTempMin: 200, meltTempMax: 260, moldTempMin: 40, moldTempMax: 80,
    dryTempC: 80, dryTimeHrs: 3, maxMoisturePct: 0.05,
    densitySolid: 1.08, densityMelt: 0.96, shrinkageMin: 0.3, shrinkageMax: 0.7,
    injectionPressureMin: 10150, injectionPressureMax: 20300, backPressureMin: 725, backPressureMax: 3625,
    screwSpeedRPM: '40–80', ventDepthMm: '0.025–0.050',
    notes: 'Better chemical resistance and heat resistance than PS. Good clarity.'
  },
];

const FAMILIES = ['All', ...Array.from(new Set(RESINS.map(r => r.family)))];

export function MaterialDataSheet() {
  const { ref, ExportBtn } = useExport('Material Data Sheet Reference');
  const [search, setSearch] = useState('');
  const [familyFilter, setFamilyFilter] = useState('All');
  const [selectedResin, setSelectedResin] = useState<ResinData | null>(null);

  const filtered = useMemo(() => {
    return RESINS.filter(r => {
      const matchSearch = !search || 
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.abbreviation.toLowerCase().includes(search.toLowerCase());
      const matchFamily = familyFilter === 'All' || r.family === familyFilter;
      return matchSearch && matchFamily;
    });
  }, [search, familyFilter]);

  return (
    <Card ref={ref}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>Material Data Sheet Reference</CardTitle>
          </div>
          <ExportBtn />
        </div>
        <CardDescription>
          Processing parameters for {RESINS.length} common injection molding resins
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or abbreviation..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={familyFilter} onValueChange={setFamilyFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FAMILIES.map(f => (
                <SelectItem key={f} value={f}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedResin ? (
          <ResinDetail resin={selectedResin} onBack={() => setSelectedResin(null)} />
        ) : (
          <div className="rounded-md border overflow-auto max-h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead className="text-center">Type</TableHead>
                  <TableHead className="text-center">Melt °F</TableHead>
                  <TableHead className="text-center">Mold °F</TableHead>
                  <TableHead className="text-center">Shrinkage %</TableHead>
                  <TableHead className="text-center hidden md:table-cell">Dry °F / hrs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No resins match your search.
                    </TableCell>
                  </TableRow>
                ) : filtered.map(r => (
                  <TableRow
                    key={r.abbreviation}
                    className="cursor-pointer hover:bg-accent/50"
                    onClick={() => setSelectedResin(r)}
                  >
                    <TableCell>
                      <div className="font-medium">{r.abbreviation}</div>
                      <div className="text-xs text-muted-foreground">{r.name}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={r.type === 'amorphous' ? 'secondary' : 'default'} className="text-xs">
                        {r.type === 'amorphous' ? 'Amorphous' : 'Semi-Cryst.'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-sm">{c2f(r.meltTempMin)}–{c2f(r.meltTempMax)}</TableCell>
                    <TableCell className="text-center text-sm">{c2f(r.moldTempMin)}–{c2f(r.moldTempMax)}</TableCell>
                    <TableCell className="text-center text-sm">{r.shrinkageMin}–{r.shrinkageMax}</TableCell>
                    <TableCell className="text-center text-sm hidden md:table-cell">{c2f(r.dryTempC)}°F / {r.dryTimeHrs}h</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Click any row for full processing details. Values are typical ranges — always verify with your resin supplier's data sheet.
        </p>
      </CardContent>
    </Card>
  );
}

function ResinDetail({ resin, onBack }: { resin: ResinData; onBack: () => void }) {
  const r = resin;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {r.abbreviation}
            <Badge variant={r.type === 'amorphous' ? 'secondary' : 'default'} className="text-xs">
              {r.type === 'amorphous' ? 'Amorphous' : 'Semi-Crystalline'}
            </Badge>
          </h3>
          <p className="text-sm text-muted-foreground">{r.name} — {r.family}</p>
        </div>
        <button onClick={onBack} className="text-sm text-primary hover:underline">← Back to list</button>
      </div>

      <Tabs defaultValue="temps" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="temps" className="flex items-center gap-1 text-xs sm:text-sm">
            <Thermometer className="h-3.5 w-3.5" /> Temps
          </TabsTrigger>
          <TabsTrigger value="drying" className="flex items-center gap-1 text-xs sm:text-sm">
            <Droplets className="h-3.5 w-3.5" /> Drying
          </TabsTrigger>
          <TabsTrigger value="pressure" className="flex items-center gap-1 text-xs sm:text-sm">
            <Gauge className="h-3.5 w-3.5" /> Pressure
          </TabsTrigger>
          <TabsTrigger value="physical" className="flex items-center gap-1 text-xs sm:text-sm">
            <Wind className="h-3.5 w-3.5" /> Physical
          </TabsTrigger>
        </TabsList>

        <TabsContent value="temps" className="mt-3">
          <div className="grid grid-cols-2 gap-3">
            <ParamCard label="Melt Temperature" value={`${c2f(r.meltTempMin)}–${c2f(r.meltTempMax)} °F`} sub={`${r.meltTempMin}–${r.meltTempMax} °C`} />
            <ParamCard label="Mold Temperature" value={`${c2f(r.moldTempMin)}–${c2f(r.moldTempMax)} °F`} sub={`${r.moldTempMin}–${r.moldTempMax} °C`} />
          </div>
        </TabsContent>

        <TabsContent value="drying" className="mt-3">
          <div className="grid grid-cols-3 gap-3">
            <ParamCard label="Drying Temp" value={`${c2f(r.dryTempC)} °F`} sub={`${r.dryTempC} °C`} />
            <ParamCard label="Drying Time" value={`${r.dryTimeHrs} hrs`} sub="minimum" />
            <ParamCard label="Max Moisture" value={`${r.maxMoisturePct}%`} sub="at hopper" />
          </div>
        </TabsContent>

        <TabsContent value="pressure" className="mt-3">
          <div className="grid grid-cols-2 gap-3">
            <ParamCard label="Injection Pressure" value={`${r.injectionPressureMin.toLocaleString()}–${r.injectionPressureMax.toLocaleString()} psi`} />
            <ParamCard label="Back Pressure" value={`${r.backPressureMin.toLocaleString()}–${r.backPressureMax.toLocaleString()} psi`} />
            <ParamCard label="Screw Speed" value={`${r.screwSpeedRPM} RPM`} />
            <ParamCard label="Vent Depth" value={`${r.ventDepthMm} mm`} />
          </div>
        </TabsContent>

        <TabsContent value="physical" className="mt-3">
          <div className="grid grid-cols-2 gap-3">
            <ParamCard label="Solid Density" value={`${r.densitySolid} g/cm³`} />
            <ParamCard label="Melt Density" value={`${r.densityMelt} g/cm³`} />
            <ParamCard label="Mold Shrinkage" value={`${r.shrinkageMin}–${r.shrinkageMax}%`} />
          </div>
        </TabsContent>
      </Tabs>

      <div className="rounded-md bg-muted/50 border p-3">
        <p className="text-xs font-medium text-muted-foreground mb-1">Processing Notes</p>
        <p className="text-sm">{r.notes}</p>
      </div>
    </div>
  );
}

function ParamCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-md border bg-card p-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold mt-0.5">{value}</p>
      {sub && <p className="text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}

function c2f(c: number): number {
  return Math.round(c * 9 / 5 + 32);
}
