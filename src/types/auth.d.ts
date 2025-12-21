export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  photo?: string
  photoPublicId?: string
  role: 'admin' | 'user'
}
export type AuthToken = string

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  email: string
  password: string
  passwordConfirm: string
  firstName: string
  lastName: string
}

export interface AuthState {
  user: User | null
  token: AuthToken | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthActions {
  login(credentials: LoginCredentials): Promise<void>
  signup(data: SignupData): Promise<void>
  logout(): void
  // refreshToken(): Promise<void>
  updateUser(user: FormData): void
  updateUserPassword({
    passwordCurrent,
    passwordConfirm,
    password,
  }): Promise<void>
  clearError(): void
  checkAuth(): Promise<void>
}
export type AuthStore = AuthState & AuthActions
