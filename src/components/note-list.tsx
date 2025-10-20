import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Pencil, Trash, Download, Star, Tag } from 'lucide-react'
import { useState } from 'react'

import { Button } from './ui/button'
import type { AllNotes } from '@/types'
import { deleteNote } from '@/lib/services/notesApi'

type NoteListProps = { notes: AllNotes }

function NoteList({ notes }: NoteListProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
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
        if (!old?.data) return old

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

  const toggleFavorite = (noteId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(noteId)) {
        newFavorites.delete(noteId)
      } else {
        newFavorites.add(noteId)
      }
      return newFavorites
    })
  }

  const handleDownload = (note: AllNotes[0]) => {
    // TODO: Implement download functionality
    console.log('Download note:', note.id)
  }
  return (
    <ul className="space-y-4">
      {notes.map((note) => {
        const isFavorite = favorites.has(note.id)
        return (
          <li
            key={note.id}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-teal-300 hover:scale-[1.01] relative overflow-hidden"
          >
            {/* Favorite Badge */}
            {isFavorite && (
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className="absolute top-3 right-[-20px] bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold py-1 px-8 rotate-45 shadow-lg">
                  Favorite
                </div>
              </div>
            )}

            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <Link
                  to="/notes/$id"
                  params={{ id: note.id }}
                  className="flex-1 min-w-0 mr-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 truncate group-hover:text-teal-600 transition-all mb-2">
                        {note.title || 'Untitled Note'}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                        <div className="flex items-center gap-1.5">
                          <div className="w-7 h-7 bg-teal-50 rounded-lg flex items-center justify-center">
                            <svg
                              className="h-3.5 w-3.5 text-teal-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <span>
                            {new Date(note.createdAt).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              },
                            )}
                          </span>
                        </div>
                        {/* Mock Tags - UI only */}
                        <div className="flex items-center gap-1">
                          <Tag className="h-3.5 w-3.5 text-teal-500" />
                          <span className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold">
                            Personal
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Favorite Button */}
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className={`${
                    isFavorite
                      ? 'text-amber-500 hover:text-amber-600 hover:bg-amber-50'
                      : 'text-slate-400 hover:text-amber-500 hover:bg-amber-50'
                  } hover:scale-110 transition-all shadow-sm`}
                  onClick={() => toggleFavorite(note.id)}
                >
                  <Star
                    className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`}
                  />
                </Button>
              </div>

              {/* Note Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                {/* Edit Note */}
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 transition-all flex items-center gap-2"
                >
                  <Link to="/notes/$id" params={{ id: note.id }}>
                    <Pencil className="h-4 w-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </Link>
                </Button>

                {/* Download Note */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all flex items-center gap-2"
                  onClick={() => handleDownload(note)}
                >
                  <Download className="h-4 w-4" />
                  <span className="text-sm font-medium">Download</span>
                </Button>

                {/* Delete Note */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all flex items-center gap-2 ml-auto"
                  disabled={mutation.isPending}
                  onClick={() => mutation.mutate(note.id)}
                >
                  <Trash className="h-4 w-4" />
                  <span className="text-sm font-medium">Delete</span>
                </Button>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default NoteList
