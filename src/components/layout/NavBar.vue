<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import sections from '@/content/sections.js'
import profile from '@/content/profile.js'
import ThemeToggle from '@/components/layout/ThemeToggle.vue'
import { useScrollSpy } from '@/composables/useScrollSpy.js'

const route = useRoute()
const router = useRouter()
const { activeId, scrollTo } = useScrollSpy()
const isScrolled = ref(false)

function handleNavClick(sectionId) {
  if (route.path === '/') {
    scrollTo(sectionId)
  } else {
    router.push({ path: '/', hash: '#' + sectionId })
  }
}

function handleBrandClick() {
  if (route.path === '/') {
    scrollTo('home')
  } else {
    router.push('/')
  }
}

function onScroll() {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 20
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', onScroll)
  }
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center"
    style="height: var(--nav-h);"
    :class="{
      'bg-surface/85 backdrop-blur-md border-b border-border shadow-xs': isScrolled,
      'bg-surface/50 backdrop-blur-sm': !isScrolled
    }"
  >
    <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 flex items-center justify-between">
      <!-- Brand Logo -->
      <button
        @click="handleBrandClick"
        class="flex items-center gap-2 cursor-pointer bg-transparent border-0 group"
        aria-label="Return to home top"
      >
        <span class="text-lg font-bold text-primary group-hover:opacity-85 transition-opacity">
          Zibril Portfolio
        </span>
      </button>

      <!-- Desktop Nav Links -->
      <nav class="hidden md:flex items-center gap-6" aria-label="Main Navigation">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="handleNavClick(section.id)"
          class="relative text-sm font-medium transition-colors py-1 cursor-pointer bg-transparent border-0"
          :class="{
            'text-primary font-semibold': route.path === '/' && activeId === section.id,
            'text-text-muted hover:text-text': route.path !== '/' || activeId !== section.id
          }"
          :aria-current="route.path === '/' && activeId === section.id ? 'page' : undefined"
        >
          {{ section.label }}
          <span
            v-if="route.path === '/' && activeId === section.id"
            class="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
          ></span>
        </button>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />

        <div class="hidden sm:flex items-center gap-2">
          <a
            :href="profile.github"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            class="p-2 rounded-lg text-text-muted hover:text-text hover:bg-surface border border-transparent hover:border-border transition-colors"
          >
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
