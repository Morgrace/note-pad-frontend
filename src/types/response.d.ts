import { User } from './auth'
import type { AllNotes, Note } from './note'

type APIStatus = 'success' | 'fail' | 'error'

export interface GetNotes {
  status: APIStatus
  results: number
  data: { notes: AllNotes }
}
export interface GetNote {
  status: APIStatus
  results: number
  data: { note: Note }
}
interface Auth {
  status: APIStatus
  token: string
  data: {
    user: User
  }
}

export type LoginResponse = Auth
export type SignupResponse = Auth
export type ResetPasswordResponse = Auth
export type updateMyPassword = Auth
export type ForgotPasswordResponse = {
  status: APIStatus
  message: string
}
