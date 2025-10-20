import { createFileRoute } from '@tanstack/react-router'

import NoteEditor from '@/components/note-editor'
import { createNote } from '@/lib/services/notesApi'

export const Route = createFileRoute('/_authenticated/notes/new/')({
  component: PageCreateNote,
})

function PageCreateNote() {
  return (
    <section>
      <NoteEditor mutationFn={createNote} />
    </section>
  )
}
