export interface UserShift {
  startTime: string   // e.g. "1000H"
  endTime: string     // e.g. "1200H"
  role: string        // e.g. "Hd A"
  location: string    // e.g. "Building A"
}

export interface User {
  id: string
  name: string
  username: string
  role: string        // e.g. "Hd A"
  avatarUrl?: string
  currentShift?: UserShift
}
