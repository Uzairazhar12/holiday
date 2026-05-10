import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { tourAdminSchema } from '@/components/forms/schemas'
import { createTour, getTourById, updateTour } from '@/services/tourService'
import { isFirebaseConfigured } from '@/api/firebase'
import { slugify } from '@/lib/utils'
import { ImageUploader } from '@/dashboard/components/ImageUploader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { notify } from '@/utils/notify'
import { TOUR_CATEGORIES } from '@/utils/constants'

export default function TourFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(tourAdminSchema),
    defaultValues: {
      title: '',
      slug: '',
      summary: '',
      description: '',
      priceFrom: 1499,
      nights: 7,
      category: TOUR_CATEGORIES[0],
      depositNote: '',
      featured: false,
      tagsInput: '',
      seoTitle: '',
      seoDescription: '',
      includedText: '',
      excludedText: '',
      itinerary: [{ title: '', detail: '' }],
      images: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'itinerary',
  })

  // eslint-disable-next-line react-hooks/incompatible-library -- RHF watch drives live previews
  const images = watch('images') || []

  useEffect(() => {
    if (!isEdit) return
    let cancelled = false
    ;(async () => {
      const tour = await getTourById(id)
      if (!tour || cancelled) return
      reset({
        title: tour.title || '',
        slug: tour.slug || '',
        summary: tour.summary || '',
        description: tour.description || '',
        priceFrom: tour.priceFrom || 0,
        nights: tour.nights || 7,
        category: tour.category || TOUR_CATEGORIES[0],
        depositNote: tour.depositNote || '',
        featured: Boolean(tour.featured),
        tagsInput: (tour.tags || []).join(', '),
        seoTitle: tour.seoTitle || '',
        seoDescription: tour.seoDescription || '',
        includedText: (tour.included || []).join('\n'),
        excludedText: (tour.excluded || []).join('\n'),
        itinerary:
          tour.itinerary?.length > 0
            ? tour.itinerary
            : [{ title: '', detail: '' }],
        images: tour.images || [],
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
        description: 'Add Firebase credentials before publishing tours.',
      })
      return
    }

    const payload = {
      title: values.title,
      slug: values.slug?.trim() || slugify(values.title),
      summary: values.summary,
      description: values.description,
      priceFrom: values.priceFrom,
      nights: values.nights || null,
      category: values.category,
      depositNote: values.depositNote || '',
      featured: Boolean(values.featured),
      tags: values.tagsInput
        ? values.tagsInput.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      seoTitle: values.seoTitle || '',
      seoDescription: values.seoDescription || '',
      included: values.includedText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      excluded: values.excludedText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      itinerary: values.itinerary,
      images: values.images || [],
    }

    try {
      if (isEdit) await updateTour(id, payload)
      else await createTour(payload)
      notify({
        title: isEdit ? 'Tour updated' : 'Tour published',
        description: 'Live data synced to Firestore.',
      })
      navigate('/dashboard/tours')
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
            {isEdit ? 'Edit itinerary' : 'Create itinerary'}
          </p>
          <h1 className="font-display text-3xl">
            {isEdit ? 'Update tour' : 'New tour'}
          </h1>
        </div>
        <Button variant="outline" asChild>
          <Link to="/dashboard/tours">Cancel</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basics</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register('title')} />
              {errors.title ? (
                <p className="text-xs text-red-600">{errors.title.message}</p>
              ) : null}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" {...register('slug')} placeholder="auto from title" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" rows={3} {...register('summary')} />
              {errors.summary ? (
                <p className="text-xs text-red-600">{errors.summary.message}</p>
              ) : null}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Long description</Label>
              <Textarea id="description" rows={6} {...register('description')} />
              {errors.description ? (
                <p className="text-xs text-red-600">{errors.description.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={watch('category')}
                onValueChange={(v) => setValue('category', v, { shouldDirty: true })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TOUR_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceFrom">Price from (pp)</Label>
              <Input id="priceFrom" type="number" {...register('priceFrom')} />
              {errors.priceFrom ? (
                <p className="text-xs text-red-600">{errors.priceFrom.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nights">Nights</Label>
              <Input id="nights" type="number" {...register('nights')} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="depositNote">Deposit / promo note</Label>
              <Input id="depositNote" {...register('depositNote')} />
            </div>
            <div className="flex items-center gap-2 md:col-span-2">
              <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="featured"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="featured">Featured on homepage</Label>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input id="tags" {...register('tagsInput')} placeholder="Luxury, Beach…" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUploader
              folder="tours"
              value={images}
              onChange={(urls) => setValue('images', urls, { shouldDirty: true })}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Itinerary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-md border border-border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Stage {index + 1}</p>
                  {fields.length > 1 ? (
                    <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                      Remove
                    </Button>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input {...register(`itinerary.${index}.title`)} />
                </div>
                <div className="space-y-2">
                  <Label>Detail</Label>
                  <Textarea rows={3} {...register(`itinerary.${index}.detail`)} />
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => append({ title: '', detail: '' })}>
              Add stage
            </Button>
            {errors.itinerary ? (
              <p className="text-xs text-red-600">Complete each itinerary stage.</p>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inclusions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="included">Included (one per line)</Label>
              <Textarea id="included" rows={8} {...register('includedText')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excluded">Excluded (one per line)</Label>
              <Textarea id="excluded" rows={8} {...register('excludedText')} />
            </div>
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
          {isSubmitting ? 'Saving…' : 'Save tour'}
        </Button>
      </form>
    </div>
  )
}
