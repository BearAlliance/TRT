import classNames from 'classnames';
import React from 'react';

export function Modal({ title, onClose, isActive, children }) {
  return (
    <div className={classNames('modal', { 'is-active': isActive })}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={onClose} />
        </header>
        <section className="modal-card-body">{children}</section>
        <footer className="modal-card-foot">
          <button className="button" aria-label="close" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
