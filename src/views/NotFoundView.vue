<script setup>
import { RouterLink } from 'vue-router'
import { usePageMeta } from '@/composables/usePageMeta.js'

usePageMeta({
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.'
})
</script>

<template>
  <div class="min-h-[calc(100vh-var(--nav-h)-8rem)] flex items-center justify-center px-4 py-16">
    <div class="text-center max-w-md mx-auto space-y-6">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-surface border border-border shadow-md">
        <span class="text-4xl font-extrabold text-primary">404</span>
      </div>

      <div class="space-y-2">
        <h1 class="text-2xl sm:text-3xl font-bold text-text">Page Not Found</h1>
        <p class="text-text-muted text-sm sm:text-base">
          The requested page or project does not exist or has been moved.
        </p>
      </div>

      <div>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-fg font-semibold hover:opacity-90 transition-opacity text-sm shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          <span>Back to Home</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
