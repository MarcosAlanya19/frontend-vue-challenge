<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useField } from 'vee-validate'
import { cn } from '~/lib/cn'
import { ECurrency } from '~/enums/currency.enum'
import AddAccountModal from '~/modules/transaction/components/AddAccountModal/index.vue'

interface IAccountOption {
  label: string
  value: string
  subtitle?: string
}

interface IProps {
  name: string
  label: string
  options: IAccountOption[]
  currency?: ECurrency
  placeholder?: string
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: 'Selecciona',
  currency: ECurrency.PEN,
})

const { value, errorMessage, handleChange, handleBlur } = useField<string>(() => props.name)

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greaterOrEqual('lg')

const visible = ref(false)
const showAddModal = ref(false)

// Accumulates accounts added during this session
const localAccounts = ref<IAccountOption[]>([])
const allOptions = computed(() => [...props.options, ...localAccounts.value])

const selectedOption = computed(() => allOptions.value.find(o => o.value === value.value))
const sheetTitle = computed(() => props.currency === ECurrency.PEN ? 'Cuentas Soles' : 'Cuentas Dólares')

function onSelect(val: string) {
  handleChange(val)
  visible.value = false
}

function handleAddAccount() {
  showAddModal.value = true
}

function handleAccountCreated(account: IAccountOption) {
  localAccounts.value.push(account)
  handleChange(account.value)
  showAddModal.value = false
  visible.value = false
}

function handleAddModalClose() {
  showAddModal.value = false
}

function maskNumber(num?: string) {
  if (!num) return ''
  return '**** ' + num.slice(-4)
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <UiBaseText size="base" class="lg:text-md" weight="medium" color="gray-66">
      {{ label }}
    </UiBaseText>

    <div class="relative">
      <button type="button" :class="cn(
        'flex flex-row items-center w-full h-12 px-3 rounded-lg border bg-white transition-all duration-200',
        errorMessage ? 'border-red ring-1 ring-red/10' : visible ? 'border-primary ring-1 ring-primary/10' : 'border-gray-25'
      )" @click="visible = !visible" @blur="handleBlur">
        <UiBaseText class="flex-1 text-left truncate lg:text-md" size="base"
          :weight="selectedOption ? 'medium' : 'regular'" :color="selectedOption ? 'secondary' : 'gray-40'">
          {{ selectedOption?.label ?? placeholder }}
        </UiBaseText>
        <Icon name="lucide:chevron-down"
          :class="cn('w-5 h-5 text-gray-40 transition-transform duration-200', visible && 'rotate-180')" />
      </button>
    </div>

    <UiBaseText v-if="errorMessage" size="sm" weight="regular" color="red" class="mt-0.5">
      {{ errorMessage }}
    </UiBaseText>
  </div>

  <Teleport to="body">
    <!-- DESKTOP: centered modal -->
    <template v-if="isDesktop">
      <Transition name="fade">
        <div v-if="visible && !showAddModal" class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          @click.self="visible = false">
          <Transition name="fade-scale">
            <div v-if="visible && !showAddModal"
              class="w-full max-w-sm bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col" @click.stop>
              <!-- Header -->
              <div class="px-6 py-4 bg-secondary">
                <div class="flex items-center justify-between">
                  <UiBaseText size="2xl" weight="bold" color="white">{{ sheetTitle }}</UiBaseText>
                  <button type="button" @click="visible = false">
                    <Icon name="heroicons:x-mark" class="w-5 h-5 text-white" />
                  </button>
                </div>

                <!-- Subtitle -->
                <UiBaseText size="md" weight="medium" color="gray-25">Selecciona tu cuenta de destino</UiBaseText>
              </div>



              <!-- Account list -->
              <ul class="flex flex-col overflow-y-auto max-h-64">
                <li v-for="option in allOptions" :key="option.value"
                  class="flex items-center justify-between px-8 py-4 cursor-pointer hover:bg-gray-25 transition-colors"
                  :class="option.value === value ? 'bg-gray-25' : ''" @click="onSelect(option.value)">
                  <div class="flex flex-col gap-0.5">
                    <UiBaseText size="md" :weight="option.value === value ? 'semibold' : 'medium'"
                      :color="option.value === value ? 'secondary' : 'gray-60'">
                      {{ option.label }}
                    </UiBaseText>
                    <UiBaseText v-if="option.subtitle" size="base" weight="medium" color="gray-66">
                      {{ maskNumber(option.subtitle) }}
                    </UiBaseText>
                  </div>
                  <Icon v-if="option.value === value" name="lucide:check"
                    class="w-4 h-4 text-primary stroke-[3] shrink-0" />
                </li>
              </ul>

              <!-- Add account -->
              <div class="px-6 py-4 border-t border-gray-25">
                <button type="button" class="flex items-center gap-3" @click="handleAddAccount">
                  <div class="w-8 h-8 rounded-sm border border-secondary flex items-center justify-center">
                    <Icon name="heroicons:plus" class="w-4 h-4 text-secondary" />
                  </div>
                  <UiBaseText size="base" weight="medium" color="secondary">Agregar cuenta</UiBaseText>
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </template>

    <!-- MOBILE: bottom sheet -->
    <template v-else>
      <Transition name="fade">
        <div v-if="visible && !showAddModal" class="fixed inset-0 bg-black/40 z-50 backdrop-blur-[2px]"
          @click="visible = false" />
      </Transition>

      <Transition name="slide-up">
        <div v-if="visible && !showAddModal"
          class="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 shadow-2xl max-h-[80vh] flex flex-col overflow-hidden">
          <!-- Drag handle -->
          <div class="flex justify-center pt-3 pb-2">
            <div class="w-10 h-1.5 rounded-full bg-gray-25" />
          </div>

          <!-- Title -->
          <div class="px-6 pb-3 border-b border-gray-25">
            <UiBaseText size="base" weight="semibold" color="gray-60">Selecciona tu cuenta de destino</UiBaseText>
          </div>

          <!-- Account list -->
          <ul class="flex flex-col overflow-y-auto max-h-64">
            <li v-for="option in allOptions" :key="option.value"
              class="flex items-center justify-between px-8 py-4 cursor-pointer hover:bg-gray-25 transition-colors"
              :class="option.value === value ? 'bg-gray-25' : ''" @click="onSelect(option.value)">
              <div class="flex flex-col gap-0.5">
                <UiBaseText size="base" :weight="option.value === value ? 'semibold' : 'medium'"
                  :color="option.value === value ? 'secondary' : 'gray-60'">
                  {{ option.label }}
                </UiBaseText>
                <UiBaseText v-if="option.subtitle" size="sm" weight="medium" color="gray-66">
                  {{ maskNumber(option.subtitle) }}
                </UiBaseText>
              </div>
              <Icon v-if="option.value === value" name="lucide:check"
                class="w-4 h-4 text-primary stroke-[3] shrink-0" />
            </li>
          </ul>

          <!-- Add account -->
          <div class="px-9 py-4 border-t border-gray-25">
            <button type="button" class="flex items-center gap-3" @click="handleAddAccount">
              <div class="w-8 h-8 rounded-sm border border-secondary flex items-center justify-center">
                <Icon name="heroicons:plus" class="w-4 h-4 text-secondary" />
              </div>
              <UiBaseText size="base" weight="medium" color="secondary">Agregar cuenta</UiBaseText>
            </button>
          </div>

          <div class="h-6 bg-white" />
        </div>
      </Transition>
    </template>

    <!-- Add account modal (rendered on top, z-[60]) -->
    <AddAccountModal :visible="showAddModal" :currency="currency" @created="handleAccountCreated"
      @close="handleAddModalClose" />
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

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
