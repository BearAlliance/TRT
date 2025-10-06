import clsx from 'clsx'

import { CheckIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

function Plan({
  name,
  hourPrice,
  dayPrice,
  description,
  features,
  featured = false,
}: {
  name: string
  hourPrice: string
  dayPrice: string
  description: string
  features: Array<string>
  featured?: boolean
}) {
  return (
    <section className="mx-6 flex max-w-sm flex-col justify-between rounded-3xl p-4 px-6 ring-2 ring-orange-400 sm:px-8 md:min-h-52">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-face-stingray text-4xl font-light text-white">
            {name}
          </h3>
          {featured ? (
            <p className="rounded-full bg-orange-500 px-2.5 py-1 text-sm font-semibold text-white">
              Popular
            </p>
          ) : null}
        </div>
        <div className="text-left">
          <p className="font-display mt-5 text-lg text-white">
            ${hourPrice}/hr
          </p>
          <p className="font-display text-lg text-white">${dayPrice}/day</p>
          <p className={clsx('mt-2 text-base', 'text-slate-400')}>
            {description}
          </p>
        </div>
        <ul
          role="list"
          className={clsx(
            'text-md mt-10 flex flex-col gap-y-3',
            'text-slate-200',
          )}
        >
          {features.map((feature) => (
            <li key={feature} className="flex">
              <CheckIcon
                aria-hidden="true"
                className="h-6 w-5 flex-none text-orange-600"
              />
              <span className="ml-4">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-end">
        <Link
          href="/contact"
          className="mt-12 block rounded-md bg-orange-500 px-3.5 py-2 text-center text-sm/6 font-semibold text-white shadow-xs hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 focus-visible:outline-solid"
        >
          Call to reserve
        </Link>
      </div>
    </section>
  )
}

export function Pricing() {
  return (
    <div className="mx-auto mt-16 grid max-w-sm grid-cols-1 justify-center gap-8 md:flex md:max-w-none lg:-mx-8">
      <Plan
        name="Road"
        hourPrice="25"
        dayPrice="55"
        description="Great for paved roads and putting in miles."
        features={[
          'Light weight',
          'Recent model year',
          'Flat kit included',
          'Serviced after every ride',
          'Complimentary saddle adjustment',
        ]}
      />
      <Plan
        featured
        name="E-Bike"
        hourPrice="25"
        dayPrice="75"
        description="Off-road capable, great for going the extra distance."
        features={[
          'Disc Brakes',
          'Range up to 50 miles',
          'Off-road capable',
          'Flat kit included',
          'Serviced after every ride',
          'Complimentary saddle adjustment',
        ]}
      />
    </div>
  )
}
