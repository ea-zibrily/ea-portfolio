<script setup>
import projects from '@/content/projects.js'
import ItemCard from '@/components/ui/ItemCard.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'

function getDemoLink(project) {
  return project.links?.playStore || project.links?.itch || project.links?.instagram || null
}
</script>

<template>
  <section
    id="portfolio"
    aria-labelledby="portfolio-heading"
    class="scroll-mt-[var(--nav-h)] py-12 px-4 md:px-8 text-left"
  >
    <RevealOnScroll>
      <header class="text-center mb-10">
        <h2 id="portfolio-heading" class="text-2xl sm:text-3xl font-bold text-text mb-2">
          Featured Projects & Works
        </h2>
        <p class="text-text-muted text-sm md:text-base">
          Explore the games and interactive experiences I've engineered.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in projects" :key="item.slug">
          <ItemCard :id="'project-' + item.slug">
            <template #image>
              <img
                :alt="item.title"
                loading="lazy"
                decoding="async"
                class="w-full h-48 object-cover rounded-lg shadow-xs"
                :src="item.cover"
              />
            </template>

            <div class="w-full flex flex-col gap-2">
              <div class="flex items-center justify-between text-xs text-text-muted">
                <span class="font-medium text-primary">{{ item.category }}</span>
                <span>{{ item.period || '2023' }}</span>
              </div>

              <h3 class="text-lg font-bold text-text tracking-tight">
                {{ item.title }}
              </h3>

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

                <div class="flex items-center gap-2">
                  <a
                    v-if="item.links?.github"
                    :href="item.links.github"
                    target="_blank"
                    rel="noreferrer"
                    :title="`View ${item.title} on GitHub`"
                    class="p-1.5 text-text-muted hover:text-primary transition-colors"
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
                    :title="`Open ${item.title} live link`"
                    class="p-1.5 text-text-muted hover:text-primary transition-colors"
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
        </div>
      </div>
    </RevealOnScroll>
  </section>
</template>

<style scoped>
.item-card:hover {
  transform: translateY(-4px);
  transition: transform 0.2s ease;
}
</style>
