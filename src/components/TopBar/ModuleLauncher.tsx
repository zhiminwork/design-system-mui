import { Stack, IconButton, Tooltip } from '@mui/material'
import type { AppModule, AppPanelState } from '../../types/module'

interface ModuleLauncherProps {
  modules: AppModule[]
  activePanel: AppPanelState
  onModuleClick: (module: AppModule) => void
}

export function ModuleLauncher({ modules, activePanel, onModuleClick }: ModuleLauncherProps) {
  return (
    <Stack direction="row" spacing={0.5}>
      {modules.map((mod) => (
        <Tooltip key={mod.id} title={mod.label} placement="bottom">
          <IconButton
            onClick={() => onModuleClick(mod)}
            color={activePanel.moduleId === mod.id ? 'primary' : 'default'}
            size="small"
            sx={{
              borderRadius: 1,
              bgcolor: activePanel.moduleId === mod.id ? 'action.selected' : 'transparent',
            }}
          >
            {mod.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  )
}
