import { useEffect, useState } from 'react'
import { SEO } from '@/components/common/SEO'
import { travelAgencySchema } from '@/utils/schema'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedToursSection } from '@/components/sections/FeaturedToursSection'
import { DestinationsSection } from '@/components/sections/DestinationsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { WhyChooseSection } from '@/components/sections/WhyChooseSection'
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection'
import { CTABanner } from '@/components/sections/CTABanner'
import { listTours } from '@/services/tourService'
import { listTestimonials } from '@/services/testimonialService'
import { listBlogs } from '@/services/blogService'
import { DEMO_DESTINATIONS } from '@/utils/demoData'

export default function Home() {
  const [tours, setTours] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [tRes, teRes, bRes] = await Promise.all([
          listTours({ featured: true }),
          listTestimonials(),
          listBlogs(),
        ])
        if (cancelled) return
        const featured =
          tRes.length > 0 ? tRes : await listTours({ featured: false })
        setTours(featured.length ? featured : tRes)
        setTestimonials(teRes)
        setBlogs(bRes)
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <SEO
        title="UK holidays & flights"
        description="Book tours, UK breaks and long-haul flights with EPIC TOUR — tailored routing, ATOL-backed packages and consultant-led support from enquiry to departure."
        canonicalPath="/"
        jsonLd={travelAgencySchema()}
      />
      <HeroSection />
      <FeaturedToursSection tours={loading ? [] : tours} />
      <DestinationsSection destinations={DEMO_DESTINATIONS} />
      <TestimonialsSection testimonials={testimonials} />
      <WhyChooseSection />
      <BlogPreviewSection blogs={blogs} />
      <CTABanner />
    </>
  )
}
