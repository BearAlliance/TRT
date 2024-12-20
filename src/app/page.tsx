import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Testimonials } from '@/components/Testimonials'
import { HomeStats } from '@/components/HomeStats'
import { BikeAd } from '@/components/BikeAd'

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeStats />
      <Features />
      <BikeAd />
      <Testimonials />
    </main>
  )
}
