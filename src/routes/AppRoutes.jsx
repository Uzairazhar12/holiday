import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import Home from '@/pages/Home/Home'
import Tours from '@/pages/Tours/Tours'
import TourDetails from '@/pages/TourDetails/TourDetails'
import About from '@/pages/About/About'
import Contact from '@/pages/Contact/Contact'
import Blogs from '@/pages/Blogs/Blogs'
import BlogDetails from '@/pages/Blogs/BlogDetails'
import Booking from '@/pages/Booking/Booking'
import AuthLogin from '@/pages/Auth/AuthLogin'
import { AdminRoutes } from '@/dashboard/routes/AdminRoutes'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard/login" element={<AuthLogin />} />
      <Route path="/dashboard/*" element={<AdminRoutes />} />

      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="tours" element={<Tours />} />
        <Route path="tours/:slug" element={<TourDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:slug" element={<BlogDetails />} />
        <Route path="booking" element={<Booking />} />
        <Route path="booking/:tourId" element={<Booking />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
