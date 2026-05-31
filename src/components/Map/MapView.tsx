import { useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Box } from '@mui/material'
import { FloatingPanel } from './FloatingPanel'
import {
  SINGAPORE_CENTER,
  SINGAPORE_DEFAULT_ZOOM,
  type MapMarker,
  type FloatingPanelState,
} from '../../types/map'

// Leaflet's default marker icons break with bundlers — replace with an inline SVG icon
const defaultIcon = L.divIcon({
  className: '',
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24C24 5.373 18.627 0 12 0z"
      fill="#1976d2" stroke="#fff" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="5" fill="#fff"/>
  </svg>`,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
})
L.Marker.prototype.options.icon = defaultIcon

interface MapViewProps {
  markers?: MapMarker[]
}

function MapClickHandler({ onClose }: { onClose: () => void }) {
  useMapEvents({ click: onClose })
  return null
}

export function MapView({ markers = [] }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [floatingPanel, setFloatingPanel] = useState<FloatingPanelState>({
    open: false,
    marker: null,
    screenPosition: null,
  })

  function handleMarkerClick(marker: MapMarker, e: L.LeafletMouseEvent) {
    const containerEl = containerRef.current
    if (!containerEl) return
    const rect = containerEl.getBoundingClientRect()
    setFloatingPanel({
      open: true,
      marker,
      screenPosition: {
        x: e.originalEvent.clientX - rect.left + 12,
        y: e.originalEvent.clientY - rect.top - 12,
      },
    })
  }

  return (
    <Box ref={containerRef} sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <MapContainer
        center={[SINGAPORE_CENTER.lat, SINGAPORE_CENTER.lng]}
        zoom={SINGAPORE_DEFAULT_ZOOM}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onClose={() => setFloatingPanel((s) => ({ ...s, open: false }))} />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.coordinates.lat, marker.coordinates.lng]}
            eventHandlers={{
              click: (e) => handleMarkerClick(marker, e),
            }}
          >
            <Popup>{marker.label ?? marker.id}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <FloatingPanel
        state={floatingPanel}
        onClose={() => setFloatingPanel((s) => ({ ...s, open: false }))}
      />
    </Box>
  )
}
