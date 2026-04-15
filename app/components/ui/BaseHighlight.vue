<script setup lang="ts">
type HighlightVariant = 'info' | 'warning'

interface IProps {
  variant?: HighlightVariant
}

withDefaults(defineProps<IProps>(), {
  variant: 'info',
})

const variantConfig: Record<HighlightVariant, { container: string; iconColor: string }> = {
  info: {
    container: 'bg-blue-ultra-light',
    iconColor: '#082774',
  },
  warning: {
    container: 'bg-brown-light',
    iconColor: '#7B3F0A',
  },
}
</script>

<template>
  <div class="flex flex-row gap-3 p-3 rounded-xl items-center" :class="variantConfig[variant].container">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0"
      :style="{ color: variantConfig[variant].iconColor }" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 9a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z"
        clip-rule="evenodd" />
    </svg>

    <div class="flex-1 text-sm font-medium text-secondary">
      <slot />
    </div>
  </div>
</template>
