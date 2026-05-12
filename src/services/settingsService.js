import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getDb, isFirebaseConfigured } from '@/api/firebase'
import { BRAND } from '@/config/brand'

const SETTINGS_ID = 'site'

const defaults = {
  siteName: BRAND.name,
  phone: BRAND.phoneDisplay,
  email: BRAND.email,
  whatsapp: BRAND.whatsappDigits,
  address: BRAND.address,
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
