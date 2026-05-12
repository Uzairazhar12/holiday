import { MessageCircle } from 'lucide-react'
import { BRAND } from '@/config/brand'

export function WhatsAppFab({ phone }) {
  const wa = phone || BRAND.whatsappDigits
  const href = `https://wa.me/${String(wa).replace(/\D/g, '')}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[var(--shadow-soft)] transition hover:scale-105 hover:brightness-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
