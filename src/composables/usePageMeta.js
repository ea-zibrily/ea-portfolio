// src/composables/usePageMeta.js
import { useHead } from '@unhead/vue'

export function usePageMeta({ title, description, image, url } = {}) {
  const siteName = 'Zibril Yuan Afrianto'
  const defaultDesc = 'Portfolio of Zibril Yuan Afrianto (ea), Unity Game Programmer specializing in game mechanics, physics, and mobile optimization.'
  const fullTitle = title ? `${title} — ${siteName}` : `${siteName} — Unity Game Programmer`
  const metaDesc = description || defaultDesc

  useHead({
    title: fullTitle,
    meta: [
      { name: 'description', content: metaDesc },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: metaDesc },
      { property: 'og:type', content: 'website' },
      ...(image ? [{ property: 'og:image', content: image }] : []),
      ...(url ? [{ property: 'og:url', content: url }] : []),
      { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: metaDesc },
      ...(image ? [{ name: 'twitter:image', content: image }] : [])
    ]
  })
}
