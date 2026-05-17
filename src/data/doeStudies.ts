// DOE (Design of Experiments) studies registry.
// Each study pairs structured how-to content with a linked calculator/worksheet
// in Process Tools (referenced by `linkedToolId`).

import pressureLoss01 from '@/assets/doe/pressure-loss-01-definition.png';
import pressureLoss02 from '@/assets/doe/pressure-loss-02-drivers.png';
import pressureLoss03 from '@/assets/doe/pressure-loss-03-cold-vs-hot.png';
import pressureLoss04 from '@/assets/doe/pressure-loss-04-how-to-run.png';
import pressureLoss05 from '@/assets/doe/pressure-loss-05-interpreting.png';
import pressureLoss06 from '@/assets/doe/pressure-loss-06-troubleshooting.png';

export type DoeSection = {
  id: string;
  title: string;
  image?: string;
  body?: string[];
};

export type DoeStudy = {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  /** Process Tools tool id used to deep-link to the calculator/worksheet. */
  linkedToolId?: string;
  linkedToolLabel?: string;
  /** Optional downloadable references (placed under /public). */
  downloads?: { label: string; href: string }[];
  sections: DoeSection[];
};

export const doeStudies: DoeStudy[] = [
  {
    id: 'pressure-loss-study',
    title: 'Pressure-Loss Study',
    shortTitle: 'Pressure Loss',
    summary:
      'Quantify pressure drop through the melt delivery system (nozzle → sprue → runner/manifold → gate → cavity) to locate restrictions, imbalance, and inefficient melt delivery.',
    linkedToolId: 'pressure-loss',
    linkedToolLabel: 'Pressure Loss Calculator',
    downloads: [
      { label: 'Technical Guide (PDF)', href: '/doe/pressure-loss-study-guide.pdf' },
      { label: 'Technical Guide (DOCX)', href: '/doe/pressure-loss-study-guide.docx' },
    ],
    sections: [
      {
        id: 'definition',
        title: 'Definition & Core Concept',
        image: pressureLoss01,
        body: [
          'A pressure-loss study is a controlled DOE used to measure or infer the pressure drop through the nozzle, runner system, gate, and cavity during filling so the processor can locate restrictions, imbalance, and inefficient melt delivery.',
          'Cold runner: losses concentrate in sprue and runner mass. Hot runner: losses shift to manifold, drops, tips, and gates.',
        ],
      },
      {
        id: 'drivers',
        title: 'What Drives Pressure Loss?',
        image: pressureLoss02,
        body: [
          'Material, mold design, process settings, machine condition, and auxiliary equipment all contribute. The study reveals where pressure is being wasted, whether the mold is balanced, whether viscosity/temperature conditions are appropriate, and whether design or processing changes will give the best improvement.',
        ],
      },
      {
        id: 'cold-vs-hot',
        title: 'Cold Runner vs Hot Runner',
        image: pressureLoss03,
        body: [
          'Interpret hot-runner and cold-runner results differently. A hot runner can hide runner freeze but amplify manifold/tip imbalance; a cold runner adds runner mass and heat loss that directly affect pressure demand.',
        ],
      },
      {
        id: 'how-to-run',
        title: 'How to Run the Study',
        image: pressureLoss04,
        body: [
          'Eight steps: define scope, verify machine/check-ring, prepare material, stabilize mold/hot-runner temps, set a repeatable baseline, run shots and record data, compare losses by segment, then change gate/runner/manifold/temp/speed/profile based on findings.',
          'If repeatability is poor, fix the machine, material handling, or thermal stability before trusting the pressure-loss study.',
        ],
      },
      {
        id: 'interpreting',
        title: 'Interpreting Results',
        image: pressureLoss05,
        body: [
          'Compare required fill pressure curves, identify the dominant loss segment, check cavity-to-cavity balance, and match the pressure signature to its likely meaning (high everywhere, large gate drop, end-fill spike, cavity variation, low repeatability).',
          'Use repeatable data and, when possible, cavity pressure sensors to separate machine pressure from true cavity filling behavior.',
        ],
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting & Corrective Actions',
        image: pressureLoss06,
        body: [
          'Work from the largest pressure drop toward the cavity. Walk the decision tree by location (nozzle, cold runner/sprue, hot runner manifold/tip, gate, end of fill/cavity) and apply the matching corrective actions.',
          'Follow up by confirming lower required pressure within machine limits, maintaining fill time and part quality, and updating the setup sheet with the final conditions.',
        ],
      },
    ],
  },
];
