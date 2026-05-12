/** Public marketing / contact defaults for EPIC TOUR */
export const BRAND = {
  name: 'EPIC TOUR',
  /** Full lockup (PNG) in `/public/brand/` — bump `logoAssetVersion` when file changes */
  logoSrc: '/brand/epic-tour-logo.png',
  logoAssetVersion: '8d7d8378',
  email: 'info@epictour.co.uk',
  phoneDisplay: '0203 332 2614',
  phoneTel: 'tel:02033322614',
  whatsappDigits: import.meta.env.VITE_WHATSAPP_NUMBER || '447520637686',
  whatsappDisplay: '+44 7520 637686',
  address: 'United Kingdom',
}
