import { Link } from 'react-router-dom'

/**
 * EPIC HOLIDAYS wordmark + travel mark (suitcase + location pin).
 */
export function EpicLogo({ className = '' }) {
  return (
    <Link
      to="/"
      className={`group flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#E65100]/40 focus-visible:ring-offset-2 ${className}`}
      aria-label="EPIC HOLIDAYS home"
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 48 48"
        className="shrink-0"
        aria-hidden
      >
        <defs>
          <linearGradient id="epic-pin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E65100" />
            <stop offset="100%" stopColor="#BF360C" />
          </linearGradient>
        </defs>
        <rect x="8" y="14" width="28" height="22" rx="4" fill="#1A237E" />
        <rect x="11" y="17" width="22" height="14" rx="2" fill="#283593" opacity="0.95" />
        <path
          d="M14 14V11a2 2 0 012-2h16a2 2 0 012 2v3"
          fill="none"
          stroke="#1A237E"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="24" cy="10" r="5.5" fill="url(#epic-pin)" />
        <circle cx="24" cy="10" r="2.2" fill="#fff" opacity="0.9" />
        <rect x="16" y="22" width="16" height="2" rx="1" fill="#E8EAF6" opacity="0.35" />
        <rect x="16" y="27" width="10" height="2" rx="1" fill="#E8EAF6" opacity="0.25" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] tracking-tight text-[#E65100] sm:text-[1.55rem]">
          EPIC
        </span>
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-[#1A237E] sm:text-[0.68rem]">
          Holidays
        </span>
      </div>
    </Link>
  )
}
