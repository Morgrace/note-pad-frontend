import { MDXEditor, headingsPlugin } from '@mdxeditor/editor'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

import '@mdxeditor/editor/style.css'

type NoteData = {
  title: string
  content: string
}

type NoteEditorProps = {
  mutationFn?: (note: NoteData) => Promise<any>
  title?: string
  content?: string
}

function NoteEditor({ mutationFn, title, content }: NoteEditorProps) {
  const [note, setNote] = useState({
    title: title || 'title',
    content: content || '#Hello *World*',
  })
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      })
      navigate({
        to: '/notes',
      })
    },
    onError: (err) => {
      console.error('failed', err.message)
    },
  })

  const isFirstRender = useRef(true)
  return (
    <div className="grid px-10 py-5 h-dvh grid-rows-[min-content_1fr] gap-2">
      <div className="flex gap-2">
        <Button asChild variant="link" size={'icon'}>
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

        {/* Save Button */}
        <Button
          disabled={mutation.isPending}
          onClick={() => mutation.mutate(note)}
        >
          {mutation.isPending ? 'Saving...' : 'Save'}
        </Button>
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
export default NoteEditor
