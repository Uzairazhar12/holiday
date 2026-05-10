import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { deleteTour, listTours } from '@/services/tourService'
import { isFirebaseConfigured } from '@/api/firebase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { notify } from '@/utils/notify'

export default function ToursAdmin() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    setLoading(true)
    try {
      setRows(await listTours())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    queueMicrotask(() => {
      void refresh()
    })
  }, [])

  const onDelete = async (id, title) => {
    if (!isFirebaseConfigured()) {
      notify({
        variant: 'destructive',
        title: 'Firebase required',
        description: 'Connect Firebase to delete persisted tours.',
      })
      return
    }
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return
    try {
      await deleteTour(id)
      notify({ title: 'Tour removed' })
      refresh()
    } catch (e) {
      notify({
        variant: 'destructive',
        title: 'Delete failed',
        description: e.message,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Tours</h1>
          <p className="text-muted">
            Manage itineraries, hero imagery and merchandising flags.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/dashboard/tours/new">
            <Plus className="h-4 w-4" />
            Add tour
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Catalogue</CardTitle>
          <CardDescription>
            Featured tours surface on the homepage carousel automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border text-muted">
              <tr>
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">From</th>
                <th className="pb-3 font-medium">Featured</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-muted">
                    Loading…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-muted">
                    No tours yet — craft your first itinerary.
                  </td>
                </tr>
              ) : (
                rows.map((t) => (
                  <tr key={t.id} className="border-b border-border/70">
                    <td className="py-4">
                      <div className="font-medium text-foreground">{t.title}</div>
                      <div className="text-xs text-muted">/{t.slug}</div>
                    </td>
                    <td className="py-4">{t.category}</td>
                    <td className="py-4">£{t.priceFrom}</td>
                    <td className="py-4">
                      {t.featured ? <Badge>Featured</Badge> : <span className="text-muted">—</span>}
                    </td>
                    <td className="py-4 text-right space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/tours/${t.slug}`} target="_blank">
                          View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/dashboard/tours/${t.id}/edit`}>Edit</Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        type="button"
                        onClick={() => onDelete(t.id, t.title)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
