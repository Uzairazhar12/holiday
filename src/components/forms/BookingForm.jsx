import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema } from '@/components/forms/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createBooking } from '@/services/bookingService'
import { notify } from '@/utils/notify'

export function BookingForm({ tour }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      travellers: 2,
    },
  })

  const onSubmit = async (values) => {
    try {
      await createBooking({
        ...values,
        tourId: tour?.id || null,
        tourSlug: tour?.slug || null,
        tourTitle: tour?.title || null,
      })
      notify({
        title: 'Enquiry received',
        description:
          'Thank you — our team will contact you shortly to confirm details.',
      })
      reset({ travellers: 2 })
    } catch (e) {
      notify({
        variant: 'destructive',
        title: 'Could not submit',
        description: e.message || 'Try again or call us directly.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" {...register('fullName')} />
          {errors.fullName ? (
            <p className="text-xs text-red-600">{errors.fullName.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email ? (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register('phone')} />
          {errors.phone ? (
            <p className="text-xs text-red-600">{errors.phone.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="travellers">Travellers</Label>
          <Input id="travellers" type="number" min={1} {...register('travellers')} />
          {errors.travellers ? (
            <p className="text-xs text-red-600">{errors.travellers.message}</p>
          ) : null}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="departureDate">Preferred departure</Label>
        <Input id="departureDate" type="date" {...register('departureDate')} />
        {errors.departureDate ? (
          <p className="text-xs text-red-600">{errors.departureDate.message}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" rows={4} {...register('notes')} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? 'Sending…' : 'Submit enquiry'}
      </Button>
    </form>
  )
}
