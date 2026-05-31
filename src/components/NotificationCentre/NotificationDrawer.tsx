import { Drawer, Stack, Typography, IconButton, Divider, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { NotificationCard } from './NotificationCard'
import { TOP_BAR_HEIGHT } from '../TopBar/TopBar'
import type { Notification } from '../../types/notification'

const DRAWER_WIDTH = 380

interface NotificationDrawerProps {
  open: boolean
  notifications: Notification[]
  onClose: () => void
  onRead: (id: string) => void
}

export function NotificationDrawer({ open, notifications, onClose, onRead }: NotificationDrawerProps) {
  const unread = notifications.filter((n) => !n.read).length

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          top: TOP_BAR_HEIGHT,
          height: `calc(100% - ${TOP_BAR_HEIGHT}px)`,
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" px={2} py={1.5}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6">Notifications</Typography>
          {unread > 0 && (
            <Typography variant="caption" color="primary.main" fontWeight={600}>
              {unread} unread
            </Typography>
          )}
        </Stack>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Divider />

      <Box sx={{ overflowY: 'auto', flex: 1, p: 1.5 }}>
        {notifications.length === 0 ? (
          <Typography variant="body2" color="text.secondary" textAlign="center" mt={4}>
            No notifications
          </Typography>
        ) : (
          <Stack spacing={1}>
            {notifications.map((n) => (
              <NotificationCard key={n.id} notification={n} onRead={onRead} />
            ))}
          </Stack>
        )}
      </Box>
    </Drawer>
  )
}
