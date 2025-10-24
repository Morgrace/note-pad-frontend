import { create } from 'zustand'
import type { User } from '@/types'
import api from '@/lib/services/axios'
import { formatAxiosError } from '@/lib/utils'

const BASE_URL = '/users'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: { message?: string | undefined; status?: number | undefined } | null

  login: (email: string, password: string) => Promise<void>
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string,
  ) => Promise<void>
  logout: () => Promise<void>
  verifyAuth: () => Promise<{ success: boolean }>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  async login(email, password) {
    try {
      set({ isLoading: true, error: null })

      const response = await api.post(`${BASE_URL}/login`, { email, password })
      const user = response.data.data.user

      set({ user, isLoading: false })
    } catch (error) {
      const { message, status } = formatAxiosError(error)
      set({ user: null, isLoading: false, error: { message, status } })
      throw error
    }
  },

  async signup(firstName, lastName, email, password, passwordConfirm) {
    try {
      set({ isLoading: true, error: null })

      const response = await api.post(`${BASE_URL}/signup`, {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
      })
      const user = response.data.data.user

      set({ user, isLoading: false })
    } catch (error) {
      const { message, status } = formatAxiosError(error)
      set({ user: null, isLoading: false, error: { message, status } })
      throw error
    }
  },

  async verifyAuth() {
    try {
      set({ isLoading: true })

      const response = await api.get(`${BASE_URL}/me`)
      if (!response.data) throw new Error('Not authenticated')

      const user = response.data.data.user

      set({ user, isLoading: false, error: null })

      return { success: true }
    } catch (error) {
      const { message, status } = formatAxiosError(error)
      console.error(message)
      set({ user: null, isLoading: false })

      return { success: false }
    }
  },

  async logout() {
    try {
      await api.post(`${BASE_URL}/logout`)
      set({ user: null, error: null })
    } catch (error) {
      const { message, status } = formatAxiosError(error)
      // Still clear user but show error
      set({ user: null, error: { message, status } })
    }
  },

  clearError: () => set({ error: null }),
}))
