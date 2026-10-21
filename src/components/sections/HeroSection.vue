<script setup>
import { ref, onMounted } from 'vue'
import profile from '@/content/profile.js'
import CvButton from '@/components/ui/CvButton.vue'
import { useScrollSpy } from '@/composables/useScrollSpy.js'

const { scrollTo } = useScrollSpy()
const typewriter = ref(null)
const toRotate = profile.roles
const period = 2000
const txt = ref('')
let loopNum = 0
let isDeleting = false

function tick() {
  const i = loopNum % toRotate.length
  const fullTxt = toRotate[i]

  txt.value = isDeleting
    ? fullTxt.substring(0, txt.value.length - 1)
    : fullTxt.substring(0, txt.value.length + 1)

  let delta = 200 - Math.random() * 100

  if (isDeleting) {
    delta /= 2
  }

  if (!isDeleting && txt.value === fullTxt) {
    delta = period
    isDeleting = true
  } else if (isDeleting && txt.value === '') {
    isDeleting = false
    loopNum++
    delta = 500
  }

  setTimeout(() => {
    tick()
  }, delta)
}

onMounted(() => {
  tick()
})
</script>

<template>
  <section
    id="home"
    aria-label="Hero Introduction"
    class="scroll-mt-var(--nav-h) flex flex-col justify-between min-h-[calc(100vh-var(--nav-h))] pt-8 pb-6 px-4 md:px-8"
  >
    <div class="flex-1 flex items-center justify-center">
      <div class="w-full flex flex-col-reverse gap-8 items-center md:flex-row md:gap-10 lg:gap-14 md:justify-center">
        <div class="space-y-4 text-center md:text-left flex-1 max-w-2xl">
          <p class="font-mono text-primary font-medium tracking-wide text-sm sm:text-base">Hello World, I'm</p>
          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-text tracking-tight whitespace-nowrap">
            {{ profile.name }}
          </h1>
          <div class="py-1 min-h-[2.25rem] md:min-h-[2.75rem] flex items-center justify-center md:justify-start">
            <p
              ref="typewriter"
              class="typewrite text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent leading-normal"
            >
              <span class="wrap">{{ txt || '\u00A0' }}</span>
            </p>
            <span class="inline-block w-[2px] h-5 md:h-6 bg-primary ml-1 animate-pulse" aria-hidden="true"></span>
          </div>
          <p class="text-text-muted text-base md:text-lg leading-relaxed">
            {{ profile.intro }} <span class="wave inline-block">👋🏼</span>
          </p>

          <!-- CTAs -->
          <div class="pt-4 flex flex-wrap gap-3 justify-center md:justify-start items-center">
            <button
              @click="scrollTo('portfolio')"
              class="px-5 py-2.5 rounded-lg bg-primary text-primary-fg font-semibold hover:opacity-90 transition-all duration-200 shadow-sm cursor-pointer text-sm flex items-center gap-2"
            >
              <span>View My Work</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>

            <CvButton variant="outline" />

            <a
              :href="profile.github"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              class="p-2.5 rounded-lg border border-border hover:bg-surface text-text-muted hover:text-text transition-colors"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        <div class="flex justify-center shrink-0">
          <img
            alt="Avatar of Zibril Yuan Afrianto"
            fetchpriority="high"
            width="280"
            height="280"
            decoding="async"
            class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full border-4 border-primary shadow-xl object-cover shrink-0"
            :src="profile.avatar"
          />
        </div>
      </div>
    </div>

    <!-- Scroll cue pinned to bottom -->
    <div class="pt-8 pb-2 flex justify-center mt-auto">
      <button
        @click="scrollTo('about')"
        aria-label="Scroll to About section"
        class="text-text-muted hover:text-primary transition-colors flex flex-col items-center gap-1.5 text-xs cursor-pointer bg-transparent border-0 select-none group"
      >
        <span class="tracking-wider uppercase text-[11px] font-medium group-hover:text-primary transition-colors">Scroll Down</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 animate-bounce text-text-muted group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </div>
  </section>
</template>

<style scoped>
.wave {
  animation: wave-animation 2.5s infinite;
  transform-origin: 70% 70%;
}

@keyframes wave-animation {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
</style>
