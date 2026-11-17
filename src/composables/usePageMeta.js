// src/composables/usePageMeta.js
import { computed, unref } from 'vue'
import { useHead } from '@unhead/vue'
import profile from '@/content/profile.js'
import { SITE_URL, DEFAULT_TITLE, DEFAULT_DESC } from '@/lib/site.js'

function resolveValue(val) {
  if (typeof val === 'function') return val()
  return unref(val)
}

function toAbsoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return null
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }
  const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${SITE_URL}${cleanPath}`
}

export function usePageMeta({ title, description, image, url } = {}) {
  const resolvedTitle = computed(() => {
    const t = resolveValue(title)
    if (!t) return DEFAULT_TITLE
    return `${t} — Zibril Yuan Afrianto`
  })

  const resolvedDesc = computed(() => {
    const d = resolveValue(description)
    return d || DEFAULT_DESC
  })

  const resolvedImage = computed(() => {
    const img = resolveValue(image)
    return toAbsoluteUrl(img) || toAbsoluteUrl(profile.avatar)
  })

  const resolvedUrl = computed(() => {
    const u = resolveValue(url)
    return toAbsoluteUrl(u) || SITE_URL
  })

  useHead({
    title: resolvedTitle,
    link: [
      { rel: 'canonical', href: resolvedUrl }
    ],
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
