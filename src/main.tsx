import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/wex.tokens.css'
import './styles/wex.shadcn-bridge.css'
import './styles/wex.components-bridge.css'
import './index.css'
import App from './App.tsx'
import { initializeTheme } from '@/docs/utils/theme'

// Initialize theme before rendering to prevent flash
initializeTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
