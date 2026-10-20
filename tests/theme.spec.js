import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

describe('Theme & Token Integrity', () => {
  it('defines all required semantic tokens in tokens.css for both :root and .dark', () => {
    const tokensPath = path.resolve('src/styles/tokens.css')
    const cssContent = fs.readFileSync(tokensPath, 'utf-8')

    const requiredTokens = [
      '--bg',
      '--surface',
      '--surface-hover',
      '--border',
      '--text',
      '--text-muted',
      '--primary',
      '--primary-fg',
      '--accent',
      '--tag-bg'
    ]

    for (const token of requiredTokens) {
      expect(cssContent.includes(token), `Missing token ${token} in tokens.css`).toBe(true)
    }

    expect(cssContent.includes(':root')).toBe(true)
    expect(cssContent.includes('.dark')).toBe(true)
  })

  it('contains no hardcoded legacy amber #ffdb70 in components', () => {
    const scanDir = (dir) => {
      const files = fs.readdirSync(dir)
      for (const file of files) {
        const fullPath = path.join(dir, file)
        const stat = fs.statSync(fullPath)
        if (stat.isDirectory()) {
          scanDir(fullPath)
        } else if (file.endsWith('.vue')) {
          const content = fs.readFileSync(fullPath, 'utf-8')
          expect(content.includes('#ffdb70'), `Found legacy amber #ffdb70 in ${fullPath}`).toBe(false)
        }
      }
    }

    scanDir(path.resolve('src/components'))
    scanDir(path.resolve('src/views'))
  })
})
