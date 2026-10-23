// src/composables/useReducedMotion.js
import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useReducedMotion() {
  const isReducedMotion = ref(false)
  let mediaQuery = null

  function updateMotionPreference(e) {
    isReducedMotion.value = e.matches
  }

  onMounted(() => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      isReducedMotion.value = mediaQuery.matches
      mediaQuery.addEventListener('change', updateMotionPreference)
    }
  })

  onBeforeUnmount(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', updateMotionPreference)
    }
  })

  return { isReducedMotion }
}
