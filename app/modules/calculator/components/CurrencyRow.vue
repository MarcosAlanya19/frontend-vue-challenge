<script setup lang="ts">
interface IProps {
  label: string
  currencyLabel: string
  amount: string
  isCalculating?: boolean
}

defineProps<IProps>()
const emit = defineEmits<{ (e: 'update:amount', value: string): void }>()

const onInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  const cleaned = input.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
  input.value = cleaned
  emit('update:amount', cleaned)
}

const onPaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const text = e.clipboardData?.getData('text') ?? ''
  const cleaned = text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
  ;(e.target as HTMLInputElement).value = cleaned
  emit('update:amount', cleaned)
}
</script>

<template>
  <div class="flex overflow-hidden rounded-md">
    <div class="flex-1 px-lg py-lg bg-gray-10">
      <UiBaseText size="base" weight="medium" color="secondary">{{ label }}</UiBaseText>
      <div class="mt-sm h-7 flex items-center">
        <div v-if="isCalculating"
          class="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
        <input v-else type="text" inputmode="decimal" :value="amount" placeholder="0"
          class="w-full bg-transparent text-secondary font-bold outline-none placeholder:text-gray-40 border-0 ring-0 focus:ring-0 p-0 shadow-none"
          style="font-size: 20px; line-height: 1;"
          @input="onInput" @paste="onPaste" />
      </div>
    </div>
    <button type="button" class="w-32 bg-secondary flex items-center justify-center gap-xs shrink-0">
      <UiBaseText weight="bold" size="md" color="white" class="lg:text-xl">{{ currencyLabel }}</UiBaseText>
    </button>
  </div>
</template>
