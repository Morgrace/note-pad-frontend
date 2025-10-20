import { create } from 'zustand'
import type { User } from '@/types'
import api from '@/lib/services/axios'

const BASE_URL = '/users'

interface AuthState {
  user: User | null
  isLoading: boolean

  login: (email: string, password: string) => Promise<void>
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string,
  ) => Promise<void>
  logout: () => Promise<void>
  verifyAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  async login(email, password) {
    try {
      set({ isLoading: true })

      const response = await api.post(`${BASE_URL}/login`, {
        email,
        password,
      })

      const user = response.data.data.user
      set({ user, isLoading: false })
    } catch (error) {
      set({ user: null, isLoading: false })

      throw error
    }
  },

  async signup(firstName, lastName, email, password, passwordConfirm) {
    try {
      set({ isLoading: true })

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
      set({ user: null, isLoading: false })
      throw error
    }
  },

  async verifyAuth() {
    try {
      set({ isLoading: true })

      const response = await api.get(`${BASE_URL}/me`)

      if (!response.data) throw new Error('Not authenticated')

      const user = response.data.data.user

      set({ user, isLoading: false })
    } catch (error) {
      set({ user: null, isLoading: false })
    }
  },
  async logout() {
    try {
      await api.post(`${BASE_URL}/logout`)
      set({ user: null })
    } catch (error) {
      set({ user: null })
    }
  },
}))
