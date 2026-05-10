import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export function TestimonialsSection({ testimonials }) {
  return (
    <section className="border-b border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Voices from travellers
          </p>
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Trusted for bespoke itineraries & seamless ticketing
          </h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {(testimonials || []).map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-[var(--radius-lg)] border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-4 text-xs uppercase tracking-wide text-muted">
                {t.name}
                {t.location ? ` • ${t.location}` : ''}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
