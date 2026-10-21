// src/composables/useTheme.js
import { ref, onMounted, onBeforeUnmount } from 'vue'

const theme = ref('dark') // Default fallback for SSR

export function useTheme() {
  let mediaQuery = null
  let transitionTimer = null

  function updateThemeColorMeta(isDark) {
    if (typeof document === 'undefined') return
    let meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'theme-color'
      document.head.appendChild(meta)
    }
    meta.content = isDark ? '#071726' : '#F4F8F4'
  }

  function handleSystemThemeChange(e) {
    try {
      if (!localStorage.getItem('theme')) {
        const isDark = e.matches
        theme.value = isDark ? 'dark' : 'light'
        document.documentElement.classList.toggle('dark', isDark)
        updateThemeColorMeta(isDark)
      }
    } catch (err) {
      // Ignored
    }
  }

  function toggle() {
    if (typeof document === 'undefined') return

    // Apply smooth transition class temporarily
    document.documentElement.classList.add('theme-transition')
    clearTimeout(transitionTimer)
    transitionTimer = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, 250)

    const nextTheme = theme.value === 'dark' ? 'light' : 'dark'
    theme.value = nextTheme

    const isDark = nextTheme === 'dark'
    document.documentElement.classList.toggle('dark', isDark)
    updateThemeColorMeta(isDark)

    try {
      localStorage.setItem('theme', nextTheme)
    } catch (e) {
      // localStorage may fail in private mode
    }
  }

  onMounted(() => {
    if (typeof window === 'undefined') return

    // Read current state from <html> set by no-FOUC inline boot script
    const isDark = document.documentElement.classList.contains('dark')
    theme.value = isDark ? 'dark' : 'light'
    updateThemeColorMeta(isDark)

    // Listen to OS changes if no stored preference exists
    if ('matchMedia' in window) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', handleSystemThemeChange)
    }
  })

  onBeforeUnmount(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
    clearTimeout(transitionTimer)
  })

  return {
    theme,
    toggle
  }
}
