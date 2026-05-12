import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { Skeleton } from '@/components/ui/skeleton'
import { listBlogs } from '@/services/blogService'

export default function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const rows = await listBlogs()
        if (!cancelled) setBlogs(rows)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <SEO
        title="Travel inspiration"
        description="Guides, seasonal tips and destination deep dives from the EPIC HOLIDAYS editorial desk."
        canonicalPath="/blogs"
      />
      <div className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl text-foreground">Journal</h1>
          <p className="mt-3 max-w-2xl text-muted">
            Practical advice for long-haul routing, resort upgrades and meaningful stopovers.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-14 lg:px-8">
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-[var(--radius-lg)]" />
            ))}
          </div>
        ) : (
          blogs.map((b) => (
            <article
              key={b.slug}
              className="grid gap-8 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-card)] md:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="relative aspect-[16/11] md:aspect-auto">
                <img src={b.coverImage} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center p-8">
                <p className="text-xs uppercase tracking-wide text-muted">{b.publishedAt}</p>
                <h2 className="mt-2 font-display text-3xl text-foreground">
                  <Link className="hover:text-primary" to={`/blogs/${b.slug}`}>
                    {b.title}
                  </Link>
                </h2>
                <p className="mt-3 text-muted">{b.excerpt}</p>
                <Link
                  className="mt-6 inline-flex text-sm font-semibold text-primary"
                  to={`/blogs/${b.slug}`}
                >
                  Continue reading →
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  )
}
