import classNames from 'classnames';
import React from 'react';

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

export function SocialLinks() {
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
