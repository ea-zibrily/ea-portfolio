<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  align: {
    type: String,
    default: 'left',
    validator: (v) => ['left', 'center'].includes(v)
  }
})
</script>

<template>
  <header class="mb-8" :class="{ 'text-center': align === 'center', 'text-left': align === 'left' }">
    <div
      class="text-2xl font-bold text-text mb-2 flex items-center gap-3"
      :class="{ 'justify-center': align === 'center', 'justify-start': align === 'left' }"
    >
      <h2>{{ title }}</h2>
      <div class="h-[2px] w-16 md:w-32 bg-primary/60 rounded-full"></div>
    </div>
    <p v-if="subtitle" class="text-sm md:text-base text-text-muted">
      {{ subtitle }}
    </p>
  </header>
</template>

<style scoped>
h2 {
  letter-spacing: -0.02em;
}
</style>
