import { useState } from 'react'
import {
  IconButton, Popover, Stack, Typography, Avatar, Divider, Box
} from '@mui/material'
import type { User } from '../../types/user'

interface ProfileButtonProps {
  user: User
}

export function ProfileButton({ user }: ProfileButtonProps) {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)

  return (
    <>
      <IconButton size="small" onClick={(e) => setAnchor(e.currentTarget)}>
        <Avatar
          src={user.avatarUrl}
          alt={user.name}
          sx={{ width: 32, height: 32, fontSize: 14 }}
        >
          {user.name[0]}
        </Avatar>
      </IconButton>

      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ p: 2, minWidth: 240 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar src={user.avatarUrl} alt={user.name} sx={{ width: 40, height: 40 }}>
              {user.name[0]}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>{user.name}</Typography>
              <Typography variant="caption" color="text.secondary">@{user.username}</Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 1.5 }} />

          <Stack spacing={0.5}>
            <ProfileRow label="Role" value={user.role} />
            {user.currentShift && (
              <>
                <ProfileRow
                  label="Shift"
                  value={`${user.currentShift.startTime} – ${user.currentShift.endTime}`}
                />
                <ProfileRow label="Assignment" value={`${user.currentShift.role}, ${user.currentShift.location}`} />
              </>
            )}
          </Stack>
        </Box>
      </Popover>
    </>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography variant="caption" fontWeight={500}>{value}</Typography>
    </Stack>
  )
}
