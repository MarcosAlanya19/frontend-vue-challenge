<script setup lang="ts">
import { useField } from 'vee-validate'
import BaseInput from '~/components/ui/BaseInput.vue'

interface IProps {
  name: string
  label?: string
  placeholder?: string
  isPassword?: boolean
  type?: string
  formatter?: (value: string) => string
}

const props = defineProps<IProps>()

const { value, errorMessage, handleBlur, handleChange } = useField<string>(() => props.name)

function onInput(val: string) {
  handleChange(props.formatter ? props.formatter(val) : val)
}
</script>

<template>
  <BaseInput :model-value="value" :label="label" :error="errorMessage" :placeholder="placeholder"
    :is-password="isPassword" :type="type" @update:model-value="onInput" @blur="handleBlur" />
</template>
