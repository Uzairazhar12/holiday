import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import Bootstrap from '@/bootstrap.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Bootstrap />
  </StrictMode>,
)
