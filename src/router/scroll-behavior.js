// src/router/scroll-behavior.js
export default function scrollBehavior(to, from, savedPosition) {
  if (typeof window === 'undefined') return { top: 0 }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const behavior = reduce ? 'auto' : 'smooth'

  if (savedPosition) return savedPosition
  if (to.hash) return { el: to.hash, behavior }
  if (to.name === 'project') return { top: 0 }
  return { top: 0 }
}
