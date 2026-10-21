import { describe, it, expect } from 'vitest'
import projects from '../src/content/projects.js'
import { getProject, getAdjacent } from '../src/lib/projects.js'

describe('Project detail and lookup functions', () => {
  it('retrieves existing project by slug', () => {
    const project = getProject('ghost-pinball-tuyul-adventure')
    expect(project).not.toBeNull()
    expect(project?.title).toBe('Ghost Pinball: Tuyul Adventure')
    expect(project?.category).toBe('Professional Project')
  })

  it('returns null for an invalid or unknown slug (PRD F5.7)', () => {
    const unknown = getProject('does-not-exist')
    expect(unknown).toBeNull()
  })

  it('handles prev / next wraparound navigation (PRD F5.9)', () => {
    const firstProject = projects[0]
    const lastProject = projects[projects.length - 1]

    const firstAdjacent = getAdjacent(firstProject.slug)
    expect(firstAdjacent.prev?.slug).toBe(lastProject.slug)
    expect(firstAdjacent.next?.slug).toBe(projects[1].slug)

    const lastAdjacent = getAdjacent(lastProject.slug)
    expect(lastAdjacent.next?.slug).toBe(firstProject.slug)
    expect(lastAdjacent.prev?.slug).toBe(projects[projects.length - 2].slug)
  })

  it('ensures each project has overview and contributions for F5 layout', () => {
    for (const project of projects) {
      expect(typeof project.overview).toBe('string')
      expect(project.overview.length).toBeGreaterThan(10)
      expect(Array.isArray(project.contributions)).toBe(true)
      expect(project.contributions.length).toBeGreaterThan(0)
    }
  })

  it('categorizes every project into one of the key groups (Professional, Freelance, Gamejam, Personal)', () => {
    const categories = ['professional', 'freelance', 'gamejam', 'personal']
    function getCategory(project) {
      const cat = (project.category || '').toLowerCase()
      if (cat.includes('professional')) return 'professional'
      if (cat.includes('freelance') || cat.includes('educational')) return 'freelance'
      if (cat.includes('game jam') || cat.includes('gamejam')) return 'gamejam'
      if (cat.includes('personal')) return 'personal'
      return 'unknown'
    }

    for (const project of projects) {
      const cat = getCategory(project)
      expect(categories).toContain(cat)
    }
  })
})
