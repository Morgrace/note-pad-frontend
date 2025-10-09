import { createFileRoute } from '@tanstack/react-router'

import NoteEditor from '@/components/note-editor'

export const Route = createFileRoute('/notes/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section>
      <NoteEditor />
    </section>
  )
}
