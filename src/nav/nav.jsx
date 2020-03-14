import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import trt from './trt.svg';
import { Link } from 'react-router-dom';
import { NavHours } from './nav-hours';
import { NavContact } from './nav-contact';

function ExternalNavLink({ label, url }) {
  return (
    <a
      className="navbar-item"
      rel="noopener noreferrer"
      href={url}
      target="_blank">
      {label}
    </a>
  );
}

function NavDropdownLabel({ label }) {
  return <div className="navbar-item has-text-primary">{label}</div>;
}

function SegmentedDropdown({ label, categories }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={classNames('navbar-item', 'has-dropdown', 'is-hoverable', {
        'is-active': isActive
      })}
      onClick={() => setIsActive(false)}>
      <a className="navbar-link">{label}</a>
      <div className="navbar-dropdown">
        {categories.map(category => (
          <Fragment key={category.label}>
            <NavDropdownLabel label={category.label} />
            {category.links.map(link => (
              <ExternalNavLink
                key={link.url}
                label={link.label}
                url={link.url}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function NavLink({ label, path }) {
  const location = useLocation();
  const isActive = location.pathname === path;
  console.log(path, isActive);
  return (
    <div className="navbar-item">
      <Link
        className={classNames('has-text-secondary', {
          'has-text-primary': isActive
        })}
        to={path}>
        {label}
      </Link>
    </div>
  );
}

export function Nav() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  const bikes = [
    {
      label: 'Trek',
      links: [
        {
          label: 'Road',
          url: ''
        },
        {
          label: 'Mountain',
          url: ''
        },
        {
          label: 'Hybrid',
          url: ''
        }
      ]
    },
    {
      label: 'bmc',
      links: [
        {
          label: 'Road',
          url: ''
        },
        {
          label: 'Mountain',
          url: ''
        },
        {
          label: 'Hybrid',
          url: ''
        }
      ]
    },
    {
      label: 'Framed Fat Bikes',
      links: [
        {
          label: 'Wolftrax',
          url: ''
        },
        {
          label: 'Alaskan',
          url: ''
        },
        {
          label: 'Minnesota',
          url: ''
        }
      ]
    },
    {
      label: 'Redline',
      links: [
        {
          label: 'BMX',
          url: ''
        }
      ]
    }
  ];

  const brands = [
    {
      label: 'Components',
      links: [
        {
          label: 'SRAM',
          url: ''
        },
        {
          label: 'Shimano',
          url: ''
        },
        {
          label: 'Fox Racing Shox',
          url: ''
        },
        {
          label: 'RockShox',
          url: ''
        }
      ]
    },
    {
      label: 'Accessories',
      links: [
        {
          label: 'Bontrager',
          url: ''
        },
        {
          label: 'Park Tool',
          url: ''
        },
        {
          label: 'Vie13',
          url: ''
        },
        {
          label: 'Northwave',
          url: ''
        }
      ]
    },
    {
      label: 'Wheels',
      links: [
        {
          label: 'Mavic',
          url: ''
        },
        {
          label: 'Bontrager',
          url: ''
        },
        {
          label: "Stan's NoTubes",
          url: ''
        }
      ]
    }
  ];

  const navLinks = [
    {
      label: 'Rental',
      path: '/rental'
    },
    {
      label: 'Repair',
      path: '/repair'
    },
    {
      label: 'Fit',
      path: '/fit'
    }
  ];

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/home" className="navbar-item">
          <img src={trt} width="112" height="28" alt="trt-logo" />
        </Link>

        <NavHours displayHours={false} hiddenDesktop={true} />
        <NavContact hiddenDesktop={true} />

        <a
          role="button"
          className={classNames('navbar-burger', 'burger', {
            'is-active': showBurgerMenu
          })}
          aria-label="menu"
          aria-expanded={showBurgerMenu}
          onClick={() => setShowBurgerMenu(!showBurgerMenu)}>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div
        className={classNames('navbar-menu', { 'is-active': showBurgerMenu })}>
        <div className="navbar-start">
          {navLinks.map(navLink => (
            <NavLink
              key={navLink.path}
              label={navLink.label}
              path={navLink.path}
            />
          ))}

          <SegmentedDropdown label="Bikes" categories={bikes} />
          <SegmentedDropdown label="Brands" categories={brands} />
        </div>

        <div className="navbar-end">
          <NavHours />
          <NavContact />
        </div>
      </div>
    </nav>
  );
}
