import React, { Fragment } from 'react';
import trt from './trt.svg';
import { Link } from 'react-router-dom';

function NavLink({ label, url }) {
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
  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link">{label}</a>
      <div className="navbar-dropdown">
        {categories.map(category => (
          <Fragment key={category.label}>
            <NavDropdownLabel label={category.label} />
            {category.links.map(link => (
              <NavLink key={link.url} label={link.label} url={link.url} />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export function Nav() {
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

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/home" className="navbar-item">
          <img src={trt} width="112" height="28" />
        </Link>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">
            <Link to="/rental">Rental</Link>
          </a>
          <a className="navbar-item">
            <Link to="/repair">Repair</Link>
          </a>
          <a className="navbar-item">
            <Link to="/fit">Fit</Link>
          </a>

          <SegmentedDropdown label="Bikes" categories={bikes} />
          <SegmentedDropdown label="Brands" categories={brands} />
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <a className="navbar-item">Open Today</a>
            <a className="navbar-item">845-658-7832</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
