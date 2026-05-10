import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { BookingForm } from '@/components/forms/BookingForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getTourById } from '@/services/tourService'

export default function Booking() {
  const { tourId } = useParams()
  const [tour, setTour] = useState(null)

  useEffect(() => {
    if (!tourId) return
    let cancelled = false
    ;(async () => {
      const row = await getTourById(tourId)
      if (!cancelled) setTour(row)
    })()
    return () => {
      cancelled = true
    }
  }, [tourId])

  return (
    <>
      <SEO
        title="Book your holiday"
        description="Submit your travel details — Marvel Travel UK specialists confirm routing, pricing and ATOL paperwork."
        canonicalPath="/booking"
      />
      <div className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Booking enquiry
        </p>
        <h1 className="mt-3 font-display text-4xl text-foreground">
          Tell us how you love to travel
        </h1>
        <p className="mt-4 text-muted">
          We&apos;ll verify live fare buckets, hotel allotments and promotional fares before
          issuing paperwork — expect a human reply, not an auto-bot.
        </p>

        <Card className="mt-10 shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="font-display text-2xl">
              {tour ? tour.title : 'Flexible enquiry'}
            </CardTitle>
            {tour ? (
              <Link className="text-sm font-semibold text-primary" to={`/tours/${tour.slug}`}>
                View tour details
              </Link>
            ) : (
              <p className="text-sm text-muted">
                No specific tour selected — we&apos;ll design from scratch.
              </p>
            )}
          </CardHeader>
          <CardContent>
            <BookingForm tour={tour} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
