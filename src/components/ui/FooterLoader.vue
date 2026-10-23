<script setup>
// FooterLoader.vue: Playful developer-themed loading dots animation
// Features desk, keyboard, laptop, and chair hopping in a smooth wave sequence.
</script>

<template>
  <div
    class="footer-loader flex items-center gap-3 sm:gap-4 px-3 py-1.5 rounded-full border border-border/40 bg-surface/40 select-none shadow-2xs"
    role="status"
    aria-label="Developer workstation loading animation"
  >
    <!-- 1. Desk -->
    <div class="loader-item item-desk" title="Desk">
      <svg
        viewBox="0 0 24 24"
        class="w-5 h-5 text-primary"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <!-- Table Top -->
        <line x1="2" y1="8" x2="22" y2="8" stroke-width="2" />
        <!-- Table Legs -->
        <line x1="5" y1="8" x2="5" y2="20" />
        <line x1="19" y1="8" x2="19" y2="20" />
        <!-- Drawer / Stretcher Bar -->
        <line x1="5" y1="12" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="15" />
        <line x1="5" y1="15" x2="12" y2="15" />
      </svg>
    </div>

    <!-- 2. Keyboard -->
    <div class="loader-item item-keyboard" title="Keyboard">
      <svg
        viewBox="0 0 24 24"
        class="w-5 h-5 text-primary"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <!-- Keyboard Frame -->
        <rect x="2" y="6" width="20" height="13" rx="2" stroke-width="1.75" />
        <!-- Keys Row 1 -->
        <line x1="5.5" y1="9.5" x2="7" y2="9.5" stroke-width="2" />
        <line x1="9.5" y1="9.5" x2="11" y2="9.5" stroke-width="2" />
        <line x1="13.5" y1="9.5" x2="15" y2="9.5" stroke-width="2" />
        <line x1="17.5" y1="9.5" x2="18.5" y2="9.5" stroke-width="2" />
        <!-- Keys Row 2 -->
        <line x1="5.5" y1="12.5" x2="7" y2="12.5" stroke-width="2" />
        <line x1="9.5" y1="12.5" x2="11" y2="12.5" stroke-width="2" />
        <line x1="13.5" y1="12.5" x2="15" y2="12.5" stroke-width="2" />
        <line x1="17.5" y1="12.5" x2="18.5" y2="12.5" stroke-width="2" />
        <!-- Spacebar -->
        <line x1="8" y1="15.5" x2="16" y2="15.5" stroke-width="2" />
      </svg>
    </div>

    <!-- 3. Laptop -->
    <div class="loader-item item-laptop" title="Laptop">
      <svg
        viewBox="0 0 24 24"
        class="w-5 h-5 text-primary"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <!-- Screen Frame -->
        <rect x="4" y="4" width="16" height="11" rx="1.5" stroke-width="1.75" />
        <!-- Screen Display Details / Code brackets hint -->
        <line x1="8" y1="8" x2="10" y2="9.5" stroke-width="1.5" />
        <line x1="10" y1="9.5" x2="8" y2="11" stroke-width="1.5" />
        <line x1="12" y1="11" x2="15" y2="11" stroke-width="1.5" />
        <!-- Base Keyboard Bed -->
        <path d="M 2 17.5 L 4 19.5 H 20 L 22 17.5 Z" stroke-width="1.75" />
        <line x1="10" y1="17.5" x2="14" y2="17.5" stroke-width="2" />
      </svg>
    </div>

    <!-- 4. Chair -->
    <div class="loader-item item-chair" title="Office Chair">
      <svg
        viewBox="0 0 24 24"
        class="w-5 h-5 text-primary"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <!-- Head / Backrest -->
        <rect x="7" y="3" width="10" height="8" rx="2" stroke-width="1.75" />
        <!-- Seat Cushion -->
        <line x1="5" y1="13" x2="19" y2="13" stroke-width="2.5" />
        <!-- Vertical Gas Lift Cylinder -->
        <line x1="12" y1="14" x2="12" y2="18" stroke-width="2" />
        <!-- 5-Star Wheel Base -->
        <path d="M 6 20.5 L 12 18 L 18 20.5" stroke-width="1.75" />
        <!-- Casters -->
        <circle cx="6" cy="21" r="0.8" fill="currentColor" />
        <circle cx="12" cy="18.5" r="0.8" fill="currentColor" />
        <circle cx="18" cy="21" r="0.8" fill="currentColor" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.loader-item {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: wave-bounce 1.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
  will-change: transform, opacity;
}

.item-desk {
  animation-delay: 0s;
}

.item-keyboard {
  animation-delay: 0.18s;
}

.item-laptop {
  animation-delay: 0.36s;
}

.item-chair {
  animation-delay: 0.54s;
}

@keyframes wave-bounce {
  0%, 100% {
    transform: translateY(0) scale(0.92);
    opacity: 0.4;
  }
  45% {
    transform: translateY(-8px) scale(1.1);
    opacity: 1;
  }
  60% {
    transform: translateY(-2px) scale(1.02);
    opacity: 0.85;
  }
}

@media (prefers-reduced-motion: reduce) {
  .loader-item {
    animation: none !important;
    opacity: 0.75 !important;
    transform: none !important;
  }
}
</style>