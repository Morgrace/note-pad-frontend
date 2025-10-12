import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Pencil, Trash } from 'lucide-react'

import { Button } from './ui/button'
import type { AllNotes } from '@/types'
import { deleteNote } from '@/lib/services/notes'

type NoteListProps = { notes: AllNotes }

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteNote,
    async onMutate(deleteId) {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['notes'] })

      // Snapshot previous value
      const previousNotes = queryClient.getQueryData(['notes'])

      // Optimistically remove the note
      queryClient.setQueryData(['notes'], (old) => {
        if(!old?.data) return old
        
        const data: AllNotes = old.data
        return {
          ...old,
          data: data.filter((note) => note.id !== deleteId),
        }
      })

      // return previousNotes to use onError
      return {
        previousNotes,
      }
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      })
    },
    onError(error, deleteId, context) {
      // Rollback on error
      queryClient.setQueryData(['notes'], context?.previousNotes)
      console.error(error.message)
    },
  })
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
                disabled={mutation.isPending}
                onClick={() => mutation.mutate(note.id)}
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
