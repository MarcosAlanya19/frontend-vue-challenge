<script setup lang="ts">
import { cn } from '~/lib/cn'

export type TextSize = 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl'
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold'
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'secondary-light'
  | 'secondary-lighter'
  | 'gray-40'
  | 'gray-60'
  | 'gray-25'
  | 'gray-66'
  | 'red'
  | 'green'
  | 'blue'
  | 'white'
  | 'brown'

interface IProps {
  size?: TextSize
  weight?: TextWeight
  color?: TextColor
  as?: string
  class?: string
}

const props = withDefaults(defineProps<IProps>(), {
  size: 'base',
  weight: 'regular',
  color: 'secondary',
  as: 'span',
})

const sizeClasses: Record<TextSize, string> = {
  sm: 'text-sm',
  base: 'text-base',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
}

const weightClasses: Record<TextWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const colorClasses: Record<TextColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  'secondary-light': 'text-secondary-light',
  'secondary-lighter': 'text-secondary-lighter',
  'gray-40': 'text-gray-40',
  'gray-25': 'text-gray-25',
  'gray-60': 'text-gray-60',
  'gray-66': 'text-gray-66',
  red: 'text-red',
  green: 'text-green',
  blue: 'text-blue',
  white: 'text-white',
  brown: 'text-brown',
}
</script>

<template>
  <component :is="as" :class="cn(
    'tracking-[0]',
    sizeClasses[size],
    weightClasses[weight],
    colorClasses[color],
    props.class
  )">
    <slot />
  </component>
</template>
