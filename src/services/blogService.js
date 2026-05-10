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
import { DEMO_BLOGS } from '@/utils/demoData'
import { slugify } from '@/lib/utils'

const colName = 'blogs'

function mapDoc(d) {
  return { id: d.id, ...d.data() }
}

export async function listBlogs() {
  if (!isFirebaseConfigured()) return [...DEMO_BLOGS]
  const q = query(collection(getDb(), colName), orderBy('publishedAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(mapDoc)
}

export async function getBlogBySlug(slug) {
  if (!isFirebaseConfigured()) {
    return DEMO_BLOGS.find((b) => b.slug === slug) || null
  }
  const db = getDb()
  const q = query(collection(db, colName), where('slug', '==', slug))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return mapDoc(snap.docs[0])
}

export async function getBlogById(id) {
  if (!isFirebaseConfigured()) {
    return DEMO_BLOGS.find((b) => b.id === id) || null
  }
  const ref = doc(getDb(), colName, id)
  const snap = await getDoc(ref)
  if (!snap.exists) return null
  return mapDoc(snap)
}

export async function createBlog(payload) {
  const slug = payload.slug?.trim() || slugify(payload.title)
  const ref = await addDoc(collection(getDb(), colName), {
    ...payload,
    slug,
    publishedAt: payload.publishedAt || new Date().toISOString().slice(0, 10),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateBlog(id, payload) {
  const ref = doc(getDb(), colName, id)
  await updateDoc(ref, {
    ...payload,
    ...(payload.title && !payload.slug ? { slug: slugify(payload.title) } : {}),
    updatedAt: serverTimestamp(),
  })
}

export async function deleteBlog(id) {
  await deleteDoc(doc(getDb(), colName, id))
}
