import { collection, getDocs } from 'firebase/firestore'
import { getDb, isFirebaseConfigured } from '@/api/firebase'
import { DEMO_TESTIMONIALS } from '@/utils/demoData'

function mapDoc(d) {
  return { id: d.id, ...d.data() }
}

export async function listTestimonials() {
  if (!isFirebaseConfigured()) return [...DEMO_TESTIMONIALS]
  const snap = await getDocs(collection(getDb(), 'testimonials'))
  const rows = snap.docs.map(mapDoc).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  return rows.length ? rows : DEMO_TESTIMONIALS
}
