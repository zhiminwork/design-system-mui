import { Box, Chip } from '@mui/material'
import WifiIcon from '@mui/icons-material/Wifi'
import WifiOffIcon from '@mui/icons-material/WifiOff'

interface SystemStatusProps {
  online: boolean
}

export function SystemStatus({ online }: SystemStatusProps) {
  return (
    <Chip
      icon={online ? <WifiIcon fontSize="small" /> : <WifiOffIcon fontSize="small" />}
      label={online ? 'Online' : 'Offline'}
      size="small"
      color={online ? 'success' : 'error'}
      variant="outlined"
      sx={{ borderRadius: 1 }}
    />
  )
}
