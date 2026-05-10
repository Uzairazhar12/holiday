import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Minus, Star } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { TourGallery } from '@/components/sections/TourGallery'
import { BookingForm } from '@/components/forms/BookingForm'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { getTourBySlug } from '@/services/tourService'

const SAMPLE_REVIEWS = [
  {
    name: 'Priya & Rohan',
    text: 'Thoughtful routing and swift answers on WhatsApp — felt looked after end-to-end.',
    rating: 5,
  },
  {
    name: 'Daniel W.',
    text: 'Clear paperwork and competitive fare versus airline direct. Highly recommend.',
    rating: 5,
  },
]

export default function TourDetails() {
  const { slug } = useParams()
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const row = await getTourBySlug(slug)
        if (!cancelled) setTour(row)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [slug])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 lg:px-8">
        <Skeleton className="h-[420px] w-full rounded-[var(--radius-lg)]" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Tour not found</h1>
        <Button asChild className="mt-6">
          <Link to="/tours">Back to tours</Link>
        </Button>
      </div>
    )
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: tour.title,
    description: tour.summary,
    image: tour.images,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: tour.priceFrom,
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <>
      <SEO
        title={tour.seoTitle || tour.title}
        description={tour.seoDescription || tour.summary}
        canonicalPath={`/tours/${tour.slug}`}
        image={tour.images?.[0]}
        jsonLd={jsonLd}
      />

      <div className="border-b border-border bg-card py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 text-sm text-muted sm:px-6 lg:px-8">
          <Link className="hover:text-foreground" to="/">
            Home
          </Link>
          <span>/</span>
          <Link className="hover:text-foreground" to="/tours">
            Tours
          </Link>
          <span>/</span>
          <span className="text-foreground">{tour.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="space-y-10">
            <TourGallery images={tour.images} title={tour.title} />
            <div className="flex flex-wrap gap-2">
              {tour.tags?.map((t) => (
                <Badge key={t} variant="accent">
                  {t}
                </Badge>
              ))}
            </div>
            <div>
              <h1 className="font-display text-4xl text-foreground sm:text-5xl">
                {tour.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-muted">{tour.description}</p>
            </div>

            <section className="space-y-4">
              <h2 className="font-display text-2xl">Itinerary highlights</h2>
              <div className="space-y-4">
                {(tour.itinerary || []).map((leg, idx) => (
                  <motion.div
                    key={leg.title + idx}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="rounded-[var(--radius-lg)] border border-border bg-card p-5 shadow-sm"
                  >
                    <p className="text-xs uppercase tracking-wide text-primary">
                      Stage {idx + 1}
                    </p>
                    <p className="font-display text-xl">{leg.title}</p>
                    <p className="mt-2 text-sm text-muted">{leg.detail}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(tour.included || []).map((line) => (
                    <div key={line} className="flex gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{line}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Not included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(tour.excluded || []).map((line) => (
                    <div key={line} className="flex gap-2 text-sm">
                      <Minus className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                      <span>{line}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Separator />

            <section className="space-y-4">
              <h2 className="font-display text-2xl">Recent traveller feedback</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {SAMPLE_REVIEWS.map((r) => (
                  <Card key={r.name}>
                    <CardContent className="space-y-3 pt-6">
                      <div className="flex gap-1">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                      <p className="text-xs uppercase tracking-wide text-muted">
                        {r.name}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Card className="border-border shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="font-display text-3xl">
                  £{tour.priceFrom?.toLocaleString?.() ?? tour.priceFrom}
                  <span className="text-base font-sans text-muted"> pp</span>
                </CardTitle>
                {tour.depositNote ? (
                  <p className="text-sm text-muted">{tour.depositNote}</p>
                ) : null}
              </CardHeader>
              <CardContent className="space-y-6">
                <BookingForm tour={tour} />
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/booking/${tour.id}`}>Open full booking page</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
