import Link from 'next/link'

const faqs = [
  {
    question: 'Do I need any previous experience to rent an E-Bike?',
    answer: 'Nope! Anyone who can ride a regular bike can ride an E-Bike.',
  },
  {
    question: 'Do I need a license to ride an E-Bike?',
    answer:
      'No license is required to ride an E-Bike. You must obey the rules for a normal bicycle on the road.',
  },
  {
    question: "I'm new to the area, where can I ride?",
    answer:
      "We're more than happy to help you find a place to ride. " +
      "When you come in to rent just ask us about trail conditions and we'll point you in the right direction",
  },
  // More questions...
]

export default function FrequentlyAskedQuestions() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-pretty text-base/7 text-gray-600">
              Can’t find the answer you’re looking for?{' '}
              <Link
                href="/contact"
                className="font-semibold text-orange-500 hover:text-orange-700"
              >
                Contact us
              </Link>
              .
            </p>
          </div>
          <div className="mt-10 lg:col-span-7 lg:mt-0">
            <dl className="space-y-10">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-base/7 font-semibold text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
