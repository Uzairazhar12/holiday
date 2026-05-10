import { collection, getDocs } from 'firebase/firestore'
import { getDb, isFirebaseConfigured } from '@/api/firebase'

function mapDoc(d) {
  return { id: d.id, ...d.data() }
}

export async function listUsers() {
  if (!isFirebaseConfigured()) return []
  const snap = await getDocs(collection(getDb(), 'users'))
  return snap.docs.map(mapDoc)
}
