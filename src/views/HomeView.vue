<script setup>
import { ref, onMounted } from 'vue'
import profile from '@/content/profile.js'

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
  <main
    class="mt-10 md:mt-1 flex flex-col-reverse gap-8 items-center md:flex-row md:gap-16 md:justify-center min-h-[65vh] md:min-h-[80vh]"
  >
    <div class="space-y-2 text-center md:text-left px-10">
      <p class="text-amber-200">Hello World, I'm</p>
      <h1 class="text-4xl font-bold md:text-5xl text-white">{{ profile.name }}</h1>
      <div class="py-2">
        <h2
          ref="typewriter"
          class="typewrite text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-yellow-500 md:text-2xl"
        >
          <span class="wrap">{{ txt }}</span>
        </h2>
      </div>
      <p class="text-white pr-4">{{ profile.intro }} <span class="wave">👋🏼</span></p>
      <div class="pt-4 flex gap-3 justify-center md:justify-start">
        <a
          :href="profile.cv.href"
          :download="profile.cv.filename"
          class="flex items-center py-2 px-4 text-sm font-medium rounded-lg border transition duration-300 text-amber-200 border-amber-200 hover:bg-amber-200 hover:bg-opacity-10 bg-transparent focus:outline-none w-fit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="mr-2 w-4 h-4">
            <path
              fill-rule="evenodd"
              d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
              clip-rule="evenodd"
            ></path>
            <path
              d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z"
            ></path>
          </svg>
          Download CV
        </a>
      </div>
    </div>
    <div class="flex justify-center md:justify-start">
      <img
        alt="avatar"
        fetchpriority="high"
        width="300"
        height="300"
        decoding="async"
        class="w-10/12 md:h-auto rounded-full border-4 border-amber-200"
        :src="profile.avatar"
      />
    </div>
  </main>
</template>

<style scoped>
.wave {
  display: inline-block;
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
