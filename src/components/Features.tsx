'use client'

import Image, { type ImageProps } from 'next/image'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import fitImage from '@/images/precision-fit.jpg'
import rentalImage from '@/images/rosendale.jpg'
import repairImage from '@/images/bike-parts.jpg'
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/solid'
import { useState } from 'react'

interface Feature {
  name: React.ReactNode
  summary: string
  description: string
  image: ImageProps['src']
  icon: React.ComponentType
}

const features: Array<Feature> = [
  {
    name: 'Repair',
    summary: 'Keep your machine running just like new, year after year.',
    description:
      'Let our qualified technicians take care of your bike. We’ll make sure it’s in top shape for your next ride.',
    image: repairImage,
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'Rental',
    summary: 'Coming up for a weekend? We’ve got you covered',
    description:
      'Come in and rent a bike for the day, or the weekend. We have the right bike for you, no matter what your plans are.',
    image: rentalImage,
    icon: PaperAirplaneIcon,
  },
  {
    name: 'Fit',
    summary: 'Get the most out of your ride with a professional bike fit.',
    description:
      'Our certified Trek Precision fit technique will make sure you’re comfortable and efficient on your bike. You’ll be amazed at the difference a proper fit can make.',
    image: fitImage,
    icon: MagnifyingGlassIcon,
  },
]

function Feature({
  feature,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  feature: Feature
  isActive: boolean
}) {
  return (
    <div
      className={clsx(className, !isActive && 'opacity-75 hover:opacity-100')}
      {...props}
    >
      <div
        className={clsx(
          'w-9 rounded-lg',
          isActive ? 'bg-orange-600' : 'bg-slate-500',
        )}
      >
        <svg aria-hidden="true" className="h-9 w-9" fill="none">
          <feature.icon />
        </svg>
      </div>
      <h3
        className={clsx(
          'mt-6 text-sm font-medium',
          isActive ? 'text-orange-600' : 'text-slate-600',
        )}
      >
        {feature.name}
      </h3>
      <p className="mt-2 text-xl text-slate-900">{feature.summary}</p>
      <p className="mt-4 text-sm text-slate-600">{feature.description}</p>
    </div>
  )
}

function FeaturesMobile() {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature) => (
        <div key={feature.summary}>
          <Feature feature={feature} className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6" />
            <div className="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
              <Image
                className="w-full"
                src={feature.image}
                alt=""
                sizes="52.75rem"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FeaturesDesktop() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <TabGroup
      className="hidden lg:mt-20 lg:block"
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      {({ selectedIndex }) => (
        <>
          <TabList className="grid grid-cols-3 gap-x-8">
            {features.map((feature, featureIndex) => (
              <Feature
                key={feature.summary}
                feature={{
                  ...feature,
                  name: (
                    <Tab className="ui-not-focus-visible:outline-none">
                      <span className="absolute inset-0" />
                      {feature.name}
                    </Tab>
                  ),
                }}
                isActive={featureIndex === selectedIndex}
                className="relative"
              />
            ))}
          </TabList>
          <TabPanels className="relative mt-20 overflow-hidden rounded-4xl bg-slate-200 px-14 py-16 xl:px-16">
            <div className="-mx-5 flex">
              {features.map((feature, featureIndex) => (
                <TabPanel
                  onClick={() => setSelectedIndex(featureIndex)}
                  static
                  key={feature.summary}
                  className={clsx(
                    'cursor-pointer px-5 transition duration-500 ease-in-out ui-not-focus-visible:outline-none',
                    featureIndex !== selectedIndex && 'opacity-60',
                  )}
                  style={{ transform: `translateX(-${selectedIndex * 95}%)` }}
                  aria-hidden={featureIndex !== selectedIndex}
                >
                  <div className="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                    <Image
                      className="w-full"
                      src={feature.image}
                      alt=""
                      sizes="52.75rem"
                    />
                  </div>
                </TabPanel>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-slate-900/10" />
          </TabPanels>
        </>
      )}
    </TabGroup>
  )
}

const aboutUs = `We are a family of cyclists.
Our entire family lives to ride.
From the professional to the weekend warrior we have the entire spectrum of equipment and accessories covered.
Cycling is our passion, let us share it with the riders in your family.
We want our relationships to last as long as our bikes, so you can count on us to take care of you and do what’s right.
We stand behind our bikes, and the people who ride them.`

export function Features() {
  return (
    <section
      id="features"
      aria-label="Features for simplifying everyday business tasks"
      className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32"
    >
      <Container>
        <div className="bg-white px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
            <h1 className="mt-2 text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl md:text-4xl">
              Everything you need for your ride
            </h1>
            <p className="mt-6 text-xl/8">{aboutUs}</p>
          </div>
        </div>

        <FeaturesMobile />
        <FeaturesDesktop />
      </Container>
    </section>
  )
}
