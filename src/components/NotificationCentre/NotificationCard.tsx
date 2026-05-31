import { Card, CardContent, Typography, Stack, Box } from '@mui/material'
import type { Notification } from '../../types/notification'

const severityColor: Record<Notification['severity'], string> = {
  info: 'info.main',
  warning: 'warning.main',
  error: 'error.main',
  success: 'success.main',
}

interface NotificationCardProps {
  notification: Notification
  onRead: (id: string) => void
}

export function NotificationCard({ notification, onRead }: NotificationCardProps) {
  return (
    <Card
      variant="outlined"
      onClick={() => onRead(notification.id)}
      sx={{
        cursor: 'pointer',
        opacity: notification.read ? 0.6 : 1,
        borderLeft: 4,
        borderLeftColor: severityColor[notification.severity],
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >
      <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="subtitle2" fontWeight={notification.read ? 400 : 600}>
            {notification.title}
          </Typography>
          {!notification.read && (
            <Box
              sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', mt: 0.5, flexShrink: 0 }}
            />
          )}
        </Stack>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          {notification.message}
        </Typography>
        <Typography variant="caption" color="text.disabled" mt={0.5} display="block">
          {new Date(notification.timestamp).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  )
}
