import { InventoryGrid } from '@/app/inventory/InventoryGrid'
import { Container } from '@/components/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop Our Inventory',
  description:
    'Browse the current bikes and gear available at TRT Bicycles in Rosendale, NY.',
  alternates: {
    canonical: '/inventory',
  },
  openGraph: {
    title: 'Shop Our Inventory | TRT Bicycles',
    description:
      'Browse the current bikes and gear available at TRT Bicycles in Rosendale, NY.',
    url: '/inventory',
  },
}

export default function InventoryPage() {
  return (
    <section
      id="inventory"
      aria-label="Inventory"
      className="bg-slate-900 py-20 sm:py-32"
    >
      <Container>
        <div className="md:text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
            Our Inventory
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Bikes and gear we typically stock.
          </p>
        </div>
        <div className="mt-12">
          <InventoryGrid />
        </div>
      </Container>
    </section>
  )
}
