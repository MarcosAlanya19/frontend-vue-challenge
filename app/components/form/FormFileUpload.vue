<script setup lang="ts">
import { useField } from 'vee-validate'

interface IProps {
  name: string
  uriName: string
  label?: string
  placeholder?: string
  helperText?: string
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: 'Selecciona archivo',
})

const {
  value: fileName,
  errorMessage: nameError,
  handleChange: onChangeName,
} = useField<string>(() => props.name)

const {
  errorMessage: uriError,
  handleChange: onChangeUri,
} = useField<string>(() => props.uriName)

const fileInput = ref<HTMLInputElement | null>(null)

const error = computed(() => nameError.value || (uriError.value ? 'Selecciona un archivo válido' : undefined))

function handleClick() {
  fileInput.value?.click()
}

function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  onChangeName(file.name)
  const url = URL.createObjectURL(file)
  onChangeUri(url)
}
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <span v-if="label" class="text-base font-regular text-secondary">{{ label }}</span>

    <button type="button" class="flex flex-row items-center h-10 pl-7 pr-4 rounded-lg border bg-white transition-colors"
      :class="{
        'border-red': !!error,
        'border-gray-25': !error,
      }" @click="handleClick">
      <span class="flex-1 text-left text-base truncate" :class="fileName ? 'text-secondary' : 'text-gray-66'">
        {{ fileName || placeholder }}
      </span>

      <IconsUploadSvg />
    </button>

    <span v-if="error" class="text-sm font-normal text-red">{{ error }}</span>
    <span v-else-if="helperText" class="text-sm font-normal text-gray-60">{{ helperText }}</span>
    <span class="text-sm font-normal text-gray-60">*Tamaño máximo permitido del archivo 10 Mb</span>

    <input ref="fileInput" type="file" accept="image/*,.pdf,.doc,.docx" class="hidden" @change="handleFileChange" />
  </div>
</template>
