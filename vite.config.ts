import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Only set base path for production builds (GitHub Pages deployment)
  // Local development will work at root path
  base: mode === 'production' ? '/CXR-UX/' : '/',
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true, // Fail if port is already in use
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Increase the warning threshold to silence large chunk warnings
    // (no functional impact; adjust as needed)
    chunkSizeWarningLimit: 1500,
  },
}))
