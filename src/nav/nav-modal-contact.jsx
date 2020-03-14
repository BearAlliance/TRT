import React from 'react';
import classNames from 'classnames';

export function NavModalContact({ onClose, isActive }) {
  return (
    <div className={classNames('modal', { 'is-active': isActive })}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Contact</p>
          <button className="delete" aria-label="close" onClick={onClose} />
        </header>
        <section className="modal-card-body">
          <div className="columns is-centered">
            <div className="column is-three-fifths">
              <iframe
                src=" https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2972.324535623776!2d-74.07618968482844!3d41.84284097922505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89dd1bca6bdc817b%3A0x62a69083f892ee33!2sFavata&#39;s+TRT+Bicycles!5e0!3m2!1sen!2sus!4v1450919632298"
                width="400"
                height="300"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
          <div className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Phone</p>
                <a href="tel:+18456587832">845-658-7832</a>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Email</p>
                <a href="mailto:christian@trtbicycles.com">
                  Christian@trtbicycles.com
                </a>
              </div>
            </div>
          </div>
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
