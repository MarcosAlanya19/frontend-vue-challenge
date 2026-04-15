<script setup lang="ts">
import { cn } from '~/utils/cn'

interface IProps {
  visible: boolean
  title: string
  description: string
  confirmLabel: string
}

defineProps<IProps>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" :class="cn('fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6')"
        @click.self="emit('cancel')">
        <div :class="cn('w-full max-w-sm bg-white rounded-2xl p-6 flex flex-col items-center gap-6')">
          <slot name="icon" />

          <div class="flex flex-col items-center gap-2">
            <UiBaseText as="p" size="xl" weight="bold" color="secondary" class="text-center">
              {{ title }}
            </UiBaseText>

            <UiBaseText as="p" size="base" weight="regular" color="gray-60" class="text-center leading-6">
              {{ description }}
            </UiBaseText>
          </div>

          <div class="flex flex-col w-full gap-4">
            <BaseButton variant="secondary" :label="confirmLabel" @click="emit('confirm')" />

            <button type="button" class="flex justify-center" @click="emit('cancel')">
              <UiBaseText size="base" weight="regular" color="secondary" class="underline">
                Cancelar
              </UiBaseText>
            </button>
          </div>
        </div>
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
</style>
