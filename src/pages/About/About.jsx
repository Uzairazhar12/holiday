import { SEO } from '@/components/common/SEO'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <SEO
        title="About us"
        description="Independent ATOL-protected travel specialists crafting bespoke holidays and sharp fares from the UK."
        canonicalPath="/about"
      />
      <div className="border-b border-border bg-card py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            About EPIC HOLIDAYS
          </p>
          <h1 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">
            Your concierge-style partner for worldwide escapes
          </h1>
          <p className="mt-6 text-lg text-muted">
            We combine airfare expertise with hotel contracting insight so your holiday
            feels curated — not copied from a brochure.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-2 lg:px-8">
        <div className="space-y-5 text-muted">
          <p>
            Founded on the belief that luxury should feel approachable, our consultants
            obsess over routing efficiency, deposit flexibility and transparent taxes —
            whether you are island hopping in Thailand or pairing Singapore with the
            Maldives.
          </p>
          <p>
            Every itinerary is stress-tested for realistic connections, sensible layovers
            and on-the-ground transfers so you spend less time troubleshooting and more
            time soaking up the destination.
          </p>
        </div>
        <div className="rounded-[var(--radius-lg)] border border-border bg-card p-8 shadow-[var(--shadow-card)]">
          <h2 className="font-display text-2xl text-foreground">Why travellers stay</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-muted">
            <li>Dedicated air desk with preferred airline agreements</li>
            <li>24/7 escalation path via WhatsApp for urgent changes</li>
            <li>Handpicked hotel partners with proactive upgrade hunting</li>
            <li>Price-match ethos — loyalty credits when we beat ourselves</li>
          </ul>
          <Button className="mt-8" asChild>
            <Link to="/contact">Plan a consultation</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
