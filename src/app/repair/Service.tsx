import React from 'react'
import { StaticImageData } from 'next/dist/client/legacy/image'
import Image from 'next/image'

interface Feature {
  name: string
  description: string
  icon: React.ComponentType<React.ComponentProps<'svg'>>
}
export interface Service {
  name: string
  description: string
  price: number
  imageSrc: StaticImageData
  features: Feature[]
}

export function Service({ service }: { service: Service }) {
  return (
    <>
      <div className="lg:ml-auto lg:pt-4 lg:pl-4" key={service.name}>
        <div className="lg:max-w-lg">
          <h2 className="text-base/7 font-semibold text-orange-500">
            ${service.price.toFixed(0)}
          </h2>
          <p className="font-face-stingray mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900">
            {service.name}
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">{service.description}</p>
          <dl className="mt-10 max-w-xl space-y-4 text-base/7 text-gray-600 lg:max-w-none">
            {service.features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <feature.icon
                    aria-hidden="true"
                    className="absolute top-1 left-1 size-5 text-orange-500"
                  />
                  {feature.name}
                </dt>{' '}
                <dd className="inline">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="hidden items-start justify-end lg:order-first lg:flex">
        <Image
          alt="A mechanic working on a bike."
          src={service.imageSrc}
          width={2432}
          height={1442}
          className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228"
        />
      </div>
    </>
  )
}
