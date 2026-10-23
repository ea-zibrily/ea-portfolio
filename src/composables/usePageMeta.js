// src/composables/usePageMeta.js
import { computed, unref } from 'vue'
import { useHead } from '@unhead/vue'

function resolveValue(val) {
  if (typeof val === 'function') return val()
  return unref(val)
}

export function usePageMeta({ title, description, image, url } = {}) {
  const siteName = 'Ea Portfolio'
  const defaultDesc =
    'Portfolio of Zibril Yuan Afrianto (ea), Unity Game Programmer specializing in game mechanics, physics, and mobile optimization.'

  const resolvedTitle = computed(() => {
    const t = resolveValue(title)
    return t ? `${siteName} — ${t}` : `${siteName}`
  })

  const resolvedDesc = computed(() => {
    const d = resolveValue(description)
    return d || defaultDesc
  })

  const resolvedImage = computed(() => resolveValue(image))
  const resolvedUrl = computed(() => resolveValue(url))

  useHead({
    title: resolvedTitle,
    meta: [
      { name: 'description', content: resolvedDesc },
      { property: 'og:title', content: resolvedTitle },
      { property: 'og:description', content: resolvedDesc },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: resolvedImage },
      { property: 'og:url', content: resolvedUrl },
      {
        name: 'twitter:card',
        content: computed(() => (resolvedImage.value ? 'summary_large_image' : 'summary'))
      },
      { name: 'twitter:title', content: resolvedTitle },
      { name: 'twitter:description', content: resolvedDesc },
      { name: 'twitter:image', content: resolvedImage }
    ]
  })
}
