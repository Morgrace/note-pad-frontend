import { AUTH_CONFIG } from '@/config/auth.config'
import { useRequireAuth, useRequireGuest } from '@/hooks/useAuth'
import { ReactNode } from 'react'

// ========== Protected Route Component ==========
interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
}

export const ProtectedRoute = ({
  children,
  redirectTo = AUTH_CONFIG.LOGIN_ROUTE,
}: ProtectedRouteProps) => {
  const { isAuthenticated } = useRequireAuth(redirectTo)
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

// ========== Guest Only Route ==========
// For login/signup pages - redirect if already authenticated
interface GuestOnlyRouteProps {
  children: ReactNode
  redirectTo?: string
}

export const GuestOnlyRoute = ({
  children,
  redirectTo = AUTH_CONFIG.HOME_ROUTE,
}: GuestOnlyRouteProps) => {
  const { isAuthenticated } = useRequireGuest(redirectTo)

  if (isAuthenticated) {
    return null
  }

  return <>{children}</>
}

// ========== Permission Guard Component ==========
// interface PermissionGuardProps {
//   children: ReactNode;
//   permission: Permission;
//   fallback?: ReactNode;
//   redirectTo?: string;
// }

// export const PermissionGuard = ({
//   children,
//   permission,
//   fallback,
//   redirectTo,
// }: PermissionGuardProps) => {
//   const hasPermission = usePermission(permission);

//   if (!hasPermission) {
//     if (redirectTo) {
//       return <Navigate to={redirectTo} replace />;
//     }
//     return <>{fallback || <UnauthorizedMessage />}</>;
//   }

//   return <>{children}</>;
// };

// // ========== Role Guard Component ==========
// interface RoleGuardProps {
//   children: ReactNode;
//   role: UserRole | UserRole[];
//   fallback?: ReactNode;
//   redirectTo?: string;
// }

// export const RoleGuard = ({
//   children,
//   role,
//   fallback,
//   redirectTo,
// }: RoleGuardProps) => {
//   const hasRole = useRole(role);

//   if (!hasRole) {
//     if (redirectTo) {
//       return <Navigate to={redirectTo} replace />;
//     }
//     return <>{fallback || <UnauthorizedMessage />}</>;
//   }

//   return <>{children}</>;
// };

// ========== Conditional Render Based on Permission ==========

// interface ShowIfPermissionProps {
//   children: ReactNode;
//   permission: Permission;
//   fallback?: ReactNode;
// }

// export const ShowIfPermission = ({
//   children,
//   permission,
//   fallback = null,
// }: ShowIfPermissionProps) => {
//   const hasPermission = usePermission(permission);
//   return <>{hasPermission ? children : fallback}</>;
// };

// // ========== Conditional Render Based on Role ==========
// interface ShowIfRoleProps {
//   children: ReactNode;
//   role: UserRole | UserRole[];
//   fallback?: ReactNode;
// }

// export const ShowIfRole = ({
//   children,
//   role,
//   fallback = null,
// }: ShowIfRoleProps) => {
//   const hasRole = useRole(role);
//   return <>{hasRole ? children : fallback}</>;
// };

// ========== UI Components ==========

// const LoadingScreen = () => (
//   <div className="flex items-center justify-center min-h-screen">
//     <div className="text-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//       <p className="text-gray-600">Loading...</p>
//     </div>
//   </div>
// );

// const UnauthorizedMessage = () => (
//   <div className="flex items-center justify-center min-h-screen">
//     <div className="text-center">
//       <h1 className="text-4xl font-bold text-gray-800 mb-4">403</h1>
//       <p className="text-xl text-gray-600 mb-4">Unauthorized</p>
//       <p className="text-gray-500">You don't have permission to access this resource.</p>
//     </div>
//   </div>
// );
