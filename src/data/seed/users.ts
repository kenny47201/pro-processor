import { User } from '@/types/models';

export const users: User[] = [
  { id: 'U1', tenantId: 'T1', facilityId: 'F1', name: 'Mike Chen', email: 'mike.chen@acme.demo', role: 'processor', department: 'Processing', shift: 'Day', status: 'Active' },
  { id: 'U2', tenantId: 'T1', facilityId: 'F1', name: 'Sarah Johnson', email: 'sarah.j@acme.demo', role: 'processor', department: 'Processing', shift: 'Swing', status: 'Active' },
  { id: 'U3', tenantId: 'T1', facilityId: 'F1', name: 'Tom Rivera', email: 'tom.r@acme.demo', role: 'maintenance_tech', department: 'Maintenance', shift: 'Day', status: 'Active' },
  { id: 'U4', tenantId: 'T1', facilityId: 'F1', name: 'Lisa Park', email: 'lisa.p@acme.demo', role: 'maintenance_tech', department: 'Maintenance', shift: 'Night', status: 'Active' },
  { id: 'U5', tenantId: 'T1', facilityId: 'F1', name: 'James Wu', email: 'james.w@acme.demo', role: 'tooling_specialist', department: 'Tooling', shift: 'Day', status: 'Active' },
  { id: 'U6', tenantId: 'T1', facilityId: 'F1', name: 'Maria Santos', email: 'maria.s@acme.demo', role: 'supervisor', department: 'Processing', shift: 'Day', status: 'Active' },
  { id: 'U7', tenantId: 'T1', facilityId: 'F1', name: 'Robert Kim', email: 'robert.k@acme.demo', role: 'supervisor', department: 'Processing', shift: 'Swing', status: 'Active' },
  { id: 'U8', tenantId: 'T1', facilityId: 'F1', name: 'Jennifer Liu', email: 'jennifer.l@acme.demo', role: 'manager', department: 'Management', shift: 'Day', status: 'Active' },
  { id: 'U9', tenantId: 'T1', facilityId: 'F1', name: 'David Brown', email: 'david.b@acme.demo', role: 'admin', department: 'Management', shift: 'Day', status: 'Active' },
  { id: 'U10', tenantId: 'T2', facilityId: 'F2', name: 'Chris Taylor', email: 'chris.t@northbound.demo', role: 'processor', department: 'Processing', shift: 'Day', status: 'Active' },
  { id: 'U11', tenantId: 'T2', facilityId: 'F2', name: 'Amy Wilson', email: 'amy.w@northbound.demo', role: 'maintenance_tech', department: 'Maintenance', shift: 'Day', status: 'Active' },
  { id: 'U12', tenantId: 'T2', facilityId: 'F2', name: 'Kevin Zhang', email: 'kevin.z@northbound.demo', role: 'tooling_specialist', department: 'Tooling', shift: 'Day', status: 'Active' },
  { id: 'U13', tenantId: 'T2', facilityId: 'F2', name: 'Patricia Moore', email: 'patricia.m@northbound.demo', role: 'supervisor', department: 'Processing', shift: 'Day', status: 'Active' },
  { id: 'U14', tenantId: 'T2', facilityId: 'F2', name: 'Steven Harris', email: 'steven.h@northbound.demo', role: 'manager', department: 'Management', shift: 'Day', status: 'Active' },
  { id: 'U15', tenantId: 'T2', facilityId: 'F2', name: 'Mark Anderson', email: 'mark.a@northbound.demo', role: 'admin', department: 'Management', shift: 'Day', status: 'Active' },
  { id: 'U16', tenantId: 'T1', facilityId: 'F1', name: 'Global Admin', email: 'global@proprocessor.demo', role: 'super_admin', department: 'Management', shift: 'Day', status: 'Active' },
];