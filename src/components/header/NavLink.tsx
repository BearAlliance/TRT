'use client'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

export function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={clsx(
        'inline-block rounded-lg px-2 py-1 text-lg hover:bg-slate-100',
        pathname.includes(href) ? 'text-orange-700' : 'text-slate-700',
      )}
    >
      {children}
    </Link>
  )
}
