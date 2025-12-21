import { AUTH_CONFIG } from '@/config/auth.config'
import { authService } from '@/lib/services/auth.service'
import { AuthStore, LoginCredentials, SignupData } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // ========== State ==========
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: true,
        error: null,

        // ========== Actions ==========

        login: async (credentials: LoginCredentials) => {
          set({ isLoading: true, error: null })

          try {
            const { user, token } = await authService.login(credentials)

            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          } catch (error: any) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: error.message || 'Login failed',
            })
            throw error
          }
        },

        signup: async (signupData: SignupData) => {
          set({ isLoading: true, error: null })

          try {
            const { user, token } = await authService.signup(signupData)

            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          } catch (error: any) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: error.message || 'Signup failed',
            })
            throw error
          }
        },

        logout: async () => {
          set({ isLoading: true, error: null })

          try {
            await authService.logout()
          } catch (error) {
            console.error('Logout error:', error)
          } finally {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            })
          }
        },

        // refreshToken: async () => {
        //   try {
        //     const tokens = await authService.refreshAccessToken()

        //     set({ tokens })
        //   } catch (error: any) {
        //     // If refresh fails, logout user
        //     set({
        //       user: null,
        //       tokens: null,
        //       isAuthenticated: false,
        //       error: error.message || 'Session expired',
        //     })
        //     throw error
        //   }
        // },

        checkAuth: async () => {
          const { token } = get()

          if (!token) {
            set({ isAuthenticated: false, user: null, isLoading: false })
            return
          }

          set({ isLoading: true })

          try {
            const user = await authService.getCurrentUser()

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          } catch (error: any) {
            // Token is invalid/expired
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: 'Session expired',
            })
          }
        },

        updateUser: async (userData: FormData) => {
          const { user } = get()

          if (!user) {
            throw new Error('No user logged in')
          }
          set({ isLoading: true, error: null })

          try {
            const updatedUser = await authService.updateMe(userData)
            set({
              user: updatedUser,
              isLoading: false,
              error: null,
            })
          } catch (error: any) {
            set({ isLoading: false, error: error.message || 'Update failed' })
            console.error(error)
            throw error
          }
        },

        updateUserPassword: async ({
          passwordCurrent,
          password,
          passwordConfirm,
        }: {
          passwordCurrent: string
          password: string
          passwordConfirm: string
        }) => {
          const { user } = get()

          if (!user) {
            throw new Error('No user logged in')
          }

          set({ isLoading: true, error: null })

          try {
            const { user: updatedUser, token } =
              await authService.updateMyPassword({
                passwordCurrent,
                password,
                passwordConfirm,
              })

            set({
              user: updatedUser,
              isLoading: false,
              error: null,
              token,
            })
          } catch (error: any) {
            set({ isLoading: false, error: error.message || 'Update failed!' })
            throw error
          }
        },

        clearError: () => {
          set({ error: null })
        },
      }),
      {
        name: AUTH_CONFIG.PERSIST_KEY,
        partialize: (state) => ({
          // Only persist these fields
          token: state.token,
          user: state.user,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.isAuthenticated = false
            state.isLoading = !!state.token
          }
        },
      },
    ),
    {
      name: AUTH_CONFIG.DEVTOOLS_NAME,
    },
  ),
)
