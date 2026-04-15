<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useErrorStore } from '~/stores/error'

const SUPPORT_WHATSAPP = 'https://wa.me/51900000000'

const errorStore = useErrorStore()
const { error } = storeToRefs(errorStore)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="error" class="fixed inset-0 bg-black/40 z-50" @click.self="errorStore.clearError()" />
    </Transition>

    <Transition name="slide-up">
      <div v-if="error"
        class="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 p-6 flex flex-col items-center gap-5 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:w-[400px]">
        <div class="flex justify-center pt-1 sm:hidden">
          <div class="w-10 h-1.5 rounded-full bg-gray-25" />
        </div>

        <UiBaseText as="p" size="xl" weight="bold" color="secondary" class="text-center">
          {{ error.title }}
        </UiBaseText>

        <UiBaseText as="p" size="base" weight="regular" color="gray-60" class="text-center leading-6">
          {{ error.message }}
        </UiBaseText>

        <div class="w-full">
          <UiBaseButton label="Aceptar" variant="secondary" type="button" @click="errorStore.clearError()" />
        </div>

        <a :href="SUPPORT_WHATSAPP" target="_blank" rel="noopener noreferrer" class="flex gap-1">
          <UiBaseText size="base" weight="regular" color="gray-60">¿Problemas?</UiBaseText>
          <UiBaseText size="base" weight="regular" color="secondary" class="underline">Contacta a soporte</UiBaseText>
        </a>

        <div class="h-2 sm:hidden" />
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

@media (min-width: 640px) {
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(-48%) scale(0.97);
  }
}
</style>
