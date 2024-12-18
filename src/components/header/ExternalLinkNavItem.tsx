'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Brand, ExternalLinks } from '@/components/header/ExternalLinks'

export default function ExternalLinkNavItem({
  label,
  links,
}: {
  label: string
  links: Brand[]
}) {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center rounded-lg px-2 py-1 text-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900">
        <span>{label}</span>
        <ChevronDownIcon aria-hidden="true" className="ml-1 size-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="w-56 shrink rounded-xl bg-white p-4 text-sm/6 font-semibold text-gray-900 shadow-lg ring-1 ring-gray-900/5">
          <ExternalLinks links={links} />
        </div>
      </PopoverPanel>
    </Popover>
  )
}
