import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
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
  { to: '/tours', label: 'Holidays' },
  { to: '/blogs', label: 'Blog' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const wa = `https://wa.me/${BRAND.whatsappDigits.replace(/\D/g, '')}`

  return (
    <div className="sticky top-0 z-50 shadow-sm">
      <EpicTopBar />
      <header className="border-b border-slate-200/90 bg-white">
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <EpicLogo />

          <nav className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  cn(
                    'relative text-sm font-semibold text-slate-600 transition hover:text-teal-800',
                    isActive &&
                      'font-bold text-teal-900 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-teal-600',
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
              className="gap-2 rounded-full border border-[#25D366] bg-white px-4 text-[#128C7E] shadow-none hover:bg-[#25D366]/10"
              variant="outline"
            >
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden />
                WhatsApp
              </a>
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5 text-slate-800" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6">
              <SheetHeader>
                <SheetTitle className="font-display text-left text-2xl text-slate-900">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-3">
                {[...links, ...moreLinks].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-2 text-lg text-slate-800 hover:bg-slate-50"
                  >
                    {l.label}
                  </Link>
                ))}
                <Button asChild className="mt-2 w-full rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a]">
                  <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
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
