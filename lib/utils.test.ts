import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('handles conditional class names', () => {
    const result = cn('base-class', false && 'false-class', true && 'true-class')
    expect(result).toBe('base-class true-class')
  })

  it('merges Tailwind classes with conflict resolution', () => {
    const result = cn('text-red-500', 'text-blue-500')
    expect(result).toBe('text-blue-500')
  })

  it('handles arrays of class names', () => {
    const result = cn(['text-sm', 'font-bold'], 'bg-gray-100')
    expect(result).toBe('text-sm font-bold bg-gray-100')
  })

  it('handles undefined and null values', () => {
    const result = cn('base-class', undefined, null, 'another-class')
    expect(result).toBe('base-class another-class')
  })

  it('handles empty strings', () => {
    const result = cn('', 'text-red-500', '')
    expect(result).toBe('text-red-500')
  })

  it('handles object syntax from clsx', () => {
    const result = cn({
      'text-red-500': true,
      'bg-blue-500': false,
      'font-bold': true,
    })
    expect(result).toBe('text-red-500 font-bold')
  })
})
