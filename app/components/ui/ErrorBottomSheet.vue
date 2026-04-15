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
      <div v-if="error" class="fixed inset-0 bg-black/40 z-50 flex flex-col justify-end"
        @click.self="errorStore.clearError()" />
    </Transition>

    <Transition name="slide-up">
      <div v-if="error"
        class="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 p-6 flex flex-col items-center gap-4">
        <p class="font-bold text-xl text-secondary text-center">{{ error.title }}</p>

        <p class="font-normal text-base text-gray-60 text-center leading-6">{{ error.message }}</p>

        <button type="button"
          class="w-full h-14 bg-secondary rounded-2xl flex items-center justify-center transition-opacity active:opacity-80"
          @click="errorStore.clearError()">
          <span class="font-semibold text-base text-white">ACEPTAR</span>
        </button>

        <a :href="SUPPORT_WHATSAPP" target="_blank" rel="noopener noreferrer"
          class="font-normal text-base text-gray-60">
          ¿Problemas? <span class="text-secondary underline">Contacta a soporte</span>
        </a>
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
