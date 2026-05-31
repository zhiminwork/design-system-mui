import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@design-system': path.resolve(__dirname, '../src'),
      // Ensure MUI and emotion always resolve from demo's node_modules
      '@mui/material': path.resolve(__dirname, 'node_modules/@mui/material'),
      '@mui/system': path.resolve(__dirname, 'node_modules/@mui/system'),
      '@mui/icons-material': path.resolve(__dirname, 'node_modules/@mui/icons-material'),
      '@emotion/react': path.resolve(__dirname, 'node_modules/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, 'node_modules/@emotion/styled'),
      'leaflet': path.resolve(__dirname, 'node_modules/leaflet'),
      'react-leaflet': path.resolve(__dirname, 'node_modules/react-leaflet'),
    },
  },
})
