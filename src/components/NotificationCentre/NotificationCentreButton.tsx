import { IconButton, Badge, Tooltip } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'

interface NotificationCentreButtonProps {
  unreadCount: number
  onClick: () => void
}

export function NotificationCentreButton({ unreadCount, onClick }: NotificationCentreButtonProps) {
  return (
    <Tooltip title="Notifications">
      <IconButton
        onClick={onClick}
        size="medium"
        sx={{
          color: 'rgba(255,255,255,0.75)',
          '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.12)' },
        }}
      >
        <Badge badgeContent={unreadCount} color="error" max={99}>
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  )
}
