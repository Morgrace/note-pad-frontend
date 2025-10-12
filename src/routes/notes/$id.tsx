import {
  createFileRoute,
  useLoaderData,
  useParams,
} from '@tanstack/react-router'

import { getNote, updateNote } from '@/lib/services/notes'
import NoteEditor from '@/components/note-editor'

export const Route = createFileRoute('/notes/$id')({
  component: RouteComponent,
  loader: async ({ params }) => await getNote(params.id),
})

function RouteComponent() {
  const note = useLoaderData({ from: '/notes/$id' })
  const { id } = useParams({ from: '/notes/$id' })

  const noteTitle = note.data?.title || ''
  const noteContent = note.data?.content || ''
  return (
    <section>
      <NoteEditor
        mutationFn={(noteData) => updateNote(id, noteData)}
        title={noteTitle}
        content={noteContent}
      />
    </section>
  )
}
