<script setup>
import certificates from '@/content/certificates.js'
import ItemCard from '@/components/ui/ItemCard.vue'
</script>

<template>
  <div class="px-5 py-5 md:px-12 md:py-10 text-left text-amber-50 mx-3">
    <article data-page="about">
      <header>
        <div class="text-2xl font-bold text-white mb-10 title-section flex items-center justify-center flex-col">
          <h4>Licenses & Certifications</h4>
          <h4 class="text-base font-normal text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-amber-300">
            Certifications that I have completed
          </h4>
        </div>
      </header>
      <section>
        <div>
          <div class="grid grid-cols-1 gap-4 pb-32 md:grid-cols-3 md:gap-3 xl:grid-cols-3 xl:gap-3 2xl:gap-5 fade-zoom-in">
            <div v-for="item in certificates" :key="item.id">
              <ItemCard :id="'cert-' + item.id">
                <template #image>
                  <img
                    :alt="item.name"
                    loading="lazy"
                    decoding="async"
                    class="drop-shadow-xl rounded-xl w-full h-auto object-cover"
                    :src="item.image"
                  />
                </template>

                <div class="w-full flex flex-col gap-2 items-center text-sm md:text-base lg:text-lg">
                  <div class="title-text font-medium text-white text-center">{{ item.name }}</div>
                  <div class="w-full text-left text-[11px] text-[#c1c1c1] md:text-xs lg:text-sm">
                    {{ item.issuer }}
                  </div>
                  <div class="w-full mt-4 text-xs md:text-sm text-left text-amber-200">
                    Issued {{ item.issued }}{{ item.expires ? ' – ' + item.expires : '' }}
                  </div>
                  <div class="w-full flex justify-end mt-2">
                    <div class="flex cursor-pointer items-end gap-3 text-primary">
                      <a
                        v-if="item.credentialUrl"
                        :href="item.credentialUrl"
                        target="_blank"
                        rel="noreferrer"
                        title="View credential"
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
