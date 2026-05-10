import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { getDb, getFirebaseAuth, isFirebaseConfigured } from '@/api/firebase'

export async function loginWithEmailPassword(email, password) {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase is not configured. Add VITE_FIREBASE_* to .env')
  }
  const auth = getFirebaseAuth()
  const cred = await signInWithEmailAndPassword(auth, email, password)
  const role = await fetchUserRole(cred.user.uid)
  return { user: cred.user, role }
}

export async function logoutUser() {
  if (!isFirebaseConfigured()) return
  await signOut(getFirebaseAuth())
}

export async function fetchUserRole(uid) {
  if (!isFirebaseConfigured()) return null
  const ref = doc(getDb(), 'users', uid)
  const snap = await getDoc(ref)
  if (!snap.exists) return 'customer'
  return snap.data()?.role || 'customer'
}

export function subscribeAuth(callback) {
  if (!isFirebaseConfigured()) {
    callback(null)
    return () => {}
  }
  const auth = getFirebaseAuth()
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback(null)
      return
    }
    const role = await fetchUserRole(user.uid)
    callback({ user, role })
  })
}
