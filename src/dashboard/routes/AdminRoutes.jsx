import { Routes, Route } from 'react-router-dom'
import { AdminLayout } from '@/layouts/AdminLayout'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import DashboardHome from '@/dashboard/pages/DashboardHome'
import ToursAdmin from '@/dashboard/pages/ToursAdmin'
import TourFormPage from '@/dashboard/pages/TourFormPage'
import BookingsAdmin from '@/dashboard/pages/BookingsAdmin'
import BlogsAdmin from '@/dashboard/pages/BlogsAdmin'
import BlogFormPage from '@/dashboard/pages/BlogFormPage'
import UsersAdmin from '@/dashboard/pages/UsersAdmin'
import SettingsAdmin from '@/dashboard/pages/SettingsAdmin'

export function AdminRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute adminOnly />}>
        <Route element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="tours" element={<ToursAdmin />} />
          <Route path="tours/new" element={<TourFormPage />} />
          <Route path="tours/:id/edit" element={<TourFormPage />} />
          <Route path="bookings" element={<BookingsAdmin />} />
          <Route path="blogs" element={<BlogsAdmin />} />
          <Route path="blogs/new" element={<BlogFormPage />} />
          <Route path="blogs/:id/edit" element={<BlogFormPage />} />
          <Route path="users" element={<UsersAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
        </Route>
      </Route>
    </Routes>
  )
}
