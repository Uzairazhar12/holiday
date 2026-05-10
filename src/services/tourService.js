import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { getDb, isFirebaseConfigured } from '@/api/firebase'
import { DEMO_TOURS } from '@/utils/demoData'
import { slugify } from '@/lib/utils'

const colName = 'tours'

function mapDoc(d) {
  return { id: d.id, ...d.data() }
}

export async function listTours(filters = {}) {
  if (!isFirebaseConfigured()) {
    let rows = [...DEMO_TOURS]
    if (filters.category)
      rows = rows.filter((t) => t.category === filters.category)
    if (filters.featured) rows = rows.filter((t) => t.featured)
    if (filters.search) {
      const q = filters.search.toLowerCase()
      rows = rows.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.summary?.toLowerCase().includes(q),
      )
    }
    if (filters.maxPrice != null)
      rows = rows.filter((t) => t.priceFrom <= filters.maxPrice)
    return rows
  }

  const db = getDb()
  const snap = await getDocs(
    query(collection(db, colName), orderBy('createdAt', 'desc')),
  )
  let rows = snap.docs.map(mapDoc)
  if (filters.category)
    rows = rows.filter((t) => t.category === filters.category)
  if (filters.featured) rows = rows.filter((t) => Boolean(t.featured))
  if (filters.search) {
    const s = filters.search.toLowerCase()
    rows = rows.filter(
      (t) =>
        String(t.title || '')
          .toLowerCase()
          .includes(s) ||
        String(t.summary || '')
          .toLowerCase()
          .includes(s),
    )
  }
  if (filters.maxPrice != null)
    rows = rows.filter((t) => Number(t.priceFrom || 0) <= filters.maxPrice)
  return rows
}

export async function getTourBySlug(slug) {
  if (!isFirebaseConfigured()) {
    return DEMO_TOURS.find((t) => t.slug === slug) || null
  }
  const db = getDb()
  const q = query(collection(db, colName), where('slug', '==', slug))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return mapDoc(snap.docs[0])
}

export async function getTourById(id) {
  if (!isFirebaseConfigured()) {
    return DEMO_TOURS.find((t) => t.id === id) || null
  }
  const ref = doc(getDb(), colName, id)
  const snap = await getDoc(ref)
  if (!snap.exists) return null
  return mapDoc(snap)
}

export async function createTour(payload) {
  const db = getDb()
  const slug = payload.slug?.trim() || slugify(payload.title)
  const docRef = await addDoc(collection(db, colName), {
    ...payload,
    slug,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateTour(id, payload) {
  const ref = doc(getDb(), colName, id)
  await updateDoc(ref, {
    ...payload,
    ...(payload.title && !payload.slug
      ? { slug: slugify(payload.title) }
      : {}),
    updatedAt: serverTimestamp(),
  })
}

export async function deleteTour(id) {
  await deleteDoc(doc(getDb(), colName, id))
}
