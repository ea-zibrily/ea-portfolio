<script setup>
import NavBar from '@/components/layout/NavBar.vue'
import MobileTabBar from '@/components/layout/MobileTabBar.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-bg text-text">
    <NavBar />
    <main class="app-main flex-1">
      <router-view />
    </main>
    <SiteFooter />
    <MobileTabBar />
  </div>
</template>

<style scoped>
/* App shell styles */
</style>
