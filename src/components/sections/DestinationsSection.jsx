import { Globe2 } from 'lucide-react'
import { DestinationCard } from '@/components/cards/DestinationCard'
import { DESTINATION_REGIONS } from '@/config/destinationRegions'

function RegionBlock({ region, regionIndex }) {
  return (
    <div className={regionIndex > 0 ? 'mt-14 sm:mt-16' : ''}>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-800 text-white shadow-sm">
          <Globe2 className="h-4 w-4" aria-hidden />
        </span>
        <h3 className="shrink-0 font-display text-xl font-bold text-slate-900 sm:text-2xl">
          {region.name}
        </h3>
        <span className="h-px flex-1 bg-slate-200" aria-hidden />
      </div>

      <div className="mt-6 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {region.destinations.map((dest, i) => (
          <DestinationCard
            key={dest.slug}
            dest={dest}
            index={regionIndex * 10 + i}
          />
        ))}
      </div>
    </div>
  )
}

export function DestinationsSection({ regions = DESTINATION_REGIONS }) {
  return (
    <section className="border-b border-border bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">
            Fly worldwide
          </p>
          <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Popular destinations from the UK
          </h2>
          <p className="text-slate-600">
            Compare fares by region — city, airport code and indicative pricing in one
            glance.
          </p>
        </div>

        <div className="mt-12 sm:mt-14">
          {regions.map((region, i) => (
            <RegionBlock key={region.id} region={region} regionIndex={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
