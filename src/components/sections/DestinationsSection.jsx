import { DestinationCard } from '@/components/cards/DestinationCard'

export function DestinationsSection({ destinations }) {
  return (
    <section className="border-b border-border bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Global gateways
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Popular routes from the United Kingdom
          </h2>
          <p className="text-muted">
            Request a fare snapshot for hub airports and regional departures — we layer in
            baggage, seat choice and flexible ticket rules where they matter.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(destinations || []).map((d, i) => (
            <DestinationCard key={d.slug} dest={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
