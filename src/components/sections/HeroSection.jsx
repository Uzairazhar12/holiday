import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CalendarDays,
  Mail,
  MapPin,
  Palmtree,
  Phone,
  Plane,
  Search,
  Shield,
  User,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BRAND } from '@/config/brand'
import { getHeroBackgroundImageUrls, HERO_FALLBACK_IMAGES } from '@/config/heroBackgrounds'
import { useHeroSearchStore } from '@/store/heroSearchStore'
import { cn } from '@/lib/utils'

const ORIGINS = [
  'London Heathrow (LHR)',
  'London Gatwick (LGW)',
  'London Luton (LTN)',
  'Manchester (MAN)',
  'Birmingham (BHX)',
  'Edinburgh (EDI)',
]

const DESTINATIONS = [
  'Bangkok (BKK)',
  'Dubai (DXB)',
  'Maldives (MLE)',
  'Istanbul (IST)',
  'New York (JFK)',
  'Phuket (HKT)',
  'Barcelona (BCN)',
  'Paris (CDG)',
]

const TRAVELLER_PRESETS = [
  { label: '01 Adt — 00 Chd — 00 Inf', value: '1-0-0' },
  { label: '02 Adt — 00 Chd — 00 Inf', value: '2-0-0' },
  { label: '02 Adt — 01 Chd — 00 Inf', value: '2-1-0' },
  { label: '02 Adt — 02 Chd — 00 Inf', value: '2-2-0' },
  { label: '02 Adt — 01 Chd — 01 Inf', value: '2-1-1' },
]

function randomCaptcha() {
  const a = Math.floor(Math.random() * 12) + 3
  const b = Math.floor(Math.random() * 12) + 3
  return { a, b, sum: a + b }
}

function FieldLabel({ icon: Icon, children }) {
  return (
    <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#E65100]">
      {Icon ? <Icon className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden /> : null}
      {children}
    </label>
  )
}

const selectClass =
  'h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none ring-offset-white focus:ring-2 focus:ring-[#283593]/30'

export function HeroSection() {
  const navigate = useNavigate()
  const { tab, setTab } = useHeroSearchStore()
  const [slides, setSlides] = useState(() => [...HERO_FALLBACK_IMAGES])
  const [slideIndex, setSlideIndex] = useState(0)
  const [captcha, setCaptcha] = useState(() => randomCaptcha())
  const [flightTrip, setFlightTrip] = useState('return')

  useEffect(() => {
    let cancelled = false
    getHeroBackgroundImageUrls().then((urls) => {
      if (!cancelled && urls?.length) setSlides(urls)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const slideCount = slides.length

  useEffect(() => {
    queueMicrotask(() => setSlideIndex(0))
  }, [slideCount])

  useEffect(() => {
    if (slideCount <= 1) return undefined
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % slideCount)
    }, 4000)
    return () => window.clearInterval(id)
  }, [slideCount])

  const submitHolidays = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const answer = Number.parseInt(fd.get('captcha')?.toString().trim() ?? '', 10)
    if (answer !== captcha.sum) {
      setCaptcha(randomCaptcha())
      window.alert('Security check failed — please solve the sum again.')
      return
    }
    const params = new URLSearchParams({
      type: 'holiday',
      fullName: fd.get('fullName')?.toString() || '',
      email: fd.get('email')?.toString() || '',
      phone: fd.get('phone')?.toString() || '',
      departure: fd.get('departure')?.toString() || '',
      travellers: fd.get('travellers')?.toString() || '',
      from: fd.get('from')?.toString() || '',
      to: fd.get('to')?.toString() || '',
    })
    navigate(`/contact?${params.toString()}`)
  }

  const submitFlights = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const params = new URLSearchParams({
      type: 'flight',
      trip: flightTrip,
      from: fd.get('from')?.toString() || '',
      to: fd.get('to')?.toString() || '',
      depart: fd.get('depart')?.toString() || '',
      ret: fd.get('return')?.toString() || '',
      travellers: fd.get('travellers')?.toString() || '',
      cabin: fd.get('cabin')?.toString() || 'Economy',
    })
    navigate(`/contact?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[min(100vh,920px)] overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0 bg-slate-900">
        {slides.map((src, i) => (
          <motion.img
            key={src + i}
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={false}
            animate={{ opacity: slideIndex === i ? 1 : 0 }}
            transition={{ duration: 1.25, ease: 'easeInOut' }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        {/* Orange → navy overlay (reference layout) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(230,81,0,0.88) 0%, rgba(230,81,0,0.35) 38%, rgba(40,53,147,0.55) 62%, rgba(26,35,126,0.92) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center text-white"
        >
          <h1 className="font-display text-4xl font-semibold tracking-tight drop-shadow-sm sm:text-5xl md:text-6xl">
            {BRAND.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
            {BRAND.tagline} Flights, packages, and memorable getaways with expert support.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-10 w-full max-w-5xl rounded-2xl border border-white/25 bg-white p-4 shadow-[0_28px_80px_-20px_rgba(0,0,0,0.45)] sm:p-6 md:p-8"
        >
          {/* Tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTab('holidays')}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition',
                tab === 'holidays'
                  ? 'bg-gradient-to-r from-[#E65100] to-[#1A237E] text-white shadow-md'
                  : 'bg-slate-100 text-[#283593] hover:bg-slate-200',
              )}
            >
              <Palmtree className="h-4 w-4" aria-hidden />
              Holidays
            </button>
            <button
              type="button"
              onClick={() => setTab('flights')}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition',
                tab === 'flights'
                  ? 'bg-gradient-to-r from-[#E65100] to-[#1A237E] text-white shadow-md'
                  : 'bg-slate-100 text-[#283593] hover:bg-slate-200',
              )}
            >
              <Plane className="h-4 w-4" aria-hidden />
              Flights
            </button>
          </div>

          {tab === 'holidays' ? (
            <form onSubmit={submitHolidays} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <FieldLabel icon={User}>Full Name *</FieldLabel>
                  <Input
                    name="fullName"
                    required
                    placeholder="e.g. John Smith"
                    className="h-11 rounded-lg border-slate-200 bg-white"
                  />
                </div>
                <div>
                  <FieldLabel icon={Mail}>Email Address *</FieldLabel>
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="h-11 rounded-lg border-slate-200 bg-white"
                  />
                </div>
                <div>
                  <FieldLabel icon={Phone}>Phone Number *</FieldLabel>
                  <Input
                    name="phone"
                    required
                    placeholder="07…"
                    className="h-11 rounded-lg border-slate-200 bg-white"
                  />
                </div>
                <div>
                  <FieldLabel icon={CalendarDays}>Departure Date *</FieldLabel>
                  <Input
                    name="departure"
                    type="date"
                    required
                    className="h-11 rounded-lg border-slate-200 bg-white"
                  />
                </div>
                <div>
                  <FieldLabel icon={Users}>Travellers *</FieldLabel>
                  <select name="travellers" required defaultValue="1-0-0" className={selectClass}>
                    {TRAVELLER_PRESETS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <FieldLabel icon={MapPin}>Flying From *</FieldLabel>
                  <select name="from" required defaultValue="" className={selectClass}>
                    <option value="" disabled>
                      Select origin
                    </option>
                    {ORIGINS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <FieldLabel icon={MapPin}>Flying To *</FieldLabel>
                  <select name="to" required defaultValue="" className={selectClass}>
                    <option value="" disabled>
                      Select destination
                    </option>
                    {DESTINATIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <FieldLabel icon={Shield}>
                    Security Check * ({captcha.a} + {captcha.b} = ?)
                  </FieldLabel>
                  <Input
                    name="captcha"
                    inputMode="numeric"
                    required
                    autoComplete="off"
                    placeholder="Answer"
                    className="h-11 rounded-lg border-slate-200 bg-white"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-gradient-to-r from-[#E65100] to-[#1A237E] text-base font-semibold text-white shadow-lg hover:opacity-[0.97]"
              >
                <Search className="mr-2 h-5 w-5" aria-hidden />
                Search Holidays
              </Button>
            </form>
          ) : (
            <form onSubmit={submitFlights} className="space-y-5">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFlightTrip('return')}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-semibold',
                    flightTrip === 'return'
                      ? 'bg-[#1A237E] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                  )}
                >
                  Return
                </button>
                <button
                  type="button"
                  onClick={() => setFlightTrip('oneway')}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-semibold',
                    flightTrip === 'oneway'
                      ? 'bg-[#1A237E] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                  )}
                >
                  One Way
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <FieldLabel icon={MapPin}>Flying From *</FieldLabel>
                  <select name="from" required defaultValue="" className={selectClass}>
                    <option value="" disabled>
                      Select origin
                    </option>
                    {ORIGINS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <FieldLabel icon={MapPin}>Flying To *</FieldLabel>
                  <select name="to" required defaultValue="" className={selectClass}>
                    <option value="" disabled>
                      Select destination
                    </option>
                    {DESTINATIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <FieldLabel icon={CalendarDays}>Departure *</FieldLabel>
                  <Input
                    name="depart"
                    type="date"
                    required
                    className="h-11 rounded-lg border-slate-200 bg-white"
                  />
                </div>
                <div>
                  <FieldLabel icon={CalendarDays}>Return Date</FieldLabel>
                  <Input
                    name="return"
                    type="date"
                    disabled={flightTrip === 'oneway'}
                    className="h-11 rounded-lg border-slate-200 bg-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <FieldLabel icon={Users}>Travellers *</FieldLabel>
                  <select name="travellers" required defaultValue="1-0-0" className={selectClass}>
                    {TRAVELLER_PRESETS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-2">
                  <FieldLabel icon={Plane}>Cabin Class</FieldLabel>
                  <select name="cabin" defaultValue="Economy" className={selectClass}>
                    {['Economy', 'Premium Economy', 'Business', 'First'].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-gradient-to-r from-[#E65100] to-[#1A237E] text-base font-semibold text-white shadow-lg hover:opacity-[0.97]"
              >
                <Search className="mr-2 h-5 w-5" aria-hidden />
                Search Flights
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
