// src/router/scroll-behavior.js
export default function scrollBehavior(to, from, savedPosition) {
  if (typeof window === 'undefined') return { top: 0 }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const behavior = reduce ? 'auto' : 'smooth'

  if (savedPosition) {
    return savedPosition
  }

  if (to.hash) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ el: to.hash, behavior })
      }, 60)
    })
  }

  return { top: 0 }
}
