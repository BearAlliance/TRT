import {
  EyeDropperIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  WrenchIcon,
} from '@heroicons/react/24/solid'
import repairPic from '../../images/repair.jpg'
import React from 'react'
import { Service } from '@/app/repair/Service'

const services: Service[] = [
  {
    name: 'Basic Tune Up',
    description:
      'Let us get your machine back into top condition. ' +
      "We'll focus on the work so you can focus on the ride. " +
      'Prices do not include parts.',
    price: 99,
    imageSrc: repairPic,
    features: [
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
    ],
  },
]

export default function Packages() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {services.map((service) => (
            <Service service={service} key={service.name} />
          ))}
        </div>
      </div>
    </div>
  )
}
