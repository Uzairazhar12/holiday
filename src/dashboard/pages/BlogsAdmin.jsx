import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { deleteBlog, listBlogs } from '@/services/blogService'
import { isFirebaseConfigured } from '@/api/firebase'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { notify } from '@/utils/notify'

export default function BlogsAdmin() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    setLoading(true)
    try {
      setRows(await listBlogs())
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
        description: 'Cannot mutate demo blogs without backend.',
      })
      return
    }
    if (!window.confirm(`Delete “${title}”?`)) return
    try {
      await deleteBlog(id)
      notify({ title: 'Blog removed' })
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
          <h1 className="font-display text-3xl">Blogs</h1>
          <p className="text-muted">
            Editorial SEO meta travels with each slug-based URL on the public site.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/dashboard/blogs/new">
            <Plus className="h-4 w-4" />
            New article
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Library</CardTitle>
          <CardDescription>
            Slugs auto-generate from titles — override only when necessary for campaigns.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border text-muted">
              <tr>
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Published</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-muted">
                    Loading…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-muted">
                    No articles yet.
                  </td>
                </tr>
              ) : (
                rows.map((b) => (
                  <tr key={b.id || b.slug} className="border-b border-border/70">
                    <td className="py-4">
                      <div className="font-medium text-foreground">{b.title}</div>
                      <div className="text-xs text-muted">/{b.slug}</div>
                    </td>
                    <td className="py-4">{b.publishedAt}</td>
                    <td className="space-x-2 py-4 text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/blogs/${b.slug}`} target="_blank">
                          View
                        </Link>
                      </Button>
                      {b.id ? (
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/dashboard/blogs/${b.id}/edit`}>Edit</Link>
                        </Button>
                      ) : null}
                      {b.id ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          type="button"
                          onClick={() => onDelete(b.id, b.title)}
                        >
                          Delete
                        </Button>
                      ) : (
                        <span className="text-xs text-muted">Demo row</span>
                      )}
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
