import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { StickyNote, Shield, Zap, ArrowRight, Search, Download } from 'lucide-react'
import { useAuthStore } from '@/store/auth'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-10 sm:py-16 md:py-20">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Icon */}
          <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
            <div className="relative">
              <div className="bg-teal-500 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <StickyNote className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-white" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-900 tracking-tight px-4">
              Write-it-down
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-slate-600 px-4">
              Professional Note-Taking for Developers
            </p>
          </div>

          {/* Tagline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed px-4">
            A powerful markdown editor designed for professionals.
            Organize your thoughts, code snippets, and documentation with ease.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6 sm:pt-8 px-4">
            {user ? (
              <Link to="/notes" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 rounded-lg font-semibold group text-white"
                >
                  Open My Notes
                  <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 rounded-lg font-semibold group text-white"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-white text-slate-700 border-2 border-slate-300 hover:bg-slate-50 shadow-md hover:shadow-lg transition-all hover:scale-105 text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 rounded-lg font-semibold"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 pt-12 sm:pt-16 md:pt-20 max-w-5xl mx-auto px-4">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-5 sm:p-6 md:p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:scale-105 group">
              <div className="bg-teal-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-teal-200 transition-colors">
                <StickyNote className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-teal-600" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">Rich Markdown</h3>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Full-featured markdown editor with syntax highlighting, tables, and code blocks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-5 sm:p-6 md:p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:scale-105 group">
              <div className="bg-blue-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-blue-200 transition-colors">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">Secure & Private</h3>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Your notes are encrypted and secure. Only you have access to your data.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-5 sm:p-6 md:p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:scale-105 group sm:col-span-2 md:col-span-1">
              <div className="bg-amber-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-amber-200 transition-colors">
                <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-amber-600" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">Lightning Fast</h3>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Instant search, quick filters, and blazing-fast performance. Never wait.
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="pt-10 sm:pt-12 md:pt-16 max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl p-5 sm:p-6 md:p-8 shadow-lg border border-slate-200">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-5 md:mb-6 text-center">
                Everything You Need
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="bg-teal-100 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-slate-900 mb-1">Powerful Search</h4>
                    <p className="text-slate-600 text-xs sm:text-sm">Find any note instantly with our advanced search and filtering.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="bg-teal-100 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-slate-900 mb-1">Export Options</h4>
                    <p className="text-slate-600 text-xs sm:text-sm">Download your notes in multiple formats for easy sharing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="bg-teal-100 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                    <StickyNote className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-slate-900 mb-1">Smart Organization</h4>
                    <p className="text-slate-600 text-xs sm:text-sm">Tag and categorize your notes for perfect organization.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="bg-teal-100 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-slate-900 mb-1">Always Secure</h4>
                    <p className="text-slate-600 text-xs sm:text-sm">Bank-level encryption keeps your data safe and private.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
