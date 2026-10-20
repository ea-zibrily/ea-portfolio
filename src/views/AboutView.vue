<script setup>
import { ref } from 'vue'
import profile from '@/content/profile.js'
import skills from '@/content/skills.js'

const activeTab = ref(1)
</script>

<template>
  <div
    class="bg-[#1e1e1f] px-5 py-5 md:px-12 md:py-10 text-left border border-[#383838] rounded-3xl text-amber-50 mx-3 mb-5"
  >
    <article data-page="about">
      <header>
        <div class="text-2xl font-bold text-white mb-5 title-section flex items-center">
          About Me &nbsp;
          <div class="h-[1px] w-32 bg-amber-200 md:w-96"></div>
        </div>
      </header>

      <section
        class="text-sm md:text-lg text-justify flex flex-col gap-4 md:flex-row md:gap-8 md:justify-left md:items-center"
      >
        <div class="flex justify-center">
          <img
            class="w-9/12 rounded-full mb-3"
            :src="profile.avatar"
            alt="Profile photo"
          />
        </div>
        <div class="md:w-7/12">
          <p v-for="(paragraph, index) in profile.bio" :key="index" class="mb-3 md:mb-7">
            &nbsp; &nbsp; &nbsp; {{ paragraph }}
          </p>
        </div>
      </section>
    </article>
  </div>

  <div class="px-5 py-5 md:px-12 md:py-10 text-left text-amber-50 mx-3">
    <article data-page="skills">
      <header>
        <div class="text-2xl font-bold text-white mb-5 title-section flex items-center">
          <div class="h-[1px] w-10 bg-amber-200 md:w-20"></div>
          &nbsp; Skills
        </div>
      </header>
      <section>
        <div>
          <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 mb-5">
            <li class="mr-2">
              <button
                class="inline-block px-4 py-3 rounded-lg hover:text-white"
                :class="{ 'text-amber-200 bg-amber-200 bg-opacity-10': activeTab === 1 }"
                @click="activeTab = 1"
              >
                Tech Stack
              </button>
            </li>
          </ul>
        </div>
        <div v-show="activeTab === 1">
          <div class="grid grid-cols-2 gap-4 pb-32 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-10 2xl:gap-12">
            <div v-for="item in skills" :key="item.id">
              <div
                class="item-tech flex cursor-pointer items-center gap-2 rounded border border-amber-200 px-2 py-2 hover:bg-amber-200 hover:bg-opacity-10 md:gap-3 lg:px-3"
              >
                <div class="flex h-12 w-12 items-center justify-center p-0 lg:h-16 lg:w-16 lg:p-2 zoom-in">
                  <img
                    :alt="item.name"
                    loading="lazy"
                    width="32"
                    height="32"
                    decoding="async"
                    class="img-tech drop-shadow-xl transition-all duration-300 h-[65%] w-[65%] lg:h-[85%] lg:w-[85%]"
                    :src="item.imageUrl"
                  />
                </div>
                <div class="flex flex-col text-left">
                  <div class="text-sm font-semibold text-white">{{ item.name }}</div>
                  <div class="text-xs text-gray-400">{{ item.status }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped>
.item-tech:hover .img-tech {
  transform: scale(1.1);
}
</style>
