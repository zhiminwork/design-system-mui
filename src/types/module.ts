export type AppPanelMode = 'side' | 'fullscreen'

export interface AppModule {
  id: string
  label: string
  icon: React.ReactNode
  defaultMode: AppPanelMode   // preferred opening mode
  allowModeToggle: boolean    // user can switch between side and fullscreen
}

export interface AppPanelState {
  moduleId: string | null
  mode: AppPanelMode
}
