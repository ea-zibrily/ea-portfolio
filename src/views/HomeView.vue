<script setup>
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import PortfolioSection from '@/components/sections/PortfolioSection.vue'
import CertificateSection from '@/components/sections/CertificateSection.vue'
import { useScrollSpy } from '@/composables/useScrollSpy.js'

// Initialize scroll-spy for the home page
useScrollSpy()
</script>

<template>
  <div class="home-view max-w-6xl mx-auto space-y-16 md:space-y-24">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <PortfolioSection />
    <CertificateSection />
  </div>
</template>

<style scoped>
.home-view {
  width: 100%;
}
</style>
