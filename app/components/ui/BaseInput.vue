<script setup lang="ts">
import { cn } from '~/utils/cn'

interface IProps {
  modelValue?: string
  label?: string
  error?: string
  placeholder?: string
  isPassword?: boolean
  type?: string
}

withDefaults(defineProps<IProps>(), {
  isPassword: false,
  type: 'text',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const focused = ref(false)
const showPassword = ref(false)

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <!-- Label -->
    <UiBaseText v-if="label" size="base" weight="medium" color="gray-60">
      {{ label }}
    </UiBaseText>

    <!-- Input Container -->
    <div :class="cn(
      'flex flex-row items-center h-12 px-3 rounded-lg border bg-white transition-all duration-200',
      error ? 'border-red ring-1 ring-red/10' : focused ? 'border-primary ring-1 ring-primary/10' : 'border-gray-25'
    )">
      <!-- Left Icon Slot -->
      <div v-if="$slots['left-icon']" class="mr-2 text-gray-40 flex items-center">
        <slot name="left-icon" />
      </div>

      <!-- Input Field -->
      <input :type="isPassword ? (showPassword ? 'text' : 'password') : type" :value="modelValue"
        :placeholder="placeholder"
        class="border-none flex-1 font-normal text-base text-secondary outline-none focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-40 h-full p-0"
        @input="onInput" @focus="focused = true" @blur="focused = false" />

      <!-- Password Toggle / Right Icon Slot -->
      <div v-if="isPassword || $slots['right-icon']" class="ml-2 flex items-center">
        <button v-if="isPassword" type="button"
          class="text-gray-40 hover:text-gray-60 transition-colors flex items-center"
          @click="showPassword = !showPassword">
          <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
        </button>
        <slot v-else name="right-icon" />
      </div>
    </div>

    <!-- Error Message -->
    <UiBaseText v-if="error" size="sm" weight="regular" color="red">
      {{ error }}
    </UiBaseText>
  </div>
</template>
