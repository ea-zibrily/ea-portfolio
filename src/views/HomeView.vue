<script setup>
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import PortfolioSection from '@/components/sections/PortfolioSection.vue'
import CertificateSection from '@/components/sections/CertificateSection.vue'
import { useScrollSpy } from '@/composables/useScrollSpy.js'
import { usePageMeta } from '@/composables/usePageMeta.js'
import { useHead } from '@unhead/vue'
import profile from '@/content/profile.js'

// Initialize scroll-spy for the home page
useScrollSpy()

// Home page meta & OpenGraph tags
usePageMeta({
  title: 'Unity Game Programmer & Software Engineer',
  description: `${profile.intro} ${profile.bio[0]}`,
  image: profile.avatar,
  url: 'https://ea-portfolio.netlify.app'
})

// Schema.org JSON-LD Structured Data
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': 'https://ea-portfolio.netlify.app/#person',
            name: profile.name,
            alternateName: profile.nickname,
            jobTitle: 'Unity Game Programmer',
            url: 'https://ea-portfolio.netlify.app',
            image: `https://ea-portfolio.netlify.app${profile.avatar}`,
            sameAs: [profile.github]
          },
          {
            '@type': 'WebSite',
            '@id': 'https://ea-portfolio.netlify.app/#website',
            url: 'https://ea-portfolio.netlify.app',
            name: `${profile.name} — Portfolio`,
            publisher: { '@id': 'https://ea-portfolio.netlify.app/#person' }
          }
        ]
      })
    }
  ]
})
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
