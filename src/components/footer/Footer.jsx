import { Link } from 'react-router-dom'
import { BRAND } from '@/config/brand'
import { EpicLogo } from '@/components/navbar/EpicLogo'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-4 md:gap-10">
          <div className="flex flex-col items-center gap-4 text-center sm:col-span-2 sm:items-start sm:text-left md:col-span-2">
            <EpicLogo variant="footer" className="sm:justify-start" />
            <p className="max-w-md text-sm leading-relaxed text-muted">
              ATOL-protected packages, competitive fares and specialist support from the
              UK.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/50 px-5 py-4 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
            <p className="mb-3 text-center text-sm font-semibold text-foreground sm:text-left">
              Explore
            </p>
            <ul className="space-y-2.5 text-center text-sm text-muted sm:text-left">
              <li>
                <Link className="inline-block hover:text-teal-800" to="/tours">
                  Tours
                </Link>
              </li>
              <li>
                <Link className="inline-block hover:text-teal-800" to="/blogs">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="inline-block hover:text-teal-800" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="inline-block hover:text-teal-800" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/50 px-5 py-4 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
            <p className="mb-3 text-center text-sm font-semibold text-foreground sm:text-left">
              Contact
            </p>
            <ul className="space-y-2.5 text-center text-sm text-muted sm:text-left">
              <li>
                <a
                  className="inline-block break-all hover:text-teal-800"
                  href={`mailto:${BRAND.email}`}
                >
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a className="inline-block hover:text-teal-800" href={BRAND.phoneTel}>
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li className="text-xs text-muted/90">{BRAND.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 text-center text-xs leading-relaxed text-muted sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <p className="shrink-0 sm:max-w-[40%]">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved
          </p>
          <p className="mx-auto max-w-lg sm:mx-0 sm:max-w-[55%] sm:text-right">
            Independent travel service provider — not affiliated with airlines unless
            stated. Bookings subject to availability and supplier terms.
          </p>
        </div>
      </div>
    </footer>
  )
}
