import axios from 'axios'
import api from './axios'

const BASE_URL = '/notes'
const USER_URL = '/users/me/notes'

export async function getNotes() {
  try {
    const response = await api.get(`${USER_URL}`)
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

export async function getNote(id: string) {
  try {
    const response = await api.get(`${BASE_URL}/${id}`)
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
    const response = await api.post(`${USER_URL}`, noteData)
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

export async function updateNote(
  id: string,
  noteData: { title: string; content: string },
) {
  try {
    const response = await api.patch(`${BASE_URL}/${id}`, noteData)
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

export async function deleteNote(id: string) {
  try {
    const response = await api.delete(`${BASE_URL}/${id}`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const message = error.response?.data?.message || error.message
      throw new Error(
        `Request failed: ${status ? `(status: ${status})` : ''}: ${message}`,
      )
    }
    throw new Error('An unknown error occurred while deleting notes')
  }
}
