import Link from 'next/link'

const stats = [
  { name: 'Phone', value: '845-658-7832', href: 'tel:1+8456587832' },
  {
    name: 'Email',
    value: 'Christian@trtbicycles.com',
    href: 'mailto:Christian@trtbicycles.com',
  },
  {
    name: 'Address',
    value: '1066 NY-32, Rosendale, NY 12472',
    href: 'https://maps.app.goo.gl/8XzmKAVJb6nwEj6LA',
  },
]

export default function ContactMethods() {
  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center md:grid-cols-3">
          {stats.map((stat, idx) => (
            <div key={idx} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base/7 text-gray-600">{stat.name}</dt>
              <Link href={stat.href} target="_blank">
                <dd className="text-md order-first font-semibold tracking-tight text-blue-600 hover:text-blue-900">
                  {stat.value}
                </dd>
              </Link>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
