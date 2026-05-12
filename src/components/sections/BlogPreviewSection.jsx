import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function BlogPreviewSection({ blogs }) {
  return (
    <section className="border-b border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Travel notes
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Practical ideas for UK departures
            </h2>
            <p className="text-sm text-muted">
              Seasonal routing tips, visa reminders and packing lists written by our
              consultants — not syndicated feeds.
            </p>
          </div>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {(blogs || []).slice(0, 2).map((b, i) => (
            <motion.article
              key={b.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-card)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={b.coverImage}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-6">
                <p className="text-xs uppercase tracking-wide text-muted">
                  {b.publishedAt}
                </p>
                <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                  <Link className="hover:text-primary" to={`/blogs/${b.slug}`}>
                    {b.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted">{b.excerpt}</p>
                <Link
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary"
                  to={`/blogs/${b.slug}`}
                >
                  Read article
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
