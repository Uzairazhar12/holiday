import { TourCard } from '@/components/cards/TourCard'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function FeaturedToursSection({ tours }) {
  return (
    <section id="featured-tours" className="border-b border-border bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Featured packages
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Hand-picked tours with transparent per-person pricing
            </h2>
            <p className="text-muted">
              Each shortlist is checked for realistic connections, sensible layovers and
              hotel quality — so the trip you see is the trip you board.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/tours">Browse all tours</Link>
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {(tours || []).slice(0, 6).map((t, i) => (
            <TourCard key={t.id || t.slug} tour={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
