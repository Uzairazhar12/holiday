import { Mail, Phone } from 'lucide-react'
import { BRAND } from '@/config/brand'

export function EpicTopBar() {
  return (
    <div className="bg-[#0b1020] text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs sm:px-6 sm:text-sm lg:px-8">
        <a
          href={`mailto:${BRAND.email}`}
          className="inline-flex items-center gap-2 text-white/95 transition hover:text-white"
        >
          <Mail className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
          <span>{BRAND.email}</span>
        </a>
        <a
          href={BRAND.phoneTel}
          className="inline-flex items-center gap-2 text-white/95 transition hover:text-white"
        >
          <Phone className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
          <span>{BRAND.phoneDisplay}</span>
        </a>
      </div>
    </div>
  )
}
