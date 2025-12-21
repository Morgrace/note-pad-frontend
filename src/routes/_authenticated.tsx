import { ProtectedRoute } from '@/components/protected-route'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  component: () => (
    <ProtectedRoute>
      <Outlet />,
    </ProtectedRoute>
  ),
})
