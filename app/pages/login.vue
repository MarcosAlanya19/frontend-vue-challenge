<script setup lang="ts">
import LoginContainer from '~/modules/auth/containers/LoginContainer.vue'

definePageMeta({ layout: 'auth', middleware: ['guest'] })
useSeoMeta({ title: 'Iniciar sesión - Kambista', description: 'Inicia sesión en Kambista para cambiar dólares al mejor tipo de cambio.' })
</script>

<template>
  <LoginContainer />
</template>
