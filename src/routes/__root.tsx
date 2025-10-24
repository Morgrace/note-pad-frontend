import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { useEffect, useState } from 'react'

import { Toaster } from 'sonner'
import ErrorPage from '../components/error-page'
import Navbar from '../components/navbar'
import NotFound from '../components/not-found'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

import { useAuthStore } from '@/store/auth'
import { SplashScreen } from '@/components/splash-screen'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Write-it-down - Professional Note-Taking for Developers',
      },
      {
        name: 'description',
        content:
          'A powerful markdown editor designed for professionals. Organize your thoughts, code snippets, and documentation with ease.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  notFoundComponent: NotFound,

  errorComponent: ({ error, reset }) => (
    <ErrorPage error={error} reset={reset} />
  ),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const verifyAuth = useAuthStore((state) => state.verifyAuth)

  useEffect(() => {
    verifyAuth()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false)
    }, 3000)
  }, [])

  if (showSplashScreen) {
    return (
      <html lang="en">
        <head>
          <HeadContent />
        </head>
        <body>
          <SplashScreen />
          <Scripts />
        </body>
      </html>
    )
  }
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Navbar />
        {children}
        <Toaster />
        <TanStackDevtools
          config={{
            position: 'bottom-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
