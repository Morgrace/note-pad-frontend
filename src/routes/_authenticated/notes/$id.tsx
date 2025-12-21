import {
  createFileRoute,
  useLoaderData,
  useParams,
} from '@tanstack/react-router'

import NoteEditor from '@/components/note-editor'
import { notesService } from '@/lib/services/notes.service'

export const Route = createFileRoute('/_authenticated/notes/$id')({
  component: RouteComponent,
  loader: async ({ params }) => await notesService.getNote(params.id),
})

function RouteComponent() {
  const note = useLoaderData({ from: '/_authenticated/notes/$id' })
  const { id } = useParams({ from: '/_authenticated/notes/$id' })

  const noteTitle = note.data?.note.title || ''
  const noteContent = note.data?.note.content || ''
  return (
    <section>
      <NoteEditor
        mutationFn={(noteData) => notesService.updateNote(id, noteData)}
        title={noteTitle}
        content={noteContent}
      />
    </section>
  )
}
