import React, { useState } from 'react';
import classNames from 'classnames';
import { NavModalHours } from './nav-modal-hours';
import {
  currentHours,
  isClosed,
  withHours,
  withoutHours,
  hoursLabel,
} from './hours';

export function NavHours({ displayHours = true, hiddenDesktop = false }) {
  const [modalOpen, setModalOpen] = useState(false);

  const toDisplay = displayHours && !isClosed ? withHours : withoutHours;

  return (
    <a
      className={classNames('navbar-item', {
        'is-hidden-desktop': hiddenDesktop,
      })}>
      <div onClick={() => setModalOpen(true)}>{toDisplay}</div>
      <NavModalHours
        title={hoursLabel}
        hours={currentHours}
        isActive={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </a>
  );
}
