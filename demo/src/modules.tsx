import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import BuildIcon from '@mui/icons-material/Build'
import SensorsIcon from '@mui/icons-material/Sensors'
import PeopleIcon from '@mui/icons-material/People'
import type { AppModule } from '@design-system/types/module'

export const modules: AppModule[] = [
  {
    id: 'incidents',
    label: 'Incidents',
    icon: <WarningAmberIcon fontSize="small" />,
    defaultMode: 'side',
    allowModeToggle: true,
  },
  {
    id: 'maintenance',
    label: 'Maintenance',
    icon: <BuildIcon fontSize="small" />,
    defaultMode: 'side',
    allowModeToggle: true,
  },
  {
    id: 'sensors',
    label: 'Sensors',
    icon: <SensorsIcon fontSize="small" />,
    defaultMode: 'fullscreen',
    allowModeToggle: true,
  },
  {
    id: 'personnel',
    label: 'Personnel',
    icon: <PeopleIcon fontSize="small" />,
    defaultMode: 'side',
    allowModeToggle: false,
  },
]
