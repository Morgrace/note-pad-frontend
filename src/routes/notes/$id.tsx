import { createFileRoute, Link } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { MDXEditor, headingsPlugin } from '@mdxeditor/editor'
import { ChevronLeft } from 'lucide-react'

import '@mdxeditor/editor/style.css'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/notes/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const [note, setNote] = useState({
    title: 'title',
    content: '#Hello *World*',
  })
  const isFirstRender = useRef(true)
  return (
    <div className="grid px-10 py-5 h-dvh grid-rows-[min-content_1fr] gap-2">
      <div className="flex gap-2">
        <Button asChild variant={'link'} size={'icon'}>
          <Link to="..">
            <ChevronLeft />
          </Link>
        </Button>
        <Input
          placeholder="Title"
          value={note.title}
          onChange={(e) =>
            setNote((previousNote) => ({
              ...previousNote,
              title: e.target.value,
            }))
          }
        />
        <Button>Save </Button>
      </div>
      <MDXEditor
        className="border rounded-md "
        markdown={note.content}
        onChange={(markdown) => {
          if (isFirstRender.current) {
            isFirstRender.current = false
            return
          }
          setNote((previousNote) => ({
            ...previousNote,
            content: markdown,
          }))
        }}
        plugins={[headingsPlugin()]}
      />
    </div>
  )
}
