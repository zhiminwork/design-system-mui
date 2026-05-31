# System Architecture

## Overview

Desktop application built on React + MUI. A persistent top bar sits above a full-screen interactive Mapbox map of Singapore. Module applications open as side panels or full-screen overlays. Clicking map elements opens floating info panels.

---

## Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  TOP BAR                                                            │
│  [Mod1][Mod2][Mod3] ...          [Online] [🔔 3] [Avatar]          │
└─────────────────────────────────────────────────────────────────────┘
┌──────────────┬──────────────────────────────────────────────────────┐
│  APP PANEL   │                                                      │
│  (side mode) │         MAPBOX MAP (Singapore)                       │
│              │                                                      │
│              │    [Floating Panel]  ← appears on marker click       │
│              │                                                      │
└──────────────┴──────────────────────────────────────────────────────┘
                                          [Notification Drawer] →
```

---

## Components

### `<AppLayout />` — root
The single component Tracks mount. Accepts slots for map content and panel content.

| Prop | Type | Description |
|---|---|---|
| `user` | `User` | Logged-in user |
| `online` | `boolean` | System connectivity status |
| `modules` | `AppModule[]` | List of module definitions |
| `notifications` | `Notification[]` | All notifications |
| `mapSlot` | `ReactNode` | `<MapView />` instance |
| `renderPanelContent` | `(moduleId) => ReactNode` | Track renders module UI here |

---

### Top Bar

**Left side — `<ModuleLauncher />`**
- Renders one `IconButton` per `AppModule`
- Active module button is highlighted
- Clicking the active module closes it; clicking another opens it

**Right side (left to right)**
1. `<SystemStatus />` — `Online` / `Offline` chip
2. `<NotificationCentreButton />` — bell icon with unread badge
3. `<ProfileButton />` — avatar button, opens `<Popover>` with user details

---

### Profile Popover
Displays:
- Name + username
- Role (e.g. `Hd A`)
- Shift time (e.g. `1000H – 1200H`)
- Assignment (e.g. `Hd A, Building A`)

Data shape: `User` + `UserShift` types in `src/types/user.ts`.

---

### Notification Centre
- `<NotificationCentreButton />` triggers `<NotificationDrawer />`
- Drawer slides in from the right, sits below the top bar (does not cover it)
- Each item renders as `<NotificationCard />`
- Cards are colour-coded by `severity`: `info` | `warning` | `error` | `success`
- Clicking a card marks it as read

---

### App Panel
Two modes, toggled via the panel header button (if `allowModeToggle: true`):

| Mode | Behaviour |
|---|---|
| `side` | 400px panel anchored left, map shifts right |
| `fullscreen` | Panel covers entire area below top bar |

Only one module open at a time. Opening a new module closes the previous one.

Panel content is provided by the Track via `renderPanelContent(moduleId)`.

---

### Map (`<MapView />`)
- Provider: **Mapbox GL JS**
- Default viewport: Singapore (`103.8198, 1.3521`), zoom 11
- Accepts `markers: MapMarker[]` — Track manages marker data
- Clicking a marker opens `<FloatingPanel />` anchored near the marker
- Tracks can pass a custom `mapStyle` URL for different basemap styles

#### Floating Panel
- Absolute-positioned over the map
- Displays `marker.label` and all `marker.data` key-value pairs
- Tracks replace or extend the content via composition

---

## Data Types

### `User`
```ts
{ id, name, username, role, avatarUrl?, currentShift? }
```

### `UserShift`
```ts
{ startTime, endTime, role, location }
// e.g. { startTime: "1000H", endTime: "1200H", role: "Hd A", location: "Building A" }
```

### `Notification`
```ts
{ id, title, message, severity, timestamp, read, moduleId? }
```

### `AppModule`
```ts
{ id, label, icon, defaultMode: 'side'|'fullscreen', allowModeToggle: boolean }
```

### `MapMarker`
```ts
{ id, coordinates: { lng, lat }, type, label?, data: Record<string, unknown> }
```

---

## How Tracks Use This

```tsx
import {
  AppLayout, MapView, lightTheme, ThemeProvider, CssBaseline
} from '@zhiminwork/design-system-mui'

const modules = [
  { id: 'incidents', label: 'Incidents', icon: <WarningIcon />, defaultMode: 'side', allowModeToggle: true },
]

export function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AppLayout
        user={currentUser}
        online={true}
        modules={modules}
        notifications={notifications}
        onNotificationRead={markRead}
        mapSlot={<MapView accessToken={MAPBOX_TOKEN} markers={markers} />}
        renderPanelContent={(moduleId) => {
          if (moduleId === 'incidents') return <IncidentPanel />
          return null
        }}
      />
    </ThemeProvider>
  )
}
```

---

## Adding a New Module

1. Define an `AppModule` object with `id`, `label`, `icon`, `defaultMode`
2. Add it to the `modules` array passed to `<AppLayout />`
3. Handle it in `renderPanelContent`

No changes to the design system library needed.
