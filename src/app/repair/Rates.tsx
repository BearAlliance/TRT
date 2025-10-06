const services = [
  { name: 'Flat Fix', value: '$7 + Tube' },
  { name: 'Labor Rate', value: '$69.99/hr' },
  { name: 'Wheel True', value: '$30' },
  { name: '24 Hour Rush', value: '$25' },
]

export function Rates() {
  return (
    <div>
      <h1 className="font-face-stingray mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
        Shop Rates
      </h1>
      <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
        {services.map((stat, idx) => (
          <div key={idx} className="flex flex-col bg-gray-400/5 p-8">
            <dt className="text-sm/6 font-semibold text-gray-600">
              {stat.name}
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
