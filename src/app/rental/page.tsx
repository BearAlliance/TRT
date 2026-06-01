import { FareHarborLightframe } from '@/app/rental/fair-harbor'
import { Pricing } from '@/app/rental/Pricing'
import { Container } from '@/components/Container'
import FrequentlyAskedQuestions from '@/app/rental/FrequentlyAskedQuestions'
import type { Metadata } from 'next'

const currentYear = new Date().getFullYear()

const heading = 'Sweet rides, batteries included.'
const subheading = `Come enjoy a ride in the Hudson Valley! Rent one of our
              ${currentYear} fleet, serviced after every ride.
`

export const metadata: Metadata = {
  title: 'Hudson Valley E-Bike Rentals',
  description:
    'Rent serviced e-bikes from TRT Bicycles in Rosendale, NY for Hudson Valley rides, weekend trips, and local trail adventures.',
  alternates: {
    canonical: '/rental',
  },
  openGraph: {
    title: 'Hudson Valley E-Bike Rentals | TRT Bicycles',
    description:
      'Reserve e-bike rentals from TRT Bicycles in Rosendale, NY for Hudson Valley rides and weekend trips.',
    url: '/rental',
  },
}

export default function RentalPage() {
  return (
    <>
      <FareHarborLightframe />
      <section
        id="pricing"
        aria-label="Pricing"
        className="bg-slate-900 py-20 sm:py-32"
      >
        <Container>
          <div className="md:text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
              {heading}
            </h1>
            <p className="mt-4 text-lg text-slate-400">{subheading}</p>
            <p className="text-lg text-slate-400">
              We have a full range of sizes. Not sure what you want? Call us!
            </p>
          </div>
          <Pricing />
        </Container>
      </section>
      <section>
        <FrequentlyAskedQuestions />
      </section>
    </>
  )
}
