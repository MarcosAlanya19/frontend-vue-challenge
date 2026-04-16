<script setup lang="ts">
import type { ILoginFormData } from '~/modules/auth/components/LoginForm/index.schema'
import { useLogin } from '~/modules/auth/composables/useLogin'
import LoginForm from '~/modules/auth/components/LoginForm/index.vue'

const { data, handle } = useLogin()
const router = useRouter()
const loginFormRef = ref<InstanceType<typeof LoginForm> | null>(null)

const onSubmit = async (formData: ILoginFormData) => {
  await handle(formData)
  if (data.value) {
    router.replace('/')
    return
  }
  loginFormRef.value?.setRootError('Correo o contraseña incorrectos')
}
</script>

<template>
  <div class="w-full max-w-md flex flex-col gap-8">
    <UiBaseText as="h1" size="2xl" color="secondary" class="text-center lg:text-left lg:font-bold">
      Inicia sesión
    </UiBaseText>

    <LoginForm ref="loginFormRef" @submit="onSubmit" @register="router.push('/onboarding/personal-data')" />
  </div>
</template>
