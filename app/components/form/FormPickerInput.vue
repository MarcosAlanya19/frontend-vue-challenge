<script setup lang="ts">
import { useField } from 'vee-validate'
import { cn } from '~/lib/cn'

interface PickerOption {
  label: string
  value: string
}

interface IProps {
  name: string
  label?: string
  placeholder?: string
  options: PickerOption[]
}

const props = defineProps<IProps>()

const { value, errorMessage, handleChange, handleBlur } = useField<string>(() => props.name)

const visible = ref(false)
const tempValue = ref('')

const selectedLabel = computed(() => props.options.find(o => o.value === value.value)?.label)

function handleOpen() {
  if (visible.value) {
    visible.value = false
    return
  }
  tempValue.value = value.value || ''
  visible.value = true
}

function handleAccept() {
  if (tempValue.value) handleChange(tempValue.value)
  visible.value = false
}

function handleCancel() {
  visible.value = false
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <UiBaseText v-if="label" size="base" weight="medium" color="gray-60">
      {{ label }}
    </UiBaseText>

    <div class="relative">
      <button type="button" :class="cn(
        'flex flex-row items-center justify-between w-full h-12 px-3 rounded-lg border bg-white transition-all duration-200',
        errorMessage ? 'border-red ring-1 ring-red/10' : 'border-gray-25'
      )" @pointerdown.stop @click="handleOpen" @blur="handleBlur">
        <span class="text-base" :class="selectedLabel ? 'font-medium text-secondary' : 'font-normal text-gray-40'">
          {{ selectedLabel || placeholder }}
        </span>

        <Icon name="lucide:chevron-down" class="w-5 h-5 text-gray-40 shrink-0" />
      </button>

      <UiBaseWheelPicker :visible="visible" :options="options" :selected-value="tempValue"
        @update:selected-value="tempValue = $event" @accept="handleAccept" @cancel="handleCancel" />
    </div>

    <UiBaseText v-if="errorMessage" size="sm" weight="regular" color="red" class="mt-0.5">
      {{ errorMessage }}
    </UiBaseText>
  </div>
</template>
