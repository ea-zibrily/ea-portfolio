<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  projectTitle: {
    type: String,
    default: 'Project screenshot'
  }
})

const activeIndex = ref(null)

function openLightbox(index) {
  activeIndex.value = index
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

function closeLightbox() {
  activeIndex.value = null
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

function prevImage() {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length
}

function nextImage() {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value + 1) % props.images.length
}

function handleKeyDown(e) {
  if (activeIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeyDown)
  }
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <section v-if="images && images.length > 0" class="space-y-4">
    <h2 class="text-xl sm:text-2xl font-bold text-text tracking-tight flex items-center gap-3">
      <span>Screenshots</span>
      <span class="h-[2px] w-12 bg-primary/40 rounded-full"></span>
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <button
        v-for="(img, idx) in images"
        :key="idx"
        @click="openLightbox(idx)"
        type="button"
        class="group relative overflow-hidden rounded-xl border border-border bg-surface aspect-video cursor-pointer p-0 text-left focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <img
          :src="img"
          :alt="`${projectTitle} screenshot ${idx + 1}`"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span class="p-2 rounded-full bg-surface/80 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </button>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div
        v-if="activeIndex !== null"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
        @click.self="closeLightbox"
      >
        <button
          @click="closeLightbox"
          type="button"
          aria-label="Close lightbox"
          class="absolute top-4 right-4 p-2 rounded-full bg-surface/80 text-text hover:text-primary transition-colors cursor-pointer border border-border"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Previous Button -->
        <button
          v-if="images.length > 1"
          @click="prevImage"
          type="button"
          aria-label="Previous image"
          class="absolute left-4 p-2 rounded-full bg-surface/80 text-text hover:text-primary transition-colors cursor-pointer border border-border"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Main Displayed Image -->
        <div class="max-w-5xl max-h-[85vh] p-2">
          <img
            :src="images[activeIndex]"
            :alt="`${projectTitle} screenshot enlarged`"
            class="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mx-auto"
          />
          <div class="text-center text-xs text-white/70 mt-2">
            {{ activeIndex + 1 }} / {{ images.length }}
          </div>
        </div>

        <!-- Next Button -->
        <button
          v-if="images.length > 1"
          @click="nextImage"
          type="button"
          aria-label="Next image"
          class="absolute right-4 p-2 rounded-full bg-surface/80 text-text hover:text-primary transition-colors cursor-pointer border border-border"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </Teleport>
  </section>
</template>
