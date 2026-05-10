import { TourCard } from '@/components/cards/TourCard'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function FeaturedToursSection({ tours }) {
  return (
    <section id="featured-tours" className="border-b border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Curated escapes
            </p>
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">
              Featured tours customers love right now
            </h2>
            <p className="text-muted">
              Multi-centre Asia, ultra-luxe Maldives combos and Adriatic culture —
              each itinerary refined by our consultants for smooth routing.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/tours">View all tours</Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {(tours || []).slice(0, 6).map((t, i) => (
            <TourCard key={t.id || t.slug} tour={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
