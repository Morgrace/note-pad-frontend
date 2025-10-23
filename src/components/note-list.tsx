import { Link } from '@tanstack/react-router'
import { Calendar, Download, Pencil, Star, Tag, Trash } from 'lucide-react'
import { useState } from 'react'

import { Button } from './ui/button'
import type { AllNotes } from '@/types'
import { useDeleteNote } from '@/hooks/useDeleteNote'

type NoteListProps = { notes: AllNotes }

function NoteList({ notes }: NoteListProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const { isPending, mutate } = useDeleteNote()

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
    <ul className="space-y-3 sm:space-y-4">
      {notes.map((note) => {
        const isFavorite = favorites.has(note.id)
        return (
          <li
            key={note.id}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-teal-300 hover:scale-[1.01] relative overflow-hidden"
          >
            {/* Favorite Badge */}
            {isFavorite && (
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden">
                <div className="absolute top-2 right-[-18px] sm:top-3 sm:right-[-20px] bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-[10px] sm:text-xs font-bold py-1 px-6 sm:px-8 rotate-45 shadow-lg">
                  Favorite
                </div>
              </div>
            )}

            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <Link
                  to="/notes/$id"
                  params={{ id: note.id }}
                  className="flex-1 min-w-0 mr-2 sm:mr-4"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 truncate group-hover:text-teal-600 transition-all mb-1.5 sm:mb-2">
                        {note.title || 'Untitled Note'}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 font-medium">
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-teal-50 rounded-lg flex items-center justify-center">
                            <Calendar className="size-3.5 sm:size-[17px] stroke-teal-600" />
                          </div>
                          <span className="text-xs sm:text-sm">
                            {new Date(note.updatedAt).toLocaleDateString(
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
                          <Tag className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-teal-500" />
                          <span className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full text-[10px] sm:text-xs font-semibold">
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
                  } hover:scale-110 transition-all shadow-sm shrink-0`}
                  onClick={() => toggleFavorite(note.id)}
                >
                  <Star
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${isFavorite ? 'fill-current' : ''}`}
                  />
                </Button>
              </div>

              {/* Note Actions */}
              <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-slate-100">
                {/* Edit Note */}
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 transition-all flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                >
                  <Link to="/notes/$id" params={{ id: note.id }}>
                    <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="font-medium">Edit</span>
                  </Link>
                </Button>

                {/* Download Note */}
                <Button
                  size="sm"
                  disabled
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                  onClick={() => handleDownload(note)}
                >
                  <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="font-medium hidden sm:inline">Download</span>
                </Button>

                {/* Delete Note */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all flex items-center gap-1.5 sm:gap-2 ml-auto text-xs sm:text-sm"
                  disabled={isPending}
                  onClick={() => mutate(note.id)}
                >
                  <Trash className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="font-medium">Delete</span>
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
