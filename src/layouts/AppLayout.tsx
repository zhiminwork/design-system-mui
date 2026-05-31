import { useState } from 'react'
import { Box } from '@mui/material'
import { TopBar, TOP_BAR_HEIGHT } from '../components/TopBar/TopBar'
import { NotificationDrawer } from '../components/NotificationCentre/NotificationDrawer'
import { AppPanel, SIDE_PANEL_WIDTH } from '../components/AppPanel/AppPanel'
import type { User } from '../types/user'
import type { Notification } from '../types/notification'
import type { AppModule, AppPanelState } from '../types/module'
import type { MapMarker } from '../types/map'

interface AppLayoutProps {
  user: User
  online: boolean
  modules: AppModule[]
  notifications: Notification[]
  onNotificationRead: (id: string) => void
  // Map slot — Track passes in <MapView /> with their config
  mapSlot: React.ReactNode
  // App panel content — Track renders content based on active module
  renderPanelContent?: (moduleId: string) => React.ReactNode
}

export function AppLayout({
  user,
  online,
  modules,
  notifications,
  onNotificationRead,
  mapSlot,
  renderPanelContent,
}: AppLayoutProps) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [panelState, setPanelState] = useState<AppPanelState>({ moduleId: null, mode: 'side' })

  const activeModule = modules.find((m) => m.id === panelState.moduleId) ?? null
  const unreadCount = notifications.filter((n) => !n.read).length

  function handleModuleClick(mod: AppModule) {
    // Clicking the active module closes it
    if (panelState.moduleId === mod.id) {
      setPanelState({ moduleId: null, mode: 'side' })
    } else {
      setPanelState({ moduleId: mod.id, mode: mod.defaultMode })
    }
  }

  function handleToggleMode() {
    setPanelState((s) => ({ ...s, mode: s.mode === 'side' ? 'fullscreen' : 'side' }))
  }

  const sidePanelOpen = panelState.moduleId !== null && panelState.mode === 'side'

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar
        user={user}
        online={online}
        modules={modules}
        activePanel={panelState}
        unreadCount={unreadCount}
        onModuleClick={handleModuleClick}
        onNotificationsClick={() => setNotifOpen(true)}
      />

      {/* Main area — map fills available space, side panel shifts it */}
      <Box
        sx={{
          position: 'fixed',
          top: TOP_BAR_HEIGHT,
          left: sidePanelOpen ? SIDE_PANEL_WIDTH : 0,
          right: 0,
          bottom: 0,
          transition: 'left 0.2s ease',
        }}
      >
        {mapSlot}
      </Box>

      <AppPanel
        panelState={panelState}
        activeModule={activeModule}
        onClose={() => setPanelState({ moduleId: null, mode: 'side' })}
        onToggleMode={handleToggleMode}
      >
        {panelState.moduleId && renderPanelContent?.(panelState.moduleId)}
      </AppPanel>

      <NotificationDrawer
        open={notifOpen}
        notifications={notifications}
        onClose={() => setNotifOpen(false)}
        onRead={onNotificationRead}
      />
    </Box>
  )
}
