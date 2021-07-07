import React from 'react';
import './footer.scss';
import { address, phone } from '../constants';
import { SocialLinks } from '../components/social-links';

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
