import { IconButton, Badge, Tooltip } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'

interface NotificationCentreButtonProps {
  unreadCount: number
  onClick: () => void
}

export function NotificationCentreButton({ unreadCount, onClick }: NotificationCentreButtonProps) {
  return (
    <Tooltip title="Notifications">
      <IconButton onClick={onClick} size="small" color="inherit">
        <Badge badgeContent={unreadCount} color="error" max={99}>
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  )
}
