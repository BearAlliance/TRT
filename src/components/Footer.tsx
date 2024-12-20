'use client'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/header/Logo'
import { NavLink } from '@/components/header/NavLink'
import {
  faFacebookF,
  faGoogle,
  faInstagram,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const socialLinks = [
  {
    href: 'https://www.facebook.com/favatastrtbicycles',
    label: 'Facebook',
    icon: faFacebookF,
  },
  {
    href: 'https://twitter.com/christianfavata',
    icon: faXTwitter,
  },
  {
    href: 'https://www.instagram.com/trtbicycles/',
    icon: faInstagram,
  },
  {
    href: 'https://maps.app.goo.gl/2AMvoLRPdERWmhed8',
    icon: faGoogle,
  },
]

export function Footer() {
  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-16">
          <Logo />
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              <NavLink href="/rental">Rental</NavLink>
              <NavLink href="/repair">Repair</NavLink>
              <NavLink href="/fit">Fit</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex gap-x-6">
            {socialLinks.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                aria-label={link.label}
                rel="noopenner noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={link.icon}
                  className="h-6 w-6 text-slate-500 transition-colors hover:text-orange-500"
                />
              </Link>
            ))}
          </div>
          <div className="grid-cols-1">
            <p className="mt-6 text-sm text-slate-500 sm:mt-0">
              Copyright &copy; {new Date().getFullYear()} Table Rock Tours &
              Bicycles. All rights reserved.
            </p>
            <p className="mt-6 text-sm text-slate-500 sm:mt-0">
              A website by{' '}
              <Link href="https://nickcacace.com" target="_blank">
                Nick Cacace
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
