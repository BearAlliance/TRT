import React from 'react';
import classNames from 'classnames';
import './footer.scss';

export function Footer() {
  const socialLinks = [
    {
      href: 'https://www.facebook.com/favatastrtbicycles',
      icon: 'fa-facebook-f'
    },
    {
      href: 'https://twitter.com/christianfavata',
      icon: 'fa-twitter'
    },
    {
      href: 'https://www.instagram.com/explore/tags/trtbicycles/',
      icon: 'fa-instagram'
    }
  ];

  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <div>
          <div className="is-pulled-left is-size-7">
            <div>
              <strong className="has-text-secondary">
                © TRT Bicycles {new Date().getFullYear()}
              </strong>
            </div>
            <div className=" has-text-secondary">
              by <a href="http://nickcacace.com">Nick Cacace</a>.
            </div>
          </div>
          <div className="is-pulled-right">
            {socialLinks.map(socialLink => (
              <a
                key={socialLink.icon}
                aria-label={socialLink.icon}
                className="social-link has-text-primary"
                href={socialLink.href}
                rel="noopener noreferrer"
                target="_blank">
                <i className={classNames('fab', 'fa-2x', socialLink.icon)} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
