import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import {
  fallHours,
  getHoursBySeason,
  springHours,
  summerHours,
  winterHours,
} from './hours'

describe('Contact Hours', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  describe('from January 1 through march 31', () => {
    it('should return winter hours in January', () => {
      // All these tests use the 2nd instead of the first
      // to avoid timezone problems from the first day of the month
      jest.setSystemTime(new Date('2024-01-02').valueOf())
      expect(getHoursBySeason()).toBe(winterHours)
    })

    it('should return winter hours in March', () => {
      jest.setSystemTime(new Date('2024-03-31').valueOf())
      expect(getHoursBySeason()).toBe(winterHours)
    })
  })

  describe('from April 1 to June 30', () => {
    it('should return spring hours in April', () => {
      jest.setSystemTime(new Date('2024-04-02').valueOf())
      expect(getHoursBySeason()).toBe(springHours)
    })

    it('should return spring hours in June', () => {
      jest.setSystemTime(new Date('2024-06-30').valueOf())
      expect(getHoursBySeason()).toBe(springHours)
    })
  })

  describe('from July 1 to September 30', () => {
    it('should return summer hours in July', () => {
      jest.setSystemTime(new Date('2024-07-02').valueOf())
      expect(getHoursBySeason()).toBe(summerHours)
    })

    it('should return summer hours in September', () => {
      jest.setSystemTime(new Date('2024-09-30').valueOf())
      expect(getHoursBySeason()).toBe(summerHours)
    })
  })

  describe('from October 1 to December 30', () => {
    it('should return fall hours in October', () => {
      jest.setSystemTime(new Date('2024-10-02').valueOf())
      expect(getHoursBySeason()).toBe(fallHours)
    })

    it('should return fall hours in December', () => {
      jest.setSystemTime(new Date('2024-12-30').valueOf())
      expect(getHoursBySeason()).toBe(fallHours)
    })
  })
})
