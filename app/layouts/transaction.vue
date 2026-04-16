<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const steps = [
  { number: 1, label: 'Completa', shortLabel: 'Completa' },
  { number: 2, label: 'Transfiere', shortLabel: 'Transfiere' },
  { number: 3, label: 'Envía constancia', shortLabel: 'Constancia' },
]

const currentStep = computed(() => {
  if (route.path.includes('/transfer')) return 2
  if (route.path.includes('/receipt')) return 3
  return 1
})

const showStepper = computed(() => !route.path.includes('/success'))
</script>

<template>
  <div class="min-h-screen bg-gray-background flex flex-col">
    <header class="bg-white">

      <!-- Mobile top row: logo + Volver -->
      <div class="flex lg:hidden items-center justify-between px-base h-14">
        <IconsLogoSvg :width="120" :height="28" color="#060F26" />
        <button v-if="showStepper" type="button" class="flex items-center gap-1" @click="router.back()">
          <Icon name="heroicons:chevron-left" class="w-5 h-5 text-secondary" />
          <UiBaseText size="base" weight="bold" color="secondary">Volver</UiBaseText>
        </button>
        <div v-else />
      </div>

      <!-- Mobile stepper row -->
      <div v-if="showStepper" class="flex lg:hidden items-start px-base py-3">
        <template v-for="(step, idx) in steps" :key="step.number">
          <div class="flex flex-col items-center gap-1">
            <div class="w-3 h-3 rounded-full shrink-0"
              :class="step.number <= currentStep ? 'bg-secondary' : 'bg-gray-25'" />
            <UiBaseText size="sm" :weight="step.number === currentStep ? 'bold' : 'regular'"
              :color="step.number <= currentStep ? 'secondary' : 'gray-40'" class="whitespace-nowrap">
              {{ step.shortLabel }}
            </UiBaseText>
          </div>
          <div v-if="idx < steps.length - 1" class="flex-1 h-px mt-[5px]"
            :class="step.number < currentStep ? 'bg-secondary' : 'bg-gray-25'" />
        </template>
      </div>

      <!-- Desktop: single row -->
      <div class="hidden lg:flex items-center justify-between px-8 h-16">
        <IconsLogoSvg :width="120" :height="28" color="#060F26" />

        <div v-if="showStepper" class="flex flex-col gap-1">
          <div class="flex items-center">
            <template v-for="(step, idx) in steps" :key="step.number">
              <div class="w-3 h-3 rounded-full shrink-0"
                :class="step.number <= currentStep ? 'bg-secondary' : 'bg-gray-25'" />
              <div v-if="idx < steps.length - 1" class="w-48 xl:w-64 h-px shrink-0"
                :class="step.number < currentStep ? 'bg-secondary' : 'bg-gray-25'" />
            </template>
          </div>
          <!-- Labels -->
          <div class="flex items-start">
            <template v-for="(step, idx) in steps" :key="step.number">
              <div class="relative w-3 shrink-0">
                <UiBaseText size="sm" :weight="step.number === currentStep ? 'bold' : 'regular'"
                  :color="step.number <= currentStep ? 'secondary' : 'gray-40'"
                  class="absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
                  {{ step.label }}
                </UiBaseText>
              </div>
              <div v-if="idx < steps.length - 1" class="w-48 xl:w-64 shrink-0" />
            </template>
          </div>
        </div>
        <div v-else />

        <button v-if="showStepper" type="button" class="flex items-center gap-3" @click="router.back()">
          <Icon name="heroicons:chevron-left" class="w-5 h-5 text-secondary" />
          <UiBaseText size="base" weight="bold" color="secondary" class="text-2xl">Volver</UiBaseText>
        </button>
        <div v-else />
      </div>
    </header>

    <main class="flex-1 flex flex-col">
      <slot />
    </main>
  </div>
</template>
