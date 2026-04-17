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
  inputmode?: string
  numericOnly?: boolean
}

const props = defineProps<IProps>()

const { value, errors, handleBlur, handleChange, meta } = useField<string>(() => props.name)

const errorMessage = computed(() => meta.dirty || meta.touched ? errors.value[0] : undefined)

function onInput(val: string) {
  const nextValue = props.formatter ? props.formatter(val) : val
  handleChange(nextValue, true)
}

function onBlurValidate() {
  handleChange(value.value, true)
  handleBlur()
}
</script>

<template>
  <BaseInput :model-value="value" :label="label" :error="errorMessage" :placeholder="placeholder"
    :is-password="isPassword" :type="type" :inputmode="inputmode ?? (numericOnly ? 'numeric' : undefined)"
    @update:model-value="onInput" @blur="onBlurValidate" />
</template>
