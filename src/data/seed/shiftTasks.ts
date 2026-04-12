import { ShiftTaskList, ShiftTaskItem } from '@/types/models';

export const shiftTaskLists: ShiftTaskList[] = [
  // ============================================
  // Acme Pharma Closures (T1) - 4 task lists
  // ============================================
  {
    id: 'STL1',
    tenantId: 'T1',
    facilityId: 'F1',
    date: '2025-01-25',
    shift: 'Day',
    createdBy: 'U8', // Jennifer Liu - Manager
    title: 'Day Shift Startup Checklist',
    notes: 'Critical items for medical closure production line startup',
    status: 'Active',
  },
  {
    id: 'STL2',
    tenantId: 'T1',
    facilityId: 'F1',
    date: '2025-01-25',
    shift: 'Swing',
    createdBy: 'U8',
    title: 'Swing Shift Handoff Tasks',
    notes: 'Ensure smooth transition from Day shift',
    status: 'Completed',
  },
  {
    id: 'STL3',
    tenantId: 'T1',
    facilityId: 'F1',
    date: '2025-01-24',
    shift: 'Day',
    createdBy: 'U6', // Maria Santos - Supervisor
    title: 'Preventive Maintenance Day',
    notes: 'Scheduled PM tasks for all injection presses',
    status: 'Completed',
  },
  {
    id: 'STL4',
    tenantId: 'T1',
    facilityId: 'F1',
    date: '2025-01-26',
    shift: 'Night',
    createdBy: 'U8',
    title: 'Night Shift - Quality Audit Prep',
    notes: 'Prepare for ISO audit next week',
    status: 'Active',
  },
  // ============================================
  // Northbound Plastics (T2) - 2 task lists
  // ============================================
  {
    id: 'STL5',
    tenantId: 'T2',
    facilityId: 'F2',
    date: '2025-01-25',
    shift: 'Day',
    createdBy: 'U14', // Steven Harris - Manager
    title: 'Automotive Line Daily Checks',
    notes: 'Standard daily verification for automotive components',
    status: 'Active',
  },
  {
    id: 'STL6',
    tenantId: 'T2',
    facilityId: 'F2',
    date: '2025-01-24',
    shift: 'Day',
    createdBy: 'U13', // Patricia Moore - Supervisor
    title: 'Material Changeover Protocol',
    notes: 'Switching from ABS to PP for bumper production',
    status: 'Completed',
  },
];

export const shiftTaskItems: ShiftTaskItem[] = [
  // ============================================
  // STL1 - Day Shift Startup (Active, Mixed Progress)
  // ============================================
  {
    id: 'STI1',
    taskListId: 'STL1',
    text: 'Verify all safety interlocks on Press 1-4',
    priority: 'Urgent',
    assignedTo: { type: 'department', id: 'Processing' },
    completedBy: 'U1', // Mike Chen
    completedAt: '2025-01-25T06:15:00Z',
    notes: 'All interlocks verified - green lights on all presses',
    status: 'Done',
  },
  {
    id: 'STI2',
    taskListId: 'STL1',
    text: 'Check material dryer temperatures (min 180°F for PET)',
    priority: 'High',
    assignedTo: { type: 'department', id: 'Processing' },
    completedBy: 'U1',
    completedAt: '2025-01-25T06:22:00Z',
    status: 'Done',
  },
  {
    id: 'STI3',
    taskListId: 'STL1',
    text: 'Inspect mold water lines for leaks',
    priority: 'High',
    assignedTo: { type: 'department', id: 'Maintenance' },
    status: 'InProgress',
  },
  {
    id: 'STI4',
    taskListId: 'STL1',
    text: 'Calibrate hot runner temperatures on Mold M-102',
    priority: 'Normal',
    assignedTo: { type: 'user', id: 'U5' }, // James Wu - Tooling
    status: 'Pending',
  },
  {
    id: 'STI5',
    taskListId: 'STL1',
    text: 'Log colorant batch numbers in quality system',
    priority: 'Normal',
    assignedTo: { type: 'department', id: 'Quality' },
    status: 'Pending',
  },
  {
    id: 'STI6',
    taskListId: 'STL1',
    text: 'Confirm robot gripper alignment on Pick-1',
    priority: 'High',
    assignedTo: { type: 'user', id: 'U3' }, // Tom Rivera - Maint
    status: 'InProgress',
    notes: 'Gripper showing slight offset, adjusting now',
  },
  // ============================================
  // STL2 - Swing Shift Handoff (Completed)
  // ============================================
  {
    id: 'STI7',
    taskListId: 'STL2',
    text: 'Review Day shift production log',
    priority: 'Normal',
    assignedTo: { type: 'department', id: 'Processing' },
    completedBy: 'U2', // Sarah Johnson
    completedAt: '2025-01-25T14:05:00Z',
    status: 'Done',
  },
  {
    id: 'STI8',
    taskListId: 'STL2',
    text: 'Verify material levels in hopper',
    priority: 'High',
    assignedTo: { type: 'department', id: 'Processing' },
    completedBy: 'U2',
    completedAt: '2025-01-25T14:12:00Z',
    notes: 'Topped off PET resin to 80% capacity',
    status: 'Done',
  },
  {
    id: 'STI9',
    taskListId: 'STL2',
    text: 'Check scrap bin levels',
    priority: 'Normal',
    assignedTo: { type: 'department', id: 'Processing' },
    completedBy: 'U2',
    completedAt: '2025-01-25T14:18:00Z',
    status: 'Done',
  },
  {
    id: 'STI10',
    taskListId: 'STL2',
    text: 'Confirm night shift staffing coverage',
    priority: 'Normal',
    assignedTo: { type: 'user', id: 'U7' }, // Robert Kim - Supervisor
    completedBy: 'U7',
    completedAt: '2025-01-25T14:30:00Z',
    notes: 'Full coverage confirmed with Lisa Park',
    status: 'Done',
  },
  // ============================================
  // STL3 - PM Day (Completed)
  // ============================================
  {
    id: 'STI11',
    taskListId: 'STL3',
    text: 'Grease all tie bar guides on Press 1',
    priority: 'High',
    assignedTo: { type: 'department', id: 'Maintenance' },
    completedBy: 'U3',
    completedAt: '2025-01-24T08:45:00Z',
    status: 'Done',
  },
  {
    id: 'STI12',
    taskListId: 'STL3',
    text: 'Replace hydraulic filter on Press 2',
    priority: 'High',
    assignedTo: { type: 'user', id: 'U3' },
    completedBy: 'U3',
    completedAt: '2025-01-24T10:30:00Z',
    notes: 'Filter replaced, pressure stable at 2100 PSI',
    status: 'Done',
  },
  {
    id: 'STI13',
    taskListId: 'STL3',
    text: 'Check ejector pin wear on Mold M-101',
    priority: 'Normal',
    assignedTo: { type: 'department', id: 'Tooling' },
    completedBy: 'U5',
    completedAt: '2025-01-24T11:15:00Z',
    notes: 'Pin #3 showing wear - scheduled for replacement next PM',
    status: 'Done',
  },
  {
    id: 'STI14',
    taskListId: 'STL3',
    text: 'Clean barrel vent on Press 3',
    priority: 'Normal',
    assignedTo: { type: 'department', id: 'Processing' },
    completedBy: 'U1',
    completedAt: '2025-01-24T13:00:00Z',
    status: 'Done',
  },
  // ============================================
  // STL4 - Night Shift Quality Prep (Active)
  // ============================================
  {
    id: 'STI15',
    taskListId: 'STL4',
    text: 'Organize quality documentation folders',
    priority: 'High',
    assignedTo: { type: 'department', id: 'Quality' },
    status: 'Pending',
  },
  {
    id: 'STI16',
    taskListId: 'STL4',
    text: 'Verify calibration stickers on all gauges',
    priority: 'Urgent',
    assignedTo: { type: 'department', id: 'Quality' },
    status: 'Pending',
  },
  {
    id: 'STI17',
    taskListId: 'STL4',
    text: 'Review last 30-day reject rate data',
    priority: 'Normal',
    assignedTo: { type: 'department', id: 'Processing' },
    status: 'Pending',
  },
  // ============================================
  // STL5 - Northbound Automotive Daily (Active)
  // ============================================
  {
    id: 'STI18',
    taskListId: 'STL5',
    text: 'First article inspection on Line A',
    priority: 'Urgent',
    assignedTo: { type: 'department', id: 'Quality' },
    completedBy: 'U10', // Chris Taylor
    completedAt: '2025-01-25T06:30:00Z',
    notes: 'All dimensions within spec per drawing R-4521',
    status: 'Done',
  },
  {
    id: 'STI19',
    taskListId: 'STL5',
    text: 'Verify robot cycle times match standard',
    priority: 'High',
    assignedTo: { type: 'user', id: 'U11' }, // Amy Wilson - Maint
    status: 'InProgress',
  },
  {
    id: 'STI20',
    taskListId: 'STL5',
    text: 'Check gate vestige on bumper parts',
    priority: 'Normal',
    assignedTo: { type: 'department', id: 'Tooling' },
    status: 'Pending',
  },
  {
    id: 'STI21',
    taskListId: 'STL5',
    text: 'Log OEE data for morning meeting',
    priority: 'Normal',
    assignedTo: { type: 'department', id: 'Processing' },
    status: 'Pending',
  },
  // ============================================
  // STL6 - Material Changeover (Completed)
  // ============================================
  {
    id: 'STI22',
    taskListId: 'STL6',
    text: 'Purge ABS from barrel completely',
    priority: 'Urgent',
    assignedTo: { type: 'department', id: 'Processing' },
    completedBy: 'U10',
    completedAt: '2025-01-24T07:30:00Z',
    notes: 'Used 5kg purge compound, barrel clean',
    status: 'Done',
  },
  {
    id: 'STI23',
    taskListId: 'STL6',
    text: 'Adjust barrel temperatures for PP (lower 20°F)',
    priority: 'High',
    assignedTo: { type: 'department', id: 'Processing' },
    completedBy: 'U10',
    completedAt: '2025-01-24T08:00:00Z',
    status: 'Done',
  },
  {
    id: 'STI24',
    taskListId: 'STL6',
    text: 'Update recipe in HMI for PP-BUM-2024',
    priority: 'High',
    assignedTo: { type: 'user', id: 'U12' }, // Kevin Zhang - Tooling
    completedBy: 'U12',
    completedAt: '2025-01-24T08:15:00Z',
    status: 'Done',
  },
  {
    id: 'STI25',
    taskListId: 'STL6',
    text: 'Run 50 shots and verify part quality',
    priority: 'Urgent',
    assignedTo: { type: 'department', id: 'Quality' },
    completedBy: 'U10',
    completedAt: '2025-01-24T09:00:00Z',
    notes: 'All 50 shots passed visual and dimensional check',
    status: 'Done',
  },
];
