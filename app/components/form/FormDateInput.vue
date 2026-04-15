<script setup lang="ts">
import { useField } from 'vee-validate'
import { cn } from '~/lib/cn'
import { dmyToISO, isoToDMY, getMaxBirthDate, getDefaultBirthPage } from '~/lib/date'

interface IProps {
  name: string
  label?: string
  placeholder?: string
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: 'DD/MM/AAAA',
})

const { value, errorMessage, handleChange, handleBlur } = useField<string>(() => props.name)

const visible = ref(false)
const tempDate = ref('')

function handleOpen() {
  if (visible.value) {
    visible.value = false
    return
  }
  tempDate.value = dmyToISO(value.value)
  visible.value = true
}

function handleAccept() {
  if (tempDate.value) handleChange(isoToDMY(tempDate.value))
  visible.value = false
}

function handleCancel() {
  visible.value = false
}

const maxDate = computed(() => getMaxBirthDate())
const initialPage = computed(() => tempDate.value ? undefined : getDefaultBirthPage())
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <UiBaseText v-if="label" size="base" weight="medium" color="gray-60">
      {{ label }}
    </UiBaseText>

    <button type="button" :class="cn(
      'flex flex-row items-center justify-between w-full h-12 px-3 rounded-lg border bg-white transition-all duration-200',
      errorMessage ? 'border-red ring-1 ring-red/10' : 'border-gray-25'
    )" @click="handleOpen" @blur="handleBlur">
      <span class="text-base" :class="value ? 'font-medium text-secondary' : 'font-normal text-gray-40'">
        {{ value || placeholder }}
      </span>
      <Icon name="lucide:calendar" class="w-5 h-5 text-gray-40 shrink-0" />
    </button>

    <UiBaseDatePicker :visible="visible" :model-value="tempDate" :max-date="maxDate" :initial-page="initialPage"
      @update:model-value="tempDate = $event" @accept="handleAccept" @cancel="handleCancel" />

    <UiBaseText v-if="errorMessage" size="sm" weight="regular" color="red" class="mt-0.5">
      {{ errorMessage }}
    </UiBaseText>
  </div>
</template>
