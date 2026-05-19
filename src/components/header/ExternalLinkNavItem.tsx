'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Brand, ExternalLinks } from '@/components/header/ExternalLinks'

export default function ExternalLinkNavItem({
  label,
  links,
}: {
  label: string
  links: Brand[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-expanded={isOpen}
        className="inline-flex items-center rounded-lg px-2 py-1 text-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{label}</span>
        <ChevronDownIcon aria-hidden="true" className="ml-1 size-5" />
      </button>

      {isOpen ? (
        <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
          <div className="w-56 shrink rounded-xl bg-white p-4 text-sm/6 font-semibold text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            <ExternalLinks links={links} onNavigate={() => setIsOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
