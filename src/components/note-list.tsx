import { Link } from '@tanstack/react-router'
import { Pencil, Trash } from 'lucide-react'

import { Button } from './ui/button'
import type { AllNotes } from '@/types'

type NoteListProps = { notes: AllNotes }

function NoteList({ notes }: NoteListProps) {
  return (
    <ul className="space-y-2">
      {notes.map((note) => {
        return (
          <li
            key={note.id}
            className="flex justify-between items-center border rounded-sm p-2"
          >
            <div className="flex  flex-col gap-1">
              <span className="">{note.title}</span>
              <span className="text-xs italic">
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Note Actions */}
            <div className="flex items-center justify-center gap-1">
              {/* Edit Note */}
              <Button asChild size="icon-sm" variant="secondary">
                <Link to="/notes/$id" params={{ id: note.id }}>
                  <Pencil />
                </Link>
              </Button>

              {/* Delete Note */}
              <Button
                size="icon-sm"
                variant="destructive"
                className="cursor-pointer"
              >
                <Trash />
              </Button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default NoteList
