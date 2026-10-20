<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function redirectToHome() {
  router.push('/')
}
</script>

<template>
  <div class="max-w-7xl mx-auto flex flex-col relative min-h-screen">
    <nav class="max-w-7xl px-5 md:fixed top-0 z-[98] w-screen backdrop-blur-md bg-[#121212] bg-opacity-80">
      <div class="container mx-auto flex flex-wrap items-center justify-between">
        <button @click="redirectToHome" class="flex cursor-pointer bg-transparent border-0">
          <span class="self-center text-lg text-[#ffdb70] font-semibold whitespace-nowrap hover:text-amber-100">
            Zibril Portfolio
          </span>
        </button>
        <div class="flex md:order-2">
          <a href="https://github.com/ea-zibrily" target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <img
              class="w-9 rounded-full"
              src="https://www.logo.wine/a/logo/GitHub/GitHub-Icon-White-Dark-Background-Logo.wine.svg"
              alt="GitHub"
            />
          </a>
        </div>
        <div class="hidden md:flex justify-between items-center w-full md:w-auto md:order-1" id="mobile-menu-3">
          <ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            <li>
              <router-link
                to="/"
                class="text-gray-400 hover:text-white block pl-3 pr-4 py-2 md:p-0"
                aria-current="page"
              >
                Home
              </router-link>
            </li>
            <li>
              <router-link
                to="/about"
                class="text-gray-400 hover:text-white block pl-3 pr-4 py-2 md:p-0"
              >
                About
              </router-link>
            </li>
            <li>
              <router-link
                to="/portfolio"
                class="text-gray-400 hover:text-white block pl-3 pr-4 py-2 md:p-0"
              >
                Portfolio
              </router-link>
            </li>
            <li>
              <router-link
                to="/certificate"
                class="text-gray-400 hover:text-white block pl-3 pr-4 py-2 md:p-0"
              >
                Certificate
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="md:mt-[100px] flex-1">
      <router-view />
    </div>

    <footer
      class="block md:hidden fixed bottom-0 left-0 right-0 rounded-t-3xl border border-[#383838] bg-[#121212] bg-opacity-80 backdrop-blur-md backdrop-opacity-90 z-50"
    >
      <nav class="flex justify-around py-4 text-xs">
        <router-link to="/" class="text-gray-300 hover:text-white">Home</router-link>
        <router-link to="/about" class="text-gray-300 hover:text-white">About</router-link>
        <router-link to="/portfolio" class="text-gray-300 hover:text-white">Portfolio</router-link>
        <router-link to="/certificate" class="text-gray-300 hover:text-white">Certificate</router-link>
      </nav>
    </footer>
  </div>
</template>

<style scoped>
nav a.router-link-exact-active {
  color: white;
}

nav a.router-link-exact-active::after {
  display: block;
  content: "";
  margin-top: 0.2rem;
  width: 100%;
  height: 2px;
  border-radius: 1px;
  background-color: var(--primary);
}
</style>
