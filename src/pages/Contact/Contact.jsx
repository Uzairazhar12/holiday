import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { ContactForm } from '@/components/forms/ContactForm'
import { Card, CardContent } from '@/components/ui/card'

export default function Contact() {
  const [params] = useSearchParams()
  const destination = useMemo(
    () => params.get('destination') || '',
    [params],
  )

  return (
    <>
      <SEO
        title="Contact"
        description="Speak with Marvel Travel UK — phone, WhatsApp or enquiry form. Expert replies within two working hours."
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
                <a className="text-lg font-semibold text-primary" href="tel:02033322614">
                  0203 332 2614
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-foreground">WhatsApp</p>
                <a
                  className="text-lg font-semibold text-primary"
                  href="https://wa.me/447520637686"
                  target="_blank"
                  rel="noreferrer"
                >
                  +44 7520 637686
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-foreground">Email</p>
                <a className="font-semibold text-primary" href="mailto:info@marveltravel.example">
                  info@marveltravel.example
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-foreground">Studio</p>
                <p>40 Arundel Gardens, Ilford IG3 9SX</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="shadow-[var(--shadow-soft)]">
          <CardContent className="pt-8">
            <ContactForm defaultDestination={destination} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
