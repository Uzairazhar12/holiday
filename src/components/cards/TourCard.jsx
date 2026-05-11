import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function TourCard({ tour, index = 0 }) {
  const img = tour.images?.[0]
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden border-border/80 bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
        <div className="relative aspect-[16/11] overflow-hidden">
          {img ? (
            <img
              src={img}
              alt=""
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-background text-sm text-muted">
              Image coming soon
            </div>
          )}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {tour.tags?.slice(0, 3).map((t) => (
              <Badge key={t} variant="accent">
                {t}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-4 p-6">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-muted">
              {tour.category}
              {tour.nights ? ` • ${tour.nights} nights` : ''}
            </p>
            <h3 className="font-display text-xl text-foreground">{tour.title}</h3>
            <p className="line-clamp-2 text-sm text-muted">{tour.summary}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted">Fro</p>
              <p className="font-display text-2xl text-primary">
                £{tour.priceFrom?.toLocaleString?.() ?? tour.priceFrom}
                <span className="text-sm font-sans text-muted">pp</span>
              </p>
              {tour.depositNote ? (
                <p className="text-xs text-muted">{tour.depositNote}</p>
              ) : null}
            </div>
            <Button asChild>
              <Link to={`/tours/${tour.slug}`}>View details</Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
