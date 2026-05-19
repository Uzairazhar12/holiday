import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Flame,
  Leaf,
  Lock,
  MapPin,
  Moon,
  Palmtree,
  PartyPopper,
  Sparkles,
  Tag,
  UtensilsCrossed,
  Waves,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const TAG_META = {
  Party: { className: 'bg-orange-50 text-orange-700', Icon: PartyPopper },
  Nature: { className: 'bg-emerald-50 text-emerald-700', Icon: Leaf },
  Relax: { className: 'bg-sky-50 text-sky-700', Icon: Palmtree },
  'All-Inclusive': { className: 'bg-amber-50 text-amber-800', Icon: UtensilsCrossed },
  'Lagoon Villa': { className: 'bg-cyan-50 text-cyan-800', Icon: Waves },
  'City Break': { className: 'bg-violet-50 text-violet-700', Icon: Sparkles },
  Culture: { className: 'bg-teal-50 text-teal-800', Icon: Leaf },
  Coast: { className: 'bg-blue-50 text-blue-700', Icon: Waves },
  'Direct Flight': { className: 'bg-slate-100 text-slate-700', Icon: Sparkles },
  'Ultra Luxury': { className: 'bg-amber-50 text-amber-900', Icon: Sparkles },
  Luxury: { className: 'bg-teal-50 text-teal-800', Icon: Sparkles },
}

function TagPill({ label }) {
  const meta = TAG_META[label] ?? {
    className: 'bg-slate-100 text-slate-700',
    Icon: Sparkles,
  }
  const Icon = meta.Icon
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold',
        meta.className,
      )}
    >
      <Icon className="h-3 w-3 shrink-0" aria-hidden />
      {label}
    </span>
  )
}

export function TourCard({ tour, index = 0 }) {
  const img = tour.images?.[0]
  const price =
    tour.priceFrom != null
      ? `£${Number(tour.priceFrom).toLocaleString('en-GB')}pp`
      : null
  const tags = (tour.tags || []).slice(0, 3)
  const isHot = tour.featured || tour.category === 'Ultra Luxury'

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <Card className="flex h-full min-h-[28rem] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-0 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-14px_rgba(15,23,42,0.18)]">
        <Link
          to={`/tours/${tour.slug}`}
          className="group flex h-full min-h-[28rem] flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 focus-visible:ring-offset-2"
        >
          {/* Image — fixed height so all cards align */}
          <div className="relative h-[220px] shrink-0 overflow-hidden sm:h-[230px]">
            {img ? (
              <img
                src={img}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-slate-500">
                Image coming soon
              </div>
            )}

            {tour.nights ? (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                <Moon className="h-3.5 w-3.5" aria-hidden />
                {tour.nights} Nights
              </span>
            ) : null}

            {isHot ? (
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                <Flame className="h-3 w-3" aria-hidden />
                Hot deal
              </span>
            ) : null}

            {price ? (
              <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                <Tag className="h-3.5 w-3.5" aria-hidden />
                From {price}
              </span>
            ) : null}
          </div>

          {/* Body — grows so footer pins to bottom on every card */}
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-900 text-white shadow-sm">
                <MapPin className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                  {tour.title}
                </h3>
                <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-slate-500">
                  {tour.summary || tour.category}
                </p>
              </div>
            </div>

            <div className="mt-4 flex min-h-[2rem] flex-wrap content-start gap-2">
              {tags.length > 0 ? (
                tags.map((t) => <TagPill key={t} label={t} />)
              ) : (
                <span className="invisible inline-flex rounded-full px-2.5 py-1 text-[11px]">
                  —
                </span>
              )}
            </div>

            <p className="mt-auto flex items-start gap-2 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" aria-hidden />
              <span className="line-clamp-2 min-h-[2.25rem]">
                {tour.depositNote || 'Flexible deposits — speak to our team for options'}
              </span>
            </p>
          </div>
        </Link>
      </Card>
    </motion.div>
  )
}
