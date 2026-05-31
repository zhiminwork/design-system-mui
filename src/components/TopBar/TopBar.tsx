import { AppBar, Toolbar, Stack, Divider, Box } from '@mui/material'
import { SystemStatus } from './SystemStatus'
import { ModuleLauncher } from './ModuleLauncher'
import { NotificationCentreButton } from '../NotificationCentre/NotificationCentreButton'
import { ProfileButton } from '../Profile/ProfileButton'
import type { User } from '../../types/user'
import type { AppModule, AppPanelState } from '../../types/module'

export const TOP_BAR_HEIGHT = 64

interface TopBarProps {
  user: User
  online: boolean
  modules: AppModule[]
  activePanel: AppPanelState
  unreadCount: number
  onModuleClick: (module: AppModule) => void
  onNotificationsClick: () => void
}

export function TopBar({
  user,
  online,
  modules,
  activePanel,
  unreadCount,
  onModuleClick,
  onNotificationsClick,
}: TopBarProps) {
  return (
    <AppBar position="fixed" elevation={2} sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
      <Toolbar
        sx={{
          height: TOP_BAR_HEIGHT,
          minHeight: `${TOP_BAR_HEIGHT}px !important`,
          px: 3,
          gap: 2,
        }}
      >
        {/* Left — module launcher */}
        <ModuleLauncher
          modules={modules}
          activePanel={activePanel}
          onModuleClick={onModuleClick}
        />

        <Box flex={1} />

        {/* Right — status, notifications, profile */}
        <Stack direction="row" spacing={1} alignItems="center">
          <SystemStatus online={online} />

          <Divider orientation="vertical" flexItem sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.2)' }} />

          <NotificationCentreButton
            unreadCount={unreadCount}
            onClick={onNotificationsClick}
          />

          <Divider orientation="vertical" flexItem sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.2)' }} />

          <ProfileButton user={user} />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
