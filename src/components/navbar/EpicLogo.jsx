import { Link } from 'react-router-dom'

/**
 * EPIC HOLIDAYS — typographic mark (vertical accent + wordmark). No generic icon shapes.
 */
export function EpicLogo({ className = '' }) {
  return (
    <Link
      to="/"
      className={`group flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-teal-500/35 focus-visible:ring-offset-2 ${className}`}
      aria-label="EPIC HOLIDAYS home"
    >
      <span
        className="hidden h-11 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-teal-500 via-teal-600 to-slate-800 shadow-sm sm:block"
        aria-hidden
      />
      <div className="flex flex-col leading-tight">
        <span className="font-display text-[1.55rem] font-extrabold tracking-tight text-slate-900 sm:text-[1.75rem]">
          EPIC
        </span>
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.38em] text-teal-800 sm:text-[0.68rem]">
          Holidays
        </span>
      </div>
    </Link>
  )
}
