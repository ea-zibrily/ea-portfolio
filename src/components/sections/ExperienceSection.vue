<script setup>
import experience from '@/content/experience.js'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
</script>

<template>
  <section
    id="experience"
    aria-labelledby="experience-heading"
    class="scroll-mt-[var(--nav-h)] py-12 px-4 md:px-8 text-left"
  >
    <RevealOnScroll>
      <header>
        <div class="text-2xl font-bold text-text mb-2 flex items-center gap-3">
          <h2 id="experience-heading">Work Experience</h2>
          <div class="h-[2px] w-24 md:w-48 bg-primary/60 rounded-full"></div>
        </div>
        <p class="text-text-muted text-sm md:text-base mb-8">
          My professional journey and game development milestones.
        </p>
      </header>

      <!-- If experience data exists -->
      <div v-if="experience && experience.length > 0" class="relative border-l-2 border-border ml-4 pl-6 space-y-8">
        <div v-for="job in experience" :key="job.id" class="relative group">
          <div class="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-bg"></div>
          <div class="bg-surface p-5 rounded-xl border border-border">
            <span class="text-xs font-semibold text-primary tracking-wider uppercase">{{ job.period }}</span>
            <h3 class="text-lg font-bold text-text mt-1">{{ job.role }}</h3>
            <p class="text-sm text-text-muted font-medium">{{ job.company }}</p>
            <p class="text-sm text-text-muted mt-2">{{ job.summary }}</p>
          </div>
        </div>
      </div>

      <!-- Placeholder until Phase 3 -->
      <div v-else class="p-8 rounded-2xl border border-dashed border-border text-center bg-surface/50">
        <p class="text-text-muted text-sm md:text-base">
          💼 Professional experience timeline being prepared for Phase 3.
        </p>
      </div>
    </RevealOnScroll>
  </section>
</template>
