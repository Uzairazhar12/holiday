import { useEffect, useState } from 'react'
import { listBookings, updateBookingStatus } from '@/services/bookingService'
import { isFirebaseConfigured } from '@/api/firebase'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { notify } from '@/utils/notify'

function formatTs(ts) {
  if (!ts) return '—'
  if (typeof ts?.toDate === 'function') return ts.toDate().toLocaleString()
  if (ts.seconds) return new Date(ts.seconds * 1000).toLocaleString()
  return String(ts)
}

const statuses = ['pending', 'accepted', 'rejected']

export default function BookingsAdmin() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    setLoading(true)
    try {
      setRows(await listBookings())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    queueMicrotask(() => {
      void refresh()
    })
  }, [])

  const changeStatus = async (id, status) => {
    if (!isFirebaseConfigured()) return
    try {
      await updateBookingStatus(id, status)
      notify({ title: 'Booking updated' })
      refresh()
    } catch (e) {
      notify({
        variant: 'destructive',
        title: 'Update failed',
        description: e.message,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Bookings</h1>
        <p className="text-muted">
          Track enquiries coming from tour detail embeds, booking page and contact forms.
        </p>
        {!isFirebaseConfigured() ? (
          <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            Firebase not configured — demo mode cannot persist bookings yet.
          </p>
        ) : null}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>Accept or reject once routing has been verified.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="border-b border-border text-muted">
              <tr>
                <th className="pb-3 font-medium">Guest</th>
                <th className="pb-3 font-medium">Tour</th>
                <th className="pb-3 font-medium">Travellers</th>
                <th className="pb-3 font-medium">Departure</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Received</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-muted">
                    Loading…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-muted">
                    No enquiries yet.
                  </td>
                </tr>
              ) : (
                rows.map((b) => (
                  <tr key={b.id} className="border-b border-border/70 align-top">
                    <td className="py-4">
                      <div className="font-medium text-foreground">{b.fullName}</div>
                      <div className="text-xs text-muted">{b.email}</div>
                      <div className="text-xs text-muted">{b.phone}</div>
                    </td>
                    <td className="py-4">
                      <div>{b.tourTitle || 'General enquiry'}</div>
                      {b.tourSlug ? (
                        <div className="text-xs text-muted">/{b.tourSlug}</div>
                      ) : null}
                    </td>
                    <td className="py-4">{b.travellers ?? '—'}</td>
                    <td className="py-4">{b.departureDate || '—'}</td>
                    <td className="py-4">
                      <Select
                        value={b.status || 'pending'}
                        onValueChange={(v) => changeStatus(b.id, v)}
                        disabled={!isFirebaseConfigured()}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-4 text-xs text-muted">{formatTs(b.createdAt)}</td>
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
