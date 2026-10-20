<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'default', // 'default' | 'primary' | 'subtle'
    validator: (v) => ['default', 'primary', 'subtle'].includes(v)
  }
})
</script>

<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors"
    :class="{
      'bg-tag text-text-muted border border-border': variant === 'default',
      'bg-primary/10 text-primary border border-primary/30': variant === 'primary',
      'bg-surface-hover text-text-muted text-[11px]': variant === 'subtle'
    }"
  >
    {{ label }}
  </span>
</template>
