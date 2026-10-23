import { describe, it, expect } from 'vitest'
import projects from '../src/content/projects.js'
import certificates from '../src/content/certificates.js'
import profile from '../src/content/profile.js'
import sections from '../src/content/sections.js'
import skills from '../src/content/skills.js'
import fs from 'node:fs'
import path from 'node:path'

describe('Content integrity', () => {
  it('has unique, valid kebab-case project slugs', () => {
    const slugs = new Set()
    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
      expect(slugs.has(project.slug)).toBe(false)
      slugs.add(project.slug)
    }
  })

  it('has required fields for every project', () => {
    for (const project of projects) {
      expect(project.title).toBeTruthy()
      expect(project.category).toBeTruthy()
      expect(project.role).toBeTruthy()
      expect(project.status).toBeTruthy()
      expect(project.summary).toBeTruthy()
      expect(project.overview).toBeTruthy()
      expect(Array.isArray(project.contributions)).toBe(true)
      expect(Array.isArray(project.tech)).toBe(true)
      expect(project.cover).toBeTruthy()
    }
  })

  it('verifies that project cover images exist in public/', () => {
    for (const project of projects) {
      if (project.cover.startsWith('/')) {
        const filePath = path.resolve('public', project.cover.replace(/^\//, ''))
        expect(fs.existsSync(filePath), `Missing image: ${project.cover}`).toBe(true)
      }
    }
  })

  it('verifies that certificate images exist in public/', () => {
    for (const cert of certificates) {
      if (cert.image.startsWith('/')) {
        const filePath = path.resolve('public', cert.image.replace(/^\//, ''))
        expect(fs.existsSync(filePath), `Missing certificate image: ${cert.image}`).toBe(true)
      }
    }
  })

  it('verifies CV file exists', () => {
    if (profile.cv?.href) {
      const cvPath = path.resolve('public', profile.cv.href.replace(/^\//, ''))
      expect(fs.existsSync(cvPath), `Missing CV file: ${profile.cv.href}`).toBe(true)
    }
  })

  it('verifies sections list', () => {
    expect(sections.length).toBeGreaterThan(0)
    for (const s of sections) {
      expect(s.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
      expect(s.label).toBeTruthy()
    }
  })
})
