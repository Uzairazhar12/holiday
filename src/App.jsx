import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AppRoutes } from '@/routes/AppRoutes'
import { NotifyHost } from '@/components/common/NotifyHost'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
        <NotifyHost />
      </BrowserRouter>
    </HelmetProvider>
  )
}
