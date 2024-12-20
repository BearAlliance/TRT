import {
  EyeDropperIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  WrenchIcon,
} from '@heroicons/react/24/solid'
import Image from 'next/image'
import repairPic from '../../images/repair.jpg'

const features = [
  {
    name: 'Wash.',
    description: 'Get that mud off. Degrease the drivetrain.',
    icon: SparklesIcon,
  },
  {
    name: 'Inspect for safety.',
    description:
      'Check the brakes, tire condition, headset wear, frame integrity, and more.',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'Adjust shifting and breaking.',
    description: 'Get those levers feeling great.',
    icon: WrenchIcon,
  },
  {
    name: 'Replace worn cables and pads.',
    description: 'We use Jagwire & Bontrager components.',
    icon: WrenchIcon,
  },
  {
    name: 'True wheels, check wheel bearings.',
    description:
      'Adjust spoke tension, check the bearings, and adjust the tire mount if needed.',
    icon: WrenchIcon,
  },
  {
    name: 'Fresh Lube.',
    description: 'Everything as smooth as butter.',
    icon: EyeDropperIcon,
  },
]

const SUBHEADING =
  'Let us get your machine back into top condition. ' +
  "We'll focus on the work so you can focus on the ride. " +
  'Prices do not include parts.'

export default function Packages() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-orange-500">
                $89.99
              </h2>
              <p className="font-face-stingray mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900">
                Basic Tune Up
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">{SUBHEADING}</p>
              <dl className="mt-10 max-w-xl space-y-4 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute left-1 top-1 size-5 text-orange-500"
                      />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <Image
              alt="A mechanic working on a bike."
              src={repairPic}
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
