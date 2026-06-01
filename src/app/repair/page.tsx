import { Rates } from '@/app/repair/Rates'
import Packages from '@/app/repair/Packages'
import type { Metadata } from 'next'

const HEADING = 'Get back out there'
const SUBHEADING = "Don't let a mechanical problem keep you inside."

export const metadata: Metadata = {
  title: 'Bike Repair in Rosendale, NY',
  description:
    'Schedule bicycle repair and tune-up service at TRT Bicycles in Rosendale, NY. Flat fixes, wheel truing, labor rates, rush service, and seasonal maintenance for Hudson Valley riders.',
  alternates: {
    canonical: '/repair',
  },
  openGraph: {
    title: 'Bike Repair in Rosendale, NY | TRT Bicycles',
    description:
      'Bicycle repair, tune-ups, flat fixes, wheel truing, and seasonal maintenance at TRT Bicycles in Rosendale, NY.',
    url: '/repair',
  },
}

export default function RepairPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
              {HEADING}
            </h1>
            <p className="mt-4 text-lg/8 text-gray-600">{SUBHEADING}</p>
          </div>
          <Packages />
          <Rates />
        </div>
      </div>
    </div>
  )
}
