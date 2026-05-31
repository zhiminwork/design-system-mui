import { Stack, Box, Typography } from '@mui/material'
import WifiIcon from '@mui/icons-material/Wifi'
import WifiOffIcon from '@mui/icons-material/WifiOff'

interface SystemStatusProps {
  online: boolean
}

export function SystemStatus({ online }: SystemStatusProps) {
  return (
    <Stack direction="row" spacing={0.75} alignItems="center" sx={{ px: 1 }}>
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: online ? '#4caf50' : '#f44336',
          boxShadow: online ? '0 0 6px #4caf50' : '0 0 6px #f44336',
        }}
      />
      {online
        ? <WifiIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.75)' }} />
        : <WifiOffIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.5)' }} />
      }
      <Typography
        variant="caption"
        sx={{ color: online ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)', fontWeight: 500 }}
      >
        {online ? 'Online' : 'Offline'}
      </Typography>
    </Stack>
  )
}
