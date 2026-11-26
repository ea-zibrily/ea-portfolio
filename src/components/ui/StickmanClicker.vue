<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useReducedMotion } from '@/composables/useReducedMotion.js'

const route = useRoute()
const { isReducedMotion } = useReducedMotion()

const AWAKE_QUIPS = [
  'hi!',
  'go look at the projects',
  '60 FPS locked!',
  'fixing a NullRef...',
  'it works on my machine',
  'shipped it!'
]

const isMounted = ref(false)
const seatMode = ref('margin') // 'hero' | 'margin' | 'contact'
const isHopping = ref(false)
const posX = ref(0)
const posY = ref(160)
const isPoked = ref(false)
const speechText = ref('')

let quipIdx = 0
let pokeTimer = null
let speechTimer = null
let speechDelayTimer = null
let hopTimer = null

const isSitting = computed(() => seatMode.value === 'hero' || seatMode.value === 'contact')

function setSeatMode(nextMode) {
  if (seatMode.value !== nextMode) {
    seatMode.value = nextMode
    if (!isReducedMotion.value) {
      isHopping.value = true
      if (hopTimer) clearTimeout(hopTimer)
      hopTimer = setTimeout(() => {
        isHopping.value = false
      }, 460)
    }
  }
}

const companionStyle = computed(() => ({
  left: `${Math.round(posX.value)}px`,
  top: `${Math.round(posY.value)}px`
}))

function updatePosition() {
  if (typeof window === 'undefined') return

  const vw = window.innerWidth
  const vh = window.innerHeight
  const y = window.scrollY || 0
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh)
  const progress = Math.min(1, Math.max(0, y / maxScroll))

  const stickmanWidth = 56 // w-14
  // In the sitting SVG (viewBox 64x76, rendered h-16 = 64px), hips sit at y=53 -> ~44px from top
  const seatOffsetY = 44

  const heroSeat = document.querySelector('[data-stickman-seat="hero"]')
  const contactBtn = document.querySelector('[data-stickman-seat="contact"]')

  // 1. Sit above the profile picture when near top of Home page
  if (heroSeat && y < 120) {
    const rect = heroSeat.getBoundingClientRect()
    if (rect.width > 0 && rect.top > 56 && rect.bottom < vh) {
      setSeatMode('hero')
      posX.value = rect.left + rect.width / 2 - stickmanWidth / 2
      posY.value = rect.top - seatOffsetY + 2
      return
    }
  }

  // 2. Sit on "Get in Touch" button when Contact section is visible near bottom
  if (contactBtn && progress > 0.72) {
    const rect = contactBtn.getBoundingClientRect()
    if (rect.width > 0 && rect.top > 90 && rect.bottom < vh - 12) {
      setSeatMode('contact')
      // Ensure no dialogue bubble stays visible while seated on the footer CTA
      speechText.value = ''
      if (speechTimer) clearTimeout(speechTimer)
      if (speechDelayTimer) clearTimeout(speechDelayTimer)
      posX.value = rect.left + rect.width / 2 - stickmanWidth / 2
      posY.value = rect.top - seatOffsetY
      return
    }
  }

  // 3. Default: stand upright and track smoothly along the right margin
  setSeatMode('margin')
  const rightPad = vw >= 1024 ? 20 : 12
  posX.value = vw - stickmanWidth - rightPad
  posY.value = isReducedMotion.value ? vh * 0.72 : vh * (0.18 + progress * 0.56)
}

function showSpeech(text, duration = 2200) {
  speechText.value = text
  if (speechTimer) clearTimeout(speechTimer)
  speechTimer = setTimeout(() => {
    speechText.value = ''
  }, duration)
}

function handlePoke() {
  if (isSitting.value) return

  // Clear current bubble while jumping so stickman never overlaps it
  speechText.value = ''
  if (speechTimer) clearTimeout(speechTimer)
  if (speechDelayTimer) clearTimeout(speechDelayTimer)

  const nextLine = AWAKE_QUIPS[quipIdx % AWAKE_QUIPS.length]
  quipIdx += 1

  // Jump first, then pop the dialogue bubble once the stickman lands
  if (!isReducedMotion.value) {
    isPoked.value = true
    if (pokeTimer) clearTimeout(pokeTimer)
    pokeTimer = setTimeout(() => {
      isPoked.value = false
    }, 360)

    speechDelayTimer = setTimeout(() => {
      showSpeech(nextLine)
    }, 380)
  } else {
    showSpeech(nextLine)
  }
}

watch(
  () => route.fullPath,
  () => {
    nextTick(() => {
      setTimeout(updatePosition, 80)
    })
  }
)

onMounted(() => {
  isMounted.value = true
  nextTick(() => {
    updatePosition()
    // Re-measure once fonts/layout settle
    setTimeout(updatePosition, 150)
  })
  window.addEventListener('scroll', updatePosition, { passive: true })
  window.addEventListener('resize', updatePosition, { passive: true })
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', updatePosition)
    window.removeEventListener('resize', updatePosition)
  }
  if (hopTimer) clearTimeout(hopTimer)
  if (pokeTimer) clearTimeout(pokeTimer)
  if (speechTimer) clearTimeout(speechTimer)
  if (speechDelayTimer) clearTimeout(speechDelayTimer)
})
</script>

<template>
  <div
    v-if="isMounted"
    class="stickman-companion hidden md:flex fixed z-30 flex-col items-center select-none pointer-events-none"
    :class="{ 'is-hopping': isHopping, 'is-margin': !isSitting && !isHopping }"
    :style="companionStyle"
  >
    <!-- Stickman Trigger + Classic Dialogue Bubble -->
    <div
      class="relative flex flex-col items-center"
      :class="isSitting ? 'pointer-events-none' : 'pointer-events-auto'"
    >
      <!-- Dialogue Bubble Above Stickman (disabled when seated on footer/contact CTA) -->
      <transition name="bubble">
        <div
          v-if="speechText && !isPoked && seatMode !== 'contact'"
          class="pointer-events-none absolute bottom-full mb-3.5 w-max max-w-[136px] px-3 py-1.5 rounded-2xl border border-border bg-surface text-text text-[11px] font-mono leading-snug text-left shadow-sm break-words"
          :class="isSitting ? 'left-1/2 -translate-x-1/2' : 'right-1'"
        >
          {{ speechText }}
          <!-- Speech bubble pointer tail pointing down toward the stickman's head -->
          <span
            class="absolute -bottom-[5px] w-2.5 h-2.5 rotate-45 bg-surface border-r border-b border-border"
            :class="isSitting ? 'left-1/2 -translate-x-1/2' : 'right-5'"
            aria-hidden="true"
          ></span>
        </div>
      </transition>

      <button
        type="button"
        :disabled="isSitting"
        :tabindex="isSitting ? -1 : 0"
        :aria-hidden="isSitting ? 'true' : undefined"
        @click="handlePoke"
        aria-label="Poke the stickman"
        :title="isSitting ? undefined : 'Poke me!'"
        class="stickman-btn group w-14 h-16 flex items-center justify-center bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
        :class="{
          'is-poked': isPoked,
          'cursor-pointer': !isSitting,
          'cursor-default': isSitting
        }"
      >
        <!-- Hand-drawn Minimalist Stickman SVG -->
        <svg
          viewBox="0 0 64 76"
          class="w-12 h-15 text-primary transition-transform duration-200"
          :class="{ 'group-hover:scale-105 group-active:scale-95': !isSitting }"
          fill="none"
          stroke="currentColor"
          stroke-width="2.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <!-- Sketchy hair tuft -->
          <path d="M27 11 C29 6, 33 6, 34 10" stroke-width="2.2" />
          <path d="M32 10 C35 6, 38 8, 37 11" stroke-width="2.2" />

          <!-- Head -->
          <circle cx="32" cy="20" r="9.5" />

          <!-- Face expressions -->
          <template v-if="isPoked">
            <path d="M27.5 19.5 Q29 17.5 30.5 19.5" stroke-width="2" />
            <path d="M33.5 19.5 Q35 17.5 36.5 19.5" stroke-width="2" />
            <path d="M28.5 23.5 Q32 26.5 35.5 23.5" stroke-width="2" />
          </template>
          <template v-else>
            <circle cx="29" cy="19.5" r="1.3" fill="currentColor" stroke="none" />
            <circle cx="35" cy="19.5" r="1.3" fill="currentColor" stroke="none" />
            <path d="M29.5 23.5 Q32 25.5 34.5 23.5" stroke-width="1.9" />
          </template>

          <!-- Torso -->
          <path d="M32 30 C32 38, 31.5 45, 32 53" />

          <!-- Arms -->
          <template v-if="isPoked">
            <path d="M32 36 L18 25" />
            <path d="M32 36 L46 24" />
            <line x1="49" y1="20" x2="53" y2="18" stroke-width="1.8" />
            <line x1="50" y1="24" x2="54" y2="24" stroke-width="1.8" />
          </template>
          <template v-else-if="isSitting">
            <!-- Left hand resting down on button edge -->
            <path d="M32 37 C26 42, 23 47, 22 53" />
            <!-- Right hand waving playfully while sitting -->
            <g class="wave-arm">
              <path d="M32 37 C40 35, 45 31, 48 25" />
              <path d="M51 22 C53 23, 53 25, 51 26" stroke-width="1.6" />
              <path d="M54 20 C57 22, 57 26, 54 28" stroke-width="1.4" />
            </g>
          </template>
          <template v-else>
            <path d="M32 36 C26 40, 22 45, 20 50" />
            <g class="wave-arm">
              <path d="M32 36 C40 35, 45 31, 48 25" />
              <path d="M51 22 C53 23, 53 25, 51 26" stroke-width="1.6" />
              <path d="M54 20 C57 22, 57 26, 54 28" stroke-width="1.4" />
            </g>
          </template>

          <!-- Legs: dangling seated pose when on a button, standing/jumping otherwise -->
          <template v-if="isPoked">
            <path d="M32 53 L21 66" />
            <path d="M32 53 L43 66" />
          </template>
          <template v-else-if="isSitting">
            <!-- Thighs resting on button edge, shins dangling down with subtle swing -->
            <path class="sit-leg-left" d="M32 53 L25 55 L24 68" />
            <path class="sit-leg-right" d="M32 53 L39 55 L40 68" />
          </template>
          <template v-else>
            <path d="M32 53 L24 71" />
            <path d="M32 53 L40 71" />
          </template>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.stickman-companion {
  transition: none;
}

.stickman-companion.is-hopping {
  transition:
    left 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    top 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.stickman-companion.is-margin {
  transition: top 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.stickman-btn {
  transition: transform 0.25s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.stickman-btn.is-poked {
  transform: translateY(-10px) scale(1.06);
  transition: transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.wave-arm {
  transform-origin: 32px 36px;
  animation: gentle-wave 2.4s ease-in-out infinite;
}

@keyframes gentle-wave {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(4deg);
  }
  75% {
    transform: rotate(-6deg);
  }
}

.sit-leg-left {
  transform-origin: 25px 55px;
  animation: leg-swing-a 2.2s ease-in-out infinite;
}

.sit-leg-right {
  transform-origin: 39px 55px;
  animation: leg-swing-b 2.2s ease-in-out infinite;
}

@keyframes leg-swing-a {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(6deg);
  }
}

@keyframes leg-swing-b {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-6deg);
  }
}

.bubble-enter-active,
.bubble-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.bubble-enter-from,
.bubble-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.95);
}

@media (prefers-reduced-motion: reduce) {
  .stickman-companion,
  .stickman-btn,
  .wave-arm,
  .sit-leg-left,
  .sit-leg-right {
    animation: none !important;
    transition: none !important;
  }
}
</style>
