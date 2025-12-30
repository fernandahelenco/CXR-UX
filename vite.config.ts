import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/CXR-UX/', // GitHub Pages base path
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
})
