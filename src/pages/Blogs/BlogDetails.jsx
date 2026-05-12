import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getBlogBySlug } from '@/services/blogService'

export default function BlogDetails() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const row = await getBlogBySlug(slug)
        if (!cancelled) setBlog(row)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [slug])

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="mt-8 h-64 w-full" />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Article unavailable</h1>
        <Button asChild className="mt-6">
          <Link to="/blogs">Back to journal</Link>
        </Button>
      </div>
    )
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    datePublished: blog.publishedAt,
    author: { '@type': 'Organization', name: blog.author || 'EPIC HOLIDAYS' },
    image: blog.coverImage,
    description: blog.excerpt,
  }

  return (
    <>
      <SEO
        title={blog.seoTitle || blog.title}
        description={blog.seoDescription || blog.excerpt}
        canonicalPath={`/blogs/${blog.slug}`}
        image={blog.coverImage}
        jsonLd={jsonLd}
      />
      <article className="border-b border-border bg-card">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-wide text-muted">{blog.publishedAt}</p>
          <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
            {blog.title}
          </h1>
          <p className="mt-4 text-muted">By {blog.author}</p>
        </div>
        <div className="relative mx-auto max-w-5xl overflow-hidden px-4 pb-12 sm:px-6 lg:px-8">
          <img
            src={blog.coverImage}
            alt=""
            className="aspect-[21/9] max-h-[420px] w-full rounded-[var(--radius-lg)] object-cover shadow-[var(--shadow-soft)]"
          />
        </div>
      </article>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div
          className="space-y-4 text-base leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_p]:mb-4 [&_a]:font-semibold [&_a]:text-primary"
          dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
        />
        <Button variant="outline" className="mt-12" asChild>
          <Link to="/blogs">← All articles</Link>
        </Button>
      </div>
    </>
  )
}
