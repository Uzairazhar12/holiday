import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { ContactForm } from '@/components/forms/ContactForm'
import { Card, CardContent } from '@/components/ui/card'
import { BRAND } from '@/config/brand'

export default function Contact() {
  const [params] = useSearchParams()

  const destination = useMemo(
    () => params.get('destination') || '',
    [params],
  )

  const heroDefaults = useMemo(() => {
    const type = params.get('type')
    if (!type) return null
    if (type === 'holiday') {
      return {
        type: 'holiday',
        fullName: params.get('fullName') || '',
        email: params.get('email') || '',
        phone: params.get('phone') || '',
        departure: params.get('departure') || '',
        travellers: params.get('travellers') || '',
        from: params.get('from') || '',
        to: params.get('to') || '',
      }
    }
    if (type === 'flight') {
      return {
        type: 'flight',
        trip: params.get('trip') || 'return',
        from: params.get('from') || '',
        to: params.get('to') || '',
        depart: params.get('depart') || '',
        ret: params.get('ret') || '',
        travellers: params.get('travellers') || '',
        cabin: params.get('cabin') || '',
      }
    }
    return null
  }, [params])

  const wa = `https://wa.me/${BRAND.whatsappDigits.replace(/\D/g, '')}`

  return (
    <>
      <SEO
        title="Contact"
        description={`Speak with ${BRAND.name} — phone, WhatsApp or enquiry form. Expert replies within two working hours.`}
        canonicalPath="/contact"
      />
      <div className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl text-foreground">
            Let&apos;s craft your next itinerary
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Share dates, cabin preferences and budget bands — we&apos;ll respond with
            routings, deposit schedules and ATOL clarity before you commit.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4 pt-6 text-sm text-muted">
              <div>
                <p className="text-xs uppercase tracking-wide text-foreground">Phone</p>
                <a className="text-lg font-semibold text-primary" href={BRAND.phoneTel}>
                  {BRAND.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-foreground">WhatsApp</p>
                <a
                  className="text-lg font-semibold text-primary"
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                >
                  {BRAND.whatsappDisplay}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-foreground">Email</p>
                <a className="font-semibold text-primary" href={`mailto:${BRAND.email}`}>
                  {BRAND.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-foreground">Location</p>
                <p>{BRAND.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="shadow-[var(--shadow-soft)]">
          <CardContent className="pt-8">
            <ContactForm
              defaultDestination={destination}
              heroDefaults={heroDefaults}
            />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
