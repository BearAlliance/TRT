type DayHours = {
  day: string
  open?: string
  close?: string
}

const springHours: DayHours[] = [
  {
    day: 'Monday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Tuesday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Wednesday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Thursday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Friday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Saturday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Sunday',
  },
]

const summerHours: DayHours[] = [
  {
    day: 'Monday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Tuesday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Wednesday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Thursday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Friday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Saturday',
    open: '10:00AM',
    close: '2:00PM',
  },
  {
    day: 'Sunday',
  },
]

const fallHours = summerHours

const winterHours = [
  {
    day: 'Monday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Tuesday',
  },
  {
    day: 'Wednesday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Thursday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Friday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Saturday',
    open: '10:00AM',
    close: '2:00PM',
  },
  {
    day: 'Sunday',
  },
]

// Winter hours are from January 1 through March 31
// Spring hours are from April 1 through June 30
// Summer hours are from July 1 through September 30
// Fall hours are from October 1 through December 31
export function getHoursBySeason() {
  const month = new Date().getMonth()

  if (month >= 0 && month <= 2) {
    return winterHours
  } else if (month >= 3 && month <= 5) {
    return springHours
  } else if (month >= 6 && month <= 8) {
    return summerHours
  } else if (month >= 9 && month <= 11) {
    return fallHours
  }

  return summerHours
}
