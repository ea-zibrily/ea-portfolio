<script setup>
import profile from '@/content/profile.js'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
</script>

<template>
  <section
    id="about"
    aria-labelledby="about-heading"
    class="scroll-mt-[var(--nav-h)] py-12 px-4 md:px-8"
  >
    <RevealOnScroll>
      <div class="bg-surface px-6 py-8 md:px-12 md:py-10 text-left border border-border rounded-3xl text-text shadow-xs">
        <header>
          <div class="text-2xl font-bold text-text mb-6 flex items-center gap-3">
            <h2 id="about-heading">About Me</h2>
            <div class="h-[2px] w-24 md:w-48 bg-primary/60 rounded-full"></div>
          </div>
        </header>

        <div class="text-sm md:text-base leading-relaxed flex flex-col gap-6 md:flex-row md:gap-10 md:items-center">
          <div class="flex justify-center shrink-0">
            <img
              class="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-2 border-border shadow-xs"
              :src="profile.avatar"
              alt="Photo of Zibril Yuan Afrianto"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="space-y-4 text-text-muted">
            <p v-for="(paragraph, index) in profile.bio" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  </section>
</template>
