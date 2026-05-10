import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { TourCard } from '@/components/cards/TourCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { listTours } from '@/services/tourService'
import { TOUR_CATEGORIES } from '@/utils/constants'

export default function Tours() {
  const [params, setParams] = useSearchParams()
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)

  const search = params.get('search') || ''
  const category = params.get('category') || ''
  const maxPrice = params.get('maxPrice')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const rows = await listTours({
          search: search || undefined,
          category: category || undefined,
          maxPrice: maxPrice ? Number(maxPrice) : undefined,
        })
        if (!cancelled) setTours(rows)
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [search, category, maxPrice])

  const categoryLabel = useMemo(() => category || 'All categories', [category])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  return (
    <>
      <SEO
        title="Holiday packages & tours"
        description="Browse curated multi-centre tours, luxury escapes and beach breaks departing from the UK."
        canonicalPath="/tours"
      />
      <div className="border-b border-border bg-card py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div className="max-w-xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Tours & packages
            </p>
            <h1 className="font-display text-4xl text-foreground">
              Handpicked itineraries with expert routing
            </h1>
            <p className="text-muted">
              Filter by mood, budget and destination — every booking is
              double-checked by our consultants.
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="tel:02033322614">Speak to an expert</a>
          </Button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="space-y-6 rounded-[var(--radius-lg)] border border-border bg-card p-6 shadow-sm lg:h-fit lg:sticky lg:top-24">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              defaultValue={search}
              placeholder="Destination or keyword"
              onBlur={(e) => updateParam('search', e.target.value.trim())}
              onKeyDown={(e) => {
                if (e.key === 'Enter')
                  updateParam('search', e.currentTarget.value.trim())
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={category || 'all'}
              onValueChange={(v) => updateParam('category', v === 'all' ? '' : v)}
            >
              <SelectTrigger>
                <SelectValue placeholder={categoryLabel} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {TOUR_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxPrice">Max price (pp)</Label>
            <Input
              id="maxPrice"
              type="number"
              min={0}
              placeholder="e.g. 2500"
              defaultValue={maxPrice || ''}
              onBlur={(e) => updateParam('maxPrice', e.target.value.trim())}
            />
          </div>
          <Button
            variant="ghost"
            className="w-full"
            type="button"
            onClick={() => setParams(new URLSearchParams())}
          >
            Reset filters
          </Button>
        </aside>

        <div>
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[420px] w-full rounded-[var(--radius-lg)]" />
              ))}
            </div>
          ) : tours.length === 0 ? (
            <p className="rounded-[var(--radius-lg)] border border-dashed border-border bg-card p-10 text-center text-muted">
              No tours match these filters yet — adjust filters or{' '}
              <a className="font-semibold text-primary" href="/contact">
                request a bespoke quote
              </a>
              .
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {tours.map((t, i) => (
                <TourCard key={t.id || t.slug} tour={t} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
