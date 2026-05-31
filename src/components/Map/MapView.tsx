import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Box } from '@mui/material'
import { FloatingPanel } from './FloatingPanel'
import {
  SINGAPORE_CENTER,
  SINGAPORE_DEFAULT_ZOOM,
  type MapMarker,
  type FloatingPanelState,
} from '../../types/map'

interface MapViewProps {
  accessToken: string
  markers?: MapMarker[]
  // Tracks can pass a custom style URL; defaults to standard Mapbox streets
  mapStyle?: string
}

export function MapView({
  accessToken,
  markers = [],
  mapStyle = 'mapbox://styles/mapbox/streets-v12',
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markerRefs = useRef<Record<string, mapboxgl.Marker>>({})

  const [floatingPanel, setFloatingPanel] = useState<FloatingPanelState>({
    open: false,
    marker: null,
    screenPosition: null,
  })

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    mapboxgl.accessToken = accessToken

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: mapStyle,
      center: [SINGAPORE_CENTER.lng, SINGAPORE_CENTER.lat],
      zoom: SINGAPORE_DEFAULT_ZOOM,
    })

    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [accessToken, mapStyle])

  // Sync markers onto the map
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // Remove markers no longer in props
    Object.keys(markerRefs.current).forEach((id) => {
      if (!markers.find((m) => m.id === id)) {
        markerRefs.current[id].remove()
        delete markerRefs.current[id]
      }
    })

    // Add new markers
    markers.forEach((marker) => {
      if (markerRefs.current[marker.id]) return

      const el = document.createElement('div')
      el.dataset.markerId = marker.id

      const mb = new mapboxgl.Marker(el)
        .setLngLat([marker.coordinates.lng, marker.coordinates.lat])
        .addTo(map)

      el.addEventListener('click', (e) => {
        e.stopPropagation()
        const point = map.project([marker.coordinates.lng, marker.coordinates.lat])
        setFloatingPanel({
          open: true,
          marker,
          screenPosition: { x: point.x + 12, y: point.y - 12 },
        })
      })

      markerRefs.current[marker.id] = mb
    })
  }, [markers])

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <Box ref={containerRef} sx={{ width: '100%', height: '100%' }} />
      <FloatingPanel
        state={floatingPanel}
        onClose={() => setFloatingPanel((s) => ({ ...s, open: false }))}
      />
    </Box>
  )
}
