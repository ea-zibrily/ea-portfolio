<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProject } from '@/lib/projects.js'
import { usePageMeta } from '@/composables/usePageMeta.js'
import BulletSection from '@/components/project/BulletSection.vue'
import ImageGallery from '@/components/project/ImageGallery.vue'
import PrevNextNav from '@/components/project/PrevNextNav.vue'
import TagPill from '@/components/ui/TagPill.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.slug)
const project = computed(() => getProject(slug.value))

function handleBack() {
  const hash = project.value?.slug ? `#project-${project.value.slug}` : '#portfolio'
  router.push({ path: '/', hash })
}

const hasLinks = computed(() => {
  if (!project.value?.links) return false
  const l = project.value.links
  return Boolean(l.steam || l.playStore || l.itch || l.github || l.instagram)
})

const allProjectImages = computed(() => {
  if (!project.value) return []
  const imgs = [project.value.cover, ...(project.value.gallery || [])].filter(Boolean)
  return Array.from(new Set(imgs)).slice(0, 3)
})

// Set page metadata dynamically
usePageMeta({
  title: computed(() => project.value ? project.value.title : 'Project Details'),
  description: computed(() => project.value ? project.value.summary : ''),
  image: computed(() => project.value ? project.value.cover : '')
})
</script>

<template>
  <div v-if="project" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
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

    <!-- Main Two-Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <!-- LEFT COLUMN (65-75% space): Title, Metadata, Description, Contributions -->
      <main class="lg:col-span-7 xl:col-span-8 space-y-8">
        <!-- Title & Metadata Header -->
        <header class="space-y-3 pb-6 border-b border-border/60">
          <div class="flex flex-wrap items-center gap-2">
             <span class="text-xs font-bold tracking-wider uppercase text-primary"></span>
            <span class="text-xs text-text-muted">•</span>
            <span class="text-xs text-text-muted font-medium">
              {{ project.period || '2023' }}
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text tracking-tight">
            {{ project.title }}
          </h1>

          <div class="flex flex-wrap items-center gap-3 pt-1">
            <div class="text-sm sm:text-base font-semibold text-text-muted">
              Role: <span class="text-text">{{ project.role }}</span>
            </div>
            <TagPill :label="project.status" variant="primary" />
          </div>
        </header>

        <!-- Description / Overview Section -->
        <section class="space-y-4">
          <h2 class="text-xl sm:text-2xl font-bold text-text tracking-tight flex items-center gap-3">
            <span>Project Overview</span>
            <span class="h-[2px] w-12 bg-primary/40 rounded-full"></span>
          </h2>
          <p class="text-base sm:text-lg text-text-muted leading-relaxed">
            {{ project.overview }}
          </p>
        </section>

        <!-- Contributions -->
        <BulletSection
          title="My Contributions"
          :items="project.contributions"
        />

        <!-- Key Challenges (if data exists) -->
        <BulletSection
          v-if="project.challenges && project.challenges.length > 0"
          title="Key Challenges"
          :items="project.challenges"
        />

        <!-- Solutions (if data exists) -->
        <BulletSection
          v-if="project.solutions && project.solutions.length > 0"
          title="Engineering Solutions"
          :items="project.solutions"
        />
      </main>

      <!-- RIGHT COLUMN (30-35% space): Tech Stack, Project Link/URL, Reactive Image -->
      <aside class="lg:col-span-5 xl:col-span-4 space-y-6">
        <!-- 1. Tech Stack -->
        <section class="p-5 rounded-2xl bg-surface border border-border shadow-xs space-y-3">
          <h2 class="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-2">
            <span>Tech Stack</span>
            <span class="h-[1.5px] flex-1 bg-border/60 rounded-full"></span>
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

        <!-- 2. Project Links / URLs -->
        <section
          v-if="hasLinks"
          class="p-5 rounded-2xl bg-surface border border-border shadow-xs space-y-3"
        >
          <h2 class="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-2">
            <span>Project Links</span>
            <span class="h-[1.5px] flex-1 bg-border/60 rounded-full"></span>
          </h2>
          <div class="flex flex-col gap-2">
            <a
              v-if="project.links.steam"
              :href="project.links.steam"
              target="_blank"
              rel="noreferrer"
              class="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-surface-hover/60 hover:bg-surface-hover border border-border hover:border-primary/50 text-text hover:text-primary transition-all text-sm font-medium"
            >
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.005.105.005.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 14.819C1.868 20.091 6.643 24 12.33 24c6.627 0 12-5.373 12-12S18.605 0 11.979 0zM7.55 18.055l-1.83-.755c.307.729.932 1.291 1.704 1.523-.13-.238-.222-.507-.222-.796 0-.324.086-.628.234-.89l.114.918zm8.39-11.385c-1.258 0-2.279 1.019-2.279 2.277 0 1.258 1.021 2.279 2.279 2.279 1.257 0 2.278-1.021 2.278-2.279 0-1.258-1.021-2.277-2.278-2.277zm-9.012 9.071c-.722 0-1.312.585-1.312 1.307 0 .721.59 1.306 1.312 1.306.723 0 1.312-.585 1.312-1.306 0-.722-.589-1.307-1.312-1.307z"/>
                </svg>
                <span>Steam</span>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-text-muted" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
            <a
              v-if="project.links.playStore"
              :href="project.links.playStore"
              target="_blank"
              rel="noreferrer"
              class="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-surface-hover/60 hover:bg-surface-hover border border-border hover:border-primary/50 text-text hover:text-primary transition-all text-sm font-medium"
            >
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.954 1.954 0 01-.61-.34V2.154c.18-.13.39-.24.61-.34zm11.233 11.236l2.35 2.35-11.4 6.58 9.05-8.93zm0-2.1l-9.05-8.93 11.4 6.58-2.35 2.35zm1.536 1.05l3.818-2.203a1.503 1.503 0 010 2.607L16.378 12z"/>
                </svg>
                <span>Google Play Store</span>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-text-muted" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>

            <a
              v-if="project.links.itch"
              :href="project.links.itch"
              target="_blank"
              rel="noreferrer"
              class="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-surface-hover/60 hover:bg-surface-hover border border-border hover:border-primary/50 text-text hover:text-primary transition-all text-sm font-medium"
            >
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.5 4.5l1.5 2 1.5-2 1.5 2 1.5-2 1.5 2 1.5-2 1.5 2 1.5-2 1.5 2 1.5-2 1.5 2 1.5-2 1.5 2V20H2.5V4.5z"/>
                </svg>
                <span>itch.io</span>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-text-muted" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>

            <a
              v-if="project.links.github"
              :href="project.links.github"
              target="_blank"
              rel="noreferrer"
              class="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-surface-hover/60 hover:bg-surface-hover border border-border hover:border-primary/50 text-text hover:text-primary transition-all text-sm font-medium"
            >
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub Repository</span>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-text-muted" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>

            <a
              v-if="project.links.instagram"
              :href="project.links.instagram"
              target="_blank"
              rel="noreferrer"
              class="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-surface-hover/60 hover:bg-surface-hover border border-border hover:border-primary/50 text-text hover:text-primary transition-all text-sm font-medium"
            >
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-text-muted" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          </div>
        </section>

        <!-- 3. Reactive Images (Max 3) -->
        <section class="space-y-3">
          <h2 class="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-2">
            <span>Project Preview</span>
            <span class="h-[1.5px] flex-1 bg-border/60 rounded-full"></span>
          </h2>
          <ImageGallery
            :images="allProjectImages"
            :project-title="project.title"
            :video="project.video"
          />
        </section>
      </aside>
    </div>

    <!-- Prev / Next Navigation -->
    <PrevNextNav :current-slug="project.slug" />
  </div>

  <!-- Fallback to 404 if project not found -->
  <NotFoundView v-else />
</template>
