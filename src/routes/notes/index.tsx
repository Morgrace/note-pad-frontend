import { Link, createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

import type { AllNotes } from '@/types'

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import NoteList from '@/components/note-list'
import { Button } from '@/components/ui/button'
import { getNotes } from '@/lib/services/notes'

export const Route = createFileRoute('/notes/')({
  component: PageNotes,
})

function PageNotes() {
  const { isPending, error, data } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  })
  const notes: AllNotes = data?.data || []

  if (isPending) return <div>Loading ...</div>
  if (error) return <div>{error.message}</div>
  return (
    <div className="p-4 grid overflow-y-auto gap-y-4 grid-rows-[min-content_1fr]">
      <Card className="">
        <CardHeader>
          <CardTitle>Notes</CardTitle>
          <CardAction>
            <Button asChild size={'sm'}>
              <Link to="/notes/new">
                <Plus /> Add Note
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
      </Card>

      <Card>
        <CardContent>
          {notes.length === 0 && (
            <div className="flex justify-center items-center">
              Empty Note Pad
            </div>
          )}
          <NoteList notes={notes} />
        </CardContent>
      </Card>
    </div>
  )
}
