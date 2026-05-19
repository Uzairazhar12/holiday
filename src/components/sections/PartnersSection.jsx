import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PARTNERS } from '@/config/partners'

function PartnerLogo({ partner }) {
  if (partner.type === 'text') {
    return (
      <div className="flex h-20 w-full flex-col items-center justify-center px-4 text-center">
        <p className="font-display text-base font-bold leading-tight text-slate-800">
          {partner.name}
        </p>
        {partner.tagline ? (
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-teal-700">
            {partner.tagline}
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <div className="flex h-20 w-full items-center justify-center px-6">
      <img
        src={partner.logo}
        alt={partner.name}
        className="max-h-12 w-auto max-w-[140px] object-contain opacity-90 grayscale transition hover:grayscale-0 hover:opacity-100"
        loading="lazy"
      />
    </div>
  )
}

export function PartnersSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="border-b border-border bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            We are partners with
          </h2>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Trusted global partners for years
          </p>
        </div>

        <div className="relative mt-10 sm:mt-12">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-0 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-slate-300 bg-slate-800 text-white shadow-md hover:bg-slate-900 hover:text-white sm:-left-2"
            onClick={scrollPrev}
            aria-label="Previous partners"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div ref={emblaRef} className="overflow-hidden px-12 sm:px-14">
            <div className="flex touch-pan-y">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.id}
                  className="min-w-0 flex-[0_0_50%] px-3 sm:flex-[0_0_33.333%] md:flex-[0_0_25%] lg:flex-[0_0_20%]"
                >
                  <div className="flex min-h-[5.5rem] items-center justify-center rounded-xl border border-slate-100 bg-slate-50/80">
                    <PartnerLogo partner={partner} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-0 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-slate-300 bg-slate-800 text-white shadow-md hover:bg-slate-900 hover:text-white sm:-right-2"
            onClick={scrollNext}
            aria-label="Next partners"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
