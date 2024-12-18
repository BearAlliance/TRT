import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'
import Link from 'next/link'

const faqs = [
  [
    {
      question: 'What should I wear to my fit session?',
      answer:
        'Wear your cycling kit, including shoes and pedals. If you don’t have cycling shoes, wear your most comfortable athletic shoes.',
    },
  ],
  [
    {
      question: 'How long does a fit session take?',
      answer:
        'A fit session typically takes 1-1.5 hours. We want to make sure you’re comfortable and happy with your fit.',
    },
    {
      question: 'Do I have to be a serious cyclist to get a fit?',
      answer:
        'Not at all! We fit all types of riders. Everyone can benefit from a proper bike fit.',
    },
  ],
  [
    {
      question: "What if I'm not happy with my fit?",
      answer:
        'If you experience discomfort after getting a bike fit, call us and we will schedule a follow-up. Minor adjustments are sometimes needed after big modifications.',
    },
  ],
]

export function FitFaqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Common questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            {
              "We'll answer any questions you have during our fit session, but here are a few common ones to get you started."
            }{' '}
            Please{' '}
            <Link href="/contact" className="text-orange-600 underline">
              contact us
            </Link>{' '}
            if you have any other questions.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
