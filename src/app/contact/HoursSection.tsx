import { getHoursBySeason } from '@/app/contact/hours'

export default function HoursSection() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-2xl font-semibold text-gray-900">Hours</h2>
          <p className="mt-4 text-lg/8 text-gray-600">
            Come in and say{' '}
            <span className="font-face-stingray text-orange-600">Hello</span>
          </p>
          <p className="mt-2 text-gray-700">
            Our hours change seasonally, so check back often!
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Day
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Hours
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getHoursBySeason().map((day) => (
                  <tr key={day.day}>
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                      {day.day}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                      {day.open && `${day.open} - ${day.close}`}
                      {!day.open && 'Closed'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
