import { formatAxiosError } from '../utils'
import api from './axios'

const BASE_URL = '/notes'
const USER_URL = '/users/me/notes'

export async function getNotes() {
  try {
    const response = await api.get(`${USER_URL}`)
    return response.data
  } catch (error: unknown) {
    const { message } = formatAxiosError(error)
    throw new Error(message)
  }
}

export async function getNote(id: string) {
  try {
    const response = await api.get(`${BASE_URL}/${id}`)
    return response.data
  } catch (error: unknown) {
    const { message } = formatAxiosError(error)
    throw new Error(message)
  }
}

export async function createNote(noteData: { title: string; content: string }) {
  try {
    const response = await api.post(`${USER_URL}`, noteData)
    return response.data
  } catch (error: unknown) {
    const { message } = formatAxiosError(error)
    throw new Error(message)
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
    const { message } = formatAxiosError(error)
    throw new Error(message)
  }
}

export async function deleteNote(id: string) {
  try {
    const response = await api.delete(`${BASE_URL}/${id}`)
    return response.data
  } catch (error: unknown) {
    const { message } = formatAxiosError(error)
    throw new Error(message)
  }
}
