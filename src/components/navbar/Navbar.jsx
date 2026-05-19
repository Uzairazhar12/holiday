import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { EpicTopBar } from '@/components/navbar/EpicTopBar'
import { EpicLogo } from '@/components/navbar/EpicLogo'
import { BRAND } from '@/config/brand'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
]

const moreLinks = [
  { to: '/tours', label: 'Tours' },
  { to: '/blogs', label: 'Blog' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const wa = `https://wa.me/${BRAND.whatsappDigits.replace(/\D/g, '')}`

  return (
    <div className="sticky top-0 z-50 shadow-sm">
      <EpicTopBar />
      <header className="border-b border-slate-200/90 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-0.5 sm:px-6 lg:px-8">
          <EpicLogo variant="header" />

          <nav className="hidden items-center gap-11 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  cn(
                    'relative text-[1.05rem] font-bold text-slate-700 transition hover:text-teal-900',
                    isActive &&
                      'text-teal-900 after:absolute after:-bottom-2.5 after:left-0 after:h-1 after:w-full after:rounded-full after:bg-teal-600',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button
              asChild
              className="h-10 gap-2 rounded-full border-2 border-[#25D366] bg-white px-4 text-sm font-bold text-[#0f766e] shadow-none hover:bg-emerald-50"
              variant="outline"
            >
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 text-[#25D366]" aria-hidden />
                WhatsApp
              </a>
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6 text-slate-800" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className={cn(
                'flex w-[min(100vw-1rem,22rem)] flex-col gap-0 border-l-2 border-teal-600/30 p-0 pt-14',
                'bg-gradient-to-b from-slate-50 via-white to-teal-50/50 shadow-2xl',
                '[&>button]:right-3 [&>button]:top-3 [&>button]:rounded-full [&>button]:border [&>button]:border-teal-200 [&>button]:bg-white [&>button]:p-2.5 [&>button]:text-teal-900 [&>button]:shadow-md [&>button]:hover:bg-teal-50',
              )}
            >
              <SheetTitle className="sr-only">Main navigation</SheetTitle>
              <div className="border-b border-teal-200/60 bg-white/95 px-5 py-5">
                <EpicLogo
                  variant="drawer"
                  onNavigate={() => setOpen(false)}
                  className="w-full"
                />
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
                {[...links, ...moreLinks].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-transparent px-4 py-3.5 text-lg font-bold text-slate-800 transition hover:border-teal-200/80 hover:bg-teal-600/10 hover:text-teal-900"
                  >
                    {l.label}
                  </Link>
                ))}
                <Button
                  asChild
                  className="mt-4 h-12 w-full rounded-full bg-[#25D366] text-base font-bold text-white shadow-md hover:bg-[#20bd5a]"
                >
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    WhatsApp
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  )
}
