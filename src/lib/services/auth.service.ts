import { apiClient } from '@/lib/api/client'
import {
  AuthToken,
  LoginCredentials,
  SignupData,
  User,
  UserNotes,
} from '@/types'

class AuthService {
  private readonly ENDPOINTS = {
    LOGIN: '/users/login',
    SIGNUP: '/users/signup',
    LOGOUT: '/users/logout',
    ME: '/users/me',
    UPDATE_ME: '/users/updateMe',
    UPDATE_MY_PASSWORD: '/users/updateMyPassword',
    DELETE_ME: '/users/deleteMe',
    FORGOT_PASSWORD: '/users/forgotPassword',
    RESET_PASSWORD: '/users/resetPassword',
  }

  async login(
    credentials: LoginCredentials,
  ): Promise<{ user: User; token: AuthToken }> {
    const { data } = await apiClient.post(this.ENDPOINTS.LOGIN, credentials)

    return {
      user: data.data.user,
      token: data.token,
    }
  }

  async signup(
    signupData: SignupData,
  ): Promise<{ user: User; token: AuthToken }> {
    const { data } = await apiClient.post(this.ENDPOINTS.SIGNUP, signupData)

    return {
      user: data.data.user,
      token: data.token,
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(this.ENDPOINTS.LOGOUT)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  async getCurrentUser(): Promise<User> {
    const { data } = await apiClient.get(this.ENDPOINTS.ME)
    return data.data.user
  }

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post(this.ENDPOINTS.FORGOT_PASSWORD, { email })
  }

  async resetPassword(credentials: {
    token: string
    newPassword: string
    newPasswordConfirm: string
  }): Promise<void> {
    await apiClient.post(
      `${this.ENDPOINTS.RESET_PASSWORD}/${credentials.token}`,
      {
        password: credentials.newPassword,
        passwordConfirm: credentials.newPasswordConfirm,
      },
    )
  }

  async updateMe(detailsToUpdate: FormData) {
    const { data } = await apiClient.patch(
      this.ENDPOINTS.UPDATE_ME,
      detailsToUpdate,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return data.data.user
  }

  async updateMyPassword({
    passwordCurrent,
    password,
    passwordConfirm,
  }: {
    passwordCurrent: string
    password: string
    passwordConfirm: string
  }): Promise<{ user: User; token: string }> {
    const { data } = await apiClient.patch(this.ENDPOINTS.UPDATE_MY_PASSWORD, {
      passwordCurrent,
      password,
      passwordConfirm,
    })

    return {
      user: data.data.user,
      token: data.token,
    }
  }
}

export const authService = new AuthService()
