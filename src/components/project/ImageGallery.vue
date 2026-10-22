<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  projectTitle: {
    type: String,
    default: 'Project screenshot'
  },
  video: {
    type: String,
    default: null
  }
})

// Convert standard YouTube URLs (watch, youtu.be) to embed URLs
const embedVideoUrl = computed(() => {
  if (!props.video) return null
  const url = props.video.trim()
  if (url.includes('/embed/')) return url
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`
  }
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`
  }
  return url
})

const youtubeId = computed(() => {
  if (!props.video) return null
  const shortMatch = props.video.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) return shortMatch[1]
  const watchMatch = props.video.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (watchMatch) return watchMatch[1]
  return null
})

const videoThumbnail = computed(() => {
  if (youtubeId.value) {
    return `https://img.youtube.com/vi/${youtubeId.value}/hqdefault.jpg`
  }
  return null
})

// Max 3 images as requested
const maxImages = computed(() => (props.images || []).slice(0, 3))

// If video exists, default to video view; otherwise first screenshot
const selectedIndex = ref(props.video ? 'video' : 0)
const isLightboxOpen = ref(false)

function selectImage(idx) {
  selectedIndex.value = idx
}

function handleMainClick() {
  if (selectedIndex.value !== 'video') {
    openLightbox(selectedIndex.value)
  }
}

function openLightbox(idx = selectedIndex.value) {
  if (idx === 'video') return
  selectedIndex.value = idx
  isLightboxOpen.value = true
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

function closeLightbox() {
  isLightboxOpen.value = false
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

function prevImage() {
  if (maxImages.value.length === 0) return
  if (selectedIndex.value === 'video') {
    selectedIndex.value = maxImages.value.length - 1
  } else {
    selectedIndex.value =
      (selectedIndex.value - 1 + maxImages.value.length) % maxImages.value.length
  }
}

function nextImage() {
  if (maxImages.value.length === 0) return
  if (selectedIndex.value === 'video') {
    selectedIndex.value = 0
  } else {
    selectedIndex.value = (selectedIndex.value + 1) % maxImages.value.length
  }
}

function handleKeyDown(e) {
  if (!isLightboxOpen.value) return
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
  <div v-if="embedVideoUrl || maxImages.length > 0" class="space-y-3">
    <!-- Main Active Preview -->
    <div
      class="group relative overflow-hidden rounded-2xl border border-border bg-surface shadow-md aspect-video select-none"
      :class="{ 'cursor-pointer': selectedIndex !== 'video' }"
      @click="handleMainClick"
    >
      <!-- Video Player -->
      <iframe
        v-if="selectedIndex === 'video' && embedVideoUrl"
        :src="embedVideoUrl"
        :title="`${projectTitle} trailer video`"
        class="w-full h-full border-0"
        allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
          web-share;
        "
        allowfullscreen
      ></iframe>

      <!-- Image Preview -->
      <img
        v-else-if="maxImages[selectedIndex]"
        :src="maxImages[selectedIndex]"
        :alt="`${projectTitle} preview image`"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />

      <!-- Hover Overlay / Enlarge Hint (Only for screenshots) -->
      <div
        v-if="selectedIndex !== 'video'"
        class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none"
      >
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/90 text-primary text-xs font-semibold shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Click to enlarge</span>
        </span>
      </div>
    </div>

    <!-- Reactive Thumbnails Row (Video + Screenshots) -->
    <div
      v-if="(embedVideoUrl ? 1 : 0) + maxImages.length > 1"
      class="grid gap-2.5"
      :class="
        embedVideoUrl ? (maxImages.length >= 3 ? 'grid-cols-4' : 'grid-cols-3') : 'grid-cols-3'
      "
      role="tablist"
      aria-label="Project screenshots and video"
    >
      <!-- Video Tab Button (if present) -->
      <button
        v-if="embedVideoUrl"
        type="button"
        role="tab"
        :aria-selected="selectedIndex === 'video'"
        @click="selectImage('video')"
        :class="[
          'relative aspect-video rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer p-0 group',
          selectedIndex === 'video'
            ? 'border-primary ring-2 ring-primary/40 shadow-xs opacity-100'
            : 'border-border opacity-70 hover:opacity-100 hover:border-primary/50'
        ]"
        title="Watch video trailer"
      >
        <img
          v-if="videoThumbnail"
          :src="videoThumbnail"
          alt="Video trailer thumbnail"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div v-else class="w-full h-full bg-surface-hover flex items-center justify-center">
          <span class="text-[11px] font-semibold text-text">Trailer</span>
        </div>
        <!-- Play Badge Overlay -->
        <div
          class="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors"
        >
          <div
            class="w-6 h-6 rounded-full bg-primary text-primary-fg flex items-center justify-center shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 h-3 fill-current ml-0.5"
              viewBox="0 0 20 20"
            >
              <path d="M4.5 3.5l11 6.5-11 6.5v-13z" />
            </svg>
          </div>
        </div>
      </button>

      <!-- Screenshot Thumbnails -->
      <button
        v-for="(img, idx) in maxImages"
        :key="idx"
        type="button"
        role="tab"
        :aria-selected="selectedIndex === idx"
        @click="selectImage(idx)"
        :class="[
          'relative aspect-video rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer p-0',
          selectedIndex === idx
            ? 'border-primary ring-2 ring-primary/40 shadow-xs'
            : 'border-border opacity-60 hover:opacity-100 hover:border-primary/50'
        ]"
      >
        <img
          :src="img"
          :alt="`${projectTitle} thumbnail ${idx + 1}`"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </button>
    </div>

    <!-- Lightbox Modal for Screenshots -->
    <Teleport to="body">
      <div
        v-if="isLightboxOpen && selectedIndex !== 'video'"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
        @click.self="closeLightbox"
      >
        <button
          @click="closeLightbox"
          type="button"
          aria-label="Close lightbox"
          class="absolute top-4 right-4 p-2 rounded-full bg-surface/80 text-text hover:text-primary transition-colors cursor-pointer border border-border"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Previous Button -->
        <button
          v-if="maxImages.length > 1"
          @click="prevImage"
          type="button"
          aria-label="Previous image"
          class="absolute left-4 p-2 rounded-full bg-surface/80 text-text hover:text-primary transition-colors cursor-pointer border border-border"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <!-- Main Displayed Image in Lightbox -->
        <div class="max-w-5xl max-h-[85vh] p-2">
          <img
            v-if="maxImages[selectedIndex]"
            :src="maxImages[selectedIndex]"
            :alt="`${projectTitle} screenshot enlarged`"
            class="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mx-auto"
          />
          <div class="text-center text-xs text-white/70 mt-2">
            {{ selectedIndex + 1 }} / {{ maxImages.length }}
          </div>
        </div>

        <!-- Next Button -->
        <button
          v-if="maxImages.length > 1"
          @click="nextImage"
          type="button"
          aria-label="Next image"
          class="absolute right-4 p-2 rounded-full bg-surface/80 text-text hover:text-primary transition-colors cursor-pointer border border-border"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </Teleport>
  </div>
</template>
