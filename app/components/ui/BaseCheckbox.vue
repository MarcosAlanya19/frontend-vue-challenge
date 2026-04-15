<script setup lang="ts">
import { cn } from '~/lib/cn'

interface IProps {
  checked: boolean
}

defineProps<IProps>()

const emit = defineEmits<{
  'update:checked': [value: boolean]
}>()
</script>

<template>
  <button type="button" class="flex flex-row items-center gap-2 cursor-pointer group select-none"
    @click="emit('update:checked', !checked)">
    <div :class="cn(
      'w-5 h-5 rounded flex items-center justify-center border transition-all duration-200',
      checked ? 'bg-secondary border-secondary shadow-sm' : 'bg-white border-gray-25 group-hover:border-gray-40'
    )">
      <Icon v-if="checked" name="lucide:check" class="w-3.5 h-3.5 text-white stroke-[3]" />
    </div>

    <div v-if="$slots.default" class="flex-1 text-left">
      <UiBaseText as="p" size="base" weight="regular" color="secondary">
        <slot />
      </UiBaseText>
    </div>
  </button>
</template>
