import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus, Search, Filter, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

import type { AllNotes } from '@/types'

import NoteList from '@/components/note-list'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getNotes } from '@/lib/services/notesApi'

export const Route = createFileRoute('/_authenticated/notes/')({
  component: PageNotes,
})

function PageNotes() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')

  const { isPending, error, data } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    staleTime: 3600,
  })
  const notes: AllNotes = data?.data.notes || []
  console.log(notes)

  // Filter and sort notes
  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return (a.title || '').localeCompare(b.title || '')
    })

  if (isPending)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-teal-500 mx-auto mb-4"></div>
          <p className="text-slate-700 font-medium">Loading your notes...</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center bg-white rounded-lg shadow-xl p-8 max-w-md border border-slate-200">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <p className="text-2xl font-bold text-red-600 mb-2">
            Error loading notes
          </p>
          <p className="text-slate-600">{error.message}</p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold text-slate-900">My Notes</h1>
              <p className="text-slate-600 mt-3 text-lg font-medium">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'} in total
              </p>
            </div>
            <Button
              asChild
              size="default"
              className="bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-white font-semibold"
            >
              <Link to="/notes/new">
                <Plus className="mr-2 h-5 w-5" />
                New Note
              </Link>
            </Button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        {notes.length > 0 && (
          <div className="mb-6 space-y-4">
            <div className="flex gap-3 items-center">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search notes by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-base border border-slate-300 focus:border-teal-500 focus:ring-teal-500 bg-white rounded-lg shadow-sm"
                />
              </div>

              {/* Filter Button */}
              <Button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`px-6 ${
                  filterOpen
                    ? 'bg-teal-500 text-white hover:bg-teal-600'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                } shadow-sm rounded-lg transition-all`}
              >
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filter Options */}
            {filterOpen && (
              <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-4 animate-in slide-in-from-top-2">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-slate-700">
                    Sort by:
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={sortBy === 'date' ? 'default' : 'outline'}
                      onClick={() => setSortBy('date')}
                      className={
                        sortBy === 'date'
                          ? 'bg-teal-500 hover:bg-teal-600'
                          : 'border-slate-300 hover:bg-slate-50'
                      }
                    >
                      Date
                    </Button>
                    <Button
                      size="sm"
                      variant={sortBy === 'title' ? 'default' : 'outline'}
                      onClick={() => setSortBy('title')}
                      className={
                        sortBy === 'title'
                          ? 'bg-teal-500 hover:bg-teal-600'
                          : 'border-slate-300 hover:bg-slate-50'
                      }
                    >
                      Title
                    </Button>
                  </div>
                  {/* Future filter options can go here */}
                  <span className="ml-auto text-xs text-slate-500 italic">
                    More filters coming soon...
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Notes Content */}
        {notes.length === 0 ? (
          <Card className="shadow-lg border border-slate-200 bg-white">
            <CardContent className="py-16">
              <div className="text-center">
                <div className="mx-auto w-28 h-28 bg-teal-50 rounded-full flex items-center justify-center mb-6 shadow-md">
                  <Plus className="h-14 w-14 text-teal-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  No notes yet
                </h3>
                <p className="text-slate-600 mb-8 text-lg">
                  Get started by creating your first note
                </p>
                <Button
                  asChild
                  className="bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-white font-semibold"
                >
                  <Link to="/notes/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Note
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : filteredNotes.length === 0 ? (
          <Card className="shadow-lg border border-slate-200 bg-white">
            <CardContent className="py-16">
              <div className="text-center">
                <div className="mx-auto w-28 h-28 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-md">
                  <Search className="h-14 w-14 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  No notes found
                </h3>
                <p className="text-slate-600 mb-4 text-lg">
                  Try adjusting your search or filters
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('')
                    setFilterOpen(false)
                  }}
                  variant="outline"
                  className="border border-slate-300 hover:bg-slate-50"
                >
                  Clear Search
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <NoteList notes={filteredNotes} />
          </div>
        )}
      </div>
    </div>
  )
}
