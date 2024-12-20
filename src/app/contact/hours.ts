type DayHours = {
  day: string
  open?: string
  close?: string
}

export const springHours: DayHours[] = [
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

export const summerHours: DayHours[] = [
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

export const fallHours = summerHours

export const winterHours = [
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
  const month = new Date(Date.now()).getMonth()
  const commonMonth = month + 1

  if (commonMonth >= 1 && commonMonth <= 3) {
    return winterHours
  } else if (commonMonth >= 4 && commonMonth <= 6) {
    return springHours
  } else if (commonMonth >= 7 && commonMonth <= 9) {
    return summerHours
  } else if (commonMonth >= 10 && commonMonth <= 12) {
    return fallHours
  }

  return summerHours
}
