import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TourGallery({ images = [], title }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selected, setSelected] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return undefined
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  if (!images.length) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-border bg-card text-muted">
        Images coming soon
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-soft)]">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {images.map((src, i) => (
            <div key={src + i} className="min-w-0 flex-[0_0_100%]">
              <img
                src={src}
                alt=""
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-linear-to-t from-black/45 to-transparent p-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="pointer-events-auto border-white/40 bg-black/30 text-white hover:bg-black/50"
          onClick={scrollPrev}
          aria-label="Previous image"
        >
          <ChevronLeft />
        </Button>
        <p className="pointer-events-auto rounded-full bg-black/45 px-3 py-1 text-xs text-white">
          {title ? `${title} · ` : ''}
          {selected + 1} / {images.length}
        </p>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="pointer-events-auto border-white/40 bg-black/30 text-white hover:bg-black/50"
          onClick={scrollNext}
          aria-label="Next image"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
