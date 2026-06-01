import { describe, it, expect } from '@jest/globals'
import { getHours, hours } from './hours'

describe('Contact Hours', () => {
  it('should return hours', () => {
    expect(getHours()).toEqual(hours)
  })
})
