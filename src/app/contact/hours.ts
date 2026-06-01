type DayHours = {
  day: string
  open?: string
  close?: string
}

export const hours: DayHours[] = [
  {
    day: 'Monday',
    open: '11:00AM',
    close: '5:00PM',
  },
  {
    day: 'Tuesday',
    open: '11:00AM',
    close: '6:00PM',
  },
  {
    day: 'Wednesday',
    open: '11:00AM',
    close: '6:00PM',
  },
  {
    day: 'Thursday',
    open: '11:00AM',
    close: '6:00PM',
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

export function getHours() {
  return hours
}
