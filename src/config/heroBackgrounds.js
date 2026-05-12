/** Curated fallbacks when /images/places/manifest.json has no usable images */
export const HERO_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb1b4f5bd5?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80',
]

function probeImage(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

async function filterWorking(urls) {
  const unique = [...new Set(urls)]
  const results = await Promise.all(unique.map((u) => probeImage(u)))
  return unique.filter((_, i) => results[i])
}

/**
 * Resolve hero slideshow URLs: manifest (local / remote) first, then fallbacks.
 */
export async function getHeroBackgroundImageUrls() {
  const fromManifest = []

  try {
    const res = await fetch('/images/places/manifest.json', { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      const names = Array.isArray(data.images) ? data.images.filter(Boolean) : []
      for (const n of names) {
        const s = String(n).trim()
        if (!s) continue
        fromManifest.push(
          s.startsWith('http') ? s : `/images/places/${encodeURIComponent(s)}`,
        )
      }
    }
  } catch {
    /* ignore */
  }

  if (fromManifest.length) {
    const ok = await filterWorking(fromManifest)
    if (ok.length) return ok
  }

  return [...HERO_FALLBACK_IMAGES]
}
