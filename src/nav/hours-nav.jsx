import React, { Fragment, useState } from 'react';
import { HoursModal } from './hours-modal';

export function HoursNav() {
  const [modalOpen, setModalOpen] = useState(false);

  const weekDay = new Date().getDay();

  const hours = {
    spring: {
      Monday: '11:00AM - 6:00PM',
      tuesday: 'CLOSED',
      wednesday: '9:00AM - 6:00PM',
      thursday: '9:00AM - 6:00PM',
      friday: '9:00AM - 6:00PM',
      saturday: '9:00AM - 4:00PM',
      sunday: '9:00AM - 4:00PM'
    },
    summer: {
      Monday: '11:00AM - 6:00PM',
      tuesday: 'CLOSED',
      wednesday: '11:00AM - 6:00PM',
      thursday: '11:00AM - 6:00PM',
      friday: '11:00AM - 6:00PM',
      saturday: '11:00AM - 5:00PM',
      sunday: '11:00AM - 5:00PM'
    },
    fall: {
      Monday: '11:00AM - 6:00PM',
      tuesday: 'CLOSED',
      wednesday: '11:00AM - 6:00PM',
      thursday: '11:00AM - 6:00PM',
      friday: '11:00AM - 6:00PM',
      saturday: '11:00AM - 5:00PM',
      sunday: '11:00AM - 5:00PM'
    },
    winter: {
      Monday: '11:00AM - 6:00PM',
      tuesday: 'CLOSED',
      wednesday: '11:00AM - 6:00PM',
      thursday: '11:00AM - 6:00PM',
      friday: '11:00AM - 6:00PM',
      saturday: '11:00AM - 4:00PM',
      sunday: 'CLOSED'
    }
  };

  // Set season here, remember to update modals
  const currentHours = hours.winter;

  // assign hours for today
  const hoursMap = {
    1: currentHours.Monday,
    2: currentHours.tuesday,
    3: currentHours.wednesday,
    4: currentHours.thursday,
    5: currentHours.friday,
    6: currentHours.saturday,
    0: currentHours.sunday
  };

  const todayHours =
    hoursMap[weekDay] === 'CLOSED'
      ? 'Closed Today'
      : 'Open Today ' + hoursMap[weekDay];

  return (
    <Fragment>
      <div onClick={() => setModalOpen(true)}>{todayHours}</div>
      <HoursModal
        title={'Winter Hours'}
        hours={currentHours}
        isActive={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Fragment>
  );
}
