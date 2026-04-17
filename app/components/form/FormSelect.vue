<script setup lang="ts">
import { useField } from 'vee-validate'
import { cn } from '~/lib/cn'

interface ISelectOption {
  label: string
  value: string
  subtitle?: string
  shortLabel?: string
}

interface IProps {
  name: string
  label: string
  sheetTitle?: string
  options: ISelectOption[]
  placeholder?: string
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: 'Selecciona',
})

const { value, errorMessage, handleChange, handleBlur } = useField<string>(() => props.name)

const sheetVisible = ref(false)

const selectedOption = computed(() => props.options.find(o => o.value === value.value))

function onSelect(val: string) {
  handleChange(val, true)
}

function handleAccept() {
  sheetVisible.value = false
}

function handleCancel() {
  sheetVisible.value = false
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
        errorMessage ? 'border-red ring-1 ring-red/10' : sheetVisible ? 'border-primary ring-1 ring-primary/10' : 'border-gray-25'
      )" @click="sheetVisible = !sheetVisible" @blur="handleBlur">
        <UiBaseText class="flex-1 text-left truncate lg:text-md" size="base"
          :weight="selectedOption ? 'medium' : 'regular'" :color="selectedOption ? 'secondary' : 'gray-40'">
          {{ selectedOption?.shortLabel ?? selectedOption?.label ?? placeholder }}
        </UiBaseText>

        <Icon name="lucide:chevron-down"
          :class="cn('w-5 h-5 text-gray-40 transition-transform duration-200', sheetVisible && 'rotate-180')" />
      </button>

      <!-- Nuxt auto-imports components/ui/BasePicker.vue as UiBasePicker -->
      <UiBasePicker :visible="sheetVisible" :title="sheetTitle ?? label" :options="options" :selected-value="value"
        @update:selected-value="onSelect" @accept="handleAccept" @cancel="handleCancel" />
    </div>

    <UiBaseText v-if="errorMessage" size="sm" weight="regular" color="red" class="mt-0.5">
      {{ errorMessage }}
    </UiBaseText>

    <slot name="footer" />
  </div>
</template>
