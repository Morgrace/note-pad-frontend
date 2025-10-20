import { Link, useNavigate } from '@tanstack/react-router'
import { LogOut, User, StickyNote } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { useAuthStore } from '@/store/auth'

function Navbar() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate({ to: '/login' })
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'U'
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900 shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-transform hover:scale-105"
          >
            <div className="bg-teal-500 p-2 rounded-lg shadow-lg group-hover:bg-teal-600 transition-all">
              <StickyNote className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              NotePad
            </span>
          </Link>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 transition-all px-4 py-2 rounded-lg shadow-lg group border border-slate-700"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {getInitials(user.firstName, user.lastName)}
                  </div>
                  {/* Name */}
                  <span className="text-white font-medium hidden sm:block">
                    {user.firstName} {user.lastName}
                  </span>
                  {/* Dropdown Arrow */}
                  <svg
                    className={`w-4 h-4 text-white transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowDropdown(false)}
                    />
                    {/* Menu */}
                    <div className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-2xl overflow-hidden z-20 border border-slate-700">
                      {/* User Info */}
                      <div className="bg-slate-900 p-4 border-b border-slate-700">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            {getInitials(user.firstName, user.lastName)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold truncate">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-slate-400 text-sm truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/notes"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors group"
                          onClick={() => setShowDropdown(false)}
                        >
                          <StickyNote className="h-5 w-5 text-teal-400 group-hover:scale-110 transition-transform" />
                          <span className="text-slate-200 font-medium">
                            My Notes
                          </span>
                        </Link>

                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors group"
                          onClick={() => setShowDropdown(false)}
                        >
                          <User className="h-5 w-5 text-teal-400 group-hover:scale-110 transition-transform" />
                          <span className="text-slate-200 font-medium">
                            Profile
                          </span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors group"
                        >
                          <LogOut className="h-5 w-5 text-red-400 group-hover:scale-110 transition-transform" />
                          <span className="text-slate-200 font-medium">
                            Logout
                          </span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  variant="ghost"
                  className="text-white hover:bg-slate-800 shadow-lg font-medium border border-slate-700"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-teal-500 text-white hover:bg-teal-600 shadow-lg font-medium hover:scale-105 transition-transform"
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
