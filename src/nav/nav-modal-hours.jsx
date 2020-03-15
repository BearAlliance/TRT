import React from 'react';
import classNames from 'classnames';
import { HoursTable } from './hours-table';

export function NavModalHours({ title, hours, isActive, onClose }) {
  return (
    <div className={classNames('modal', { 'is-active': isActive })}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={onClose} />
        </header>
        <section className="modal-card-body">
          <HoursTable hours={hours} />
        </section>
        <footer className="modal-card-foot">
          <button className="button" aria-label="close" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
