<script setup>
import experience from '@/content/experience.js'
import ExperienceItem from '@/components/sections/ExperienceItem.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
</script>

<template>
  <section
    id="experience"
    aria-labelledby="experience-heading"
    class="scroll-mt-[var(--nav-h)] py-12 px-4 md:px-8 text-left"
  >
    <RevealOnScroll>
      <header class="text-center mb-12">
        <h2 id="experience-heading" class="text-2xl sm:text-3xl font-bold text-text mb-2">
          Work Experience
        </h2>
        <p class="text-text-muted text-sm md:text-base">
          My professional journey, game studio roles, and development milestones.
        </p>
      </header>

      <!-- Vertical Timeline (left-aligned, mobile responsive) -->
      <div class="max-w-3xl mx-auto pl-2 sm:pl-4">
        <div v-if="experience && experience.length > 0">
          <ExperienceItem
            v-for="job in experience"
            :key="job.id"
            :item="job"
          />
        </div>

        <div v-else class="p-8 rounded-2xl border border-dashed border-border text-center bg-surface/50">
          <p class="text-text-muted text-sm md:text-base">
            No work experience records found.
          </p>
        </div>
      </div>
    </RevealOnScroll>
  </section>
</template>
