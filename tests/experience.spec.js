import { describe, it, expect } from 'vitest'
import experience from '../src/content/experience.js'
import { formatPeriod } from '../src/lib/format.js'

describe('Experience Schema & Formatting', () => {
  it('has valid experience entries conforming to PRD schema', () => {
    expect(experience.length).toBeGreaterThan(0)

    for (const job of experience) {
      expect(job.id).toBeTruthy()
      expect(job.role).toBeTruthy()
      expect(job.company).toBeTruthy()
      expect(job.start).toMatch(/^\d{4}-\d{2}$/)
      if (job.end !== null) {
        expect(job.end).toMatch(/^\d{4}-\d{2}$/)
      }
      expect(job.summary).toBeTruthy()
      expect(Array.isArray(job.highlights)).toBe(true)
      expect(job.highlights.length).toBeGreaterThanOrEqual(2)
      expect(Array.isArray(job.tags)).toBe(true)
      expect(job.tags.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('formats periods correctly for experience items', () => {
    for (const job of experience) {
      const formatted = formatPeriod(job.start, job.end)
      expect(formatted).toBeTruthy()
      if (job.end === null) {
        expect(formatted).toContain('PRESENT')
      }
    }
  })
})
