'use client'

import Link from 'next/link'
import Image from 'next/image'
import notFoundImage from '@/images/404.webp'

export default function NotFound() {
  return (
    <>
      <main className="relative isolate min-h-full">
        <Image
          alt=""
          src={notFoundImage}
          className="absolute inset-0 -z-10 size-full object-cover object-top"
        />

        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-base/8 font-semibold text-white">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-white sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex justify-center text-white">
            <Link href="/" className="text-sm/7 font-semibold">
              <span aria-hidden="true">&larr;</span> Back to home
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
