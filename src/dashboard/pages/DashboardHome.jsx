import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listTours } from '@/services/tourService'
import { listBookings } from '@/services/bookingService'
import { listBlogs } from '@/services/blogService'
import { isFirebaseConfigured } from '@/api/firebase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DashboardHome() {
  const [stats, setStats] = useState({ tours: 0, bookings: 0, blogs: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [tours, bookings, blogs] = await Promise.all([
          listTours(),
          listBookings(),
          listBlogs(),
        ])
        if (!cancelled)
          setStats({
            tours: tours.length,
            bookings: bookings.length,
            blogs: blogs.length,
          })
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const firebaseReady = isFirebaseConfigured()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Overview</h1>
        <p className="text-muted">
          Monitor enquiries, publish itineraries and keep editorial fresh — all synced via
          Firebase & AWS assets.
        </p>
        {!firebaseReady ? (
          <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            Firebase env vars missing — you&apos;re seeing demo counts from bundled sample data.
            Copy <code className="rounded bg-white px-1">.env.example</code> &rarr;{' '}
            <code className="rounded bg-white px-1">.env</code> to enable persistence.
          </p>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: 'Active tours', value: stats.tours, to: '/dashboard/tours' },
          { label: 'Bookings', value: stats.bookings, to: '/dashboard/bookings' },
          { label: 'Blog posts', value: stats.blogs, to: '/dashboard/blogs' },
        ].map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted">
                {card.label}
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to={card.to}>Open</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl text-foreground">
                {loading ? '…' : card.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/dashboard/tours/new">New tour</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/dashboard/blogs/new">New blog</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/dashboard/bookings">Review bookings</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
