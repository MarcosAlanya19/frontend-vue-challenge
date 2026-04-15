<script setup lang="ts">
import { isoToDate, dateToISO } from '~/lib/date'

interface IProps {
  visible: boolean
  modelValue?: string  // YYYY-MM-DD
  maxDate?: string
  initialPage?: { month: number; year: number }
  title?: string
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  accept: []
  cancel: []
}>()

const calendarDate = computed({
  get() {
    return props.modelValue ? isoToDate(props.modelValue) : null
  },
  set(date: Date | null) {
    if (!date) return
    emit('update:modelValue', dateToISO(date))
  },
})

const maxDateObj = computed(() =>
  props.maxDate ? isoToDate(props.maxDate) : undefined,
)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="fixed inset-0 bg-black/40 z-50 backdrop-blur-[2px]" @click="emit('cancel')" />
    </Transition>

    <Transition name="slide-up">
      <div v-if="visible"
        class="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 shadow-2xl sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:w-fit">
        <div class="flex justify-center pt-3 pb-1 sm:hidden">
          <div class="w-10 h-1.5 rounded-full bg-gray-25" />
        </div>

        <div
          class="flex flex-row justify-between items-center px-6 py-2 bg-gray-21 border-b border-gray-25 sm:rounded-t-2xl">
          <button type="button" @click="emit('accept')">
            <UiBaseText size="md" weight="semibold" class='text-sky-500'>Aceptar</UiBaseText>
          </button>

          <UiBaseText v-if="title" size="md" weight="bold" color="secondary">
            {{ title }}
          </UiBaseText>


          <button type="button" @click="emit('cancel')">
            <UiBaseText size="md" weight="semibold" class='text-sky-500'>Cancelar</UiBaseText>
          </button>
        </div>

        <div class="flex justify-center p-4">
          <VDatePicker v-model="calendarDate" :max-date="maxDateObj" :initial-page="initialPage" />
        </div>

        <div class="h-6 bg-white sm:hidden" />
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
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 1, 1);
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
