<script setup lang="ts">
import LoginContainer from '~/modules/auth/containers/LoginContainer.vue'

definePageMeta({ layout: 'auth', middleware: ['guest'] })
</script>

<template>
  <LoginContainer />
</template>
