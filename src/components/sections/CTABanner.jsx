import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { BRAND } from '@/config/brand'

export function CTABanner() {
  const wa = `https://wa.me/${BRAND.whatsappDigits.replace(/\D/g, '')}`
  return (
    <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 py-16 text-primary-foreground sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="max-w-xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-white/70">
            Next step
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Tell us your dates — we reply with routings and a clear quote
          </h2>
          <p className="text-sm text-white/85">
            Share party size, cabin preference and any fixed events. We respond with fare
            options, deposit timing and what happens if you need to move dates.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="accent" size="lg" className="font-bold" asChild>
            <Link to="/contact">Start an enquiry</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/50 bg-transparent font-bold text-white hover:bg-white/10"
            asChild
          >
            <a href={wa} target="_blank" rel="noreferrer">
              Message on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
