<script setup lang="ts">
interface Props {
  buyRate: number
  sellRate: number
  isLoading: boolean
  isCompra: boolean
}

import { formatRate } from '~/lib/currency'

defineProps<Props>()
const emit = defineEmits<{ (e: 'toggle', isCompra: boolean): void }>()

const fmt = (n: number) => n > 0 ? formatRate(n) : '—'
</script>

<template>
  <div class="flex">
    <button type="button" :class="[
      'flex-1 py-4 transition-colors',
      isCompra ? 'bg-secondary' : 'bg-white',
    ]" @click="emit('toggle', true)">
      <UiBaseText class="lg:text-[18px]" weight="bold" size="base" :color="isCompra ? 'white' : 'gray-40'">
        Compra: {{ fmt(buyRate) }}
      </UiBaseText>
    </button>
    <button type="button" :class="[
      'flex-1 py-4 transition-colors',
      !isCompra ? 'bg-secondary' : 'bg-white',
    ]" @click="emit('toggle', false)">
      <UiBaseText class="lg:text-[18px]" weight="bold" size="base" :color="!isCompra ? 'white' : 'gray-40'">
        Venta: {{ fmt(sellRate) }}
      </UiBaseText>
    </button>
  </div>
</template>
