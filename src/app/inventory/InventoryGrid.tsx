'use client'

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react'

export type InventoryItem = {
  createdAt: string
  description: string
  id: string
  imageUrl: string
  title: string
  updatedAt: string
}

export const cmsApiUrl =
  process.env.NEXT_PUBLIC_CMS_API_URL ?? 'http://localhost:4000'

export function InventoryGrid() {
  const [items, setItems] = useState<InventoryItem[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    void fetch(`${cmsApiUrl}/v1/inventory`)
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to load inventory.')
        return response.json() as Promise<{ items: InventoryItem[] }>
      })
      .then(({ items }) => setItems(items))
      .catch(() => setError(true))
  }, [])

  if (error)
    return (
      <p className="rounded-2xl bg-white p-6 text-slate-700">
        Inventory is temporarily unavailable. Please call the shop for current
        availability.
      </p>
    )
  if (!items)
    return (
      <p className="rounded-2xl bg-white p-6 text-slate-700">
        Loading inventory…
      </p>
    )
  if (!items.length)
    return (
      <p className="rounded-2xl bg-white p-6 text-slate-700">
        No inventory is listed right now. Please check back soon.
      </p>
    )

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="overflow-hidden rounded-2xl bg-white shadow-sm"
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="aspect-4/3 w-full object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              {item.title}
            </h2>
            <p className="mt-2 whitespace-pre-line text-slate-600">
              {item.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}
