import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { ChevronLeft, LucideAsterisk } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import NoteMarkupEditor from './note-markup-editor'

import { Button } from './ui/button'
import { Input } from './ui/input'

import type { MDXEditorMethods } from '@mdxeditor/editor'

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
  const [noteTitle, setNoteTitle] = useState(title || '')
  const [noteContent, setNoteContent] = useState(content || '')
  const isFirstRender = useRef(true)
  const editorRef = useRef<MDXEditorMethods>(null)

  const queryClient = useQueryClient()
  const navigate = useNavigate()

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

  const handleContentChange = useCallback((markdown: string) => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setNoteContent(markdown)
  }, [])

  const handleSaveNote = useCallback(() => {
    const latestContent = editorRef.current?.getMarkdown() || noteContent
    mutation.mutate({ title: noteTitle, content: latestContent })
  }, [noteTitle, noteContent])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNoteTitle(e.target.value)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hover:bg-slate-100 hover:scale-110 transition-all"
            >
              <Link to="..">
                <ChevronLeft className="h-6 w-6 text-slate-700" />
              </Link>
            </Button>
            <div className="flex-1">
              <Input
                placeholder="Enter note title..."
                value={noteTitle}
                onChange={handleTitleChange}
                name="noteTitle"
                className="text-3xl font-bold border-none shadow-none focus-visible:ring-0 px-0 bg-transparent placeholder:text-slate-300"
              />
            </div>
            <Button
              disabled={mutation.isPending}
              onClick={handleSaveNote}
              className="bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-white font-semibold px-8"
            >
              {mutation.isPending ? 'Saving...' : 'Save Note'}
            </Button>
          </div>
          <div className="h-px bg-slate-200"></div>
        </div>

        {/* Editor Section */}
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
          <NoteMarkupEditor
            ref={editorRef}
            onContentChange={handleContentChange}
            content={noteContent}
          />
        </div>
      </div>
    </div>
  )
}
export default NoteEditor
