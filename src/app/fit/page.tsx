import { CheckIcon } from '@heroicons/react/20/solid'
import { FitFaqs } from '@/app/fit/Faqs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fit',
}

const tiers = [
  {
    name: 'Road Fit',
    id: 'road-fit',
    href: '#',
    price: '$250',
    description:
      'Through an interview and physical evaluation, a Road Fit will determine a rider’s ideal geometry.',
    features: [
      'Shoe sizing & cleat placement',
      'Saddle selection',
      'Saddle height',
      'Saddle fore/aft position',
      'Stem length & position',
      'Handlebar width & position',
    ],
  },
  {
    name: 'Triathalon Fit',
    id: 'tri-fit',
    href: '#',
    price: '$300',
    description:
      'Covers all elements included in Road Fit, plus a custom analysis of proper aerobar set up. ' +
      "The Tri Fit determines a rider's ideal geometry and aerobar set up.",
    features: [
      'Physical evaluation',
      'Shoe sizing & cleat placement',
      'Saddle selection',
      'Saddle height',
      'Saddle fore/aft position',
      'Stem length & position',
      'Aerobar pad height & reach',
    ],
  },
]

const description =
  'Precision Fit is a comprehensive analysis of the interface between cyclist and bicycle. ' +
  'Using our motion capture fitting system we aim to optimize the interface between two and make you a more comfortable and more efficient cyclist. ' +
  'Proper fit on your bicycle will be confidence-inspiring and enhance your overall cycling experience. ' +
  'Fits are performed weekly by appointment.'

function ScheduleButton() {
  return (
    <Link
      href="/contact"
      className="mt-8 block rounded-md bg-orange-500 px-3.5 py-2 text-center text-sm/6 font-semibold text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
    >
      Call to schedule
    </Link>
  )
}

export default function FitPage() {
  return (
    <div className="isolate bg-gray-900">
      <div className="mx-auto max-w-7xl pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto">
          <h2 className="text-base/7 font-semibold text-orange-500">
            Trek Precision Fit
          </h2>
          <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Comfortable to the last mile
          </p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
            {description}
          </p>
          <svg
            viewBox="0 0 1208 1024"
            className="absolute left-1/2 -z-10 h-[64rem] w-screen -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
          >
            <ellipse
              cx={604}
              cy={512}
              rx={604}
              ry={512}
              fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)"
            />
            <defs>
              <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                <stop stopColor="#6B6A6D" />
                <stop offset={1} stopColor="#6B6A6D" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flow-root bg-white pb-24 sm:pb-32">
        <div className="-mt-80">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
                >
                  <div>
                    <h3
                      id={tier.id}
                      className="font-face-stingray text-3xl/9 font-semibold text-orange-600"
                    >
                      {tier.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-3xl font-semibold tracking-tight text-gray-900">
                        {tier.price}
                      </span>
                    </div>
                    <p className="mt-6 text-base/7 text-gray-600">
                      {tier.description}
                    </p>
                    <ul
                      role="list"
                      className="mt-10 space-y-4 text-sm/6 text-gray-600"
                    >
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon
                            aria-hidden="true"
                            className="h-6 w-5 flex-none text-orange-600"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ScheduleButton />
                </div>
              ))}
              <div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center">
                <div className="lg:min-w-0 lg:flex-1">
                  <h3 className="font-face-stingray text-3xl/9 font-semibold text-orange-600">
                    Cleat & Saddle Adjustment
                  </h3>
                  <p className="mt-1 text-base/7 text-gray-600">
                    Buying new shoes or a new saddle? Cleats worn out? This fit
                    addresses the lower body including saddle and cleat
                    positions to make sure the feet, legs, and hips are aligned
                    and tracking properly. Recommended for spin class
                    participants.
                  </p>
                  <div className="max-w-36">
                    <ScheduleButton />
                  </div>
                </div>
                <div className="text-3xl font-semibold tracking-tight text-gray-900">
                  $50
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FitFaqs />
    </div>
  )
}
