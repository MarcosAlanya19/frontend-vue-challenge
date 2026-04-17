<script setup lang="ts">
import { useField } from 'vee-validate'

interface IProps {
  name: string
  label?: string
}

const props = defineProps<IProps>()

const { value, errorMessage, handleChange } = useField<boolean>(() => props.name)

function onChange(checked: boolean) {
  handleChange(checked, true)
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <UiBaseCheckbox :checked="value ?? false" @update:checked="onChange">
      <slot>{{ label }}</slot>
    </UiBaseCheckbox>

    <UiBaseText v-if="errorMessage" size="sm" weight="regular" color="red">
      {{ errorMessage }}
    </UiBaseText>
  </div>
</template>
