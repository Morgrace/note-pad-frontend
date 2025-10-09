import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="flex h-screen items-center justify-center flex-col gap-4">
      <h1 className="text-xl font-bold">Notes made for Developers</h1>
      <Link to="/notes">
        <Button size="sm">Get Started</Button>
      </Link>
    </div>
  )
}
