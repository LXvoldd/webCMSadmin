import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LoadingSpinner from '../shared/LoadingSpinner'

export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, loading, profile } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Memeriksa autentikasi..." />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  if (requiredRole && profile?.role !== requiredRole && profile?.role !== 'super_admin') {
    return <Navigate to="/admin/dashboard" replace />
  }

  return children
}