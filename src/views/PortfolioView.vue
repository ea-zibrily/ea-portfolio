<script setup>
import projects from '@/content/projects.js'
import ItemCard from '@/components/ui/ItemCard.vue'

function getDemoLink(project) {
  return project.links?.playStore || project.links?.itch || project.links?.instagram || null
}
</script>

<template>
  <div class="px-5 py-5 md:px-12 md:py-10 text-left text-amber-50 mx-3">
    <article data-page="about">
      <header>
        <div class="text-2xl font-bold text-white mb-10 title-section flex items-center justify-center flex-col">
          <h4>Past Project Experience</h4>
          <h4 class="text-base font-normal text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-amber-300">
            Explore the projects I've worked on so far
          </h4>
        </div>
      </header>
      <section>
        <div>
          <div class="grid grid-cols-1 gap-4 pb-32 md:grid-cols-3 md:gap-3 xl:grid-cols-3 xl:gap-3 2xl:gap-5 fade-zoom-in">
            <div v-for="item in projects" :key="item.slug">
              <ItemCard :id="'project-' + item.slug">
                <template #image>
                  <img
                    :alt="item.title"
                    loading="lazy"
                    decoding="async"
                    class="drop-shadow-xl rounded-xl w-full h-auto object-cover"
                    :src="item.cover"
                  />
                </template>

                <div class="w-full flex flex-col gap-2 items-center text-sm md:text-base lg:text-lg">
                  <div class="title-text font-medium text-white text-center">{{ item.title }}</div>
                  <div class="w-full text-left text-[11px] text-[#c1c1c1] md:text-xs lg:text-sm">
                    {{ item.summary }}
                  </div>
                  <div class="w-full mt-4 text-xs md:text-sm text-left text-amber-200">
                    <span class="font-medium text-primary">{{ item.status }}</span> | {{ item.tech.join(', ') }}
                  </div>
                  <div class="w-full flex justify-end mt-2">
                    <div class="flex cursor-pointer items-end gap-3 text-primary">
                      <a
                        v-if="item.links?.github"
                        :href="item.links.github"
                        target="_blank"
                        rel="noreferrer"
                        title="View GitHub repository"
                        class="text-gray-300 hover:text-amber-200 transition-colors"
                      >
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          height="18"
                          width="18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                          ></path>
                        </svg>
                      </a>
                      <a
                        v-if="getDemoLink(item)"
                        :href="getDemoLink(item)"
                        target="_blank"
                        rel="noreferrer"
                        title="View project"
                        class="text-gray-300 hover:text-amber-200 transition-colors"
                      >
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          height="18"
                          width="18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </ItemCard>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped>
.item-card:hover {
  transition: transform 0.3s ease;
  transform: translateY(-8px);
}
</style>
