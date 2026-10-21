import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import projects from '../src/content/projects.js'

describe('SEO & Metadata Integrity', () => {
  it('has robots.txt allowing crawling and pointing to sitemap.xml', () => {
    const robotsPath = path.resolve('public/robots.txt')
    expect(fs.existsSync(robotsPath)).toBe(true)
    const content = fs.readFileSync(robotsPath, 'utf-8')
    expect(content).toContain('User-agent: *')
    expect(content).toContain('Sitemap:')
    expect(content).toContain('sitemap.xml')
  })

  it('ensures all project covers use optimized .webp format', () => {
    for (const project of projects) {
      expect(project.cover.endsWith('.webp'), `Project ${project.slug} cover is not webp: ${project.cover}`).toBe(true)
      const absPath = path.resolve('public', project.cover.replace(/^\//, ''))
      expect(fs.existsSync(absPath), `WebP image does not exist: ${absPath}`).toBe(true)
    }
  })
})
