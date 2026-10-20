<script setup>
import sections from '@/content/sections.js'
import { useScrollSpy } from '@/composables/useScrollSpy.js'

const { activeId, scrollTo } = useScrollSpy()
</script>

<template>
  <nav
    class="block md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-lg border-t border-border shadow-lg"
    aria-label="Mobile navigation"
  >
    <div class="flex items-center justify-around py-3 px-2">
      <button
        v-for="section in sections"
        :key="section.id"
        @click="scrollTo(section.id)"
        class="flex flex-col items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer bg-transparent border-0 px-2 py-1"
        :class="{
          'text-primary font-bold': activeId === section.id,
          'text-text-muted hover:text-text': activeId !== section.id
        }"
        :aria-current="activeId === section.id ? 'page' : undefined"
      >
        <span>{{ section.label }}</span>
        <span
          v-if="activeId === section.id"
          class="w-1.5 h-1.5 rounded-full bg-primary"
        ></span>
        <span v-else class="w-1.5 h-1.5"></span>
      </button>
    </div>
  </nav>
</template>
