<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import projects from '@/content/projects.js'
import ItemCard from '@/components/ui/ItemCard.vue'
import TagPill from '@/components/ui/TagPill.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'professional', label: 'Professional Project' },
  { id: 'freelance', label: 'Freelance Project' },
  { id: 'gamejam', label: 'Game Jam Project' },
  { id: 'personal', label: 'Personal Project' }
]

const activeCategory = ref('all')

function matchesCategory(project, catId) {
  if (catId === 'all') return true
  const cat = (project.category || '').toLowerCase()
  if (catId === 'professional') return cat.includes('professional')
  if (catId === 'freelance') return cat.includes('freelance') || cat.includes('educational') || cat.includes('school')
  if (catId === 'gamejam') return cat.includes('game jam') || cat.includes('gamejam')
  if (catId === 'personal') return cat.includes('personal')
  return false
}

const filteredProjects = computed(() => {
  return projects.filter(p => matchesCategory(p, activeCategory.value))
})

function getCategoryCount(catId) {
  return projects.filter(p => matchesCategory(p, catId)).length
}

function getDemoLink(project) {
  return project.links?.steam || project.links?.playStore || project.links?.itch || project.links?.instagram || null
}
</script>

<template>
  <section
    id="portfolio"
    aria-labelledby="portfolio-heading"
    class="scroll-mt-[var(--nav-h)] py-12 px-4 md:px-8 text-left max-w-7xl mx-auto"
  >
    <RevealOnScroll>
      <header class="text-center mb-8">
        <h2 id="portfolio-heading" class="text-2xl sm:text-3xl font-bold text-text mb-2">
          Featured Projects & Works
        </h2>
        <p class="text-text-muted text-sm md:text-base max-w-2xl mx-auto">
          Explore the games and interactive experiences I've engineered. Click any project to read engineering details.
        </p>
      </header>

      <!-- Horizontal Grouping / Filter Buttons -->
      <div
        role="tablist"
        aria-label="Filter projects by category"
        class="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10"
      >
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          role="tab"
          :aria-selected="activeCategory === cat.id"
          @click="activeCategory = cat.id"
          :class="[
            'px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none',
            activeCategory === cat.id
              ? 'bg-primary text-primary-fg font-semibold shadow-xs'
              : 'bg-surface hover:bg-surface-hover text-text-muted hover:text-text border border-border'
          ]"
        >
          <span>{{ cat.label }}</span>
          <span class="ml-1.5 opacity-90">({{ getCategoryCount(cat.id) }})</span>
        </button>
      </div>
    </RevealOnScroll>

    <!-- Project Grid -->
    <div
      v-if="filteredProjects.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <RevealOnScroll
        v-for="(item, index) in filteredProjects"
        :key="item.slug"
      >
        <RouterLink
          :to="'/project/' + item.slug"
          class="h-full block group focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
          :aria-label="`View details for ${item.title}`"
        >
          <ItemCard
            :id="'project-' + item.slug"
            class="h-full scroll-mt-[calc(var(--nav-h)+1.5rem)] group-hover:border-primary/50 group-hover:shadow-lg transition-all duration-300"
          >
            <template #image>
              <div class="relative w-full overflow-hidden rounded-lg">
                <img
                  :alt="item.title"
                  :loading="index < 6 ? 'eager' : 'lazy'"
                  :fetchpriority="index < 3 ? 'high' : 'auto'"
                  decoding="async"
                  width="600"
                  height="338"
                  class="w-full h-48 object-cover shadow-xs group-hover:scale-105 transition-transform duration-300"
                  :src="item.cover"
                />
                <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </template>

            <div class="w-full flex flex-col gap-2 flex-1 justify-between">
              <div>
                <div class="flex items-center justify-between text-xs text-text-muted mb-1">
                  <span class="font-medium text-primary">{{ item.category }}</span>
                  <span>{{ item.period || '2023' }}</span>
                </div>

                <h3 class="text-lg font-bold text-text tracking-tight group-hover:text-primary transition-colors">
                  {{ item.title }}
                </h3>

                <p class="text-xs sm:text-sm text-text-muted line-clamp-3 mt-1">
                  {{ item.summary }}
                </p>

                <div class="mt-3 flex flex-wrap gap-1.5">
                  <TagPill
                    v-for="t in item.tech"
                    :key="t"
                    :label="t"
                    variant="primary"
                  />
                </div>
              </div>

              <div class="w-full flex justify-between items-center mt-3 pt-3 border-t border-border/50">
                <span class="text-xs font-semibold text-primary">
                  {{ item.status }}
                </span>

                <!-- External Links with @click.stop to prevent card navigation -->
                <div class="flex items-center gap-2" @click.stop>
                  <a
                    v-if="item.links?.steam"
                    :href="item.links.steam"
                    target="_blank"
                    rel="noreferrer"
                    :title="`View ${item.title} on Steam`"
                    class="p-1.5 text-text-muted hover:text-primary transition-colors"
                    @click.stop
                  >
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.005.105.005.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 14.819C1.868 20.091 6.643 24 12.33 24c6.627 0 12-5.373 12-12S18.605 0 11.979 0zM7.55 18.055l-1.83-.755c.307.729.932 1.291 1.704 1.523-.13-.238-.222-.507-.222-.796 0-.324.086-.628.234-.89l.114.918zm8.39-11.385c-1.258 0-2.279 1.019-2.279 2.277 0 1.258 1.021 2.279 2.279 2.279 1.257 0 2.278-1.021 2.278-2.279 0-1.258-1.021-2.277-2.278-2.277zm-9.012 9.071c-.722 0-1.312.585-1.312 1.307 0 .721.59 1.306 1.312 1.306.723 0 1.312-.585 1.312-1.306 0-.722-.589-1.307-1.312-1.307z"/>
                    </svg>
                  </a>
                  <a
                    v-if="item.links?.github"
                    :href="item.links.github"
                    target="_blank"
                    rel="noreferrer"
                    :title="`View ${item.title} on GitHub`"
                    class="p-1.5 text-text-muted hover:text-primary transition-colors"
                    @click.stop
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      class="w-4 h-4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                      />
                    </svg>
                  </a>
                  <a
                    v-if="getDemoLink(item)"
                    :href="getDemoLink(item)"
                    target="_blank"
                    rel="noreferrer"
                    :title="`Open ${item.title} live demo`"
                    class="p-1.5 text-text-muted hover:text-primary transition-colors"
                    @click.stop
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      class="w-4 h-4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </ItemCard>
        </RouterLink>
      </RevealOnScroll>
    </div>

    <div
      v-else
      class="text-center py-16 px-4 rounded-2xl bg-surface border border-border"
    >
      <p class="text-text-muted">No projects found in this category.</p>
    </div>
  </section>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
