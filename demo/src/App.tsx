import { useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { AppLayout } from '@design-system/layouts/AppLayout'
import { MapView } from '@design-system/components/Map/MapView'
import { lightTheme } from '@design-system/theme/theme'
import { mockUser, mockNotifications } from './mockData'
import { modules } from './modules'
import { PanelContent } from './PanelContent'
import type { Notification } from '@design-system/types/notification'
import type { MapMarker } from '@design-system/types/map'

const demoMarkers: MapMarker[] = [
  {
    id: 'm1',
    coordinates: { lng: 103.8198, lat: 1.3521 },
    type: 'incident',
    label: 'Incident #2045',
    data: { Status: 'Active', Severity: 'High', Zone: 'Gate 3', Reported: '1015H' },
  },
  {
    id: 'm2',
    coordinates: { lng: 103.8298, lat: 1.3621 },
    type: 'sensor',
    label: 'Sensor 4B',
    data: { Status: 'Anomaly', Temp: '38°C', Zone: 'Level 2' },
  },
  {
    id: 'm3',
    coordinates: { lng: 103.8098, lat: 1.3421 },
    type: 'maintenance',
    label: 'Maintenance Zone 3',
    data: { Task: 'HVAC Filter', Scheduled: '1400H', Assignee: 'Marcus Lim' },
  },
]

export default function App() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  function handleNotificationRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AppLayout
        user={mockUser}
        online={true}
        modules={modules}
        notifications={notifications}
        onNotificationRead={handleNotificationRead}
        mapSlot={<MapView markers={demoMarkers} />}
        renderPanelContent={(moduleId) => <PanelContent moduleId={moduleId} />}
      />
    </ThemeProvider>
  )
}
