import { describe, it, expect } from 'vitest'
import { getMappingKey } from './utils'

describe('getMappingKey', () => {
  it('returns stable key for same mappings in different order', () => {
    const mapping1 = [
      { column: 'first_name', path: 'user.name.first' },
      { column: 'last_name', path: 'user.name.last' },
    ]
    const mapping2 = [
      { column: 'last_name', path: 'user.name.last' },
      { column: 'first_name', path: 'user.name.first' },
    ]

    expect(getMappingKey(mapping1)).toBe(getMappingKey(mapping2))
  })

  it('returns different keys for different mappings', () => {
    const mapping1 = [{ column: 'first_name', path: 'user.name.first' }]
    const mapping2 = [{ column: 'first_name', path: 'user.firstName' }]

    expect(getMappingKey(mapping1)).not.toBe(getMappingKey(mapping2))
  })

  it('handles empty mapping array', () => {
    expect(getMappingKey([])).toBe('[]')
  })

  it('does not mutate original array', () => {
    const mapping = [
      { column: 'b', path: 'b' },
      { column: 'a', path: 'a' },
    ]
    getMappingKey(mapping)

    expect(mapping[0].column).toBe('b')
  })
})
