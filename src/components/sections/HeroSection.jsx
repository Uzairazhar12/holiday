import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarDays, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function HeroSection() {
  const navigate = useNavigate()

  const searchPackages = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const q = fd.get('q')?.toString().trim()
    navigate(q ? `/tours?search=${encodeURIComponent(q)}` : '/tours')
  }

  const searchFlights = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const from = fd.get('from')?.toString().trim()
    const to = fd.get('to')?.toString().trim()
    const qs = new URLSearchParams()
    if (from) qs.set('from', from)
    if (to) qs.set('to', to)
    navigate(`/contact?${qs.toString()}&type=flight`)
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-linear-to-b from-primary/12 via-background to-background">
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-accent blur-[110px]" />
        <div className="absolute right-10 top-32 h-64 w-64 rounded-full bg-primary blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:flex lg:items-center lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-xl lg:flex-1"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Marvel Travel UK
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Luxury escapes, curated packages & fares worth catching.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
            Your trusted partner for holidays from the UK — unforgettable tours,
            handpicked hotels, and a concierge-style team on WhatsApp and phone.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href="#featured-tours">Browse featured tours</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:02033322614">Call 0203 332 2614</a>
            </Button>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border/70 pt-8 text-sm">
            <div>
              <dt className="text-muted">ATOL peace</dt>
              <dd className="font-semibold text-foreground">Protected trips</dd>
            </div>
            <div>
              <dt className="text-muted">12 years</dt>
              <dd className="font-semibold text-foreground">Avg. consultant tenure</dd>
            </div>
            <div>
              <dt className="text-muted">2 hrs</dt>
              <dd className="font-semibold text-foreground">Expert callbacks</dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mt-12 w-full max-w-xl lg:mt-0 lg:flex-1"
        >
          <Tabs defaultValue="packages" className="rounded-[var(--radius-lg)] border border-border bg-card/95 p-4 shadow-[var(--shadow-soft)] backdrop-blur">
            <TabsList className="grid w-full grid-cols-2 bg-background/80">
              <TabsTrigger value="packages">Holiday packages</TabsTrigger>
              <TabsTrigger value="flights">Flight enquiry</TabsTrigger>
            </TabsList>

            <TabsContent value="packages" className="space-y-4 pt-4">
              <form onSubmit={searchPackages} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Where do you want to go?
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted" />
                    <Input
                      name="q"
                      placeholder="Maldives, Thailand, Croatia…"
                      className="pl-9"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Search packages
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="flights" className="space-y-4 pt-4">
              <form onSubmit={searchFlights} className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Flying from
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted" />
                    <Input name="from" placeholder="London, Manchester…" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Flying to (optional)
                  </label>
                  <Input name="to" placeholder="Destination or airport" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Depart
                  </label>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted" />
                    <Input name="depart" type="date" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Return
                  </label>
                  <Input name="return" type="date" />
                </div>
                <Button type="submit" className="w-full sm:col-span-2">
                  Send flight enquiry
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
