const weekDay = new Date().getDay();

const hours = {
  spring: {
    monday: '11:00AM - 6:00PM',
    tuesday: '11:00AM - 6:00PM',
    wednesday: '11:00AM - 6:00PM',
    thursday: '11:00AM - 6:00PM',
    friday: '11:00AM - 6:00PM',
    saturday: '11:00AM - 4:00PM',
    sunday: 'CLOSED',
  },
  summer: {
    monday: '11:00AM - 6:00PM',
    tuesday: 'CLOSED',
    wednesday: '11:00AM - 6:00PM',
    thursday: '11:00AM - 6:00PM',
    friday: '11:00AM - 6:00PM',
    saturday: '11:00AM - 5:00PM',
    sunday: '11:00AM - 5:00PM',
  },
  fall: {
    monday: '11:00AM - 6:00PM',
    tuesday: 'CLOSED',
    wednesday: '11:00AM - 6:00PM',
    thursday: '11:00AM - 6:00PM',
    friday: '11:00AM - 6:00PM',
    saturday: '11:00AM - 5:00PM',
    sunday: '11:00AM - 5:00PM',
  },
  winter: {
    monday: '11:00AM - 6:00PM',
    tuesday: 'CLOSED',
    wednesday: '11:00AM - 6:00PM',
    thursday: '11:00AM - 6:00PM',
    friday: '11:00AM - 6:00PM',
    saturday: '11:00AM - 4:00PM',
    sunday: 'CLOSED',
  },
  covid: {
    monday: '11:00AM - 5:00PM',
    tuesday: 'CLOSED',
    wednesday: '11:00AM - 5:00PM',
    thursday: 'CLOSED',
    friday: '11:00AM - 5:00PM',
    saturday: '11:00AM - 4:00PM',
    sunday: 'CLOSED',
  },
};

// Set season here
export const currentHours = hours.covid;

// assign hours for today
const hoursMap = {
  1: currentHours.monday,
  2: currentHours.tuesday,
  3: currentHours.wednesday,
  4: currentHours.thursday,
  5: currentHours.friday,
  6: currentHours.saturday,
  0: currentHours.sunday,
};

export const isClosed = hoursMap[weekDay] === 'CLOSED';
export const withoutHours = isClosed ? 'Closed Today' : 'Open Today ';
export const withHours = `${withoutHours} ${hoursMap[weekDay]}`;
