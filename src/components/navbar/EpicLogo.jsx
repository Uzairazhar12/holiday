import { Link } from 'react-router-dom'
import { EPIC } from '@/config/epicTheme'

/**
 * EPIC HOLIDAYS — custom mark: rounded monogram (geometric “E”), no suitcase / pin.
 */
export function EpicLogo({ className = '' }) {
  return (
    <Link
      to="/"
      className={`group flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-teal-500/35 focus-visible:ring-offset-2 ${className}`}
      aria-label="EPIC HOLIDAYS home"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        className="shrink-0 rounded-xl shadow-md ring-1 ring-black/5 transition group-hover:shadow-lg"
        aria-hidden
      >
        <rect width="48" height="48" rx="14" fill={EPIC.teal600} />
        <path
          fill="#f8fafc"
          fillRule="evenodd"
          d="M14 15.5h20v2.8H14V15.5zm0 7.1h14.5v2.8H14v-2.8zm0 7.1h20v2.8H14v-2.8z"
        />
        <path
          fill="#ccfbf1"
          fillOpacity="0.35"
          d="M30 22.6h6v2.8h-6v-2.8z"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display text-[1.38rem] tracking-tight text-slate-900 sm:text-[1.58rem]">
          EPIC
        </span>
        <span className="text-[0.58rem] font-semibold uppercase tracking-[0.34em] text-slate-500 sm:text-[0.64rem]">
          Holidays
        </span>
      </div>
    </Link>
  )
}
