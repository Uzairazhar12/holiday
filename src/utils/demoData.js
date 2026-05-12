/** Fallback content when Firestore is empty or Firebase is not configured (demo / local preview). */

export const DEMO_TOURS = [
  {
    id: 'demo-phuket',
    slug: 'phuket-elephant-hills-khao-lak',
    title: 'Phuket, Elephant Hills & Khao Lak',
    summary:
      '12 nights — party, nature and luxury across Thailand’s Andaman coast.',
    description:
      'Handpicked hotels, jungle immersion at Elephant Hills, and serene beach time in Khao Lak. Flights from London, transfers and baggage included.',
    priceFrom: 1499,
    nights: 12,
    category: 'Luxury',
    tags: ['Party', 'Nature', 'Relax'],
    depositNote: '£99pp deposit — book now, pay later',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=80',
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&q=80',
    ],
    itinerary: [
      {
        title: '5 Nights — Phuket (Patong)',
        detail: 'Andaman Beach Hotel — breakfast — nightlife',
      },
      {
        title: '2 Nights — Elephant Hills',
        detail: 'Full board — canoe safari — jungle trekking',
      },
      {
        title: '5 Nights — Khao Lak',
        detail: 'Graceland Resort & Spa — breakfast — pure relaxation',
      },
    ],
    included: [
      'Return flights from London',
      'All resort transfers',
      'Baggage & taxes as stated',
    ],
    excluded: ['Travel insurance', 'Meals not mentioned'],
    seoTitle: 'Phuket Elephant Hills Khao Lak Holiday | EPIC HOLIDAYS',
    seoDescription:
      '12-night Thailand multi-centre holiday with Elephant Hills and beach stays.',
  },
  {
    id: 'demo-maldives-singapore',
    slug: 'maldives-lagoon-villa-singapore',
    title: 'Maldives Lagoon Villa & Singapore',
    summary: '10-night ultra-luxury escape — city buzz meets lagoon serenity.',
    description:
      'Singapore Airlines routing, lagoon villa upgrade and premium all-inclusive dining in the Maldives.',
    priceFrom: 2599,
    nights: 10,
    category: 'Ultra Luxury',
    tags: ['All-Inclusive', 'Lagoon Villa', 'City Break'],
    depositNote: '£29pp deposit — flexible cancellation',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80',
    ],
    itinerary: [
      {
        title: '3 Nights — Singapore',
        detail: 'Holiday Inn Atrium — vibrant city escape',
      },
      {
        title: '7 Nights — Maldives',
        detail: 'Lagoon villa — 24hr all-inclusive — seaplane transfers',
      },
    ],
    included: [
      'International flights & taxes',
      'Seaplane transfers',
      'ATOL protected structure',
    ],
    excluded: ['Optional excursions', 'Premium beverages policy varies'],
    seoTitle: 'Maldives & Singapore Luxury Holiday',
    seoDescription:
      'Twin-centre Maldives lagoon villa and Singapore city break from the UK.',
  },
  {
    id: 'demo-croatia',
    slug: 'croatia-split-spring-escape',
    title: 'Croatia Spring Escape — Split',
    summary: '7 nights on the Adriatic — culture, coast & direct flights.',
    description:
      'Stay in the heart of Split with daily breakfast and time to explore Roman landmarks and beaches.',
    priceFrom: 1350,
    nights: 7,
    category: 'Culture',
    tags: ['Culture', 'Coast', 'Direct Flight'],
    depositNote: 'ATOL protected — limited dates',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1555990538-9bd75ff83138?w=1200&q=80',
    ],
    itinerary: [
      {
        title: 'Cornaro Hotel, Split',
        detail: 'Historic Old Town — Adriatic coast — daily breakfast',
      },
    ],
    included: ['Direct flights from London Luton', '7 nights & breakfast'],
    excluded: ['City tax payable locally'],
    seoTitle: 'Split Croatia Holiday Package',
    seoDescription: 'Spring Split city break with flights from the UK.',
  },
]

export const DEMO_DESTINATIONS = [
  {
    slug: 'paris',
    city: 'Paris',
    country: 'France',
    code: 'CDG',
    priceFrom: 150,
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
  },
  {
    slug: 'istanbul',
    city: 'Istanbul',
    country: 'Turkey',
    code: 'IST',
    priceFrom: 220,
    image:
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
  },
  {
    slug: 'bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    code: 'BKK',
    priceFrom: 420,
    image:
      'https://images.unsplash.com/photo-1563495285-ab7e888ab91d?w=800&q=80',
  },
  {
    slug: 'dubai',
    city: 'Dubai',
    country: 'UAE',
    code: 'DXB',
    priceFrom: 310,
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
  },
  {
    slug: 'new-york',
    city: 'New York',
    country: 'USA',
    code: 'JFK',
    priceFrom: 450,
    image:
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
  },
  {
    slug: 'islamabad',
    city: 'Islamabad',
    country: 'Pakistan',
    code: 'ISB',
    priceFrom: 380,
    image:
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
  },
]

export const DEMO_TESTIMONIALS = [
  {
    id: 't1',
    name: 'Amelia R.',
    location: 'London',
    quote:
      'Flawless routing and brilliant support on our Maldives booking — everything felt first class.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'James K.',
    location: 'Manchester',
    quote:
      'Clear pricing, fast callbacks, and they matched a deal we saw elsewhere plus extra credit.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Sana M.',
    location: 'Birmingham',
    quote:
      'Multi-stop Asia itinerary was tailored perfectly — transfers and hotels were spot on.',
    rating: 5,
  },
]

export const DEMO_BLOGS = [
  {
    id: 'demo-blog-1',
    slug: 'best-time-to-visit-turkey',
    title: 'Best Time to Visit Turkey for Coast & Culture',
    excerpt:
      'Shoulder seasons bring mild weather, smaller crowds, and great value across Istanbul and the Aegean.',
    coverImage:
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80',
    author: 'EPIC HOLIDAYS',
    publishedAt: '2026-02-01',
    seoTitle: 'Best Time to Visit Turkey | EPIC HOLIDAYS',
    seoDescription:
      'Season-by-season guide to Turkey for city breaks and coastal escapes.',
    contentHtml: `<p>Turkey shines in spring and early autumn — comfortable sightseeing in Istanbul and warm seas along the coast.</p><p>Book flexible fares where possible and combine city nights with a short coastal stay.</p>`,
  },
  {
    id: 'demo-blog-2',
    slug: 'maldives-villa-upgrades-explained',
    title: 'Maldives Villa Upgrades Explained',
    excerpt:
      'From beach villas to lagoon suites — what to expect and how to maximise value.',
    coverImage:
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
    author: 'EPIC HOLIDAYS',
    publishedAt: '2026-03-15',
    seoTitle: 'Maldives Villa Types Explained',
    seoDescription:
      'A practical guide to Maldives accommodation categories for UK travellers.',
    contentHtml: `<p>Lagoon and ocean villas offer direct water access; beach villas suit families needing sandy paths.</p><p>Look for offers that bundle seaplane transfers and meaningful meal plans.</p>`,
  },
]
