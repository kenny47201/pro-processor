import { Tenant, Facility } from '@/types/models';

export const tenants: Tenant[] = [
  {
    id: 'T1',
    name: 'Acme Pharma Closures',
    slug: 'acme-pharma',
    createdAt: '2023-01-15T00:00:00Z',
  },
  {
    id: 'T2',
    name: 'Acme Automotive Plastics',
    slug: 'acme-automotive',
    createdAt: '2023-03-22T00:00:00Z',
  },
];

export const facilities: Facility[] = [
  {
    id: 'F1',
    tenantId: 'T1',
    name: 'Acme Plant - Toledo',
    location: 'Toledo, OH',
    timezone: 'America/New_York',
  },
  {
    id: 'F2',
    tenantId: 'T2',
    name: 'Northbound Main',
    location: 'Grand Rapids, MI',
    timezone: 'America/Detroit',
  },
];