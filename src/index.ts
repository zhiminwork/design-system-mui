// Layout
export { AppLayout } from './layouts/AppLayout'

// TopBar
export { TopBar, TOP_BAR_HEIGHT } from './components/TopBar/TopBar'
export { ModuleLauncher } from './components/TopBar/ModuleLauncher'
export { SystemStatus } from './components/TopBar/SystemStatus'

// Notifications
export { NotificationDrawer } from './components/NotificationCentre/NotificationDrawer'
export { NotificationCard } from './components/NotificationCentre/NotificationCard'
export { NotificationCentreButton } from './components/NotificationCentre/NotificationCentreButton'

// Profile
export { ProfileButton } from './components/Profile/ProfileButton'

// Map
export { MapView } from './components/Map/MapView'
export { FloatingPanel } from './components/Map/FloatingPanel'

// App Panel
export { AppPanel, SIDE_PANEL_WIDTH } from './components/AppPanel/AppPanel'

// Types
export type { User, UserShift } from './types/user'
export type { Notification, NotificationSeverity } from './types/notification'
export type { AppModule, AppPanelState, AppPanelMode } from './types/module'
export type { MapMarker, MapCoordinates, MapMarkerType, FloatingPanelState } from './types/map'
export { SINGAPORE_CENTER, SINGAPORE_DEFAULT_ZOOM } from './types/map'

// Theme
export { theme, lightTheme, darkTheme } from './theme/theme'
export { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
export type { Theme, ThemeOptions } from '@mui/material'

// MUI component pass-throughs
export { Button, TextField, Typography, Box, Stack, Grid } from '@mui/material'
export type { ButtonProps, TextFieldProps, TypographyProps } from '@mui/material'
