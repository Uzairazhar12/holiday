import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getDb, isFirebaseConfigured } from '@/api/firebase'

const SETTINGS_ID = 'site'

const defaults = {
  siteName: 'Marvel Travel UK',
  phone: '0203 332 2614',
  email: 'info@marveltravel.example',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '447520637686',
  address: '40 Arundel Gardens, Ilford IG3 9SX',
}

export async function getSiteSettings() {
  if (!isFirebaseConfigured()) return defaults
  const ref = doc(getDb(), 'settings', SETTINGS_ID)
  const snap = await getDoc(ref)
  if (!snap.exists) return defaults
  return { ...defaults, ...snap.data() }
}

export async function saveSiteSettings(payload) {
  const ref = doc(getDb(), 'settings', SETTINGS_ID)
  await setDoc(ref, payload, { merge: true })
}
