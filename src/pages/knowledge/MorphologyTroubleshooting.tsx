import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, Wrench, Settings, ThermometerSun, Gauge, Wind, Droplets, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TroubleshootingIssue {
  id: string;
  defect: string;
  severity: 'high' | 'medium' | 'low';
  affectedLayer: string;
  symptoms: string[];
  rootCauses: string[];
  pressAdjustments: string[];
  runnerAdjustments: string[];
  icon: React.ReactNode;
}

const issues: TroubleshootingIssue[] = [
  {
    id: 'warpage',
    defect: 'Warpage / Bowing',
    severity: 'high',
    affectedLayer: 'Transition Zone',
    symptoms: [
      'Part bends or twists after ejection',
      'Dimensional instability across thickness',
      'Uneven shrinkage in flow vs cross-flow direction',
    ],
    rootCauses: [
      'Uneven cooling across part thickness',
      'High shear orientation frozen into skin layer',
      'Ejection before full solidification',
      'Gate location creating asymmetric fill',
    ],
    pressAdjustments: [
      '↓ Melt temperature to reduce differential shrinkage',
      '↓ Mold temperature for faster, more uniform cooling',
      '↑ Packing pressure to compensate volumetric shrinkage',
      '↑ Packing time to extend pressure application',
      'Slow cooling (more uniform through-thickness gradient)',
    ],
    runnerAdjustments: [
      'Balance fill with symmetrical gate placement',
      'Use center or multiple gates to reduce flow length',
      'Increase runner size to reduce pressure drop',
      'Improve gate location for balanced orientation',
    ],
    icon: <Layers className="h-5 w-5" />,
  },
  {
    id: 'sink-marks',
    defect: 'Sink Marks',
    severity: 'high',
    affectedLayer: 'Core',
    symptoms: [
      'Surface depressions opposite thick sections',
      'Visible dimples near ribs or bosses',
      'Localized surface defects after cooling',
    ],
    rootCauses: [
      'Thick sections shrink more than surrounding material',
      'Inadequate packing pressure or time',
      'High melt temperature extending cooling time',
      'Core shrinks after skin layer freezes',
    ],
    pressAdjustments: [
      '↑ Packing pressure to compensate core shrinkage',
      '↑ Packing time / volume for longer pressure transfer',
      '↓ Melt temperature to reduce volumetric shrinkage',
      '↓ Injection pressure if overpacking other areas',
      'Optimize mold temperature for uniform cooling',
    ],
    runnerAdjustments: [
      'Use larger gates to maintain pressure transfer',
      'Shorten flow length from gate to thick sections',
      'Improve pressure transfer with valve gates',
      'Balance runner layout for multi-cavity molds',
    ],
    icon: <Droplets className="h-5 w-5" />,
  },
  {
    id: 'voids',
    defect: 'Internal Voids',
    severity: 'high',
    affectedLayer: 'Core',
    symptoms: [
      'Bubbles visible in clear parts',
      'Reduced mechanical strength',
      'Part weight below specification',
    ],
    rootCauses: [
      'Air or gas trapped in core during solidification',
      'Low fill / hesitation during injection',
      'Inadequate venting at end of fill',
      'Moisture in resin outgassing',
    ],
    pressAdjustments: [
      '↑ Injection speed to maintain melt front',
      '↑ Injection pressure for complete cavity fill',
      '↑ Mold temperature for better flow',
      'Improve venting at parting line and ejector pins',
      'Dry material to specification',
    ],
    runnerAdjustments: [
      'Add or improve vents at end of fill',
      'Shorten flow length to reduce pressure loss',
      'Use open (non-valve) gate for better venting',
      'Increase runner / gate size to reduce restrictions',
    ],
    icon: <Wind className="h-5 w-5" />,
  },
  {
    id: 'brittleness',
    defect: 'Brittleness / Low Impact',
    severity: 'medium',
    affectedLayer: 'Skin',
    symptoms: [
      'Parts crack or fracture under normal loads',
      'Reduced elongation at break',
      'Brittle failure mode instead of ductile',
    ],
    rootCauses: [
      'High shear orientation reducing ductility',
      'Material degradation from overheating',
      'Low mold temperature creating high residual stress',
      'Excessive regrind / contamination',
    ],
    pressAdjustments: [
      '↑ Melt temperature (within material window)',
      '↓ Injection speed to reduce shear',
      '↓ Back pressure to reduce degradation',
      '↑ Mold temperature for lower frozen-in stress',
      'Reduce residence time in barrel',
    ],
    runnerAdjustments: [
      'Increase runner / gate size to reduce shear',
      'Use larger radii at direction changes',
      'Reduce flow length to lower shear exposure',
      'Use hot runner to reduce pressure drop',
      'Remove restrictions in runner system',
    ],
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  {
    id: 'surface-haze',
    defect: 'Surface Haze / Gloss Loss',
    severity: 'medium',
    affectedLayer: 'Skin',
    symptoms: [
      'Dull or hazy surface appearance',
      'Inconsistent gloss levels across part',
      'Micro-voids visible on surface',
    ],
    rootCauses: [
      'Moisture / contamination in melt',
      'Low mold temperature preventing full replication',
      'Volatile outgassing at skin layer',
      'High shear creating surface roughness',
    ],
    pressAdjustments: [
      'Dry material thoroughly before processing',
      '↑ Mold temperature for better surface replication',
      '↓ Back pressure to reduce volatile generation',
      'Reduce shear rate through gate area',
      'Optimize cooling for uniform surface',
    ],
    runnerAdjustments: [
      'Improve venting to remove trapped volatiles',
      'Use larger gate to reduce shear at entry',
      'Reduce shear by increasing runner cross-section',
      'Filter melt if contamination is suspected',
      'Optimize gate type (fan/edge for cosmetic surfaces)',
    ],
    icon: <ThermometerSun className="h-5 w-5" />,
  },
  {
    id: 'flow-lines',
    defect: 'Flow Lines / Weld Lines',
    severity: 'medium',
    affectedLayer: 'Transition Zone',
    symptoms: [
      'Visible lines where melt fronts meet',
      'Weak areas at weld line locations',
      'Discoloration along flow paths',
    ],
    rootCauses: [
      'Multiple flow fronts meeting at low temperature',
      'Low mold or melt temperature',
      'Contamination affecting melt front bonding',
      'Long flow length cooling melt front',
    ],
    pressAdjustments: [
      '↑ Mold temperature for better knitting',
      '↑ Melt temperature to maintain front temperature',
      '↑ Injection speed to reduce cooling before meeting',
      '↑ Injection pressure for better packing at weld',
    ],
    runnerAdjustments: [
      'Re-locate gate to move weld lines to non-critical areas',
      'Use multiple gates strategically',
      'Change gate type (fan/edge) for broader flow front',
      'Balance flow to ensure simultaneous arrival',
      'Reduce flow length to maintain melt temperature',
    ],
    icon: <Gauge className="h-5 w-5" />,
  },
  {
    id: 'differential-shrinkage',
    defect: 'Differential Shrinkage',
    severity: 'medium',
    affectedLayer: 'Transition Zone',
    symptoms: [
      'Unequal shrinkage between thick and thin sections',
      'Dimensional variation across part geometry',
      'Parts out of tolerance in specific areas',
    ],
    rootCauses: [
      'Wall thickness variations',
      'Uneven cooling across different part regions',
      'Different rib / boss design creating thick spots',
      'Gate location causing uneven pressure distribution',
    ],
    pressAdjustments: [
      'Balance cooling circuit for uniform heat removal',
      '↑ Mold temperature for more uniform crystallinity',
      '↑ Packing pressure to compensate thick sections',
      '↑ Packing time to extend pressure effect',
      'Optimize part design for uniform wall thickness',
    ],
    runnerAdjustments: [
      'Balance runner layout for equal cavity pressure',
      'Gate at thickest section for best pressure transfer',
      'Increase gate size for extended packing',
      'Reduce flow length to minimize pressure loss',
      'Use uniform wall thickness in part design',
    ],
    icon: <Settings className="h-5 w-5" />,
  },
  {
    id: 'residual-stress',
    defect: 'Residual Stress / Cracking',
    severity: 'high',
    affectedLayer: 'Skin',
    symptoms: [
      'Delayed cracking or stress whitening',
      'Environmental stress cracking in service',
      'Parts fail during secondary operations',
    ],
    rootCauses: [
      'High orientation frozen into part during cooling',
      'Rapid cooling creating steep thermal gradients',
      'High packing pressure locking in stress',
      'Ejection too early before stress relaxation',
      'Thick-to-thin transitions concentrating stress',
    ],
    pressAdjustments: [
      '↓ Packing pressure to reduce locked-in stress',
      '↓ Injection speed for less orientation',
      '↑ Mold temperature for stress relaxation',
      'Uniform cooling to reduce thermal gradients',
      'Delay ejection for more relaxation time',
    ],
    runnerAdjustments: [
      'Increase runner / gate size for lower shear',
      'Reduce restrictions in runner system',
      'Use sequential valve gate for controlled fill',
      'Balance flow to reduce orientation gradients',
      'Improve cooling near gate for stress relief',
    ],
    icon: <Wrench className="h-5 w-5" />,
  },
];

const severityColor = {
  high: 'bg-red-500/20 text-red-400 border-red-500/30',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

export default function MorphologyTroubleshooting() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-5xl">
      <Button variant="ghost" size="sm" onClick={() => navigate('/knowledge/docs')}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Knowledge Docs
      </Button>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          Morphology Troubleshooting
        </h1>
        <p className="text-sm text-muted-foreground">
          Common morphology-related defects with recommended press settings and runner system adjustments
        </p>
      </div>

      <div className="grid gap-3">
        {issues.map((issue) => {
          const isExpanded = expandedId === issue.id;
          return (
            <Card
              key={issue.id}
              className={`transition-colors cursor-pointer ${isExpanded ? 'border-primary' : 'hover:border-primary/50'}`}
              onClick={() => setExpandedId(isExpanded ? null : issue.id)}
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      {issue.icon}
                    </div>
                    <div>
                      <CardTitle className="text-base">{issue.defect}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Affected Layer: {issue.affectedLayer}
                      </p>
                    </div>
                  </div>
                  <Badge className={`${severityColor[issue.severity]} text-xs shrink-0`}>
                    {issue.severity.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="p-4 pt-2 space-y-4" onClick={(e) => e.stopPropagation()}>
                  {/* Symptoms */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">Symptoms</h4>
                    <ul className="text-sm space-y-1">
                      {issue.symptoms.map((s, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-muted-foreground mt-1">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Root Causes */}
                  <div>
                    <h4 className="text-sm font-semibold text-red-400 mb-1">Root Causes</h4>
                    <ul className="text-sm space-y-1">
                      {issue.rootCauses.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Press Adjustments */}
                    <div className="bg-muted/30 rounded-lg p-3">
                      <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-1.5">
                        <Settings className="h-4 w-4" />
                        Press Adjustments
                      </h4>
                      <ul className="text-sm space-y-1.5">
                        {issue.pressAdjustments.map((a, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-0.5 shrink-0">→</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Runner Adjustments */}
                    <div className="bg-muted/30 rounded-lg p-3">
                      <h4 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
                        <Wrench className="h-4 w-4" />
                        Runner System Fixes
                      </h4>
                      <ul className="text-sm space-y-1.5">
                        {issue.runnerAdjustments.map((a, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-400 mt-0.5 shrink-0">→</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
