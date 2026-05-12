import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { BRAND } from '@/config/brand'

const sizeClass = {
  /** Main header — tall lockup */
  header:
    'h-[3.5rem] w-auto max-w-[min(90vw,300px)] object-contain object-left sm:h-[4.75rem] sm:max-w-[min(85vw,360px)] md:h-[5.25rem] md:max-w-[400px]',
  /** Site footer */
  footer:
    'mx-auto h-[4.25rem] w-auto max-w-[min(92vw,300px)] object-contain sm:mx-0 sm:h-[5.5rem] sm:max-w-[min(100%,380px)] md:h-[6rem] md:max-w-[440px]',
  /** Mobile drawer header */
  drawer:
    'mx-auto h-[4.5rem] w-auto max-w-[260px] object-contain sm:h-[5.25rem] sm:max-w-[300px]',
}

/**
 * Full-colour lockup from `BRAND.logoSrc` (PNG in `/public/brand/`).
 * @param {'header' | 'footer' | 'drawer'} [variant='header']
 */
export function EpicLogo({
  className = '',
  variant = 'header',
  onNavigate,
}) {
  return (
    <Link
      to="/"
      onClick={onNavigate}
      className={cn(
        'group flex shrink-0 items-center outline-none focus-visible:ring-2 focus-visible:ring-teal-500/35 focus-visible:ring-offset-2',
        variant === 'footer' && 'w-full justify-center sm:w-auto sm:justify-start',
        className,
      )}
      aria-label={`${BRAND.name} home`}
    >
      <img
        src={BRAND.logoSrc}
        alt=""
        width={400}
        height={144}
        decoding="async"
        className={cn(sizeClass[variant] ?? sizeClass.header)}
      />
    </Link>
  )
}
