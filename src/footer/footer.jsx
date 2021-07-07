import React from 'react';
import classNames from 'classnames';
import './footer.scss';
import { address, phone } from '../constants';

const socialLinks = [
  {
    href: 'https://www.facebook.com/favatastrtbicycles',
    icon: 'fa-facebook-f',
  },
  {
    href: 'https://twitter.com/christianfavata',
    icon: 'fa-twitter',
  },
  {
    href: 'https://www.instagram.com/trtbicycles/',
    icon: 'fa-instagram',
  },
];

function SocialLinks() {
  return socialLinks.map((socialLink) => (
    <a
      key={socialLink.icon}
      aria-label={socialLink.icon}
      className="m-2 has-text-primary"
      href={socialLink.href}
      rel="noopener noreferrer"
      target="_blank">
      <i className={classNames('fab', 'fa-2x', socialLink.icon)} />
    </a>
  ));
}

export function Footer() {
  return (
    <footer className="footer p-3 has-text-secondary">
      <div className="content columns has-text-centered">
        <div className="column is-size-7 has-text-left-desktop">
          <div className="has-text-weight-bold">
            © TRT Bicycles {new Date().getFullYear()}
          </div>
          <div>
            by <a href="http://nickcacace.com">Nick Cacace</a>.
          </div>
        </div>
        <address className="column is-size-7">
          {phone}
          {' • '}
          {address}
        </address>
        <div className="column has-text-right-desktop">
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
