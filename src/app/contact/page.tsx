import { Container } from '@/components/Container'
import HoursSection from '@/app/contact/HoursSection'
import { GoogleMap } from '@/app/contact/GoogleMap'
import ContactMethods from '@/app/contact/ContactMethods'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact TRT Bicycles',
  description:
    'Call, email, or visit TRT Bicycles at 1066 NY-32 in Rosendale, NY. Find current shop hours, directions, and contact information.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact TRT Bicycles in Rosendale, NY',
    description:
      'Find TRT Bicycles hours, directions, phone number, email, and address in Rosendale, NY.',
    url: '/contact',
  },
}

export default function ContactPage() {
  return (
    <Container>
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
              Contact
            </h1>
            <p className="mt-4 text-lg/8 text-gray-600">
              {"We'd love to hear from you."}
            </p>
          </div>
        </header>
        <main>
          <ContactMethods />
          <div className="mx-auto grid max-w-7xl grid-cols-1 px-4 py-8 sm:px-6 md:grid-cols-2 lg:px-8">
            <HoursSection />
            <div className="sm:flex-auto">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                Find Us
              </h2>
              <GoogleMap />
            </div>
          </div>
        </main>
      </div>
    </Container>
  )
}
