import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import { NavModalContact } from './nav-modal-contact';

export function NavContact({ hiddenDesktop = false }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Fragment>
      <a
        className={classNames('navbar-item', 'is-link', {
          'is-hidden-desktop': hiddenDesktop
        })}
        onClick={() => setModalOpen(true)}>
        845-658-7832
      </a>

      <NavModalContact
        isActive={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Fragment>
  );
}
