import Image from 'next/image'

import { Container } from '@/components/Container'
import jenniferDoherty from '@/images/avatars/jennifer-doherty.png'
import mattZencey from '@/images/avatars/matt-zencey.png'
import maryHana from '@/images/avatars/mary-hana.png'
import bobJoseph from '@/images/avatars/bob-joseph.png'
import aAvatar from '@/images/avatars/a-avatar.png'
import anja from '@/images/avatars/anja.png'

const testimonials = [
  [
    {
      content:
        'This is by far the best bike shop in the area. Christian is extremely knowledgeable, has a large stock of bikes/gear, and has kept our bikes well-maintained. I also bought a new gravel bike from him and have been very happy with it. The folks working there are kind and friendly, and always willing to share information and tips.',
      author: {
        name: 'Jennifer D',
        role: 'Gravel guru',
        image: jenniferDoherty,
      },
    },
    {
      content:
        "I showed up mid-afternoon at TRT after riding in Mohonk Preserve, where I had a flat I couldn't fix and rode out to my car on the dead tire. I got immediate help, no waiting - in 20 minutes, I had a new tire and tube, and my wheel trued up, ready to keep riding.",
      author: {
        name: 'Matt Z',
        role: 'Flat no more',
        image: mattZencey,
      },
    },
  ],
  [
    {
      content:
        'This bike shop is great for so many reasons. The best reason is Christian who will listen to what you need and do his best to take care of it at a reasonable price. The shop was once a bank, so it is cool to visit. His stock is excellent from a first bike to a superior ride. Go there. He is great!',
      author: {
        name: 'Mary H',
        role: 'Wants the total package',
        image: maryHana,
      },
    },
    {
      content:
        'A GEM of a bike shop! Christian and his team have great energy and I loved the vibe in the store.',
      author: {
        name: 'Anja',
        role: 'Appreciates a vibe',
        image: anja,
      },
    },
  ],
  [
    {
      content:
        'Christian was more then helpful is showing us e-bikes. There was no pressure to buy. But of course we did because my wife and I thought the questions we asked had thorough answers, suggestions were excellent AND Follow up servicing was just as good an experience. Highly recommend. Would give a sixth star if we had the choice.',
      author: {
        name: 'Bob Joseph',
        role: 'Electric bike convert',
        image: bobJoseph,
      },
    },
    {
      content:
        'Great place! I came in to order a new triathlon bike, and Christian handled it like a pro. He was super knowledgeable and very helpful. His father also has great energy—the good vibes at this shop make it really great!',
      author: {
        name: 'Arnaud D',
        role: 'Triathlon enthusiast',
        image: aAvatar,
      },
    },
  ],
]

function QuoteIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
  )
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="bg-slate-50 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Loved by our community
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            {
              "Our customers are the best. Here's what they have to say about us."
            }
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map((testimonial, testimonialIndex) => (
                  <li key={testimonialIndex}>
                    <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                      <QuoteIcon className="absolute top-6 left-6 fill-slate-100" />
                      <blockquote className="relative">
                        <p className="text-lg tracking-tight text-slate-900">
                          {testimonial.content}
                        </p>
                      </blockquote>
                      <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div>
                          <div className="font-display text-base text-slate-900">
                            {testimonial.author.name}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            {testimonial.author.role}
                          </div>
                        </div>
                        <div className="overflow-hidden rounded-full bg-slate-50">
                          <Image
                            className="h-14 w-14 object-cover"
                            src={testimonial.author.image}
                            alt=""
                            width={56}
                            height={56}
                          />
                        </div>
                      </figcaption>
                    </figure>
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
