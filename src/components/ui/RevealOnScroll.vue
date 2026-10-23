<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useReducedMotion } from '@/composables/useReducedMotion.js'

const root = ref(null)
const isVisible = ref(false)
const { isReducedMotion } = useReducedMotion()
let observer = null
let safetyTimer = null

onMounted(() => {
  if (isReducedMotion.value || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  // Fast-path: if the element is already inside or near the viewport, show immediately
  if (root.value) {
    const rect = root.value.getBoundingClientRect()
    if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
      isVisible.value = true
      return
    }
  }

  // Fallback timer: ensure content is never stuck invisible on slow or restrictive devices
  safetyTimer = setTimeout(() => {
    if (!isVisible.value) {
      isVisible.value = true
      if (root.value && observer) {
        observer.unobserve(root.value)
      }
    }
  }, 1200)

  // Use threshold: 0 so tall elements trigger as soon as any part enters view
  // Use positive rootMargin so content starts fading in before hitting the edge (eliminating perceived delay)
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (safetyTimer) {
          clearTimeout(safetyTimer)
          safetyTimer = null
        }
        if (root.value && observer) {
          observer.unobserve(root.value)
        }
      }
    },
    { threshold: 0, rootMargin: '100px 0px 50px 0px' }
  )

  if (root.value) {
    observer.observe(root.value)
  }
})

onBeforeUnmount(() => {
  if (safetyTimer) {
    clearTimeout(safetyTimer)
    safetyTimer = null
  }
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div
    ref="root"
    class="reveal h-full"
    :class="{ 'is-visible': isVisible }"
  >
    <slot />
  </div>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
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
