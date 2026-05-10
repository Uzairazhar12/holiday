import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function DestinationCard({ dest, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-card)]"
    >
      <div className="relative aspect-[4/5]">
        <img
          src={dest.image}
          alt=""
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 space-y-2 p-5 text-white">
          <p className="text-xs uppercase tracking-wide text-white/80">
            {dest.country} • {dest.code}
          </p>
          <h3 className="font-display text-2xl">{dest.city}</h3>
          <p className="text-sm text-white/85">
            From £{dest.priceFrom}
          </p>
          <Button variant="accent" size="sm" asChild>
            <Link to={`/contact?destination=${encodeURIComponent(dest.city)}`}>
              Get quote
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
