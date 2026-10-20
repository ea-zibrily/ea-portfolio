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
        <span class="text-primary font-bold shrink-0 mt-1">▹</span>
        <span>{{ item }}</span>
      </li>
    </ul>
  </section>
</template>
