import { InventoryAdmin } from '@/app/admin/InventoryAdmin'
import { Container } from '@/components/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inventory Admin',
  robots: { index: false, follow: false },
}

export default function InventoryAdminPage() {
  return (
    <section className="bg-slate-100 py-16 sm:py-24">
      <Container>
        <InventoryAdmin />
      </Container>
    </section>
  )
}
