'use client'

import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
  DisclosurePanel,
  DisclosureButton,
  Disclosure,
} from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { Logo } from '@/components/header/Logo'
import { NavLink } from '@/components/header/NavLink'
import ExternalLinkNavItem from '@/components/header/ExternalLinkNavItem'
import { bikeLinks, brandLinks } from '@/components/header/links'
import {
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid'

const mainNavLinks = [
  { name: 'Rental', href: '/rental' },
  { name: 'Repair', href: '/repair' },
  { name: 'Fit', href: '/fit' },
]

const rightSideNavLinks = [{ name: 'Contact', href: '/contact' }]

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-slate-300/50 duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <PopoverPanel
        transition
        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {[...mainNavLinks, ...rightSideNavLinks].map((link) => (
          <MobileNavLink key={link.name} href={link.href}>
            {link.name}
          </MobileNavLink>
        ))}

        <hr className="m-2 border-slate-300/40" />

        <Disclosure as="div" className="">
          <DisclosureButton className="tracking-light group -m-1 flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-lg font-medium text-slate-900 hover:bg-gray-50">
            Brands
            <ChevronDownIcon
              aria-hidden="true"
              className="size-5 flex-none group-data-[open]:rotate-180"
            />
          </DisclosureButton>
          <DisclosurePanel className="ml-1 mt-2 space-y-1">
            {[...bikeLinks, ...brandLinks].map((item) => (
              <div key={item.label}>
                <div className="font-light text-orange-600">{item.label}</div>
                {item.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block rounded-lg py-0 pl-6 pr-3 text-sm/7 font-medium text-gray-900 hover:bg-gray-50"
                  >
                    {link.label}
                    <ArrowTopRightOnSquareIcon className="ml-1 inline-block h-4 w-4" />
                  </Link>
                ))}
              </div>
            ))}
          </DisclosurePanel>
        </Disclosure>
      </PopoverPanel>
    </Popover>
  )
}

export function Header() {
  return (
    <header className="py-2">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-2">
            <Link href="/" aria-label="Home">
              <Logo />
            </Link>
            <Link
              href="/"
              className="inline-block rounded-lg px-2 py-1 text-lg hover:bg-slate-100 hover:text-slate-700"
            >
              TRT Bicycles
            </Link>
            <div className="hidden md:gap-x-4 lg:flex">
              {mainNavLinks.map((link) => (
                <NavLink key={link.name} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
              <ExternalLinkNavItem label="Bikes" links={bikeLinks} />
              <ExternalLinkNavItem label="Brands" links={brandLinks} />
            </div>
          </div>
          <div className="flex items-center gap-x-5">
            <Link href="tel:+18456587832">845-658-7832</Link>
            <div className="hidden lg:block">
              {rightSideNavLinks.map((link) => (
                <NavLink key={link.name} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </div>
            <div className="-mr-1 lg:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
