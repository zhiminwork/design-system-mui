import { Box, Typography, Stack, Chip, Divider } from '@mui/material'

const panels: Record<string, React.ReactNode> = {
  incidents: (
    <Box p={2}>
      <Typography variant="subtitle2" gutterBottom>Active Incidents</Typography>
      <Stack spacing={1.5} mt={1}>
        {[
          { id: '#2045', title: 'Unauthorised access — Gate 3', severity: 'error', time: '1015H' },
          { id: '#2044', title: 'Smoke detected — Level 2', severity: 'warning', time: '0952H' },
          { id: '#2043', title: 'Vehicle overstay — Lot B', severity: 'info', time: '0830H' },
        ].map((inc) => (
          <Box key={inc.id} sx={{ p: 1.5, border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" color="text.secondary">{inc.id}</Typography>
              <Chip label={inc.severity} size="small" color={inc.severity as any} />
            </Stack>
            <Typography variant="body2" mt={0.5}>{inc.title}</Typography>
            <Typography variant="caption" color="text.disabled">{inc.time}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  ),
  maintenance: (
    <Box p={2}>
      <Typography variant="subtitle2" gutterBottom>Scheduled Tasks</Typography>
      <Stack spacing={1.5} mt={1}>
        {[
          { task: 'HVAC Filter Replacement', zone: 'Zone 3', time: '1400H' },
          { task: 'Generator Test Run', zone: 'Sector B', time: '1600H' },
          { task: 'Fire Suppression Check', zone: 'All Zones', time: '1800H' },
        ].map((t, i) => (
          <Box key={i} sx={{ p: 1.5, border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="body2">{t.task}</Typography>
            <Stack direction="row" spacing={1} mt={0.5}>
              <Typography variant="caption" color="text.secondary">{t.zone}</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="caption" color="text.secondary">{t.time}</Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  ),
  sensors: (
    <Box p={2}>
      <Typography variant="subtitle2" gutterBottom>Sensor Status</Typography>
      <Stack spacing={1} mt={1}>
        {[
          { id: '4A', status: 'Normal', value: '22°C' },
          { id: '4B', status: 'Anomaly', value: '38°C' },
          { id: '5A', status: 'Normal', value: '21°C' },
          { id: '5B', status: 'Offline', value: '—' },
        ].map((s) => (
          <Stack key={s.id} direction="row" justifyContent="space-between" alignItems="center"
            sx={{ p: 1.5, border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="body2">Sensor {s.id}</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="caption">{s.value}</Typography>
              <Chip
                label={s.status}
                size="small"
                color={s.status === 'Normal' ? 'success' : s.status === 'Offline' ? 'default' : 'error'}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  ),
  personnel: (
    <Box p={2}>
      <Typography variant="subtitle2" gutterBottom>On Duty</Typography>
      <Stack spacing={1} mt={1}>
        {[
          { name: 'Jane Tan', role: 'Hd A', location: 'Building A' },
          { name: 'Marcus Lim', role: 'Hd B', location: 'Building B' },
          { name: 'Sarah Chen', role: 'Ops', location: 'Control Room' },
        ].map((p) => (
          <Box key={p.name} sx={{ p: 1.5, border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="body2" fontWeight={500}>{p.name}</Typography>
            <Typography variant="caption" color="text.secondary">{p.role} · {p.location}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  ),
}

export function PanelContent({ moduleId }: { moduleId: string }) {
  return <>{panels[moduleId] ?? <Box p={2}><Typography color="text.secondary">No content</Typography></Box>}</>
}
