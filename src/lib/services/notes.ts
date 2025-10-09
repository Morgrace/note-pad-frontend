import axios from 'axios'

const BASE_URL = 'http://localhost:4000/api/v1/notes'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getNotes() {
  try {
    const response = await api.get('/')
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const message = error.response?.data?.message || error.message
      throw new Error(
        `Request failed: ${status ? `(status: ${status})` : ''}: ${message}`,
      )
    }
    throw new Error('An unknown error occurred while fetching notes')
  }
}

export async function createNote(noteData: { title: string; content: string }) {
  try {
    const response = await api.post('/create', noteData)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const message = error.response?.data?.message || error.message
      throw new Error(
        `Request failed: ${status ? `(status: ${status})` : ''}: ${message}`,
      )
    }
    throw new Error('An unknown error occurred while creating notes')
  }
}
