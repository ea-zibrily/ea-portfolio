<script setup>
import { useTheme } from '@/composables/useTheme.js'

const { theme, toggle } = useTheme()
</script>

<template>
  <button
    @click="toggle"
    type="button"
    :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    class="p-2 rounded-lg border border-border bg-surface/80 hover:bg-surface-hover text-text-muted hover:text-text transition-all duration-200 cursor-pointer flex items-center justify-center shadow-xs"
  >
    <!-- Sun icon (shown in dark mode) -->
    <svg
      v-if="theme === 'dark'"
      xmlns="http://www.w3.org/2000/svg"
      class="w-4 h-4 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>

    <!-- Moon icon (shown in light mode) -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="w-4 h-4 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>

<style scoped>
button {
  outline: none;
}
button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
</style>
