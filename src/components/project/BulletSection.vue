<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <section v-if="items && items.length > 0" class="space-y-4">
    <h2 class="text-xl sm:text-2xl font-bold text-text tracking-tight flex items-center gap-3">
      <span>{{ title }}</span>
      <span class="h-[2px] w-12 bg-primary/40 rounded-full"></span>
    </h2>

    <ul class="space-y-2.5 pl-1">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-start gap-3 text-sm sm:text-base text-text-muted leading-relaxed"
      >
        <svg
          class="w-2.5 h-2.5 text-primary shrink-0 mt-[0.38em]"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M3 2.5L9 6L3 9.5Z" />
        </svg>
        <span>{{ item }}</span>
      </li>
    </ul>
  </section>
</template>
