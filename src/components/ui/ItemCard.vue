<template>
  <div
    class="item-card flex flex-col items-center gap-2 rounded-xl bg-surface hover:bg-surface-hover border border-border text-text transition-colors duration-200 p-5 md:gap-3"
  >
    <div v-if="$slots.image" class="w-full flex items-center justify-center zoom-in overflow-hidden rounded-lg">
      <slot name="image" />
    </div>
    <div class="w-full flex flex-col gap-2 items-center text-sm md:text-base lg:text-lg mt-2">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: [String, Number],
    default: null
  }
})
</script>

<style scoped>
.item-card {
  will-change: transform;
}
</style>
