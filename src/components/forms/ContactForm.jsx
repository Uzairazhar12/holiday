import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '@/components/forms/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createBooking } from '@/services/bookingService'
import { notify } from '@/utils/notify'

function buildNotesFromHero(hero) {
  if (!hero || !hero.type) return ''
  const lines = []
  if (hero.type === 'holiday') {
    lines.push('Source: Home page — Holidays search')
    if (hero.from) lines.push(`Flying from: ${hero.from}`)
    if (hero.to) lines.push(`Flying to: ${hero.to}`)
    if (hero.travellers) lines.push(`Travellers (adt-chd-inf): ${hero.travellers}`)
  } else if (hero.type === 'flight') {
    lines.push('Source: Home page — Flights search')
    lines.push(`Trip: ${hero.trip === 'oneway' ? 'One way' : 'Return'}`)
    if (hero.from) lines.push(`From: ${hero.from}`)
    if (hero.to) lines.push(`To: ${hero.to}`)
    if (hero.depart) lines.push(`Depart: ${hero.depart}`)
    if (hero.ret) lines.push(`Return: ${hero.ret}`)
    if (hero.travellers) lines.push(`Travellers: ${hero.travellers}`)
    if (hero.cabin) lines.push(`Cabin: ${hero.cabin}`)
  }
  return lines.join('\n')
}

export function ContactForm({ defaultDestination, heroDefaults }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      destination: defaultDestination || '',
      departureDate: '',
      notes: '',
    },
  })

  useEffect(() => {
    if (!heroDefaults) return
    const extra = buildNotesFromHero(heroDefaults)
    reset({
      fullName: heroDefaults.fullName || '',
      email: heroDefaults.email || '',
      phone: heroDefaults.phone || '',
      destination:
        heroDefaults.to ||
        heroDefaults.destination ||
        defaultDestination ||
        '',
      departureDate:
        heroDefaults.departure || heroDefaults.depart || '',
      notes: extra,
    })
  }, [heroDefaults, defaultDestination, reset])

  const onSubmit = async (values) => {
    try {
      await createBooking({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        departureDate: values.departureDate || '',
        notes: [
          values.destination ? `Destination: ${values.destination}` : '',
          values.notes || '',
        ]
          .filter(Boolean)
          .join('\n'),
        type: heroDefaults?.type === 'flight' ? 'flight_enquiry' : 'contact',
      })
      notify({
        title: 'Message sent',
        description: 'We will respond within two working hours.',
      })
      reset({
        fullName: '',
        email: '',
        phone: '',
        destination: defaultDestination || '',
        departureDate: '',
        notes: '',
      })
    } catch (e) {
      notify({
        variant: 'destructive',
        title: 'Unable to send',
        description: e.message || 'Please phone or WhatsApp us.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cf-name">Full name</Label>
          <Input id="cf-name" {...register('fullName')} />
          {errors.fullName ? (
            <p className="text-xs text-red-600">{errors.fullName.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf-email">Email</Label>
          <Input id="cf-email" type="email" {...register('email')} />
          {errors.email ? (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cf-phone">Phone</Label>
          <Input id="cf-phone" {...register('phone')} />
          {errors.phone ? (
            <p className="text-xs text-red-600">{errors.phone.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf-dest">Destination</Label>
          <Input id="cf-dest" {...register('destination')} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cf-date">Travel date</Label>
        <Input id="cf-date" type="date" {...register('departureDate')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cf-notes">How can we help?</Label>
        <Textarea id="cf-notes" rows={5} {...register('notes')} />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send enquiry'}
      </Button>
    </form>
  )
}
