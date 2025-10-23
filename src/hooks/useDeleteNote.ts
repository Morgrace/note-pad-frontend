import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { GetNotes } from '@/types'
import { deleteNote } from '@/lib/services/notesApi'

export function useDeleteNote() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteNote,
    async onMutate(deleteId) {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['notes'] })

      // Snapshot previous value
      const previousNotes = queryClient.getQueryData<GetNotes>(['notes'])

      if (!previousNotes?.data.notes) {
        console.warn('No data to update')
        return { previousNotes }
      }

      // Optimistically remove the note
      queryClient.setQueryData(['notes'], (old: GetNotes) => {
        const noteData = old.data.notes
        return {
          ...old,
          data: { notes: noteData.filter((note) => note.id !== deleteId) },
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
      if (context?.previousNotes) {
        queryClient.setQueryData(['notes'], context.previousNotes)
      }
      console.error(error.message)
    },
  })

  return mutation
}
