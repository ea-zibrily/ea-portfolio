// src/composables/useScrollSpy.js
import { ref, onMounted, onBeforeUnmount } from 'vue'
import sections from '../content/sections.js'

// Module-level shared activeId so NavBar, MobileTabBar, and HomeView can share the same state
const activeId = ref(sections[0]?.id || 'home')
const isLocked = ref(false)

export function useScrollSpy(sectionIds = sections.map((s) => s.id)) {
  let observer = null
  let debounceTimer = null
  let lockTimer = null

  function syncHash(id) {
    if (typeof window === 'undefined') return
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      if (window.location.hash !== `#${id}`) {
        window.history.replaceState(null, '', `#${id}`)
      }
    }, 150)
  }

  function handleIntersect(entries) {
    if (isLocked.value) return

    for (const entry of entries) {
      if (entry.isIntersecting) {
        const id = entry.target.id
        if (id && activeId.value !== id) {
          activeId.value = id
          syncHash(id)
        }
      }
    }
  }

  function unlock() {
    isLocked.value = false
    clearTimeout(lockTimer)
    if (typeof window !== 'undefined') {
      window.removeEventListener('scrollend', unlock)
    }
  }

  function scrollTo(id) {
    if (typeof window === 'undefined') return
    const el = document.getElementById(id)
    if (!el) return

    activeId.value = id
    isLocked.value = true
    syncHash(id)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })

    if ('onscrollend' in window) {
      window.addEventListener('scrollend', unlock, { once: true })
    }
    // Fallback timer to ensure unlock even if scrollend doesn't fire
    clearTimeout(lockTimer)
    lockTimer = setTimeout(unlock, 1000)
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    })

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
      }
    }

    // If initial page has a hash, set activeId and scroll after mount
    if (window.location.hash) {
      const hashId = window.location.hash.slice(1)
      if (sectionIds.includes(hashId)) {
        activeId.value = hashId
        setTimeout(() => {
          const target = document.getElementById(hashId)
          if (target) {
            target.scrollIntoView({ behavior: 'auto' })
          }
        }, 50)
      } else if (hashId.startsWith('project-')) {
        activeId.value = 'portfolio'
        isLocked.value = true
        clearTimeout(lockTimer)
        lockTimer = setTimeout(unlock, 1200)
      }
    }
  })

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
    }
    clearTimeout(debounceTimer)
    clearTimeout(lockTimer)
    if (typeof window !== 'undefined') {
      window.removeEventListener('scrollend', unlock)
    }
  })

  return {
    activeId,
    scrollTo
  }
}
