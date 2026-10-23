import { describe, it, expect } from 'vitest'
import { formatPeriod, isExpired } from '../src/lib/format.js'
import { getProject, getAdjacent } from '../src/lib/projects.js'

describe('Format helpers', () => {
  it('formats active period with end null as PRESENT', () => {
    expect(formatPeriod('2025-09', null)).toBe('SEP 2025 – PRESENT')
  })

  it('formats closed period correctly', () => {
    expect(formatPeriod('2023-01', '2024-05')).toBe('JAN 2023 – MAY 2024')
  })

  it('detects expired certificates', () => {
    expect(isExpired({ expires: '2020-01' })).toBe(true)
    expect(isExpired({ expires: '2099-01' })).toBe(false)
    expect(isExpired({ expires: null })).toBe(false)
  })
})

describe('Project helpers', () => {
  it('finds project by slug', () => {
    const p = getProject('mager-1-belum-produktif')
    expect(p).not.toBeNull()
    expect(p?.title).toBe('Mager 1: Belum Produktif')
  })

  it('returns adjacent projects with wraparound', () => {
    const { prev, next } = getAdjacent('mager-1-belum-produktif')
    expect(prev).not.toBeNull()
    expect(next).not.toBeNull()
  })
})
