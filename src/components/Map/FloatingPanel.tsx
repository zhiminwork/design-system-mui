import { Paper, Stack, Typography, IconButton, Divider, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { FloatingPanelState } from '../../types/map'

interface FloatingPanelProps {
  state: FloatingPanelState
  onClose: () => void
}

export function FloatingPanel({ state, onClose }: FloatingPanelProps) {
  if (!state.open || !state.marker || !state.screenPosition) return null

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'absolute',
        left: state.screenPosition.x,
        top: state.screenPosition.y,
        zIndex: 10,
        minWidth: 260,
        maxWidth: 320,
        pointerEvents: 'all',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" px={2} pt={1.5} pb={1}>
        <Typography variant="subtitle2" fontWeight={600}>
          {state.marker.label ?? state.marker.id}
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Divider />

      <Box px={2} py={1.5}>
        {/* Tracks render their own content here by replacing this component
            or by passing a renderContent prop */}
        {Object.entries(state.marker.data).map(([key, val]) => (
          <Stack key={key} direction="row" justifyContent="space-between" spacing={2} mb={0.5}>
            <Typography variant="caption" color="text.secondary">{key}</Typography>
            <Typography variant="caption">{String(val)}</Typography>
          </Stack>
        ))}
      </Box>
    </Paper>
  )
}
