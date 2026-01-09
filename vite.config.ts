import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Only set base path for production builds (GitHub Pages deployment)
  // Local development will work at root path
  // Note: GitHub Pages paths are case-sensitive; match the repo name exactly (CXR-UX).
  base: mode === 'production' ? '/CXR-UX/' : '/',
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true, // Fail if port is already in use
    hmr: {
      overlay: true,  // Show errors as overlay
    },
    watch: {
      usePolling: true,  // Enable polling for file changes
      interval: 100,     // Check for changes every 100ms
    },
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
