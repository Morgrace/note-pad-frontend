import { createFileRoute } from '@tanstack/react-router'

import NoteEditor from '@/components/note-editor'
import { notesService } from '@/lib/services/notes.service'

export const Route = createFileRoute('/_authenticated/notes/new/')({
  component: PageCreateNote,
})

function PageCreateNote() {
  return (
    <section>
      <NoteEditor mutationFn={notesService.createNote} />
    </section>
  )
}
