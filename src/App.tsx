import { DocsRoutes } from '@/docs/routes'
import { Toaster } from '@/components/ui/sonner'

/**
 * Main App component
 * Renders the docs site routes
 */
function App() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/cfb597a8-c124-40f4-8323-a95d1a296ffa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:12',message:'App component rendering',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H5'})}).catch(()=>{});
  // #endregion
  return (
    <>
      <DocsRoutes />
      <Toaster />
    </>
  )
}

export default App
