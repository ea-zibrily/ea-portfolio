import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import projects from '../src/content/projects.js'

describe('SEO & Asset Integrity', () => {
  it('ensures all project covers use optimized .webp format', () => {
    for (const project of projects) {
      expect(project.cover.endsWith('.webp'), `Project ${project.slug} cover is not webp: ${project.cover}`).toBe(true)
      const absPath = path.resolve('public', project.cover.replace(/^\//, ''))
      expect(fs.existsSync(absPath), `WebP image does not exist: ${absPath}`).toBe(true)
    }
  })
})
