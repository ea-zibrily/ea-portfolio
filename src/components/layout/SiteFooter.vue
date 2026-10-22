<script setup>
import profile from '@/content/profile.js'
import FooterLoader from '@/components/ui/FooterLoader.vue'
import { useScrollSpy } from '@/composables/useScrollSpy.js'

const { scrollTo } = useScrollSpy()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="mt-20 border-t border-border bg-surface/70 py-12 px-4 md:px-8 pb-24 md:pb-12 text-text-muted text-sm">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-6">
      <!-- Profile Info (Left) -->
      <div class="text-center md:text-left">
        <p class="font-semibold text-text">
          {{ profile.name }}
        </p>
        <p class="text-xs text-text-muted mt-1">
          Unity Game Programmer & Software Engineer
        </p>
      </div>

      <!-- Developer Workstation Loading Dots Animation (True Dead Center) -->
      <div class="flex items-center justify-center">
        <FooterLoader />
      </div>

      <!-- Back to top (Right) -->
      <div class="flex items-center justify-center md:justify-end gap-4">
        <button
          @click="scrollTo('home')"
          class="p-2 rounded-lg border border-border hover:bg-surface-hover text-text-muted hover:text-text transition-colors cursor-pointer bg-transparent"
          aria-label="Back to top"
          title="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto mt-8 pt-6 border-t border-border/40 text-center text-xs text-text-muted">
      <p>© {{ currentYear }} {{ profile.name }}. All rights reserved.</p>
    </div>
  </footer>
</template>
