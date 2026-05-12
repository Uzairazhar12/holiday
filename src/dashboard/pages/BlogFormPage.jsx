import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { blogAdminSchema } from '@/components/forms/schemas'
import { createBlog, getBlogById, updateBlog } from '@/services/blogService'
import { isFirebaseConfigured } from '@/api/firebase'
import { slugify } from '@/lib/utils'
import { ImageUploader } from '@/dashboard/components/ImageUploader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { notify } from '@/utils/notify'

export default function BlogFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(blogAdminSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      coverImage: '',
      author: 'EPIC HOLIDAYS',
      publishedAt: new Date().toISOString().slice(0, 10),
      seoTitle: '',
      seoDescription: '',
      contentHtml: '<p>Draft your story — insider routing tips, packing cues & seasonal cues.</p>',
      galleryImages: [],
    },
  })

  // eslint-disable-next-line react-hooks/incompatible-library -- RHF watch drives gallery previews
  const gallery = watch('galleryImages') || []

  useEffect(() => {
    if (!isEdit) return
    let cancelled = false
    ;(async () => {
      const row = await getBlogById(id)
      if (!row || cancelled) return
      reset({
        title: row.title || '',
        slug: row.slug || '',
        excerpt: row.excerpt || '',
        coverImage: row.coverImage || '',
        author: row.author || 'EPIC HOLIDAYS',
        publishedAt: row.publishedAt || '',
        seoTitle: row.seoTitle || '',
        seoDescription: row.seoDescription || '',
        contentHtml: row.contentHtml || '',
        galleryImages: [],
      })
    })()
    return () => {
      cancelled = true
    }
  }, [id, isEdit, reset])

  const onSubmit = async (values) => {
    if (!isFirebaseConfigured()) {
      notify({
        variant: 'destructive',
        title: 'Firebase required',
        description: 'Connect Firebase before publishing editorial.',
      })
      return
    }

    const cover =
      values.coverImage?.trim() ||
      gallery[0] ||
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80'

    const payload = {
      title: values.title,
      slug: values.slug?.trim() || slugify(values.title),
      excerpt: values.excerpt,
      coverImage: cover,
      author: values.author,
      publishedAt: values.publishedAt,
      seoTitle: values.seoTitle || '',
      seoDescription: values.seoDescription || '',
      contentHtml: values.contentHtml,
    }

    try {
      if (isEdit) await updateBlog(id, payload)
      else await createBlog(payload)
      notify({ title: isEdit ? 'Blog updated' : 'Blog published' })
      navigate('/dashboard/blogs')
    } catch (e) {
      notify({
        variant: 'destructive',
        title: 'Save failed',
        description: e.message,
      })
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">
            {isEdit ? 'Edit article' : 'Draft article'}
          </p>
          <h1 className="font-display text-3xl">{isEdit ? 'Update blog' : 'New blog'}</h1>
        </div>
        <Button variant="outline" asChild>
          <Link to="/dashboard/blogs">Cancel</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register('title')} />
              {errors.title ? (
                <p className="text-xs text-red-600">{errors.title.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" {...register('slug')} placeholder="auto-generated if empty" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" rows={3} {...register('excerpt')} />
              {errors.excerpt ? (
                <p className="text-xs text-red-600">{errors.excerpt.message}</p>
              ) : null}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" {...register('author')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publishedAt">Publish date</Label>
                <Input id="publishedAt" type="date" {...register('publishedAt')} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverImage">Hero image URL (optional)</Label>
              <Input id="coverImage" {...register('coverImage')} placeholder="https://..." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gallery uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUploader
              folder="blogs"
              label="Upload supporting imagery"
              value={gallery}
              onChange={(urls) =>
                setValue('galleryImages', urls, { shouldDirty: true })
              }
            />
            <p className="mt-2 text-xs text-muted">
              First upload becomes hero cover when URL field left blank.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Body (HTML)</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea rows={14} {...register('contentHtml')} />
            {errors.contentHtml ? (
              <p className="text-xs text-red-600">{errors.contentHtml.message}</p>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seoTitle">Meta title</Label>
              <Input id="seoTitle" {...register('seoTitle')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoDescription">Meta description</Label>
              <Textarea id="seoDescription" rows={3} {...register('seoDescription')} />
            </div>
          </CardContent>
        </Card>

        <Separator />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Save article'}
        </Button>
      </form>
    </div>
  )
}
