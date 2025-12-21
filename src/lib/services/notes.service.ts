import { apiClient } from '@/lib/api/client'
import { Note } from '@/types'

class NotesService {
  private ENDPOINTS = {
    NOTES: '/notes',
    USER_NOTES: '/users/me/notes',
  }
  constructor() {
    this.getNotes = this.getNotes.bind(this)
    this.getNote = this.getNote.bind(this)
    this.createNote = this.createNote.bind(this)
    this.updateNote = this.updateNote.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
  }
  async getNotes(): Promise<{ data: { notes: Note[] } }> {
    const response = await apiClient.get(this.ENDPOINTS.USER_NOTES)

    return response.data
  }

  async getNote(id: string): Promise<{ data: { note: Note } }> {
    const response = await apiClient.get(`${this.ENDPOINTS.NOTES}/${id}`)
    return response.data
  }

  async createNote(noteData: {
    title: string
    content: string
  }): Promise<{ data: { note: Note } }> {
    const response = await apiClient.post(this.ENDPOINTS.USER_NOTES, noteData)
    return response.data
  }

  async updateNote(
    id: string,
    noteData: { title: string; content: string },
  ): Promise<{ data: { note: Note } }> {
    const response = await apiClient.patch(
      `${this.ENDPOINTS.NOTES}/${id}`,
      noteData,
    )
    return response.data
  }

  async deleteNote(id: string): Promise<{ data: null }> {
    const response = await apiClient.delete(`${this.ENDPOINTS.NOTES}/${id}`)
    return response.data
  }
}

export const notesService = new NotesService()
