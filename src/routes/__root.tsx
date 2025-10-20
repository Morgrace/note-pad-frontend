import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { useEffect } from 'react'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import NotFound from '../components/not-found'
import ErrorPage from '../components/error-page'
import Navbar from '../components/navbar'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

import { useAuthStore } from '@/store/auth'

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
        title: 'My Note Pad',
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
  const verifyAuth = useAuthStore((state) => state.verifyAuth)

  useEffect(() => {
    verifyAuth()
  }, [])
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="h-dvh">
        <Navbar />
        {children}
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
