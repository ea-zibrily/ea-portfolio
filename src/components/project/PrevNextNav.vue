<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getAdjacent } from '@/lib/projects.js'

const props = defineProps({
  currentSlug: {
    type: String,
    required: true
  }
})

const adjacent = computed(() => getAdjacent(props.currentSlug))
</script>

<template>
  <nav class="pt-10 mt-12 border-t border-border/60" aria-label="Previous and next projects">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Previous Project -->
      <RouterLink
        v-if="adjacent.prev"
        :to="'/project/' + adjacent.prev.slug"
        class="flex flex-col p-4 rounded-xl border border-border bg-surface hover:bg-surface-hover hover:border-primary/40 transition-colors group text-left"
      >
        <span class="text-xs text-text-muted flex items-center gap-1 group-hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Previous Project
        </span>
        <span class="text-base font-bold text-text mt-1 group-hover:text-primary transition-colors line-clamp-1">
          {{ adjacent.prev.title }}
        </span>
      </RouterLink>

      <!-- Next Project -->
      <RouterLink
        v-if="adjacent.next"
        :to="'/project/' + adjacent.next.slug"
        class="flex flex-col p-4 rounded-xl border border-border bg-surface hover:bg-surface-hover hover:border-primary/40 transition-colors group text-right sm:text-right"
      >
        <span class="text-xs text-text-muted flex items-center justify-end gap-1 group-hover:text-primary transition-colors">
          Next Project
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </span>
        <span class="text-base font-bold text-text mt-1 group-hover:text-primary transition-colors line-clamp-1">
          {{ adjacent.next.title }}
        </span>
      </RouterLink>
    </div>
  </nav>
</template>
