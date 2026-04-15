<script setup lang="ts">
import { cn } from '~/lib/cn'

type HighlightVariant = 'info' | 'warning'

interface IProps {
  variant?: HighlightVariant
}

const props = withDefaults(defineProps<IProps>(), {
  variant: 'info',
})

const variantClasses = {
  info: {
    container: 'bg-blue-ultra-light border-blue/5',
    icon: 'text-blue',
    iconName: 'lucide:info'
  },
  warning: {
    container: 'bg-brown-light border-brown/5',
    icon: 'text-brown',
    iconName: 'lucide:alert-circle'
  },
}

const config = computed(() => variantClasses[props.variant])
</script>

<template>
  <div :class="cn(
    'flex flex-row gap-3 p-3 rounded-xl items-center border transition-all duration-300',
    config.container
  )">
    <Icon :name="config.iconName" :class="cn('w-5 h-5 shrink-0', config.icon)" />

    <div class="flex-1">
      <UiBaseText as="p" size="sm" weight="medium" color="secondary">
        <slot />
      </UiBaseText>
    </div>
  </div>
</template>
