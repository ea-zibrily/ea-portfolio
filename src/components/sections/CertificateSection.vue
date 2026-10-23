<script setup>
import certificates from '@/content/certificates.js'
import ItemCard from '@/components/ui/ItemCard.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import { isExpired } from '@/lib/format.js'
</script>

<template>
  <section
    id="certificates"
    aria-labelledby="certificates-heading"
    class="scroll-mt-[var(--nav-h)] py-12 px-4 md:px-8 text-left"
  >
    <RevealOnScroll>
      <header class="text-center mb-10">
        <h2 id="certificates-heading" class="text-2xl sm:text-3xl font-bold text-text mb-2">
          Licenses & Certifications
        </h2>
        <p class="text-text-muted text-sm md:text-base">
          Professional credentials, game development, and engineering certifications.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in certificates" :key="item.id">
          <ItemCard :id="'cert-' + item.id">
            <template #image>
              <img
                :alt="item.name"
                loading="lazy"
                decoding="async"
                class="w-full h-44 object-contain p-2 rounded-lg bg-surface-hover shadow-2xs"
                :src="item.image"
              />
            </template>

            <div class="w-full flex flex-col gap-2">
              <div class="flex items-center justify-between text-xs text-text-muted">
                <span class="font-medium text-text">{{ item.issuer }}</span>
                <span v-if="isExpired(item)" class="px-1.5 py-0.5 rounded text-[10px] bg-red-500/10 text-red-500 border border-red-500/30 font-medium">
                  Expired
                </span>
              </div>

              <h3 class="text-base font-bold text-text tracking-tight line-clamp-2">
                {{ item.name }}
              </h3>

              <div class="w-full flex justify-between items-center mt-3 pt-3 border-t border-border/50 text-xs text-text-muted">
                <span>
                  Issued {{ item.issued }}
                </span>

                <a
                  v-if="item.credentialUrl"
                  :href="item.credentialUrl"
                  target="_blank"
                  rel="noreferrer"
                  title="View Credential"
                  class="flex items-center gap-1 font-medium text-primary hover:underline"
                >
                  <span>Verify</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
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
