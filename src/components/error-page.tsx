import { Link } from '@tanstack/react-router'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'
import { Button } from './ui/button'

type ErrorPageProps = {
  title?: string
  message?: string
  error?: Error
  reset?: () => void
}

function ErrorPage({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again later.',
  error,
  reset,
}: ErrorPageProps) {
  const handleRefresh = () => {
    if (reset) {
      reset()
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-16 w-16 text-red-600" />
            </div>
            {/* Pulse animation circles */}
            <div className="absolute inset-0 w-32 h-32 bg-red-100 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg border border-red-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 text-lg mb-6">{message}</p>

          {/* Error Details (if in development) */}
          {error && process.env.NODE_ENV === 'development' && (
            <div className="mt-6 mb-6 p-4 bg-red-50 rounded-lg border border-red-200 text-left">
              <p className="text-sm font-semibold text-red-800 mb-2">
                Error Details:
              </p>
              <pre className="text-xs text-red-700 overflow-auto whitespace-pre-wrap">
                {error.message}
              </pre>
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-xs text-red-600 cursor-pointer hover:text-red-800">
                    Stack trace
                  </summary>
                  <pre className="text-xs text-red-600 mt-2 overflow-auto whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleRefresh}
              size="lg"
              variant="default"
              className="shadow-md bg-red-600 hover:bg-red-700"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Try Again
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-8 bg-white/80 backdrop-blur rounded-lg p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-3">
            Still having issues?
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <button
              onClick={handleRefresh}
              className="text-blue-600 hover:underline"
            >
              Refresh the page
            </button>
            <span className="text-gray-400">•</span>
            <button
              onClick={() => window.history.back()}
              className="text-blue-600 hover:underline"
            >
              Go back
            </button>
            <span className="text-gray-400">•</span>
            <Link to="/notes" className="text-blue-600 hover:underline">
              View your notes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
