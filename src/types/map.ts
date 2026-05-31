export interface MapCoordinates {
  lng: number
  lat: number
}

export type MapMarkerType = string  // extensible per track (e.g. 'incident', 'asset', 'zone')

export interface MapMarker {
  id: string
  coordinates: MapCoordinates
  type: MapMarkerType
  label?: string
  data: Record<string, unknown>   // arbitrary payload shown in FloatingPanel
}

export interface FloatingPanelState {
  open: boolean
  marker: MapMarker | null
  screenPosition: { x: number; y: number } | null
}

// Singapore bounding box — default map viewport
export const SINGAPORE_CENTER: MapCoordinates = { lng: 103.8198, lat: 1.3521 }
export const SINGAPORE_DEFAULT_ZOOM = 11
