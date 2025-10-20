import { Link } from '@tanstack/react-router'
import { Home, Search } from 'lucide-react'
import { Button } from './ui/button'

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-gray-200">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="h-24 w-24 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="shadow-md">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/notes">
                <span className="mr-2">📝</span>
                View Notes
              </Link>
            </Button>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 text-sm text-gray-600">
          <p className="mb-2">Looking for something specific?</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="hover:text-blue-600 hover:underline transition-colors"
            >
              Home
            </Link>
            <Link
              to="/notes"
              className="hover:text-blue-600 hover:underline transition-colors"
            >
              All Notes
            </Link>
            <Link
              to="/notes/new"
              className="hover:text-blue-600 hover:underline transition-colors"
            >
              Create Note
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
