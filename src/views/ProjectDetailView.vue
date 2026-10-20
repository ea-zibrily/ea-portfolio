<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getProject } from '@/lib/projects.js'
import { usePageMeta } from '@/composables/usePageMeta.js'
import ProjectHeader from '@/components/project/ProjectHeader.vue'
import BulletSection from '@/components/project/BulletSection.vue'
import ImageGallery from '@/components/project/ImageGallery.vue'
import PrevNextNav from '@/components/project/PrevNextNav.vue'
import TagPill from '@/components/ui/TagPill.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const route = useRoute()
const slug = computed(() => route.params.slug)
const project = computed(() => getProject(slug.value))

// Set page metadata dynamically
usePageMeta({
  title: computed(() => project.value ? project.value.title : 'Project Details'),
  description: computed(() => project.value ? project.value.summary : ''),
  image: computed(() => project.value ? project.value.cover : '')
})
</script>

<template>
  <div v-if="project" class="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-16 space-y-12">
    <!-- Header with Back Button and Metadata -->
    <ProjectHeader :project="project" />

    <!-- Cover Media / Video -->
    <div class="rounded-2xl overflow-hidden border border-border bg-surface shadow-md">
      <div v-if="project.video" class="aspect-video w-full">
        <iframe
          :src="project.video"
          title="Gameplay trailer"
          class="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <img
        v-else
        :src="project.cover"
        :alt="project.title + ' cover image'"
        class="w-full h-auto max-h-[500px] object-cover"
        fetchpriority="high"
      />
    </div>

    <!-- Overview Section -->
    <section class="space-y-4">
      <h2 class="text-xl sm:text-2xl font-bold text-text tracking-tight flex items-center gap-3">
        <span>Project Overview</span>
        <span class="h-[2px] w-12 bg-primary/40 rounded-full"></span>
      </h2>
      <p class="text-sm sm:text-base text-text-muted leading-relaxed">
        {{ project.overview }}
      </p>
    </section>

    <!-- My Contributions (F5.3) -->
    <BulletSection
      title="My Contributions"
      :items="project.contributions"
    />

    <!-- Challenges (F5.4 - renders only if data exists) -->
    <BulletSection
      v-if="project.challenges && project.challenges.length > 0"
      title="Key Challenges"
      :items="project.challenges"
    />

    <!-- Solutions (F5.4 - renders only if data exists) -->
    <BulletSection
      v-if="project.solutions && project.solutions.length > 0"
      title="Engineering Solutions"
      :items="project.solutions"
    />

    <!-- Screenshot Gallery with Lightbox (F5.10 - renders only if data exists) -->
    <ImageGallery
      v-if="project.gallery && project.gallery.length > 0"
      :images="project.gallery"
      :project-title="project.title"
    />

    <!-- Tech Stack -->
    <section class="space-y-4">
      <h2 class="text-xl sm:text-2xl font-bold text-text tracking-tight flex items-center gap-3">
        <span>Tech Stack</span>
        <span class="h-[2px] w-12 bg-primary/40 rounded-full"></span>
      </h2>
      <div class="flex flex-wrap gap-2">
        <TagPill
          v-for="t in project.tech"
          :key="t"
          :label="t"
          variant="primary"
        />
      </div>
    </section>

    <!-- Project External Links -->
    <section v-if="project.links" class="space-y-4">
      <h2 class="text-xl sm:text-2xl font-bold text-text tracking-tight flex items-center gap-3">
        <span>Project Links</span>
        <span class="h-[2px] w-12 bg-primary/40 rounded-full"></span>
      </h2>
      <div class="flex flex-wrap gap-3">
        <a
          v-if="project.links.playStore"
          :href="project.links.playStore"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border hover:border-primary/50 text-text hover:text-primary transition-colors text-sm font-medium shadow-xs"
        >
          <span>Google Play Store</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </a>

        <a
          v-if="project.links.itch"
          :href="project.links.itch"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border hover:border-primary/50 text-text hover:text-primary transition-colors text-sm font-medium shadow-xs"
        >
          <span>itch.io</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </a>

        <a
          v-if="project.links.github"
          :href="project.links.github"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border hover:border-primary/50 text-text hover:text-primary transition-colors text-sm font-medium shadow-xs"
        >
          <span>GitHub Repository</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </a>

        <a
          v-if="project.links.instagram"
          :href="project.links.instagram"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border hover:border-primary/50 text-text hover:text-primary transition-colors text-sm font-medium shadow-xs"
        >
          <span>Instagram</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </a>
      </div>
    </section>

    <!-- Prev / Next Navigation -->
    <PrevNextNav :current-slug="project.slug" />
  </div>

  <!-- Fallback to 404 if project not found -->
  <NotFoundView v-else />
</template>
