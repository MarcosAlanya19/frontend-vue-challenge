<script setup lang="ts">
import { Form, type GenericObject } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema, type ILoginFormData } from './index.schema'

const emit = defineEmits<{
  submit: [data: ILoginFormData]
  register: []
  forgotPassword: []
}>()

const schema = toTypedSchema(loginSchema)
const rootError = ref<string | null>(null)

const onSubmit = (values: GenericObject) => {
  rootError.value = null
  emit('submit', values as ILoginFormData)
}

const setRootError = (message: string) => {
  rootError.value = message
}

defineExpose({ setRootError })
</script>

<template>
  <Form :validation-schema="schema" class="flex flex-col gap-10 w-full" @submit="onSubmit">
    <div class="flex flex-col gap-5">
      <FormInput name="email" label="Correo electrónico" placeholder="Escribe tu correo" type="email" />

      <FormInput name="password" label="Contraseña" placeholder="Escribe tu contraseña" is-password />

      <div class="flex justify-center">
        <button type="button" class="cursor-pointer" @click="emit('forgotPassword')">
          <UiBaseText size="sm" weight="regular" color="gray-60" class="underline">
            ¿Olvidaste tu contraseña?
          </UiBaseText>
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <UiBaseText v-if="rootError" as="p" size="sm" weight="regular" color="red" class="text-center">
        {{ rootError }}
      </UiBaseText>

      <UiBaseButton type="submit" label="Inicia sesión" />

      <p class="text-center">
        <UiBaseText size="base" weight="regular" color="gray-60">¿No tienes cuenta? </UiBaseText>
        <button type="button" class="cursor-pointer" @click="emit('register')">
          <UiBaseText size="base" weight="semibold" color="secondary" class="underline">
            Regístrate aquí
          </UiBaseText>
        </button>
      </p>
    </div>
  </Form>
</template>
