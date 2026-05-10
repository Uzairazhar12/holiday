export function travelAgencySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Marvel Travel UK',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    telephone: '+442033322614',
    email: 'info@marveltravel.example',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '40 Arundel Gardens',
      addressLocality: 'Ilford',
      postalCode: 'IG3 9SX',
      addressCountry: 'GB',
    },
    priceRange: '££',
  }
}
