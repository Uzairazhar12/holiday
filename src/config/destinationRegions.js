/** Destinations grouped by region for the homepage. */

export const DESTINATION_REGIONS = [
  {
    id: 'europe',
    name: 'Europe',
    destinations: [
      {
        slug: 'paris',
        city: 'Paris',
        country: 'France',
        code: 'CDG',
        priceFrom: 150,
        image:
          'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80',
      },
      {
        slug: 'london',
        city: 'London',
        country: 'United Kingdom',
        code: 'LHR',
        priceFrom: 89,
        image:
          'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80',
      },
      {
        slug: 'manchester',
        city: 'Manchester',
        country: 'United Kingdom',
        code: 'MAN',
        priceFrom: 79,
        image:
          'https://images.unsplash.com/photo-1516974551977-3769e1c2e4c4?w=900&q=80',
      },
      {
        slug: 'rome',
        city: 'Rome',
        country: 'Italy',
        code: 'FCO',
        priceFrom: 165,
        image:
          'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&q=80',
      },
    ],
  },
  {
    id: 'se-asia',
    name: 'Southeast and East Asia',
    destinations: [
      {
        slug: 'bangkok',
        city: 'Bangkok',
        country: 'Thailand',
        code: 'BKK',
        priceFrom: 420,
        image:
          'https://images.unsplash.com/photo-1563495285-ab7e888ab91d?w=900&q=80',
      },
      {
        slug: 'beijing',
        city: 'Beijing',
        country: 'China',
        code: 'PEK',
        priceFrom: 480,
        image:
          'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=900&q=80',
      },
      {
        slug: 'hong-kong',
        city: 'Hong Kong',
        country: 'Hong Kong',
        code: 'HKG',
        priceFrom: 520,
        image:
          'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=900&q=80',
      },
      {
        slug: 'tokyo',
        city: 'Tokyo',
        country: 'Japan',
        code: 'NRT',
        priceFrom: 590,
        image:
          'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80',
      },
    ],
  },
  {
    id: 'south-asia',
    name: 'South Asia',
    destinations: [
      {
        slug: 'delhi',
        city: 'Delhi',
        country: 'India',
        code: 'DEL',
        priceFrom: 360,
        image:
          'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900&q=80',
      },
      {
        slug: 'islamabad',
        city: 'Islamabad',
        country: 'Pakistan',
        code: 'ISB',
        priceFrom: 380,
        image:
          'https://images.unsplash.com/photo-1584824486500-0ab6e2e6f1b3?w=900&q=80',
      },
      {
        slug: 'dhaka',
        city: 'Dhaka',
        country: 'Bangladesh',
        code: 'DAC',
        priceFrom: 395,
        image:
          'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=900&q=80',
      },
    ],
  },
  {
    id: 'africa',
    name: 'Africa',
    destinations: [
      {
        slug: 'marrakech',
        city: 'Marrakech',
        country: 'Morocco',
        code: 'RAK',
        priceFrom: 210,
        image:
          'https://images.unsplash.com/photo-1517824804614-7ec2e6e05b7e?w=900&q=80',
      },
      {
        slug: 'cairo',
        city: 'Cairo',
        country: 'Egypt',
        code: 'CAI',
        priceFrom: 280,
        image:
          'https://images.unsplash.com/photo-1572256909848-2d9cb04ef41b?w=900&q=80',
      },
      {
        slug: 'nairobi',
        city: 'Nairobi',
        country: 'Kenya',
        code: 'NBO',
        priceFrom: 440,
        image:
          'https://images.unsplash.com/photo-1611348524140-53c39c60f33b?w=900&q=80',
      },
    ],
  },
]

/** Flat list for filters / legacy use */
export const DEMO_DESTINATIONS = DESTINATION_REGIONS.flatMap((r) => r.destinations)
