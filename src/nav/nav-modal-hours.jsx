import React from 'react';
import { HoursTable } from './hours-table';
import { Modal } from '../components/modal';

export function NavModalHours({ title, hours, isActive, onClose }) {
  return (
    <Modal isActive={isActive} title={title} onClose={onClose}>
      <HoursTable hours={hours} />
    </Modal>
  );
}
