<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind, onClickOutside } from '@vueuse/core'
import { cn } from '~/lib/cn'

interface IPickerOption {
  label: string
  value: string
}

interface IProps {
  visible: boolean
  options: IPickerOption[]
  selectedValue?: string
  title?: string
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  'update:selectedValue': [value: string]
  accept: []
  cancel: []
}>()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greaterOrEqual('lg')

const pickerRef = ref(null)
onClickOutside(pickerRef, () => {
  if (isDesktop.value && props.visible) emit('cancel')
})

function handleSelect(val: string) {
  emit('update:selectedValue', val)
  emit('accept')
}
</script>

<template>
  <Teleport to="body" :disabled="isDesktop">
    <!-- MOBILE: Bottom Sheet -->
    <template v-if="!isDesktop">
      <Transition name="fade">
        <div v-if="visible" class="fixed inset-0 bg-black/40 z-50 backdrop-blur-[2px]" @click="emit('cancel')" />
      </Transition>

      <Transition name="slide-up">
        <div v-if="visible"
          class="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 overflow-hidden shadow-2xl max-h-[80vh] flex flex-col">
          <div class="flex justify-center pt-3 pb-2">
            <div class="w-10 h-1.5 rounded-full bg-gray-25" />
          </div>

          <div v-if="title" class="px-9 pb-3 border-b border-gray-25">
            <UiBaseText size="base" weight="bold" color="secondary">{{ title }}</UiBaseText>
          </div>

          <div class="overflow-y-auto py-2">
            <ul class="flex flex-col ">
              <li v-for="option in options" :key="option.value"
                class="flex items-center px-9 py-2 cursor-pointer transition-colors active:bg-gray-10"
                @click="handleSelect(option.value)">
                <UiBaseText size="base" weight="regular" color="gray-60">
                  {{ option.label }}
                </UiBaseText>
              </li>
            </ul>
          </div>
          <div class="h-8 bg-white" />
        </div>
      </Transition>
    </template>

    <!-- DESKTOP: Dropdown -->
    <Transition v-else name="fade-scale">
      <div v-if="visible" ref="pickerRef"
        class="absolute  top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-25 z-[60] py-2 overflow-hidden overflow-y-auto max-h-64">
        <ul class="flex flex-col">
          <li v-for="option in options" :key="option.value" :class="cn(
            'flex  items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-10 transition-colors',
            option.value === selectedValue ? 'bg-gray-10/50' : ''
          )" @click="handleSelect(option.value)">
            <UiBaseText size="base" :weight="option.value === selectedValue ? 'semibold' : 'regular'"
              :color="option.value === selectedValue ? 'secondary' : 'gray-60'">
              {{ option.label }}
            </UiBaseText>
            <Icon v-if="option.value === selectedValue" name="lucide:check" class="w-4 h-4 text-primary stroke-[3]" />
          </li>
        </ul>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
</style>
