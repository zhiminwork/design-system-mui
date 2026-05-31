import { Stack, IconButton, Tooltip, Box } from '@mui/material'
import type { AppModule, AppPanelState } from '../../types/module'

interface ModuleLauncherProps {
  modules: AppModule[]
  activePanel: AppPanelState
  onModuleClick: (module: AppModule) => void
}

export function ModuleLauncher({ modules, activePanel, onModuleClick }: ModuleLauncherProps) {
  return (
    <Stack direction="row" spacing={0.5}>
      {modules.map((mod) => {
        const isActive = activePanel.moduleId === mod.id
        return (
          <Tooltip key={mod.id} title={mod.label} placement="bottom">
            <Box>
              <IconButton
                onClick={() => onModuleClick(mod)}
                size="medium"
                sx={{
                  borderRadius: 1.5,
                  p: 1.25,
                  color: isActive ? 'primary.contrastText' : 'rgba(255,255,255,0.75)',
                  bgcolor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.12)',
                    color: 'white',
                  },
                }}
              >
                {mod.icon}
              </IconButton>
            </Box>
          </Tooltip>
        )
      })}
    </Stack>
  )
}
