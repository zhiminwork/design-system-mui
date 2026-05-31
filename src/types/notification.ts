export type NotificationSeverity = 'info' | 'warning' | 'error' | 'success'

export interface Notification {
  id: string
  title: string
  message: string
  severity: NotificationSeverity
  timestamp: string   // ISO 8601
  read: boolean
  moduleId?: string   // which module this notification came from
}
