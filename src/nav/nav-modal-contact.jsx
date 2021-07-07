import React from 'react';
import { HoursTable } from './hours-table';
import { currentHours } from './hours';
import { Modal } from '../components/modal';
import { address, contactEmail, phone } from '../constants';

export function NavModalContact({ onClose, isActive }) {
  return (
    <Modal onClose={onClose} isActive={isActive} title="Contact">
      <div className="columns is-centered">
        <div className="column is-three-fifths">
          <iframe
            title="google maps"
            src=" https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2972.324535623776!2d-74.07618968482844!3d41.84284097922505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89dd1bca6bdc817b%3A0x62a69083f892ee33!2sFavata&#39;s+TRT+Bicycles!5e0!3m2!1sen!2sus!4v1450919632298"
            width="400"
            height="300"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
      <h1 className="title">Contact</h1>
      <address>
        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Phone</p>
              <a href="tel:+18456587832">{phone}</a>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Email</p>
              <a href="mailto:christian@trtbicycles.com">{contactEmail}</a>
            </div>
          </div>
        </div>
        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Address</p>
              <address>{address}</address>
            </div>
          </div>
        </div>
      </address>
      <h1 className="title">Hours</h1>
      <HoursTable hours={currentHours} />
    </Modal>
  );
}
