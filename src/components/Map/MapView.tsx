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

// Leaflet's default marker icons break with bundlers — fix by pointing at the CDN
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

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
