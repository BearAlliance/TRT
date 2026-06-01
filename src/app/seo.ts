export const SITE_URL = 'https://trtbicycles.com'
export const SITE_NAME = 'TRT Bicycles'

export const DEFAULT_DESCRIPTION =
  'TRT Bicycles is a family-owned bike shop in Rosendale, NY offering bicycle repair, e-bike rentals, Trek Precision Fit, bikes, and cycling gear for Hudson Valley riders.'

export const BUSINESS = {
  name: SITE_NAME,
  legalName: 'Table Rock Tours & Bicycles',
  telephone: '+1-845-658-7832',
  email: 'Christian@trtbicycles.com',
  streetAddress: '1066 NY-32',
  addressLocality: 'Rosendale',
  addressRegion: 'NY',
  postalCode: '12472',
  addressCountry: 'US',
  latitude: 41.84284097922505,
  longitude: -74.07618968482844,
  mapUrl: 'https://maps.app.goo.gl/8XzmKAVJb6nwEj6LA',
  facebookUrl: 'https://www.facebook.com/favatastrtbicycles',
  instagramUrl: 'https://www.instagram.com/trtbicycles/',
  twitterUrl: 'https://twitter.com/christianfavata',
}

export const SITE_ROUTES = ['/', '/rental', '/repair', '/fit', '/contact']

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['SportingGoodsStore', 'LocalBusiness'],
  '@id': `${SITE_URL}/#business`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  telephone: BUSINESS.telephone,
  email: BUSINESS.email,
  image: `${SITE_URL}/favicon.ico`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.streetAddress,
    addressLocality: BUSINESS.addressLocality,
    addressRegion: BUSINESS.addressRegion,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.latitude,
    longitude: BUSINESS.longitude,
  },
  hasMap: BUSINESS.mapUrl,
  sameAs: [
    BUSINESS.facebookUrl,
    BUSINESS.instagramUrl,
    BUSINESS.twitterUrl,
    BUSINESS.mapUrl,
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '11:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '14:00',
    },
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Bicycle repair',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'E-bike rentals',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Trek Precision Fit',
      },
    },
  ],
}
