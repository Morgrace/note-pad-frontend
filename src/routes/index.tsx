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
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="bg-teal-500 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <StickyNote className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-black text-slate-900 tracking-tight">
              NotePad
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-slate-600">
              Professional Note-Taking for Developers
            </p>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            A powerful markdown editor designed for professionals.
            Organize your thoughts, code snippets, and documentation with ease.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            {user ? (
              <Link to="/notes">
                <Button
                  size="lg"
                  className="bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-xl px-10 py-7 rounded-lg font-semibold group text-white"
                >
                  Open My Notes
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-xl px-10 py-7 rounded-lg font-semibold group text-white"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white text-slate-700 border-2 border-slate-300 hover:bg-slate-50 shadow-md hover:shadow-lg transition-all hover:scale-105 text-xl px-10 py-7 rounded-lg font-semibold"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 pt-20 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:scale-105 group">
              <div className="bg-teal-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-colors">
                <StickyNote className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Rich Markdown</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Full-featured markdown editor with syntax highlighting, tables, and code blocks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:scale-105 group">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Secure & Private</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Your notes are encrypted and secure. Only you have access to your data.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:scale-105 group">
              <div className="bg-amber-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors">
                <Zap className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Lightning Fast</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Instant search, quick filters, and blazing-fast performance. Never wait.
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="pt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Everything You Need
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-lg flex-shrink-0">
                    <Search className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Powerful Search</h4>
                    <p className="text-slate-600 text-sm">Find any note instantly with our advanced search and filtering.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-lg flex-shrink-0">
                    <Download className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Export Options</h4>
                    <p className="text-slate-600 text-sm">Download your notes in multiple formats for easy sharing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-lg flex-shrink-0">
                    <StickyNote className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Smart Organization</h4>
                    <p className="text-slate-600 text-sm">Tag and categorize your notes for perfect organization.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-lg flex-shrink-0">
                    <Shield className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Always Secure</h4>
                    <p className="text-slate-600 text-sm">Bank-level encryption keeps your data safe and private.</p>
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
