import { createFileRoute, Outlet } from '@tanstack/react-router'

import { GuestOnlyRoute } from '@/components/protected-route'

export const Route = createFileRoute('/_guest')({
  component: () => (
    <GuestOnlyRoute redirectTo="/notes">
      <Outlet />
    </GuestOnlyRoute>
  ),
})
