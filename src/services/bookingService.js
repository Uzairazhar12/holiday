import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDb, isFirebaseConfigured } from '@/api/firebase'

const colName = 'bookings'

function mapDoc(d) {
  return { id: d.id, ...d.data() }
}

export async function createBooking(payload) {
  if (!isFirebaseConfigured()) {
    console.warn('[demo] Booking captured locally only — configure Firebase to persist.')
    return `demo-${Date.now()}`
  }
  const ref = await addDoc(collection(getDb(), colName), {
    ...payload,
    status: 'pending',
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function listBookings() {
  if (!isFirebaseConfigured()) return []
  const q = query(collection(getDb(), colName), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(mapDoc)
}

export async function updateBookingStatus(id, status) {
  const ref = doc(getDb(), colName, id)
  await updateDoc(ref, {
    status,
    updatedAt: serverTimestamp(),
  })
}
