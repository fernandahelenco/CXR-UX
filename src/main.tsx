import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/wex.tokens.css'
import './styles/wex.shadcn-bridge.css'
import './index.css'
import App from './App.tsx'
import { initializeTheme } from '@/docs/utils/theme'

// #region agent log
fetch('http://127.0.0.1:7243/ingest/cfb597a8-c124-40f4-8323-a95d1a296ffa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:11',message:'main.tsx executing',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H5'})}).catch(()=>{});
// #endregion

// Initialize theme before rendering to prevent flash
initializeTheme()

// #region agent log
fetch('http://127.0.0.1:7243/ingest/cfb597a8-c124-40f4-8323-a95d1a296ffa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:19',message:'About to createRoot',data:{rootEl:!!document.getElementById('root')},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H5'})}).catch(()=>{});
// #endregion

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
