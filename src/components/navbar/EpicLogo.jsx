import { Link } from 'react-router-dom'
import { BRAND } from '@/config/brand'

/** Full-colour lockup from `/public/brand/epic-tour-logo.png` (supplied brand artwork). */
export function EpicLogo({ className = '' }) {
  return (
    <Link
      to="/"
      className={`group flex shrink-0 items-center outline-none focus-visible:ring-2 focus-visible:ring-teal-500/35 focus-visible:ring-offset-2 ${className}`}
      aria-label={`${BRAND.name} home`}
    >
      <img
        src={BRAND.logoSrc}
        alt=""
        width={200}
        height={72}
        decoding="async"
        className="h-10 w-auto max-w-[min(100%,200px)] object-contain object-left sm:h-12 sm:max-w-[220px]"
      />
    </Link>
  )
}
