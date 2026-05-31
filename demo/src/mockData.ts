import type { User } from '@design-system/types/user'
import type { Notification } from '@design-system/types/notification'

export const mockUser: User = {
  id: 'u1',
  name: 'Jane Tan',
  username: 'jane.tan',
  role: 'Hd A',
  currentShift: {
    startTime: '1000H',
    endTime: '1200H',
    role: 'Hd A',
    location: 'Building A',
  },
}

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'System Alert',
    message: 'Sensor 4B has reported an anomaly. Please investigate.',
    severity: 'warning',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    read: false,
    moduleId: 'sensors',
  },
  {
    id: 'n2',
    title: 'Maintenance Scheduled',
    message: 'Routine maintenance for Zone 3 at 1400H today.',
    severity: 'info',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
    moduleId: 'maintenance',
  },
  {
    id: 'n3',
    title: 'Incident Resolved',
    message: 'Incident #2041 at Gate 7 has been closed.',
    severity: 'success',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    read: true,
    moduleId: 'incidents',
  },
  {
    id: 'n4',
    title: 'Critical: Power Failure',
    message: 'Backup power engaged in Sector B. Monitoring in progress.',
    severity: 'error',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
]
