import type { AllNotes, Note } from './note'

type APIStatus = 'success' | 'fail' | 'error'

export interface GetNotes {
  status: APIStatus
  results: number
  data: { notes: AllNotes }
}
export interface GetNote {
  status: APIStatus
  results: number
  data: { note: Note }
}
