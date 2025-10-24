import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from '@tanstack/react-router'
import { toast } from 'sonner'
import { Github } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useAuthStore } from '@/store/auth'

export const Route = createFileRoute('/_auth/login')({
  component: Login,
})

function Login() {
  const navigate = useNavigate()
  const search = useSearch({ from: '/_auth/login' })

  const login = useAuthStore((state) => state.login)
  const isLoading = useAuthStore((state) => state.isLoading)
  const error = useAuthStore((state) => state.error)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const email = formData.get('email')
    const password = formData.get('password')

    try {
      await login(email as string, password as string)

      const redirectTo = (search as any)?.redirect || '/notes'

      navigate({ to: redirectTo })
    } catch (error) {
      console.error('login failed', error)

      toast.error('login failed')
    }
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    window.location.href = '/api/auth/google'
  }

  const handleGithubLogin = () => {
    // TODO: Implement GitHub OAuth
    window.location.href = '/api/auth/github'
  }
  return (
    <div className="flex min-h-screen items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-50">
      <Card className="w-full max-w-md p-5 sm:p-6 md:p-8 shadow-xl border border-slate-200 bg-white">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>
          <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-slate-600 font-medium">
            Sign in to your account
          </p>
        </div>

        <div className="text-red-600 text-sm">{error?.message || ''}</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-2 text-slate-700"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-teal-600 hover:text-teal-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-white font-semibold "
          >
            {isLoading ? 'Signing in . . .' : 'Sign in'}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-sm text-slate-600 font-medium">OR</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="space-y-3">
          <Button
            disabled
            type="button"
            variant="outline"
            className="w-full border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all"
            onClick={handleGoogleLogin}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <Button
            disabled
            type="button"
            variant="outline"
            className="w-full border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all"
            onClick={handleGithubLogin}
          >
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-700">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-teal-600 hover:text-teal-700 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  )
}
