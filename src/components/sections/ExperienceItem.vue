<script setup>
import { computed } from 'vue'
import { formatPeriod } from '@/lib/format.js'
import TagPill from '@/components/ui/TagPill.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const periodFormatted = computed(() => {
  return formatPeriod(props.item.start, props.item.end)
})

const isCurrent = computed(() => props.item.end === null)
</script>

<template>
  <div class="relative pl-6 sm:pl-8 pb-10 last:pb-2 group">
    <!-- Timeline Line -->
    <div
      class="absolute left-0 top-3 bottom-0 w-[2px] bg-border group-last:hidden"
      aria-hidden="true"
    ></div>

    <!-- Timeline Node Dot -->
    <div
      class="absolute -left-[5px] top-1.5 w-3 h-3 rounded-full border-2 border-bg transition-colors duration-200"
      :class="{
        'bg-primary ring-4 ring-primary/20': isCurrent,
        'bg-border group-hover:bg-primary': !isCurrent
      }"
      aria-hidden="true"
    ></div>

    <!-- Content Card -->
    <div class="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-xs hover:border-primary/40 transition-colors">
      <!-- Header Row: Period, Type, Location -->
      <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span class="text-xs font-bold tracking-wider uppercase text-primary">
          {{ periodFormatted }}
        </span>

        <div class="flex items-center gap-2">
          <span
            v-if="item.type"
            class="px-2 py-0.5 rounded text-[11px] font-medium bg-tag text-text-muted border border-border"
          >
            {{ item.type }}
          </span>
          <span
            v-if="item.location"
            class="text-xs text-text-muted flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            {{ item.location }}
          </span>
        </div>
      </div>

      <!-- Job Role & Company -->
      <div class="mb-3">
        <h3 class="text-lg sm:text-xl font-bold text-text tracking-tight">
          {{ item.role }}
        </h3>
        <p class="text-sm font-medium text-text-muted mt-0.5">
          <a
            v-if="item.companyUrl"
            :href="item.companyUrl"
            target="_blank"
            rel="noreferrer"
            class="text-primary hover:underline inline-flex items-center gap-1"
          >
            {{ item.company }}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
          <span v-else>{{ item.company }}</span>
        </p>
      </div>

      <!-- One-line Summary -->
      <p v-if="item.summary" class="text-sm text-text-muted leading-relaxed mb-4">
        {{ item.summary }}
      </p>

      <!-- Highlight Bullets -->
      <ul
        v-if="item.highlights && item.highlights.length > 0"
        class="space-y-2 mb-4 text-xs sm:text-sm text-text-muted"
      >
        <li
          v-for="(bullet, index) in item.highlights"
          :key="index"
          class="flex items-start gap-2.5 leading-relaxed"
        >
          <svg
            class="w-2.5 h-2.5 text-primary shrink-0 mt-[0.38em]"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M3 2.5L9 6L3 9.5Z" />
          </svg>
          <span>{{ bullet }}</span>
        </li>
      </ul>

      <!-- Tech Stack Tags -->
      <div v-if="item.tags && item.tags.length > 0" class="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
        <TagPill
          v-for="tag in item.tags"
          :key="tag"
          :label="tag"
          variant="primary"
        />
      </div>
    </div>
  </div>
</template>
