// src/lib/projects.js
import projects from '../content/projects.js'

export const projectsBySlug = new Map(projects.map((p) => [p.slug, p]))

export function getProject(slug) {
  return projectsBySlug.get(slug) ?? null
}

export function getAdjacent(slug) {
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return { prev: null, next: null }

  const prevIndex = (index - 1 + projects.length) % projects.length
  const nextIndex = (index + 1) % projects.length

  return {
    prev: projects[prevIndex],
    next: projects[nextIndex]
  }
}
