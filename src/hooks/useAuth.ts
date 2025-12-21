import { useEffect } from 'react'
import { AUTH_CONFIG } from '../config/auth.config'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from '@tanstack/react-router'

// ========== Main Auth Hook ==========
export const useAuth = () => {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const error = useAuthStore((state) => state.error)
  const login = useAuthStore((state) => state.login)
  const signup = useAuthStore((state) => state.signup)
  const logout = useAuthStore((state) => state.logout)
  const checkAuth = useAuthStore((state) => state.checkAuth)
  const updateUser = useAuthStore((state) => state.updateUser)
  const updateUserPassword = useAuthStore((state) => state.updateUserPassword)
  const clearError = useAuthStore((state) => state.clearError)

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    signup,
    logout,
    updateUser,
    clearError,
    checkAuth,
    updateUserPassword,
  }
}

// ========== Require Auth Hook ==========
// Automatically redirect if not authenticated
export const useRequireAuth = (
  redirectTo: string = AUTH_CONFIG.LOGIN_ROUTE,
) => {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: redirectTo || '/login', replace: true })
    }
  }, [isAuthenticated, isLoading])

  return { isAuthenticated, isLoading }
}

// ========== Require Guest Hook ==========
// Redirect if already authenticated (for login/signup pages)
export const useRequireGuest = (
  redirectTo: string = AUTH_CONFIG.HOME_ROUTE,
) => {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate({ to: redirectTo || '/', replace: true })
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo])

  return { isAuthenticated, isLoading }
}

// ========== Permission Hook ==========
// export const usePermission = (requiredPermission: Permission): boolean => {
//   const user = useAuthStore((state) => state.user)

//   if (!user) return false

//   return user.permissions.includes(requiredPermission)
// }

// ========== Multiple Permissions Hook ==========
// export const usePermissions = (
//   requiredPermissions: Permission[],
//   requireAll: boolean = true,
// ): boolean => {
//   const user = useAuthStore((state) => state.user)

//   if (!user) return false

//   if (requireAll) {
//     // User must have ALL permissions
//     return requiredPermissions.every((permission) =>
//       user.permissions.includes(permission),
//     )
//   } else {
//     // User must have AT LEAST ONE permission
//     return requiredPermissions.some((permission) =>
//       user.permissions.includes(permission),
//     )
//   }
// }

// // ========== Role Hook ==========
// export const useRole = (requiredRole: UserRole | UserRole[]): boolean => {
//   const user = useAuthStore((state) => state.user)

//   if (!user) return false

//   const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]

//   return roles.includes(user.role)
// }

// ========== Auto Refresh Token Hook ==========
// export const useTokenRefresh = () => {
//   const refreshToken = useAuthStore((state) => state.refreshToken)
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

//   useEffect(() => {
//     if (!isAuthenticated) return

//     // Check token expiry every minute
//     const interval = setInterval(() => {
//       const token = localStorage.getItem(AUTH_CONFIG.ACCESS_TOKEN_KEY)

//       if (!token) return

//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]))
//         const expiryTime = payload.exp * 1000
//         const timeUntilExpiry = expiryTime - Date.now()

//         // Refresh if token expires in less than 5 minutes
//         if (timeUntilExpiry < AUTH_CONFIG.REFRESH_THRESHOLD) {
//           refreshToken()
//         }
//       } catch (error) {
//         console.error('Token parsing error:', error)
//       }
//     }, 60000) // Check every minute

//     return () => clearInterval(interval)
//   }, [isAuthenticated, refreshToken])
// }
