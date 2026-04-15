<script setup lang="ts">
import { cn } from '~/utils/cn'

type ButtonVariant = 'primary' | 'secondary'

interface IProps {
  label: string
  variant?: ButtonVariant
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<IProps>(), {
  variant: 'primary',
  disabled: false,
  type: 'button',
})

const textColor = computed(() => {
  if (props.disabled) return 'gray-40'
  return props.variant === 'secondary' ? 'white' : 'secondary'
})

</script>

<template>
  <button :type="type" :disabled="disabled" :class="cn(
    'h-14 w-full rounded-md flex items-center justify-center transition-opacity active:opacity-80 cursor-pointer disabled:cursor-not-allowed',
    disabled && 'bg-primary-ultra-light',
    !disabled && variant === 'primary' && 'bg-primary',
    !disabled && variant === 'secondary' && 'bg-secondary',
  )">
    <UiBaseText size="base" weight="semibold" :color="textColor">
      {{ label.toUpperCase() }}
    </UiBaseText>
  </button>
</template>
