<script setup>
import skills from '@/content/skills.js'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
</script>

<template>
  <section
    id="skills"
    aria-labelledby="skills-heading"
    class="scroll-mt-[var(--nav-h)] py-12 px-4 md:px-8 text-left"
  >
    <RevealOnScroll>
      <header>
        <div class="text-2xl font-bold text-text mb-8 flex items-center gap-3">
          <h2 id="skills-heading">Tech Stack & Skills</h2>
          <div class="h-[2px] w-24 md:w-48 bg-primary/60 rounded-full"></div>
        </div>
      </header>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        <div
          v-for="item in skills"
          :key="item.id"
          class="skill-item flex items-center gap-3 rounded-xl border border-border bg-surface p-3 hover:bg-surface-hover hover:border-primary/50 transition-all duration-200 cursor-default shadow-2xs"
        >
          <div class="w-10 h-10 shrink-0 flex items-center justify-center p-1.5 rounded-lg bg-surface-hover">
            <img
              :src="item.imageUrl"
              :alt="item.name"
              loading="lazy"
              width="28"
              height="28"
              decoding="async"
              class="w-full h-full object-contain"
            />
          </div>
          <div class="min-w-0">
            <div class="text-sm font-semibold text-text truncate">{{ item.name }}</div>
            <div class="text-xs text-text-muted truncate">{{ item.status }}</div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  </section>
</template>

<style scoped>
.skill-item:hover img {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>
