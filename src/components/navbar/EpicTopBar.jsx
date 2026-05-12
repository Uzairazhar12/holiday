import { Mail, Phone } from 'lucide-react'
import { BRAND } from '@/config/brand'

export function EpicTopBar() {
  return (
    <div className="border-b border-teal-950/20 bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5 text-xs sm:px-6 sm:text-sm lg:px-8">
        <a
          href={`mailto:${BRAND.email}`}
          className="inline-flex min-w-0 items-center gap-2 text-white/95 transition hover:text-white"
        >
          <Mail className="h-3.5 w-3.5 shrink-0 text-teal-200" aria-hidden />
          <span className="truncate">{BRAND.email}</span>
        </a>
        <a
          href={BRAND.phoneTel}
          className="inline-flex shrink-0 items-center gap-2 text-white/95 transition hover:text-white"
        >
          <Phone className="h-3.5 w-3.5 shrink-0 text-teal-200" aria-hidden />
          <span>{BRAND.phoneDisplay}</span>
        </a>
      </div>
    </div>
  )
}
