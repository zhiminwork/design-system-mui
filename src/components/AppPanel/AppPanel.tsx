import { Box, Paper, Stack, Typography, IconButton, Tooltip, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import { TOP_BAR_HEIGHT } from '../TopBar/TopBar'
import type { AppModule, AppPanelState } from '../../types/module'

export const SIDE_PANEL_WIDTH = 400

interface AppPanelProps {
  panelState: AppPanelState
  activeModule: AppModule | null
  children?: React.ReactNode
  onClose: () => void
  onToggleMode: () => void
}

export function AppPanel({ panelState, activeModule, children, onClose, onToggleMode }: AppPanelProps) {
  if (!panelState.moduleId || !activeModule) return null

  const isFullscreen = panelState.mode === 'fullscreen'

  return (
    <Paper
      elevation={2}
      square
      sx={
        isFullscreen
          ? {
              position: 'fixed',
              top: TOP_BAR_HEIGHT,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: (t) => t.zIndex.drawer,
              display: 'flex',
              flexDirection: 'column',
            }
          : {
              position: 'fixed',
              top: TOP_BAR_HEIGHT,
              left: 0,
              bottom: 0,
              width: SIDE_PANEL_WIDTH,
              zIndex: (t) => t.zIndex.drawer,
              display: 'flex',
              flexDirection: 'column',
            }
      }
    >
      {/* Panel header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" px={2} py={1} flexShrink={0}>
        <Typography variant="subtitle1" fontWeight={600}>
          {activeModule.label}
        </Typography>
        <Stack direction="row" spacing={0.5}>
          {activeModule.allowModeToggle && (
            <Tooltip title={isFullscreen ? 'Side panel' : 'Full screen'}>
              <IconButton size="small" onClick={onToggleMode}>
                {isFullscreen ? <CloseFullscreenIcon fontSize="small" /> : <OpenInFullIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          )}
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Divider />

      {/* Track-specific content renders here */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </Box>
    </Paper>
  )
}
