<script setup lang="ts">
interface IPickerOption {
  label: string
  value: string
}

interface IProps {
  visible: boolean
  options: IPickerOption[]
  selectedValue: string
}

defineProps<IProps>()

const emit = defineEmits<{
  'update:selectedValue': [value: string]
  accept: []
  cancel: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="fixed inset-0 bg-black/40 z-50" @click="emit('cancel')" />
    </Transition>

    <Transition name="slide-up">
      <div v-if="visible" class="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 overflow-hidden">
        <div class="flex justify-center pt-3 pb-1">
          <div class="w-10 h-1 rounded-full bg-gray-25" />
        </div>

        <div class="flex flex-row justify-between items-center px-base py-sm bg-gray-21">
          <button type="button" class="text-md font-semibold text-blue" @click="emit('accept')">
            Aceptar
          </button>
          <button type="button" class="text-md font-semibold text-blue" @click="emit('cancel')">
            Cancelar
          </button>
        </div>

        <ul class="max-h-60 overflow-y-auto py-2">
          <li v-for="option in options" :key="option.value"
            class="flex items-center justify-center h-11 cursor-pointer hover:bg-gray-10 transition-colors" :class="{
              'font-semibold text-secondary': option.value === selectedValue,
              'font-normal text-gray-40': option.value !== selectedValue,
            }" @click="emit('update:selectedValue', option.value)">
            {{ option.label }}
          </li>
        </ul>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-leave-active {
  transition: transform 0.22s cubic-bezier(0.4, 0, 1, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
