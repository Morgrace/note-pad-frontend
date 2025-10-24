import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail, ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export const Route = createFileRoute('/_auth/forgot-password')({
  component: ForgotPassword,
})

function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement forgot password logic
    console.log('Password reset requested for:', email)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-slate-50">
        <Card className="w-full max-w-md p-8 shadow-xl border border-slate-200 bg-white">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
              <Check className="h-8 w-8 text-teal-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Check Your Email
            </h1>
            <p className="text-slate-600 mb-6">
              We've sent password reset instructions to
            </p>
            <p className="text-teal-600 font-semibold mb-8">
              {email}
            </p>
            <p className="text-sm text-slate-600 mb-8">
              Click the link in the email to reset your password. If you don't see the email, check your spam folder.
            </p>
            <Link to="/login">
              <Button className="w-full bg-teal-500 hover:bg-teal-600 shadow-lg text-white font-semibold">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md p-8 shadow-xl border border-slate-200 bg-white">
        <div className="mb-8">
          <Link to="/login">
            <Button
              variant="ghost"
              className="mb-4 text-slate-600 hover:text-slate-900 hover:bg-slate-100 -ml-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
          </Link>
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
              <Mail className="h-8 w-8 text-teal-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Forgot Password?
            </h1>
            <p className="text-slate-600">
              No worries! Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-slate-700">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-white font-semibold"
          >
            <Mail className="mr-2 h-4 w-4" />
            Send Reset Instructions
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Remember your password?{' '}
            <Link
              to="/login"
              className="font-semibold text-teal-600 hover:text-teal-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
