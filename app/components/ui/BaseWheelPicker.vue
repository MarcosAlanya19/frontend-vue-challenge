<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind, onClickOutside } from '@vueuse/core'

interface IOption {
  label: string
  value: string
}

interface IProps {
  visible: boolean
  options: IOption[]
  selectedValue?: string
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  'update:selectedValue': [value: string]
  accept: []
  cancel: []
}>()

const ITEM_HEIGHT = 48
const VISIBLE_ITEMS = 5
const PADDING_ITEMS = Math.floor(VISIBLE_ITEMS / 2)

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greaterOrEqual('lg')

// Desktop dropdown ref
const dropdownRef = ref<HTMLElement | null>(null)
onClickOutside(dropdownRef, () => {
  if (isDesktop.value && props.visible) emit('cancel')
})

// Wheel state
const wheelRef = ref<HTMLElement | null>(null)
const currentIndex = ref(0)

const syncIndexFromValue = () => {
  const idx = props.options.findIndex(o => o.value === props.selectedValue)
  currentIndex.value = idx >= 0 ? idx : 0
}

watch(() => props.visible, (val) => {
  if (val) {
    syncIndexFromValue()
    nextTick(() => scrollToIndex(currentIndex.value, false))
  }
})

const scrollToIndex = (idx: number, smooth = true) => {
  if (!wheelRef.value) return
  wheelRef.value.scrollTo({
    top: idx * ITEM_HEIGHT,
    behavior: smooth ? 'smooth' : 'instant',
  })
}

const onScroll = () => {
  if (!wheelRef.value) return
  const idx = Math.round(wheelRef.value.scrollTop / ITEM_HEIGHT)
  const clamped = Math.max(0, Math.min(idx, props.options.length - 1))
  currentIndex.value = clamped
  const option = props.options[clamped]
  if (option) emit('update:selectedValue', option.value)
}

const handleAccept = () => {
  emit('update:selectedValue', props.options[currentIndex.value]?.value ?? '')
  emit('accept')
}

// Desktop: select immediately
const handleDesktopSelect = (val: string) => {
  emit('update:selectedValue', val)
  emit('accept')
}
</script>

<template>
  <Teleport to="body" :disabled="isDesktop">
    <!-- MOBILE: Wheel picker -->
    <template v-if="!isDesktop">
      <Transition name="fade">
        <div v-if="visible" class="fixed inset-0 bg-black/40 z-50" @click="emit('cancel')" />
      </Transition>

      <Transition name="slide-up">
        <div v-if="visible" class="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 shadow-2xl">
          <!-- Actions -->
          <div class="flex items-center justify-between px-6 py-2 bg-gray-21">
            <button type="button" class="text-blue-400 font-semibold text-md text-sky-500" @click="handleAccept">
              Aceptar
            </button>
            <button type="button" class="text-blue-400 font-semibold text-md text-sky-500" @click="emit('cancel')">
              Cancelar
            </button>
          </div>

          <!-- Wheel -->
          <div class="relative" :style="{ height: `${ITEM_HEIGHT * VISIBLE_ITEMS}px` }">
            <!-- Selection highlight -->
            <div class="absolute left-0 right-0 pointer-events-none border-t border-b border-gray-200 bg-gray-50/60"
              :style="{
                top: `${ITEM_HEIGHT * PADDING_ITEMS}px`,
                height: `${ITEM_HEIGHT}px`,
              }" />

            <!-- Scrollable wheel -->
            <div ref="wheelRef" class="h-full overflow-y-scroll"
              style="scroll-snap-type: y mandatory; -webkit-overflow-scrolling: touch;" @scroll.passive="onScroll">
              <!-- top padding -->
              <div :style="{ height: `${ITEM_HEIGHT * PADDING_ITEMS}px` }" />

              <div v-for="(option, idx) in options" :key="option.value"
                class="flex items-center justify-center select-none cursor-pointer transition-all duration-150"
                :style="{ height: `${ITEM_HEIGHT}px`, scrollSnapAlign: 'center' }"
                @click="() => { currentIndex = idx; scrollToIndex(idx) }">
                <span :class="[
                  'transition-all duration-150',
                  idx === currentIndex
                    ? 'text-secondary font-semibold text-xl'
                    : Math.abs(idx - currentIndex) === 1
                      ? 'text-gray-400 text-base'
                      : 'text-gray-300 text-sm',
                ]">
                  {{ option.label }}
                </span>
              </div>

              <!-- bottom padding -->
              <div :style="{ height: `${ITEM_HEIGHT * PADDING_ITEMS}px` }" />
            </div>
          </div>
        </div>
      </Transition>
    </template>

    <!-- DESKTOP: Dropdown -->
    <Transition v-else name="fade-scale">
      <div v-if="visible" ref="dropdownRef"
        class="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-25 z-[60] py-2 overflow-y-auto max-h-64">
        <ul class="flex flex-col">
          <li v-for="option in options" :key="option.value"
            class="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-10 transition-colors"
            :class="option.value === selectedValue ? 'bg-gray-10/50' : ''" @click="handleDesktopSelect(option.value)">
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
div[style*="scroll-snap-type"]::-webkit-scrollbar {
  display: none;
}

div[style*="scroll-snap-type"] {
  scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
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
