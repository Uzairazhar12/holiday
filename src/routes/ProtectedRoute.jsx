import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Skeleton } from '@/components/ui/skeleton'

export function ProtectedRoute({ adminOnly }) {
  const { user, role, loading } = useAuthStore()
  const location = useLocation()

  if (loading) {
    return (
      <div className="space-y-4 p-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate to="/dashboard/login" replace state={{ from: location.pathname }} />
    )
  }

  if (adminOnly && role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
