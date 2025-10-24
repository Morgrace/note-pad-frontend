import axios from 'axios'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}
export function formatAxiosError(error: unknown) {
  let status, message

  if (axios.isAxiosError(error)) {
    status = error.response?.data?.err?.statusCode || 500
    message = error.response?.data?.errorMessage || error.message
  } else {
    message =
      error instanceof Error ? error.message : 'An unknown error occured'
  }
  return { message, status }
}
