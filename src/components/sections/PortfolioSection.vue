<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import projects from '@/content/projects.js'
import ItemCard from '@/components/ui/ItemCard.vue'
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
  return project.links?.playStore || project.links?.itch || project.links?.instagram || null
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

      <!-- Project Grid -->
      <div
        v-if="filteredProjects.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div v-for="item in filteredProjects" :key="item.slug">
          <RouterLink
            :to="'/project/' + item.slug"
            class="block group focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
            :aria-label="`View details for ${item.title}`"
          >
            <ItemCard
              :id="'project-' + item.slug"
              class="group-hover:border-primary/50 group-hover:shadow-lg transition-all duration-300"
            >
              <template #image>
                <div class="relative w-full overflow-hidden rounded-lg">
                  <img
                    :alt="item.title"
                    loading="lazy"
                    decoding="async"
                    class="w-full h-48 object-cover shadow-xs group-hover:scale-105 transition-transform duration-300"
                    :src="item.cover"
                  />
                  <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </template>

              <div class="w-full flex flex-col gap-2">
                <div class="flex items-center justify-between text-xs text-text-muted">
                  <span class="font-medium text-primary">{{ item.category }}</span>
                  <span>{{ item.period || '2023' }}</span>
                </div>

                <div>
                  <h3 class="text-lg font-bold text-text tracking-tight group-hover:text-primary transition-colors">
                    {{ item.title }}
                  </h3>
                </div>

                <p class="text-xs sm:text-sm text-text-muted line-clamp-3">
                  {{ item.summary }}
                </p>

                <div class="mt-2 flex flex-wrap gap-1.5">
                  <span
                    v-for="t in item.tech"
                    :key="t"
                    class="px-2 py-0.5 rounded text-[11px] font-medium bg-tag border border-border text-text-muted"
                  >
                    {{ t }}
                  </span>
                </div>

                <div class="w-full flex justify-between items-center mt-3 pt-3 border-t border-border/50">
                  <span class="text-xs font-semibold text-primary">
                    {{ item.status }}
                  </span>

                  <!-- External Links with @click.stop to prevent card navigation -->
                  <div class="flex items-center gap-2" @click.stop>
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
        </div>
      </div>

      <div
        v-else
        class="text-center py-16 px-4 rounded-2xl bg-surface border border-border"
      >
        <p class="text-text-muted">No projects found in this category.</p>
      </div>
    </RevealOnScroll>
  </section>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
