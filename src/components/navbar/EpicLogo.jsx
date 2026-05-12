import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { BRAND } from '@/config/brand'

const sizeClass = {
  header:
    'h-[4rem] w-auto max-w-[min(92vw,340px)] object-contain object-left sm:h-[5.35rem] sm:max-w-[min(88vw,420px)] md:h-[5.85rem] md:max-w-[460px]',
  footer:
    'mx-auto h-[4.75rem] w-auto max-w-[min(94vw,340px)] object-contain sm:mx-0 sm:h-[6rem] sm:max-w-[min(100%,440px)] md:h-[6.75rem] md:max-w-[500px]',
  drawer:
    'mx-auto h-[5rem] w-auto max-w-[300px] object-contain sm:h-[5.85rem] sm:max-w-[340px]',
}

function logoUrl() {
  return BRAND.logoAssetVersion
    ? `${BRAND.logoSrc}?v=${BRAND.logoAssetVersion}`
    : BRAND.logoSrc
}

/** Lockup from `BRAND.logoSrc` (PNG in `/public/brand/`). */
export function EpicLogo({ className = '', variant = 'header', onNavigate }) {
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
        src={logoUrl()}
        alt=""
        width={480}
        height={220}
        decoding="async"
        className={cn('block w-auto', sizeClass[variant] ?? sizeClass.header)}
      />
    </Link>
  )
}
