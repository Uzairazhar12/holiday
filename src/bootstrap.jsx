import { useEffect } from 'react'
import App from '@/App.jsx'
import { initAuthListener } from '@/store/authStore'

export default function Bootstrap() {
  useEffect(() => initAuthListener(), [])
  return <App />
}
