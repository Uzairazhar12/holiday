import { BRAND } from '@/config/brand'

export function travelAgencySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: BRAND.name,
    url: typeof window !== 'undefined' ? window.location.origin : '',
    telephone: '+442033322614',
    email: BRAND.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
    },
    priceRange: '££',
  }
}
