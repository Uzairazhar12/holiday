import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3 md:col-span-2">
            <p className="font-display text-2xl text-foreground">Marvel Travel UK</p>
            <p className="max-w-md text-sm text-muted">
              ATOL-protected holidays, curated packages, and competitive fares from
              the UK — with specialists on hand when you need them.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">Explore</p>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link className="hover:text-foreground" to="/tours">
                  Tours
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" to="/blogs">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">Contact</p>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a className="hover:text-foreground" href="tel:02033322614">
                  0203 332 2614
                </a>
              </li>
              <li>
                <a
                  className="hover:text-foreground"
                  href="mailto:info@marveltravel.example"
                >
                  info@marveltravel.example
                </a>
              </li>
              <li>40 Arundel Gardens, Ilford IG3 9SX</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Marvel Travel UK. All rights reserved.</p>
          <p className="max-w-xl">
            Independent travel service provider — not affiliated with airlines unless
            stated. Bookings subject to availability and supplier terms.
          </p>
        </div>
      </div>
    </footer>
  )
}
