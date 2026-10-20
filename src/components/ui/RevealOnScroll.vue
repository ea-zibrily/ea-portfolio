<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useReducedMotion } from '@/composables/useReducedMotion.js'

const root = ref(null)
const isVisible = ref(false)
const { isReducedMotion } = useReducedMotion()
let observer = null

onMounted(() => {
  if (isReducedMotion.value || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (root.value && observer) {
          observer.unobserve(root.value)
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )

  if (root.value) {
    observer.observe(root.value)
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div
    ref="root"
    class="reveal"
    :class="{ 'is-visible': isVisible }"
  >
    <slot />
  </div>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
