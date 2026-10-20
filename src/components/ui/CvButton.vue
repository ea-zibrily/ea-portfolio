<script setup>
import profile from '@/content/profile.js'

defineProps({
  variant: {
    type: String,
    default: 'outline', // 'primary' | 'outline' | 'nav'
    validator: (v) => ['primary', 'outline', 'nav'].includes(v)
  }
})
</script>

<template>
  <a
    :href="profile.cv.href"
    :download="profile.cv.filename"
    aria-label="Download CV (PDF)"
    title="Download CV (PDF)"
    class="inline-flex items-center gap-2 font-medium transition-all duration-200 cursor-pointer text-sm"
    :class="{
      'bg-primary text-primary-fg hover:opacity-90 px-4 py-2 rounded-lg font-semibold shadow-sm': variant === 'primary',
      'border border-primary text-primary hover:bg-primary/10 px-4 py-2 rounded-lg': variant === 'outline',
      'text-text-muted hover:text-text px-2 py-1': variant === 'nav'
    }"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-4 h-4 shrink-0"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
        clip-rule="evenodd"
      />
      <path
        d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z"
      />
    </svg>
    <span>Download CV</span>
  </a>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
