<script setup lang="ts">
interface IProps {
  checked: boolean
  label?: string
}

defineProps<IProps>()

const emit = defineEmits<{
  'update:checked': [value: boolean]
}>()
</script>

<template>
  <button type="button" class="flex flex-row items-center gap-2 cursor-pointer"
    @click="emit('update:checked', !checked)">
    <div class="w-5 h-5 rounded flex items-center justify-center border transition-colors" :class="{
      'bg-secondary border-secondary': checked,
      'bg-white border-gray-25': !checked,
    }">
      <svg v-if="checked" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" viewBox="0 0 20 20"
        fill="currentColor">
        <path fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
          clip-rule="evenodd" />
      </svg>
    </div>
    <span v-if="label" class="text-base font-normal text-secondary">{{ label }}</span>
  </button>
</template>
