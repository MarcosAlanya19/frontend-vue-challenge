<script setup lang="ts">
interface IProps {
  text: string
}

const props = defineProps<IProps>()

const copied = ref(false)

async function handleCopy() {
  if (!props.text) return
  await navigator.clipboard.writeText(props.text)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <button type="button" class="text-gray-40 hover:text-secondary transition-colors" @click="handleCopy">
    <Icon v-if="copied" name="heroicons:check" class="w-4 h-4 text-green-500" />
    <IconsCopySvg v-else class="w-4 h-4" />
  </button>
</template>
