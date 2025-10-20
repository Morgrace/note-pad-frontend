import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export const Route = createFileRoute('/(auth)/signup')({
  component: Signup,
})

function Signup() {
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const passwordConfirm = formData.get('passwordConfirm')

    if (password !== passwordConfirm) {
      setError('Passwords do not match')
      return
    }

    // TODO: Implement signup logic
    console.log('Signup attempt:', { name, email, password })
  }

  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth
    window.location.href = '/api/auth/google'
  }

  const handleGithubSignup = () => {
    // TODO: Implement GitHub OAuth
    window.location.href = '/api/auth/github'
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md p-8 shadow-xl border border-slate-200 bg-white">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Create Account
          </h1>
          <p className="mt-2 text-slate-600 font-medium">
            Get started with your free account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2 text-slate-700">
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
              className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-slate-700">
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
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2 text-slate-700"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
              className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-semibold mb-2 text-slate-700"
            >
              Confirm Password
            </label>
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
              className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-white font-semibold">
            Sign Up
          </Button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-sm text-slate-600 font-medium">OR</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all"
            onClick={handleGoogleSignup}
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
            type="button"
            variant="outline"
            className="w-full border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all"
            onClick={handleGithubSignup}
          >
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-700">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-teal-600 hover:text-teal-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  )
}
