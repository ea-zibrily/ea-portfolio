<script setup>
import NavBar from '@/components/layout/NavBar.vue'
import MobileTabBar from '@/components/layout/MobileTabBar.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-bg text-text">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] px-4 py-2 bg-primary text-primary-fg rounded-lg shadow-lg font-medium text-sm transition-transform"
    >
      Skip to main content
    </a>
    <NavBar />
    <main id="main-content" class="app-main flex-1">
      <router-view />
    </main>
    <SiteFooter />
    <MobileTabBar />
  </div>
</template>

<style scoped>
/* App shell styles */
</style>
