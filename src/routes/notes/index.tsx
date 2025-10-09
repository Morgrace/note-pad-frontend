import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/notes/')({
  component: Notes,
})

const notes = [
  { title: 'title 1', id: '1' },
  { title: 'title 2', id: '2' },
  { title: 'title 3', id: '3' },
  { title: 'title 4', id: '4' },
  { title: 'title 5', id: '5' },
]
function Notes() {
  return (
    <div className="p-4 grid overflow-y-auto gap-y-4 grid-rows-[min-content_1fr]">
      <Card className="">
        <CardHeader>
          <CardTitle>Notes</CardTitle>
          <CardAction>
            <Button size={'sm'}>
              <Plus /> Add Note
            </Button>
          </CardAction>
        </CardHeader>
      </Card>

      <Card>
        <CardContent>
          <ul>
            {notes.map((note) => (
              <li key={note.id} className="hover:to-blue-500">
                <Link to="/notes/$id" params={{ id: note.id }}>
                  {note.title}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
