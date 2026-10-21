<script setup>
import { useRouter } from 'vue-router'
import TagPill from '@/components/ui/TagPill.vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const router = useRouter()

function handleBack() {
  const hash = props.project?.slug ? `#project-${props.project.slug}` : '#portfolio'
  router.push({ path: '/', hash })
}
</script>

<template>
  <header class="mb-8 space-y-6">
    <!-- Back to Portfolio Action -->
    <div>
      <button
        @click="handleBack"
        type="button"
        class="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors cursor-pointer bg-transparent border-0 p-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        <span>Back to portfolio</span>
      </button>
    </div>

    <!-- Title and Metadata -->
    <div class="space-y-3">
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-xs font-bold tracking-wider uppercase text-primary">
          {{ project.category }}
        </span>
        <span class="text-xs text-text-muted">•</span>
        <span class="text-xs text-text-muted font-medium">
          {{ project.period || '2023' }}
        </span>
      </div>

      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text tracking-tight">
        {{ project.title }}
      </h1>

      <div class="flex flex-wrap items-center gap-3 pt-1">
        <div class="text-sm sm:text-base font-semibold text-text-muted">
          Role: <span class="text-text">{{ project.role }}</span>
        </div>
        <TagPill :label="project.status" variant="primary" />
      </div>
    </div>
  </header>
</template>
