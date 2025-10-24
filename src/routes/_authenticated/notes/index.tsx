import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus, Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

import type { AllNotes } from '@/types'

import ErrorAllNotes from '@/components/error-all-notes'
import LoaderAllNotes from '@/components/loader-all-notes'
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
  })

  const notes: AllNotes = data?.data.notes || []

  // Filter and sort notes
  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      }
      return (a.title || '').localeCompare(b.title || '')
    })

  if (isPending) return <LoaderAllNotes />

  if (error) return <ErrorAllNotes error={error} />

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                My Notes
              </h1>
              <p className="text-slate-600 mt-2 sm:mt-3 text-base sm:text-lg font-medium">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'} in total
              </p>
            </div>
            <Button
              asChild
              size="default"
              className="bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-white font-semibold w-full sm:w-auto"
            >
              <Link to="/notes/new">
                <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                New Note
              </Link>
            </Button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        {notes.length > 0 && (
          <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search notes by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 sm:pl-12 pr-3 sm:pr-4 py-5 sm:py-6 text-sm sm:text-base border border-slate-300 focus:border-teal-500 focus:ring-teal-500 bg-white rounded-lg shadow-sm"
                />
              </div>

              {/* Filter Button */}
              <Button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`px-4 sm:px-6 ${
                  filterOpen
                    ? 'bg-teal-500 text-white hover:bg-teal-600'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                } shadow-sm rounded-lg transition-all`}
              >
                <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span className="text-sm sm:text-base">Filters</span>
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
            <CardContent className="py-12 sm:py-16">
              <div className="text-center">
                <div className="mx-auto w-20 h-20 sm:w-28 sm:h-28 bg-teal-50 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-md">
                  <Plus className="h-10 w-10 sm:h-14 sm:w-14 text-teal-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">
                  No notes yet
                </h3>
                <p className="text-slate-600 mb-6 sm:mb-8 text-base sm:text-lg px-4">
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
            <CardContent className="py-12 sm:py-16">
              <div className="text-center">
                <div className="mx-auto w-20 h-20 sm:w-28 sm:h-28 bg-slate-100 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-md">
                  <Search className="h-10 w-10 sm:h-14 sm:w-14 text-slate-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">
                  No notes found
                </h3>
                <p className="text-slate-600 mb-4 text-base sm:text-lg px-4">
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
