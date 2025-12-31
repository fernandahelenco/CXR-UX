import * as React from 'react'
import { DocsRoutes } from '@/docs/routes'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

/**
 * Error Boundary to catch rendering errors
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Application Error</h1>
          <pre className="bg-red-50 dark:bg-red-900/20 p-4 rounded overflow-auto">
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Reload Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Main App component
 * Renders the docs site routes
 */
function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <DocsRoutes />
        <Toaster position="top-right" />
      </TooltipProvider>
    </ErrorBoundary>
  )
}

export default App
