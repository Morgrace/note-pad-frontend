export interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}
export type UserNotes = Array<Note>
