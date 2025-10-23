import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'sonner'

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

    if (!latestContent.trim() && !noteTitle) {
      console.warn('Cannot save an empty note')
      toast.warning('Note cannot be empty')
      return
    }
    mutation.mutate({ title: noteTitle, content: latestContent })
  }, [noteTitle, noteContent])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNoteTitle(e.target.value)

  return (
    <div className="min-h-[80dvh] bg-slate-50">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hover:bg-slate-100 hover:scale-110 transition-all shrink-0"
            >
              <Link to="..">
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" />
              </Link>
            </Button>
            <div className="flex-1 w-full sm:w-auto">
              <Input
                placeholder="Enter note title..."
                value={noteTitle}
                onChange={handleTitleChange}
                name="noteTitle"
                className="text-xl sm:text-2xl md:text-3xl font-bold border-none shadow-none focus-visible:ring-0 px-0 bg-transparent placeholder:text-slate-300"
              />
            </div>
            <Button
              disabled={mutation.isPending}
              onClick={handleSaveNote}
              className="bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-white font-semibold px-4 sm:px-6 md:px-8 w-full sm:w-auto text-sm sm:text-base shrink-0"
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
