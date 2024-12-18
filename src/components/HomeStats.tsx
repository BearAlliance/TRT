const stats = [
  { name: 'Years in business', value: '25' },
  { name: 'Miles ridden by our employees', value: '500k' },
  { name: 'Bicycles serviced annually', value: '5,000+' },
]

export function HomeStats() {
  return (
    <div className="bg-gray-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center md:grid-cols-3">
          {stats.map((stat, idx) => (
            <div key={idx} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base/7 text-gray-400">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
