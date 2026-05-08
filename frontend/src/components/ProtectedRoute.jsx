import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

/**
 * ProtectedRoute guards access based on authentication and role
 * If not authenticated → redirect to /auth/login
 * If authenticated but wrong role → redirect to role-specific home
 * If authenticated with correct role → render component
 * 
 * Usage:
 * <ProtectedRoute component={TeacherDashboard} requiredRole="teacher" />
 * <ProtectedRoute component={StudentHome} requiredRole="student" />
 */
export function ProtectedRoute({ component: Component, requiredRole = null }) {
  const auth = useContext(AuthContext)

  // Not logged in → redirect to login
  if (!auth?.isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  // Logged in but wrong role and role required
  if (requiredRole && auth.role !== requiredRole) {
    const roleHomePath = auth.role === 'teacher' ? '/teacher/dashboard' : '/student/library'
    return <Navigate to={roleHomePath} replace />
  }

  // Authenticated and correct role (or no specific role required) → render
  return <Component />
}
