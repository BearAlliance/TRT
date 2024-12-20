import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export type Brand = {
  label: string
  links: {
    label: string
    href: string
  }[]
}

export function ExternalLinks({ links }: { links: Brand[] }) {
  return links.map((item) => (
    <div key={item.label}>
      <div className="font-medium text-orange-600">{item.label}</div>
      {item.links.map((link) => (
        <div className="relative" key={link.href}>
          <Link
            href={link.href}
            rel="noopener noreferrer"
            target="_blank"
            className="p block px-2 py-0.5 font-medium hover:text-blue-700"
          >
            {link.label}
            <ArrowTopRightOnSquareIcon
              aria-hidden="true"
              className="ml-2 inline size-4"
            />
          </Link>
        </div>
      ))}
    </div>
  ))
}
