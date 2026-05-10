import { DestinationCard } from '@/components/cards/DestinationCard'

export function DestinationsSection({ destinations }) {
  return (
    <section className="border-b border-border bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Fly from the UK
          </p>
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Popular destinations &mdash; direct & connecting routes
          </h2>
          <p className="text-muted">
            Competitive fares to flagship hubs worldwide — tap through for a
            personalised quote.
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
