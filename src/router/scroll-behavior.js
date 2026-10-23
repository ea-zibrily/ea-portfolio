// src/router/scroll-behavior.js
export default function scrollBehavior(to, from, savedPosition) {
  if (typeof window === 'undefined') return { top: 0 }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const behavior = reduce ? 'auto' : 'smooth'

  // Returning from a project detail page to Home
  if (to.path === '/' && (from.path?.startsWith('/project/') || from.name === 'project-detail')) {
    const slug = from.params?.slug
    const targetHash = to.hash || (slug ? `#project-${slug}` : '#portfolio')
    return new Promise((resolve) => {
      setTimeout(() => {
        const el = document.querySelector(targetHash) || document.getElementById('portfolio')
        if (el) {
          resolve({ el, behavior })
        } else {
          resolve({ el: '#portfolio', behavior })
        }
      }, 100)
    })
  }

  if (to.hash) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ el: to.hash, behavior })
      }, 60)
    })
  }

  if (savedPosition) {
    return savedPosition
  }

  // When opening a new page (e.g. /project/:slug), show immediately at the top without upward scroll animation
  return { top: 0, behavior: 'instant' }
}
